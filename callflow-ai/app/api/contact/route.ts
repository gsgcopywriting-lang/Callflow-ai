import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  message: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ContactPayload;

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // -----------------------------------------------------------------
    // Supabase integration point:
    // Once a Supabase project is connected, replace this block with:
    //
    //   import { createClient } from "@supabase/supabase-js";
    //   const supabase = createClient(
    //     process.env.SUPABASE_URL!,
    //     process.env.SUPABASE_SERVICE_ROLE_KEY!
    //   );
    //   await supabase.from("contact_submissions").insert({
    //     name: body.name,
    //     business_name: body.businessName,
    //     email: body.email,
    //     phone: body.phone,
    //     message: body.message,
    //   });
    //
    // No other part of the app needs to change — the form already posts
    // here with the exact shape Supabase would expect.
    // -----------------------------------------------------------------
    console.log("[contact] new submission:", {
      name: body.name,
      businessName: body.businessName,
      email: body.email,
      phone: body.phone,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[/api/contact] error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
