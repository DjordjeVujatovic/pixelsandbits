# pixels&bits

Marketing site for Pixels & Bits — product engineering & AI deployment.

Two pages — `/` and `/contact` — built with Next.js 14 (App Router), React 18
and plain CSS. No UI libraries, no animation libraries: the terminal, the
declassification decode, the process timeline and the reveal system are CSS
keyframes plus `IntersectionObserver`/`requestAnimationFrame`, written through
refs so per-character animation never re-renders the page.

## Develop

```sh
pnpm install
pnpm dev
```

## Build

```sh
pnpm build
```

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata/sitemap (optional; defaults to the production domain) |

The contact form POSTs to `/api/contact`, which validates, filters spam
(honeypot + minimum fill time) and currently logs the submission server-side —
delivery wiring (email/Chatwoot/third party) is a pending decision.
