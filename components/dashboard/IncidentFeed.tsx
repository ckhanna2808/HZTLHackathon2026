"use client";

import { useState } from "react";
import { LiveWatchIncident } from "@/lib/types";
import { IncidentCard } from "./IncidentCard";
import { ArrowDownUp, Bell, Rss } from "lucide-react";

interface Props {
  incidents: LiveWatchIncident[];
  isLoading?: boolean;
}

type SortOrder = "default" | "newest";

function sortIncidents(list: LiveWatchIncident[], order: SortOrder) {
  if (order === "default") return list;
  return [...list].sort(
    (a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime(),
  );
}

export function IncidentFeed({ incidents, isLoading }: Props) {
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");

  const active = sortIncidents(
    incidents.filter((i) => i.status !== "resolved"),
    sortOrder,
  );
  const resolved = sortIncidents(
    incidents.filter((i) => i.status === "resolved"),
    sortOrder,
  );

  return (
    <div
      className="glass-card-elevated"
      data-component="IncidentFeed"
      aria-label="Incident feed"
      style={{ display: "flex", flexDirection: "column", maxHeight: 600 }}
    >
      {/* Panel header */}
      <div
        style={{
          padding: "16px 18px 14px",
          borderBottom: "1px solid var(--border-subtle)",
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        <Bell size={14} color="var(--accent-primary)" />
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "var(--text-muted)",
          }}
        >
          Incident Feed
        </span>

        {active.length > 0 && (
          <span
            style={{
              background: "var(--status-red)",
              color: "#fff",
              fontSize: 12,
              fontWeight: 700,
              borderRadius: 999,
              padding: "2px 8px",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#fff",
                display: "inline-block",
                animation: "pulse-dot 1.2s ease-in-out infinite",
              }}
            />
            {active.length} Live
          </span>
        )}

        {/* Sort toggle */}
        <div style={{ marginLeft: "auto", display: "flex", gap: 4 }}>
          {(["default", "newest"] as SortOrder[]).map((opt) => (
            <button
              key={opt}
              onClick={() => setSortOrder(opt)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                padding: "3px 9px",
                borderRadius: 6,
                border: `1px solid ${sortOrder === opt ? "var(--accent-primary)" : "var(--border-subtle)"}`,
                background:
                  sortOrder === opt
                    ? "var(--accent-primary-dim)"
                    : "transparent",
                color:
                  sortOrder === opt
                    ? "var(--accent-primary)"
                    : "var(--text-muted)",
                fontSize: 10,
                fontWeight: 600,
                cursor: "pointer",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                transition: "all 0.15s",
              }}
              aria-label={`Sort incidents: ${opt === "default" ? "default" : "newest first"}`}
            >
              {opt === "newest" && <ArrowDownUp size={9} />}
              {opt === "default" ? "Default" : "Newest First"}
            </button>
          ))}
        </div>
      </div>

      {/* Feed content */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "12px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {isLoading && incidents.length === 0 && (
          <>
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="shimmer"
                style={{ height: 80, borderRadius: 10 }}
              />
            ))}
          </>
        )}

        {!isLoading && incidents.length === 0 && <AllClearState />}

        {/* Active */}
        {active.length > 0 && (
          <SectionHeader
            label="Active"
            count={active.length}
            color="var(--status-red)"
          />
        )}
        {active.map((inc, i) => (
          <IncidentCard key={inc.id} incident={inc} index={i} />
        ))}

        {/* Resolved */}
        {resolved.length > 0 && (
          <>
            <SectionHeader
              label="Resolved"
              count={resolved.length}
              color="var(--status-green)"
            />
            {resolved.map((inc, i) => (
              <IncidentCard key={inc.id} incident={inc} index={i} />
            ))}
          </>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "10px 16px",
          borderTop: "1px solid var(--border-subtle)",
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontSize: 12,
          color: "var(--text-muted)",
        }}
      >
        <Rss size={11} />
        <span>Auto-refreshes every 60s</span>
      </div>
    </div>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────

function SectionHeader({
  label,
  count,
  color,
}: {
  label: string;
  count: number;
  color: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        paddingBottom: 4,
        marginTop: 4,
      }}
    >
      <div style={{ height: 1, flex: 1, background: "var(--border-subtle)" }} />
      <span
        style={{
          fontSize: 12,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color,
        }}
      >
        {label}
        <span
          style={{
            marginLeft: 5,
            background: `${color}20`,
            border: `1px solid ${color}35`,
            padding: "0 5px",
            borderRadius: 3,
          }}
        >
          {count}
        </span>
      </span>
      <div style={{ height: 1, flex: 1, background: "var(--border-subtle)" }} />
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function AllClearState() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        textAlign: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "var(--status-green-dim)",
          border: "1px solid rgba(16,185,129,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: "float 3s ease-in-out infinite",
        }}
      >
        <Bell size={24} color="var(--status-green)" />
      </div>
      <div>
        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: 4,
          }}
        >
          All Clear
        </div>
        <div
          style={{ fontSize: 16, color: "var(--text-muted)", lineHeight: 1.5 }}
        >
          No active incidents detected
          <br />
          across monitored platforms
        </div>
      </div>
    </div>
  );
}
