/**
 * Animation Configuration and Variants
 *
 * This file contains reusable animation presets for Framer Motion
 * including page transitions, glitch effects, and micro-interactions.
 */

import type { Variants, Transition } from 'framer-motion'

// ============================================
// TRANSITION PRESETS
// ============================================

export const transitions = {
  // Smooth easing for general animations
  smooth: {
    type: 'tween',
    duration: 0.3,
    ease: 'easeInOut',
  } as Transition,

  // Spring physics for bouncy interactions
  spring: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  } as Transition,

  // Fast snap for quick interactions
  snap: {
    type: 'tween',
    duration: 0.15,
    ease: 'easeOut',
  } as Transition,

  // Slow and dramatic
  dramatic: {
    type: 'tween',
    duration: 0.7,
    ease: [0.43, 0.13, 0.23, 0.96],
  } as Transition,

  // Glitchy, erratic movement
  glitch: {
    type: 'tween',
    duration: 0.1,
    ease: 'linear',
  } as Transition,
}

// ============================================
// PAGE TRANSITION VARIANTS
// ============================================

export const pageTransitions = {
  // Fade transition
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: transitions.smooth },
    exit: { opacity: 0, transition: transitions.smooth },
  } as Variants,

  // Slide from right
  slideRight: {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0, transition: transitions.smooth },
    exit: { opacity: 0, x: -100, transition: transitions.smooth },
  } as Variants,

  // Slide from left
  slideLeft: {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0, transition: transitions.smooth },
    exit: { opacity: 0, x: 100, transition: transitions.smooth },
  } as Variants,

  // Slide from bottom
  slideUp: {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0, transition: transitions.smooth },
    exit: { opacity: 0, y: -100, transition: transitions.smooth },
  } as Variants,

  // Glitch transition
  glitch: {
    initial: {
      opacity: 0,
      x: -5,
      filter: 'blur(2px)',
    },
    animate: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: {
        ...transitions.smooth,
        x: {
          type: 'spring',
          stiffness: 500,
          damping: 15,
        },
      },
    },
    exit: {
      opacity: 0,
      x: 5,
      filter: 'blur(2px)',
      transition: transitions.glitch,
    },
  } as Variants,
}

// ============================================
// GLITCH EFFECT VARIANTS
// ============================================

export const glitchEffects = {
  // Text glitch effect
  textGlitch: {
    initial: { x: 0, y: 0 },
    glitch: {
      x: [-2, 2, -2, 2, 0],
      y: [0, -1, 1, -1, 0],
      transition: {
        duration: 0.3,
        repeat: Infinity,
        repeatDelay: 3,
      },
    },
  } as Variants,

  // RGB split effect
  rgbSplit: {
    initial: {
      textShadow: '0 0 0 rgba(0, 255, 255, 0), 0 0 0 rgba(255, 0, 255, 0)',
    },
    glitch: {
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
  } as Variants,

  // Image distortion effect
  imageDistortion: {
    initial: {
      scale: 1,
      filter: 'hue-rotate(0deg)',
    },
    glitch: {
      scale: [1, 1.02, 0.98, 1.01, 1],
      filter: ['hue-rotate(0deg)', 'hue-rotate(90deg)', 'hue-rotate(-90deg)', 'hue-rotate(0deg)'],
      transition: {
        duration: 0.4,
        repeat: Infinity,
        repeatDelay: 4,
      },
    },
  } as Variants,
}

// ============================================
// MICRO-INTERACTIONS
// ============================================

export const microInteractions = {
  // Button hover and tap
  button: {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: transitions.snap,
    },
    tap: {
      scale: 0.95,
      transition: transitions.snap,
    },
  } as Variants,

  // Card hover
  card: {
    initial: { y: 0, boxShadow: '0 0 0 rgba(0, 255, 255, 0)' },
    hover: {
      y: -5,
      boxShadow: '0 10px 30px rgba(0, 255, 255, 0.3)',
      transition: transitions.smooth,
    },
  } as Variants,

  // Icon pulse
  iconPulse: {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  } as Variants,

  // Loading spinner
  spinner: {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  } as Variants,
}

// ============================================
// ENTRANCE ANIMATIONS
// ============================================

export const entranceAnimations = {
  // Fade in up
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: transitions.smooth,
    },
  } as Variants,

  // Fade in down
  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: transitions.smooth,
    },
  } as Variants,

  // Scale in
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: transitions.spring,
    },
  } as Variants,

  // Slide in from left
  slideInLeft: {
    initial: { opacity: 0, x: -50 },
    animate: {
      opacity: 1,
      x: 0,
      transition: transitions.smooth,
    },
  } as Variants,

  // Slide in from right
  slideInRight: {
    initial: { opacity: 0, x: 50 },
    animate: {
      opacity: 1,
      x: 0,
      transition: transitions.smooth,
    },
  } as Variants,
}

// ============================================
// STAGGER CHILDREN VARIANTS
// ============================================

export const staggerChildren = {
  container: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  } as Variants,

  containerFast: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  } as Variants,

  containerSlow: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  } as Variants,
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Creates a stagger container variant with custom timing
 */
export function createStaggerContainer(
  staggerDelay: number = 0.1,
  initialDelay: number = 0
): Variants {
  return {
    initial: {},
    animate: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  }
}

/**
 * Creates a custom fade transition
 */
export function createFadeVariant(duration: number = 0.3, delay: number = 0): Variants {
  return {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration,
        delay,
        ease: 'easeInOut',
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: duration * 0.5,
      },
    },
  }
}

/**
 * Creates a custom slide transition
 */
export function createSlideVariant(
  direction: 'left' | 'right' | 'up' | 'down',
  distance: number = 50,
  duration: number = 0.3
): Variants {
  const isHorizontal = direction === 'left' || direction === 'right'
  const value = direction === 'left' || direction === 'up' ? -distance : distance

  if (isHorizontal) {
    return {
      initial: { opacity: 0, x: value },
      animate: {
        opacity: 1,
        x: 0,
        transition: {
          duration,
          ease: 'easeOut',
        },
      },
      exit: {
        opacity: 0,
        x: -value,
        transition: {
          duration: duration * 0.5,
        },
      },
    }
  } else {
    return {
      initial: { opacity: 0, y: value },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          duration,
          ease: 'easeOut',
        },
      },
      exit: {
        opacity: 0,
        y: -value,
        transition: {
          duration: duration * 0.5,
        },
      },
    }
  }
}
