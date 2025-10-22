/**
 * Footer Component
 *
 * Site footer with navigation links, social media, and cyberpunk aesthetic
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import GlitchText from '../motion/GlitchText'

const footerLinks = {
  navigate: [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/creators', label: 'Creators' },
    { to: '/projects', label: 'Projects' },
    { to: '/journal', label: 'Journal' },
    { to: '/join', label: 'Join Us' },
  ],
  social: [
    { href: '#', label: 'Twitter', ariaLabel: 'Follow us on Twitter' },
    { href: '#', label: 'Instagram', ariaLabel: 'Follow us on Instagram' },
    { href: '#', label: 'Discord', ariaLabel: 'Join our Discord' },
    { href: '#', label: 'GitHub', ariaLabel: 'View our GitHub' },
  ],
}

/**
 * Footer Component
 *
 * Usage:
 * ```tsx
 * <Footer />
 * ```
 */
export default function Footer() {
  const prefersReducedMotion = useReducedMotion()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-cyber-black border-t border-light-gray mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" aria-label="SUBCULT.TV Home">
              <GlitchText
                type="rgbSplit"
                triggerOnHover
                className="font-display text-neon-cyan text-2xl tracking-wider inline-block"
              >
                SUBCULT.TV
              </GlitchText>
            </Link>
            <p className="text-gray-400 text-sm max-w-xs">
              A collective of digital creators pushing the boundaries of
              cyberpunk culture.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-display text-electric-blue mb-4">Navigate</h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                {footerLinks.navigate.map(link => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-gray-400 hover:text-neon-cyan transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-display text-electric-blue mb-4">Connect</h3>
            <nav aria-label="Social media links">
              <ul className="space-y-2">
                {footerLinks.social.map(link => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      className="text-gray-400 hover:text-neon-cyan transition-colors duration-200 text-sm inline-block"
                      aria-label={link.ariaLabel}
                      whileHover={
                        prefersReducedMotion
                          ? {}
                          : { x: 5, transition: { duration: 0.2 } }
                      }
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-light-gray">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm font-mono">
              © {currentYear} SUBCULT.TV. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                to="#"
                className="text-gray-500 hover:text-neon-cyan transition-colors duration-200 text-sm"
              >
                Privacy
              </Link>
              <Link
                to="#"
                className="text-gray-500 hover:text-neon-cyan transition-colors duration-200 text-sm"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

Footer.displayName = 'Footer'
