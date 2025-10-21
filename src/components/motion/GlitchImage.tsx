/**
 * GlitchImage Component
 * 
 * An image component with cyberpunk-style glitch effects using Framer Motion.
 * Supports distortion, RGB split, and other visual glitch effects.
 */

import { motion } from 'framer-motion'
import type { MotionStyle } from 'framer-motion'
import type { CSSProperties } from 'react'
import { useState } from 'react'
import { glitchEffects } from '../../utils/animations'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface GlitchImageProps {
  src: string
  alt: string
  className?: string
  style?: CSSProperties
  animate?: boolean
  triggerOnHover?: boolean
  intensity?: 'low' | 'medium' | 'high'
}

/**
 * GlitchImage Component
 * 
 * Usage:
 * ```tsx
 * <GlitchImage 
 *   src="/path/to/image.jpg" 
 *   alt="Description"
 *   intensity="high"
 * />
 * 
 * <GlitchImage 
 *   src="/path/to/image.jpg" 
 *   alt="Description"
 *   triggerOnHover
 * />
 * ```
 */
export default function GlitchImage({
  src,
  alt,
  className = '',
  style = {},
  animate = true,
  triggerOnHover = false,
  intensity = 'medium',
}: GlitchImageProps) {
  const prefersReducedMotion = useReducedMotion()
  const [isHovered, setIsHovered] = useState(false)
  
  // Disable animation if user prefers reduced motion
  const shouldAnimate = animate && !prefersReducedMotion
  
  // Get intensity multipliers
  const getIntensityMultiplier = () => {
    switch (intensity) {
      case 'low':
        return 0.5
      case 'high':
        return 1.5
      case 'medium':
      default:
        return 1
    }
  }
  
  const multiplier = getIntensityMultiplier()
  
  // Create custom variants based on intensity
  const createGlitchVariants = () => {
    if (!shouldAnimate) {
      return { initial: {}, glitch: {} }
    }
    
    const baseScale = 1.02 * multiplier
    
    return {
      initial: {
        scale: 1,
        filter: 'hue-rotate(0deg) saturate(1)',
      },
      glitch: {
        scale: [1, 1 + baseScale * 0.02, 1 - baseScale * 0.02, 1 + baseScale * 0.01, 1],
        filter: [
          'hue-rotate(0deg) saturate(1)',
          `hue-rotate(${90 * multiplier}deg) saturate(${1.5 * multiplier})`,
          `hue-rotate(${-90 * multiplier}deg) saturate(${1.5 * multiplier})`,
          'hue-rotate(0deg) saturate(1)',
        ],
        transition: {
          duration: 0.4 / multiplier,
          repeat: Infinity,
          repeatDelay: 4 / multiplier,
        },
      },
    }
  }
  
  const variants = createGlitchVariants()
  
  // Determine animation state
  const animationState = 
    triggerOnHover 
      ? (isHovered && shouldAnimate ? 'glitch' : 'initial')
      : (shouldAnimate ? 'glitch' : 'initial')
  
  // Create container style with RGB split effect
  const containerStyle: MotionStyle = {
    position: 'relative',
    display: 'inline-block',
    overflow: 'hidden',
  }
  
  return (
    <motion.div
      className={className}
      style={{ ...containerStyle, ...style }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.img
        src={src}
        alt={alt}
        variants={variants}
        initial="initial"
        animate={animationState}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      
      {/* RGB Split Overlay Effect - only visible during glitch */}
      {shouldAnimate && (triggerOnHover ? isHovered : true) && (
        <>
          <motion.img
            src={src}
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.5,
              mixBlendMode: 'screen',
              pointerEvents: 'none',
            }}
            animate={{
              x: [0, -2 * multiplier, 2 * multiplier, -1 * multiplier, 0],
              filter: [
                'hue-rotate(0deg)',
                'hue-rotate(180deg)',
                'hue-rotate(-180deg)',
                'hue-rotate(0deg)',
              ],
            }}
            transition={{
              duration: 0.3 / multiplier,
              repeat: Infinity,
              repeatDelay: 4 / multiplier,
            }}
          />
          <motion.img
            src={src}
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.5,
              mixBlendMode: 'screen',
              pointerEvents: 'none',
            }}
            animate={{
              x: [0, 2 * multiplier, -2 * multiplier, 1 * multiplier, 0],
              filter: [
                'hue-rotate(0deg)',
                'hue-rotate(-90deg)',
                'hue-rotate(90deg)',
                'hue-rotate(0deg)',
              ],
            }}
            transition={{
              duration: 0.3 / multiplier,
              repeat: Infinity,
              repeatDelay: 4 / multiplier,
            }}
          />
        </>
      )}
    </motion.div>
  )
}

/**
 * GlitchImageSimple - A simpler version without RGB split overlay
 */
export function GlitchImageSimple(props: Omit<GlitchImageProps, 'intensity'>) {
  const prefersReducedMotion = useReducedMotion()
  const shouldAnimate = props.animate !== false && !prefersReducedMotion
  
  const variants = shouldAnimate ? glitchEffects.imageDistortion : { initial: {}, glitch: {} }
  const animationState = props.triggerOnHover ? undefined : shouldAnimate ? 'glitch' : 'initial'
  
  return (
    <motion.img
      src={props.src}
      alt={props.alt}
      className={props.className}
      style={props.style}
      variants={variants}
      initial="initial"
      animate={animationState}
      whileHover={props.triggerOnHover && shouldAnimate ? 'glitch' : undefined}
    />
  )
}
