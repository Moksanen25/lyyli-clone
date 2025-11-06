import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kenelle palvelu on tarkoitettu - Kohderyhmät ja käyttötarkoitukset',
  description:
    'Tutustu Lyyli.ai:n kohderyhmiin ja eri käyttötarkoituksiin yrityksissä.',
};

export default async function TargetAudiencePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<React.JSX.Element> {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-[#F5F5F4]">
      {/* Breadcrumb */}
      <div className="hidden bg-white border-b border-[#E5E5E4] pt-24">
        <div className="max-w-7xl mx-auto px-6 pb-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link
                  href={`/${locale}/help`}
                  className="text-[#666666] hover:text-[#2F5D50] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#2F5D50] focus:ring-offset-2 rounded"
                >
                  {locale === 'fi' ? 'Apu ja tuki' : 'Help & Support'}
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="flex-shrink-0 h-5 w-5 text-[#666666]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-4 text-sm font-medium text-[#666666]">
                    {locale === 'fi' ? 'Kenelle' : 'Target Audience'}
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
                {locale === 'fi' ? 'Aloittelija' : 'Beginner'}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#A7D6D1] text-[#2F5D50]">
                {locale === 'fi' ? '5 min' : '5 min'}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#2F5D50] mb-6 font-playfair leading-tight">
              {locale === 'fi' ? 'Kohderyhmä' : 'Target audience'}
            </h1>
            <p className="text-xl text-[#333333] font-inter leading-relaxed">
              {locale === 'fi'
                ? 'Määritä ja hallitse kohderyhmääsi, segmentoi yleisösi ja räätälöi viestintääsi eri yleisöryhmille. Paranna viestinnän relevanssia ja tehokkuutta.'
                : 'Define and manage your target audience, segment your audience, and tailor your communication to different audience groups. Improve communication relevance and effectiveness.'}
            </p>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <article className="bg-white rounded-xl shadow-sm border border-[#E5E5E4] overflow-hidden">
          {/* Article Header */}
          <div className="p-8 border-b border-[#E5E5E4]">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#F7EBEB] text-[#2F5D50]">
                {locale === 'fi' ? 'Aloittelija' : 'Beginner'}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#A7D6D1] text-[#2F5D50]">
                {locale === 'fi' ? '3 min' : '3 min'}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-[#2F5D50] mb-4 font-playfair leading-tight">
              {locale === 'fi' ? 'Kenelle' : 'Target Audience'}
            </h1>
            <p className="text-xl text-[#333333] font-inter leading-relaxed">
              {locale === 'fi'
                ? 'Kohderyhmät ja käyttötarkoitukset'
                : 'Target groups and use cases'}
            </p>
          </div>

          {/* Article Body */}
          <div className="p-8">
            {/* Kohderyhmät */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2F5D50] mb-4 font-playfair leading-tight">
                {locale === 'fi' ? 'Kohderyhmät' : 'Target Audiences'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#F7EBEB] p-6 rounded-xl border border-[#E5E5E4]">
                  <h3 className="text-lg font-bold text-[#2F5D50] mb-4 font-playfair">
                    {locale === 'fi'
                      ? 'Pienet ja keskisuuret yritykset'
                      : 'Small and Medium Businesses'}
                  </h3>
                  <ul className="space-y-3 text-[#333333] font-inter">
                    <li className="flex items-start">
                      <svg
                        className="flex-shrink-0 h-5 w-5 text-[#2F5D50] mt-0.5 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>
                        {locale === 'fi'
                          ? '10-500 työntekijää'
                          : '10-500 employees'}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="flex-shrink-0 h-5 w-5 text-[#2F5D50] mt-0.5 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>
                        {locale === 'fi'
                          ? 'Kasvava viestintätarve'
                          : 'Growing communication needs'}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="flex-shrink-0 h-5 w-5 text-[#2F5D50] mt-0.5 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>
                        {locale === 'fi'
                          ? 'Rajoitetut resurssit'
                          : 'Limited resources'}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">
                    {locale === 'fi' ? 'Suuryritykset' : 'Large Enterprises'}
                  </h3>
                  <ul className="space-y-2 text-green-800">
                    <li className="flex items-start">
                      <svg
                        className="flex-shrink-0 h-5 w-5 text-green-600 mt-0.5 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>
                        {locale === 'fi'
                          ? '500+ työntekijää'
                          : '500+ employees'}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="flex-shrink-0 h-5 w-5 text-green-600 mt-0.5 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>
                        {locale === 'fi'
                          ? 'Monimutkainen viestintä'
                          : 'Complex communication'}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="flex-shrink-0 h-5 w-5 text-green-600 mt-0.5 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>
                        {locale === 'fi'
                          ? 'Korkeat turvallisuusvaatimukset'
                          : 'High security requirements'}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Käyttötarkoitukset */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2F5D50] mb-4 font-playfair leading-tight">
                {locale === 'fi' ? 'Käyttötarkoitukset' : 'Use Cases'}
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {locale === 'fi'
                      ? 'Markkinointi ja myynti'
                      : 'Marketing and Sales'}
                  </h3>
                  <p className="text-gray-700 mb-3">
                    {locale === 'fi'
                      ? 'Automatisoi markkinointimateriaalien luontia ja paranna myyntiprosesseja'
                      : 'Automate marketing material creation and improve sales processes'}
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>
                      •{' '}
                      {locale === 'fi'
                        ? 'Sosiaalisen median sisältö'
                        : 'Social media content'}
                    </li>
                    <li>
                      •{' '}
                      {locale === 'fi' ? 'Email-kampanjat' : 'Email campaigns'}
                    </li>
                    <li>
                      •{' '}
                      {locale === 'fi'
                        ? 'Myyntimateriaalit'
                        : 'Sales materials'}
                    </li>
                    <li>
                      •{' '}
                      {locale === 'fi'
                        ? 'Proposaalit ja tarjoukset'
                        : 'Proposals and quotes'}
                    </li>
                  </ul>
                </div>
                <div className="border-l-4 border-green-500 pl-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {locale === 'fi' ? 'Asiakaspalvelu' : 'Customer Service'}
                  </h3>
                  <p className="text-gray-700 mb-3">
                    {locale === 'fi'
                      ? 'Paranna asiakaskokemusta ja vähennä työmäärää'
                      : 'Improve customer experience and reduce workload'}
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>
                      •{' '}
                      {locale === 'fi'
                        ? 'Chatbot-vastaukset'
                        : 'Chatbot responses'}
                    </li>
                    <li>• {locale === 'fi' ? 'FAQ-sisältö' : 'FAQ content'}</li>
                    <li>
                      •{' '}
                      {locale === 'fi'
                        ? 'Tukidokumentaatio'
                        : 'Support documentation'}
                    </li>
                    <li>
                      •{' '}
                      {locale === 'fi'
                        ? 'Koulutusmateriaalit'
                        : 'Training materials'}
                    </li>
                  </ul>
                </div>
                <div className="border-l-4 border-purple-500 pl-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {locale === 'fi' ? 'Tiimiviestintä' : 'Team Communication'}
                  </h3>
                  <p className="text-gray-700 mb-3">
                    {locale === 'fi'
                      ? 'Sujuvoita sisäistä viestintää ja paranna yhteistyötä'
                      : 'Streamline internal communication and improve collaboration'}
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>
                      •{' '}
                      {locale === 'fi'
                        ? 'Sisäiset tiedotteet'
                        : 'Internal announcements'}
                    </li>
                    <li>
                      •{' '}
                      {locale === 'fi'
                        ? 'Projektipäivitykset'
                        : 'Project updates'}
                    </li>
                    <li>
                      • {locale === 'fi' ? 'Kokousmuistiot' : 'Meeting notes'}
                    </li>
                    <li>
                      •{' '}
                      {locale === 'fi'
                        ? 'Koulutusmateriaalit'
                        : 'Training materials'}
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Toimialat */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2F5D50] mb-4 font-playfair leading-tight">
                {locale === 'fi' ? 'Sopivat toimialat' : 'Suitable Industries'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {locale === 'fi' ? 'Teknologia' : 'Technology'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {locale === 'fi'
                      ? 'SaaS-yritykset, IT-palvelut'
                      : 'SaaS companies, IT services'}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {locale === 'fi' ? 'Konsultointi' : 'Consulting'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {locale === 'fi'
                      ? 'Liikkeenjohdon konsultointi'
                      : 'Management consulting'}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {locale === 'fi' ? 'Palvelut' : 'Services'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {locale === 'fi'
                      ? 'Asiakaspalvelu, markkinointi'
                      : 'Customer service, marketing'}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {locale === 'fi' ? 'Koulutus' : 'Education'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {locale === 'fi'
                      ? 'Koulutuspalvelut, e-learning'
                      : 'Educational services, e-learning'}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {locale === 'fi' ? 'Terveydenhuolto' : 'Healthcare'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {locale === 'fi'
                      ? 'Potilaskommunikaatio'
                      : 'Patient communication'}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {locale === 'fi' ? 'Finanssit' : 'Finance'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {locale === 'fi'
                      ? 'Pankit, vakuutusyhtiöt'
                      : 'Banks, insurance companies'}
                  </p>
                </div>
              </div>
            </section>

            {/* Edellytykset */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2F5D50] mb-4 font-playfair leading-tight">
                {locale === 'fi'
                  ? 'Käyttöönottovaatimukset'
                  : 'Implementation Requirements'}
              </h2>
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h3 className="text-lg font-semibold text-yellow-900 mb-3">
                  {locale === 'fi'
                    ? 'Tekniset vaatimukset'
                    : 'Technical Requirements'}
                </h3>
                <ul className="space-y-2 text-yellow-800">
                  <li className="flex items-start">
                    <svg
                      className="flex-shrink-0 h-5 w-5 text-yellow-600 mt-0.5 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      {locale === 'fi'
                        ? 'Moderni web-selain (Chrome, Firefox, Safari, Edge)'
                        : 'Modern web browser (Chrome, Firefox, Safari, Edge)'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="flex-shrink-0 h-5 w-5 text-yellow-600 mt-0.5 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      {locale === 'fi'
                        ? 'Vakaa internet-yhteys'
                        : 'Stable internet connection'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="flex-shrink-0 h-5 w-5 text-yellow-600 mt-0.5 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      {locale === 'fi'
                        ? 'Mobiililaitteet tuettu'
                        : 'Mobile devices supported'}
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Seuraavat vaiheet */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2F5D50] mb-4 font-playfair leading-tight">
                {locale === 'fi' ? 'Seuraavat vaiheet' : 'Next Steps'}
              </h2>
              <p className="text-[#333333] mb-6 font-inter leading-relaxed">
                {locale === 'fi'
                  ? 'Jos Lyyli.ai sopii organisaatiolle, voit aloittaa käyttöönoton:'
                  : 'If Lyyli.ai fits your organization, you can start implementation:'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href={`/${locale}/help/registration-subscription`}
                  className="group"
                >
                  <div className="p-6 border border-[#E5E5E4] rounded-xl hover:border-[#2F5D50] hover:bg-[#F7EBEB] transition-all duration-200">
                    <h3 className="font-bold text-[#333333] group-hover:text-[#2F5D50] mb-2 font-playfair">
                      {locale === 'fi'
                        ? 'Rekisteröityminen ja tilauksen valinta'
                        : 'Registration and subscription selection'}
                    </h3>
                    <p className="text-sm text-[#666666] font-inter">
                      {locale === 'fi'
                        ? 'Luo tili ja valitse sopiva tilaus'
                        : 'Create account and choose suitable subscription'}
                    </p>
                  </div>
                </Link>
                <Link
                  href={`/${locale}/help/getting-started`}
                  className="group"
                >
                  <div className="p-6 border border-[#E5E5E4] rounded-xl hover:border-[#2F5D50] hover:bg-[#F7EBEB] transition-all duration-200">
                    <h3 className="font-bold text-[#333333] group-hover:text-[#2F5D50] mb-2 font-playfair">
                      {locale === 'fi'
                        ? 'Aloitus ja käyttöönotto'
                        : 'Getting Started'}
                    </h3>
                    <p className="text-sm text-[#666666] font-inter">
                      {locale === 'fi'
                        ? 'Aloita käyttäminen vaiheittaisella oppaalla'
                        : 'Start using with step-by-step guide'}
                    </p>
                  </div>
                </Link>
              </div>
            </section>
          </div>

          {/* Article Footer */}
          <div className="px-8 py-6 bg-[#F5F5F4] border-t border-[#E5E5E4]">
            <div className="flex items-center justify-between text-sm text-[#666666] font-inter">
              <span>
                {locale === 'fi'
                  ? 'Viimeksi päivitetty: 8. lokakuuta 2025'
                  : 'Last updated: October 8, 2025'}
              </span>
              <span>{locale === 'fi' ? 'Versio: 3.0' : 'Version: 3.0'}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
