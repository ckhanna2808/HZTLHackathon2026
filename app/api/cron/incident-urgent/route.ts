import { NextRequest, NextResponse } from "next/server";
import { fetchAllPlatformEvents } from "@/lib/incident-service";
import { isAuthorized, filterUrgentAlerts } from "@/lib/cron-handler";
import { analyzeIncidentsWithClaude } from "@/lib/claude";
import { sendSlackNotification } from "@/lib/slack";

/**
 * GET /api/cron/incident-urgent
 * Scans for critical/major outages every minute.
 */
export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const allEvents = await fetchAllPlatformEvents();
    const urgent = filterUrgentAlerts(allEvents, 5);

    if (urgent.length === 0) return NextResponse.json({ success: true, count: 0 });

    const claudeInputs = urgent.map(inc => ({
      p: inc.source, t: inc.title, s: inc.status, i: inc.impact,
      c: inc.affectedComponents.slice(0, 3), b: inc.description.slice(0, 500),
      at: inc.startedAt, url: inc.url || "", type: "incident" as "incident" | "maintenance"
    }));

    const analysis = await analyzeIncidentsWithClaude(claudeInputs, []);
    await sendSlackNotification(analysis, "🚨 URGENT: Major Outage Detected");

    return NextResponse.json({ success: true, count: urgent.length, alerts: urgent.map(u => u.title) });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
