import type { ReactElement, ReactNode } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import type { TranslationKeys } from '@/lib/i18n';

/**
 * Enhanced Test Utilities
 * Provides mock providers and utilities for testing React components
 */

// Re-export everything from React Testing Library
export {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react';

/**
 * Mock translations object with commonly used keys
 */
export const mockTranslations: Partial<TranslationKeys> = {
  'nav.features': 'Features',
  'nav.pricing': 'Pricing',
  'nav.contact': 'Contact',
  'nav.security': 'Security',
  'home.title': 'Welcome to Lyyli.ai',
  'home.description': 'AI Communication Assistant',
  'cta.getStarted': 'Get Started',
  'cta.learnMore': 'Learn More',
  'breadcrumbs.navigation': 'Breadcrumb navigation',
  'features.automatic.slack.title': 'Smart Slack messages',
  'features.automatic.slack.description':
    'Generate contextually appropriate Slack messages with proper formatting, mentions, and channel-specific tone.',
  'features.automatic.teams.title': 'Teams integration',
  'features.automatic.teams.description':
    'Create structured Teams messages with rich formatting, file attachments, and meeting summaries.',
  'features.automatic.email.title': 'Email automation',
  'features.automatic.email.description':
    'Compose professional emails with proper subject lines, formatting, and follow-up sequences.',
  'features.governance.audit.title': 'Audit trails',
  'features.governance.audit.description':
    'Complete audit trails for all content changes and approvals.',
  'features.governance.version.title': 'Version control',
  'features.governance.version.description':
    'Track all versions of your content with rollback capabilities.',
  'features.governance.access.title': 'Access control',
  'features.governance.access.description':
    'Role-based access control for content management.',
  'features.security.encryption.title': 'End-to-end encryption',
  'features.security.encryption.description':
    'Bank-level security with SOC 2 compliance.',
  'features.security.iso.title': 'ISO 27001 certified',
  'features.security.iso.description':
    'International standard for information security management.',
  'features.security.gdpr.title': 'GDPR compliant',
  'features.security.gdpr.description':
    'Full compliance with European data protection regulations.',
  'features.multilingual.translation.title': 'AI translation',
  'features.multilingual.translation.description':
    'Automatic translation across multiple languages.',
  'features.multilingual.locales.title': 'Multi-locale support',
  'features.multilingual.locales.description':
    'Support for multiple regional variations.',
  'features.multilingual.cultural.title': 'Cultural adaptation',
  'features.multilingual.cultural.description':
    'Content adapted to local cultural contexts.',
  'features.integrations.email.title': 'Email integration',
  'features.integrations.email.description':
    'Seamless integration with email platforms.',
};

/**
 * Type definition for mock router
 */
type MockRouterType = {
  push: jest.Mock;
  replace: jest.Mock;
  prefetch: jest.Mock;
  back: jest.Mock;
  forward: jest.Mock;
  refresh: jest.Mock;
  pathname: string;
  query: Record<string, unknown>;
  asPath: string;
  route: string;
  basePath: string;
  isReady: boolean;
  isPreview: boolean;
};

/**
 * Mock router for Next.js navigation
 */
export const createMockRouter = (
  overrides?: Partial<MockRouterType>
): MockRouterType => ({
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  pathname: '/en',
  query: {},
  asPath: '/en',
  route: '/en',
  basePath: '',
  isReady: true,
  isPreview: false,
  ...overrides,
});

/**
 * Test provider wrapper that includes common providers
 */
interface TestProvidersProps {
  children: ReactNode;
  locale?: string;
  translations?: Partial<TranslationKeys>;
}

export function TestProviders({
  children,
  locale = 'en',
}: TestProvidersProps): ReactElement {
  return (
    <div data-testid="test-provider" data-locale={locale}>
      {children}
    </div>
  );
}

/**
 * Custom render function with providers
 */
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  locale?: string;
  translations?: Partial<TranslationKeys>;
}

export function renderWithProviders(
  ui: ReactElement,
  options?: CustomRenderOptions
): ReturnType<typeof render> {
  const {
    locale = 'en',
    translations = mockTranslations,
    ...renderOptions
  } = options ?? {};

  function Wrapper({ children }: { children: ReactNode }): ReactElement {
    return (
      <TestProviders locale={locale} translations={translations}>
        {children}
      </TestProviders>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

/**
 * Create mock props for components that need translations and locale
 */
export function createMockComponentProps(overrides?: {
  locale?: string;
  translations?: Partial<TranslationKeys>;
}): { locale: string; translations: TranslationKeys } {
  return {
    locale: overrides?.locale ?? 'en',
    translations: (overrides?.translations ??
      mockTranslations) as TranslationKeys,
  };
}

/**
 * Mock window.matchMedia for responsive tests
 */
export function mockMatchMedia(matches: boolean = false): void {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

/**
 * Mock IntersectionObserver for lazy-loading tests
 */
export function mockIntersectionObserver(): void {
  global.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
    root: null,
    rootMargin: '',
    thresholds: [],
    takeRecords: jest.fn(),
  })) as unknown as typeof IntersectionObserver;
}

/**
 * Mock ResizeObserver for responsive component tests
 */
export function mockResizeObserver(): void {
  global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })) as unknown as typeof ResizeObserver;
}

/**
 * Wait for async operations in tests
 */
export function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Create a mock image for testing
 */
export function createMockImage(): Partial<HTMLImageElement> {
  return {
    src: '',
    alt: '',
    onload: null,
    onerror: null,
  };
}
