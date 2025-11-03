import Link from "next/link";
import { memo } from "react";
import type { TranslationKeys } from "@/lib/i18n";
import ClientLocaleSwitcher from "@/components/ClientLocaleSwitcher";

interface MobileNavigationProps {
  isOpen: boolean;
  locale: string;
  translations: TranslationKeys;
  onLinkClick: () => void;
  mobileBorder: string;
  mobileHoverBg: string;
  textColor: string;
}

/**
 * Mobile Navigation Menu
 * Full mobile navigation with links and locale switcher
 */
const MobileNavigation = memo(({
  isOpen,
  locale,
  translations: t,
  onLinkClick,
  mobileBorder,
  mobileHoverBg,
  textColor,
}: MobileNavigationProps) => {
  return (
    <div
      id="mobile-menu"
      className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen
          ? `max-h-[60vh] opacity-100 mt-4 pb-4 border-t ${mobileBorder}`
          : "max-h-0 opacity-0 mt-0 pb-0 border-t-0"
      }`}
      style={{
        maxHeight: isOpen ? '60vh' : '0px',
        overflowY: isOpen ? 'auto' : 'hidden',
      }}
    >
      <nav
        className="flex flex-col gap-2 pt-4 px-2"
        role="navigation"
        aria-label="Mobile navigation"
      >
        {/* Main Navigation Links */}
        <div className="grid grid-cols-2 gap-2">
          <Link
            href={`/${locale}/features`}
            className={`block text-base ${textColor} ${mobileHoverBg} transition-colors duration-200 font-sans py-3 px-4 rounded-lg text-center`}
            onClick={onLinkClick}
          >
            {t["nav.features"]}
          </Link>
          <Link
            href={`/${locale}/pricing`}
            className={`block text-base ${textColor} ${mobileHoverBg} transition-colors duration-200 font-sans py-3 px-4 rounded-lg text-center`}
            onClick={onLinkClick}
          >
            {t["nav.pricing"]}
          </Link>
          <Link
            href={`/${locale}/about`}
            className={`block text-base ${textColor} ${mobileHoverBg} transition-colors duration-200 font-sans py-3 px-4 rounded-lg text-center`}
            onClick={onLinkClick}
          >
            {locale === "fi" ? "Tietoja meistä" : "About"}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className={`block text-base ${textColor} ${mobileHoverBg} transition-colors duration-200 font-sans py-3 px-4 rounded-lg text-center`}
            onClick={onLinkClick}
          >
            {t["nav.contact"]}
          </Link>
        </div>

        {/* Quick Links Row */}
        <div className="flex gap-2 pt-2">
          <Link
            href={`/${locale}/cybersecurity`}
            className={`flex-1 text-center text-sm ${textColor} ${mobileHoverBg} transition-colors duration-200 font-sans py-2 px-3 rounded-lg`}
            onClick={onLinkClick}
          >
            {t["nav.security"]}
          </Link>
          <Link
            href={`/${locale}/blog`}
            className={`flex-1 text-center text-sm ${textColor} ${mobileHoverBg} transition-colors duration-200 font-sans py-2 px-3 rounded-lg`}
            onClick={onLinkClick}
          >
            Blog
          </Link>
          <Link
            href={`/${locale}/help`}
            className={`flex-1 text-center text-sm ${textColor} ${mobileHoverBg} transition-colors duration-200 font-sans py-2 px-3 rounded-lg`}
            onClick={onLinkClick}
          >
            {locale === "fi" ? "Apu" : "Help"}
          </Link>
        </div>

        {/* Sign In CTA */}
        <div className={`border-t ${mobileBorder} pt-3 mt-2`}>
          <Link
            href="https://app.lyyli.ai"
            className="block w-full bg-forest text-white px-4 py-3 rounded-xl hover:bg-forest/90 transition-all duration-200 font-semibold text-base text-center font-sans shadow-md"
            aria-label="Sign in to Lyyli.ai"
            onClick={onLinkClick}
          >
            {locale === "fi" ? "Kirjaudu" : "Sign in"}
          </Link>
        </div>

        {/* Locale Switcher */}
        <div className={`border-t ${mobileBorder} pt-3 mt-2`}>
          <div className="flex justify-center items-center">
            <ClientLocaleSwitcher currentLocale={locale} />
          </div>
        </div>
      </nav>
    </div>
  );
});

export default MobileNavigation;

