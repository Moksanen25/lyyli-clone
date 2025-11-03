# JSON-LD Structured Data Guide

## Overview

The Lyyli.ai website implements comprehensive JSON-LD structured data for optimal SEO and rich search results. All schemas are validated and comply with schema.org standards.

## Implemented Schemas

### 1. Organization Schema
**Location**: All pages (via layout)
**Type**: `Organization`

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://lyyli.ai/#organization",
  "name": "Lyyli.ai",
  "legalName": "Content AI Oy",
  "logo": { ... },
  "sameAs": [
    "https://www.linkedin.com/company/lyyli-ai",
    "https://twitter.com/lyyli_ai"
  ],
  "founders": [ ... ],
  "contactPoint": { ... }
}
```

**Includes:**
- ✅ Company name and legal name
- ✅ Logo with dimensions
- ✅ URL
- ✅ sameAs social media links
- ✅ Founders information
- ✅ Contact point with email
- ✅ Address

### 2. Website Schema
**Location**: All pages (via layout)
**Type**: `WebSite`

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://lyyli.ai/#website",
  "name": "Lyyli.ai",
  "url": "https://lyyli.ai/en",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://lyyli.ai/en/help?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

**Includes:**
- ✅ Website name and URL
- ✅ Search action for site search
- ✅ Language specification
- ✅ Publisher reference

### 3. BreadcrumbList Schema
**Location**: Inner pages (depth > 1)
**Type**: `BreadcrumbList`

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://lyyli.ai/en"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Features",
      "item": "https://lyyli.ai/en/features"
    }
  ]
}
```

**Features:**
- ✅ Sequential positions
- ✅ Localized names (EN/FI)
- ✅ Full URLs for each level
- ✅ Automatic generation from pathname

### 4. Article Schema
**Location**: Blog post pages
**Type**: `Article`

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": "https://lyyli.ai/en/blog/post-slug#article",
  "headline": "Article Title",
  "description": "Article description",
  "image": { ... },
  "datePublished": "2025-01-15",
  "dateModified": "2025-01-15",
  "author": {
    "@type": "Person",
    "name": "Mikko Oksanen"
  },
  "publisher": {
    "@id": "https://lyyli.ai/#organization"
  },
  "keywords": "AI, communication, ...",
  "isAccessibleForFree": true
}
```

**Includes:**
- ✅ Headline and description
- ✅ Publication and modification dates
- ✅ Author information
- ✅ Publisher reference
- ✅ Featured image
- ✅ Keywords
- ✅ Language

## Schema Structure

### Schema Combination

Multiple schemas are combined using `@graph`:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", ... },
    { "@type": "WebSite", ... },
    { "@type": "BreadcrumbList", ... }
  ]
}
```

### Schema References

Schemas reference each other using `@id`:

```json
// Organization defines ID
{
  "@type": "Organization",
  "@id": "https://lyyli.ai/#organization"
}

// Article references Organization
{
  "@type": "Article",
  "publisher": {
    "@id": "https://lyyli.ai/#organization"
  }
}
```

## Implementation

### Layout-Level Schemas

```tsx
// src/app/[locale]/layout.tsx
import { 
  generateOrganizationSchema, 
  generateWebsiteSchema,
  generateBreadcrumbSchema,
  combineSchemas 
} from "@/lib/structured-data";

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(
      combineSchemas(
        generateOrganizationSchema(locale),
        generateWebsiteSchema(locale),
        generateBreadcrumbSchema(pathname, locale)
      )
    ),
  }}
/>
```

### Page-Level Schemas

```tsx
// src/app/[locale]/blog/[slug]/page.tsx
import { generateArticleSchema } from "@/lib/structured-data";

const articleSchema = generateArticleSchema({
  headline: post.title,
  description: post.description,
  image: post.image,
  datePublished: post.date,
  author: post.author,
  slug: post.slug,
  locale: currentLocale,
  keywords: post.keywords
});

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(articleSchema),
  }}
/>
```

## Validation

### Automated Testing

```bash
# Run structured data tests
npm run schema:test

# Run validation script
npm run schema:validate
```

**Test Coverage**: 44 tests
- ✅ Organization schema validation
- ✅ Website schema validation
- ✅ BreadcrumbList generation
- ✅ Article schema validation
- ✅ Schema combination
- ✅ URL consistency
- ✅ Required field validation

### Manual Validation

#### Google Rich Results Test
1. Visit: https://search.google.com/test/rich-results
2. Enter page URL or paste HTML
3. Verify no errors or warnings

#### Schema Markup Validator
1. Visit: https://validator.schema.org/
2. Paste JSON-LD code
3. Check for validation errors

### CI/CD Integration

The schema validation is integrated into CI via GitHub Actions:

```yaml
# .github/workflows/schema-validation.yml
- name: Run schema validation script
  run: npm run schema:validate

- name: Run structured data tests
  run: npm run schema:test
```

**Validation Steps:**
1. ✅ Run validation script
2. ✅ Run Jest tests
3. ✅ Build application
4. ✅ Check build output for schemas
5. ✅ Verify production domain usage

## Schema Requirements

### Required Fields by Type

#### Organization
- ✅ @context
- ✅ @type
- ✅ @id
- ✅ name
- ✅ url
- ✅ logo (recommended)
- ✅ sameAs (recommended)

#### Website
- ✅ @context
- ✅ @type
- ✅ @id
- ✅ name
- ✅ url
- ✅ potentialAction (recommended)

#### BreadcrumbList
- ✅ @context
- ✅ @type
- ✅ itemListElement (array)
  - position
  - name
  - item (URL)

#### Article
- ✅ @context
- ✅ @type
- ✅ @id
- ✅ headline
- ✅ datePublished
- ✅ author
- ✅ publisher (reference)
- ✅ image (recommended)
- ✅ dateModified (recommended)

## Best Practices

### DO ✅
- Use `@id` for entity references
- Combine multiple schemas with `@graph`
- Use production URLs only
- Validate with official tools
- Include recommended fields
- Localize content where appropriate
- Keep one JSON-LD block per schema type per page

### DON'T ❌
- Include duplicate schema types on same page
- Use localhost or preview URLs
- Mix schema contexts
- Omit required fields
- Nest schemas incorrectly
- Use invalid @type values

## Monitoring

### Google Search Console
Monitor rich results status:
1. Go to Search Console
2. Navigate to "Enhancements"
3. Check for:
   - Organization markup
   - Breadcrumbs
   - Article markup (blog posts)

### Expected Rich Results

**Organization:**
- Logo in search results
- Social links
- Contact information

**Breadcrumbs:**
- Navigation path in search results
- Better click-through rates

**Articles:**
- Enhanced blog post listings
- Author information
- Publication dates
- Featured images

## Troubleshooting

### Schema Not Appearing in Search Results

**Causes:**
- New schemas take time to be indexed
- Schema validation errors
- Page not crawled yet

**Solutions:**
1. Validate with Rich Results Test
2. Submit page to Google Search Console
3. Check for crawl errors

### Validation Errors

**Common Issues:**
- Missing required fields
- Invalid date formats
- Incorrect @type values
- Broken URL references

**Solutions:**
1. Run `npm run schema:validate`
2. Check error messages
3. Fix issues in source code
4. Re-validate

### Schema Not Rendering

**Check:**
1. View page source
2. Look for `application/ld+json`
3. Verify JSON is valid

**Solutions:**
- Check build output
- Verify component rendering
- Check for TypeScript errors

## Future Enhancements

1. **Product Schema**: For pricing page
2. **FAQPage Schema**: For FAQ sections
3. **HowTo Schema**: For tutorial content
4. **Review Schema**: For testimonials
5. **Event Schema**: For webinars/events

## Resources

- [Schema.org Documentation](https://schema.org/)
- [Google Search Central - Structured Data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [Rich Results Test](https://search.google.com/test/rich-results)
- [Schema Markup Validator](https://validator.schema.org/)

---

Last updated: October 2025
