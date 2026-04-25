"use client";

import { LiveWatchIncident } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import {
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle,
  Calendar,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";

interface Props {
  incident: LiveWatchIncident;
  index?: number;
}

const IMPACT_CONFIG = {
  critical: {
    icon: <AlertCircle size={14} />,
    color: "var(--status-red)",
    bg: "var(--status-red-dim)",
    border: "rgba(239,68,68,0.25)",
    label: "Critical",
  },
  major: {
    icon: <AlertTriangle size={14} />,
    color: "var(--status-orange)",
    bg: "var(--status-orange-dim)",
    border: "rgba(249,115,22,0.25)",
    label: "Major",
  },
  minor: {
    icon: <Info size={14} />,
    color: "var(--status-yellow)",
    bg: "var(--status-yellow-dim)",
    border: "rgba(245,158,11,0.25)",
    label: "Minor",
  },
  none: {
    icon: <CheckCircle size={14} />,
    color: "var(--status-green)",
    bg: "var(--status-green-dim)",
    border: "rgba(16,185,129,0.25)",
    label: "None",
  },
};

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  investigating: { label: "Investigating", color: "var(--status-red)" },
  identified: { label: "Identified", color: "var(--status-orange)" },
  monitoring: { label: "Monitoring", color: "var(--status-yellow)" },
  resolved: { label: "Resolved", color: "var(--status-green)" },
  scheduled: { label: "Scheduled", color: "var(--accent-primary)" },
  operational: { label: "Operational", color: "var(--status-green)" },
};

/** Returns the CSS variable for a platform's brand colour.
 *  Values are defined per-theme in globals.css - no JS theme check needed.
 */
function platformColorVar(source: string): string {
  return `var(--platform-${source}, var(--text-secondary))`;
}

export function IncidentCard({ incident, index = 0 }: Props) {
  const [expanded, setExpanded] = useState(false);
  const config = IMPACT_CONFIG[incident.impact] ?? IMPACT_CONFIG.none;
  const statusInfo =
    STATUS_LABELS[incident.status] ?? STATUS_LABELS.investigating;
  const platformColor = platformColorVar(incident.source);
  const isResolved = incident.status === "resolved";

  const timeAgo = incident.startedAt
    ? formatDistanceToNow(new Date(incident.startedAt), { addSuffix: true })
    : "Unknown";

  return (
    <div
      className="animate-slide-in"
      style={{
        animationDelay: `${index * 60}ms`,
        padding: "12px 14px",
        borderRadius: 10,
        background: "var(--bg-glass)",
        border: `1px solid ${isResolved ? "var(--border-subtle)" : config.border}`,
        borderLeft: `3px solid ${isResolved ? "var(--status-green)" : config.color}`,
        opacity: isResolved ? 0.7 : 1,
        cursor: "pointer",
        transition: "background 0.15s ease, border-color 0.15s ease",
      }}
      onClick={() => setExpanded((e) => !e)}
    >
      {/* Top row */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
        {/* Severity icon */}
        <div
          style={{
            color: config.color,
            marginTop: 1,
            flexShrink: 0,
          }}
        >
          {incident.status === "scheduled" ? (
            <Calendar size={14} />
          ) : (
            config.icon
          )}
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Platform + product */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 3,
            }}
          >
            <span
              style={{
                fontSize: 15,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: platformColor,
              }}
            >
              {incident.source}
            </span>
            {incident.product && (
              <>
                <span style={{ color: "var(--text-muted)", fontSize: 10 }}>
                  ›
                </span>
                <span
                  style={{
                    fontSize: 15,
                    color: "var(--text-muted)",
                    fontWeight: 500,
                  }}
                >
                  {incident.product}
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: "var(--text-primary)",
              lineHeight: 1.3,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: expanded ? undefined : 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {incident.title}
          </div>

          {/* Time + status row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginTop: 6,
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontSize: 15, color: "var(--text-muted)" }}>
              {timeAgo}
            </span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 3,
                padding: "1px 7px",
                borderRadius: 999,
                fontSize: 15,
                fontWeight: 600,
                color: statusInfo.color,
                background: `${statusInfo.color}15`,
                border: `1px solid ${statusInfo.color}30`,
              }}
            >
              {statusInfo.label}
            </span>
            <span
              style={{
                display: "inline-flex",
                padding: "1px 7px",
                borderRadius: 999,
                fontSize: 15,
                fontWeight: 600,
                color: config.color,
                background: config.bg,
                border: `1px solid ${config.border}`,
              }}
            >
              {config.label}
            </span>
          </div>
        </div>

        {/* Expand + link */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            flexShrink: 0,
          }}
        >
          <span style={{ color: "var(--text-muted)" }}>
            {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </span>
          {incident.url && (
            <a
              href={incident.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--text-muted)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={11} />
            </a>
          )}
        </div>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div
          style={{
            marginTop: 10,
            paddingTop: 10,
            borderTop: "1px solid var(--border-subtle)",
            animation: "slide-up 0.2s ease-out both",
          }}
        >
          {incident.description && (
            <p
              style={{
                fontSize: 15,
                color: "var(--text-secondary)",
                lineHeight: 1.5,
                margin: 0,
                marginBottom: 8,
              }}
            >
              {incident.description}
            </p>
          )}
          {incident.affectedComponents.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {incident.affectedComponents.map((c) => (
                <span
                  key={c}
                  style={{
                    padding: "2px 7px",
                    borderRadius: 4,
                    fontSize: 15,
                    background: "var(--bg-glass)",
                    border: "1px solid var(--border-subtle)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
