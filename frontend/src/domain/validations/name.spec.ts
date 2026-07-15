import { describe, it, expect, beforeEach } from 'vitest'
import { NameValidation } from './name'

describe(NameValidation.name, () => {
  let sut: NameValidation

  it('should return null for a valid name', () => {
    const result = sut.validate('John Doe')
    expect(result).toBeNull()
  })

  it('should return null for a trimmed valid name', () => {
    const result = sut.validate('  Jane  ')
    expect(result).toBeNull()
  })

  it('should return error for a name shorter than 2 characters', () => {
    const result = sut.validate('A')
    expect(result).toBe('Nome inválido')
  })

  it('should return error for a name with numbers', () => {
    const result = sut.validate('John123')
    expect(result).toBe('Nome inválido')
  })

  it('should return error for an empty name', () => {
    const result = sut.validate('')
    expect(result).toBe('Nome inválido')
  })

  beforeEach(() => {
    sut = new NameValidation()
  })
})
