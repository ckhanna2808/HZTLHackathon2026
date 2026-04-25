"use client";

import { useState, useEffect } from "react";
import { DashboardStats } from "@/lib/types";
import { Activity, AlertTriangle, Clock, Layers, Shield, Zap } from "lucide-react";

interface Props {
  stats: DashboardStats;
  activeIncidentCount?: number; // override: platform-scoped count for the current tab
}

export function StatsBar({ stats, activeIncidentCount }: Props) {
  // Live clock — ticks every second so the "Next Poll" countdown actually counts down.
  // Without this, Date.now() is evaluated once at render and never updates.
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const healthPct = Math.round((stats.operationalCount / stats.totalPlatforms) * 100);
  const displayActiveCount = activeIncidentCount ?? stats.activeIncidentCount;

  // Countdown derived from live clock (tick forces re-evaluation every second)
  const secondsToNextPoll = stats.nextPollAt
    ? Math.max(0, Math.floor((new Date(stats.nextPollAt).getTime() - Date.now()) / 1000))
    : null;

  const items = [
    {
      icon: <Shield size={15} />,
      label: "Platforms",
      value: `${stats.operationalCount} / ${stats.totalPlatforms}`,
      sub: "Operational",
      color:
        stats.operationalCount === stats.totalPlatforms
          ? "var(--status-green)"
          : "var(--status-yellow)",
    },
    {
      icon: <AlertTriangle size={15} />,
      label: "Active Incidents",
      value: displayActiveCount === 0 ? "None" : displayActiveCount,
      sub: "Right now",
      color:
        displayActiveCount === 0 ? "var(--status-green)" : "var(--status-red)",
    },
    {
      icon: <Activity size={15} />,
      label: "Incidents Today",
      value: stats.incidentsToday === 0 ? "None" : stats.incidentsToday,
      sub: "Total detected",
      color:
        stats.incidentsToday === 0 ? "var(--status-green)" : "var(--status-yellow)",
    },
    {
      icon: <Zap size={15} />,
      label: "Avg Resolution",
      value:
        stats.avgResolutionMinutes != null
          ? `${stats.avgResolutionMinutes}m`
          : "—",
      sub: "MTTR",
      color: "var(--accent-primary)",
    },
    {
      icon: <Layers size={15} />,
      label: "Global Health",
      value: `${healthPct}%`,
      sub: "All platforms",
      color:
        healthPct >= 90
          ? "var(--status-green)"
          : healthPct >= 70
          ? "var(--status-yellow)"
          : "var(--status-red)",
    },
    {
      icon: <Clock size={15} />,
      label: "Next Poll",
      // secondsToNextPoll is recomputed every render (tick forces it every 1s)
      value: secondsToNextPoll !== null ? `${secondsToNextPoll}s` : "—",
      sub: "Polling interval",
      color:
        secondsToNextPoll !== null && secondsToNextPoll <= 10
          ? "var(--status-yellow)"   // turns yellow in last 10s
          : "var(--accent-cyan)",
    },
  ];

  // Suppress unused-variable lint for tick — it's only used to force re-renders
  void tick;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: 12,
        marginBottom: 24,
      }}
    >
      {items.map((item) => (
        <div
          key={item.label}
          className="glass-card animate-slide-up"
          style={{ padding: "14px 16px" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 8,
              color: item.color,
            }}
          >
            {item.icon}
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.07em",
                color: "var(--text-muted)",
              }}
            >
              {item.label}
            </span>
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: item.color,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              marginBottom: 2,
              fontVariantNumeric: "tabular-nums",  // prevents layout shift as digits change
            }}
          >
            {item.value}
          </div>
          <div style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 500 }}>
            {item.sub}
          </div>
        </div>
      ))}
    </div>
  );
}
