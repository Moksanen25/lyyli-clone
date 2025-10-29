import { 
  CANONICAL_HOST, 
  CANONICAL_URL,
  getCanonicalHost,
  getCanonicalBaseUrl,
  isCanonicalHost,
  shouldRedirectToCanonical,
  validateCanonicalHost,
  toCanonicalUrl 
} from '@/lib/canonical-host';

describe('Canonical Host Utilities', () => {
  describe('Constants', () => {
    it('should have correct canonical host', () => {
      expect(CANONICAL_HOST).toBe('lyyli.ai');
    });

    it('should have correct canonical URL', () => {
      expect(CANONICAL_URL).toBe('https://lyyli.ai');
    });
  });

  describe('getCanonicalHost', () => {
    it('should return canonical host in production', () => {
      const spy = jest.spyOn(process.env, 'NODE_ENV', 'get').mockReturnValue('production');
      
      expect(getCanonicalHost()).toBe('lyyli.ai');
      
      spy.mockRestore();
    });

    it('should return localhost in development', () => {
      const spy = jest.spyOn(process.env, 'NODE_ENV', 'get').mockReturnValue('development');
      
      expect(getCanonicalHost()).toBe('localhost:3000');
      
      spy.mockRestore();
    });
  });

  describe('getCanonicalBaseUrl', () => {
    it('should return canonical URL in production', () => {
      const spy = jest.spyOn(process.env, 'NODE_ENV', 'get').mockReturnValue('production');
      
      expect(getCanonicalBaseUrl()).toBe('https://lyyli.ai');
      
      spy.mockRestore();
    });

    it('should return localhost URL in development', () => {
      const spy = jest.spyOn(process.env, 'NODE_ENV', 'get').mockReturnValue('development');
      
      expect(getCanonicalBaseUrl()).toBe('http://localhost:3000');
      
      spy.mockRestore();
    });
  });

  describe('isCanonicalHost', () => {
    it('should identify canonical host correctly', () => {
      expect(isCanonicalHost('lyyli.ai')).toBe(true);
      expect(isCanonicalHost('www.lyyli.ai')).toBe(false);
      expect(isCanonicalHost('localhost:3000')).toBe(false);
      expect(isCanonicalHost('example.com')).toBe(false);
    });
  });

  describe('shouldRedirectToCanonical', () => {
    it('should redirect www.lyyli.ai in production (temporarily disabled)', () => {
      const spy = jest.spyOn(process.env, 'NODE_ENV', 'get').mockReturnValue('production');
      
      // Temporarily disabled due to persistent redirect loop
      expect(shouldRedirectToCanonical('www.lyyli.ai')).toBe(false);
      expect(shouldRedirectToCanonical('lyyli.ai')).toBe(false);
      
      spy.mockRestore();
    });

    it('should not redirect in development', () => {
      const spy = jest.spyOn(process.env, 'NODE_ENV', 'get').mockReturnValue('development');
      
      expect(shouldRedirectToCanonical('www.lyyli.ai')).toBe(false);
      expect(shouldRedirectToCanonical('localhost:3000')).toBe(false);
      
      spy.mockRestore();
    });

    it('should redirect only specific variants in production (temporarily disabled)', () => {
      const spy = jest.spyOn(process.env, 'NODE_ENV', 'get').mockReturnValue('production');
      
      // Temporarily disabled due to persistent redirect loop
      expect(shouldRedirectToCanonical('www.lyyli.ai')).toBe(false);
      expect(shouldRedirectToCanonical('api.lyyli.ai')).toBe(false);
      expect(shouldRedirectToCanonical('staging.lyyli.ai')).toBe(false);
      expect(shouldRedirectToCanonical('example.com')).toBe(false);
      
      spy.mockRestore();
    });
  });

  describe('validateCanonicalHost', () => {
    it('should validate URLs with canonical host', () => {
      expect(validateCanonicalHost('https://lyyli.ai')).toBe(true);
      expect(validateCanonicalHost('https://lyyli.ai/en')).toBe(true);
      expect(validateCanonicalHost('https://lyyli.ai/en/blog')).toBe(true);
    });

    it('should reject URLs with non-canonical hosts', () => {
      expect(validateCanonicalHost('https://www.lyyli.ai')).toBe(false);
      expect(validateCanonicalHost('http://localhost:3000')).toBe(false);
      expect(validateCanonicalHost('https://example.com')).toBe(false);
    });

    it('should handle invalid URLs', () => {
      expect(validateCanonicalHost('not-a-url')).toBe(false);
      expect(validateCanonicalHost('')).toBe(false);
    });
  });

  describe('toCanonicalUrl', () => {
    it('should convert URLs to canonical host', () => {
      expect(toCanonicalUrl('https://www.lyyli.ai')).toBe('https://lyyli.ai/');
      expect(toCanonicalUrl('https://www.lyyli.ai/en')).toBe('https://lyyli.ai/en');
      expect(toCanonicalUrl('http://localhost:3000/en')).toBe('https://lyyli.ai/en');
    });

    it('should preserve path and query parameters', () => {
      expect(toCanonicalUrl('https://www.lyyli.ai/en/blog?page=1')).toBe('https://lyyli.ai/en/blog?page=1');
      expect(toCanonicalUrl('https://staging.lyyli.ai/fi/pricing#features')).toBe('https://lyyli.ai/fi/pricing#features');
    });

    it('should handle invalid URLs gracefully', () => {
      expect(toCanonicalUrl('not-a-url')).toBe('not-a-url');
      expect(toCanonicalUrl('')).toBe('');
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined hostname', () => {
      expect(isCanonicalHost('')).toBe(false);
      expect(shouldRedirectToCanonical('')).toBe(false);
    });

    it('should handle URLs with ports', () => {
      expect(validateCanonicalHost('https://lyyli.ai:443')).toBe(true); // Port 443 is default HTTPS, so it's removed
      expect(validateCanonicalHost('https://lyyli.ai:8080')).toBe(false); // Non-default port makes it non-canonical
      expect(validateCanonicalHost('https://lyyli.ai:80')).toBe(false); // Non-default port makes it non-canonical
    });

    it('should handle subdomain edge cases', () => {
      const spy = jest.spyOn(process.env, 'NODE_ENV', 'get').mockReturnValue('production');
      
      // Should NOT redirect subdomains to prevent loops (only www redirects)
      expect(shouldRedirectToCanonical('api.lyyli.ai')).toBe(false);
      expect(shouldRedirectToCanonical('blog.lyyli.ai')).toBe(false);
      
      // Should not redirect if not lyyli.ai domain
      expect(shouldRedirectToCanonical('api.example.com')).toBe(false);
      
      spy.mockRestore();
    });
  });
});
