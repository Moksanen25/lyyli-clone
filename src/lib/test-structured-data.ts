/**
 * Test script to validate structured data
 * Run this to test the WebSite schema with SearchAction
 */

import { generateWebsiteSchema, validateSchema } from './structured-data';

// Test the WebSite schema generation
const testWebsiteSchema = () => {
  console.log('Testing WebSite schema generation...');
  
  // Test English version
  const enSchema = generateWebsiteSchema('en');
  console.log('English WebSite Schema:', JSON.stringify(enSchema, null, 2));
  
  // Test Finnish version
  const fiSchema = generateWebsiteSchema('fi');
  console.log('Finnish WebSite Schema:', JSON.stringify(fiSchema, null, 2));
  
  // Validate schemas
  const enValidation = validateSchema(enSchema);
  const fiValidation = validateSchema(fiSchema);
  
  console.log('English validation:', enValidation);
  console.log('Finnish validation:', fiValidation);
  
  // Test SearchAction specifically
  const searchAction = enSchema.potentialAction;
  console.log('SearchAction:', JSON.stringify(searchAction, null, 2));
  
  // Verify SearchAction structure
  if (searchAction && 
      searchAction['@type'] === 'SearchAction' &&
      searchAction.target &&
      searchAction.target['@type'] === 'EntryPoint' &&
      searchAction.target.urlTemplate &&
      searchAction['query-input']) {
    console.log('✅ SearchAction structure is valid');
    console.log('Search URL template:', searchAction.target.urlTemplate);
  } else {
    console.log('❌ SearchAction structure is invalid');
  }
  
  return { enSchema, fiSchema, enValidation, fiValidation };
};

// Test URL template parsing
const testUrlTemplate = () => {
  const schema = generateWebsiteSchema('en');
  const urlTemplate = schema.potentialAction?.target?.urlTemplate;
  
  if (urlTemplate) {
    console.log('\nTesting URL template parsing...');
    
    // Test with sample search term
    const searchTerm = 'getting started';
    const encodedTerm = encodeURIComponent(searchTerm);
    const testUrl = urlTemplate.replace('{search_term_string}', encodedTerm);
    
    console.log('Original template:', urlTemplate);
    console.log('Search term:', searchTerm);
    console.log('Encoded term:', encodedTerm);
    console.log('Generated URL:', testUrl);
    
    // Validate URL format
    try {
      new URL(testUrl);
      console.log('✅ Generated URL is valid');
    } catch (error) {
      console.log('❌ Generated URL is invalid:', error);
    }
  }
};

// Run tests
if (typeof window === 'undefined') {
  // Only run in Node.js environment
  testWebsiteSchema();
  testUrlTemplate();
}

export { testWebsiteSchema, testUrlTemplate };
