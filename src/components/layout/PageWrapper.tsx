/**
 * PageWrapper Component
 *
 * Wrapper component for page content with consistent styling and structure.
 * Provides the main content area with proper semantics and styling.
 */

import type { ReactNode } from 'react'

interface PageWrapperProps {
  children: ReactNode
  className?: string
  fullWidth?: boolean
}

/**
 * PageWrapper Component
 *
 * Wraps page content with consistent layout and structure.
 * The main element is styled to push the footer to the bottom of the page.
 *
 * Usage:
 * ```tsx
 * <PageWrapper>
 *   <YourPageContent />
 * </PageWrapper>
 * ```
 */
export default function PageWrapper({
  children,
  className = '',
  fullWidth = false,
}: PageWrapperProps) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={`
        flex-1 min-h-screen
        ${!fullWidth ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' : ''}
        ${className}
      `}
    >
      {children}
    </main>
  )
}

PageWrapper.displayName = 'PageWrapper'
