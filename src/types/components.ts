/**
 * Component Prop Type Definitions
 * 
 * Shared prop types for React components throughout the application.
 */

import type { ReactNode, CSSProperties, ComponentPropsWithoutRef } from 'react'

/**
 * Base props that most components should support
 */
export interface BaseComponentProps {
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

/**
 * Props with testId for testing purposes
 */
export interface TestableProps {
  testId?: string
  'data-testid'?: string
}

/**
 * Combined base props with testability
 */
export interface ComponentProps extends BaseComponentProps, TestableProps {}

/**
 * Props for components that can be disabled
 */
export interface DisableableProps {
  disabled?: boolean
}

/**
 * Props for components with loading state
 */
export interface LoadableProps {
  loading?: boolean
  loadingText?: string
}

/**
 * Button component props
 */
export interface ButtonProps extends ComponentPropsWithoutRef<'button'>, LoadableProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'neon'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

/**
 * Link component props
 */
export interface LinkProps extends BaseComponentProps {
  href: string
  external?: boolean
  variant?: 'default' | 'neon' | 'ghost'
}

/**
 * Image component props with lazy loading support
 */
export interface ImageProps extends ComponentPropsWithoutRef<'img'> {
  src: string
  alt: string
  lazy?: boolean
  aspectRatio?: number
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
}

/**
 * Card component props
 */
export interface CardProps extends ComponentProps {
  variant?: 'default' | 'cyber' | 'glass'
  interactive?: boolean
  as?: 'div' | 'article' | 'section'
}

/**
 * Layout component props
 */
export interface LayoutProps extends ComponentProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  centered?: boolean
  padding?: boolean
}

/**
 * Props for components with form-like behavior
 */
export interface FormFieldProps {
  name: string
  value?: string
  onChange?: (value: string) => void
  error?: string
  required?: boolean
  placeholder?: string
}

/**
 * Props for modal/dialog components
 */
export interface ModalProps extends ComponentProps {
  open: boolean
  onClose: () => void
  title?: string
  closeOnBackdrop?: boolean
  closeOnEscape?: boolean
}

/**
 * Props for list components
 */
export interface ListProps<T> extends ComponentProps {
  items: readonly T[]
  renderItem: (item: T, index: number) => ReactNode
  emptyState?: ReactNode
  keyExtractor?: (item: T, index: number) => string
}

/**
 * Props for grid components
 */
export interface GridProps extends ComponentProps {
  columns?: 1 | 2 | 3 | 4 | 6
  gap?: 'sm' | 'md' | 'lg'
  responsive?: boolean
}
