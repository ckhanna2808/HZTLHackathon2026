"use client";

import { useEffect, useMemo, useState } from "react";
import { DashboardStats } from "@/lib/types";
import {
  Activity,
  AlertTriangle,
  Clock,
  Layers,
  Shield,
  Zap,
} from "lucide-react";

interface Props {
  stats: DashboardStats;
  activeIncidentCount?: number; // override: platform-scoped count for the current tab
}

export function StatsBar({ stats, activeIncidentCount }: Props) {
  const [nowMs, setNowMs] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNowMs(Date.now());
    const init = window.setTimeout(tick, 0);
    const interval = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(init);
      window.clearInterval(interval);
    };
  }, []);

  const healthPct = Math.round(
    (stats.operationalCount / stats.totalPlatforms) * 100,
  );
  const displayActiveCount = activeIncidentCount ?? stats.activeIncidentCount;

  const secondsToNextPoll = useMemo(() => {
    if (!stats.nextPollAt || nowMs == null) return null;
    return Math.max(
      0,
      Math.floor((new Date(stats.nextPollAt).getTime() - nowMs) / 1000),
    );
  }, [stats.nextPollAt, nowMs]);

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
        stats.incidentsToday === 0
          ? "var(--status-green)"
          : "var(--status-yellow)",
    },
    {
      icon: <Zap size={15} />,
      label: "Avg Resolution",
      value:
        stats.avgResolutionMinutes != null
          ? `${stats.avgResolutionMinutes}m`
          : "-",
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
      value: secondsToNextPoll !== null ? `${secondsToNextPoll}s` : "-",
      sub: "Polling interval",
      color:
        secondsToNextPoll !== null && secondsToNextPoll <= 10
          ? "var(--status-yellow)" // turns yellow in last 10s
          : "var(--accent-cyan)",
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
                fontSize: 12,
                fontWeight: 700,
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
              fontVariantNumeric: "tabular-nums", // prevents layout shift as digits change
            }}
          >
            {item.value}
          </div>
          <div
            style={{
              fontSize: 12,
              color: "var(--text-muted)",
              fontWeight: 500,
            }}
          >
            {item.sub}
          </div>
        </div>
      ))}
    </div>
  );
}
