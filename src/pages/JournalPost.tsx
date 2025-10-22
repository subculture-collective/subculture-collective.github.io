import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getMdxPost, getMdxPosts } from '@/lib/mdx'
import type { MDXPost } from '@/types/content'
import PostHeader from '@/components/journal/PostHeader'
import PostContent from '@/components/journal/PostContent'
import TableOfContents from '@/components/journal/TableOfContents'
import PostFooter from '@/components/journal/PostFooter'
import RelatedPosts from '@/components/journal/RelatedPosts'
import ReadingProgress from '@/components/journal/ReadingProgress'
import SEO from '@/components/journal/SEO'

function JournalPost() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<MDXPost | null>(null)
  const [allPosts, setAllPosts] = useState<MDXPost[]>([])
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
        const [loadedPost, posts] = await Promise.all([
          getMdxPost(slug),
          getMdxPosts(),
        ])

        if (!loadedPost) {
          setError('Post not found')
        } else {
          setPost(loadedPost)
          setAllPosts(posts)
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

  // Get current post index for prev/next navigation
  const currentIndex = allPosts.findIndex(p => p.slug === slug)
  const previousPost =
    currentIndex >= 0 && currentIndex < allPosts.length - 1
      ? {
          slug: allPosts[currentIndex + 1]!.slug,
          title: allPosts[currentIndex + 1]!.frontmatter.title,
        }
      : undefined
  const nextPost =
    currentIndex > 0
      ? {
          slug: allPosts[currentIndex - 1]!.slug,
          title: allPosts[currentIndex - 1]!.frontmatter.title,
        }
      : undefined

  return (
    <>
      {/* SEO Meta Tags */}
      <SEO frontmatter={post.frontmatter} slug={slug || ''} />

      {/* Reading Progress Indicator */}
      <ReadingProgress />

      <div className="min-h-screen bg-cyber-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb / Back Link */}
          <Link
            to="/journal"
            className="inline-flex items-center text-neon-cyan hover:text-glitch-pink transition-colors mb-8 font-mono text-sm"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Journal
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 lg:gap-12">
            {/* Main Content */}
            <article className="min-w-0">
              {/* Post Header */}
              <PostHeader
                frontmatter={post.frontmatter}
                readingTime={post.readingTime}
              />

              {/* Post Content */}
              <PostContent content={post.content} />

              {/* Related Posts */}
              {allPosts.length > 1 && (
                <RelatedPosts
                  currentSlug={slug || ''}
                  allPosts={allPosts}
                  maxPosts={3}
                />
              )}

              {/* Post Footer */}
              <PostFooter
                frontmatter={post.frontmatter}
                previousPost={previousPost}
                nextPost={nextPost}
              />
            </article>

            {/* Sidebar: Table of Contents */}
            <aside className="lg:block">
              <TableOfContents mobileCollapsible={true} />
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}

JournalPost.displayName = 'JournalPost'

export default JournalPost
