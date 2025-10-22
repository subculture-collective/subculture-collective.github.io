/**
 * SkipToContent Component
 *
 * Accessibility component that provides a skip link for keyboard users
 * to bypass navigation and jump directly to main content
 */

import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * SkipToContent accessibility link
 *
 * This component renders a visually hidden link that becomes visible
 * when focused (e.g., via keyboard navigation). It allows users to
 * skip repetitive navigation and jump directly to the main content.
 *
 * Usage:
 * ```tsx
 * <SkipToContent />
 * <nav>...</nav>
 * <main id="main-content">...</main>
 * ```
 */
export default function SkipToContent() {
  const prefersReducedMotion = useReducedMotion()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const mainContent = document.getElementById('main-content')
    if (mainContent) {
      mainContent.focus()
      mainContent.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      })
    }
  }

  return (
    <a
      href="#main-content"
      onClick={handleClick}
      className="
        sr-only focus:not-sr-only
        focus:absolute focus:top-4 focus:left-4 focus:z-50
        bg-neon-cyan text-cyber-black
        px-4 py-2 rounded
        font-display font-bold
        focus:outline-none focus:ring-2 focus:ring-electric-blue
        transition-all duration-200
      "
    >
      Skip to main content
    </a>
  )
}

SkipToContent.displayName = 'SkipToContent'
