"use client";

import { Platform, SystemStatus } from "@/lib/types";
import {
  Triangle,
  Globe,
  GitBranch,
  Cloud,
  Package,
  Layers,
  LayoutGrid,
  Bell,
  ChevronRight,
} from "lucide-react";

interface SidebarPlatform {
  id: Platform | "all";
  label: string;
  status?: SystemStatus;
}

interface SidebarProps {
  platforms: SidebarPlatform[];
  selected: string;
  onSelect: (id: string) => void;
  activeIncidentCount: number;
  globalHealth: number;
}

const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  all: <LayoutGrid size={15} />,
  vercel: <Triangle size={13} strokeWidth={2.5} />,
  netlify: <Globe size={14} />,
  github: <GitBranch size={14} />,
  cloudflare: <Cloud size={14} />,
  npm: <Package size={14} />,
  sitecore: <Layers size={14} />,
};

const STATUS_COLOR: Record<SystemStatus | "unknown", string> = {
  operational: "var(--status-green)",
  degraded_performance: "var(--status-yellow)",
  partial_outage: "var(--status-orange)",
  major_outage: "var(--status-red)",
  unknown: "var(--status-gray)",
};

export function Sidebar({
  platforms,
  selected,
  onSelect,
  activeIncidentCount,
  globalHealth,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      {/* Logo area */}
      <div
        style={{
          padding: "20px 16px 16px",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div
          style={{
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: "0.1em",
            color: "var(--text-muted)",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Navigation
        </div>

        {/* Dashboard link */}
        <button
          onClick={() => onSelect("all")}
          className={`sidebar-nav-item ${selected === "all" ? "active" : ""}`}
          style={{ width: "100%", border: "none", textAlign: "left" }}
        >
          <LayoutGrid size={15} />
          <span>All Platforms</span>
          {activeIncidentCount > 0 && (
            <span
              style={{
                marginLeft: "auto",
                background: "var(--status-red)",
                color: "#fff",
                fontSize: 10,
                fontWeight: 700,
                borderRadius: 999,
                padding: "1px 6px",
              }}
            >
              {activeIncidentCount}
            </span>
          )}
        </button>
      </div>

      {/* Platforms */}
      <div style={{ padding: "12px 0", flex: 1 }}>
        <div
          style={{
            padding: "0 16px 8px",
            fontSize: 16,

            fontWeight: 700,
            letterSpacing: "0.1em",
            color: "var(--text-muted)",
            textTransform: "uppercase",
          }}
        >
          Platforms
        </div>
        {platforms
          .filter((p) => p.id !== "all")
          .map((p) => {
            const statusColor = p.status
              ? (STATUS_COLOR[p.status] ?? STATUS_COLOR.unknown)
              : "var(--status-gray)";
            const isActive = selected === p.id;
            return (
              <button
                key={p.id}
                onClick={() => onSelect(p.id)}
                className={`sidebar-nav-item ${isActive ? "active" : ""}`}
                style={{ width: "100%", border: "none", textAlign: "left" }}
              >
                <span
                  style={{
                    color: isActive
                      ? "var(--accent-primary)"
                      : "var(--text-muted)",
                  }}
                >
                  {PLATFORM_ICONS[p.id]}
                </span>
                <span style={{ flex: 1 }}>{p.label}</span>
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: statusColor,
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
              </button>
            );
          })}
      </div>

      {/* Bottom section */}
      <div
        style={{
          padding: "12px 0 16px",
          borderTop: "1px solid var(--border-subtle)",
        }}
      >
        <div
          style={{
            padding: "0 16px 10px",
            fontSize: 16,

            fontWeight: 700,
            letterSpacing: "0.1em",
            color: "var(--text-muted)",
            textTransform: "uppercase",
          }}
        >
          Quick Links
        </div>

        <button
          className="sidebar-nav-item"
          style={{ width: "100%", border: "none", textAlign: "left" }}
          onClick={() => onSelect("incidents")}
        >
          <Bell size={14} />
          <span>Incidents</span>
          {activeIncidentCount > 0 && (
            <ChevronRight
              size={12}
              style={{ marginLeft: "auto", color: "var(--text-muted)" }}
            />
          )}
        </button>

        {/* Global health score */}
        <div
          style={{
            margin: "12px 8px 0",
            padding: "12px 12px",
            borderRadius: 10,
            background: "var(--bg-glass)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <span
              style={{
                fontSize: 16,

                color: "var(--text-muted)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Global Health
            </span>
            <span
              style={{
                fontSize: 15,
                fontWeight: 800,
                color:
                  globalHealth >= 90
                    ? "var(--status-green)"
                    : globalHealth >= 70
                      ? "var(--status-yellow)"
                      : "var(--status-red)",
              }}
            >
              {globalHealth}%
            </span>
          </div>
          <div
            style={{
              height: 4,
              borderRadius: 2,
              background: "var(--border-subtle)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${globalHealth}%`,
                borderRadius: 2,
                background:
                  globalHealth >= 90
                    ? "var(--status-green)"
                    : globalHealth >= 70
                      ? "var(--status-yellow)"
                      : "var(--status-red)",
                transition: "width 0.8s ease",
              }}
            />
          </div>
          <div
            style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 5 }}
          >
            Across all monitored platforms
          </div>
        </div>
      </div>
    </aside>
  );
}
