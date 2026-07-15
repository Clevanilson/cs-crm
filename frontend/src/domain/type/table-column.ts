export type TableColumn<T> = {
  key: keyof T & string
  label: string
  formatter?: (value: T[keyof T], row: T) => string
}
