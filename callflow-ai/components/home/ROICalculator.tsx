"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { calculateROI } from "@/lib/roi";
import { receptionistPlan } from "@/lib/receptionistPlan";

export default function ROICalculator() {
  const [missedCalls, setMissedCalls] = useState(15);
  const [customerValue, setCustomerValue] = useState(250);
  const [conversionRate, setConversionRate] = useState(30);

  const result = useMemo(
    () => calculateROI({ missedCalls, customerValue, conversionRate }),
    [missedCalls, customerValue, conversionRate]
  );

  return (
    <section className="border-t border-border-subtle py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="ROI calculator"
          title="See what missed calls are actually costing you."
          description="Drag the sliders to match your business — the numbers update instantly."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <div className="card-surface space-y-8 p-8">
            <Slider
              label="Missed calls per week"
              value={missedCalls}
              onChange={setMissedCalls}
              min={1}
              max={100}
              suffix=" calls"
            />
            <Slider
              label="Average customer value"
              value={customerValue}
              onChange={setCustomerValue}
              min={25}
              max={2000}
              step={25}
              prefix="$"
            />
            <Slider
              label="Estimated conversion rate"
              value={conversionRate}
              onChange={setConversionRate}
              min={5}
              max={80}
              suffix="%"
            />
          </div>

          <div className="card-surface flex flex-col justify-between gap-6 p-8">
            <ResultRow
              label="Estimated lost revenue / month"
              value={result.lostRevenueMonthly}
              accent="text-ink-muted"
            />
            <ResultRow
              label="Revenue recovered with CallFlow AI"
              value={result.recoveredRevenueMonthly}
              accent="text-signal"
              highlight
            />
            <div className="border-t border-border-subtle pt-6">
              <p className="eyebrow">projected annual ROI</p>
              <motion.p
                key={result.annualROIMultiplier}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 font-display text-4xl font-medium text-ink"
              >
                {result.annualROIMultiplier.toFixed(1)}x
              </motion.p>
              <p className="mt-1 text-sm text-ink-muted">
                return relative to a ${receptionistPlan.price}/mo plan, based on your inputs above.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultRow({
  label,
  value,
  accent,
  highlight,
}: {
  label: string;
  value: number;
  accent: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={
        highlight
          ? "rounded-lg border border-signal/30 bg-signal-dim p-4"
          : ""
      }
    >
      <p className="text-sm text-ink-muted">{label}</p>
      <motion.p
        key={value}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mt-1 font-display text-2xl font-medium ${accent}`}
      >
        ${value.toLocaleString()}
      </motion.p>
    </div>
  );
}

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <label className="text-sm text-ink-muted">{label}</label>
        <span className="font-mono text-sm text-ink">
          {prefix}
          {value.toLocaleString()}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="focus-ring h-1.5 w-full cursor-pointer appearance-none rounded-full bg-surface-raised accent-signal"
      />
    </div>
  );
}
