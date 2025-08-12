"use client";

import { useState } from "react";
import { TranslationKeys } from "../lib/i18n";
import ClientLocaleSwitcher from "./ClientLocaleSwitcher";
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
    <header className="bg-white border-b border-grayLight sticky top-0 z-50 shadow-soft">
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
            </ul>

            {/* Locale Switcher */}
            <ClientLocaleSwitcher currentLocale={locale} />

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
              ? "max-h-96 opacity-100 mt-4 pb-4 border-t border-grayLight" 
              : "max-h-0 opacity-0 mt-0 pb-0 border-t-0"
          }`}
        >
          <nav
            className="flex flex-col gap-4 pt-4"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <a
              href={`/${locale}/features`}
              className="text-base text-foreground hover:text-forest transition-colors duration-200 font-sans py-2 px-3 rounded-lg hover:bg-grayLight/50"
              aria-label="View features page"
              onClick={closeMobileMenu}
            >
              {t["nav.features"]}
            </a>
            <a
              href={`/${locale}/cybersecurity`}
              className="text-base text-foreground hover:text-forest transition-colors duration-200 font-sans py-2 px-3 rounded-lg hover:bg-grayLight/50"
              aria-label="View cybersecurity page"
              onClick={closeMobileMenu}
            >
              {t["nav.security"]}
            </a>
            <a
              href={`/${locale}/pricing`}
              className="text-base text-foreground hover:text-forest transition-colors duration-200 font-sans py-2 px-3 rounded-lg hover:bg-grayLight/50"
              aria-label="View pricing page"
              onClick={closeMobileMenu}
            >
              {t["nav.pricing"]}
            </a>
            <a
              href={`/${locale}/about`}
              className="text-base text-foreground hover:text-forest transition-colors duration-200 font-sans py-2 px-3 rounded-lg hover:bg-grayLight/50"
              aria-label="About us page"
              onClick={closeMobileMenu}
            >
              {locale === "fi" ? "Tietoja meistä" : "About"}
            </a>
            <a
              href={`/${locale}/blog`}
              className="text-base text-foreground hover:text-forest transition-colors duration-200 font-sans py-2 px-3 rounded-lg hover:bg-grayLight/50"
              aria-label="Blog page"
              onClick={closeMobileMenu}
            >
              Blog
            </a>
            <a
              href={`/${locale}/contact`}
              className="text-base text-foreground hover:text-forest transition-colors duration-200 font-sans py-2 px-3 rounded-lg hover:bg-grayLight/50"
              aria-label="Contact page"
              onClick={closeMobileMenu}
            >
              {t["nav.contact"]}
            </a>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <ClientLocaleSwitcher currentLocale={locale} />
              <a
                href={`/${locale}/waitlist`}
                className="bg-forest text-white px-6 py-3 rounded-lg hover:bg-forest/90 hover:shadow-medium transition-all duration-200 font-medium inline-flex items-center gap-2 font-sans w-full sm:w-auto justify-center"
                aria-label="Join the waitlist for Lyyli.ai"
                onClick={closeMobileMenu}
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
          </nav>
        </div>
      </nav>
    </header>
  );
}
