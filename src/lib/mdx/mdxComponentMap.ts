import type { MDXComponents } from 'mdx/types'
import {
  A,
  Blockquote,
  Callout,
  Code,
  H1,
  H2,
  H3,
  Hr,
  Img,
  Ol,
  P,
  Pre,
  Ul,
} from './MDXComponents'

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
