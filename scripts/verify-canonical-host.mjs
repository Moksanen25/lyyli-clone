#!/usr/bin/env node

import { chromium } from '@playwright/test';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CANONICAL_HOST = 'lyyli.ai';
const CANONICAL_URL = `https://${CANONICAL_HOST}`;

// Test URLs to check
const TEST_HOSTS = [
  { host: 'www.lyyli.ai', shouldRedirect: true },
  { host: 'lyyli.ai', shouldRedirect: false },
  // Add other potential variants
];

const TEST_PATHS = [
  '/',
  '/en',
  '/fi',
  '/en/about',
  '/fi/about',
  '/en/blog',
  '/fi/blog',
  '/en/pricing',
  '/fi/pricing',
];

async function testHostRedirects() {
  console.log('🔍 Testing Canonical Host Redirects...\n');

  const browser = await chromium.launch();
  const page = await browser.newPage();

  const results = {
    redirects: [],
    errors: [],
    duplicates: [],
    canonicalUrls: [],
  };

  for (const testHost of TEST_HOSTS) {
    console.log(`Testing host: ${testHost.host}`);

    for (const path of TEST_PATHS) {
      const testUrl = `https://${testHost.host}${path}`;

      try {
        // Navigate and check for redirects
        const response = await page.goto(testUrl, {
          waitUntil: 'networkidle',
          timeout: 10000,
        });

        const finalUrl = page.url();
        const status = response.status();

        if (testHost.shouldRedirect) {
          // Should redirect to canonical
          if (finalUrl.includes(CANONICAL_HOST) && status === 200) {
            results.redirects.push({
              from: testUrl,
              to: finalUrl,
              status,
              success: true,
            });
            console.log(`  ✅ ${testUrl} → ${finalUrl}`);
          } else {
            results.errors.push({
              url: testUrl,
              expected: 'redirect to canonical',
              actual: finalUrl,
              status,
            });
            console.log(
              `  ❌ ${testUrl} should redirect but went to ${finalUrl}`
            );
          }
        } else {
          // Should not redirect (canonical host)
          if (finalUrl === testUrl && status === 200) {
            results.canonicalUrls.push({
              url: testUrl,
              status,
              success: true,
            });
            console.log(`  ✅ ${testUrl} (no redirect, canonical)`);
          } else {
            results.errors.push({
              url: testUrl,
              expected: 'no redirect',
              actual: finalUrl,
              status,
            });
            console.log(
              `  ❌ ${testUrl} should not redirect but went to ${finalUrl}`
            );
          }
        }

        // Check for canonical link in HTML
        const canonicalLink = await page
          .$eval('link[rel="canonical"]', el => el.href)
          .catch(() => null);
        if (canonicalLink) {
          if (canonicalLink.includes(CANONICAL_HOST)) {
            console.log(`    📎 Canonical link: ${canonicalLink}`);
          } else {
            results.duplicates.push({
              url: testUrl,
              canonical: canonicalLink,
              issue: 'Canonical link does not use canonical host',
            });
            console.log(
              `    ⚠️  Non-canonical canonical link: ${canonicalLink}`
            );
          }
        }
      } catch (error) {
        results.errors.push({
          url: testUrl,
          error: error.message,
        });
        console.log(`  ❌ Error testing ${testUrl}: ${error.message}`);
      }
    }

    console.log('');
  }

  await browser.close();
  return results;
}

async function checkSitemapCanonicalUrls() {
  console.log('🗺️  Checking Sitemap for Canonical URLs...\n');

  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Check sitemap
    await page.goto(`${CANONICAL_URL}/sitemap.xml`);

    const sitemapContent = await page.textContent('body');
    const urlMatches = sitemapContent.match(/<loc>(.*?)<\/loc>/g) || [];

    const sitemapUrls = urlMatches.map(match =>
      match.replace('<loc>', '').replace('</loc>', '')
    );

    console.log(`Found ${sitemapUrls.length} URLs in sitemap`);

    const nonCanonicalUrls = sitemapUrls.filter(
      url => !url.includes(CANONICAL_HOST)
    );

    if (nonCanonicalUrls.length > 0) {
      console.log('❌ Non-canonical URLs found in sitemap:');
      nonCanonicalUrls.forEach(url => console.log(`  - ${url}`));
    } else {
      console.log('✅ All sitemap URLs use canonical host');
    }

    return {
      totalUrls: sitemapUrls.length,
      nonCanonicalUrls,
      allCanonical: nonCanonicalUrls.length === 0,
    };
  } catch (error) {
    console.log(`❌ Error checking sitemap: ${error.message}`);
    return { error: error.message };
  } finally {
    await browser.close();
  }
}

async function checkRobotsTxt() {
  console.log('🤖 Checking robots.txt...\n');

  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto(`${CANONICAL_URL}/robots.txt`);
    const robotsContent = await page.textContent('body');

    console.log('robots.txt content:');
    console.log(robotsContent);

    // Check if sitemap URL uses canonical host
    const sitemapMatch = robotsContent.match(/Sitemap:\s*(.*)/i);
    if (sitemapMatch) {
      const sitemapUrl = sitemapMatch[1].trim();
      if (sitemapUrl.includes(CANONICAL_HOST)) {
        console.log('✅ Sitemap URL in robots.txt uses canonical host');
      } else {
        console.log(
          `❌ Sitemap URL in robots.txt does not use canonical host: ${sitemapUrl}`
        );
      }
    }

    return { content: robotsContent, sitemapUrl: sitemapMatch?.[1]?.trim() };
  } catch (error) {
    console.log(`❌ Error checking robots.txt: ${error.message}`);
    return { error: error.message };
  } finally {
    await browser.close();
  }
}

async function runCanonicalHostVerification() {
  console.log('🔗 Canonical Host Verification\n');
  console.log(`Canonical host: ${CANONICAL_HOST}`);
  console.log(`Canonical URL: ${CANONICAL_URL}\n`);

  const redirectResults = await testHostRedirects();
  const sitemapResults = await checkSitemapCanonicalUrls();
  const robotsResults = await checkRobotsTxt();

  // Summary
  console.log('\n📊 Summary:');
  console.log('=' * 50);

  console.log(`✅ Successful redirects: ${redirectResults.redirects.length}`);
  console.log(
    `✅ Canonical URLs (no redirect): ${redirectResults.canonicalUrls.length}`
  );
  console.log(`❌ Errors: ${redirectResults.errors.length}`);
  console.log(`⚠️  Duplicate issues: ${redirectResults.duplicates.length}`);

  if (sitemapResults.allCanonical) {
    console.log('✅ Sitemap URLs all use canonical host');
  } else {
    console.log(
      `❌ ${sitemapResults.nonCanonicalUrls?.length || 0} non-canonical URLs in sitemap`
    );
  }

  // Check for duplicate host versions
  const hasDuplicates =
    redirectResults.duplicates.length > 0 ||
    (sitemapResults.nonCanonicalUrls &&
      sitemapResults.nonCanonicalUrls.length > 0);

  if (hasDuplicates) {
    console.log('\n❌ DUPLICATE HOST VERSIONS DETECTED');
    console.log(
      'This could lead to SEO issues and duplicate content penalties.'
    );
    console.log('\nRecommendations:');
    console.log('- Ensure all redirects are working (301 permanent redirects)');
    console.log('- Verify sitemap only contains canonical URLs');
    console.log('- Check that all canonical links use the canonical host');
    process.exit(1);
  } else {
    console.log('\n✅ NO DUPLICATE HOST VERSIONS DETECTED');
    console.log('All URLs properly redirect to or use the canonical host.');
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runCanonicalHostVerification().catch(console.error);
}

export { runCanonicalHostVerification };
