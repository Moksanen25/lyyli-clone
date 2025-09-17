import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { addSecurityHeaders, createSecurityConfig, securityMiddleware } from '@/middleware/security';
import { ensureEnvValidated } from '@/lib/env';

// next-intl locale routing
const intlMiddleware = createMiddleware({
  locales: ['en', 'fi'],
  defaultLocale: 'en',
  localePrefix: 'as-needed'
});

export default function middleware(request: NextRequest) {
  // Validate env once
  ensureEnvValidated();

  const securityConfig = createSecurityConfig(process.env.NODE_ENV as 'development' | 'staging' | 'production');

  // Early security checks (may block request)
  const blocked = securityMiddleware(request, securityConfig);
  if (blocked) {
    return addSecurityHeaders(blocked, securityConfig);
  }

  // Locale routing via next-intl
  const intlResponse = intlMiddleware(request);
  const response = intlResponse ?? NextResponse.next();

  // Add security headers on the way out
  return addSecurityHeaders(response, securityConfig);
}

// Run on all app routes except Next internals, static files, and APIs
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};


