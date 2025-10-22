/**
 * PostFilter Component
 *
 * Search, filter, and sort controls for the blog posts.
 */

import { motion } from 'framer-motion'
import { microInteractions } from '@/utils/animations'
import TagFilter from './TagFilter'

export type SortOption = 'date-desc' | 'date-asc'

interface PostFilterProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  sortBy: SortOption
  onSortChange: (sort: SortOption) => void
  allTags: string[]
  selectedTag: string | null
  onTagSelect: (tag: string | null) => void
  totalPosts: number
  filteredPostsCount: number
}

export default function PostFilter({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  allTags,
  selectedTag,
  onTagSelect,
  totalPosts,
  filteredPostsCount,
}: PostFilterProps) {
  return (
    <div className="mb-8 space-y-6">
      {/* Search Bar */}
      <div className="space-y-2">
        <label
          htmlFor="post-search"
          className="font-mono text-gray-400 text-sm"
        >
          Search posts:
        </label>
        <input
          id="post-search"
          type="text"
          placeholder="Search by title or content..."
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          className="w-full px-4 py-3 bg-deep-gray text-gray-200 border border-neon-cyan/30 rounded font-mono text-sm focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all placeholder:text-gray-500"
        />
      </div>

      {/* Sort Controls */}
      <div className="flex flex-wrap gap-3 items-center">
        <span className="font-mono text-gray-400 text-sm">Sort by:</span>
        <div className="flex gap-2">
          <motion.button
            className={`px-4 py-2 rounded font-mono text-sm transition-all ${
              sortBy === 'date-desc'
                ? 'bg-neon-cyan text-cyber-black'
                : 'bg-deep-gray text-gray-300 hover:bg-mid-gray'
            }`}
            onClick={() => onSortChange('date-desc')}
            variants={microInteractions.button}
            whileHover="hover"
            whileTap="tap"
          >
            Newest First
          </motion.button>
          <motion.button
            className={`px-4 py-2 rounded font-mono text-sm transition-all ${
              sortBy === 'date-asc'
                ? 'bg-neon-cyan text-cyber-black'
                : 'bg-deep-gray text-gray-300 hover:bg-mid-gray'
            }`}
            onClick={() => onSortChange('date-asc')}
            variants={microInteractions.button}
            whileHover="hover"
            whileTap="tap"
          >
            Oldest First
          </motion.button>
        </div>
      </div>

      {/* Tag Filter */}
      <TagFilter
        allTags={allTags}
        selectedTag={selectedTag}
        onTagSelect={onTagSelect}
      />

      {/* Results Count */}
      {(searchQuery || selectedTag) && (
        <div className="text-sm font-mono text-gray-400 pt-2 border-t border-mid-gray">
          Showing {filteredPostsCount} of {totalPosts} posts
          {searchQuery && (
            <span>
              {' '}
              matching "<span className="text-neon-cyan">{searchQuery}</span>"
            </span>
          )}
          {selectedTag && (
            <span>
              {' '}
              tagged with{' '}
              <span className="text-glitch-green">#{selectedTag}</span>
            </span>
          )}
        </div>
      )}
    </div>
  )
}

PostFilter.displayName = 'PostFilter'
