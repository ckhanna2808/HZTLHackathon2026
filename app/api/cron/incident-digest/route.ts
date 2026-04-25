import { NextRequest, NextResponse } from "next/server";
import { fetchAllPlatformEvents } from "@/lib/incident-service";
import { isAuthorized, filterDailyDigest } from "@/lib/cron-handler";
import { analyzeIncidentsWithClaude } from "@/lib/claude";
import { sendSlackNotification } from "@/lib/slack";
import { buildSnapshot } from "@/lib/aggregator";

/**
 * GET /api/cron/incident-digest
 * Daily briefing of platform health and imminent maintenance.
 */
export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    // 1. Fetch all events and filter for the 24h digest window
    const allEvents = await fetchAllPlatformEvents();
    const digestEvents = filterDailyDigest(allEvents);

    // 2. Identify which platforms are currently operational for the overview
    const snapshot = await buildSnapshot();
    const operationalPlatforms = Object.entries(snapshot.platforms)
      .filter(([, p]) => p.status === "operational")
      .map(([k]) => k);

    // 3. Perform Analysis
    const claudeInputs = digestEvents.map(inc => ({
      p: inc.source, t: inc.title, s: inc.status, i: inc.impact,
      c: inc.affectedComponents.slice(0, 3), b: inc.description.slice(0, 500),
      at: inc.startedAt, url: inc.url || "", 
      type: (inc.status === "scheduled" ? "maintenance" : "incident") as "maintenance" | "incident"
    }));

    const analysis = await analyzeIncidentsWithClaude(claudeInputs, operationalPlatforms);

    // 4. Send Notification
    await sendSlackNotification(analysis, "📅 Daily Platform Health Briefing");

    return NextResponse.json({
      success: true,
      eventsAnalysed: digestEvents.length,
      operationalPlatforms
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
