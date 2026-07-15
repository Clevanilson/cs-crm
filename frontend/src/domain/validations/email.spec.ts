import { describe, it, expect, beforeEach } from 'vitest'
import { EmailValidation } from './email'

describe(EmailValidation.name, () => {
  let sut: EmailValidation

  it('should return null for a valid email', () => {
    const result = sut.validate('john.doe@example.com')
    expect(result).toBeNull()
  })

  it('should return null for a trimmed valid email', () => {
    const result = sut.validate('  jane@example.com  ')
    expect(result).toBeNull()
  })

  it('should return error for an email without @', () => {
    const result = sut.validate('john.doe.example.com')
    expect(result).toBe('E-mail inválido')
  })

  it('should return error for an email without domain', () => {
    const result = sut.validate('john.doe@')
    expect(result).toBe('E-mail inválido')
  })

  it('should return error for an empty email', () => {
    const result = sut.validate('')
    expect(result).toBe('E-mail inválido')
  })

  beforeEach(() => {
    sut = new EmailValidation()
  })
})
