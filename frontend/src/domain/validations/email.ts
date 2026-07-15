import type { Validation } from './validation'

const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export class EmailValidation implements Validation<string> {
  validate(value: string): string | null {
    if (!EMAIL_PATTERN.test(value.trim())) {
      return 'E-mail inválido'
    }
    return null
  }
}
