import { Metadata } from "next";
import { getTranslations } from "../../../../lib/i18n";
import Link from "next/link";

export const metadata: Metadata = {
  title: "UI Basics - Navigation, Search, Notifications, Shortcuts",
  description: "Learn the basics of the Lyyli.ai interface: navigation, views, search, filters, notifications, and keyboard shortcuts.",
};

export default async function UIBasicsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return (
    <div className="min-h-screen bg-gray-50">
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
                    {locale === "fi" ? "Käyttöliittymän perusteet" : "UI basics"}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {locale === "fi" ? "Aloittelija" : "Beginner"}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {locale === "fi" ? "8 min" : "8 min"}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{locale === "fi" ? "Käyttöliittymän perusteet" : "UI basics"}</h1>
            <p className="text-lg text-gray-600">{locale === "fi" ? "Navigointi, näkymät, haku ja suodattimet, ilmoitukset ja näppäinoikotiet." : "Navigation, views, search and filters, notifications, and keyboard shortcuts."}</p>
          </div>

          <div className="p-8">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{locale === "fi" ? "Navigointi ja näkymien rakenne" : "Navigation and view structure"}</h2>
              <p className="text-gray-700">{locale === "fi" ? "Tutustu päävalikkoon, sivupaneeleihin ja sisältönäkymiin." : "Explore main menu, side panels, and content views."}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{locale === "fi" ? "Haku, suodattimet ja tallennetut näkymät" : "Search, filters, and saved views"}</h2>
              <p className="text-gray-700">{locale === "fi" ? "Käytä hakua ja suodattimia, tallenna usein käytetyt näkymät." : "Use search and filters, save frequently used views."}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{locale === "fi" ? "Ilmoituspaneeli ja tehtäväjono" : "Notifications and task queue"}</h2>
              <p className="text-gray-700">{locale === "fi" ? "Seuraa tehtäviäsi ja järjestelmän ilmoituksia yhdestä paikasta." : "Track tasks and system notifications in one place."}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{locale === "fi" ? "Näppäinoikotiet" : "Keyboard shortcuts"}</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>{locale === "fi" ? "/ avaa haku" : "/ opens search"}</li>
                <li>{locale === "fi" ? "G sitten D = siirry dashboardiin" : "G then D = go to dashboard"}</li>
                <li>{locale === "fi" ? "? näyttää ohjeen" : "? shows help"}</li>
              </ul>
            </section>
          </div>

          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{locale === "fi" ? "Viimeksi päivitetty: 8. lokakuuta 2025" : "Last updated: Oct 8, 2025"}</span>
              <span>{locale === "fi" ? "Versio: 3.0" : "Version: 3.0"}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}


