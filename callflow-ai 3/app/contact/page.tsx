import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/contact/ContactForm";
import StatusChip from "@/components/ui/StatusChip";

export const metadata: Metadata = {
  title: "Book a Free Demo",
  description:
    "Book a free demo of CallFlow AI and see how an AI receptionist can answer your calls, book appointments, and capture leads.",
};

export default function ContactPage() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-page grid gap-16 lg:grid-cols-2">
        <div>
          <StatusChip label="usually replies within a day" />
          <SectionHeading
            className="mt-6"
            eyebrow="Get started"
            title="Book your free demo."
            description="Tell us about your business and we'll show you exactly how CallFlow AI would answer your calls — configured for your services, hours, and pricing."
          />

          <div className="mt-10 space-y-6">
            <InfoRow
              title="What happens next"
              desc="We'll reach out within one business day to schedule a 15-minute walkthrough, live on a call."
            />
            <InfoRow
              title="No commitment"
              desc="The demo is free and there's no obligation to sign up afterward."
            />
            <InfoRow
              title="Prefer to try it yourself first?"
              desc="Head to the AI Demo page and talk to Ava right now, configured for a sample business."
            />
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}

function InfoRow({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="border-l-2 border-signal/40 pl-4">
      <p className="font-display text-base font-medium text-ink">{title}</p>
      <p className="mt-1 text-sm text-ink-muted">{desc}</p>
    </div>
  );
}
