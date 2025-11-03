import Link from "next/link";
import { memo, useRef } from "react";
import type { TranslationKeys } from "@/lib/i18n";
import ClientLocaleSwitcher from "@/components/ClientLocaleSwitcher";
import NavigationDropdown, { type DropdownLink } from "./NavigationDropdown";

interface DesktopNavigationProps {
  locale: string;
  translations: TranslationKeys;
  activeDropdown: string | null;
  onOpenDropdown: (name: string) => void;
  onCloseDropdown: (name: string) => void;
  onKeepDropdownOpen: (name: string) => void;
  onDropdownMouseLeave: (name: string) => void;
  dropdownRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  textColor: string;
  hoverTextColor: string;
  dropdownBg: string;
  dropdownBorder: string;
  hoverBg: string;
}

/**
 * Desktop Navigation Component
 * Main navigation for desktop screens with dropdowns
 */
const DesktopNavigation = memo(({
  locale,
  translations: t,
  activeDropdown,
  onOpenDropdown,
  onCloseDropdown,
  onKeepDropdownOpen,
  onDropdownMouseLeave,
  dropdownRefs,
  textColor,
  hoverTextColor,
  dropdownBg,
  dropdownBorder,
  hoverBg,
}: DesktopNavigationProps) => {
  // Features dropdown links
  const featuresLinks: DropdownLink[] = [
    { href: `/${locale}/features`, label: t["nav.features"] },
    { href: "", label: "", isDivider: true },
    {
      href: `/${locale}/features#ai-automation`,
      label: locale === 'fi' ? 'AI-automaatio' : 'AI Automation',
    },
    {
      href: `/${locale}/features#governance-compliance`,
      label: locale === 'fi' ? 'Hallinta & Compliance' : 'Governance & Compliance',
    },
    {
      href: `/${locale}/features#security-gdpr`,
      label: locale === 'fi' ? 'Tietoturva & GDPR' : 'Security & GDPR',
    },
    {
      href: `/${locale}/features#multilingual`,
      label: locale === 'fi' ? 'Monikielisyys' : 'Multilingual',
    },
    {
      href: `/${locale}/features#integrations`,
      label: locale === 'fi' ? 'Integraatiot' : 'Integrations',
    },
    { href: "", label: "", isDivider: true },
    { href: `/${locale}/cybersecurity`, label: t["nav.security"] },
  ];

  // About dropdown links
  const aboutLinks: DropdownLink[] = [
    { href: `/${locale}/about`, label: locale === "fi" ? "Tietoja meistä" : "About" },
    { href: `/${locale}/blog`, label: "Blog" },
  ];

  // Contact dropdown links
  const contactLinks: DropdownLink[] = [
    { href: `/${locale}/contact`, label: t["nav.contact"] },
    { href: `/${locale}/help`, label: locale === "fi" ? "Apu ja tuki" : "Help & Support" },
  ];

  return (
    <div className="hidden lg:flex items-center gap-8">
      {/* Features Dropdown */}
      <NavigationDropdown
        label={t["nav.features"]}
        links={featuresLinks}
        isOpen={activeDropdown === 'features'}
        onMouseEnter={() => onOpenDropdown('features')}
        onMouseLeave={() => onDropdownMouseLeave('features')}
        onDropdownMouseEnter={() => onKeepDropdownOpen('features')}
        onDropdownMouseLeave={() => onCloseDropdown('features')}
        dropdownRef={(el) => {
          dropdownRefs.current['features'] = el;
        }}
        textColor={textColor}
        hoverTextColor={hoverTextColor}
        dropdownBg={dropdownBg}
        dropdownBorder={dropdownBorder}
        hoverBg={hoverBg}
      />

      {/* Pricing */}
      <Link
        href={`/${locale}/pricing`}
        className={`text-base ${textColor} ${hoverTextColor} transition-colors duration-200 font-sans`}
      >
        {t["nav.pricing"]}
      </Link>

      {/* About Us Dropdown */}
      <NavigationDropdown
        label={locale === "fi" ? "Tietoja meistä" : "About"}
        links={aboutLinks}
        isOpen={activeDropdown === 'about'}
        onMouseEnter={() => onOpenDropdown('about')}
        onMouseLeave={() => onDropdownMouseLeave('about')}
        onDropdownMouseEnter={() => onKeepDropdownOpen('about')}
        onDropdownMouseLeave={() => onCloseDropdown('about')}
        dropdownRef={(el) => {
          dropdownRefs.current['about'] = el;
        }}
        textColor={textColor}
        hoverTextColor={hoverTextColor}
        dropdownBg={dropdownBg}
        dropdownBorder={dropdownBorder}
        hoverBg={hoverBg}
      />

      {/* Contact Dropdown */}
      <NavigationDropdown
        label={t["nav.contact"]}
        links={contactLinks}
        isOpen={activeDropdown === 'contact'}
        onMouseEnter={() => onOpenDropdown('contact')}
        onMouseLeave={() => onDropdownMouseLeave('contact')}
        onDropdownMouseEnter={() => onKeepDropdownOpen('contact')}
        onDropdownMouseLeave={() => onCloseDropdown('contact')}
        dropdownRef={(el) => {
          dropdownRefs.current['contact'] = el;
        }}
        textColor={textColor}
        hoverTextColor={hoverTextColor}
        dropdownBg={dropdownBg}
        dropdownBorder={dropdownBorder}
        hoverBg={hoverBg}
      />

      {/* Right side controls */}
      <div className="flex items-center gap-4 ml-4">
        {/* Locale Switcher */}
        <ClientLocaleSwitcher currentLocale={locale} />

        {/* CTA Button */}
        <Link
          href="https://app.lyyli.ai"
          className="bg-forest text-white px-6 py-3 rounded-xl hover:bg-forest/90 hover:shadow-lg transition-all duration-200 font-medium inline-flex items-center gap-2 font-sans shadow-md"
          aria-label="Sign in to Lyyli.ai"
        >
          {locale === "fi" ? "Kirjaudu" : "Sign in"}
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
});

export default DesktopNavigation;

