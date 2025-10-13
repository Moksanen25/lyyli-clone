import { test, expect } from '@playwright/test';

/**
 * 404 Status Code Tests
 * Specifically validates HTTP status codes for various scenarios
 */

test.describe('404 HTTP Status Codes', () => {
  test('should return 404 for /non-existent-page', async ({ page }) => {
    const response = await page.goto('/non-existent-page', { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(404);
  });

  test('should return 404 for /en/invalid-page', async ({ page }) => {
    const response = await page.goto('/en/invalid-page', { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(404);
  });

  test('should return 404 for /fi/sivua-ei-ole', async ({ page }) => {
    const response = await page.goto('/fi/sivua-ei-ole', { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(404);
  });

  test('should return 404 for /en/blog/non-existent-post', async ({ page }) => {
    const response = await page.goto('/en/blog/this-post-does-not-exist-12345', { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(404);
  });

  test('should return 404 for routes with typos', async ({ page }) => {
    const response = await page.goto('/en/featuress', { waitUntil: 'domcontentloaded' }); // Typo
    expect(response?.status()).toBe(404);
  });

  test('should return 404 for old/archived routes', async ({ page }) => {
    const response = await page.goto('/en/old-page-removed', { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(404);
  });

  test('should NOT return 404 for valid routes', async ({ page }) => {
    const validRoutes = [
      '/en',
      '/fi',
      '/en/features',
      '/en/pricing',
      '/en/about',
      '/en/contact',
      '/en/blog'
    ];

    for (const route of validRoutes) {
      const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
      expect(response?.status()).toBe(200);
    }
  });

  test('should handle API routes correctly (not 404 for valid API)', async ({ request }) => {
    // This assumes you have a /api/contact route
    const response = await request.post('/api/contact', {
      data: {},
      failOnStatusCode: false
    });
    
    // Should not be 404 (might be 400, 422, etc. for invalid data)
    expect(response.status()).not.toBe(404);
  });

  test('should return 404 for non-existent API routes', async ({ request }) => {
    const response = await request.get('/api/non-existent-endpoint', {
      failOnStatusCode: false
    });
    
    expect(response.status()).toBe(404);
  });
});

test.describe('404 Page Required Elements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/test-404-page');
    // Wait for 404 page to load
    await page.waitForSelector('h1');
  });

  test('should have all required navigation links', async ({ page }) => {
    // Check for all 4 required links: Home, Features, Security, Blog
    const homeLink = page.locator('[data-testid="404-link-home"]');
    const featuresLink = page.locator('[data-testid="404-link-features"]');
    const securityLink = page.locator('[data-testid="404-link-security"]');
    const blogLink = page.locator('[data-testid="404-link-blog"]');

    await expect(homeLink).toBeVisible();
    await expect(featuresLink).toBeVisible();
    await expect(securityLink).toBeVisible();
    await expect(blogLink).toBeVisible();

    // Verify href attributes
    await expect(homeLink).toHaveAttribute('href', '/en');
    await expect(featuresLink).toHaveAttribute('href', '/en/features');
    await expect(securityLink).toHaveAttribute('href', '/en/cybersecurity');
    await expect(blogLink).toHaveAttribute('href', '/en/blog');
  });

  test('should have working search box', async ({ page }) => {
    const searchInput = page.locator('#search-404');
    const searchButton = page.locator('button[aria-label="Submit search"]');

    await expect(searchInput).toBeVisible();
    await expect(searchButton).toBeVisible();

    // Type in search box
    await searchInput.fill('test query');
    expect(await searchInput.inputValue()).toBe('test query');
  });

  test('should have clear copy explaining the error', async ({ page }) => {
    const content = await page.textContent('body');
    
    expect(content).toContain('404');
    expect(content).toContain('Page Not Found');
    expect(content).toContain('couldn\'t find');
  });
});

test.describe('404 Page User Experience', () => {
  test('should provide multiple ways to navigate away', async ({ page }) => {
    await page.goto('/en/404-ux-test');

    // Count all navigation links
    const allLinks = page.locator('a[href^="/en"]');
    const linkCount = await allLinks.count();

    // Should have at least 7 links (logo, 4 cards, 3 footer links)
    expect(linkCount).toBeGreaterThanOrEqual(7);
  });

  test('should have visually distinct error indicator', async ({ page }) => {
    await page.goto('/en/404-visual');

    // Check for visual error indicator (icon or number)
    const errorVisual = page.locator('[aria-label="Error 404"]');
    await expect(errorVisual).toBeVisible();

    // Should be large and prominent
    const fontSize = await errorVisual.evaluate(el => 
      window.getComputedStyle(el).fontSize
    );
    expect(parseFloat(fontSize)).toBeGreaterThan(48); // Large font size
  });

  test('should maintain brand consistency', async ({ page }) => {
    await page.goto('/en/404-brand');

    // Logo should be present and link to home
    const logo = page.locator('img[alt*="Lyyli.ai"]').first();
    await expect(logo).toBeVisible();

    const logoLink = page.locator('a:has(img[alt*="Lyyli.ai"])').first();
    await expect(logoLink).toHaveAttribute('href', '/en');
  });
});

test.describe('Performance', () => {
  test('404 page should load quickly', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/en/404-performance-test');
    const loadTime = Date.now() - startTime;

    // Should load in under 3 seconds even on 404
    expect(loadTime).toBeLessThan(3000);
  });

  test('404 page should not have render-blocking resources', async ({ page }) => {
    const response = await page.goto('/en/404-blocking-test');
    expect(response?.status()).toBe(404);

    // Page should be interactive
    const searchInput = page.locator('#search-404');
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toBeEnabled();
  });
});
