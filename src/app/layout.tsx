import type { Metadata, Viewport } from "next";
import { fontVars } from "@/lib/fonts";
import { reportWebVitals } from "@/lib/performance";
import "./critical.css";

export const metadata: Metadata = {
  title: "Lyyli.ai - AI Communication Assistant",
  description: "Redirecting to localized version...",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#2F5D50",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={fontVars}>
      <head>
        {/* Preload critical fonts for LCP - Next.js handles this automatically */}
        {/* next/font/google self-hosts and preloads fonts, sets font-display: swap */}
        
        {/* Preload critical images in modern formats */}
        <link rel="preload" href="/images/logos/Lyyli.ai_no_BG.webp" as="image" type="image/webp" />
        <link rel="preload" href="/images/general/Desktop_UI_for_web.webp" as="image" type="image/webp" />

        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

        {/* Prefetch likely navigation targets */}
        <link rel="prefetch" href="/en/features" />
        <link rel="prefetch" href="/en/pricing" />
        <link rel="prefetch" href="/en/about" />
        <link rel="prefetch" href="/en/contact" />

        {/* Favicon and app icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icons/icon-512x512.png" />
        
        {/* Web App Manifest */}
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#2F5D50" />
        <meta name="msapplication-TileColor" content="#2F5D50" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
