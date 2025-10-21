/**
 * Utility Type Definitions
 * 
 * Shared utility types and generic type helpers used throughout the application.
 */

/**
 * Make all properties of T optional recursively
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

/**
 * Make all properties of T required recursively
 */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P]
}

/**
 * Make all properties of T readonly recursively
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

/**
 * Extract properties from T that are of type U
 */
export type PickByType<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P]
}

/**
 * Exclude properties from T that are of type U
 */
export type OmitByType<T, U> = {
  [P in keyof T as T[P] extends U ? never : P]: T[P]
}

/**
 * Make specific properties of T optional
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * Make specific properties of T required
 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

/**
 * Nullable type
 */
export type Nullable<T> = T | null

/**
 * Maybe type (nullable or undefined)
 */
export type Maybe<T> = T | null | undefined

/**
 * Type for a function that returns void
 */
export type VoidFunction = () => void

/**
 * Type for a function with a single parameter
 */
export type UnaryFunction<T, R> = (arg: T) => R

/**
 * Type for async operations
 */
export type AsyncResult<T> = Promise<T>

/**
 * Result type for operations that can fail
 */
export type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E }

/**
 * Tuple of a specific length
 */
export type Tuple<T, N extends number> = N extends N
  ? number extends N
    ? T[]
    : _TupleOf<T, N, []>
  : never

type _TupleOf<T, N extends number, R extends readonly unknown[]> = R['length'] extends N
  ? R
  : _TupleOf<T, N, readonly [T, ...R]>

/**
 * Extract keys from object where value is optional
 */
export type OptionalKeys<T> = {
  [K in keyof T]-?: undefined extends T[K] ? K : never
}[keyof T]

/**
 * Extract keys from object where value is required
 */
export type RequiredKeys<T> = {
  [K in keyof T]-?: undefined extends T[K] ? never : K
}[keyof T]

/**
 * Extract the value type of an array
 */
export type ArrayElement<T> = T extends readonly (infer U)[] ? U : never

/**
 * Extract the return type of an async function
 */
export type AsyncReturnType<T extends (...args: readonly unknown[]) => Promise<unknown>> = T extends (
  ...args: readonly unknown[]
) => Promise<infer R>
  ? R
  : never

/**
 * Merge two types, with properties from B overriding properties from A
 */
export type Merge<A, B> = Omit<A, keyof B> & B

/**
 * Union to intersection type converter
 */
export type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never

/**
 * Type-safe Object.keys
 */
export type ObjectKeys<T> = keyof T

/**
 * Type-safe Object.values
 */
export type ObjectValues<T> = T[keyof T]

/**
 * Type-safe Object.entries
 */
export type ObjectEntries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T]

/**
 * Branded primitive types for type safety
 */
export type Brand<T, B> = T & { __brand: B }

/**
 * Remove brand from branded type
 */
export type Unbrand<T> = T extends Brand<infer U, unknown> ? U : T

/**
 * Readonly array type alias
 */
export type ReadonlyArray<T> = readonly T[]

/**
 * Mutable version of readonly type
 */
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

/**
 * Deeply mutable version of readonly type
 */
export type DeepMutable<T> = {
  -readonly [P in keyof T]: T[P] extends object ? DeepMutable<T[P]> : T[P]
}

/**
 * Type guard helper
 */
export type TypeGuard<T> = (value: unknown) => value is T

/**
 * Predicate function type
 */
export type Predicate<T> = (value: T) => boolean

/**
 * Comparator function type
 */
export type Comparator<T> = (a: T, b: T) => number

/**
 * Mapper function type
 */
export type Mapper<T, U> = (value: T, index: number) => U

/**
 * Reducer function type
 */
export type Reducer<T, U> = (accumulator: U, currentValue: T, index: number) => U
