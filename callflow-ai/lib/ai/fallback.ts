import { Industry } from "@/lib/industries";
import { ChatMessage } from "@/lib/ai/types";

/**
 * A lightweight, deterministic receptionist used when GEMINI_API_KEY is not
 * configured, so the live demo works immediately after cloning the repo.
 * Once a real key is added, lib/ai/gemini.ts takes over and this file is
 * only used as an offline safety net (see callGemini's catch block).
 */
export function fallbackReply(
  industry: Industry,
  messages: ChatMessage[]
): string {
  const lastUserMessage =
    [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
  const text = lastUserMessage.toLowerCase();

  if (messages.filter((m) => m.role === "user").length <= 1 && !text) {
    return industry.greeting;
  }

  const faqMatch = industry.faqs.find((faq) =>
    faq.question
      .toLowerCase()
      .split(" ")
      .some((word) => word.length > 3 && text.includes(word))
  );
  if (faqMatch) return faqMatch.answer;

  if (/(open|hour|today|closed)/.test(text)) {
    return `We're open ${industry.hours.toLowerCase()}. Want me to check availability for you?`;
  }

  if (/(book|appointment|schedule|come in|visit)/.test(text)) {
    return "I'd be happy to book that for you. Can I get your name and the best number to reach you?";
  }

  if (/(cost|price|much|fee|charge)/.test(text)) {
    return `${industry.pricingNote} I can also get you an exact quote — want me to book a free estimate?`;
  }

  if (/(emergency|urgent|asap|now|help)/.test(text)) {
    return "That sounds urgent — I'm flagging this as a priority. Can I get your name and number so we can reach you right away?";
  }

  if (/(service|offer|do you)/.test(text)) {
    return `We handle ${industry.services.slice(0, 3).join(", ")}, and more. What do you need help with?`;
  }

  if (/^(hi|hello|hey)\b/.test(text)) {
    return industry.greeting;
  }

  return "Got it — let me make sure I connect you with the right person. Could you tell me a bit more about what you need?";
}
