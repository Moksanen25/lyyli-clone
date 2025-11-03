'use client';

import React, { useEffect, useState } from 'react';

export default function AnalyticsHead(): React.JSX.Element | null {
  const [allowAnalytics, setAllowAnalytics] = useState(false);

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

  // Load Matomo Tag Manager when consent is given
  useEffect(() => {
    if (allowAnalytics) {
      // Matomo Tag Manager - Official React integration
      const _mtm = (window._mtm = window._mtm || []);
      _mtm.push({ 'mtm.startTime': new Date().getTime(), event: 'mtm.Start' });
      const d = document;
      const g = d.createElement('script');
      const s = d.getElementsByTagName('script')[0];
      g.async = true;
      g.src = 'https://cdn.matomo.cloud/lyyliai.matomo.cloud/container_CsuDcIFv.js';
      s.parentNode?.insertBefore(g, s);

      console.log('Matomo Tag Manager initialized');
    }
  }, [allowAnalytics]);

  // Load Google Analytics when consent is given
  useEffect(() => {
    if (allowAnalytics && process.env.NEXT_PUBLIC_GA_ID) {
      // Google Analytics
      const gaScript = document.createElement('script');
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`;
      document.head.appendChild(gaScript);

      gaScript.onload = () => {
        window.dataLayer = window.dataLayer || [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function gtag(...args: any[]): void {
          window.dataLayer?.push(args);
        }
        gtag('js', new Date());
        gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
          page_title: document.title,
          page_location: window.location.href,
          language: document.documentElement.lang || 'en',
        });
        console.log('Google Analytics initialized');
      };
    }
  }, [allowAnalytics]);

  return null;
}
