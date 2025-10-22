import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="min-h-screen bg-cyber-black flex items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center">
        <h1 className="font-display text-neon-cyan text-shadow-neon mb-4 animate-glitch-slow">
          404
        </h1>
        <p className="font-sans text-gray-300 text-xl mb-6">Page Not Found</p>
        <p className="font-mono text-glitch-green text-sm mb-8">
          &gt; ERROR: The requested resource does not exist
        </p>
        <Link to="/" className="btn-neon inline-block">
          Return Home
        </Link>
      </div>
    </div>
  )
}

NotFound.displayName = 'NotFound'

export default NotFound
