interface LoadingSpinnerProps {
  message?: string
}

function LoadingSpinner({ message = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <div
      className="flex min-h-[50vh] items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-primary-500"></div>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          {message}
        </p>
        <span className="sr-only">{message}</span>
      </div>
    </div>
  )
}

LoadingSpinner.displayName = 'LoadingSpinner'

export default LoadingSpinner
