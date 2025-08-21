"use client";

import React, { useState, useEffect } from "react";
import { TranslationKeys } from "../lib/i18n";
import ClientLocaleSwitcher from "./ClientLocaleSwitcher";
import Image from "next/image";

interface HeaderProps {
  locale: string;
  translations: TranslationKeys;
}

export default function Header({ locale, translations: t }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Dropdown management
  const openDropdown = (dropdownName: string) => {
    setActiveDropdown(dropdownName);
  };

  const closeDropdown = (dropdownName: string) => {
    // Add a small delay to allow moving mouse to dropdown content
    setTimeout(() => {
      setActiveDropdown((current) => current === dropdownName ? null : current);
    }, 150);
  };

  const keepDropdownOpen = (dropdownName: string) => {
    setActiveDropdown(dropdownName);
  };

  const getHeaderClasses = () => {
    return isScrolled 
      ? "bg-white/95 backdrop-blur-md border border-gray-200/50 shadow-xl rounded-2xl" 
      : "bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg rounded-2xl";
  };

  const getTextColor = () => {
    return 'text-forest';
  };

  const getHoverTextColor = () => {
    return 'hover:text-forest/80';
  };

  const getDropdownBg = () => {
    return 'bg-white';
  };

  const getDropdownBorder = () => {
    return 'border-gray-200';
  };

  const getHoverBg = () => {
    return 'hover:bg-gray-50';
  };

  const getMobileBorder = () => {
    return 'border-gray-200';
  };

  const getMobileHoverBg = () => {
    return 'hover:bg-gray-50';
  };

  const getMobileTextColor = () => {
    return 'text-gray-600';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Floating Navigation Bar */}
      <nav
        className={`mx-4 mt-6 transition-all duration-300 ${getHeaderClasses()}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="px-6 py-4">
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
              {/* Features Dropdown */}
              <div className="relative">
                <button 
                  className={`flex items-center gap-2 text-base ${getTextColor()} ${getHoverTextColor()} transition-colors duration-200 font-sans py-2`}
                  onMouseEnter={() => openDropdown('features')}
                  onMouseLeave={() => closeDropdown('features')}
                >
                  {t["nav.features"]}
                  <svg className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'features' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div 
                  className={`absolute top-full left-0 mt-2 w-48 ${getDropdownBg()} rounded-xl shadow-xl border ${getDropdownBorder()} transition-all duration-300 transform ${
                    activeDropdown === 'features' 
                      ? 'opacity-100 visible translate-y-0' 
                      : 'opacity-0 invisible translate-y-2'
                  }`}
                  onMouseEnter={() => keepDropdownOpen('features')}
                  onMouseLeave={() => closeDropdown('features')}
                >
                  <div className="py-2">
                    <a
                      href={`/${locale}/features`}
                      className={`block px-4 py-3 ${getTextColor()} ${getHoverBg()} transition-colors duration-150`}
                    >
                      {t["nav.features"]}
                    </a>
                    <a
                      href={`/${locale}/cybersecurity`}
                      className={`block px-4 py-3 ${getTextColor()} ${getHoverBg()} transition-colors duration-150`}
                    >
                      {t["nav.security"]}
                    </a>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <a
                href={`/${locale}/pricing`}
                className={`text-base ${getTextColor()} ${getHoverTextColor()} transition-colors duration-200 font-sans`}
              >
                {t["nav.pricing"]}
              </a>

              {/* About Us Dropdown */}
              <div className="relative">
                <button 
                  className={`flex items-center gap-2 text-base ${getTextColor()} ${getHoverTextColor()} transition-colors duration-200 font-sans py-2`}
                  onMouseEnter={() => openDropdown('about')}
                  onMouseLeave={() => closeDropdown('about')}
                >
                  {locale === "fi" ? "Tietoja meistä" : "About"}
                  <svg className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'about' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div 
                  className={`absolute top-full left-0 mt-2 w-48 ${getDropdownBg()} rounded-xl shadow-xl border ${getDropdownBorder()} transition-all duration-300 transform ${
                    activeDropdown === 'about' 
                      ? 'opacity-100 visible translate-y-0' 
                      : 'opacity-0 invisible translate-y-2'
                  }`}
                  onMouseEnter={() => keepDropdownOpen('about')}
                  onMouseLeave={() => closeDropdown('about')}
                >
                  <div className="py-2">
                    <a
                      href={`/${locale}/about`}
                      className={`block px-4 py-3 ${getTextColor()} ${getHoverBg()} transition-colors duration-150`}
                    >
                      {locale === "fi" ? "Tietoja meistä" : "About"}
                    </a>
                    <a
                      href={`/${locale}/blog`}
                      className={`block px-4 py-3 ${getTextColor()} ${getHoverBg()} transition-colors duration-150`}
                    >
                      Blog
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Dropdown */}
              <div className="relative">
                <button 
                  className={`flex items-center gap-2 text-base ${getTextColor()} ${getHoverTextColor()} transition-colors duration-200 font-sans py-2`}
                  onMouseEnter={() => openDropdown('contact')}
                  onMouseLeave={() => closeDropdown('contact')}
                >
                  {t["nav.contact"]}
                  <svg className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'contact' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div 
                  className={`absolute top-full left-0 mt-2 w-48 ${getDropdownBg()} rounded-xl shadow-xl border ${getDropdownBorder()} transition-all duration-300 transform ${
                    activeDropdown === 'contact' 
                      ? 'opacity-100 visible translate-y-0' 
                      : 'opacity-0 invisible translate-y-2'
                  }`}
                  onMouseEnter={() => keepDropdownOpen('contact')}
                  onMouseLeave={() => closeDropdown('contact')}
                >
                  <div className="py-2">
                    <a
                      href={`/${locale}/contact`}
                      className={`block px-4 py-3 ${getTextColor()} ${getHoverBg()} transition-colors duration-150`}
                    >
                      {t["nav.contact"]}
                    </a>
                    <a
                      href={`/${locale}/help`}
                      className={`block px-4 py-3 ${getTextColor()} ${getHoverBg()} transition-colors duration-150`}
                    >
                      {locale === "fi" ? "Apu ja tuki" : "Help & Support"}
                    </a>
                  </div>
                </div>
              </div>

              {/* Right side controls */}
              <div className="flex items-center gap-4 ml-4">
                {/* Locale Switcher */}
                <ClientLocaleSwitcher currentLocale={locale} />

                {/* CTA Button */}
                <a
                  href={`/${locale}/waitlist`}
                  className="bg-forest text-white px-6 py-3 rounded-xl hover:bg-forest/90 hover:shadow-lg transition-all duration-200 font-medium inline-flex items-center gap-2 font-sans shadow-md"
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              aria-label={isMobileMenuOpen ? "Close mobile navigation menu" : "Open mobile navigation menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              type="button"
              onClick={toggleMobileMenu}
            >
              <svg
                className="w-6 h-6 text-forest"
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
                ? `max-h-[80vh] opacity-100 mt-4 pb-6 border-t ${getMobileBorder()}` 
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
              {/* Features Section */}
              <div className="space-y-1">
                <div className={`text-sm font-medium ${getTextColor()} px-4 py-2`}>
                  {t["nav.features"]}
                </div>
                <a
                  href={`/${locale}/features`}
                  className={`block text-base ${getTextColor()} ${getMobileHoverBg()} transition-colors duration-200 font-sans py-3 px-6 rounded-lg`}
                  onClick={closeMobileMenu}
                >
                  {t["nav.features"]}
                </a>
                <a
                  href={`/${locale}/cybersecurity`}
                  className={`block text-base ${getTextColor()} ${getMobileHoverBg()} transition-colors duration-200 font-sans py-3 px-6 rounded-lg`}
                  onClick={closeMobileMenu}
                >
                  {t["nav.security"]}
                </a>
              </div>

              {/* Pricing */}
              <a
                href={`/${locale}/pricing`}
                className={`block text-base ${getTextColor()} ${getMobileHoverBg()} transition-colors duration-200 font-sans py-3 px-6 rounded-lg`}
                onClick={closeMobileMenu}
              >
                {t["nav.pricing"]}
              </a>

              {/* About Section */}
              <div className="space-y-1">
                <div className={`text-sm font-medium ${getTextColor()} px-4 py-2`}>
                  {locale === "fi" ? "Tietoja meistä" : "About"}
                </div>
                <a
                  href={`/${locale}/about`}
                  className={`block text-base ${getTextColor()} ${getMobileHoverBg()} transition-colors duration-200 font-sans py-3 px-6 rounded-lg`}
                  onClick={closeMobileMenu}
                >
                  {locale === "fi" ? "Tietoja meistä" : "About"}
                </a>
                <a
                  href={`/${locale}/blog`}
                  className={`block text-base ${getTextColor()} ${getMobileHoverBg()} transition-colors duration-200 font-sans py-3 px-6 rounded-lg`}
                  onClick={closeMobileMenu}
                >
                  Blog
                </a>
              </div>

              {/* Contact Section */}
              <div className="space-y-1">
                <div className={`text-sm font-medium ${getTextColor()} px-4 py-2`}>
                  {t["nav.contact"]}
                </div>
                <a
                  href={`/${locale}/contact`}
                  className={`block text-base ${getTextColor()} ${getMobileHoverBg()} transition-colors duration-200 font-sans py-3 px-6 rounded-lg`}
                  onClick={closeMobileMenu}
                >
                  {t["nav.contact"]}
                </a>
                <a
                  href={`/${locale}/help`}
                  className={`block text-base ${getTextColor()} ${getMobileHoverBg()} transition-colors duration-200 font-sans py-3 px-6 rounded-lg`}
                  onClick={closeMobileMenu}
                >
                  {locale === "fi" ? "Apu ja tuki" : "Help & Support"}
                </a>
              </div>

              {/* Prominent Waitlist CTA Section */}
              <div className={`border-t ${getMobileBorder()} pt-4 mt-2`}>
                <div className="text-center mb-4">
                  <h3 className={`text-lg font-semibold ${getTextColor()} mb-2`}>
                    {locale === "fi" ? "Oletko valmis aloittamaan?" : "Ready to get started?"}
                  </h3>
                  <p className={`text-sm ${getMobileTextColor()} mb-4`}>
                    {locale === "fi" ? "Liity odotuslistalle ja ole ensimmäisten joukossa" : "Join the waitlist and be among the first"}
                  </p>
                </div>
                
                {/* Primary Waitlist Button */}
                <a
                  href={`/${locale}/waitlist`}
                  className="block w-full bg-forest text-white px-6 py-4 rounded-xl hover:bg-forest/90 hover:shadow-lg transition-all duration-200 font-semibold text-base inline-flex items-center justify-center gap-3 font-sans mb-3 shadow-md"
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"
                    />
                  </svg>
                  {locale === "fi" ? "Liity odotuslistalle" : "Join Waitlist"}
                </a>
                
                {/* Secondary Waitlist Link */}
                <a
                  href={`/${locale}/waitlist`}
                  className={`block w-full text-center ${getTextColor()} ${getHoverTextColor()} transition-colors duration-200 font-medium text-sm py-2`}
                  aria-label="Learn more about joining the waitlist"
                  onClick={closeMobileMenu}
                >
                  {locale === "fi" ? "Lue lisää →" : "Learn more →"}
                </a>
              </div>

              {/* Locale Switcher */}
              <div className={`border-t ${getMobileBorder()} pt-4 mt-2 pb-2`}>
                <div className="text-center mb-3">
                  <span className={`text-sm ${getMobileTextColor()} font-medium`}>
                    {locale === "fi" ? "Kieli / Language" : "Language / Kieli"}
                  </span>
                </div>
                <div className="flex justify-center items-center">
                  <ClientLocaleSwitcher currentLocale={locale} />
                </div>
              </div>
            </nav>
          </div>
        </div>
      </nav>
    </header>
  );
}
