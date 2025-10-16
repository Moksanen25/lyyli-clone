#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const contentDirectory = path.join(process.cwd(), "content/blog");

// Translation mapping between English and Finnish blog posts
const TRANSLATION_MAP = {
  // English -> Finnish
  "communication-roi-leadership": "viestinnan-roi-johdolle",
  "turning-communication-into-profit-center": "viestinnasta-tuottava-funktio",
  "internal-communication-pitfalls": "sisaisen-viestinnan-sudenkuopat",
  "enterprise-security-gdpr-compliance": "yritysturvallisuus-gdpr-vaatimustenmukaisuus",
  "ai-communication-expert-teams": "ai-viestinta-asiantuntijatiimit",
  "ai-spots-communication-opportunities": "tekoaly-tunnistaa-viestinnan-mahdollisuudet",
  "consistent-brand-voice": "yhtenainen-brandi-aanen",
  "lyyli-funding-announcement": "lyyli-funding-announcement", // Same slug in both
  "intohimo-2025-partnership": "intohimo-2025-yhteistyo",
  
  // Finnish -> English (reverse mapping)
  "viestinnan-roi-johdolle": "communication-roi-leadership",
  "viestinnasta-tuottava-funktio": "turning-communication-into-profit-center",
  "sisaisen-viestinnan-sudenkuopat": "internal-communication-pitfalls",
  "yritysturvallisuus-gdpr-vaatimustenmukaisuus": "enterprise-security-gdpr-compliance",
  "ai-viestinta-asiantuntijatiimit": "ai-communication-expert-teams",
  "tekoaly-tunnistaa-viestinnan-mahdollisuudet": "ai-spots-communication-opportunities",
  "yhtenainen-brandi-aanen": "consistent-brand-voice",
  "intohimo-2025-yhteistyo": "intohimo-2025-partnership",
};

function getAllBlogPosts(locale) {
  const localeDir = path.join(contentDirectory, locale);

  if (!fs.existsSync(localeDir)) {
    return [];
  }

  const fileNames = fs.readdirSync(localeDir);
  return fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => name.replace(/\.mdx$/, ""))
    .sort();
}

function getTranslationSlug(slug) {
  return TRANSLATION_MAP[slug] || null;
}

function verifyBlogLanguageSeparation() {
  console.log('🔍 Verifying Blog Language Separation...\n');
  
  try {
  
  const enPosts = getAllBlogPosts('en');
  const fiPosts = getAllBlogPosts('fi');
  
  console.log(`📊 Blog Post Counts:`);
  console.log(`   English posts: ${enPosts.length}`);
  console.log(`   Finnish posts: ${fiPosts.length}\n`);
  
  // Check for language separation
  console.log('🌐 Language Separation Check:');
  const enInFi = enPosts.filter(slug => fiPosts.includes(slug));
  const fiInEn = fiPosts.filter(slug => enPosts.includes(slug));
  
  if (enInFi.length > 0) {
    console.log(`   ❌ English posts found in Finnish directory: ${enInFi.join(', ')}`);
  } else {
    console.log(`   ✅ No English posts found in Finnish directory`);
  }
  
  if (fiInEn.length > 0) {
    console.log(`   ❌ Finnish posts found in English directory: ${fiInEn.join(', ')}`);
  } else {
    console.log(`   ✅ No Finnish posts found in English directory`);
  }
  
  // Check for translation pairs
  console.log('\n🔗 Translation Pairs Check:');
  let translationPairs = 0;
  let missingTranslations = 0;
  
  for (const enSlug of enPosts) {
    const fiSlug = getTranslationSlug(enSlug);
    if (fiSlug && fiPosts.includes(fiSlug)) {
      translationPairs++;
      console.log(`   ✅ ${enSlug} ↔ ${fiSlug}`);
    } else if (fiSlug) {
      missingTranslations++;
      console.log(`   ⚠️  ${enSlug} → ${fiSlug} (Finnish post missing)`);
    } else {
      missingTranslations++;
      console.log(`   ⚠️  ${enSlug} (no Finnish translation)`);
    }
  }
  
  for (const fiSlug of fiPosts) {
    const enSlug = getTranslationSlug(fiSlug);
    if (!enSlug || !enPosts.includes(enSlug)) {
      if (!enSlug) {
        console.log(`   ⚠️  ${fiSlug} (no English translation)`);
      }
    }
  }
  
  console.log(`\n📈 Translation Statistics:`);
  console.log(`   Translation pairs: ${translationPairs}`);
  console.log(`   Missing translations: ${missingTranslations}`);
  
  // Check for content quality issues
  console.log('\n🔍 Content Quality Check:');
  let contentIssues = 0;
  
  // Check English posts
  for (const slug of enPosts) {
    const filePath = path.join(contentDirectory, 'en', `${slug}.mdx`);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check for malformed links
    if (content.includes('[comprehensive comprehensive')) {
      console.log(`   ❌ ${slug}: Malformed link in description`);
      contentIssues++;
    }
    
    // Check for missing required fields
    if (!content.includes('title:')) {
      console.log(`   ❌ ${slug}: Missing title`);
      contentIssues++;
    }
    
    if (!content.includes('description:')) {
      console.log(`   ❌ ${slug}: Missing description`);
      contentIssues++;
    }
  }
  
  // Check Finnish posts
  for (const slug of fiPosts) {
    const filePath = path.join(contentDirectory, 'fi', `${slug}.mdx`);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check for missing required fields
    if (!content.includes('title:')) {
      console.log(`   ❌ ${slug}: Missing title`);
      contentIssues++;
    }
    
    if (!content.includes('description:')) {
      console.log(`   ❌ ${slug}: Missing description`);
      contentIssues++;
    }
  }
  
  if (contentIssues === 0) {
    console.log(`   ✅ No content quality issues found`);
  }
  
  // Summary
  console.log('\n📊 Summary:');
  const totalIssues = enInFi.length + fiInEn.length + contentIssues;
  
  if (totalIssues === 0) {
    console.log('✅ Blog language separation is working correctly!');
    console.log('✅ All posts are properly filtered by language');
    console.log('✅ Content quality is good');
    
    if (translationPairs > 0) {
      console.log(`✅ ${translationPairs} translation pairs are available for hreflang`);
    }
    
    if (missingTranslations > 0) {
      console.log(`ℹ️  ${missingTranslations} posts don't have translations (this is normal)`);
    }
  } else {
    console.log(`❌ Found ${totalIssues} issues that need to be fixed`);
    process.exit(1);
  }
  
  } catch (error) {
    console.error('❌ Error verifying blog language separation:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  verifyBlogLanguageSeparation().catch(console.error);
}

export { verifyBlogLanguageSeparation };
