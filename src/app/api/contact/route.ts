import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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
  if (!name || !EMAIL_RE.test(email) || brief.length <= 12) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Spam protection: a filled honeypot or an impossibly fast submission is
  // dropped silently — respond ok so bots learn nothing.
  const honeypot = str(payload.website);
  const fillMs = typeof payload.fillMs === "number" ? payload.fillMs : 0;
  if (honeypot || fillMs < 3000) {
    return NextResponse.json({ ok: true });
  }

  const submission = {
    name,
    email,
    company: str(payload.company),
    kinds: Array.isArray(payload.kinds) ? payload.kinds.filter((k) => typeof k === "string") : [],
    budget: str(payload.budget),
    timeline: str(payload.timeline),
    brief,
    receivedAt: new Date().toISOString(),
  };

  // TODO: deliver `submission` — pending a decision between Resend email,
  // the Chatwoot Conversations API, or a third-party form backend.
  // Until then submissions are acknowledged and logged server-side only.
  console.log("[contact] submission received", submission);

  return NextResponse.json({ ok: true });
}
