/**
 * MobileMenu Component
 *
 * Mobile navigation menu with slide-out overlay and hamburger button
 */

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import NavLink from './NavLink'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/creators', label: 'Creators' },
  { to: '/projects', label: 'Projects' },
  { to: '/journal', label: 'Journal' },
  { to: '/join', label: 'Join Us' },
]

/**
 * MobileMenu Component
 *
 * Usage:
 * ```tsx
 * <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
 * ```
 */
export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const prefersReducedMotion = useReducedMotion()

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const overlayVariants = {
    closed: { opacity: 0 },
    open: {
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.3,
      },
    },
  }

  const menuVariants: Variants = {
    closed: {
      x: '100%',
      transition: {
        type: 'tween' as const,
        duration: prefersReducedMotion ? 0 : 0.3,
        ease: 'easeInOut' as const,
      },
    },
    open: {
      x: 0,
      transition: {
        type: 'tween' as const,
        duration: prefersReducedMotion ? 0 : 0.3,
        ease: 'easeInOut' as const,
      },
    },
  }

  const linkVariants = {
    closed: { opacity: 0, x: 20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: prefersReducedMotion ? 0 : i * 0.05,
        duration: prefersReducedMotion ? 0 : 0.3,
      },
    }),
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            className="fixed inset-0 bg-cyber-black/80 backdrop-blur-sm z-40 lg:hidden"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Menu panel */}
          <motion.nav
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-deep-gray border-l border-light-gray z-50 lg:hidden shadow-neon"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            aria-label="Mobile navigation"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex flex-col h-full">
              {/* Header with close button */}
              <div className="flex items-center justify-between p-6 border-b border-light-gray">
                <h2 className="font-display text-neon-cyan text-xl tracking-wider">
                  MENU
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-neon-cyan transition-colors duration-200"
                  aria-label="Close menu"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Navigation links */}
              <div className="flex-1 overflow-y-auto p-6">
                <ul className="space-y-4">
                  {navLinks.map((link, i) => (
                    <motion.li
                      key={link.to}
                      custom={i}
                      variants={linkVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                    >
                      <NavLink
                        to={link.to}
                        onClick={onClose}
                        className="block py-3 text-2xl"
                      >
                        {link.label}
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-light-gray">
                <p className="font-mono text-xs text-gray-500">
                  © {new Date().getFullYear()} SUBCULT.TV
                </p>
              </div>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}

MobileMenu.displayName = 'MobileMenu'
