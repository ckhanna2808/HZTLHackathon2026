import { STATUSPAGE_PLATFORMS } from "./adapters/statuspage";
import { buildSnapshot } from "./aggregator";
import type { LiveWatchIncident, Platform, SystemStatus, Channel } from "./types";

/**
 * @fileoverview
 * Universal Incident Service.
 * Centralizes fetching, normalization, and deduplication for all platforms.
 */

interface RawIncident {
  id: string;
  name: string;
  status: string;
  impact: string;
  created_at: string;
  updated_at: string;
  resolved_at: string | null;
  shortlink?: string;
  incident_updates?: Array<{ body: string }>;
  components?: Array<{ name: string }>;
}

/**
 * Fetches all incidents from all platforms (Tier 1 Statuspages + Sitecore).
 */
export async function fetchAllPlatformEvents(): Promise<LiveWatchIncident[]> {
  const [statusPageEvents, sitecoreEvents] = await Promise.all([
    fetchStatusPageIncidents(),
    fetchSitecoreEvents(),
  ]);

  const merged = [...statusPageEvents, ...sitecoreEvents];
  
  // Deduplicate by ID
  const seen = new Set<string>();
  return merged.filter((inc) => {
    if (seen.has(inc.id)) return false;
    seen.add(inc.id);
    return true;
  });
}

/**
 * Internal: Fetches Tier 1 platforms (Vercel, GitHub, etc) via Statuspage API
 */
async function fetchStatusPageIncidents(): Promise<LiveWatchIncident[]> {
  const batches = await Promise.all(
    STATUSPAGE_PLATFORMS.map(async (p) => {
      try {
        const res = await fetch(`${p.baseUrl}/incidents.json`, { 
          next: { revalidate: 60 },
          signal: AbortSignal.timeout(8000) 
        });
        if (!res.ok) return [];
        const body = await res.json();
        const items: RawIncident[] = body?.incidents ?? [];

        return items.map((inc): LiveWatchIncident => ({
          id: `${p.id}-${inc.id}`,
          source: p.id,
          product: null,
          title: inc.name,
          description: inc.incident_updates?.[0]?.body ?? "No description provided.",
          url: inc.shortlink ?? `${p.baseUrl.replace("/api/v2", "")}/incidents/${inc.id}`,
          status: inc.status as any,
          impact: inc.impact as any,
          overallStatus: "operational" as SystemStatus,
          affectedComponents: (inc.components ?? []).map(c => c.name),
          affectedRegions: [] as string[],
          startedAt: inc.created_at,
          updatedAt: inc.updated_at,
          resolvedAt: inc.resolved_at,
          detectedBy: "polling",
          detectedAt: new Date().toISOString(),
          isNew: false,
          previousStatus: null,
          notificationsSent: [] as Channel[],
        }));
      } catch (err) {
        console.error(`[IncidentService] Failed ${p.id}:`, err);
        return [];
      }
    })
  );
  return batches.flat();
}

/**
 * Internal: Fetches Sitecore events using the existing aggregator snapshot
 */
async function fetchSitecoreEvents(): Promise<LiveWatchIncident[]> {
  try {
    const snapshot = await buildSnapshot();
    // Sitecore RSS typically only returns active incidents/maintenances
    return snapshot.activeIncidents.filter(inc => inc.source === "sitecore");
  } catch (err) {
    console.error("[IncidentService] Failed Sitecore:", err);
    return [];
  }
}
