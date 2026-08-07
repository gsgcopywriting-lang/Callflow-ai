"use client";

import { motion } from "framer-motion";

const BAR_COUNT = 28;

export default function Waveform({ className }: { className?: string }) {
  const bars = Array.from({ length: BAR_COUNT });

  return (
    <div className={className} aria-hidden="true">
      <div className="flex h-16 items-center gap-[3px]">
        {bars.map((_, i) => {
          const base = 20 + Math.abs(Math.sin(i * 0.7)) * 60;
          return (
            <motion.span
              key={i}
              className="w-[3px] rounded-full bg-gradient-to-t from-signal/40 to-signal"
              initial={{ height: `${base * 0.3}%` }}
              animate={{
                height: [`${base * 0.3}%`, `${base}%`, `${base * 0.4}%`],
              }}
              transition={{
                duration: 1.1 + (i % 5) * 0.15,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.03,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
