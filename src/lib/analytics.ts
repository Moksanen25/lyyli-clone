// Analytics utility for tracking user interactions
export interface AnalyticsEvent {
  event: string;
  properties: Record<string, unknown>;
}

export const trackEvent = (eventName: string, properties: Record<string, unknown> = {}) => {
  // Track page view events
  if (eventName === 'page_view') {
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname,
        language: properties.language || 'en',
        route: properties.route || window.location.pathname,
        ...properties,
      });
    }
  }

  // Track CTA click events
  if (eventName === 'cta_click') {
    if (window.gtag) {
      window.gtag('event', 'cta_click', {
        cta_variant: properties.cta_variant || 'unknown',
        cta_text: properties.cta_text || '',
        cta_location: properties.cta_location || 'unknown',
        language: properties.language || 'en',
        route: properties.route || window.location.pathname,
        ...properties,
      });
    }
  }

  // Track form submission events
  if (eventName === 'form_submit') {
    if (window.gtag) {
      window.gtag('event', 'form_submit', {
        form_name: properties.form_name || 'unknown',
        form_type: properties.form_type || 'contact',
        language: properties.language || 'en',
        route: properties.route || window.location.pathname,
        ...properties,
      });
    }
  }

  // Track other custom events
  if (window.gtag && !['page_view', 'cta_click', 'form_submit'].includes(eventName)) {
    window.gtag('event', eventName, {
      language: properties.language || 'en',
      route: properties.route || window.location.pathname,
      ...properties,
    });
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Event:', { event: eventName, properties });
  }
};

// Utility functions for common tracking scenarios
export const trackPageView = (language: string, route: string) => {
  trackEvent('page_view', { language, route });
};

export const trackCTAClick = (
  ctaVariant: string,
  ctaText: string,
  ctaLocation: string,
  language: string,
  route: string
) => {
  trackEvent('cta_click', {
    cta_variant: ctaVariant,
    cta_text: ctaText,
    cta_location: ctaLocation,
    language,
    route,
  });
};

export const trackFormSubmit = (
  formName: string,
  formType: string,
  language: string,
  route: string
) => {
  trackEvent('form_submit', {
    form_name: formName,
    form_type: formType,
    language,
    route,
  });
};

// Initialize analytics when consent is given
export const initializeAnalytics = () => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    // Track initial page view
    trackPageView(
      document.documentElement.lang || 'en',
      window.location.pathname
    );
  }
};

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}
