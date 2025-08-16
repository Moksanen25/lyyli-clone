import { Metadata } from "next";
import { getTranslations } from "../../../../lib/i18n";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Assistants - Manage and Train Your AI Communications",
  description: "Learn how to manage, train, and optimize your AI communications assistants for better performance and brand consistency.",
};

export default async function AIAssistantsPage({
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
                    {locale === "fi" ? "Tekoälyavustajat" : "AI Assistants"}
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
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {locale === "fi" ? "Keskitaso" : "Intermediate"}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {locale === "fi" ? "15 min" : "15 min"}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === "fi" 
                ? "Hallitse ja kouluta tekoälyavustajiasi"
                : "Manage and train your AI assistants"
              }
            </h1>
            <p className="text-xl text-gray-600">
              {locale === "fi" 
                ? "Opi hallitsemaan useita avustajia, parantamaan niiden suorituskykyä ja optimoimaan brändiyhtenäisyyttä"
                : "Learn how to manage multiple assistants, improve their performance, and optimize brand consistency."
              }
            </p>
          </div>

          {/* Article Body */}
          <div className="p-8">
            {/* What you'll learn */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Mitä opit" : "What you'll learn"}
              </h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">
                    {locale === "fi" 
                      ? "Usean avustajan hallinta ja organisointi"
                      : "Managing and organizing multiple assistants"
                    }
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">
                    {locale === "fi" 
                      ? "Avustajien koulutus ja parantaminen"
                      : "Training and improving assistants"
                    }
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">
                    {locale === "fi" 
                      ? "Suorituskyvyn seuranta ja analytiikka"
                      : "Performance monitoring and analytics"
                    }
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">
                    {locale === "fi" 
                      ? "Brändiyhtenäisyyden varmistaminen"
                      : "Ensuring brand consistency"
                    }
                  </span>
                </li>
              </ul>
            </div>

            {/* Managing multiple assistants */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Usean avustajan hallinta" : "Managing multiple assistants"}
              </h2>
              <p className="text-gray-600 mb-4">
                {locale === "fi" 
                  ? "Kun yrityksesi kasvaa, saatat tarvita useita erikoistuneita avustajia eri tarkoituksiin:"
                  : "As your company grows, you may need multiple specialized assistants for different purposes:"
                }
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {locale === "fi" ? "Asiakastuki" : "Customer Support"}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {locale === "fi" 
                      ? "Käsittelee yleisiä kysymyksiä ja ongelmia"
                      : "Handles common questions and issues"
                    }
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {locale === "fi" ? "Myynti ja markkinointi" : "Sales & Marketing"}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {locale === "fi" 
                      ? "Auttaa potentiaalisia asiakkaita"
                      : "Helps potential customers"
                    }
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {locale === "fi" ? "Sisäinen viestintä" : "Internal Communication"}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {locale === "fi" 
                      ? "Tiimin viestintä ja tiedonjako"
                      : "Team communication and knowledge sharing"
                    }
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {locale === "fi" ? "Tuotekoulutus" : "Product Training"}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {locale === "fi" 
                      ? "Käyttäjien koulutus ja ohjeistus"
                      : "User training and guidance"
                    }
                  </p>
                </div>
              </div>

              {/* Placeholder for dashboard screenshot */}
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p className="mt-2 text-sm text-gray-500">
                  {locale === "fi" 
                    ? "Screenshot: Avustajien hallintadashboard"
                    : "Screenshot: Assistants management dashboard"
                  }
                </p>
              </div>
            </div>

            {/* Training and improvement */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Avustajien koulutus ja parantaminen" : "Training and improving assistants"}
              </h2>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {locale === "fi" ? "1. Tietopohjan laajentaminen" : "1. Expanding knowledge base"}
                </h3>
                <p className="text-gray-600 mb-3">
                  {locale === "fi" 
                    ? "Lisää jatkuvasti uutta sisältöä avustajiesi tietopohjaan:"
                    : "Continuously add new content to your assistants' knowledge base:"
                  }
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>{locale === "fi" ? "Uusimmat tuotetiedot ja päivitykset" : "Latest product information and updates"}</li>
                  <li>{locale === "fi" ? "Asiakaskysymykset ja vastaukset" : "Customer questions and responses"}</li>
                  <li>{locale === "fi" ? "Yrityspolitiikat ja prosessit" : "Company policies and processes"}</li>
                  <li>{locale === "fi" ? "Markkinointimateriaalit ja kampanjat" : "Marketing materials and campaigns"}</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {locale === "fi" ? "2. Vastauksien arviointi ja parantaminen" : "2. Evaluating and improving responses"}
                </h3>
                <p className="text-gray-600 mb-3">
                  {locale === "fi" 
                    ? "Seuraa avustajiesi suorituskykyä ja tee tarvittavia parannuksia:"
                    : "Monitor your assistants' performance and make necessary improvements:"
                  }
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>{locale === "fi" ? "Käyttäjien palaute ja arvostelut" : "User feedback and ratings"}</li>
                  <li>{locale === "fi" ? "Vastauksen tarkkuus ja hyödyllisyys" : "Response accuracy and helpfulness"}</li>
                  <li>{locale === "fi" ? "Brändiyhtenäisyyden tarkistus" : "Brand consistency verification"}</li>
                  <li>{locale === "fi" ? "Vastausajan optimointi" : "Response time optimization"}</li>
                </ul>
              </div>

              {/* Placeholder for training interface */}
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <p className="mt-2 text-sm text-gray-500">
                  {locale === "fi" 
                    ? "Screenshot: Avustajien koulutuskäyttöliittymä"
                    : "Screenshot: Assistants training interface"
                  }
                </p>
              </div>
            </div>

            {/* Performance monitoring */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Suorituskyvyn seuranta" : "Performance monitoring"}
              </h2>
              <p className="text-gray-600 mb-4">
                {locale === "fi" 
                  ? "Seuraa avustajiesi suorituskykyä seuraavilla avainmittareilla:"
                  : "Track your assistants' performance with these key metrics:"
                }
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    {locale === "fi" ? "Käyttäjätytyväisyys" : "User Satisfaction"}
                  </h4>
                  <p className="text-sm text-blue-700">
                    {locale === "fi" 
                      ? "Käyttäjien antamat arvostelut ja palaute"
                      : "User ratings and feedback"
                    }
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">
                    {locale === "fi" ? "Vastauksen tarkkuus" : "Response Accuracy"}
                  </h4>
                  <p className="text-sm text-green-700">
                    {locale === "fi" 
                      ? "Oikeiden vastauksien määrä"
                      : "Number of correct responses"
                    }
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-900 mb-2">
                    {locale === "fi" ? "Vastausaika" : "Response Time"}
                  </h4>
                  <p className="text-sm text-purple-700">
                    {locale === "fi" 
                      ? "Keskimääräinen vastausaika"
                      : "Average response time"
                    }
                  </p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-900 mb-2">
                    {locale === "fi" ? "Käyttöaste" : "Usage Rate"}
                  </h4>
                  <p className="text-sm text-orange-700">
                    {locale === "fi" 
                      ? "Avustajan käyttökerrat"
                      : "Assistant usage frequency"
                    }
                  </p>
                </div>
              </div>

              {/* Placeholder for analytics dashboard */}
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p className="mt-2 text-sm text-gray-500">
                  {locale === "fi" 
                    ? "Screenshot: Suorituskyvyn analytiikkadashboard"
                    : "Screenshot: Performance analytics dashboard"
                  }
                </p>
              </div>
            </div>

            {/* Brand consistency */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Brändiyhtenäisyyden varmistaminen" : "Ensuring brand consistency"}
              </h2>
              <p className="text-gray-600 mb-4">
                {locale === "fi" 
                  ? "Varmista, että kaikki avustajasi puhuvat yhtenäisellä äänellä:"
                  : "Ensure all your assistants speak with a consistent voice:"
                }
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-forest text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {locale === "fi" ? "Yhtenäiset brändiohjeistot" : "Unified brand guidelines"}
                    </h4>
                    <p className="text-gray-600">
                      {locale === "fi" 
                        ? "Käytä samaa brändiohjeistoa kaikille avustajille"
                        : "Use the same brand guidelines for all assistants"
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-forest text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {locale === "fi" ? "Keskusvalvonta" : "Centralized control"}
                    </h4>
                    <p className="text-gray-600">
                      {locale === "fi" 
                        ? "Hallitse kaikkia avustajia yhdestä paikasta"
                        : "Manage all assistants from one central location"
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-forest text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {locale === "fi" ? "Automaattinen synkronointi" : "Automatic synchronization"}
                    </h4>
                    <p className="text-gray-600">
                      {locale === "fi" 
                        ? "Päivitä brändiasetukset automaattisesti kaikille avustajille"
                        : "Automatically update brand settings across all assistants"
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Placeholder for brand settings */}
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                <p className="mt-2 text-sm text-gray-500">
                  {locale === "fi" 
                    ? "Screenshot: Brändiasetukset ja yhtenäisyysvalvonta"
                    : "Screenshot: Brand settings and consistency monitoring"
                  }
                </p>
              </div>
            </div>

            {/* Best practices */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Parhaat käytännöt" : "Best practices"}
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-forest pl-4">
                  <h4 className="font-semibold text-gray-900">
                    {locale === "fi" ? "Säännöllinen arviointi" : "Regular evaluation"}
                  </h4>
                  <p className="text-gray-600 mt-1">
                    {locale === "fi" 
                      ? "Arvioi avustajiesi suorituskykyä viikoittain ja tee tarvittavia parannuksia"
                      : "Evaluate your assistants' performance weekly and make necessary improvements"
                    }
                  </p>
                </div>
                
                <div className="border-l-4 border-forest pl-4">
                  <h4 className="font-semibold text-gray-900">
                    {locale === "fi" ? "Käyttäjien palaute" : "User feedback"}
                  </h4>
                  <p className="text-gray-600 mt-1">
                    {locale === "fi" 
                      ? "Kerää ja analysoi käyttäjien palautetta jatkuvasti"
                      : "Continuously collect and analyze user feedback"
                    }
                  </p>
                </div>
                
                <div className="border-l-4 border-forest pl-4">
                  <h4 className="font-semibold text-gray-900">
                    {locale === "fi" ? "A/B-testaus" : "A/B testing"}
                  </h4>
                  <p className="text-gray-600 mt-1">
                    {locale === "fi" 
                      ? "Testaa eri vastausstrategioita ja valitse parhaat"
                      : "Test different response strategies and choose the best ones"
                    }
                  </p>
                </div>
                
                <div className="border-l-4 border-forest pl-4">
                  <h4 className="font-semibold text-gray-900">
                    {locale === "fi" ? "Jatkuva oppiminen" : "Continuous learning"}
                  </h4>
                  <p className="text-gray-600 mt-1">
                    {locale === "fi" 
                      ? "Päivitä tietopohjaa ja koulutusta uusien trendien mukaan"
                      : "Update knowledge base and training based on new trends"
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* What's next */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Mitä seuraavaksi?" : "What's next?"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href={`/${locale}/help/analytics`} className="group">
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-forest hover:bg-gray-50 transition-colors">
                    <h3 className="font-semibold text-gray-900 group-hover:text-forest">
                      {locale === "fi" ? "Analytiikka ja raportointi" : "Analytics and reporting"}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {locale === "fi" 
                        ? "Syvällisempi analyysi avustajiesi suorituskyvystä"
                        : "Deeper analysis of your assistants' performance"
                      }
                    </p>
                  </div>
                </Link>
                <Link href={`/${locale}/help/integrations`} className="group">
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-forest hover:bg-gray-50 transition-colors">
                    <h3 className="font-semibold text-gray-900 group-hover:text-forest">
                      {locale === "fi" ? "Integraatiot ja API" : "Integrations and API"}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {locale === "fi" 
                        ? "Yhdistä avustajasi muihin työkaluihin"
                        : "Connect your assistants to other tools"
                      }
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Need help */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Tarvitsetko apua?" : "Need help?"}
              </h2>
              <p className="text-gray-600 mb-4">
                {locale === "fi" 
                  ? "Jos kohtaat ongelmia avustajiesi hallinnassa:"
                  : "If you encounter issues managing your assistants:"
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/${locale}/help/contact-support`}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-forest hover:bg-forest/90"
                >
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {locale === "fi" ? "Ota yhteyttä tukeen" : "Contact support"}
                </Link>
              </div>
            </div>
          </div>

          {/* Article Footer */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>
                {locale === "fi" 
                  ? "Viimeksi päivitetty: 15. tammikuuta 2024"
                  : "Last updated: January 15, 2024"
                }
              </span>
              <span>
                {locale === "fi" 
                  ? "Versio: 2.1.0"
                  : "Version: 2.1.0"
                }
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
