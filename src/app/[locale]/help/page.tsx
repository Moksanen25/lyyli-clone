import { Metadata } from "next";
import { getTranslations } from "@/lib/i18n";
import Link from "next/link";
import HelpSearch from "@/components/HelpSearch";
import Breadcrumbs from "@/components/Breadcrumbs";
import { generatePageBreadcrumbs, generateBreadcrumbSchema } from "@/lib/breadcrumb-schema";

export const metadata: Metadata = {
  title: "Help & Support Center",
  description: "Get help with Lyyli.ai - Find guides, troubleshooting, and support resources for your AI communications assistant.",
};

export default async function HelpPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations(locale);

  // Generate breadcrumbs for the help page
  const breadcrumbItems = generatePageBreadcrumbs(
    locale === "fi" ? "Apu ja tuki" : "Help & Support Center",
    locale,
    [{ title: "Help", href: `/${locale}/help` }]
  );
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);

  return (
    <div className="min-h-screen">
      {/* Breadcrumb JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 pt-32 pb-4">
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      
      {/* Hero Section with Search */}
      <div className="relative z-10">
        <section 
          className="container mx-auto px-4 py-20 relative overflow-hidden"
          aria-label="Hero"
        >
          {/* Animated Hero Visual */}
          
          <div className="text-center max-w-4xl mx-auto relative z-10">
            <h1 className="text-4xl font-bold text-forest mb-6 font-playfair font-bold leading-tight">
              {locale === "fi" ? "Apu ja tuki" : "Help & Support Center"}
            </h1>
            <p className="text-xl text-mediumGray mb-8 font-sans leading-relaxed">
              {locale === "fi" 
                ? "Etsi vastauksia, oppaat ja tuki Lyyli.ai:n käyttöön"
                : "Find answers, guides, and support for using Lyyli.ai"
              }
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <HelpSearch 
                locale={locale}
                placeholder={locale === "fi" ? "Etsi apua..." : "Search for help..."}
              />
            </div>
          </div>
        </section>
      </div>

      {/* Main Content */}
      <div className="bg-gradient-to-br from-rose/5 to-turquoise/5 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Popular Topics */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-forest mb-8 font-playfair font-bold leading-tight">
              {locale === "fi" ? "Suosituimmat aiheet" : "Popular Topics"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Service Description */}
              <Link href={`/${locale}/help/service-description`} className="group">
                <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-forest hover:shadow-md transition-all duration-200">
                  <div className="w-12 h-12 bg-forest/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-forest/20 transition-colors">
                    <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg text-forest mb-2 group-hover:text-forest transition-colors font-playfair font-normal">
                    {locale === "fi" ? "Palvelun kuvaus" : "Service Description"}
                  </h3>
                  <p className="text-mediumGray font-sans leading-relaxed">
                    {locale === "fi" 
                      ? "Mikä palvelu on ja kenelle se on"
                      : "What the service is and who it's for"
                    }
                  </p>
                </div>
              </Link>

              {/* Target Audience */}
              <Link href={`/${locale}/help/target-audience`} className="group">
                <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-forest hover:shadow-md transition-all duration-200">
                  <div className="w-12 h-12 bg-forest/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-forest/20 transition-colors">
                    <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6 1.87a4 4 0 10-8 0 4 4 0 008 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg text-forest mb-2 group-hover:text-forest transition-colors font-playfair font-normal">
                    {locale === "fi" ? "Kenelle" : "Target Audience"}
                  </h3>
                  <p className="text-mediumGray font-sans leading-relaxed">
                    {locale === "fi" 
                      ? "Kohderyhmät ja käyttötarkoitukset"
                      : "Target groups and use cases"
                    }
                  </p>
                </div>
              </Link>

              {/* Getting Started */}
              <Link href={`/${locale}/help/getting-started`} className="group">
                <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-forest hover:shadow-md transition-all duration-200">
                  <div className="w-12 h-12 bg-forest/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-forest/20 transition-colors">
                    <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg text-forest mb-2 group-hover:text-forest transition-colors font-playfair font-normal">
                    {locale === "fi" ? "Aloitus ja käyttöönotto" : "Getting Started"}
                  </h3>
                  <p className="text-mediumGray font-sans leading-relaxed">
                    {locale === "fi" 
                      ? "Luo ensimmäinen tekoälyavustajasi ja aloita käyttö"
                      : "Create your first AI assistant and get started"
                    }
                  </p>
                </div>
              </Link>

              {/* Registration & Subscription */}
              <Link href={`/${locale}/help/registration-subscription`} className="group">
                <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-forest hover:shadow-md transition-all duration-200">
                  <div className="w-12 h-12 bg-forest/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-forest/20 transition-colors">
                    <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <h3 className="text-lg text-forest mb-2 group-hover:text-forest transition-colors font-playfair font-normal">
                    {locale === "fi" ? "Rekisteröityminen ja tilauksen valinta" : "Registration & Subscription"}
                  </h3>
                  <p className="text-mediumGray font-sans leading-relaxed">
                    {locale === "fi" 
                      ? "Aloita käyttäminen ja valitse tilaus"
                      : "Start using and choose subscription"
                    }
                  </p>
                </div>
              </Link>

              {/* Accounts & Auth */}
              <Link href={`/${locale}/help/accounts-auth`} className="group">
                <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-forest hover:shadow-md transition-all duration-200">
                  <div className="w-12 h-12 bg-forest/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-forest/20 transition-colors">
                    <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1721 9z" />
                    </svg>
                  </div>
                  <h3 className="text-lg text-forest mb-2 group-hover:text-forest transition-colors font-playfair font-normal">
                    {locale === "fi" ? "Tilit ja kirjautuminen" : "Accounts & Authentication"}
                  </h3>
                  <p className="text-mediumGray font-sans leading-relaxed">
                    {locale === "fi" 
                      ? "Tilin luonti, SSO/MFA, salasanan nollaus"
                      : "Account creation, SSO/MFA, password reset"
                    }
                  </p>
                </div>
              </Link>

              {/* Organizations & Users */}
              <Link href={`/${locale}/help/organizations-users`} className="group">
                <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-forest hover:shadow-md transition-all duration-200">
                  <div className="w-12 h-12 bg-forest/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-forest/20 transition-colors">
                    <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6 1.87a4 4 0 10-8 0 4 4 0 008 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg text-forest mb-2 group-hover:text-forest transition-colors font-playfair font-normal">
                    {locale === "fi" ? "Organisaatiot ja käyttäjähallinta" : "Organizations & User Management"}
                  </h3>
                  <p className="text-mediumGray font-sans leading-relaxed">
                    {locale === "fi" 
                      ? "Kutsut, roolit, tiimit ja audit trail"
                      : "Invites, roles, teams and audit trail"
                    }
                  </p>
                </div>
              </Link>

              {/* UI Basics */}
              <Link href={`/${locale}/help/ui-basics`} className="group">
                <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-forest hover:shadow-md transition-all duration-200">
                  <div className="w-12 h-12 bg-forest/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-forest/20 transition-colors">
                    <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg text-forest mb-2 group-hover:text-forest transition-colors font-playfair font-normal">
                    {locale === "fi" ? "Käyttöliittymän perusteet" : "UI Basics"}
                  </h3>
                  <p className="text-mediumGray font-sans leading-relaxed">
                    {locale === "fi" 
                      ? "Navigointi, haku, ilmoitukset ja oikotiet"
                      : "Navigation, search, notifications and shortcuts"
                    }
                  </p>
                </div>
              </Link>

              {/* Brand & Content */}
              <Link href={`/${locale}/help/brand-content`} className="group">
                <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-forest hover:shadow-md transition-all duration-200">
                  <div className="w-12 h-12 bg-forest/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-forest/20 transition-colors">
                    <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                    </svg>
                  </div>
                  <h3 className="text-lg text-forest mb-2 group-hover:text-forest transition-colors font-playfair font-normal">
                    {locale === "fi" ? "Brändi ja sisältöasetukset" : "Brand & Content Settings"}
                  </h3>
                  <p className="text-mediumGray font-sans leading-relaxed">
                    {locale === "fi" 
                      ? "Värit, typografia, sävy ja politiikat"
                      : "Colors, typography, tone and policies"
                    }
                  </p>
                </div>
              </Link>

              {/* Publishing */}
              <Link href={`/${locale}/help/publishing`} className="group">
                <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-forest hover:shadow-md transition-all duration-200">
                  <div className="w-12 h-12 bg-forest/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-forest/20 transition-colors">
                    <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                  </div>
                  <h3 className="text-lg text-forest mb-2 group-hover:text-forest transition-colors font-playfair font-normal">
                    {locale === "fi" ? "Julkaisu ja kanavakohtaiset ohjeet" : "Publishing & Channel Guidelines"}
                  </h3>
                  <p className="text-mediumGray font-sans leading-relaxed">
                    {locale === "fi" 
                      ? "Versiointi, A/B-testaus ja virheet"
                      : "Versioning, A/B testing and errors"
                    }
                  </p>
                </div>
              </Link>

              {/* Legal */}
              <Link href={`/${locale}/help/legal`} className="group" aria-label={locale === "fi" ? "Avaa sopimukset ja ehdot -kirjasto" : "Open Legal & agreements library"}>
                <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-forest hover:shadow-md transition-all duration-200">
                  <div className="w-12 h-12 bg-forest/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-forest/20 transition-colors">
                    <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16h8M8 12h8m-7 8h6a2 2 0 002-2V6a2 2 0 00-2-2H9l-3 3v13a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg text-forest mb-2 group-hover:text-forest transition-colors font-playfair font-normal">
                    {locale === "fi" ? "Sopimukset ja ehdot" : "Legal & Agreements"}
                  </h3>
                  <p className="text-mediumGray font-sans leading-relaxed">
                    {locale === "fi" 
                      ? "Tilausvahvistus, DPA, SLA, ehdot ja liitteet"
                      : "Order confirmation, DPA, SLA, terms, and annexes"
                    }
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Contact Support */}
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-200">
            <div className="max-w-2xl mx-auto px-6">
              <h2 className="text-2xl font-semibold text-forest mb-4 font-playfair font-bold leading-tight">
                {locale === "fi" ? "Tarvitsetko lisää apua?" : "Need more help?"}
              </h2>
              <p className="text-mediumGray mb-6 font-sans leading-relaxed">
                {locale === "fi" 
                  ? "Jos et löytänyt vastausta etsimääsi, ota yhteyttä tukitiimiimme"
                  : "If you couldn't find what you're looking for, contact our support team"
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href={`/${locale}/contact`}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-forest hover:bg-forest/90 transition-colors duration-200"
                >
                  {locale === "fi" ? "Ota yhteyttä" : "Contact Us"}
                </Link>
                <Link 
                  href={`/${locale}/help/legal`}
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                >
                  {locale === "fi" ? "Sopimukset ja ehdot" : "Legal & Terms"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}