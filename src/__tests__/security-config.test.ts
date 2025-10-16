import { 
  createSecurityConfig,
  validateSecurityConfig,
  DEFAULT_SECURITY_CONFIG 
} from '@/middleware/security';

describe('Security Configuration', () => {
  describe('createSecurityConfig', () => {
    it('should create development config with relaxed security', () => {
      const config = createSecurityConfig('development');
      
      expect(config.enableHSTS).toBe(false);
      expect(config.cspDirectives['script-src']).toContain("'unsafe-eval'");
      expect(config.cspDirectives['script-src']).toContain("'unsafe-inline'");
      expect(config.cspDirectives['script-src']).toContain('https://vercel.live');
    });

    it('should create staging config with moderate security', () => {
      const config = createSecurityConfig('staging');
      
      expect(config.enableHSTS).toBe(true);
      expect(config.hstsMaxAge).toBe(300); // 5 minutes
      expect(config.cspDirectives['script-src']).toContain('https://vercel.live');
    });

    it('should create production config with strict security', () => {
      const config = createSecurityConfig('production');
      
      expect(config.enableHSTS).toBe(true);
      expect(config.cspDirectives['script-src']).not.toContain("'unsafe-eval'");
      expect(config.cspDirectives['script-src']).not.toContain("'unsafe-inline'");
      expect(config.cspDirectives['script-src']).not.toContain('https://vercel.live');
      expect(config.cspDirectives['script-src']).not.toContain('https://va.vercel-scripts.com');
    });
  });

  describe('validateSecurityConfig', () => {
    it('should validate correct configuration', () => {
      const errors = validateSecurityConfig(DEFAULT_SECURITY_CONFIG);
      expect(errors).toHaveLength(0);
    });

    it('should detect invalid HSTS max age', () => {
      const invalidConfig = { ...DEFAULT_SECURITY_CONFIG, hstsMaxAge: -1 };
      const errors = validateSecurityConfig(invalidConfig);
      expect(errors).toContain('HSTS max age must be positive');
    });

    it('should detect excessive HSTS max age', () => {
      const invalidConfig = { ...DEFAULT_SECURITY_CONFIG, hstsMaxAge: 40000000 };
      const errors = validateSecurityConfig(invalidConfig);
      expect(errors).toContain('HSTS max age should not exceed 1 year');
    });

    it('should detect invalid referrer policy', () => {
      const invalidConfig = { ...DEFAULT_SECURITY_CONFIG, referrerPolicy: 'invalid-policy' };
      const errors = validateSecurityConfig(invalidConfig);
      expect(errors).toContain('Invalid referrer policy');
    });

    it('should accept valid referrer policies', () => {
      const validPolicies = [
        'no-referrer',
        'no-referrer-when-downgrade',
        'origin',
        'origin-when-cross-origin',
        'same-origin',
        'strict-origin',
        'strict-origin-when-cross-origin',
        'unsafe-url'
      ];

      validPolicies.forEach(policy => {
        const config = { ...DEFAULT_SECURITY_CONFIG, referrerPolicy: policy };
        const errors = validateSecurityConfig(config);
        expect(errors).toHaveLength(0);
      });
    });
  });

  describe('DEFAULT_SECURITY_CONFIG', () => {
    it('should have secure default settings', () => {
      expect(DEFAULT_SECURITY_CONFIG.enableCSP).toBe(true);
      expect(DEFAULT_SECURITY_CONFIG.enableHSTS).toBe(true);
      expect(DEFAULT_SECURITY_CONFIG.enableXSSProtection).toBe(true);
      expect(DEFAULT_SECURITY_CONFIG.enableContentTypeOptions).toBe(true);
      expect(DEFAULT_SECURITY_CONFIG.enableFrameOptions).toBe(true);
      expect(DEFAULT_SECURITY_CONFIG.enableReferrerPolicy).toBe(true);
      expect(DEFAULT_SECURITY_CONFIG.enablePermissionsPolicy).toBe(true);
    });

    it('should have appropriate HSTS settings', () => {
      expect(DEFAULT_SECURITY_CONFIG.hstsMaxAge).toBe(31536000); // 1 year
    });

    it('should have secure referrer policy', () => {
      expect(DEFAULT_SECURITY_CONFIG.referrerPolicy).toBe('strict-origin-when-cross-origin');
    });

    it('should have secure CSP directives', () => {
      const directives = DEFAULT_SECURITY_CONFIG.cspDirectives;
      
      expect(directives['object-src']).toEqual(["'none'"]);
      expect(directives['frame-ancestors']).toEqual(["'none'"]);
      expect(directives['base-uri']).toEqual(["'self'"]);
    });

    it('should block dangerous permissions', () => {
      const permissions = DEFAULT_SECURITY_CONFIG.permissionsPolicy;
      
      expect(permissions['camera']).toEqual(['()']);
      expect(permissions['microphone']).toEqual(['()']);
      expect(permissions['geolocation']).toEqual(['()']);
      expect(permissions['payment']).toEqual(['()']);
      expect(permissions['usb']).toEqual(['()']);
    });
  });
});
