import { Metadata } from "next";
import { getTranslations } from "../../../../lib/i18n";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rekisteröityminen ja tilauksen valinta - Aloita Lyyli.ai",
  description: "Opas rekisteröitymiseen ja sopivan tilauksen valintaan Lyyli.ai:ssä.",
};

export default async function RegistrationSubscriptionPage({
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
                    {locale === "fi" ? "Rekisteröityminen ja tilauksen valinta" : "Registration and subscription selection"}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Article Header */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {locale === "fi" ? "Aloittelija" : "Beginner"}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {locale === "fi" ? "7 min" : "7 min"}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {locale === "fi" ? "Rekisteröityminen ja tilauksen valinta" : "Registration and subscription selection"}
            </h1>
            <p className="text-xl text-gray-600">
              {locale === "fi" 
                ? "Tilin luonti, aktivointi ja vahvistus, SSO/MFA: miten otetaan käyttöön, Salasanan nollaus ja lukituksen avaus, Profiiliasetukset ja ilmoitukset"
                : "Account creation, activation and verification, SSO/MFA: how to enable, Password reset and unlock, Profile settings and notifications"
              }
            </p>
          </div>

          {/* Article Body */}
          <div className="p-8">
            {/* Rekisteröityminen */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Rekisteröityminen" : "Registration"}
              </h2>
              <p className="text-gray-700 mb-4">
                {locale === "fi" 
                  ? "Aloita rekisteröitymällä Lyyli.ai-palveluun. Voit käyttää sähköpostiosoitetta tai SSO-integraatiota."
                  : "Start by registering for the Lyyli.ai service. You can use an email address or SSO integration."
                }
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {locale === "fi" ? "Siirry rekisteröitymissivulle" : "Go to registration page"}
                    </h3>
                    <p className="text-gray-600">
                      {locale === "fi" 
                        ? "Klikkaa 'Aloita ilmainen kokeilu' -painiketta pääsivulla tai siirry suoraan rekisteröitymissivulle."
                        : "Click the 'Start free trial' button on the homepage or go directly to the registration page."
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {locale === "fi" ? "Täytä rekisteröintilomake" : "Fill out registration form"}
                    </h3>
                    <p className="text-gray-600">
                      {locale === "fi" 
                        ? "Syötä sähköpostiosoitteesi, nimi ja organisaation tiedot. Vaihtoehtoisesti käytä Microsoft tai Google SSO:ta."
                        : "Enter your email address, name, and organization details. Alternatively, use Microsoft or Google SSO."
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {locale === "fi" ? "Vahvista sähköposti" : "Verify email"}
                    </h3>
                    <p className="text-gray-600">
                      {locale === "fi" 
                        ? "Tarkista sähköpostisi ja klikkaa vahvistuslinkkiä aktivoidaksesi tilisi."
                        : "Check your email and click the verification link to activate your account."
                      }
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Tilausvaihtoehdot */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Tilausvaihtoehdot" : "Subscription Options"}
              </h2>
              <p className="text-gray-700 mb-6">
                {locale === "fi" 
                  ? "Lyyli.ai tarjoaa erilaisia tilausvaihtoehtoja eri kokoisten organisaatioiden tarpeisiin:"
                  : "Lyyli.ai offers different subscription options for organizations of various sizes:"
                }
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {locale === "fi" ? "Starter" : "Starter"}
                  </h3>
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    {locale === "fi" ? "Ilmainen" : "Free"}
                  </div>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• {locale === "fi" ? "1 käyttäjä" : "1 user"}</li>
                    <li>• {locale === "fi" ? "1 tekoälyavustaja" : "1 AI assistant"}</li>
                    <li>• {locale === "fi" ? "100 viestiä/kuukausi" : "100 messages/month"}</li>
                    <li>• {locale === "fi" ? "Perusintegraatiot" : "Basic integrations"}</li>
                    <li>• {locale === "fi" ? "Sähköpostituki" : "Email support"}</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {locale === "fi" ? "Suosituin" : "Popular"}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">
                    {locale === "fi" ? "Professional" : "Professional"}
                  </h3>
                  <div className="text-2xl font-bold text-blue-900 mb-2">
                    29€<span className="text-sm font-normal">/kk</span>
                  </div>
                  <ul className="space-y-2 text-blue-800 text-sm">
                    <li>• {locale === "fi" ? "5 käyttäjää" : "5 users"}</li>
                    <li>• {locale === "fi" ? "5 tekoälyavustajaa" : "5 AI assistants"}</li>
                    <li>• {locale === "fi" ? "1000 viestiä/kuukausi" : "1000 messages/month"}</li>
                    <li>• {locale === "fi" ? "Kaikki integraatiot" : "All integrations"}</li>
                    <li>• {locale === "fi" ? "Prioriteettituki" : "Priority support"}</li>
                    <li>• {locale === "fi" ? "Analytiikka" : "Analytics"}</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">
                    {locale === "fi" ? "Enterprise" : "Enterprise"}
                  </h3>
                  <div className="text-2xl font-bold text-purple-900 mb-2">
                    {locale === "fi" ? "Mukautettu" : "Custom"}
                  </div>
                  <ul className="space-y-2 text-purple-800 text-sm">
                    <li>• {locale === "fi" ? "Rajoittamaton käyttäjä" : "Unlimited users"}</li>
                    <li>• {locale === "fi" ? "Rajoittamaton avustaja" : "Unlimited assistants"}</li>
                    <li>• {locale === "fi" ? "Rajoittamaton viesti" : "Unlimited messages"}</li>
                    <li>• {locale === "fi" ? "Mukautetut integraatiot" : "Custom integrations"}</li>
                    <li>• {locale === "fi" ? "Dedikoidut tuki" : "Dedicated support"}</li>
                    <li>• {locale === "fi" ? "SLA-sopimus" : "SLA agreement"}</li>
                    <li>• {locale === "fi" ? "On-premise vaihtoehto" : "On-premise option"}</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Tilauksen valinta */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Kuinka valita sopiva tilaus" : "How to choose the right subscription"}
              </h2>
              <div className="space-y-4">
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">
                    {locale === "fi" ? "Aloita ilmaisella" : "Start with free"}
                  </h3>
                  <p className="text-green-800">
                    {locale === "fi" 
                      ? "Suosittelemme aloittamaan ilmaisella Starter-tilauksella, jotta voit tutustua palveluun ja sen ominaisuuksiin."
                      : "We recommend starting with the free Starter subscription to familiarize yourself with the service and its features."
                    }
                  </p>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">
                    {locale === "fi" ? "Arvioi tarpeet" : "Assess your needs"}
                  </h3>
                  <ul className="space-y-2 text-blue-800">
                    <li>• {locale === "fi" ? "Kuinka monta käyttäjää tarvitset?" : "How many users do you need?"}</li>
                    <li>• {locale === "fi" ? "Kuinka monta tekoälyavustajaa?" : "How many AI assistants?"}</li>
                    <li>• {locale === "fi" ? "Kuinka paljon viestejä kuukaudessa?" : "How many messages per month?"}</li>
                    <li>• {locale === "fi" ? "Tarvitsetko erityisiä integraatioita?" : "Do you need special integrations?"}</li>
                    <li>• {locale === "fi" ? "Mikä on budjettisi?" : "What's your budget?"}</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">
                    {locale === "fi" ? "Kasva vaiheittain" : "Grow gradually"}
                  </h3>
                  <p className="text-purple-800">
                    {locale === "fi" 
                      ? "Voit päivittää tilauksesi milloin tahansa tarpeidesi kasvaessa. Vanhat tiedot säilyvät ja siirtyminen on saumaton."
                      : "You can upgrade your subscription anytime as your needs grow. Old data is preserved and the transition is seamless."
                    }
                  </p>
                </div>
              </div>
            </section>

            {/* Maksutavat */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Maksutavat" : "Payment Methods"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {locale === "fi" ? "Korttimaksu" : "Card Payment"}
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• {locale === "fi" ? "Visa, Mastercard, American Express" : "Visa, Mastercard, American Express"}</li>
                    <li>• {locale === "fi" ? "Turvallinen Stripe-maksupalvelu" : "Secure Stripe payment service"}</li>
                    <li>• {locale === "fi" ? "Automaattinen uusinta" : "Automatic renewal"}</li>
                    <li>• {locale === "fi" ? "Hetkellinen aktivointi" : "Instant activation"}</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {locale === "fi" ? "Laskutus" : "Invoicing"}
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• {locale === "fi" ? "Kuukausi- tai vuosilaskutus" : "Monthly or annual invoicing"}</li>
                    <li>• {locale === "fi" ? "30 päivän maksuaika" : "30 days payment terms"}</li>
                    <li>• {locale === "fi" ? "PDF-laskut sähköpostiin" : "PDF invoices by email"}</li>
                    <li>• {locale === "fi" ? "Sopii yrityksille" : "Suitable for companies"}</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Kokeilujakso */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Kokeilujakso" : "Trial Period"}
              </h2>
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h3 className="text-lg font-semibold text-yellow-900 mb-3">
                  {locale === "fi" ? "14 päivän ilmainen kokeilu" : "14-day free trial"}
                </h3>
                <ul className="space-y-2 text-yellow-800">
                  <li>• {locale === "fi" ? "Täysi pääsy kaikkiin ominaisuuksiin" : "Full access to all features"}</li>
                  <li>• {locale === "fi" ? "Ei sitoutumista" : "No commitment"}</li>
                  <li>• {locale === "fi" ? "Voit peruuttaa milloin tahansa" : "You can cancel anytime"}</li>
                  <li>• {locale === "fi" ? "Tukitiimi auttaa käyttöönotossa" : "Support team helps with implementation"}</li>
                </ul>
              </div>
            </section>

            {/* Seuraavat vaiheet */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Seuraavat vaiheet" : "Next Steps"}
              </h2>
              <p className="text-gray-700 mb-4">
                {locale === "fi" 
                  ? "Kun olet rekisteröitynyt ja valinnut tilauksen, voit aloittaa käyttöönoton:"
                  : "Once you've registered and chosen a subscription, you can start implementation:"
                }
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href={`/${locale}/help/getting-started`} className="group">
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-forest hover:bg-gray-50 transition-colors">
                    <h3 className="font-semibold text-gray-900 group-hover:text-forest">
                      {locale === "fi" ? "Aloitus ja käyttöönotto" : "Getting Started"}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {locale === "fi" 
                        ? "Aloita käyttäminen vaiheittaisella oppaalla"
                        : "Start using with step-by-step guide"
                      }
                    </p>
                  </div>
                </Link>
                <Link href={`/${locale}/help/accounts-auth`} className="group">
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-forest hover:bg-gray-50 transition-colors">
                    <h3 className="font-semibold text-gray-900 group-hover:text-forest">
                      {locale === "fi" ? "Tilin asetukset" : "Account Settings"}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {locale === "fi" 
                        ? "Määritä SSO, MFA ja profiiliasetukset"
                        : "Configure SSO, MFA and profile settings"
                      }
                    </p>
                  </div>
                </Link>
              </div>
            </section>
          </div>

          {/* Article Footer */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>
                {locale === "fi" 
                  ? "Viimeksi päivitetty: 8. lokakuuta 2025"
                  : "Last updated: October 8, 2025"
                }
              </span>
              <span>
                {locale === "fi" 
                  ? "Versio: 3.0"
                  : "Version: 3.0"
                }
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
