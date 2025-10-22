/**
 * Pagination Component
 *
 * Pagination controls with page numbers and navigation.
 */

import { motion } from 'framer-motion'
import { microInteractions } from '@/utils/animations'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onLoadMore?: () => void
  hasMore?: boolean
  loadMoreMode?: boolean
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  onLoadMore,
  hasMore = false,
  loadMoreMode = false,
}: PaginationProps) {
  // Load More Button Mode
  if (loadMoreMode && hasMore) {
    return (
      <div className="flex justify-center mt-12">
        <motion.button
          className="px-8 py-3 bg-neon-cyan text-cyber-black font-mono text-sm font-bold rounded hover:bg-neon-cyan/90 transition-all"
          onClick={onLoadMore}
          variants={microInteractions.button}
          whileHover="hover"
          whileTap="tap"
        >
          Load More Posts
        </motion.button>
      </div>
    )
  }

  // Regular Pagination Mode
  if (totalPages <= 1) {
    return null
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  // Show max 7 page numbers
  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return pages
    }

    if (currentPage <= 3) {
      return [...pages.slice(0, 5), '...', totalPages]
    }

    if (currentPage >= totalPages - 2) {
      return [1, '...', ...pages.slice(totalPages - 5)]
    }

    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages,
    ]
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      {/* Previous Button */}
      <motion.button
        className={`px-4 py-2 rounded font-mono text-sm transition-all ${
          currentPage === 1
            ? 'bg-deep-gray text-gray-600 cursor-not-allowed'
            : 'bg-deep-gray text-neon-cyan hover:bg-mid-gray'
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variants={microInteractions.button}
        whileHover={currentPage === 1 ? undefined : 'hover'}
        whileTap={currentPage === 1 ? undefined : 'tap'}
      >
        ← Prev
      </motion.button>

      {/* Page Numbers */}
      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${index}`} className="text-gray-500 px-2">
              ...
            </span>
          )
        }

        const pageNum = page as number
        const isActive = pageNum === currentPage

        return (
          <motion.button
            key={pageNum}
            className={`px-4 py-2 rounded font-mono text-sm transition-all ${
              isActive
                ? 'bg-neon-cyan text-cyber-black'
                : 'bg-deep-gray text-gray-300 hover:bg-mid-gray'
            }`}
            onClick={() => onPageChange(pageNum)}
            variants={microInteractions.button}
            whileHover={isActive ? undefined : 'hover'}
            whileTap={isActive ? undefined : 'tap'}
          >
            {pageNum}
          </motion.button>
        )
      })}

      {/* Next Button */}
      <motion.button
        className={`px-4 py-2 rounded font-mono text-sm transition-all ${
          currentPage === totalPages
            ? 'bg-deep-gray text-gray-600 cursor-not-allowed'
            : 'bg-deep-gray text-neon-cyan hover:bg-mid-gray'
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variants={microInteractions.button}
        whileHover={currentPage === totalPages ? undefined : 'hover'}
        whileTap={currentPage === totalPages ? undefined : 'tap'}
      >
        Next →
      </motion.button>
    </div>
  )
}

Pagination.displayName = 'Pagination'
