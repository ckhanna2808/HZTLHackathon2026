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
"[project]/HZTLHackathon2026/lib/adapters/sitecore-support.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ALL_SITECORE_PRODUCTS",
    ()=>ALL_SITECORE_PRODUCTS,
    "PRODUCT_NAMES",
    ()=>PRODUCT_NAMES,
    "buildSitecoreProductStatuses",
    ()=>buildSitecoreProductStatuses,
    "fetchSitecorePublications",
    ()=>fetchSitecorePublications
]);
/**
 * Sitecore Support Portal — Status Adapter
 *
 * Fetches from the Sitecore Cloud RSS feed (the only server-accessible endpoint).
 * The support.sitecore.com/status portal is a pure AngularJS SPA — all incident
 * data there loads client-side only and is not reachable from a Next.js API route.
 *
 * What we CAN fetch: https://status.cloud.sitecore.net/MaintenanceRSS
 *   → scheduled maintenances with real product names in titles
 *
 * Priority mapping (from Sitecore's actual status page labels):
 *   "outage"      → major_outage  / critical
 *   "degradation" → degraded_performance / major
 *   "information" → operational / minor (scheduled/notice)
 *   "available"   → operational / none (resolved)
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$xmlparser$2f$XMLParser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__XMLParser$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/fast-xml-parser/src/xmlparser/XMLParser.js [app-route] (ecmascript) <export default as XMLParser>");
;
const RSS_URL = "https://status.cloud.sitecore.net/MaintenanceRSS";
// ─── Product inference from title/description ─────────────────────────────────
function inferProduct(text) {
    const s = text.toLowerCase();
    if (s.includes("managed cloud")) return "managed-cloud";
    if (s.includes("xm cloud") || s.includes("xmcloud") || s.includes("experience manager")) return "xm-cloud";
    if (s.includes("content hub") || s.includes("dam") || s.includes("stylelabs")) return "content-hub";
    if (s.includes("sitecore search") || s.includes("search") && !s.includes("ai")) return "search";
    if (s.includes("cdp") || s.includes("customer data platform") || s.includes("boxever")) return "cdp";
    if (s.includes("personali")) return "personalize";
    if (s.includes(" send") || s.includes("email studio") || s.includes("moosend")) return "send";
    // AI/Cloud Portal BEFORE generic "cloud" check
    if (s.includes("sitecore ai") || s.includes("sitecoreai") || s.includes("ai app") || s.includes("ai studio")) return "ai";
    if (s.includes("cloud portal") || s.includes("cloud dashboard") || s.includes("portal")) return "cloud-portal";
    return "xm-cloud"; // safe default — most events are XM Cloud
}
// ─── Priority string → status fields ─────────────────────────────────────────
function mapPriority(p) {
    switch(p?.toLowerCase().trim()){
        case "outage":
            return {
                status: "major_outage",
                impact: "critical",
                incidentStatus: "identified"
            };
        case "degradation":
            return {
                status: "degraded_performance",
                impact: "major",
                incidentStatus: "monitoring"
            };
        case "information":
        case "planned":
            return {
                status: "operational",
                impact: "minor",
                incidentStatus: "scheduled"
            };
        default:
            return {
                status: "operational",
                impact: "none",
                incidentStatus: "resolved"
            };
    }
}
function extractGuid(guid) {
    if (typeof guid === "string") return guid;
    return guid["#text"] ?? Math.random().toString(36).slice(2);
}
async function fetchSitecorePublications() {
    const now = new Date().toISOString();
    try {
        const res = await fetch(RSS_URL, {
            next: {
                revalidate: 55
            },
            signal: AbortSignal.timeout(8000)
        });
        if (!res.ok) throw new Error(`RSS HTTP ${res.status}`);
        const xml = await res.text();
        const parser = new __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$xmlparser$2f$XMLParser$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__XMLParser$3e$__["XMLParser"]({
            ignoreAttributes: false,
            attributeNamePrefix: "@_"
        });
        const feed = parser.parse(xml);
        const raw = feed?.rss?.channel?.item;
        if (!raw) return [];
        const items = Array.isArray(raw) ? raw : [
            raw
        ];
        return items.slice(0, 20).map((item)=>{
            const title = String(item.title ?? "");
            const description = String(item.description ?? "");
            const pubDate = item.pubDate ? new Date(String(item.pubDate)).toISOString() : now;
            const guid = extractGuid(item.guid ?? "");
            const product = inferProduct(title + " " + description);
            const { status, impact, incidentStatus } = mapPriority("information"); // RSS = scheduled maintenances
            return {
                id: `sitecore-rss-${guid}`,
                source: "sitecore",
                product,
                title,
                description: description.replace(/<[^>]+>/g, "").trim() || "See Sitecore status portal for details.",
                url: typeof item.link === "string" ? item.link : "https://support.sitecore.com/status",
                status: incidentStatus,
                impact,
                overallStatus: status,
                affectedComponents: [
                    product
                ],
                affectedRegions: [],
                startedAt: pubDate,
                updatedAt: pubDate,
                resolvedAt: null,
                detectedBy: "rss",
                detectedAt: now,
                isNew: false,
                previousStatus: null,
                notificationsSent: []
            };
        });
    } catch (err) {
        console.error("[sitecore] RSS fetch failed:", err);
        return [];
    }
}
const ALL_SITECORE_PRODUCTS = [
    "xm-cloud",
    "content-hub",
    "search",
    "cdp",
    "personalize",
    "send",
    "ai",
    "managed-cloud",
    "cloud-portal"
];
const PRODUCT_NAMES = {
    "xm-cloud": "XM Cloud",
    "content-hub": "Content Hub",
    "search": "Sitecore Search",
    "cdp": "CDP",
    "personalize": "Personalize",
    "send": "Sitecore Send",
    "ai": "Sitecore AI",
    "managed-cloud": "Managed Cloud",
    "cloud-portal": "Cloud Portal"
};
function buildSitecoreProductStatuses(publications) {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    return Object.fromEntries(ALL_SITECORE_PRODUCTS.map((product)=>{
        const mine = publications.filter((p)=>p.product === product);
        const active = mine.find((p)=>p.status !== "resolved" && p.impact !== "none") ?? null;
        const history = [
            ...mine
        ].sort((a, b)=>new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()).slice(0, 10);
        const recent = mine.filter((p)=>new Date(p.startedAt) >= thirtyDaysAgo);
        const outageHours = recent.filter((p)=>p.impact === "critical" || p.impact === "major").length * 2;
        const uptime30d = Math.round(Math.max(0, 100 - outageHours / 720 * 100) * 100) / 100;
        return [
            product,
            {
                product,
                name: PRODUCT_NAMES[product],
                status: active?.overallStatus ?? "operational",
                detectedBy: "rss",
                lastChecked: now.toISOString(),
                incident: active,
                history,
                incidentCount30d: recent.length,
                uptime30d
            }
        ];
    }));
}
}),
"[project]/HZTLHackathon2026/lib/aggregator.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildSnapshot",
    ()=>buildSnapshot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$lib$2f$adapters$2f$statuspage$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/lib/adapters/statuspage.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$lib$2f$adapters$2f$sitecore$2d$support$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/lib/adapters/sitecore-support.ts [app-route] (ecmascript)");
;
;
async function buildSnapshot() {
    const now = new Date().toISOString();
    const nextPoll = new Date(Date.now() + 60_000).toISOString();
    // Fetch all sources in parallel
    const [tier1Results, sitecorePublications] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$lib$2f$adapters$2f$statuspage$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchAllStatuspagePlatforms"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$lib$2f$adapters$2f$sitecore$2d$support$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchSitecorePublications"])()
    ]);
    // Build platform map
    const platforms = {};
    for (const p of tier1Results){
        platforms[p.platform] = p;
    }
    // Active Sitecore publications (not resolved)
    const activePubs = sitecorePublications.filter((p)=>p.impact !== "none" && p.status !== "resolved");
    // Overall Sitecore status from severity
    const sitecoreStatus = activePubs.some((p)=>p.impact === "critical") ? "major_outage" : activePubs.some((p)=>p.impact === "major") ? "partial_outage" : activePubs.length > 0 ? "degraded_performance" : "operational";
    platforms["sitecore"] = {
        platform: "sitecore",
        name: "Sitecore",
        status: sitecoreStatus,
        indicator: sitecoreStatus === "major_outage" ? "critical" : sitecoreStatus === "partial_outage" ? "major" : sitecoreStatus === "degraded_performance" ? "minor" : "none",
        description: activePubs.length > 0 ? `${activePubs.length} active event(s) detected` : "All Sitecore products operational",
        updatedAt: now,
        activeIncidents: activePubs,
        components: [],
        healthPercent: sitecoreStatus === "major_outage" ? 40 : sitecoreStatus === "partial_outage" ? 65 : sitecoreStatus === "degraded_performance" ? 85 : 100,
        lastChecked: now
    };
    // Per-product status with history
    const sitecoreProducts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$lib$2f$adapters$2f$sitecore$2d$support$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildSitecoreProductStatuses"])(sitecorePublications);
    // All incidents combined
    const allIncidents = [
        ...tier1Results.flatMap((p)=>p.activeIncidents),
        ...sitecorePublications
    ];
    const operationalCount = Object.values(platforms).filter((p)=>p.status === "operational").length;
    const today = new Date();
    const stats = {
        totalPlatforms: Object.keys(platforms).length,
        operationalCount,
        activeIncidentCount: allIncidents.filter((i)=>i.status !== "resolved").length,
        incidentsToday: allIncidents.filter((i)=>{
            const d = new Date(i.startedAt);
            return d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
        }).length,
        avgResolutionMinutes: null,
        lastPollAt: now,
        nextPollAt: nextPoll
    };
    return {
        timestamp: now,
        platforms: platforms,
        sitecoreProducts,
        activeIncidents: allIncidents.filter((i)=>i.status !== "resolved"),
        incidentHistory: allIncidents,
        stats
    };
}
}),
"[project]/HZTLHackathon2026/app/api/status/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$lib$2f$aggregator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/lib/aggregator.ts [app-route] (ecmascript)");
;
;
const runtime = "nodejs";
const dynamic = "force-dynamic";
async function GET() {
    try {
        const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$lib$2f$aggregator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildSnapshot"])();
        return __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(snapshot, {
            headers: {
                "Cache-Control": "no-store, max-age=0",
                "X-LiveWatch-Poll": new Date().toISOString()
            }
        });
    } catch (err) {
        console.error("[/api/status] Error:", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to fetch status data",
            timestamp: new Date().toISOString()
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0ynmw5q._.js.map