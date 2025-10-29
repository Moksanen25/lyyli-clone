/**
 * Shared API types and interfaces
 * Consolidates common types used across API routes
 */

/**
 * Base API response structure
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * API error response
 */
export interface ApiError {
  success: false;
  error: string;
  details?: Record<string, string>;
  statusCode?: number;
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page: number;
  limit: number;
  offset?: number;
}

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
  success: true;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

/**
 * Form submission base interface
 */
export interface BaseFormSubmission {
  id: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  csrfToken: string;
  source: string;
  gdprConsent: boolean;
  securityConsent: boolean;
}

/**
 * Contact form submission
 */
export interface ContactSubmission extends BaseFormSubmission {
  name: string;
  email: string;
  company: string;
  role: string;
  organizationSize: string;
  message?: string;
}

/**
 * Waitlist form submission
 */
export interface WaitlistSubmission extends BaseFormSubmission {
  email: string;
  company: string;
  role: string;
  phone?: string;
  countryCode: string;
  organizationSize: string;
}

/**
 * Rate limit information
 */
export interface RateLimitInfo {
  isAllowed: boolean;
  remaining: number;
  resetTime: number;
  totalRequests: number;
}

/**
 * Validation error details
 */
export interface ValidationErrors {
  [field: string]: string;
}

/**
 * File upload response
 */
export interface FileUploadResponse {
  success: boolean;
  fileId: string;
  url: string;
  filename: string;
  mimeType: string;
  size: number;
}

