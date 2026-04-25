/**
 * Sitecore Support Portal — Widget API Adapter
 *
 * The publications list is served by ServiceNow widget sys_id c03fc483c3e13250f2c0da42b4013115
 * which lives inside the /status page for portal 89ee320c1b1d7810ed946574604bcb92.
 *
 * Primary:  POST /api/now/sp/widget/c03fc483c3e13250f2c0da42b4013115
 *           → result.data.publications[]
 *
 * Fallback: GET  /api/now/sp/page?portal_id=...&request_uri=%2Fstatus
 *           → result.containers[].rows[].columns[].widgets[].widget.data.publications[]
 *
 * Publication shape (from live API):
 * {
 *   productLabel:   "Sitecore Managed Cloud" | "SitecoreAI" | "Content Hub, SitecoreAI" | ...
 *   number:         "PUB0109680"
 *   incidentNumber: "INC1223407"  (may be "")
 *   pubLabel:       incident title
 *   priorityLabel:  "P1 - Outage" | "P2 - Degradation" | "P4 - Information"
 *   priority.p1.className: "status-outage"|"status-degradation"|"status-information"|"status-available"
 *   priority.p2:    "Outage" | "Degradation" | "Information"
 *   started:        "2026-04-07 04:46:00"
 *   id:             sys_id for deep link
 *   isPublic:       true | false
 * }
 */

import type {
  LiveWatchIncident,
  SitecoreProduct,
  SystemStatus,
  IncidentStatus,
  ImpactLevel,
} from "../types";

const PORTAL_BASE = "https://support.sitecore.com";
const PORTAL_ID   = "89ee320c1b1d7810ed946574604bcb92";
const WIDGET_ID   = "c03fc483c3e13250f2c0da42b4013115";

// ─── Raw publication type ─────────────────────────────────────────────────────

interface RawPublication {
  productLabel?:   string;
  number?:         string;
  incidentNumber?: string;
  pubLabel?:       string;
  priorityLabel?:  string;
  priorityValue?:  string;
  isPublic?:       boolean;
  started?:        string;
  id?:             string;
  priority?: {
    p1?: { className?: string; label?: string };
    p2?:  string;
  };
}

// ─── Priority mapping (from className — most reliable field) ─────────────────

function mapClass(className?: string): {
  status: SystemStatus;
  impact: ImpactLevel;
  incidentStatus: IncidentStatus;
} {
  switch (className) {
    case "status-outage":
      return { status: "major_outage",         impact: "critical", incidentStatus: "identified" };
    case "status-degradation":
      return { status: "degraded_performance",  impact: "major",    incidentStatus: "monitoring" };
    case "status-information":
      return { status: "operational",           impact: "minor",    incidentStatus: "scheduled"  };
    case "status-available":
    default:
      return { status: "operational",           impact: "none",     incidentStatus: "resolved"   };
  }
}

// ─── Product label → SitecoreProduct (exact productLabel from API) ────────────

function mapProductLabel(label: string): SitecoreProduct {
  const l = label.toLowerCase().trim();
  if (l.includes("managed cloud"))                                   return "managed-cloud";
  if (l.includes("sitecoreai") || l === "sitecore ai")              return "ai";
  if (l.includes("content hub"))                                     return "content-hub";
  if (l.includes("customer data platform") || l.includes(" cdp"))   return "cdp";
  if (l.includes("personali"))                                       return "personalize";
  if (l.includes(" send") || l.startsWith("send"))                  return "send";
  if (l.includes("sitecore search") || l.includes("experience search")) return "search";
  if (l.includes("experience edge"))                                 return "xm-cloud";
  if (l.includes("xm cloud"))                                        return "xm-cloud";
  if (l.includes("cloud portal"))                                    return "cloud-portal";
  return "xm-cloud";
}

function parseProductLabel(rawLabel?: string): { primary: SitecoreProduct; all: string[] } {
  const label = rawLabel ?? "";
  // May be comma-separated: "Content Hub, SitecoreAI"
  const parts = label.split(",").map((s) => s.trim()).filter(Boolean);
  return {
    primary: mapProductLabel(parts[0] ?? label),
    all: parts.length > 0 ? parts : [label],
  };
}

// ─── Date parser ("2026-04-07 04:46:00" → ISO string) ────────────────────────

function parseStarted(raw?: string): string {
  if (!raw) return new Date().toISOString();
  // Convert "YYYY-MM-DD HH:MM:SS" → "YYYY-MM-DDTHH:MM:SSZ"
  const iso = raw.replace(" ", "T") + "Z";
  const d = new Date(iso);
  return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

// ─── Convert raw publication → LiveWatchIncident ──────────────────────────────

function pubToIncident(pub: RawPublication, now: string): LiveWatchIncident {
  const { primary, all } = parseProductLabel(pub.productLabel);
  const className = pub.priority?.p1?.className;
  const { status, impact, incidentStatus } = mapClass(className);
  const startedAt = parseStarted(pub.started);
  const linkId = pub.id ?? "";

  return {
    id: `sitecore-${pub.number ?? pub.incidentNumber ?? pub.id}`,
    source: "sitecore",
    product: primary,
    title: (pub.pubLabel ?? "Sitecore Status Event").trim(),
    description: pub.incidentNumber
      ? `Event ${pub.incidentNumber} · ${pub.priorityLabel ?? ""}`
      : pub.priorityLabel ?? "",
    url: linkId
      ? `${PORTAL_BASE}/status?id=pub&sysid=${linkId}`
      : `${PORTAL_BASE}/status`,
    status:       impact === "none" ? "resolved" : incidentStatus,
    impact,
    overallStatus: status,
    affectedComponents: all,
    affectedRegions: [],
    startedAt,
    updatedAt: startedAt,
    resolvedAt: impact === "none" ? startedAt : null,
    detectedBy: "polling",
    detectedAt: now,
    isNew: false,
    previousStatus: null,
    notificationsSent: [],
  };
}

// ─── Fetch via widget POST (primary) ─────────────────────────────────────────

async function fetchViaWidget(): Promise<RawPublication[]> {
  const res = await fetch(`${PORTAL_BASE}/api/now/sp/widget/${WIDGET_ID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      id: "status",
      sys_id: WIDGET_ID,
      params: {},
      client_data: null,
    }),
    next: { revalidate: 55 },
    signal: AbortSignal.timeout(9000),
  });
  if (!res.ok) throw new Error(`Widget POST HTTP ${res.status}`);
  const json = await res.json();
  const pubs: RawPublication[] = json?.result?.data?.publications ?? [];
  if (pubs.length === 0) throw new Error("Widget returned 0 publications");
  return pubs;
}

// ─── Fetch via page API (fallback — traverses containers) ────────────────────

async function fetchViaPageAPI(): Promise<RawPublication[]> {
  const url = `${PORTAL_BASE}/api/now/sp/page?portal_id=${PORTAL_ID}&request_uri=%2Fstatus&time=${Date.now()}`;
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: 55 },
    signal: AbortSignal.timeout(12000),
  });
  if (!res.ok) throw new Error(`Page API HTTP ${res.status}`);

  const json = await res.json();
  const containers: unknown[] = json?.result?.containers ?? [];

  for (const container of containers as Record<string, unknown>[]) {
    for (const row of (container.rows as Record<string, unknown>[]) ?? []) {
      for (const col of (row.columns as Record<string, unknown>[]) ?? []) {
        for (const w of (col.widgets as Record<string, unknown>[]) ?? []) {
          const pubs = (w?.widget as Record<string, unknown>)?.data as Record<string, unknown>;
          const list = pubs?.publications as RawPublication[] | undefined;
          if (Array.isArray(list) && list.length > 0) return list;
        }
      }
    }
  }
  throw new Error("No publications found in page API response");
}

// ─── Main export ──────────────────────────────────────────────────────────────

export async function fetchSitecorePublications(): Promise<LiveWatchIncident[]> {
  const now = new Date().toISOString();
  let rawPubs: RawPublication[] = [];

  try {
    rawPubs = await fetchViaWidget();
    console.log(`[sitecore] Widget returned ${rawPubs.length} publications`);
  } catch (e1) {
    console.warn("[sitecore] Widget failed, trying page API:", (e1 as Error).message);
    try {
      rawPubs = await fetchViaPageAPI();
      console.log(`[sitecore] Page API returned ${rawPubs.length} publications`);
    } catch (e2) {
      console.error("[sitecore] Both sources failed:", (e2 as Error).message);
      return [];
    }
  }

  return rawPubs
    .filter((p) => p.isPublic !== false)     // public events only
    .map((p) => pubToIncident(p, now));
}

// ─── Per-product status map ───────────────────────────────────────────────────

export interface SitecoreProductStatusWithHistory {
  product: SitecoreProduct;
  name: string;
  status: SystemStatus;
  detectedBy: "polling" | "rss" | "probe";
  lastChecked: string;
  incident: LiveWatchIncident | null;
  history: LiveWatchIncident[];
  incidentCount30d: number;
  uptime30d: number;
}

export const ALL_SITECORE_PRODUCTS: SitecoreProduct[] = [
  "xm-cloud", "content-hub", "search", "cdp",
  "personalize", "send", "ai", "managed-cloud", "cloud-portal",
];

export const PRODUCT_NAMES: Record<SitecoreProduct, string> = {
  "xm-cloud":      "XM Cloud",
  "content-hub":   "Content Hub",
  "search":        "Sitecore Search",
  "cdp":           "CDP",
  "personalize":   "Personalize",
  "send":          "Sitecore Send",
  "ai":            "Sitecore AI",
  "managed-cloud": "Managed Cloud",
  "cloud-portal":  "Cloud Portal",
};

export function buildSitecoreProductStatuses(
  publications: LiveWatchIncident[]
): Record<SitecoreProduct, SitecoreProductStatusWithHistory> {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  return Object.fromEntries(
    ALL_SITECORE_PRODUCTS.map((product) => {
      // Also match publications that mention this product in affectedComponents
      const mine = publications.filter(
        (p) =>
          p.product === product ||
          p.affectedComponents.some((c) =>
            mapProductLabel(c) === product
          )
      );

      // Most severe active incident first
      const impactOrder: Record<string, number> = { critical: 0, major: 1, minor: 2, none: 3 };
      const active = mine
        .filter((p) => p.impact !== "none" && p.status !== "resolved")
        .sort((a, b) => (impactOrder[a.impact] ?? 3) - (impactOrder[b.impact] ?? 3))[0] ?? null;

      const history = [...mine]
        .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime())
        .slice(0, 10);

      const recent = mine.filter((p) => new Date(p.startedAt) >= thirtyDaysAgo);
      const outageHours = recent.filter((p) => p.impact === "critical" || p.impact === "major").length * 2;
      const uptime30d = Math.round(Math.max(0, 100 - (outageHours / 720) * 100) * 100) / 100;

      return [product, {
        product,
        name: PRODUCT_NAMES[product],
        status: active?.overallStatus ?? "operational",
        detectedBy: "polling" as const,
        lastChecked: now.toISOString(),
        incident: active,
        history,
        incidentCount30d: recent.length,
        uptime30d,
      }];
    })
  ) as Record<SitecoreProduct, SitecoreProductStatusWithHistory>;
}
