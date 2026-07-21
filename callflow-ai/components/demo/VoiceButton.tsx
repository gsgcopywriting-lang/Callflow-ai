"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mic, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function VoiceButton({
  onTranscript,
  disabled,
}: {
  onTranscript: (text: string) => void;
  disabled?: boolean;
}) {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognitionImpl =
      typeof window !== "undefined"
        ? window.SpeechRecognition ?? window.webkitSpeechRecognition
        : undefined;

    if (!SpeechRecognitionImpl) {
      setSupported(false);
      return;
    }

    const recognition = new SpeechRecognitionImpl();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      onTranscript(transcript.trim());
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleListening() {
    if (!recognitionRef.current || disabled) return;
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      recognitionRef.current.start();
      setListening(true);
    }
  }

  if (!supported) {
    return (
      <div className="flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-3 py-2 font-mono text-xs text-ink-faint">
        <AlertCircle size={14} /> Voice input isn&apos;t supported in this browser
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleListening}
      disabled={disabled}
      aria-pressed={listening}
      aria-label={listening ? "Stop listening" : "Speak to Ava"}
      className={cn(
        "focus-ring relative flex h-14 w-14 items-center justify-center rounded-full transition-colors",
        listening
          ? "bg-signal text-void"
          : "border border-border-subtle bg-surface-raised text-ink hover:text-signal"
      )}
    >
      {listening && (
        <motion.span
          className="absolute inset-0 rounded-full bg-signal/50"
          animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <Mic size={20} />
    </button>
  );
}
