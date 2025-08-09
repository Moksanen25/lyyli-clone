import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { headers } from 'next/headers';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import "../globals.css";

// Inter font for body text - clarity and readability
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Optimizes font loading performance
  weight: ["400", "500", "600", "700"], // Regular, Medium, Semi-Bold, Bold
});

// Playfair Display font for headings - elegance and trust
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap", // Optimizes font loading performance
  weight: ["400", "700"], // Regular, Bold
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Lyyli.ai - AI Communication Assistant for Professional Service Organizations",
    template: "%s | Lyyli.ai"
  },
  description: "Transform your internal communications with enterprise-grade AI. Streamline workflows for operations leaders, PMO heads, and communications managers. SOC 2 compliant with multilingual support.",
  keywords: [
    "AI communication assistant",
    "professional service organizations", 
    "internal communications",
    "enterprise communication",
    "operations management",
    "PMO tools",
    "multilingual communication",
    "compliance communication"
  ],
  authors: [{ name: "Lyyli.ai" }],
  creator: "Lyyli.ai",
  publisher: "Lyyli.ai",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://lyyli.ai'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'fi': '/fi',
    },
  },
  openGraph: {
    title: "Lyyli.ai - AI Communication Assistant for Professional Service Organizations",
    description: "Transform your internal communications with enterprise-grade AI. Streamline workflows for operations leaders and communications managers.",
    url: 'https://lyyli.ai',
    siteName: 'Lyyli.ai',
    images: [
      {
        url: '/og-image.png',
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
    title: "Lyyli.ai - AI Communication Assistant",
    description: "Transform your internal communications with enterprise-grade AI",
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

  // Get canonical URL
  const headersList = await headers();
  const host = headersList.get('host') || 'lyyli.ai';
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const pathname = headersList.get('x-pathname') || '/';
  const canonicalUrl = `${protocol}://${host}${pathname}`;

  return (
    <html lang={currentLocale} dir="ltr">
      <head>
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="en" href={`${protocol}://${host}/en`} />
        <link rel="alternate" hrefLang="fi" href={`${protocol}://${host}/fi`} />
        <link rel="alternate" hrefLang="x-default" href={`${protocol}://${host}/en`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2F5D50" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${inter.variable} ${playfairDisplay.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <div className="flex flex-col min-h-screen">
          <Header locale={currentLocale} />
          <main className="flex-1">
            {children}
          </main>
          <Footer locale={currentLocale} canonicalUrl={canonicalUrl} />
        </div>
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Lyyli.ai",
              "description": "AI Communication Assistant for Professional Service Organizations",
              "url": "https://lyyli.ai",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "description": "Free trial available"
              },
              "provider": {
                "@type": "Organization",
                "name": "Lyyli.ai",
                "url": "https://lyyli.ai"
              },
              "inLanguage": ["en", "fi"],
              "featureList": [
                "AI-powered message routing",
                "Multilingual communication support", 
                "Enterprise-grade security",
                "Compliance reporting",
                "Real-time communication analytics"
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
