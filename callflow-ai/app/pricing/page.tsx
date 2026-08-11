import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import ReceptionistPricingCard from "@/components/pricing/ReceptionistPricingCard";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "One AI receptionist plan for CallFlow AI — $500/month, custom-built for your business, setup included.",
};

const faqs = [
  {
    q: "What does the AI receptionist do?",
    a: "It answers your business's incoming calls, talks with customers naturally, answers common questions, and captures lead information — with appointment booking and call transfers available when configured for your business.",
  },
  {
    q: "Can it answer questions about my business?",
    a: "Yes. During setup, the receptionist is configured with your services, FAQs, policies, hours, and location so it can answer using accurate, approved information.",
  },
  {
    q: "Can it book appointments?",
    a: "Yes, when connected to your calendar. Once the appropriate calendar integration is configured, it can check availability, book, reschedule, and cancel appointments.",
  },
  {
    q: "Can it transfer calls?",
    a: "Yes. When call-transfer functionality is configured, it can transfer callers to the right person, department, or phone number when a human is needed.",
  },
  {
    q: "Can it capture leads?",
    a: "Yes. It collects caller details like name, phone number, email, and reason for calling, and can ask configured qualifying questions to gather what your business needs to follow up.",
  },
  {
    q: "Can I customize how it talks?",
    a: "Yes. The receptionist's greeting, tone, and personality are customized to match your business during setup.",
  },
  {
    q: "What happens during setup?",
    a: "We configure the receptionist with your business information, greeting, and any integrations you need — calendar, transfers, notifications, and more. Setup and customization are included in the $500/month plan.",
  },
  {
    q: "Can it integrate with my existing systems?",
    a: "It can be connected to calendars, CRMs, messaging tools, webhooks, and other systems when the appropriate integration is configured for your business.",
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="py-20 md:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Pricing"
            title="One plan. Built around your business."
            description="A single AI receptionist plan, custom-built around your business — with appointment booking, call transfers, and integrations available as they're configured for you."
            align="center"
            className="mx-auto"
          />
          <div className="mt-14">
            <ReceptionistPricingCard variant="full" />
          </div>
        </div>
      </section>

      <section className="border-t border-border-subtle py-20">
        <div className="container-page max-w-3xl">
          <SectionHeading eyebrow="Questions" title="Pricing FAQ" />
          <div className="mt-10 divide-y divide-border-subtle">
            {faqs.map((faq) => (
              <div key={faq.q} className="py-6">
                <p className="font-display text-base font-medium text-ink">
                  {faq.q}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
