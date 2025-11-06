import type { Metadata } from 'next';
import Link from 'next/link';
import { generateHowToSchema } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Getting Started - Create Your First AI Assistant',
  description:
    'Set up your first AI communications assistant in under 10 minutes with this step-by-step guide.',
};

export default async function GettingStartedPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<React.JSX.Element> {
  const { locale } = await params;
  // Translations not used in this component currently
  // const t = await getTranslations(locale);

  // Generate HowTo schema for getting started guide
  const howToSchema = generateHowToSchema(
    locale === 'fi'
      ? 'Aloitus ja käyttöönotto'
      : 'Getting Started and Onboarding',
    locale === 'fi'
      ? 'Luo ensimmäinen tekoälyavustajasi ja aloita käyttö alle 10 minuutissa'
      : 'Create your first AI assistant and get started in under 10 minutes',
    [
      {
        name: locale === 'fi' ? 'Luo tili ja kirjaudu' : 'Sign up and log in',
        text:
          locale === 'fi'
            ? 'Rekisteröidy palveluun sähköpostillasi ja kirjaudu sisään. Voit käyttää myös Google- tai Microsoft-tiliäsi SSO-kirjautumiseen.'
            : 'Sign up with your email and log in. You can also use your Google or Microsoft account for SSO login.',
      },
      {
        name:
          locale === 'fi' ? 'Määritä organisaatio' : 'Set up your organization',
        text:
          locale === 'fi'
            ? 'Anna organisaatiollesi nimi ja määritä perustiedot. Voit kutsua tiimisi jäseniä myöhemmin.'
            : 'Name your organization and set up basic information. You can invite your team members later.',
      },
      {
        name:
          locale === 'fi'
            ? 'Luo ensimmäinen tekoälyavustajasi'
            : 'Create your first AI assistant',
        text:
          locale === 'fi'
            ? 'Valitse avustajan tyyppi, määritä sävy ja brändiohjeistus. Tekoälyavustaja oppii organisaatiosi viestintätyylin.'
            : "Choose assistant type, set tone and brand guidelines. The AI assistant learns your organization\'s communication style.",
      },
      {
        name: locale === 'fi' ? 'Testaa ja julkaise' : 'Test and publish',
        text:
          locale === 'fi'
            ? 'Testaa avustajaa erilaisilla viesteillä ja julkaise se, kun olet tyytyväinen tuloksiin.'
            : "Test the assistant with different messages and publish it when you're happy with the results.",
      },
    ],
    locale
  );

  return (
    <div className="min-h-screen bg-[#F5F5F4]">
      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#E5E5E4] pt-24">
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
                    {locale === 'fi' ? 'Aloittaminen' : 'Getting Started'}
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
                {locale === 'fi' ? '10 min' : '10 min'}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#2F5D50] mb-6 font-playfair leading-tight">
              {locale === 'fi'
                ? 'Aloitus ja käyttöönotto'
                : 'Getting started and onboarding'}
            </h1>
            <p className="text-xl text-[#333333] font-inter leading-relaxed">
              {locale === 'fi'
                ? 'Luo ensimmäinen tekoälyavustajasi ja aloita käyttö alle 10 minuutissa. Tämä opas vie sinut läpi kaikki oleelliset vaiheet onnistuneeseen käyttöönottoon.'
                : 'Create your first AI assistant and get started in under 10 minutes. This guide walks you through all the essential steps for successful onboarding.'}
            </p>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <article className="bg-white rounded-xl shadow-sm border border-[#E5E5E4] overflow-hidden">
          {/* Article Body */}
          <div className="p-8">
            {/* What you'll accomplish */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#2F5D50] mb-4 font-playfair leading-tight">
                {locale === 'fi' ? 'Mitä saavutat' : "What you'll accomplish"}
              </h2>
              <p className="text-[#333333] mb-6 font-inter leading-relaxed">
                {locale === 'fi'
                  ? 'Tämän oppaan jälkeen sinulla on:'
                  : "By the end of this guide, you'll have:"}
              </p>
              <ul className="space-y-3">
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
                  <span className="text-[#333333] font-inter">
                    {locale === 'fi'
                      ? 'Luotu ensimmäinen tekoälyavustajasi'
                      : 'Created your first AI assistant'}
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
                  <span className="text-[#333333] font-inter">
                    {locale === 'fi'
                      ? 'Asetettu peruspersoonallisuusominaisuudet'
                      : 'Set basic personality traits'}
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
                  <span className="text-[#333333] font-inter">
                    {locale === 'fi'
                      ? 'Lisätty alustava tietopohja'
                      : 'Added initial knowledge base'}
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
                  <span className="text-[#333333] font-inter">
                    {locale === 'fi'
                      ? 'Testattu ensimmäiset keskustelut'
                      : 'Tested your first conversations'}
                  </span>
                </li>
              </ul>
            </div>

            {/* Prerequisites */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#2F5D50] mb-4 font-playfair leading-tight">
                {locale === 'fi' ? 'Edellytykset' : 'Prerequisites'}
              </h2>
              <p className="text-[#333333] mb-6 font-inter leading-relaxed">
                {locale === 'fi'
                  ? 'Ennen aloittamista varmista, että sinulla on:'
                  : 'Before you begin, ensure you have:'}
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg
                    className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-[#333333] font-inter">
                    {locale === 'fi'
                      ? 'Aktiivinen Lyyli.ai-tili'
                      : 'An active Lyyli.ai account'}
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-[#333333] font-inter">
                    {locale === 'fi'
                      ? 'Pääsy yrityksesi viestintäohjeisiin'
                      : "Access to your company's communication guidelines"}
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-[#333333] font-inter">
                    {locale === 'fi'
                      ? 'Perustietoa kohderyhmästäsi'
                      : 'Basic understanding of your target audience'}
                  </span>
                </li>
              </ul>
            </div>

            {/* Step-by-step guide */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {locale === 'fi'
                  ? 'Vaiheittainen oppaat'
                  : 'Step-by-step guide'}
              </h2>

              {/* Step 1 */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {locale === 'fi'
                    ? 'Vaihe 1: Pääsy AI-avustajan luontisivulle'
                    : 'Step 1: Access the AI Assistant creation page'}
                </h3>
                <div className="bg-gray-50 rounded-lg p-6 mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-forest text-white rounded-full flex items-center justify-center font-semibold">
                      1
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 mb-3">
                        {locale === 'fi'
                          ? 'Kirjaudu Lyyli.ai-käyttöliittymään'
                          : 'Log into your Lyyli.ai dashboard'}
                      </p>
                      <p className="text-gray-700 mb-3">
                        {locale === 'fi'
                          ? 'Klikkaa oikeassa yläkulmassa "Luo uusi avustaja"'
                          : 'Click "Create New Assistant" in the top right'}
                      </p>
                      <p className="text-gray-700">
                        {locale === 'fi'
                          ? 'Valitse "Viestintäavustaja" mallivaihtoehdoista'
                          : 'Select "Communications Assistant" from the template options'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Placeholder for screenshot */}
                <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-gray-500">
                    {locale === 'fi'
                      ? 'Screenshot: AI-avustajan luontisivu dashboardista'
                      : 'Screenshot: AI Assistant creation page from dashboard'}
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {locale === 'fi'
                    ? 'Vaihe 2: Perusasetusten määrittäminen'
                    : 'Step 2: Configure basic settings'}
                </h3>
                <div className="bg-gray-50 rounded-lg p-6 mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-forest text-white rounded-full flex items-center justify-center font-semibold">
                      2
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 mb-3">
                        {locale === 'fi'
                          ? 'Syötä kuvaava nimi avustajallesi'
                          : 'Enter a descriptive name for your assistant'}
                      </p>
                      <p className="text-gray-700 mb-3">
                        {locale === 'fi'
                          ? 'Valitse ensisijainen toimiala/domain'
                          : 'Choose your primary industry/domain'}
                      </p>
                      <p className="text-gray-700">
                        {locale === 'fi'
                          ? 'Valitse viestintätyyli, joka vastaa brändiäsi'
                          : 'Select the communication style that matches your brand'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Placeholder for form screenshot */}
                <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-gray-500">
                    {locale === 'fi'
                      ? 'Screenshot: Perusasetusten lomake'
                      : 'Screenshot: Basic settings form'}
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {locale === 'fi'
                    ? 'Vaihe 3: Persoonallisuuden ja äänen määrittäminen'
                    : 'Step 3: Define personality and voice'}
                </h3>
                <div className="bg-gray-50 rounded-lg p-6 mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-forest text-white rounded-full flex items-center justify-center font-semibold">
                      3
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 mb-3">
                        {locale === 'fi'
                          ? 'Lataa brändiohjeistasi'
                          : 'Upload your brand guidelines document'}
                      </p>
                      <p className="text-gray-700 mb-3">
                        {locale === 'fi'
                          ? 'Aseta viestintätyyli (ammattimainen, ystävällinen, rento)'
                          : 'Set communication tone (professional, friendly, casual)'}
                      </p>
                      <p className="text-gray-700 mb-3">
                        {locale === 'fi'
                          ? 'Määritä vastauksen pituuspreferenssit'
                          : 'Define response length preferences'}
                      </p>
                      <p className="text-gray-700">
                        {locale === 'fi'
                          ? 'Aseta muodollisuustaso'
                          : 'Set formality level'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Placeholder for personality settings */}
                <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-gray-500">
                    {locale === 'fi'
                      ? 'Screenshot: Persoonallisuusasetukset ja brändiohjeistot'
                      : 'Screenshot: Personality settings and brand guidelines'}
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {locale === 'fi'
                    ? 'Vaihe 4: Alustavan tietopohjan lisääminen'
                    : 'Step 4: Add initial knowledge base'}
                </h3>
                <div className="bg-gray-50 rounded-lg p-6 mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-forest text-white rounded-full flex items-center justify-center font-semibold">
                      4
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 mb-3">
                        {locale === 'fi'
                          ? 'Lataa yritysdokumentit (käytännöt, UKK:t, tuotetiedot)'
                          : 'Upload company documents (policies, FAQs, product info)'}
                      </p>
                      <p className="text-gray-700 mb-3">
                        {locale === 'fi'
                          ? 'Lisää verkkosivun sisältö ja markkinointimateriaalit'
                          : 'Add website content and marketing materials'}
                      </p>
                      <p className="text-gray-700">
                        {locale === 'fi'
                          ? 'Sisällytä yleisiä asiakaskysymyksiä ja vastauksia'
                          : 'Include common customer questions and responses'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Placeholder for knowledge base upload */}
                <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-gray-500">
                    {locale === 'fi'
                      ? 'Screenshot: Tietopohjan lataus ja hallinta'
                      : 'Screenshot: Knowledge base upload and management'}
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {locale === 'fi'
                    ? 'Vaihe 5: Avustajasi testaaminen'
                    : 'Step 5: Test your assistant'}
                </h3>
                <div className="bg-gray-50 rounded-lg p-6 mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-forest text-white rounded-full flex items-center justify-center font-semibold">
                      5
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 mb-3">
                        {locale === 'fi'
                          ? 'Käytä sisäänrakennettua testikäyttöliittymää'
                          : 'Use the built-in testing interface'}
                      </p>
                      <p className="text-gray-700 mb-3">
                        {locale === 'fi'
                          ? 'Kysy yleisiä kysymyksiä, joita asiakkaasi saattaisivat esittää'
                          : 'Ask common questions your customers might have'}
                      </p>
                      <p className="text-gray-700 mb-3">
                        {locale === 'fi'
                          ? 'Varmista, että vastaukset vastaavat brändiäsi'
                          : 'Verify responses match your brand voice'}
                      </p>
                      <p className="text-gray-700">
                        {locale === 'fi'
                          ? 'Tee tarvittavat muutokset'
                          : 'Make adjustments as needed'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Placeholder for testing interface */}
                <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-gray-500">
                    {locale === 'fi'
                      ? 'Screenshot: Testikäyttöliittymä ja keskustelutesti'
                      : 'Screenshot: Testing interface and conversation test'}
                  </p>
                </div>
              </div>
            </div>

            {/* What's next */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#2F5D50] mb-4 font-playfair leading-tight">
                {locale === 'fi' ? 'Mitä seuraavaksi?' : "What's next?"}
              </h2>
              <p className="text-[#333333] mb-6 font-inter leading-relaxed">
                {locale === 'fi'
                  ? 'Nyt kun olet luonut ensimmäisen tekoälyavustajasi, harkitse:'
                  : "Now that you've created your first AI assistant, consider:"}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href={`/${locale}/help/organizations-users`}
                  className="group"
                >
                  <div className="p-6 border border-[#E5E5E4] rounded-xl hover:border-[#2F5D50] hover:bg-[#F7EBEB] transition-all duration-200">
                    <h3 className="font-bold text-[#333333] group-hover:text-[#2F5D50] mb-2 font-playfair">
                      {locale === 'fi'
                        ? 'Tiimin asetukset ja käyttöoikeudet'
                        : 'Team setup and permissions'}
                    </h3>
                    <p className="text-sm text-[#666666] font-inter">
                      {locale === 'fi'
                        ? 'Hallitse tiimisi pääsyä ja oikeuksia'
                        : "Manage your team's access and permissions"}
                    </p>
                  </div>
                </Link>
                <Link href={`/${locale}/help/ai-assistants`} className="group">
                  <div className="p-6 border border-[#E5E5E4] rounded-xl hover:border-[#2F5D50] hover:bg-[#F7EBEB] transition-all duration-200">
                    <h3 className="font-bold text-[#333333] group-hover:text-[#2F5D50] mb-2 font-playfair">
                      {locale === 'fi'
                        ? 'Edistyneet koulutustekniikat'
                        : 'Advanced training techniques'}
                    </h3>
                    <p className="text-sm text-[#666666] font-inter">
                      {locale === 'fi'
                        ? 'Paranna avustajasi suorituskykyä'
                        : "Improve your assistant's performance"}
                    </p>
                  </div>
                </Link>
                <Link href={`/${locale}/help/integrations`} className="group">
                  <div className="p-6 border border-[#E5E5E4] rounded-xl hover:border-[#2F5D50] hover:bg-[#F7EBEB] transition-all duration-200">
                    <h3 className="font-bold text-[#333333] group-hover:text-[#2F5D50] mb-2 font-playfair">
                      {locale === 'fi'
                        ? 'Integrointi verkkosivustollesi'
                        : 'Integration with your website'}
                    </h3>
                    <p className="text-sm text-[#666666] font-inter">
                      {locale === 'fi'
                        ? 'Lisää avustajasi verkkosivustollesi'
                        : 'Add your assistant to your website'}
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Troubleshooting */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#2F5D50] mb-4 font-playfair leading-tight">
                {locale === 'fi' ? 'Vianmääritys' : 'Troubleshooting'}
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-yellow-400 pl-4">
                  <h4 className="font-semibold text-gray-900">
                    {locale === 'fi'
                      ? 'Ongelma: Avustajan vastaukset eivät vastaa brändiääniä'
                      : "Issue: Assistant responses don't match brand voice"}
                  </h4>
                  <p className="text-gray-600 mt-1">
                    {locale === 'fi'
                      ? 'Ratkaisu: Tarkista brändiohjeistojen lataus ja säädä persoonallisuusasetuksia'
                      : 'Solution: Review your brand guidelines upload and adjust personality settings'}
                  </p>
                </div>
                <div className="border-l-4 border-yellow-400 pl-4">
                  <h4 className="font-semibold text-gray-900">
                    {locale === 'fi'
                      ? 'Ongelma: Tietopohja vaikuttaa puutteelliselta'
                      : 'Issue: Knowledge base seems incomplete'}
                  </h4>
                  <p className="text-gray-600 mt-1">
                    {locale === 'fi'
                      ? 'Ratkaisu: Lisää lisää yritysdokumentteja ja kouluta avustaja uudelleen'
                      : 'Solution: Add more company documents and retrain the assistant'}
                  </p>
                </div>
              </div>
            </div>

            {/* Need help */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#2F5D50] mb-4 font-playfair leading-tight">
                {locale === 'fi' ? 'Tarvitsetko apua?' : 'Need help?'}
              </h2>
              <p className="text-[#333333] mb-6 font-inter leading-relaxed">
                {locale === 'fi'
                  ? 'Jos kohtaat ongelmia, joita ei käsitellä täällä:'
                  : 'If you encounter issues not covered here:'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/${locale}/help/troubleshooting`}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  {locale === 'fi'
                    ? 'Vianmääritysoppaat'
                    : 'Troubleshooting guides'}
                </Link>
                <Link
                  href={`/${locale}/help/contact-support`}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-forest hover:bg-forest/90"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {locale === 'fi' ? 'Ota yhteyttä tukeen' : 'Contact support'}
                </Link>
              </div>
            </div>
          </div>

          {/* Article Footer */}
          <div className="px-8 py-6 bg-[#F5F5F4] border-t border-[#E5E5E4]">
            <div className="flex items-center justify-between text-sm text-[#666666] font-inter">
              <span>
                {locale === 'fi'
                  ? 'Viimeksi päivitetty: 15. tammikuuta 2024'
                  : 'Last updated: January 15, 2024'}
              </span>
              <span>
                {locale === 'fi' ? 'Versio: 2.1.0' : 'Version: 2.1.0'}
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
