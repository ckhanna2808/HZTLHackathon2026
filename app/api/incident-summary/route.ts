import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_MODEL = "claude-sonnet-4-5";
const MAX_FETCH_BYTES = 200_000;
const FETCH_TIMEOUT_MS = 8_000;
const MAX_PROMPT_CHARS = 12_000;

// Allowlist of hosts we'll fetch incident content from. Extend as needed.
const ALLOWED_HOST_SUFFIXES = [
  "sitecore.com",
  "statuspage.io",
  "vercel-status.com",
  "netlifystatus.com",
  "githubstatus.com",
  "cloudflarestatus.com",
  "status.npmjs.org",
  "ocstatus.sitecore.com",
];

interface SummaryRequestBody {
  incidentUrl?: string;
  title?: string;
  description?: string;
  impact?: string;
  status?: string;
  startedAt?: string;
  affectedComponents?: string[];
  affectedRegions?: string[];
}

function isAllowedHost(hostname: string): boolean {
  const h = hostname.toLowerCase();
  return ALLOWED_HOST_SUFFIXES.some(
    (suffix) => h === suffix || h.endsWith(`.${suffix}`)
  );
}

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchIncidentText(url: string): Promise<string | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent": "HZTL-LiveWatch/1.0 (+incident-summary)",
        Accept: "text/html, application/json;q=0.8, text/plain;q=0.7, */*;q=0.5",
      },
    });

    if (!res.ok) {
      return null;
    }

    const reader = res.body?.getReader();
    if (!reader) {
      const text = await res.text();
      return text.slice(0, MAX_FETCH_BYTES);
    }

    const decoder = new TextDecoder();
    let received = 0;
    let buffer = "";
    while (received < MAX_FETCH_BYTES) {
      const { done, value } = await reader.read();
      if (done) break;
      received += value.byteLength;
      buffer += decoder.decode(value, { stream: true });
      if (received >= MAX_FETCH_BYTES) break;
    }
    buffer += decoder.decode();

    const contentType = res.headers.get("content-type") ?? "";
    return contentType.includes("html") ? stripHtml(buffer) : buffer;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function buildContextBlock(body: SummaryRequestBody, fetchedText: string | null): string {
  const lines: string[] = [];
  if (body.incidentUrl) lines.push(`URL: ${body.incidentUrl}`);
  if (body.title) lines.push(`Title: ${body.title}`);
  if (body.status) lines.push(`Status: ${body.status}`);
  if (body.impact) lines.push(`Impact: ${body.impact}`);
  if (body.startedAt) lines.push(`Started: ${body.startedAt}`);
  if (body.affectedComponents?.length)
    lines.push(`Affected components: ${body.affectedComponents.join(", ")}`);
  if (body.affectedRegions?.length)
    lines.push(`Affected regions: ${body.affectedRegions.join(", ")}`);
  if (body.description) {
    lines.push("");
    lines.push("Provider-supplied description:");
    lines.push(stripHtml(body.description));
  }
  if (fetchedText) {
    lines.push("");
    lines.push("Incident page content (truncated):");
    lines.push(fetchedText.slice(0, MAX_PROMPT_CHARS));
  }
  return lines.join("\n");
}

const SYSTEM_PROMPT = [
  "You summarize live incident reports from cloud status pages for an on-call dashboard.",
  "Write a concise, factual summary in 2-4 sentences (max ~60 words).",
  "Cover: what is broken, who/what is affected, current status, and any known mitigation or ETA.",
  "Plain text only. No headings, bullets, markdown, or links. No speculation; if unknown, say so.",
].join(" ");

export async function POST(request: Request) {
  let body: SummaryRequestBody;
  try {
    body = (await request.json()) as SummaryRequestBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const { incidentUrl } = body;
  if (!incidentUrl || typeof incidentUrl !== "string") {
    return NextResponse.json(
      { error: "incidentUrl is required" },
      { status: 400 }
    );
  }

  let parsed: URL;
  try {
    parsed = new URL(incidentUrl);
  } catch {
    return NextResponse.json(
      { error: "incidentUrl is not a valid URL" },
      { status: 400 }
    );
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return NextResponse.json(
      { error: "Only http(s) URLs are supported" },
      { status: 400 }
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("[/api/incident-summary] ANTHROPIC_API_KEY is not set");
    return NextResponse.json(
      { error: "Summarization service is not configured" },
      { status: 503 }
    );
  }

  const fetchedText = isAllowedHost(parsed.hostname)
    ? await fetchIncidentText(parsed.toString())
    : null;

  const contextBlock = buildContextBlock(body, fetchedText);
  const userPrompt = [
    "Summarize the following incident for an on-call engineer.",
    "",
    contextBlock,
  ].join("\n");

  const model = process.env.ANTHROPIC_MODEL?.trim() || DEFAULT_MODEL;
  const client = new Anthropic({ apiKey });

  try {
    const message = await client.messages.create({
      model,
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userPrompt }],
    });

    const summary = message.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("\n")
      .trim();

    if (!summary) {
      return NextResponse.json(
        { error: "Model returned an empty summary" },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        summary,
        model,
        generatedAt: new Date().toISOString(),
        contextSource: fetchedText ? "live-fetch" : "metadata-only",
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (err) {
    const status = err instanceof Anthropic.APIError ? err.status ?? 502 : 502;
    const detail =
      err instanceof Anthropic.APIError
        ? err.message
        : err instanceof Error
        ? err.message
        : "Unknown error";
    console.error("[/api/incident-summary] Claude error:", detail);
    return NextResponse.json(
      { error: "Failed to generate summary", detail },
      { status }
    );
  }
}
