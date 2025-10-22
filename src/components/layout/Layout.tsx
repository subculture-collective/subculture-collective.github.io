/**
 * Layout Component
 *
 * Master layout component that wraps all pages with Navbar, Footer,
 * and page transitions with scroll restoration
 */

import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { pageTransitions } from '../../utils/animations'
import type { TransitionType } from '../motion/PageTransition'
import Navbar from './Navbar'
import Footer from './Footer'
import PageWrapper from './PageWrapper'
import SkipToContent from './SkipToContent'

/**
 * Scroll restoration component
 * Scrolls to top when route changes
 */
function ScrollToTop() {
  const { pathname } = useLocation()
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }, [pathname, prefersReducedMotion])

  return null
}

ScrollToTop.displayName = 'ScrollToTop'

export type LayoutVariant = 'default' | 'minimal' | 'fullscreen'

interface LayoutProps {
  children: ReactNode
  variant?: LayoutVariant
  transitionType?: TransitionType
  pageWrapperClassName?: string
  fullWidthContent?: boolean
}

/**
 * Layout Component
 *
 * Provides the main application layout with:
 * - Skip to content link (accessibility)
 * - Navbar (can be hidden with variant)
 * - Page transitions (Framer Motion)
 * - Main content area
 * - Footer (can be hidden with variant)
 * - Scroll restoration
 *
 * Layout Variants:
 * - `default`: Full layout with navbar and footer
 * - `minimal`: Footer only, no navbar
 * - `fullscreen`: No navbar or footer (for hero sections)
 *
 * Usage:
 * ```tsx
 * <Layout variant="default" transitionType="glitch">
 *   <YourPageContent />
 * </Layout>
 * ```
 */
export default function Layout({
  children,
  variant = 'default',
  transitionType = 'glitch',
  pageWrapperClassName = '',
  fullWidthContent = false,
}: LayoutProps) {
  const location = useLocation()
  const prefersReducedMotion = useReducedMotion()

  // Get the appropriate transition variant
  const variants = pageTransitions[transitionType]

  // If user prefers reduced motion, use no animation
  const finalVariants = prefersReducedMotion
    ? { initial: {}, animate: {}, exit: {} }
    : variants

  const showNavbar = variant === 'default'
  const showFooter = variant === 'default' || variant === 'minimal'

  return (
    <div className="flex flex-col min-h-screen bg-cyber-black text-gray-100">
      <SkipToContent />
      <ScrollToTop />

      {showNavbar && <Navbar sticky />}

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={finalVariants}
          className="flex-1 flex flex-col"
        >
          <PageWrapper
            className={pageWrapperClassName}
            fullWidth={fullWidthContent}
          >
            {children}
          </PageWrapper>
        </motion.div>
      </AnimatePresence>

      {showFooter && <Footer />}
    </div>
  )
}

Layout.displayName = 'Layout'
