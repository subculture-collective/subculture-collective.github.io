/**
 * Animation Type Definitions
 * 
 * Type definitions for Framer Motion animation configurations,
 * variants, and animation-related props.
 */

import type { Variants, Transition, Target } from 'framer-motion'

/**
 * Standard transition types
 */
export type TransitionType = 'smooth' | 'spring' | 'snap' | 'dramatic' | 'glitch'

/**
 * Page transition variants
 */
export type PageTransitionType = 'fade' | 'slideRight' | 'slideLeft' | 'slideUp' | 'glitch'

/**
 * Glitch effect types
 */
export type GlitchType = 'textGlitch' | 'rgbSplit' | 'both' | 'none'

/**
 * Animation state names
 */
export type AnimationState = 'initial' | 'animate' | 'exit' | 'hover' | 'tap' | 'glitch'

/**
 * Complete animation variant set
 */
export interface AnimationVariants {
  initial?: Target
  animate?: Target
  exit?: Target
  hover?: Target
  tap?: Target
  glitch?: Target
  [key: string]: Target | undefined
}

/**
 * Animation configuration
 */
export interface AnimationConfig {
  variants: Variants
  transition?: Transition
  initial?: AnimationState | false
  animate?: AnimationState
  exit?: AnimationState
  whileHover?: AnimationState
  whileTap?: AnimationState
  whileInView?: AnimationState
}

/**
 * Reduced motion preferences
 */
export interface MotionPreferences {
  prefersReducedMotion: boolean
  shouldAnimate: boolean
}

/**
 * Stagger animation configuration
 */
export interface StaggerConfig {
  staggerChildren?: number
  delayChildren?: number
  staggerDirection?: 1 | -1
}

/**
 * Transition configuration options
 */
export interface TransitionConfig {
  type?: 'tween' | 'spring' | 'inertia'
  duration?: number
  delay?: number
  ease?: string | readonly number[]
  stiffness?: number
  damping?: number
  mass?: number
  velocity?: number
  restSpeed?: number
  restDelta?: number
  repeat?: number
  repeatType?: 'loop' | 'reverse' | 'mirror'
  repeatDelay?: number
}

/**
 * Props for animated components
 */
export interface AnimatedComponentProps {
  animate?: boolean
  reducedMotion?: boolean
  variants?: Variants
  transition?: Transition
  initial?: string | boolean | Target
  whileHover?: string | Target
  whileTap?: string | Target
  whileInView?: string | Target
}

/**
 * Glitch animation configuration
 */
export interface GlitchConfig {
  type: GlitchType
  intensity?: 'low' | 'medium' | 'high'
  frequency?: number
  duration?: number
  triggerOnHover?: boolean
}

/**
 * Slide animation direction
 */
export type SlideDirection = 'left' | 'right' | 'up' | 'down'

/**
 * Fade animation configuration
 */
export interface FadeConfig {
  duration?: number
  delay?: number
  ease?: string | readonly number[]
}

/**
 * Slide animation configuration
 */
export interface SlideConfig {
  direction: SlideDirection
  distance?: number
  duration?: number
  delay?: number
}

/**
 * Scale animation configuration
 */
export interface ScaleConfig {
  from?: number
  to?: number
  duration?: number
  delay?: number
}

/**
 * Theme animation configuration
 */
export interface ThemeAnimationConfig {
  pageTransition: PageTransitionType
  enableGlitch: boolean
  animationSpeed: 'slow' | 'normal' | 'fast'
  respectReducedMotion: boolean
}
