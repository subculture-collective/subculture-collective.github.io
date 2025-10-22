/**
 * useReducedMotion Hook
 *
 * Detects if the user has requested reduced motion via their OS/browser settings
 * and provides a way to respect those preferences in animations.
 *
 * @returns boolean - true if user prefers reduced motion
 */

import { useEffect, useState } from 'react'

export function useReducedMotion(): boolean {
  // Initialize with the current preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return false
    }

    // Check the media query
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    return mediaQuery.matches
  })

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    // Update state when the preference changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange)

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return prefersReducedMotion
}

/**
 * Returns animation variants that respect reduced motion preferences
 *
 * @param variants - The full animation variants to use
 * @param reducedVariants - Optional reduced animation variants (defaults to no animation)
 * @returns The appropriate variants based on user preferences
 */
export function useAccessibleAnimation<T>(variants: T, reducedVariants?: Partial<T>): T {
  const prefersReducedMotion = useReducedMotion()

  if (!prefersReducedMotion) {
    return variants
  }

  // If reduced variants are provided, use them
  if (reducedVariants) {
    return { ...variants, ...reducedVariants } as T
  }

  // Otherwise, return a minimal animation (instant)
  return {
    initial: {},
    animate: {},
    exit: {},
  } as T
}
