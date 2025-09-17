import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import crypto from 'node:crypto';
import { addSecurityHeaders, createSecurityConfig, securityMiddleware } from '@/middleware/security';
import { ensureEnvValidated } from '@/lib/env';
import { logger } from '@/lib/logger';

// next-intl locale routing
const intlMiddleware = createMiddleware({
  locales: ['en', 'fi'],
  defaultLocale: 'en',
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

    // Nonce for CSP
    const nonce = crypto.randomBytes(16).toString('base64');

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

    // Add security headers on the way out (with nonce)
    return addSecurityHeaders(response, securityConfig, nonce);
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


