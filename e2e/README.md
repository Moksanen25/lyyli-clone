# E2E Tests with Playwright

## Overview

End-to-end tests for the Lyyli.ai website using Playwright. These tests validate critical user journeys, HTTP status codes, and page functionality across multiple browsers.

## Setup

### Installation

Playwright is already installed. To install browsers:

```bash
npx playwright install
```

### Configuration

Configuration is in `playwright.config.ts`:
- **Test directory**: `./e2e`
- **Base URL**: `http://localhost:3000`
- **Browsers**: Chromium, Firefox, WebKit
- **Mobile**: Pixel 5, iPhone 12
- **Auto-start**: Builds and starts dev server before tests

## Running Tests

### All Tests
```bash
npm run e2e
```

### 404 Tests Only
```bash
npm run e2e:404
```

### With UI (Interactive)
```bash
npm run e2e:ui
```

### Headed Mode (See Browser)
```bash
npm run e2e:headed
```

### Specific Test File
```bash
npx playwright test e2e/404.spec.ts
```

### Specific Browser
```bash
npx playwright test --project=chromium
```

## Test Files

### 404.spec.ts
Main 404 page functionality tests (35+ tests):
- HTTP status codes
- Page content and design
- Search functionality
- Navigation links
- Link navigation
- Accessibility
- Visual design
- Error scenarios

### 404-status.spec.ts
HTTP status code validation (10+ tests):
- 404 for non-existent routes
- 404 for invalid locales
- 404 for malformed URLs
- 200 for valid routes (sanity check)
- API route status codes

## Test Structure

### Describe Blocks
```typescript
test.describe('Feature Area', () => {
  test.beforeEach(async ({ page }) => {
    // Setup
  });

  test('should do something', async ({ page }) => {
    // Test
  });
});
```

### Common Patterns

**Navigate and check status:**
```typescript
const response = await page.goto('/invalid-route');
expect(response?.status()).toBe(404);
```

**Check element visibility:**
```typescript
const element = page.locator('[data-testid="element-id"]');
await expect(element).toBeVisible();
```

**Click and navigate:**
```typescript
await page.click('[data-testid="link"]');
await page.waitForURL('/expected-route');
```

**Form interaction:**
```typescript
await page.fill('#input-id', 'value');
await page.click('button[type="submit"]');
```

## Test Data

### data-testid Attributes

For reliable element selection, use `data-testid`:

```tsx
// In component
<Link data-testid="404-link-home" href="/en">Home</Link>

// In test
const link = page.locator('[data-testid="404-link-home"]');
await expect(link).toBeVisible();
```

### Test URLs

**404 Test Routes:**
- `/non-existent-page`
- `/en/invalid-page`
- `/en/test-404-page`
- `/en/blog/non-existent-post`

**Valid Routes (for comparison):**
- `/en` - Home
- `/en/features` - Features
- `/en/pricing` - Pricing
- `/en/blog` - Blog

## CI Integration

### GitHub Actions

```yaml
- name: Install Playwright Browsers
  run: npx playwright install --with-deps

- name: Run Playwright tests
  run: npm run e2e

- name: Upload test results
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: playwright-report/
```

### Test Artifacts

Failed tests produce:
- Screenshots (`test-results/`)
- Traces (`test-results/`)
- HTML report (`playwright-report/`)

**View report:**
```bash
npx playwright show-report
```

## Debugging

### Debug Mode
```bash
npx playwright test --debug
```

### Headed Mode
```bash
npm run e2e:headed
```

### Specific Test
```bash
npx playwright test --grep "should return 404"
```

### Inspector
```bash
npx playwright test --ui
```

## Best Practices

### DO ✅
- Use `data-testid` for element selection
- Wait for navigation with `waitForURL`
- Check status codes explicitly
- Test across multiple browsers
- Use descriptive test names
- Group related tests with `describe`

### DON'T ❌
- Rely on CSS selectors that may change
- Skip status code validation
- Test only in one browser
- Use hardcoded waits (`page.waitForTimeout`)
- Mix unit and E2E test concerns

## Troubleshooting

### Tests Timing Out

**Cause**: Dev server not starting
**Solution**: 
- Check port 3000 is available
- Verify build succeeds
- Increase timeout in playwright.config.ts

### Elements Not Found

**Cause**: Selector changed or element not rendered
**Solution**:
- Use `data-testid` attributes
- Check element is in viewport
- Wait for proper state

### Flaky Tests

**Cause**: Race conditions or timing issues
**Solution**:
- Use `waitForURL` instead of `waitForTimeout`
- Use `toBeVisible` instead of checking count
- Add retry logic in config

## Coverage

### Current Coverage (404 Page)
- ✅ HTTP 404 status validation
- ✅ Page content and branding
- ✅ Search functionality
- ✅ All navigation links
- ✅ Accessibility
- ✅ Mobile responsiveness
- ✅ Performance
- ✅ Error handling

### Future Test Areas
- User authentication flows
- Form submissions
- Payment processes
- Search functionality
- Multi-language switching
- Mobile navigation

## Performance

### Test Execution Time
- **Local**: ~30-60 seconds (all tests, all browsers)
- **CI**: ~2-3 minutes (with browser installation)

### Optimization Tips
- Run specific test files during development
- Use `--project` to test one browser
- Leverage test parallelization
- Cache browser installations in CI

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Next.js Testing](https://nextjs.org/docs/app/building-your-application/testing/playwright)

---

Last updated: October 2025
