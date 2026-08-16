-- Run this in the Supabase SQL Editor for your project.

create table leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  source text,              -- which site the lead came from, e.g. 'trade-forge'
  business_name text,
  contact_name text,
  contact_info text,        -- email or phone
  current_website text,
  notes text
);

-- Lock the table down, then open ONE narrow door: public insert only.
alter table leads enable row level security;

create policy "Anyone can submit a lead"
on leads for insert
to anon
with check (true);

-- No select policy is created for the anon role, so the public site
-- can write leads but never read them back. View leads in the
-- Supabase Table Editor while logged in as the project owner.
