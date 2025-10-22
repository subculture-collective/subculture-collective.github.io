/**
 * ErrorBoundary Component
 *
 * React Error Boundary that catches JavaScript errors anywhere in the child
 * component tree, logs those errors, and displays a fallback UI.
 */

import { Component, type ReactNode } from 'react'
import { logComponentError } from '../../utils/errorLogging'
import ErrorFallback from './ErrorFallback'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: { componentStack?: string }) => void
  resetKeys?: Array<string | number>
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    }
  }

  override componentDidCatch(
    error: Error,
    errorInfo: { componentStack?: string }
  ) {
    // Log the error to our error logging service
    logComponentError(error, errorInfo)

    // Call the optional onError callback
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  override componentDidUpdate(prevProps: Props) {
    // Reset error boundary when resetKeys change
    if (this.state.hasError && this.props.resetKeys) {
      const prevResetKeys = prevProps.resetKeys || []
      const currentResetKeys = this.props.resetKeys

      // Check if any reset key has changed
      const hasResetKeyChanged = currentResetKeys.some(
        (key, index) => key !== prevResetKeys[index]
      )

      if (hasResetKeyChanged) {
        this.resetErrorBoundary()
      }
    }
  }

  resetErrorBoundary = () => {
    this.setState({
      hasError: false,
      error: null,
    })
  }

  override render() {
    if (this.state.hasError && this.state.error) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default fallback UI
      return (
        <ErrorFallback
          error={this.state.error}
          resetError={this.resetErrorBoundary}
        />
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
