/**
 * Central export point for all shared types
 * Import from '@/types' instead of individual files
 */

// API types
export type {
  ApiResponse,
  ApiError,
  PaginationParams,
  PaginatedResponse,
  BaseFormSubmission,
  ContactSubmission,
  WaitlistSubmission,
  RateLimitInfo,
  ValidationErrors,
  FileUploadResponse,
} from './api';

// Component types
export type {
  BaseComponentProps,
  ComponentWithChildren,
  ButtonVariant,
  ButtonSize,
  ButtonProps,
  ModalProps,
  CardProps,
  LoadingState,
  AsyncDataState,
  FormFieldState,
  IconProps,
} from './components';

// Re-export commonly used Next.js types for convenience
export type { Metadata } from 'next';

