import { describe, it, expect, beforeEach } from 'vitest'
import { PhoneValidation } from './phone'

describe(PhoneValidation.name, () => {
  let sut: PhoneValidation

  it('should return null for a valid phone', () => {
    const result = sut.validate('79988334455')
    expect(result).toBeNull()
  })

  it('should return null for a trimmed valid phone', () => {
    const result = sut.validate('  79988334455  ')
    expect(result).toBeNull()
  })

  it('should return error for a phone with less than 11 digits', () => {
    const result = sut.validate('7998833445')
    expect(result).toBe('Telefone inválido')
  })

  it('should return error for a phone with more than 11 digits', () => {
    const result = sut.validate('799883344557')
    expect(result).toBe('Telefone inválido')
  })

  it('should return error for a phone with letters', () => {
    const result = sut.validate('7998833445a')
    expect(result).toBe('Telefone inválido')
  })

  it('should return error for an empty phone', () => {
    const result = sut.validate('')
    expect(result).toBe('Telefone inválido')
  })

  beforeEach(() => {
    sut = new PhoneValidation()
  })
})
