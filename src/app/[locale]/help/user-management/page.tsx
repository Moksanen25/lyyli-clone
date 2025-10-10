import { Metadata } from "next";
import { getTranslations } from "../../../../lib/i18n";
import Link from "next/link";

export const metadata: Metadata = {
  title: "User Management & Permissions - Team Collaboration Guide",
  description: "Learn how to manage team members, set permissions, and control access to your Lyyli.ai workspace for effective collaboration.",
};

export default async function UserManagementPage({
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
                    {locale === "fi" ? "Käyttäjien hallinta" : "User Management"}
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
                {locale === "fi" ? "12 min" : "12 min"}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === "fi" 
                ? "Käyttäjien hallinta ja oikeudet"
                : "User Management & Permissions"
              }
            </h1>
            <p className="text-xl text-gray-600">
              {locale === "fi" 
                ? "Opi hallitsemaan tiimisi jäseniä, asettamaan oikeuksia ja kontrolloimaan pääsyä työtilaan"
                : "Learn how to manage team members, set permissions, and control access to your workspace for effective collaboration."
              }
            </p>
          </div>

          {/* Article Body */}
          <div className="p-8">
            {/* Quick Actions */}
            <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h2 className="text-lg font-semibold text-blue-900 mb-3">
                {locale === "fi" ? "Nopeat toiminnot" : "Quick Actions"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Link 
                  href={`/${locale}/contact`}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  {locale === "fi" ? "Lisää käyttäjä" : "Add User"}
                </Link>
                <Link 
                  href={`/${locale}/contact`}
                  className="inline-flex items-center px-4 py-2 bg-white text-blue-600 text-sm font-medium rounded-md border border-blue-200 hover:bg-blue-50 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {locale === "fi" ? "Hallitse oikeuksia" : "Manage Permissions"}
                </Link>
                <Link 
                  href={`/${locale}/contact`}
                  className="inline-flex items-center px-4 py-2 bg-white text-blue-600 text-sm font-medium rounded-md border border-blue-200 hover:bg-blue-50 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  {locale === "fi" ? "Tietoturva" : "Security"}
                </Link>
              </div>
            </div>

            {/* User Roles Overview */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {locale === "fi" ? "Käyttäjäroolit ja oikeudet" : "User Roles & Permissions"}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Owner Role */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {locale === "fi" ? "Omistaja" : "Owner"}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {locale === "fi" ? "Täydet oikeudet" : "Full access"}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {locale === "fi" ? "Hallitsee kaikkia asetuksia" : "Manage all settings"}
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {locale === "fi" ? "Lisää/poista käyttäjiä" : "Add/remove users"}
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {locale === "fi" ? "Hallitsee laskutusta" : "Manage billing"}
                    </li>
                  </ul>
                </div>

                {/* Admin Role */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {locale === "fi" ? "Ylläpitäjä" : "Admin"}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {locale === "fi" ? "Laajat oikeudet" : "Extended access"}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {locale === "fi" ? "Hallitsee käyttäjiä" : "Manage users"}
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {locale === "fi" ? "Hallitsee sisältöä" : "Manage content"}
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {locale === "fi" ? "Raportit ja analytiikka" : "Reports & analytics"}
                    </li>
                  </ul>
                </div>

                {/* Editor Role */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {locale === "fi" ? "Muokkaaja" : "Editor"}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {locale === "fi" ? "Sisällön hallinta" : "Content management"}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {locale === "fi" ? "Luo ja muokkaa sisältöä" : "Create & edit content"}
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {locale === "fi" ? "Hallitsee avustajia" : "Manage assistants"}
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {locale === "fi" ? "Käyttää analytiikkaa" : "Access analytics"}
                    </li>
                  </ul>
                </div>

                {/* Viewer Role */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {locale === "fi" ? "Katsoja" : "Viewer"}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {locale === "fi" ? "Vain katselu" : "View only"}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {locale === "fi" ? "Katsoo sisältöä" : "View content"}
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {locale === "fi" ? "Käyttää avustajia" : "Use assistants"}
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      {locale === "fi" ? "Ei muokkausoikeuksia" : "No editing rights"}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Common Tasks */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {locale === "fi" ? "Yleisimmät toiminnot" : "Common Tasks"}
              </h2>
              
              <div className="space-y-6">
                {/* Adding Users */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {locale === "fi" ? "Käyttäjien lisääminen" : "Adding New Users"}
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      {locale === "fi" ? "Ohjeet:" : "Instructions:"}
                    </h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                      <li>{locale === "fi" ? "Mene tiimiasetuksiin" : "Go to Team Settings"}</li>
                      <li>{locale === "fi" ? "Klikkaa 'Lisää käyttäjä'" : "Click 'Add User'"}</li>
                      <li>{locale === "fi" ? "Syötä sähköpostiosoite" : "Enter email address"}</li>
                      <li>{locale === "fi" ? "Valitse rooli" : "Select role"}</li>
                      <li>{locale === "fi" ? "Lähetä kutsu" : "Send invitation"}</li>
                    </ol>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-2">
                      {locale === "fi" ? "Vinkki:" : "Tip:"}
                    </h4>
                    <p className="text-sm text-blue-800">
                      {locale === "fi"
                        ? "Käyttäjät saavat automaattisesti sähköpostikutsun. He voivat hyväksyä kutsun ja luoda salasanansa."
                        : "Users automatically receive an email invitation. They can accept the invite and create their own password."
                      }
                    </p>
                  </div>
                </div>

                {/* Managing Permissions */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {locale === "fi" ? "Oikeuksien hallinta" : "Managing Permissions"}
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      {locale === "fi" ? "Mitä voit hallita:" : "What you can manage:"}
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• {locale === "fi" ? "Käyttäjän rooli" : "User role"}</li>
                      <li>• {locale === "fi" ? "Projektikohtaiset oikeudet" : "Project-specific permissions"}</li>
                      <li>• {locale === "fi" ? "Pääsy tietyihin ominaisuuksiin" : "Access to specific features"}</li>
                      <li>• {locale === "fi" ? "Tietojen näkyvyys" : "Data visibility"}</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
                    <h4 className="font-medium text-yellow-900 mb-2">
                      {locale === "fi" ? "Tärkeää:" : "Important:"}
                    </h4>
                    <p className="text-sm text-yellow-800">
                      {locale === "fi"
                        ? "Muutokset oikeuksiin tulevat voimaan välittömästi. Ole varovainen muuttaessasi admin-oikeuksia."
                        : "Permission changes take effect immediately. Be careful when modifying admin rights."
                      }
                    </p>
                  </div>
                </div>

                {/* Removing Users */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {locale === "fi" ? "Käyttäjien poistaminen" : "Removing Users"}
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      {locale === "fi" ? "Prosessi:" : "Process:"}
                    </h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                      <li>{locale === "fi" ? "Mene käyttäjän profiliin" : "Go to user profile"}</li>
                      <li>{locale === "fi" ? "Klikkaa 'Poista käyttäjä'" : "Click 'Remove User'"}</li>
                      <li>{locale === "fi" ? "Vahvista toiminto" : "Confirm action"}</li>
                      <li>{locale === "fi" ? "Valitse tietojen käsittely" : "Choose data handling"}</li>
                    </ol>
                  </div>
                  <div className="bg-red-50 p-4 rounded-md border border-red-200">
                    <h4 className="font-medium text-red-900 mb-2">
                      {locale === "fi" ? "Varoitus:" : "Warning:"}
                    </h4>
                    <p className="text-sm text-red-800">
                      {locale === "fi"
                        ? "Käyttäjän poistaminen on peruuttamaton. Tietojen säilyttäminen on suositeltavaa."
                        : "Removing a user is irreversible. Preserving data is recommended."
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Best Practices */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {locale === "fi" ? "Tietoturvan parhaat käytännöt" : "Security Best Practices"}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">
                    {locale === "fi" ? "Suositeltavaa" : "Recommended"}
                  </h3>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li>• {locale === "fi" ? "Käytä vähimmäisprivilegiä" : "Use least privilege principle"}</li>
                    <li>• {locale === "fi" ? "Tarkista oikeudet säännöllisesti" : "Review permissions regularly"}</li>
                    <li>• {locale === "fi" ? "Käytä kaksivaiheista tunnistusta" : "Enable two-factor authentication"}</li>
                    <li>• {locale === "fi" ? "Kirjaudu ulos yhteisistä laitteista" : "Log out from shared devices"}</li>
                  </ul>
                </div>
                
                <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                  <h3 className="text-lg font-semibold text-red-900 mb-3">
                    {locale === "fi" ? "Vältä" : "Avoid"}
                  </h3>
                  <ul className="space-y-2 text-sm text-red-800">
                    <li>• {locale === "fi" ? "Liian laajat oikeudet" : "Overly broad permissions"}</li>
                    <li>• {locale === "fi" ? "Salasanojen jakaminen" : "Sharing passwords"}</li>
                    <li>• {locale === "fi" ? "Käyttäjätunnusten jakaminen" : "Sharing user accounts"}</li>
                    <li>• {locale === "fi" ? "Vanhojen käyttäjien jättäminen" : "Leaving old users active"}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Team Collaboration Tips */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {locale === "fi" ? "Tiimityön vinkkejä" : "Team Collaboration Tips"}
              </h2>
              
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">
                      {locale === "fi" ? "Roolien määrittely" : "Role Definition"}
                    </h3>
                    <ul className="space-y-2 text-sm text-blue-800">
                      <li>• {locale === "fi" ? "Selkeät vastuualueet" : "Clear responsibilities"}</li>
                      <li>• {locale === "fi" ? "Hierarkkinen rakenne" : "Hierarchical structure"}</li>
                      <li>• {locale === "fi" ? "Koulutus ja tuki" : "Training and support"}</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">
                      {locale === "fi" ? "Kommunikaatio" : "Communication"}
                    </h3>
                    <ul className="space-y-2 text-sm text-blue-800">
                      <li>• {locale === "fi" ? "Säännölliset tapaamiset" : "Regular meetings"}</li>
                      <li>• {locale === "fi" ? "Keskustelukanavat" : "Communication channels"}</li>
                      <li>• {locale === "fi" ? "Dokumentointi" : "Documentation"}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Need More Help */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg border border-blue-200">
              <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                {locale === "fi" ? "Tarvitsetko lisäapua?" : "Need more help?"}
              </h2>
              <p className="text-blue-800 mb-6">
                {locale === "fi"
                  ? "Jos sinulla on kysymyksiä käyttäjien hallinnasta tai oikeuksista, ota yhteyttä asiakastukeemme."
                  : "If you have questions about user management or permissions, contact our customer support."
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link 
                  href={`/${locale}/contact`}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  {locale === "fi" ? "Ota yhteyttä tukeen" : "Contact Support"}
                </Link>
                <Link 
                  href={`/${locale}/help`}
                  className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {locale === "fi" ? "Etsi lisää apua" : "Search More Help"}
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
