"use client";

import { useCallback, useState } from "react";
import useSWR from "swr";
import { LiveWatchSnapshot } from "@/lib/types";
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
    refreshInterval: 30_000,
    revalidateOnFocus: true,
    keepPreviousData: true,
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

  const activeCount = snapshot?.stats.activeIncidentCount ?? 0;

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
          {snapshot && <StatsBar stats={snapshot.stats} />}
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

              {/* Status badges section */}
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
                    {["vercel", "netlify", "github", "cloudflare", "npm"].map((p) => (
                      <div
                        key={p}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          padding: "8px 12px",
                          borderRadius: 8,
                          background: "var(--bg-glass)",
                          border: "1px solid var(--border-subtle)",
                        }}
                      >
                        <img
                          src={`/api/badge/${p}`}
                          alt={`${p} status badge`}
                          style={{ height: 20 }}
                        />
                        <code
                          style={{
                            fontSize: 10,
                            color: "var(--text-muted)",
                            fontFamily: '"JetBrains Mono", monospace',
                            flex: 1,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {`<img src="${typeof window !== "undefined" ? window.location.origin : ""}/api/badge/${p}" />`}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right column — Incident Feed */}
            <div style={{ position: "sticky", top: 80, maxHeight: "calc(100vh - 100px)", overflow: "auto", display: "flex", flexDirection: "column" }}>
              <IncidentFeed
                incidents={snapshot?.activeIncidents ?? []}
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
