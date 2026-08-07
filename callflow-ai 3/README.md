# CallFlow AI

**Never Miss Another Customer Call.**

A production-ready marketing site + live AI receptionist demo for CallFlow AI, an AI receptionist SaaS. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion. The AI layer is built for Google Gemini and runs entirely server-side.

---

## What's included

- **Homepage** — hero with an animated waveform + phone-call mockup, features grid, "how it works," an interactive ROI calculator, pricing teaser, and final CTA.
- **AI Demo page** (`/demo`) — a live chat + browser-voice AI receptionist. Switch between six industries (plumbing, HVAC, dentist, electrician, lawyer, barber) and the AI's persona, greeting, services, and FAQs update instantly.
- **Pricing page** (`/pricing`) — three-tier SaaS pricing with a pricing FAQ.
- **Contact page** (`/contact`) — a "book a free demo" form that's a real lead-capture system: every submission is saved to Supabase, triggers an owner notification email, and triggers a customer confirmation email, both via Resend.
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
  api/contact/route.ts    Lead capture: validates, saves to Supabase, sends emails via Resend

components/
  layout/                Navbar, Footer
  home/                  Hero, waveform/phone mockup, features, ROI calculator, CTA
  demo/                  Chat UI, voice button, industry selector, business info card
  pricing/               Pricing table
  contact/               Contact form (unchanged — still just POSTs to /api/contact)
  ui/                    Shared Button, SectionHeading, StatusChip

lib/
  ai/
    gemini.ts            Server-only Gemini API client (the only file that touches the API key)
    prompts.ts            Builds the receptionist system prompt from industry data
    fallback.ts            Rule-based responder used when no API key is set
    types.ts                Shared AI request/response types
  supabase/
    admin.ts               Server-only Supabase client (service role key, never sent to the browser)
  email/
    resend.ts               Resend client + owner-notification and customer-confirmation email templates
  validation/
    contact.ts               Zod schema for the Book Demo form payload
  industries.ts            Config-driven business data per industry
  pricing.ts                Pricing tier data
  roi.ts                     ROI calculator math
  speech.d.ts               Browser Web Speech API type declarations
  utils.ts                   Small className helper

supabase/
  contact_submissions.sql   SQL to create the contact_submissions table + RLS policy
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

## Book Demo form → lead capture system

The `/contact` page form is a fully wired lead-capture pipeline. The frontend (`components/contact/ContactForm.tsx`) is unchanged — it still just `POST`s `{ name, businessName, email, phone, message }` to `/api/contact`. Everything below happens server-side in `app/api/contact/route.ts`:

1. **Validate** — the payload is parsed and validated with `zod` (`lib/validation/contact.ts`). Invalid or missing fields return a `400` with a specific error message and per-field errors.
2. **Save to Supabase** — the submission is inserted into the `contact_submissions` table using a server-only Supabase client (`lib/supabase/admin.ts`) that uses the **service role key**, so it bypasses Row Level Security. This is the source of truth for every lead; if this insert fails, the API returns a `500` and no emails are sent.
3. **Notify you** — once the lead is saved, an email is sent to `NOTIFICATION_EMAIL_TO` via Resend containing the name, business, email, phone, message, and submission time (`lib/email/resend.ts` → `sendOwnerNotificationEmail`). The email's Reply-To is set to the customer's email, so you can hit reply and respond directly.
4. **Confirm to the customer** — a "thanks for requesting a demo" email is sent to the customer's own address (`sendCustomerConfirmationEmail`).
5. Email sending is **best-effort and non-blocking** — if Resend is slow, misconfigured, or down, the lead is still saved and the visitor still sees a success message. Failures are logged server-side (visible in your Vercel deployment logs) rather than surfaced to the visitor.

### 1. Create the Supabase table

In your Supabase project, open **SQL Editor → New query**, paste the contents of [`supabase/contact_submissions.sql`](./supabase/contact_submissions.sql), and run it. It creates the table with Row Level Security enabled and **no public policies** — meaning only the service role key (used server-side) can read or write it, even if your anon/public key were ever exposed.

```sql
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  business_name text,
  email text not null,
  phone text,
  message text not null,
  created_at timestamptz not null default now()
);
```

### 2. Get your Supabase credentials

From your Supabase project: **Settings → API**.
- `SUPABASE_URL` → "Project URL"
- `SUPABASE_SERVICE_ROLE_KEY` → "service_role" secret key (⚠️ not the "anon public" key — this one bypasses RLS and must never be prefixed with `NEXT_PUBLIC_` or shipped to the browser)

### 3. Set up Resend

1. Create a free account at [resend.com](https://resend.com) and generate an API key at **Resend → API Keys** → `RESEND_API_KEY`.
2. Verify a sending domain at **Resend → Domains** (or use their shared `onboarding@resend.dev` sender for local testing only — production sends should use your own verified domain).
3. Set `RESEND_FROM_EMAIL` to an address on that domain, e.g. `CallFlow AI <notifications@yourdomain.com>`.
4. Set `NOTIFICATION_EMAIL_TO` to the inbox that should receive new-lead alerts — this can be a personal email, a shared team inbox, or a distribution list.

### 4. Add the environment variables

Add all five variables below to `.env.local` for development, and to **Vercel → Project → Settings → Environment Variables** for production (see the full table in [Environment variables](#environment-variables) below).

### Extending this later

For persisting full AI demo conversations (not just contact form leads), create a `conversations` / `messages` table in Supabase and insert into it from `app/api/ai/route.ts` alongside the existing Gemini call — the message shape (`{ role, content }`) already matches what you'd store. The same `lib/supabase/admin.ts` client can be reused there.

---

## Environment variables

| Variable | Required for | Where to get it |
|---|---|---|
| `GEMINI_API_KEY` | Real AI responses in the `/demo` page (falls back to a rule-based responder if unset) | [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) |
| `SUPABASE_URL` | Saving Book Demo leads | Supabase → Settings → API → "Project URL" |
| `SUPABASE_SERVICE_ROLE_KEY` | Saving Book Demo leads | Supabase → Settings → API → "service_role" secret key |
| `RESEND_API_KEY` | Sending owner + customer emails | [resend.com/api-keys](https://resend.com/api-keys) |
| `RESEND_FROM_EMAIL` | Sending owner + customer emails | A sender address on a domain verified in Resend → Domains |
| `NOTIFICATION_EMAIL_TO` | Owner notification email | The inbox you want new leads sent to |

If the Supabase variables are missing, `/api/contact` returns a `500` (leads can't be captured without a database). If the Resend variables are missing, form submissions still succeed and save to Supabase — the app just logs that emails were skipped, so you can add email later without anything breaking in the meantime.

All of the above are read only in server-side code (`app/api/*/route.ts` and files under `lib/`) — none are ever exposed to the browser bundle.

---

## Deploying to Vercel (free)

1. Push this project to a new GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Add all six environment variables from the [table above](#environment-variables) in the Vercel project settings (Settings → Environment Variables) — at minimum `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are needed for the Book Demo form to actually save leads.
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
- **Supabase** (`@supabase/supabase-js`) — stores Book Demo form leads server-side
- **Resend** — sends the owner notification and customer confirmation emails
- **Zod** — request validation on the `/api/contact` route

No OpenAI dependency anywhere in the codebase.
