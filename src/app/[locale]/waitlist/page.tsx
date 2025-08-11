import { getTranslations } from "@/lib/i18n";
import { Metadata } from "next";

interface WaitlistPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: WaitlistPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale);

  const baseUrl = "https://lyyli.ai";
  const canonicalUrl = `${baseUrl}/${locale}/waitlist`;

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
      languages: {
        "en": `${baseUrl}/en/waitlist`,
        "fi": `${baseUrl}/fi/waitlist`,
      },
    },
  };
}

export default async function WaitlistPage({ params }: WaitlistPageProps) {
  const { locale } = await params;
  const supportedLocales = ["en", "fi"];
  const currentLocale = supportedLocales.includes(locale) ? locale : "en";

  const t = await getTranslations(currentLocale);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-forest to-turquoise text-white py-20 lg:py-32">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6 leading-tight">
            {t["waitlist.hero.title"]}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            {t["waitlist.hero.subtitle"]}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Benefits Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-rose rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-playfair font-bold text-forest mb-2">
                  {t["waitlist.benefits.speed.title"]}
                </h3>
                <p className="text-mediumGray">
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
                <p className="text-mediumGray">
                  {t["waitlist.benefits.quality.description"]}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-amber rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-playfair font-bold text-forest mb-2">
                  {t["waitlist.benefits.access.title"]}
                </h3>
                <p className="text-mediumGray">
                  {t["waitlist.benefits.access.description"]}
                </p>
              </div>
            </div>

            {/* Form Section */}
            <div className="bg-grayLight rounded-2xl p-8 lg:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-playfair font-bold text-forest mb-4">
                  {t["waitlist.form.title"]}
                </h2>
                <p className="text-lg text-mediumGray max-w-2xl mx-auto">
                  {t["waitlist.form.subtitle"]}
                </p>
              </div>

              {/* HubSpot Form */}
              <div className="max-w-2xl mx-auto">
                <script src="https://js-eu1.hsforms.net/forms/embed/146205702.js" defer></script>
                <div className="hs-form-frame" data-region="eu1" data-form-id="f337eade-e814-4038-b2aa-908dcf612cce" data-portal-id="146205702"></div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-playfair font-bold text-forest mb-6">
                {t["waitlist.info.title"]}
              </h3>
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                  <h4 className="font-playfair font-bold text-forest mb-3">
                    {t["waitlist.info.timeline.title"]}
                  </h4>
                  <p className="text-mediumGray">
                    {t["waitlist.info.timeline.description"]}
                  </p>
                </div>
                <div>
                  <h4 className="font-playfair font-bold text-forest mb-3">
                    {t["waitlist.info.updates.title"]}
                  </h4>
                  <p className="text-mediumGray">
                    {t["waitlist.info.updates.description"]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
