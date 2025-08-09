import { getTranslations } from '../../../lib/i18n';
import { Metadata } from 'next';
import ContactForm from '../../../components/contact/ContactForm';
import TeamContacts from '../../../components/contact/TeamContacts';
import SecurityNotice from '../../../components/contact/SecurityNotice';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale);
  
  const baseUrl = 'https://lyyli.ai';
  const canonicalUrl = `${baseUrl}/${locale}/contact`;
  
  return {
    title: t['contact.page.title'],
    description: t['contact.page.description'],
    openGraph: {
      title: t['contact.page.title'],
      description: t['contact.page.description'],
      url: canonicalUrl,
      siteName: 'Lyyli.ai',
      locale: locale === 'fi' ? 'fi_FI' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t['contact.page.title'],
      description: t['contact.page.description'],
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
  const supportedLocales = ['en', 'fi'];
  const currentLocale = supportedLocales.includes(locale) ? locale : 'en';
  
  const t = getTranslations(currentLocale);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="heading-1 mb-6">
            {t['contact.hero.title']}
          </h1>
          <p className="body-large mb-12 text-medium-gray max-w-3xl mx-auto">
            {t['contact.hero.subtitle']}
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-light-gray py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <ContactForm locale={currentLocale} />
        </div>
      </section>

      {/* Security Notice */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <SecurityNotice locale={currentLocale} />
      </section>

      {/* Team Contacts */}
      <section className="bg-soft-rose py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <TeamContacts locale={currentLocale} />
        </div>
      </section>

      {/* Response Expectations */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center">
          <h2 className="heading-2 mb-8 text-forest-green">
            {t['contact.response.title']}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4" aria-hidden="true">⚡</div>
              <h3 className="heading-4 mb-2 text-forest-green">
                24h Response
              </h3>
              <p className="body-text text-medium-gray">
                {t['contact.response.timing']}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4" aria-hidden="true">📞</div>
              <h3 className="heading-4 mb-2 text-forest-green">
                Discovery Call
              </h3>
              <p className="body-text text-medium-gray">
                {t['contact.response.discovery']}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4" aria-hidden="true">📋</div>
              <h3 className="heading-4 mb-2 text-forest-green">
                Custom Proposal
              </h3>
              <p className="body-text text-medium-gray">
                {t['contact.response.followup']}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
