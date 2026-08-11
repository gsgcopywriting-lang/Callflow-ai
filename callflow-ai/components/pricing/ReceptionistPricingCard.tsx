"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Button from "@/components/ui/Button";
import { receptionistPlan } from "@/lib/receptionistPlan";

type ReceptionistPricingCardProps = {
  /**
   * "full" shows every feature with its description (used on /pricing).
   * "compact" shows only the top features as a scannable checklist plus a
   * link to the full pricing page (used in the homepage teaser).
   */
  variant?: "full" | "compact";
};

export default function ReceptionistPricingCard({
  variant = "full",
}: ReceptionistPricingCardProps) {
  const isCompact = variant === "compact";
  const featuresToShow = isCompact
    ? receptionistPlan.features.slice(0, receptionistPlan.homepageFeatureCount)
    : receptionistPlan.features;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="relative mx-auto max-w-2xl rounded-xl2 border border-signal/40 bg-surface-raised p-8 shadow-xl shadow-signal/5 md:p-12"
    >
      <div className="text-center">
        <p className="font-display text-xl font-medium text-ink">
          {receptionistPlan.name}
        </p>
        <p className="mt-2 text-sm text-ink-muted">
          {isCompact ? receptionistPlan.shortDescription : receptionistPlan.description}
        </p>

        <div className="mt-8 flex items-baseline justify-center gap-1.5">
          <span className="font-display text-5xl font-medium text-ink md:text-6xl">
            ${receptionistPlan.price}
          </span>
          <span className="text-base text-ink-muted">
            {receptionistPlan.cadence}
          </span>
        </div>
        <p className="mt-2 text-sm font-medium text-signal">
          {receptionistPlan.tagline}
        </p>
      </div>

      {isCompact ? (
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {featuresToShow.map((feature) => (
            <li key={feature.title} className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal-dim text-signal">
                <Check size={13} strokeWidth={2.5} />
              </span>
              <p className="text-sm text-ink">{feature.title}</p>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {featuresToShow.map((feature) => (
            <li key={feature.title} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal-dim text-signal">
                <Check size={13} strokeWidth={2.5} />
              </span>
              <div>
                <p className="text-sm font-medium text-ink">{feature.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                  {feature.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-10 flex flex-col items-center gap-3 border-t border-border-subtle pt-8">
        <Button href="/contact" className="w-full sm:w-auto sm:min-w-[280px]">
          {receptionistPlan.cta}
        </Button>
        <p className="text-center font-mono text-xs text-ink-faint">
          {receptionistPlan.ctaNote}
        </p>
        {isCompact && (
          <Button href="/pricing" variant="secondary" className="mt-2 w-full sm:w-auto">
            See full pricing details
          </Button>
        )}
      </div>
    </motion.div>
  );
}
