import type { Metadata, Viewport } from "next";
import { siteConfig, absoluteUrl } from "@/lib/site";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: "Web Development Company in Sri Lanka | APEX WEB Studio",
    template: "%s | APEX WEB Studio",
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "Web design and web development",
  alternates: {
    canonical: "/",
    languages: {
      "en-LK": "/",
      "en": "/",
      "x-default": "/",
    },
  },
  icons: {
    icon: [
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/icon-32.png"],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: "Web Development Company in Sri Lanka | APEX WEB Studio",
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: "en_LK",
    alternateLocale: ["en_US"],
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Web development company in Sri Lanka`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development Company in Sri Lanka | APEX WEB Studio",
    description: siteConfig.description,
    images: [absoluteUrl("/twitter-image")],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "geo.region": "LK",
    "geo.placename": "Negombo, Sri Lanka",
    "content-language": "en-LK",
  },
};

export const viewport: Viewport = {
  themeColor: "#06040d",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-LK">
      <body suppressHydrationWarning>
        {children}

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
