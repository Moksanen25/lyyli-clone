# LCP (Largest Contentful Paint) Optimization Guide

## LCP Element Identification

### Home Page (`/[locale]/page.tsx`)
**LCP Element**: Hero section `<h1>` text
- Element: `text-4xl md:text-5xl text-forest text-center mb-8 font-playfair font-bold`
- Content: Hero headline text
- Font: Playfair Display (700 weight)
- Location: Above-the-fold, centered hero section

### Features Page (`/[locale]/features/page.tsx`)
**LCP Element**: Hero section `<h1>` text
- Element: `text-4xl md:text-5xl mb-6 font-playfair font-bold text-forest`
- Content: Features headline text
- Font: Playfair Display (700 weight)
- Location: Above-the-fold, centered hero section

## Optimization Strategy

### 1. Critical CSS (Already Implemented)
✅ **Status**: Implemented in `src/app/critical.css`

- Inlined critical CSS for above-the-fold content
- Includes hero typography, colors, layout utilities
- Font family variables defined
- Button styles for CTA elements
- Responsive utilities for hero section

### 2. Font Optimization
✅ **Status**: Optimized via next/font/google

**Primary Fonts**:
- **Inter**: Sans-serif body font (400, 500, 600, 700)
- **Playfair Display**: Serif headline font (400, 700)

**Configuration**:
```typescript
{
  subsets: ["latin"],
  display: "swap",  // ✅ Prevents FOIT (Flash of Invisible Text)
  variable: "--font-*",
  weight: [...]
}
```

**How it works**:
- `next/font/google` automatically:
  - Preloads fonts
  - Self-hosts fonts (no external requests)
  - Generates optimal font-face declarations
  - Sets `font-display: swap`
  - Inlines font CSS

### 3. Image Preloading
✅ **Status**: Implemented for critical images

**Currently Preloaded**:
```html
<link rel="preload" href="/images/logos/Lyyli.ai_no_BG.webp" as="image" type="image/webp" />
<link rel="preload" href="/images/general/Desktop_UI_for_web.webp" as="image" type="image/webp" />
```

**Note**: Home and features pages don't have hero images above-the-fold, so text is the LCP element.

### 4. Script Optimization
✅ **Status**: No render-blocking scripts

**Current Scripts**:
- JSON-LD structured data: Non-blocking, rendered server-side
- No third-party scripts above-the-fold
- Next.js scripts: Automatically optimized and deferred

### 5. LCP-Specific Optimizations

#### Text-based LCP Elements
Since both pages have text LCP elements (h1 headings), optimization focuses on:

1. **Font Loading** ✅
   - Self-hosted via next/font
   - font-display: swap
   - Preloaded automatically

2. **Critical CSS** ✅
   - Hero section styles inlined
   - Typography utilities included
   - Color variables defined

3. **Layout Stability** ✅
   - No layout shifts
   - Explicit sizing on all elements
   - Reserved space for content

4. **Rendering Priority** ✅
   - Hero section not blocked by images
   - No render-blocking resources
   - Fast text rendering with font-display: swap

## Performance Metrics

### Target Metrics
- **LCP**: ≤ 2.5s (Good: < 2.5s, Needs Improvement: 2.5-4s, Poor: > 4s)
- **FID**: ≤ 100ms
- **CLS**: ≤ 0.1

### Expected LCP Times

#### Desktop
- **Good**: < 1.5s
- **Needs Improvement**: 1.5-2.5s
- **Poor**: > 2.5s

#### Mobile
- **Good**: < 2.0s
- **Needs Improvement**: 2.0-3.0s
- **Poor**: > 3.0s

### Current Optimization Level

✅ **Fonts**: Optimized
- Self-hosted, preloaded, font-display: swap

✅ **CSS**: Optimized
- Critical CSS inlined
- Above-the-fold styles prioritized

✅ **Images**: Optimized
- WebP/AVIF formats
- Explicit dimensions
- Priority loading for above-the-fold

✅ **Scripts**: Optimized
- No render-blocking scripts
- Deferred loading for non-critical

## Verification Process

### 1. Local Development Test
```bash
npm run build
npm start
```

### 2. Lighthouse Audit
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit for home page (desktop)
lighthouse http://localhost:3000/en --view --only-categories=performance

# Run audit for home page (mobile)
lighthouse http://localhost:3000/en --view --preset=mobile --throttling.cpuSlowdownMultiplier=4

# Run audit for features page
lighthouse http://localhost:3000/en/features --view
```

### 3. Key Metrics to Check

#### Performance Score
- Target: 90-100
- If < 90: Check "Opportunities" and "Diagnostics"

#### LCP Breakdown
- **TTFB** (Time to First Byte): < 600ms
- **Resource Load Delay**: < 200ms
- **Resource Load Time**: < 500ms
- **Element Render Delay**: < 100ms

#### Render-Blocking Resources
- Should be: **0 render-blocking resources**
- If any exist: Move to critical CSS or defer

### 4. Chrome DevTools

**Performance Tab**:
1. Open DevTools → Performance
2. Click Record
3. Reload page
4. Stop recording
5. Look for "LCP" marker
6. Verify timing ≤ 2.5s

**Coverage Tab**:
1. Open DevTools → Coverage
2. Reload page
3. Check CSS/JS coverage
4. Unused CSS should be minimal for above-the-fold

## Troubleshooting

### LCP > 2.5s

**Check**:
1. Font loading time
2. Network waterfall for blocking resources
3. Server response time (TTFB)
4. CSS blocking render

**Solutions**:
- Ensure fonts are preloaded
- Check CDN/hosting performance
- Verify critical CSS is inlined
- Remove render-blocking resources

### Font Flash (FOIT/FOUT)

**Check**:
- `font-display` is set to `swap`
- Fonts are preloaded
- Font files are self-hosted

**Solutions**:
- Already using `display: "swap"` in font config
- next/font automatically handles preloading

### Layout Shift During Load

**Check**:
- All images have width/height
- Text content doesn't reflow
- No dynamic height changes

**Solutions**:
- Add explicit dimensions
- Reserve space for dynamic content
- Use aspect-ratio CSS property

## Monitoring

### Production Monitoring
- Use Google PageSpeed Insights
- Monitor Core Web Vitals in Google Search Console
- Set up Real User Monitoring (RUM)

### Continuous Integration
```bash
# Add to CI/CD pipeline
npm run build
lighthouse http://localhost:3000/en --output=json --output-path=./lighthouse-results.json
# Parse results and fail if LCP > 2.5s
```

## Additional Resources

- [Web.dev LCP Guide](https://web.dev/lcp/)
- [Next.js Font Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)

---

Last updated: October 2025
