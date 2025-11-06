import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Billing & Subscriptions - Manage Your Lyyli.ai Account',
  description:
    'Get help with billing, subscriptions, payment methods, and account management for your Lyyli.ai service.',
};

export default async function BillingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<React.JSX.Element> {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="hidden bg-white border-b border-gray-200 pt-24">
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
                      ? 'Laskutus ja tilaukset'
                      : 'Billing & Subscriptions'}
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
              {locale === 'fi'
                ? 'Laskutus ja maksutavat'
                : 'Billing and payment methods'}
            </h1>
            <p className="text-xl text-[#333333] font-inter leading-relaxed">
              {locale === 'fi'
                ? 'Hallitse tilaustasi, päivitä maksutietoja ja seuraa laskutushistoriaa. Ymmärrä hinnoittelu ja hallitse organisaatiosi kustannuksia tehokkaasti.'
                : "Manage your subscription, update payment information, and track billing history. Understand pricing and effectively manage your organization's costs."}
            </p>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Article Header */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {locale === 'fi' ? 'Keskitaso' : 'Intermediate'}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {locale === 'fi' ? '5 min' : '5 min'}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === 'fi'
                ? 'Laskutus ja tilaukset'
                : 'Billing & Subscriptions'}
            </h1>
            <p className="text-xl text-gray-600">
              {locale === 'fi'
                ? 'Hallitse tilauksesi, maksutapasi ja laskutustietosi'
                : 'Manage your subscriptions, payment methods, and billing information.'}
            </p>
          </div>

          {/* Article Body */}
          <div className="p-8">
            {/* Quick Actions */}
            <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h2 className="text-lg font-semibold text-blue-900 mb-3">
                {locale === 'fi' ? 'Nopeat toiminnot' : 'Quick Actions'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Link
                  href={`/${locale}/pricing`}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  {locale === 'fi' ? 'Katso hinnat' : 'View Pricing'}
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center px-4 py-2 bg-white text-blue-600 text-sm font-medium rounded-md border border-blue-200 hover:bg-blue-50 transition-colors"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  {locale === 'fi' ? 'Ota yhteyttä' : 'Contact Support'}
                </Link>
              </div>
            </div>

            {/* Common Questions */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {locale === 'fi' ? 'Yleisimmät kysymykset' : 'Common Questions'}
              </h2>

              <div className="space-y-6">
                {/* Question 1 */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {locale === 'fi'
                      ? 'Miten muutan tilaussuunnitelmaani?'
                      : 'How do I change my subscription plan?'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {locale === 'fi'
                      ? 'Voit päivittää tai muuttaa tilaussuunnitelmaasi milloin tahansa tiliasetuksista. Muutokset tulevat voimaan seuraavasta laskutusjaksosta alkaen.'
                      : 'You can upgrade or change your subscription plan at any time from your account settings. Changes will take effect from the next billing cycle.'}
                  </p>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium text-gray-900 mb-2">
                      {locale === 'fi' ? 'Ohjeet:' : 'Instructions:'}
                    </h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                      <li>
                        {locale === 'fi'
                          ? 'Mene tiliasetuksiin'
                          : 'Go to Account Settings'}
                      </li>
                      <li>
                        {locale === 'fi'
                          ? "Valitse 'Tilaus'"
                          : "Select 'Subscription'"}
                      </li>
                      <li>
                        {locale === 'fi'
                          ? 'Valitse haluamasi suunnitelma'
                          : 'Choose your desired plan'}
                      </li>
                      <li>
                        {locale === 'fi'
                          ? 'Vahvista muutos'
                          : 'Confirm the change'}
                      </li>
                    </ol>
                  </div>
                </div>

                {/* Question 2 */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {locale === 'fi'
                      ? 'Miten lisään tai muutan maksutapani?'
                      : 'How do I add or change my payment method?'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {locale === 'fi'
                      ? 'Voit hallita maksutapoja tiliasetuksista. Tuemme luottokortteja, PayPalia ja pankkisiirtoja.'
                      : 'You can manage payment methods from your account settings. We support credit cards, PayPal, and bank transfers.'}
                  </p>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium text-gray-900 mb-2">
                      {locale === 'fi'
                        ? 'Tuetut maksutavat:'
                        : 'Supported payment methods:'}
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li className="flex items-center">
                        <svg
                          className="w-4 h-4 text-green-500 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {locale === 'fi'
                          ? 'Visa, Mastercard, American Express'
                          : 'Visa, Mastercard, American Express'}
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="w-4 h-4 text-green-500 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        PayPal
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="w-4 h-4 text-green-500 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {locale === 'fi'
                          ? 'Pankkisiirto (SEPA)'
                          : 'Bank Transfer (SEPA)'}
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Question 3 */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {locale === 'fi'
                      ? 'Miten peruutan tilaukseni?'
                      : 'How do I cancel my subscription?'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {locale === 'fi'
                      ? 'Voit peruuttaa tilauksesi milloin tahansa. Palvelu jatkuu laskutuskauden loppuun asti, ja voit palata takaisin milloin tahansa.'
                      : 'You can cancel your subscription at any time. Service will continue until the end of your billing period, and you can return anytime.'}
                  </p>
                  <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
                    <h4 className="font-medium text-yellow-900 mb-2">
                      {locale === 'fi' ? 'Tärkeää:' : 'Important:'}
                    </h4>
                    <p className="text-sm text-yellow-800">
                      {locale === 'fi'
                        ? 'Tilauksen peruuttamisen jälkeen tietosi säilyvät 30 päivää. Jos palaat takaisin tänä aikana, kaikki tietosi ovat edelleen saatavilla.'
                        : 'After cancellation, your data is preserved for 30 days. If you return within this time, all your data will still be available.'}
                    </p>
                  </div>
                </div>

                {/* Question 4 */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {locale === 'fi'
                      ? 'Miksi laskuni on erilainen kuin odotin?'
                      : 'Why is my bill different than expected?'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {locale === 'fi'
                      ? 'Laskun määrä voi vaihdella useista syistä: käyttörajojen ylitys, lisäpalvelut tai verot. Tarkista laskutustiedot tiliasetuksista.'
                      : 'Bill amounts can vary for several reasons: usage overages, add-on services, or taxes. Check billing details in your account settings.'}
                  </p>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium text-gray-900 mb-2">
                      {locale === 'fi' ? 'Yleisimmät syyt:' : 'Common reasons:'}
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>
                        •{' '}
                        {locale === 'fi'
                          ? 'Käyttörajojen ylitys'
                          : 'Usage overages'}
                      </li>
                      <li>
                        • {locale === 'fi' ? 'Lisäpalvelut' : 'Add-on services'}
                      </li>
                      <li>
                        •{' '}
                        {locale === 'fi' ? 'Verot ja maksut' : 'Taxes and fees'}
                      </li>
                      <li>
                        •{' '}
                        {locale === 'fi'
                          ? 'Suunnitelman muutokset'
                          : 'Plan changes'}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Billing Cycle Information */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {locale === 'fi' ? 'Laskutusjaksot' : 'Billing Cycles'}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">
                    {locale === 'fi' ? 'Kuukausittainen' : 'Monthly'}
                  </h3>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li>
                      •{' '}
                      {locale === 'fi'
                        ? 'Laskutetaan kuukausittain'
                        : 'Billed monthly'}
                    </li>
                    <li>
                      •{' '}
                      {locale === 'fi'
                        ? 'Peruutus milloin tahansa'
                        : 'Cancel anytime'}
                    </li>
                    <li>
                      • {locale === 'fi' ? 'Ei sitoutumista' : 'No commitment'}
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">
                    {locale === 'fi' ? 'Vuosittainen' : 'Annual'}
                  </h3>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>
                      •{' '}
                      {locale === 'fi'
                        ? 'Laskutetaan vuosittain'
                        : 'Billed annually'}
                    </li>
                    <li>• {locale === 'fi' ? '20% säästö' : '20% savings'}</li>
                    <li>
                      •{' '}
                      {locale === 'fi'
                        ? 'Peruutus milloin tahansa'
                        : 'Cancel anytime'}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Invoice Management */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {locale === 'fi' ? 'Laskujen hallinta' : 'Invoice Management'}
              </h2>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {locale === 'fi'
                    ? 'Laskujen lataaminen ja tulostus'
                    : 'Downloading and Printing Invoices'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {locale === 'fi'
                    ? 'Kaikki laskusi ovat saatavilla tiliasetuksista. Voit ladata ne PDF-muodossa tai tulostaa suoraan.'
                    : 'All your invoices are available in your account settings. You can download them as PDFs or print them directly.'}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-gray-900">PDF</p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <svg
                        className="w-6 h-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm7-5h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4a2 2 0 012-2z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {locale === 'fi' ? 'Tulostus' : 'Print'}
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <svg
                        className="w-6 h-6 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {locale === 'fi' ? 'Arkisto' : 'Archive'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Need More Help */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg border border-blue-200">
              <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                {locale === 'fi' ? 'Tarvitsetko lisäapua?' : 'Need more help?'}
              </h2>
              <p className="text-blue-800 mb-6">
                {locale === 'fi'
                  ? 'Jos et löytänyt vastausta kysymykseesi, ota yhteyttä asiakastukeemme. Vastaamme sinulle 24 tunnin sisällä.'
                  : "If you couldn't find the answer to your question, contact our customer support. We'll get back to you within 24 hours."}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  {locale === 'fi' ? 'Ota yhteyttä tukeen' : 'Contact Support'}
                </Link>
                <Link
                  href={`/${locale}/help`}
                  className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  {locale === 'fi' ? 'Etsi lisää apua' : 'Search More Help'}
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
