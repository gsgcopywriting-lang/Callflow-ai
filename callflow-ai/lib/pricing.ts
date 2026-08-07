export type PricingTier = {
  id: string;
  name: string;
  price: number;
  cadence: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
};

export const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    price: 97,
    cadence: "/mo",
    description: "For solo operators who just need to stop missing calls.",
    features: [
      "1 phone line",
      "Unlimited chat conversations",
      "100 AI-handled calls / month",
      "Appointment booking",
      "Email support",
    ],
    cta: "Start with Starter",
  },
  {
    id: "growth",
    name: "Growth",
    price: 297,
    cadence: "/mo",
    description: "For growing teams that live and die by response time.",
    features: [
      "3 phone lines",
      "Unlimited AI-handled calls",
      "Calendar sync",
      "Lead CRM export",
      "Call summaries & transcripts",
      "Priority support",
    ],
    cta: "Start with Growth",
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 697,
    cadence: "/mo",
    description: "For multi-location businesses with custom workflows.",
    features: [
      "Unlimited phone lines",
      "Custom AI training on your FAQs",
      "Dedicated onboarding",
      "Multi-location routing",
      "SLA & dedicated support",
    ],
    cta: "Talk to sales",
  },
];
