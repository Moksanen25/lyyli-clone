import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Accounts & Authentication - Sign in, MFA, Profile',
  description:
    'Manage accounts, SSO/MFA, password resets, and profile settings in Lyyli.ai.',
};

export default async function AccountsAuthPage({
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
                      ? 'Tilit ja kirjautuminen'
                      : 'Accounts & Sign-in'}
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
                ? 'Tilit ja kirjautuminen'
                : 'Accounts and authentication'}
            </h1>
            <p className="text-xl text-[#333333] font-inter leading-relaxed">
              {locale === 'fi'
                ? 'Luo ja hallitse käyttäjätilejä, aseta monivaiheinen tunnistautuminen ja käytä SSO-kirjautumista. Turvaa tilisi ja hallitse käyttöoikeuksia helposti.'
                : 'Create and manage user accounts, set up multi-factor authentication, and use SSO login. Secure your account and manage access rights easily.'}
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
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {locale === 'fi' ? 'Aloittelija' : 'Beginner'}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {locale === 'fi' ? '10 min' : '10 min'}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {locale === 'fi'
                ? 'Tilit ja kirjautuminen'
                : 'Accounts and Login'}
            </h1>
            <p className="text-lg text-gray-600">
              {locale === 'fi'
                ? 'Tilin luonti, aktivointi ja vahvistus, SSO/MFA: miten otetaan käyttöön, Salasanan nollaus ja lukituksen avaus, Profiiliasetukset ja ilmoitukset'
                : 'Account creation, activation and verification, SSO/MFA: how to enable, Password reset and unlock, Profile settings and notifications'}
            </p>
          </div>

          {/* Article Body */}
          <div className="p-8">
            {/* Tilin luonti, aktivointi ja vahvistus */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                {locale === 'fi'
                  ? 'Tilin luonti, aktivointi ja vahvistus'
                  : 'Create, activate and verify account'}
              </h2>
              <ol className="list-decimal list-inside text-gray-700 space-y-1">
                <li>
                  {locale === 'fi'
                    ? 'Luo tili sähköpostilla tai SSO:lla'
                    : 'Create an account with email or SSO'}
                </li>
                <li>
                  {locale === 'fi'
                    ? 'Vahvista sähköposti vahvistuslinkistä'
                    : 'Verify email via confirmation link'}
                </li>
                <li>
                  {locale === 'fi'
                    ? 'Aktivoi käyttäjä organisaatiossa'
                    : 'Activate user in your organization'}
                </li>
              </ol>
            </section>

            {/* SSO/MFA: miten otetaan käyttöön */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                SSO/MFA
              </h2>
              <p className="text-gray-700 mb-3">
                {locale === 'fi'
                  ? 'SSO ja monivaiheinen tunnistautuminen (MFA) parantavat tietoturvaa.'
                  : 'SSO and multi-factor authentication (MFA) improve security.'}
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>
                  {locale === 'fi'
                    ? 'Aseta SSO (Microsoft/Google) ylläpito-paneelista'
                    : 'Configure SSO (Microsoft/Google) from admin'}
                </li>
                <li>
                  {locale === 'fi'
                    ? 'Ota MFA käyttöön (sovellus tai SMS)'
                    : 'Enable MFA (auth app or SMS)'}
                </li>
                <li>
                  {locale === 'fi'
                    ? 'Pakota 2FA admin-käyttäjille'
                    : 'Enforce 2FA for admin users'}
                </li>
              </ul>
            </section>

            {/* Salasanan nollaus ja lukituksen avaus */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                {locale === 'fi'
                  ? 'Salasanan nollaus ja lukituksen avaus'
                  : 'Password reset and unlock'}
              </h2>
              <p className="text-gray-700">
                {locale === 'fi'
                  ? 'Aloita nollaus kirjautumissivulta, seuraa sähköpostiohjeita. Lukituksen voi avata ylläpidosta.'
                  : 'Start reset from the sign-in page and follow email instructions. Unlocks can be performed by admins.'}
              </p>
            </section>

            {/* Profiiliasetukset ja ilmoitukset */}
            <section className="mb-2">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                {locale === 'fi'
                  ? 'Profiiliasetukset ja ilmoitukset'
                  : 'Profile settings and notifications'}
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>
                  {locale === 'fi'
                    ? 'Nimi, kieli ja aikavyöhyke'
                    : 'Name, language and timezone'}
                </li>
                <li>
                  {locale === 'fi'
                    ? 'Sähköposti- ja in-app-ilmoitukset'
                    : 'Email and in‑app notifications'}
                </li>
                <li>
                  {locale === 'fi'
                    ? 'Turva-asetukset (MFA, laitteet)'
                    : 'Security settings (MFA, devices)'}
                </li>
              </ul>
            </section>
          </div>

          {/* Article Footer */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>
                {locale === 'fi'
                  ? 'Viimeksi päivitetty: 8. lokakuuta 2025'
                  : 'Last updated: Oct 8, 2025'}
              </span>
              <span>{locale === 'fi' ? 'Versio: 3.0' : 'Version: 3.0'}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
