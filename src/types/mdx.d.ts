declare module '*.mdx' {
  import type { MDXProps } from 'mdx/types'
  export default function MDXContent(props: MDXProps): JSX.Element
  export const frontmatter: {
    title: string
    date: string
    author: string
    tags: string[]
    excerpt: string
    coverImage?: string
    description?: string
    keywords?: string[]
  }
}
