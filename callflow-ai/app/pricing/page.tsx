import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import PricingTable from "@/components/pricing/PricingTable";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for CallFlow AI's AI receptionist plans — Starter, Growth, and Enterprise.",
};

const faqs = [
  {
    q: "Is there a setup fee?",
    a: "No — every plan includes free onboarding. Most businesses are live within 10 minutes of signing up.",
  },
  {
    q: "Can I change plans later?",
    a: "Yes, you can upgrade or downgrade at any time from your dashboard. Changes take effect on your next billing cycle.",
  },
  {
    q: "What happens if I go over my call limit?",
    a: "We'll notify you before you hit your limit. Extra calls on the Starter plan are billed at a small per-call rate, or you can upgrade to Growth for unlimited calls.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes — there are no long-term contracts. Cancel anytime from your account settings.",
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="py-20 md:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Pricing"
            title="Plans built around one job: don't miss the call."
            description="Every plan includes the full AI receptionist — answering, booking, and lead capture. Higher tiers add capacity and customization."
            align="center"
            className="mx-auto"
          />
          <div className="mt-14">
            <PricingTable />
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
