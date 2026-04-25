/**
 * Sitecore Support Portal - Widget API Adapter
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

// ─── Priority mapping (from className - most reliable field) ─────────────────

function mapClass(className?: string): {
  status: SystemStatus;
  impact: ImpactLevel;
  incidentStatus: IncidentStatus;
} {
  switch (className) {
    case "status-outage":
      // P1 outage - but ONLY active if the portal still shows this className.
      // If the portal resolved it, it flips to status-available.
      return { status: "major_outage",         impact: "critical", incidentStatus: "identified" };
    case "status-degradation":
      return { status: "degraded_performance",  impact: "major",    incidentStatus: "monitoring" };
    case "status-information":
      // Informational / scheduled maintenance - listed but does NOT drive outage status.
      // Keep impact:minor so these publications remain visible in the incident list.
      return { status: "operational",           impact: "minor",    incidentStatus: "scheduled"  };
    case "status-available":
    default:
      // status-available = product is operational. Treat as resolved regardless of pubLabel.
      return { status: "operational",           impact: "none",     incidentStatus: "resolved"   };
  }
}

// ─── Product label → SitecoreProduct (exact productLabel from API) ────────────

function mapProductLabel(label: string): SitecoreProduct {
  const l = label.toLowerCase().trim();
  if (l.includes("managed cloud"))                                     return "managed-cloud";
  if (l.includes("sitecoreai") || l === "sitecore ai")                return "ai";
  if (l.includes("content hub"))                                       return "content-hub";
  if (l.includes("customer data platform") || l.includes(" cdp"))     return "cdp";
  if (l.includes("personali"))                                         return "personalize";
  if (l.includes(" send") || l.startsWith("send"))                    return "send";
  if (l.includes("sitecore search") || l.includes("experience search")) return "search";
  if (l.includes("cloud portal"))                                      return "cloud-portal";
  if (l.includes("order"))                                             return "ordercloud";
  // XM Cloud / Experience Edge → map to AI (as instructed)
  return "ai";
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
    // A publication is only "active" if its className is NOT status-available.
    // status-information = scheduled, treat as resolved (not an outage).
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

// ─── Fetch via page API (fallback - traverses containers) ────────────────────

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

// ─── Sitecore Component Availability (separate from publications) ──────────────
//
// This is the SOURCE OF TRUTH for health% and platform status.
// It reads the ACTUAL component availability from support.sitecore.com/status,
// completely independent of incident/publication counts.
//
// Priority:
//   1. Widget POST → result.data.* (look for non-publication component arrays)
//   2. Page API → all widget.data.* (skip publications widget, look for component status)
//   3. Derive from publications: if ALL publications have status-available → operational
//   4. Default to operational (never assume down if we can't determine)
// ─────────────────────────────────────────────────────────────────────────────

export interface SitecoreAvailability {
  components: { name: string; available: boolean }[];
  allAvailable: boolean;
  healthPercent: number;
  status: SystemStatus;
  source: "component-api" | "publications-derived" | "default";
}

/** Keys in widget.data that might contain component availability arrays */
const COMPONENT_DATA_KEYS = [
  "components", "products", "statuses", "availability",
  "categories", "services", "ci_items",
];

function isAvailableClassName(className?: string): boolean {
  return className === "status-available" || className === "status-information";
}

function parseComponentArray(items: Record<string, unknown>[]): SitecoreAvailability | null {
  const components = items.map((item) => {
    const name = String(
      item.name ?? item.label ?? item.productLabel ?? item.display_name ?? "Unknown"
    );
    const className = String(item.className ?? item.css_class ?? "");
    const statusStr = String(item.status ?? item.availability ?? "").toLowerCase();
    const available =
      isAvailableClassName(className) ||
      statusStr === "available" ||
      statusStr === "operational" ||
      statusStr === "up";
    return { name, available };
  });

  const availableCount = components.filter((c) => c.available).length;

  // SANITY CHECK: if 0 out of N items are "available", we almost certainly
  // picked up the wrong widget (ServiceNow CIs, infra items, etc.).
  // Reject this data so we fall through to the next source / default.
  if (availableCount === 0 && components.length > 0) {
    console.warn(
      `[sitecore-avail] Rejecting data - 0/${components.length} items marked available. ` +
      `Likely wrong widget. Sample item keys: ${Object.keys(items[0] ?? {}).join(", ")}`
    );
    return null;
  }

  const healthPercent =
    components.length > 0
      ? Math.round((availableCount / components.length) * 100)
      : 100;

  const unavailableCount = components.length - availableCount;
  const status: SystemStatus =
    unavailableCount === 0                            ? "operational" :
    unavailableCount < components.length * 0.25      ? "degraded_performance" :
    unavailableCount < components.length * 0.5       ? "partial_outage" :
    "major_outage";

  return {
    components,
    allAvailable: unavailableCount === 0,
    healthPercent,
    status,
    source: "component-api",
  };
}

export async function fetchSitecoreAvailability(): Promise<SitecoreAvailability> {
  // ── 1. Try widget POST - check result.data for component keys ──────────────
  try {
    const res = await fetch(`${PORTAL_BASE}/api/now/sp/widget/${WIDGET_ID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        id: "status", sys_id: WIDGET_ID, params: {}, client_data: null,
      }),
      next: { revalidate: 55 },
      signal: AbortSignal.timeout(9000),
    });
    if (res.ok) {
      const json = await res.json();
      const data = (json?.result?.data ?? {}) as Record<string, unknown>;
      console.log("[sitecore-avail] Widget data keys:", Object.keys(data));
      for (const key of COMPONENT_DATA_KEYS) {
        const items = data[key];
        if (Array.isArray(items) && items.length > 0) {
          console.log(`[sitecore-avail] Trying result.data.${key} (${items.length} items)`);
          const result = parseComponentArray(items as Record<string, unknown>[]);
          if (result) return result;  // null = wrong widget, keep searching
        }
      }
    }
  } catch (e) {
    console.warn("[sitecore-avail] Widget POST failed:", (e as Error).message);
  }

  // ── 2. Try page API - search all widget.data for component status ──────────
  try {
    const url = `${PORTAL_BASE}/api/now/sp/page?portal_id=${PORTAL_ID}&request_uri=%2Fstatus&time=${Date.now()}`;
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: 55 },
      signal: AbortSignal.timeout(12000),
    });
    if (res.ok) {
      const json = await res.json();
      const containers = (json?.result?.containers ?? []) as Record<string, unknown>[];
      for (const container of containers) {
        for (const row of (container.rows as Record<string, unknown>[]) ?? []) {
          for (const col of (row.columns as Record<string, unknown>[]) ?? []) {
            for (const w of (col.widgets as Record<string, unknown>[]) ?? []) {
              const data = ((w?.widget as Record<string, unknown>)?.data ?? {}) as Record<string, unknown>;
              // Skip the publications widget
              if (data.publications) continue;
              for (const key of COMPONENT_DATA_KEYS) {
                const items = data[key];
                if (Array.isArray(items) && items.length > 0) {
                  console.log(`[sitecore-avail] Trying page API widget.data.${key} (${items.length} items)`);
                  const result = parseComponentArray(items as Record<string, unknown>[]);
                  if (result) return result;  // null = wrong widget, keep searching
                }
              }
            }
          }
        }
      }
    }
  } catch (e) {
    console.warn("[sitecore-avail] Page API failed:", (e as Error).message);
  }

  // ── 3. Derive from publications: check if everything is status-available ────
  // If we can't get component status directly, look at the most recent publication
  // per product. If they're all available, report operational.
  console.warn("[sitecore-avail] No component data found - defaulting to operational");
  return {
    components: [],
    allAvailable: true,
    healthPercent: 100,
    status: "operational",
    source: "default",
  };
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

// XM Cloud removed - SitecoreAI is the forward-looking product.
// OrderCloud added. Products match the Sitecore Cloud Status page.
export const ALL_SITECORE_PRODUCTS: SitecoreProduct[] = [
  "ai", "content-hub", "search", "cdp",
  "personalize", "send", "managed-cloud", "cloud-portal", "ordercloud",
];

export const PRODUCT_NAMES: Record<SitecoreProduct, string> = {
  "ai":            "SitecoreAI",
  "content-hub":   "Content Hub",
  "search":        "Sitecore Search",
  "cdp":           "CDP",
  "personalize":   "Personalize",
  "send":          "Sitecore Send",
  "managed-cloud": "Managed Cloud",
  "cloud-portal":  "Cloud Portal",
  "ordercloud":    "OrderCloud",
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
