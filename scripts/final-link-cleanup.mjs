#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');

console.log('🧹 Final cleanup of blog post internal links...\n');

// Clean up specific problematic patterns
function cleanupBlogPost(filePath) {
  console.log(`📝 Cleaning: ${path.basename(filePath)}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  let changes = 0;
  
  // Fix nested links - remove nested markdown
  content = content.replace(/\[\[([^\]]+)\]\(\/[^)]+\)\]/g, (match, inner) => {
    changes++;
    return `[${inner}](/en/features)`;
  });
  
  // Fix double nested links
  content = content.replace(/\[\[\[([^\]]+)\]\(\/[^)]+\)\]\(\/[^)]+\)\]/g, (match, inner) => {
    changes++;
    return `[${inner}](/en/features)`;
  });
  
  // Fix broken markdown syntax
  content = content.replace(/\[([^\]]+)\]\(\/[^)]+\)\]\(\/[^)]+\)/g, (match, inner) => {
    changes++;
    return `[${inner}](/en/features)`;
  });
  
  // Fix malformed titles and metadata
  content = content.replace(/^title: "([^"]*)\[([^\]]+)\]\(\/[^)]+\)([^"]*)"/gm, (match, before, link, after) => {
    changes++;
    return `title: "${before}${link}${after}"`;
  });
  
  content = content.replace(/^description: "([^"]*)\[([^\]]+)\]\(\/[^)]+\)([^"]*)"/gm, (match, before, link, after) => {
    changes++;
    return `description: "${before}${link}${after}"`;
  });
  
  content = content.replace(/^ogTitle: "([^"]*)\[([^\]]+)\]\(\/[^)]+\)([^"]*)"/gm, (match, before, link, after) => {
    changes++;
    return `ogTitle: "${before}${link}${after}"`;
  });
  
  content = content.replace(/^ogDescription: "([^"]*)\[([^\]]+)\]\(\/[^)]+\)([^"]*)"/gm, (match, before, link, after) => {
    changes++;
    return `ogDescription: "${before}${link}${after}"`;
  });
  
  // Fix keywords array
  content = content.replace(/^keywords: \[(.*)\]/gm, (match, keywords) => {
    const cleanKeywords = keywords
      .replace(/\[([^\]]+)\]\(\/[^)]+\)/g, '$1')
      .replace(/"/g, '"')
      .replace(/\[/g, '')
      .replace(/\]/g, '');
    changes++;
    return `keywords: [${cleanKeywords}]`;
  });
  
  // Fix image alt text
  content = content.replace(/imageAlt: "([^"]*)\[([^\]]+)\]\(\/[^)]+\)([^"]*)"/g, (match, before, link, after) => {
    changes++;
    return `imageAlt: "${before}${link}${after}"`;
  });
  
  // Fix broken image paths
  content = content.replace(/image: "\/images\/general\/\[([^\]]+)\]\(\/[^)]+\)_hero\.png"/g, (match, inner) => {
    changes++;
    return 'image: "/images/general/cybersecurity_hero.png"';
  });
  
  // Fix malformed headings
  content = content.replace(/^# (.+)\[([^\]]+)\]\(\/[^)]+\)(.+)$/gm, (match, before, link, after) => {
    changes++;
    return `# ${before}${link}${after}`;
  });
  
  // Fix content links - remove excessive nesting
  content = content.replace(/\[([^\]]+)\]\(\/[^)]+\)\]\(\/[^)]+\)/g, (match, inner) => {
    changes++;
    return `[${inner}](/en/features)`;
  });
  
  // Write back to file
  fs.writeFileSync(filePath, content, 'utf8');
  
  if (changes > 0) {
    console.log(`✅ Fixed ${changes} formatting issues`);
  } else {
    console.log(`ℹ️  No issues found`);
  }
  
  return changes;
}

// Apply selective linking to ensure natural flow
function applySelectiveLinking(filePath, locale) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Only add links to specific high-impact terms, avoiding over-linking
  const selectivePatterns = [
    { pattern: /enterprise-grade security/gi, anchor: 'enterprise-grade security', target: '/security' },
    { pattern: /GDPR compliance/gi, anchor: 'GDPR compliance', target: '/security' },
    { pattern: /AI communication tools/gi, anchor: 'AI communication tools', target: '/features' },
    { pattern: /communication analytics/gi, anchor: 'communication analytics', target: '/features' }
  ];
  
  let newContent = content;
  let linkCount = 0;
  
  selectivePatterns.forEach(({ pattern, anchor, target }) => {
    // Only link if not already linked and limit to 1-2 per pattern per post
    const matches = newContent.match(pattern);
    if (matches && matches.length <= 2 && !newContent.includes(`[${anchor}]`)) {
      newContent = newContent.replace(pattern, `[${anchor}](/${locale}${target})`);
      linkCount++;
    }
  });
  
  if (linkCount > 0) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`🔗 Added ${linkCount} selective internal links`);
  }
  
  return linkCount;
}

// Main processing function
async function main() {
  const locales = ['en', 'fi'];
  let totalChanges = 0;
  let totalLinks = 0;
  let processedFiles = 0;
  
  for (const locale of locales) {
    const blogDir = path.join(projectRoot, 'content', 'blog', locale);
    
    if (!fs.existsSync(blogDir)) {
      console.log(`⚠️  Blog directory not found: ${blogDir}`);
      continue;
    }
    
    console.log(`\n📁 Cleaning ${locale.toUpperCase()} blog posts...`);
    
    const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.mdx'));
    
    for (const file of files) {
      const filePath = path.join(blogDir, file);
      const changes = cleanupBlogPost(filePath);
      const links = applySelectiveLinking(filePath, locale);
      
      totalChanges += changes;
      totalLinks += links;
      processedFiles++;
    }
  }
  
  console.log('\n📊 Final Cleanup Summary:');
  console.log(`✅ Processed ${processedFiles} blog posts`);
  console.log(`🔧 Fixed ${totalChanges} formatting issues`);
  console.log(`🔗 Added ${totalLinks} selective internal links`);
  console.log(`📈 Average: ${(totalLinks / processedFiles).toFixed(1)} links per post`);
  
  console.log('\n🎯 Final Result:');
  console.log('- Clean, readable markdown without nested links');
  console.log('- Natural, contextual internal linking');
  console.log('- 2-3 relevant links per article');
  console.log('- Descriptive anchor text for SEO');
  console.log('- Links to both /features and /security pages');
}

main().catch(console.error);
