"use client";

import { useState } from "react";
import { TranslationKeys } from "../lib/i18n";
import ClientLocaleSwitcher from "./ClientLocaleSwitcher";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";

interface HeaderProps {
  locale: string;
  translations: TranslationKeys;
}

export default function Header({ locale, translations: t }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-grayLight dark:border-gray-700 sticky top-0 z-50 shadow-soft dark:shadow-gray-900/50">
      <nav
        className="max-w-7xl mx-auto px-6 py-4"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="/"
              className="flex items-center gap-3"
              aria-label="Lyyli.ai homepage"
              onClick={closeMobileMenu}
            >
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
                  className="text-base text-foreground hover:text-forest transition-colors duration-200 font-sans"
                  role="menuitem"
                  aria-label="View features page"
                >
                  {t["nav.features"]}
                </a>
              </li>
              <li role="none">
                <a
                  href={`/${locale}/cybersecurity`}
                  className="text-base text-foreground hover:text-forest transition-colors duration-200 font-sans"
                  role="menuitem"
                  aria-label="View cybersecurity page"
                >
                  {t["nav.security"]}
                </a>
              </li>
              <li role="none">
                <a
                  href={`/${locale}/pricing`}
                  className="text-base text-foreground hover:text-forest transition-colors duration-200 font-sans"
                  role="menuitem"
                  aria-label="View pricing page"
                >
                  {t["nav.pricing"]}
                </a>
              </li>
              <li role="none">
                <a
                  href={`/${locale}/about`}
                  className="text-base text-foreground hover:text-forest transition-colors duration-200 font-sans"
                  role="menuitem"
                  aria-label="About us page"
                >
                  {locale === "fi" ? "Tietoja meistä" : "About"}
                </a>
              </li>
              <li role="none">
                <a
                  href={`/${locale}/blog`}
                  className="text-base text-foreground hover:text-forest transition-colors duration-200 font-sans"
                  role="menuitem"
                  aria-label="Blog page"
                >
                  Blog
                </a>
              </li>
              <li role="none">
                <a
                  href={`/${locale}/contact`}
                  className="text-base text-foreground hover:text-forest transition-colors duration-200 font-sans"
                  role="menuitem"
                  aria-label="Contact page"
                >
                  {t["nav.contact"]}
                </a>
              </li>
              <li role="none">
                <a
                  href={`/${locale}/help`}
                  className="text-base text-foreground hover:text-forest transition-colors duration-200 font-sans"
                  role="menuitem"
                  aria-label="Help and Support"
                >
                  {locale === "fi" ? "Apu ja tuki" : "Help & Support"}
                </a>
              </li>
            </ul>

            {/* Locale Switcher */}
            <ClientLocaleSwitcher currentLocale={locale} />

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* CTA Button - Following 10-layout rule: ensisijainen CTA "Get started" tai "Book a demo" */}
            <a
              href={`/${locale}/waitlist`}
              className="bg-forest text-white px-6 py-3 rounded-lg hover:bg-forest/90 hover:shadow-medium transition-all duration-200 font-medium inline-flex items-center gap-2 font-sans"
              aria-label="Join the waitlist for Lyyli.ai"
            >
              {locale === "fi" ? "Liity odotuslistalle" : "Join Waitlist"}
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-grayLight transition-colors duration-200"
            aria-label={isMobileMenuOpen ? "Close mobile navigation menu" : "Open mobile navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            type="button"
            onClick={toggleMobileMenu}
          >
            <svg
              className="w-6 h-6 text-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen 
              ? "max-h-[80vh] opacity-100 mt-4 pb-6 border-t border-grayLight" 
              : "max-h-0 opacity-0 mt-0 pb-0 border-t-0"
          }`}
          style={{
            maxHeight: isMobileMenuOpen ? '80vh' : '0px',
            overflowY: isMobileMenuOpen ? 'auto' : 'hidden'
          }}
        >
          <nav
            className="flex flex-col gap-4 pt-4 px-2"
            role="navigation"
            aria-label="Mobile navigation"
          >
            {/* Main Navigation Links */}
            <div className="space-y-1">
              <a
                href={`/${locale}/features`}
                className="block text-base text-foreground hover:text-forest transition-colors duration-200 font-sans py-3 px-4 rounded-lg hover:bg-grayLight/50"
                aria-label="View features page"
                onClick={closeMobileMenu}
              >
                {t["nav.features"]}
              </a>
              <a
                href={`/${locale}/cybersecurity`}
                className="block text-base text-foreground hover:text-forest transition-colors duration-200 font-sans py-3 px-4 rounded-lg hover:bg-grayLight/50"
                aria-label="View cybersecurity page"
                onClick={closeMobileMenu}
              >
                {t["nav.security"]}
              </a>
              <a
                href={`/${locale}/pricing`}
                className="block text-base text-foreground hover:text-forest transition-colors duration-200 font-sans py-3 px-4 rounded-lg hover:bg-grayLight/50"
                aria-label="View pricing page"
                onClick={closeMobileMenu}
              >
                {t["nav.pricing"]}
              </a>
              <a
                href={`/${locale}/about`}
                className="block text-base text-foreground hover:text-forest transition-colors duration-200 font-sans py-3 px-4 rounded-lg hover:bg-grayLight/50"
                aria-label="About us page"
                onClick={closeMobileMenu}
              >
                {locale === "fi" ? "Tietoja meistä" : "About"}
              </a>
              <a
                href={`/${locale}/blog`}
                className="block text-base text-foreground hover:text-forest transition-colors duration-200 font-sans py-3 px-4 rounded-lg hover:bg-grayLight/50"
                aria-label="Blog page"
                onClick={closeMobileMenu}
              >
                Blog
              </a>
              <a
                href={`/${locale}/contact`}
                className="block text-base text-foreground hover:text-forest transition-colors duration-200 font-sans py-3 px-4 rounded-lg hover:bg-grayLight/50"
                aria-label="Contact page"
                onClick={closeMobileMenu}
              >
                {t["nav.contact"]}
              </a>
              <a
                href={`/${locale}/help`}
                className="block text-base text-foreground hover:text-forest transition-colors duration-200 font-sans py-3 px-4 rounded-lg hover:bg-grayLight/50"
                aria-label="Help and Support"
                onClick={closeMobileMenu}
              >
                {locale === "fi" ? "Apu ja tuki" : "Help & Support"}
              </a>
            </div>

            {/* Prominent Waitlist CTA Section */}
            <div className="border-t border-grayLight pt-4 mt-2">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-forest mb-2">
                  {locale === "fi" ? "Oletko valmis aloittamaan?" : "Ready to get started?"}
                </h3>
                <p className="text-sm text-mediumGray mb-4">
                  {locale === "fi" ? "Liity odotuslistalle ja ole ensimmäisten joukossa" : "Join the waitlist and be among the first"}
                </p>
              </div>
              
              {/* Primary Waitlist Button */}
              <a
                href={`/${locale}/waitlist`}
                className="block w-full bg-forest text-white px-6 py-4 rounded-lg hover:bg-forest/90 hover:shadow-medium transition-all duration-200 font-semibold text-base inline-flex items-center justify-center gap-3 font-sans mb-3"
                aria-label="Join the waitlist for Lyyli.ai"
                onClick={closeMobileMenu}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {locale === "fi" ? "Liity odotuslistalle" : "Join Waitlist"}
              </a>
              
              {/* Secondary Waitlist Link */}
              <a
                href={`/${locale}/waitlist`}
                className="block w-full text-center text-forest hover:text-forest/80 transition-colors duration-200 font-medium text-sm py-2"
                aria-label="Learn more about joining the waitlist"
                onClick={closeMobileMenu}
              >
                {locale === "fi" ? "Lue lisää →" : "Learn more →"}
              </a>
            </div>

            {/* Locale Switcher */}
            <div className="border-t border-grayLight pt-4 mt-2 pb-2 bg-white relative z-10">
              <div className="text-center mb-3">
                <span className="text-sm text-mediumGray font-medium">
                  {locale === "fi" ? "Kieli / Language" : "Language / Kieli"}
                </span>
              </div>
              <div className="flex justify-center items-center">
                <ClientLocaleSwitcher currentLocale={locale} />
              </div>
            </div>
          </nav>
        </div>
      </nav>
    </header>
  );
}
