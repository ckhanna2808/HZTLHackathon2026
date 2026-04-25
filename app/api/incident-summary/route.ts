import { NextRequest, NextResponse } from "next/server";
import { summarizeSingleIncident, ClaudeIncidentInput } from "@/lib/claude";
import { sendSlackNotification } from "@/lib/slack";

/**
 * GET /api/incident-summary
 * Summarizes a single incident and optionally notifies Slack.
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { incident, notify } = body as { 
      incident: ClaudeIncidentInput; 
      notify?: boolean 
    };

    if (!incident) {
      return NextResponse.json({ error: "Incident data required" }, { status: 400 });
    }

    // 1. Get Claude Deep-dive
    const analysis = await summarizeSingleIncident(incident);

    // 2. Optionally send to Slack
    let slackSent = false;
    if (notify) {
      slackSent = await sendSlackNotification(analysis, "📣 Manual Incident Broadcast");
    }

    return NextResponse.json({
      success: true,
      analysis,
      slackSent
    });

  } catch (error) {
    console.error("[IncidentSummary] Error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Internal error" 
    }, { status: 500 });
  }
}
