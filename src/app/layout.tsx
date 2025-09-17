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
        {/* Preload critical images */}
        <link rel="preload" href="/images/logos/Lyyli.ai_no_BG.png" as="image" type="image/png" />
        <link rel="preload" href="/images/general/Desktop_UI_for_web.png" as="image" type="image/png" />

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
