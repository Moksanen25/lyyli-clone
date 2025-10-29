# 404 Not Found Page

## Overview

The 404 page provides a branded, user-friendly experience when users encounter non-existent routes. It includes helpful navigation, search functionality, and maintains brand consistency.

## Features

### 1. Branded Design
- **Lyyli.ai logo** - Clickable, returns to home
- **Brand colors** - Forest, Rose, and Turquoise palette
- **Consistent typography** - Playfair Display for headings, Inter for body
- **Gradient background** - Subtle rose/gray gradient
- **Rounded card design** - Modern, accessible layout

### 2. Clear Messaging
- **404 Error Code** - Large, prominent display
- **Friendly Heading** - "Page Not Found"
- **Helpful Description** - Explains what happened
- **No technical jargon** - User-friendly language

### 3. Internal Search
- **Search input** - Prominent, accessible
- **Help center integration** - Searches help content
- **Query encoding** - Proper URL parameter handling
- **Keyboard accessible** - Full keyboard navigation

### 4. Navigation Options

**Primary Navigation (Cards):**
- ✅ **Home** - Return to homepage
- ✅ **Features** - Explore AI-powered features
- ✅ **Security** - Learn about security measures
- ✅ **Blog** - Read latest insights

**Secondary Navigation (Links):**
- Help Center
- Contact Support
- About Us

## Technical Implementation

### HTTP Status Code

Next.js automatically returns **404 status** for `not-found.tsx`:

```typescript
// File: src/app/[locale]/not-found.tsx
// Next.js serves this with 404 status automatically
export default function NotFound() {
  // ...
}
```

**Verified via Playwright:**
```typescript
const response = await page.goto('/non-existent-page');
expect(response?.status()).toBe(404); // ✅
```

### Component Structure

```tsx
'use client'; // Client component for interactivity

export default function NotFound() {
  // State for search
  const [searchQuery, setSearchQuery] = useState("");
  
  // Navigation
  const router = useRouter();
  
  // Search handler
  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/en/help?q=${encodeURIComponent(searchQuery)}`);
  };
  
  // UI components
  return (
    <div>
      {/* Logo, Error message, Search, Navigation cards */}
    </div>
  );
}
```

### Search Functionality

**How it works:**
1. User types query in search box
2. Form submits on Enter or button click
3. Redirects to `/en/help?q={query}`
4. Help center performs the search

**Example:**
```
Input: "getting started"
Redirects to: /en/help?q=getting+started
```

### Navigation Links

**data-testid attributes** for reliable testing:
- `404-link-home` - Home page
- `404-link-features` - Features page
- `404-link-security` - Security page
- `404-link-blog` - Blog page
- `404-link-help` - Help center
- `404-link-contact` - Contact page
- `404-link-about` - About page

## Testing

### Playwright E2E Tests

**Test Files:**
- `e2e/404.spec.ts` - Main 404 functionality (35+ tests)
- `e2e/404-status.spec.ts` - HTTP status code validation (10+ tests)

**Run Tests:**
```bash
# Run all E2E tests
npm run e2e

# Run 404 tests only
npm run e2e:404

# Run with UI
npm run e2e:ui

# Run in headed mode (see browser)
npm run e2e:headed
```

### Test Coverage

**HTTP Status Codes:**
- ✅ Returns 404 for non-existent routes
- ✅ Returns 404 for nested invalid paths
- ✅ Returns 404 for invalid locale routes
- ✅ Returns 404 for malformed URLs
- ✅ Returns 200 for valid routes (verification)

**Page Content:**
- ✅ Displays branded 404 page
- ✅ Shows 404 error code
- ✅ Displays clear heading and message
- ✅ Includes Lyyli.ai logo

**Search Functionality:**
- ✅ Search input visible and accessible
- ✅ Redirects to help page on search
- ✅ Encodes query parameters properly
- ✅ Handles special characters

**Navigation Links:**
- ✅ All 7 required links present
- ✅ Correct href attributes
- ✅ Links are clickable and functional
- ✅ Navigation works as expected

**Accessibility:**
- ✅ Accessible search form with labels
- ✅ Aria-hidden on decorative icons
- ✅ Proper heading hierarchy (h1, h2)
- ✅ Keyboard navigation support

**Visual Design:**
- ✅ Branded colors and styling
- ✅ Responsive on mobile devices
- ✅ All navigation cards visible
- ✅ Consistent brand identity

## User Journeys

### Journey 1: Search for Content
1. User lands on 404 page
2. Types query in search box
3. Clicks search button or presses Enter
4. Redirected to Help Center with search results

### Journey 2: Navigate to Popular Page
1. User lands on 404 page
2. Sees 4 popular page cards
3. Clicks desired page (Home, Features, Security, or Blog)
4. Navigates to that page

### Journey 3: Get Additional Help
1. User lands on 404 page
2. Scrolls to bottom
3. Clicks Help Center, Contact Support, or About Us
4. Gets the help they need

## SEO Considerations

### Status Code
- ✅ Returns proper 404 status (not 200 or redirect)
- ✅ Signals to search engines that content doesn't exist
- ✅ Prevents indexing of error pages

### No Index
404 pages should not be indexed by search engines. Next.js handles this automatically with proper status codes.

### Internal Linking
- ✅ Provides clear navigation paths
- ✅ Helps users find intended content
- ✅ Reduces bounce rate
- ✅ Improves site metrics

## Monitoring

### Track 404 Errors

**Google Search Console:**
- Monitor crawl errors
- Identify broken links
- Fix or redirect commonly hit 404s

**Analytics:**
- Track 404 page views
- Monitor search queries
- Identify navigation patterns

## Future Enhancements

1. **Suggested Pages** - AI-based content recommendations based on URL
2. **Recently Viewed** - Show user's browsing history
3. **Popular Searches** - Display common search queries
4. **Localization** - Detect user's language preference
5. **Analytics** - Track which 404s are most common

## Troubleshooting

### 404 Not Showing

**Check:**
- File exists at `src/app/[locale]/not-found.tsx`
- No syntax errors in component
- Build completed successfully

**Solutions:**
- Run `npm run build`
- Check build output for errors
- Verify route structure

### Wrong Status Code

**Check:**
- Using `not-found.tsx` filename (not `404.tsx`)
- Component exports default function
- No middleware interfering

**Solutions:**
- Ensure proper file naming
- Check middleware.ts for conflicts
- Verify Next.js version supports not-found

### Search Not Working

**Check:**
- Help page exists at `/[locale]/help`
- Query parameter handling implemented
- No JavaScript errors in console

**Solutions:**
- Verify help page route
- Check router navigation
- Test in different browsers

## Resources

- [Next.js Not Found](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)
- [Playwright Testing](https://playwright.dev/)
- [404 Best Practices](https://developers.google.com/search/docs/crawling-indexing/http-status-codes)

---

Last updated: October 2025
