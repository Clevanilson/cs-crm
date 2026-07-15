import type { Validation } from './validation'

export class RequiredValidation implements Validation<unknown> {
  validate(value: unknown): string | null {
    const message = 'Campo obrigatório'
    if (value === null || value === undefined) {
      return message
    }
    if (typeof value === 'string' && value.trim() === '') {
      return message
    }
    return null
  }
}
