import type { Validation } from './validation'

const NAME_PATTERN = /^([A-Za-z ]){2,255}$/

export class NameValidation implements Validation<string> {
  validate(value: string): string | null {
    if (!NAME_PATTERN.test(value.trim())) {
      return 'Nome inválido'
    }
    return null
  }
}
