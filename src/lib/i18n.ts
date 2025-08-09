// Translation type definitions
export interface TranslationKeys {
  // Navigation
  'nav.home': string;
  'nav.features': string;
  'nav.pricing': string;
  'nav.contact': string;
  'nav.getStarted': string;

  // Hero section
  'hero.tagline': string;
  'hero.headline': string;
  'hero.description': string;
  'hero.ctaPrimary': string;
  'hero.ctaSecondary': string;
  'hero.trustBadge': string;

  // Problem statements (buying triggers)
  'problems.title': string;
  'problems.missedCommunications.title': string;
  'problems.missedCommunications.description': string;
  'problems.channelOverload.title': string;
  'problems.channelOverload.description': string;
  'problems.accountability.title': string;
  'problems.accountability.description': string;
  'problems.regulatory.title': string;
  'problems.regulatory.description': string;

  // Solution features
  'features.title': string;
  'features.speed.title': string;
  'features.speed.description': string;
  'features.clarity.title': string;
  'features.clarity.description': string;
  'features.governance.title': string;
  'features.governance.description': string;
  'features.multilingual.title': string;
  'features.multilingual.description': string;
  'features.security.title': string;
  'features.security.description': string;

  // Target roles
  'roles.title': string;
  'roles.operations.title': string;
  'roles.operations.description': string;
  'roles.communications.title': string;
  'roles.communications.description': string;
  'roles.pmo.title': string;
  'roles.pmo.description': string;
  'roles.hr.title': string;
  'roles.hr.description': string;

  // CTA sections
  'cta.title': string;
  'cta.description': string;
  'cta.button': string;
  'cta.demo': string;

  // Footer
  'footer.tagline': string;
  'footer.rights': string;
}

// Utility function for server-side translations
export function getTranslations(locale: string = 'en') {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require(`../translations/${locale}.json`);
  } catch {
    console.warn(`Translation file for locale "${locale}" not found, falling back to English`);
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require('../translations/en.json');
  }
}

// Language switcher component props
export interface LanguageSwitcherProps {
  currentLocale: string;
  onLanguageChange: (locale: string) => void;
}
