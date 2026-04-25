/**
 * @fileoverview
 * HZ LiveWatch — Urgent Incident Alert
 * Route: GET /api/cron/incident-urgent
 *
 * Triggered by Vercel Cron (every 1 minute).
 *
 * Flow:
 * 1. Fetch latest incidents for all platforms.
 * 2. Filter for impact: "critical" or "major".
 * 3. Filter for events that started or updated in the LAST 5 MINUTES (to avoid spam).
 * 4. Send to Claude for urgent analysis and Slack immediately.
 */

import { NextRequest, NextResponse } from "next/server";
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

// ─── Fetcher ─────────────────────────────────────────────────────────────────

interface RawIncident {
  id: string;
  name: string;
  status: string;
  impact: string;
  created_at: string;
  updated_at: string;
  shortlink?: string;
  incident_updates?: Array<{ body: string }>;
  components?: Array<{ name: string }>;
}

async function fetchUrgentIncidents(platformId: Platform, baseUrl: string): Promise<LiveWatchIncident[]> {
  try {
    const res = await fetch(`${baseUrl}/incidents.json`, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return [];
    const body = await res.json();
    const items: RawIncident[] = body?.incidents ?? [];

    return items.map(inc => ({
      id: `${platformId}-${inc.id}`,
      source: platformId,
      product: null,
      title: inc.name,
      description: inc.incident_updates?.[0]?.body ?? "Major outage detected.",
      url: inc.shortlink ?? `${baseUrl.replace("/api/v2", "")}/incidents/${inc.id}`,
      status: inc.status as any,
      impact: inc.impact as any,
      overallStatus: "operational",
      affectedComponents: (inc.components ?? []).map(c => c.name),
      affectedRegions: [],
      startedAt: inc.created_at,
      updatedAt: inc.updated_at,
      resolvedAt: null,
      detectedBy: "polling",
      detectedAt: new Date().toISOString(),
      isNew: false,
      previousStatus: null,
      notificationsSent: [],
    }));
  } catch { return []; }
}

// ─── 5-Minute Window Filter ──────────────────────────────────────────────────

const FIVE_MINS_MS = 5 * 60 * 1000;

function isUrgentAndNew(inc: LiveWatchIncident): boolean {
  // 1. Only Major or Critical
  if (inc.impact !== "critical" && inc.impact !== "major") return false;
  
  // 2. Only if resolved is null (it's active)
  if (inc.status === "resolved") return false;

  // 3. Only if started or updated in the last 5 minutes
  const now = Date.now();
  const startTime = new Date(inc.startedAt).getTime();
  const updateTime = new Date(inc.updatedAt).getTime();
  
  return (now - startTime <= FIVE_MINS_MS) || (now - updateTime <= FIVE_MINS_MS);
}

// ─── Main Handler ─────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const runAt = new Date().toISOString();
  if (!isAuthorized(request)) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const incidentBatches = await Promise.all(
      STATUSPAGE_PLATFORMS.map(p => fetchUrgentIncidents(p.id, p.baseUrl))
    );
    
    const urgentIncidents = incidentBatches.flat().filter(isUrgentAndNew);

    if (urgentIncidents.length === 0) {
      return NextResponse.json({ success: true, message: "No new urgent incidents detected." });
    }

    console.log(`[incident-urgent] 🚨 ALERT! Found ${urgentIncidents.length} urgent events.`);

    const claudeInputs: ClaudeIncidentInput[] = urgentIncidents.map(inc => ({
      p: inc.source,
      t: inc.title,
      s: inc.status,
      i: inc.impact,
      c: inc.affectedComponents,
      b: inc.description.slice(0, 500),
      at: inc.startedAt,
      url: inc.url,
      type: "incident"
    }));

    // Send to Claude with high urgency prompt instruction
    const analysis = await analyzeIncidentsWithClaude(claudeInputs, []);

    // Post to Slack
    const slackPayload = buildSlackPayload(analysis, runAt, urgentIncidents.length);
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
      alertCount: urgentIncidents.length,
      alerts: urgentIncidents.map(i => i.title)
    });

  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
