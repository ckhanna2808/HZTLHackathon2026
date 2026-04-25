"use client";

import { useEffect, useState } from "react";

interface RingProgressProps {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  label?: string;
  sublabel?: string;
}

export function RingProgress({
  value,
  size = 72,
  strokeWidth = 5,
  color,
  trackColor = "var(--border-default)",
  label,
  sublabel,
}: RingProgressProps) {
  const clampedValue = Math.min(100, Math.max(0, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const targetOffset = circumference - (clampedValue / 100) * circumference;

  const [isAnimatedIn, setIsAnimatedIn] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    // Small delay lets the browser paint the initial (empty) ring first.
    const t = window.setTimeout(() => setIsAnimatedIn(true), prefersReduced ? 0 : 80);
    return () => window.clearTimeout(t);
  }, []);

  // Auto-color by health
  const ringColor =
    color ??
    (clampedValue >= 95
      ? "var(--status-green)"
      : clampedValue >= 70
      ? "var(--status-yellow)"
      : clampedValue >= 40
      ? "var(--status-orange)"
      : "var(--status-red)");

  const cx = size / 2;
  const cy = size / 2;

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg
        width={size}
        height={size}
        style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}
      >
        {/* Track */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        {/* Progress */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={ringColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={isAnimatedIn ? targetOffset : circumference}
          style={{
            transition:
              "stroke-dashoffset 1800ms cubic-bezier(0.22, 1, 0.36, 1), stroke 450ms ease",
          }}
        />
      </svg>
      {/* Center label */}
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          lineHeight: 1.1,
        }}
      >
        {label !== undefined ? (
          <span style={{ fontSize: size > 60 ? 14 : 11, fontWeight: 700, color: ringColor }}>
            {label}
          </span>
        ) : (
          <span style={{ fontSize: size > 60 ? 14 : 11, fontWeight: 700, color: ringColor }}>
            {clampedValue}%
          </span>
        )}
        {sublabel && (
          <span style={{ fontSize: 9, color: "var(--text-muted)", fontWeight: 500 }}>
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}
