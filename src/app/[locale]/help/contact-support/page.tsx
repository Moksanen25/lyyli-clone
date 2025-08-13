import { Metadata } from "next";
import { getTranslations } from "../../../../lib/i18n";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Support - Get Help with Lyyli.ai",
  description: "Contact our support team for help with Lyyli.ai. Multiple support channels available including email, chat, and phone.",
};

export default async function ContactSupportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link href={`/${locale}/help`} className="text-gray-500 hover:text-gray-700">
                  {locale === "fi" ? "Apu ja tuki" : "Help & Support"}
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-4 text-sm font-medium text-gray-500">
                    {locale === "fi" ? "Ota yhteyttä" : "Contact Support"}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {locale === "fi" ? "Ota yhteyttä tukeen" : "Contact Support"}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {locale === "fi" 
              ? "Olemme täällä auttaaksemme sinua. Valitse sinulle sopiva tapa ottaa yhteyttä."
              : "We're here to help. Choose the contact method that works best for you."
            }
          </p>
        </div>

        {/* Support Channels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Email Support */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {locale === "fi" ? "Sähköpostituki" : "Email Support"}
            </h3>
            <p className="text-gray-600 mb-6">
              {locale === "fi" 
                ? "Saat vastauksen 24 tunnin sisällä"
                : "Get a response within 24 hours"
              }
            </p>
            <a
              href="mailto:support@lyyli.ai"
              className="inline-flex items-center px-6 py-3 border border-forest text-forest rounded-lg hover:bg-forest hover:text-white transition-colors font-medium"
            >
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              support@lyyli.ai
            </a>
          </div>

          {/* Live Chat */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {locale === "fi" ? "Live-chat" : "Live Chat"}
            </h3>
            <p className="text-gray-600 mb-6">
              {locale === "fi" 
                ? "Puhu suoraan tukitiimimme kanssa"
                : "Chat directly with our support team"
              }
            </p>
            <button className="inline-flex items-center px-6 py-3 bg-forest text-white rounded-lg hover:bg-forest/90 transition-colors font-medium">
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {locale === "fi" ? "Aloita chat" : "Start Chat"}
            </button>
          </div>

          {/* Phone Support */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {locale === "fi" ? "Puhelintuki" : "Phone Support"}
            </h3>
            <p className="text-gray-600 mb-6">
              {locale === "fi" 
                ? "Saatavilla arkisin 9-17"
                : "Available weekdays 9-17"
              }
            </p>
            <a
              href="tel:+358401234567"
              className="inline-flex items-center px-6 py-3 border border-forest text-forest rounded-lg hover:bg-forest hover:text-white transition-colors font-medium"
            >
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +358 40 123 4567
            </a>
          </div>
        </div>

        {/* Support Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            {locale === "fi" ? "Lähetä tukipyyntö" : "Submit Support Request"}
          </h2>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {locale === "fi" ? "Nimi" : "Name"}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent"
                  placeholder={locale === "fi" ? "Koko nimesi" : "Your full name"}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {locale === "fi" ? "Sähköposti" : "Email"}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent"
                  placeholder={locale === "fi" ? "sähköposti@esimerkki.fi" : "email@example.com"}
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                {locale === "fi" ? "Aihe" : "Subject"}
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent"
                placeholder={locale === "fi" ? "Lyhyt kuvaus ongelmasta" : "Brief description of the issue"}
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                {locale === "fi" ? "Kategoria" : "Category"}
              </label>
              <select
                id="category"
                name="category"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent"
              >
                <option value="">
                  {locale === "fi" ? "Valitse kategoria" : "Select a category"}
                </option>
                <option value="technical">
                  {locale === "fi" ? "Tekninen ongelma" : "Technical Issue"}
                </option>
                <option value="billing">
                  {locale === "fi" ? "Laskutus" : "Billing"}
                </option>
                <option value="feature-request">
                  {locale === "fi" ? "Ominaisuuspyyntö" : "Feature Request"}
                </option>
                <option value="general">
                  {locale === "fi" ? "Yleinen kysymys" : "General Question"}
                </option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                {locale === "fi" ? "Viesti" : "Message"}
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent"
                placeholder={locale === "fi" 
                  ? "Kuvaa ongelmasi yksityiskohtaisesti. Sisällytä mahdolliset virheilmoitukset, näytöt ja vaiheet toistamiseen."
                  : "Describe your issue in detail. Include any error messages, screenshots, and steps to reproduce."
                }
              ></textarea>
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="urgent"
                name="urgent"
                className="mt-1 h-4 w-4 text-forest focus:ring-forest border-gray-300 rounded"
              />
              <label htmlFor="urgent" className="ml-2 text-sm text-gray-700">
                {locale === "fi" 
                  ? "Merkitse kiireelliseksi (vastaus 4 tunnin sisällä)"
                  : "Mark as urgent (response within 4 hours)"
                }
              </label>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 bg-forest text-white rounded-lg hover:bg-forest/90 transition-colors font-medium"
              >
                {locale === "fi" ? "Lähetä pyyntö" : "Submit Request"}
              </button>
            </div>
          </form>
        </div>

        {/* Additional Support Resources */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            {locale === "fi" ? "Lisätukiresurssit" : "Additional Support Resources"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href={`/${locale}/help`} className="group">
              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-forest hover:shadow-md transition-all duration-200">
                <div className="w-12 h-12 bg-forest/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-forest/20 transition-colors">
                  <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-forest transition-colors">
                  {locale === "fi" ? "Apuoppaat" : "Help Guides"}
                </h3>
                <p className="text-gray-600">
                  {locale === "fi" 
                    ? "Etsi vastauksia yleisiin kysymyksiin"
                    : "Find answers to common questions"
                  }
                </p>
              </div>
            </Link>

            <Link href={`/${locale}/help/status`} className="group">
              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-forest hover:shadow-md transition-all duration-200">
                <div className="w-12 h-12 bg-forest/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-forest/20 transition-colors">
                  <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-forest transition-colors">
                  {locale === "fi" ? "Palvelun tila" : "Service Status"}
                </h3>
                <p className="text-gray-600">
                  {locale === "fi" 
                    ? "Tarkista palvelun toimintatila"
                    : "Check service operational status"
                  }
                </p>
              </div>
            </Link>

            <Link href={`/${locale}/help/community`} className="group">
              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-forest hover:shadow-md transition-all duration-200">
                <div className="w-12 h-12 bg-forest/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-forest/20 transition-colors">
                  <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-forest transition-colors">
                  {locale === "fi" ? "Yhteisö" : "Community"}
                </h3>
                <p className="text-gray-600">
                  {locale === "fi" 
                    ? "Liity käyttäjäyhteisöömme"
                    : "Join our user community"
                  }
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Response Times */}
        <div className="mt-16 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            {locale === "fi" ? "Vastausajat" : "Response Times"}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {locale === "fi" ? "Live-chat" : "Live Chat"}
              </h3>
              <p className="text-gray-600">
                {locale === "fi" ? "Vastaus heti" : "Immediate response"}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {locale === "fi" ? "Sähköposti" : "Email"}
              </h3>
              <p className="text-gray-600">
                {locale === "fi" ? "24 tunnin sisällä" : "Within 24 hours"}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {locale === "fi" ? "Puhelin" : "Phone"}
              </h3>
              <p className="text-gray-600">
                {locale === "fi" ? "Arkisin 9-17" : "Weekdays 9-17"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
