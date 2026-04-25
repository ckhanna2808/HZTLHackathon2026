/**
 * @fileoverview
 * Slack message formatter for HZ LiveWatch incident digests.
 *
 * Takes Claude's structured JSON analysis and converts it into
 * rich Slack attachment payloads. Claude never touches Slack markup —
 * this keeps Claude output tokens lean and formatting consistent.
 *
 * Colour coding:
 *   🔴  danger      → Major Outage
 *   🟠  #FF6600     → Partial Outage
 *   🟡  warning     → Degraded / Minor
 *   🔵  #0066CC     → Scheduled Maintenance
 *   ✅  good        → Resolved (within 24h)
 */

import type { ClaudeAnalysisResult, ClaudeIncidentAnalysis } from "./claude";

// ─── Severity Maps ────────────────────────────────────────────────────────────

const SEV_COLOR: Record<string, string> = {
  "🔴": "danger",
  "🟠": "#FF6600",
  "🟡": "warning",
  "🔵": "#0066CC",
  "✅": "good",
};

const SEV_LABEL: Record<string, string> = {
  "🔴": "Major Outage",
  "🟠": "Partial Outage",
  "🟡": "Degraded Performance",
  "🔵": "Scheduled Maintenance",
  "✅": "Resolved",
};

// ─── Slack Block Types ────────────────────────────────────────────────────────

interface SlackField {
  title: string;
  value: string;
  short: boolean;
}

interface SlackAttachment {
  color: string;
  title?: string;
  title_link?: string;
  text?: string;
  fields?: SlackField[];
  footer?: string;
  ts?: number;
  mrkdwn_in?: string[];
}

interface SlackPayload {
  text: string;
  attachments: SlackAttachment[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPlatformName(platform: string): string {
  // "sitecore/xm-cloud" → "Sitecore XM Cloud"
  return platform
    .split("/")
    .map((part) =>
      part
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    )
    .join(" → ");
}

function buildIncidentAttachment(
  inc: ClaudeIncidentAnalysis,
  ts: number
): SlackAttachment {
  const color = SEV_COLOR[inc.sev] ?? "#888888";
  const label = SEV_LABEL[inc.sev] ?? inc.sev;
  const platformDisplay = formatPlatformName(inc.platform);

  return {
    color,
    title: `${inc.sev}  ${platformDisplay} — ${inc.title}`,
    title_link: inc.url,
    fields: [
      {
        title: "📋 What happened",
        value: inc.what,
        short: false,
      },
      {
        title: "👥 Who is affected",
        value: inc.who,
        short: true,
      },
      {
        title: "✅ Recommended action",
        value: inc.action,
        short: true,
      },
    ],
    footer: `${label} • HZ LiveWatch`,
    ts,
    mrkdwn_in: ["text", "fields"],
  };
}

// ─── Main Export ─────────────────────────────────────────────────────────────

export function buildSlackPayload(
  analysis: ClaudeAnalysisResult,
  polledAt: string,
  totalEvents: number
): SlackPayload {
  const ts = Math.floor(new Date(polledAt).getTime() / 1000);
  const hasEvents = analysis.incidents.length > 0;

  // Separate incidents from maintenance events for ordering
  const maintenanceEvents = analysis.incidents.filter((i) => i.sev === "🔵");
  const activeIncidents = analysis.incidents.filter(
    (i) => i.sev !== "🔵" && i.sev !== "✅"
  );
  const resolvedIncidents = analysis.incidents.filter((i) => i.sev === "✅");

  // ─── Header text ──────────────────────────────────────────────────────────
  let headerText: string;
  if (!hasEvents) {
    headerText = `✅ *HZ LiveWatch — All Systems Operational*`;
  } else {
    const parts: string[] = [];
    if (activeIncidents.length > 0)
      parts.push(`${activeIncidents.length} active incident(s)`);
    if (maintenanceEvents.length > 0)
      parts.push(`${maintenanceEvents.length} maintenance window(s)`);
    if (resolvedIncidents.length > 0)
      parts.push(`${resolvedIncidents.length} resolved`);
    headerText = `🚨 *HZ LiveWatch — Incident Digest* | ${parts.join(" · ")}`;
  }

  const attachments: SlackAttachment[] = [];

  // ─── Summary attachment ──────────────────────────────────────────────────
  attachments.push({
    color: hasEvents
      ? activeIncidents.some((i) => i.sev === "🔴")
        ? "danger"
        : activeIncidents.some((i) => i.sev === "🟠")
          ? "#FF6600"
          : "warning"
      : "good",
    text: `> ${analysis.summary}`,
    footer: `HZ LiveWatch • Last checked ${new Date(polledAt).toUTCString()} • ${totalEvents} event(s) in last 24h`,
    ts,
    mrkdwn_in: ["text"],
  });

  // ─── Active incidents first (highest severity) ───────────────────────────
  const sortedActive = [...activeIncidents].sort((a, b) => {
    const order = { "🔴": 0, "🟠": 1, "🟡": 2 };
    return (order[a.sev as keyof typeof order] ?? 9) -
      (order[b.sev as keyof typeof order] ?? 9);
  });

  for (const inc of sortedActive) {
    attachments.push(buildIncidentAttachment(inc, ts));
  }

  // ─── Scheduled maintenance (🔵) ──────────────────────────────────────────
  for (const inc of maintenanceEvents) {
    attachments.push(buildIncidentAttachment(inc, ts));
  }

  // ─── Resolved incidents last ─────────────────────────────────────────────
  for (const inc of resolvedIncidents) {
    attachments.push(buildIncidentAttachment(inc, ts));
  }

  return {
    text: headerText,
    attachments,
  };
}
