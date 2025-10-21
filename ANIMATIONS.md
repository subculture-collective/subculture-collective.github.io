# Framer Motion Animation System

This document describes the animation system built with Framer Motion for the SUBCULT.TV website.

## Overview

The animation system provides:
- **Page Transitions**: Smooth transitions between routes with cyberpunk-style glitch effects
- **Glitch Effects**: Text and image glitch effects with RGB split and distortion
- **Micro-interactions**: Button hover effects, card animations, and loading states
- **Entrance Animations**: Fade in, slide in, and scale animations for content
- **Accessibility**: Full support for `prefers-reduced-motion` user preference

## Installation

Framer Motion is already installed in this project:
```bash
npm install framer-motion
```

## Core Components

### 1. PageTransition

Wraps page content to provide smooth route transitions.

**Usage:**
```tsx
import PageTransition from './components/motion/PageTransition'

function App() {
  return (
    <PageTransition type="glitch">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* ... other routes */}
      </Routes>
    </PageTransition>
  )
}
```

**Props:**
- `type`: `'fade' | 'slideRight' | 'slideLeft' | 'slideUp' | 'glitch'` (default: `'fade'`)
- `className`: Optional CSS classes
- `children`: React nodes to animate

**Available Transitions:**
- `fade`: Simple opacity fade
- `slideRight`: Slide in from right, exit to left
- `slideLeft`: Slide in from left, exit to right
- `slideUp`: Slide in from bottom, exit to top
- `glitch`: Cyberpunk-style glitch effect (recommended for this site)

### 2. GlitchText

Animated text component with cyberpunk glitch effects.

**Usage:**
```tsx
import GlitchText from './components/motion/GlitchText'

// RGB Split Effect
<GlitchText type="rgbSplit" as="h1" className="text-4xl">
  SUBCULT.TV
</GlitchText>

// Position Glitch
<GlitchText type="textGlitch" as="h2">
  Glitchy Heading
</GlitchText>

// Combined Effects
<GlitchText type="both" triggerOnHover>
  Hover for Glitch
</GlitchText>
```

**Props:**
- `type`: `'textGlitch' | 'rgbSplit' | 'both' | 'none'` (default: `'rgbSplit'`)
- `as`: HTML element type: `'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'button'`
- `animate`: Enable/disable animation (default: `true`)
- `triggerOnHover`: Only animate on hover (default: `false`)
- `className`: CSS classes
- `style`: Inline styles

**Convenience Components:**
```tsx
// For inline text
<GlitchTextSpan type="rgbSplit">Inline glitch</GlitchTextSpan>

// For headings
<GlitchHeading level={1} type="both">Glitch Heading</GlitchHeading>
```

### 3. GlitchImage

Animated image component with distortion and RGB split effects.

**Usage:**
```tsx
import GlitchImage from './components/motion/GlitchImage'

// Continuous animation
<GlitchImage 
  src="/path/to/image.jpg" 
  alt="Description"
  intensity="medium"
/>

// Animate on hover only
<GlitchImage 
  src="/path/to/image.jpg" 
  alt="Description"
  triggerOnHover
  intensity="high"
/>
```

**Props:**
- `src`: Image source URL (required)
- `alt`: Alt text (required)
- `animate`: Enable/disable animation (default: `true`)
- `triggerOnHover`: Only animate on hover (default: `false`)
- `intensity`: `'low' | 'medium' | 'high'` (default: `'medium'`)
- `className`: CSS classes
- `style`: Inline styles

**Simple Version:**
```tsx
import { GlitchImageSimple } from './components/motion/GlitchImage'

<GlitchImageSimple 
  src="/image.jpg" 
  alt="Description" 
  triggerOnHover 
/>
```

## Animation Presets

### Using with Framer Motion

All animation presets are available in `src/utils/animations.ts`:

```tsx
import { motion } from 'framer-motion'
import { 
  microInteractions, 
  entranceAnimations, 
  pageTransitions 
} from './utils/animations'

// Button with hover effect
<motion.button
  variants={microInteractions.button}
  initial="initial"
  whileHover="hover"
  whileTap="tap"
>
  Click Me
</motion.button>

// Content that fades in on mount
<motion.div
  variants={entranceAnimations.fadeInUp}
  initial="initial"
  animate="animate"
>
  Content appears here
</motion.div>
```

### Available Preset Categories

1. **Page Transitions** (`pageTransitions`)
   - `fade`, `slideRight`, `slideLeft`, `slideUp`, `glitch`

2. **Glitch Effects** (`glitchEffects`)
   - `textGlitch`: Position-based glitch
   - `rgbSplit`: RGB color split effect
   - `imageDistortion`: Image scale and hue rotation

3. **Micro-interactions** (`microInteractions`)
   - `button`: Scale on hover/tap
   - `card`: Lift and shadow on hover
   - `iconPulse`: Continuous pulse animation
   - `spinner`: Loading spinner rotation

4. **Entrance Animations** (`entranceAnimations`)
   - `fadeInUp`, `fadeInDown`: Fade with vertical movement
   - `scaleIn`: Scale from small to full size
   - `slideInLeft`, `slideInRight`: Slide from sides

5. **Stagger Children** (`staggerChildren`)
   - `container`: Standard stagger (0.1s delay)
   - `containerFast`: Fast stagger (0.05s delay)
   - `containerSlow`: Slow stagger (0.2s delay)

### Stagger Animations

Animate multiple children sequentially:

```tsx
import { motion } from 'framer-motion'
import { staggerChildren, entranceAnimations } from './utils/animations'

<motion.div variants={staggerChildren.container} initial="initial" animate="animate">
  <motion.div variants={entranceAnimations.fadeInUp}>Item 1</motion.div>
  <motion.div variants={entranceAnimations.fadeInUp}>Item 2</motion.div>
  <motion.div variants={entranceAnimations.fadeInUp}>Item 3</motion.div>
</motion.div>
```

## Custom Animations

### Utility Functions

Create custom animation variants:

```tsx
import { createFadeVariant, createSlideVariant } from './utils/animations'

// Custom fade with timing
const myFade = createFadeVariant(0.5, 0.2) // duration, delay

// Custom slide
const mySlide = createSlideVariant('left', 100, 0.4) // direction, distance, duration

<motion.div variants={myFade} initial="initial" animate="animate">
  Custom animation
</motion.div>
```

## Accessibility

### Reduced Motion Support

The system automatically respects the user's `prefers-reduced-motion` setting.

**Using the Hook:**
```tsx
import { useReducedMotion } from './hooks/useReducedMotion'

function MyComponent() {
  const prefersReducedMotion = useReducedMotion()
  
  return (
    <motion.div
      animate={prefersReducedMotion ? {} : { x: 100 }}
    >
      Content
    </motion.div>
  )
}
```

**Using the Utility:**
```tsx
import { useAccessibleAnimation } from './hooks/useReducedMotion'
import { entranceAnimations } from './utils/animations'

function MyComponent() {
  const variants = useAccessibleAnimation(entranceAnimations.fadeInUp)
  
  return (
    <motion.div variants={variants} initial="initial" animate="animate">
      Content respects motion preferences
    </motion.div>
  )
}
```

All provided components (`PageTransition`, `GlitchText`, `GlitchImage`) automatically respect reduced motion preferences - no additional configuration needed.

## Best Practices

1. **Performance**
   - Use `transform` and `opacity` for animations (GPU-accelerated)
   - Avoid animating `width`, `height`, or `top/left` when possible
   - Use `will-change` sparingly and only when needed

2. **Accessibility**
   - Always test with `prefers-reduced-motion` enabled
   - Provide instant alternatives for critical actions
   - Don't make animations too fast or too slow

3. **User Experience**
   - Keep animations subtle and purposeful
   - Use consistent timing across similar elements
   - Don't over-animate - less is often more

4. **Cyberpunk Aesthetic**
   - Use glitch effects sparingly for emphasis
   - Combine with neon colors and sharp transitions
   - Consider RGB split effects for key visual elements

## Examples

### Complete Page with Animations

```tsx
import { motion } from 'framer-motion'
import GlitchText from './components/motion/GlitchText'
import { staggerChildren, entranceAnimations } from './utils/animations'

function MyPage() {
  return (
    <div className="min-h-screen bg-cyber-black p-8">
      {/* Animated heading */}
      <GlitchText type="rgbSplit" as="h1" className="text-6xl mb-8">
        MY PAGE
      </GlitchText>
      
      {/* Staggered content */}
      <motion.div 
        variants={staggerChildren.container} 
        initial="initial" 
        animate="animate"
        className="space-y-4"
      >
        <motion.div 
          variants={entranceAnimations.fadeInUp}
          className="cyber-card"
        >
          <h2>Card 1</h2>
          <p>Content...</p>
        </motion.div>
        
        <motion.div 
          variants={entranceAnimations.fadeInUp}
          className="cyber-card"
        >
          <h2>Card 2</h2>
          <p>Content...</p>
        </motion.div>
      </motion.div>
    </div>
  )
}
```

## Troubleshooting

### Animations Not Working
- Check if `AnimatePresence` is needed for exit animations
- Verify that parent element has a key prop for route transitions
- Ensure motion components have `initial`, `animate`, or `variants` props

### Performance Issues
- Reduce the number of simultaneously animating elements
- Use `layoutId` for shared element transitions instead of separate animations
- Consider using CSS animations for simple effects

### Glitch Effects Too Intense
- Adjust animation intensity in component props
- Modify timing in `src/utils/animations.ts`
- Use `triggerOnHover` to reduce constant animation

## Additional Resources

- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html)
- [Performance Tips](https://web.dev/animations-guide/)
