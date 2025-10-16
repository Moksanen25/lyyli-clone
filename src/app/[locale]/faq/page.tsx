import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generatePageCanonicalUrl, generateHreflangMetadata } from '@/lib/canonical';
import { buildTitleFromTranslation } from '@/lib/title';
import FAQSection from '@/components/faq/FAQSection';
import faqDataEn from '@/../content/faq/en.json';
import faqDataFi from '@/../content/faq/fi.json';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface FAQData {
  title: string;
  description: string;
  faqs: FAQ[];
}

const faqData: Record<string, FAQData> = {
  en: faqDataEn,
  fi: faqDataFi
};

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faq' });
  const data = faqData[locale] || faqData.en;
  
  return {
    title: buildTitleFromTranslation('faq.title', data.title),
    description: data.description,
    alternates: {
      canonical: generatePageCanonicalUrl('/faq', locale),
      languages: generateHreflangMetadata('/faq', ['en', 'fi'])
    }
  };
}

export default async function FAQPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  const data = faqData[locale] || faqData.en;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {data.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {data.description}
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <FAQSection 
        faqs={data.faqs}
        title={data.title}
        description={data.description}
      />

      {/* CTA Section */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Still have questions?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our team is here to help. Contact us for personalized support and answers to your specific questions.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/contact"
                className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Contact Support
              </a>
              <a
                href="/help"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Visit Help Center <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
