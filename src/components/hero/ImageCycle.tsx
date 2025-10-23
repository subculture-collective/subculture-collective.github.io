/**
 * ImageCycle Component
 *
 * Handles cycling background images with glitch transition effects
 */

import { motion, AnimatePresence } from 'framer-motion'
import OptimizedImage from '@/components/ui/OptimizedImage'
import { useImageCycle } from '../../hooks/useImageCycle'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface ImageCycleProps {
  images: string[]
  interval?: number
  className?: string
  overlayClassName?: string
}

/**
 * ImageCycle Component
 *
 * Cycles through background images with glitch transitions
 *
 * @example
 * ```tsx
 * <ImageCycle
 *   images={['/hero-1.jpg', '/hero-2.jpg']}
 *   interval={6000}
 *   className="absolute inset-0"
 * />
 * ```
 */
export default function ImageCycle({
  images,
  interval = 6000,
  className = '',
  overlayClassName = '',
}: ImageCycleProps) {
  const { currentImage, currentIndex } = useImageCycle({
    images,
    interval,
    autoPlay: true,
    preload: true,
  })
  const prefersReducedMotion = useReducedMotion()

  // Glitch transition variants
  const glitchVariants = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: {
          opacity: 0,
          scale: 1.05,
          filter: 'blur(3px) hue-rotate(0deg)',
        },
        animate: {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px) hue-rotate(0deg)',
          transition: {
            duration: 0.5,
            ease: [0.43, 0.13, 0.23, 0.96] as const,
          },
        },
        exit: {
          opacity: 0,
          scale: 0.95,
          filter: 'blur(3px) hue-rotate(90deg)',
          transition: {
            duration: 0.3,
            ease: [0.43, 0.13, 0.23, 0.96] as const,
          },
        },
      }

  // Fallback gradient if no images
  if (images.length === 0) {
    return (
      <div
        className={`bg-gradient-to-br from-cyber-black via-deep-gray to-cyber-black ${className}`}
      />
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0"
          variants={glitchVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Background Image */}
          <OptimizedImage
            src={currentImage}
            alt={`Hero background ${currentIndex + 1}`}
            className="absolute inset-0"
            objectFit="cover"
            priority={currentIndex === 0}
            loading={currentIndex === 0 ? 'eager' : 'lazy'}
            showPlaceholder
          />

          {/* Overlay for better text readability */}
          <div
            className={`absolute inset-0 bg-gradient-to-b from-cyber-black/60 via-cyber-black/40 to-cyber-black/80 ${overlayClassName}`}
          />
        </motion.div>
      </AnimatePresence>

      {/* Glitch effect overlay - subtle scanlines */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/10 to-transparent animate-scan" />
        </div>
      )}
    </div>
  )
}

ImageCycle.displayName = 'ImageCycle'
