"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import StatusChip from "@/components/ui/StatusChip";
import PhoneMockup from "@/components/home/PhoneMockup";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-signal-glow pb-24 pt-20 md:pt-28">
      <div className="container-page grid items-center gap-16 md:grid-cols-2">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <StatusChip label="answering calls right now" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 font-display text-4xl font-medium leading-[1.08] tracking-tight text-ink md:text-6xl"
          >
            Never Miss Another Customer Call.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-lg text-lg text-ink-muted"
          >
            Your AI receptionist answers customers 24/7, books appointments,
            and captures leads while you focus on running your business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Button href="/demo">
              Try AI Receptionist <ArrowRight size={16} />
            </Button>
            <Button href="/contact" variant="secondary">
              Book Free Demo
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 font-mono text-xs text-ink-faint"
          >
            No credit card required · Live in under 10 minutes
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center md:justify-end"
        >
          <PhoneMockup />
        </motion.div>
      </div>
    </section>
  );
}
