/**
 * Application constants and configuration values
 * Centralizes common values to improve maintainability
 */

// API Configuration
export const API_CONFIG = {
  TIMEOUT: 10000,
  MAX_RETRIES: 3,
  RATE_LIMIT: {
    MAX_REQUESTS: 10,
    WINDOW_MS: 60000,
  },
} as const;

// Form Validation
export const FORM_CONFIG = {
  MAX_LENGTH: {
    NAME: 50,
    EMAIL: 100,
    COMPANY: 100,
    ROLE: 100,
    MESSAGE: 1000,
  },
  MIN_LENGTH: {
    NAME: 2,
    EMAIL: 5,
    COMPANY: 2,
    ROLE: 2,
    MESSAGE: 10,
  },
} as const;

// Organization Sizes
export const ORGANIZATION_SIZES = [
  { value: '1-10', label: '1-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201-1000', label: '201-1000 employees' },
  { value: '1000+', label: '1000+ employees' },
] as const;

// Country Codes
export const COUNTRY_CODES = [
  { value: '+358', label: 'Finland (+358)' },
  { value: '+46', label: 'Sweden (+46)' },
  { value: '+47', label: 'Norway (+47)' },
  { value: '+45', label: 'Denmark (+45)' },
  { value: '+44', label: 'United Kingdom (+44)' },
  { value: '+49', label: 'Germany (+49)' },
  { value: '+33', label: 'France (+33)' },
  { value: '+39', label: 'Italy (+39)' },
  { value: '+34', label: 'Spain (+34)' },
  { value: '+31', label: 'Netherlands (+31)' },
  { value: '+1', label: 'United States (+1)' },
  { value: '+81', label: 'Japan (+81)' },
  { value: '+86', label: 'China (+86)' },
  { value: '+91', label: 'India (+91)' },
  { value: '+61', label: 'Australia (+61)' },
] as const;

// GDPR and Security
export const CONSENT_CONFIG = {
  GDPR_RETENTION_DAYS: 2555, // 7 years
  CONSENT_VALIDITY_DAYS: 730, // 2 years
  SECURITY_LEVELS: {
    BASIC: 'basic',
    ENHANCED: 'enhanced',
    ENTERPRISE: 'enterprise',
  },
} as const;

// UI Configuration
export const UI_CONFIG = {
  ANIMATION_DURATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
  },
  BREAKPOINTS: {
    MOBILE: 640,
    TABLET: 768,
    DESKTOP: 1024,
    LARGE: 1280,
  },
  Z_INDEX: {
    DROPDOWN: 50,
    MODAL: 100,
    TOOLTIP: 200,
    NOTIFICATION: 300,
  },
} as const;

// Feature Flags
export const FEATURE_FLAGS = {
  ANALYTICS: process.env.NODE_ENV === 'production',
  DEBUG_MODE: process.env.NODE_ENV === 'development',
  EXPERIMENTAL_FEATURES: false,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  GENERIC: 'An error occurred. Please try again later.',
  NETWORK: 'Network error. Please check your connection.',
  VALIDATION: 'Please check your input and try again.',
  RATE_LIMIT: 'Too many requests. Please try again later.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  FORM_SUBMITTED: 'Form submitted successfully!',
  CONTACT_SENT: 'Your message has been sent successfully!',
  WAITLIST_JOINED: 'Successfully joined the waitlist!',
  SETTINGS_SAVED: 'Settings saved successfully!',
} as const;
