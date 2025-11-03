'use client';

import React, { useEffect, useState } from 'react';

export default function AnalyticsHead(): React.JSX.Element | null {
  const [allowAnalytics, setAllowAnalytics] = useState(false);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  useEffect(() => {
    // Check consent from localStorage
    const hasConsent = localStorage.getItem('lyyli-analytics-consent');
    if (hasConsent === 'true') {
      setAllowAnalytics(true);
    }

    // Listen for consent updates
    const handleConsentUpdate = (e: Event): void => {
      const customEvent = e as CustomEvent;
      const consent = customEvent.detail;
      if (consent === 'true' || consent === true) {
        setAllowAnalytics(true);
      } else {
        setAllowAnalytics(false);
      }
    };

    window.addEventListener('consent-updated', handleConsentUpdate);

    return () => {
      window.removeEventListener('consent-updated', handleConsentUpdate);
    };
  }, []);

  useEffect(() => {
    if (allowAnalytics && !scriptsLoaded) {
      // Load Matomo
      const matomoScript = document.createElement('script');
      matomoScript.type = 'text/javascript';
      matomoScript.innerHTML = `
        var _paq = window._paq = window._paq || [];
        _paq.push(['setDocumentTitle', document.domain + '/' + document.title]);
        _paq.push(['setCookieDomain', '*.lyyli.ai']);
        _paq.push(['setDomains', ['*.lyyli.ai','*.www.lyyli.ai']]);
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
        (function() {
          var u='https://lyyliai.matomo.cloud/';
          _paq.push(['setTrackerUrl', u+'matomo.php']);
          _paq.push(['setSiteId', '1']);
          var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
          g.async=true; g.src='https://cdn.matomo.cloud/lyyliai.matomo.cloud/matomo.js'; s.parentNode.insertBefore(g,s);
        })();
        console.log('Matomo tracking initialized for lyyli.ai');
      `;
      document.head.appendChild(matomoScript);

      // Load Google Analytics if configured
      if (process.env.NEXT_PUBLIC_GA_ID) {
        const gaScript = document.createElement('script');
        gaScript.async = true;
        gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`;
        document.head.appendChild(gaScript);

        const gaConfigScript = document.createElement('script');
        gaConfigScript.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
            page_title: document.title,
            page_location: window.location.href,
            language: document.documentElement.lang || 'en'
          });
        `;
        document.head.appendChild(gaConfigScript);
      }

      setScriptsLoaded(true);
    }
  }, [allowAnalytics, scriptsLoaded]);

  return null;
}
