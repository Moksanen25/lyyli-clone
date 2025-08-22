import { getTranslations } from "@/lib/i18n";
import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import TeamContacts from "@/components/contact/TeamContacts";
import SecurityNotice from "@/components/contact/SecurityNotice";
import HeroVisual from "@/components/HeroVisual";

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale);

  const baseUrl = "https://lyyli.ai";
  const canonicalUrl = `${baseUrl}/${locale}/contact`;

  return {
    title: t["contact.page.title"],
    description: t["contact.page.description"],
    openGraph: {
      title: t["contact.page.title"],
      description: t["contact.page.description"],
      url: canonicalUrl,
      siteName: "Lyyli.ai",
      locale: locale === "fi" ? "fi_FI" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t["contact.page.title"],
      description: t["contact.page.description"],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en/contact`,
        fi: `${baseUrl}/fi/contact`,
      },
    },
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const supportedLocales = ["en", "fi"];
  const currentLocale = supportedLocales.includes(locale) ? locale : "en";

  const t = await getTranslations(currentLocale);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative z-10 pt-32">
        <section 
          className="container mx-auto px-4 py-20 relative overflow-hidden"
          aria-label="Hero"
        >
          {/* Animated Hero Visual */}
          <HeroVisual />
          
          <div className="text-center max-w-4xl mx-auto relative z-10">
            <h1 className="text-3xl md:text-4xl mb-6 font-playfair font-normal leading-tight text-forest">
              {t["contact.hero.title"]}
            </h1>
            <p className="text-lg mb-12 text-mediumGray max-w-3xl mx-auto font-sans leading-relaxed">
              {t["contact.hero.subtitle"]}
            </p>
          </div>
        </section>
      </div>

      {/* Contact Form Section */}
      <section className="bg-gradient-to-br from-grayLight to-white py-16 lg:py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <ContactForm locale={currentLocale} translations={t} />
        </div>
      </section>

      {/* Security Notice */}
      <section className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <SecurityNotice locale={currentLocale} translations={t} />
      </section>

      {/* Team Contacts */}
      <section className="bg-gradient-to-br from-forest to-forest/80 py-16 lg:py-24 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <TeamContacts locale={currentLocale} translations={t} />
        </div>
      </section>

      {/* Response Expectations */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl mb-6 text-forest font-playfair font-normal leading-tight">
            {t["contact.expectations.title"]}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-forest mb-2 font-sans">
                {t["contact.expectations.response.title"]}
              </h3>
              <p className="text-mediumGray font-sans leading-relaxed">
                {t["contact.expectations.response.description"]}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-forest mb-2 font-sans">
                {t["contact.expectations.security.title"]}
              </h3>
              <p className="text-mediumGray font-sans leading-relaxed">
                {t["contact.expectations.security.description"]}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-forest mb-2 font-sans">
                {t["contact.expectations.personal.title"]}
              </h3>
              <p className="text-mediumGray font-sans leading-relaxed">
                {t["contact.expectations.personal.description"]}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
