import { Metadata } from "next";
import { getTranslations } from "../../../../lib/i18n";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Security & Compliance - Protect Your Data with Lyyli.ai",
  description: "Learn about Lyyli.ai security features, GDPR compliance, data protection, and best practices for keeping your information safe.",
};

export default async function SecurityPage({
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
                    {locale === "fi" ? "Tietoturva" : "Security"}
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
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                {locale === "fi" ? "Kriittinen" : "Critical"}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {locale === "fi" ? "35 min" : "35 min"}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === "fi" 
                ? "Tietoturva ja yhteensopivuus"
                : "Security and compliance"
              }
            </h1>
            <p className="text-xl text-gray-600">
              {locale === "fi" 
                ? "Opi Lyyli.ai:n tietoturvaominaisuuksista, GDPR-yhteensopivuudesta ja parhaista käytännöistä tietojesi suojaamiseksi"
                : "Learn about Lyyli.ai security features, GDPR compliance, and best practices for protecting your data."
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
                      ? "Tietoturvaominaisuudet ja -arkkitehtuuri"
                      : "Security features and architecture"
                    }
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">
                    {locale === "fi" 
                      ? "GDPR ja tietosuoja"
                      : "GDPR and data privacy"
                    }
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">
                    {locale === "fi" 
                      ? "Käyttöoikeudet ja pääsynhallinta"
                      : "Permissions and access control"
                    }
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">
                    {locale === "fi" 
                      ? "Tietoturvaparhaat käytännöt"
                      : "Security best practices"
                    }
                  </span>
                </li>
              </ul>
            </div>

            {/* Security architecture */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Tietoturvaarkkitehtuuri" : "Security architecture"}
              </h2>
              <p className="text-gray-600 mb-4">
                {locale === "fi" 
                  ? "Lyyli.ai on rakennettu tiukilla tietoturvaperiaatteilla:"
                  : "Lyyli.ai is built with strict security principles:"
                }
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    {locale === "fi" ? "Salaus" : "Encryption"}
                  </h4>
                  <p className="text-sm text-blue-700">
                    {locale === "fi" 
                      ? "Kaikki tiedot salataan TLS 1.3 -protokollalla ja AES-256-algoritmilla"
                      : "All data encrypted with TLS 1.3 protocol and AES-256 algorithm"
                    }
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">
                    {locale === "fi" ? "Tietojen eristys" : "Data isolation"}
                  </h4>
                  <p className="text-sm text-green-700">
                    {locale === "fi" 
                      ? "Jokaisen asiakkaan tiedot ovat täysin eristettyjä"
                      : "Each customer's data is completely isolated"
                    }
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-900 mb-2">
                    {locale === "fi" ? "Varmuuskopiot" : "Backups"}
                  </h4>
                  <p className="text-sm text-purple-700">
                    {locale === "fi" 
                      ? "Automaattiset päivittäiset varmuuskopiot useilla sijainneilla"
                      : "Automatic daily backups in multiple locations"
                    }
                  </p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-900 mb-2">
                    {locale === "fi" ? "Tietoturvavalvonta" : "Security monitoring"}
                  </h4>
                  <p className="text-sm text-orange-700">
                    {locale === "fi" 
                      ? "24/7 tietoturvavalvonta ja uhkien tunnistus"
                      : "24/7 security monitoring and threat detection"
                    }
                  </p>
                </div>
              </div>

              {/* Placeholder for security architecture */}
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <p className="mt-2 text-sm text-gray-500">
                  {locale === "fi" 
                    ? "Screenshot: Tietoturvaarkkitehtuurin kaavio"
                    : "Screenshot: Security architecture diagram"
                  }
                </p>
              </div>
            </div>

            {/* GDPR compliance */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "GDPR-yhteensopivuus" : "GDPR compliance"}
              </h2>
              <p className="text-gray-600 mb-4">
                {locale === "fi" 
                  ? "Lyyli.ai on täysin yhteensopiva EU:n tietosuoja-asetuksen (GDPR) kanssa:"
                  : "Lyyli.ai is fully compliant with EU General Data Protection Regulation (GDPR):"
                }
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-forest text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {locale === "fi" ? "Oikeus tietojen poistamiseen" : "Right to erasure"}
                    </h4>
                    <p className="text-gray-600">
                      {locale === "fi" 
                        ? "Asiakkaat voivat pyytää henkilötietojensa poistamista milloin tahansa"
                        : "Customers can request deletion of their personal data at any time"
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
                      {locale === "fi" ? "Tietojen siirto" : "Data portability"}
                    </h4>
                    <p className="text-gray-600">
                      {locale === "fi" 
                        ? "Asiakkaat voivat siirtää tietonsa muihin järjestelmiin"
                        : "Customers can transfer their data to other systems"
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
                      {locale === "fi" ? "Tietojen käsittelyn läpinäkyvyys" : "Data processing transparency"}
                    </h4>
                    <p className="text-gray-600">
                      {locale === "fi" 
                        ? "Selkeät tiedot siitä, miten henkilötietoja käsitellään"
                        : "Clear information about how personal data is processed"
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-forest text-white rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {locale === "fi" ? "Suostumus" : "Consent"}
                    </h4>
                    <p className="text-gray-600">
                      {locale === "fi" 
                        ? "Henkilötietojen käsittely vaatii selkeän suostumuksen"
                        : "Processing personal data requires clear consent"
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Placeholder for GDPR settings */}
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="mt-2 text-sm text-gray-500">
                  {locale === "fi" 
                    ? "Screenshot: GDPR-asetukset ja suostumushallinta"
                    : "Screenshot: GDPR settings and consent management"
                  }
                </p>
              </div>
            </div>

            {/* Access control */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Käyttöoikeudet ja pääsynhallinta" : "Permissions and access control"}
              </h2>
              <p className="text-gray-600 mb-4">
                {locale === "fi" 
                  ? "Hallitse tiimisi pääsyä ja oikeuksia tarkasti:"
                  : "Control your team's access and permissions precisely:"
                }
              </p>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {locale === "fi" ? "Roolipohjainen pääsynhallinta" : "Role-based access control"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-red-50 rounded-lg p-4">
                    <h4 className="font-semibold text-red-900 mb-2">
                      {locale === "fi" ? "Admin" : "Admin"}
                    </h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• {locale === "fi" ? "Täysi pääsy kaikkiin toimintoihin" : "Full access to all features"}</li>
                      <li>• {locale === "fi" ? "Käyttäjien hallinta" : "User management"}</li>
                      <li>• {locale === "fi" ? "Järjestelmäasetukset" : "System settings"}</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-900 mb-2">
                      {locale === "fi" ? "Manager" : "Manager"}
                    </h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• {locale === "fi" ? "Avustajien hallinta" : "Assistant management"}</li>
                      <li>• {locale === "fi" ? "Raporttien katselu" : "View reports"}</li>
                      <li>• {locale === "fi" ? "Rajoitettu pääsy" : "Limited access"}</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 mb-2">
                      {locale === "fi" ? "User" : "User"}
                    </h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• {locale === "fi" ? "Perustoiminnot" : "Basic functions"}</li>
                      <li>• {locale === "fi" ? "Omat avustajat" : "Own assistants"}</li>
                      <li>• {locale === "fi" ? "Minimaalinen pääsy" : "Minimal access"}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {locale === "fi" ? "Kaksivaiheinen autentikaatio" : "Two-factor authentication"}
                </h3>
                <p className="text-gray-600 mb-3">
                  {locale === "fi" 
                    ? "Varmista tiliisi lisäturvallisuudella:"
                    : "Secure your account with additional security:"
                  }
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>{locale === "fi" ? "SMS-viestit tai autentikaattorisovellukset" : "SMS messages or authenticator apps"}</li>
                  <li>{locale === "fi" ? "Pakollinen kaikille admin-käyttäjille" : "Required for all admin users"}</li>
                  <li>{locale === "fi" ? "Varmuuskoodien varmistus" : "Backup code verification"}</li>
                  <li>{locale === "fi" ? "Automaattinen lukitus epäilyttävän toiminnan jälkeen" : "Automatic lockout after suspicious activity"}</li>
                </ul>
              </div>

              {/* Placeholder for access control */}
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <p className="mt-2 text-sm text-gray-500">
                  {locale === "fi" 
                    ? "Screenshot: Käyttöoikeuksien hallinta ja roolit"
                    : "Screenshot: Permission management and roles"
                  }
                </p>
              </div>
            </div>

            {/* Data protection */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Tietojen suojaus" : "Data protection"}
              </h2>
              <p className="text-gray-600 mb-4">
                {locale === "fi" 
                  ? "Tietojesi suojaus on meidän prioriteettimme:"
                  : "Protecting your data is our priority:"
                }
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    A
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {locale === "fi" ? "Tietojen salaus" : "Data encryption"}
                    </h4>
                    <p className="text-gray-600">
                      {locale === "fi" 
                        ? "Kaikki tiedot salataan sekä levossa että siirrossa"
                        : "All data encrypted both at rest and in transit"
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    B
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {locale === "fi" ? "Tietojen varmuuskopiointi" : "Data backup"}
                    </h4>
                    <p className="text-gray-600">
                      {locale === "fi" 
                        ? "Automaattiset varmuuskopiot useilla sijainneilla ja salattuna"
                        : "Automatic backups in multiple locations and encrypted"
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    C
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {locale === "fi" ? "Tietojen poisto" : "Data deletion"}
                    </h4>
                    <p className="text-gray-600">
                      {locale === "fi" 
                        ? "Turvallinen tietojen poisto kun ne eivät enää tarvita"
                        : "Secure data deletion when no longer needed"
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Placeholder for data protection */}
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
                <p className="mt-2 text-sm text-gray-500">
                  {locale === "fi" 
                    ? "Screenshot: Tietojen suojausasetukset ja varmuuskopiot"
                    : "Screenshot: Data protection settings and backups"
                  }
                </p>
              </div>
            </div>

            {/* Security best practices */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Tietoturvaparhaat käytännöt" : "Security best practices"}
              </h2>
              <p className="text-gray-600 mb-4">
                {locale === "fi" 
                  ? "Seuraa näitä vinkkejä varmistaaksesi tietojesi turvallisuuden:"
                  : "Follow these tips to ensure your data security:"
                }
              </p>
              
              <div className="space-y-4">
                <div className="border-l-4 border-forest pl-4">
                  <h4 className="font-semibold text-gray-900">
                    {locale === "fi" ? "Vahvat salasanat" : "Strong passwords"}
                  </h4>
                  <p className="text-gray-600 mt-1">
                    {locale === "fi" 
                      ? "Käytä vahvoja, ainutlaatuisia salasanoja ja vaihda niitä säännöllisesti"
                      : "Use strong, unique passwords and change them regularly"
                    }
                  </p>
                </div>
                
                <div className="border-l-4 border-forest pl-4">
                  <h4 className="font-semibold text-gray-900">
                    {locale === "fi" ? "Kaksivaiheinen autentikaatio" : "Two-factor authentication"}
                  </h4>
                  <p className="text-gray-600 mt-1">
                    {locale === "fi" 
                      ? "Ota käyttöön 2FA kaikille tärkeille tileille"
                      : "Enable 2FA for all important accounts"
                    }
                  </p>
                </div>
                
                <div className="border-l-4 border-forest pl-4">
                  <h4 className="font-semibold text-gray-900">
                    {locale === "fi" ? "Käyttöoikeuksien hallinta" : "Permission management"}
                  </h4>
                  <p className="text-gray-600 mt-1">
                    {locale === "fi" 
                      ? "Tarkista ja päivitä käyttöoikeuksia säännöllisesti"
                      : "Review and update permissions regularly"
                    }
                  </p>
                </div>
                
                <div className="border-l-4 border-forest pl-4">
                  <h4 className="font-semibold text-gray-900">
                    {locale === "fi" ? "Tietoturvakoulutus" : "Security training"}
                  </h4>
                  <p className="text-gray-600 mt-1">
                    {locale === "fi" 
                      ? "Kouluta tiimiäsi tietoturvaan ja uhkien tunnistamiseen"
                      : "Train your team on security and threat recognition"
                    }
                  </p>
                </div>
                
                <div className="border-l-4 border-forest pl-4">
                  <h4 className="font-semibold text-gray-900">
                    {locale === "fi" ? "Tietoturvavalvonta" : "Security monitoring"}
                  </h4>
                  <p className="text-gray-600 mt-1">
                    {locale === "fi" 
                      ? "Seuraa tietoturvatapahtumia ja reagoi epäilyttäviin toimintoihin"
                      : "Monitor security events and respond to suspicious activities"
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Compliance certifications */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Yhteensopivuussertifikaatit" : "Compliance certifications"}
              </h2>
              <p className="text-gray-600 mb-4">
                {locale === "fi" 
                  ? "Lyyli.ai on saanut seuraavat tietoturva- ja yhteensopivuussertifikaatit:"
                  : "Lyyli.ai has received the following security and compliance certifications:"
                }
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    {locale === "fi" ? "ISO 27001" : "ISO 27001"}
                  </h4>
                  <p className="text-sm text-blue-700">
                    {locale === "fi" 
                      ? "Tietoturvajärjestelmän hallinta"
                      : "Information security management system"
                    }
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">
                    {locale === "fi" ? "SOC 2 Type II" : "SOC 2 Type II"}
                  </h4>
                  <p className="text-sm text-green-700">
                    {locale === "fi" 
                      ? "Tietoturva, saatavuus ja käsittelyn eheys"
                      : "Security, availability, and processing integrity"
                    }
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-900 mb-2">
                    {locale === "fi" ? "GDPR" : "GDPR"}
                  </h4>
                  <p className="text-sm text-purple-700">
                    {locale === "fi" 
                      ? "EU:n tietosuoja-asetuksen noudattaminen"
                      : "EU data protection regulation compliance"
                    }
                  </p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-900 mb-2">
                    {locale === "fi" ? "CCPA" : "CCPA"}
                  </h4>
                  <p className="text-sm text-orange-700">
                    {locale === "fi" 
                      ? "Kalifornian tietosuoja-asetuksen noudattaminen"
                      : "California privacy law compliance"
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Incident response */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Tietoturvaongelmien käsittely" : "Security incident response"}
              </h2>
              <p className="text-gray-600 mb-4">
                {locale === "fi" 
                  ? "Jos epäilet tietoturvaongelmaa, toimi näin:"
                  : "If you suspect a security issue, act as follows:"
                }
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {locale === "fi" ? "Ongelman tunnistus" : "Issue identification"}
                    </h4>
                    <p className="text-gray-600">
                      {locale === "fi" 
                        ? "Tunnista ja dokumentoi ongelma mahdollisimman pian"
                        : "Identify and document the issue as soon as possible"
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {locale === "fi" ? "Välitön toiminta" : "Immediate action"}
                    </h4>
                    <p className="text-gray-600">
                      {locale === "fi" 
                        ? "Sulje epäilyttävät istunnot ja vaihda salasanat"
                        : "Close suspicious sessions and change passwords"
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {locale === "fi" ? "Ilmoitus" : "Reporting"}
                    </h4>
                    <p className="text-gray-600">
                      {locale === "fi" 
                        ? "Ilmoita ongelma tietoturvatiimille välittömästi"
                        : "Report the issue to the security team immediately"
                      }
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href={`/${locale}/help/contact-support`}
                  className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  {locale === "fi" ? "Ilmoita tietoturvaongelmasta" : "Report security issue"}
                </Link>
              </div>
            </div>

            {/* What's next */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {locale === "fi" ? "Mitä seuraavaksi?" : "What's next?"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href={`/${locale}/help/ai-assistants`} className="group">
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-forest hover:bg-gray-50 transition-colors">
                    <h3 className="font-semibold text-gray-900 group-hover:text-forest">
                      {locale === "fi" ? "Avustajien hallinta" : "Assistant management"}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {locale === "fi" 
                        ? "Opi hallitsemaan avustajiasi turvallisesti"
                        : "Learn to manage your assistants securely"
                      }
                    </p>
                  </div>
                </Link>
                <Link href={`/${locale}/help/integrations`} className="group">
                  <div className="p-4 border border-gray-200 rounded-lg hover:border-forest hover:bg-gray-50 transition-colors">
                    <h3 className="font-semibold text-gray-900 group-hover:text-forest">
                      {locale === "fi" ? "Integraatiot" : "Integrations"}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {locale === "fi" 
                        ? "Turvalliset integraatiot muihin järjestelmiin"
                        : "Secure integrations with other systems"
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
                  ? "Jos sinulla on kysymyksiä tietoturvasta tai yhteensopivuudesta:"
                  : "If you have questions about security or compliance:"
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
