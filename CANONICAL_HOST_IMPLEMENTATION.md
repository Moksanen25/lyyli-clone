# Canonical Host Implementation

## Overview

This document outlines the implementation of canonical host management for the Lyyli.ai website. The canonical host is set to `lyyli.ai` (without www) to ensure consistent SEO and prevent duplicate content issues.

## Canonical Host Configuration

### **Canonical Host**: `lyyli.ai`
- **Protocol**: HTTPS
- **Full URL**: `https://lyyli.ai`
- **Decision**: No www subdomain for cleaner, shorter URLs

### **Redirected Variants**:
- `www.lyyli.ai` → `lyyli.ai` (301 redirect)
- Any other `lyyli.ai` subdomains → `lyyli.ai` (301 redirect)
- Only applies in production environment

## Implementation Details

### 1. Canonical Host Utilities (`src/lib/canonical-host.ts`)

```typescript
export const CANONICAL_HOST = 'lyyli.ai';
export const CANONICAL_URL = 'https://lyyli.ai';

// Key functions:
- getCanonicalHost(): Returns canonical host based on environment
- getCanonicalBaseUrl(): Returns canonical base URL
- isCanonicalHost(hostname): Checks if hostname is canonical
- shouldRedirectToCanonical(hostname): Determines if redirect is needed
- validateCanonicalHost(url): Validates URL uses canonical host
- toCanonicalUrl(url): Converts any URL to canonical format
```

### 2. Middleware Redirects (`src/middleware.ts`)

```typescript
// Handle canonical host redirects (301 redirects)
const hostname = request.headers.get('host') || '';

if (shouldRedirectToCanonical(hostname)) {
  const canonicalUrl = getCanonicalRedirectUrl(request);
  return NextResponse.redirect(canonicalUrl, 301);
}
```

### 3. Updated Canonical URL Generation (`src/lib/canonical.ts`)

```typescript
import { CANONICAL_URL } from './canonical-host';
const PRODUCTION_DOMAIN = CANONICAL_URL; // Now uses canonical-host utilities
```

## 301 Redirect Behavior

### Production Environment:
- ✅ `https://www.lyyli.ai` → `https://lyyli.ai`
- ✅ `https://api.lyyli.ai` → `https://lyyli.ai`
- ✅ `https://staging.lyyli.ai` → `https://lyyli.ai`
- ✅ `https://lyyli.ai` → No redirect (canonical)

### Development Environment:
- ✅ `http://localhost:3000` → No redirects (development mode)
- ✅ Allows local development without redirects

## Verification and Testing

### 1. Unit Tests (`src/__tests__/canonical-host.test.ts`)
- ✅ 19 test cases covering all functionality
- ✅ Environment-specific behavior testing
- ✅ Edge case handling (ports, invalid URLs)
- ✅ Redirect logic validation

### 2. Verification Script (`scripts/verify-canonical-host.mjs`)
```bash
npm run canonical:verify
```

**Features**:
- Tests actual redirects using Playwright
- Verifies canonical links in HTML
- Checks sitemap for canonical URLs
- Validates robots.txt sitemap reference
- Reports duplicate host versions

### 3. Package.json Scripts
```json
{
  "canonical:verify": "node scripts/verify-canonical-host.mjs",
  "canonical:test": "npm test -- --testPathPatterns=canonical-host"
}
```

## SEO Benefits

### 1. **Prevents Duplicate Content**
- All host variants redirect to canonical host
- Eliminates duplicate content penalties from search engines

### 2. **Consolidates Link Equity**
- All backlinks and internal links point to canonical host
- Prevents link equity dilution across multiple host variants

### 3. **Improves Crawling Efficiency**
- Search engines crawl only the canonical host
- Reduces crawl budget waste on duplicate content

### 4. **Consistent Branding**
- Single, clean domain without www
- Professional appearance and memorability

## Technical Implementation

### Middleware Flow:
1. **Host Detection**: Extract hostname from request headers
2. **Redirect Check**: Determine if redirect is needed
3. **301 Redirect**: Issue permanent redirect to canonical host
4. **Continue Processing**: Apply security headers and locale routing

### URL Generation:
- All canonical URLs use `https://lyyli.ai`
- Sitemap URLs use canonical host
- Hreflang URLs use canonical host
- Structured data URLs use canonical host

## Verification Checklist

### ✅ **Completed**:
- [x] Canonical host utilities implemented
- [x] 301 redirects configured in middleware
- [x] All URL generation uses canonical host
- [x] Unit tests for all functionality
- [x] Verification script for production testing
- [x] Package.json scripts added
- [x] Build passes successfully

### 🔍 **Production Verification** (Run after deployment):
- [ ] Test `https://www.lyyli.ai` redirects to `https://lyyli.ai`
- [ ] Verify all canonical links use `https://lyyli.ai`
- [ ] Check sitemap contains only canonical URLs
- [ ] Confirm robots.txt references canonical sitemap
- [ ] Run `npm run canonical:verify` on production

## Security Considerations

### HTTPS Enforcement:
- All redirects preserve HTTPS protocol
- Canonical host always uses HTTPS
- No mixed content issues

### Edge Runtime Compatibility:
- Middleware functions work in Edge Runtime
- No Node.js-specific dependencies
- Compatible with Vercel deployment

## Performance Impact

### Minimal Overhead:
- Redirect check is fast (simple string comparison)
- 301 redirects are cached by browsers
- No impact on canonical host requests

### SEO Benefits:
- Consolidates crawl budget
- Improves page ranking consolidation
- Eliminates duplicate content issues

## Monitoring and Maintenance

### Regular Checks:
1. **Monthly**: Run canonical verification script
2. **After Deployments**: Verify redirects work correctly
3. **SEO Audits**: Confirm no duplicate host versions in search results

### Alert Conditions:
- Redirects not working (404 errors on www)
- Canonical links pointing to non-canonical hosts
- Sitemap containing non-canonical URLs

## Conclusion

The canonical host implementation ensures:
- ✅ **SEO Optimization**: Single canonical host prevents duplicate content
- ✅ **User Experience**: Clean URLs without www subdomain
- ✅ **Technical Excellence**: Proper 301 redirects and URL generation
- ✅ **Maintainability**: Comprehensive testing and verification tools

The implementation is production-ready and will improve the website's SEO performance while maintaining a clean, professional appearance.
