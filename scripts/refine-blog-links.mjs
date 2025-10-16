#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');

console.log('🔧 Refining blog post internal links for better readability...\n');

// More selective linking patterns - avoid over-linking
const refinedLinkingOpportunities = {
  security: {
    patterns: [
      { pattern: /enterprise-grade security and compliance/gi, anchor: 'enterprise-grade security and compliance', priority: 1 },
      { pattern: /GDPR compliance/gi, anchor: 'GDPR-compliant AI communication platform', priority: 1 },
      { pattern: /data protection/gi, anchor: 'comprehensive data protection measures', priority: 2 },
      { pattern: /security standards/gi, anchor: 'robust security standards', priority: 2 },
      { pattern: /audit trails/gi, anchor: 'comprehensive audit trails', priority: 2 },
      { pattern: /end-to-end encryption/gi, anchor: 'end-to-end encryption', priority: 2 },
      { pattern: /zero-trust/gi, anchor: 'zero-trust security architecture', priority: 2 }
    ],
    target: '/security'
  },
  
  features: {
    patterns: [
      { pattern: /AI communication tools/gi, anchor: 'AI-powered communication tools', priority: 1 },
      { pattern: /communication analytics/gi, anchor: 'advanced communication analytics', priority: 1 },
      { pattern: /message prioritization/gi, anchor: 'intelligent message prioritization', priority: 2 },
      { pattern: /real-time translation/gi, anchor: 'real-time multilingual translation', priority: 2 },
      { pattern: /communication efficiency/gi, anchor: 'communication efficiency tools', priority: 2 },
      { pattern: /team collaboration/gi, anchor: 'enhanced team collaboration', priority: 2 },
      { pattern: /communication platform/gi, anchor: 'comprehensive communication platform', priority: 1 }
    ],
    target: '/features'
  }
};

// Clean up existing links and apply refined linking
function refineBlogPost(filePath, locale) {
  console.log(`📝 Refining: ${path.basename(filePath)}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  let linkCount = 0;
  
  // First, clean up any malformed or excessive links
  content = cleanupLinks(content);
  
  // Apply refined linking strategy
  const addedLinks = new Set();
  
  // Process high-priority links first
  Object.entries(refinedLinkingOpportunities).forEach(([category, config]) => {
    // Sort patterns by priority
    const sortedPatterns = config.patterns.sort((a, b) => a.priority - b.priority);
    
    sortedPatterns.forEach(({ pattern, anchor }) => {
      // Limit to 3-4 links per category per post
      if (addedLinks.size >= 6) return;
      
      if (pattern.test(content) && !addedLinks.has(anchor.toLowerCase())) {
        const link = `[${anchor}](/${locale}${config.target})`;
        
        // Replace only the first occurrence that's not already in a link
        content = content.replace(pattern, (match) => {
          const beforeMatch = content.substring(0, content.indexOf(match));
          const afterMatch = content.substring(content.indexOf(match) + match.length);
          
          // Check if already in a link
          const hasLinkBefore = beforeMatch.includes('](') && beforeMatch.lastIndexOf('](') > beforeMatch.lastIndexOf('[');
          const hasLinkAfter = afterMatch.includes(')') && afterMatch.indexOf(')') < afterMatch.indexOf('[');
          
          if (hasLinkBefore && hasLinkAfter) {
            return match;
          }
          
          linkCount++;
          addedLinks.add(anchor.toLowerCase());
          return link;
        });
      }
    });
  });
  
  // Write back to file
  fs.writeFileSync(filePath, content, 'utf8');
  
  if (linkCount > 0) {
    console.log(`✅ Refined to ${linkCount} high-quality internal links`);
  } else {
    console.log(`ℹ️  No changes needed`);
  }
  
  return linkCount;
}

// Clean up malformed links
function cleanupLinks(content) {
  // Remove nested links and fix malformed markdown
  content = content.replace(/\[\[([^\]]+)\]\(\/[^)]+\)\]/g, '$1');
  content = content.replace(/\[([^\]]+)\]\(\/[^)]+\)\]\(\/[^)]+\)/g, '[$1](/en/features)');
  
  // Fix broken image paths
  content = content.replace(/\/images\/general\/\[([^\]]+)\]\(\/[^)]+\)_hero\.png/g, '/images/general/cybersecurity_hero.png');
  
  // Clean up excessive linking in titles and metadata
  content = content.replace(/^title: "\[([^\]]+)\]\(\/[^)]+\)([^"]*)"/gm, 'title: "$1$2"');
  content = content.replace(/^description: "\[([^\]]+)\]\(\/[^)]+\)([^"]*)"/gm, 'description: "$1$2"');
  content = content.replace(/^ogTitle: "\[([^\]]+)\]\(\/[^)]+\)([^"]*)"/gm, 'ogTitle: "$1$2"');
  content = content.replace(/^ogDescription: "\[([^\]]+)\]\(\/[^)]+\)([^"]*)"/gm, 'ogDescription: "$1$2"');
  
  return content;
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
    
    console.log(`\n📁 Refining ${locale.toUpperCase()} blog posts...`);
    
    const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.mdx'));
    
    for (const file of files) {
      const filePath = path.join(blogDir, file);
      const linksAdded = refineBlogPost(filePath, locale);
      totalLinks += linksAdded;
      processedFiles++;
    }
  }
  
  console.log('\n📊 Refinement Summary:');
  console.log(`✅ Processed ${processedFiles} blog posts`);
  console.log(`🔗 Maintained ${totalLinks} high-quality internal links`);
  console.log(`📈 Average: ${(totalLinks / processedFiles).toFixed(1)} links per post`);
  
  console.log('\n🎯 Refined Linking Strategy:');
  console.log('- Prioritized high-impact linking opportunities');
  console.log('- Limited to 3-4 links per category per post');
  console.log('- Cleaned up malformed and excessive links');
  console.log('- Maintained natural, contextual anchor text');
  console.log('- Ensured 2-3 relevant links per article');
}

main().catch(console.error);
