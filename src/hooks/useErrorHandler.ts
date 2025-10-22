/**
 * useErrorHandler Hook
 *
 * Provides consistent error handling across components.
 * Logs errors and provides user-friendly error messages.
 */

import { useCallback, useState } from 'react'
import { logError, getUserFriendlyMessage } from '../utils/errorLogging'

interface ErrorState {
  error: Error | null
  message: string | null
}

interface UseErrorHandlerReturn {
  error: Error | null
  errorMessage: string | null
  handleError: (error: Error, context?: Record<string, unknown>) => void
  clearError: () => void
}

/**
 * Hook for handling errors in components
 *
 * @example
 * ```tsx
 * const { error, errorMessage, handleError, clearError } = useErrorHandler()
 *
 * const fetchData = async () => {
 *   try {
 *     const data = await fetch('/api/data')
 *     // ...
 *   } catch (err) {
 *     handleError(err as Error, { action: 'fetchData' })
 *   }
 * }
 * ```
 */
export function useErrorHandler(): UseErrorHandlerReturn {
  const [errorState, setErrorState] = useState<ErrorState>({
    error: null,
    message: null,
  })

  const handleError = useCallback(
    (error: Error, context?: Record<string, unknown>) => {
      // Log the error
      logError(error, { errorInfo: context })

      // Set the error state with user-friendly message
      setErrorState({
        error,
        message: getUserFriendlyMessage(error),
      })
    },
    []
  )

  const clearError = useCallback(() => {
    setErrorState({
      error: null,
      message: null,
    })
  }, [])

  return {
    error: errorState.error,
    errorMessage: errorState.message,
    handleError,
    clearError,
  }
}
