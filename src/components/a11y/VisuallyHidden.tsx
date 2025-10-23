/**
 * VisuallyHidden Component
 *
 * Hides content visually while keeping it accessible to screen readers.
 * Useful for providing additional context to assistive technologies
 * without cluttering the visual design.
 */

import type { ReactNode, ElementType } from 'react'

interface VisuallyHiddenProps {
  children: ReactNode
  as?: ElementType
  className?: string
}

/**
 * VisuallyHidden Component
 *
 * Renders content that is visually hidden but accessible to screen readers.
 * Uses CSS to hide content while maintaining accessibility.
 *
 * Usage:
 * ```tsx
 * <button>
 *   <Icon />
 *   <VisuallyHidden>Close menu</VisuallyHidden>
 * </button>
 * ```
 *
 * @param children - Content to be visually hidden
 * @param as - HTML element type to render (default: 'span')
 * @param className - Additional CSS classes
 */
export default function VisuallyHidden({
  children,
  as: Component = 'span',
  className = '',
}: VisuallyHiddenProps) {
  return (
    <Component
      className={`
        absolute w-px h-px p-0 -m-px overflow-hidden
        whitespace-nowrap border-0
        ${className}
      `}
      style={{
        clip: 'rect(0, 0, 0, 0)',
        clipPath: 'inset(50%)',
      }}
    >
      {children}
    </Component>
  )
}

VisuallyHidden.displayName = 'VisuallyHidden'
