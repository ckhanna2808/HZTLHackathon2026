import { NextResponse } from "next/server";
import { fetchStatuspagePlatform, STATUSPAGE_PLATFORMS } from "@/lib/adapters/statuspage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SVG_COLORS: Record<string, string> = {
  operational: "#10b981",
  degraded_performance: "#f59e0b",
  partial_outage: "#f97316",
  major_outage: "#ef4444",
  unknown: "#6b7280",
};

const STATUS_LABELS: Record<string, string> = {
  operational: "operational",
  degraded_performance: "degraded",
  partial_outage: "partial outage",
  major_outage: "major outage",
  unknown: "unknown",
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ platform: string }> }
) {
  const { platform } = await params;
  const platformConfig = STATUSPAGE_PLATFORMS.find((p) => p.id === platform);

  if (!platformConfig) {
    return new NextResponse("Platform not found", { status: 404 });
  }

  const status = await fetchStatuspagePlatform(
    platformConfig.id,
    platformConfig.name,
    platformConfig.baseUrl
  );

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

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "max-age=60, s-maxage=60",
    },
  });
}
