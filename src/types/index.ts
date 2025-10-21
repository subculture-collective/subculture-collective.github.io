/**
 * Type Definitions Barrel Export
 * 
 * Central export point for all type definitions used throughout the application.
 * Import types from this file to maintain consistency and ease of refactoring.
 * 
 * @example
 * ```ts
 * import type { BlogPost, CreatorProfile } from '@/types'
 * import type { ComponentProps, ButtonProps } from '@/types'
 * import type { GlitchType, PageTransitionType } from '@/types'
 * ```
 */

// Content types
export type {
  BrandedId,
  BlogPostId,
  CreatorId,
  ProjectId,
  SEOMetadata,
  BlogPostAuthor,
  SocialLink,
  BlogTag,
  BlogPost,
  BlogPostPreview,
  CreatorProfile,
  Project,
  ProjectPreview,
} from './content'

// Component types
export type {
  BaseComponentProps,
  TestableProps,
  ComponentProps,
  DisableableProps,
  LoadableProps,
  ButtonProps,
  LinkProps,
  ImageProps,
  CardProps,
  LayoutProps,
  FormFieldProps,
  ModalProps,
  ListProps,
  GridProps,
} from './components'

// Animation types
export type {
  TransitionType,
  PageTransitionType,
  GlitchType,
  AnimationState,
  AnimationVariants,
  AnimationConfig,
  MotionPreferences,
  StaggerConfig,
  TransitionConfig,
  AnimatedComponentProps,
  GlitchConfig,
  SlideDirection,
  FadeConfig,
  SlideConfig,
  ScaleConfig,
  ThemeAnimationConfig,
} from './animations'

// Utility types
export type {
  DeepPartial,
  DeepRequired,
  DeepReadonly,
  PickByType,
  OmitByType,
  PartialBy,
  RequiredBy,
  Nullable,
  Maybe,
  VoidFunction,
  UnaryFunction,
  AsyncResult,
  Result,
  Tuple,
  OptionalKeys,
  RequiredKeys,
  ArrayElement,
  AsyncReturnType,
  Merge,
  UnionToIntersection,
  ObjectKeys,
  ObjectValues,
  ObjectEntries,
  Brand,
  Unbrand,
  ReadonlyArray,
  Mutable,
  DeepMutable,
  TypeGuard,
  Predicate,
  Comparator,
  Mapper,
  Reducer,
} from './utils'
