import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Palvelun kuvaus - Mikä on Lyyli.ai',
  description:
    'Tutustu Lyyli.ai:n tekoälypohjaiseen viestintäpalveluun ja sen ominaisuuksiin.',
};

export default async function ServiceDescriptionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<React.JSX.Element> {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-[#F5F5F4]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#E5E5E4]">
        <div className="max-w-7xl mx-auto px-6 py-4">
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
                    {locale === 'fi'
                      ? 'Palvelun kuvaus'
                      : 'Service Description'}
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
                {locale === 'fi' ? '8 min' : '8 min'}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#2F5D50] mb-6 font-playfair leading-tight">
              {locale === 'fi' ? 'Palvelun kuvaus' : 'Service description'}
            </h1>
            <p className="text-xl text-[#333333] font-inter leading-relaxed">
              {locale === 'fi'
                ? 'Tutustu Lyyli.ai-palveluun, sen ominaisuuksiin ja siihen, miten se voi auttaa organisaatiotasi. Ymmärrä palvelun arvolupaus ja kohderyhmä.'
                : 'Get to know the Lyyli.ai service, its features, and how it can help your organization. Understand the value proposition and target audience.'}
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
                {locale === 'fi' ? '5 min' : '5 min'}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-[#2F5D50] mb-4 font-playfair leading-tight">
              {locale === 'fi' ? 'Palvelun kuvaus' : 'Service Description'}
            </h1>
            <p className="text-xl text-[#333333] font-inter leading-relaxed">
              {locale === 'fi'
                ? 'Mikä palvelu on ja kenelle se on'
                : "What the service is and who it's for"}
            </p>
          </div>

          {/* Article Body */}
          <div className="p-8">
            {/* Mikä on Lyyli.ai */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2F5D50] mb-4 font-playfair leading-tight">
                {locale === 'fi' ? 'Mikä on Lyyli.ai?' : 'What is Lyyli.ai?'}
              </h2>
              <p className="text-[#333333] mb-6 font-inter leading-relaxed">
                {locale === 'fi'
                  ? 'Lyyli.ai on tekoälypohjainen viestintäpalvelu, joka auttaa yrityksiä ja tiimejä optimoimaan viestintäänsä ja parantamaan yhteistyötä. Palvelu käyttää kehittynyttä tekoälyteknologiaa luodakseen älykkäitä viestintäavustajia, jotka ymmärtävät yrityksen brändin, sävyn ja tavoitteet.'
                  : "Lyyli.ai is an AI-powered communication service that helps companies and teams optimize their communication and improve collaboration. The service uses advanced AI technology to create intelligent communication assistants that understand your company's brand, tone, and goals."}
              </p>
              <div className="bg-[#F7EBEB] p-6 rounded-xl border border-[#E5E5E4]">
                <h3 className="text-lg font-bold text-[#2F5D50] mb-4 font-playfair">
                  {locale === 'fi'
                    ? 'Keskeiset ominaisuudet:'
                    : 'Key Features:'}
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
                        ? 'Tekoälyavustajat, jotka oppivat yrityksesi viestintätyylin'
                        : "AI assistants that learn your company's communication style"}
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
                        ? 'Automaattinen sisällöntuotanto ja julkaisu'
                        : 'Automated content creation and publishing'}
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
                        ? 'Integraatiot suosittuihin työkaluihin'
                        : 'Integrations with popular tools'}
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
                        ? 'Analytiikka ja suorituskyvyn seuranta'
                        : 'Analytics and performance tracking'}
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Palvelun arkkitehtuuri */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2F5D50] mb-4 font-playfair leading-tight">
                {locale === 'fi'
                  ? 'Palvelun arkkitehtuuri'
                  : 'Service Architecture'}
              </h2>
              <p className="text-[#333333] mb-6 font-inter leading-relaxed">
                {locale === 'fi'
                  ? 'Lyyli.ai on rakennettu pilvipohjaisena SaaS-palveluna, joka käyttää kehittynyttä tekoälyteknologiaa ja modernia web-teknologiaa.'
                  : 'Lyyli.ai is built as a cloud-based SaaS service using advanced AI technology and modern web technologies.'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#F5F5F4] p-6 rounded-xl">
                  <h3 className="text-lg font-bold text-[#2F5D50] mb-4 font-playfair">
                    {locale === 'fi' ? 'Tekninen pino' : 'Technology Stack'}
                  </h3>
                  <ul className="space-y-2 text-[#333333] font-inter">
                    <li>
                      •{' '}
                      {locale === 'fi'
                        ? 'Tekoäly: GPT-4, Claude ja muut LLM-mallit'
                        : 'AI: GPT-4, Claude and other LLM models'}
                    </li>
                    <li>
                      •{' '}
                      {locale === 'fi'
                        ? 'Backend: Node.js, TypeScript'
                        : 'Backend: Node.js, TypeScript'}
                    </li>
                    <li>
                      •{' '}
                      {locale === 'fi'
                        ? 'Frontend: React, Next.js'
                        : 'Frontend: React, Next.js'}
                    </li>
                    <li>
                      •{' '}
                      {locale === 'fi'
                        ? 'Tietokanta: PostgreSQL'
                        : 'Database: PostgreSQL'}
                    </li>
                    <li>
                      •{' '}
                      {locale === 'fi'
                        ? 'Pilvi: AWS/Azure'
                        : 'Cloud: AWS/Azure'}
                    </li>
                  </ul>
                </div>
                <div className="bg-[#F5F5F4] p-6 rounded-xl">
                  <h3 className="text-lg font-bold text-[#2F5D50] mb-4 font-playfair">
                    {locale === 'fi' ? 'Turvallisuus' : 'Security'}
                  </h3>
                  <ul className="space-y-2 text-[#333333] font-inter">
                    <li>
                      •{' '}
                      {locale === 'fi'
                        ? 'TLS 1.3-salaus'
                        : 'TLS 1.3 encryption'}
                    </li>
                    <li>
                      •{' '}
                      {locale === 'fi'
                        ? 'GDPR-yhteensopivuus'
                        : 'GDPR compliance'}
                    </li>
                    <li>• {locale === 'fi' ? 'SSO-tuki' : 'SSO support'}</li>
                    <li>
                      •{' '}
                      {locale === 'fi'
                        ? 'Kaksivaiheinen tunnistautuminen'
                        : 'Two-factor authentication'}
                    </li>
                    <li>• {locale === 'fi' ? 'Audit trail' : 'Audit trail'}</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Palvelun käyttöalueet */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2F5D50] mb-4 font-playfair leading-tight">
                {locale === 'fi'
                  ? 'Palvelun käyttöalueet'
                  : 'Service Use Cases'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#F7EBEB] p-6 rounded-xl border border-[#E5E5E4]">
                  <h3 className="text-lg font-bold text-[#2F5D50] mb-4 font-playfair">
                    {locale === 'fi' ? 'Markkinointi' : 'Marketing'}
                  </h3>
                  <ul className="space-y-2 text-[#333333] font-inter text-sm">
                    <li>
                      •{' '}
                      {locale === 'fi'
                        ? 'Sosiaalisen median sisältö'
                        : 'Social media content'}
                    </li>
                    <li>
                      • {locale === 'fi' ? 'Blogikirjoitukset' : 'Blog posts'}
                    </li>
                    <li>
                      •{' '}
                      {locale === 'fi' ? 'Email-kampanjat' : 'Email campaigns'}
                    </li>
                    <li>• {locale === 'fi' ? 'Mainostekstit' : 'Ad copy'}</li>
                  </ul>
                </div>
                <div className="bg-[#A7D6D1] p-6 rounded-xl border border-[#E5E5E4]">
                  <h3 className="text-lg font-bold text-[#2F5D50] mb-4 font-playfair">
                    {locale === 'fi' ? 'Asiakaspalvelu' : 'Customer Service'}
                  </h3>
                  <ul className="space-y-2 text-[#333333] font-inter text-sm">
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
                <div className="bg-[#F7EBEB] p-6 rounded-xl border border-[#E5E5E4]">
                  <h3 className="text-lg font-bold text-[#2F5D50] mb-4 font-playfair">
                    {locale === 'fi' ? 'Tiimiviestintä' : 'Team Communication'}
                  </h3>
                  <ul className="space-y-2 text-[#333333] font-inter text-sm">
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

            {/* Palvelun hyödyt */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2F5D50] mb-4 font-playfair leading-tight">
                {locale === 'fi' ? 'Palvelun hyödyt' : 'Service Benefits'}
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#2F5D50] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2F5D50] mb-2 font-playfair">
                      {locale === 'fi' ? 'Aikansäästö' : 'Time Savings'}
                    </h3>
                    <p className="text-[#333333] font-inter leading-relaxed">
                      {locale === 'fi'
                        ? 'Automatisoi toistuvia viestintätehtäviä ja vapauta aikaa strategiselle työlle'
                        : 'Automate repetitive communication tasks and free up time for strategic work'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#2F5D50] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2F5D50] mb-2 font-playfair">
                      {locale === 'fi'
                        ? 'Yhtenäinen brändiääni'
                        : 'Consistent Brand Voice'}
                    </h3>
                    <p className="text-[#333333] font-inter leading-relaxed">
                      {locale === 'fi'
                        ? 'Varmista, että kaikki viestintä vastaa yrityksesi brändiä ja arvoja'
                        : "Ensure all communication aligns with your company's brand and values"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#2F5D50] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2F5D50] mb-2 font-playfair">
                      {locale === 'fi'
                        ? 'Parannettu tehokkuus'
                        : 'Improved Efficiency'}
                    </h3>
                    <p className="text-[#333333] font-inter leading-relaxed">
                      {locale === 'fi'
                        ? 'Kasvata viestintätehokkuutta ja paranna tiimiyhteistyötä'
                        : 'Increase communication efficiency and improve team collaboration'}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Seuraavat vaiheet */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#2F5D50] mb-4 font-playfair leading-tight">
                {locale === 'fi' ? 'Seuraavat vaiheet' : 'Next Steps'}
              </h2>
              <p className="text-[#333333] mb-6 font-inter leading-relaxed">
                {locale === 'fi'
                  ? 'Nyt kun ymmärrät Lyyli.ai:n perusteet, voit tutustua seuraaviin artikkeleihin:'
                  : 'Now that you understand the basics of Lyyli.ai, you can explore these articles:'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link
                  href={`/${locale}/help/target-audience`}
                  className="group focus:outline-none focus:ring-2 focus:ring-[#2F5D50] focus:ring-offset-2 rounded-xl"
                >
                  <div className="p-6 border border-[#E5E5E4] rounded-xl hover:border-[#2F5D50] hover:bg-[#F7EBEB] transition-all duration-200">
                    <h3 className="font-bold text-[#333333] group-hover:text-[#2F5D50] mb-2 font-playfair">
                      {locale === 'fi'
                        ? 'Kenelle palvelu on tarkoitettu'
                        : 'Who the service is for'}
                    </h3>
                    <p className="text-sm text-[#666666] font-inter">
                      {locale === 'fi'
                        ? 'Tutustu kohderyhmiin ja käyttötarkoituksiin'
                        : 'Learn about target audiences and use cases'}
                    </p>
                  </div>
                </Link>
                <Link
                  href={`/${locale}/help/getting-started`}
                  className="group focus:outline-none focus:ring-2 focus:ring-[#2F5D50] focus:ring-offset-2 rounded-xl"
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
                  ? 'Viimeksi päivitetty: Joulukuu 2024'
                  : 'Last updated: December 2024'}
              </span>
              <div className="flex items-center space-x-4">
                <Link
                  href={`/${locale}/help`}
                  className="text-[#2F5D50] hover:text-[#3A6A5C] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#2F5D50] focus:ring-offset-2 rounded"
                >
                  {locale === 'fi' ? '← Takaisin apuun' : '← Back to Help'}
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
