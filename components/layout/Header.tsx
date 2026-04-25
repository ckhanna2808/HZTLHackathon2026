"use client";

import { useState, useEffect } from "react";
import { Activity, Bell, RefreshCw, Wifi, WifiOff } from "lucide-react";

interface HeaderProps {
  activeIncidentCount: number;
  lastPollAt: string | null;
  isLoading?: boolean;
  onRefresh?: () => void;
}

export function Header({
  activeIncidentCount,
  lastPollAt,
  isLoading,
  onRefresh,
}: HeaderProps) {
  const [now, setNow] = useState(new Date());
  const [online, setOnline] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setNow(new Date()), 1000);
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      clearInterval(timer);
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  const utcTime = mounted
    ? now.toLocaleTimeString("en-GB", {
        timeZone: "UTC",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "--:--:--";

  const relativeLastPoll = lastPollAt
    ? (() => {
        const diff = Math.floor((Date.now() - new Date(lastPollAt).getTime()) / 1000);
        if (diff < 5) return "just now";
        if (diff < 60) return `${diff}s ago`;
        return `${Math.floor(diff / 60)}m ago`;
      })()
    : "—";

  return (
    <header className="top-header">
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-cyan) 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "var(--shadow-glow-blue)",
          }}
        >
          <Activity size={16} color="#fff" />
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: "-0.02em" }}>
            <span className="text-gradient-hero">HZTL LiveWatch</span>
          </div>
          <div
            style={{ fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.08em", fontWeight: 500 }}
          >
            ALWAYS WATCHING
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Status indicators */}
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        {/* Network status */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            fontSize: 12,
            color: online ? "var(--status-green)" : "var(--status-red)",
          }}
        >
          {online ? <Wifi size={13} /> : <WifiOff size={13} />}
          <span style={{ fontWeight: 500 }}>{online ? "Live" : "Offline"}</span>
        </div>

        {/* Last polled */}
        <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
          Polled{" "}
          <span style={{ color: "var(--text-secondary)", fontWeight: 500 }}>
            {relativeLastPoll}
          </span>
        </div>

        {/* UTC Clock */}
        <div
          className="font-mono"
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--text-primary)",
            background: "var(--bg-glass)",
            border: "1px solid var(--border-subtle)",
            borderRadius: 6,
            padding: "4px 10px",
          }}
        >
          {utcTime}{" "}
          <span style={{ color: "var(--text-muted)", fontSize: 10 }}>UTC</span>
        </div>

        {/* Active incidents badge */}
        {activeIncidentCount > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 12px",
              borderRadius: 999,
              background: "var(--status-red-dim)",
              border: "1px solid rgba(239,68,68,0.35)",
              fontSize: 12,
              fontWeight: 600,
              color: "var(--status-red)",
            }}
          >
            <Bell size={12} />
            <span>{activeIncidentCount} Active</span>
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "var(--status-red)",
                animation: "pulse-dot 1.4s ease-in-out infinite",
              }}
            />
          </div>
        )}

        {/* Refresh button */}
        <button
          onClick={onRefresh}
          disabled={isLoading}
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "var(--bg-glass)",
            border: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "var(--text-secondary)",
            transition: "all 0.15s ease",
          }}
          title="Refresh now"
        >
          <RefreshCw
            size={13}
            style={{ animation: isLoading ? "spin-slow 1s linear infinite" : "none" }}
          />
        </button>
      </div>
    </header>
  );
}
