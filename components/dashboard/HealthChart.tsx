"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";
import { PlatformStatus } from "@/lib/types";
import { TrendingUp } from "lucide-react";

interface Props {
  platforms: PlatformStatus[];
}

function getHealthColor(health: number): string {
  if (health >= 95) return "#10b981";
  if (health >= 80) return "#f59e0b";
  if (health >= 50) return "#f97316";
  return "#ef4444";
}

export function HealthChart({ platforms }: Props) {
  const data = platforms.map((p) => ({
    name: p.name,
    health: p.healthPercent,
    incidents: p.activeIncidents.length,
    color: getHealthColor(p.healthPercent),
  }));

  return (
    <div className="glass-card" style={{ padding: "18px 20px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 20,
        }}
      >
        <TrendingUp size={15} color="var(--accent-blue)" />
        <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>
          Platform Health Overview
        </span>
        <span
          style={{
            marginLeft: "auto",
            fontSize: 11,
            color: "var(--text-muted)",
          }}
        >
          Current snapshot
        </span>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} barSize={32} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid
            vertical={false}
            stroke="rgba(255,255,255,0.05)"
            strokeDasharray="4 4"
          />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "var(--text-muted)", fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 10, fill: "var(--text-muted)" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip
            contentStyle={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border-default)",
              borderRadius: 10,
              fontSize: 12,
              color: "var(--text-primary)",
              boxShadow: "var(--shadow-elevated)",
            }}
            labelStyle={{ fontWeight: 700, marginBottom: 4, color: "var(--text-primary)" }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter={(value: any, name: any) => [
              name === "health" ? `${value}%` : value,
              name === "health" ? "Health" : "Incidents",
            ]}
            cursor={{ fill: "rgba(255,255,255,0.03)", radius: 6 }}
          />
          <Bar dataKey="health" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.85} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 20,
          marginTop: 12,
          flexWrap: "wrap",
        }}
      >
        {[
          { color: "#10b981", label: "≥95% Healthy" },
          { color: "#f59e0b", label: "80–94% Degraded" },
          { color: "#f97316", label: "50–79% Partial" },
          { color: "#ef4444", label: "<50% Outage" },
        ].map((item) => (
          <div
            key={item.label}
            style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, color: "var(--text-muted)" }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                background: item.color,
                display: "inline-block",
              }}
            />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
