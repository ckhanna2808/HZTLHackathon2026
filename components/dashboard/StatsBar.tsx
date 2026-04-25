"use client";

import { DashboardStats } from "@/lib/types";
import { Activity, AlertTriangle, Clock, Layers, Shield, Zap } from "lucide-react";

interface Props {
  stats: DashboardStats;
}

export function StatsBar({ stats }: Props) {
  const healthPct = Math.round((stats.operationalCount / stats.totalPlatforms) * 100);

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
      value: stats.activeIncidentCount === 0 ? "None" : stats.activeIncidentCount,
      sub: "Right now",
      color:
        stats.activeIncidentCount === 0 ? "var(--status-green)" : "var(--status-red)",
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
      value: stats.nextPollAt
        ? (() => {
            const s = Math.max(
              0,
              Math.floor((new Date(stats.nextPollAt).getTime() - Date.now()) / 1000)
            );
            return `${s}s`;
          })()
        : "—",
      sub: "Cron interval",
      color: "var(--accent-secondary)",
    },
  ];

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
