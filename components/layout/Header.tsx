"use client";

import { useState, useEffect } from "react";
import { Activity, Bell, RefreshCw, Wifi, WifiOff, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/layout/ThemeProvider";

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
  const { theme, toggleTheme } = useTheme();

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
            width: 34,
            height: 34,
            borderRadius: 9,
            background: "linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "var(--shadow-glow-blue)",
            flexShrink: 0,
          }}
        >
          <Activity size={16} color="#fff" />
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.02em" }}>
            <span className="text-gradient-hero">HZTL LiveWatch</span>
          </div>
          <div
            style={{ fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.06em", fontWeight: 500 }}
          >
            ALWAYS WATCHING
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Status indicators */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        {/* Network status */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            fontSize: 12,
            fontWeight: 500,
            color: online ? "var(--status-green)" : "var(--status-red)",
          }}
        >
          {online ? <Wifi size={13} /> : <WifiOff size={13} />}
          <span>{online ? "Live" : "Offline"}</span>
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
            fontSize: 12,
            fontWeight: 500,
            color: "var(--text-primary)",
            background: "var(--bg-glass)",
            border: "1px solid var(--border-subtle)",
            borderRadius: 7,
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
              border: "1px solid color-mix(in srgb, var(--status-red) 35%, transparent)",
              fontSize: 12,
              fontWeight: 600,
              color: "var(--status-red)",
            }}
          >
            <Bell size={12} />
            <span>{activeIncidentCount} Active</span>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--status-red)",
                animation: "pulse-dot 1.4s ease-in-out infinite",
              }}
            />
          </div>
        )}

        {/* Refresh button */}
        <button
          id="refresh-btn"
          onClick={onRefresh}
          disabled={isLoading}
          className="theme-toggle"
          title="Refresh data"
          aria-label="Refresh data"
        >
          <RefreshCw
            size={14}
            style={{ animation: isLoading ? "spin-slow 1s linear infinite" : "none" }}
          />
        </button>

        {/* Theme toggle */}
        <button
          id="theme-toggle-btn"
          onClick={toggleTheme}
          className="theme-toggle"
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {mounted && theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>
    </header>
  );
}
