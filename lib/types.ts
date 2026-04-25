// ─── Core Platform Types ──────────────────────────────────────────────────────

export type Platform =
  | "vercel"
  | "netlify"
  | "github"
  | "cloudflare"
  | "npm"
  | "sitecore";

export type SitecoreProduct =
  | "ai"
  | "content-hub"
  | "search"
  | "cdp"
  | "personalize"
  | "send"
  | "managed-cloud"
  | "cloud-portal"
  | "ordercloud";

export type IncidentStatus =
  | "investigating"
  | "identified"
  | "monitoring"
  | "resolved"
  | "scheduled"
  | "operational";

export type ImpactLevel = "none" | "minor" | "major" | "critical";

export type SystemStatus =
  | "operational"
  | "degraded_performance"
  | "partial_outage"
  | "major_outage"
  | "unknown";

export type Channel = "slack" | "teams" | "email" | "push" | "pagerduty";
export type DetectionMethod = "polling" | "probe" | "rss";

// ─── Unified Incident Schema ──────────────────────────────────────────────────

export interface LiveWatchIncident {
  id: string;
  source: Platform;
  product: SitecoreProduct | null;
  title: string;
  description: string;
  url: string;
  status: IncidentStatus;
  impact: ImpactLevel;
  overallStatus: SystemStatus;
  affectedComponents: string[];
  affectedRegions: string[];
  startedAt: string;
  updatedAt: string;
  resolvedAt: string | null;
  detectedBy: DetectionMethod;
  detectedAt: string;
  isNew: boolean;
  previousStatus: IncidentStatus | null;
  notificationsSent: Channel[];
}

// ─── Platform Status Summary ──────────────────────────────────────────────────

export interface PlatformStatus {
  platform: Platform;
  name: string;
  status: SystemStatus;
  indicator: string;
  description: string;
  updatedAt: string;
  activeIncidents: LiveWatchIncident[];
  components: ComponentStatus[];
  healthPercent: number;
  lastChecked: string;
}

export interface ComponentStatus {
  id: string;
  name: string;
  status: SystemStatus;
  group?: string;
}

// ─── Sitecore Sub-Product Status ─────────────────────────────────────────────

export interface SitecoreProductStatus {
  product: SitecoreProduct;
  name: string;
  status: SystemStatus;
  detectedBy: DetectionMethod;
  lastChecked: string;
  incident: LiveWatchIncident | null;
}

// ─── State Store Snapshot ─────────────────────────────────────────────────────

export interface LiveWatchSnapshot {
  timestamp: string;
  platforms: Record<Platform, PlatformStatus>;
  sitecoreProducts: Record<SitecoreProduct, SitecoreProductStatus>;
  activeIncidents: LiveWatchIncident[];
  stats: DashboardStats;
}

export interface DashboardStats {
  totalPlatforms: number;
  operationalCount: number;
  activeIncidentCount: number;
  incidentsToday: number;
  avgResolutionMinutes: number | null;
  lastPollAt: string;
  nextPollAt: string;
}

// ─── Statuspage API Response Types ───────────────────────────────────────────

export interface StatuspageResponse {
  page: { id: string; name: string; updated_at: string; url: string };
  status: { indicator: string; description: string };
  components: StatuspageComponent[];
  incidents: StatuspageIncident[];
  scheduled_maintenances: StatuspageIncident[];
}

export interface StatuspageComponent {
  id: string;
  name: string;
  status: string;
  group_id: string | null;
  group: boolean;
}

export interface StatuspageIncident {
  id: string;
  name: string;
  status: string;
  impact: string;
  created_at: string;
  updated_at: string;
  resolved_at: string | null;
  shortlink: string;
  incident_updates: StatuspageUpdate[];
  components: StatuspageComponent[];
}

export interface StatuspageUpdate {
  id: string;
  status: string;
  body: string;
  created_at: string;
  affected_components?: { name: string; new_status: string }[];
}

// ─── Poll Result ──────────────────────────────────────────────────────────────

export interface PollResult {
  success: boolean;
  timestamp: string;
  platformsPolled: number;
  incidentsDetected: number;
  newIncidents: number;
  changedIncidents: number;
  alertsSent: number;
  errors: string[];
}
