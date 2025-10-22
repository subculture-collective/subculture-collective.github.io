/**
 * usePostFilter Hook
 *
 * Custom hook for filtering, searching, and sorting blog posts.
 */

import { useState, useMemo, useEffect } from 'react'
import type { MDXPost } from '@/types/content'
import type { SortOption } from '@/components/journal/PostFilter'

interface UsePostFilterOptions {
  posts: MDXPost[]
  initialSort?: SortOption
}

interface UsePostFilterReturn {
  filteredPosts: MDXPost[]
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedTag: string | null
  setSelectedTag: (tag: string | null) => void
  sortBy: SortOption
  setSortBy: (sort: SortOption) => void
  allTags: string[]
  currentPage: number
  setCurrentPage: (page: number) => void
  postsPerPage: number
  setPostsPerPage: (perPage: number) => void
  paginatedPosts: MDXPost[]
  totalPages: number
}

export function usePostFilter({
  posts,
  initialSort = 'date-desc',
}: UsePostFilterOptions): UsePostFilterReturn {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<SortOption>(initialSort)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(9)

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>()
    posts.forEach(post => {
      post.frontmatter.tags.forEach(tag => tagsSet.add(tag))
    })
    return Array.from(tagsSet).sort()
  }, [posts])

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let filtered = [...posts]

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        post =>
          post.frontmatter.title.toLowerCase().includes(query) ||
          post.frontmatter.excerpt.toLowerCase().includes(query) ||
          post.frontmatter.author.toLowerCase().includes(query)
      )
    }

    // Filter by tag
    if (selectedTag) {
      filtered = filtered.filter(post =>
        post.frontmatter.tags.some(
          tag => tag.toLowerCase() === selectedTag.toLowerCase()
        )
      )
    }

    // Sort posts
    filtered.sort((a, b) => {
      const dateA = new Date(a.frontmatter.date).getTime()
      const dateB = new Date(b.frontmatter.date).getTime()

      if (sortBy === 'date-desc') {
        return dateB - dateA
      } else {
        return dateA - dateB
      }
    })

    return filtered
  }, [posts, searchQuery, selectedTag, sortBy])

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  // Get posts for current page
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage
    const endIndex = startIndex + postsPerPage
    return filteredPosts.slice(startIndex, endIndex)
  }, [filteredPosts, currentPage, postsPerPage])

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedTag, sortBy])

  return {
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
    postsPerPage,
    setPostsPerPage,
    paginatedPosts,
    totalPages,
  }
}
