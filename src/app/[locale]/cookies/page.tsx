import { getTranslations } from "@/lib/i18n";
import { Metadata } from "next";
import { generatePageCanonicalUrl, generateHreflangMetadata } from "@/lib/canonical";

interface CookiesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: CookiesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return {
    title: t["cookies.page.title"],
    description: t["cookies.page.description"],
    openGraph: {
      title: t["cookies.page.title"],
      description: t["cookies.page.description"],
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(t["cookies.page.title"])}`,
          width: 1200,
          height: 630,
          alt: t["cookies.page.title"],
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t["cookies.page.title"],
      description: t["cookies.page.description"],
    },
    alternates: {
      canonical: generatePageCanonicalUrl('cookies', locale),
      languages: generateHreflangMetadata('/cookies', ['en', 'fi']),
    },
  };
}

export default async function CookiesPage({ params }: CookiesPageProps) {
  const { locale } = await params;
  const supportedLocales = ["en", "fi"];
  const currentLocale = supportedLocales.includes(locale) ? locale : "en";

  const t = await getTranslations(currentLocale);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative z-10 pt-32">
        <section 
          className="container mx-auto px-4 py-20 relative overflow-hidden"
          aria-label="Hero"
        >
          {/* Animated Hero Visual */}
          
          <div className="text-center max-w-4xl mx-auto relative z-10">
            <h1 className="text-4xl md:text-5xl mb-4 text-forest font-playfair font-bold leading-tight">
              {t["cookies.title"]}
            </h1>
            <p className="text-base text-mediumGray font-sans leading-relaxed">
              {t["cookies.updated"]}: January 15, 2024
            </p>
          </div>
        </section>
      </div>

      {/* Cookies Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 lg:py-24">
        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <p className="text-lg text-mediumGray font-sans leading-relaxed">
              {t["cookies.intro"]}
            </p>
          </section>

          <section>
            <h2 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-snug">
              1. What are cookies
            </h2>
            <p className="text-base text-mediumGray mb-4 font-sans leading-relaxed">
              Cookies are small text files stored on your device when you visit
              our website. They help us provide a better user experience and
              maintain security standards required by professional service
              organizations.
            </p>
          </section>

          <section>
            <h2 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-snug">
              2. Types of cookies we use
            </h2>

            <div className="space-y-6">
              <div className="bg-rose p-6 rounded-lg">
                <h3 className="text-xl text-forest mb-3 font-playfair font-bold leading-normal">
                  Essential cookies
                </h3>
                <p className="text-mediumGray font-sans leading-relaxed">
                  These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.
                </p>
                <ul className="list-disc pl-6 space-y-1 text-base text-mediumGray font-sans leading-relaxed">
                  <li>Authentication and session management</li>
                  <li>Security and fraud prevention</li>
                  <li>Load balancing and performance optimization</li>
                  <li>Language and locale preferences</li>
                </ul>
              </div>

              <div className="bg-grayLight p-6 rounded-lg">
                <h3 className="text-xl text-forest mb-3 font-playfair font-bold leading-normal">
                  Functional cookies
                </h3>
                <p className="text-base text-mediumGray mb-3 font-sans leading-relaxed">
                  These cookies enable enhanced functionality and
                  personalization:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-base text-mediumGray font-sans leading-relaxed">
                  <li>User interface preferences</li>
                  <li>Form data retention for user convenience</li>
                  <li>Accessibility settings</li>
                </ul>
              </div>

              <div className="bg-white border-2 border-grayLight p-6 rounded-lg">
                <h3 className="text-xl text-forest mb-3 font-playfair font-bold leading-normal">
                  Analytics cookies
                </h3>
                <p className="text-mediumGray font-sans leading-relaxed">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                </p>
                <ul className="list-disc pl-6 space-y-1 text-base text-mediumGray font-sans leading-relaxed">
                  <li>Page views and navigation patterns</li>
                  <li>Feature usage and performance metrics</li>
                  <li>Error tracking and debugging information</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-snug">
              3. How to manage cookies
            </h2>
            <p className="text-base text-mediumGray mb-4 font-sans leading-relaxed">
              You can control and manage cookies in several ways:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base text-mediumGray font-sans leading-relaxed">
              <li>
                <strong>Browser settings:</strong> Most browsers allow you to
                block or delete cookies through their settings
              </li>
              <li>
                <strong>Cookie consent:</strong> Use our cookie consent banner
                to manage your preferences
              </li>
              <li>
                <strong>Third-party tools:</strong> Use browser extensions or
                privacy tools to manage cookies
              </li>
            </ul>
            <p className="text-base text-mediumGray mt-4 font-sans leading-relaxed">
              Note: Disabling certain cookies may affect website functionality.
            </p>
          </section>

          <section>
            <h2 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-snug">
              4. Third-party cookies
            </h2>
            <p className="text-base text-mediumGray mb-4 font-sans leading-relaxed">
              We may use third-party services that set their own cookies:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base text-mediumGray font-sans leading-relaxed">
              <li>
                <strong>Analytics:</strong> Google Analytics for website usage
                insights
              </li>
              <li>
                <strong>Security:</strong> Cloudflare for DDoS protection and
                security
              </li>
              <li>
                <strong>Support:</strong> Customer support tools for better
                service
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-snug">
              5. Cookie retention
            </h2>
            <p className="text-base text-mediumGray mb-4 font-sans leading-relaxed">
              Cookies are automatically deleted based on their type:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base text-mediumGray font-sans leading-relaxed">
              <li>
                <strong>Session cookies:</strong> Deleted when you close your
                browser
              </li>
              <li>
                <strong>Persistent cookies:</strong> Deleted after a set period
                (usually 1-2 years)
              </li>
              <li>
                <strong>Essential cookies:</strong> Retained as long as
                necessary for security and functionality
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-snug">
              6. Updates to this policy
            </h2>
            <p className="text-base text-mediumGray font-sans leading-relaxed">
              We may update this Cookie Policy to reflect changes in our
              practices or for legal reasons. We will notify you of any
              material changes by updating the "Last Updated" date on this
              page.
            </p>
          </section>

          <section>
            <h2 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-snug">
              7. Contact us
            </h2>
            <p className="text-base text-mediumGray mb-4 font-sans leading-relaxed">
              If you have questions about our use of cookies, please contact
              us:
            </p>
            <div className="bg-grayLight p-6 rounded-lg">
              <p className="text-base text-mediumGray font-sans leading-relaxed">
                <strong>Email:</strong> privacy@lyyli.ai
              </p>
              <p className="text-base text-mediumGray font-sans leading-relaxed">
                <strong>Address:</strong> Lyyli.ai, Helsinki, Finland
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
