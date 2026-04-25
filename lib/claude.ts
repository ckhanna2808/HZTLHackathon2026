/**
 * @fileoverview
 * Claude API helper for HZ LiveWatch incident analysis.
 *
 * Design goals:
 * - Minimal input tokens: only send fields Claude needs, abbreviated keys
 * - Structured JSON output only: we format Slack ourselves (saves ~30-50% output tokens)
 * - System prompt written once and kept tight
 * - All-clear path uses a near-zero token request
 *
 * Model: claude-haiku-4-5 (fastest + cheapest — summarisation task, no deep reasoning needed)
 */

// ─── Input Types (abbreviated keys = fewer tokens) ────────────────────────────

export type ClaudeIncidentInput = {
  p: string;    // platform (e.g. "vercel", "sitecore/xm-cloud")
  t: string;    // title
  s: string;    // status: investigating | identified | monitoring | resolved | scheduled
  i: string;    // impact: none | minor | major | critical
  c: string[];  // affected components (max 3)
  b: string;    // latest update body (max 200 chars)
  at: string;   // started_at ISO (seconds stripped)
  url: string;  // link to status page
  type: "incident" | "maintenance";
};

// ─── Output Types ────────────────────────────────────────────────────────────

export type ClaudeIncidentAnalysis = {
  platform: string;
  title: string;
  what: string;    // what actually broke / what the maintenance involves
  who: string;     // which teams/workflows are affected
  action: string;  // concrete next step for the team
  sev: "🔴" | "🟠" | "🟡" | "🔵" | "✅";
  url: string;
};

export type ClaudeAnalysisResult = {
  summary: string;
  incidents: ClaudeIncidentAnalysis[];
};

// ─── System Prompt ────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are a platform reliability analyst for a digital agency.
You receive structured incident data from developer platform status APIs (Vercel, GitHub, Cloudflare, Netlify, npm, Sitecore XM Cloud, Sitecore Content Hub, Sitecore Search, Sitecore CDP).

Your task: For each incident or maintenance event, use your knowledge of these platforms to explain what actually broke or what the maintenance involves — do NOT just repeat the status page text.

CRITICAL OUTPUT RULE: Respond with RAW JSON ONLY. No markdown. No code fences. No backticks. No text before or after the JSON object. The very first character of your response must be { and the very last must be }.

Rules:
- Each field: max 2 sentences, plain English, no jargon.
- "what": the actual technical issue or maintenance scope (not "service is degraded").
- "who": which team workflows are impacted (e.g. "Deployments via Vercel CLI and Git push triggers").
- "action": one concrete next step (e.g. "Pause scheduled deploys until resolved", "Notify clients of maintenance window").
- "sev" values: 🔴 major outage, 🟠 partial outage, 🟡 degraded/minor incident, 🔵 scheduled maintenance, ✅ resolved.
- For "scheduled" type events, always use 🔵.
- For "resolved" status, use ✅.
- For Sitecore products, reference the specific product (XM Cloud, Content Hub, etc.) in your analysis.
- If a platform shows operational status but you are aware of widely-reported issues from your training, mention it briefly.`;

// ─── Main Export ─────────────────────────────────────────────────────────────

export async function analyzeIncidentsWithClaude(
  incidents: ClaudeIncidentInput[],
  operationalPlatforms: string[]
): Promise<ClaudeAnalysisResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("[Claude] Missing ANTHROPIC_API_KEY env var");

  const hasIncidents = incidents.length > 0;

  // ─── All-clear path: near-zero cost ────────────────────────────────────────
  if (!hasIncidents) {
    const shortPrompt = JSON.stringify({
      instruction: "All platforms operational, no incidents in last 24h. Return exactly: {\"summary\":\"All monitored platforms are fully operational with no incidents in the last 24 hours.\",\"incidents\":[]}",
      operational: operationalPlatforms,
    });

    return callClaude(shortPrompt, 64);
  }

  // ─── Incident analysis path ────────────────────────────────────────────────
  const responseSchema = {
    summary: "<1 sentence overall health>",
    incidents: [
      {
        platform: "<platform name>",
        title: "<incident title>",
        what: "<what broke or what maintenance involves, 2 sentences max>",
        who: "<who is affected, 1 sentence>",
        action: "<recommended next step, 1 sentence>",
        sev: "<🔴|🟠|🟡|🔵|✅>",
        url: "<status page url>",
      },
    ],
  };

  const userMessage = JSON.stringify({
    schema: responseSchema,
    data: {
      window: "last_24h_utc",
      incidents: incidents.slice(0, Number(process.env.CLAUDE_MAX_INCIDENTS || 2)),
      operational: operationalPlatforms,
    },
  });

  return callClaude(userMessage, Number(process.env.ANTHROPIC_API_MAX_TOKENS || 8192));
}

// ─── Internal fetch helper ────────────────────────────────────────────────────

async function callClaude(
  userMessage: string,
  maxTokens: number
): Promise<ClaudeAnalysisResult> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": process.env.ANTHROPIC_API_KEY as string,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5",
      max_tokens: maxTokens,
      temperature: 0, // deterministic JSON output — no creative variance needed
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    }),
    signal: AbortSignal.timeout(25_000),
  });

  if (!res.ok) {
    const errBody = await res.text().catch(() => "");
    throw new Error(`[Claude] API error ${res.status}: ${errBody.slice(0, 300)}`);
  }

  const data = await res.json();
  const rawText: string = data?.content?.[0]?.text ?? "";

  // Claude sometimes wraps JSON in markdown code fences (```json ... ```).
  // Strip them before parsing to avoid spurious JSON parse errors.
  const cleaned = rawText
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```\s*$/, "")
    .trim();

  try {
    return JSON.parse(cleaned) as ClaudeAnalysisResult;
  } catch {
    throw new Error(`[Claude] Invalid JSON in response: ${cleaned.slice(0, 300)}`);
  }
}
