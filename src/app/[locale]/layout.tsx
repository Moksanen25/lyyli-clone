import type { Metadata } from 'next';
import { headers, cookies } from 'next/headers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConsentBanner from '@/components/ConsentBanner';
import AnalyticsHead from '@/components/AnalyticsHead';
import MeshGradientBackground from '@/components/MeshGradientBackground';
import DevSWCleanup from '@/components/DevSWCleanup';
import { getTranslations } from '@/lib/i18n';
import { fontVars } from '@/lib/fonts';
import WebVitals from '@/components/WebVitals';
import { createTitleTemplate } from '@/lib/title';
import {
  generateOrganizationSchema,
  generateWebsiteSchema,
  generateBreadcrumbSchema,
  combineSchemas,
} from '@/lib/structured-data';

import '@/app/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Lyyli.ai - AI Communication Assistant',
    template: createTitleTemplate(),
  },
  description:
    'Transform your internal communications with enterprise-grade AI. Streamline workflows for operations leaders, PMO heads, and communications managers. SOC 2 compliant with multilingual support.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  keywords: [
    'AI communication assistant',
    'professional service organizations',
    'internal communications',
    'enterprise communication',
    'operations management',
    'PMO tools',
    'multilingual communication',
    'compliance communication',
  ],
  authors: [{ name: 'Lyyli.ai' }],
  creator: 'Lyyli.ai',
  publisher: 'Lyyli.ai',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://lyyli.ai'),
  alternates: {
    languages: {
      en: '/en',
      fi: '/fi',
    },
  },
  openGraph: {
    title:
      'Lyyli.ai - AI Communication Assistant for Professional Service Organizations',
    description:
      'Transform your internal communications with enterprise-grade AI. Streamline workflows for operations leaders and communications managers.',
    url: 'https://lyyli.ai',
    siteName: 'Lyyli.ai',
    images: [
      {
        url: '/api/og?title=Lyyli.ai - AI Communication Assistant&description=Transform your internal communications with enterprise-grade AI',
        width: 1200,
        height: 630,
        alt: 'Lyyli.ai - AI Communication Assistant',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lyyli.ai - AI Communication Assistant',
    description:
      'Transform your internal communications with enterprise-grade AI',
    images: ['/twitter-image.png'],
    creator: '@lyyli_ai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fi' }];
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Ensure locale is supported
  const supportedLocales = ['en', 'fi'];
  const currentLocale = supportedLocales.includes(locale) ? locale : 'en';

  // Get translations
  const t = await getTranslations(currentLocale);

  // Get pathname for breadcrumbs and footer (not for canonical URL)
  const headersList = await headers();
  const host = headersList.get('host') || 'lyyli.ai';
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const pathname = headersList.get('x-pathname') || '/';
  const canonicalUrl = `${protocol}://${host}${pathname}`; // Only for footer display

  // Read CSP nonce from headers or cookie (middleware provides both)
  const nonceHeader = headersList.get('x-csp-nonce') || undefined;
  const cookieStore = await cookies();
  const nonceCookie = cookieStore.get('csp-nonce')?.value;
  const nonce = nonceHeader || nonceCookie;

  return (
    <html lang={currentLocale} dir="ltr" className={`${fontVars} h-full`}>
      <head>
        {nonce && <meta name="csp-nonce" content={nonce} />}
        {/* hreflang tags are generated per-page via metadata.alternates.languages */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Critical font preloading for LCP optimization */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;700&display=swap"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;700&display=swap"
        />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//cdn.matomo.cloud" />
        <link rel="dns-prefetch" href="//lyyliai.matomo.cloud" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Critical CSS for LCP optimization */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .font-playfair { font-family: var(--font-playfair), Georgia, serif; }
            .font-sans { font-family: var(--font-inter), system-ui, Arial, sans-serif; }
            .text-4xl { font-size: 2.25rem; line-height: 1.2; }
            .text-5xl { font-size: 3rem; line-height: 1.2; }
            @media (min-width: 768px) { .md\\:text-5xl { font-size: 3.75rem; line-height: 1.2; } }
            .font-loading .text-4xl, .font-loading .md\\:text-5xl { visibility: hidden; }
            .font-loaded .text-4xl, .font-loaded .md\\:text-5xl { visibility: visible; }
          `,
          }}
        />

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Analytics Scripts - Load after consent */}
        <AnalyticsHead />
      </head>
      <body
        className="antialiased font-sans min-h-screen"
        suppressHydrationWarning
      >
        {/* Vibrant Mesh Gradient Background for all pages */}
        <MeshGradientBackground />
        <div className="flex flex-col min-h-screen relative z-10">
          <Header locale={currentLocale} translations={t} />
          <main className="flex-1 relative">{children}</main>
          <Footer
            locale={currentLocale}
            translations={t}
            canonicalUrl={canonicalUrl}
          />
          <ConsentBanner locale={currentLocale} translations={t} />
          <DevSWCleanup />
          <WebVitals />
        </div>

        {/* Schema.org structured data - Organization, Website, and BreadcrumbList */}
        <script
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              combineSchemas(
                generateOrganizationSchema(currentLocale),
                generateWebsiteSchema(currentLocale),
                generateBreadcrumbSchema(pathname, currentLocale)
              )
            ),
          }}
        />
      </body>
    </html>
  );
}
