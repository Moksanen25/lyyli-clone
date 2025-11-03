import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { addSecurityHeaders, createSecurityConfig, securityMiddleware } from '@/middleware/security';
import { addCacheHeaders } from '@/middleware/cache';
import { logErrorMetric } from '@/lib/monitoring';
import { ensureEnvValidated } from '@/lib/env';
import { logger } from '@/lib/logger';
import { 
  CANONICAL_HOST, 
  shouldRedirectToCanonical, 
  getCanonicalRedirectUrl 
} from '@/lib/canonical-host';

// next-intl locale routing
const intlMiddleware = createMiddleware({
  locales: ['en', 'fi'],
  defaultLocale: 'en',
  // Handle root routing automatically - no need for always prefix
  localePrefix: 'as-needed'
});

export default function middleware(request: NextRequest) {
  // Validate env once, but never fail middleware
  try {
    ensureEnvValidated();
  } catch (error) {
    logger.warn('Env validation failed in middleware (continuing)', {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }

  // Check for redirect loops by counting redirect headers
  const redirectCount = request.headers.get('x-redirect-count') || '0';
  const redirectCountNum = parseInt(redirectCount, 10);
  
  if (redirectCountNum >= 3) {
    logger.error('Too many redirects detected, stopping redirect chain', {
      url: request.url,
      redirectCount: redirectCountNum
    });
    return NextResponse.next();
  }

  // Handle canonical host redirects FIRST (301 redirects)
  const hostname = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;
  
  // Log redirect decisions for debugging (only in production)
  if (process.env.NODE_ENV === 'production') {
    logger.debug('Canonical host check', {
      hostname,
      pathname,
      shouldRedirect: shouldRedirectToCanonical(hostname, pathname),
      environment: process.env.NODE_ENV
    });
  }
  
  // Check if we should redirect to canonical host
  if (shouldRedirectToCanonical(hostname, pathname)) {
    const canonicalUrl = getCanonicalRedirectUrl(request);
    logger.info('Redirecting to canonical host', {
      from: request.url,
      to: canonicalUrl.toString(),
      hostname,
      pathname,
      redirectCount: redirectCountNum + 1
    });
    
    const response = NextResponse.redirect(canonicalUrl, 301);
    response.headers.set('x-redirect-count', (redirectCountNum + 1).toString());
    return response;
  }

  try {
    const securityConfig = createSecurityConfig(process.env.NODE_ENV as 'development' | 'staging' | 'production');

    // Early security checks (may block request)
    try {
      const blocked = securityMiddleware(request, securityConfig);
      if (blocked) {
        return addSecurityHeaders(blocked, securityConfig);
      }
    } catch (error) {
      logger.error('Security middleware threw', {
        error: error instanceof Error ? error.message : 'Unknown error',
        url: request.url
      });
      // continue
    }

    // Nonce for CSP (Edge Runtime compatible)
    const nonce = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    // Locale routing via next-intl
    let response: NextResponse;
    try {
      const intlResponse = intlMiddleware(request);
      response = intlResponse ?? NextResponse.next();
    } catch (error) {
      logger.error('next-intl middleware threw', {
        error: error instanceof Error ? error.message : 'Unknown error',
        url: request.url
      });
      response = NextResponse.next();
    }

    // Add nonce to response for downstream inline scripts if needed
    response.headers.set('x-csp-nonce', nonce);
    // Also set cookie so Server Components can read it reliably
    response.cookies.set('csp-nonce', nonce, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    // Add security headers on the way out (with nonce)
    response = addSecurityHeaders(response, securityConfig, nonce);
    
    // Add caching headers for static assets
    response = addCacheHeaders(request, response);
    
    // Log error metrics for 4xx and 5xx responses
    if (response.status >= 400) {
      logErrorMetric(request, response);
    }
    
    return response;
  } catch (error) {
    logger.error('Root middleware handler threw', {
      error: error instanceof Error ? error.message : 'Unknown error',
      url: request.url
    });
    return NextResponse.next();
  }
}

// Run on all app routes except Next internals, static files, and APIs
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};


