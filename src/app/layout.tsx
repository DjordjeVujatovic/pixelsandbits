import "./globals.css";
import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

/* adjustFontFallback is off so glyphs missing from the latin subset
   (the → arrow, ✓, ▍) fall through to the system font like the design
   prototype, instead of a metric-adjusted proportional fallback that
   renders wide arrows and breaks stat-figure wrapping. */
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["system-ui", "sans-serif"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["monospace"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.pixelsandbits.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "pixels&bits — product engineering & ai deployment",
    template: "%s — pixels&bits",
  },
  description:
    "Whiteboard sketch to production system. Nine years across the full stack. The last two embedded inside AI companies as forward deployed engineers, turning LLM demos into things people use on Monday morning.",
  openGraph: {
    title: "pixels&bits — product engineering & ai deployment",
    description:
      "Whiteboard sketch to production system. Product engineering & AI deployment.",
    url: "/",
    siteName: "pixels&bits",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "pixels&bits — product engineering & ai deployment",
    description:
      "Whiteboard sketch to production system. Product engineering & AI deployment.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
