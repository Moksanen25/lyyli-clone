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
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                // Load non-critical CSS asynchronously
                const loadNonCriticalCSS = () => {
                  const link = document.createElement('link');
                  link.rel = 'stylesheet';
                  link.href = '/globals.css';
                  link.media = 'print';
                  link.onload = () => {
                    link.media = 'all';
                  };
                  document.head.appendChild(link);
                };



                // Load CSS after initial render
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', loadNonCriticalCSS);
                } else {
                  loadNonCriticalCSS();
                }

                // Web Vitals monitoring
                import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
                  getCLS(reportWebVitals);
                  getFID(reportWebVitals);
                  getFCP(reportWebVitals);
                  getLCP(reportWebVitals);
                  getTTFB(reportWebVitals);
                });

                // Service Worker registration
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', () => {
                    navigator.serviceWorker.register('/sw.js')
                      .then((registration) => {
                        console.log('SW registered: ', registration);
                      })
                      .catch((registrationError) => {
                        console.log('SW registration failed: ', registrationError);
                      });
                  });
                }
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
