import { Clock, Wrench, Tag } from "lucide-react";
import { Industry } from "@/lib/industries";

export default function BusinessInfoCard({ industry }: { industry: Industry }) {
  return (
    <div className="card-surface p-6">
      <p className="eyebrow">now answering for</p>
      <p className="mt-2 font-display text-xl font-medium text-ink">
        {industry.businessName}
      </p>
      <p className="text-sm text-ink-muted">{industry.ownerLine}</p>

      <div className="mt-6 space-y-4">
        <InfoRow icon={Clock} label="Hours" value={industry.hours} />
        <InfoRow
          icon={Wrench}
          label="Services"
          value={industry.services.join(", ")}
        />
        <InfoRow icon={Tag} label="Pricing" value={industry.pricingNote} />
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <Icon size={16} className="mt-0.5 shrink-0 text-signal" />
      <div>
        <p className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
          {label}
        </p>
        <p className="mt-0.5 text-sm text-ink-muted">{value}</p>
      </div>
    </div>
  );
}
