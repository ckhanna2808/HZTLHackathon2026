module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/HZTLHackathon2026/lib/adapters/statuspage.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "STATUSPAGE_PLATFORMS",
    ()=>STATUSPAGE_PLATFORMS,
    "fetchAllStatuspagePlatforms",
    ()=>fetchAllStatuspagePlatforms,
    "fetchStatuspagePlatform",
    ()=>fetchStatuspagePlatform
]);
const STATUSPAGE_PLATFORMS = [
    {
        id: "vercel",
        name: "Vercel",
        baseUrl: "https://www.vercel-status.com/api/v2"
    },
    {
        id: "netlify",
        name: "Netlify",
        baseUrl: "https://www.netlifystatus.com/api/v2"
    },
    {
        id: "github",
        name: "GitHub",
        baseUrl: "https://www.githubstatus.com/api/v2"
    },
    {
        id: "cloudflare",
        name: "Cloudflare",
        baseUrl: "https://www.cloudflarestatus.com/api/v2"
    },
    {
        id: "npm",
        name: "npm",
        baseUrl: "https://status.npmjs.com/api/v2"
    }
];
// ─── Status Mappers ───────────────────────────────────────────────────────────
function mapIndicatorToStatus(indicator) {
    switch(indicator?.toLowerCase()){
        case "none":
        case "operational":
            return "operational";
        case "minor":
        case "degraded_performance":
            return "degraded_performance";
        case "major":
        case "partial_outage":
            return "partial_outage";
        case "critical":
        case "major_outage":
            return "major_outage";
        default:
            return "operational";
    }
}
function mapImpact(impact) {
    switch(impact?.toLowerCase()){
        case "minor":
            return "minor";
        case "major":
            return "major";
        case "critical":
            return "critical";
        default:
            return "none";
    }
}
function mapIncidentStatus(status) {
    switch(status?.toLowerCase()){
        case "investigating":
            return "investigating";
        case "identified":
            return "identified";
        case "monitoring":
            return "monitoring";
        case "resolved":
            return "resolved";
        case "scheduled":
            return "scheduled";
        default:
            return "investigating";
    }
}
function calcHealthPercent(indicator, incidents) {
    if (incidents.length === 0) {
        switch(indicator?.toLowerCase()){
            case "none":
                return 100;
            case "minor":
                return 85;
            case "major":
                return 60;
            case "critical":
                return 20;
            default:
                return 100;
        }
    }
    return indicator === "none" ? 100 : 75;
}
async function fetchStatuspagePlatform(platformId, name, baseUrl) {
    const now = new Date().toISOString();
    try {
        const res = await fetch(`${baseUrl}/summary.json`, {
            next: {
                revalidate: 55
            },
            headers: {
                Accept: "application/json"
            },
            signal: AbortSignal.timeout(8000)
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        // Filter non-group components
        const components = data.components.filter((c)=>!c.group).map((c)=>({
                id: c.id,
                name: c.name,
                status: mapIndicatorToStatus(c.status),
                group: c.group_id ?? undefined
            }));
        // Map active incidents
        const activeIncidents = data.incidents.map((inc)=>({
                id: `${platformId}-${inc.id}`,
                source: platformId,
                product: null,
                title: inc.name,
                description: inc.incident_updates?.[0]?.body ?? "No update available.",
                url: inc.shortlink ?? `${baseUrl.replace("/api/v2", "")}/incidents/${inc.id}`,
                status: mapIncidentStatus(inc.status),
                impact: mapImpact(inc.impact),
                overallStatus: mapIndicatorToStatus(data.status.indicator),
                affectedComponents: (inc.components ?? []).map((c)=>c.name),
                affectedRegions: [],
                startedAt: inc.created_at,
                updatedAt: inc.updated_at,
                resolvedAt: inc.resolved_at,
                detectedBy: "polling",
                detectedAt: now,
                isNew: false,
                previousStatus: null,
                notificationsSent: []
            }));
        return {
            platform: platformId,
            name,
            status: mapIndicatorToStatus(data.status.indicator),
            indicator: data.status.indicator,
            description: data.status.description,
            updatedAt: data.page.updated_at,
            activeIncidents,
            components,
            healthPercent: calcHealthPercent(data.status.indicator, data.incidents),
            lastChecked: now
        };
    } catch (err) {
        console.error(`[statuspage] Failed to fetch ${platformId}:`, err);
        return {
            platform: platformId,
            name,
            status: "unknown",
            indicator: "unknown",
            description: "Unable to reach status page",
            updatedAt: now,
            activeIncidents: [],
            components: [],
            healthPercent: 0,
            lastChecked: now
        };
    }
}
async function fetchAllStatuspagePlatforms() {
    return Promise.all(STATUSPAGE_PLATFORMS.map((p)=>fetchStatuspagePlatform(p.id, p.name, p.baseUrl)));
}
}),
"[project]/HZTLHackathon2026/app/api/badge/[platform]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "dynamic",
    ()=>dynamic,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$lib$2f$adapters$2f$statuspage$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/lib/adapters/statuspage.ts [app-route] (ecmascript)");
;
;
const runtime = "nodejs";
const dynamic = "force-dynamic";
const SVG_COLORS = {
    operational: "#10b981",
    degraded_performance: "#f59e0b",
    partial_outage: "#f97316",
    major_outage: "#ef4444",
    unknown: "#6b7280"
};
const STATUS_LABELS = {
    operational: "operational",
    degraded_performance: "degraded",
    partial_outage: "partial outage",
    major_outage: "major outage",
    unknown: "unknown"
};
async function GET(_req, { params }) {
    const { platform } = await params;
    const platformConfig = __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$lib$2f$adapters$2f$statuspage$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["STATUSPAGE_PLATFORMS"].find((p)=>p.id === platform);
    if (!platformConfig) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"]("Platform not found", {
            status: 404
        });
    }
    const status = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$lib$2f$adapters$2f$statuspage$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchStatuspagePlatform"])(platformConfig.id, platformConfig.name, platformConfig.baseUrl);
    const color = SVG_COLORS[status.status] ?? SVG_COLORS.unknown;
    const label = STATUS_LABELS[status.status] ?? "unknown";
    const name = platformConfig.name;
    const nameWidth = name.length * 7 + 12;
    const labelWidth = label.length * 7 + 16;
    const totalWidth = nameWidth + labelWidth;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="20">
  <linearGradient id="s" x2="0" y2="100%">
    <stop offset="0" stop-color="#fff" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <rect rx="3" width="${totalWidth}" height="20" fill="#555"/>
  <rect rx="3" x="${nameWidth}" width="${labelWidth}" height="20" fill="${color}"/>
  <rect rx="3" width="${totalWidth}" height="20" fill="url(#s)"/>
  <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,sans-serif" font-size="11">
    <text x="${nameWidth / 2}" y="15" fill="#010101" fill-opacity=".3">${name}</text>
    <text x="${nameWidth / 2}" y="14">${name}</text>
    <text x="${nameWidth + labelWidth / 2}" y="15" fill="#010101" fill-opacity=".3">${label}</text>
    <text x="${nameWidth + labelWidth / 2}" y="14">${label}</text>
  </g>
</svg>`;
    return new __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](svg, {
        headers: {
            "Content-Type": "image/svg+xml",
            "Cache-Control": "max-age=60, s-maxage=60"
        }
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0wjuawo._.js.map