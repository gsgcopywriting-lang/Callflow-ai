import { cn } from "@/lib/utils";

export default function StatusChip({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-3 py-1.5 font-mono text-xs text-ink-muted",
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-live" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-live" />
      </span>
      {label}
    </span>
  );
}
