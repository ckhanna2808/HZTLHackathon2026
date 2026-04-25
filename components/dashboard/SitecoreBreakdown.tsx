"use client";

import { useState } from "react";
import {
  type SitecoreProduct,
  type SystemStatus,
  type LiveWatchIncident,
} from "@/lib/types";
import {
  Layers,
  ChevronDown,
  ChevronUp,
  Clock,
  AlertTriangle,
  CheckCircle,
  Info,
  Flame,
  ShieldAlert,
  ExternalLink,
} from "lucide-react";

interface SitecoreProductStatusEnriched {
  product: SitecoreProduct;
  name: string;
  status: SystemStatus;
  detectedBy: string;
  lastChecked: string;
  incident: LiveWatchIncident | null;
  history?: LiveWatchIncident[];
  incidentCount30d?: number;
  uptime30d?: number;
}

interface Props {
  products: Record<string, SitecoreProductStatusEnriched>;
}

// ─── Status config ─────────────────────────────────────────────────────────────

const STATUS_COLOR: Record<SystemStatus, string> = {
  operational: "var(--status-green)",
  degraded_performance: "var(--status-yellow)",
  partial_outage: "var(--status-orange, #f97316)",
  major_outage: "var(--status-red)",
  unknown: "var(--status-gray)",
};

const STATUS_LABEL: Record<SystemStatus, string> = {
  operational: "Operational",
  degraded_performance: "Degraded",
  partial_outage: "Partial Outage",
  major_outage: "Major Outage",
  unknown: "Unknown",
};

const PRIORITY_LABEL: Record<string, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  critical: {
    label: "Outage",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.12)",
    icon: <Flame size={11} />,
  },
  major: {
    label: "Degraded",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.12)",
    icon: <AlertTriangle size={11} />,
  },
  minor: {
    label: "Information",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.12)",
    icon: <Info size={11} />,
  },
  none: {
    label: "Resolved",
    color: "#10b981",
    bg: "rgba(16,185,129,0.12)",
    icon: <CheckCircle size={11} />,
  },
};

const PRODUCT_ABBR: Record<string, string> = {
  "xm-cloud": "XMC",
  "content-hub": "CH",
  "search": "SRH",
  "cdp": "CDP",
  "personalize": "PRS",
  "send": "SND",
  "ai": "AI",
  "managed-cloud": "MCS",
  "cloud-portal": "CLD",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleString("en-US", {
    month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit",
    hour12: false,
  });
}

function HistoryBar({ incidents }: { incidents: LiveWatchIncident[] }) {
  const slots = 30;
  const now = Date.now();
  const dayMs = 86400000;

  const days = Array.from({ length: slots }, (_, i) => {
    const start = now - (slots - 1 - i) * dayMs;
    const end = start + dayMs;
    const hit = incidents.find((inc) => {
      const t = new Date(inc.startedAt).getTime();
      return t >= start && t < end;
    });
    return hit?.overallStatus ?? "operational";
  });

  return (
    <div style={{ display: "flex", gap: 2, alignItems: "flex-end", height: 18 }}>
      {days.map((s, i) => (
        <div
          key={i}
          title={s}
          style={{
            flex: 1,
            height: s === "operational" ? 10 : s === "degraded_performance" ? 14 : 18,
            borderRadius: 2,
            background: STATUS_COLOR[s as SystemStatus] ?? STATUS_COLOR.unknown,
            opacity: s === "operational" ? 0.3 : 1,
            transition: "height 0.2s",
          }}
        />
      ))}
    </div>
  );
}

// ─── Active Incident Card (prominent banner) ──────────────────────────────────

function ActiveIncidentBanner({ incident }: { incident: LiveWatchIncident }) {
  const cfg = PRIORITY_LABEL[incident.impact] ?? PRIORITY_LABEL.minor;
  const isSerious = incident.impact === "critical" || incident.impact === "major";

  return (
    <div
      style={{
        padding: "12px 14px",
        borderRadius: 10,
        background: cfg.bg,
        border: `1px solid ${cfg.color}40`,
        marginBottom: 6,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Accent line */}
      <div
        style={{
          position: "absolute",
          left: 0, top: 0, bottom: 0,
          width: 3,
          background: cfg.color,
          borderRadius: "3px 0 0 3px",
        }}
      />

      <div style={{ paddingLeft: 8 }}>
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
          {/* Priority badge */}
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              padding: "2px 8px",
              borderRadius: 999,
              fontSize: 10,
              fontWeight: 700,
              color: cfg.color,
              background: cfg.bg,
              border: `1px solid ${cfg.color}50`,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            {cfg.icon}
            {cfg.label}
          </span>

          {/* Product */}
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: "var(--text-muted)",
              background: "var(--bg-glass)",
              padding: "2px 7px",
              borderRadius: 5,
            }}
          >
            {incident.affectedComponents[0] ?? "Sitecore"}
          </span>

          {/* Pulse dot for serious incidents */}
          {isSerious && (
            <div style={{ position: "relative", width: 8, height: 8, marginLeft: "auto" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: cfg.color }} />
              <span
                style={{
                  position: "absolute", inset: 0, borderRadius: "50%",
                  background: cfg.color,
                  animation: "pulse-ring 1.8s ease-out infinite",
                }}
              />
            </div>
          )}

          {/* Time */}
          <span style={{ fontSize: 10, color: "var(--text-muted)", marginLeft: isSerious ? 0 : "auto" }}>
            {timeAgo(incident.startedAt)}
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "var(--text-primary)",
            lineHeight: 1.4,
            marginBottom: 4,
          }}
        >
          {incident.title}
        </div>

        {/* Description */}
        {incident.description && incident.description !== incident.title && (
          <div
            style={{
              fontSize: 11,
              color: "var(--text-muted)",
              lineHeight: 1.5,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              marginBottom: 5,
            }}
          >
            {incident.description.replace(/<[^>]+>/g, "")}
          </div>
        )}

        {/* Footer row: date + link */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
          <Clock size={10} color="var(--text-muted)" />
          <span style={{ fontSize: 10, color: "var(--text-muted)" }}>
            Started: {formatDate(incident.startedAt)}
          </span>
          {incident.affectedRegions.length > 0 && (
            <>
              <span style={{ color: "var(--border-subtle)" }}>·</span>
              <span style={{ fontSize: 10, color: "var(--text-muted)" }}>
                {incident.affectedRegions.join(", ")}
              </span>
            </>
          )}
          <a
            href={incident.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginLeft: "auto",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontSize: 10,
              fontWeight: 600,
              color: cfg.color,
              textDecoration: "none",
            }}
          >
            Details <ExternalLink size={9} />
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function SitecoreBreakdown({ products }: Props) {
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  const entries = Object.values(products) as SitecoreProductStatusEnriched[];
  const allOperational = entries.every((p) => p.status === "operational");
  const degradedCount = entries.filter((p) => p.status !== "operational").length;

  // Collect all active incidents — this is what the user was asking about
  const activeIncidents = entries
    .flatMap((p) => (p.incident ? [p.incident] : []))
    .filter((inc, idx, arr) => arr.findIndex((x) => x.id === inc.id) === idx) // deduplicate
    .sort((a, b) => {
      // Sort: critical > major > minor, then by date
      const impactOrder = { critical: 0, major: 1, minor: 2, none: 3 };
      const iA = impactOrder[a.impact as keyof typeof impactOrder] ?? 3;
      const iB = impactOrder[b.impact as keyof typeof impactOrder] ?? 3;
      if (iA !== iB) return iA - iB;
      return new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime();
    });

  return (
    <div className="glass-card" style={{ padding: "20px 22px" }}>
      {/* ── Header ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <div
          style={{
            width: 32, height: 32, borderRadius: 8,
            background: "rgba(235,31,31,0.12)",
            border: "1px solid rgba(235,31,31,0.22)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}
        >
          <Layers size={15} color="#eb1f1f" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>
            Sitecore Product Suite
          </div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 1 }}>
            9 products · Live incidents · 30-day history
          </div>
        </div>
        {/* Status badge */}
        {allOperational ? (
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            padding: "4px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600,
            color: "var(--status-green)", background: "var(--status-green-dim)",
            border: "1px solid rgba(16,185,129,0.25)",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--status-green)", display: "inline-block" }} />
            All Operational
          </span>
        ) : (
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            padding: "4px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600,
            color: "var(--status-red)", background: "var(--status-red-dim)",
            border: "1px solid rgba(239,68,68,0.3)",
          }}>
            <ShieldAlert size={12} />
            {degradedCount} Affected
          </span>
        )}
      </div>

      {/* ── Active Incidents (most important!) ── */}
      {activeIncidents.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div style={{
            fontSize: 10, fontWeight: 700, color: "var(--text-muted)",
            textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8,
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--status-red)", display: "inline-block" }} />
            Active Events ({activeIncidents.length})
          </div>
          {activeIncidents.map((inc) => (
            <ActiveIncidentBanner key={inc.id} incident={inc} />
          ))}
        </div>
      )}

      {/* ── Product rows ── */}
      <div>
        <div style={{
          fontSize: 10, fontWeight: 700, color: "var(--text-muted)",
          textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8,
        }}>
          Product Status · Click to expand history
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {entries.map((product) => {
            const color = STATUS_COLOR[product.status] ?? STATUS_COLOR.unknown;
            const isOk = product.status === "operational";
            const isExpanded = expandedProduct === product.product;
            const history = product.history ?? [];
            const uptime = product.uptime30d ?? (isOk ? 100 : 95);
            const incidentCount = product.incidentCount30d ?? 0;
            const abbr = PRODUCT_ABBR[product.product] ?? product.product.toUpperCase().slice(0, 3);

            return (
              <div key={product.product}>
                <div
                  onClick={() => setExpandedProduct(isExpanded ? null : product.product)}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "9px 11px", borderRadius: 9,
                    background: isOk ? "var(--bg-glass)" : `${color}10`,
                    border: `1px solid ${isOk ? "var(--border-subtle)" : `${color}35`}`,
                    cursor: "pointer", transition: "all 0.18s ease",
                  }}
                  className="interactive"
                >
                  {/* Abbr */}
                  <div style={{
                    width: 36, height: 26, borderRadius: 6,
                    background: `${color}15`, border: `1px solid ${color}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 9, fontWeight: 800, letterSpacing: "0.05em", color,
                    fontFamily: '"JetBrains Mono", monospace', flexShrink: 0,
                  }}>
                    {abbr}
                  </div>

                  {/* Name + bar */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                      {/* Pulse dot */}
                      <div style={{ position: "relative", width: 7, height: 7, flexShrink: 0 }}>
                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: color }} />
                        {!isOk && (
                          <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: color, animation: "pulse-ring 1.8s ease-out infinite" }} />
                        )}
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)" }}>
                        {product.name}
                      </span>
                      {!isOk && (
                        <span style={{ fontSize: 10, fontWeight: 700, color, padding: "1px 6px", borderRadius: 999, background: `${color}18`, flexShrink: 0 }}>
                          {STATUS_LABEL[product.status]}
                        </span>
                      )}
                    </div>
                    <HistoryBar incidents={history} />
                  </div>

                  {/* Uptime */}
                  <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 8 }}>
                    <div style={{
                      fontSize: 12, fontWeight: 700,
                      color: uptime >= 99.5 ? "var(--status-green)" : uptime >= 95 ? "var(--status-yellow)" : "var(--status-red)",
                    }}>
                      {uptime.toFixed(1)}%
                    </div>
                    <div style={{ fontSize: 9, color: "var(--text-muted)", marginTop: 1 }}>
                      {incidentCount > 0 ? `${incidentCount} event${incidentCount > 1 ? "s" : ""}` : "clean"}
                    </div>
                  </div>

                  {isExpanded ? <ChevronUp size={13} color="var(--text-muted)" /> : <ChevronDown size={13} color="var(--text-muted)" />}
                </div>

                {/* Expanded history */}
                {isExpanded && (
                  <div style={{
                    margin: "2px 0 4px 10px",
                    padding: "12px 14px",
                    borderRadius: "0 0 9px 9px",
                    background: "var(--bg-glass)",
                    border: "1px solid var(--border-subtle)",
                    borderTop: "none",
                  }}>
                    {history.length === 0 ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--status-green)", fontSize: 12 }}>
                        <CheckCircle size={13} />
                        No incidents recorded — 100% uptime
                      </div>
                    ) : (
                      <>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
                          Incident History ({history.length})
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                          {history.map((inc) => (
                            <div
                              key={inc.id}
                              style={{
                                display: "flex", alignItems: "flex-start", gap: 8,
                                padding: "8px 10px", borderRadius: 8,
                                background: "var(--bg-base)",
                                border: "1px solid var(--border-subtle)",
                              }}
                            >
                              {inc.status === "resolved"
                                ? <CheckCircle size={11} color="var(--status-green)" style={{ marginTop: 1, flexShrink: 0 }} />
                                : inc.impact === "critical"
                                ? <Flame size={11} color="var(--status-red)" style={{ marginTop: 1, flexShrink: 0 }} />
                                : inc.impact === "major"
                                ? <AlertTriangle size={11} color="var(--status-yellow)" style={{ marginTop: 1, flexShrink: 0 }} />
                                : <Info size={11} color="#3b82f6" style={{ marginTop: 1, flexShrink: 0 }} />}
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                  {inc.title}
                                </div>
                                {inc.description && (
                                  <div style={{
                                    fontSize: 10, color: "var(--text-muted)", marginTop: 2,
                                    overflow: "hidden", display: "-webkit-box",
                                    WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                                  }}>
                                    {inc.description.replace(/<[^>]+>/g, "").slice(0, 160)}
                                  </div>
                                )}
                              </div>
                              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2, flexShrink: 0 }}>
                                <span style={{ fontSize: 9, color: "var(--text-muted)" }}>{timeAgo(inc.startedAt)}</span>
                                {inc.status === "resolved" && (
                                  <span style={{ fontSize: 9, color: "var(--status-green)", fontWeight: 600 }}>resolved</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Footer ── */}
      <div style={{
        marginTop: 14, paddingTop: 10, borderTop: "1px solid var(--border-subtle)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{ fontSize: 10, color: "var(--text-muted)" }}>
          Source: support.sitecore.com/status · auto-refreshed every 30s
        </span>
        <a
          href="https://support.sitecore.com/status"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: 4,
            fontSize: 10, fontWeight: 600, color: "#eb1f1f", textDecoration: "none",
          }}
        >
          Full Status <ExternalLink size={9} />
        </a>
      </div>
    </div>
  );
}
