# Trade Forge

Marketing site for Trade Forge, a web design agency for roofing and trades
businesses. Built with Next.js (App Router), TypeScript, Tailwind CSS, and
Supabase for lead capture.

## Project structure

```
app/            Next.js App Router pages, layout, global styles
components/     Page sections (Header, Hero, Work, Pricing, ContactForm, etc.)
lib/            Supabase client setup
public/         Static assets
supabase/       Database schema (SQL) for the leads table
```

## Local development

```bash
npm install
cp .env.local.example .env.local   # then fill in your Supabase values
npm run dev
```

Visit http://localhost:3000.

## Setting up Supabase (lead capture)

The contact form on the homepage inserts rows into a `leads` table in
Supabase. To connect it:

1. Create a free project at [supabase.com](https://supabase.com).
2. Open the SQL Editor and run the contents of `supabase/schema.sql`. This
   creates the `leads` table and a row-level security policy that lets the
   public site **insert** leads but never **read** them back — leads stay
   private to you.
3. Go to **Settings → API** and copy your **Project URL** and **anon
   public** key (never the `service_role` key — that one bypasses security
   and should never go in frontend code).
4. Copy `.env.local.example` to `.env.local` and paste in your values:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-ANON-PUBLIC-KEY
```

5. Restart `npm run dev`. Submitting the form on the homepage will now
   insert a row into `leads`.
6. To view submitted leads, log into Supabase → **Table Editor** → `leads`.

## Deploying to Vercel

1. Push this repo to GitHub.
2. In Vercel, **Add New Project** → import the repo. Vercel auto-detects
   Next.js, so the default build settings work as-is.
3. Before deploying, add the same two environment variables under
   **Project Settings → Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy. Vercel gives you a live URL in about a minute.
5. Optional: attach a custom domain under **Project Settings → Domains**.
