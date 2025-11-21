#!/usr/bin/env node

/**
 * Sitemap Generator Script
 *
 * This script generates a comprehensive sitemap.xml file including:
 * - Static pages for both English and Finnish
 * - Dynamic blog posts from content directory
 * - Help pages and other dynamic routes
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const contentDir = path.join(projectRoot, 'content');

// Base URL
const baseUrl = 'https://lyyli.ai';

// Current date for lastmod
const currentDate = new Date().toISOString().split('T')[0];

// Static pages configuration
const staticPages = [
  // Homepage
  { path: '/', priority: 1.0, changefreq: 'weekly' },

  // English pages
  { path: '/en', priority: 0.9, changefreq: 'weekly' },
  { path: '/en/features', priority: 0.8, changefreq: 'monthly' },
  { path: '/en/pricing', priority: 0.8, changefreq: 'monthly' },
  { path: '/en/about', priority: 0.7, changefreq: 'monthly' },
  { path: '/en/contact', priority: 0.6, changefreq: 'monthly' },
  { path: '/en/blog', priority: 0.7, changefreq: 'weekly' },
  { path: '/en/security', priority: 0.7, changefreq: 'monthly' },
  { path: '/en/waitlist', priority: 0.5, changefreq: 'monthly' },
  { path: '/en/privacy', priority: 0.3, changefreq: 'yearly' },
  { path: '/en/cookies', priority: 0.3, changefreq: 'yearly' },

  // Finnish pages
  { path: '/fi', priority: 0.9, changefreq: 'weekly' },
  { path: '/fi/features', priority: 0.8, changefreq: 'monthly' },
  { path: '/fi/pricing', priority: 0.8, changefreq: 'monthly' },
  { path: '/fi/about', priority: 0.7, changefreq: 'monthly' },
  { path: '/fi/contact', priority: 0.6, changefreq: 'monthly' },
  { path: '/fi/blog', priority: 0.7, changefreq: 'weekly' },
  { path: '/fi/security', priority: 0.7, changefreq: 'monthly' },
  { path: '/fi/waitlist', priority: 0.5, changefreq: 'monthly' },
  { path: '/fi/privacy', priority: 0.3, changefreq: 'yearly' },
  { path: '/fi/cookies', priority: 0.3, changefreq: 'yearly' },

  // German pages
  { path: '/de', priority: 0.9, changefreq: 'weekly' },
  { path: '/de/features', priority: 0.8, changefreq: 'monthly' },
  { path: '/de/pricing', priority: 0.8, changefreq: 'monthly' },
  { path: '/de/about', priority: 0.7, changefreq: 'monthly' },
  { path: '/de/contact', priority: 0.6, changefreq: 'monthly' },
  { path: '/de/blog', priority: 0.7, changefreq: 'weekly' },
  { path: '/de/security', priority: 0.7, changefreq: 'monthly' },
  { path: '/de/waitlist', priority: 0.5, changefreq: 'monthly' },
  { path: '/de/privacy', priority: 0.3, changefreq: 'yearly' },
  { path: '/de/cookies', priority: 0.3, changefreq: 'yearly' },

  // Estonian pages
  { path: '/et', priority: 0.9, changefreq: 'weekly' },
  { path: '/et/features', priority: 0.8, changefreq: 'monthly' },
  { path: '/et/pricing', priority: 0.8, changefreq: 'monthly' },
  { path: '/et/about', priority: 0.7, changefreq: 'monthly' },
  { path: '/et/contact', priority: 0.6, changefreq: 'monthly' },
  { path: '/et/blog', priority: 0.7, changefreq: 'weekly' },
  { path: '/et/security', priority: 0.7, changefreq: 'monthly' },
  { path: '/et/waitlist', priority: 0.5, changefreq: 'monthly' },
  { path: '/et/privacy', priority: 0.3, changefreq: 'yearly' },
  { path: '/et/cookies', priority: 0.3, changefreq: 'yearly' },

  // Swedish pages
  { path: '/sv', priority: 0.9, changefreq: 'weekly' },
  { path: '/sv/features', priority: 0.8, changefreq: 'monthly' },
  { path: '/sv/pricing', priority: 0.8, changefreq: 'monthly' },
  { path: '/sv/about', priority: 0.7, changefreq: 'monthly' },
  { path: '/sv/contact', priority: 0.6, changefreq: 'monthly' },
  { path: '/sv/blog', priority: 0.7, changefreq: 'weekly' },
  { path: '/sv/security', priority: 0.7, changefreq: 'monthly' },
  { path: '/sv/waitlist', priority: 0.5, changefreq: 'monthly' },
  { path: '/sv/privacy', priority: 0.3, changefreq: 'yearly' },
  { path: '/sv/cookies', priority: 0.3, changefreq: 'yearly' },
];

// Help pages
const helpPages = [
  { path: '/en/help', priority: 0.6, changefreq: 'monthly' },
  { path: '/en/help/getting-started', priority: 0.5, changefreq: 'monthly' },
  { path: '/en/help/accounts-auth', priority: 0.4, changefreq: 'monthly' },
  { path: '/en/help/user-management', priority: 0.4, changefreq: 'monthly' },
  {
    path: '/en/help/organizations-users',
    priority: 0.4,
    changefreq: 'monthly',
  },
  { path: '/en/help/ai-assistants', priority: 0.5, changefreq: 'monthly' },
  { path: '/en/help/analytics', priority: 0.4, changefreq: 'monthly' },
  { path: '/en/help/api-documentation', priority: 0.4, changefreq: 'monthly' },
  { path: '/en/help/billing', priority: 0.4, changefreq: 'monthly' },
  { path: '/en/help/brand-content', priority: 0.4, changefreq: 'monthly' },
  { path: '/en/help/contact-support', priority: 0.4, changefreq: 'monthly' },
  { path: '/en/help/data-management', priority: 0.4, changefreq: 'monthly' },
  { path: '/en/help/integrations', priority: 0.4, changefreq: 'monthly' },
  { path: '/en/help/legal', priority: 0.3, changefreq: 'yearly' },
  { path: '/en/help/publishing', priority: 0.4, changefreq: 'monthly' },
  {
    path: '/en/help/registration-subscription',
    priority: 0.4,
    changefreq: 'monthly',
  },
  { path: '/en/help/security', priority: 0.4, changefreq: 'monthly' },
  { path: '/en/help/service-description', priority: 0.3, changefreq: 'yearly' },
  { path: '/en/help/status', priority: 0.3, changefreq: 'weekly' },
  { path: '/en/help/target-audience', priority: 0.3, changefreq: 'monthly' },
  { path: '/en/help/troubleshooting', priority: 0.4, changefreq: 'monthly' },
  { path: '/en/help/ui-basics', priority: 0.4, changefreq: 'monthly' },
  { path: '/en/help/prompt-library', priority: 0.6, changefreq: 'monthly' },

  { path: '/fi/help', priority: 0.6, changefreq: 'monthly' },
  { path: '/fi/help/getting-started', priority: 0.5, changefreq: 'monthly' },
  { path: '/fi/help/accounts-auth', priority: 0.4, changefreq: 'monthly' },
  { path: '/fi/help/user-management', priority: 0.4, changefreq: 'monthly' },
  {
    path: '/fi/help/organizations-users',
    priority: 0.4,
    changefreq: 'monthly',
  },
  { path: '/fi/help/ai-assistants', priority: 0.5, changefreq: 'monthly' },
  { path: '/fi/help/analytics', priority: 0.4, changefreq: 'monthly' },
  { path: '/fi/help/api-documentation', priority: 0.4, changefreq: 'monthly' },
  { path: '/fi/help/billing', priority: 0.4, changefreq: 'monthly' },
  { path: '/fi/help/brand-content', priority: 0.4, changefreq: 'monthly' },
  { path: '/fi/help/contact-support', priority: 0.4, changefreq: 'monthly' },
  { path: '/fi/help/data-management', priority: 0.4, changefreq: 'monthly' },
  { path: '/fi/help/integrations', priority: 0.4, changefreq: 'monthly' },
  { path: '/fi/help/legal', priority: 0.3, changefreq: 'yearly' },
  { path: '/fi/help/publishing', priority: 0.4, changefreq: 'monthly' },
  {
    path: '/fi/help/registration-subscription',
    priority: 0.4,
    changefreq: 'monthly',
  },
  { path: '/fi/help/security', priority: 0.4, changefreq: 'monthly' },
  { path: '/fi/help/service-description', priority: 0.3, changefreq: 'yearly' },
  { path: '/fi/help/status', priority: 0.3, changefreq: 'weekly' },
  { path: '/fi/help/target-audience', priority: 0.3, changefreq: 'monthly' },
  { path: '/fi/help/troubleshooting', priority: 0.4, changefreq: 'monthly' },
  { path: '/fi/help/ui-basics', priority: 0.4, changefreq: 'monthly' },
  { path: '/fi/help/prompt-library', priority: 0.6, changefreq: 'monthly' },
];

// Function to get blog posts from content directory
function getBlogPosts(locale) {
  const blogDir = path.join(contentDir, 'blog', locale);
  if (!fs.existsSync(blogDir)) {
    return [];
  }

  const files = fs.readdirSync(blogDir);
  const posts = [];

  for (const file of files) {
    if (file.endsWith('.mdx')) {
      const slug = file.replace('.mdx', '');
      posts.push({
        path: `/${locale}/blog/${slug}`,
        priority: 0.5,
        changefreq: 'monthly',
      });
    }
  }

  return posts;
}

// Function to get paginated blog pages
function getPaginatedBlogPages(locale) {
  const blogDir = path.join(contentDir, 'blog', locale);
  if (!fs.existsSync(blogDir)) {
    return [];
  }

  const files = fs.readdirSync(blogDir);
  const postCount = files.filter(file => file.endsWith('.mdx')).length;
  const postsPerPage = 6; // Same as POSTS_PER_PAGE in pagination.ts
  const totalPages = Math.ceil(postCount / postsPerPage);

  const pages = [];

  // Add paginated pages (page 2 and beyond)
  for (let page = 2; page <= totalPages; page++) {
    pages.push({
      path: `/${locale}/blog/page/${page}`,
      priority: 0.6,
      changefreq: 'weekly',
    });
  }

  return pages;
}

// Function to generate hreflang alternates for a given path
function generateHreflangAlternates(path) {
  let hreflangXml = '';

  // Skip hreflang for root path as it's language-agnostic
  if (path === '/') {
    return hreflangXml;
  }

  const supportedLocales = ['en', 'fi', 'de', 'et', 'sv'];

  // Determine if this is a language-specific path
  const isLangSpecific = supportedLocales.some(locale =>
    path.startsWith(`/${locale}`)
  );

  if (isLangSpecific) {
    // Find current language
    const currentLang = supportedLocales.find(locale =>
      path.startsWith(`/${locale}`)
    );

    if (!currentLang) return hreflangXml;

    // Generate path without locale prefix
    let pathWithoutLocale;
    if (path === `/${currentLang}`) {
      pathWithoutLocale = '';
    } else {
      pathWithoutLocale = path.replace(`/${currentLang}`, '');
    }

    // Add hreflang links for all locales
    supportedLocales.forEach(locale => {
      const alternatePath = pathWithoutLocale
        ? `/${locale}${pathWithoutLocale}`
        : `/${locale}`;
      hreflangXml += `    <xhtml:link rel="alternate" hreflang="${locale}" href="${baseUrl}${alternatePath}"/>\n`;
    });

    // Add x-default pointing to English version
    const xDefaultPath = pathWithoutLocale ? `/en${pathWithoutLocale}` : '/en';
    hreflangXml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${xDefaultPath}"/>\n`;
  } else {
    // For non-language-specific paths, add all language versions
    supportedLocales.forEach(locale => {
      hreflangXml += `    <xhtml:link rel="alternate" hreflang="${locale}" href="${baseUrl}/${locale}${path === '/' ? '' : path}"/>\n`;
    });
    hreflangXml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/en${path === '/' ? '' : path}"/>\n`;
  }

  return hreflangXml;
}

// Function to generate sitemap XML with hreflang
function generateSitemap() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  // Add static pages
  for (const page of staticPages) {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}${page.path}</loc>\n`;
    xml += generateHreflangAlternates(page.path);
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  // Add help pages
  for (const page of helpPages) {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}${page.path}</loc>\n`;
    xml += generateHreflangAlternates(page.path);
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  // Add blog posts for all locales
  const locales = ['en', 'fi', 'de', 'et', 'sv'];

  locales.forEach(locale => {
    const blogPosts = getBlogPosts(locale);
    for (const post of blogPosts) {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}${post.path}</loc>\n`;
      xml += generateHreflangAlternates(post.path);
      xml += `    <lastmod>${currentDate}</lastmod>\n`;
      xml += `    <changefreq>${post.changefreq}</changefreq>\n`;
      xml += `    <priority>${post.priority}</priority>\n`;
      xml += `  </url>\n`;
    }
  });

  // Add paginated blog pages for all locales
  locales.forEach(locale => {
    const paginatedPages = getPaginatedBlogPages(locale);
    for (const page of paginatedPages) {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}${page.path}</loc>\n`;
      xml += generateHreflangAlternates(page.path);
      xml += `    <lastmod>${currentDate}</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += `  </url>\n`;
    }
  });

  xml += '</urlset>';

  return xml;
}

// Generate and save sitemap
function main() {
  try {
    const sitemap = generateSitemap();
    const sitemapPath = path.join(projectRoot, 'public', 'sitemap.xml');

    fs.writeFileSync(sitemapPath, sitemap, 'utf8');

    console.log('✅ Sitemap generated successfully!');
    console.log(`📁 Saved to: ${sitemapPath}`);

    // Count URLs
    const urlCount = (sitemap.match(/<url>/g) || []).length;
    console.log(`📊 Total URLs: ${urlCount}`);

    // Count blog posts
    const locales = ['en', 'fi', 'de', 'et', 'sv'];
    const postCounts = locales
      .map(locale => {
        const count = getBlogPosts(locale).length;
        return `${locale.toUpperCase()}: ${count}`;
      })
      .join(', ');
    console.log(`📝 Blog posts - ${postCounts}`);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error.message);
    process.exit(1);
  }
}

main();
