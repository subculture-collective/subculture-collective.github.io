/**
 * GlitchText Component
 * 
 * A text component with cyberpunk-style glitch effects using Framer Motion.
 * Supports multiple glitch styles including position shift and RGB split.
 */

import { motion } from 'framer-motion'
import type { ReactNode, CSSProperties } from 'react'
import { glitchEffects } from '../../utils/animations'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export type GlitchType = 'textGlitch' | 'rgbSplit' | 'both' | 'none'

interface GlitchTextBaseProps {
  children: ReactNode
  type?: GlitchType
  className?: string
  style?: CSSProperties
  animate?: boolean
  triggerOnHover?: boolean
}

interface GlitchTextProps extends GlitchTextBaseProps {
  as?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
}

/**
 * GlitchText Component
 * 
 * Usage:
 * ```tsx
 * <GlitchText type="rgbSplit" as="h1" className="text-4xl">
 *   SUBCULT.TV
 * </GlitchText>
 * 
 * <GlitchText type="both" triggerOnHover>
 *   Hover me for glitch
 * </GlitchText>
 * ```
 */
export default function GlitchText({
  children,
  type = 'rgbSplit',
  className = '',
  style = {},
  as: Component = 'span',
  animate = true,
  triggerOnHover = false,
}: GlitchTextProps) {
  const prefersReducedMotion = useReducedMotion()
  
  // Disable animation if user prefers reduced motion
  const shouldAnimate = animate && !prefersReducedMotion
  
  // Determine which variant to use
  const getVariants = () => {
    if (!shouldAnimate) {
      return { initial: {}, glitch: {} }
    }
    
    switch (type) {
      case 'textGlitch':
        return glitchEffects.textGlitch
      case 'rgbSplit':
        return glitchEffects.rgbSplit
      case 'both':
        // Combine both effects
        return {
          initial: {
            x: 0,
            y: 0,
            textShadow: '0 0 0 rgba(0, 255, 255, 0), 0 0 0 rgba(255, 0, 255, 0)',
          },
          glitch: {
            x: [-2, 2, -2, 2, 0],
            y: [0, -1, 1, -1, 0],
            textShadow: [
              '2px 0 0 rgba(0, 255, 255, 0.7), -2px 0 0 rgba(255, 0, 255, 0.7)',
              '-2px 0 0 rgba(0, 255, 255, 0.7), 2px 0 0 rgba(255, 0, 255, 0.7)',
              '2px 0 0 rgba(0, 255, 255, 0.7), -2px 0 0 rgba(255, 0, 255, 0.7)',
              '0 0 0 rgba(0, 255, 255, 0), 0 0 0 rgba(255, 0, 255, 0)',
            ],
            transition: {
              duration: 0.3,
              repeat: Infinity,
              repeatDelay: 3,
            },
          },
        }
      case 'none':
      default:
        return { initial: {}, glitch: {} }
    }
  }
  
  const variants = getVariants()
  
  // Determine animation state
  const animationState = triggerOnHover ? undefined : shouldAnimate ? 'glitch' : 'initial'
  
  // Use proper motion component based on 'as' prop
  const MotionComponent = motion[Component]
  
  return (
    <MotionComponent
      className={className}
      style={{ display: 'inline-block', ...style }}
      variants={variants}
      initial="initial"
      animate={animationState}
      whileHover={triggerOnHover && shouldAnimate ? 'glitch' : undefined}
    >
      {children}
    </MotionComponent>
  )
}

/**
 * GlitchTextSpan - Convenience component for inline glitch text
 */
export function GlitchTextSpan(props: Omit<GlitchTextProps, 'as'>) {
  return <GlitchText {...props} as="span" />
}

/**
 * GlitchHeading - Convenience component for heading glitch text
 */
export function GlitchHeading({
  level = 1,
  ...props
}: Omit<GlitchTextProps, 'as'> & { level?: 1 | 2 | 3 | 4 | 5 | 6 }) {
  const headingTag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  return <GlitchText {...props} as={headingTag} />
}
