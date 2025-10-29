# SEO Files Setup Documentation

This document describes the robots.txt and sitemap.xml setup for the Lyyli.ai website, including validation scripts and CI integration.

## Overview

The SEO files setup ensures proper search engine optimization by:
- Configuring robots.txt to allow crawling of public pages while blocking admin/private areas
- Generating a comprehensive sitemap.xml with all public pages and dynamic routes
- Providing automated validation and CI checks

## Files

### robots.txt (`/public/robots.txt`)

**Purpose**: Instructs search engine crawlers which pages to crawl and which to avoid.

**Configuration**:
- Allows crawling of all public pages
- Blocks admin, API, and development areas
- References the sitemap location
- Includes crawl delay for respectful crawling

**Key Directives**:
```
User-agent: *
Sitemap: https://lyyli.ai/sitemap.xml
Disallow: /_next/
Disallow: /api/
Disallow: /admin/
Disallow: /coverage/
Disallow: /test-results/
Disallow: /playwright-report/
Disallow: /playwright/
```

### sitemap.xml (`/public/sitemap.xml`)

**Purpose**: Provides search engines with a complete list of all public pages on the site.

**Content Includes**:
- Static pages (home, features, pricing, about, contact, etc.)
- Localized versions (English and Finnish)
- Dynamic blog posts from content directory
- Help pages and documentation
- Legal pages (privacy, cookies)

**Current Statistics**:
- **Total URLs**: 88
- **Blog Posts**: 23 (14 EN + 9 FI)
- **Help Pages**: 42 (21 EN + 21 FI)
- **Static Pages**: 23

## Scripts

### Sitemap Generator (`scripts/generate-sitemap.mjs`)

Generates a comprehensive sitemap.xml file by:
1. Scanning the content directory for blog posts
2. Including all static pages with proper priorities
3. Adding help pages and dynamic routes
4. Setting appropriate lastmod dates and change frequencies

**Usage**:
```bash
npm run sitemap:generate
```

### SEO Validation (`scripts/validate-seo-files.mjs`)

Comprehensive validation script that checks:
- robots.txt syntax and required directives
- sitemap.xml structure and content
- Production file accessibility
- URL format and duplicates
- Expected page inclusion

**Usage**:
```bash
npm run seo:validate
```

## Testing

### Unit Tests (`src/__tests__/seo-files.test.ts`)

Comprehensive test suite covering:
- File existence and accessibility
- robots.txt structure and directives
- sitemap.xml XML format and content
- URL validation and duplicates
- Blog post and help page inclusion
- File consistency checks

**Usage**:
```bash
npm test -- --testPathPatterns=seo-files
```

## CI/CD Integration

### GitHub Actions Workflow (`.github/workflows/seo-validation.yml`)

Automated validation that runs on:
- Push to main/develop branches
- Pull requests affecting SEO files
- Daily schedule (2 AM UTC) for production monitoring

**Features**:
- Generates updated sitemap automatically
- Validates all SEO files
- Runs comprehensive tests
- Commits sitemap changes if needed
- Uploads validation results as artifacts

## Page Priorities

The sitemap uses the following priority structure:

| Priority | Page Type | Examples |
|----------|-----------|----------|
| 1.0 | Homepage | `/` |
| 0.9 | Localized homepages | `/en`, `/fi` |
| 0.8 | Main features | `/en/features`, `/en/pricing` |
| 0.7 | Content pages | `/en/about`, `/en/blog`, `/en/security` |
| 0.6 | Contact/support | `/en/contact`, `/en/help` |
| 0.5 | Blog posts, waitlist | `/en/blog/post-slug`, `/en/waitlist` |
| 0.4 | Help documentation | `/en/help/getting-started` |
| 0.3 | Legal pages | `/en/privacy`, `/en/cookies` |

## Change Frequencies

| Frequency | Content Type | Examples |
|-----------|--------------|----------|
| weekly | Dynamic content | Homepage, blog index |
| monthly | Static content | Features, pricing, help pages |
| yearly | Legal/stable | Privacy policy, terms |

## Maintenance

### Adding New Pages

1. **Static Pages**: Add to `staticPages` array in `scripts/generate-sitemap.mjs`
2. **Blog Posts**: Automatically detected from `content/blog/` directory
3. **Help Pages**: Add to `helpPages` array in the generator script
4. **Dynamic Routes**: Update the generator script as needed

### Updating Sitemap

The sitemap is automatically regenerated:
- During CI/CD pipeline
- When content changes are detected
- Daily via scheduled workflow

Manual regeneration:
```bash
npm run sitemap:generate
```

### Validation

Regular validation ensures:
- All files are properly formatted
- No broken links or duplicates
- Production files are accessible
- Expected pages are included

Run validation:
```bash
npm run seo:validate
```

## Production Monitoring

The CI workflow monitors production files daily and:
- Fetches live robots.txt and sitemap.xml
- Validates their structure and content
- Compares with local versions
- Reports any discrepancies

## Troubleshooting

### Common Issues

1. **Sitemap not updating**: Check if content directory structure changed
2. **Missing pages**: Verify pages are added to generator script
3. **Validation failures**: Check file permissions and content format
4. **Production mismatches**: Ensure deployment includes latest files

### Validation Checklist

- [ ] robots.txt allows public pages and blocks admin areas
- [ ] sitemap.xml includes all public pages
- [ ] No duplicate URLs in sitemap
- [ ] All URLs use https://lyyli.ai domain
- [ ] Blog posts are automatically included
- [ ] Help pages are properly listed
- [ ] CI validation passes
- [ ] Production files are accessible

## Performance

- **robots.txt**: ~867 bytes (lightweight)
- **sitemap.xml**: ~15KB (88 URLs, well within limits)
- **Generation time**: < 1 second
- **Validation time**: < 5 seconds

The setup is optimized for performance while maintaining comprehensive coverage of all public content.
