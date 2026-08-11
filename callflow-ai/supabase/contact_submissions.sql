-- ============================================================
-- CallFlow AI — contact_submissions table
-- Run this in the Supabase SQL editor (Project → SQL Editor → New query)
-- ============================================================

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  business_name text,
  email text not null,
  phone text,
  message text not null,
  created_at timestamptz not null default now()
);

-- Helpful for sorting/searching the leads list in a future dashboard
create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

-- Row Level Security: submissions are written exclusively by the server
-- using the Supabase service role key (see app/api/contact/route.ts),
-- which bypasses RLS entirely. Enabling RLS with no public policies means
-- the anon/public key can never read or write this table directly from
-- a browser, even if it were accidentally exposed.
alter table public.contact_submissions enable row level security;

-- No insert/select/update/delete policies are defined for the anon or
-- authenticated roles on purpose — this table is service-role-only.
-- If you later add a dashboard where logged-in business owners should
-- read their own leads, add a scoped select policy at that point.
