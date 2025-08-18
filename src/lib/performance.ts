/**
 * Performance monitoring and optimization utilities
 * Tracks Core Web Vitals, bundle analysis, and performance metrics
 */

import { logger } from './logger';

export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: number;
  category: 'navigation' | 'paint' | 'layout' | 'resource' | 'custom';
  metadata?: Record<string, any>;
}

export interface BundleAnalysis extends Record<string, unknown> {
  totalSize: number;
  jsSize: number;
  cssSize: number;
  imageSize: number;
  fontSize: number;
  otherSize: number;
  chunks: number;
  modules: number;
  dependencies: number;
}

export interface CoreWebVitals {
  lcp: number;      // Largest Contentful Paint
  fid: number;      // First Input Delay
  cls: number;      // Cumulative Layout Shift
  ttfb: number;     // Time to First Byte
  fcp: number;      // First Contentful Paint
}

export interface PerformanceConfig {
  enableMonitoring: boolean;
  enableBundleAnalysis: boolean;
  enableCoreWebVitals: boolean;
  sampleRate: number; // Percentage of users to monitor (0-100)
  maxMetricsPerSession: number;
  sendToAnalytics: boolean;
  analyticsEndpoint?: string;
}

/**
 * Performance monitoring class
 */
export class PerformanceMonitor {
  private config: PerformanceConfig;
  private metrics: PerformanceMetric[] = [];
  private isMonitoring = false;

  constructor(config: Partial<PerformanceConfig> = {}) {
    this.config = {
      enableMonitoring: true,
      enableBundleAnalysis: true,
      enableCoreWebVitals: true,
      sampleRate: 10, // Monitor 10% of users
      maxMetricsPerSession: 100,
      sendToAnalytics: false,
      ...config
    };
  }

  /**
   * Start performance monitoring
   */
  start(): void {
    if (!this.config.enableMonitoring || this.isMonitoring) {
      return;
    }

    // Random sampling based on sample rate
    if (Math.random() * 100 > this.config.sampleRate) {
      return;
    }

    this.isMonitoring = true;
    this.setupPerformanceObservers();
    this.setupBundleAnalysis();
    this.setupCoreWebVitals();

    logger.info('Performance monitoring started', {
      sampleRate: this.config.sampleRate,
      maxMetrics: this.config.maxMetricsPerSession,
    });
  }

  /**
   * Stop performance monitoring
   */
  stop(): void {
    this.isMonitoring = false;
    logger.info('Performance monitoring stopped');
  }

  /**
   * Setup Performance Observer for navigation timing
   */
  private setupPerformanceObservers(): void {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return;
    }

    try {
      // Navigation timing
      const navigationObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            this.recordMetric({
              name: 'navigation',
              value: navEntry.loadEventEnd - navEntry.loadEventStart,
              unit: 'ms',
              timestamp: Date.now(),
              category: 'navigation',
              metadata: {
                domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
                loadComplete: navEntry.loadEventEnd - navEntry.loadEventStart,
                domInteractive: navEntry.domInteractive,
                firstByte: navEntry.responseStart - navEntry.requestStart,
              }
            });
          }
        }
      });

      navigationObserver.observe({ entryTypes: ['navigation'] });

      // Paint timing
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'paint') {
            this.recordMetric({
              name: entry.name,
              value: entry.startTime,
              unit: 'ms',
              timestamp: Date.now(),
              category: 'paint',
            });
          }
        }
      });

      paintObserver.observe({ entryTypes: ['paint'] });

      // Layout shifts
      const layoutObserver = new PerformanceObserver((list) => {
        let cls = 0;
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'layout-shift') {
            const layoutEntry = entry as any;
            if (!layoutEntry.hadRecentInput) {
              cls += layoutEntry.value;
            }
          }
        }
        
        if (cls > 0) {
          this.recordMetric({
            name: 'cumulative-layout-shift',
            value: cls,
            unit: 'score',
            timestamp: Date.now(),
            category: 'layout',
          });
        }
      });

      layoutObserver.observe({ entryTypes: ['layout-shift'] });

      // Resource timing
      const resourceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'resource') {
            const resourceEntry = entry as PerformanceResourceTiming;
            this.recordMetric({
              name: 'resource-load',
              value: resourceEntry.duration,
              unit: 'ms',
              timestamp: Date.now(),
              category: 'resource',
              metadata: {
                name: resourceEntry.name,
                type: resourceEntry.initiatorType,
                size: resourceEntry.transferSize,
              }
            });
          }
        }
      });

      resourceObserver.observe({ entryTypes: ['resource'] });

    } catch (error) {
      logger.error('Failed to setup performance observers', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Setup bundle analysis
   */
  private setupBundleAnalysis(): void {
    if (!this.config.enableBundleAnalysis) {
      return;
    }

    // Analyze current bundle size
    this.analyzeBundle();
  }

  /**
   * Setup Core Web Vitals monitoring
   */
  private setupCoreWebVitals(): void {
    if (!this.config.enableCoreWebVitals) {
      return;
    }

    // LCP (Largest Contentful Paint)
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          this.recordMetric({
            name: 'lcp',
            value: lastEntry.startTime,
            unit: 'ms',
            timestamp: Date.now(),
            category: 'paint',
          });
        }
      });

      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    }

    // FID (First Input Delay)
    if ('PerformanceObserver' in window) {
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const fidEntry = entry as any; // Type assertion for FID-specific properties
          this.recordMetric({
            name: 'fid',
            value: fidEntry.processingStart - fidEntry.startTime,
            unit: 'ms',
            timestamp: Date.now(),
            category: 'navigation',
          });
        }
      });

      fidObserver.observe({ entryTypes: ['first-input'] });
    }
  }

  /**
   * Record a performance metric
   */
  recordMetric(metric: PerformanceMetric): void {
    if (!this.isMonitoring || this.metrics.length >= this.config.maxMetricsPerSession) {
      return;
    }

    this.metrics.push(metric);
    logger.logPerformance(metric.name, metric.value, metric.unit, metric.metadata);

    // Send to analytics if configured
    if (this.config.sendToAnalytics && this.config.analyticsEndpoint) {
      this.sendToAnalytics(metric);
    }
  }

  /**
   * Analyze current bundle size and composition
   */
  analyzeBundle(): BundleAnalysis | null {
    if (typeof window === 'undefined') {
      return null;
    }

    try {
      // This is a simplified analysis - in a real app, you'd use webpack-bundle-analyzer
      const analysis: BundleAnalysis = {
        totalSize: 0,
        jsSize: 0,
        cssSize: 0,
        imageSize: 0,
        fontSize: 0,
        otherSize: 0,
        chunks: 0,
        modules: 0,
        dependencies: 0,
      };

      // Count script tags
      const scripts = document.querySelectorAll('script[src]');
      analysis.chunks = scripts.length;

      // Estimate sizes based on common patterns
      scripts.forEach(script => {
        const src = script.getAttribute('src') || '';
        if (src.includes('.js')) {
          analysis.jsSize += 50; // Rough estimate
        }
      });

      // Count CSS
      const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
      stylesheets.forEach(link => {
        const href = link.getAttribute('href') || '';
        if (href.includes('.css')) {
          analysis.cssSize += 20; // Rough estimate
        }
      });

      analysis.totalSize = analysis.jsSize + analysis.cssSize + analysis.imageSize + analysis.fontSize + analysis.otherSize;

      logger.info('Bundle analysis completed', analysis as Record<string, unknown>);
      return analysis;

    } catch (error) {
      logger.error('Bundle analysis failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      return null;
    }
  }

  /**
   * Get Core Web Vitals
   */
  getCoreWebVitals(): CoreWebVitals | null {
    if (typeof window === 'undefined') {
      return null;
    }

    try {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      
      const fcp = paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;
      const lcp = this.metrics.find(m => m.name === 'lcp')?.value || 0;
      const fid = this.metrics.find(m => m.name === 'fid')?.value || 0;
      const cls = this.metrics.find(m => m.name === 'cumulative-layout-shift')?.value || 0;
      const ttfb = navigation ? navigation.responseStart - navigation.requestStart : 0;

      return { lcp, fid, cls, ttfb, fcp };
    } catch (error) {
      logger.error('Failed to get Core Web Vitals', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      return null;
    }
  }

  /**
   * Get performance summary
   */
  getPerformanceSummary(): {
    totalMetrics: number;
    averageLoadTime: number;
    coreWebVitals: CoreWebVitals | null;
    bundleAnalysis: BundleAnalysis | null;
  } {
    const navigationMetrics = this.metrics.filter(m => m.category === 'navigation');
    const averageLoadTime = navigationMetrics.length > 0 
      ? navigationMetrics.reduce((sum, m) => sum + m.value, 0) / navigationMetrics.length 
      : 0;

    return {
      totalMetrics: this.metrics.length,
      averageLoadTime,
      coreWebVitals: this.getCoreWebVitals(),
      bundleAnalysis: this.analyzeBundle(),
    };
  }

  /**
   * Send metric to analytics
   */
  private async sendToAnalytics(metric: PerformanceMetric): Promise<void> {
    if (!this.config.analyticsEndpoint) {
      return;
    }

    try {
      await fetch(this.config.analyticsEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metric),
      });
    } catch (error) {
      logger.error('Failed to send metric to analytics', {
        error: error instanceof Error ? error.message : 'Unknown error',
        metric: metric.name,
      });
    }
  }

  /**
   * Clear all metrics
   */
  clearMetrics(): void {
    this.metrics = [];
    logger.info('Performance metrics cleared');
  }

  /**
   * Get all recorded metrics
   */
  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<PerformanceConfig>): void {
    this.config = { ...this.config, ...newConfig };
    logger.info('Performance monitoring configuration updated', newConfig);
  }
}

/**
 * Create a performance monitor instance
 */
export function createPerformanceMonitor(config?: Partial<PerformanceConfig>): PerformanceMonitor {
  return new PerformanceMonitor(config);
}

/**
 * Global performance monitor instance
 */
export const performanceMonitor = createPerformanceMonitor();

/**
 * Performance utility functions
 */
export const performanceUtils = {
  /**
   * Debounce function calls
   */
  debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },

  /**
   * Throttle function calls
   */
  throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  /**
   * Measure execution time of a function
   */
  measureTime<T>(fn: () => T, name: string): T {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    
    logger.logPerformance(name, end - start, 'ms');
    return result;
  },

  /**
   * Async version of measureTime
   */
  async measureTimeAsync<T>(fn: () => Promise<T>, name: string): Promise<T> {
    const start = performance.now();
    const result = await fn();
    const end = performance.now();
    
    logger.logPerformance(name, end - start, 'ms');
    return result;
  },
};
