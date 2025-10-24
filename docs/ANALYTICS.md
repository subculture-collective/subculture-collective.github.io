# Analytics Documentation

This document describes the privacy-focused analytics implementation for the Subculture Collective website.

## Overview

The analytics system uses **Plausible Analytics**, a privacy-focused, GDPR-compliant analytics service that:

- ✅ Doesn't use cookies
- ✅ Respects Do Not Track
- ✅ Anonymizes user data
- ✅ Provides simple, actionable insights
- ✅ Is lightweight (~1KB script)

## Architecture

The analytics implementation consists of three main components:

### 1. Analytics Component (`src/components/analytics/Analytics.tsx`)

The Analytics component loads the Plausible script conditionally based on:

- Environment (production only by default)
- User preferences (respects Do Not Track)
- Configuration settings

**Usage:**

```tsx
import Analytics from './components/analytics/Analytics'

// In your app
<Analytics domain="subculture-collective.github.io" />

// With custom API host (self-hosted)
<Analytics
  domain="example.com"
  apiHost="https://analytics.example.com"
/>

// Enable in development
<Analytics
  domain="example.com"
  enabled={true}
/>
```

### 2. Analytics Utilities (`src/utils/analytics.ts`)

Provides functions for tracking various events:

**Page View Tracking:**

```typescript
import { trackPageView } from './utils/analytics'

// Track page view with current URL
trackPageView()

// Track page view with custom URL
trackPageView('/custom-page')
```

**Custom Event Tracking:**

```typescript
import { trackEvent } from './utils/analytics'

// Track custom event
trackEvent('Button Click', { button: 'Sign Up', location: 'hero' })
```

**Specialized Tracking Functions:**

```typescript
import {
  trackCTA,
  trackFormSubmit,
  trackNavigation,
  trackOutboundLink,
  trackDownload,
  trackBlogPost,
  trackError,
  trackWebVital,
} from './utils/analytics'

// Track CTA button click
trackCTA('Join Now', 'hero')

// Track form submission
trackFormSubmit('Contact Form', true)

// Track navigation
trackNavigation('/about', 'header')

// Track outbound link
trackOutboundLink('https://example.com', 'Example Site')

// Track download
trackDownload('whitepaper.pdf', 'pdf')

// Track blog post interaction
trackBlogPost('read', 'my-post-slug')

// Track error
trackError('Network Error', 'Failed to fetch data')

// Track Web Vital
trackWebVital('LCP', 1234, 'v1-123', 'good')
```

### 3. useAnalytics Hook (`src/hooks/useAnalytics.ts`)

A React hook that provides convenient methods for tracking analytics:

```typescript
import { useAnalytics } from './hooks/useAnalytics'

function MyComponent() {
  const analytics = useAnalytics()

  const handleClick = () => {
    analytics.cta('Join Now', 'hero')
  }

  const handleSubmit = async () => {
    try {
      await submitForm()
      analytics.form('Contact Form', true)
    } catch (error) {
      analytics.form('Contact Form', false)
      analytics.error('Form Error', error.message)
    }
  }

  return (
    <div>
      <button onClick={handleClick}>Join Now</button>
      <form onSubmit={handleSubmit}>...</form>
    </div>
  )
}
```

## Features

### Page View Tracking

Page views are automatically tracked on route changes in the App component:

```typescript
// src/App.tsx
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView } from './utils/analytics'

function App() {
  const location = useLocation()

  useEffect(() => {
    trackPageView(location.pathname + location.search)
  }, [location])

  // ...
}
```

### Web Vitals Integration

Web Vitals (Core Web Vitals) are automatically tracked and sent to analytics:

```typescript
// src/utils/performance.ts
import { trackWebVital } from './analytics'

export function reportWebVitals(metric: Metric) {
  if (import.meta.env.PROD) {
    trackWebVital(metric.name, metric.value, metric.id, metric.rating)
  }
}
```

Tracked metrics:

- **LCP** (Largest Contentful Paint)
- **FID/INP** (First Input Delay / Interaction to Next Paint)
- **CLS** (Cumulative Layout Shift)
- **FCP** (First Contentful Paint)

### Privacy Compliance

The implementation respects user privacy in multiple ways:

1. **Do Not Track**: Automatically disabled when Do Not Track is enabled
2. **No Cookies**: Plausible doesn't use cookies
3. **Anonymous Data**: No personal data is collected
4. **Production Only**: Analytics is disabled in development by default

### Event Tracking

Common events tracked:

- ✅ Page views
- ✅ CTA button clicks
- ✅ Form submissions
- ✅ Navigation clicks
- ✅ Outbound link clicks
- ✅ Blog post interactions
- ✅ Download events
- ✅ Error tracking
- ✅ Web Vitals metrics

## Setup

### 1. Install Dependencies

Analytics uses only the native Plausible script (loaded from CDN), no additional dependencies required.

### 2. Configure Analytics

Add the Analytics component to your app:

```typescript
// src/main.tsx
import Analytics from './components/analytics/Analytics'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Analytics domain="your-domain.com" />
      <App />
    </BrowserRouter>
  </StrictMode>
)
```

### 3. Set Up Plausible Account

1. Create a free account at [plausible.io](https://plausible.io)
2. Add your domain (e.g., `subculture-collective.github.io`)
3. The script will automatically start collecting data once deployed

### 4. Configure Goals (Optional)

In your Plausible dashboard, you can configure custom goals to track specific events:

1. Go to Site Settings → Goals
2. Add custom event goals:
   - `CTA Click`
   - `Form Submit`
   - `Navigation`
   - `Outbound Link`
   - `File Download`
   - `Blog Post`
   - `Error`
   - `Web Vitals`

## Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run analytics tests specifically
npm run test -- src/utils/__tests__/analytics.test.ts
npm run test -- src/hooks/__tests__/useAnalytics.test.ts
```

### Manual Testing

1. **Development Testing:**

   ```typescript
   // Enable analytics in development
   <Analytics domain="your-domain.com" enabled={true} />
   ```

2. **Check Browser Console:**
   - Analytics tracks events and logs them in development mode
   - Look for "Web Vital:" and "Analytics initialized:" messages

3. **Verify Script Loading:**
   - Open browser DevTools → Network tab
   - Look for request to `plausible.io/js/script.js`

4. **Test Do Not Track:**
   - Enable Do Not Track in browser settings
   - Verify analytics is disabled (check console)

## Dashboard

### Accessing Analytics

Visit your Plausible dashboard at `https://plausible.io/[your-domain]`

### Key Metrics

- **Visitors**: Unique visitors to your site
- **Page Views**: Total page views
- **Bounce Rate**: Percentage of single-page sessions
- **Visit Duration**: Average time on site
- **Top Pages**: Most visited pages
- **Sources**: Where visitors come from
- **Devices**: Desktop vs mobile breakdown
- **Locations**: Geographic distribution

### Custom Events

View custom event tracking in the "Goals" section of your dashboard.

## Best Practices

### 1. Event Naming

Use consistent, descriptive event names:

```typescript
// Good
trackEvent('CTA Click', { button: 'Sign Up', location: 'hero' })

// Avoid
trackEvent('click', { b: 'su', l: 'h' })
```

### 2. Event Properties

Keep event properties simple and consistent:

```typescript
// Good
trackEvent('Form Submit', {
  form: 'Contact Form',
  success: 'true',
})

// Avoid deeply nested objects
trackEvent('Form Submit', {
  data: { nested: { deeply: { object: 'value' } } },
})
```

### 3. Performance

- Analytics functions are no-ops when analytics is unavailable
- All tracking is asynchronous and non-blocking
- Errors are caught and logged, preventing crashes

### 4. Privacy

- Never track personally identifiable information (PII)
- Respect user preferences (Do Not Track)
- Keep analytics disabled in development
- Be transparent about data collection

## Troubleshooting

### Analytics Not Loading

1. Check browser console for errors
2. Verify domain is configured correctly
3. Check if Do Not Track is enabled
4. Verify you're in production mode

### Events Not Tracking

1. Check if analytics is available:

   ```typescript
   import { isAnalyticsAvailable } from './utils/analytics'
   console.log('Analytics available:', isAnalyticsAvailable())
   ```

2. Verify event names match goals in Plausible dashboard
3. Check browser console for error messages

### Dashboard Shows No Data

1. Wait 5-10 minutes for data to appear
2. Verify the script is loading (check Network tab)
3. Ensure you're visiting the site from a real device (not localhost)
4. Check if ad blockers are interfering

## Resources

- [Plausible Analytics Documentation](https://plausible.io/docs)
- [Plausible Events API](https://plausible.io/docs/custom-event-goals)
- [Web Vitals Documentation](https://web.dev/vitals/)
- [GDPR Compliance Guide](https://plausible.io/data-policy)

## Future Enhancements

Potential improvements for the analytics system:

- [ ] A/B testing integration
- [ ] Conversion funnel tracking
- [ ] Custom dashboard widgets
- [ ] Automated alerts for anomalies
- [ ] Export data for analysis
- [ ] Multi-domain tracking
- [ ] Revenue tracking (if applicable)
