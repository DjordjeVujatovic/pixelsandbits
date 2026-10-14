/* Transactional emails sent by the contact route: the enquiry that lands in
   the team inbox, and the confirmation copy sent back to the visitor.
   Email clients ignore stylesheets and web fonts, so everything is inline,
   laid out with tables, and set in system fallback stacks. Colours mirror the
   tokens in globals.css. */

const BG = "#05080d";
const SURFACE = "#0a1018";
const FG = "#dbe6f2";
const FG_DIM = "#8a95a3";
const FG_FAINT = "#5b6573";
const LINE = "#1a222d";
const ACC = "#c6f24e";
const INK = "#05080d";

const MONO =
  "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace";
const SANS =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

const SITE = "https://www.pixelsandbits.co";
const TAGLINE = "product engineering and design for teams shipping AI";

export interface Submission {
  name: string;
  email: string;
  company: string;
  kinds: string[];
  budget: string;
  timeline: string;
  brief: string;
  receivedAt: string;
}

interface Email {
  subject: string;
  html: string;
  text: string;
}

const esc = (s: string): string =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const firstNameOf = (name: string): string => name.split(/\s+/)[0];

const recapOf = (s: Submission): string[] =>
  [s.company, s.budget, s.timeline, ...s.kinds]
    .map((r) => r.trim())
    .filter(Boolean);

const chipsHtml = (items: string[]): string =>
  items
    .map(
      (r) =>
        `<span style="display:inline-block;margin:0 6px 6px 0;padding:0 11px;height:24px;line-height:24px;vertical-align:middle;border-radius:999px;background:${ACC};color:${INK};font-family:${MONO};font-size:11px;font-weight:600">${esc(r)}</span>`,
    )
    .join("");

const briefHtml = (brief: string, label: string): string => `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr><td style="border:1px solid ${LINE};border-radius:10px;padding:18px 20px">
      <div style="font-family:${MONO};font-size:11px;letter-spacing:1px;color:${FG_FAINT};margin-bottom:10px">${label}</div>
      <div style="font-family:${SANS};font-size:15px;line-height:1.65;color:${FG};word-break:break-word;overflow-wrap:anywhere">${esc(brief).replace(/\r?\n/g, "<br>")}</div>
    </td></tr>
  </table>`;

const heading = (inner: string): string =>
  `<tr><td style="padding:0 32px;font-family:${SANS};font-size:30px;line-height:1.15;font-weight:600;letter-spacing:-0.5px;color:#ffffff;word-break:break-word">${inner}</td></tr>`;

/* Shared frame: wordmark, card with the lime rule, footer. */
function shell(opts: {
  title: string;
  preheader: string;
  kicker: string;
  body: string;
  footer: string;
}): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<title>${opts.title}</title>
</head>
<body style="margin:0;padding:0;background:${BG}">
<div style="display:none;max-height:0;overflow:hidden">${opts.preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${BG}" style="background:${BG}">
<tr><td align="center" style="padding:40px 16px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px">
    <tr><td style="padding:0 4px 28px;font-family:${MONO};font-size:15px;font-weight:700;color:#ffffff">
      <span style="color:${ACC}">$</span> pixels&amp;bits <span style="color:${ACC}">&#9612;</span>
    </td></tr>
    <tr><td bgcolor="${SURFACE}" style="background:${SURFACE};border:1px solid ${LINE};border-radius:14px;overflow:hidden">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr><td height="3" bgcolor="${ACC}" style="background:${ACC};font-size:0;line-height:0">&nbsp;</td></tr>
        <tr><td style="padding:32px 32px 8px;font-family:${MONO};font-size:12px;color:${FG_FAINT}">${opts.kicker}</td></tr>
        ${opts.body}
      </table>
    </td></tr>
    <tr><td style="padding:24px 4px 0;font-family:${MONO};font-size:12px;line-height:1.7;color:${FG_FAINT}">
      ${opts.footer}
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;
}

const formatReceived = (iso: string): string =>
  new Date(iso).toLocaleString("en-US", {
    timeZone: "America/Vancouver",
    dateStyle: "medium",
    timeStyle: "short",
  }) + " PT";

/* Team inbox */

export function enquiryEmail(s: Submission): Email {
  const first = firstNameOf(s.name);
  const received = formatReceived(s.receivedAt);
  const subject = `New enquiry from ${s.name}${s.company ? `, ${s.company}` : ""}`;

  const details: [string, string][] = [
    ["Company", s.company],
    ["Looking for", s.kinds.join(", ")],
    ["Budget", s.budget],
    ["Timeline", s.timeline],
  ];
  const rows: [string, string][] = [
    [
      "Email",
      `<a href="mailto:${esc(s.email)}" style="color:${ACC};text-decoration:none">${esc(s.email)}</a>`,
    ],
    ...details
      .filter(([, v]) => v.trim())
      .map(([k, v]): [string, string] => [k, esc(v)]),
  ];

  const table = rows
    .map(([k, v], i) => {
      const rule = i ? `border-top:1px solid ${LINE};` : "";
      return `
      <tr>
        <td valign="top" width="112" style="padding:12px 0;${rule}font-family:${MONO};font-size:11px;letter-spacing:1px;color:${FG_FAINT};text-transform:uppercase">${k}</td>
        <td valign="top" style="padding:10px 0;${rule}font-family:${SANS};font-size:15px;line-height:1.5;color:${FG};word-break:break-word">${v}</td>
      </tr>`;
    })
    .join("");

  const replyHref = `mailto:${encodeURIComponent(s.email)}?subject=${encodeURIComponent("Re: your message to Pixels & Bits")}`;

  const body = `
    ${heading(`${esc(s.name)}${s.company ? `<span style="color:${FG_DIM}">, ${esc(s.company)}</span>` : ""}`)}
    <tr><td style="padding:14px 32px 0;font-family:${SANS};font-size:16px;line-height:1.65;color:${FG_DIM}">
      New enquiry from the contact form.
    </td></tr>
    <tr><td style="padding:22px 32px 0">
      <a href="${replyHref}" style="display:inline-block;padding:0 22px;height:44px;line-height:44px;border-radius:9px;background:${ACC};color:${INK};font-family:${MONO};font-size:14px;font-weight:700;text-decoration:none">reply to ${esc(first)} &rarr;</a>
    </td></tr>
    <tr><td style="padding:24px 32px 0">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${table}</table>
    </td></tr>
    <tr><td style="padding:20px 32px 32px">${briefHtml(s.brief, "WHAT THEY&#39;RE BUILDING")}</td></tr>`;

  const html = shell({
    title: esc(subject),
    preheader: esc(s.brief.slice(0, 140)),
    kicker: "$ cat ./new-enquiry",
    body,
    footer: `Received ${esc(received)}`,
  });

  const text = [
    subject,
    "",
    `Email: ${s.email}`,
    ...details.filter(([, v]) => v.trim()).map(([k, v]) => `${k}: ${v}`),
    "",
    "What they're building:",
    s.brief,
    "",
    `Received ${received}`,
  ].join("\n");

  return { subject, html, text };
}

/* Visitor confirmation */

export function confirmationEmail(s: Submission): Email {
  const first = firstNameOf(s.name);
  const recap = recapOf(s);
  const chips = chipsHtml(recap);

  const body = `
    ${heading(`Thanks, <span style="color:${ACC}">${esc(first)}</span>.`)}
    <tr><td style="padding:14px 32px 0;font-family:${SANS};font-size:16px;line-height:1.65;color:${FG_DIM}">
      Your message to Pixels &amp; Bits was received. A copy of what you sent is below.
    </td></tr>
    ${chips ? `<tr><td style="padding:22px 32px 0">${chips}</td></tr>` : ""}
    <tr><td style="padding:${chips ? "16px" : "24px"} 32px 32px">${briefHtml(s.brief, "WHAT YOU&#39;RE BUILDING")}</td></tr>`;

  const html = shell({
    title: "Your message to Pixels &amp; Bits",
    preheader:
      "Your message to Pixels &amp; Bits was received. A copy is inside.",
    kicker: "$ cat ./confirmation",
    body,
    footer: `<a href="${SITE}" style="color:${FG};text-decoration:none">pixels&amp;bits</a>
      &nbsp;&middot;&nbsp; ${TAGLINE}`,
  });

  const text = [
    `Thanks, ${first}.`,
    "",
    "Your message to Pixels & Bits was received. A copy of what you sent is below.",
    "",
    ...(recap.length ? [recap.join(" · "), ""] : []),
    "What you're building:",
    s.brief,
    "",
    "--",
    `pixels&bits · ${SITE.replace("https://", "")}`,
  ].join("\n");

  return { subject: "Your message to Pixels & Bits", html, text };
}
