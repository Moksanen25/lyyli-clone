import { TranslationKeys } from '../lib/i18n';
import Link from 'next/link';
import Image from 'next/image';

interface FooterProps {
  locale: string;
  translations: TranslationKeys;
  canonicalUrl?: string;
}

export default function Footer({ locale, translations: t, canonicalUrl }: FooterProps) {
  const baseUrl = 'https://lyyli.ai';
  const canonical = canonicalUrl || baseUrl;

  return (
    <footer className="bg-dark-gray text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logos/vaakalogo_lyyli_1500x500_px.png"
                alt="Lyyli.ai logo - AI Communication Assistant"
                width={96}
                height={32}
                className="h-8 w-auto brightness-0 invert"
              />
              <span className="heading-4 text-white">Lyyli</span>
            </div>
            <p className="body-text text-white opacity-80 mb-4">
              {t['footer.tagline']}
            </p>
            <div className="flex gap-4">
              <a 
                href="https://linkedin.com/company/lyyli-ai"
                aria-label="Follow Lyyli on LinkedIn"
                className="text-white opacity-60 hover:opacity-100 transition-opacity"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="https://twitter.com/lyyli_ai"
                aria-label="Follow Lyyli on Twitter"
                className="text-white opacity-60 hover:opacity-100 transition-opacity"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="heading-4 text-white mb-4">Product</h3>
            <nav>
              <ul className="space-y-2">
                <li>
                  <a href={`/${locale}/features`} className="body-text text-white opacity-80 hover:opacity-100 transition-opacity">
                    {t['nav.features']}
                  </a>
                </li>
                <li>
                  <a href="#roles" className="body-text text-white opacity-80 hover:opacity-100 transition-opacity">
                    For Teams
                  </a>
                </li>
                <li>
                  <a href={`/${locale}/pricing`} className="body-text text-white opacity-80 hover:opacity-100 transition-opacity">
                    {t['nav.pricing']}
                  </a>
                </li>
                <li>
                  <a href="/integrations" className="body-text text-white opacity-80 hover:opacity-100 transition-opacity">
                    {locale === 'fi' ? 'Integraatiot' : 'Integrations'}
                  </a>
                </li>
                <li>
                  <a href="/security" className="body-text text-white opacity-80 hover:opacity-100 transition-opacity">
                    {locale === 'fi' ? 'Tietoturva' : 'Security'}
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="heading-4 text-white mb-4">
              {locale === 'fi' ? 'Yritys' : 'Company'}
            </h3>
            <nav>
              <ul className="space-y-2">
                <li>
                  <a href={`/${locale}/about`} className="body-text text-white opacity-80 hover:opacity-100 transition-opacity">
                    {locale === 'fi' ? 'Tietoja meistä' : 'About Us'}
                  </a>
                </li>
                <li>
                  <a href="/careers" className="body-text text-white opacity-80 hover:opacity-100 transition-opacity">
                    {locale === 'fi' ? 'Ura' : 'Careers'}
                  </a>
                </li>
                <li>
                  <a href={`/${locale}/blog`} className="body-text text-white opacity-80 hover:opacity-100 transition-opacity">
                    Blog
                  </a>
                </li>
                <li>
                  <a href={`/${locale}/contact`} className="body-text text-white opacity-80 hover:opacity-100 transition-opacity">
                    {t['nav.contact']}
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="heading-4 text-white mb-4">
              {locale === 'fi' ? 'Tuki' : 'Support'}
            </h3>
            <nav>
              <ul className="space-y-2">
                <li>
                  <a href="/help" className="body-text text-white opacity-80 hover:opacity-100 transition-opacity">
                    {locale === 'fi' ? 'Ohje' : 'Help Center'}
                  </a>
                </li>
                <li>
                  <a href="/docs" className="body-text text-white opacity-80 hover:opacity-100 transition-opacity">
                    {locale === 'fi' ? 'Dokumentaatio' : 'Documentation'}
                  </a>
                </li>
                <li>
                  <a href="/api" className="body-text text-white opacity-80 hover:opacity-100 transition-opacity">
                    API
                  </a>
                </li>
                <li>
                  <a href="/status" className="body-text text-white opacity-80 hover:opacity-100 transition-opacity">
                    {locale === 'fi' ? 'Palvelun tila' : 'Service Status'}
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-white/20 pt-8">
          {/* Language & Legal Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            {/* Supported Languages */}
            <div>
              <h4 className="caption text-white opacity-80 mb-2 uppercase tracking-wide">
                {locale === 'fi' ? 'Tuetut kielet' : 'Supported Languages'}
              </h4>
              <div className="flex gap-4">
                <Link
                  href="/"
                  locale="en"
                  className="caption text-white opacity-60 hover:opacity-100 transition-opacity"
                  hrefLang="en"
                >
                  English
                </Link>
                <Link
                  href="/"
                  locale="fi"
                  className="caption text-white opacity-60 hover:opacity-100 transition-opacity"
                  hrefLang="fi"
                >
                  Suomi
                </Link>
              </div>
            </div>

            {/* Legal Links */}
            <nav>
              <ul className="flex gap-6">
                <li>
                  <a href={`/${locale}/privacy`} className="caption text-white opacity-60 hover:opacity-100 transition-opacity">
                    {locale === 'fi' ? 'Tietosuoja' : 'Privacy Policy'}
                  </a>
                </li>
                <li>
                  <a href="/terms" className="caption text-white opacity-60 hover:opacity-100 transition-opacity">
                    {locale === 'fi' ? 'Käyttöehdot' : 'Terms of Service'}
                  </a>
                </li>
                <li>
                  <a href={`/${locale}/cookies`} className="caption text-white opacity-60 hover:opacity-100 transition-opacity">
                    {locale === 'fi' ? 'Evästeet' : 'Cookie Policy'}
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Canonical URL & Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-col gap-1">
                          <p className="small-text text-white opacity-50">
              {t['footer.rights']}
            </p>
              <p className="small-text text-white opacity-40">
                {locale === 'fi' ? 'Kanoninen URL:' : 'Canonical URL:'} {canonical}
              </p>
            </div>
            
            {/* Compliance Badges */}
            <div className="flex items-center gap-4">
              <div className="caption text-white opacity-60">
                SOC 2 Type II
              </div>
              <div className="caption text-white opacity-60">
                GDPR Compliant
              </div>
              <div className="caption text-white opacity-60">
                ISO 27001
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
