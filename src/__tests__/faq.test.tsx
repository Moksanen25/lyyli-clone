import { render, screen, act } from '@testing-library/react';
import FAQSection from '@/components/faq/FAQSection';

const mockFAQs = [
  {
    id: 'test-1',
    question: 'What is Lyyli.ai?',
    answer: 'Lyyli.ai is an AI-powered communication platform.'
  },
  {
    id: 'test-2',
    question: 'Is it GDPR compliant?',
    answer: 'Yes, Lyyli.ai is fully GDPR compliant.'
  }
];

describe('FAQSection', () => {
  it('renders FAQ section with title and questions', () => {
    render(<FAQSection faqs={mockFAQs} title="Test FAQ" />);
    
    expect(screen.getByText('Test FAQ')).toBeInTheDocument();
    expect(screen.getByText('What is Lyyli.ai?')).toBeInTheDocument();
    expect(screen.getByText('Is it GDPR compliant?')).toBeInTheDocument();
  });

  it('toggles FAQ items on click', () => {
    render(<FAQSection faqs={mockFAQs} />);
    
    const firstQuestion = screen.getByText('What is Lyyli.ai?');
    const firstAnswer = screen.getByText('Lyyli.ai is an AI-powered communication platform.');
    
    // Initially hidden
    expect(firstAnswer).not.toBeVisible();
    
    // Click to open
    act(() => {
      firstQuestion.click();
    });
    expect(firstAnswer).toBeVisible();
    
    // Click to close
    act(() => {
      firstQuestion.click();
    });
    expect(firstAnswer).not.toBeVisible();
  });

  it('renders JSON-LD schema', () => {
    render(<FAQSection faqs={mockFAQs} />);
    
    const scriptElement = document.querySelector('script[type="application/ld+json"]');
    expect(scriptElement).toBeInTheDocument();
    
    const schemaContent = JSON.parse(scriptElement?.textContent || '{}');
    expect(schemaContent['@context']).toBe('https://schema.org');
    expect(schemaContent['@type']).toBe('FAQPage');
    expect(schemaContent.mainEntity).toHaveLength(2);
    
    // Check first FAQ structure
    const firstFAQ = schemaContent.mainEntity[0];
    expect(firstFAQ['@type']).toBe('Question');
    expect(firstFAQ.name).toBe('What is Lyyli.ai?');
    expect(firstFAQ.acceptedAnswer['@type']).toBe('Answer');
    expect(firstFAQ.acceptedAnswer.text).toBe('Lyyli.ai is an AI-powered communication platform.');
  });

  it('has proper accessibility attributes', () => {
    render(<FAQSection faqs={mockFAQs} />);
    
    const firstQuestion = screen.getByText('What is Lyyli.ai?').closest('button');
    expect(firstQuestion).toHaveAttribute('aria-expanded', 'false');
    expect(firstQuestion).toHaveAttribute('aria-controls');
    
    // Click to test aria-expanded change
    act(() => {
      firstQuestion?.click();
    });
    expect(firstQuestion).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders description when provided', () => {
    const description = 'Get answers to common questions';
    render(<FAQSection faqs={mockFAQs} description={description} />);
    
    expect(screen.getByText(description)).toBeInTheDocument();
  });
});
