/**
 * ServerError Page (500)
 *
 * Displayed when a server error or critical application error occurs.
 * Features cyberpunk-themed design with glitch effects.
 */

import { Link } from 'react-router-dom'
import GlitchText from '../components/motion/GlitchText'

function ServerError() {
  const handleReload = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-cyber-black flex items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Error Code with Glitch Effect */}
        <div className="space-y-4">
          <GlitchText
            as="h1"
            type="both"
            className="font-display text-glitch-red text-shadow-neon"
          >
            500
          </GlitchText>
          <div className="h-1 bg-gradient-to-r from-transparent via-glitch-red to-transparent animate-pulse" />
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <p className="font-sans text-gray-300 text-2xl">Server Error</p>
          <p className="font-mono text-glitch-green text-sm">
            &gt; ERROR: Internal server malfunction detected
          </p>
        </div>

        {/* Description */}
        <div className="cyber-card border-glitch-red max-w-xl mx-auto">
          <p className="font-sans text-gray-300 text-base leading-relaxed">
            Our servers encountered an unexpected error. This has been logged
            and our team has been notified. Please try again in a few moments.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleReload}
            className="btn-neon min-w-[160px] border-glitch-red text-glitch-red hover:bg-glitch-red hover:text-cyber-black"
          >
            Try Again
          </button>
          <Link to="/" className="btn-neon min-w-[160px]">
            Return Home
          </Link>
        </div>

        {/* Status Indicator */}
        <div className="flex justify-center items-center gap-2 text-sm font-mono text-gray-500">
          <div className="w-2 h-2 rounded-full bg-glitch-red animate-pulse" />
          <span>System Status: Error</span>
        </div>

        {/* Error ID */}
        <div className="text-center">
          <p className="font-mono text-gray-600 text-xs">
            Error ID: {Date.now().toString(36).toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  )
}

ServerError.displayName = 'ServerError'

export default ServerError
