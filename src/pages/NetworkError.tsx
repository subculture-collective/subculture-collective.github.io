/**
 * NetworkError Page
 *
 * Displayed when network connectivity issues are detected.
 * Features cyberpunk-themed design with offline detection.
 */

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GlitchText from '../components/motion/GlitchText'
import SEOHead from '../components/seo/SEOHead'
import { pageSEO } from '../data/seo-config'

function NetworkError() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleRetry = () => {
    if (isOnline) {
      window.location.reload()
    } else {
      // Show message using a custom approach instead of alert
      console.warn('Still offline. Please check your connection and try again.')
    }
  }

  return (
    <>
      <SEOHead pageSEO={pageSEO.networkError!} />
      <div className="min-h-screen bg-cyber-black flex items-center justify-center p-8">
        <div className="max-w-2xl w-full text-center space-y-8">
          {/* Error Icon/Title */}
          <div className="space-y-4">
            <GlitchText
              as="h1"
              type="both"
              className="font-display text-neon-cyan text-shadow-neon text-6xl"
            >
              OFFLINE
            </GlitchText>
            <div className="h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent animate-pulse" />
          </div>

          {/* Error Message */}
          <div className="space-y-4">
            <p className="font-sans text-gray-300 text-2xl">Network Error</p>
            <p className="font-mono text-glitch-green text-sm">
              &gt; ERROR: Connection to server lost
            </p>
          </div>

          {/* Description */}
          <div className="cyber-card border-neon-cyan max-w-xl mx-auto">
            <p className="font-sans text-gray-300 text-base leading-relaxed mb-4">
              {isOnline
                ? 'Unable to reach the server. The service may be temporarily unavailable.'
                : 'Your device appears to be offline. Please check your internet connection.'}
            </p>
            <div className="text-sm font-mono text-gray-400 space-y-2">
              <p>Troubleshooting steps:</p>
              <ul className="list-disc list-inside text-left max-w-md mx-auto space-y-1">
                <li>Check your WiFi or mobile data connection</li>
                <li>Try disabling airplane mode if enabled</li>
                <li>Restart your router or modem</li>
                <li>Contact your internet service provider</li>
              </ul>
            </div>
          </div>

          {/* Connection Status */}
          <div className="flex justify-center items-center gap-3">
            <div
              className={`w-3 h-3 rounded-full ${
                isOnline
                  ? 'bg-neon-green animate-pulse'
                  : 'bg-glitch-red animate-pulse'
              }`}
            />
            <span className="font-mono text-sm text-gray-400">
              Status: {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleRetry}
              className={`btn-neon min-w-[160px] ${
                isOnline
                  ? 'border-neon-cyan text-neon-cyan hover:bg-neon-cyan'
                  : 'border-gray-600 text-gray-600 cursor-not-allowed'
              } hover:text-cyber-black`}
              disabled={!isOnline}
            >
              {isOnline ? 'Retry Connection' : 'Waiting...'}
            </button>
            <Link to="/" className="btn-neon min-w-[160px]">
              Return Home
            </Link>
          </div>

          {/* Help Text */}
          <div className="text-center">
            <p className="font-mono text-gray-500 text-sm">
              Connection status updates automatically when connection is
              restored
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

NetworkError.displayName = 'NetworkError'

export default NetworkError
