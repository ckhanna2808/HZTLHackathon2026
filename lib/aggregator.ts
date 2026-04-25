import type {
  Platform,
  PlatformStatus,
  SitecoreProduct,
  LiveWatchIncident,
  DashboardStats,
  LiveWatchSnapshot,
} from "./types";
import { fetchAllStatuspagePlatforms } from "./adapters/statuspage";
import {
  fetchSitecorePublications,
  fetchSitecoreAvailability,
  buildSitecoreProductStatuses,
  type SitecoreProductStatusWithHistory,
} from "./adapters/sitecore-support";

export interface LiveWatchSnapshotEnriched extends LiveWatchSnapshot {
  sitecoreProducts: Record<SitecoreProduct, SitecoreProductStatusWithHistory>;
}

export async function buildSnapshot(): Promise<LiveWatchSnapshotEnriched> {
  const now = new Date().toISOString();
  const nextPoll = new Date(Date.now() + 60_000).toISOString();

  // ── Fetch all sources in parallel ──────────────────────────────────────────
  // fetchSitecoreAvailability and fetchSitecorePublications are INDEPENDENT:
  //   - availability → drives healthPercent + platform status (what you see on the portal)
  //   - publications → drives incident list/history (displayed only, no status impact)
  // ───────────────────────────────────────────────────────────────────────────
  const [tier1Results, sitecorePublications, sitecoreAvailability] = await Promise.all([
    fetchAllStatuspagePlatforms(),
    fetchSitecorePublications(),
    fetchSitecoreAvailability(),
  ]);

  console.log(
    `[aggregator] Sitecore availability: ${sitecoreAvailability.status} ` +
    `(${sitecoreAvailability.healthPercent}%) source="${sitecoreAvailability.source}"`
  );

  // Build platform map
  const platforms: Record<string, PlatformStatus> = {};
  for (const p of tier1Results) {
    platforms[p.platform] = p;
  }

  // ALL non-resolved Sitecore publications - for DISPLAY only
  const activePubs = sitecorePublications.filter((p) => p.status !== "resolved");

  // P1/P2 only - used for description text, NOT for status/health
  const impactingPubs = activePubs.filter(
    (p) => p.impact === "critical" || p.impact === "major"
  );

  // ── Sitecore platform entry ─────────────────────────────────────────────────
  // STATUS and HEALTH% come ENTIRELY from sitecoreAvailability (component-level).
  // Publications are ONLY used for the activeIncidents display list.
  // ───────────────────────────────────────────────────────────────────────────
  platforms["sitecore"] = {
    platform: "sitecore",
    name: "Sitecore",
    status: sitecoreAvailability.status,
    indicator:
      sitecoreAvailability.status === "major_outage"         ? "critical" :
      sitecoreAvailability.status === "partial_outage"       ? "major" :
      sitecoreAvailability.status === "degraded_performance" ? "minor" :
      "none",
    description:
      sitecoreAvailability.allAvailable
        ? activePubs.length > 0
          ? `All components available · ${activePubs.length} event(s) in history`
          : "All Sitecore products operational"
        : impactingPubs.length > 0
          ? `${impactingPubs.length} component(s) impacted · ${activePubs.length} total events`
          : "Partial service degradation detected",
    updatedAt: now,
    activeIncidents: activePubs,          // full list for display - does NOT affect status
    components: sitecoreAvailability.components.map((c, idx) => ({
      id: `sitecore-comp-${idx}`,
      name: c.name,
      status: c.available ? ("operational" as const) : ("degraded_performance" as const),
    })),
    healthPercent: sitecoreAvailability.healthPercent,  // from component availability only
    lastChecked: now,
  };

  // Per-product status with history
  const sitecoreProducts = buildSitecoreProductStatuses(sitecorePublications);

  // All incidents combined (for global feed)
  const allIncidents: LiveWatchIncident[] = [
    ...tier1Results.flatMap((p) => p.activeIncidents),
    ...sitecorePublications,
  ];

  const operationalCount = Object.values(platforms).filter(
    (p) => p.status === "operational"
  ).length;

  const today = new Date();
  const stats: DashboardStats = {
    totalPlatforms: Object.keys(platforms).length,
    operationalCount,
    activeIncidentCount: allIncidents.filter((i) => i.status !== "resolved").length,
    incidentsToday: allIncidents.filter((i) => {
      const d = new Date(i.startedAt);
      return (
        d.getDate() === today.getDate() &&
        d.getMonth() === today.getMonth() &&
        d.getFullYear() === today.getFullYear()
      );
    }).length,
    avgResolutionMinutes: null,
    lastPollAt: now,
    nextPollAt: nextPoll,
  };

  return {
    timestamp: now,
    platforms: platforms as Record<Platform, PlatformStatus>,
    sitecoreProducts,
    activeIncidents: allIncidents.filter((i) => i.status !== "resolved"),
    stats,
  };
}
