export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type AIRequestPayload = {
  industryId: string;
  messages: ChatMessage[];
};

export type AIResponsePayload = {
  reply: string;
  source: "gemini" | "fallback";
};
