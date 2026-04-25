"use client";

import { PlatformStatus, SystemStatus } from "@/lib/types";
import { RingProgress } from "@/components/ui/RingProgress";
import {
  Triangle,
  Globe,
  GitBranch,
  Cloud,
  Package,
  Layers,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  vercel: <Triangle size={20} strokeWidth={2} />,
  netlify: <Globe size={20} />,
  github: <GitBranch size={20} />,
  cloudflare: <Cloud size={20} />,
  npm: <Package size={20} />,
  sitecore: <Layers size={20} />,
};

/** Returns the CSS variable for a platform's brand colour, e.g. "var(--platform-vercel)".
 *  The actual colour values switch automatically with [data-theme] in globals.css.
 */
function platformColorVar(platform: string): string {
  return `var(--platform-${platform}, var(--text-secondary))`;
}

const STATUS_CARD_CLASS: Record<SystemStatus, string> = {
  operational: "card-operational",
  degraded_performance: "card-degraded",
  partial_outage: "card-outage",
  major_outage: "card-outage",
  unknown: "",
};

const STATUS_LABEL: Record<SystemStatus, string> = {
  operational: "Operational",
  degraded_performance: "Degraded Performance",
  partial_outage: "Partial Outage",
  major_outage: "Major Outage",
  unknown: "Unknown",
};

const STATUS_COLOR: Record<SystemStatus, string> = {
  operational: "var(--status-green)",
  degraded_performance: "var(--status-yellow)",
  partial_outage: "var(--status-orange)",
  major_outage: "var(--status-red)",
  unknown: "var(--status-gray)",
};

interface Props {
  platform: PlatformStatus;
  animationDelay?: number;
}

export function PlatformCard({ platform, animationDelay = 0 }: Props) {
  const [expanded, setExpanded] = useState(false);
  const icon = PLATFORM_ICONS[platform.platform];
  const colorVar = platformColorVar(platform.platform);
  const statusColor = STATUS_COLOR[platform.status] ?? STATUS_COLOR.unknown;
  const cardClass = STATUS_CARD_CLASS[platform.status] ?? "";
  const hasIncidents = platform.activeIncidents.length > 0;

  const lastUpdated = platform.updatedAt
    ? formatDistanceToNow(new Date(platform.updatedAt), { addSuffix: true })
    : "-";

  return (
    <div
      className={`glass-card ${cardClass} animate-slide-up`}
      style={{
        padding: "20px",
        animationDelay: `${animationDelay}ms`,
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
      onClick={() => setExpanded((e) => !e)}
    >
      {/* Top row */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        {/* Icon */}
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: `color-mix(in srgb, ${colorVar} 9%, transparent)`,
            border: `1px solid color-mix(in srgb, ${colorVar} 18%, transparent)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: colorVar,
            flexShrink: 0,
            transition: "background 220ms ease, border-color 220ms ease, color 220ms ease",
          }}
        >
          {icon}
        </div>

        {/* Name + status */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.01em",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {platform.name}
          </div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: statusColor,
              marginTop: 2,
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: statusColor,
                display: "inline-block",
                flexShrink: 0,
                ...(platform.status !== "operational" && platform.status !== "unknown"
                  ? { animation: "pulse-dot 1.8s ease-in-out infinite" }
                  : {}),
              }}
            />
            {STATUS_LABEL[platform.status]}
          </div>
        </div>

        {/* Ring */}
        <RingProgress value={platform.healthPercent} size={56} strokeWidth={4} />
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "flex",
          gap: 0,
          marginTop: 16,
          paddingTop: 14,
          borderTop: "1px solid var(--border-subtle)",
        }}
      >
        <StatCell
          label="Components"
          value={platform.components.length || "-"}
        />
        <StatCell
          label="Incidents"
          value={hasIncidents ? platform.activeIncidents.length : "None"}
          highlight={hasIncidents}
          color={hasIncidents ? "var(--status-red)" : "var(--status-green)"}
        />
        <StatCell label="Updated" value={lastUpdated} small />
      </div>

      {/* Incident alert strip */}
      {hasIncidents && (
        <div
          style={{
            marginTop: 12,
            padding: "8px 12px",
            borderRadius: 8,
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.2)",
            fontSize: 12,
            color: "var(--status-red)",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <AlertCircle size={12} />
          <span style={{ fontWeight: 500 }}>
            {platform.activeIncidents[0].title}
          </span>
        </div>
      )}

      {/* Expanded component list */}
      {expanded && platform.components.length > 0 && (
        <div
          style={{
            marginTop: 12,
            animation: "slide-up 0.2s ease-out both",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--text-muted)",
              marginBottom: 6,
            }}
          >
            Components
          </div>
          {/* Scrollable - shows ALL components, non-operational sorted first */}
          <div
            style={{
              maxHeight: 220,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 3,
              paddingRight: 2,
            }}
          >
            {[...platform.components]
              .sort((a, b) => {
                // Non-operational first
                const order = { major_outage: 0, partial_outage: 1, degraded_performance: 2, operational: 3, unknown: 4 };
                return (order[a.status] ?? 4) - (order[b.status] ?? 4);
              })
              .map((c) => {
                const compColor = STATUS_COLOR[c.status] ?? STATUS_COLOR.unknown;
                return (
                  <div
                    key={c.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "4px 8px",
                      borderRadius: 6,
                      background: "var(--bg-glass)",
                      fontSize: 12,
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: compColor,
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ flex: 1, color: "var(--text-secondary)" }}>{c.name}</span>
                    <span style={{ fontSize: 10, color: compColor, fontWeight: 600 }}>
                      {STATUS_LABEL[c.status]}
                    </span>
                  </div>
                );
              })}
          </div>
          <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 4, textAlign: "right" }}>
            {platform.components.length} components total
          </div>
        </div>
      )}


      {/* Expand toggle */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 10,
          color: "var(--text-muted)",
        }}
      >
        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </div>
    </div>
  );
}

function StatCell({
  label,
  value,
  highlight,
  color,
  small,
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
  color?: string;
  small?: boolean;
}) {
  return (
    <div style={{ flex: 1, textAlign: "center" }}>
      <div
        style={{
          fontSize: small ? 11 : 14,
          fontWeight: 700,
          color: highlight ? color : "var(--text-primary)",
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 500, marginTop: 1 }}>
        {label}
      </div>
    </div>
  );
}
