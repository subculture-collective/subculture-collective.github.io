/**
 * Error Logging Utilities
 *
 * Provides consistent error logging and reporting across the application.
 * In development, logs to console. In production, can be extended to send
 * to error reporting services like Sentry or LogRocket.
 */

export interface ErrorContext {
  componentStack?: string
  errorInfo?: Record<string, unknown>
  userAgent?: string
  timestamp?: string
  url?: string
}

export interface ErrorLog {
  error: Error
  context: ErrorContext
  severity: 'low' | 'medium' | 'high' | 'critical'
}

/**
 * Log an error with context information
 */
export function logError(
  error: Error,
  context: ErrorContext = {},
  severity: ErrorLog['severity'] = 'medium'
): void {
  const errorLog: ErrorLog = {
    error,
    context: {
      ...context,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      url: window.location.href,
    },
    severity,
  }

  // Console logging for development
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.group(`🚨 Error [${severity.toUpperCase()}]`)
    console.error('Error:', error)
    // eslint-disable-next-line no-console
    console.log('Message:', error.message)
    // eslint-disable-next-line no-console
    console.log('Stack:', error.stack)
    // eslint-disable-next-line no-console
    console.log('Context:', errorLog.context)
    // eslint-disable-next-line no-console
    console.groupEnd()
  } else {
    // In production, log minimal info to console
    console.error(`Error: ${error.message}`)
  }

  // Future: Send to error reporting service
  // if (import.meta.env.PROD) {
  //   sendToSentry(errorLog)
  //   sendToLogRocket(errorLog)
  // }
}

/**
 * Log a network error
 */
export function logNetworkError(
  error: Error,
  url?: string,
  method?: string
): void {
  logError(
    error,
    {
      errorInfo: {
        type: 'NetworkError',
        url,
        method,
      },
    },
    'high'
  )
}

/**
 * Log a component error (typically from error boundaries)
 */
export function logComponentError(
  error: Error,
  errorInfo: { componentStack?: string }
): void {
  logError(
    error,
    {
      componentStack: errorInfo.componentStack,
      errorInfo: {
        type: 'ComponentError',
      },
    },
    'high'
  )
}

/**
 * Create a user-friendly error message from an error object
 */
export function getUserFriendlyMessage(error: Error): string {
  // Network errors
  if (error.message.includes('fetch') || error.message.includes('network')) {
    return 'Unable to connect to the server. Please check your internet connection and try again.'
  }

  // Generic fallback
  if (import.meta.env.DEV) {
    return error.message
  }

  return 'Something went wrong. Please try again or contact support if the problem persists.'
}
