# Favicon Setup Documentation

This document describes the complete favicon and app icon setup for the Lyyli.ai website.

## Overview

The favicon setup includes a comprehensive set of icons for different devices and platforms, proper web app manifest configuration, and theme color settings.

## Files Structure

### Root Public Directory (`/public/`)
- `favicon.ico` - Main favicon file (32x32 ICO format)
- `favicon.svg` - SVG favicon for modern browsers
- `site.webmanifest` - Web App Manifest for PWA functionality
- `browserconfig.xml` - Microsoft browser configuration

### Icons Directory (`/public/icons/`)
- `favicon-16x16.png` - 16x16 PNG favicon
- `favicon-32x32.png` - 32x32 PNG favicon
- `apple-touch-icon.png` - 180x180 Apple touch icon
- `icon-192x192.png` - 192x192 PWA icon
- `icon-512x512.png` - 512x512 PWA icon
- `android-chrome-192x192.png` - Android Chrome 192x192 icon
- `android-chrome-512x512.png` - Android Chrome 512x512 icon

## Configuration

### Layout Configuration (`src/app/layout.tsx`)

The layout includes both Next.js metadata API configuration and manual `<head>` links:

```tsx
export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  themeColor: "#2F5D50",
};
```

And manual head links for additional compatibility:

```html
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
<link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
<link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192x192.png" />
<link rel="icon" type="image/png" sizes="512x512" href="/icons/icon-512x512.png" />
<link rel="manifest" href="/site.webmanifest" />
<meta name="theme-color" content="#2F5D50" />
```

### Web App Manifest (`/public/site.webmanifest`)

The manifest includes:
- App name and description
- Theme colors (#2F5D50)
- Display mode (standalone)
- All required icon sizes
- App shortcuts
- Screenshots for app stores
- Protocol handlers

### Browser Configuration (`/public/browserconfig.xml`)

Microsoft browser configuration with:
- Tile color (#2F5D50)
- Tile image references

## Theme Color

The theme color `#2F5D50` (Lyyli.ai brand green) is used consistently across:
- Web App Manifest
- Browser Configuration XML
- HTML meta tags
- PWA theme settings

## Testing

### Unit Tests
- `src/__tests__/favicon.test.tsx` - Tests favicon metadata configuration
- `src/__tests__/favicon-integration.test.tsx` - Tests file structure and manifest

### Verification Script
- `scripts/verify-favicons.mjs` - Comprehensive verification script that checks:
  - File existence
  - File sizes
  - Manifest structure
  - Layout configuration
  - HTTP endpoint availability

### Running Tests
```bash
# Run favicon unit tests
npm run favicon:test

# Run comprehensive verification
npm run favicon:verify
```

## Browser Support

The favicon setup supports:
- **Modern Browsers**: SVG favicon, PNG icons
- **Legacy Browsers**: ICO favicon
- **Mobile Safari**: Apple touch icons
- **Android Chrome**: Android Chrome icons
- **PWA**: Web app manifest with all required sizes
- **Microsoft Browsers**: Browser configuration XML

## Icon Sizes

| Size | Usage | File |
|------|-------|------|
| 16x16 | Browser tab favicon | `favicon-16x16.png` |
| 32x32 | Browser tab favicon | `favicon-32x32.png` |
| 180x180 | Apple touch icon | `apple-touch-icon.png` |
| 192x192 | PWA icon, Android | `icon-192x192.png`, `android-chrome-192x192.png` |
| 512x512 | PWA icon, Android | `icon-512x512.png`, `android-chrome-512x512.png` |

## File Size Optimization

All favicon files are optimized for web delivery:
- ICO files: < 50KB
- PNG files: < 100KB (depending on size)
- SVG files: < 200KB

## Troubleshooting

### Common Issues

1. **Conflicting favicon routes**: Ensure no `favicon.ico` exists in `src/app/` directory
2. **404 errors**: Verify all files exist in the correct public directory structure
3. **Manifest errors**: Check JSON syntax in `site.webmanifest`
4. **Theme color not applied**: Verify theme color is set in both manifest and meta tags

### Verification Checklist

- [ ] All required files exist in `/public/` and `/public/icons/`
- [ ] No conflicting favicon files in `src/app/`
- [ ] Layout includes all required favicon links
- [ ] Manifest is valid JSON with all required properties
- [ ] Theme color is consistent across all files
- [ ] All HTTP endpoints return 200 status codes

## Maintenance

When updating favicons:
1. Replace files in `/public/icons/` directory
2. Update `site.webmanifest` if icon references change
3. Run `npm run favicon:verify` to ensure everything works
4. Test across different browsers and devices
5. Update this documentation if needed
