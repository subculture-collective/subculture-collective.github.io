import { useParams, Link } from 'react-router-dom'

function JournalPost() {
  const { slug } = useParams<{ slug: string }>()

  return (
    <div className="min-h-screen bg-cyber-black flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <div className="text-center">
          <h1 className="font-display text-neon-cyan text-shadow-neon mb-4">Journal Post</h1>
          <p className="font-sans text-gray-300 text-lg mb-4">
            Slug: <span className="font-mono text-glitch-green">{slug}</span>
          </p>
          <p className="font-sans text-gray-400 text-sm mb-8">Coming soon...</p>
          <Link to="/journal" className="btn-neon inline-block">
            Back to Journal
          </Link>
        </div>
      </div>
    </div>
  )
}

JournalPost.displayName = 'JournalPost'

export default JournalPost
