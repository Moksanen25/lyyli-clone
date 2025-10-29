import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';
import { logger } from './logger';

export interface WebVitalMetric {
  name: string;
  value: number;
  delta: number;
  id: string;
  rating: 'good' | 'needs-improvement' | 'poor';
}

export interface WebVitalsBudget {
  cls: number;
  inp: number;
  fcp: number;
  lcp: number;
  ttfb: number;
}

// Performance budgets (in milliseconds, except CLS)
export const WEB_VITALS_BUDGETS: WebVitalsBudget = {
  cls: 0.1,        // CLS should be < 0.1
  inp: 200,        // INP should be < 200ms
  fcp: 1800,       // FCP should be < 1.8s
  lcp: 2500,       // LCP should be < 2.5s
  ttfb: 600,       // TTFB should be < 600ms
};

export function getRating(value: number, budget: number): 'good' | 'needs-improvement' | 'poor' {
  if (value <= budget) return 'good';
  if (value <= budget * 1.5) return 'needs-improvement';
  return 'poor';
}

export function reportWebVitals(metric: WebVitalMetric) {
  // Console reporting for development
  if (process.env.NODE_ENV === 'development') {
    const budget = WEB_VITALS_BUDGETS[metric.name as keyof WebVitalsBudget];
    const rating = budget ? getRating(metric.value, budget) : 'good';
    
    logger.info(`Web Vital: ${metric.name.toUpperCase()}`, {
      metric: metric.name,
      value: metric.value.toFixed(2),
      unit: metric.name === 'CLS' ? '' : 'ms',
      rating,
      budget,
      withinBudget: budget ? metric.value <= budget : true
    });
  }

  // Analytics reporting (you can integrate with your analytics provider)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_label: metric.rating,
      non_interaction: true,
    });
  }

  // Custom analytics endpoint (optional)
  if (process.env.NODE_ENV === 'production') {
    fetch('/api/analytics/web-vitals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...metric,
        url: window.location.href,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
      }),
    }).catch(() => {
      // Silently fail if analytics endpoint is not available
    });
  }
}

export function initWebVitals() {
  if (typeof window === 'undefined') return;

  onCLS((metric) => reportWebVitals(metric));
  onINP((metric) => reportWebVitals(metric));
  onFCP((metric) => reportWebVitals(metric));
  onLCP((metric) => reportWebVitals(metric));
  onTTFB((metric) => reportWebVitals(metric));
}

// CLS-specific utilities
export function preventCLS() {
  if (typeof window === 'undefined') return;

  // Reserve space for dynamic content
  const style = document.createElement('style');
  style.textContent = `
    /* Prevent CLS for images without dimensions */
    img:not([width]):not([height]) {
      aspect-ratio: 16 / 9;
    }
    
    /* Reserve space for dynamic content */
    .reserve-space {
      min-height: 200px;
    }
    
    /* Prevent layout shift during font loading */
    .font-loading {
      visibility: hidden;
    }
    
    .font-loaded {
      visibility: visible;
    }
  `;
  document.head.appendChild(style);
}

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
