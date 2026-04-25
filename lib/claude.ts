import Anthropic from "@anthropic-ai/sdk";

/**
 * @fileoverview
 * Unified Claude Service for HZ LiveWatch.
 * Handles both bulk incident digests and single-incident deep-dives.
 */

// ─── Environment Configuration ────────────────────────────────────────────────

const CLAUDE_MODEL = process.env.CLAUDE_MODEL || "claude-3-haiku-20240307";
const MAX_TOKENS = Number(process.env.ANTHROPIC_API_MAX_TOKENS) || 4096;
const TEMPERATURE = 0; // Deterministic for JSON

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// ─── Types ───────────────────────────────────────────────────────────────────

export type ClaudeIncidentInput = {
  p: string;    // platform
  t: string;    // title
  s: string;    // status
  i: string;    // impact
  c: string[];  // components
  b: string;    // body/update
  at: string;   // timestamp
  url: string;  // link
  type: "incident" | "maintenance";
};

export type ClaudeIncidentAnalysis = {
  platform: string;
  title: string;
  what: string;
  who: string;
  action: string;
  sev: "🔴" | "🟠" | "🟡" | "🔵" | "✅";
  url: string;
};

export type ClaudeAnalysisResult = {
  summary: string;
  incidents: ClaudeIncidentAnalysis[];
};

// ─── Prompts ──────────────────────────────────────────────────────────────────

const BASE_SYSTEM_PROMPT = `You are a platform reliability analyst for a digital agency.
Analyze incident data from platform status pages (Vercel, GitHub, Cloudflare, Netlify, npm, Sitecore).

Rules:
1. Explain WHAT actually broke/happened — do not repeat the status text.
2. WHO: Identify specific team workflows affected (e.g., "CI/CD deploys", "Image transformations").
3. ACTION: One concrete next step for the team.
4. SEV: Use strictly: 🔴 (Critical/Major), 🟠 (Partial), 🟡 (Degraded/Minor), 🔵 (Maintenance), ✅ (Resolved).
5. Respond ONLY with RAW JSON. No markdown fences.`;

// ─── Main Functions ───────────────────────────────────────────────────────────

/**
 * Analyzes multiple incidents for a digest report.
 */
export async function analyzeIncidentsWithClaude(
  incidents: ClaudeIncidentInput[],
  operationalPlatforms: string[]
): Promise<ClaudeAnalysisResult> {
  if (incidents.length === 0) {
    return {
      summary: "All monitored platforms are fully operational.",
      incidents: [],
    };
  }

  const prompt = `Analyze these ${incidents.length} events. 
Operational platforms: ${operationalPlatforms.join(", ")}.
Data: ${JSON.stringify(incidents)}

Response Schema:
{
  "summary": "overall health sentence",
  "incidents": [{ platform, title, what, who, action, sev, url }]
}`;

  return callClaude(prompt);
}

/**
 * Analyzes a single incident for a detailed deep-dive summary.
 */
export async function summarizeSingleIncident(
  incident: ClaudeIncidentInput
): Promise<ClaudeIncidentAnalysis> {
  const prompt = `Perform a deep-dive analysis of this specific incident:
${JSON.stringify(incident)}

Response Schema:
{
  "platform": "...",
  "title": "...",
  "what": "...",
  "who": "...",
  "action": "...",
  "sev": "...",
  "url": "..."
}`;

  const result = await callClaude(prompt);
  return result.incidents[0] || (result as any);
}

// ─── Internal SDK Wrapper ─────────────────────────────────────────────────────

async function callClaude(userMessage: string): Promise<ClaudeAnalysisResult> {
  try {
    const msg = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: MAX_TOKENS,
      temperature: TEMPERATURE,
      system: BASE_SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    });

    const rawText = msg.content[0].type === "text" ? msg.content[0].text : "";
    
    // Cleanup JSON
    const cleaned = rawText
      .trim()
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```\s*$/, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    // Normalize: if it's a single object (from summarizeSingleIncident), wrap it
    if (parsed.platform && !parsed.incidents) {
      return { summary: "", incidents: [parsed] };
    }

    return parsed as ClaudeAnalysisResult;
  } catch (error) {
    console.error("[Claude] Error:", error);
    throw new Error(`Claude analysis failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}
