/**
 * Sitecore Support Portal — Status Adapter
 *
 * Fetches from the Sitecore Cloud RSS feed (the only server-accessible endpoint).
 * The support.sitecore.com/status portal is a pure AngularJS SPA — all incident
 * data there loads client-side only and is not reachable from a Next.js API route.
 *
 * What we CAN fetch: https://status.cloud.sitecore.net/MaintenanceRSS
 *   → scheduled maintenances with real product names in titles
 *
 * Priority mapping (from Sitecore's actual status page labels):
 *   "outage"      → major_outage  / critical
 *   "degradation" → degraded_performance / major
 *   "information" → operational / minor (scheduled/notice)
 *   "available"   → operational / none (resolved)
 */

import { XMLParser } from "fast-xml-parser";
import type {
  LiveWatchIncident,
  SitecoreProduct,
  SystemStatus,
  IncidentStatus,
  ImpactLevel,
} from "../types";

const RSS_URL = "https://status.cloud.sitecore.net/MaintenanceRSS";

// ─── Product inference from title/description ─────────────────────────────────

function inferProduct(text: string): SitecoreProduct {
  const s = text.toLowerCase();
  if (s.includes("managed cloud")) return "managed-cloud";
  if (s.includes("xm cloud") || s.includes("xmcloud") || s.includes("experience manager")) return "xm-cloud";
  if (s.includes("content hub") || s.includes("dam") || s.includes("stylelabs")) return "content-hub";
  if (s.includes("sitecore search") || (s.includes("search") && !s.includes("ai"))) return "search";
  if (s.includes("cdp") || s.includes("customer data platform") || s.includes("boxever")) return "cdp";
  if (s.includes("personali")) return "personalize";
  if (s.includes(" send") || s.includes("email studio") || s.includes("moosend")) return "send";
  // AI/Cloud Portal BEFORE generic "cloud" check
  if (s.includes("sitecore ai") || s.includes("sitecoreai") || s.includes("ai app") || s.includes("ai studio")) return "ai";
  if (s.includes("cloud portal") || s.includes("cloud dashboard") || s.includes("portal")) return "cloud-portal";
  return "xm-cloud"; // safe default — most events are XM Cloud
}

// ─── Priority string → status fields ─────────────────────────────────────────

function mapPriority(p?: string): {
  status: SystemStatus;
  impact: ImpactLevel;
  incidentStatus: IncidentStatus;
} {
  switch (p?.toLowerCase().trim()) {
    case "outage":
      return { status: "major_outage", impact: "critical", incidentStatus: "identified" };
    case "degradation":
      return { status: "degraded_performance", impact: "major", incidentStatus: "monitoring" };
    case "information":
    case "planned":
      return { status: "operational", impact: "minor", incidentStatus: "scheduled" };
    default:
      return { status: "operational", impact: "none", incidentStatus: "resolved" };
  }
}

// ─── Parse RSS guid ───────────────────────────────────────────────────────────

type RssGuid = string | { "#text": string; "@_isPermaLink"?: string };

function extractGuid(guid: RssGuid): string {
  if (typeof guid === "string") return guid;
  return guid["#text"] ?? Math.random().toString(36).slice(2);
}

// ─── Main fetch ───────────────────────────────────────────────────────────────

export async function fetchSitecorePublications(): Promise<LiveWatchIncident[]> {
  const now = new Date().toISOString();

  try {
    const res = await fetch(RSS_URL, {
      next: { revalidate: 55 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`RSS HTTP ${res.status}`);

    const xml = await res.text();
    const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });
    const feed = parser.parse(xml);

    const raw = feed?.rss?.channel?.item;
    if (!raw) return [];

    const items: Record<string, unknown>[] = Array.isArray(raw) ? raw : [raw];

    return items.slice(0, 20).map((item): LiveWatchIncident => {
      const title = String(item.title ?? "");
      const description = String(item.description ?? "");
      const pubDate = item.pubDate ? new Date(String(item.pubDate)).toISOString() : now;
      const guid = extractGuid((item.guid ?? "") as RssGuid);
      const product = inferProduct(title + " " + description);
      const { status, impact, incidentStatus } = mapPriority("information"); // RSS = scheduled maintenances

      return {
        id: `sitecore-rss-${guid}`,
        source: "sitecore",
        product,
        title,
        description: description.replace(/<[^>]+>/g, "").trim() || "See Sitecore status portal for details.",
        url: typeof item.link === "string" ? item.link : "https://support.sitecore.com/status",
        status: incidentStatus,
        impact,
        overallStatus: status,
        affectedComponents: [product],
        affectedRegions: [],
        startedAt: pubDate,
        updatedAt: pubDate,
        resolvedAt: null,
        detectedBy: "rss",
        detectedAt: now,
        isNew: false,
        previousStatus: null,
        notificationsSent: [],
      };
    });
  } catch (err) {
    console.error("[sitecore] RSS fetch failed:", err);
    return [];
  }
}

// ─── Product status map ───────────────────────────────────────────────────────

export interface SitecoreProductStatusWithHistory {
  product: SitecoreProduct;
  name: string;
  status: SystemStatus;
  detectedBy: "rss" | "polling" | "probe";
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
      const mine = publications.filter((p) => p.product === product);
      const active = mine.find((p) => p.status !== "resolved" && p.impact !== "none") ?? null;
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
        detectedBy: "rss" as const,
        lastChecked: now.toISOString(),
        incident: active,
        history,
        incidentCount30d: recent.length,
        uptime30d,
      }];
    })
  ) as Record<SitecoreProduct, SitecoreProductStatusWithHistory>;
}
