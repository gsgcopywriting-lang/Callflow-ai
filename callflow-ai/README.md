# CallFlow AI

**Never Miss Another Customer Call.**

A production-ready marketing site + live AI receptionist demo for CallFlow AI, an AI receptionist SaaS. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion. The AI layer is built for Google Gemini and runs entirely server-side.

---

## What's included

- **Homepage** — hero with an animated waveform + phone-call mockup, features grid, "how it works," an interactive ROI calculator, pricing teaser, and final CTA.
- **AI Demo page** (`/demo`) — a live chat + browser-voice AI receptionist. Switch between six industries (plumbing, HVAC, dentist, electrician, lawyer, barber) and the AI's persona, greeting, services, and FAQs update instantly.
- **Pricing page** (`/pricing`) — three-tier SaaS pricing with a pricing FAQ.
- **Contact page** (`/contact`) — a "book a free demo" form, wired to an API route that's ready for Supabase.
- **Gemini integration layer** (`lib/ai/`) — a clean, swappable AI service layer. Works out of the box with **zero configuration** using a rule-based fallback responder, and automatically switches to real Gemini responses the moment you add an API key.

---

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Visit `http://localhost:3000`. The AI demo works immediately with no API key — it uses a rule-based fallback responder (`lib/ai/fallback.ts`) so you can see the full experience right away.

### Connecting Google Gemini

1. Get an API key at [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey).
2. Add it to `.env.local`:
   ```
   GEMINI_API_KEY=your_key_here
   ```
3. Restart the dev server. That's it — `lib/ai/gemini.ts` will now call the real Gemini API (`gemini-1.5-flash`) for every message. If the API ever errors or times out, the app automatically falls back to the rule-based responder so the demo never breaks for a visitor.

The API key is **never exposed to the browser** — it's only read inside `lib/ai/gemini.ts`, which is marked `server-only` and is only ever imported from the `/api/ai` route handler.

---

## Project structure

```
app/
  layout.tsx            Root layout, fonts, global SEO metadata
  page.tsx               Homepage
  demo/page.tsx           AI Demo page
  pricing/page.tsx        Pricing page
  contact/page.tsx        Contact page
  api/ai/route.ts         Server route that calls the Gemini layer
  api/contact/route.ts    Contact form submission (Supabase-ready)

components/
  layout/                Navbar, Footer
  home/                  Hero, waveform/phone mockup, features, ROI calculator, CTA
  demo/                  Chat UI, voice button, industry selector, business info card
  pricing/               Pricing table
  contact/               Contact form
  ui/                    Shared Button, SectionHeading, StatusChip

lib/
  ai/
    gemini.ts            Server-only Gemini API client (the only file that touches the API key)
    prompts.ts            Builds the receptionist system prompt from industry data
    fallback.ts            Rule-based responder used when no API key is set
    types.ts                Shared AI request/response types
  industries.ts            Config-driven business data per industry
  pricing.ts                Pricing tier data
  roi.ts                     ROI calculator math
  speech.d.ts               Browser Web Speech API type declarations
  utils.ts                   Small className helper
```

---

## Customizing industries

Everything the demo shows for a given industry — business name, greeting, hours, services, FAQs, and suggested questions — lives in one file: `lib/industries.ts`. Edit or add entries there and every page that uses the demo (and the Gemini system prompt) updates automatically.

---

## Connecting to a real phone system later

The whole app is deliberately structured so that swapping the demo for real inbound calls (via **Twilio** or **Vapi**) requires touching almost nothing:

- All conversational logic lives in `lib/ai/gemini.ts` + `lib/ai/prompts.ts` — never duplicated in the UI.
- The `/api/ai` route accepts a plain `{ industryId, messages }` payload — a Twilio/Vapi webhook can call this exact same route.
- The frontend's only jobs are capturing input (typed or via the Web Speech API) and rendering output — swapping the input source for a real phone call doesn't touch the AI logic at all.

To go live: add a new route (e.g. `app/api/twilio-webhook/route.ts` or `app/api/vapi-webhook/route.ts`) that receives the call transcript, calls `generateReceptionistReply()` from `lib/ai/gemini.ts`, and returns the reply for the provider to speak back to the caller.

---

## Connecting Supabase (contact form + conversation history)

`app/api/contact/route.ts` already has the exact insert call commented in, ready to uncomment once you connect a Supabase project:

```bash
npm install @supabase/supabase-js
```

```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

For persisting full AI demo conversations (not just contact form leads), create a `conversations` / `messages` table in Supabase and insert into it from `app/api/ai/route.ts` alongside the existing Gemini call — the message shape (`{ role, content }`) already matches what you'd store.

---

## Deploying to Vercel (free)

1. Push this project to a new GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Add the `GEMINI_API_KEY` environment variable in the Vercel project settings (Settings → Environment Variables).
4. Deploy — Vercel auto-detects Next.js, no build config needed.

Alternatively, from the CLI:

```bash
npm install -g vercel
vercel
```

---

## Tech stack

- **Next.js 14** (App Router, Route Handlers)
- **TypeScript** (strict mode)
- **Tailwind CSS** (custom design tokens — see `tailwind.config.ts`)
- **Framer Motion** (page and scroll animations)
- **lucide-react** (icons)
- **Google Gemini API** (`gemini-1.5-flash`) — the only AI provider used
- **Web Speech API** — browser-native voice input/output for the demo, no external voice service required

No OpenAI dependency anywhere in the codebase.
