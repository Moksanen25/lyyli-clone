import fs from 'fs';
import path from 'path';

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface FAQContent {
  title: string;
  description: string;
  faqs: FAQ[];
}

const contentDirectory = path.join(process.cwd(), 'content', 'faq');

export function getFAQContent(locale: string): FAQContent {
  try {
    const filePath = path.join(contentDirectory, `${locale}.json`);
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContents) as FAQContent;
  } catch {
    // Fallback to English if locale not found
    const fallbackPath = path.join(contentDirectory, 'en.json');
    const fallbackContents = fs.readFileSync(fallbackPath, 'utf-8');
    return JSON.parse(fallbackContents) as FAQContent;
  }
}
