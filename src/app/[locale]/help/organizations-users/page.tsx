import { Metadata } from "next";
import { getTranslations } from "../../../../lib/i18n";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Organizations & User Management - Roles, Teams, Audits",
  description: "Create organizations, manage invites, roles, permissions, teams, and audit trails in Lyyli.ai.",
};

export default async function OrganizationsUsersPage({
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
                    {locale === "fi" ? "Organisaatiot ja käyttäjähallinta" : "Organizations & user management"}
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
                {locale === "fi" ? "15 min" : "15 min"}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === "fi" ? "Organisaatiot ja käyttäjähallinta" : "Organizations and User Management"}
            </h1>
            <p className="text-lg text-gray-600">
              {locale === "fi"
                ? "Organisaation luominen ja omistajuus, Kutsut, roolit, käyttöoikeusmalli, Tiimit/ryhmät ja käyttöoikeuksien periytyminen, Audit trail: kuka teki mitä ja milloin"
                : "Organization creation and ownership, Invites, roles, permission model, Teams/groups and permission inheritance, Audit trail: who did what and when"}
            </p>
          </div>

          <div className="p-8">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{locale === "fi" ? "Organisaation luominen ja omistajuus" : "Organization creation and ownership"}</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>{locale === "fi" ? "Perusta uusi organisaatio ja määritä omistaja" : "Create a new organization and set owner"}</li>
                <li>{locale === "fi" ? "Siirrä omistajuus tarvittaessa" : "Transfer ownership when needed"}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{locale === "fi" ? "Kutsut, roolit, käyttöoikeusmalli" : "Invites, roles, permission model"}</h2>
              <p className="text-gray-700 mb-2">{locale === "fi" ? "Kutsu käyttäjiä sähköpostilla, määritä roolit ja oikeudet." : "Invite users by email, assign roles and permissions."}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium text-gray-900 mb-1">{locale === "fi" ? "Admin" : "Admin"}</h3>
                  <p className="text-sm text-gray-700">{locale === "fi" ? "Täysi pääsy, käyttäjähallinta" : "Full access, user management"}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium text-gray-900 mb-1">{locale === "fi" ? "Manager" : "Manager"}</h3>
                  <p className="text-sm text-gray-700">{locale === "fi" ? "Tiimit, sisällöt, raportit" : "Teams, content, reports"}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium text-gray-900 mb-1">{locale === "fi" ? "User" : "User"}</h3>
                  <p className="text-sm text-gray-700">{locale === "fi" ? "Perusoikeudet, omat työt" : "Basic rights, own work"}</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{locale === "fi" ? "Tiimit/ryhmät ja oikeuksien periytyminen" : "Teams/groups and permission inheritance"}</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>{locale === "fi" ? "Peri oikeuksia organisaatiosta tiimeihin" : "Inherit permissions from org to teams"}</li>
                <li>{locale === "fi" ? "Yliaja tiimitasolla tarvittaessa" : "Override at team level when needed"}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{locale === "fi" ? "Audit trail: kuka teki mitä ja milloin" : "Audit trail: who did what and when"}</h2>
              <p className="text-gray-700">{locale === "fi" ? "Tarkastele tapahtumalokia ja suodata toiminnoittain, käyttäjittäin ja ajanjaksoittain." : "Review event logs filtered by actions, users, and time windows."}</p>
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


