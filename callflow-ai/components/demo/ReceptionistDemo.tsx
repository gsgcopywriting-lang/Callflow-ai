"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageSquare, AudioLines, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { getIndustry } from "@/lib/industries";
import { ChatMessage } from "@/lib/ai/types";
import ChatBubble from "@/components/demo/ChatBubble";
import TypingIndicator from "@/components/demo/TypingIndicator";
import VoiceButton from "@/components/demo/VoiceButton";
import SuggestedQuestions from "@/components/demo/SuggestedQuestions";
import IndustrySelector from "@/components/demo/IndustrySelector";
import BusinessInfoCard from "@/components/demo/BusinessInfoCard";

type Mode = "chat" | "voice";

export default function ReceptionistDemo() {
  const [industryId, setIndustryId] = useState("plumbing");
  const [mode, setMode] = useState<Mode>("chat");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [voiceReplyEnabled, setVoiceReplyEnabled] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const industry = getIndustry(industryId);

  // Reset the conversation whenever the demo business changes.
  useEffect(() => {
    setMessages([{ role: "assistant", content: industry.greeting }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [industryId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: text.trim() },
    ];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ industryId, messages: nextMessages }),
      });
      const data = await res.json();
      const reply: string = data.reply ?? "Sorry, could you say that again?";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);

      if (mode === "voice" && voiceReplyEnabled) {
        speak(reply);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I'm having trouble connecting right now — please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function speak(text: string) {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.02;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="card-surface flex flex-col overflow-hidden">
        {/* header */}
        <div className="flex items-center justify-between border-b border-border-subtle p-5">
          <div>
            <p className="font-display text-base font-medium text-ink">
              Ava — AI Receptionist
            </p>
            <p className="font-mono text-xs text-ink-faint">
              answering for {industry.businessName}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle mode={mode} onChange={setMode} />
          </div>
        </div>

        {/* industry selector */}
        <div className="border-b border-border-subtle p-5">
          <IndustrySelector value={industryId} onChange={setIndustryId} />
        </div>

        {/* conversation history */}
        <div
          ref={scrollRef}
          className="flex h-[420px] flex-col gap-3 overflow-y-auto p-5"
        >
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <ChatBubble key={i} message={m} />
            ))}
          </AnimatePresence>
          {loading && <TypingIndicator />}
        </div>

        {/* suggested questions */}
        <div className="border-t border-border-subtle p-5">
          <SuggestedQuestions
            questions={industry.suggestedQuestions}
            onSelect={sendMessage}
            disabled={loading}
          />
        </div>

        {/* input area */}
        <div className="border-t border-border-subtle p-5">
          {mode === "chat" ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex items-center gap-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Ava a question..."
                className="focus-ring flex-1 rounded-full border border-border bg-surface-raised px-4 py-3 text-sm text-ink placeholder:text-ink-faint"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="btn-primary h-11 w-11 rounded-full p-0 disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-center gap-4">
              <VoiceButton onTranscript={sendMessage} disabled={loading} />
              <button
                type="button"
                onClick={() => setVoiceReplyEnabled((v) => !v)}
                className="focus-ring flex items-center gap-2 rounded-full border border-border-subtle px-3 py-2 font-mono text-xs text-ink-muted hover:text-ink"
              >
                {voiceReplyEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
                {voiceReplyEnabled ? "Voice replies on" : "Voice replies off"}
              </button>
            </div>
          )}
        </div>
      </div>

      <BusinessInfoCard industry={industry} />
    </div>
  );
}

function ModeToggle({
  mode,
  onChange,
}: {
  mode: Mode;
  onChange: (m: Mode) => void;
}) {
  return (
    <div className="flex items-center rounded-full border border-border-subtle bg-surface p-1">
      <ToggleButton
        active={mode === "chat"}
        onClick={() => onChange("chat")}
        icon={MessageSquare}
        label="Chat"
      />
      <ToggleButton
        active={mode === "voice"}
        onClick={() => onChange("voice")}
        icon={AudioLines}
        label="Voice"
      />
    </div>
  );
}

function ToggleButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof MessageSquare;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "focus-ring flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-xs transition-colors",
        active ? "bg-signal text-void" : "text-ink-muted hover:text-ink"
      )}
    >
      <Icon size={13} /> {label}
    </button>
  );
}
