import type { Validation } from '@/domain/validations/validation'

export class FormField<T> {
  private _value: T
  private _touched = false
  private _error: string | null = null
  private _validations: Validation<NoInfer<T>>[] = []

  constructor(value: T, validations: Validation<NoInfer<T>>[] = []) {
    this._value = value
    this._validations = validations
    this.validate()
  }

  get value(): T {
    return this._value
  }

  set value(value: T) {
    this._value = value
    this.validate()
  }

  getTouched(): boolean {
    return this._touched
  }

  getError(): string | null {
    return this._error
  }

  getValid(): boolean {
    return this.getError() === null
  }

  touch(): void {
    this._touched = true
    this.validate()
  }

  private validate(): void {
    for (const validation of this._validations) {
      const message = validation.validate(this._value)
      if (message !== null) {
        this._error = message
        return
      }
    }
    this._error = null
  }
}
