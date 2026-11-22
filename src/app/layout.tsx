import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site-config";

const oswald = Oswald({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: "600",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Self-Service Vehicle Workshop, Douglas, Isle of Man`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  robots: { index: true, follow: true },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined },
  applicationName: SITE.name,
  keywords: [
    "ramp hire Isle of Man",
    "car lift rental Douglas",
    "self service workshop",
    "2 post lift hire",
    "4 post lift hire",
    "DIY car servicing Isle of Man",
    "Rent a Ramp",
  ],
  openGraph: {
    title: `${SITE.name} | Need a ramp? Rent one.`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    images: [{ url: "/images/hero-cover-img.fa5e884b9c.webp", alt: "Rent a Ramp self-service workshop in Douglas, Isle of Man" }],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/hero-cover-img.fa5e884b9c.webp"],
    title: `${SITE.name} | Need a ramp? Rent one.`,
    description: SITE.description,
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon.ico" },
    ],
    apple: { url: "/favicon/apple-touch-icon.png", sizes: "180x180" },
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      data-scroll-behavior="smooth"
      className={`${oswald.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-ink">{children}</body>
    </html>
  );
}
