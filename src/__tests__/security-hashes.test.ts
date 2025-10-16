import { 
  generateScriptHash, 
  generateScriptHash384,
  generateScriptHash512,
  generateNonce, 
  isValidScriptHash,
  getScriptHashes,
  getEnhancedCSPDirectives,
  COMMON_SCRIPTS,
  validateScriptAgainstHash 
} from '@/lib/security-hashes';

describe('Security Hashes', () => {
  describe('generateScriptHash', () => {
    it('should generate valid SHA-256 hash', () => {
      const script = 'console.log("test");';
      const hash = generateScriptHash(script);
      
      expect(hash).toMatch(/^'sha256-[A-Za-z0-9+/]+={0,2}'$/);
    });

    it('should generate consistent hashes for same script', () => {
      const script = 'console.log("test");';
      const hash1 = generateScriptHash(script);
      const hash2 = generateScriptHash(script);
      
      expect(hash1).toBe(hash2);
    });

    it('should generate different hashes for different scripts', () => {
      const script1 = 'console.log("test1");';
      const script2 = 'console.log("test2");';
      const hash1 = generateScriptHash(script1);
      const hash2 = generateScriptHash(script2);
      
      expect(hash1).not.toBe(hash2);
    });
  });

  describe('generateScriptHash384', () => {
    it('should generate valid SHA-384 hash', () => {
      const script = 'console.log("test");';
      const hash = generateScriptHash384(script);
      
      expect(hash).toMatch(/^'sha384-[A-Za-z0-9+/]+={0,2}'$/);
    });

    it('should generate different hash than SHA-256', () => {
      const script = 'console.log("test");';
      const hash256 = generateScriptHash(script);
      const hash384 = generateScriptHash384(script);
      
      expect(hash256).not.toBe(hash384);
    });
  });

  describe('generateScriptHash512', () => {
    it('should generate valid SHA-512 hash', () => {
      const script = 'console.log("test");';
      const hash = generateScriptHash512(script);
      
      expect(hash).toMatch(/^'sha512-[A-Za-z0-9+/]+={0,2}'$/);
    });

    it('should generate different hash than SHA-256 and SHA-384', () => {
      const script = 'console.log("test");';
      const hash256 = generateScriptHash(script);
      const hash384 = generateScriptHash384(script);
      const hash512 = generateScriptHash512(script);
      
      expect(hash256).not.toBe(hash384);
      expect(hash256).not.toBe(hash512);
      expect(hash384).not.toBe(hash512);
    });
  });

  describe('generateNonce', () => {
    it('should generate unique nonces', () => {
      const nonce1 = generateNonce();
      const nonce2 = generateNonce();
      
      expect(nonce1).not.toBe(nonce2);
    });

    it('should generate base64 encoded nonces', () => {
      const nonce = generateNonce();
      // Base64 regex
      expect(nonce).toMatch(/^[A-Za-z0-9+/]+={0,2}$/);
    });

    it('should generate nonces of reasonable length', () => {
      const nonce = generateNonce();
      expect(nonce.length).toBeGreaterThan(10);
      expect(nonce.length).toBeLessThan(50);
    });
  });

  describe('isValidScriptHash', () => {
    it('should validate correct script hashes', () => {
      expect(isValidScriptHash("'sha256-abc123'")).toBe(true);
      expect(isValidScriptHash("'sha384-abc123'")).toBe(true);
      expect(isValidScriptHash("'sha512-abc123'")).toBe(true);
    });

    it('should reject invalid script hashes', () => {
      expect(isValidScriptHash("'md5-abc123'")).toBe(false);
      expect(isValidScriptHash("'sha256'")).toBe(false);
      expect(isValidScriptHash("sha256-abc123")).toBe(false);
      expect(isValidScriptHash("'sha256-abc123-'")).toBe(false);
      expect(isValidScriptHash("")).toBe(false);
      expect(isValidScriptHash("'sha999-abc123'")).toBe(false);
    });
  });

  describe('validateScriptAgainstHash', () => {
    it('should validate script against its hash', () => {
      const script = 'console.log("test");';
      const hash = generateScriptHash(script);
      
      expect(validateScriptAgainstHash(script, hash)).toBe(true);
    });

    it('should reject script against wrong hash', () => {
      const script1 = 'console.log("test1");';
      const script2 = 'console.log("test2");';
      const hash = generateScriptHash(script1);
      
      expect(validateScriptAgainstHash(script2, hash)).toBe(false);
    });
  });

  describe('getScriptHashes', () => {
    it('should return array of script hashes', () => {
      const hashes = getScriptHashes();
      
      expect(Array.isArray(hashes)).toBe(true);
      expect(hashes.length).toBeGreaterThan(0);
    });

    it('should return valid script hashes', () => {
      const hashes = getScriptHashes();
      
      hashes.forEach(hash => {
        expect(isValidScriptHash(hash)).toBe(true);
      });
    });
  });

  describe('getEnhancedCSPDirectives', () => {
    it('should include script hashes in CSP directives', () => {
      const directives = getEnhancedCSPDirectives();
      
      expect(directives['script-src']).toContain("'self'");
      
      // Should include script hashes
      const scriptHashes = getScriptHashes();
      scriptHashes.forEach(hash => {
        expect(directives['script-src']).toContain(hash);
      });
    });

    it('should have secure default directives', () => {
      const directives = getEnhancedCSPDirectives();
      
      expect(directives['object-src']).toEqual(["'none'"]);
      expect(directives['frame-ancestors']).toEqual(["'none'"]);
      expect(directives['base-uri']).toEqual(["'self'"]);
    });

    it('should include required CSP directives', () => {
      const directives = getEnhancedCSPDirectives();
      
      const requiredDirectives = [
        'default-src',
        'script-src',
        'style-src',
        'font-src',
        'img-src',
        'connect-src',
        'frame-src',
        'object-src',
        'base-uri',
        'form-action',
        'frame-ancestors',
        'upgrade-insecure-requests',
        'report-uri'
      ];
      
      requiredDirectives.forEach(directive => {
        expect(directives).toHaveProperty(directive);
      });
    });
  });

  describe('COMMON_SCRIPTS', () => {
    it('should contain web vitals script', () => {
      expect(COMMON_SCRIPTS.webVitals).toBeDefined();
      expect(typeof COMMON_SCRIPTS.webVitals).toBe('string');
      expect(COMMON_SCRIPTS.webVitals.length).toBeGreaterThan(0);
    });

    it('should contain font loading script', () => {
      expect(COMMON_SCRIPTS.fontLoading).toBeDefined();
      expect(typeof COMMON_SCRIPTS.fontLoading).toBe('string');
      expect(COMMON_SCRIPTS.fontLoading.length).toBeGreaterThan(0);
    });

    it('should contain CLS prevention script', () => {
      expect(COMMON_SCRIPTS.clsPrevention).toBeDefined();
      expect(typeof COMMON_SCRIPTS.clsPrevention).toBe('string');
      expect(COMMON_SCRIPTS.clsPrevention.length).toBeGreaterThan(0);
    });
  });
});
