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
];

// Help pages
const helpPages = [
  { path: '/en/help', priority: 0.6, changefreq: 'monthly' },
  { path: '/en/help/getting-started', priority: 0.5, changefreq: 'monthly' },
  { path: '/en/help/accounts-auth', priority: 0.4, changefreq: 'monthly' },
  { path: '/en/help/user-management', priority: 0.4, changefreq: 'monthly' },
  { path: '/en/help/organizations-users', priority: 0.4, changefreq: 'monthly' },
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
  { path: '/en/help/registration-subscription', priority: 0.4, changefreq: 'monthly' },
  { path: '/en/help/security', priority: 0.4, changefreq: 'monthly' },
  { path: '/en/help/service-description', priority: 0.3, changefreq: 'yearly' },
  { path: '/en/help/status', priority: 0.3, changefreq: 'weekly' },
  { path: '/en/help/target-audience', priority: 0.3, changefreq: 'monthly' },
  { path: '/en/help/troubleshooting', priority: 0.4, changefreq: 'monthly' },
  { path: '/en/help/ui-basics', priority: 0.4, changefreq: 'monthly' },
  
  { path: '/fi/help', priority: 0.6, changefreq: 'monthly' },
  { path: '/fi/help/getting-started', priority: 0.5, changefreq: 'monthly' },
  { path: '/fi/help/accounts-auth', priority: 0.4, changefreq: 'monthly' },
  { path: '/fi/help/user-management', priority: 0.4, changefreq: 'monthly' },
  { path: '/fi/help/organizations-users', priority: 0.4, changefreq: 'monthly' },
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
  { path: '/fi/help/registration-subscription', priority: 0.4, changefreq: 'monthly' },
  { path: '/fi/help/security', priority: 0.4, changefreq: 'monthly' },
  { path: '/fi/help/service-description', priority: 0.3, changefreq: 'yearly' },
  { path: '/fi/help/status', priority: 0.3, changefreq: 'weekly' },
  { path: '/fi/help/target-audience', priority: 0.3, changefreq: 'monthly' },
  { path: '/fi/help/troubleshooting', priority: 0.4, changefreq: 'monthly' },
  { path: '/fi/help/ui-basics', priority: 0.4, changefreq: 'monthly' },
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
        changefreq: 'monthly'
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
      changefreq: 'weekly'
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
  
  // Determine if this is a language-specific path
  const isLangSpecific = path.startsWith('/en') || path.startsWith('/fi');
  
  if (isLangSpecific) {
    const currentLang = path.startsWith('/en') ? 'en' : 'fi';
    const alternateLang = currentLang === 'en' ? 'fi' : 'en';
    
    // Generate alternate path
    let alternatePath;
    if (path === '/en' || path === '/fi') {
      alternatePath = `/${alternateLang}`;
    } else {
      // Replace /en/ with /fi/ or vice versa
      alternatePath = path.replace(`/${currentLang}`, `/${alternateLang}`);
    }
    
    // Add hreflang links
    hreflangXml += `    <xhtml:link rel="alternate" hreflang="${currentLang}" href="${baseUrl}${path}"/>\n`;
    hreflangXml += `    <xhtml:link rel="alternate" hreflang="${alternateLang}" href="${baseUrl}${alternatePath}"/>\n`;
    
    // Generate x-default path (English version)
    let xDefaultPath;
    if (path === '/en' || path === '/fi') {
      xDefaultPath = '/en';
    } else {
      xDefaultPath = path.replace(`/${currentLang}`, '/en');
    }
    hreflangXml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${xDefaultPath}"/>\n`;
  } else {
    // For non-language-specific paths, add both language versions
    hreflangXml += `    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en${path === '/' ? '' : path}"/>\n`;
    hreflangXml += `    <xhtml:link rel="alternate" hreflang="fi" href="${baseUrl}/fi${path === '/' ? '' : path}"/>\n`;
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
  
  // Add blog posts
  const enBlogPosts = getBlogPosts('en');
  const fiBlogPosts = getBlogPosts('fi');
  
  for (const post of enBlogPosts) {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}${post.path}</loc>\n`;
    xml += generateHreflangAlternates(post.path);
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${post.changefreq}</changefreq>\n`;
    xml += `    <priority>${post.priority}</priority>\n`;
    xml += `  </url>\n`;
  }
  
  for (const post of fiBlogPosts) {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}${post.path}</loc>\n`;
    xml += generateHreflangAlternates(post.path);
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${post.changefreq}</changefreq>\n`;
    xml += `    <priority>${post.priority}</priority>\n`;
    xml += `  </url>\n`;
  }
  
  // Add paginated blog pages
  const enPaginatedPages = getPaginatedBlogPages('en');
  const fiPaginatedPages = getPaginatedBlogPages('fi');
  
  for (const page of enPaginatedPages) {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}${page.path}</loc>\n`;
    xml += generateHreflangAlternates(page.path);
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `  </url>\n`;
  }
  
  for (const page of fiPaginatedPages) {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}${page.path}</loc>\n`;
    xml += generateHreflangAlternates(page.path);
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `  </url>\n`;
  }
  
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
    const enPosts = getBlogPosts('en').length;
    const fiPosts = getBlogPosts('fi').length;
    console.log(`📝 Blog posts - EN: ${enPosts}, FI: ${fiPosts}`);
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error.message);
    process.exit(1);
  }
}

main();
