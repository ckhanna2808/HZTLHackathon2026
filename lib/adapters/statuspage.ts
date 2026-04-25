import type {
  StatuspageResponse,
  StatuspageIncident,
  StatuspageComponent,
  LiveWatchIncident,
  PlatformStatus,
  ComponentStatus,
  SystemStatus,
  ImpactLevel,
  IncidentStatus,
  Platform,
} from "../types";

// ─── Platform Configs ─────────────────────────────────────────────────────────

export const STATUSPAGE_PLATFORMS: {
  id: Platform;
  name: string;
  baseUrl: string;
}[] = [
  {
    id: "vercel",
    name: "Vercel",
    baseUrl: "https://www.vercel-status.com/api/v2",
  },
  {
    id: "netlify",
    name: "Netlify",
    baseUrl: "https://www.netlifystatus.com/api/v2",
  },
  {
    id: "github",
    name: "GitHub",
    baseUrl: "https://www.githubstatus.com/api/v2",
  },
  {
    id: "cloudflare",
    name: "Cloudflare",
    baseUrl: "https://www.cloudflarestatus.com/api/v2",
  },
  { id: "npm", name: "npm", baseUrl: "https://status.npmjs.com/api/v2" },
];

// ─── Status Mappers ───────────────────────────────────────────────────────────

function mapIndicatorToStatus(indicator: string): SystemStatus {
  switch (indicator?.toLowerCase()) {
    case "none":
    case "operational":
      return "operational";
    case "minor":
    case "degraded_performance":
      return "degraded_performance";
    case "major":
    case "partial_outage":
      return "partial_outage";
    case "critical":
    case "major_outage":
      return "major_outage";
    default:
      return "operational";
  }
}

function mapImpact(impact: string): ImpactLevel {
  switch (impact?.toLowerCase()) {
    case "minor":
      return "minor";
    case "major":
      return "major";
    case "critical":
      return "critical";
    default:
      return "none";
  }
}

function mapIncidentStatus(status: string): IncidentStatus {
  switch (status?.toLowerCase()) {
    case "investigating":
      return "investigating";
    case "identified":
      return "identified";
    case "monitoring":
      return "monitoring";
    case "resolved":
      return "resolved";
    case "scheduled":
      return "scheduled";
    default:
      return "investigating";
  }
}

function calcHealthPercent(
  indicator: string,
  incidents: StatuspageIncident[]
): number {
  if (incidents.length === 0) {
    switch (indicator?.toLowerCase()) {
      case "none":
        return 100;
      case "minor":
        return 85;
      case "major":
        return 60;
      case "critical":
        return 20;
      default:
        return 100;
    }
  }
  return indicator === "none" ? 100 : 75;
}

// ─── Main Adapter ─────────────────────────────────────────────────────────────

export async function fetchStatuspagePlatform(
  platformId: Platform,
  name: string,
  baseUrl: string
): Promise<PlatformStatus> {
  const now = new Date().toISOString();

  try {
    // ── Primary: summary.json — platform status + currently active incidents ──
    const res = await fetch(`${baseUrl}/summary.json`, {
      next: { revalidate: 55 },
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data: StatuspageResponse = await res.json();

    // ── Secondary: incidents.json — full history including resolved ────────────
    // This gives us resolved incidents from the past ~25 entries so the
    // per-platform incident feed shows recent history, not just active ones.
    let allRawIncidents: StatuspageIncident[] = [...data.incidents];
    try {
      const histRes = await fetch(`${baseUrl}/incidents.json`, {
        next: { revalidate: 55 },
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(8000),
      });
      if (histRes.ok) {
        const histData = await histRes.json();
        const histIncidents: StatuspageIncident[] = histData.incidents ?? [];
        // Merge: keep active from summary, add resolved from history (dedup by id)
        const activeIds = new Set(data.incidents.map((i) => i.id));
        const resolvedOnly = histIncidents.filter((i) => !activeIds.has(i.id));
        allRawIncidents = [...data.incidents, ...resolvedOnly];
      }
    } catch {
      // History fetch is best-effort — don't fail the whole platform fetch
      console.warn(`[statuspage] Could not fetch incident history for ${platformId}`);
    }

    // Filter non-group components
    const components: ComponentStatus[] = data.components
      .filter((c) => !c.group)
      .map((c: StatuspageComponent) => ({
        id: c.id,
        name: c.name,
        status: mapIndicatorToStatus(c.status),
        group: c.group_id ?? undefined,
      }));

    // Map ALL incidents (active + resolved) — resolved ones get status:"resolved"
    const activeIncidents: LiveWatchIncident[] = allRawIncidents.map(
      (inc: StatuspageIncident) => ({
        id: `${platformId}-${inc.id}`,
        source: platformId,
        product: null,
        title: inc.name,
        description:
          inc.incident_updates?.[0]?.body ?? "No update available.",
        url: inc.shortlink ?? `${baseUrl.replace("/api/v2", "")}/incidents/${inc.id}`,
        status: mapIncidentStatus(inc.status),
        impact: mapImpact(inc.impact),
        overallStatus: mapIndicatorToStatus(data.status.indicator),
        affectedComponents: (inc.components ?? []).map((c) => c.name),
        affectedRegions: [],
        startedAt: inc.created_at,
        updatedAt: inc.updated_at,
        resolvedAt: inc.resolved_at,
        detectedBy: "polling",
        detectedAt: now,
        isNew: false,
        previousStatus: null,
        notificationsSent: [],
      })
    );

    return {
      platform: platformId,
      name,
      status: mapIndicatorToStatus(data.status.indicator),
      indicator: data.status.indicator,
      description: data.status.description,
      updatedAt: data.page.updated_at,
      activeIncidents,   // includes resolved — filtered per-view in page.tsx
      components,
      healthPercent: calcHealthPercent(data.status.indicator, data.incidents),
      lastChecked: now,
    };
  } catch (err) {
    console.error(`[statuspage] Failed to fetch ${platformId}:`, err);
    return {
      platform: platformId,
      name,
      status: "unknown",
      indicator: "unknown",
      description: "Unable to reach status page",
      updatedAt: now,
      activeIncidents: [],
      components: [],
      healthPercent: 0,
      lastChecked: now,
    };
  }
}


export async function fetchAllStatuspagePlatforms(): Promise<PlatformStatus[]> {
  return Promise.all(
    STATUSPAGE_PLATFORMS.map((p) =>
      fetchStatuspagePlatform(p.id, p.name, p.baseUrl)
    )
  );
}
