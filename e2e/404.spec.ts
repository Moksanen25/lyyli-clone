import { test, expect } from '@playwright/test';

test.describe('404 Not Found Page', () => {
  test.describe('HTTP Status Code', () => {
    test('should return 404 status for non-existent routes', async ({ page }) => {
      const response = await page.goto('/non-existent-page');
      expect(response?.status()).toBe(404);
    });

    test('should return 404 status for non-existent nested routes', async ({ page }) => {
      const response = await page.goto('/en/this/does/not/exist');
      expect(response?.status()).toBe(404);
    });

    test('should return 404 status for invalid locale routes', async ({ page }) => {
      const response = await page.goto('/de/features');
      expect(response?.status()).toBe(404);
    });

    test('should return 404 status for malformed URLs', async ({ page }) => {
      const response = await page.goto('/en/../../../etc/passwd');
      expect(response?.status()).toBe(404);
    });
  });

  test.describe('Page Content', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/en/non-existent-page');
    });

    test('should display branded 404 page', async ({ page }) => {
      // Check for logo
      const logo = page.locator('img[alt*="Lyyli.ai logo"]');
      await expect(logo).toBeVisible();
    });

    test('should display 404 error code', async ({ page }) => {
      const errorCode = page.locator('[aria-label="Error 404"]');
      await expect(errorCode).toBeVisible();
      await expect(errorCode).toHaveText('404');
    });

    test('should display clear heading', async ({ page }) => {
      const heading = page.locator('h1');
      await expect(heading).toBeVisible();
      await expect(heading).toContainText('Page Not Found');
    });

    test('should display helpful message', async ({ page }) => {
      const message = page.locator('p').first();
      await expect(message).toBeVisible();
      await expect(message).toContainText('couldn\'t find the page');
    });
  });

  test.describe('Search Functionality', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/en/404-test-page');
    });

    test('should have search input', async ({ page }) => {
      const searchInput = page.locator('input[type="text"]');
      await expect(searchInput).toBeVisible();
      await expect(searchInput).toHaveAttribute('placeholder', /search.*help/i);
    });

    test('should redirect to help page on search', async ({ page }) => {
      const searchInput = page.locator('input[type="text"]');
      const searchButton = page.locator('button[aria-label="Submit search"]');

      await searchInput.fill('getting started');
      await searchButton.click();

      await page.waitForURL(/\/en\/help\?q=getting\+started/);
      expect(page.url()).toContain('/en/help?q=getting');
    });

    test('should encode search query properly', async ({ page }) => {
      const searchInput = page.locator('input[type="text"]');
      await searchInput.fill('test & search query');
      await searchInput.press('Enter');

      await page.waitForURL(/\/en\/help\?q=/);
      expect(page.url()).toContain('test');
      expect(page.url()).toContain('search');
    });
  });

  test.describe('Navigation Links', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/en/missing-page');
    });

    test('should have Home link', async ({ page }) => {
      const homeLink = page.locator('[data-testid="404-link-home"]');
      await expect(homeLink).toBeVisible();
      await expect(homeLink).toHaveAttribute('href', '/en');
    });

    test('should have Features link', async ({ page }) => {
      const featuresLink = page.locator('[data-testid="404-link-features"]');
      await expect(featuresLink).toBeVisible();
      await expect(featuresLink).toHaveAttribute('href', '/en/features');
    });

    test('should have Security link', async ({ page }) => {
      const securityLink = page.locator('[data-testid="404-link-security"]');
      await expect(securityLink).toBeVisible();
      await expect(securityLink).toHaveAttribute('href', '/en/cybersecurity');
    });

    test('should have Blog link', async ({ page }) => {
      const blogLink = page.locator('[data-testid="404-link-blog"]');
      await expect(blogLink).toBeVisible();
      await expect(blogLink).toHaveAttribute('href', '/en/blog');
    });

    test('should have Help Center link', async ({ page }) => {
      const helpLink = page.locator('[data-testid="404-link-help"]');
      await expect(helpLink).toBeVisible();
      await expect(helpLink).toHaveAttribute('href', '/en/help');
    });

    test('should have Contact Support link', async ({ page }) => {
      const contactLink = page.locator('[data-testid="404-link-contact"]');
      await expect(contactLink).toBeVisible();
      await expect(contactLink).toHaveAttribute('href', '/en/contact');
    });

    test('should have About Us link', async ({ page }) => {
      const aboutLink = page.locator('[data-testid="404-link-about"]');
      await expect(aboutLink).toBeVisible();
      await expect(aboutLink).toHaveAttribute('href', '/en/about');
    });
  });

  test.describe('Link Navigation', () => {
    test('should navigate to Home page when Home link clicked', async ({ page }) => {
      await page.goto('/en/does-not-exist');
      
      const homeLink = page.locator('[data-testid="404-link-home"]');
      await homeLink.click();
      
      await page.waitForURL('/en');
      expect(page.url()).toContain('/en');
    });

    test('should navigate to Features page when Features link clicked', async ({ page }) => {
      await page.goto('/en/missing');
      
      const featuresLink = page.locator('[data-testid="404-link-features"]');
      await featuresLink.click();
      
      await page.waitForURL('/en/features');
      expect(page.url()).toContain('/en/features');
    });

    test('should navigate to Security page when Security link clicked', async ({ page }) => {
      await page.goto('/en/invalid');
      
      const securityLink = page.locator('[data-testid="404-link-security"]');
      await securityLink.click();
      
      await page.waitForURL('/en/cybersecurity');
      expect(page.url()).toContain('/en/cybersecurity');
    });

    test('should navigate to Blog page when Blog link clicked', async ({ page }) => {
      await page.goto('/en/nowhere');
      
      const blogLink = page.locator('[data-testid="404-link-blog"]');
      await blogLink.click();
      
      await page.waitForURL('/en/blog');
      expect(page.url()).toContain('/en/blog');
    });
  });

  test.describe('Accessibility', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/en/404');
    });

    test('should have accessible search form', async ({ page }) => {
      const searchLabel = page.locator('label[for="search-404"]');
      await expect(searchLabel).toBeInViewport();
      
      const searchInput = page.locator('#search-404');
      await expect(searchInput).toHaveAttribute('aria-label', /search/i);
    });

    test('should have aria-hidden on decorative icons', async ({ page }) => {
      const decorativeIcons = page.locator('svg[aria-hidden="true"]');
      expect(await decorativeIcons.count()).toBeGreaterThan(0);
    });

    test('should have proper heading hierarchy', async ({ page }) => {
      const h1 = page.locator('h1');
      await expect(h1).toHaveCount(1);
      
      const h2 = page.locator('h2');
      await expect(h2).toHaveCount(1);
    });
  });

  test.describe('Visual Design', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/en/not-found-test');
    });

    test('should display branded colors', async ({ page }) => {
      const container = page.locator('.bg-white').first();
      await expect(container).toBeVisible();
    });

    test('should be responsive on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      const heading = page.locator('h1');
      await expect(heading).toBeVisible();
      
      const searchBox = page.locator('input[type="text"]');
      await expect(searchBox).toBeVisible();
    });

    test('should display all navigation cards', async ({ page }) => {
      const cards = page.locator('[data-testid^="404-link-"]');
      const count = await cards.count();
      
      expect(count).toBeGreaterThanOrEqual(4); // Home, Features, Security, Blog
    });
  });

  test.describe('Error Scenarios', () => {
    test('should handle 404 for deeply nested invalid paths', async ({ page }) => {
      const response = await page.goto('/en/very/deeply/nested/invalid/path/that/does/not/exist');
      expect(response?.status()).toBe(404);
    });

    test('should handle 404 for paths with special characters', async ({ page }) => {
      const response = await page.goto('/en/test%20page%20with%20spaces');
      // Might be 404 or might redirect, just check it doesn't crash
      expect(response?.status()).toBeLessThan(500);
    });

    test('should handle 404 gracefully without JavaScript', async ({ page, context }) => {
      // Disable JavaScript
      await context.route('**/*', route => {
        if (route.request().resourceType() === 'script') {
          route.abort();
        } else {
          route.continue();
        }
      });

      await page.goto('/en/no-js-404-test');
      
      // Should still display content (server-rendered)
      const heading = page.locator('h1');
      await expect(heading).toBeVisible();
    });
  });
});
