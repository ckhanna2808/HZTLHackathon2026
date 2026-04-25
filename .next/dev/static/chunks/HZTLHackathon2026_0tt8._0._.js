(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/HZTLHackathon2026/components/layout/Header.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Header",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/activity.mjs [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/bell.mjs [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/refresh-cw.mjs [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wifi$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/wifi.mjs [app-client] (ecmascript) <export default as Wifi>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2d$off$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__WifiOff$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/wifi-off.mjs [app-client] (ecmascript) <export default as WifiOff>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function Header({ activeIncidentCount, lastPollAt, isLoading, onRefresh }) {
    _s();
    const [now, setNow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Date());
    const [online, setOnline] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            setMounted(true);
            const timer = setInterval({
                "Header.useEffect.timer": ()=>setNow(new Date())
            }["Header.useEffect.timer"], 1000);
            const onOnline = {
                "Header.useEffect.onOnline": ()=>setOnline(true)
            }["Header.useEffect.onOnline"];
            const onOffline = {
                "Header.useEffect.onOffline": ()=>setOnline(false)
            }["Header.useEffect.onOffline"];
            window.addEventListener("online", onOnline);
            window.addEventListener("offline", onOffline);
            return ({
                "Header.useEffect": ()=>{
                    clearInterval(timer);
                    window.removeEventListener("online", onOnline);
                    window.removeEventListener("offline", onOffline);
                }
            })["Header.useEffect"];
        }
    }["Header.useEffect"], []);
    const utcTime = mounted ? now.toLocaleTimeString("en-GB", {
        timeZone: "UTC",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    }) : "--:--:--";
    const relativeLastPoll = lastPollAt ? (()=>{
        const diff = Math.floor((Date.now() - new Date(lastPollAt).getTime()) / 1000);
        if (diff < 5) return "just now";
        if (diff < 60) return `${diff}s ago`;
        return `${Math.floor(diff / 60)}m ago`;
    })() : "—";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "top-header",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 10
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            background: "linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-cyan) 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "var(--shadow-glow-blue)"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                            size: 16,
                            color: "#fff"
                        }, void 0, false, {
                            fileName: "[project]/HZTLHackathon2026/components/layout/Header.tsx",
                            lineNumber: 71,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/HZTLHackathon2026/components/layout/Header.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 15,
                                    fontWeight: 800,
                                    letterSpacing: "-0.02em"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-gradient-hero",
                                    children: "HZTL LiveWatch"
                                }, void 0, false, {
                                    fileName: "[project]/HZTLHackathon2026/components/layout/Header.tsx",
                                    lineNumber: 75,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/HZTLHackathon2026/components/layout/Header.tsx",
                                lineNumber: 74,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 10,
                                    color: "var(--text-muted)",
                                    letterSpacing: "0.08em",
                                    fontWeight: 500
                                },
                                children: "ALWAYS WATCHING"
                            }, void 0, false, {
                                fileName: "[project]/HZTLHackathon2026/components/layout/Header.tsx",
                                lineNumber: 77,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/HZTLHackathon2026/components/layout/Header.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/HZTLHackathon2026/components/layout/Header.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1
                }
            }, void 0, false, {
                fileName: "[project]/HZTLHackathon2026/components/layout/Header.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 20
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                            fontSize: 12,
                            color: online ? "var(--status-green)" : "var(--status-red)"
                        },
                        children: [
                            online ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wifi$3e$__["Wifi"], {
                                size: 13
                            }, void 0, false, {
                                fileName: "[project]/HZTLHackathon2026/components/layout/Header.tsx",
                                lineNumber: 100,
                                columnNumber: 21
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wifi$2d$off$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__WifiOff$3e$__["WifiOff"], {
                                size: 13
                            }, void 0, false, {
                                fileName: "[project]/HZTLHackathon2026/components/layout/Header.tsx",
                                lineNumber: 100,
                                columnNumber: 42
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontWeight: 500
                                },
                                children: online ? "Live" : "Offline"
                            }, void 0, false, {
                                fileName: "[project]/HZTLHackathon2026/components/layout/Header.tsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/HZTLHackathon2026/components/layout/Header.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 12,
                            color: "var(--text-muted)"
                        },
                        children: [
                            "Polled",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: "var(--text-secondary)",
                                    fontWeight: 500
                                },
                                children: relativeLastPoll
                            }, void 0, false, {
                                fileName: "[project]/HZTLHackathon2026/components/layout/Header.tsx",
                                lineNumber: 107,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/HZTLHackathon2026/components/layout/Header.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "font-mono",
                        style: {
                            fontSize: 13,
                            fontWeight: 600,
                            color: "var(--text-primary)",
                            background: "var(--bg-glass)",
                            border: "1px solid var(--border-subtle)",
                            borderRadius: 6,
                            padding: "4px 10px"
                        },
                        children: [
                            utcTime,
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: "var(--text-muted)",
                                    fontSize: 10
                                },
                                children: "UTC"
                            }, void 0, false, {
                                fileName: "[project]/HZTLHackathon2026/components/layout/Header.tsx",
                                lineNumber: 126,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/HZTLHackathon2026/components/layout/Header.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    activeIncidentCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            padding: "5px 12px",
                            borderRadius: 999,
                            background: "var(--status-red-dim)",
                            border: "1px solid rgba(239,68,68,0.35)",
                            fontSize: 12,
                            fontWeight: 600,
                            color: "var(--status-red)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                size: 12
                            }, void 0, false, {
                                fileName: "[project]/HZTLHackathon2026/components/layout/Header.tsx",
                                lineNumber: 145,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    activeIncidentCount,
                                    " Active"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/HZTLHackathon2026/components/layout/Header.tsx",
                                lineNumber: 146,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    width: 7,
                                    height: 7,
                                    borderRadius: "50%",
                                    background: "var(--status-red)",
                                    animation: "pulse-dot 1.4s ease-in-out infinite"
                                }
                            }, void 0, false, {
                                fileName: "[project]/HZTLHackathon2026/components/layout/Header.tsx",
                                lineNumber: 147,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/HZTLHackathon2026/components/layout/Header.tsx",
                        lineNumber: 131,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onRefresh,
                        disabled: isLoading,
                        style: {
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
                            transition: "all 0.15s ease"
                        },
                        title: "Refresh now",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                            size: 13,
                            style: {
                                animation: isLoading ? "spin-slow 1s linear infinite" : "none"
                            }
                        }, void 0, false, {
                            fileName: "[project]/HZTLHackathon2026/components/layout/Header.tsx",
                            lineNumber: 178,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/HZTLHackathon2026/components/layout/Header.tsx",
                        lineNumber: 160,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/HZTLHackathon2026/components/layout/Header.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/HZTLHackathon2026/components/layout/Header.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
_s(Header, "knXGGYtXBtf6cwBTINLpq5lTr8w=");
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/HZTLHackathon2026/components/layout/Sidebar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Sidebar",
    ()=>Sidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Triangle$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/triangle.mjs [app-client] (ecmascript) <export default as Triangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/globe.mjs [app-client] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/git-branch.mjs [app-client] (ecmascript) <export default as GitBranch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Cloud$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/cloud.mjs [app-client] (ecmascript) <export default as Cloud>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/package.mjs [app-client] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/layers.mjs [app-client] (ecmascript) <export default as Layers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/layout-grid.mjs [app-client] (ecmascript) <export default as LayoutGrid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/bell.mjs [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/clock.mjs [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/chevron-right.mjs [app-client] (ecmascript) <export default as ChevronRight>");
"use client";
;
;
const PLATFORM_ICONS = {
    all: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__["LayoutGrid"], {
        size: 15
    }, void 0, false, {
        fileName: "[project]/HZTLHackathon2026/components/layout/Sidebar.tsx",
        lineNumber: 32,
        columnNumber: 8
    }, ("TURBOPACK compile-time value", void 0)),
    vercel: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Triangle$3e$__["Triangle"], {
        size: 13,
        strokeWidth: 2.5
    }, void 0, false, {
        fileName: "[project]/HZTLHackathon2026/components/layout/Sidebar.tsx",
        lineNumber: 33,
        columnNumber: 11
    }, ("TURBOPACK compile-time value", void 0)),
    netlify: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
        size: 14
    }, void 0, false, {
        fileName: "[project]/HZTLHackathon2026/components/layout/Sidebar.tsx",
        lineNumber: 34,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0)),
    github: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__["GitBranch"], {
        size: 14
    }, void 0, false, {
        fileName: "[project]/HZTLHackathon2026/components/layout/Sidebar.tsx",
        lineNumber: 35,
        columnNumber: 11
    }, ("TURBOPACK compile-time value", void 0)),
    cloudflare: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Cloud$3e$__["Cloud"], {
        size: 14
    }, void 0, false, {
        fileName: "[project]/HZTLHackathon2026/components/layout/Sidebar.tsx",
        lineNumber: 36,
        columnNumber: 15
    }, ("TURBOPACK compile-time value", void 0)),
    npm: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
        size: 14
    }, void 0, false, {
        fileName: "[project]/HZTLHackathon2026/components/layout/Sidebar.tsx",
        lineNumber: 37,
        columnNumber: 8
    }, ("TURBOPACK compile-time value", void 0)),
    sitecore: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"], {
        size: 14
    }, void 0, false, {
        fileName: "[project]/HZTLHackathon2026/components/layout/Sidebar.tsx",
        lineNumber: 38,
        columnNumber: 13
    }, ("TURBOPACK compile-time value", void 0))
};
const STATUS_COLOR = {
    operational: "var(--status-green)",
    degraded_performance: "var(--status-yellow)",
    partial_outage: "var(--status-orange)",
    major_outage: "var(--status-red)",
    unknown: "var(--status-gray)"
};
function Sidebar({ platforms, selected, onSelect, activeIncidentCount, globalHealth }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "sidebar",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "20px 16px 16px",
                    borderBottom: "1px solid var(--border-subtle)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 11,
                            fontWeight: 700,
                            letterSpacing: "0.1em",
                            color: "var(--text-muted)",
                            textTransform: "uppercase",
                            marginBottom: 12
                        },
                        children: "Navigation"
                    }, void 0, false, {
                        fileName: "[project]/HZTLHackathon2026/components/layout/Sidebar.tsx",
                        lineNumber: 65,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onSelect("all"),
                        className: `sidebar-nav-item ${selected === "all" ? "active" : ""}`,
                        style: {
                            width: "100%",
                            border: "none",
                            textAlign: "left"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__["LayoutGrid"], {
                                size: 15
                            }, void 0, false, {
                                fileName: "[project]/HZTLHackathon2026/components/layout/Sidebar.tsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "All Platforms"
                            }, void 0, false, {
                                fileName: "[project]/HZTLHackathon2026/components/layout/Sidebar.tsx",
                                lineNumber: 76,
                                columnNumber: 11
                            }, this),
                            activeIncidentCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    marginLeft: "auto",
                                    background: "var(--status-red)",
                                    color: "#fff",
                                    fontSize: 10,
                                    fontWeight: 700,
                                    borderRadius: 999,
                                    padding: "1px 6px"
                                },
                                children: activeIncidentCount
                            }, void 0, false, {
                                fileName: "[project]/HZTLHackathon2026/components/layout/Sidebar.tsx",
                                lineNumber: 78,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/HZTLHackathon2026/components/layout/Sidebar.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/HZTLHackathon2026/components/layout/Sidebar.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "12px 0",
                    flex: 1
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "0 16px 8px",
                            fontSize: 11,
                            fontWeight: 700,
                            letterSpacing: "0.1em",
                            color: "var(--text-muted)",
                            textTransform: "uppercase"
                        },
                        children: "Platforms"
                    }, void 0, false, {
                        fileName: "[project]/HZTLHackathon2026/components/layout/Sidebar.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this),
                    platforms.filter((p)=>p.id !== "all").map((p)=>{
                        const statusColor = p.status ? STATUS_COLOR[p.status] ?? STATUS_COLOR.unknown : "var(--status-gray)";
                        const isActive = selected === p.id;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>onSelect(p.id),
                            className: `sidebar-nav-item ${isActive ? "active" : ""}`,
                            style: {
                                width: "100%",
                                border: "none",
                                textAlign: "left"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: isActive ? "var(--accent-blue)" : "var(--text-muted)"
                                    },
                                    children: PLATFORM_ICONS[p.id]
                                }, void 0, false, {
                                    fileName: "[project]/HZTLHackathon2026/components/layout/Sidebar.tsx",
                                    lineNumber: 112,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        flex: 1
                                    },
                                    children: p.label
                                }, void 0, false, {
                                    fileName: "[project]/HZTLHackathon2026/components/layout/Sidebar.tsx",
                                    lineNumber: 115,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        width: 7,
                                        height: 7,
                                        borderRadius: "50%",
                                        background: statusColor,
                                        display: "inline-block",
                                        flexShrink: 0
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/HZTLHackathon2026/components/layout/Sidebar.tsx",
                                    lineNumber: 116,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, p.id, true, {
                            fileName: "[project]/HZTLHackathon2026/components/layout/Sidebar.tsx",
                            lineNumber: 106,
                            columnNumber: 15
                        }, this);
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/HZTLHackathon2026/components/layout/Sidebar.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "12px 0 16px",
                    borderTop: "1px solid var(--border-subtle)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "0 16px 10px",
                            fontSize: 11,
                            fontWeight: 700,
                            letterSpacing: "0.1em",
                            color: "var(--text-muted)",
                            textTransform: "uppercase"
                        },
                        children: "Quick Links"
                    }, void 0, false, {
                        fileName: "[project]/HZTLHackathon2026/components/layout/Sidebar.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "sidebar-nav-item",
                        style: {
                            width: "100%",
                            border: "none",
                            textAlign: "left"
                        },
                        onClick: ()=>onSelect("incidents"),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/HZTLHackathon2026/components/layout/Sidebar.tsx",
                                lineNumber: 142,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Incidents"
                            }, void 0, false, {
                                fileName: "[project]/HZTLHackathon2026/components/layout/Sidebar.tsx",
                                lineNumber: 143,
                                columnNumber: 11
                            }, this),
                            activeIncidentCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                size: 12,
                                style: {
                                    marginLeft: "auto",
                                    color: "var(--text-muted)"
                                }
                            }, void 0, false, {
                                fileName: "[project]/HZTLHackathon2026/components/layout/Sidebar.tsx",
                                lineNumber: 145,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/HZTLHackathon2026/components/layout/Sidebar.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "sidebar-nav-item",
                        style: {
                            width: "100%",
                            border: "none",
                            textAlign: "left"
                        },
                        onClick: ()=>onSelect("history"),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/HZTLHackathon2026/components/layout/Sidebar.tsx",
                                lineNumber: 154,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "History"
                            }, void 0, false, {
                                fileName: "[project]/HZTLHackathon2026/components/layout/Sidebar.tsx",
                                lineNumber: 155,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/HZTLHackathon2026/components/layout/Sidebar.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            margin: "12px 8px 0",
                            padding: "12px 12px",
                            borderRadius: 10,
                            background: "var(--bg-glass)",
                            border: "1px solid var(--border-subtle)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: 8
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 11,
                                            color: "var(--text-muted)",
                                            fontWeight: 600,
                                            textTransform: "uppercase",
                                            letterSpacing: "0.06em"
                                        },
                                        children: "Global Health"
                                    }, void 0, false, {
                                        fileName: "[project]/HZTLHackathon2026/components/layout/Sidebar.tsx",
                                        lineNumber: 169,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 15,
                                            fontWeight: 800,
                                            color: globalHealth >= 90 ? "var(--status-green)" : globalHealth >= 70 ? "var(--status-yellow)" : "var(--status-red)"
                                        },
                                        children: [
                                            globalHealth,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/HZTLHackathon2026/components/layout/Sidebar.tsx",
                                        lineNumber: 172,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/HZTLHackathon2026/components/layout/Sidebar.tsx",
                                lineNumber: 168,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    height: 4,
                                    borderRadius: 2,
                                    background: "var(--border-subtle)",
                                    overflow: "hidden"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        height: "100%",
                                        width: `${globalHealth}%`,
                                        borderRadius: 2,
                                        background: globalHealth >= 90 ? "var(--status-green)" : globalHealth >= 70 ? "var(--status-yellow)" : "var(--status-red)",
                                        transition: "width 0.8s ease"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/HZTLHackathon2026/components/layout/Sidebar.tsx",
                                    lineNumber: 190,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/HZTLHackathon2026/components/layout/Sidebar.tsx",
                                lineNumber: 182,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 10,
                                    color: "var(--text-muted)",
                                    marginTop: 5
                                },
                                children: "Across all monitored platforms"
                            }, void 0, false, {
                                fileName: "[project]/HZTLHackathon2026/components/layout/Sidebar.tsx",
                                lineNumber: 204,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/HZTLHackathon2026/components/layout/Sidebar.tsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/HZTLHackathon2026/components/layout/Sidebar.tsx",
                lineNumber: 132,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/HZTLHackathon2026/components/layout/Sidebar.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
_c = Sidebar;
var _c;
__turbopack_context__.k.register(_c, "Sidebar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/HZTLHackathon2026/components/dashboard/StatsBar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StatsBar",
    ()=>StatsBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/activity.mjs [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/triangle-alert.mjs [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/clock.mjs [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/layers.mjs [app-client] (ecmascript) <export default as Layers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/shield.mjs [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/zap.mjs [app-client] (ecmascript) <export default as Zap>");
"use client";
;
;
function StatsBar({ stats }) {
    const healthPct = Math.round(stats.operationalCount / stats.totalPlatforms * 100);
    const items = [
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                size: 15
            }, void 0, false, {
                fileName: "[project]/HZTLHackathon2026/components/dashboard/StatsBar.tsx",
                lineNumber: 15,
                columnNumber: 13
            }, this),
            label: "Platforms",
            value: `${stats.operationalCount} / ${stats.totalPlatforms}`,
            sub: "Operational",
            color: stats.operationalCount === stats.totalPlatforms ? "var(--status-green)" : "var(--status-yellow)"
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                size: 15
            }, void 0, false, {
                fileName: "[project]/HZTLHackathon2026/components/dashboard/StatsBar.tsx",
                lineNumber: 25,
                columnNumber: 13
            }, this),
            label: "Active Incidents",
            value: stats.activeIncidentCount === 0 ? "None" : stats.activeIncidentCount,
            sub: "Right now",
            color: stats.activeIncidentCount === 0 ? "var(--status-green)" : "var(--status-red)"
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                size: 15
            }, void 0, false, {
                fileName: "[project]/HZTLHackathon2026/components/dashboard/StatsBar.tsx",
                lineNumber: 33,
                columnNumber: 13
            }, this),
            label: "Incidents Today",
            value: stats.incidentsToday === 0 ? "None" : stats.incidentsToday,
            sub: "Total detected",
            color: stats.incidentsToday === 0 ? "var(--status-green)" : "var(--status-yellow)"
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                size: 15
            }, void 0, false, {
                fileName: "[project]/HZTLHackathon2026/components/dashboard/StatsBar.tsx",
                lineNumber: 41,
                columnNumber: 13
            }, this),
            label: "Avg Resolution",
            value: stats.avgResolutionMinutes != null ? `${stats.avgResolutionMinutes}m` : "—",
            sub: "MTTR",
            color: "var(--accent-blue)"
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"], {
                size: 15
            }, void 0, false, {
                fileName: "[project]/HZTLHackathon2026/components/dashboard/StatsBar.tsx",
                lineNumber: 51,
                columnNumber: 13
            }, this),
            label: "Global Health",
            value: `${healthPct}%`,
            sub: "All platforms",
            color: healthPct >= 90 ? "var(--status-green)" : healthPct >= 70 ? "var(--status-yellow)" : "var(--status-red)"
        },
        {
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                size: 15
            }, void 0, false, {
                fileName: "[project]/HZTLHackathon2026/components/dashboard/StatsBar.tsx",
                lineNumber: 63,
                columnNumber: 13
            }, this),
            label: "Next Poll",
            value: stats.nextPollAt ? (()=>{
                const s = Math.max(0, Math.floor((new Date(stats.nextPollAt).getTime() - Date.now()) / 1000));
                return `${s}s`;
            })() : "—",
            sub: "Cron interval",
            color: "var(--accent-cyan)"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 12,
            marginBottom: 24
        },
        children: items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass-card animate-slide-up",
                style: {
                    padding: "14px 16px"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            marginBottom: 8,
                            color: item.color
                        },
                        children: [
                            item.icon,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 10,
                                    fontWeight: 700,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.07em",
                                    color: "var(--text-muted)"
                                },
                                children: item.label
                            }, void 0, false, {
                                fileName: "[project]/HZTLHackathon2026/components/dashboard/StatsBar.tsx",
                                lineNumber: 104,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/StatsBar.tsx",
                        lineNumber: 94,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 22,
                            fontWeight: 800,
                            color: item.color,
                            lineHeight: 1,
                            letterSpacing: "-0.02em",
                            marginBottom: 2
                        },
                        children: item.value
                    }, void 0, false, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/StatsBar.tsx",
                        lineNumber: 116,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 10,
                            color: "var(--text-muted)",
                            fontWeight: 500
                        },
                        children: item.sub
                    }, void 0, false, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/StatsBar.tsx",
                        lineNumber: 128,
                        columnNumber: 11
                    }, this)
                ]
            }, item.label, true, {
                fileName: "[project]/HZTLHackathon2026/components/dashboard/StatsBar.tsx",
                lineNumber: 89,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/HZTLHackathon2026/components/dashboard/StatsBar.tsx",
        lineNumber: 80,
        columnNumber: 5
    }, this);
}
_c = StatsBar;
var _c;
__turbopack_context__.k.register(_c, "StatsBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/HZTLHackathon2026/components/ui/RingProgress.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RingProgress",
    ()=>RingProgress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function RingProgress({ value, size = 72, strokeWidth = 5, color, trackColor = "rgba(255,255,255,0.06)", label, sublabel }) {
    const clampedValue = Math.min(100, Math.max(0, value));
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - clampedValue / 100 * circumference;
    // Auto-color by health
    const ringColor = color ?? (clampedValue >= 95 ? "var(--status-green)" : clampedValue >= 70 ? "var(--status-yellow)" : clampedValue >= 40 ? "var(--status-orange)" : "var(--status-red)");
    const cx = size / 2;
    const cy = size / 2;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: "relative",
            width: size,
            height: size,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                width: size,
                height: size,
                style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    transform: "rotate(-90deg)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: cx,
                        cy: cy,
                        r: radius,
                        fill: "none",
                        stroke: trackColor,
                        strokeWidth: strokeWidth
                    }, void 0, false, {
                        fileName: "[project]/HZTLHackathon2026/components/ui/RingProgress.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: cx,
                        cy: cy,
                        r: radius,
                        fill: "none",
                        stroke: ringColor,
                        strokeWidth: strokeWidth,
                        strokeLinecap: "round",
                        strokeDasharray: circumference,
                        strokeDashoffset: offset,
                        style: {
                            transition: "stroke-dashoffset 0.8s ease, stroke 0.3s ease"
                        }
                    }, void 0, false, {
                        fileName: "[project]/HZTLHackathon2026/components/ui/RingProgress.tsx",
                        lineNumber: 68,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/HZTLHackathon2026/components/ui/RingProgress.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    lineHeight: 1.1
                },
                children: [
                    label !== undefined ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: size > 60 ? 14 : 11,
                            fontWeight: 700,
                            color: ringColor
                        },
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/HZTLHackathon2026/components/ui/RingProgress.tsx",
                        lineNumber: 92,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: size > 60 ? 14 : 11,
                            fontWeight: 700,
                            color: ringColor
                        },
                        children: [
                            clampedValue,
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/HZTLHackathon2026/components/ui/RingProgress.tsx",
                        lineNumber: 96,
                        columnNumber: 11
                    }, this),
                    sublabel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 9,
                            color: "var(--text-muted)",
                            fontWeight: 500
                        },
                        children: sublabel
                    }, void 0, false, {
                        fileName: "[project]/HZTLHackathon2026/components/ui/RingProgress.tsx",
                        lineNumber: 101,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/HZTLHackathon2026/components/ui/RingProgress.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/HZTLHackathon2026/components/ui/RingProgress.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
_c = RingProgress;
var _c;
__turbopack_context__.k.register(_c, "RingProgress");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/HZTLHackathon2026/components/dashboard/PlatformCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlatformCard",
    ()=>PlatformCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$components$2f$ui$2f$RingProgress$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/components/ui/RingProgress.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Triangle$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/triangle.mjs [app-client] (ecmascript) <export default as Triangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/globe.mjs [app-client] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/git-branch.mjs [app-client] (ecmascript) <export default as GitBranch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Cloud$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/cloud.mjs [app-client] (ecmascript) <export default as Cloud>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/package.mjs [app-client] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/layers.mjs [app-client] (ecmascript) <export default as Layers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/chevron-down.mjs [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/chevron-up.mjs [app-client] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/circle-alert.mjs [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/date-fns/formatDistanceToNow.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const PLATFORM_ICONS = {
    vercel: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Triangle$3e$__["Triangle"], {
        size: 20,
        strokeWidth: 2
    }, void 0, false, {
        fileName: "[project]/HZTLHackathon2026/components/dashboard/PlatformCard.tsx",
        lineNumber: 20,
        columnNumber: 11
    }, ("TURBOPACK compile-time value", void 0)),
    netlify: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
        size: 20
    }, void 0, false, {
        fileName: "[project]/HZTLHackathon2026/components/dashboard/PlatformCard.tsx",
        lineNumber: 21,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0)),
    github: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GitBranch$3e$__["GitBranch"], {
        size: 20
    }, void 0, false, {
        fileName: "[project]/HZTLHackathon2026/components/dashboard/PlatformCard.tsx",
        lineNumber: 22,
        columnNumber: 11
    }, ("TURBOPACK compile-time value", void 0)),
    cloudflare: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Cloud$3e$__["Cloud"], {
        size: 20
    }, void 0, false, {
        fileName: "[project]/HZTLHackathon2026/components/dashboard/PlatformCard.tsx",
        lineNumber: 23,
        columnNumber: 15
    }, ("TURBOPACK compile-time value", void 0)),
    npm: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
        size: 20
    }, void 0, false, {
        fileName: "[project]/HZTLHackathon2026/components/dashboard/PlatformCard.tsx",
        lineNumber: 24,
        columnNumber: 8
    }, ("TURBOPACK compile-time value", void 0)),
    sitecore: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"], {
        size: 20
    }, void 0, false, {
        fileName: "[project]/HZTLHackathon2026/components/dashboard/PlatformCard.tsx",
        lineNumber: 25,
        columnNumber: 13
    }, ("TURBOPACK compile-time value", void 0))
};
const PLATFORM_COLORS = {
    vercel: "#fff",
    netlify: "#00c7b7",
    github: "#e8eaed",
    cloudflare: "#f6821f",
    npm: "#cb3837",
    sitecore: "#eb1f1f"
};
const STATUS_CARD_CLASS = {
    operational: "card-operational",
    degraded_performance: "card-degraded",
    partial_outage: "card-outage",
    major_outage: "card-outage",
    unknown: ""
};
const STATUS_LABEL = {
    operational: "Operational",
    degraded_performance: "Degraded Performance",
    partial_outage: "Partial Outage",
    major_outage: "Major Outage",
    unknown: "Unknown"
};
const STATUS_COLOR = {
    operational: "var(--status-green)",
    degraded_performance: "var(--status-yellow)",
    partial_outage: "var(--status-orange)",
    major_outage: "var(--status-red)",
    unknown: "var(--status-gray)"
};
function PlatformCard({ platform, animationDelay = 0 }) {
    _s();
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const icon = PLATFORM_ICONS[platform.platform];
    const color = PLATFORM_COLORS[platform.platform] ?? "#fff";
    const statusColor = STATUS_COLOR[platform.status] ?? STATUS_COLOR.unknown;
    const cardClass = STATUS_CARD_CLASS[platform.status] ?? "";
    const hasIncidents = platform.activeIncidents.length > 0;
    const lastUpdated = platform.updatedAt ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDistanceToNow"])(new Date(platform.updatedAt), {
        addSuffix: true
    }) : "—";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `glass-card ${cardClass} animate-slide-up`,
        style: {
            padding: "20px",
            animationDelay: `${animationDelay}ms`,
            cursor: "pointer",
            position: "relative",
            overflow: "hidden"
        },
        onClick: ()=>setExpanded((e)=>!e),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: 44,
                            height: 44,
                            borderRadius: 10,
                            background: `${color}14`,
                            border: `1px solid ${color}28`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color,
                            flexShrink: 0
                        },
                        children: icon
                    }, void 0, false, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/PlatformCard.tsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            minWidth: 0
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 15,
                                    fontWeight: 700,
                                    color: "var(--text-primary)",
                                    letterSpacing: "-0.01em",
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis"
                                },
                                children: platform.name
                            }, void 0, false, {
                                fileName: "[project]/HZTLHackathon2026/components/dashboard/PlatformCard.tsx",
                                lineNumber: 112,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 12,
                                    fontWeight: 500,
                                    color: statusColor,
                                    marginTop: 2,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 5
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            width: 6,
                                            height: 6,
                                            borderRadius: "50%",
                                            background: statusColor,
                                            display: "inline-block",
                                            flexShrink: 0,
                                            ...platform.status !== "operational" && platform.status !== "unknown" ? {
                                                animation: "pulse-dot 1.8s ease-in-out infinite"
                                            } : {}
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/HZTLHackathon2026/components/dashboard/PlatformCard.tsx",
                                        lineNumber: 136,
                                        columnNumber: 13
                                    }, this),
                                    STATUS_LABEL[platform.status]
                                ]
                            }, void 0, true, {
                                fileName: "[project]/HZTLHackathon2026/components/dashboard/PlatformCard.tsx",
                                lineNumber: 125,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/PlatformCard.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$components$2f$ui$2f$RingProgress$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RingProgress"], {
                        value: platform.healthPercent,
                        size: 56,
                        strokeWidth: 4
                    }, void 0, false, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/PlatformCard.tsx",
                        lineNumber: 154,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/HZTLHackathon2026/components/dashboard/PlatformCard.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    gap: 0,
                    marginTop: 16,
                    paddingTop: 14,
                    borderTop: "1px solid var(--border-subtle)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCell, {
                        label: "Components",
                        value: platform.components.length || "—"
                    }, void 0, false, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/PlatformCard.tsx",
                        lineNumber: 167,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCell, {
                        label: "Incidents",
                        value: hasIncidents ? platform.activeIncidents.length : "None",
                        highlight: hasIncidents,
                        color: hasIncidents ? "var(--status-red)" : "var(--status-green)"
                    }, void 0, false, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/PlatformCard.tsx",
                        lineNumber: 171,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCell, {
                        label: "Updated",
                        value: lastUpdated,
                        small: true
                    }, void 0, false, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/PlatformCard.tsx",
                        lineNumber: 177,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/HZTLHackathon2026/components/dashboard/PlatformCard.tsx",
                lineNumber: 158,
                columnNumber: 7
            }, this),
            hasIncidents && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: 12,
                    padding: "8px 12px",
                    borderRadius: 8,
                    background: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    fontSize: 12,
                    color: "var(--status-red)",
                    display: "flex",
                    alignItems: "center",
                    gap: 6
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                        size: 12
                    }, void 0, false, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/PlatformCard.tsx",
                        lineNumber: 196,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontWeight: 500
                        },
                        children: platform.activeIncidents[0].title
                    }, void 0, false, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/PlatformCard.tsx",
                        lineNumber: 197,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/HZTLHackathon2026/components/dashboard/PlatformCard.tsx",
                lineNumber: 182,
                columnNumber: 9
            }, this),
            expanded && platform.components.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: 12,
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    animation: "slide-up 0.2s ease-out both"
                },
                onClick: (e)=>e.stopPropagation(),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 11,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            color: "var(--text-muted)",
                            marginBottom: 4
                        },
                        children: "Components"
                    }, void 0, false, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/PlatformCard.tsx",
                        lineNumber: 215,
                        columnNumber: 11
                    }, this),
                    platform.components.slice(0, 12).map((c)=>{
                        const compColor = STATUS_COLOR[c.status] ?? STATUS_COLOR.unknown;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "4px 8px",
                                borderRadius: 6,
                                background: "var(--bg-glass)",
                                fontSize: 12
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        width: 6,
                                        height: 6,
                                        borderRadius: "50%",
                                        background: compColor,
                                        flexShrink: 0
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/HZTLHackathon2026/components/dashboard/PlatformCard.tsx",
                                    lineNumber: 242,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        flex: 1,
                                        color: "var(--text-secondary)"
                                    },
                                    children: c.name
                                }, void 0, false, {
                                    fileName: "[project]/HZTLHackathon2026/components/dashboard/PlatformCard.tsx",
                                    lineNumber: 251,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 10,
                                        color: compColor,
                                        fontWeight: 600
                                    },
                                    children: STATUS_LABEL[c.status]
                                }, void 0, false, {
                                    fileName: "[project]/HZTLHackathon2026/components/dashboard/PlatformCard.tsx",
                                    lineNumber: 252,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, c.id, true, {
                            fileName: "[project]/HZTLHackathon2026/components/dashboard/PlatformCard.tsx",
                            lineNumber: 230,
                            columnNumber: 15
                        }, this);
                    }),
                    platform.components.length > 12 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 11,
                            color: "var(--text-muted)",
                            paddingLeft: 8
                        },
                        children: [
                            "+",
                            platform.components.length - 12,
                            " more components"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/PlatformCard.tsx",
                        lineNumber: 259,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/HZTLHackathon2026/components/dashboard/PlatformCard.tsx",
                lineNumber: 205,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 10,
                    color: "var(--text-muted)"
                },
                children: expanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                    size: 14
                }, void 0, false, {
                    fileName: "[project]/HZTLHackathon2026/components/dashboard/PlatformCard.tsx",
                    lineNumber: 275,
                    columnNumber: 21
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                    size: 14
                }, void 0, false, {
                    fileName: "[project]/HZTLHackathon2026/components/dashboard/PlatformCard.tsx",
                    lineNumber: 275,
                    columnNumber: 47
                }, this)
            }, void 0, false, {
                fileName: "[project]/HZTLHackathon2026/components/dashboard/PlatformCard.tsx",
                lineNumber: 267,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/HZTLHackathon2026/components/dashboard/PlatformCard.tsx",
        lineNumber: 79,
        columnNumber: 5
    }, this);
}
_s(PlatformCard, "DuL5jiiQQFgbn7gBKAyxwS/H4Ek=");
_c = PlatformCard;
function StatCell({ label, value, highlight, color, small }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            flex: 1,
            textAlign: "center"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: small ? 11 : 14,
                    fontWeight: 700,
                    color: highlight ? color : "var(--text-primary)"
                },
                children: value
            }, void 0, false, {
                fileName: "[project]/HZTLHackathon2026/components/dashboard/PlatformCard.tsx",
                lineNumber: 296,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: 10,
                    color: "var(--text-muted)",
                    fontWeight: 500,
                    marginTop: 1
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/HZTLHackathon2026/components/dashboard/PlatformCard.tsx",
                lineNumber: 305,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/HZTLHackathon2026/components/dashboard/PlatformCard.tsx",
        lineNumber: 295,
        columnNumber: 5
    }, this);
}
_c1 = StatCell;
var _c, _c1;
__turbopack_context__.k.register(_c, "PlatformCard");
__turbopack_context__.k.register(_c1, "StatCell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/HZTLHackathon2026/components/dashboard/IncidentCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IncidentCard",
    ()=>IncidentCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/date-fns/formatDistanceToNow.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/triangle-alert.mjs [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/circle-alert.mjs [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/info.mjs [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/circle-check-big.mjs [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/calendar.mjs [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/external-link.mjs [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/chevron-down.mjs [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/chevron-up.mjs [app-client] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const IMPACT_CONFIG = {
    critical: {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
            size: 14
        }, void 0, false, {
            fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentCard.tsx",
            lineNumber: 24,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0)),
        color: "var(--status-red)",
        bg: "var(--status-red-dim)",
        border: "rgba(239,68,68,0.25)",
        label: "Critical"
    },
    major: {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
            size: 14
        }, void 0, false, {
            fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentCard.tsx",
            lineNumber: 31,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0)),
        color: "var(--status-orange)",
        bg: "var(--status-orange-dim)",
        border: "rgba(249,115,22,0.25)",
        label: "Major"
    },
    minor: {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
            size: 14
        }, void 0, false, {
            fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentCard.tsx",
            lineNumber: 38,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0)),
        color: "var(--status-yellow)",
        bg: "var(--status-yellow-dim)",
        border: "rgba(245,158,11,0.25)",
        label: "Minor"
    },
    none: {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
            size: 14
        }, void 0, false, {
            fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentCard.tsx",
            lineNumber: 45,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0)),
        color: "var(--status-green)",
        bg: "var(--status-green-dim)",
        border: "rgba(16,185,129,0.25)",
        label: "None"
    }
};
const STATUS_LABELS = {
    investigating: {
        label: "Investigating",
        color: "var(--status-red)"
    },
    identified: {
        label: "Identified",
        color: "var(--status-orange)"
    },
    monitoring: {
        label: "Monitoring",
        color: "var(--status-yellow)"
    },
    resolved: {
        label: "Resolved",
        color: "var(--status-green)"
    },
    scheduled: {
        label: "Scheduled",
        color: "var(--accent-blue)"
    },
    operational: {
        label: "Operational",
        color: "var(--status-green)"
    }
};
const PLATFORM_COLORS = {
    vercel: "#fff",
    netlify: "#00c7b7",
    github: "#e8eaed",
    cloudflare: "#f6821f",
    npm: "#cb3837",
    sitecore: "#eb1f1f"
};
function IncidentCard({ incident, index = 0 }) {
    _s();
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const config = IMPACT_CONFIG[incident.impact] ?? IMPACT_CONFIG.none;
    const statusInfo = STATUS_LABELS[incident.status] ?? STATUS_LABELS.investigating;
    const platformColor = PLATFORM_COLORS[incident.source] ?? "var(--text-secondary)";
    const isResolved = incident.status === "resolved";
    const timeAgo = incident.startedAt ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$date$2d$fns$2f$formatDistanceToNow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDistanceToNow"])(new Date(incident.startedAt), {
        addSuffix: true
    }) : "Unknown";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "animate-slide-in",
        style: {
            animationDelay: `${index * 60}ms`,
            padding: "12px 14px",
            borderRadius: 10,
            background: "var(--bg-glass)",
            border: `1px solid ${isResolved ? "var(--border-subtle)" : config.border}`,
            borderLeft: `3px solid ${isResolved ? "var(--status-green)" : config.color}`,
            opacity: isResolved ? 0.7 : 1,
            cursor: "pointer",
            transition: "background 0.15s ease, border-color 0.15s ease"
        },
        onClick: ()=>setExpanded((e)=>!e),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 8
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            color: config.color,
                            marginTop: 1,
                            flexShrink: 0
                        },
                        children: incident.status === "scheduled" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                            size: 14
                        }, void 0, false, {
                            fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentCard.tsx",
                            lineNumber: 108,
                            columnNumber: 46
                        }, this) : config.icon
                    }, void 0, false, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentCard.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            minWidth: 0
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                    marginBottom: 3
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 10,
                                            fontWeight: 700,
                                            textTransform: "uppercase",
                                            letterSpacing: "0.06em",
                                            color: platformColor
                                        },
                                        children: incident.source
                                    }, void 0, false, {
                                        fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentCard.tsx",
                                        lineNumber: 115,
                                        columnNumber: 13
                                    }, this),
                                    incident.product && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: "var(--text-muted)",
                                                    fontSize: 10
                                                },
                                                children: "›"
                                            }, void 0, false, {
                                                fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentCard.tsx",
                                                lineNumber: 128,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: 10,
                                                    color: "var(--text-muted)",
                                                    fontWeight: 500
                                                },
                                                children: incident.product
                                            }, void 0, false, {
                                                fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentCard.tsx",
                                                lineNumber: 129,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentCard.tsx",
                                lineNumber: 114,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 12,
                                    fontWeight: 600,
                                    color: "var(--text-primary)",
                                    lineHeight: 1.3,
                                    overflow: "hidden",
                                    display: "-webkit-box",
                                    WebkitLineClamp: expanded ? undefined : 2,
                                    WebkitBoxOrient: "vertical"
                                },
                                children: incident.title
                            }, void 0, false, {
                                fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentCard.tsx",
                                lineNumber: 137,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                    marginTop: 6,
                                    flexWrap: "wrap"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 10,
                                            color: "var(--text-muted)"
                                        },
                                        children: timeAgo
                                    }, void 0, false, {
                                        fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentCard.tsx",
                                        lineNumber: 162,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: 3,
                                            padding: "1px 7px",
                                            borderRadius: 999,
                                            fontSize: 10,
                                            fontWeight: 600,
                                            color: statusInfo.color,
                                            background: `${statusInfo.color}15`,
                                            border: `1px solid ${statusInfo.color}30`
                                        },
                                        children: statusInfo.label
                                    }, void 0, false, {
                                        fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentCard.tsx",
                                        lineNumber: 163,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            display: "inline-flex",
                                            padding: "1px 7px",
                                            borderRadius: 999,
                                            fontSize: 10,
                                            fontWeight: 600,
                                            color: config.color,
                                            background: config.bg,
                                            border: `1px solid ${config.border}`
                                        },
                                        children: config.label
                                    }, void 0, false, {
                                        fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentCard.tsx",
                                        lineNumber: 179,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentCard.tsx",
                                lineNumber: 153,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentCard.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 4,
                            flexShrink: 0
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: "var(--text-muted)"
                                },
                                children: expanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                    size: 12
                                }, void 0, false, {
                                    fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentCard.tsx",
                                    lineNumber: 199,
                                    columnNumber: 25
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                    size: 12
                                }, void 0, false, {
                                    fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentCard.tsx",
                                    lineNumber: 199,
                                    columnNumber: 51
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentCard.tsx",
                                lineNumber: 198,
                                columnNumber: 11
                            }, this),
                            incident.url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: incident.url,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                style: {
                                    color: "var(--text-muted)"
                                },
                                onClick: (e)=>e.stopPropagation(),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                    size: 11
                                }, void 0, false, {
                                    fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentCard.tsx",
                                    lineNumber: 209,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentCard.tsx",
                                lineNumber: 202,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentCard.tsx",
                        lineNumber: 197,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentCard.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: 10,
                    paddingTop: 10,
                    borderTop: "1px solid var(--border-subtle)",
                    animation: "slide-up 0.2s ease-out both"
                },
                children: [
                    incident.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 12,
                            color: "var(--text-secondary)",
                            lineHeight: 1.5,
                            margin: 0,
                            marginBottom: 8
                        },
                        children: incident.description
                    }, void 0, false, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentCard.tsx",
                        lineNumber: 226,
                        columnNumber: 13
                    }, this),
                    incident.affectedComponents.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 4
                        },
                        children: incident.affectedComponents.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    padding: "2px 7px",
                                    borderRadius: 4,
                                    fontSize: 10,
                                    background: "var(--bg-glass)",
                                    border: "1px solid var(--border-subtle)",
                                    color: "var(--text-secondary)"
                                },
                                children: c
                            }, c, false, {
                                fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentCard.tsx",
                                lineNumber: 241,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentCard.tsx",
                        lineNumber: 239,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentCard.tsx",
                lineNumber: 217,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentCard.tsx",
        lineNumber: 83,
        columnNumber: 5
    }, this);
}
_s(IncidentCard, "DuL5jiiQQFgbn7gBKAyxwS/H4Ek=");
_c = IncidentCard;
var _c;
__turbopack_context__.k.register(_c, "IncidentCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/HZTLHackathon2026/components/dashboard/IncidentFeed.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IncidentFeed",
    ()=>IncidentFeed
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$components$2f$dashboard$2f$IncidentCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/components/dashboard/IncidentCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/circle-check.mjs [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/bell.mjs [app-client] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rss$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Rss$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/rss.mjs [app-client] (ecmascript) <export default as Rss>");
"use client";
;
;
;
function IncidentFeed({ incidents, isLoading }) {
    const active = incidents.filter((i)=>i.status !== "resolved");
    const scheduled = incidents.filter((i)=>i.status === "scheduled");
    const resolved = incidents.filter((i)=>i.status === "resolved");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass-card-elevated",
        style: {
            display: "flex",
            flexDirection: "column",
            height: "100%"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "16px 18px 14px",
                    borderBottom: "1px solid var(--border-subtle)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                        size: 14,
                        color: "var(--accent-blue)"
                    }, void 0, false, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentFeed.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 13,
                            fontWeight: 700,
                            color: "var(--text-primary)"
                        },
                        children: "Incident Feed"
                    }, void 0, false, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentFeed.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    active.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            marginLeft: "auto",
                            background: "var(--status-red)",
                            color: "#fff",
                            fontSize: 11,
                            fontWeight: 700,
                            borderRadius: 999,
                            padding: "2px 8px",
                            display: "flex",
                            alignItems: "center",
                            gap: 4
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    width: 5,
                                    height: 5,
                                    borderRadius: "50%",
                                    background: "#fff",
                                    display: "inline-block",
                                    animation: "pulse-dot 1.2s ease-in-out infinite"
                                }
                            }, void 0, false, {
                                fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentFeed.tsx",
                                lineNumber: 51,
                                columnNumber: 13
                            }, this),
                            active.length,
                            " Live"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentFeed.tsx",
                        lineNumber: 37,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentFeed.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    overflowY: "auto",
                    padding: "12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8
                },
                children: [
                    isLoading && incidents.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            ...Array(4)
                        ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "shimmer",
                                style: {
                                    height: 80,
                                    borderRadius: 10
                                }
                            }, i, false, {
                                fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentFeed.tsx",
                                lineNumber: 80,
                                columnNumber: 15
                            }, this))
                    }, void 0, false),
                    !isLoading && incidents.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AllClearState, {}, void 0, false, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentFeed.tsx",
                        lineNumber: 90,
                        columnNumber: 11
                    }, this),
                    active.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                        label: "Active",
                        count: active.length,
                        color: "var(--status-red)"
                    }, void 0, false, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentFeed.tsx",
                        lineNumber: 95,
                        columnNumber: 11
                    }, this),
                    active.map((inc, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$components$2f$dashboard$2f$IncidentCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IncidentCard"], {
                            incident: inc,
                            index: i
                        }, inc.id, false, {
                            fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentFeed.tsx",
                            lineNumber: 102,
                            columnNumber: 11
                        }, this)),
                    scheduled.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                                label: "Scheduled Maintenance",
                                count: scheduled.length,
                                color: "var(--accent-blue)"
                            }, void 0, false, {
                                fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentFeed.tsx",
                                lineNumber: 108,
                                columnNumber: 13
                            }, this),
                            scheduled.map((inc, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$components$2f$dashboard$2f$IncidentCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IncidentCard"], {
                                    incident: inc,
                                    index: i
                                }, inc.id, false, {
                                    fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentFeed.tsx",
                                    lineNumber: 114,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true),
                    resolved.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                                label: "Resolved",
                                count: resolved.length,
                                color: "var(--status-green)"
                            }, void 0, false, {
                                fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentFeed.tsx",
                                lineNumber: 122,
                                columnNumber: 13
                            }, this),
                            resolved.map((inc, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$components$2f$dashboard$2f$IncidentCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IncidentCard"], {
                                    incident: inc,
                                    index: i
                                }, inc.id, false, {
                                    fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentFeed.tsx",
                                    lineNumber: 128,
                                    columnNumber: 15
                                }, this))
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentFeed.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "10px 16px",
                    borderTop: "1px solid var(--border-subtle)",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 11,
                    color: "var(--text-muted)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rss$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Rss$3e$__["Rss"], {
                        size: 11
                    }, void 0, false, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentFeed.tsx",
                        lineNumber: 146,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Auto-refreshes every 30s"
                    }, void 0, false, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentFeed.tsx",
                        lineNumber: 147,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentFeed.tsx",
                lineNumber: 135,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentFeed.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_c = IncidentFeed;
function SectionHeader({ label, count, color }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            alignItems: "center",
            gap: 6,
            paddingBottom: 4,
            marginTop: 4
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    height: 1,
                    flex: 1,
                    background: "var(--border-subtle)"
                }
            }, void 0, false, {
                fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentFeed.tsx",
                lineNumber: 172,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color
                },
                children: [
                    label,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            marginLeft: 5,
                            background: `${color}20`,
                            border: `1px solid ${color}35`,
                            padding: "0 5px",
                            borderRadius: 3
                        },
                        children: count
                    }, void 0, false, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentFeed.tsx",
                        lineNumber: 183,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentFeed.tsx",
                lineNumber: 173,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    height: 1,
                    flex: 1,
                    background: "var(--border-subtle)"
                }
            }, void 0, false, {
                fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentFeed.tsx",
                lineNumber: 195,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentFeed.tsx",
        lineNumber: 163,
        columnNumber: 5
    }, this);
}
_c1 = SectionHeader;
function AllClearState() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "48px 24px",
            textAlign: "center",
            gap: 12
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "var(--status-green-dim)",
                    border: "1px solid rgba(16,185,129,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    animation: "float 3s ease-in-out infinite"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                    size: 24,
                    color: "var(--status-green)"
                }, void 0, false, {
                    fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentFeed.tsx",
                    lineNumber: 226,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentFeed.tsx",
                lineNumber: 213,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 14,
                            fontWeight: 700,
                            color: "var(--text-primary)",
                            marginBottom: 4
                        },
                        children: "All Clear"
                    }, void 0, false, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentFeed.tsx",
                        lineNumber: 229,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 12,
                            color: "var(--text-muted)",
                            lineHeight: 1.5
                        },
                        children: [
                            "No active incidents detected",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentFeed.tsx",
                                lineNumber: 236,
                                columnNumber: 11
                            }, this),
                            "across monitored platforms"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentFeed.tsx",
                        lineNumber: 234,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentFeed.tsx",
                lineNumber: 228,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/HZTLHackathon2026/components/dashboard/IncidentFeed.tsx",
        lineNumber: 202,
        columnNumber: 5
    }, this);
}
_c2 = AllClearState;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "IncidentFeed");
__turbopack_context__.k.register(_c1, "SectionHeader");
__turbopack_context__.k.register(_c2, "AllClearState");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SitecoreBreakdown",
    ()=>SitecoreBreakdown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/layers.mjs [app-client] (ecmascript) <export default as Layers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/chevron-down.mjs [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/chevron-up.mjs [app-client] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/clock.mjs [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/triangle-alert.mjs [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/circle-check-big.mjs [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/info.mjs [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/flame.mjs [app-client] (ecmascript) <export default as Flame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/shield-alert.mjs [app-client] (ecmascript) <export default as ShieldAlert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/external-link.mjs [app-client] (ecmascript) <export default as ExternalLink>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
// ─── Status config ─────────────────────────────────────────────────────────────
const STATUS_COLOR = {
    operational: "var(--status-green)",
    degraded_performance: "var(--status-yellow)",
    partial_outage: "var(--status-orange, #f97316)",
    major_outage: "var(--status-red)",
    unknown: "var(--status-gray)"
};
const STATUS_LABEL = {
    operational: "Operational",
    degraded_performance: "Degraded",
    partial_outage: "Partial Outage",
    major_outage: "Major Outage",
    unknown: "Unknown"
};
const PRIORITY_LABEL = {
    critical: {
        label: "Outage",
        color: "#ef4444",
        bg: "rgba(239,68,68,0.12)",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
            size: 11
        }, void 0, false, {
            fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
            lineNumber: 61,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0))
    },
    major: {
        label: "Degraded",
        color: "#f59e0b",
        bg: "rgba(245,158,11,0.12)",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
            size: 11
        }, void 0, false, {
            fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
            lineNumber: 67,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0))
    },
    minor: {
        label: "Information",
        color: "#3b82f6",
        bg: "rgba(59,130,246,0.12)",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
            size: 11
        }, void 0, false, {
            fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
            lineNumber: 73,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0))
    },
    none: {
        label: "Resolved",
        color: "#10b981",
        bg: "rgba(16,185,129,0.12)",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
            size: 11
        }, void 0, false, {
            fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
            lineNumber: 79,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0))
    }
};
const PRODUCT_ABBR = {
    "xm-cloud": "XMC",
    "content-hub": "CH",
    "search": "SRH",
    "cdp": "CDP",
    "personalize": "PRS",
    "send": "SND",
    "ai": "AI",
    "managed-cloud": "MCS",
    "cloud-portal": "CLD"
};
// ─── Helpers ──────────────────────────────────────────────────────────────────
function timeAgo(dateStr) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
}
function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });
}
function HistoryBar({ incidents }) {
    const slots = 30;
    const now = Date.now();
    const dayMs = 86400000;
    const days = Array.from({
        length: slots
    }, (_, i)=>{
        const start = now - (slots - 1 - i) * dayMs;
        const end = start + dayMs;
        const hit = incidents.find((inc)=>{
            const t = new Date(inc.startedAt).getTime();
            return t >= start && t < end;
        });
        return hit?.overallStatus ?? "operational";
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            gap: 2,
            alignItems: "flex-end",
            height: 18
        },
        children: days.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                title: s,
                style: {
                    flex: 1,
                    height: s === "operational" ? 10 : s === "degraded_performance" ? 14 : 18,
                    borderRadius: 2,
                    background: STATUS_COLOR[s] ?? STATUS_COLOR.unknown,
                    opacity: s === "operational" ? 0.3 : 1,
                    transition: "height 0.2s"
                }
            }, i, false, {
                fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                lineNumber: 134,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
        lineNumber: 132,
        columnNumber: 5
    }, this);
}
_c = HistoryBar;
// ─── Active Incident Card (prominent banner) ──────────────────────────────────
function ActiveIncidentBanner({ incident }) {
    const cfg = PRIORITY_LABEL[incident.impact] ?? PRIORITY_LABEL.minor;
    const isSerious = incident.impact === "critical" || incident.impact === "major";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: "12px 14px",
            borderRadius: 10,
            background: cfg.bg,
            border: `1px solid ${cfg.color}40`,
            marginBottom: 6,
            position: "relative",
            overflow: "hidden"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 3,
                    background: cfg.color,
                    borderRadius: "3px 0 0 3px"
                }
            }, void 0, false, {
                fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                lineNumber: 170,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    paddingLeft: 8
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            marginBottom: 5
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 4,
                                    padding: "2px 8px",
                                    borderRadius: 999,
                                    fontSize: 10,
                                    fontWeight: 700,
                                    color: cfg.color,
                                    background: cfg.bg,
                                    border: `1px solid ${cfg.color}50`,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.04em"
                                },
                                children: [
                                    cfg.icon,
                                    cfg.label
                                ]
                            }, void 0, true, {
                                fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                lineNumber: 184,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 10,
                                    fontWeight: 600,
                                    color: "var(--text-muted)",
                                    background: "var(--bg-glass)",
                                    padding: "2px 7px",
                                    borderRadius: 5
                                },
                                children: incident.affectedComponents[0] ?? "Sitecore"
                            }, void 0, false, {
                                fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                lineNumber: 205,
                                columnNumber: 11
                            }, this),
                            isSerious && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    position: "relative",
                                    width: 8,
                                    height: 8,
                                    marginLeft: "auto"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: 8,
                                            height: 8,
                                            borderRadius: "50%",
                                            background: cfg.color
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                        lineNumber: 221,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            position: "absolute",
                                            inset: 0,
                                            borderRadius: "50%",
                                            background: cfg.color,
                                            animation: "pulse-ring 1.8s ease-out infinite"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                        lineNumber: 222,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                lineNumber: 220,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 10,
                                    color: "var(--text-muted)",
                                    marginLeft: isSerious ? 0 : "auto"
                                },
                                children: timeAgo(incident.startedAt)
                            }, void 0, false, {
                                fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                lineNumber: 233,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                        lineNumber: 182,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 12,
                            fontWeight: 600,
                            color: "var(--text-primary)",
                            lineHeight: 1.4,
                            marginBottom: 4
                        },
                        children: incident.title
                    }, void 0, false, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                        lineNumber: 239,
                        columnNumber: 9
                    }, this),
                    incident.description && incident.description !== incident.title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 11,
                            color: "var(--text-muted)",
                            lineHeight: 1.5,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            marginBottom: 5
                        },
                        children: incident.description.replace(/<[^>]+>/g, "")
                    }, void 0, false, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                        lineNumber: 253,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            marginTop: 4
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                size: 10,
                                color: "var(--text-muted)"
                            }, void 0, false, {
                                fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                lineNumber: 271,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 10,
                                    color: "var(--text-muted)"
                                },
                                children: [
                                    "Started: ",
                                    formatDate(incident.startedAt)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                lineNumber: 272,
                                columnNumber: 11
                            }, this),
                            incident.affectedRegions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: "var(--border-subtle)"
                                        },
                                        children: "·"
                                    }, void 0, false, {
                                        fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                        lineNumber: 277,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 10,
                                            color: "var(--text-muted)"
                                        },
                                        children: incident.affectedRegions.join(", ")
                                    }, void 0, false, {
                                        fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                        lineNumber: 278,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: incident.url,
                                target: "_blank",
                                rel: "noopener noreferrer",
                                style: {
                                    marginLeft: "auto",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 4,
                                    fontSize: 10,
                                    fontWeight: 600,
                                    color: cfg.color,
                                    textDecoration: "none"
                                },
                                children: [
                                    "Details ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                        size: 9
                                    }, void 0, false, {
                                        fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                        lineNumber: 298,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                lineNumber: 283,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                        lineNumber: 270,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                lineNumber: 180,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
        lineNumber: 158,
        columnNumber: 5
    }, this);
}
_c1 = ActiveIncidentBanner;
function SitecoreBreakdown({ products }) {
    _s();
    const [expandedProduct, setExpandedProduct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const entries = Object.values(products);
    const allOperational = entries.every((p)=>p.status === "operational");
    const degradedCount = entries.filter((p)=>p.status !== "operational").length;
    // Collect all active incidents — this is what the user was asking about
    const activeIncidents = entries.flatMap((p)=>p.incident ? [
            p.incident
        ] : []).filter((inc, idx, arr)=>arr.findIndex((x)=>x.id === inc.id) === idx) // deduplicate
    .sort((a, b)=>{
        // Sort: critical > major > minor, then by date
        const impactOrder = {
            critical: 0,
            major: 1,
            minor: 2,
            none: 3
        };
        const iA = impactOrder[a.impact] ?? 3;
        const iB = impactOrder[b.impact] ?? 3;
        if (iA !== iB) return iA - iB;
        return new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime();
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass-card",
        style: {
            padding: "20px 22px"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 16
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            background: "rgba(235,31,31,0.12)",
                            border: "1px solid rgba(235,31,31,0.22)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"], {
                            size: 15,
                            color: "#eb1f1f"
                        }, void 0, false, {
                            fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                            lineNumber: 340,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                        lineNumber: 332,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 13,
                                    fontWeight: 700,
                                    color: "var(--text-primary)"
                                },
                                children: "Sitecore Product Suite"
                            }, void 0, false, {
                                fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                lineNumber: 343,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 11,
                                    color: "var(--text-muted)",
                                    marginTop: 1
                                },
                                children: "9 products · Live incidents · 30-day history"
                            }, void 0, false, {
                                fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                lineNumber: 346,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                        lineNumber: 342,
                        columnNumber: 9
                    }, this),
                    allOperational ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 5,
                            padding: "4px 10px",
                            borderRadius: 999,
                            fontSize: 11,
                            fontWeight: 600,
                            color: "var(--status-green)",
                            background: "var(--status-green-dim)",
                            border: "1px solid rgba(16,185,129,0.25)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    width: 6,
                                    height: 6,
                                    borderRadius: "50%",
                                    background: "var(--status-green)",
                                    display: "inline-block"
                                }
                            }, void 0, false, {
                                fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                lineNumber: 358,
                                columnNumber: 13
                            }, this),
                            "All Operational"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                        lineNumber: 352,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 5,
                            padding: "4px 10px",
                            borderRadius: 999,
                            fontSize: 11,
                            fontWeight: 600,
                            color: "var(--status-red)",
                            background: "var(--status-red-dim)",
                            border: "1px solid rgba(239,68,68,0.3)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__["ShieldAlert"], {
                                size: 12
                            }, void 0, false, {
                                fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                lineNumber: 368,
                                columnNumber: 13
                            }, this),
                            degradedCount,
                            " Affected"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                        lineNumber: 362,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                lineNumber: 331,
                columnNumber: 7
            }, this),
            activeIncidents.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: 16
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 10,
                            fontWeight: 700,
                            color: "var(--text-muted)",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            marginBottom: 8,
                            display: "flex",
                            alignItems: "center",
                            gap: 6
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    width: 6,
                                    height: 6,
                                    borderRadius: "50%",
                                    background: "var(--status-red)",
                                    display: "inline-block"
                                }
                            }, void 0, false, {
                                fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                lineNumber: 382,
                                columnNumber: 13
                            }, this),
                            "Active Events (",
                            activeIncidents.length,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                        lineNumber: 377,
                        columnNumber: 11
                    }, this),
                    activeIncidents.map((inc)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ActiveIncidentBanner, {
                            incident: inc
                        }, inc.id, false, {
                            fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                            lineNumber: 386,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                lineNumber: 376,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 10,
                            fontWeight: 700,
                            color: "var(--text-muted)",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            marginBottom: 8
                        },
                        children: "Product Status · Click to expand history"
                    }, void 0, false, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                        lineNumber: 393,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 6
                        },
                        children: entries.map((product)=>{
                            const color = STATUS_COLOR[product.status] ?? STATUS_COLOR.unknown;
                            const isOk = product.status === "operational";
                            const isExpanded = expandedProduct === product.product;
                            const history = product.history ?? [];
                            const uptime = product.uptime30d ?? (isOk ? 100 : 95);
                            const incidentCount = product.incidentCount30d ?? 0;
                            const abbr = PRODUCT_ABBR[product.product] ?? product.product.toUpperCase().slice(0, 3);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        onClick: ()=>setExpandedProduct(isExpanded ? null : product.product),
                                        style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 10,
                                            padding: "9px 11px",
                                            borderRadius: 9,
                                            background: isOk ? "var(--bg-glass)" : `${color}10`,
                                            border: `1px solid ${isOk ? "var(--border-subtle)" : `${color}35`}`,
                                            cursor: "pointer",
                                            transition: "all 0.18s ease"
                                        },
                                        className: "interactive",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    width: 36,
                                                    height: 26,
                                                    borderRadius: 6,
                                                    background: `${color}15`,
                                                    border: `1px solid ${color}30`,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    fontSize: 9,
                                                    fontWeight: 800,
                                                    letterSpacing: "0.05em",
                                                    color,
                                                    fontFamily: '"JetBrains Mono", monospace',
                                                    flexShrink: 0
                                                },
                                                children: abbr
                                            }, void 0, false, {
                                                fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                                lineNumber: 424,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    flex: 1,
                                                    minWidth: 0
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: 6,
                                                            marginBottom: 4
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    position: "relative",
                                                                    width: 7,
                                                                    height: 7,
                                                                    flexShrink: 0
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            width: 7,
                                                                            height: 7,
                                                                            borderRadius: "50%",
                                                                            background: color
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                                                        lineNumber: 439,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    !isOk && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            position: "absolute",
                                                                            inset: 0,
                                                                            borderRadius: "50%",
                                                                            background: color,
                                                                            animation: "pulse-ring 1.8s ease-out infinite"
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                                                        lineNumber: 441,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                                                lineNumber: 438,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: 12,
                                                                    fontWeight: 600,
                                                                    color: "var(--text-primary)"
                                                                },
                                                                children: product.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                                                lineNumber: 444,
                                                                columnNumber: 23
                                                            }, this),
                                                            !isOk && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    fontSize: 10,
                                                                    fontWeight: 700,
                                                                    color,
                                                                    padding: "1px 6px",
                                                                    borderRadius: 999,
                                                                    background: `${color}18`,
                                                                    flexShrink: 0
                                                                },
                                                                children: STATUS_LABEL[product.status]
                                                            }, void 0, false, {
                                                                fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                                                lineNumber: 448,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                                        lineNumber: 436,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HistoryBar, {
                                                        incidents: history
                                                    }, void 0, false, {
                                                        fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                                        lineNumber: 453,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                                lineNumber: 435,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    textAlign: "right",
                                                    flexShrink: 0,
                                                    marginLeft: 8
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: 12,
                                                            fontWeight: 700,
                                                            color: uptime >= 99.5 ? "var(--status-green)" : uptime >= 95 ? "var(--status-yellow)" : "var(--status-red)"
                                                        },
                                                        children: [
                                                            uptime.toFixed(1),
                                                            "%"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                                        lineNumber: 458,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: 9,
                                                            color: "var(--text-muted)",
                                                            marginTop: 1
                                                        },
                                                        children: incidentCount > 0 ? `${incidentCount} event${incidentCount > 1 ? "s" : ""}` : "clean"
                                                    }, void 0, false, {
                                                        fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                                        lineNumber: 464,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                                lineNumber: 457,
                                                columnNumber: 19
                                            }, this),
                                            isExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                                size: 13,
                                                color: "var(--text-muted)"
                                            }, void 0, false, {
                                                fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                                lineNumber: 469,
                                                columnNumber: 33
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                size: 13,
                                                color: "var(--text-muted)"
                                            }, void 0, false, {
                                                fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                                lineNumber: 469,
                                                columnNumber: 85
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                        lineNumber: 412,
                                        columnNumber: 17
                                    }, this),
                                    isExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            margin: "2px 0 4px 10px",
                                            padding: "12px 14px",
                                            borderRadius: "0 0 9px 9px",
                                            background: "var(--bg-glass)",
                                            border: "1px solid var(--border-subtle)",
                                            borderTop: "none"
                                        },
                                        children: history.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 6,
                                                color: "var(--status-green)",
                                                fontSize: 12
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                    size: 13
                                                }, void 0, false, {
                                                    fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                                    lineNumber: 484,
                                                    columnNumber: 25
                                                }, this),
                                                "No incidents recorded — 100% uptime"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                            lineNumber: 483,
                                            columnNumber: 23
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        fontSize: 10,
                                                        fontWeight: 700,
                                                        color: "var(--text-muted)",
                                                        textTransform: "uppercase",
                                                        letterSpacing: "0.08em",
                                                        marginBottom: 8
                                                    },
                                                    children: [
                                                        "Incident History (",
                                                        history.length,
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                                    lineNumber: 489,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: 5
                                                    },
                                                    children: history.map((inc)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: "flex",
                                                                alignItems: "flex-start",
                                                                gap: 8,
                                                                padding: "8px 10px",
                                                                borderRadius: 8,
                                                                background: "var(--bg-base)",
                                                                border: "1px solid var(--border-subtle)"
                                                            },
                                                            children: [
                                                                inc.status === "resolved" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                                    size: 11,
                                                                    color: "var(--status-green)",
                                                                    style: {
                                                                        marginTop: 1,
                                                                        flexShrink: 0
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                                                    lineNumber: 504,
                                                                    columnNumber: 35
                                                                }, this) : inc.impact === "critical" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                                                                    size: 11,
                                                                    color: "var(--status-red)",
                                                                    style: {
                                                                        marginTop: 1,
                                                                        flexShrink: 0
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                                                    lineNumber: 506,
                                                                    columnNumber: 35
                                                                }, this) : inc.impact === "major" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                                    size: 11,
                                                                    color: "var(--status-yellow)",
                                                                    style: {
                                                                        marginTop: 1,
                                                                        flexShrink: 0
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                                                    lineNumber: 508,
                                                                    columnNumber: 35
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                                    size: 11,
                                                                    color: "#3b82f6",
                                                                    style: {
                                                                        marginTop: 1,
                                                                        flexShrink: 0
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                                                    lineNumber: 509,
                                                                    columnNumber: 35
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        flex: 1,
                                                                        minWidth: 0
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: {
                                                                                fontSize: 11,
                                                                                fontWeight: 600,
                                                                                color: "var(--text-primary)",
                                                                                overflow: "hidden",
                                                                                textOverflow: "ellipsis",
                                                                                whiteSpace: "nowrap"
                                                                            },
                                                                            children: inc.title
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                                                            lineNumber: 511,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        inc.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            style: {
                                                                                fontSize: 10,
                                                                                color: "var(--text-muted)",
                                                                                marginTop: 2,
                                                                                overflow: "hidden",
                                                                                display: "-webkit-box",
                                                                                WebkitLineClamp: 2,
                                                                                WebkitBoxOrient: "vertical"
                                                                            },
                                                                            children: inc.description.replace(/<[^>]+>/g, "").slice(0, 160)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                                                            lineNumber: 515,
                                                                            columnNumber: 35
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                                                    lineNumber: 510,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        display: "flex",
                                                                        flexDirection: "column",
                                                                        alignItems: "flex-end",
                                                                        gap: 2,
                                                                        flexShrink: 0
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            style: {
                                                                                fontSize: 9,
                                                                                color: "var(--text-muted)"
                                                                            },
                                                                            children: timeAgo(inc.startedAt)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                                                            lineNumber: 525,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        inc.status === "resolved" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            style: {
                                                                                fontSize: 9,
                                                                                color: "var(--status-green)",
                                                                                fontWeight: 600
                                                                            },
                                                                            children: "resolved"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                                                            lineNumber: 527,
                                                                            columnNumber: 35
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                                                    lineNumber: 524,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, inc.id, true, {
                                                            fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                                            lineNumber: 494,
                                                            columnNumber: 29
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                                    lineNumber: 492,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                        lineNumber: 474,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, product.product, true, {
                                fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                lineNumber: 411,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                        lineNumber: 400,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                lineNumber: 392,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: 14,
                    paddingTop: 10,
                    borderTop: "1px solid var(--border-subtle)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 10,
                            color: "var(--text-muted)"
                        },
                        children: "Source: support.sitecore.com/status · auto-refreshed every 30s"
                    }, void 0, false, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                        lineNumber: 548,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "https://support.sitecore.com/status",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        style: {
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                            fontSize: 10,
                            fontWeight: 600,
                            color: "#eb1f1f",
                            textDecoration: "none"
                        },
                        children: [
                            "Full Status ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                size: 9
                            }, void 0, false, {
                                fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                                lineNumber: 560,
                                columnNumber: 23
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                        lineNumber: 551,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
                lineNumber: 544,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx",
        lineNumber: 329,
        columnNumber: 5
    }, this);
}
_s(SitecoreBreakdown, "+OGiaBm5c/olAYkLz1qfGotYFaU=");
_c2 = SitecoreBreakdown;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "HistoryBar");
__turbopack_context__.k.register(_c1, "ActiveIncidentBanner");
__turbopack_context__.k.register(_c2, "SitecoreBreakdown");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/HZTLHackathon2026/components/dashboard/HealthChart.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HealthChart",
    ()=>HealthChart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/recharts/es6/chart/BarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/recharts/es6/cartesian/Bar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/recharts/es6/component/Cell.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/lucide-react/dist/esm/icons/trending-up.mjs [app-client] (ecmascript) <export default as TrendingUp>");
"use client";
;
;
;
function getHealthColor(health) {
    if (health >= 95) return "#10b981";
    if (health >= 80) return "#f59e0b";
    if (health >= 50) return "#f97316";
    return "#ef4444";
}
function HealthChart({ platforms }) {
    const data = platforms.map((p)=>({
            name: p.name,
            health: p.healthPercent,
            incidents: p.activeIncidents.length,
            color: getHealthColor(p.healthPercent)
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass-card",
        style: {
            padding: "18px 20px"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 20
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                        size: 15,
                        color: "var(--accent-blue)"
                    }, void 0, false, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/HealthChart.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 13,
                            fontWeight: 700,
                            color: "var(--text-primary)"
                        },
                        children: "Platform Health Overview"
                    }, void 0, false, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/HealthChart.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            marginLeft: "auto",
                            fontSize: 11,
                            color: "var(--text-muted)"
                        },
                        children: "Current snapshot"
                    }, void 0, false, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/HealthChart.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/HZTLHackathon2026/components/dashboard/HealthChart.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
                width: "100%",
                height: 180,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
                    data: data,
                    barSize: 32,
                    margin: {
                        top: 4,
                        right: 4,
                        left: -20,
                        bottom: 0
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                            vertical: false,
                            stroke: "rgba(255,255,255,0.05)",
                            strokeDasharray: "4 4"
                        }, void 0, false, {
                            fileName: "[project]/HZTLHackathon2026/components/dashboard/HealthChart.tsx",
                            lineNumber: 63,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                            dataKey: "name",
                            tick: {
                                fontSize: 11,
                                fill: "var(--text-muted)",
                                fontWeight: 500
                            },
                            axisLine: false,
                            tickLine: false
                        }, void 0, false, {
                            fileName: "[project]/HZTLHackathon2026/components/dashboard/HealthChart.tsx",
                            lineNumber: 68,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                            domain: [
                                0,
                                100
                            ],
                            tick: {
                                fontSize: 10,
                                fill: "var(--text-muted)"
                            },
                            axisLine: false,
                            tickLine: false,
                            tickFormatter: (v)=>`${v}%`
                        }, void 0, false, {
                            fileName: "[project]/HZTLHackathon2026/components/dashboard/HealthChart.tsx",
                            lineNumber: 74,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                            contentStyle: {
                                background: "var(--bg-secondary)",
                                border: "1px solid var(--border-default)",
                                borderRadius: 10,
                                fontSize: 12,
                                color: "var(--text-primary)",
                                boxShadow: "var(--shadow-elevated)"
                            },
                            labelStyle: {
                                fontWeight: 700,
                                marginBottom: 4,
                                color: "var(--text-primary)"
                            },
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            formatter: (value, name)=>[
                                    name === "health" ? `${value}%` : value,
                                    name === "health" ? "Health" : "Incidents"
                                ],
                            cursor: {
                                fill: "rgba(255,255,255,0.03)",
                                radius: 6
                            }
                        }, void 0, false, {
                            fileName: "[project]/HZTLHackathon2026/components/dashboard/HealthChart.tsx",
                            lineNumber: 81,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                            dataKey: "health",
                            radius: [
                                6,
                                6,
                                0,
                                0
                            ],
                            children: data.map((entry, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cell"], {
                                    fill: entry.color,
                                    fillOpacity: 0.85
                                }, `cell-${index}`, false, {
                                    fileName: "[project]/HZTLHackathon2026/components/dashboard/HealthChart.tsx",
                                    lineNumber: 100,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/HZTLHackathon2026/components/dashboard/HealthChart.tsx",
                            lineNumber: 98,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/HZTLHackathon2026/components/dashboard/HealthChart.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/HZTLHackathon2026/components/dashboard/HealthChart.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    justifyContent: "center",
                    gap: 20,
                    marginTop: 12,
                    flexWrap: "wrap"
                },
                children: [
                    {
                        color: "#10b981",
                        label: "≥95% Healthy"
                    },
                    {
                        color: "#f59e0b",
                        label: "80–94% Degraded"
                    },
                    {
                        color: "#f97316",
                        label: "50–79% Partial"
                    },
                    {
                        color: "#ef4444",
                        label: "<50% Outage"
                    }
                ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            fontSize: 10,
                            color: "var(--text-muted)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    width: 10,
                                    height: 10,
                                    borderRadius: 2,
                                    background: item.color,
                                    display: "inline-block"
                                }
                            }, void 0, false, {
                                fileName: "[project]/HZTLHackathon2026/components/dashboard/HealthChart.tsx",
                                lineNumber: 126,
                                columnNumber: 13
                            }, this),
                            item.label
                        ]
                    }, item.label, true, {
                        fileName: "[project]/HZTLHackathon2026/components/dashboard/HealthChart.tsx",
                        lineNumber: 122,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/HZTLHackathon2026/components/dashboard/HealthChart.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/HZTLHackathon2026/components/dashboard/HealthChart.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
_c = HealthChart;
var _c;
__turbopack_context__.k.register(_c, "HealthChart");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/HZTLHackathon2026/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/node_modules/swr/dist/index/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$components$2f$layout$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/components/layout/Header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$components$2f$layout$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/components/layout/Sidebar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$components$2f$dashboard$2f$StatsBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/components/dashboard/StatsBar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$components$2f$dashboard$2f$PlatformCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/components/dashboard/PlatformCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$components$2f$dashboard$2f$IncidentFeed$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/components/dashboard/IncidentFeed.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$components$2f$dashboard$2f$SitecoreBreakdown$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/components/dashboard/SitecoreBreakdown.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$components$2f$dashboard$2f$HealthChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/HZTLHackathon2026/components/dashboard/HealthChart.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
// ─── Data Fetcher ─────────────────────────────────────────────────────────────
async function fetcher(url) {
    const res = await fetch(url, {
        cache: "no-store"
    });
    if (!res.ok) throw new Error("Failed to fetch status");
    return res.json();
}
function DashboardPage() {
    _s();
    const [selectedPlatform, setSelectedPlatform] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const { data: snapshot, isLoading, isValidating, mutate } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"])("/api/status", fetcher, {
        refreshInterval: 30_000,
        revalidateOnFocus: true,
        keepPreviousData: true
    });
    const handleRefresh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DashboardPage.useCallback[handleRefresh]": ()=>{
            mutate();
        }
    }["DashboardPage.useCallback[handleRefresh]"], [
        mutate
    ]);
    // Derived values
    const platforms = snapshot ? Object.values(snapshot.platforms) : [];
    const filteredPlatforms = selectedPlatform === "all" ? platforms : platforms.filter((p)=>p.platform === selectedPlatform);
    const sidebarPlatforms = [
        {
            id: "all",
            label: "All Platforms"
        },
        ...platforms.map((p)=>({
                id: p.platform,
                label: p.name,
                status: p.status
            }))
    ];
    const globalHealth = platforms.length > 0 ? Math.round(platforms.reduce((sum, p)=>sum + p.healthPercent, 0) / platforms.length) : 100;
    const activeCount = snapshot?.stats.activeIncidentCount ?? 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "app-shell",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$components$2f$layout$2f$Sidebar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sidebar"], {
                platforms: sidebarPlatforms,
                selected: selectedPlatform,
                onSelect: setSelectedPlatform,
                activeIncidentCount: activeCount,
                globalHealth: globalHealth
            }, void 0, false, {
                fileName: "[project]/HZTLHackathon2026/app/page.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "main-content",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$components$2f$layout$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Header"], {
                        activeIncidentCount: activeCount,
                        lastPollAt: snapshot?.stats.lastPollAt ?? null,
                        isLoading: isLoading || isValidating,
                        onRefresh: handleRefresh
                    }, void 0, false, {
                        fileName: "[project]/HZTLHackathon2026/app/page.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "page-content",
                        children: [
                            snapshot && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$components$2f$dashboard$2f$StatsBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StatsBar"], {
                                stats: snapshot.stats
                            }, void 0, false, {
                                fileName: "[project]/HZTLHackathon2026/app/page.tsx",
                                lineNumber: 91,
                                columnNumber: 24
                            }, this),
                            isLoading && !snapshot && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatsBarSkeleton, {}, void 0, false, {
                                fileName: "[project]/HZTLHackathon2026/app/page.tsx",
                                lineNumber: 92,
                                columnNumber: 38
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "dashboard-layout",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: 20
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-between"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                                style: {
                                                                    fontSize: 18,
                                                                    fontWeight: 800,
                                                                    color: "var(--text-primary)",
                                                                    margin: 0,
                                                                    letterSpacing: "-0.02em"
                                                                },
                                                                children: selectedPlatform === "all" ? "All Platforms" : filteredPlatforms[0]?.name ?? "Platform"
                                                            }, void 0, false, {
                                                                fileName: "[project]/HZTLHackathon2026/app/page.tsx",
                                                                lineNumber: 101,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                style: {
                                                                    fontSize: 12,
                                                                    color: "var(--text-muted)",
                                                                    margin: "2px 0 0"
                                                                },
                                                                children: selectedPlatform === "all" ? `Monitoring ${platforms.length} platforms in real-time` : `Showing detailed status for ${filteredPlatforms[0]?.name}`
                                                            }, void 0, false, {
                                                                fileName: "[project]/HZTLHackathon2026/app/page.tsx",
                                                                lineNumber: 112,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/HZTLHackathon2026/app/page.tsx",
                                                        lineNumber: 100,
                                                        columnNumber: 17
                                                    }, this),
                                                    snapshot && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            padding: "5px 14px",
                                                            borderRadius: 999,
                                                            fontSize: 12,
                                                            fontWeight: 600,
                                                            ...activeCount === 0 ? {
                                                                background: "var(--status-green-dim)",
                                                                color: "var(--status-green)",
                                                                border: "1px solid rgba(16,185,129,0.25)"
                                                            } : {
                                                                background: "var(--status-red-dim)",
                                                                color: "var(--status-red)",
                                                                border: "1px solid rgba(239,68,68,0.3)"
                                                            }
                                                        },
                                                        children: activeCount === 0 ? "🟢 All Systems Operational" : `🔴 ${activeCount} Active Incident${activeCount !== 1 ? "s" : ""}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/HZTLHackathon2026/app/page.tsx",
                                                        lineNumber: 127,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/HZTLHackathon2026/app/page.tsx",
                                                lineNumber: 99,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "platform-grid",
                                                children: isLoading && !snapshot ? [
                                                    ...Array(6)
                                                ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlatformCardSkeleton, {}, i, false, {
                                                        fileName: "[project]/HZTLHackathon2026/app/page.tsx",
                                                        lineNumber: 156,
                                                        columnNumber: 49
                                                    }, this)) : filteredPlatforms.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$components$2f$dashboard$2f$PlatformCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlatformCard"], {
                                                        platform: p,
                                                        animationDelay: i * 80
                                                    }, p.platform, false, {
                                                        fileName: "[project]/HZTLHackathon2026/app/page.tsx",
                                                        lineNumber: 158,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/HZTLHackathon2026/app/page.tsx",
                                                lineNumber: 154,
                                                columnNumber: 15
                                            }, this),
                                            snapshot && (selectedPlatform === "all" || selectedPlatform === "sitecore") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$components$2f$dashboard$2f$SitecoreBreakdown$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SitecoreBreakdown"], {
                                                products: snapshot.sitecoreProducts
                                            }, void 0, false, {
                                                fileName: "[project]/HZTLHackathon2026/app/page.tsx",
                                                lineNumber: 164,
                                                columnNumber: 17
                                            }, this),
                                            snapshot && platforms.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$components$2f$dashboard$2f$HealthChart$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HealthChart"], {
                                                platforms: platforms
                                            }, void 0, false, {
                                                fileName: "[project]/HZTLHackathon2026/app/page.tsx",
                                                lineNumber: 169,
                                                columnNumber: 17
                                            }, this),
                                            snapshot && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "glass-card",
                                                style: {
                                                    padding: "18px 20px"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontSize: 13,
                                                            fontWeight: 700,
                                                            color: "var(--text-primary)",
                                                            marginBottom: 12
                                                        },
                                                        children: "📌 Embeddable Status Badges"
                                                    }, void 0, false, {
                                                        fileName: "[project]/HZTLHackathon2026/app/page.tsx",
                                                        lineNumber: 175,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            gap: 8
                                                        },
                                                        children: [
                                                            "vercel",
                                                            "netlify",
                                                            "github",
                                                            "cloudflare",
                                                            "npm"
                                                        ].map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    gap: 12,
                                                                    padding: "8px 12px",
                                                                    borderRadius: 8,
                                                                    background: "var(--bg-glass)",
                                                                    border: "1px solid var(--border-subtle)"
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                        src: `/api/badge/${p}`,
                                                                        alt: `${p} status badge`,
                                                                        style: {
                                                                            height: 20
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/HZTLHackathon2026/app/page.tsx",
                                                                        lineNumber: 199,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                                                        style: {
                                                                            fontSize: 10,
                                                                            color: "var(--text-muted)",
                                                                            fontFamily: '"JetBrains Mono", monospace',
                                                                            flex: 1,
                                                                            overflow: "hidden",
                                                                            textOverflow: "ellipsis",
                                                                            whiteSpace: "nowrap"
                                                                        },
                                                                        children: `<img src="${("TURBOPACK compile-time truthy", 1) ? window.location.origin : "TURBOPACK unreachable"}/api/badge/${p}" />`
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/HZTLHackathon2026/app/page.tsx",
                                                                        lineNumber: 204,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, p, true, {
                                                                fileName: "[project]/HZTLHackathon2026/app/page.tsx",
                                                                lineNumber: 187,
                                                                columnNumber: 23
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/HZTLHackathon2026/app/page.tsx",
                                                        lineNumber: 185,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/HZTLHackathon2026/app/page.tsx",
                                                lineNumber: 174,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/HZTLHackathon2026/app/page.tsx",
                                        lineNumber: 97,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            position: "sticky",
                                            top: 80,
                                            maxHeight: "calc(100vh - 100px)",
                                            overflow: "hidden",
                                            display: "flex",
                                            flexDirection: "column"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$components$2f$dashboard$2f$IncidentFeed$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IncidentFeed"], {
                                            incidents: snapshot?.activeIncidents ?? [],
                                            isLoading: isLoading && !snapshot
                                        }, void 0, false, {
                                            fileName: "[project]/HZTLHackathon2026/app/page.tsx",
                                            lineNumber: 226,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/HZTLHackathon2026/app/page.tsx",
                                        lineNumber: 225,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/HZTLHackathon2026/app/page.tsx",
                                lineNumber: 95,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/HZTLHackathon2026/app/page.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/HZTLHackathon2026/app/page.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/HZTLHackathon2026/app/page.tsx",
        lineNumber: 68,
        columnNumber: 5
    }, this);
}
_s(DashboardPage, "xzmBOScW/iHDRDMGJjrZSoAb2eo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$swr$2f$dist$2f$index$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"]
    ];
});
_c = DashboardPage;
// ─── Skeletons ────────────────────────────────────────────────────────────────
function PlatformCardSkeleton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass-card shimmer",
        style: {
            height: 160,
            borderRadius: 14
        }
    }, void 0, false, {
        fileName: "[project]/HZTLHackathon2026/app/page.tsx",
        lineNumber: 242,
        columnNumber: 5
    }, this);
}
_c1 = PlatformCardSkeleton;
function StatsBarSkeleton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 12,
            marginBottom: 24
        },
        children: [
            ...Array(6)
        ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$HZTLHackathon2026$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass-card shimmer",
                style: {
                    height: 84,
                    borderRadius: 14
                }
            }, i, false, {
                fileName: "[project]/HZTLHackathon2026/app/page.tsx",
                lineNumber: 257,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/HZTLHackathon2026/app/page.tsx",
        lineNumber: 248,
        columnNumber: 5
    }, this);
}
_c2 = StatsBarSkeleton;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "DashboardPage");
__turbopack_context__.k.register(_c1, "PlatformCardSkeleton");
__turbopack_context__.k.register(_c2, "StatsBarSkeleton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=HZTLHackathon2026_0tt8._0._.js.map