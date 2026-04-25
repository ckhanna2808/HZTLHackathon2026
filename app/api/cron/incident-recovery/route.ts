import { NextRequest, NextResponse } from "next/server";
import { fetchAllPlatformEvents } from "@/lib/incident-service";
import { isAuthorized, filterResolvedRecently } from "@/lib/cron-handler";
import { analyzeIncidentsWithClaude } from "@/lib/claude";
import { sendSlackNotification } from "@/lib/slack";

/**
 * GET /api/cron/incident-recovery
 * Scans for fixed issues every hour.
 */
export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const allEvents = await fetchAllPlatformEvents();
    const recovered = filterResolvedRecently(allEvents, 60);

    if (recovered.length === 0) return NextResponse.json({ success: true, count: 0 });

    const claudeInputs = recovered.map(inc => ({
      p: inc.source, t: inc.title, s: inc.status, i: inc.impact,
      c: inc.affectedComponents.slice(0, 3), b: inc.description.slice(0, 500),
      at: inc.startedAt, url: inc.url || "", type: "incident" as "incident" | "maintenance"
    }));

    const analysis = await analyzeIncidentsWithClaude(claudeInputs, []);
    await sendSlackNotification(analysis, "✅ RECOVERY: Issues Resolved");

    return NextResponse.json({ success: true, count: recovered.length, recoveries: recovered.map(r => r.title) });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
