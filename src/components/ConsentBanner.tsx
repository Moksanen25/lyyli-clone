'use client';

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import type { TranslationKeys } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface ConsentBannerProps {
  locale: string;
  translations: TranslationKeys;
}

export default function ConsentBanner({
  locale,
}: ConsentBannerProps): React.JSX.Element {
  const [showBanner, setShowBanner] = useState(false);
  const [allowAnalytics, setAllowAnalytics] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const hasConsent = localStorage.getItem('lyyli-analytics-consent');
    if (hasConsent === 'true') {
      setAllowAnalytics(true);
      setShowBanner(false);
    } else if (hasConsent === 'false') {
      setShowBanner(false);
    } else {
      // No decision made yet - show banner
      setShowBanner(true);
    }
  }, []);

  useEffect(() => {
    if (allowAnalytics) {
      trackPageView(locale, window.location.pathname);
    }
  }, [allowAnalytics, locale]);

  const handleAcceptAll = (): void => {
    localStorage.setItem('lyyli-analytics-consent', 'true');
    setAllowAnalytics(true);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleDeclineAll = (): void => {
    localStorage.setItem('lyyli-analytics-consent', 'false');
    setAllowAnalytics(false);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleSavePreferences = (): void => {
    localStorage.setItem(
      'lyyli-analytics-consent',
      allowAnalytics ? 'true' : 'false'
    );
    setShowBanner(false);
    setShowSettings(false);
  };

  return (
    <>
      {allowAnalytics && process.env.NEXT_PUBLIC_GA_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                page_title: document.title,
                page_location: window.location.href,
                language: document.documentElement.lang || 'en'
              });
            `}
          </Script>
        </>
      ) : null}

      {allowAnalytics ? (
        <>
          {/* Matomo */}
          <Script id="matomo" strategy="afterInteractive">
            {`
              var _paq = window._paq = window._paq || [];
              /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
              _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
              _paq.push(["setCookieDomain", "*.www.lyyli.ai"]);
              _paq.push(["setDomains", ["*.www.lyyli.ai"]]);
              _paq.push(["setDoNotTrack", true]);
              _paq.push(['trackPageView']);
              _paq.push(['enableLinkTracking']);
              (function() {
                var u="https://lyyliai.matomo.cloud/";
                _paq.push(['setTrackerUrl', u+'matomo.php']);
                _paq.push(['setSiteId', '1']);
                var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                g.async=true; g.src='https://cdn.matomo.cloud/lyyliai.matomo.cloud/matomo.js'; s.parentNode.insertBefore(g,s);
              })();
            `}
          </Script>
        </>
      ) : null}

      {showBanner ? (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 pointer-events-none">
          <div
            className="max-w-5xl mx-auto bg-white/95 backdrop-blur-md border border-gray-200/50 shadow-xl rounded-2xl p-6 sm:p-8 pointer-events-auto transform transition-all duration-300"
            role="dialog"
            aria-labelledby="cookie-banner-title"
            aria-describedby="cookie-banner-description"
          >
            {!showSettings ? (
              <>
                {/* Main Banner View */}
                <div className="flex flex-col gap-6">
                  <div className="flex items-start gap-4">
                    {/* Cookie Icon */}
                    <div className="flex-shrink-0 w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-forest"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                        />
                      </svg>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3
                        id="cookie-banner-title"
                        className="text-xl sm:text-2xl text-forest mb-2 font-playfair font-bold leading-tight"
                      >
                        {locale === 'fi'
                          ? 'Yksityisyytesi on tärkeä'
                          : 'Your privacy matters'}
                      </h3>
                      <p
                        id="cookie-banner-description"
                        className="text-sm sm:text-base text-darkGray font-sans leading-relaxed"
                      >
                        {locale === 'fi'
                          ? 'Käytämme evästeitä ja analytiikkaa parantaaksemme sivustokokemustasi, analysoidaksemme liikennettä ja ymmärtääksemme käyttäjien tarpeita paremmin. Voit hallita asetuksiasi milloin tahansa.'
                          : 'We use cookies and analytics to improve your website experience, analyze traffic, and better understand user needs. You can manage your preferences at any time.'}
                      </p>

                      {/* Privacy Links */}
                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs sm:text-sm">
                        <Link
                          href={`/${locale}/privacy`}
                          className="text-forest hover:text-forest/80 underline underline-offset-2 font-sans font-medium transition-colors"
                        >
                          {locale === 'fi'
                            ? 'Tietosuojakäytäntö'
                            : 'Privacy Policy'}
                        </Link>
                        <Link
                          href={`/${locale}/cookies`}
                          className="text-forest hover:text-forest/80 underline underline-offset-2 font-sans font-medium transition-colors"
                        >
                          {locale === 'fi' ? 'Evästekäytäntö' : 'Cookie Policy'}
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end">
                    <button
                      onClick={() => setShowSettings(true)}
                      className="px-5 py-2.5 text-sm font-medium text-mediumGray hover:text-forest border-2 border-gray-200 hover:border-forest/30 rounded-xl transition-all duration-200 font-sans"
                      type="button"
                    >
                      {locale === 'fi'
                        ? 'Hallitse asetuksia'
                        : 'Manage Preferences'}
                    </button>
                    <button
                      onClick={handleDeclineAll}
                      className="px-5 py-2.5 text-sm font-medium text-mediumGray hover:text-darkGray hover:bg-gray-50 rounded-xl transition-all duration-200 font-sans"
                      type="button"
                    >
                      {locale === 'fi'
                        ? 'Vain välttämättömät'
                        : 'Necessary Only'}
                    </button>
                    <button
                      onClick={handleAcceptAll}
                      className="px-6 py-2.5 bg-forest text-white rounded-xl hover:bg-forest/90 hover:shadow-lg transition-all duration-200 font-sans font-semibold text-sm shadow-md"
                      type="button"
                    >
                      {locale === 'fi' ? 'Hyväksy kaikki' : 'Accept All'}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Settings View */}
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl sm:text-2xl text-forest font-playfair font-bold">
                      {locale === 'fi'
                        ? 'Evästeasetukset'
                        : 'Cookie Preferences'}
                    </h3>
                    <button
                      onClick={() => setShowSettings(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      type="button"
                      aria-label={
                        locale === 'fi' ? 'Sulje asetukset' : 'Close settings'
                      }
                    >
                      <svg
                        className="w-5 h-5 text-mediumGray"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Cookie Categories */}
                  <div className="space-y-4">
                    {/* Necessary Cookies */}
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="text-base font-bold text-darkGray font-sans">
                              {locale === 'fi'
                                ? 'Välttämättömät evästeet'
                                : 'Necessary Cookies'}
                            </h4>
                            <span className="text-xs bg-gray-200 text-mediumGray px-2 py-0.5 rounded-full font-sans font-medium">
                              {locale === 'fi'
                                ? 'Aina käytössä'
                                : 'Always Active'}
                            </span>
                          </div>
                          <p className="text-sm text-mediumGray font-sans">
                            {locale === 'fi'
                              ? 'Nämä evästeet ovat välttämättömiä sivuston perustoiminnoille, kuten navigoinnille ja suojattujen alueiden käytölle.'
                              : 'These cookies are essential for basic website functions like navigation and access to secure areas.'}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <div className="w-11 h-6 bg-forest rounded-full opacity-50 cursor-not-allowed" />
                        </div>
                      </div>
                    </div>

                    {/* Analytics Cookies */}
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="text-base font-bold text-darkGray mb-2 font-sans">
                            {locale === 'fi'
                              ? 'Analytiikka ja suorituskyky'
                              : 'Analytics & Performance'}
                          </h4>
                          <p className="text-sm text-mediumGray font-sans mb-3">
                            {locale === 'fi'
                              ? 'Nämä evästeet auttavat meitä ymmärtämään, miten käytät sivustoa. Keräämme anonyymia dataa kävijämääristä, sivujen suosiosta ja käyttäytymismalleista parantaaksemme palveluamme.'
                              : 'These cookies help us understand how you use our website. We collect anonymous data about visitor numbers, page popularity, and user behavior to improve our service.'}
                          </p>
                          <p className="text-xs text-mediumGray font-sans">
                            {locale === 'fi'
                              ? 'Käytämme: Google Analytics, Matomo'
                              : 'We use: Google Analytics, Matomo'}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <button
                            onClick={() => setAllowAnalytics(!allowAnalytics)}
                            className={`w-11 h-6 rounded-full transition-colors duration-200 ${
                              allowAnalytics ? 'bg-forest' : 'bg-gray-300'
                            }`}
                            type="button"
                            role="switch"
                            aria-checked={allowAnalytics}
                            aria-label={
                              locale === 'fi'
                                ? 'Ota analytiikkaevästeet käyttöön tai pois käytöstä'
                                : 'Toggle analytics cookies'
                            }
                          >
                            <div
                              className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                                allowAnalytics
                                  ? 'translate-x-6'
                                  : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* GDPR Information */}
                  <div className="p-4 bg-rose/30 border border-rose rounded-xl">
                    <p className="text-xs text-darkGray font-sans leading-relaxed">
                      {locale === 'fi'
                        ? 'Kunnioitamme yksityisyyttäsi ja GDPR-oikeuksiasi. Voit peruuttaa suostumuksesi milloin tahansa palaamalla näihin asetuksiin. Käsittelemme tietojasi vastuullisesti ja läpinäkyvästi.'
                        : 'We respect your privacy and GDPR rights. You can withdraw your consent at any time by returning to these settings. We process your data responsibly and transparently.'}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                    <button
                      onClick={handleSavePreferences}
                      className="px-5 py-2.5 text-sm font-medium text-mediumGray hover:text-darkGray hover:bg-gray-50 rounded-xl transition-all duration-200 font-sans"
                      type="button"
                    >
                      {locale === 'fi'
                        ? 'Tallenna valinnat'
                        : 'Save Preferences'}
                    </button>
                    <button
                      onClick={handleAcceptAll}
                      className="px-6 py-2.5 bg-forest text-white rounded-xl hover:bg-forest/90 hover:shadow-lg transition-all duration-200 font-sans font-semibold text-sm shadow-md"
                      type="button"
                    >
                      {locale === 'fi' ? 'Hyväksy kaikki' : 'Accept All'}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
