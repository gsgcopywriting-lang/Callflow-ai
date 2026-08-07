import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChatMessage } from "@/lib/ai/types";

export default function ChatBubble({ message }: { message: ChatMessage }) {
  const isAssistant = message.role === "assistant";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex", isAssistant ? "justify-start" : "justify-end")}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isAssistant
            ? "rounded-bl-sm border border-border-subtle bg-surface-raised text-ink"
            : "rounded-br-sm bg-signal text-void"
        )}
      >
        {message.content}
      </div>
    </motion.div>
  );
}
