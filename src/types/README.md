# Type Definitions

This directory contains all TypeScript type definitions for the project.

## Quick Reference

### Import Types

```typescript
// Import from the barrel export
import type { BlogPost, ButtonProps, GlitchType, DeepPartial } from '@/types'

// Or import from specific files
import type { BlogPost } from '@/types/content'
import type { ButtonProps } from '@/types/components'
```

## Files

### 📄 content.ts

Content-related types for blog posts, creators, projects, and SEO.

**Key Types:**

- `BlogPost`, `BlogPostPreview` - Blog post structures
- `CreatorProfile` - Artist/creator profiles
- `Project`, `ProjectPreview` - Project information
- `SEOMetadata` - SEO and social media metadata
- Branded ID types: `BlogPostId`, `CreatorId`, `ProjectId`

### 📄 components.ts

Reusable component prop types and interfaces.

**Key Types:**

- `BaseComponentProps` - Base props for most components
- `ButtonProps`, `LinkProps`, `ImageProps` - Common component props
- `CardProps`, `ModalProps`, `FormFieldProps` - UI component props
- `ListProps<T>`, `GridProps` - Layout component props

### 📄 animations.ts

Framer Motion animation configurations and types.

**Key Types:**

- `GlitchType`, `PageTransitionType` - Animation variants
- `AnimationConfig`, `AnimationVariants` - Configuration types
- `GlitchConfig`, `StaggerConfig` - Specific animation configs
- `AnimatedComponentProps` - Props for animated components

### 📄 utils.ts

Utility types and generic type helpers.

**Key Types:**

- **Transform Types**: `DeepPartial<T>`, `DeepRequired<T>`, `PartialBy<T, K>`
- **Safety Types**: `Nullable<T>`, `Maybe<T>`, `Result<T, E>`
- **Array Types**: `ArrayElement<T>`, `ReadonlyArray<T>`
- **Branding**: `Brand<T, B>`, `BrandedId<T>`
- **Functions**: `TypeGuard<T>`, `Predicate<T>`, `Mapper<T, U>`

### 📄 index.ts

Barrel export file - re-exports all types for convenient importing.

## Usage Examples

### Example 1: Blog Post

```typescript
import type { BlogPost, BlogPostPreview } from '@/types'

const post: BlogPost = {
  id: 'post-1' as BlogPostId,
  slug: 'my-first-post',
  title: 'My First Post',
  excerpt: 'This is an excerpt',
  content: 'Full content here...',
  author: {
    id: 'creator-1' as CreatorId,
    name: 'John Doe',
  },
  publishedAt: new Date(),
}

const preview: BlogPostPreview = {
  id: post.id,
  slug: post.slug,
  title: post.title,
  excerpt: post.excerpt,
  author: { name: post.author.name },
  publishedAt: post.publishedAt,
}
```

### Example 2: Component Props

```typescript
import type { ButtonProps } from '@/types'

function Button({ variant = 'primary', size = 'md', children, ...props }: ButtonProps) {
  return (
    <button className={`btn-${variant} btn-${size}`} {...props}>
      {children}
    </button>
  )
}
```

### Example 3: Animation Configuration

```typescript
import type { GlitchConfig, AnimationConfig } from '@/types'

const glitchConfig: GlitchConfig = {
  type: 'rgbSplit',
  intensity: 'high',
  frequency: 2,
  duration: 0.3,
  triggerOnHover: true,
}

const animConfig: AnimationConfig = {
  variants: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  initial: 'initial',
  animate: 'animate',
}
```

### Example 4: Utility Types

```typescript
import type { DeepPartial, Result, Brand } from '@/types'

// Make all properties optional recursively
type PartialBlogPost = DeepPartial<BlogPost>

// Type-safe error handling
async function fetchData(): Promise<Result<BlogPost, Error>> {
  try {
    const data = await fetch('/api/post')
    return { success: true, data }
  } catch (error) {
    return { success: false, error: error as Error }
  }
}

// Branded types for IDs
type UserId = Brand<string, 'User'>
const userId: UserId = 'user-123' as UserId
```

## Best Practices

1. **Always use `type` imports**

   ```typescript
   import type { BlogPost } from '@/types'
   ```

2. **Import from barrel export**

   ```typescript
   import type { BlogPost, ButtonProps } from '@/types'
   ```

3. **Use branded types for IDs**

   ```typescript
   const id: BlogPostId = 'post-1' as BlogPostId
   ```

4. **Prefer readonly arrays**

   ```typescript
   tags?: readonly string[]
   ```

5. **Use utility types for transformations**
   ```typescript
   type PartialProps = Partial<ButtonProps>
   ```

## Documentation

For complete documentation, see [TYPESCRIPT_GUIDE.md](../../TYPESCRIPT_GUIDE.md) in the project root.
