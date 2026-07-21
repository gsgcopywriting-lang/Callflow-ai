"use client";

import { motion } from "framer-motion";
import { PhoneCall, Calendar, UserCheck } from "lucide-react";
import Waveform from "@/components/home/Waveform";

export default function PhoneMockup() {
  return (
    <div className="relative">
      {/* main call screen */}
      <div className="card-surface relative w-full max-w-sm overflow-hidden p-6 shadow-2xl shadow-black/40">
        <div className="flex items-center justify-between">
          <span className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-live" /> incoming call
          </span>
          <span className="font-mono text-xs text-ink-faint">00:12</span>
        </div>

        <div className="mt-6 flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-signal-dim text-signal">
            <PhoneCall size={26} />
          </div>
          <p className="mt-4 font-display text-lg font-medium text-ink">
            Ava — AI Receptionist
          </p>
          <p className="text-sm text-ink-muted">answering for ABC Plumbing</p>
        </div>

        <Waveform className="mt-6" />

        <div className="mt-6 rounded-lg border border-border-subtle bg-surface-raised p-3">
          <p className="font-mono text-xs text-ink-faint">caller says</p>
          <p className="mt-1 text-sm text-ink">
            &ldquo;Hi, do you have anyone available this afternoon?&rdquo;
          </p>
        </div>
      </div>

      {/* floating dashboard cards */}
      <motion.div
        className="card-surface absolute -left-10 -top-6 hidden w-48 p-4 shadow-xl shadow-black/30 md:block"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-2 text-line">
          <Calendar size={16} />
          <p className="font-mono text-xs uppercase tracking-wide text-ink-faint">
            Booked
          </p>
        </div>
        <p className="mt-2 text-sm font-medium text-ink">
          Appointment set — 2:30 PM Thu
        </p>
      </motion.div>

      <motion.div
        className="card-surface absolute -bottom-8 -right-6 hidden w-52 p-4 shadow-xl shadow-black/30 md:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <div className="flex items-center gap-2 text-signal">
          <UserCheck size={16} />
          <p className="font-mono text-xs uppercase tracking-wide text-ink-faint">
            Lead captured
          </p>
        </div>
        <p className="mt-2 text-sm font-medium text-ink">
          Maria R. · (555) 019-2231
        </p>
        <p className="text-xs text-ink-muted">Needs water heater repair</p>
      </motion.div>
    </div>
  );
}
