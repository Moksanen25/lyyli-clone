/**
 * API Middleware Factory
 * Composes common middleware functions for API routes
 */

import { NextRequest, NextResponse } from 'next/server';
import { createRateLimiterWithPreset, RATE_LIMIT_PRESETS } from '@/lib/rateLimiter';

type RateLimitPreset = keyof typeof RATE_LIMIT_PRESETS;
import { getClientIP } from '@/lib/security';
import { addSecurityHeaders, createSecurityConfig } from '@/middleware/security';
import { logger } from '@/lib/logger';
import type { ApiResponse, ApiError } from '@/types';

/**
 * Middleware configuration options
 */
export interface MiddlewareConfig {
  rateLimit?: {
    preset: RateLimitPreset;
    enabled: boolean;
  };
  authentication?: {
    required: boolean;
  };
  validation?: {
    schema?: unknown;
  };
  logging?: {
    enabled: boolean;
  };
}

/**
 * Default middleware configuration
 */
export const DEFAULT_MIDDLEWARE_CONFIG: MiddlewareConfig = {
  rateLimit: {
    preset: 'MODERATE',
    enabled: true,
  },
  authentication: {
    required: false,
  },
  logging: {
    enabled: true,
  },
};

/**
 * API handler function type
 */
export type ApiHandler<T = unknown> = (
  request: NextRequest,
  context?: unknown
) => Promise<ApiResponse<T> | ApiError>;

/**
 * Creates a rate limiter check middleware
 */
function createRateLimitMiddleware(config: MiddlewareConfig) {
  if (!config.rateLimit?.enabled) {
    return async () => null;
  }

  const rateLimiter = createRateLimiterWithPreset(
    config.rateLimit.preset,
    {
      onLimitReached: (identifier, limitConfig) => {
        logger.warn('Rate limit reached', {
          identifier,
          maxRequests: limitConfig.maxRequests,
          windowMs: limitConfig.windowMs,
        });
      },
    }
  );

  return async (request: NextRequest): Promise<NextResponse | null> => {
    const clientIP = getClientIP(request);
    const rateLimit = await rateLimiter.checkLimit(clientIP);

    if (!rateLimit.isAllowed) {
      logger.warn('Rate limit exceeded', {
        ip: clientIP,
        endpoint: request.url,
        totalRequests: rateLimit.totalRequests,
      });

      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests. Please try again later.',
          details: {
            resetTime: new Date(rateLimit.resetTime).toISOString(),
            remaining: rateLimit.remaining.toString(),
          },
        } as ApiError,
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': rateLimit.resetTime.toString(),
            'Retry-After': Math.ceil((rateLimit.resetTime - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    return null;
  };
}

/**
 * Creates a logging middleware
 */
function createLoggingMiddleware(config: MiddlewareConfig) {
  if (!config.logging?.enabled) {
    return () => {};
  }

  return (request: NextRequest, response?: NextResponse) => {
    const clientIP = getClientIP(request);
    
    if (response) {
      logger.logApiEvent(
        request.nextUrl.pathname,
        request.method,
        response.status,
        {
          ip: clientIP,
          userAgent: request.headers.get('user-agent') || undefined,
        }
      );
    } else {
      logger.info('API request received', {
        endpoint: request.nextUrl.pathname,
        method: request.method,
        ip: clientIP,
      });
    }
  };
}

/**
 * Wraps an API handler with middleware
 */
export function withMiddleware<T = unknown>(
  handler: ApiHandler<T>,
  config: MiddlewareConfig = DEFAULT_MIDDLEWARE_CONFIG
) {
  const rateLimitMiddleware = createRateLimitMiddleware(config);
  const loggingMiddleware = createLoggingMiddleware(config);
  const securityConfig = createSecurityConfig(
    process.env.NODE_ENV as 'development' | 'staging' | 'production'
  );

  return async (request: NextRequest, context?: unknown): Promise<NextResponse> => {
    try {
      // Log incoming request
      loggingMiddleware(request);

      // Check rate limit
      const rateLimitResponse = await rateLimitMiddleware(request);
      if (rateLimitResponse) {
        return addSecurityHeaders(rateLimitResponse, securityConfig);
      }

      // Execute handler
      const result = await handler(request, context);

      // Create response
      const response = NextResponse.json(result, {
        status: result.success ? 200 : (result as ApiError).statusCode || 400,
      });

      // Log response
      loggingMiddleware(request, response);

      // Add security headers
      return addSecurityHeaders(response, securityConfig);
    } catch (error) {
      logger.error('API handler error', {
        endpoint: request.nextUrl.pathname,
        method: request.method,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });

      const errorResponse: ApiError = {
        success: false,
        error: 'Internal server error',
        statusCode: 500,
      };

      const response = NextResponse.json(errorResponse, { status: 500 });
      return addSecurityHeaders(response, securityConfig);
    }
  };
}

/**
 * Helper to create a successful API response
 */
export function createSuccessResponse<T>(data: T, message?: string): ApiResponse<T> {
  return {
    success: true,
    data,
    message,
  };
}

/**
 * Helper to create an error API response
 */
export function createErrorResponse(
  error: string,
  statusCode: number = 400,
  details?: Record<string, string>
): ApiError {
  return {
    success: false,
    error,
    statusCode,
    details,
  };
}

