/**
 * Shared validation middleware for API routes
 * Provides consistent input validation and error handling
 */

import { NextRequest, NextResponse } from 'next/server';
import { VALIDATION_PATTERNS, sanitizeInput } from '@/lib/security';
import { logger } from '@/lib/logger';
import { ERROR_MESSAGES, FORM_CONFIG } from '@/lib/constants';

export interface ValidationResult<T> {
  isValid: boolean;
  data?: T;
  errors: Record<string, string>;
}

export interface ValidationRule {
  field: string;
  required?: boolean;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  custom?: (value: any) => boolean | string;
  sanitize?: boolean;
}

export interface ValidationConfig {
  rules: ValidationRule[];
  allowUnknownFields?: boolean;
  strictMode?: boolean;
}

/**
 * Validate request body against validation rules
 */
export async function validateRequestBody<T>(
  request: NextRequest,
  config: ValidationConfig
): Promise<ValidationResult<T>> {
  const errors: Record<string, string> = {};
  const data: Record<string, any> = {};

  try {
    // Parse request body safely (handles empty or invalid JSON)
    let body: Record<string, any> = {};
    try {
      body = await request.json();
    } catch {
      body = {};
    }
    
    // Validate each field according to rules
    for (const rule of config.rules) {
      const value: any = body[rule.field];
      
      // Check if required
      if (rule.required && (value === undefined || value === null || value === '')) {
        errors[rule.field] = `${rule.field} is required`;
        continue;
      }

      // Skip validation if field is not present and not required
      if (value === undefined || value === null) {
        continue;
      }

      // Sanitize if requested
      let processedValue: any = value;
      if (rule.sanitize && typeof value === 'string') {
        processedValue = sanitizeInput(value);
      }

      // Check minimum length
      if (rule.minLength !== undefined && typeof processedValue === 'string') {
        if (processedValue.length < rule.minLength) {
          errors[rule.field] = `${rule.field} must be at least ${rule.minLength} characters long`;
          continue;
        }
      }

      // Check maximum length
      if (rule.maxLength !== undefined && typeof processedValue === 'string') {
        if (processedValue.length > rule.maxLength) {
          errors[rule.field] = `${rule.field} must be no more than ${rule.maxLength} characters long`;
          continue;
        }
      }

      // Check pattern
      if (rule.pattern && typeof processedValue === 'string') {
        if (!rule.pattern.test(processedValue)) {
          errors[rule.field] = `${rule.field} format is invalid`;
          continue;
        }
      }

      // Custom validation
      if (rule.custom) {
        const customResult = rule.custom(processedValue);
        if (customResult !== true) {
          errors[rule.field] = typeof customResult === 'string' ? customResult : `${rule.field} validation failed`;
          continue;
        }
      }

      // Add valid field to data
      data[rule.field] = processedValue;
    }

    // Check for unknown fields in strict mode
    if (config.strictMode && !config.allowUnknownFields) {
      const knownFields = new Set(config.rules.map(rule => rule.field));
      for (const field in body) {
        if (!knownFields.has(field)) {
          errors[field] = `Unknown field: ${field}`;
        }
      }
    }

    // Log validation results
    if (Object.keys(errors).length > 0) {
      logger.warn('Request validation failed', {
        endpoint: request.url,
        method: request.method,
        errors,
        userAgent: request.headers.get('user-agent'),
      });
    } else {
      logger.info('Request validation successful', {
        endpoint: request.url,
        method: request.method,
        fields: Object.keys(data),
      });
    }

    return {
      isValid: Object.keys(errors).length === 0,
      data: Object.keys(errors).length === 0 ? (data as T) : undefined,
      errors,
    };

  } catch (error) {
    logger.error('Validation error', {
      endpoint: request.url,
      method: request.method,
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    return {
      isValid: false,
      errors: {
        general: ERROR_MESSAGES.VALIDATION,
      },
    };
  }
}

/**
 * Predefined validation configs for common use cases
 */
export const VALIDATION_CONFIGS = {
  // Contact form validation
  CONTACT_FORM: {
    rules: [
      { field: 'name', required: true, minLength: FORM_CONFIG.MIN_LENGTH.NAME, maxLength: FORM_CONFIG.MAX_LENGTH.NAME, pattern: VALIDATION_PATTERNS.NAME, sanitize: true },
      { field: 'email', required: true, pattern: VALIDATION_PATTERNS.EMAIL, sanitize: true },
      { field: 'company', required: true, minLength: FORM_CONFIG.MIN_LENGTH.COMPANY, maxLength: FORM_CONFIG.MAX_LENGTH.COMPANY, pattern: VALIDATION_PATTERNS.COMPANY, sanitize: true },
      { field: 'role', required: true, minLength: FORM_CONFIG.MIN_LENGTH.ROLE, maxLength: FORM_CONFIG.MAX_LENGTH.ROLE, pattern: VALIDATION_PATTERNS.ROLE, sanitize: true },
      { field: 'organizationSize', required: true },
      { field: 'message', required: false, maxLength: FORM_CONFIG.MAX_LENGTH.MESSAGE, sanitize: true },
      { field: 'source', required: true, sanitize: true },
      { field: 'gdprConsent', required: true, custom: (value: any) => value === true || 'GDPR consent is required' },
      { field: 'securityConsent', required: true, custom: (value: any) => value === true || 'Security consent is required' },
      { field: 'csrfToken', required: true, sanitize: true },
    ],
    allowUnknownFields: false,
    strictMode: true,
  },

  // Waitlist form validation
  WAITLIST_FORM: {
    rules: [
      { field: 'email', required: true, pattern: VALIDATION_PATTERNS.EMAIL, sanitize: true },
      { field: 'company', required: true, minLength: FORM_CONFIG.MIN_LENGTH.COMPANY, maxLength: FORM_CONFIG.MAX_LENGTH.COMPANY, pattern: VALIDATION_PATTERNS.COMPANY, sanitize: true },
      { field: 'role', required: true, minLength: FORM_CONFIG.MIN_LENGTH.ROLE, maxLength: FORM_CONFIG.MAX_LENGTH.ROLE, pattern: VALIDATION_PATTERNS.ROLE, sanitize: true },
      { field: 'phone', required: false, pattern: VALIDATION_PATTERNS.PHONE, sanitize: true },
      { field: 'countryCode', required: true },
      { field: 'organizationSize', required: true },
      { field: 'gdprConsent', required: true, custom: (value: any) => value === true || 'GDPR consent is required' },
      { field: 'securityConsent', required: true, custom: (value: any) => value === true || 'Security consent is required' },
      { field: 'csrfToken', required: true, sanitize: true },
    ],
    allowUnknownFields: false,
    strictMode: true,
  },

  // Admin authentication validation
  ADMIN_AUTH: {
    rules: [
      { field: 'username', required: true, minLength: 3, maxLength: 50, sanitize: true },
      { field: 'password', required: true, minLength: 8, sanitize: true },
    ],
    allowUnknownFields: false,
    strictMode: true,
  },
};

/**
 * Create a validation middleware function for a specific config
 */
export function createValidationMiddleware<T>(config: ValidationConfig) {
  return async (request: NextRequest): Promise<ValidationResult<T>> => {
    return validateRequestBody<T>(request, config);
  };
}

/**
 * Helper function to create validation error response
 */
export function createValidationErrorResponse(errors: Record<string, string>) {
  return NextResponse.json(
    {
      error: ERROR_MESSAGES.VALIDATION,
      details: errors,
    },
    { status: 400 }
  );
}

/**
 * Helper function to create rate limit error response
 */
export function createRateLimitErrorResponse(remaining: number, resetTime: number) {
  return NextResponse.json(
    {
      error: ERROR_MESSAGES.RATE_LIMIT,
      details: {
        remaining,
        resetTime: new Date(resetTime).toISOString(),
      },
    },
    { status: 429 }
  );
}
