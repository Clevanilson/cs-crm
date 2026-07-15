import { describe, it, expect, beforeEach } from 'vitest'
import { RequiredValidation } from './required'

describe(RequiredValidation.name, () => {
  let sut: RequiredValidation

  it('should return null for a non-empty string', () => {
    const result = sut.validate('value')
    expect(result).toBeNull()
  })

  it('should return null for a number', () => {
    const result = sut.validate(0)
    expect(result).toBeNull()
  })

  it('should return null for false', () => {
    const result = sut.validate(false)
    expect(result).toBeNull()
  })

  it('should return error for null', () => {
    const result = sut.validate(null)
    expect(result).toBe('Campo obrigatório')
  })

  it('should return error for undefined', () => {
    const result = sut.validate(undefined)
    expect(result).toBe('Campo obrigatório')
  })

  it('should return error for an empty string', () => {
    const result = sut.validate('')
    expect(result).toBe('Campo obrigatório')
  })

  it('should return error for a blank string', () => {
    const result = sut.validate('   ')
    expect(result).toBe('Campo obrigatório')
  })

  beforeEach(() => {
    sut = new RequiredValidation()
  })
})
