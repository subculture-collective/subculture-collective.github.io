# TypeScript Type System Guide

This document describes the TypeScript configuration, type definitions, and best practices for the Subculture Collective project.

## Table of Contents

- [TypeScript Configuration](#typescript-configuration)
- [Type Definitions](#type-definitions)
- [Path Aliases](#path-aliases)
- [Best Practices](#best-practices)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)

## TypeScript Configuration

### Strict Mode Settings

The project uses strict TypeScript configuration for maximum type safety:

```json
{
  "strict": true,                          // Enable all strict type checking
  "noUncheckedIndexedAccess": true,       // Require checking for undefined on index access
  "noImplicitOverride": true,              // Require explicit override keyword
  "noFallthroughCasesInSwitch": true,     // Prevent fallthrough in switch statements
  "noUnusedLocals": true,                  // Report unused local variables
  "noUnusedParameters": true               // Report unused function parameters
}
```

### Notable Configuration Decisions

#### exactOptionalPropertyTypes

**Status:** Disabled

**Reason:** This setting is incompatible with Framer Motion's `MotionStyle` type definitions. While it provides excellent type safety, it prevents passing merged style objects to motion components, which is a common pattern in our application.

**Impact:** When using optional properties, TypeScript won't differentiate between `property?: T` and `property?: T | undefined`. This is generally acceptable for our use case.

## Type Definitions

All type definitions are located in `src/types/` and organized by domain:

### src/types/content.ts

Defines types for content structures:

- **Branded IDs**: Type-safe unique identifiers
  ```typescript
  type BlogPostId = BrandedId<'BlogPost'>
  type CreatorId = BrandedId<'Creator'>
  type ProjectId = BrandedId<'Project'>
  ```

- **Content Types**:
  - `BlogPost` - Blog post structure with full metadata
  - `BlogPostPreview` - Lightweight preview for lists
  - `CreatorProfile` - Artist/creator profile information
  - `Project` - Project details and metadata
  - `ProjectPreview` - Lightweight project preview
  - `SEOMetadata` - SEO and social media metadata
  - `SocialLink` - Social media link structure

### src/types/components.ts

Defines reusable component prop types:

- **Base Props**:
  ```typescript
  interface BaseComponentProps {
    children?: ReactNode
    className?: string
    style?: CSSProperties
  }
  ```

- **Component Types**:
  - `ButtonProps` - Button component configuration
  - `LinkProps` - Link component props
  - `ImageProps` - Image with lazy loading support
  - `CardProps` - Card component variants
  - `ModalProps` - Modal/dialog configuration
  - `FormFieldProps` - Form field props

### src/types/animations.ts

Defines Framer Motion animation types:

- **Animation Types**:
  - `GlitchType` - Types of glitch effects
  - `PageTransitionType` - Page transition variants
  - `AnimationState` - Animation state names
  - `AnimationVariants` - Complete animation variant set

- **Configuration Types**:
  - `AnimationConfig` - Complete animation configuration
  - `GlitchConfig` - Glitch-specific configuration
  - `StaggerConfig` - Stagger animation settings
  - `ThemeAnimationConfig` - Theme-level animation settings

### src/types/utils.ts

Utility types and generic type helpers:

- **Transform Types**:
  - `DeepPartial<T>` - Make all properties optional recursively
  - `DeepRequired<T>` - Make all properties required recursively
  - `DeepReadonly<T>` - Make all properties readonly recursively
  - `PartialBy<T, K>` - Make specific properties optional
  - `RequiredBy<T, K>` - Make specific properties required

- **Utility Types**:
  - `Nullable<T>` - T | null
  - `Maybe<T>` - T | null | undefined
  - `Result<T, E>` - Type-safe error handling
  - `ArrayElement<T>` - Extract array element type
  - `AsyncReturnType<T>` - Extract async function return type

- **Type Helpers**:
  - `Brand<T, B>` - Create branded types for primitives
  - `Merge<A, B>` - Merge two types with B overriding A
  - `TypeGuard<T>` - Type guard function type
  - `Predicate<T>`, `Comparator<T>`, `Mapper<T, U>`, `Reducer<T, U>`

### src/types/index.ts

Barrel export file for convenient imports:

```typescript
import type { BlogPost, CreatorProfile } from '@/types'
import type { ButtonProps, CardProps } from '@/types'
import type { GlitchType, AnimationConfig } from '@/types'
```

## Path Aliases

The project uses TypeScript path aliases for cleaner imports:

```typescript
// ❌ Avoid relative imports
import GlitchText from '../../components/motion/GlitchText'

// ✅ Use path aliases
import GlitchText from '@/components/motion/GlitchText'
```

### Available Aliases

- `@/*` → `./src/*`
- `@/components/*` → `./src/components/*`
- `@/utils/*` → `./src/utils/*`
- `@/types/*` → `./src/types/*`
- `@/hooks/*` → `./src/hooks/*`
- `@/pages/*` → `./src/pages/*`

### Configuration

Path aliases are configured in two places:

1. **TypeScript** (`tsconfig.app.json`):
   ```json
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": {
         "@/*": ["./src/*"]
       }
     }
   }
   ```

2. **Vite** (`vite.config.ts`):
   ```typescript
   export default defineConfig({
     resolve: {
       alias: {
         '@': path.resolve(__dirname, './src')
       }
     }
   })
   ```

## Best Practices

### 1. Always Import Types with `type` Keyword

```typescript
// ✅ Good - explicit type import
import type { BlogPost } from '@/types'

// ❌ Avoid - value import for types
import { BlogPost } from '@/types'
```

### 2. Use Branded Types for IDs

```typescript
// ✅ Good - type-safe IDs
type UserId = BrandedId<'User'>
const userId: UserId = 'user-123' as UserId

// ❌ Avoid - plain strings
const userId: string = 'user-123'
```

### 3. Prefer Readonly Arrays for Immutable Data

```typescript
// ✅ Good - readonly array
interface BlogPost {
  tags?: readonly string[]
}

// ❌ Avoid - mutable array
interface BlogPost {
  tags?: string[]
}
```

### 4. Use Utility Types for Transformations

```typescript
// ✅ Good - use utility types
type PartialBlogPost = Partial<BlogPost>
type RequiredSEO = Required<SEOMetadata>

// ❌ Avoid - manual redefinition
type PartialBlogPost = {
  id?: BlogPostId
  title?: string
  // ... repeat all fields
}
```

### 5. Type Event Handlers Explicitly

```typescript
// ✅ Good - typed event handler
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault()
}

// ❌ Avoid - implicit any
const handleClick = (event) => {
  event.preventDefault()
}
```

### 6. Use Discriminated Unions for State

```typescript
// ✅ Good - discriminated union
type LoadingState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error }

// ❌ Avoid - boolean flags
type LoadingState<T> = {
  loading: boolean
  error?: Error
  data?: T
}
```

### 7. Avoid `any`, Use `unknown` Instead

```typescript
// ✅ Good - use unknown for type-safe handling
const parseJSON = (text: string): unknown => {
  return JSON.parse(text)
}

// Type guard for validation
function isBlogPost(value: unknown): value is BlogPost {
  return typeof value === 'object' && value !== null && 'id' in value
}

// ❌ Avoid - any defeats the purpose of TypeScript
const parseJSON = (text: string): any => {
  return JSON.parse(text)
}
```

## Common Patterns

### Pattern 1: Component Props with Variants

```typescript
interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onClick?: () => void
}

function Button({ variant = 'primary', size = 'md', ...props }: ButtonProps) {
  // Implementation
}
```

### Pattern 2: Generic List Components

```typescript
interface ListProps<T> {
  items: readonly T[]
  renderItem: (item: T, index: number) => ReactNode
  keyExtractor?: (item: T) => string
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <div>
      {items.map((item, index) => (
        <div key={keyExtractor?.(item) ?? index}>
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  )
}
```

### Pattern 3: Conditional Props with Type Guards

```typescript
type CardProps =
  | { variant: 'link'; href: string }
  | { variant: 'button'; onClick: () => void }
  | { variant: 'static' }

function Card(props: CardProps) {
  if (props.variant === 'link') {
    return <a href={props.href}>...</a>
  }
  // TypeScript knows props.variant is not 'link' here
}
```

### Pattern 4: Async Operations with Result Type

```typescript
async function fetchBlogPost(id: BlogPostId): Promise<Result<BlogPost, Error>> {
  try {
    const response = await fetch(`/api/posts/${id}`)
    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    return { success: false, error: error as Error }
  }
}

// Usage
const result = await fetchBlogPost(postId)
if (result.success) {
  console.log(result.data)
} else {
  console.error(result.error)
}
```

## Troubleshooting

### Issue: Import path alias not working

**Solution:** Ensure both TypeScript and Vite configs have matching path aliases. Restart the dev server after configuration changes.

### Issue: Type errors with Framer Motion

**Solution:** Framer Motion has complex type definitions. If you encounter type errors:
1. Ensure you're using compatible prop combinations
2. Consider using `as const` for literal values
3. Use type assertions as a last resort: `as MotionStyle`

### Issue: `noUncheckedIndexedAccess` causing false positives

**Solution:** This setting requires you to check for `undefined` when accessing array/object properties:

```typescript
// With noUncheckedIndexedAccess
const items = ['a', 'b', 'c']
const first = items[0] // Type: string | undefined

// You must check before use
if (first) {
  console.log(first.toUpperCase())
}

// Or use optional chaining
console.log(first?.toUpperCase())
```

### Issue: Circular type dependencies

**Solution:** Break circular dependencies by:
1. Moving shared types to a separate file
2. Using type aliases instead of interfaces
3. Using generic types to defer resolution

## Additional Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Framer Motion Types](https://www.framer.com/motion/component/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

## Contributing

When adding new types:

1. Place them in the appropriate file in `src/types/`
2. Export them from `src/types/index.ts`
3. Use descriptive names and add JSDoc comments
4. Follow existing patterns and conventions
5. Prefer readonly arrays and exact types
6. Add examples in this guide if introducing new patterns
