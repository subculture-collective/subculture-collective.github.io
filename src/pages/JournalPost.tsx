import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MDXProvider } from '@mdx-js/react'
import { getMdxPost, mdxComponents } from '@/lib/mdx'
import type { MDXPost } from '@/types/content'

function JournalPost() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<MDXPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadPost() {
      if (!slug) {
        setError('No slug provided')
        setLoading(false)
        return
      }

      try {
        const loadedPost = await getMdxPost(slug)
        if (!loadedPost) {
          setError('Post not found')
        } else {
          setPost(loadedPost)
        }
      } catch (err) {
        setError('Failed to load post')
        console.error('Error loading post:', err)
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-cyber-black flex items-center justify-center p-8">
        <div className="text-neon-cyan font-mono">Loading post...</div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-cyber-black flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="font-display text-glitch-pink text-shadow-neon mb-4">
            {error || 'Post not found'}
          </h1>
          <Link
            to="/journal"
            className="text-neon-cyan hover:text-glitch-pink transition-colors"
          >
            ← Back to Journal
          </Link>
        </div>
      </div>
    )
  }

  const Content = post.content

  return (
    <div className="min-h-screen bg-cyber-black p-8">
      <article className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          to="/journal"
          className="inline-flex items-center text-neon-cyan hover:text-glitch-pink transition-colors mb-8 font-mono text-sm"
        >
          ← Back to Journal
        </Link>

        {/* Post header */}
        <header className="mb-12">
          <h1 className="font-display text-5xl text-neon-cyan text-shadow-neon mb-6">
            {post.frontmatter.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
            <time dateTime={post.frontmatter.date}>
              {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>•</span>
            <span className="text-glitch-green">{post.frontmatter.author}</span>
            {post.readingTime && (
              <>
                <span>•</span>
                <span>{post.readingTime}</span>
              </>
            )}
          </div>

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
        </header>

        {/* MDX Content */}
        <div className="prose prose-invert prose-cyan max-w-none">
          <MDXProvider components={mdxComponents}>
            <Content />
          </MDXProvider>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-neon-cyan/20">
          <Link
            to="/journal"
            className="inline-flex items-center text-neon-cyan hover:text-glitch-pink transition-colors font-mono text-sm"
          >
            ← Back to Journal
          </Link>
        </footer>
      </article>
    </div>
  )
}

JournalPost.displayName = 'JournalPost'

export default JournalPost
