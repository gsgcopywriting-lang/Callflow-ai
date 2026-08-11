export type ReceptionistFeature = {
  title: string;
  description: string;
};

export type ReceptionistPlan = {
  name: string;
  price: number;
  cadence: string;
  /** Full description used on the /pricing page. */
  description: string;
  /** Shorter description used in the homepage teaser. */
  shortDescription: string;
  /** Short line displayed directly beneath the price. */
  tagline: string;
  /**
   * Every feature, ordered strongest-first so the homepage teaser can show
   * just the top slice (see `homepageFeatureCount`) while /pricing shows
   * the full list — both read from this same array, so there's only one
   * place to update copy.
   */
  features: ReceptionistFeature[];
  /** How many features the homepage compact card shows. */
  homepageFeatureCount: number;
  cta: string;
  ctaNote: string;
};

export const receptionistPlan: ReceptionistPlan = {
  name: "AI Receptionist",
  price: 500,
  cadence: "/month",
  description:
    "A custom AI receptionist that answers your business calls 24/7, talks with customers, answers common questions, captures leads, and can handle appointments and call transfers when the appropriate integrations are configured.",
  shortDescription:
    "A custom AI receptionist that answers your business calls 24/7, captures leads, and can handle appointments and transfers when configured.",
  tagline: "Custom-built for your business.",
  homepageFeatureCount: 6,
  features: [
    {
      title: "24/7 inbound call answering",
      description:
        "The AI receptionist answers incoming business calls so customers don't reach voicemail.",
    },
    {
      title: "Natural AI conversations",
      description:
        "The receptionist can have natural conversations with callers and respond according to the business's configured information.",
    },
    {
      title: "Business knowledge & FAQs",
      description:
        "Configure the receptionist with the business's services, FAQs, policies, hours, location, and other approved information.",
    },
    {
      title: "Lead capture",
      description:
        "Collect caller information such as name, phone number, email, service needed, and reason for calling.",
    },
    {
      title: "Appointment booking",
      description:
        "Book appointments through a connected calendar when the appropriate calendar integration is configured.",
    },
    {
      title: "Call transfers",
      description:
        "Transfer callers to the appropriate person or phone number when call-transfer functionality is configured.",
    },
    {
      title: "Custom business greeting",
      description:
        "The receptionist uses the business name, greeting, tone, and instructions provided during setup.",
    },
    {
      title: "Lead qualification",
      description:
        "Ask configured questions to determine what the caller needs and collect useful information for the business.",
    },
    {
      title: "Appointment changes",
      description:
        "Handle appointment rescheduling or cancellation when the appropriate calendar integration is configured.",
    },
    {
      title: "Custom call flows",
      description:
        "Create different responses and workflows depending on what the caller needs.",
    },
    {
      title: "Call summaries & transcripts",
      description:
        "Provide useful information from conversations so the business can understand what happened during calls.",
    },
    {
      title: "Message taking",
      description:
        "If the caller cannot be handled immediately, the receptionist can collect a message and callback information.",
    },
    {
      title: "Notifications & follow-ups",
      description:
        "Send lead or call information through connected email, messaging, webhook, CRM, or other integrations when configured.",
    },
    {
      title: "Custom AI personality",
      description:
        "Customize the receptionist's tone, personality, greeting, and behavior to match the client's business.",
    },
    {
      title: "Outbound calling workflows",
      description:
        "Support outbound calling workflows such as reminders, follow-ups, surveys, and lead qualification when configured.",
    },
  ],
  cta: "Get Your AI Receptionist",
  ctaNote: "Setup and customization included.",
};
