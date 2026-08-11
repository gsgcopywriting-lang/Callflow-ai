"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="border-t border-border-subtle py-24">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-xl2 border border-border-subtle bg-signal-glow p-10 text-center md:p-16"
        >
          <p className="eyebrow justify-center">ready when you are</p>
          <h2 className="mx-auto mt-4 max-w-xl font-display text-3xl font-medium tracking-tight text-ink md:text-4xl">
            Ready to never miss another lead?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-ink-muted">
            Talk to Ava yourself, or grab 20 minutes with our team to see it
            wired up for your business.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/demo">
              Try AI Receptionist <ArrowRight size={16} />
            </Button>
            <Button href="/contact" variant="secondary">
              Book Free Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
