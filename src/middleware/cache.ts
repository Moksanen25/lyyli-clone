import { NextRequest, NextResponse } from 'next/server';

/**
 * Generate ETag for static assets (Edge Runtime compatible)
 */
function generateETag(url: string): string {
  // Simple hash function for Edge Runtime compatibility
  let hash = 0;
  const str = url + Date.now().toString();
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return `"${Math.abs(hash).toString(16)}"`;
}

/**
 * Add caching headers for static assets
 */
export function addCacheHeaders(request: NextRequest, response: NextResponse): NextResponse {
  const { pathname } = request.nextUrl;
  
  // Add ETag for static assets
  if (pathname.startsWith('/_next/static/') || 
      pathname.startsWith('/images/') || 
      pathname.startsWith('/icons/') ||
      pathname.startsWith('/fonts/') ||
      pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|webp|avif|ico|woff|woff2|ttf|eot)$/)) {
    
    // Generate ETag based on URL
    const etag = generateETag(pathname);
    
    // Check if client has the same ETag
    const clientETag = request.headers.get('if-none-match');
    if (clientETag === etag) {
      return new NextResponse(null, { status: 304 });
    }
    
    response.headers.set('ETag', etag);
  }
  
  // Add compression headers
  const acceptEncoding = request.headers.get('accept-encoding') || '';
  
  if (acceptEncoding.includes('br')) {
    response.headers.set('Content-Encoding', 'br');
  } else if (acceptEncoding.includes('gzip')) {
    response.headers.set('Content-Encoding', 'gzip');
  }
  
  // Add Vary header for proper caching
  response.headers.set('Vary', 'Accept-Encoding');
  
  // Add additional caching headers for specific asset types
  if (pathname.match(/\.(js|css)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|avif)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (pathname.match(/\.(woff|woff2|ttf|eot)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  
  return response;
}

/**
 * Cache optimization configuration
 */
export const CACHE_CONFIG = {
  // Static assets - 1 year
  STATIC_ASSETS: 'public, max-age=31536000, immutable',
  
  // HTML pages - 1 hour
  HTML_PAGES: 'public, max-age=3600, must-revalidate',
  
  // API responses - 5 minutes
  API_RESPONSES: 'public, max-age=300, must-revalidate',
  
  // Service worker - no cache
  SERVICE_WORKER: 'public, max-age=0, must-revalidate',
  
  // Sitemap - 1 hour
  SITEMAP: 'public, max-age=3600',
  
  // Robots.txt - 1 day
  ROBOTS: 'public, max-age=86400',
} as const;
