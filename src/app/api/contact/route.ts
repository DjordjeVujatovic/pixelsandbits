import { NextResponse } from "next/server";
import { Resend } from "resend";
import { confirmationEmail, enquiryEmail } from "@/lib/emails";

/* Sent from the verified Resend domain; replies go to the visitor. */
const FROM = "Pixels & Bits <contact@pixelsandbits.co>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const BRIEF_MAX = 3000;

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  kinds?: unknown;
  budget?: unknown;
  timeline?: unknown;
  brief?: unknown;
  website?: unknown;
  fillMs?: unknown;
}

const str = (v: unknown): string => (typeof v === "string" ? v.trim() : "");

export async function POST(request: Request): Promise<NextResponse> {
  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const name = str(payload.name);
  const email = str(payload.email);
  const brief = str(payload.brief);

  // Mirrors the client-side guard.
  if (
    !name ||
    !EMAIL_RE.test(email) ||
    brief.length <= 12 ||
    brief.length > BRIEF_MAX
  ) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Spam protection: a filled honeypot or an impossibly fast submission is
  // dropped silently — respond ok so bots learn nothing.
  const honeypot = str(payload.website);
  const fillMs = typeof payload.fillMs === "number" ? payload.fillMs : 0;
  if (honeypot || fillMs < 3000) {
    console.warn("[contact] Dropped as spam", {
      honeypot: Boolean(honeypot),
      fillMs,
    });
    return NextResponse.json({ ok: true });
  }

  const submission = {
    name,
    email,
    company: str(payload.company),
    kinds: Array.isArray(payload.kinds)
      ? payload.kinds.filter((k) => typeof k === "string")
      : [],
    budget: str(payload.budget),
    timeline: str(payload.timeline),
    brief,
    receivedAt: new Date().toISOString(),
  };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("[contact] RESEND_API_KEY or CONTACT_TO_EMAIL is not set");
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: FROM,
    to,
    replyTo: submission.email,
    ...enquiryEmail(submission),
  });

  if (error) {
    console.error("[contact] Resend send failed", error.name, error.message);
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  // Confirmation copy to the visitor. The enquiry has already landed, so a
  // failure here is logged rather than surfaced as a failed submission.
  const { error: confirmError } = await resend.emails.send({
    from: FROM,
    to: submission.email,
    replyTo: to,
    ...confirmationEmail(submission),
  });

  if (confirmError) {
    console.error(
      "[contact] Confirmation send failed",
      confirmError.name,
      confirmError.message,
    );
  }

  return NextResponse.json({ ok: true });
}
