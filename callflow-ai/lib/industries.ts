export type FAQ = { question: string; answer: string };

export type Industry = {
  id: string;
  label: string;
  businessName: string;
  ownerLine: string;
  greeting: string;
  hours: string;
  services: string[];
  faqs: FAQ[];
  suggestedQuestions: string[];
  pricingNote: string;
};

export const industries: Industry[] = [
  {
    id: "plumbing",
    label: "Plumbing",
    businessName: "ABC Plumbing",
    ownerLine: "Family-owned, serving the metro area since 2009.",
    greeting:
      "Thanks for calling ABC Plumbing, this is Ava. How can I help you today?",
    hours: "Mon–Sat, 7:00 AM – 8:00 PM. Emergency service available 24/7.",
    services: [
      "Drain cleaning",
      "Water heater repair & install",
      "Leak detection",
      "Pipe repiping",
      "Emergency burst-pipe response",
    ],
    faqs: [
      {
        question: "Are you open today?",
        answer:
          "We're open Monday through Saturday, 7am to 8pm, and we run 24/7 emergency service for burst pipes and major leaks.",
      },
      {
        question: "How much does a repair cost?",
        answer:
          "Most standard repairs run $150–$450 depending on the issue. I can get you an exact quote once a technician takes a look — want me to book a free estimate?",
      },
      {
        question: "Do you offer emergency service?",
        answer:
          "Yes — we have a technician on call 24/7 for emergencies like burst pipes or major leaks. I can dispatch someone right now if this is urgent.",
      },
    ],
    suggestedQuestions: [
      "Are you open today?",
      "Can I book an appointment?",
      "How much does a repair cost?",
      "Do you offer emergency service?",
    ],
    pricingNote: "Free estimates on all repairs over $200.",
  },
  {
    id: "hvac",
    label: "HVAC",
    businessName: "Northwind Heating & Air",
    ownerLine: "Licensed HVAC contractors, 15-year workmanship warranty.",
    greeting:
      "Northwind Heating and Air, this is Ava — what can I help you with?",
    hours: "Mon–Fri, 8:00 AM – 6:00 PM. Weekend emergency calls welcome.",
    services: [
      "AC repair & installation",
      "Furnace repair & installation",
      "Duct cleaning",
      "Seasonal tune-ups",
      "Thermostat upgrades",
    ],
    faqs: [
      {
        question: "Are you open today?",
        answer:
          "We're open 8am to 6pm on weekdays, and we take emergency weekend calls if your system goes down.",
      },
      {
        question: "How much does a repair cost?",
        answer:
          "Diagnostics start at $89, which is credited toward any repair we do. Full system installs vary — I can set up a free in-home quote.",
      },
      {
        question: "Do you offer emergency service?",
        answer:
          "For no heat or no AC emergencies, yes — we prioritize those same-day whenever possible.",
      },
    ],
    suggestedQuestions: [
      "Are you open today?",
      "Can I book an appointment?",
      "How much does a repair cost?",
      "Do you offer emergency service?",
    ],
    pricingNote: "$89 diagnostic fee, waived if you book the repair.",
  },
  {
    id: "dentist",
    label: "Dentist",
    businessName: "Bright Smile Dental",
    ownerLine: "General & cosmetic dentistry, most insurance accepted.",
    greeting:
      "Thanks for calling Bright Smile Dental, this is Ava. How can I help?",
    hours: "Mon–Thu, 8:00 AM – 5:00 PM. Closed weekends.",
    services: [
      "Routine cleanings & checkups",
      "Whitening",
      "Fillings & crowns",
      "Invisalign",
      "Emergency tooth pain visits",
    ],
    faqs: [
      {
        question: "Are you open today?",
        answer:
          "We're open Monday through Thursday, 8am to 5pm — happy to check today's availability for you.",
      },
      {
        question: "Can I book an appointment?",
        answer:
          "Of course — are you looking for a cleaning, a specific concern, or a new patient exam? I can pull up open slots this week.",
      },
      {
        question: "How much does a repair cost?",
        answer:
          "Costs depend on your insurance and the procedure — a filling typically runs $150–$300 out of pocket. I can check your coverage if you give me your provider.",
      },
    ],
    suggestedQuestions: [
      "Are you open today?",
      "Can I book an appointment?",
      "Do you accept my insurance?",
      "I have a tooth emergency",
    ],
    pricingNote: "New patient exam + cleaning from $99.",
  },
  {
    id: "electrician",
    label: "Electrician",
    businessName: "Volt & Co. Electric",
    ownerLine: "Licensed & insured residential and commercial electricians.",
    greeting: "Volt and Co. Electric, this is Ava — how can I help you?",
    hours: "Mon–Sat, 7:00 AM – 7:00 PM. 24/7 emergency line.",
    services: [
      "Panel upgrades",
      "Wiring & rewiring",
      "EV charger installation",
      "Lighting installation",
      "Emergency power restoration",
    ],
    faqs: [
      {
        question: "Are you open today?",
        answer:
          "Yes, 7am to 7pm today, and we run a 24/7 line for power outages and electrical emergencies.",
      },
      {
        question: "How much does a repair cost?",
        answer:
          "Small jobs like outlet or switch repairs start around $120. Panel upgrades and rewiring are quoted after a free on-site assessment.",
      },
      {
        question: "Do you offer emergency service?",
        answer:
          "Yes — if you've lost power or have exposed wiring, we treat that as urgent and can get someone out today.",
      },
    ],
    suggestedQuestions: [
      "Are you open today?",
      "Can I book an appointment?",
      "How much does a repair cost?",
      "Do you offer emergency service?",
    ],
    pricingNote: "Free on-site quotes for jobs over $500.",
  },
  {
    id: "lawyer",
    label: "Lawyer",
    businessName: "Harmon & Reyes Law",
    ownerLine: "Personal injury and family law, free consultations.",
    greeting:
      "Thank you for calling Harmon and Reyes Law, this is Ava. How can I help you today?",
    hours: "Mon–Fri, 9:00 AM – 6:00 PM.",
    services: [
      "Personal injury claims",
      "Family & divorce law",
      "Estate planning",
      "Free case consultations",
      "Contingency-fee representation",
    ],
    faqs: [
      {
        question: "Are you open today?",
        answer:
          "We're open 9am to 6pm on weekdays. If this is time-sensitive, I can flag it for a same-day callback.",
      },
      {
        question: "Can I book an appointment?",
        answer:
          "Yes — we offer a free 30-minute consultation. Can I get a quick summary of your situation so I can route you to the right attorney?",
      },
      {
        question: "How much does a repair cost?",
        answer:
          "For personal injury cases we work on contingency, meaning no upfront fees — we only get paid if you win. Other matters are billed hourly or flat-fee depending on the case.",
      },
    ],
    suggestedQuestions: [
      "Are you open today?",
      "Can I book a free consultation?",
      "What are your fees?",
      "I was in an accident, what should I do?",
    ],
    pricingNote: "Free 30-minute consultations on all new cases.",
  },
  {
    id: "barber",
    label: "Barber",
    businessName: "The Fade Room",
    ownerLine: "Walk-ins welcome, appointments preferred.",
    greeting: "The Fade Room, this is Ava — what can I do for you?",
    hours: "Tue–Sun, 9:00 AM – 7:00 PM. Closed Mondays.",
    services: [
      "Classic & skin fades",
      "Beard trims",
      "Hot towel shaves",
      "Kids' cuts",
      "Walk-in slots held daily",
    ],
    faqs: [
      {
        question: "Are you open today?",
        answer:
          "We're open Tuesday through Sunday, 9am to 7pm — closed Mondays. Want me to check today's chair availability?",
      },
      {
        question: "Can I book an appointment?",
        answer:
          "Definitely — do you have a preferred barber, or should I book you with the next available chair?",
      },
      {
        question: "How much does a repair cost?",
        answer:
          "A standard cut is $35, cut and beard trim combo is $50. Kids' cuts are $25.",
      },
    ],
    suggestedQuestions: [
      "Are you open today?",
      "Can I book an appointment?",
      "How much is a haircut?",
      "Do you take walk-ins?",
    ],
    pricingNote: "Cuts from $35, combo packages from $50.",
  },
];

export function getIndustry(id: string): Industry {
  return industries.find((i) => i.id === id) ?? industries[0];
}
