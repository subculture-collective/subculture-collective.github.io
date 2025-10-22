import { Link } from 'react-router-dom'

function About() {
  return (
    <div className="min-h-screen bg-cyber-black flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <div className="text-center">
          <h1 className="font-display text-neon-cyan text-shadow-neon mb-4">About Subcult</h1>
          <p className="font-sans text-gray-300 text-lg mb-6">Coming soon...</p>
          <Link to="/" className="btn-neon">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

About.displayName = 'About'

export default About
