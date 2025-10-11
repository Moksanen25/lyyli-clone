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

// Performance budgets from rules/40-performance.mdc
export const performanceBudgets = {
  lcp: 2500, // 2.5 seconds
  cls: 0.1,  // 0.1
  fid: 100,  // 100ms
  fcp: 1800, // 1.8 seconds
  ttfb: 800  // 800ms
};

// Budget violation detection
export function checkPerformanceBudget(metrics: any) {
  const violations = [];
  
  if (metrics.lcp > performanceBudgets.lcp) {
    violations.push({
      metric: 'LCP',
      current: metrics.lcp,
      budget: performanceBudgets.lcp,
      suggestions: getLCPSuggestions(metrics.lcp)
    });
  }
  
  if (metrics.cls > performanceBudgets.cls) {
    violations.push({
      metric: 'CLS',
      current: metrics.cls,
      budget: performanceBudgets.cls,
      suggestions: getCLSSuggestions(metrics.cls)
    });
  }

  if (metrics.fid > performanceBudgets.fid) {
    violations.push({
      metric: 'FID',
      current: metrics.fid,
      budget: performanceBudgets.fid,
      suggestions: getFIDSuggestions(metrics.fid)
    });
  }

  if (metrics.fcp > performanceBudgets.fcp) {
    violations.push({
      metric: 'FCP',
      current: metrics.fcp,
      budget: performanceBudgets.fcp,
      suggestions: getFCPSuggestions(metrics.fcp)
    });
  }

  if (metrics.ttfb > performanceBudgets.ttfb) {
    violations.push({
      metric: 'TTFB',
      current: metrics.ttfb,
      budget: performanceBudgets.ttfb,
      suggestions: getTTFBSuggestions(metrics.ttfb)
    });
  }
  
  return violations;
}

// Correction suggestions when limits are exceeded
export function getLCPSuggestions(lcp: number): string[] {
  const suggestions = [];
  
  if (lcp > 4000) {
    suggestions.push('Critical: Optimize hero images and above-the-fold content');
    suggestions.push('Implement critical CSS inlining');
    suggestions.push('Consider server-side rendering for dynamic content');
  } else if (lcp > 3000) {
    suggestions.push('High priority: Optimize largest content element');
    suggestions.push('Implement resource hints (preload) for critical resources');
    suggestions.push('Review and optimize font loading strategy');
  } else if (lcp > 2500) {
    suggestions.push('Medium priority: Image optimization needed');
    suggestions.push('Consider lazy loading for below-the-fold images');
    suggestions.push('Review bundle size and code splitting');
  }
  
  return suggestions;
}

export function getCLSSuggestions(cls: number): string[] {
  const suggestions = [];
  
  if (cls > 0.25) {
    suggestions.push('Critical: Fix layout shifts immediately');
    suggestions.push('Set explicit dimensions for images and media');
    suggestions.push('Avoid inserting content above existing content');
  } else if (cls > 0.1) {
    suggestions.push('High priority: Reduce cumulative layout shift');
    suggestions.push('Use CSS transforms instead of changing layout properties');
    suggestions.push('Implement skeleton screens for dynamic content');
  }
  
  return suggestions;
}

export function getFIDSuggestions(fid: number): string[] {
  const suggestions = [];
  
  if (fid > 300) {
    suggestions.push('Critical: Reduce main thread blocking');
    suggestions.push('Break up long tasks into smaller chunks');
    suggestions.push('Optimize JavaScript execution');
  } else if (fid > 100) {
    suggestions.push('Medium priority: Optimize event handlers');
    suggestions.push('Consider code splitting for non-critical functionality');
    suggestions.push('Review third-party script impact');
  }
  
  return suggestions;
}

export function getFCPSuggestions(fcp: number): string[] {
  const suggestions = [];
  
  if (fcp > 3000) {
    suggestions.push('Critical: Optimize critical rendering path');
    suggestions.push('Minimize render-blocking resources');
    suggestions.push('Implement critical CSS inlining');
  } else if (fcp > 1800) {
    suggestions.push('High priority: Optimize first contentful paint');
    suggestions.push('Review CSS delivery strategy');
    suggestions.push('Optimize server response time');
  }
  
  return suggestions;
}

export function getTTFBSuggestions(ttfb: number): string[] {
  const suggestions = [];
  
  if (ttfb > 1200) {
    suggestions.push('Critical: Optimize server response time');
    suggestions.push('Review database query performance');
    suggestions.push('Consider CDN implementation');
  } else if (ttfb > 800) {
    suggestions.push('Medium priority: Optimize server performance');
    suggestions.push('Review server-side rendering efficiency');
    suggestions.push('Consider caching strategies');
  }
  
  return suggestions;
}

// Core Web Vitals monitoring
export function reportWebVitals(metric: any) {
  if (metric.label === 'web-vital') {
    // Send to analytics
    logger.debug('Web Vital', { name: metric.name, value: metric.value });
    
    // Check against budgets
    if (metric.name === 'LCP' && metric.value > performanceBudgets.lcp) {
      logger.warn('LCP budget exceeded', { value: metric.value, budget: performanceBudgets.lcp });
    }
    
    if (metric.name === 'CLS' && metric.value > performanceBudgets.cls) {
      logger.warn('CLS budget exceeded', { value: metric.value, budget: performanceBudgets.cls });
    }

    if (metric.name === 'FID' && metric.value > performanceBudgets.fid) {
      logger.warn('FID budget exceeded', { value: metric.value, budget: performanceBudgets.fid });
    }

    if (metric.name === 'FCP' && metric.value > performanceBudgets.fcp) {
      logger.warn('FCP budget exceeded', { value: metric.value, budget: performanceBudgets.fcp });
    }

    if (metric.name === 'TTFB' && metric.value > performanceBudgets.ttfb) {
      logger.warn('TTFB budget exceeded', { value: metric.value, budget: performanceBudgets.ttfb });
    }
  }
}
