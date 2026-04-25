import { ClaudeAnalysisResult, ClaudeIncidentAnalysis } from "./claude";

/**
 * @fileoverview
 * Unified Slack Notification Service.
 */

const WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

export async function sendSlackNotification(
  analysis: ClaudeAnalysisResult | ClaudeIncidentAnalysis,
  titlePrefix = "🚨 HZ LiveWatch Alert"
) {
  if (!WEBHOOK_URL) {
    console.warn("[Slack] No WEBHOOK_URL configured. Skipping notification.");
    return false;
  }

  // Normalize input to a list of incidents
  const incidents = "incidents" in analysis ? analysis.incidents : [analysis];
  const summary = "summary" in analysis ? analysis.summary : "";

  const blocks: any[] = [
    {
      type: "header",
      text: { type: "plain_text", text: titlePrefix, emoji: true },
    },
  ];

  if (summary) {
    blocks.push({
      type: "section",
      text: { type: "mrkdwn", text: `*Overview:* ${summary}` },
    });
  }

  incidents.forEach((inc, idx) => {
    blocks.push({ type: "divider" });
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: `${inc.sev} *${inc.platform}: ${inc.title}*\n\n*What:* ${inc.what}\n*Impact:* ${inc.who}\n*Next Step:* ${inc.action}`,
      },
      accessory: {
        type: "button",
        text: { type: "plain_text", text: "View Status", emoji: true },
        url: inc.url,
        action_id: `view_status_${idx}`,
      },
    });
  });

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blocks }),
    });

    if (!res.ok) throw new Error(`Slack API error: ${res.status}`);
    return true;
  } catch (error) {
    console.error("[Slack] Failed to send notification:", error);
    return false;
  }
}
