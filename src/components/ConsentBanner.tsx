'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import type { TranslationKeys } from '@/lib/i18n';
import { trackPageView } from '@/lib/analytics';

interface ConsentBannerProps {
  locale: string;
  translations: TranslationKeys;
}

export default function ConsentBanner({ locale }: ConsentBannerProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [allowAnalytics, setAllowAnalytics] = useState(false);

  useEffect(() => {
    const hasConsent = localStorage.getItem('lyyli-analytics-consent');
    if (hasConsent === 'true') {
      setAllowAnalytics(true);
      setShowBanner(false);
    } else {
      setShowBanner(true);
    }
  }, []);

  useEffect(() => {
    if (allowAnalytics) {
      trackPageView(locale, window.location.pathname);
    }
  }, [allowAnalytics, locale]);

  const handleAccept = () => {
    localStorage.setItem('lyyli-analytics-consent', 'true');
    setAllowAnalytics(true);
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('lyyli-analytics-consent', 'false');
    setShowBanner(false);
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
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-grayLight shadow-medium z-50 p-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-xl text-forest mb-2 font-playfair font-bold leading-normal">
                {locale === 'fi'
                  ? 'Evästeet ja analytiikka'
                  : 'Cookies & Analytics'}
              </h3>
              <p className="text-sm text-mediumGray font-sans">
                {locale === 'fi'
                  ? 'Käytämme evästeitä ja analytiikkaa parantaaksemme sivuston toimintaa. Hyväksymällä sallit evästeiden käytön.'
                  : 'We use cookies and analytics to improve our website. By accepting, you allow the use of cookies.'}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleDecline}
                className="px-4 py-2 text-sm text-mediumGray hover:text-forest transition-colors font-sans"
              >
                {locale === 'fi' ? 'Hylkää' : 'Decline'}
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-2 bg-forest text-white rounded-lg hover:bg-forest/90 transition-colors font-sans"
              >
                {locale === 'fi' ? 'Hyväksy' : 'Accept'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
