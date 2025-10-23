/**
 * Tests for animation utilities
 */

import { describe, it, expect } from 'vitest'
import {
  transitions,
  pageTransitions,
  glitchEffects,
  microInteractions,
  entranceAnimations,
  staggerChildren,
  createStaggerContainer,
  createFadeVariant,
  createSlideVariant,
} from '../animations'

describe('transitions', () => {
  it('should export smooth transition', () => {
    expect(transitions.smooth).toEqual({
      type: 'tween',
      duration: 0.3,
      ease: 'easeInOut',
    })
  })

  it('should export spring transition', () => {
    expect(transitions.spring).toEqual({
      type: 'spring',
      stiffness: 300,
      damping: 30,
    })
  })

  it('should export snap transition', () => {
    expect(transitions.snap).toEqual({
      type: 'tween',
      duration: 0.15,
      ease: 'easeOut',
    })
  })

  it('should export dramatic transition', () => {
    expect(transitions.dramatic).toEqual({
      type: 'tween',
      duration: 0.7,
      ease: [0.43, 0.13, 0.23, 0.96],
    })
  })

  it('should export glitch transition', () => {
    expect(transitions.glitch).toEqual({
      type: 'tween',
      duration: 0.1,
      ease: 'linear',
    })
  })
})

describe('pageTransitions', () => {
  it('should have fade transition', () => {
    expect(pageTransitions.fade).toHaveProperty('initial')
    expect(pageTransitions.fade).toHaveProperty('animate')
    expect(pageTransitions.fade).toHaveProperty('exit')
    expect(pageTransitions.fade.initial).toEqual({ opacity: 0 })
  })

  it('should have slideRight transition', () => {
    expect(pageTransitions.slideRight.initial).toEqual({ opacity: 0, x: 100 })
    expect(pageTransitions.slideRight.animate).toHaveProperty('x', 0)
  })

  it('should have slideLeft transition', () => {
    expect(pageTransitions.slideLeft.initial).toEqual({ opacity: 0, x: -100 })
  })

  it('should have slideUp transition', () => {
    expect(pageTransitions.slideUp.initial).toEqual({ opacity: 0, y: 100 })
  })

  it('should have glitch transition', () => {
    expect(pageTransitions.glitch).toHaveProperty('initial')
    expect(pageTransitions.glitch.initial).toHaveProperty('filter')
  })
})

describe('glitchEffects', () => {
  it('should have textGlitch effect', () => {
    expect(glitchEffects.textGlitch).toHaveProperty('initial')
    expect(glitchEffects.textGlitch).toHaveProperty('glitch')
    expect(glitchEffects.textGlitch.glitch).toHaveProperty('x')
    expect(glitchEffects.textGlitch.glitch).toHaveProperty('y')
  })

  it('should have rgbSplit effect', () => {
    expect(glitchEffects.rgbSplit).toHaveProperty('initial')
    expect(glitchEffects.rgbSplit.initial).toHaveProperty('textShadow')
  })

  it('should have imageDistortion effect', () => {
    expect(glitchEffects.imageDistortion).toHaveProperty('initial')
    expect(glitchEffects.imageDistortion.initial).toEqual({
      scale: 1,
      filter: 'hue-rotate(0deg)',
    })
  })
})

describe('microInteractions', () => {
  it('should have button interaction', () => {
    expect(microInteractions.button).toHaveProperty('initial')
    expect(microInteractions.button).toHaveProperty('hover')
    expect(microInteractions.button).toHaveProperty('tap')
    expect(microInteractions.button.hover).toHaveProperty('scale', 1.05)
    expect(microInteractions.button.tap).toHaveProperty('scale', 0.95)
  })

  it('should have card interaction', () => {
    expect(microInteractions.card).toHaveProperty('initial')
    expect(microInteractions.card).toHaveProperty('hover')
    expect(microInteractions.card.hover).toHaveProperty('y', -5)
  })

  it('should have iconPulse animation', () => {
    expect(microInteractions.iconPulse).toHaveProperty('initial')
    expect(microInteractions.iconPulse).toHaveProperty('animate')
  })

  it('should have spinner animation', () => {
    expect(microInteractions.spinner).toHaveProperty('animate')
    expect(microInteractions.spinner.animate).toHaveProperty('rotate', 360)
  })
})

describe('entranceAnimations', () => {
  it('should have fadeInUp animation', () => {
    expect(entranceAnimations.fadeInUp.initial).toEqual({ opacity: 0, y: 20 })
    expect(entranceAnimations.fadeInUp.animate).toHaveProperty('opacity', 1)
    expect(entranceAnimations.fadeInUp.animate).toHaveProperty('y', 0)
  })

  it('should have fadeInDown animation', () => {
    expect(entranceAnimations.fadeInDown.initial).toEqual({
      opacity: 0,
      y: -20,
    })
  })

  it('should have scaleIn animation', () => {
    expect(entranceAnimations.scaleIn.initial).toEqual({
      opacity: 0,
      scale: 0.8,
    })
  })

  it('should have slideInLeft animation', () => {
    expect(entranceAnimations.slideInLeft.initial).toEqual({
      opacity: 0,
      x: -50,
    })
  })

  it('should have slideInRight animation', () => {
    expect(entranceAnimations.slideInRight.initial).toEqual({
      opacity: 0,
      x: 50,
    })
  })
})

describe('staggerChildren', () => {
  it('should have container variant', () => {
    expect(staggerChildren.container).toHaveProperty('initial')
    expect(staggerChildren.container).toHaveProperty('animate')
    expect(
      (staggerChildren.container.animate as any).transition
    ).toHaveProperty('staggerChildren', 0.1)
    expect(
      (staggerChildren.container.animate as any).transition
    ).toHaveProperty('delayChildren', 0.2)
  })

  it('should have containerFast variant', () => {
    expect(
      (staggerChildren.containerFast.animate as any).transition
    ).toHaveProperty('staggerChildren', 0.05)
  })

  it('should have containerSlow variant', () => {
    expect(
      (staggerChildren.containerSlow.animate as any).transition
    ).toHaveProperty('staggerChildren', 0.2)
  })
})

describe('createStaggerContainer', () => {
  it('should create a stagger container with default values', () => {
    const container = createStaggerContainer()
    expect(container).toHaveProperty('initial')
    expect(container).toHaveProperty('animate')
    expect((container.animate as any).transition).toHaveProperty(
      'staggerChildren',
      0.1
    )
    expect((container.animate as any).transition).toHaveProperty(
      'delayChildren',
      0
    )
  })

  it('should create a stagger container with custom values', () => {
    const container = createStaggerContainer(0.2, 0.5)
    expect((container.animate as any).transition).toHaveProperty(
      'staggerChildren',
      0.2
    )
    expect((container.animate as any).transition).toHaveProperty(
      'delayChildren',
      0.5
    )
  })
})

describe('createFadeVariant', () => {
  it('should create a fade variant with default values', () => {
    const variant = createFadeVariant()
    expect(variant.initial).toEqual({ opacity: 0 })
    expect(variant.animate as any).toHaveProperty('opacity', 1)
    expect((variant.animate as any).transition).toHaveProperty('duration', 0.3)
    expect((variant.animate as any).transition).toHaveProperty('delay', 0)
  })

  it('should create a fade variant with custom values', () => {
    const variant = createFadeVariant(0.5, 0.2)
    expect((variant.animate as any).transition).toHaveProperty('duration', 0.5)
    expect((variant.animate as any).transition).toHaveProperty('delay', 0.2)
  })

  it('should have exit animation', () => {
    const variant = createFadeVariant(0.4)
    expect(variant.exit as any).toHaveProperty('opacity', 0)
    expect((variant.exit as any).transition).toHaveProperty('duration', 0.2) // half of duration
  })
})

describe('createSlideVariant', () => {
  it('should create a left slide variant', () => {
    const variant = createSlideVariant('left', 50, 0.3)
    expect(variant.initial).toEqual({ opacity: 0, x: -50 })
    expect(variant.animate as any).toHaveProperty('x', 0)
    expect(variant.exit as any).toHaveProperty('x', 50)
  })

  it('should create a right slide variant', () => {
    const variant = createSlideVariant('right', 50, 0.3)
    expect(variant.initial).toEqual({ opacity: 0, x: 50 })
    expect(variant.exit as any).toHaveProperty('x', -50)
  })

  it('should create an up slide variant', () => {
    const variant = createSlideVariant('up', 50, 0.3)
    expect(variant.initial).toEqual({ opacity: 0, y: -50 })
    expect(variant.animate as any).toHaveProperty('y', 0)
    expect(variant.exit as any).toHaveProperty('y', 50)
  })

  it('should create a down slide variant', () => {
    const variant = createSlideVariant('down', 50, 0.3)
    expect(variant.initial).toEqual({ opacity: 0, y: 50 })
    expect(variant.exit as any).toHaveProperty('y', -50)
  })

  it('should use custom distance and duration', () => {
    const variant = createSlideVariant('left', 100, 0.5)
    expect(variant.initial).toEqual({ opacity: 0, x: -100 })
    expect((variant.animate as any).transition).toHaveProperty('duration', 0.5)
  })
})
