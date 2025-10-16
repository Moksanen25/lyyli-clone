import '@testing-library/jest-dom'

// Polyfills for Next.js server components in tests
global.Request = global.Request || class Request {};
global.Response = global.Response || class Response {};
global.Headers = global.Headers || class Headers {};
global.fetch = global.fetch || jest.fn();

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key) => {
    const translations = {
      'features.automatic.slack.title': 'Smart Slack messages',
      'features.automatic.slack.description': 'Generate contextually appropriate Slack messages with proper formatting, mentions, and channel-specific tone.',
      'features.automatic.teams.title': 'Teams integration',
      'features.automatic.teams.description': 'Create structured Teams messages with rich formatting, file attachments, and meeting summaries.',
      'features.automatic.email.title': 'Email automation',
      'features.automatic.email.description': 'Compose professional emails with proper subject lines, formatting, and follow-up sequences.',
      'features.governance.audit.title': 'Audit trails',
      'features.governance.audit.description': 'Complete audit trails for all content changes and approvals.',
      'features.governance.version.title': 'Version control',
      'features.governance.version.description': 'Track all versions of your content with rollback capabilities.',
      'features.governance.access.title': 'Access control',
      'features.governance.access.description': 'Role-based access control for content management.',
      'features.security.encryption.title': 'End-to-end encryption',
      'features.security.encryption.description': 'Bank-level security with SOC 2 compliance.',
      'features.security.iso.title': 'ISO 27001 certified',
      'features.security.iso.description': 'International standard for information security management.',
      'features.security.gdpr.title': 'GDPR compliant',
      'features.security.gdpr.description': 'Full compliance with European data protection regulations.',
      'features.multilingual.translation.title': 'AI translation',
      'features.multilingual.translation.description': 'Automatic translation across multiple languages.',
      'features.multilingual.locales.title': 'Multi-locale support',
      'features.multilingual.locales.description': 'Support for multiple regional variations.',
      'features.multilingual.cultural.title': 'Cultural adaptation',
      'features.multilingual.cultural.description': 'Content adapted to local cultural contexts.',
      'features.integrations.email.title': 'Email integration',
      'features.integrations.email.description': 'Seamless integration with email platforms.',
    }
    return translations[key] || key
  }
}))

// Mock React hooks for testing
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))
