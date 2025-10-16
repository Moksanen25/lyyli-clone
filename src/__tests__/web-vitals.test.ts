import { getRating, WEB_VITALS_BUDGETS } from '@/lib/web-vitals';

describe('Web Vitals', () => {
  describe('getRating', () => {
    it('should return good for values within budget', () => {
      expect(getRating(0.05, WEB_VITALS_BUDGETS.cls)).toBe('good');
      expect(getRating(50, WEB_VITALS_BUDGETS.fid)).toBe('good');
      expect(getRating(1500, WEB_VITALS_BUDGETS.fcp)).toBe('good');
      expect(getRating(2000, WEB_VITALS_BUDGETS.lcp)).toBe('good');
      expect(getRating(400, WEB_VITALS_BUDGETS.ttfb)).toBe('good');
    });

    it('should return needs-improvement for values slightly over budget', () => {
      expect(getRating(0.15, WEB_VITALS_BUDGETS.cls)).toBe('needs-improvement');
      expect(getRating(150, WEB_VITALS_BUDGETS.fid)).toBe('needs-improvement');
      expect(getRating(2700, WEB_VITALS_BUDGETS.fcp)).toBe('needs-improvement');
      expect(getRating(3750, WEB_VITALS_BUDGETS.lcp)).toBe('needs-improvement');
      expect(getRating(900, WEB_VITALS_BUDGETS.ttfb)).toBe('needs-improvement');
    });

    it('should return poor for values significantly over budget', () => {
      expect(getRating(0.25, WEB_VITALS_BUDGETS.cls)).toBe('poor');
      expect(getRating(300, WEB_VITALS_BUDGETS.fid)).toBe('poor');
      expect(getRating(3600, WEB_VITALS_BUDGETS.fcp)).toBe('poor');
      expect(getRating(5000, WEB_VITALS_BUDGETS.lcp)).toBe('poor');
      expect(getRating(1200, WEB_VITALS_BUDGETS.ttfb)).toBe('poor');
    });
  });

  describe('WEB_VITALS_BUDGETS', () => {
    it('should have appropriate budget values', () => {
      expect(WEB_VITALS_BUDGETS.cls).toBe(0.1);
      expect(WEB_VITALS_BUDGETS.fid).toBe(100);
      expect(WEB_VITALS_BUDGETS.fcp).toBe(1800);
      expect(WEB_VITALS_BUDGETS.lcp).toBe(2500);
      expect(WEB_VITALS_BUDGETS.ttfb).toBe(600);
    });

    it('should have realistic budget thresholds', () => {
      // CLS should be very low
      expect(WEB_VITALS_BUDGETS.cls).toBeLessThan(0.2);
      
      // FID should be under 100ms for good UX
      expect(WEB_VITALS_BUDGETS.fid).toBeLessThan(150);
      
      // FCP should be under 2 seconds
      expect(WEB_VITALS_BUDGETS.fcp).toBeLessThan(2000);
      
      // LCP should be under 3 seconds
      expect(WEB_VITALS_BUDGETS.lcp).toBeLessThan(3000);
      
      // TTFB should be under 1 second
      expect(WEB_VITALS_BUDGETS.ttfb).toBeLessThan(1000);
    });
  });
});
