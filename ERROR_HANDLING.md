# Error Handling Implementation

This document describes the comprehensive error handling system implemented for the Subculture Collective website.

## Overview

The error handling system provides:

- **Error Boundaries** - Catch and handle React component errors
- **Error Pages** - User-friendly error pages with cyberpunk styling
- **Error Logging** - Centralized error logging utilities
- **Error Hooks** - Reusable hooks for consistent error handling
- **Graceful Degradation** - Handle failures gracefully without breaking the entire app

## Components

### Error Boundary Components

#### `ErrorBoundary.tsx`

Root and component-level error boundary that catches JavaScript errors in React components.

**Features:**

- Catches errors in child component tree
- Logs errors to console (dev) and error service (production)
- Displays fallback UI when errors occur
- Supports custom fallback components
- Auto-reset on navigation with `resetKeys`

**Usage:**

```tsx
// Root level (already implemented in main.tsx)
<ErrorBoundary>
  <App />
</ErrorBoundary>

// Component level
<ErrorBoundary fallback={<CustomErrorUI />}>
  <CriticalComponent />
</ErrorBoundary>

// With reset keys
<ErrorBoundary resetKeys={[userId, pageId]}>
  <UserDashboard />
</ErrorBoundary>
```

#### `ErrorFallback.tsx`

Default fallback UI component displayed by ErrorBoundary.

**Features:**

- Cyberpunk-themed design with glitch effects
- Shows error details in development mode
- Provides "Reload Page" and "Return Home" actions
- Displays error ID and timestamp for debugging

## Error Pages

### `NotFound.tsx` (404)

Enhanced 404 page with helpful navigation options.

**Features:**

- Shows the requested path
- Suggests alternative pages
- Quick navigation links
- Cyberpunk-themed with glitch effects

**Route:** Wildcard route `*` catches all unmatched routes

### `ServerError.tsx` (500)

Server error page for critical application errors.

**Features:**

- User-friendly error message
- "Try Again" and "Return Home" actions
- Error ID for support reference
- Status indicator

**Route:** `/error`

### `NetworkError.tsx`

Network connectivity error page with offline detection.

**Features:**

- Real-time online/offline status detection
- Troubleshooting steps
- Automatic reload when connection restored
- Conditional retry button (disabled when offline)

**Route:** `/network-error`

## Utilities

### `errorLogging.ts`

Centralized error logging utilities.

**Functions:**

- `logError()` - General error logging with context
- `logNetworkError()` - Network-specific error logging
- `logComponentError()` - Component error logging (used by ErrorBoundary)
- `getUserFriendlyMessage()` - Convert errors to user-friendly messages

**Features:**

- Development: Detailed console logging with stack traces
- Production: Minimal console logging, ready for service integration
- Error severity levels: low, medium, high, critical
- Automatic context capture (URL, user agent, timestamp)

**Future Integration:**

```typescript
// Uncomment in errorLogging.ts for production
if (import.meta.env.PROD) {
  sendToSentry(errorLog)
  sendToLogRocket(errorLog)
}
```

## Hooks

### `useErrorHandler.ts`

React hook for consistent error handling in components.

**Features:**

- Manages error state
- Logs errors automatically
- Provides user-friendly error messages
- Clear/reset error state

**Usage:**

```tsx
function MyComponent() {
  const { error, errorMessage, handleError, clearError } = useErrorHandler()

  const fetchData = async () => {
    try {
      const data = await fetch('/api/data')
      // ...
    } catch (err) {
      handleError(err as Error, { action: 'fetchData' })
    }
  }

  if (error) {
    return (
      <div>
        <p>{errorMessage}</p>
        <button onClick={clearError}>Dismiss</button>
      </div>
    )
  }

  return <div>...</div>
}
```

## Integration Points

### Application Root (`main.tsx`)

- Wraps entire app with ErrorBoundary
- Catches all unhandled errors in React tree

### Route Level (`App.tsx`)

- ErrorBoundary wraps Routes for page-level error handling
- Error pages registered as routes:
  - `/error` - ServerError
  - `/network-error` - NetworkError
  - `*` - NotFound (404)

## Error Handling Patterns

### API Calls

```tsx
import { useErrorHandler } from '@/hooks/useErrorHandler'

function DataComponent() {
  const { handleError } = useErrorHandler()

  const fetchData = async () => {
    try {
      const response = await fetch('/api/data')
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      return await response.json()
    } catch (error) {
      handleError(error as Error, {
        action: 'fetchData',
        endpoint: '/api/data',
      })
    }
  }
}
```

### Image Loading

```tsx
<img
  src={imageSrc}
  onError={e => {
    e.currentTarget.src = '/images/fallback.png'
    logError(new Error('Image failed to load'), {
      errorInfo: { src: imageSrc },
    })
  }}
/>
```

### Network Offline Detection

```tsx
useEffect(() => {
  const handleOffline = () => {
    navigate('/network-error')
  }

  window.addEventListener('offline', handleOffline)
  return () => window.removeEventListener('offline', handleOffline)
}, [])
```

## Design Philosophy

### User Experience

- **Clear Messages**: Non-technical, user-friendly error messages
- **Actionable**: Provide clear next steps (retry, go home, contact support)
- **Brand Consistent**: Cyberpunk theme with glitch effects
- **Helpful**: Show troubleshooting steps and navigation options

### Developer Experience

- **Detailed Logging**: Full error details in development
- **Easy Integration**: Simple hooks and utilities
- **Flexible**: Support custom error UIs
- **Debuggable**: Error IDs and timestamps for tracking

### Production Ready

- **Minimal Logging**: Protect user privacy
- **Service Ready**: Easy integration with Sentry, LogRocket, etc.
- **Performance**: Lightweight error boundaries
- **Accessibility**: Respects reduced motion preferences

## Testing Error States

### Manual Testing

```bash
# 404 Error
http://localhost:5173/any-invalid-route

# Server Error Page
http://localhost:5173/error

# Network Error Page
http://localhost:5173/network-error
```

### Simulating Errors

```tsx
// Component that throws error
function BrokenComponent() {
  throw new Error('Test error boundary')
  return <div>Never renders</div>
}

// Use in dev to test ErrorBoundary
;<ErrorBoundary>
  <BrokenComponent />
</ErrorBoundary>
```

### Testing Network Errors

1. Open DevTools > Network tab
2. Set throttling to "Offline"
3. Try to fetch data
4. Verify NetworkError page appears

## Future Enhancements

### Error Reporting Services

- [ ] Sentry integration for production error tracking
- [ ] LogRocket for session replay
- [ ] Custom analytics for error patterns

### Advanced Features

- [ ] Error recovery strategies
- [ ] Retry mechanisms with exponential backoff
- [ ] Maintenance mode page
- [ ] Rate limiting for error reports
- [ ] User feedback collection on errors

### Monitoring

- [ ] Error dashboards
- [ ] Alert thresholds
- [ ] Error trends analysis
- [ ] Performance impact monitoring

## Best Practices

1. **Always wrap critical components** with ErrorBoundary
2. **Use useErrorHandler hook** for consistent error handling
3. **Provide context** when logging errors
4. **Test error states** during development
5. **Keep error messages** user-friendly and actionable
6. **Log errors** but protect user privacy in production
7. **Provide recovery options** (retry, go home, contact support)

## Maintenance

### Adding New Error Types

1. Create new error page in `src/pages/`
2. Add route in `App.tsx`
3. Create logging function in `errorLogging.ts`
4. Update this documentation

### Updating Error Messages

1. Edit user-friendly messages in `errorLogging.ts`
2. Update error page content in respective page components
3. Test all error states

### Integration Checklist

- [ ] Error boundary at app root ✓
- [ ] Error boundary around routes ✓
- [ ] 404 page styled and functional ✓
- [ ] 500 error page created ✓
- [ ] Network error page created ✓
- [ ] Error logging utilities created ✓
- [ ] useErrorHandler hook created ✓
- [ ] All error states tested ✓
- [ ] Documentation completed ✓
- [ ] Production error service integration (future)
- [ ] Error analytics setup (future)
