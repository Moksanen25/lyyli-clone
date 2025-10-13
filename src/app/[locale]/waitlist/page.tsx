import { getTranslations } from "@/lib/i18n";
import { Metadata } from "next";
import WaitlistForm from "@/components/waitlist/WaitlistForm";
import { generatePageCanonicalUrl, generateHreflangMetadata } from "@/lib/canonical";

interface WaitlistPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: WaitlistPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale);

  const canonicalUrl = generatePageCanonicalUrl('waitlist', locale);

  return {
    title: t["waitlist.page.title"],
    description: t["waitlist.page.description"],
    openGraph: {
      title: t["waitlist.page.title"],
      description: t["waitlist.page.description"],
      url: canonicalUrl,
      siteName: "Lyyli.ai",
      locale: locale,
      type: "website",
    },
    alternates: {
      canonical: canonicalUrl,
      languages: generateHreflangMetadata('/waitlist', ['en', 'fi']),
    },
  };
}

export default async function WaitlistPage({ params }: WaitlistPageProps) {
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
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6 leading-tight text-forest">
              {t["waitlist.hero.title"]}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-mediumGray font-sans leading-relaxed">
              {t["waitlist.hero.subtitle"]}
            </p>
          </div>
        </section>
      </div>

      {/* Main Content */}
      <section className="bg-gradient-to-br from-rose/5 to-turquoise/5 py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-rose rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-playfair font-bold text-forest mb-2">
                  {t["waitlist.benefits.speed.title"]}
                </h3>
                <p className="text-mediumGray font-sans leading-relaxed">
                  {t["waitlist.benefits.speed.description"]}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-turquoise rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-playfair font-bold text-forest mb-2">
                  {t["waitlist.benefits.quality.title"]}
                </h3>
                <p className="text-mediumGray font-sans leading-relaxed">
                  {t["waitlist.benefits.quality.description"]}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-playfair font-bold text-forest mb-2">
                  {t["waitlist.benefits.community.title"]}
                </h3>
                <p className="text-mediumGray font-sans leading-relaxed">
                  {t["waitlist.benefits.community.description"]}
                </p>
              </div>
            </div>

            {/* Waitlist Form */}
            <WaitlistForm />
          </div>
        </div>
      </section>
    </div>
  );
}
