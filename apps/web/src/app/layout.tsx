import "./globals.css";
import "@repo/ui/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ChatwootWidget from "../components/chatwoot-widget";
import { Analytics } from "@vercel/analytics/next";
const inter = Inter({ subsets: ["latin"] });

// Remove useEffect since it can't be used at the top level in a Server Component
// The dark class is now directly added in the html element

export const metadata: Metadata = {
  title: "Pixels & Bits",
  description: "Product Engineering & Design Studio",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/favicon-32x32.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "/favicon-16x16.png",
        type: "image/png",
        sizes: "16x16",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    title: "Pixels & Bits",
    description: "Product Engineering & Design Studio",
    images: [
      {
        url: "https://storage.googleapis.com/pixelsandbits/Screen%20Shot%202025-01-13%20at%2012.25.16%20PM.png",
        width: 1200,
        height: 630,
        alt: "Pixels & Bits",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pixels & Bits",
    description: "Product Engineering & Design Studio",
    images: [
      "https://storage.googleapis.com/pixelsandbits/Screen%20Shot%202025-01-13%20at%2012.25.16%20PM.png",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html className="dark" lang="en">
      <body className={inter.className}>
        {children}
        <ChatwootWidget />
        <Analytics />
      </body>
    </html>
  );
}
