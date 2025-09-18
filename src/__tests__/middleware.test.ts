/**
 * @jest-environment node
 */
import middleware from '@/middleware';

jest.mock('next-intl/middleware', () => ({
  __esModule: true,
  default: () => (/* req */) => undefined,
}));

function buildRequest(path: string, headers: Record<string, string> = {}) {
  const hdrs = {
    get: (key: string) => headers[key.toLowerCase()] ?? null,
  } as any;
  return {
    method: 'GET',
    url: `https://example.com${path}`,
    headers: hdrs,
    nextUrl: new URL(`https://example.com${path}`),
  } as any;
}

describe('middleware', () => {
  it('adds CSP header with nonce and security headers', () => {
    const req = buildRequest('/en');
    const res = middleware(req);
    expect(res.headers.get('Content-Security-Policy')).toBeTruthy();
    expect(res.headers.get('Content-Security-Policy')).toMatch(/script-src/);
    expect(res.headers.get('Strict-Transport-Security')).toBeTruthy();
    expect(res.headers.get('X-Content-Type-Options')).toBe('nosniff');
    expect(res.headers.get('Referrer-Policy')).toBeTruthy();
    expect(res.headers.get('Permissions-Policy')).toBeTruthy();
    // Nonce propagated via header
    const nonce = res.headers.get('x-csp-nonce');
    expect(nonce).toBeTruthy();
  });

  it('routes locales with next-intl and preserves headers', () => {
    const req = buildRequest('/');
    const res = middleware(req);
    // Response should exist and include CSP header
    expect(res.headers.get('Content-Security-Policy')).toBeTruthy();
  });
});


