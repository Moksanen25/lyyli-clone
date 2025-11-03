// Global type definitions for analytics and tracking

declare global {
  interface Window {
    // Google Analytics
    gtag?: (
      command: 'event' | 'config' | 'js' | 'set',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    dataLayer?: Array<unknown>;

    // Matomo Analytics (legacy tracking)
    _paq?: Array<Array<string | number | boolean>>;

    // Matomo Tag Manager
    _mtm?: Array<Record<string, unknown>>;

    // Other analytics tools (for future use)
    hj?: (...args: unknown[]) => void;
    datafast?: Array<Record<string, unknown>>;
  }
}

export {};
