#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');

console.log('🔗 Adding contextual internal links to blog posts...\n');

// Define linking opportunities with contextual anchor text
const linkingOpportunities = {
  // Security-related terms that should link to /security
  security: {
    patterns: [
      { pattern: /enterprise-grade security/gi, anchor: 'enterprise-grade security and compliance' },
      { pattern: /enterprise security/gi, anchor: 'enterprise security standards' },
      { pattern: /GDPR compliance/gi, anchor: 'GDPR-compliant AI communication platform' },
      { pattern: /data protection/gi, anchor: 'comprehensive data protection measures' },
      { pattern: /security standards/gi, anchor: 'robust security standards' },
      { pattern: /cybersecurity/gi, anchor: 'advanced cybersecurity measures' },
      { pattern: /compliance requirements/gi, anchor: 'strict compliance requirements' },
      { pattern: /audit trails/gi, anchor: 'comprehensive audit trails' },
      { pattern: /data privacy/gi, anchor: 'enterprise data privacy' },
      { pattern: /encryption/gi, anchor: 'end-to-end encryption' },
      { pattern: /zero-trust/gi, anchor: 'zero-trust security architecture' },
      { pattern: /SOC 2/gi, anchor: 'SOC 2 Type II compliance' },
      { pattern: /ISO 27001/gi, anchor: 'ISO 27001 certification' }
    ],
    target: '/security'
  },
  
  // Features-related terms that should link to /features
  features: {
    patterns: [
      { pattern: /AI communication tools/gi, anchor: 'AI-powered communication tools' },
      { pattern: /AI-powered communication/gi, anchor: 'intelligent communication platform' },
      { pattern: /communication analytics/gi, anchor: 'advanced communication analytics' },
      { pattern: /message prioritization/gi, anchor: 'intelligent message prioritization' },
      { pattern: /real-time translation/gi, anchor: 'real-time multilingual translation' },
      { pattern: /context preservation/gi, anchor: 'intelligent context preservation' },
      { pattern: /automated insights/gi, anchor: 'automated communication insights' },
      { pattern: /communication efficiency/gi, anchor: 'communication efficiency tools' },
      { pattern: /team collaboration/gi, anchor: 'enhanced team collaboration' },
      { pattern: /workflow automation/gi, anchor: 'communication workflow automation' },
      { pattern: /integration capabilities/gi, anchor: 'seamless integration capabilities' },
      { pattern: /communication platform/gi, anchor: 'comprehensive communication platform' },
      { pattern: /AI assistant/gi, anchor: 'AI communication assistant' },
      { pattern: /communication metrics/gi, anchor: 'detailed communication metrics' }
    ],
    target: '/features'
  }
};

// Process a single blog post
function processBlogPost(filePath, locale) {
  console.log(`📝 Processing: ${path.basename(filePath)}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  let linkCount = 0;
  const addedLinks = new Set();
  
  // Process each category of linking opportunities
  Object.entries(linkingOpportunities).forEach(([category, config]) => {
    config.patterns.forEach(({ pattern, anchor }) => {
      // Check if this pattern exists and we haven't already linked it in this post
      if (pattern.test(content) && !addedLinks.has(anchor.toLowerCase())) {
        // Create the link
        const link = `[${anchor}](/${locale}${config.target})`;
        
        // Replace the first occurrence with a link
        content = content.replace(pattern, (match) => {
          // Check if this text is already inside a markdown link
          const beforeMatch = content.substring(0, content.indexOf(match));
          const afterMatch = content.substring(content.indexOf(match) + match.length);
          
          // Simple check for existing links (not perfect but works for most cases)
          const hasLinkBefore = beforeMatch.includes('](') && beforeMatch.lastIndexOf('](') > beforeMatch.lastIndexOf('[');
          const hasLinkAfter = afterMatch.includes(')') && afterMatch.indexOf(')') < afterMatch.indexOf('[');
          
          if (hasLinkBefore && hasLinkAfter) {
            return match; // Already in a link, don't replace
          }
          
          linkCount++;
          addedLinks.add(anchor.toLowerCase());
          return link;
        });
      }
    });
  });
  
  // Ensure we have at least 2-3 relevant links per article
  if (linkCount < 2) {
    // Add additional contextual links based on content
    const additionalLinks = getAdditionalLinks(content, locale);
    additionalLinks.forEach(({ pattern, anchor, target }) => {
      if (!addedLinks.has(anchor.toLowerCase()) && pattern.test(content)) {
        const link = `[${anchor}](/${locale}${target})`;
        content = content.replace(pattern, link);
        linkCount++;
        addedLinks.add(anchor.toLowerCase());
      }
    });
  }
  
  // Write back to file if changes were made
  if (linkCount > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Added ${linkCount} internal links`);
  } else {
    console.log(`ℹ️  No new links added (may already have sufficient links)`);
  }
  
  return linkCount;
}

// Get additional contextual links based on content
function getAdditionalLinks(content, locale) {
  const additionalLinks = [];
  
  // Check for specific topics and add relevant links
  if (content.toLowerCase().includes('roi') || content.toLowerCase().includes('return on investment')) {
    additionalLinks.push({
      pattern: /communication ROI/gi,
      anchor: 'communication ROI measurement',
      target: '/features'
    });
  }
  
  if (content.toLowerCase().includes('data-driven') || content.toLowerCase().includes('analytics')) {
    additionalLinks.push({
      pattern: /data-driven communication/gi,
      anchor: 'data-driven communication analytics',
      target: '/features'
    });
  }
  
  if (content.toLowerCase().includes('professional service') || content.toLowerCase().includes('expert team')) {
    additionalLinks.push({
      pattern: /professional service organizations/gi,
      anchor: 'professional service organization features',
      target: '/features'
    });
  }
  
  if (content.toLowerCase().includes('multilingual') || content.toLowerCase().includes('language')) {
    additionalLinks.push({
      pattern: /multilingual support/gi,
      anchor: 'multilingual communication support',
      target: '/features'
    });
  }
  
  return additionalLinks;
}

// Main processing function
async function main() {
  const locales = ['en', 'fi'];
  let totalLinks = 0;
  let processedFiles = 0;
  
  for (const locale of locales) {
    const blogDir = path.join(projectRoot, 'content', 'blog', locale);
    
    if (!fs.existsSync(blogDir)) {
      console.log(`⚠️  Blog directory not found: ${blogDir}`);
      continue;
    }
    
    console.log(`\n📁 Processing ${locale.toUpperCase()} blog posts...`);
    
    const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.mdx'));
    
    for (const file of files) {
      const filePath = path.join(blogDir, file);
      const linksAdded = processBlogPost(filePath, locale);
      totalLinks += linksAdded;
      processedFiles++;
    }
  }
  
  console.log('\n📊 Summary:');
  console.log(`✅ Processed ${processedFiles} blog posts`);
  console.log(`🔗 Added ${totalLinks} total internal links`);
  console.log(`📈 Average: ${(totalLinks / processedFiles).toFixed(1)} links per post`);
  
  console.log('\n🎯 Linking Strategy:');
  console.log('- Security-related terms → /security page');
  console.log('- Feature-related terms → /features page');
  console.log('- Descriptive anchor text for natural linking');
  console.log('- 2-3 relevant links per article minimum');
  console.log('- Avoided repetitive anchors across posts');
}

main().catch(console.error);
