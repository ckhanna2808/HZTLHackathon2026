import type {
  Platform,
  PlatformStatus,
  SitecoreProduct,
  LiveWatchIncident,
  DashboardStats,
  LiveWatchSnapshot,
  SystemStatus,
} from "./types";
import { fetchAllStatuspagePlatforms } from "./adapters/statuspage";
import {
  fetchSitecorePublications,
  buildSitecoreProductStatuses,
  type SitecoreProductStatusWithHistory,
} from "./adapters/sitecore-support";

export interface LiveWatchSnapshotEnriched extends LiveWatchSnapshot {
  sitecoreProducts: Record<SitecoreProduct, SitecoreProductStatusWithHistory>;
}

export async function buildSnapshot(): Promise<LiveWatchSnapshotEnriched> {
  const now = new Date().toISOString();
  const nextPoll = new Date(Date.now() + 60_000).toISOString();

  // Fetch all sources in parallel
  const [tier1Results, sitecorePublications] = await Promise.all([
    fetchAllStatuspagePlatforms(),
    fetchSitecorePublications(),
  ]);

  // Build platform map
  const platforms: Record<string, PlatformStatus> = {};
  for (const p of tier1Results) {
    platforms[p.platform] = p;
  }

  // Active Sitecore publications (not resolved)
  const activePubs = sitecorePublications.filter(
    (p) => p.impact !== "none" && p.status !== "resolved"
  );

  // Overall Sitecore status from severity
  const sitecoreStatus: SystemStatus =
    activePubs.some((p) => p.impact === "critical") ? "major_outage" :
    activePubs.some((p) => p.impact === "major")   ? "partial_outage" :
    activePubs.length > 0                           ? "degraded_performance" :
    "operational";

  platforms["sitecore"] = {
    platform: "sitecore",
    name: "Sitecore",
    status: sitecoreStatus,
    indicator:
      sitecoreStatus === "major_outage"          ? "critical" :
      sitecoreStatus === "partial_outage"        ? "major" :
      sitecoreStatus === "degraded_performance"  ? "minor" :
      "none",
    description:
      activePubs.length > 0
        ? `${activePubs.length} active event(s) detected`
        : "All Sitecore products operational",
    updatedAt: now,
    activeIncidents: activePubs,
    components: [],
    healthPercent:
      sitecoreStatus === "major_outage"         ? 40 :
      sitecoreStatus === "partial_outage"       ? 65 :
      sitecoreStatus === "degraded_performance" ? 85 :
      100,
    lastChecked: now,
  };

  // Per-product status with history
  const sitecoreProducts = buildSitecoreProductStatuses(sitecorePublications);

  // All incidents combined
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
      return d.getDate() === today.getDate() &&
             d.getMonth() === today.getMonth() &&
             d.getFullYear() === today.getFullYear();
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
    incidentHistory: allIncidents,
    stats,
  };
}
