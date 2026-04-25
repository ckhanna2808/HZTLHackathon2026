"use client";

import { useCallback, useState } from "react";
import useSWR from "swr";
import { LiveWatchSnapshot, Platform } from "@/lib/types";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { StatsBar } from "@/components/dashboard/StatsBar";
import { PlatformCard } from "@/components/dashboard/PlatformCard";
import { IncidentFeed } from "@/components/dashboard/IncidentFeed";
import { SitecoreBreakdown } from "@/components/dashboard/SitecoreBreakdown";
import { HealthChart } from "@/components/dashboard/HealthChart";

// ─── Data Fetcher ─────────────────────────────────────────────────────────────

async function fetcher(url: string): Promise<LiveWatchSnapshot> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch status");
  return res.json();
}

// ─── Dashboard Page ───────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");

  const {
    data: snapshot,
    isLoading,
    isValidating,
    mutate,
  } = useSWR<LiveWatchSnapshot>("/api/status", fetcher, {
    refreshInterval: 60_000,          // poll every 60s (matches API cache)
    revalidateOnFocus: false,         // ← STOP: was causing flicker on tab switch
    revalidateOnReconnect: true,
    dedupingInterval: 55_000,         // don't double-fetch within 55s window
    keepPreviousData: true,           // always show last good data while fetching
    errorRetryCount: 3,
    errorRetryInterval: 5_000,
  });

  const handleRefresh = useCallback(() => {
    mutate();
  }, [mutate]);

  // Derived values
  const platforms = snapshot ? Object.values(snapshot.platforms) : [];
  const filteredPlatforms =
    selectedPlatform === "all"
      ? platforms
      : platforms.filter((p) => p.platform === selectedPlatform);

  const sidebarPlatforms = [
    { id: "all" as const, label: "All Platforms" },
    ...platforms.map((p) => ({
      id: p.platform,
      label: p.name,
      status: p.status,
    })),
  ];

  const globalHealth =
    platforms.length > 0
      ? Math.round(
          platforms.reduce((sum, p) => sum + p.healthPercent, 0) / platforms.length
        )
      : 100;

  // ─── Incident feed: scoped to the selected platform tab ──────────────────
  // • "all" → only ACTIVE incidents across all platforms (no resolved clutter)
  // • specific platform tab → ALL incidents for that platform including resolved
  //   history, so users can see what was resolved earlier today/this week.
  const allActiveIncidents = snapshot?.activeIncidents ?? [];
  const filteredIncidents =
    selectedPlatform === "all"
      ? allActiveIncidents   // global: active only
      : selectedPlatform === "sitecore"
      ? allActiveIncidents.filter((i) => i.source === "sitecore")  // sitecore active pubs
      : (snapshot?.platforms[selectedPlatform as Platform]?.activeIncidents ?? []);
  // ↑ platform-specific tab: use platform.activeIncidents which includes resolved history

  // Badge / header count — always shows only ACTIVE (non-resolved) for the current view
  const activeCount = filteredIncidents.filter((i) => i.status !== "resolved").length;

  // Global count is only used for the stats bar (always shows totals).
  const globalActiveCount = snapshot?.stats.activeIncidentCount ?? 0;

  return (
    <div className="app-shell">
      {/* Sidebar */}
      <Sidebar
        platforms={sidebarPlatforms}
        selected={selectedPlatform}
        onSelect={setSelectedPlatform}
        activeIncidentCount={activeCount}
        globalHealth={globalHealth}
      />

      {/* Main area */}
      <div className="main-content">
        {/* Header */}
        <Header
          activeIncidentCount={activeCount}
          lastPollAt={snapshot?.stats.lastPollAt ?? null}
          isLoading={isLoading || isValidating}
          onRefresh={handleRefresh}
        />

        {/* Page content */}
        <main className="page-content">
          {/* Stats bar */}
          {snapshot && <StatsBar stats={snapshot.stats} activeIncidentCount={activeCount} />}
          {isLoading && !snapshot && <StatsBarSkeleton />}

          {/* Main dashboard layout */}
          <div className="dashboard-layout">
            {/* Left column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Platform grid header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <h1
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: "var(--text-primary)",
                      margin: 0,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {selectedPlatform === "all" ? "All Platforms" : filteredPlatforms[0]?.name ?? "Platform"}
                  </h1>
                  <p
                    style={{
                      fontSize: 12,
                      color: "var(--text-muted)",
                      margin: "2px 0 0",
                    }}
                  >
                    {selectedPlatform === "all"
                      ? `Monitoring ${platforms.length} platforms in real-time`
                      : `Showing detailed status for ${filteredPlatforms[0]?.name}`}
                  </p>
                </div>

                {/* Overall status pill */}
                {snapshot && (
                  <div
                    style={{
                      padding: "5px 14px",
                      borderRadius: 999,
                      fontSize: 12,
                      fontWeight: 600,
                      ...(activeCount === 0
                        ? {
                            background: "var(--status-green-dim)",
                            color: "var(--status-green)",
                            border: "1px solid rgba(16,185,129,0.25)",
                          }
                        : {
                            background: "var(--status-red-dim)",
                            color: "var(--status-red)",
                            border: "1px solid rgba(239,68,68,0.3)",
                          }),
                    }}
                  >
                    {activeCount === 0
                      ? "🟢 All Systems Operational"
                      : `🔴 ${activeCount} Active Incident${activeCount !== 1 ? "s" : ""}`}
                  </div>
                )}
              </div>

              {/* Platform cards grid */}
              <div className="platform-grid">
                {isLoading && !snapshot
                  ? [...Array(6)].map((_, i) => <PlatformCardSkeleton key={i} />)
                  : filteredPlatforms.map((p, i) => (
                      <PlatformCard key={p.platform} platform={p} animationDelay={i * 80} />
                    ))}
              </div>

              {/* Sitecore product breakdown */}
              {snapshot && (selectedPlatform === "all" || selectedPlatform === "sitecore") && (
                <SitecoreBreakdown products={snapshot.sitecoreProducts} />
              )}

              {/* Health chart */}
              {snapshot && platforms.length > 0 && (
                <HealthChart platforms={platforms} />
              )}

              {/* Embeddable Status Badges — code snippets only, no rendered images */}
              {snapshot && (
                <div className="glass-card" style={{ padding: "18px 20px" }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      marginBottom: 12,
                    }}
                  >
                    📌 Embeddable Status Badges
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {(["vercel", "netlify", "github", "cloudflare", "npm"] as const).map((p) => {
                      const platform = snapshot.platforms[p];
                      const statusColor =
                        platform?.status === "operational"         ? "var(--status-green)"  :
                        platform?.status === "degraded_performance"? "var(--status-yellow)" :
                        platform?.status === "partial_outage"      ? "var(--status-orange)" :
                        platform?.status === "major_outage"        ? "var(--status-red)"    :
                        "var(--status-gray)";
                      const statusLabel =
                        platform?.status === "operational"          ? "Operational"         :
                        platform?.status === "degraded_performance" ? "Degraded"            :
                        platform?.status === "partial_outage"       ? "Partial Outage"      :
                        platform?.status === "major_outage"         ? "Major Outage"        :
                        "Unknown";
                      return (
                        <div
                          key={p}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "8px 12px",
                            borderRadius: 8,
                            background: "var(--bg-glass)",
                            border: "1px solid var(--border-subtle)",
                          }}
                        >
                          {/* Platform name */}
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              color: "var(--text-primary)",
                              minWidth: 72,
                              textTransform: "capitalize",
                            }}
                          >
                            {p}
                          </span>
                          {/* Live status pill */}
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 600,
                              color: statusColor,
                              background: `${statusColor}18`,
                              border: `1px solid ${statusColor}35`,
                              borderRadius: 999,
                              padding: "1px 8px",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {statusLabel}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

            {/* Right column — Incident Feed */}
            <div style={{ position: "sticky", top: 80, maxHeight: "calc(100vh - 100px)", overflow: "auto", display: "flex", flexDirection: "column" }}>
              <IncidentFeed
                incidents={filteredIncidents}
                isLoading={isLoading && !snapshot}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// ─── Skeletons ────────────────────────────────────────────────────────────────

function PlatformCardSkeleton() {
  return (
    <div className="glass-card shimmer" style={{ height: 160, borderRadius: 14 }} />
  );
}

function StatsBarSkeleton() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: 12,
        marginBottom: 24,
      }}
    >
      {[...Array(6)].map((_, i) => (
        <div key={i} className="glass-card shimmer" style={{ height: 84, borderRadius: 14 }} />
      ))}
    </div>
  );
}
