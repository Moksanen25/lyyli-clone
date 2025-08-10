import { TranslationKeys } from '../lib/i18n';
import ClientLocaleSwitcher from './ClientLocaleSwitcher';
import Image from 'next/image';

interface HeaderProps {
  locale: string;
  translations: TranslationKeys;
}

export default function Header({ locale, translations: t }: HeaderProps) {

  return (
    <header className="bg-white border-b border-light-gray sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4" role="navigation" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-3" aria-label="Lyyli.ai homepage">
              <Image
                src="/images/logos/vaakalogo_lyyli_1500x500_px.png"
                alt="Lyyli.ai logo - AI Communication Assistant for Professional Service Organizations"
                width={120}
                height={40}
                priority
                className="h-10 w-auto"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-8" role="menubar">
              <li role="none">
                <a 
                  href={`/${locale}/features`}
                  className="body-text text-dark-gray hover:text-forest-green transition-colors"
                  role="menuitem"
                  aria-label="View features page"
                >
                  {t['nav.features']}
                </a>
              </li>
              <li role="none">
                <a 
                  href="#roles" 
                  className="body-text text-dark-gray hover:text-forest-green transition-colors"
                  role="menuitem"
                  aria-label="View target roles section"
                >
                  For Teams
                </a>
              </li>
              <li role="none">
                <a 
                  href={`/${locale}/pricing`}
                  className="body-text text-dark-gray hover:text-forest-green transition-colors"
                  role="menuitem"
                  aria-label="View pricing page"
                >
                  {t['nav.pricing']}
                </a>
              </li>
              <li role="none">
                <a 
                  href={`/${locale}/contact`}
                  className="body-text text-dark-gray hover:text-forest-green transition-colors"
                  role="menuitem"
                  aria-label="Contact page"
                >
                  {t['nav.contact']}
                </a>
              </li>
            </ul>

            {/* Locale Switcher */}
            <ClientLocaleSwitcher currentLocale={locale} />

            {/* CTA Button */}
            <a
              href="#cta"
              className="bg-forest-green text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors font-medium inline-flex items-center gap-2"
              aria-label="Start your free trial of Lyyli.ai"
            >
              {locale === 'fi' ? 'Aloita maksuton kokeilu' : 'Start Free Trial'}
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-light-gray transition-colors"
            aria-label="Open mobile navigation menu"
            aria-expanded="false"
            aria-controls="mobile-menu"
            type="button"
          >
            <svg 
              className="w-6 h-6 text-dark-gray" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu (Hidden by default - would need client-side JS to toggle) */}
        <div id="mobile-menu" className="lg:hidden hidden mt-4 pb-4 border-t border-light-gray">
          <nav className="flex flex-col gap-4 pt-4" role="navigation" aria-label="Mobile navigation">
            <a 
              href={`/${locale}/features`}
              className="body-text text-dark-gray hover:text-forest-green transition-colors"
              aria-label="View features page"
            >
              {t['nav.features']}
            </a>
            <a 
              href="#roles" 
              className="body-text text-dark-gray hover:text-forest-green transition-colors"
              aria-label="View target roles section"
            >
              For Teams
            </a>
            <a 
              href={`/${locale}/pricing`}
              className="body-text text-dark-gray hover:text-forest-green transition-colors"
              aria-label="View pricing page"
            >
              {t['nav.pricing']}
            </a>
            <a 
              href={`/${locale}/contact`}
              className="body-text text-dark-gray hover:text-forest-green transition-colors"
              aria-label="Contact page"
            >
              {t['nav.contact']}
            </a>
            
            <div className="flex items-center gap-4 pt-2">
              <ClientLocaleSwitcher currentLocale={locale} />
              <a
                href="#cta"
                className="bg-forest-green text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors font-medium inline-flex items-center gap-2"
                aria-label="Start your free trial of Lyyli.ai"
              >
                {locale === 'fi' ? 'Aloita maksuton kokeilu' : 'Start Free Trial'}
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </nav>
        </div>
      </nav>
    </header>
  );
}
