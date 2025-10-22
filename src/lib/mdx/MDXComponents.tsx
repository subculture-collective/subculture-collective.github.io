/**
 * Custom MDX Components
 *
 * Override default MDX components with custom styled versions
 */

import type { MDXComponents } from 'mdx/types'

/**
 * Custom code block with syntax highlighting
 */
function Code({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'code'>) {
  const isInline = !className

  if (isInline) {
    return (
      <code
        className="px-1.5 py-0.5 rounded bg-glitch-green/10 text-glitch-green font-mono text-sm border border-glitch-green/20"
        {...props}
      >
        {children}
      </code>
    )
  }

  return (
    <code className={className} {...props}>
      {children}
    </code>
  )
}

/**
 * Custom pre block for code blocks
 */
function Pre({ children, ...props }: React.ComponentPropsWithoutRef<'pre'>) {
  return (
    <pre
      className="overflow-x-auto p-4 rounded-lg bg-cyber-black border border-neon-cyan/20 my-6 text-sm"
      {...props}
    >
      {children}
    </pre>
  )
}

/**
 * Custom blockquote component
 */
function Blockquote({
  children,
  ...props
}: React.ComponentPropsWithoutRef<'blockquote'>) {
  return (
    <blockquote
      className="border-l-4 border-neon-cyan pl-4 py-2 my-6 italic text-gray-300 bg-neon-cyan/5"
      {...props}
    >
      {children}
    </blockquote>
  )
}

/**
 * Custom heading components with proper styling
 */
function H1({ children, ...props }: React.ComponentPropsWithoutRef<'h1'>) {
  return (
    <h1
      className="font-display text-4xl text-neon-cyan text-shadow-neon mb-6 mt-8"
      {...props}
    >
      {children}
    </h1>
  )
}

function H2({ children, ...props }: React.ComponentPropsWithoutRef<'h2'>) {
  return (
    <h2
      className="font-display text-3xl text-glitch-pink text-shadow-neon mb-4 mt-6"
      {...props}
    >
      {children}
    </h2>
  )
}

function H3({ children, ...props }: React.ComponentPropsWithoutRef<'h3'>) {
  return (
    <h3
      className="font-display text-2xl text-glitch-green mb-3 mt-5"
      {...props}
    >
      {children}
    </h3>
  )
}

/**
 * Custom paragraph component
 */
function P({ children, ...props }: React.ComponentPropsWithoutRef<'p'>) {
  return (
    <p className="text-gray-300 leading-relaxed mb-4" {...props}>
      {children}
    </p>
  )
}

/**
 * Custom link component
 */
function A({ children, href, ...props }: React.ComponentPropsWithoutRef<'a'>) {
  const isExternal = href?.startsWith('http')

  return (
    <a
      href={href}
      className="text-neon-cyan hover:text-glitch-pink transition-colors underline decoration-neon-cyan/50 hover:decoration-glitch-pink"
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  )
}

/**
 * Custom list components
 */
function Ul({ children, ...props }: React.ComponentPropsWithoutRef<'ul'>) {
  return (
    <ul
      className="list-disc list-inside text-gray-300 mb-4 space-y-2"
      {...props}
    >
      {children}
    </ul>
  )
}

function Ol({ children, ...props }: React.ComponentPropsWithoutRef<'ol'>) {
  return (
    <ol
      className="list-decimal list-inside text-gray-300 mb-4 space-y-2"
      {...props}
    >
      {children}
    </ol>
  )
}

/**
 * Custom image component with optimization
 */
function Img({ src, alt, ...props }: React.ComponentPropsWithoutRef<'img'>) {
  // For content images in MDX, we use basic img with lazy loading
  // Full OptimizedImage component can be used explicitly when needed
  return (
    <img
      src={src}
      alt={alt || ''}
      loading="lazy"
      decoding="async"
      className="rounded-lg my-6 w-full border border-neon-cyan/20"
      {...props}
    />
  )
}

/**
 * Custom horizontal rule
 */
function Hr({ ...props }: React.ComponentPropsWithoutRef<'hr'>) {
  return <hr className="my-8 border-t border-neon-cyan/20" {...props} />
}

/**
 * Callout/Alert component
 */
interface CalloutProps {
  type?: 'info' | 'warning' | 'error' | 'success'
  children: React.ReactNode
}

export function Callout({ type = 'info', children }: CalloutProps) {
  const colorMap = {
    info: 'border-neon-cyan bg-neon-cyan/10 text-neon-cyan',
    warning: 'border-yellow-500 bg-yellow-500/10 text-yellow-300',
    error: 'border-glitch-pink bg-glitch-pink/10 text-glitch-pink',
    success: 'border-glitch-green bg-glitch-green/10 text-glitch-green',
  }

  return (
    <div className={`border-l-4 p-4 my-6 rounded-r ${colorMap[type]}`}>
      {children}
    </div>
  )
}

/**
 * Export custom MDX component overrides
 */
export const mdxComponents: MDXComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  p: P,
  a: A,
  ul: Ul,
  ol: Ol,
  blockquote: Blockquote,
  code: Code,
  pre: Pre,
  img: Img,
  hr: Hr,
  Callout,
}

export default mdxComponents
