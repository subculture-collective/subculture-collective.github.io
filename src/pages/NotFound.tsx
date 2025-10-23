/**
 * NotFound Page (404)
 *
 * Displayed when a user navigates to a route that doesn't exist.
 * Features cyberpunk-themed design with glitch effects and helpful navigation.
 */

import { Link, useLocation } from 'react-router-dom'
import GlitchText from '../components/motion/GlitchText'
import SEOHead from '../components/seo/SEOHead'
import { pageSEO } from '../data/seo-config'

function NotFound() {
  const location = useLocation()

  const suggestions = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/creators', label: 'Creators' },
    { path: '/projects', label: 'Projects' },
    { path: '/journal', label: 'Journal' },
  ]

  return (
    <>
      <SEOHead pageSEO={pageSEO.notFound!} />
      <div className="min-h-screen bg-cyber-black flex items-center justify-center p-8">
        <div className="max-w-2xl w-full text-center space-y-8">
          {/* 404 with Glitch Effect */}
          <div className="space-y-4">
            <GlitchText
              as="h1"
              type="both"
              className="font-display text-neon-cyan text-shadow-neon"
            >
              404
            </GlitchText>
            <div className="h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent animate-pulse" />
          </div>

          {/* Error Message */}
          <div className="space-y-4">
            <p className="font-sans text-gray-300 text-2xl">Page Not Found</p>
            <p className="font-mono text-glitch-green text-sm">
              &gt; ERROR: The requested resource does not exist
            </p>
          </div>

          {/* Current Path Display */}
          <div className="cyber-card border-neon-cyan max-w-xl mx-auto">
            <p className="font-mono text-gray-400 text-sm mb-2">
              Requested Path:
            </p>
            <p className="font-mono text-neon-cyan text-base break-all">
              {location.pathname}
            </p>
          </div>

          {/* Navigation Suggestions */}
          <div className="space-y-4">
            <p className="font-sans text-gray-400 text-sm">
              Try one of these pages instead:
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {suggestions.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="px-4 py-2 font-mono text-sm border border-light-gray text-gray-300 
                         hover:border-neon-cyan hover:text-neon-cyan transition-all duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Return Home Button */}
          <div className="pt-4">
            <Link to="/" className="btn-neon inline-block min-w-[160px]">
              Return Home
            </Link>
          </div>

          {/* Decorative Element */}
          <div className="flex justify-center items-center gap-2 text-sm font-mono text-gray-600">
            <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
            <span>Lost in the digital void</span>
            <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
          </div>
        </div>
      </div>
    </>
  )
}

NotFound.displayName = 'NotFound'

export default NotFound
