import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { getClientIP } from '@/lib/security';

export interface SecurityConfig {
  enableCSP: boolean;
  enableHSTS: boolean;
  enableXSSProtection: boolean;
  enableContentTypeOptions: boolean;
  enableFrameOptions: boolean;
  enableReferrerPolicy: boolean;
  enablePermissionsPolicy: boolean;
  cspDirectives: Record<string, string[]>;
  hstsMaxAge: number;
  referrerPolicy: string;
  permissionsPolicy: Record<string, string[]>;
}

/**
 * Default security configuration
 */
export const DEFAULT_SECURITY_CONFIG: SecurityConfig = {
  enableCSP: true,
  enableHSTS: true,
  enableXSSProtection: true,
  enableContentTypeOptions: true,
  enableFrameOptions: true,
  enableReferrerPolicy: true,
  enablePermissionsPolicy: true,
  hstsMaxAge: 31536000, // 1 year
  referrerPolicy: 'strict-origin-when-cross-origin',
  cspDirectives: {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      "'unsafe-inline'", // Required for Next.js
      "'unsafe-eval'",   // Required for Next.js development
      'https://vercel.live',
      'https://va.vercel-scripts.com'
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
      'blob:'
    ],
    'connect-src': [
      "'self'",
      'https://vercel.live',
      'https://va.vercel-scripts.com',
      'https://api.vercel.com'
    ],
    'frame-src': ["'none'"],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"],
    'upgrade-insecure-requests': [],
  },
  permissionsPolicy: {
    'camera': ['()'],
    'microphone': ['()'],
    'geolocation': ['()'],
    'payment': ['()'],
    'usb': ['()'],
    'magnetometer': ['()'],
    'gyroscope': ['()'],
    'accelerometer': ['()'],
    'ambient-light-sensor': ['()'],
    'autoplay-policy': ['()'],
    'battery': ['()'],
    'cross-origin-isolated': ['()'],
    'display-capture': ['()'],
    'document-domain': ['()'],
    'encrypted-media': ['()'],
    'execution-while-not-rendered': ['()'],
    'execution-while-out-of-viewport': ['()'],
    'fullscreen': ['()'],
    'keyboard-map': ['()'],
    'picture-in-picture': ['()'],
    'publickey-credentials-get': ['()'],
    'screen-wake-lock': ['()'],
    'sync-xhr': ['()'],
    'trust-token-redemption': ['()'],
    'web-share': ['()'],
    'xr-spatial-tracking': ['()'],
  },
};

/**
 * Generate Content Security Policy header value
 */
function generateCSPHeader(directives: Record<string, string[]>): string {
  return Object.entries(directives)
    .map(([directive, sources]) => {
      if (sources.length === 0) {
        return directive;
      }
      return `${directive} ${sources.join(' ')}`;
    })
    .join('; ');
}

/**
 * Generate Permissions Policy header value
 */
function generatePermissionsPolicyHeader(policies: Record<string, string[]>): string {
  return Object.entries(policies)
    .map(([feature, origins]) => `${feature}=${origins.join(', ')}`)
    .join(', ');
}

/**
 * Add security headers to response
 */
export function addSecurityHeaders(
  response: NextResponse,
  config: SecurityConfig = DEFAULT_SECURITY_CONFIG
): NextResponse {
  try {
    // Content Security Policy
    if (config.enableCSP) {
      const cspValue = generateCSPHeader(config.cspDirectives);
      response.headers.set('Content-Security-Policy', cspValue);
    }

    // HTTP Strict Transport Security
    if (config.enableHSTS) {
      response.headers.set(
        'Strict-Transport-Security',
        `max-age=${config.hstsMaxAge}; includeSubDomains; preload`
      );
    }

    // X-Content-Type-Options
    if (config.enableContentTypeOptions) {
      response.headers.set('X-Content-Type-Options', 'nosniff');
    }

    // X-Frame-Options
    if (config.enableFrameOptions) {
      response.headers.set('X-Frame-Options', 'DENY');
    }

    // X-XSS-Protection
    if (config.enableXSSProtection) {
      response.headers.set('X-XSS-Protection', '1; mode=block');
    }

    // Referrer Policy
    if (config.enableReferrerPolicy) {
      response.headers.set('Referrer-Policy', config.referrerPolicy);
    }

    // Permissions Policy
    if (config.enablePermissionsPolicy) {
      const permissionsValue = generatePermissionsPolicyHeader(config.permissionsPolicy);
      response.headers.set('Permissions-Policy', permissionsValue);
    }

    // Additional security headers
    response.headers.set('X-DNS-Prefetch-Control', 'off');
    response.headers.set('X-Download-Options', 'noopen');
    response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');

    // Remove server information
    response.headers.delete('Server');
    response.headers.delete('X-Powered-By');

    logger.debug('Security headers added successfully', {
      csp: config.enableCSP,
      hsts: config.enableHSTS,
      xss: config.enableXSSProtection,
    });

  } catch (error) {
    logger.error('Failed to add security headers', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }

  return response;
}

/**
 * Security middleware for Next.js
 */
export function securityMiddleware(
  request: NextRequest,
  config: SecurityConfig = DEFAULT_SECURITY_CONFIG
): NextResponse | null {
  try {
    // Log security-related requests
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      logger.info('Security middleware processing request', {
        method: request.method,
        url: request.url,
        userAgent: request.headers.get('user-agent'),
        ip: getClientIP(request),
      });
    }

    // Check for suspicious patterns
    const url = request.url.toLowerCase();
    const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';

    // Block common attack patterns
    const suspiciousPatterns = [
      /\.\.\//,           // Directory traversal
      /<script/i,         // XSS attempts
      /javascript:/i,     // JavaScript protocol
      /vbscript:/i,       // VBScript protocol
      /on\w+\s*=/i,       // Event handlers
      /eval\s*\(/i,       // eval() calls
      /expression\s*\(/i, // CSS expressions
    ];

    for (const pattern of suspiciousPatterns) {
      if (pattern.test(url) || pattern.test(userAgent)) {
        logger.warn('Suspicious request blocked', {
          url: request.url,
          userAgent: request.headers.get('user-agent'),
          ip: getClientIP(request),
          pattern: pattern.source,
        });

        return new NextResponse('Forbidden', { status: 403 });
      }
    }

    // Block requests with suspicious headers
    const suspiciousHeaders = [
      'x-forwarded-for',
      'x-real-ip',
      'x-forwarded-proto',
      'x-forwarded-host',
      'x-forwarded-port',
    ];

    for (const header of suspiciousHeaders) {
      if (request.headers.get(header)) {
        logger.warn('Suspicious header detected', {
          header,
          value: request.headers.get(header),
          url: request.url,
          ip: getClientIP(request),
        });
      }
    }

    // Continue with normal processing
    return null;

  } catch (error) {
    logger.error('Security middleware error', {
      error: error instanceof Error ? error.message : 'Unknown error',
      url: request.url,
      method: request.method,
    });

    // On error, allow the request (fail open for safety)
    return null;
  }
}

/**
 * Create a security configuration for specific environments
 */
export function createSecurityConfig(environment: 'development' | 'staging' | 'production'): SecurityConfig {
  const baseConfig = { ...DEFAULT_SECURITY_CONFIG };

  switch (environment) {
    case 'development':
      // Relaxed security for development
      baseConfig.enableHSTS = false;
      baseConfig.cspDirectives['script-src'].push("'unsafe-eval'");
      baseConfig.cspDirectives['script-src'].push("'unsafe-inline'");
      break;

    case 'staging':
      // Moderate security for staging
      baseConfig.enableHSTS = true;
      baseConfig.hstsMaxAge = 300; // 5 minutes
      break;

    case 'production':
      // Strict security for production
      baseConfig.enableCSP = true;
      baseConfig.enableHSTS = true;
      baseConfig.enableXSSProtection = true;
      baseConfig.enableContentTypeOptions = true;
      baseConfig.enableFrameOptions = true;
      baseConfig.enableReferrerPolicy = true;
      baseConfig.enablePermissionsPolicy = true;
      break;
  }

  return baseConfig;
}

/**
 * Validate security configuration
 */
export function validateSecurityConfig(config: SecurityConfig): string[] {
  const errors: string[] = [];

  if (config.hstsMaxAge < 0) {
    errors.push('HSTS max age must be positive');
  }

  if (config.hstsMaxAge > 31536000) {
    errors.push('HSTS max age should not exceed 1 year');
  }

  if (!['no-referrer', 'no-referrer-when-downgrade', 'origin', 'origin-when-cross-origin', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin', 'unsafe-url'].includes(config.referrerPolicy)) {
    errors.push('Invalid referrer policy');
  }

  return errors;
}
