import fs from 'fs';
import path from 'path';

describe('FAQ Schema Validation', () => {
  const faqDataPath = path.join(process.cwd(), 'content/faq');
  
  it('should have valid English FAQ content', () => {
    const enPath = path.join(faqDataPath, 'en.json');
    const content = JSON.parse(fs.readFileSync(enPath, 'utf8'));
    
    expect(content.title).toBe('Frequently Asked Questions');
    expect(content.description).toBeDefined();
    expect(Array.isArray(content.faqs)).toBe(true);
    expect(content.faqs.length).toBeGreaterThan(0);
    
    // Validate each FAQ structure
    content.faqs.forEach((faq: any) => {
      expect(faq.id).toBeDefined();
      expect(faq.question).toBeDefined();
      expect(faq.answer).toBeDefined();
      expect(faq.answer.length).toBeGreaterThan(50); // Substantial answers
    });
  });
  
  it('should have valid Finnish FAQ content', () => {
    const fiPath = path.join(faqDataPath, 'fi.json');
    const content = JSON.parse(fs.readFileSync(fiPath, 'utf8'));
    
    expect(content.title).toBe('Usein Kysytyt Kysymykset');
    expect(content.description).toBeDefined();
    expect(Array.isArray(content.faqs)).toBe(true);
    expect(content.faqs.length).toBeGreaterThan(0);
    
    // Validate each FAQ structure
    content.faqs.forEach((faq: any) => {
      expect(faq.id).toBeDefined();
      expect(faq.question).toBeDefined();
      expect(faq.answer).toBeDefined();
      expect(faq.answer.length).toBeGreaterThan(50); // Substantial answers
    });
  });
  
  it('should have matching FAQ IDs between languages', () => {
    const enPath = path.join(faqDataPath, 'en.json');
    const fiPath = path.join(faqDataPath, 'fi.json');
    
    const enContent = JSON.parse(fs.readFileSync(enPath, 'utf8'));
    const fiContent = JSON.parse(fs.readFileSync(fiPath, 'utf8'));
    
    const enIds = enContent.faqs.map((faq: any) => faq.id).sort();
    const fiIds = fiContent.faqs.map((faq: any) => faq.id).sort();
    
    expect(enIds).toEqual(fiIds);
  });
  
  it('should generate valid JSON-LD schema structure', () => {
    const enPath = path.join(faqDataPath, 'en.json');
    const content = JSON.parse(fs.readFileSync(enPath, 'utf8'));
    
    // Simulate the schema generation from FAQSection component
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": content.faqs.map((faq: any) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
    
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('FAQPage');
    expect(Array.isArray(schema.mainEntity)).toBe(true);
    expect(schema.mainEntity.length).toBe(content.faqs.length);
    
    // Validate first FAQ structure
    const firstFAQ = schema.mainEntity[0];
    expect(firstFAQ['@type']).toBe('Question');
    expect(firstFAQ.name).toBeDefined();
    expect(firstFAQ.acceptedAnswer['@type']).toBe('Answer');
    expect(firstFAQ.acceptedAnswer.text).toBeDefined();
  });
});
