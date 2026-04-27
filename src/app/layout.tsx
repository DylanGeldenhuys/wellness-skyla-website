import type { Metadata } from "next";
import { Noto_Serif, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/contact";

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-noto-serif",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | Wellness with Skyla",
    default: "Wellness with Skyla | Massage Therapy",
  },
  description:
    "Bespoke massage therapy in the heart of [TODO: city]. Individual rituals and curated packages designed to restore your body and quiet your mind.", // TODO: refine description
  openGraph: {
    type: "website",
    siteName: "Wellness with Skyla",
    title: "Wellness with Skyla | Massage Therapy",
    description:
      "Bespoke massage therapy — face drainage, lymphatic, aroma oil, Thai massage, and more.", // TODO: refine
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
    >
      <body className="bg-bg text-ink antialiased font-serif">{children}</body>
    </html>
  );
}
