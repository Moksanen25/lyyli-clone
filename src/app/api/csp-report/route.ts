import { NextRequest, NextResponse } from 'next/server';
import { addSecurityHeaders, createSecurityConfig } from '@/middleware/security';
import { logger } from '@/lib/logger';

const securityConfig = createSecurityConfig(process.env.NODE_ENV as 'development' | 'staging' | 'production');

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let body: unknown = null;

    if (contentType.includes('application/json') || contentType.includes('application/reports+json')) {
      body = await request.json().catch(() => null);
    } else if (contentType.includes('application/csp-report')) {
      // Older browsers send 'application/csp-report' with JSON payload
      const text = await request.text().catch(() => '');
      try { body = JSON.parse(text); } catch { body = { raw: text }; }
    } else {
      // Fallback
      const text = await request.text().catch(() => '');
      body = text ? { raw: text } : null;
    }

    logger.warn('CSP violation reported', {
      path: request.nextUrl.pathname,
      report: body,
      ua: request.headers.get('user-agent'),
      referrer: request.headers.get('referer') || request.headers.get('referrer'),
    });

    const res = new NextResponse(null, { status: 204 });
    return addSecurityHeaders(res, securityConfig);
  } catch (error) {
    logger.error('Failed to handle CSP report', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    const res = new NextResponse(null, { status: 204 });
    return addSecurityHeaders(res, securityConfig);
  }
}

export function GET() {
  // Do not expose collected reports; return 405 for non-POST
  const res = new NextResponse('Method Not Allowed', { status: 405 });
  return addSecurityHeaders(res, securityConfig);
}


