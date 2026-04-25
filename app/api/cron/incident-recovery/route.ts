/**
 * @fileoverview
 * HZ LiveWatch — Incident Recovery Cron Job
 * Route: GET /api/cron/incident-recovery
 *
 * Triggered by Vercel Cron (every hour).
 *
 * Flow:
 * 1. Fetch last 50 incidents for all platforms.
 * 2. Filter for incidents with status "resolved" that were fixed in the LAST 60 MINUTES.
 * 3. Send to Claude for a "Recovery Analysis" (how long was it down, what was the impact).
 * 4. Post "Fixed" notification to Slack with Green ✅ indicators.
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

// ─── Auth ─────────────────────────────────────────────────────────────────────

function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true; // dev bypass
  const authHeader = request.headers.get("authorization") ?? "";
  return authHeader === `Bearer ${secret}`;
}

// ─── Fetchers ────────────────────────────────────────────────────────────────

interface RawIncident {
  id: string;
  name: string;
  status: string;
  impact: string;
  created_at: string;
  updated_at: string;
  resolved_at: string | null;
  shortlink?: string;
  incident_updates?: Array<{ body: string; status?: string }>;
  components?: Array<{ name: string }>;
}

async function fetchRecentIncidents(platformId: Platform, baseUrl: string): Promise<LiveWatchIncident[]> {
  const now = new Date().toISOString();
  try {
    const res = await fetch(`${baseUrl}/incidents.json`, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return [];
    const body = await res.json();
    const items: RawIncident[] = body?.incidents ?? [];

    return items.map(inc => ({
      id: `${platformId}-${inc.id}`,
      source: platformId,
      product: null,
      title: inc.name,
      description: inc.incident_updates?.[0]?.body ?? "Resolved.",
      url: inc.shortlink ?? `${baseUrl.replace("/api/v2", "")}/incidents/${inc.id}`,
      status: inc.status as any,
      impact: inc.impact as any,
      overallStatus: "operational",
      affectedComponents: (inc.components ?? []).map(c => c.name),
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
  } catch { return []; }
}

// ─── 60-Minute Filter ────────────────────────────────────────────────────────

const ONE_HOUR_MS = 60 * 60 * 1000;

function wasResolvedRecently(resolvedAt: string | null): boolean {
  if (!resolvedAt) return false;
  const cutoff = Date.now() - ONE_HOUR_MS;
  return new Date(resolvedAt).getTime() >= cutoff;
}

// ─── Main Handler ─────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const runAt = new Date().toISOString();
  if (!isAuthorized(request)) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    // 1. Fetch all incidents
    const incidentBatches = await Promise.all(
      STATUSPAGE_PLATFORMS.map(p => fetchRecentIncidents(p.id, p.baseUrl))
    );
    const allIncidents = incidentBatches.flat();

    // 2. Filter for "Just Fixed" (Resolved in last 60 mins)
    const justFixed = allIncidents.filter(inc => 
      inc.status === "resolved" && wasResolvedRecently(inc.resolvedAt)
    );

    if (justFixed.length === 0) {
      return NextResponse.json({ success: true, message: "No new recoveries in the last hour." });
    }

    console.log(`[incident-recovery] Found ${justFixed.length} recently resolved incidents.`);

    // 3. Claude Analysis (Recovery specific)
    const snapshot = await buildSnapshot();
    const operationalPlatforms = Object.entries(snapshot.platforms)
      .filter(([, p]) => p.status === "operational")
      .map(([k]) => k);

    const claudeInputs: ClaudeIncidentInput[] = justFixed.map(inc => ({
      p: inc.source,
      t: inc.title,
      s: "resolved",
      i: inc.impact,
      c: inc.affectedComponents,
      b: inc.description.slice(0, 300),
      at: inc.startedAt,
      url: inc.url,
      type: "incident"
    }));

    const analysis = await analyzeIncidentsWithClaude(claudeInputs, operationalPlatforms);

    // 4. Slack
    const slackPayload = buildSlackPayload(analysis, runAt, justFixed.length);
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(slackPayload)
      });
    }

    return NextResponse.json({
      success: true,
      recoveredCount: justFixed.length,
      incidents: justFixed.map(i => i.title)
    });

  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
