import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SITE_URL } from "@/lib/contact";

// Fonts come from the @fontsource packages instead of being downloaded from
// Google Fonts at build time; that download failed intermittently and broke
// Vercel builds. next/font needs literal paths here, not variables.
const notoSerif = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource/noto-serif/files/noto-serif-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/noto-serif/files/noto-serif-latin-400-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../node_modules/@fontsource/noto-serif/files/noto-serif-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/noto-serif/files/noto-serif-latin-700-italic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-noto-serif",
  display: "swap",
});

const plusJakartaSans = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | Wellness with Skyla",
    default: "Wellness with Skyla at Goldenhill Treatments",
  },
  description:
    "Massage and frequency therapy in Somerset West, including face drainage, lymphatic drainage, aroma oil massage, Theraphi, and bundled treatments.",
  openGraph: {
    type: "website",
    siteName: "Wellness with Skyla",
    title: "Wellness with Skyla at Goldenhill Treatments",
    description:
      "Massage and frequency therapy in Somerset West, including face drainage, lymphatic drainage, aroma oil massage, Theraphi, and bundled treatments.",
    images: [
      {
        url: "/images/skyla/skyla-giving-massage.jpg",
        width: 1200,
        height: 630,
        alt: "Skyla performing a massage treatment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${notoSerif.variable} ${plusJakartaSans.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-bg text-ink antialiased font-serif">{children}</body>
    </html>
  );
}
