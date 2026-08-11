"use client";

import { motion } from "framer-motion";
import {
  PhoneCall,
  CalendarCheck,
  UserPlus,
  Bell,
  MessageCircleQuestion,
  PhoneForwarded,
  Globe,
  FileText,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const features = [
  { icon: PhoneCall, title: "Answers calls 24/7", desc: "Every call gets picked up in under two rings — nights, weekends, and holidays included." },
  { icon: CalendarCheck, title: "Books appointments", desc: "Ava checks your real availability and books directly onto your calendar." },
  { icon: UserPlus, title: "Captures leads", desc: "Name, number, and intent are logged automatically for every caller." },
  { icon: Bell, title: "Sends reminders", desc: "Automatic appointment reminders reduce no-shows before they happen." },
  { icon: MessageCircleQuestion, title: "Handles FAQs", desc: "Hours, pricing, and services are answered instantly and accurately." },
  { icon: PhoneForwarded, title: "Transfers urgent calls", desc: "Real emergencies get routed straight to a live person on your team." },
  { icon: Globe, title: "Multiple languages", desc: "Serve every customer in the language they're most comfortable in." },
  { icon: FileText, title: "Call summaries", desc: "Every conversation is transcribed and summarized in your dashboard." },
];

export default function FeaturesGrid() {
  return (
    <section className="border-t border-border-subtle py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="What Ava handles"
          title="Every part of picking up the phone, automated."
          description="CallFlow AI doesn't just answer — it works the call the way your best front-desk hire would."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              className="card-surface group p-6 transition-colors hover:border-signal/40"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-signal-dim text-signal">
                <f.icon size={18} />
              </div>
              <p className="mt-4 font-display text-base font-medium text-ink">
                {f.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
