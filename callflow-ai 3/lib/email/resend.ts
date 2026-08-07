import "server-only";
import { Resend } from "resend";

export type ContactSubmission = {
  name: string;
  businessName?: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: Date;
};

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatTimestamp(date: Date): string {
  return date.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  }) + " UTC";
}

/**
 * Sends the internal "you've got a new lead" notification to the business
 * owner. Uses NOTIFICATION_EMAIL_TO as the recipient and
 * RESEND_FROM_EMAIL as the sender — both configured via env vars.
 *
 * Returns silently (does not throw) if Resend isn't configured, so a
 * missing email integration never blocks the lead from being saved.
 */
export async function sendOwnerNotificationEmail(
  submission: ContactSubmission
): Promise<{ sent: boolean; error?: string }> {
  const resend = getResendClient();
  const to = process.env.NOTIFICATION_EMAIL_TO;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!resend || !to || !from) {
    return { sent: false, error: "Resend not configured" };
  }

  const safe = {
    name: escapeHtml(submission.name),
    businessName: escapeHtml(submission.businessName || "—"),
    email: escapeHtml(submission.email),
    phone: escapeHtml(submission.phone || "—"),
    message: escapeHtml(submission.message).replace(/\n/g, "<br/>"),
    time: escapeHtml(formatTimestamp(submission.createdAt)),
  };

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: submission.email,
      subject: `New demo request — ${submission.businessName || submission.name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
          <h2 style="margin-bottom: 4px;">New Book Demo submission</h2>
          <p style="color: #666; margin-top: 0;">Submitted ${safe.time}</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr><td style="padding: 8px 0; color: #666; width: 120px;">Name</td><td style="padding: 8px 0;">${safe.name}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Business</td><td style="padding: 8px 0;">${safe.businessName}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;">${safe.email}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Phone</td><td style="padding: 8px 0;">${safe.phone}</td></tr>
          </table>
          <p style="color: #666; margin-top: 16px; margin-bottom: 4px;">Message</p>
          <p style="padding: 12px; background: #f5f5f5; border-radius: 6px;">${safe.message}</p>
        </div>
      `,
      text: `New demo request\n\nSubmitted: ${formatTimestamp(submission.createdAt)}\nName: ${submission.name}\nBusiness: ${submission.businessName || "—"}\nEmail: ${submission.email}\nPhone: ${submission.phone || "—"}\n\nMessage:\n${submission.message}`,
    });

    if (error) {
      return { sent: false, error: error.message };
    }
    return { sent: true };
  } catch (err) {
    return {
      sent: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

/**
 * Sends the "thanks for requesting a demo" confirmation to the customer
 * who submitted the form.
 */
export async function sendCustomerConfirmationEmail(
  submission: ContactSubmission
): Promise<{ sent: boolean; error?: string }> {
  const resend = getResendClient();
  const from = process.env.RESEND_FROM_EMAIL;

  if (!resend || !from) {
    return { sent: false, error: "Resend not configured" };
  }

  const firstName = submission.name.trim().split(" ")[0] || submission.name;
  const safeFirstName = escapeHtml(firstName);

  try {
    const { error } = await resend.emails.send({
      from,
      to: submission.email,
      subject: "We've got your demo request — CallFlow AI",
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
          <h2>Thanks, ${safeFirstName} — we've got your request.</h2>
          <p style="color: #444; line-height: 1.6;">
            Someone from the CallFlow AI team will reach out within one
            business day to schedule your free 15-minute demo.
          </p>
          <p style="color: #444; line-height: 1.6;">
            In the meantime, you can try the live AI receptionist demo
            yourself — no waiting required.
          </p>
          <p style="margin-top: 24px; color: #999; font-size: 13px;">
            — The CallFlow AI team
          </p>
        </div>
      `,
      text: `Thanks, ${firstName} — we've got your request.\n\nSomeone from the CallFlow AI team will reach out within one business day to schedule your free 15-minute demo.\n\nIn the meantime, you can try the live AI receptionist demo yourself — no waiting required.\n\n— The CallFlow AI team`,
    });

    if (error) {
      return { sent: false, error: error.message };
    }
    return { sent: true };
  } catch (err) {
    return {
      sent: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
