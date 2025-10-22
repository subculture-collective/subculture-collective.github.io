import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMdxPosts } from '@/lib/mdx'
import type { MDXPost } from '@/types/content'

function Journal() {
  const [posts, setPosts] = useState<MDXPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadPosts() {
      try {
        const allPosts = await getMdxPosts()
        setPosts(allPosts)
      } catch (err) {
        setError('Failed to load posts')
        console.error('Error loading posts:', err)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-cyber-black flex items-center justify-center p-8">
        <div className="text-neon-cyan font-mono">Loading posts...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cyber-black flex items-center justify-center p-8">
        <div className="text-glitch-pink font-mono">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cyber-black p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-display text-5xl text-neon-cyan text-shadow-neon mb-4">
            Journal
          </h1>
          <p className="font-sans text-gray-400 text-lg">
            Thoughts from the underground
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center text-gray-400 font-mono">
            No posts yet. Check back soon...
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map(post => (
              <article
                key={post.slug}
                className="border border-neon-cyan/20 bg-cyber-black/50 p-6 rounded-lg hover:border-neon-cyan/50 transition-colors"
              >
                <Link to={`/journal/${post.slug}`} className="block group">
                  <h2 className="font-display text-3xl text-glitch-pink group-hover:text-neon-cyan transition-colors mb-3">
                    {post.frontmatter.title}
                  </h2>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <time dateTime={post.frontmatter.date}>
                      {new Date(post.frontmatter.date).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }
                      )}
                    </time>
                    <span>•</span>
                    <span>{post.frontmatter.author}</span>
                    {post.readingTime && (
                      <>
                        <span>•</span>
                        <span>{post.readingTime}</span>
                      </>
                    )}
                  </div>

                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {post.frontmatter.excerpt}
                  </p>

                  {post.frontmatter.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.frontmatter.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs font-mono bg-glitch-green/10 text-glitch-green border border-glitch-green/20 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

Journal.displayName = 'Journal'

export default Journal
