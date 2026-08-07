"use client";

import { industries } from "@/lib/industries";
import { cn } from "@/lib/utils";

export default function IndustrySelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {industries.map((industry) => (
        <button
          key={industry.id}
          onClick={() => onChange(industry.id)}
          className={cn(
            "focus-ring rounded-full border px-4 py-2 text-sm transition-colors",
            value === industry.id
              ? "border-signal bg-signal-dim text-signal"
              : "border-border-subtle bg-surface text-ink-muted hover:text-ink"
          )}
        >
          {industry.label}
        </button>
      ))}
    </div>
  );
}
