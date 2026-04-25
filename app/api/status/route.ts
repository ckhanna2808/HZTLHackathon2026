import { NextResponse } from "next/server";
import { buildSnapshot } from "@/lib/aggregator";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const snapshot = await buildSnapshot();
    return NextResponse.json(snapshot, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
        "X-LiveWatch-Poll": new Date().toISOString(),
      },
    });
  } catch (err) {
    console.error("[/api/status] Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch status data", timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}
