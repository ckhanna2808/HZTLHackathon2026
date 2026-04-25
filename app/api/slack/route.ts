// app/api/slack/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      channel = "#hztl-live-watch",
      username = "webhookbot",
      text,
      icon_emoji = ":ghost:",
    } = body;

    if (!text) {
      return NextResponse.json(
        { success: false, message: "Text is required" },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.SLACK_WEBHOOK_URL as string;

    if (!webhookUrl) {
      return NextResponse.json(
        { success: false, message: "Missing Slack webhook URL" },
        { status: 500 }
      );
    }

    const payload = {
      channel,
      username,
      text,
      icon_emoji,
    };

    const slackRes = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!slackRes.ok) {
      const errorText = await slackRes.text();
      return NextResponse.json(
        { success: false, error: errorText },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message sent to Slack",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}