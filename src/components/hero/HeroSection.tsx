/**
 * HeroSection Component
 *
 * Fullscreen hero section with cycling background images,
 * glitch text effects, and smooth scroll CTA
 */

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import GlitchText from '../motion/GlitchText'
import ImageCycle from './ImageCycle'
import { entranceAnimations, microInteractions } from '../../utils/animations'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface HeroSectionProps {
  images?: string[]
  interval?: number
  onCtaClick?: () => void
  ctaText?: string
  ctaLink?: string
  tagline?: string
  subtext?: string
}

/**
 * HeroSection Component
 *
 * Full viewport hero section with:
 * - Cycling background images with glitch transitions
 * - Animated tagline and subtext
 * - CTA button with smooth scroll or navigation
 *
 * @example
 * ```tsx
 * <HeroSection
 *   images={heroImages}
 *   interval={6000}
 *   ctaLink="#about"
 *   tagline="The underground doesn't die — it mutates."
 *   subtext="Subcult is a cooperative for creators and radicals."
 * />
 * ```
 */
export default function HeroSection({
  images = [],
  interval = 6000,
  onCtaClick,
  ctaText = 'Enter',
  ctaLink = '/about',
  tagline = "The underground doesn't die — it mutates.",
  subtext = 'Subcult is a cooperative for creators and radicals.',
}: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion()

  // Handle CTA click with smooth scroll if it's a hash link
  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onCtaClick) {
      e.preventDefault()
      onCtaClick()
      return
    }

    if (ctaLink.startsWith('#')) {
      e.preventDefault()
      const target = document.querySelector(ctaLink)
      if (target) {
        target.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          block: 'start',
        })
      }
    }
  }

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Background Image Cycle */}
      <ImageCycle
        images={images}
        interval={interval}
        className="absolute inset-0"
      />

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Tagline with Glitch Effect */}
          <motion.div
            variants={entranceAnimations.fadeInDown}
            initial="initial"
            animate="animate"
            className="mb-6"
          >
            <GlitchText
              type="both"
              as="h1"
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
              animate={!prefersReducedMotion}
            >
              {tagline}
            </GlitchText>
          </motion.div>

          {/* Subtext */}
          <motion.p
            variants={entranceAnimations.fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
            className="font-sans text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            {subtext}
          </motion.p>

          {/* CTA Button */}
          <motion.div
            variants={entranceAnimations.scaleIn}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.4 }}
          >
            <Link to={ctaLink} onClick={handleCtaClick}>
              <motion.button
                variants={microInteractions.button}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="btn-neon text-xl px-12 py-4 font-display uppercase tracking-wider"
              >
                {ctaText}
              </motion.button>
            </Link>
          </motion.div>

          {/* Scroll Indicator */}
          {ctaLink.startsWith('#') && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1,
                duration: 0.5,
                repeat: Infinity,
                repeatType: 'reverse',
                repeatDelay: 1,
              }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <div className="flex flex-col items-center text-neon-cyan">
                <span className="font-mono text-xs mb-2">Scroll Down</span>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Vignette effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-transparent via-transparent to-cyber-black/60" />
    </section>
  )
}

HeroSection.displayName = 'HeroSection'
