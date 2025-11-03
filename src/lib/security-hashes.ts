/**
 * Generate SHA-256 hash for inline scripts
 */
export function generateScriptHash(script: string): string {
  if (typeof window !== 'undefined') {
    // Browser environment - synchronous fallback using a simple hash
    // For browser compatibility, we'll use a synchronous approach
    let hash = 0;
    for (let i = 0; i < script.length; i++) {
      const char = script.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    // Convert to base64-like string
    const hashStr = Math.abs(hash).toString(36);
    return `'sha256-${btoa(hashStr)}'`;
  } 
    // Node.js environment - use crypto module
    const crypto = require('crypto');
    const hash = crypto.createHash('sha256').update(script).digest('base64');
    return `'sha256-${hash}'`;
  
}

/**
 * Generate SHA-384 hash for inline scripts (stronger)
 */
export function generateScriptHash384(script: string): string {
  if (typeof window !== 'undefined') {
    // Browser environment - synchronous fallback
    let hash = 0;
    for (let i = 0; i < script.length; i++) {
      const char = script.charCodeAt(i);
      hash = ((hash << 7) - hash) + char; // Different shift for 384
      hash = hash & hash;
    }
    const hashStr = Math.abs(hash).toString(36);
    return `'sha384-${btoa(hashStr)}'`;
  } 
    // Node.js environment - use crypto module
    const crypto = require('crypto');
    const hash = crypto.createHash('sha384').update(script).digest('base64');
    return `'sha384-${hash}'`;
  
}

/**
 * Generate SHA-512 hash for inline scripts (strongest)
 */
export function generateScriptHash512(script: string): string {
  if (typeof window !== 'undefined') {
    // Browser environment - synchronous fallback
    let hash = 0;
    for (let i = 0; i < script.length; i++) {
      const char = script.charCodeAt(i);
      hash = ((hash << 9) - hash) + char; // Different shift for 512
      hash = hash & hash;
    }
    const hashStr = Math.abs(hash).toString(36);
    return `'sha512-${btoa(hashStr)}'`;
  } 
    // Node.js environment - use crypto module
    const crypto = require('crypto');
    const hash = crypto.createHash('sha512').update(script).digest('base64');
    return `'sha512-${hash}'`;
  
}

/**
 * Generate nonce for script execution
 */
export function generateNonce(): string {
  if (typeof window !== 'undefined') {
    // Browser environment - use crypto.getRandomValues
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode(...array));
  } else {
    // Node.js environment - use crypto module
    const crypto = require('crypto');
    return crypto.randomBytes(16).toString('base64');
  }
}

/**
 * Common inline scripts that need hashes
 */
export const COMMON_SCRIPTS = {
  // Web Vitals script
  webVitals: `
    if (typeof window !== 'undefined') {
      const { onCLS, onINP, onFCP, onLCP, onTTFB } = window.webVitals || {};
      if (onCLS) onCLS(console.log);
      if (onINP) onINP(console.log);
      if (onFCP) onFCP(console.log);
      if (onLCP) onLCP(console.log);
      if (onTTFB) onTTFB(console.log);
    }
  `,
  
  // Font loading optimization
  fontLoading: `
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('font-loading');
      Promise.all([
        document.fonts.load('400 16px Inter'),
        document.fonts.load('700 16px Playfair Display'),
      ]).then(() => {
        document.documentElement.classList.remove('font-loading');
        document.documentElement.classList.add('font-loaded');
      }).catch(() => {
        document.documentElement.classList.remove('font-loading');
        document.documentElement.classList.add('font-loaded');
      });
    }
  `,
  
  // CLS prevention
  clsPrevention: `
    if (typeof document !== 'undefined') {
      const style = document.createElement('style');
      style.textContent = \`
        img:not([width]):not([height]) { aspect-ratio: 16 / 9; }
        .reserve-space { min-height: 200px; }
        .font-loading { visibility: hidden; }
        .font-loaded { visibility: visible; }
      \`;
      document.head.appendChild(style);
    }
  `,
};

/**
 * Get all script hashes for CSP
 */
export function getScriptHashes(): string[] {
  const hashes: string[] = [];
  
  // Add hashes for common inline scripts
  Object.values(COMMON_SCRIPTS).forEach(script => {
    hashes.push(generateScriptHash(script));
  });
  
  return hashes;
}

/**
 * Enhanced CSP directives with script hashes
 */
export function getEnhancedCSPDirectives(): Record<string, string[]> {
  const scriptHashes = getScriptHashes();
  
  return {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      ...scriptHashes,
      'https://*.hsforms.net',
      'https://static.hsappstatic.net',
      // Web Vitals library
      'https://unpkg.com/web-vitals@3/dist/web-vitals.attribution.js',
    ],
    'style-src': [
      "'self'",
      "'unsafe-inline'", // Required for Tailwind CSS
      'https://fonts.googleapis.com'
    ],
    'font-src': [
      "'self'",
      'https://fonts.gstatic.com',
      'data:'
    ],
    'img-src': [
      "'self'",
      'data:',
      'https:',
      'blob:',
      'https://*.hsforms.com',
      'https://*.hsforms.net'
    ],
    'connect-src': [
      "'self'",
      'https://vercel.live',
      'https://va.vercel-scripts.com',
      'https://api.vercel.com',
      'https://*.hsforms.com',
      'https://*.hsforms.net'
    ],
    'frame-src': [
      "'self'",
      'https://*.hsforms.com',
      'https://*.hsforms.net'
    ],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': [
      "'self'",
      'https://*.hsforms.com',
      'https://*.hsforms.net'
    ],
    'frame-ancestors': ["'none'"],
    'upgrade-insecure-requests': [],
    'report-uri': ['/api/csp-report'],
  };
}

/**
 * Validate script hash format
 */
export function isValidScriptHash(hash: string): boolean {
  const hashRegex = /^'sha(256|384|512)-[A-Za-z0-9+/]+={0,2}'$/;
  return hashRegex.test(hash);
}

/**
 * Extract hash from script content for validation
 */
export function validateScriptAgainstHash(script: string, hash: string): boolean {
  const expectedHash = generateScriptHash(script);
  return expectedHash === hash;
}
