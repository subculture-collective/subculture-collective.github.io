/**
 * PageTransition Component
 * 
 * A wrapper component that adds page transition animations using Framer Motion.
 * Wraps around page content to provide smooth transitions between routes.
 */

import { motion, AnimatePresence } from 'framer-motion'
import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { pageTransitions } from '../../utils/animations'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export type TransitionType = 'fade' | 'slideRight' | 'slideLeft' | 'slideUp' | 'glitch'

interface PageTransitionProps {
  children: ReactNode
  type?: TransitionType
  className?: string
}

/**
 * PageTransition wrapper component
 * 
 * Usage:
 * ```tsx
 * <PageTransition type="fade">
 *   <YourPageContent />
 * </PageTransition>
 * ```
 */
export default function PageTransition({ 
  children, 
  type = 'fade',
  className = '',
}: PageTransitionProps) {
  const location = useLocation()
  const prefersReducedMotion = useReducedMotion()
  
  // Get the appropriate transition variant
  const variants = pageTransitions[type]
  
  // If user prefers reduced motion, use no animation
  const finalVariants = prefersReducedMotion
    ? { initial: {}, animate: {}, exit: {} }
    : variants

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={finalVariants}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

/**
 * PageTransitionWrapper - A higher-order component version
 * 
 * Usage:
 * ```tsx
 * const TransitionedHome = PageTransitionWrapper(Home, 'glitch')
 * ```
 */
export function PageTransitionWrapper<P extends object>(
  Component: React.ComponentType<P>,
  type: TransitionType = 'fade'
) {
  return function WrappedComponent(props: P) {
    return (
      <PageTransition type={type}>
        <Component {...props} />
      </PageTransition>
    )
  }
}
