/**
 * ErrorFallback Component
 *
 * Default fallback UI displayed by ErrorBoundary when an error occurs.
 * Features cyberpunk-themed design with glitch effects.
 */

import { Link } from 'react-router-dom'
import GlitchText from '../motion/GlitchText'

interface ErrorFallbackProps {
  error: Error
  resetError?: () => void
}

function ErrorFallback({ error, resetError }: ErrorFallbackProps) {
  const isDev = import.meta.env.DEV

  const handleReload = () => {
    if (resetError) {
      resetError()
    }
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-cyber-black flex items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Error Title with Glitch Effect */}
        <div className="space-y-4">
          <GlitchText
            as="h1"
            type="both"
            className="font-display text-glitch-red text-shadow-neon"
          >
            SYSTEM ERROR
          </GlitchText>
          <div className="h-1 bg-gradient-to-r from-transparent via-glitch-red to-transparent animate-pulse" />
        </div>

        {/* Error Message */}
        <div className="cyber-card border-glitch-red">
          <p className="font-mono text-neon-cyan text-sm mb-4">
            &gt; ERROR CODE: COMPONENT_CRASH
          </p>
          <p className="font-sans text-gray-300 text-lg">
            Something unexpected happened and the application encountered an
            error.
          </p>
          {isDev && (
            <div className="mt-6 p-4 bg-deep-gray rounded text-left">
              <p className="font-mono text-glitch-yellow text-xs mb-2">
                DEV MODE - Error Details:
              </p>
              <p className="font-mono text-glitch-red text-sm break-all">
                {error.message}
              </p>
              {error.stack && (
                <pre className="mt-2 text-xs text-gray-400 overflow-x-auto max-h-40 scrollbar-cyber">
                  {error.stack}
                </pre>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleReload}
            className="btn-neon min-w-[160px] border-glitch-red text-glitch-red hover:bg-glitch-red hover:text-cyber-black"
          >
            Reload Page
          </button>
          <Link to="/" className="btn-neon min-w-[160px]">
            Return Home
          </Link>
        </div>

        {/* Additional Help */}
        <div className="text-center space-y-2">
          <p className="font-mono text-gray-500 text-sm">
            If this problem persists, please contact support
          </p>
          <div className="flex justify-center gap-4 text-xs font-mono text-gray-600">
            <span>Error ID: {Date.now().toString(36).toUpperCase()}</span>
            <span>•</span>
            <span>Time: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

ErrorFallback.displayName = 'ErrorFallback'

export default ErrorFallback
