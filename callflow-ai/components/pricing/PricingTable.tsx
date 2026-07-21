"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { pricingTiers } from "@/lib/pricing";
import Button from "@/components/ui/Button";

export default function PricingTable() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {pricingTiers.map((tier, i) => (
        <motion.div
          key={tier.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className={cn(
            "relative flex flex-col rounded-xl2 border p-8",
            tier.highlighted
              ? "border-signal bg-surface-raised shadow-xl shadow-signal/5"
              : "card-surface"
          )}
        >
          {tier.highlighted && (
            <span className="absolute -top-3 left-8 rounded-full bg-signal px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wide text-void">
              Most popular
            </span>
          )}

          <p className="font-display text-lg font-medium text-ink">
            {tier.name}
          </p>
          <p className="mt-2 text-sm text-ink-muted">{tier.description}</p>

          <div className="mt-6 flex items-baseline gap-1">
            <span className="font-display text-4xl font-medium text-ink">
              ${tier.price}
            </span>
            <span className="text-sm text-ink-muted">{tier.cadence}</span>
          </div>

          <ul className="mt-8 flex flex-1 flex-col gap-3">
            {tier.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-ink-muted">
                <Check size={16} className="mt-0.5 shrink-0 text-signal" />
                {feature}
              </li>
            ))}
          </ul>

          <Button
            href="/contact"
            variant={tier.highlighted ? "primary" : "secondary"}
            className="mt-8 w-full"
          >
            {tier.cta}
          </Button>
        </motion.div>
      ))}
    </div>
  );
}
