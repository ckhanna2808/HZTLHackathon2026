import { NextRequest } from "next/server";
import type { LiveWatchIncident } from "./types";

/**
 * @fileoverview
 * Cron Utilities & Filtering logic.
 */

// ─── Environment Constants ───────────────────────────────────────────────────

const CRON_SECRET = process.env.CRON_SECRET;
const DEFAULT_WINDOW_HOURS = Number(process.env.CRON_DEFAULT_WINDOW_HOURS) || 24;

// ─── Auth ────────────────────────────────────────────────────────────────────

export function isAuthorized(request: NextRequest): boolean {
  if (!CRON_SECRET) return true; // Dev bypass
  const authHeader = request.headers.get("authorization") ?? "";
  return authHeader === `Bearer ${CRON_SECRET}`;
}

// ─── Filters ─────────────────────────────────────────────────────────────────

/**
 * Filter for events resolved within the last N minutes.
 */
export function filterResolvedRecently(incidents: LiveWatchIncident[], mins = 60) {
  const cutoff = Date.now() - (mins * 60 * 1000);
  return incidents.filter(inc => 
    inc.status === "resolved" && 
    inc.resolvedAt && 
    new Date(inc.resolvedAt).getTime() >= cutoff
  );
}

/**
 * Filter for active Major/Critical events updated in the last N minutes.
 */
export function filterUrgentAlerts(incidents: LiveWatchIncident[], mins = 5) {
  const cutoff = Date.now() - (mins * 60 * 1000);
  return incidents.filter(inc => {
    if (inc.status === "resolved") return false;
    if (inc.impact !== "critical" && inc.impact !== "major") return false;

    const startTime = new Date(inc.startedAt).getTime();
    const updateTime = new Date(inc.updatedAt).getTime();
    return (startTime >= cutoff || updateTime >= cutoff);
  });
}

/**
 * Filter for events relevant for a daily digest.
 * Includes: 24h history, active outages, and imminent maintenance.
 */
export function filterDailyDigest(incidents: LiveWatchIncident[]) {
  const historyCutoff = Date.now() - (DEFAULT_WINDOW_HOURS * 60 * 60 * 1000);
  const maintenanceCutoff = Date.now() + (DEFAULT_WINDOW_HOURS * 60 * 60 * 1000);

  return incidents.filter(inc => {
    // 1. Imminent maintenance (next 24h)
    if (inc.status === "scheduled") {
      return new Date(inc.startedAt).getTime() <= maintenanceCutoff;
    }
    // 2. Active incidents
    if (inc.status !== "resolved") return true;
    // 3. Resolved in last 24h
    return new Date(inc.startedAt).getTime() >= historyCutoff;
  });
}
