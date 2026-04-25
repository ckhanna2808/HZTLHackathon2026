"use client";

import { SystemStatus } from "@/lib/types";

interface Props {
  status: SystemStatus;
  size?: "sm" | "md" | "lg";
  pulse?: boolean;
}

const STATUS_MAP: Record<
  SystemStatus,
  { color: string; label: string; dotClass: string }
> = {
  operational: {
    color: "var(--status-green)",
    label: "Operational",
    dotClass: "operational",
  },
  degraded_performance: {
    color: "var(--status-yellow)",
    label: "Degraded",
    dotClass: "degraded",
  },
  partial_outage: {
    color: "var(--status-orange)",
    label: "Partial Outage",
    dotClass: "outage",
  },
  major_outage: {
    color: "var(--status-red)",
    label: "Major Outage",
    dotClass: "outage",
  },
  unknown: {
    color: "var(--status-gray)",
    label: "Unknown",
    dotClass: "unknown",
  },
};

const SIZES = {
  sm: { dot: 6, font: "11px" },
  md: { dot: 8, font: "12px" },
  lg: { dot: 10, font: "13px" },
};

export function StatusBadge({ status, size = "md", pulse = true }: Props) {
  const info = STATUS_MAP[status] ?? STATUS_MAP.unknown;
  const sz = SIZES[size];

  return (
    <span
      data-component="StatusBadge"
      aria-label={`Status: ${info.label}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontSize: sz.font,
        fontWeight: 600,
        color: info.color,
      }}
    >
      <span
        style={{
          position: "relative",
          width: sz.dot,
          height: sz.dot,
          borderRadius: "50%",
          background: info.color,
          display: "inline-block",
          flexShrink: 0,
        }}
      >
        {pulse && status !== "unknown" && (
          <span
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: info.color,
              animation: "pulse-ring 1.8s ease-out infinite",
            }}
          />
        )}
      </span>
      {info.label}
    </span>
  );
}

export function StatusPill({ status }: { status: SystemStatus }) {
  const info = STATUS_MAP[status] ?? STATUS_MAP.unknown;
  return (
    <span
      data-component="StatusPill"
      aria-label={`Status: ${info.label}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "3px 10px",
        borderRadius: "999px",
        fontSize: "15px",
        fontWeight: 600,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        color: info.color,
        background: `${info.color}18`,
        border: `1px solid ${info.color}40`,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: info.color,
          display: "inline-block",
        }}
      />
      {info.label}
    </span>
  );
}
