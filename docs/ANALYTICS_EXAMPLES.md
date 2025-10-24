# Analytics Integration Examples

This document provides practical examples of how to integrate analytics tracking into your React components.

## Basic Usage

### Example 1: Track Button Clicks

```tsx
import { useAnalytics } from '../hooks/useAnalytics'

function HeroSection() {
  const analytics = useAnalytics()

  const handleJoinClick = () => {
    // Track the CTA click
    analytics.cta('Join Now', 'hero')

    // Navigate to join page
    navigate('/join')
  }

  return (
    <section>
      <h1>Join the Collective</h1>
      <button onClick={handleJoinClick}>Join Now</button>
    </section>
  )
}
```

### Example 2: Track Form Submissions

```tsx
import { useAnalytics } from '../hooks/useAnalytics'
import { useState } from 'react'

function ContactForm() {
  const analytics = useAnalytics()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Submit the form
      await submitForm(formData)

      // Track successful submission
      analytics.form('Contact Form', true)

      // Show success message
      showSuccessMessage()
    } catch (error) {
      // Track failed submission
      analytics.form('Contact Form', false)

      // Track the error
      analytics.error('Form Submission', error.message)

      // Show error message
      showErrorMessage()
    }
  }

  return <form onSubmit={handleSubmit}>{/* Form fields */}</form>
}
```

### Example 3: Track Navigation

```tsx
import { useAnalytics } from '../hooks/useAnalytics'
import { Link } from 'react-router-dom'

function Navigation() {
  const analytics = useAnalytics()

  const handleNavClick = (destination: string) => {
    analytics.navigate(destination, 'header')
  }

  return (
    <nav>
      <Link to="/about" onClick={() => handleNavClick('/about')}>
        About
      </Link>
      <Link to="/projects" onClick={() => handleNavClick('/projects')}>
        Projects
      </Link>
      <Link to="/journal" onClick={() => handleNavClick('/journal')}>
        Journal
      </Link>
    </nav>
  )
}
```

### Example 4: Track Outbound Links

```tsx
import { useAnalytics } from '../hooks/useAnalytics'

function CreatorCard({ creator }) {
  const analytics = useAnalytics()

  const handleLinkClick = (url: string, label: string) => {
    analytics.outbound(url, label)
  }

  return (
    <div className="creator-card">
      <h3>{creator.name}</h3>
      <p>{creator.bio}</p>
      <a
        href={creator.portfolio}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          handleLinkClick(creator.portfolio, `${creator.name} Portfolio`)
        }
      >
        View Portfolio
      </a>
    </div>
  )
}
```

### Example 5: Track Blog Post Interactions

```tsx
import { useAnalytics } from '../hooks/useAnalytics'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function BlogPost() {
  const analytics = useAnalytics()
  const { slug } = useParams()

  // Track when user starts reading
  useEffect(() => {
    if (slug) {
      analytics.blog('read', slug)
    }
  }, [slug, analytics])

  const handleShare = (platform: string) => {
    // Track sharing
    analytics.track('Blog Share', {
      post: slug,
      platform,
    })
  }

  return (
    <article>
      <h1>Blog Post Title</h1>
      <div>Content...</div>
      <div className="share-buttons">
        <button onClick={() => handleShare('twitter')}>Share on Twitter</button>
        <button onClick={() => handleShare('linkedin')}>
          Share on LinkedIn
        </button>
      </div>
    </article>
  )
}
```

### Example 6: Track File Downloads

```tsx
import { useAnalytics } from '../hooks/useAnalytics'

function DownloadSection() {
  const analytics = useAnalytics()

  const handleDownload = (filename: string, type: string) => {
    analytics.download(filename, type)
  }

  return (
    <section>
      <h2>Resources</h2>
      <a
        href="/downloads/whitepaper.pdf"
        download
        onClick={() => handleDownload('whitepaper.pdf', 'pdf')}
      >
        Download Whitepaper
      </a>
      <a
        href="/downloads/guide.epub"
        download
        onClick={() => handleDownload('guide.epub', 'epub')}
      >
        Download Guide
      </a>
    </section>
  )
}
```

### Example 7: Track Custom Events

```tsx
import { useAnalytics } from '../hooks/useAnalytics'

function InteractiveDemo() {
  const analytics = useAnalytics()

  const handleVideoPlay = () => {
    analytics.track('Video Play', {
      video: 'intro-video',
      location: 'homepage',
    })
  }

  const handleVideoComplete = () => {
    analytics.track('Video Complete', {
      video: 'intro-video',
      duration: 120,
    })
  }

  const handleCarouselSlide = (slideIndex: number) => {
    analytics.track('Carousel Slide', {
      slide: slideIndex,
      component: 'features-carousel',
    })
  }

  return (
    <div>
      <video onPlay={handleVideoPlay} onEnded={handleVideoComplete}>
        <source src="/videos/intro.mp4" type="video/mp4" />
      </video>
    </div>
  )
}
```

### Example 8: Error Boundary with Analytics

```tsx
import { Component, ReactNode } from 'react'
import { trackError } from '../utils/analytics'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Track the error
    trackError('React Error Boundary', error.message)

    // Log to console in development
    if (import.meta.env.DEV) {
      console.error('Error caught by boundary:', error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}

export default ErrorBoundary
```

## Advanced Usage

### Track User Journey

```tsx
import { useAnalytics } from '../hooks/useAnalytics'
import { useEffect } from 'react'

function CheckoutFlow() {
  const analytics = useAnalytics()
  const [step, setStep] = useState(1)

  // Track each step in the checkout flow
  useEffect(() => {
    analytics.track('Checkout Step', {
      step,
      stepName: getStepName(step),
    })
  }, [step, analytics])

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleComplete = () => {
    analytics.track('Checkout Complete', {
      totalSteps: 3,
      timeSpent: calculateTimeSpent(),
    })
  }

  return <div>{/* Checkout UI */}</div>
}
```

### Conditional Tracking

```tsx
import { useAnalytics } from '../hooks/useAnalytics'
import { isAnalyticsAvailable } from '../utils/analytics'

function FeatureFlag() {
  const analytics = useAnalytics()

  const handleFeatureUse = () => {
    // Only track if analytics is available
    if (isAnalyticsAvailable()) {
      analytics.track('Feature Used', {
        feature: 'new-feature',
        version: 'v2',
      })
    }

    // Continue with feature logic
    executeFeature()
  }

  return <button onClick={handleFeatureUse}>Try New Feature</button>
}
```

### Batch Event Tracking

```tsx
import { useAnalytics } from '../hooks/useAnalytics'

function Survey() {
  const analytics = useAnalytics()
  const [answers, setAnswers] = useState({})

  const handleSubmit = () => {
    // Track survey completion
    analytics.track('Survey Complete', {
      questions: Object.keys(answers).length,
      completed: true,
    })

    // Track individual answers
    Object.entries(answers).forEach(([question, answer]) => {
      analytics.track('Survey Answer', {
        question,
        answer: String(answer),
      })
    })
  }

  return <form onSubmit={handleSubmit}>{/* Survey questions */}</form>
}
```

## Best Practices

### 1. Don't Track PII

```tsx
// ❌ Bad - tracking personal information
analytics.track('User Login', {
  email: 'user@example.com',
  name: 'John Doe',
})

// ✅ Good - tracking without PII
analytics.track('User Login', {
  success: true,
  method: 'email',
})
```

### 2. Use Descriptive Event Names

```tsx
// ❌ Bad - vague event names
analytics.track('click')
analytics.track('submit')

// ✅ Good - descriptive event names
analytics.track('CTA Click', { button: 'Sign Up' })
analytics.track('Form Submit', { form: 'Newsletter' })
```

### 3. Keep Event Properties Simple

```tsx
// ❌ Bad - complex nested objects
analytics.track('Event', {
  data: {
    nested: {
      deeply: {
        value: 'test',
      },
    },
  },
})

// ✅ Good - flat, simple properties
analytics.track('Event', {
  category: 'user-action',
  action: 'click',
  label: 'button',
})
```

### 4. Handle Analytics Errors Gracefully

```tsx
import { useAnalytics } from '../hooks/useAnalytics'

function Component() {
  const analytics = useAnalytics()

  const handleClick = () => {
    try {
      // Track the event
      analytics.cta('Button', 'location')
    } catch (error) {
      // Analytics should never break your app
      console.error('Analytics error:', error)
    }

    // Continue with core functionality
    performAction()
  }

  return <button onClick={handleClick}>Click Me</button>
}
```

### 5. Test Without Breaking Production

```tsx
import { useAnalytics } from '../hooks/useAnalytics'

function TestComponent() {
  const analytics = useAnalytics()

  const handleTestEvent = () => {
    // Only track in production
    if (import.meta.env.PROD) {
      analytics.track('Test Event')
    } else {
      console.log('Would track: Test Event')
    }
  }

  return <button onClick={handleTestEvent}>Test</button>
}
```

## Testing Analytics Integration

### Unit Test Example

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import * as analytics from '../utils/analytics'

// Mock analytics
vi.mock('../utils/analytics', () => ({
  trackCTA: vi.fn(),
}))

describe('Button with Analytics', () => {
  it('should track click event', () => {
    render(<ButtonWithAnalytics />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(analytics.trackCTA).toHaveBeenCalledWith('Button Name', 'location')
  })
})
```

## Debugging

### Check Analytics Availability

```tsx
import { isAnalyticsAvailable } from '../utils/analytics'

console.log('Analytics available:', isAnalyticsAvailable())
console.log('Environment:', import.meta.env.MODE)
console.log('Do Not Track:', navigator.doNotTrack)
```

### View Events in Console

```tsx
// In development, analytics logs events to console
// Look for messages like:
// "Analytics initialized: { domain: 'example.com', ... }"
```

## Resources

- [Analytics Documentation](../docs/ANALYTICS.md)
- [Plausible Events API](https://plausible.io/docs/custom-event-goals)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
