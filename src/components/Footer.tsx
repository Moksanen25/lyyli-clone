"use client";

import React, { useState, useEffect } from "react";
import type { TranslationKeys } from "@/lib/i18n";
import Image from "next/image";

interface FooterProps {
  locale: string;
  translations: TranslationKeys;
  canonicalUrl?: string;
}

export default function Footer({
  locale,
  translations: t,
  canonicalUrl,
}: FooterProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const baseUrl = "https://lyyli.ai";
  const canonical = canonicalUrl || baseUrl;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Check if we've scrolled at all for header-like styling
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getFooterClasses = () => {
    return isScrolled 
      ? "bg-forest backdrop-blur-md border border-forest/20 shadow-xl rounded-2xl" 
      : "bg-forest backdrop-blur-sm border border-forest/10 shadow-lg rounded-2xl";
  };

  return (
    <footer className="relative" role="contentinfo">
        <div className={`mx-4 mb-6 transition-all duration-300 ${getFooterClasses()}`}>
          <div className="max-w-7xl mx-auto px-6 py-12 relative">
            {/* Main Footer Content */}
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              {/* Brand Section */}
              <div className="md:col-span-1">
                <div className="flex items-center mb-4">
                  <Image
                    src="/images/logos/Lyyli.ai (1500 x 500 px) tumma tausta.png"
                    alt="Lyyli.ai logo - AI Communication Assistant"
                    width={96}
                    height={32}
                    sizes="96px"
                    className="h-8 w-auto"
                  />
                </div>
                <p className="text-base text-gray-200 mb-4 font-sans leading-relaxed">
                  {t["footer.tagline"]}
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://www.linkedin.com/company/lyyli-ai/"
                    aria-label="Follow Lyyli on LinkedIn"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/lyyliai/"
                    aria-label="Follow Lyyli on Instagram"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2.162c2.204 0 2.466.009 3.338.048.805.037 1.243.166 1.532.276.385.149.66.328.948.616.288.288.467.563.616.948.11.289.239.727.276 1.532.039.872.048 1.134.048 3.338s-.009 2.466-.048 3.338c-.037.805-.166 1.243-.276 1.532-.149.385-.328.66-.616.948-.288.288-.563.467-.948.616-.289.11-.727.239-1.532.276-.872.039-1.134.048-3.338.048s-2.466-.009-3.338-.048c-.805-.037-1.243-.166-1.532-.276a2.55 2.55 0 01-.948-.616 2.55 2.55 0 01-.616-.948c-.11-.289-.239-.727-.276-1.532C2.171 12.466 2.162 12.204 2.162 10s.009-2.466.048-3.338c.037-.805.166-1.243.276-1.532.149-.385.328-.66.616-.948.288-.288.563-.467.948-.616.289-.11.727-.239 1.532-.276C7.534 2.171 7.796 2.162 10 2.162zM10 0C7.741 0 7.444.01 6.552.048 5.662.086 5.01.222 4.44.42A4.107 4.107 0 002.46 2.46 4.107 4.107 0 00.42 4.44C.222 5.01.086 5.662.048 6.552.01 7.444 0 7.741 0 10s.01 2.556.048 3.448c.038.89.174 1.542.372 2.112a4.107 4.107 0 002.04 2.04c.57.198 1.222.334 2.112.372C7.444 19.99 7.741 20 10 20s2.556-.01 3.448-.048c.89-.038 1.542-.174 2.112-.372a4.107 4.107 0 002.04-2.04c.198-.57.334-1.222.372-2.112C19.99 12.556 20 12.259 20 10s-.01-2.556-.048-3.448c-.038-.89-.174-1.542-.372-2.112A4.107 4.107 0 0017.54.42C16.97.222 16.318.086 15.428.048 14.536.01 14.239 0 10 0zm0 4.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm6.538-8.671a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Product Links - Following 10-layout rule: sivupolut */}
              <div>
                <h3 className="text-xl text-gray-100 mb-4 font-bold leading-normal font-playfair" style={{ color: '#F5F5F4' }}>
                  {t["footer.product"] || (locale === "fi" ? "Tuote" : "Product")}
                </h3>
                <nav>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href={`/${locale}/features`}
                        className="text-base text-gray-200 hover:text-white transition-colors font-sans leading-relaxed"
                      >
                        {t["nav.features"]}
                      </a>
                    </li>
                    <li>
                      <a
                        href={`/${locale}/cybersecurity`}
                        className="text-base text-gray-200 hover:text-white transition-colors font-sans leading-relaxed"
                      >
                        {t["nav.security"]}
                      </a>
                    </li>
                    <li>
                      <a
                        href={`/${locale}/pricing`}
                        className="text-base text-gray-200 hover:text-white transition-colors font-sans leading-relaxed"
                      >
                        {t["nav.pricing"]}
                      </a>
                    </li>
                    <li>
                      <a
                        href={`/${locale}/contact`}
                        className="text-base text-gray-200 hover:text-white transition-colors font-sans leading-relaxed"
                      >
                        {t["nav.contact"]}
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>

              {/* Company Links - Following 10-layout rule: sivupolut */}
              <div>
                <h3 className="text-xl text-gray-100 mb-4 font-bold leading-normal font-playfair" style={{ color: '#F5F5F4' }}>
                  {locale === "fi" ? "Yritys" : "Company"}
                </h3>
                <nav>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href={`/${locale}/about`}
                        className="text-base text-gray-200 hover:text-white transition-colors font-sans leading-relaxed"
                      >
                        {locale === "fi" ? "Tietoja meistä" : "About Us"}
                      </a>
                    </li>
                    <li>
                      <a
                        href={`/${locale}/blog`}
                        className="text-base text-gray-200 hover:text-white transition-colors font-sans leading-relaxed"
                      >
                        Blog
                      </a>
                    </li>
                    <li>
                      <a
                        href={`/${locale}/contact`}
                        className="text-base text-gray-200 hover:text-white transition-colors font-sans leading-relaxed"
                      >
                        {t["nav.contact"]}
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>

              {/* Legal & Support Links */}
              <div>
                <h3 className="text-xl text-gray-100 mb-4 font-bold leading-normal font-playfair" style={{ color: '#F5F5F4' }}>
                  {locale === "fi" ? "Tietosuoja" : "Legal & Support"}
                </h3>
                <nav>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href={`/${locale}/help/legal`}
                        className="text-base text-gray-200 hover:text-white transition-colors font-sans leading-relaxed"
                      >
                        {locale === "fi" ? "Sopimukset ja ehdot" : "Legal & agreements"}
                      </a>
                    </li>
                    <li>
                      <a
                        href={`/${locale}/privacy`}
                        className="text-base text-gray-200 hover:text-white transition-colors font-sans leading-relaxed"
                      >
                        {locale === "fi" ? "Tietosuoja" : "Privacy Policy"}
                      </a>
                    </li>
                    <li>
                      <a
                        href={`/${locale}/cookies`}
                        className="text-base text-gray-200 hover:text-white transition-colors font-sans leading-relaxed"
                      >
                        {locale === "fi" ? "Evästeet" : "Cookie Policy"}
                      </a>
                    </li>
                    <li>
                      <a
                        href={`/${locale}/contact`}
                        className="text-base text-gray-200 hover:text-white transition-colors font-sans leading-relaxed"
                      >
                        {locale === "fi" ? "Ota yhteyttä" : "Contact Support"}
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            {/* Separator */}
            <div className="border-t border-white/20 pt-8">
                        {/* Legal Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            {/* Legal Links */}
            <nav>
              <ul className="flex gap-6">
                <li>
                  <a
                    href={`/${locale}/privacy`}
                    className="text-sm text-gray-300 hover:text-white transition-colors font-sans leading-relaxed"
                  >
                    {locale === "fi" ? "Tietosuoja" : "Privacy Policy"}
                  </a>
                </li>
                <li>
                  <a
                    href={`/${locale}/cookies`}
                    className="text-sm text-gray-300 hover:text-white transition-colors font-sans leading-relaxed"
                  >
                    {locale === "fi" ? "Evästeet" : "Cookie Policy"}
                  </a>
                </li>
              </ul>
            </nav>
          </div>

              {/* Canonical URL & Copyright */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-gray-400 font-sans leading-relaxed">
                    {t["footer.rights"]}
                  </p>
                  <p className="text-xs text-gray-500 font-sans leading-relaxed">
                    {locale === "fi" ? "Kanoninen URL:" : "Canonical URL:"}{" "}
                    {canonical}
                  </p>
                </div>

                {/* Compliance Badges */}
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-300 font-sans leading-relaxed">
                    SOC 2 Type II
                  </div>
                  <div className="text-sm text-gray-300 font-sans leading-relaxed">
                    GDPR Compliant
                  </div>
                  <div className="text-sm text-gray-300 font-sans leading-relaxed">
                    ISO 27001
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
  );
}