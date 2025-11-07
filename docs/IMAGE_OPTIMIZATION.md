# Image Optimization Guide

## Overview

All images on the Lyyli.ai website are optimized for performance using Next.js Image component with WebP/AVIF formats and responsive delivery.

## Compression Results

After optimization (October 2025):

- **10 images processed**
- **Original total size**: 14.89 MB
- **Optimized PNG/JPEG size**: ~2.8 MB (81% reduction)
- **WebP versions**: ~600 KB (96% reduction)
- **AVIF versions**: ~490 KB (97% reduction)

### Largest Images Optimized

| Original File          | Original Size | WebP Size | AVIF Size | Reduction |
| ---------------------- | ------------- | --------- | --------- | --------- |
| Desktop_UI_for_web.png | 2.47 MB       | 110 KB    | 100 KB    | 96%       |
| cybersecurity_hero.png | 2.24 MB       | 73 KB     | 88 KB     | 97%       |
| Features_hero.png      | 1.92 MB       | 54 KB     | 57 KB     | 97%       |

## Next.js Image Configuration

### Format Support

```typescript
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
```

- **AVIF**: First preference (best compression, ~20% smaller than WebP)
- **WebP**: Second preference (excellent compression, universal support)
- **PNG/JPEG**: Fallback for older browsers

## Usage Guidelines

### Above-the-Fold Images (Priority Loading)

For images visible on initial page load (logo, hero images):

```tsx
<Image
  src="/images/hero.webp"
  alt="Hero image"
  width={1920}
  height={1080}
  priority // Critical for LCP
  sizes="100vw"
/>
```

### Below-the-Fold Images (Lazy Loading)

For images below the initial viewport:

```tsx
<Image
  src="/images/feature.webp"
  alt="Feature"
  width={800}
  height={600}
  loading="lazy" // Defers loading
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### Responsive Images with Fill

For images that need to fill a container:

```tsx
<div className="relative w-full h-64">
  <Image
    src="/images/card.webp"
    alt="Card image"
    fill
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    className="object-cover"
  />
</div>
```

## Size Guidelines

### Recommended Sizes

- **Hero images**: Max 1920px width
- **Card images**: 600-800px width
- **Thumbnails**: 200-400px width
- **Icons/logos**: 32-128px width

### File Size Targets

- **Above-the-fold hero**: < 200 KB (original), < 50 KB (WebP/AVIF)
- **Card images**: < 100 KB (original), < 30 KB (WebP/AVIF)
- **Thumbnails**: < 50 KB (original), < 15 KB (WebP/AVIF)

## Scripts

### Find Oversized Images

```bash
npm run optimize:check
# or
node scripts/optimize-images.mjs
```

Reports:

- Images > 1 MB (urgent)
- Images > 500 KB (warning)
- Total image inventory
- Compression recommendations

### Compress Images

```bash
npm run optimize:compress
# or
node scripts/compress-images.mjs
```

Automatically:

- Generates WebP versions (85% quality)
- Generates AVIF versions (80% quality)
- Optimizes original PNG/JPEG in-place
- Resizes to max 1920px width
- Preserves aspect ratios

## Performance Metrics

### Target Metrics (Mobile)

- **LCP**: ≤ 2.0s (Good: < 2.5s)
- **FID**: ≤ 100ms
- **CLS**: ≤ 0.1

### Actual Results

Run Lighthouse audit:

```bash
npm run lighthouse
```

## Best Practices

### DO ✅

- Use Next.js `<Image>` component for all images
- Add `priority` to above-the-fold images
- Add `loading="lazy"` to below-the-fold images
- Specify explicit `width` and `height` OR use `fill` with `sizes`
- Use descriptive `alt` text for accessibility
- Store images in `/public/images/` directory
- Run compression script before committing large images

### DON'T ❌

- Use `<img>` tags directly
- Omit width/height attributes (causes CLS)
- Use `priority` on multiple images
- Skip the `sizes` attribute with `fill`
- Commit unoptimized images > 500 KB
- Use external image CDNs without Next.js Image

## Troubleshooting

### Image Not Loading

- Check file exists in `/public/images/`
- Verify path starts with `/images/` not `/public/images/`
- Check browser console for errors

### Poor Performance

- Remove `priority` from below-the-fold images
- Add `loading="lazy"` to non-critical images
- Verify WebP/AVIF formats are generated
- Check Network tab for image sizes

### Layout Shift (CLS)

- Always specify `width` and `height` OR use `fill`
- Use `sizes` attribute for responsive images
- Reserve space in CSS for images

## Future Enhancements

1. **Progressive Image Loading**: Blur-up placeholders using `placeholder="blur"`
2. **Image CDN**: Consider Cloudinary or Imgix for advanced transformations
3. **Art Direction**: Different images per breakpoint using `<picture>`
4. **Animated Content**: Optimize GIFs to WebM/MP4 video

## Additional Resources

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Web.dev Image Optimization](https://web.dev/fast/#optimize-your-images)
- [Sharp Documentation](https://sharp.pixelplumbing.com/)

---

Last updated: October 2025
