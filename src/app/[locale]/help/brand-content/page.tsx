import type { Metadata } from "next";
import { getTranslations } from "../../../../lib/i18n";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Brand & Content Settings - Style, Languages, Policies",
  description: "Configure brand colors, typography, logos, tone of voice, languages, translation logic, and content policies.",
};

export default async function BrandContentPage({
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
                    {locale === "fi" ? "Brändi ja sisältöasetukset" : "Brand & content settings"}
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
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {locale === "fi" ? "Keskitaso" : "Intermediate"}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {locale === "fi" ? "12 min" : "12 min"}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{locale === "fi" ? "Brändi ja sisältöasetukset" : "Brand and Content Settings"}</h1>
            <p className="text-lg text-gray-600">{locale === "fi" ? "Brändivärit, typografia, logot, Tyyliohje ja sävy, Kieliasetukset ja käännöslogiikka, Sisältöpolitiikat ja hyväksyntäketjut" : "Brand colors, typography, logos, Style guide and tone, Language settings and translation logic, Content policies and approval chains"}</p>
          </div>

        <div className="p-8">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{locale === "fi" ? "Brändivärit, typografia, logot" : "Brand colors, typography, logos"}</h2>
            <p className="text-gray-700">{locale === "fi" ? "Aseta visuaalinen identiteetti koko työtilaan." : "Set visual identity across the workspace."}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{locale === "fi" ? "Tyyliohje ja sävy" : "Style guide and tone"}</h2>
            <p className="text-gray-700">{locale === "fi" ? "Määrittele brändin äänensävy ja viestintätyyli." : "Define brand voice and communication style."}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{locale === "fi" ? "Kieliasetukset ja käännöslogiikka" : "Languages and translation logic"}</h2>
            <p className="text-gray-700">{locale === "fi" ? "Hallitse kieliä, oletuskieliä ja käännösten prioriteetteja." : "Manage languages, defaults, and translation priorities."}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{locale === "fi" ? "Sisältöpolitiikat ja hyväksyntäketjut" : "Content policies and approval chains"}</h2>
            <p className="text-gray-700">{locale === "fi" ? "Määritä julkaisusäännöt ja hyväksyntäprosessit eri tiimeille." : "Define publishing rules and approval processes per team."}</p>
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


