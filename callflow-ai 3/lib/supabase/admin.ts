import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the service role key. This bypasses
 * Row Level Security, so it must NEVER be imported into any client
 * component — only into API route handlers (app/api/**\/route.ts).
 *
 * Returns null if the required env vars aren't set yet, so callers can
 * degrade gracefully instead of crashing the whole request.
 */
export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    return null;
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
}
