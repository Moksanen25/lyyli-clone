import type { Metadata } from "next";
import { fontVars } from "@/lib/fonts";
import { reportWebVitals } from "@/lib/performance";
import "./critical.css";

export const metadata: Metadata = {
  title: "Lyyli.ai - AI Communication Assistant",
  description: "Redirecting to localized version...",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
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

        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
