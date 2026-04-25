/**
 * @fileoverview
 * HZ LiveWatch — Incident Digest Cron Job
 * Route: GET /api/cron/incident-digest
 *
 * Triggered by Vercel Cron (every hour — see vercel.json).
 *
 * Incident sources & endpoints:
 * ─────────────────────────────────────────────────────────────────
 * Tier 1 — Statuspage platforms (Vercel, Netlify, GitHub, Cloudflare, npm)
 *
 *   /incidents.json                        → last 50 incidents (active + resolved) ✅ PRIMARY
 *   /scheduled-maintenances/upcoming.json  → upcoming maintenance windows          ✅ FETCHED
 *   /scheduled-maintenances/active.json    → in-progress maintenance windows       ✅ FETCHED
 *   /summary.json                          → used by buildSnapshot() for dashboard  (not for digest)
 *
 *   Base URLs:
 *     Vercel     → https://www.vercel-status.com/api/v2
 *     Netlify    → https://www.netlifystatus.com/api/v2
 *     GitHub     → https://www.githubstatus.com/api/v2
 *     Cloudflare → https://www.cloudflarestatus.com/api/v2
 *     npm        → https://status.npmjs.com/api/v2
 *
 * Tier 2 — Sitecore
 *   https://status.cloud.sitecore.net/MaintenanceRSS  → RSS (last 20 events)
 *   (fetched via buildSnapshot → sitecore-support adapter)
 *
 * Time window: last 48 hours UTC (active, resolved, scheduled all included)
 * ─────────────────────────────────────────────────────────────────
 *
 * Environment variables required:
 *   CRON_SECRET          — set in Vercel dashboard, injected by Vercel Cron as Bearer token
 *   ANTHROPIC_API_KEY    — Claude API key
 *   SLACK_WEBHOOK_URL    — Slack incoming webhook
 */

import { NextRequest, NextResponse } from "next/server";
import { buildSnapshot } from "@/lib/aggregator";
import {
  analyzeIncidentsWithClaude,
  type ClaudeIncidentInput,
} from "@/lib/claude";
import { buildSlackPayload } from "@/lib/slack-formatter";
import { STATUSPAGE_PLATFORMS } from "@/lib/adapters/statuspage";
import type { LiveWatchIncident, Platform } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60; // Vercel Pro: up to 300s. Hobby: 60s max.

// ─── Auth ─────────────────────────────────────────────────────────────────────

function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;

  // In local dev (no secret set), allow through so you can test easily
  if (!secret) {
    console.warn(
      "[incident-digest] CRON_SECRET not set — bypassing auth (dev only)"
    );
    return true;
  }

  const authHeader = request.headers.get("authorization") ?? "";
  return authHeader === `Bearer ${secret}`;
}

// ─── Raw API Types ────────────────────────────────────────────────────────────

interface RawIncident {
  id: string;
  name: string;
  status: string;   // investigating | identified | monitoring | resolved
  impact: string;   // none | minor | major | critical
  created_at: string;
  updated_at: string;
  resolved_at: string | null;
  shortlink?: string;
  incident_updates?: Array<{ body: string; status?: string }>;
  components?: Array<{ name: string }>;
}

interface RawMaintenance {
  id: string;
  name: string;
  status: string;
  impact: string;
  created_at: string;
  updated_at: string;
  scheduled_for?: string;
  scheduled_until?: string;
  shortlink?: string;
  incident_updates?: Array<{ body: string; status?: string }>;
  components?: Array<{ name: string }>;
}

// ─── /incidents.json Fetcher ─────────────────────────────────────────────────
// Returns last 50 incidents for a platform including resolved ones.
// This is the correct endpoint for historical data — /summary.json only has active ones.

async function fetchRecentIncidentsForPlatform(
  platformId: Platform,
  baseUrl: string
): Promise<LiveWatchIncident[]> {
  const now = new Date().toISOString();

  try {
    const res = await fetch(`${baseUrl}/incidents.json`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(8_000),
    });

    if (!res.ok) {
      console.warn(`[incident-digest] ${platformId} /incidents.json → HTTP ${res.status}`);
      return [];
    }

    const body = await res.json();
    const items: RawIncident[] = body?.incidents ?? [];

    return items.map((inc): LiveWatchIncident => ({
      id: `${platformId}-${inc.id}`,
      source: platformId,
      product: null,
      title: inc.name,
      description: inc.incident_updates?.[0]?.body ?? "No update available.",
      url: inc.shortlink ?? `${baseUrl.replace("/api/v2", "")}/incidents/${inc.id}`,
      status: mapIncidentStatus(inc.status),
      impact: mapImpact(inc.impact),
      overallStatus: "operational", // per-incident field — overall is from /summary
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
    }));
  } catch (err) {
    console.warn(`[incident-digest] Failed to fetch incidents for ${platformId}:`, err);
    return [];
  }
}

// ─── Status/Impact Mappers ───────────────────────────────────────────────────

function mapIncidentStatus(
  s: string
): LiveWatchIncident["status"] {
  switch (s?.toLowerCase()) {
    case "investigating": return "investigating";
    case "identified": return "identified";
    case "monitoring": return "monitoring";
    case "resolved": return "resolved";
    default: return "investigating";
  }
}

function mapImpact(i: string): LiveWatchIncident["impact"] {
  switch (i?.toLowerCase()) {
    case "critical": return "critical";
    case "major": return "major";
    case "minor": return "minor";
    default: return "none";
  }
}

// ─── Scheduled Maintenance Fetcher ───────────────────────────────────────────

async function fetchMaintenancesForPlatform(
  platformId: Platform,
  baseUrl: string
): Promise<LiveWatchIncident[]> {
  const now = new Date().toISOString();

  try {
    // Fetch upcoming and active maintenance windows in parallel
    const [upcomingRes, activeRes] = await Promise.all([
      fetch(`${baseUrl}/scheduled-maintenances/upcoming.json`, {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(8_000),
      }),
      fetch(`${baseUrl}/scheduled-maintenances/active.json`, {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(8_000),
      }),
    ]);

    const collected: LiveWatchIncident[] = [];

    for (const res of [upcomingRes, activeRes]) {
      if (!res.ok) continue;

      const body = await res.json();
      const items: RawMaintenance[] = body?.scheduled_maintenances ?? [];

      for (const m of items) {
        const latestBody =
          m.incident_updates?.[0]?.body ?? "See status page for full details.";
        const startTime = m.scheduled_for ?? m.created_at;
        const endTime = m.scheduled_until ?? null;

        collected.push({
          id: `${platformId}-maint-${m.id}`,
          source: platformId,
          product: null,
          title: m.name,
          description: latestBody,
          url:
            m.shortlink ??
            `${baseUrl.replace("/api/v2", "")}/incidents/${m.id}`,
          status: "scheduled",
          impact: "minor",
          overallStatus: "operational",
          affectedComponents: (m.components ?? []).map((c) => c.name),
          affectedRegions: [],
          startedAt: startTime,
          updatedAt: m.updated_at,
          resolvedAt: endTime,
          detectedBy: "polling",
          detectedAt: now,
          isNew: false,
          previousStatus: null,
          notificationsSent: [],
        });
      }
    }

    return collected;
  } catch (err) {
    console.warn(
      `[incident-digest] Failed to fetch maintenances for ${platformId}:`,
      err
    );
    return [];
  }
}

// ─── 24-Hour Filter ───────────────────────────────────────────────────────────
// Change this single constant to adjust the lookback window for resolved incidents.
// Active incidents and scheduled maintenances are always included regardless.

const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1_000;

function isWithin24Hours(dateStr: string): boolean {
  try {
    const cutoff = Date.now() - TWENTY_FOUR_HOURS_MS;
    return new Date(dateStr).getTime() >= cutoff;
  } catch {
    return false;
  }
}

// ─── Build Minimal Claude Payload ─────────────────────────────────────────────

function toClaudeInput(inc: LiveWatchIncident): ClaudeIncidentInput {
  return {
    // Short keys = fewer tokens
    p: inc.product ? `${inc.source}/${inc.product}` : inc.source,
    t: inc.title,
    s: inc.status,
    i: inc.impact,
    c: inc.affectedComponents.slice(0, 3), // cap at 3 components
    b: inc.description.slice(0, 200),       // cap body at 200 chars
    at: inc.startedAt.slice(0, 16),         // "2026-04-25T06:00" — drop seconds
    url: inc.url,
    type: inc.status === "scheduled" ? "maintenance" : "incident",
  };
}

// ─── Post to Slack ────────────────────────────────────────────────────────────

async function postToSlack(payload: object): Promise<void> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) throw new Error("[incident-digest] Missing SLACK_WEBHOOK_URL");

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(
      `[incident-digest] Slack webhook error ${res.status}: ${errText}`
    );
  }
}

// ─── Main Handler ─────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const runAt = new Date().toISOString();
  console.log(`[incident-digest] ▶ Cron triggered at ${runAt} (UTC)`);

  // ── 1. Auth ────────────────────────────────────────────────────────────────
  if (!isAuthorized(request)) {
    console.warn("[incident-digest] ✗ Unauthorized request — aborting");
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    // ── 2. Parallel fetch: /incidents.json + maintenances + snapshot (for Sitecore RSS) ───
    console.log("[incident-digest] Fetching incidents + maintenances from all platforms...");
    console.log(`[incident-digest] APIs called per platform:`);
    console.log(`[incident-digest]   • /incidents.json                        (last 50, incl. resolved)`);
    console.log(`[incident-digest]   • /scheduled-maintenances/upcoming.json  (upcoming windows)`);
    console.log(`[incident-digest]   • /scheduled-maintenances/active.json    (in-progress windows)`);
    console.log(`[incident-digest]   • Sitecore RSS → status.cloud.sitecore.net/MaintenanceRSS`);

    const incidentFetches = STATUSPAGE_PLATFORMS.map((p) => fetchRecentIncidentsForPlatform(p.id, p.baseUrl));
    const maintenanceFetches = STATUSPAGE_PLATFORMS.map((p) => fetchMaintenancesForPlatform(p.id, p.baseUrl));

    const [snapshot, ...fetchBatches] = await Promise.all([
      buildSnapshot(),          // snapshot used for: Sitecore RSS + platform operational status
      ...incidentFetches,
      ...maintenanceFetches,
    ]);

    // fetchBatches = [inc_vercel, inc_netlify, inc_github, inc_cf, inc_npm, maint_vercel, ...]
    const platformCount = STATUSPAGE_PLATFORMS.length;
    const allPlatformIncidents = fetchBatches.slice(0, platformCount).flat();
    const allMaintenances = fetchBatches.slice(platformCount).flat();

    // Sitecore incidents come from the snapshot (RSS-based)
    const sitecoreIncidents: LiveWatchIncident[] = snapshot.incidentHistory.filter(
      (i) => i.source === "sitecore"
    );

    console.log(
      `[incident-digest] Fetched → platform incidents: ${allPlatformIncidents.length} | ` +
      `maintenances: ${allMaintenances.length} | sitecore: ${sitecoreIncidents.length}`
    );

    // ── 3. Merge + deduplicate ────────────────────────────────────────────────
    const merged: LiveWatchIncident[] = [
      ...allPlatformIncidents,
      ...sitecoreIncidents,
      ...allMaintenances,
    ];

    const seen = new Set<string>();
    const deduped = merged.filter((inc) => {
      if (seen.has(inc.id)) return false;
      seen.add(inc.id);
      return true;
    });

    // ── 4. Filter: last-24h window + ALL scheduled maintenances (no time gate) ─
    // • Scheduled maintenances → always included (upcoming = advance warning)
    // • Active incidents       → always included regardless of when they started
    // • Resolved incidents     → included if they started within the 24h window
    const relevant = deduped.filter((inc) => {
      if (inc.status === "scheduled") return true;   // always notify maintenance
      if (inc.status !== "resolved") return true;    // active incidents always in
      return isWithin24Hours(inc.startedAt);         // resolved: 24h window
    });

    console.log(
      `[incident-digest] ${relevant.length} relevant events after 24h filter ` +
      `(active: ${relevant.filter(i => i.status !== "scheduled" && i.status !== "resolved").length}, ` +
      `scheduled: ${relevant.filter(i => i.status === "scheduled").length}, ` +
      `resolved: ${relevant.filter(i => i.status === "resolved").length})`
    );

    // ── 5. Determine operational platforms ───────────────────────────────────
    const operationalPlatforms = Object.entries(snapshot.platforms)
      .filter(
        ([, p]) =>
          p.status === "operational" && p.activeIncidents.length === 0
      )
      .map(([k]) => k);

    // ── 6. Build minimal Claude inputs ────────────────────────────────────────
    const claudeInputs: ClaudeIncidentInput[] = relevant.map(toClaudeInput);

    console.log(
      `[incident-digest] Sending ${claudeInputs.length} events to Claude ` +
      `| ${operationalPlatforms.length} platforms operational`
    );

    // ── 7. Claude analysis ────────────────────────────────────────────────────
    const analysis = await analyzeIncidentsWithClaude(
      claudeInputs,
      operationalPlatforms
    );

    console.log(
      `[incident-digest] Claude responded with ${analysis.incidents.length} enriched events`
    );

    // ── 8. Build Slack payload ────────────────────────────────────────────────
    const slackPayload = buildSlackPayload(analysis, runAt, relevant.length);

    // ── 9. Post to Slack ──────────────────────────────────────────────────────
    await postToSlack(slackPayload);
    console.log("[incident-digest] ✓ Slack message sent successfully");

    // ── 10. Return success summary ────────────────────────────────────────────
    return NextResponse.json({
      success: true,
      polledAt: runAt,
      window: "48h",
      eventsAnalysed: relevant.length,
      activeIncidents: relevant.filter(
        (i) => i.status !== "scheduled" && i.status !== "resolved"
      ).length,
      scheduledMaintenances: relevant.filter((i) => i.status === "scheduled").length,
      resolvedInWindow: relevant.filter((i) => i.status === "resolved").length,
      operationalPlatforms: operationalPlatforms.length,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[incident-digest] ✗ Fatal error:", err);

    return NextResponse.json(
      { success: false, message, polledAt: runAt },
      { status: 500 }
    );
  }
}
