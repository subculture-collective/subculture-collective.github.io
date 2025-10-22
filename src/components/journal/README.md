# Journal Components

This directory contains all components related to the Journal (blog) functionality.

## Components

### PostCard

Individual blog post card component with hover animations and metadata display.

**Features:**

- Cover image with lazy loading and zoom effect on hover
- Title, excerpt, author, date, reading time
- Tag pills with color-coded styling
- Featured post badge
- Responsive sizing (larger for featured posts)
- Glitch overlay effect on hover

**Usage:**

```tsx
import { PostCard } from '@/components/journal'

;<PostCard post={mdxPost} featured={true} />
```

### PostGrid

Responsive grid layout for displaying multiple post cards.

**Features:**

- Separate sections for featured and regular posts
- 1-3 column responsive layout
- Stagger animations on load
- Empty state handling

**Usage:**

```tsx
import { PostGrid } from '@/components/journal'

;<PostGrid posts={posts} featuredSlugs={['welcome-to-subcult']} />
```

### PostFilter

Search, filter, and sort controls for blog posts.

**Features:**

- Search input (searches title, excerpt, author)
- Sort by date (newest/oldest)
- Tag filtering
- Results count display

**Usage:**

```tsx
import { PostFilter } from '@/components/journal'

;<PostFilter
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
```

### TagFilter

Tag filtering UI component (used by PostFilter).

**Features:**

- Shows all available tags
- "All" option to clear filter
- Active state styling

**Usage:**

```tsx
import { TagFilter } from '@/components/journal'

;<TagFilter
  allTags={allTags}
  selectedTag={selectedTag}
  onTagSelect={setSelectedTag}
/>
```

### Pagination

Pagination controls with page numbers and navigation.

**Features:**

- Previous/Next buttons
- Page number buttons
- Ellipsis for large page counts
- Disabled state for boundary pages
- Optional "Load More" mode

**Usage:**

```tsx
import { Pagination } from '@/components/journal'

<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
/>

// Load More mode
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  loadMoreMode={true}
  hasMore={hasMore}
  onLoadMore={handleLoadMore}
/>
```

## Hook

### usePostFilter

Custom hook for filtering, searching, sorting, and paginating blog posts.

**Features:**

- Search filtering
- Tag filtering
- Date sorting (ascending/descending)
- Pagination logic
- Auto-reset to page 1 on filter change

**Usage:**

```tsx
import { usePostFilter } from '@/hooks/usePostFilter'

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
} = usePostFilter({ posts, initialSort: 'date-desc' })
```

## Design

All components follow the cyberpunk/underground aesthetic:

- Neon colors: cyan, magenta, green
- Dark backgrounds
- Glitch effects on hover
- Mono fonts for UI elements
- Display fonts for headings
- Card-based layouts with borders and shadows

## Responsive Breakpoints

- Mobile: 1 column
- Tablet (md): 2 columns
- Desktop (lg): 3 columns
- Featured posts: spans full width on mobile, 2-3 columns on larger screens
