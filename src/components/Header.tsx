"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import type { TranslationKeys } from "@/lib/i18n";
import ClientLocaleSwitcher from "@/components/ClientLocaleSwitcher";
import Image from "next/image";

interface HeaderProps {
  locale: string;
  translations: TranslationKeys;
}

export default function Header({ locale, translations: t }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const dropdownTimeoutRefs = useRef<{ [key: string]: NodeJS.Timeout | null }>({});

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

  // Improved dropdown management with better hover handling
  const openDropdown = (dropdownName: string) => {
    // Clear any existing timeout
    if (dropdownTimeoutRefs.current[dropdownName]) {
      clearTimeout(dropdownTimeoutRefs.current[dropdownName]);
      dropdownTimeoutRefs.current[dropdownName] = null;
    }
    setActiveDropdown(dropdownName);
  };

  const closeDropdown = (dropdownName: string) => {
    // Set a timeout to close the dropdown
    dropdownTimeoutRefs.current[dropdownName] = setTimeout(() => {
      setActiveDropdown((current) => current === dropdownName ? null : current);
    }, 100); // Reduced delay for better responsiveness
  };

  const keepDropdownOpen = (dropdownName: string) => {
    // Clear the timeout when hovering over dropdown content
    if (dropdownTimeoutRefs.current[dropdownName]) {
      clearTimeout(dropdownTimeoutRefs.current[dropdownName]);
      dropdownTimeoutRefs.current[dropdownName] = null;
    }
    setActiveDropdown(dropdownName);
  };

  const handleDropdownMouseLeave = (dropdownName: string) => {
    // Only close if we're not hovering over the dropdown content
    const dropdownElement = dropdownRefs.current[dropdownName];
    if (dropdownElement) {
      const rect = dropdownElement.getBoundingClientRect();
      // Use a more reliable way to get mouse position
      const handleMouseMove = (e: MouseEvent) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        if (mouseX < rect.left || mouseX > rect.right || mouseY < rect.top || mouseY > rect.bottom) {
          closeDropdown(dropdownName);
          document.removeEventListener('mousemove', handleMouseMove);
        }
      };
      
      document.addEventListener('mousemove', handleMouseMove);
      // Clean up after a short delay
      setTimeout(() => {
        document.removeEventListener('mousemove', handleMouseMove);
      }, 100);
    }
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
              <Link
                href="/"
                className="flex items-center gap-3"
                aria-label="Lyyli.ai homepage"
                onClick={closeMobileMenu}
              >
                <Image
                  src="/images/logos/Lyyli.ai_no_BG.png"
                  alt="Lyyli.ai logo - AI Communication Assistant for Professional Service Organizations"
                  width={120}
                  height={40}
                  priority
                  sizes="(max-width: 640px) 120px, 120px"
                  className="h-10 w-auto"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {/* Features Dropdown */}
              <div className="relative">
                <button 
                  className={`flex items-center gap-2 text-base ${getTextColor()} ${getHoverTextColor()} transition-colors duration-200 font-sans py-2`}
                  onMouseEnter={() => openDropdown('features')}
                  onMouseLeave={() => handleDropdownMouseLeave('features')}
                >
                  {t["nav.features"]}
                  <svg className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'features' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div 
                  ref={(el) => { dropdownRefs.current['features'] = el; }}
                  className={`absolute top-full left-0 mt-2 w-48 ${getDropdownBg()} rounded-xl shadow-xl border ${getDropdownBorder()} transition-all duration-300 transform ${
                    activeDropdown === 'features' 
                      ? 'opacity-100 visible translate-y-0' 
                      : 'opacity-0 invisible translate-y-2'
                  }`}
                  onMouseEnter={() => keepDropdownOpen('features')}
                  onMouseLeave={() => closeDropdown('features')}
                >
                  <div className="py-2">
                    <Link
                      href={`/${locale}/features`}
                      className={`block px-4 py-3 ${getTextColor()} ${getHoverBg()} transition-colors duration-150`}
                    >
                      {t["nav.features"]}
                    </Link>
                    <div className="border-t border-gray-200/50 my-1" />
                    <Link
                      href={`/${locale}/features#ai-automation`}
                      className={`block px-4 py-2 text-sm ${getTextColor()} ${getHoverBg()} transition-colors duration-150`}
                    >
                      {locale === 'fi' ? 'AI-automaatio' : 'AI Automation'}
                    </Link>
                    <Link
                      href={`/${locale}/features#governance-compliance`}
                      className={`block px-4 py-2 text-sm ${getTextColor()} ${getHoverBg()} transition-colors duration-150`}
                    >
                      {locale === 'fi' ? 'Hallinta & Compliance' : 'Governance & Compliance'}
                    </Link>
                    <Link
                      href={`/${locale}/features#security-gdpr`}
                      className={`block px-4 py-2 text-sm ${getTextColor()} ${getHoverBg()} transition-colors duration-150`}
                    >
                      {locale === 'fi' ? 'Tietoturva & GDPR' : 'Security & GDPR'}
                    </Link>
                    <Link
                      href={`/${locale}/features#multilingual`}
                      className={`block px-4 py-2 text-sm ${getTextColor()} ${getHoverBg()} transition-colors duration-150`}
                    >
                      {locale === 'fi' ? 'Monikielisyys' : 'Multilingual'}
                    </Link>
                    <Link
                      href={`/${locale}/features#integrations`}
                      className={`block px-4 py-2 text-sm ${getTextColor()} ${getHoverBg()} transition-colors duration-150`}
                    >
                      {locale === 'fi' ? 'Integraatiot' : 'Integrations'}
                    </Link>
                    <div className="border-t border-gray-200/50 my-1" />
                    <Link
                      href={`/${locale}/cybersecurity`}
                      className={`block px-4 py-3 ${getTextColor()} ${getHoverBg()} transition-colors duration-150`}
                    >
                      {t["nav.security"]}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <Link
                href={`/${locale}/pricing`}
                className={`text-base ${getTextColor()} ${getHoverTextColor()} transition-colors duration-200 font-sans`}
              >
                {t["nav.pricing"]}
              </Link>

              {/* About Us Dropdown */}
              <div className="relative">
                <button 
                  className={`flex items-center gap-2 text-base ${getTextColor()} ${getHoverTextColor()} transition-colors duration-200 font-sans py-2`}
                  onMouseEnter={() => openDropdown('about')}
                  onMouseLeave={() => handleDropdownMouseLeave('about')}
                >
                  {locale === "fi" ? "Tietoja meistä" : "About"}
                  <svg className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'about' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div 
                  ref={(el) => { dropdownRefs.current['about'] = el; }}
                  className={`absolute top-full left-0 mt-2 w-48 ${getDropdownBg()} rounded-xl shadow-xl border ${getDropdownBorder()} transition-all duration-300 transform ${
                    activeDropdown === 'about' 
                      ? 'opacity-100 visible translate-y-0' 
                      : 'opacity-0 invisible translate-y-2'
                  }`}
                  onMouseEnter={() => keepDropdownOpen('about')}
                  onMouseLeave={() => closeDropdown('about')}
                >
                  <div className="py-2">
                    <Link
                      href={`/${locale}/about`}
                      className={`block px-4 py-3 ${getTextColor()} ${getHoverBg()} transition-colors duration-150`}
                    >
                      {locale === "fi" ? "Tietoja meistä" : "About"}
                    </Link>
                    <Link
                      href={`/${locale}/blog`}
                      className={`block px-4 py-3 ${getTextColor()} ${getHoverBg()} transition-colors duration-150`}
                    >
                      Blog
                    </Link>
                  </div>
                </div>
              </div>

              {/* Contact Dropdown */}
              <div className="relative">
                <button 
                  className={`flex items-center gap-2 text-base ${getTextColor()} ${getHoverTextColor()} transition-colors duration-200 font-sans py-2`}
                  onMouseEnter={() => openDropdown('contact')}
                  onMouseLeave={() => handleDropdownMouseLeave('contact')}
                >
                  {t["nav.contact"]}
                  <svg className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'contact' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div 
                  ref={(el) => { dropdownRefs.current['contact'] = el; }}
                  className={`absolute top-full left-0 mt-2 w-48 ${getDropdownBg()} rounded-xl shadow-xl border ${getDropdownBorder()} transition-all duration-300 transform ${
                    activeDropdown === 'contact' 
                      ? 'opacity-100 visible translate-y-0' 
                      : 'opacity-0 invisible translate-y-2'
                  }`}
                  onMouseEnter={() => keepDropdownOpen('contact')}
                  onMouseLeave={() => closeDropdown('contact')}
                >
                  <div className="py-2">
                    <Link
                      href={`/${locale}/contact`}
                      className={`block px-4 py-3 ${getTextColor()} ${getHoverBg()} transition-colors duration-150`}
                    >
                      {t["nav.contact"]}
                    </Link>
                    <Link
                      href={`/${locale}/help`}
                      className={`block px-4 py-3 ${getTextColor()} ${getHoverBg()} transition-colors duration-150`}
                    >
                      {locale === "fi" ? "Apu ja tuki" : "Help & Support"}
                    </Link>
                  </div>
                </div>
              </div>

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

          {/* Mobile Menu - Simplified and shorter */}
          <div
            id="mobile-menu"
            className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
              isMobileMenuOpen 
                ? `max-h-[60vh] opacity-100 mt-4 pb-4 border-t ${getMobileBorder()}` 
                : "max-h-0 opacity-0 mt-0 pb-0 border-t-0"
            }`}
            style={{
              maxHeight: isMobileMenuOpen ? '60vh' : '0px',
              overflowY: isMobileMenuOpen ? 'auto' : 'hidden'
            }}
          >
            <nav
              className="flex flex-col gap-2 pt-4 px-2"
              role="navigation"
              aria-label="Mobile navigation"
            >
              {/* Consolidated Navigation Links */}
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href={`/${locale}/features`}
                  className={`block text-base ${getTextColor()} ${getMobileHoverBg()} transition-colors duration-200 font-sans py-3 px-4 rounded-lg text-center`}
                  onClick={closeMobileMenu}
                >
                  {t["nav.features"]}
                </Link>
                <Link
                  href={`/${locale}/pricing`}
                  className={`block text-base ${getTextColor()} ${getMobileHoverBg()} transition-colors duration-200 font-sans py-3 px-4 rounded-lg text-center`}
                  onClick={closeMobileMenu}
                >
                  {t["nav.pricing"]}
                </Link>
                <Link
                  href={`/${locale}/about`}
                  className={`block text-base ${getTextColor()} ${getMobileHoverBg()} transition-colors duration-200 font-sans py-3 px-4 rounded-lg text-center`}
                  onClick={closeMobileMenu}
                >
                  {locale === "fi" ? "Tietoja meistä" : "About"}
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className={`block text-base ${getTextColor()} ${getMobileHoverBg()} transition-colors duration-200 font-sans py-3 px-4 rounded-lg text-center`}
                  onClick={closeMobileMenu}
                >
                  {t["nav.contact"]}
                </Link>
              </div>

              {/* Quick Links Row */}
              <div className="flex gap-2 pt-2">
                <Link
                  href={`/${locale}/cybersecurity`}
                  className={`flex-1 text-center text-sm ${getTextColor()} ${getMobileHoverBg()} transition-colors duration-200 font-sans py-2 px-3 rounded-lg`}
                  onClick={closeMobileMenu}
                >
                  {t["nav.security"]}
                </Link>
                <Link
                  href={`/${locale}/blog`}
                  className={`flex-1 text-center text-sm ${getTextColor()} ${getMobileHoverBg()} transition-colors duration-200 font-sans py-2 px-3 rounded-lg`}
                  onClick={closeMobileMenu}
                >
                  Blog
                </Link>
                <Link
                  href={`/${locale}/help`}
                  className={`flex-1 text-center text-sm ${getTextColor()} ${getMobileHoverBg()} transition-colors duration-200 font-sans py-2 px-3 rounded-lg`}
                  onClick={closeMobileMenu}
                >
                  {locale === "fi" ? "Apu" : "Help"}
                </Link>
              </div>

              {/* Waitlist CTA - Simplified */}
              <div className={`border-t ${getMobileBorder()} pt-3 mt-2`}>
                <Link
                  href="https://app.lyyli.ai"
                  className="block w-full bg-forest text-white px-4 py-3 rounded-xl hover:bg-forest/90 transition-all duration-200 font-semibold text-base text-center font-sans shadow-md"
                  aria-label="Sign in to Lyyli.ai"
                  onClick={closeMobileMenu}
                >
                  {locale === "fi" ? "Kirjaudu" : "Sign in"}
                </Link>
              </div>

              {/* Locale Switcher - Compact */}
              <div className={`border-t ${getMobileBorder()} pt-3 mt-2`}>
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
