#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');

console.log('🔍 Validating blog post internal links...\n');

// Validate a single blog post
function validateBlogPost(filePath, locale) {
  const content = fs.readFileSync(filePath, 'utf8');
  const filename = path.basename(filePath);
  
  console.log(`📝 Validating: ${filename}`);
  
  // Count internal links
  const internalLinks = content.match(/\[([^\]]+)\]\(\/[ef][ni]\/[^)]+\)/g) || [];
  const securityLinks = content.match(/\[([^\]]+)\]\(\/[ef][ni]\/security\)/g) || [];
  const featuresLinks = content.match(/\[([^\]]+)\]\(\/[ef][ni]\/features\)/g) || [];
  
  // Check for malformed links
  const malformedLinks = content.match(/\[\[([^\]]+)\]\(\/[^)]+\)\]/g) || [];
  const nestedLinks = content.match(/\[([^\]]+)\]\(\/[^)]+\)\]\(\/[^)]+\)/g) || [];
  
  // Check for broken markdown
  const brokenMarkdown = content.match(/\]\(\/[^)]+\)\(/g) || [];
  
  const issues = [];
  
  if (malformedLinks.length > 0) {
    issues.push(`❌ ${malformedLinks.length} malformed nested links`);
  }
  
  if (nestedLinks.length > 0) {
    issues.push(`❌ ${nestedLinks.length} nested markdown links`);
  }
  
  if (brokenMarkdown.length > 0) {
    issues.push(`❌ ${brokenMarkdown.length} broken markdown syntax`);
  }
  
  if (internalLinks.length < 2) {
    issues.push(`⚠️  Only ${internalLinks.length} internal links (minimum 2 recommended)`);
  }
  
  if (internalLinks.length > 8) {
    issues.push(`⚠️  ${internalLinks.length} internal links (may be excessive)`);
  }
  
  if (securityLinks.length === 0 && content.toLowerCase().includes('security')) {
    issues.push(`⚠️  Security content but no links to /security page`);
  }
  
  if (featuresLinks.length === 0 && content.toLowerCase().includes('communication')) {
    issues.push(`⚠️  Communication content but no links to /features page`);
  }
  
  // Display results
  if (issues.length === 0) {
    console.log(`✅ ${internalLinks.length} internal links (${securityLinks.length} security, ${featuresLinks.length} features)`);
  } else {
    console.log(`✅ ${internalLinks.length} internal links (${securityLinks.length} security, ${featuresLinks.length} features)`);
    issues.forEach(issue => console.log(`   ${issue}`));
  }
  
  return {
    filename,
    totalLinks: internalLinks.length,
    securityLinks: securityLinks.length,
    featuresLinks: featuresLinks.length,
    issues: issues.length
  };
}

// Main validation function
async function main() {
  const locales = ['en', 'fi'];
  let totalLinks = 0;
  let totalIssues = 0;
  let processedFiles = 0;
  const results = [];
  
  for (const locale of locales) {
    const blogDir = path.join(projectRoot, 'content', 'blog', locale);
    
    if (!fs.existsSync(blogDir)) {
      console.log(`⚠️  Blog directory not found: ${blogDir}`);
      continue;
    }
    
    console.log(`\n📁 Validating ${locale.toUpperCase()} blog posts...`);
    
    const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.mdx'));
    
    for (const file of files) {
      const filePath = path.join(blogDir, file);
      const result = validateBlogPost(filePath, locale);
      
      results.push(result);
      totalLinks += result.totalLinks;
      totalIssues += result.issues;
      processedFiles++;
    }
  }
  
  console.log('\n📊 Validation Summary:');
  console.log(`✅ Processed ${processedFiles} blog posts`);
  console.log(`🔗 Total internal links: ${totalLinks}`);
  console.log(`📈 Average links per post: ${(totalLinks / processedFiles).toFixed(1)}`);
  console.log(`⚠️  Total issues found: ${totalIssues}`);
  
  // Show posts with issues
  const postsWithIssues = results.filter(r => r.issues > 0);
  if (postsWithIssues.length > 0) {
    console.log('\n⚠️  Posts with issues:');
    postsWithIssues.forEach(post => {
      console.log(`   ${post.filename}: ${post.issues} issues`);
    });
  }
  
  // Show linking distribution
  console.log('\n📊 Link Distribution:');
  const securityTotal = results.reduce((sum, r) => sum + r.securityLinks, 0);
  const featuresTotal = results.reduce((sum, r) => sum + r.featuresLinks, 0);
  console.log(`   Security links: ${securityTotal}`);
  console.log(`   Features links: ${featuresTotal}`);
  console.log(`   Other internal links: ${totalLinks - securityTotal - featuresTotal}`);
  
  if (totalIssues === 0) {
    console.log('\n🎉 All blog posts have clean, natural internal linking!');
  } else {
    console.log('\n🔧 Some posts need attention for optimal internal linking.');
  }
}

main().catch(console.error);
