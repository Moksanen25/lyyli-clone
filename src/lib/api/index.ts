/**
 * API utilities - central export point
 * Import from '@/lib/api' for all API-related utilities
 */

export {
  withMiddleware,
  createSuccessResponse,
  createErrorResponse,
  DEFAULT_MIDDLEWARE_CONFIG,
  type ApiHandler,
  type MiddlewareConfig,
} from './middleware';

