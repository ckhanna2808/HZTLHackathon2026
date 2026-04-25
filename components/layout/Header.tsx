"use client";

import Image from "next/image";
import { useEffect, useRef, useMemo, useState } from "react";
import {
  Activity,
  Bell,
  RefreshCw,
  Wifi,
  WifiOff,
  Sun,
  Moon,
  Clock,
  ChevronDown,
  Check,
} from "lucide-react";
import {
  useTheme,
  useDisplayTimezone,
  TZ_CYCLE,
  TZ_IANA,
  TZ_LABELS,
  DisplayTimezone,
} from "@/components/layout/ThemeProvider";

interface HeaderProps {
  activeIncidentCount: number;
  lastPollAt: string | null;
  isLoading?: boolean;
  onRefresh?: () => void;
}

// ─── Timezone Dropdown ────────────────────────────────────────────────────────

function TimezoneDropdown() {
  const { displayTz, setTimezone, mounted } = useDisplayTimezone();
  const [open, setOpen] = useState(false);
  const [now, setNow] = useState(new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  // Live clock
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  const displayTime = mounted
    ? now.toLocaleTimeString("en-GB", {
        timeZone: TZ_IANA[displayTz],
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "--:--:--";

  /** Compact time preview per zone (HH:mm) for the dropdown rows */
  function previewTime(tz: DisplayTimezone) {
    return now.toLocaleTimeString("en-GB", {
      timeZone: TZ_IANA[tz],
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      {/* Trigger button */}
      <button
        id="tz-dropdown-btn"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Time zone: ${displayTz}. Click to change`}
        className="font-mono"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontSize: 12,
          fontWeight: 500,
          color: "var(--text-primary)",
          background: open ? "var(--accent-primary-dim)" : "var(--bg-glass)",
          border: `1px solid ${open ? "color-mix(in srgb, var(--accent-primary) 35%, transparent)" : "var(--border-subtle)"}`,
          borderRadius: 7,
          padding: "5px 10px",
          cursor: "pointer",
          transition: "background 150ms ease, border-color 150ms ease",
          userSelect: "none",
          whiteSpace: "nowrap",
        }}
      >
        <Clock size={11} style={{ opacity: 0.6, flexShrink: 0 }} />
        <span>{displayTime}</span>
        {/* TZ badge */}
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.04em",
            color: "var(--accent-primary)",
            background: "var(--accent-primary-dim)",
            borderRadius: 4,
            padding: "1px 5px",
            fontFamily: "Inter, system-ui, sans-serif",
          }}
        >
          {displayTz}
        </span>
        <ChevronDown
          size={11}
          style={{
            marginLeft: 1,
            color: "var(--text-muted)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 180ms ease",
            flexShrink: 0,
          }}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          role="listbox"
          aria-label="Select timezone"
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            right: 0,
            minWidth: 260,
            background: "var(--bg-primary)",
            border: "1px solid var(--border-default)",
            borderRadius: 10,
            boxShadow: "var(--shadow-elevated)",
            overflow: "hidden",
            zIndex: 100,
            animation: "slide-up 0.15s ease-out both",
          }}
        >
          {/* Panel header */}
          <div
            style={{
              padding: "9px 14px 7px",
              borderBottom: "1px solid var(--border-subtle)",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            Display Timezone
          </div>

          {/* Options */}
          {TZ_CYCLE.map((tz) => {
            const isActive = tz === displayTz;
            return (
              <button
                key={tz}
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  setTimezone(tz);
                  setOpen(false);
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "9px 14px",
                  background: isActive
                    ? "var(--accent-primary-dim)"
                    : "transparent",
                  border: "none",
                  borderBottom: "1px solid var(--border-subtle)",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background 120ms ease",
                }}
                onMouseEnter={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLElement).style.background =
                      "var(--bg-glass)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLElement).style.background =
                      "transparent";
                }}
              >
                {/* Checkmark */}
                <span
                  style={{
                    width: 14,
                    flexShrink: 0,
                    color: "var(--accent-primary)",
                  }}
                >
                  {isActive && <Check size={13} strokeWidth={2.5} />}
                </span>

                {/* Label */}
                <span style={{ flex: 1 }}>
                  <span
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: isActive ? 600 : 500,
                      color: isActive
                        ? "var(--accent-primary)"
                        : "var(--text-primary)",
                      lineHeight: 1.3,
                    }}
                  >
                    {TZ_LABELS[tz]}
                  </span>
                </span>

                {/* Live time preview */}
                <span
                  className="font-mono"
                  style={{
                    fontSize: 12,
                    color: isActive
                      ? "var(--accent-primary)"
                      : "var(--text-muted)",
                    fontWeight: 500,
                    flexShrink: 0,
                  }}
                >
                  {mounted ? previewTime(tz) : "--:--"}
                </span>
              </button>
            );
          })}

          {/* Footer note */}
          <div
            style={{
              padding: "7px 14px",
              fontSize: 10,
              color: "var(--text-muted)",
              lineHeight: 1.4,
            }}
          >
            Display only - all server data is always in UTC.
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

export function Header({
  activeIncidentCount,
  lastPollAt,
  isLoading,
  onRefresh,
}: HeaderProps) {
  const [nowMs, setNowMs] = useState<number | null>(null);
  const [online, setOnline] = useState(true);
  const { theme, toggleTheme, mounted } = useTheme();

  useEffect(() => {
    const tick = () => setNowMs(Date.now());
    const init = window.setTimeout(tick, 0);
    const timer = window.setInterval(tick, 1000);
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.clearTimeout(init);
      window.clearInterval(timer);
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  const utcTime = useMemo(() => {
    if (nowMs == null) return "--:--:--";
    return new Date(nowMs).toLocaleTimeString("en-GB", {
      timeZone: "UTC",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }, [nowMs]);

  const relativeLastPoll = useMemo(() => {
    if (!lastPollAt || nowMs == null) return "—";
    const diff = Math.floor((nowMs - new Date(lastPollAt).getTime()) / 1000);
    if (diff < 5) return "just now";
    if (diff < 60) return `${diff}s ago`;
    return `${Math.floor(diff / 60)}m ago`;
  }, [lastPollAt, nowMs]);

  return (
    <header
      className="top-header"
      data-component="Header"
      aria-label="Top header"
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div className="flex items-center">
          <div>
            <Image
              src="/img/hztl-livewatch-icon.svg"
              alt="HZTL LiveWatch logo"
              width={40}
              height={40}
              priority
            />
          </div>
          <div className="heading-2">
            <span className="text-gradient-hero mx-2 font-bold">
              HZTL LiveWatch
            </span>
          </div>
          <div className="mx-1">
            <Activity size={25} className="activity-live" />
          </div>
          <div
            className="label-caps"
            style={{ fontWeight: 500, letterSpacing: "0.08em" }}
          >
            ALWAYS WATCHING
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Right-side controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <TimezoneDropdown />
        {/* Network status */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            color: online ? "var(--status-green)" : "var(--status-red)",
          }}
          className="text-sm"
        >
          {online ? <Wifi size={13} /> : <WifiOff size={13} />}
          <span>{online ? "Live" : "Offline"}</span>
        </div>

        {/* Last polled */}
        <div className="text-sm muted">
          Polled{" "}
          <span className="secondary" style={{ fontWeight: 500 }}>
            {relativeLastPoll}
          </span>
        </div>



        {/* Refresh */}
        <button
          id="refresh-btn"
          onClick={onRefresh}
          disabled={isLoading}
          className="btn-icon"
          title="Refresh now"
        >
          <RefreshCw
            size={14}
            style={{
              animation: isLoading ? "spin-slow 1s linear infinite" : "none",
            }}
          />
        </button>

        {/* Theme toggle */}
        <button
          id="theme-toggle-btn"
          onClick={toggleTheme}
          className="theme-toggle"
          title={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
          aria-label={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {mounted && theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>
    </header>
  );
}
