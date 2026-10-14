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

/* Pinned to the canonical production domain — an env override here made
   og:image / twitter:image resolve to the deploy-preview host while
   og:url claimed the canonical one, and social scrapers cached that. */
const siteUrl = "https://www.pixelsandbits.co";

const siteTitle = "pixels&bits: product engineering and design for teams shipping AI";
const siteDescription =
  "Forward deployed engineers who scope, build and hand over LLM products. Clients include Coinbase, ClassDojo, Decagon AI, Scotts Miracle-Gro and Dapper Labs.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | pixels&bits",
  },
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: "pixels&bits",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

/* Site-wide Organization schema. NDA rule applies here too: the
   frontier-lab client is never named in structured data. */
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "pixels&bits",
  url: siteUrl,
  description:
    "Forward deployed engineers who scope, build and hand over LLM products for companies including Coinbase, ClassDojo, Decagon AI, Scotts Miracle-Gro and Dapper Labs.",
  knowsAbout: [
    "forward deployed engineering",
    "deploying LLM applications",
    "product design",
    "full-stack engineering",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
