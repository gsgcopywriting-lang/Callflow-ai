"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    message: "",
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-surface flex flex-col items-center gap-4 p-10 text-center"
      >
        <CheckCircle2 className="text-live" size={40} />
        <p className="font-display text-xl font-medium text-ink">
          Message received.
        </p>
        <p className="max-w-sm text-sm text-ink-muted">
          Someone from our team will reach out within one business day to get
          your demo booked.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-surface space-y-5 p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Your name"
          value={form.name}
          onChange={(v) => update("name", v)}
          required
        />
        <Field
          label="Business name"
          value={form.businessName}
          onChange={(v) => update("businessName", v)}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Email"
          type="email"
          value={form.email}
          onChange={(v) => update("email", v)}
          required
        />
        <Field
          label="Phone"
          type="tel"
          value={form.phone}
          onChange={(v) => update("phone", v)}
        />
      </div>
      <div>
        <label className="mb-2 block text-sm text-ink-muted">Message</label>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Tell us a bit about your business and what you're looking for."
          className="focus-ring w-full rounded-lg border border-border bg-surface-raised px-4 py-3 text-sm text-ink placeholder:text-ink-faint"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-signal">
          Something went wrong sending your message — please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Sending...
          </>
        ) : (
          "Book my free demo"
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-ink-muted">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="focus-ring w-full rounded-lg border border-border bg-surface-raised px-4 py-3 text-sm text-ink placeholder:text-ink-faint"
      />
    </div>
  );
}
