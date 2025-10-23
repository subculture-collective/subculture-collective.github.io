/**
 * Tests for validation utilities
 */

import { describe, it, expect } from 'vitest'
import { isValidEmail, isValidUrl } from '../validation'

describe('isValidEmail', () => {
  it('should validate correct email addresses', () => {
    expect(isValidEmail('test@example.com')).toBe(true)
    expect(isValidEmail('user.name@example.com')).toBe(true)
    expect(isValidEmail('user+tag@example.co.uk')).toBe(true)
    expect(isValidEmail('first.last@subdomain.example.com')).toBe(true)
  })

  it('should reject email without @', () => {
    expect(isValidEmail('testexample.com')).toBe(false)
    expect(isValidEmail('test')).toBe(false)
  })

  it('should reject email with multiple @ symbols', () => {
    expect(isValidEmail('test@@example.com')).toBe(false)
    expect(isValidEmail('test@ex@ample.com')).toBe(false)
  })

  it('should reject email with invalid local part', () => {
    expect(isValidEmail('@example.com')).toBe(false)
    expect(isValidEmail('.test@example.com')).toBe(false)
    expect(isValidEmail('test.@example.com')).toBe(false)
    expect(isValidEmail('te..st@example.com')).toBe(false)
  })

  it('should reject email with invalid domain', () => {
    expect(isValidEmail('test@')).toBe(false)
    expect(isValidEmail('test@.com')).toBe(false)
    expect(isValidEmail('test@example.')).toBe(false)
    expect(isValidEmail('test@example')).toBe(false)
    expect(isValidEmail('test@example..com')).toBe(false)
  })

  it('should reject email with invalid TLD', () => {
    expect(isValidEmail('test@example.c')).toBe(false)
  })

  it('should handle empty or invalid inputs', () => {
    expect(isValidEmail('')).toBe(false)
    expect(isValidEmail('   ')).toBe(false)
    expect(isValidEmail(null as any)).toBe(false)
    expect(isValidEmail(undefined as any)).toBe(false)
  })

  it('should trim whitespace', () => {
    expect(isValidEmail('  test@example.com  ')).toBe(true)
  })

  it('should enforce local part length limit (64 chars)', () => {
    const longLocal = 'a'.repeat(65)
    expect(isValidEmail(`${longLocal}@example.com`)).toBe(false)

    const validLocal = 'a'.repeat(64)
    expect(isValidEmail(`${validLocal}@example.com`)).toBe(true)
  })

  it('should enforce domain length limit (255 chars)', () => {
    const longDomain = 'a'.repeat(256)
    expect(isValidEmail(`test@${longDomain}.com`)).toBe(false)
  })
})

describe('isValidUrl', () => {
  it('should validate correct URLs', () => {
    expect(isValidUrl('https://example.com')).toBe(true)
    expect(isValidUrl('http://example.com')).toBe(true)
    expect(isValidUrl('https://subdomain.example.com')).toBe(true)
    expect(isValidUrl('https://example.com/path')).toBe(true)
    expect(isValidUrl('https://example.com/path?query=value')).toBe(true)
  })

  it('should reject URLs with invalid protocol', () => {
    expect(isValidUrl('ftp://example.com')).toBe(false)
    expect(isValidUrl('file:///path/to/file')).toBe(false)
    expect(isValidUrl('javascript:alert(1)')).toBe(false)
  })

  it('should reject malformed URLs', () => {
    expect(isValidUrl('not-a-url')).toBe(false)
    expect(isValidUrl('example.com')).toBe(false)
    expect(isValidUrl('//example.com')).toBe(false)
  })

  it('should handle empty URLs based on required flag', () => {
    expect(isValidUrl('', false)).toBe(true)
    expect(isValidUrl('', true)).toBe(false)
  })

  it('should handle default required behavior', () => {
    expect(isValidUrl('')).toBe(true) // default is false
  })

  it('should reject null or undefined', () => {
    expect(isValidUrl(null as any)).toBe(true) // not required by default
    expect(isValidUrl(undefined as any)).toBe(true)
    expect(isValidUrl(null as any, true)).toBe(false)
    expect(isValidUrl(undefined as any, true)).toBe(false)
  })
})
