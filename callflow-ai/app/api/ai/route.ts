import { NextRequest, NextResponse } from "next/server";
import { getIndustry } from "@/lib/industries";
import { generateReceptionistReply } from "@/lib/ai/gemini";
import { AIRequestPayload } from "@/lib/ai/types";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as AIRequestPayload;

    if (!body?.messages || !Array.isArray(body.messages)) {
      return NextResponse.json(
        { error: "messages array is required" },
        { status: 400 }
      );
    }

    const industry = getIndustry(body.industryId);
    const trimmedMessages = body.messages.slice(-12); // keep payload small

    const { reply, source } = await generateReceptionistReply(
      industry,
      trimmedMessages
    );

    return NextResponse.json({ reply, source });
  } catch (error) {
    console.error("[/api/ai] error:", error);
    return NextResponse.json(
      {
        reply:
          "Sorry, I'm having trouble connecting right now — please try again in a moment.",
        source: "fallback",
      },
      { status: 200 }
    );
  }
}
