import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Publishing & Channels - Workflow, Versioning, A/B, Errors',
  description:
    'Choose channels, manage publishing workflow, versioning, previews, A/B testing, feedback, and handle publishing errors.',
};

export default async function PublishingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<React.JSX.Element> {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 pt-24">
        <div className="max-w-7xl mx-auto px-6 pb-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link
                  href={`/${locale}/help`}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {locale === 'fi' ? 'Apu ja tuki' : 'Help & Support'}
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="flex-shrink-0 h-5 w-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-4 text-sm font-medium text-gray-500">
                    {locale === 'fi'
                      ? 'Julkaisu ja kanavat'
                      : 'Publishing & channels'}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#F7EBEB] to-[#A7D6D1]/20 border-b border-[#E5E5E4]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#2F5D50] text-white">
                {locale === 'fi' ? 'Keskitaso' : 'Intermediate'}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#A7D6D1] text-[#2F5D50]">
                {locale === 'fi' ? '10 min' : '10 min'}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#2F5D50] mb-6 font-playfair leading-tight">
              {locale === 'fi'
                ? 'Julkaisu ja jakaminen'
                : 'Publishing and sharing'}
            </h1>
            <p className="text-xl text-[#333333] font-inter leading-relaxed">
              {locale === 'fi'
                ? 'Julkaise sisältöä eri kanaviin, aikatauluta julkaisuja ja hallitse sisällön jakelustrategiaasi. Optimoi sisältösi eri alustoille.'
                : 'Publish content to different channels, schedule publications, and manage your content distribution strategy. Optimize your content for different platforms.'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {locale === 'fi' ? 'Aloittelija' : 'Beginner'}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {locale === 'fi' ? '10 min' : '10 min'}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === 'fi'
                ? 'Julkaisu ja kanavakohtaiset ohjeet'
                : 'Publishing and Channel-Specific Guidelines'}
            </h1>
            <p className="text-lg text-gray-600">
              {locale === 'fi'
                ? 'Kanavan valinta ja julkaisuvirta, Versiointi ja muutosten hallinta, Esikatselu, A/B ja palautteen keruu, Virhetilanteet julkaisussa'
                : 'Channel selection and publishing flow, Versioning and change management, Preview, A/B and feedback collection, Error situations in publishing'}
            </p>
          </div>

          <div className="p-8">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {locale === 'fi'
                  ? 'Kanavan valinta ja julkaisuvirta'
                  : 'Channel selection and publishing flow'}
              </h2>
              <p className="text-gray-700">
                {locale === 'fi'
                  ? 'Valitse kanava (esim. LinkedIn, Instagram, sivusto) ja seuraa julkaisuprosessia luonnoksesta hyväksyntään ja julkaisuun.'
                  : 'Choose a channel (e.g., LinkedIn, Instagram, website) and follow the workflow from draft to approval and publish.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {locale === 'fi'
                  ? 'Versiointi ja muutosten hallinta'
                  : 'Versioning and change management'}
              </h2>
              <p className="text-gray-700">
                {locale === 'fi'
                  ? 'Seuraa versioita, tarkastele muutoksia ja palauta tarvittaessa.'
                  : 'Track versions, review changes, and roll back when needed.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {locale === 'fi'
                  ? 'Esikatselu, A/B ja palautteen keruu'
                  : 'Preview, A/B testing, and feedback'}
              </h2>
              <p className="text-gray-700">
                {locale === 'fi'
                  ? 'Esikatsele sisällöt kanavissa, aja A/B-kokeita ja kerää palautetta sidosryhmiltä.'
                  : 'Preview content across channels, run A/B experiments, and collect stakeholder feedback.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {locale === 'fi'
                  ? 'Virhetilanteet julkaisussa'
                  : 'Publishing errors'}
              </h2>
              <p className="text-gray-700">
                {locale === 'fi'
                  ? 'Ratkaise yleiset virheet (OAuth, oikeudet, rajoitukset).'
                  : 'Resolve common errors (OAuth, permissions, rate limits).'}
              </p>
            </section>
          </div>

          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>
                {locale === 'fi'
                  ? 'Viimeksi päivitetty: 8. lokakuuta 2025'
                  : 'Last updated: Oct 8, 2025'}
              </span>
              <span>{locale === 'fi' ? 'Versio: 3.0' : 'Version: 3.0'}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
