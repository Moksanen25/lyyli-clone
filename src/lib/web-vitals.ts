import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

export interface WebVitalMetric {
  name: string;
  value: number;
  delta: number;
  id: string;
  rating: 'good' | 'needs-improvement' | 'poor';
}

export interface WebVitalsBudget {
  cls: number;
  fid: number;
  fcp: number;
  lcp: number;
  ttfb: number;
}

// Performance budgets (in milliseconds, except CLS)
export const WEB_VITALS_BUDGETS: WebVitalsBudget = {
  cls: 0.1,        // CLS should be < 0.1
  fid: 100,        // FID should be < 100ms
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
    
    console.group(`🚀 Web Vital: ${metric.name.toUpperCase()}`);
    console.log(`Value: ${metric.value.toFixed(2)}${metric.name === 'CLS' ? '' : 'ms'}`);
    console.log(`Rating: ${rating}`);
    if (budget) {
      console.log(`Budget: ${budget}${metric.name === 'CLS' ? '' : 'ms'}`);
      console.log(`Status: ${metric.value <= budget ? '✅ Within budget' : '❌ Over budget'}`);
    }
    console.groupEnd();
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

  getCLS((metric) => reportWebVitals(metric));
  getFID((metric) => reportWebVitals(metric));
  getFCP((metric) => reportWebVitals(metric));
  getLCP((metric) => reportWebVitals(metric));
  getTTFB((metric) => reportWebVitals(metric));
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
