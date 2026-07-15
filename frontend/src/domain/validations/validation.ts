export interface Validation<T = unknown> {
  validate(value: T): string | null
}
