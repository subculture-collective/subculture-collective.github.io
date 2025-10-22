/**
 * Navbar Component
 *
 * Main navigation bar with responsive design, sticky positioning,
 * and cyberpunk aesthetic with glitch effects
 */

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import GlitchText from '../motion/GlitchText'
import NavLink from './NavLink'
import MobileMenu from './MobileMenu'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/creators', label: 'Creators' },
  { to: '/projects', label: 'Projects' },
  { to: '/journal', label: 'Journal' },
  { to: '/join', label: 'Join Us' },
]

interface NavbarProps {
  sticky?: boolean
  hideOnScroll?: boolean
}

/**
 * Navbar Component
 *
 * Usage:
 * ```tsx
 * <Navbar sticky hideOnScroll />
 * ```
 */
export default function Navbar({
  sticky = true,
  hideOnScroll = false,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  // Handle scroll behavior
  useEffect(() => {
    if (!hideOnScroll) return

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 10) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hideOnScroll, lastScrollY])

  const navbarVariants: Variants = {
    visible: {
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.3,
        ease: 'easeInOut' as const,
      },
    },
    hidden: {
      y: -100,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.3,
        ease: 'easeInOut' as const,
      },
    },
  }

  return (
    <>
      <motion.header
        className={`
          w-full z-30 backdrop-blur-md bg-cyber-black/90 border-b border-light-gray
          ${sticky ? 'sticky top-0' : 'relative'}
        `}
        variants={navbarVariants}
        initial="visible"
        animate={isVisible ? 'visible' : 'hidden'}
      >
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between h-16">
            {/* Logo / Brand */}
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="flex items-center"
                aria-label="SUBCULT.TV Home"
              >
                <GlitchText
                  type="rgbSplit"
                  triggerOnHover
                  className="font-display text-neon-cyan text-xl tracking-wider"
                >
                  SUBCULT.TV
                </GlitchText>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              {navLinks.map(link => (
                <NavLink key={link.to} to={link.to}>
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-gray-400 hover:text-neon-cyan transition-colors duration-200"
                aria-label="Open menu"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  )
}

Navbar.displayName = 'Navbar'
