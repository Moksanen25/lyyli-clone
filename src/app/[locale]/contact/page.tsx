import { getTranslations } from "@/lib/i18n";
import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import TeamContacts from "@/components/contact/TeamContacts";
import SecurityNotice from "@/components/contact/SecurityNotice";
import SubPageVisual from "@/components/SubPageVisual";

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
    <div className="bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl mb-6 font-playfair font-bold leading-tight text-forest">
            {t["contact.hero.title"]}
          </h1>
          <p className="text-lg mb-12 text-muted-foreground max-w-3xl mx-auto font-sans leading-relaxed">
            {t["contact.hero.subtitle"]}
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-grayLight py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <ContactForm locale={currentLocale} translations={t} />
        </div>
      </section>

      {/* Security Notice */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <SecurityNotice locale={currentLocale} translations={t} />
      </section>

      {/* Team Contacts */}
      <section className="bg-rose py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <TeamContacts locale={currentLocale} translations={t} />
        </div>
      </section>

      {/* Response Expectations */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl mb-8 text-forest font-playfair font-bold leading-snug">
            {t["contact.response.title"]}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4" aria-hidden="true">
                <svg className="w-16 h-16 mx-auto text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl mb-2 text-forest font-playfair font-bold leading-normal">
                24h response
              </h3>
              <p className="text-base text-muted-foreground font-sans leading-relaxed">
                {t["contact.response.timing"]}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4" aria-hidden="true">
                <svg className="w-16 h-16 mx-auto text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl mb-2 text-forest font-playfair font-bold leading-normal">
                Discovery call
              </h3>
              <p className="text-base text-muted-foreground font-sans leading-relaxed">
                {t["contact.response.discovery"]}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4" aria-hidden="true">
                <svg className="w-16 h-16 mx-auto text-turquoise-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl mb-2 text-forest font-playfair font-bold leading-normal">
                Custom proposal
              </h3>
              <p className="text-base text-muted-foreground font-sans leading-relaxed">
                {t["contact.response.followup"]}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
