import "server-only";
import { Industry } from "@/lib/industries";
import { buildSystemPrompt } from "@/lib/ai/prompts";
import { fallbackReply } from "@/lib/ai/fallback";
import { ChatMessage } from "@/lib/ai/types";

const GEMINI_MODEL = "gemini-1.5-flash";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

/**
 * This is the single place the app talks to Google Gemini. Nothing in the
 * frontend ever sees the API key: it lives only in process.env on the
 * server and this file is only ever imported from app/api/ai/route.ts.
 *
 * If GEMINI_API_KEY is not set, or the request fails for any reason, this
 * falls back to a deterministic rule-based responder so the public demo
 * never breaks or shows an error to a visitor.
 */
export async function generateReceptionistReply(
  industry: Industry,
  messages: ChatMessage[]
): Promise<{ reply: string; source: "gemini" | "fallback" }> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return { reply: fallbackReply(industry, messages), source: "fallback" };
  }

  try {
    const systemPrompt = buildSystemPrompt(industry);

    const contents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: {
          role: "system",
          parts: [{ text: systemPrompt }],
        },
        contents,
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 200,
        },
      }),
      // Keep the demo responsive; don't let a slow Gemini call hang forever.
      signal: AbortSignal.timeout(12000),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const text: string | undefined =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) throw new Error("Gemini returned an empty response");

    return { reply: text.trim(), source: "gemini" };
  } catch (error) {
    console.error("[gemini] falling back to rule-based responder:", error);
    return { reply: fallbackReply(industry, messages), source: "fallback" };
  }
}
