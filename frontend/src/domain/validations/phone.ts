import type { Validation } from './validation'

const PHONE_PATTERN = /^\d{11}$/

export class PhoneValidation implements Validation<string> {
  validate(value: string): string | null {
    if (!PHONE_PATTERN.test(value.trim())) {
      return 'Telefone inválido'
    }
    return null
  }
}
