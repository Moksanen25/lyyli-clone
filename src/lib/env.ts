import { logger } from '@/lib/logger';

let hasValidated = false;

const CRITICAL_VARS_PROD = [
  'ADMIN_USERNAME',
  'ADMIN_PASSWORD',
  'SESSION_SECRET',
  'NEXT_PUBLIC_APP_URL'
];

const IMPORTANT_VARS = [
  'RATE_LIMIT_MAX_REQUESTS',
  'RATE_LIMIT_WINDOW_MS'
];

export function ensureEnvValidated() {
  if (hasValidated) return;

  const env = process.env.NODE_ENV || 'development';
  const missingCritical = CRITICAL_VARS_PROD.filter((key) => !process.env[key]);
  const missingImportant = IMPORTANT_VARS.filter((key) => !process.env[key]);

  if (env === 'production') {
    if (missingCritical.length > 0) {
      const message = `Missing required environment variables: ${missingCritical.join(', ')}`;
      // Fail fast in production
      throw new Error(message);
    }
  } else {
    if (missingCritical.length > 0) {
      logger.warn('Missing critical env vars (development):', { missingCritical });
    }
  }

  if (missingImportant.length > 0) {
    logger.info('Optional env vars are missing; using defaults where applicable.', { missingImportant });
  }

  hasValidated = true;
}


