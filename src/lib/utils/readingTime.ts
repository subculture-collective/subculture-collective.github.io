/**
 * Reading Time Utilities
 *
 * Calculate reading time for articles based on word count
 */

/**
 * Calculate reading time based on word count
 * @param text - The text content to calculate reading time for
 * @returns Reading time in format "X min read"
 */
export function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200
  const wordCount = text.trim().split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}

/**
 * Extract content from raw MDX file (excluding frontmatter)
 * @param rawContent - The raw MDX file content
 * @returns The content without frontmatter
 */
export function extractMdxContent(rawContent: string): string {
  // Match and remove the frontmatter export block
  const frontmatterRegex =
    /^export\s+const\s+frontmatter\s*=\s*\{[\s\S]*?\n\}\s*\n/m
  const contentWithoutFrontmatter = rawContent.replace(frontmatterRegex, '')

  // Remove import statements
  const importRegex = /^import\s+.*?\n/gm
  const contentWithoutImports = contentWithoutFrontmatter.replace(
    importRegex,
    ''
  )

  // Remove JSX tags and components (basic cleanup)
  const contentWithoutJsx = contentWithoutImports
    .replace(/<[^>]+>/g, ' ') // Remove JSX tags
    .replace(/\{[^}]+\}/g, ' ') // Remove JSX expressions

  return contentWithoutJsx.trim()
}
