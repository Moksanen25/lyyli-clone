/**
 * Shared component prop types
 * Consolidates common prop interfaces used across components
 */

import type { TranslationKeys } from '@/lib/i18n';

/**
 * Base component props with locale support
 */
export interface BaseComponentProps {
  locale: string;
  translations: TranslationKeys;
  className?: string;
}

/**
 * Component with children
 */
export interface ComponentWithChildren {
  children: React.ReactNode;
}

/**
 * Button variant types
 */
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'ghost';

/**
 * Button size types
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Button component props
 */
export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  'aria-label'?: string;
}

/**
 * Modal component props
 */
export interface ModalProps extends ComponentWithChildren {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
}

/**
 * Card component props
 */
export interface CardProps extends ComponentWithChildren {
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
}

/**
 * Loading state
 */
export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
}

/**
 * Async data state
 */
export interface AsyncDataState<T> extends LoadingState {
  data: T | null;
}

/**
 * Form field state
 */
export interface FormFieldState<T = string> {
  value: T;
  error?: string;
  touched: boolean;
  isDirty: boolean;
}

/**
 * Icon component props
 */
export interface IconProps {
  size?: number;
  color?: string;
  className?: string;
  'aria-label'?: string;
  'aria-hidden'?: boolean;
}

