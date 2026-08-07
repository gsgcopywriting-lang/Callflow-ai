import { NextRequest, NextResponse } from "next/server";
import { contactSubmissionSchema } from "@/lib/validation/contact";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import {
  sendOwnerNotificationEmail,
  sendCustomerConfirmationEmail,
} from "@/lib/email/resend";

export const runtime = "nodejs";

const GENERIC_ERROR_MESSAGE =
  "Something went wrong submitting your request. Please try again, or email us directly.";

export async function POST(req: NextRequest) {
  // ---- 1. Parse the request body safely -----------------------------
  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body — expected JSON." },
      { status: 400 }
    );
  }

  // ---- 2. Validate ----------------------------------------------------
  const parsed = contactSubmissionSchema.safeParse(rawBody);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json(
      {
        error: firstIssue?.message ?? "Invalid submission.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const { name, businessName, email, phone, message } = parsed.data;
  const createdAt = new Date();

  // ---- 3. Persist to Supabase (required — this is the source of truth) ---

  // TEMP DEBUG — remove before shipping to production.
  console.log("[debug] SUPABASE_URL exists:", !!process.env.SUPABASE_URL);
  console.log(
    "[debug] SUPABASE_URL prefix:",
    process.env.SUPABASE_URL?.slice(0, 30) ?? "undefined"
  );
  console.log(
    "[debug] SUPABASE_SERVICE_ROLE_KEY exists:",
    !!process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  // END TEMP DEBUG

  const supabase = getSupabaseAdmin();

  if (!supabase) {
    console.error(
      "[/api/contact] Supabase is not configured — set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
    return NextResponse.json({ error: GENERIC_ERROR_MESSAGE }, { status: 500 });
  }

  const { data: inserted, error: insertError } = await supabase
    .from("contact_submissions")
    .insert({
      name,
      business_name: businessName || null,
      email,
      phone: phone || null,
      message,
      created_at: createdAt.toISOString(),
    })
    .select("id")
    .single();

  // TEMP DEBUG — remove before shipping to production.
  if (insertError) {
    console.log("[debug] Supabase insert result: ERROR", JSON.stringify(insertError, null, 2));
  } else {
    console.log("[debug] Supabase insert result: SUCCESS", JSON.stringify(inserted, null, 2));
  }
  // END TEMP DEBUG

  if (insertError) {
    console.error("[/api/contact] Supabase insert failed:", insertError.message);
    return NextResponse.json({ error: GENERIC_ERROR_MESSAGE }, { status: 500 });
  }

  // ---- 4. Send notification + confirmation emails (best-effort) ---------
  // The lead is already safely stored at this point, so an email provider
  // hiccup should never turn into a failed request for the visitor — we
  // log any issues and still return success.
  const submission = {
    name,
    businessName: businessName || undefined,
    email,
    phone: phone || undefined,
    message,
    createdAt,
  };

  const [ownerResult, customerResult] = await Promise.allSettled([
    sendOwnerNotificationEmail(submission),
    sendCustomerConfirmationEmail(submission),
  ]);

  if (ownerResult.status === "rejected") {
    console.error("[/api/contact] owner notification email threw:", ownerResult.reason);
  } else if (!ownerResult.value.sent) {
    console.error("[/api/contact] owner notification email not sent:", ownerResult.value.error);
  }

  if (customerResult.status === "rejected") {
    console.error("[/api/contact] customer confirmation email threw:", customerResult.reason);
  } else if (!customerResult.value.sent) {
    console.error("[/api/contact] customer confirmation email not sent:", customerResult.value.error);
  }

  return NextResponse.json({ ok: true, id: inserted?.id ?? null });
}
