"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  {
    time: "00:00",
    title: "A customer calls your business",
    desc: "Ava answers instantly with your business's name, hours, and a natural greeting — day or night.",
  },
  {
    time: "00:14",
    title: "Ava handles the conversation",
    desc: "Questions get answered, urgency gets assessed, and the caller's info is collected — just like a trained receptionist.",
  },
  {
    time: "01:02",
    title: "You get the outcome, not the busywork",
    desc: "An appointment lands on your calendar, or a qualified lead lands in your dashboard, complete with a call summary.",
  },
];

export default function HowItWorks() {
  return (
    <section className="border-t border-border-subtle py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="How it works"
          title="From ringing phone to booked job in under a minute."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="card-surface relative p-6"
            >
              <span className="font-mono text-xs text-signal">{step.time}</span>
              <p className="mt-3 font-display text-lg font-medium text-ink">
                {step.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {step.desc}
              </p>
              {i < steps.length - 1 && (
                <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-border md:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
