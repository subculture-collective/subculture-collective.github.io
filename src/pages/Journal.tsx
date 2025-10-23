import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getMdxPosts } from '@/lib/mdx'
import type { MDXPost } from '@/types/content'
import { usePostFilter } from '@/hooks/usePostFilter'
import PostGrid from '@/components/journal/PostGrid'
import PostFilter from '@/components/journal/PostFilter'
import Pagination from '@/components/journal/Pagination'
import GlitchText from '@/components/motion/GlitchText'
import SEOHead from '@/components/seo/SEOHead'
import { pageSEO } from '@/data/seo-config'
import { generateBreadcrumbSchema } from '@/utils/seo'
import { entranceAnimations } from '@/utils/animations'

function Journal() {
  const [posts, setPosts] = useState<MDXPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Featured post slugs (can be managed via frontmatter or config)
  const featuredSlugs = ['welcome-to-subcult']

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

  // Use the filtering hook
  const {
    filteredPosts,
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    sortBy,
    setSortBy,
    allTags,
    currentPage,
    setCurrentPage,
    paginatedPosts,
    totalPages,
  } = usePostFilter({ posts })

  if (loading) {
    return (
      <div className="min-h-screen bg-cyber-black flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin" />
          <div className="text-neon-cyan font-mono">Loading posts...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cyber-black flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-glitch-pink font-mono text-xl mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-neon-cyan text-cyber-black font-mono text-sm rounded hover:bg-neon-cyan/90 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const breadcrumb = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Journal', url: '/journal' },
  ])

  return (
    <>
      <SEOHead pageSEO={pageSEO.journal!} structuredData={breadcrumb} />
      <div className="min-h-screen bg-cyber-black p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="mb-12"
            variants={entranceAnimations.fadeInUp}
            initial="initial"
            animate="animate"
          >
            <GlitchText
              as="h1"
              type="rgbSplit"
              className="font-display text-4xl md:text-5xl lg:text-6xl text-neon-cyan text-shadow-neon mb-4"
              triggerOnHover
            >
              Journal
            </GlitchText>
            <p className="font-sans text-gray-400 text-base md:text-lg">
              Thoughts from the underground
            </p>
          </motion.div>

          {/* Filters */}
          {posts.length > 0 && (
            <motion.div
              variants={entranceAnimations.fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.1 }}
            >
              <PostFilter
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                sortBy={sortBy}
                onSortChange={setSortBy}
                allTags={allTags}
                selectedTag={selectedTag}
                onTagSelect={setSelectedTag}
                totalPosts={posts.length}
                filteredPostsCount={filteredPosts.length}
              />
            </motion.div>
          )}

          {/* Posts Grid */}
          <motion.div
            variants={entranceAnimations.fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
          >
            <PostGrid posts={paginatedPosts} featuredSlugs={featuredSlugs} />
          </motion.div>

          {/* Pagination */}
          {filteredPosts.length > 0 && (
            <motion.div
              variants={entranceAnimations.fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.3 }}
            >
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}

Journal.displayName = 'Journal'

export default Journal
