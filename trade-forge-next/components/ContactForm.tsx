"use client";

import { useState, FormEvent } from "react";
import { supabase } from "@/lib/supabaseClient";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      source: "trade-forge",
      business_name: formData.get("business_name") as string,
      contact_name: formData.get("contact_name") as string,
      contact_info: formData.get("contact_info") as string,
      current_website: (formData.get("current_website") as string) || null,
    };

    const { error } = await supabase.from("leads").insert([payload]);

    if (error) {
      console.error(error);
      setStatus("error");
      return;
    }

    form.reset();
    setStatus("success");
  }

  return (
    <section id="contact" className="bg-black py-24">
      <div className="mx-auto grid max-w-6xl gap-14 px-7 md:grid-cols-2">
        <div>
          <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ember">
            Get Started
          </span>
          <h2 className="font-display text-3xl sm:text-4xl">
            Get a free preview of your new website
          </h2>
          <p className="mt-4 max-w-[44ch] text-[15px] text-fog">
            Tell us a bit about your business and we&apos;ll put together a
            free concept preview — no cost, no pressure. If you like it,
            we&apos;ll talk about building it for real.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3.5 rounded-xl border border-ember/15 bg-charcoal p-7"
        >
          <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-fog">
            Business Name
            <input
              name="business_name"
              type="text"
              required
              className="rounded-md border border-white/10 bg-steel px-3 py-2.5 text-[14px] text-cream focus:outline-none focus:ring-2 focus:ring-ember"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-fog">
            Your Name
            <input
              name="contact_name"
              type="text"
              required
              className="rounded-md border border-white/10 bg-steel px-3 py-2.5 text-[14px] text-cream focus:outline-none focus:ring-2 focus:ring-ember"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-fog">
            Email or Phone
            <input
              name="contact_info"
              type="text"
              required
              className="rounded-md border border-white/10 bg-steel px-3 py-2.5 text-[14px] text-cream focus:outline-none focus:ring-2 focus:ring-ember"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-fog">
            Current Website (if any)
            <input
              name="current_website"
              type="text"
              placeholder="e.g. none, or a link"
              className="rounded-md border border-white/10 bg-steel px-3 py-2.5 text-[14px] text-cream focus:outline-none focus:ring-2 focus:ring-ember"
            />
          </label>

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-1 w-full rounded-md bg-ember py-3 text-sm font-semibold text-black transition hover:bg-emberGlow disabled:opacity-60"
          >
            {status === "sending" ? "Sending..." : "Request Free Preview"}
          </button>

          {status === "success" && (
            <p className="text-[13px] font-semibold text-emberGlow">
              Thanks — we got it. We&apos;ll follow up with your free preview
              shortly.
            </p>
          )}
          {status === "error" && (
            <p className="text-[13px] font-semibold text-red-400">
              Something went wrong submitting this — please try again or
              call/text us directly.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
