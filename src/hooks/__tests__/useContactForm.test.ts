/**
 * Tests for useContactForm hook
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useContactForm } from '../useContactForm'
import type { ChangeEvent, FormEvent } from 'react'

describe('useContactForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock window.location.href
    delete (window as any).location
    window.location = { href: '' } as any
  })

  describe('initialization', () => {
    it('should initialize with empty form data', () => {
      const { result } = renderHook(() => useContactForm())

      expect(result.current.formData).toEqual({
        name: '',
        email: '',
        location: '',
        practice: '',
        portfolio: '',
        message: '',
      })
      expect(result.current.errors).toEqual({})
      expect(result.current.isSubmitting).toBe(false)
      expect(result.current.isSuccess).toBe(false)
      expect(result.current.isError).toBe(false)
    })
  })

  describe('handleChange', () => {
    it('should update form field value', () => {
      const { result } = renderHook(() => useContactForm())

      const event = {
        target: { name: 'name', value: 'John Doe' },
      } as ChangeEvent<HTMLInputElement>

      act(() => {
        result.current.handleChange(event)
      })

      expect(result.current.formData.name).toBe('John Doe')
    })

    it('should clear field error when typing', () => {
      const { result } = renderHook(() => useContactForm())

      // First, submit to generate errors
      const submitEvent = {
        preventDefault: vi.fn(),
      } as unknown as FormEvent<HTMLFormElement>

      act(() => {
        result.current.handleSubmit(submitEvent)
      })

      expect(result.current.errors.name).toBeDefined()

      // Now change the field
      const changeEvent = {
        target: { name: 'name', value: 'John' },
      } as ChangeEvent<HTMLInputElement>

      act(() => {
        result.current.handleChange(changeEvent)
      })

      expect(result.current.errors.name).toBeUndefined()
    })
  })

  describe('form validation', () => {
    it('should validate required fields', () => {
      const { result } = renderHook(() => useContactForm())

      const event = {
        preventDefault: vi.fn(),
      } as unknown as FormEvent<HTMLFormElement>

      act(() => {
        result.current.handleSubmit(event)
      })

      expect(result.current.errors.name).toBe('Name is required')
      expect(result.current.errors.email).toBe('Email is required')
      expect(result.current.errors.practice).toBe(
        'Area of practice is required'
      )
      expect(result.current.errors.message).toBe(
        'Please tell us why you want to join'
      )
    })

    it('should validate email format', () => {
      const { result } = renderHook(() => useContactForm())

      act(() => {
        result.current.handleChange({
          target: { name: 'email', value: 'invalid-email' },
        } as ChangeEvent<HTMLInputElement>)
      })

      const event = {
        preventDefault: vi.fn(),
      } as unknown as FormEvent<HTMLFormElement>

      act(() => {
        result.current.handleSubmit(event)
      })

      expect(result.current.errors.email).toBe(
        'Please enter a valid email address'
      )
    })

    it('should validate message length (minimum 50 characters)', () => {
      const { result } = renderHook(() => useContactForm())

      act(() => {
        result.current.handleChange({
          target: { name: 'message', value: 'Too short' },
        } as ChangeEvent<HTMLInputElement>)
      })

      const event = {
        preventDefault: vi.fn(),
      } as unknown as FormEvent<HTMLFormElement>

      act(() => {
        result.current.handleSubmit(event)
      })

      expect(result.current.errors.message).toBe(
        'Please provide more detail (at least 50 characters)'
      )
    })

    it('should validate portfolio URL when provided', () => {
      const { result } = renderHook(() => useContactForm())

      act(() => {
        result.current.handleChange({
          target: { name: 'portfolio', value: 'not-a-url' },
        } as ChangeEvent<HTMLInputElement>)
      })

      const event = {
        preventDefault: vi.fn(),
      } as unknown as FormEvent<HTMLFormElement>

      act(() => {
        result.current.handleSubmit(event)
      })

      expect(result.current.errors.portfolio).toBe('Please enter a valid URL')
    })

    it('should not require portfolio URL', () => {
      const { result } = renderHook(() => useContactForm())

      // Fill required fields
      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'John Doe' },
        } as ChangeEvent<HTMLInputElement>)
        result.current.handleChange({
          target: { name: 'email', value: 'john@example.com' },
        } as ChangeEvent<HTMLInputElement>)
        result.current.handleChange({
          target: { name: 'practice', value: 'Design' },
        } as ChangeEvent<HTMLInputElement>)
        result.current.handleChange({
          target: {
            name: 'message',
            value:
              'This is a long enough message to pass validation requirements.',
          },
        } as ChangeEvent<HTMLTextAreaElement>)
      })

      const event = {
        preventDefault: vi.fn(),
      } as unknown as FormEvent<HTMLFormElement>

      act(() => {
        result.current.handleSubmit(event)
      })

      expect(result.current.errors.portfolio).toBeUndefined()
    })
  })

  describe('form submission', () => {
    it('should not submit if validation fails', () => {
      const { result } = renderHook(() => useContactForm())

      const event = {
        preventDefault: vi.fn(),
      } as unknown as FormEvent<HTMLFormElement>

      act(() => {
        result.current.handleSubmit(event)
      })

      expect(event.preventDefault).toHaveBeenCalled()
      expect(result.current.isSuccess).toBe(false)
      expect(Object.keys(result.current.errors).length).toBeGreaterThan(0)
    })

    it('should submit valid form and open mailto', async () => {
      const { result } = renderHook(() => useContactForm())

      // Fill all required fields
      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'John Doe' },
        } as ChangeEvent<HTMLInputElement>)
        result.current.handleChange({
          target: { name: 'email', value: 'john@example.com' },
        } as ChangeEvent<HTMLInputElement>)
        result.current.handleChange({
          target: { name: 'practice', value: 'Design' },
        } as ChangeEvent<HTMLInputElement>)
        result.current.handleChange({
          target: {
            name: 'message',
            value:
              'This is a long enough message that meets the minimum character requirement.',
          },
        } as ChangeEvent<HTMLTextAreaElement>)
      })

      const event = {
        preventDefault: vi.fn(),
      } as unknown as FormEvent<HTMLFormElement>

      await act(async () => {
        await result.current.handleSubmit(event)
      })

      expect(result.current.isSuccess).toBe(true)
      expect(result.current.errors).toEqual({})
      expect(window.location.href).toContain('mailto:join@subcult.tv')
    })

    it('should reset form after successful submission', async () => {
      const { result } = renderHook(() => useContactForm())

      // Fill form
      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'John Doe' },
        } as ChangeEvent<HTMLInputElement>)
        result.current.handleChange({
          target: { name: 'email', value: 'john@example.com' },
        } as ChangeEvent<HTMLInputElement>)
        result.current.handleChange({
          target: { name: 'practice', value: 'Design' },
        } as ChangeEvent<HTMLInputElement>)
        result.current.handleChange({
          target: {
            name: 'message',
            value: 'This is a long enough message that meets requirements.',
          },
        } as ChangeEvent<HTMLTextAreaElement>)
      })

      const event = {
        preventDefault: vi.fn(),
      } as unknown as FormEvent<HTMLFormElement>

      await act(async () => {
        await result.current.handleSubmit(event)
      })

      expect(result.current.formData).toEqual({
        name: '',
        email: '',
        location: '',
        practice: '',
        portfolio: '',
        message: '',
      })
    })

    it('should include optional fields in mailto', async () => {
      const { result } = renderHook(() => useContactForm())

      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'John Doe' },
        } as ChangeEvent<HTMLInputElement>)
        result.current.handleChange({
          target: { name: 'email', value: 'john@example.com' },
        } as ChangeEvent<HTMLInputElement>)
        result.current.handleChange({
          target: { name: 'location', value: 'New York' },
        } as ChangeEvent<HTMLInputElement>)
        result.current.handleChange({
          target: { name: 'practice', value: 'Design' },
        } as ChangeEvent<HTMLInputElement>)
        result.current.handleChange({
          target: { name: 'portfolio', value: 'https://example.com' },
        } as ChangeEvent<HTMLInputElement>)
        result.current.handleChange({
          target: {
            name: 'message',
            value: 'This is a long enough message that meets the requirements.',
          },
        } as ChangeEvent<HTMLTextAreaElement>)
      })

      const event = {
        preventDefault: vi.fn(),
      } as unknown as FormEvent<HTMLFormElement>

      await act(async () => {
        await result.current.handleSubmit(event)
      })

      expect(window.location.href).toContain('Location')
      expect(window.location.href).toContain('Portfolio')
    })
  })

  describe('resetForm', () => {
    it('should reset form data and states', () => {
      const { result } = renderHook(() => useContactForm())

      // Change some fields
      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'John Doe' },
        } as ChangeEvent<HTMLInputElement>)
      })

      // Try to submit (will fail validation)
      const event = {
        preventDefault: vi.fn(),
      } as unknown as FormEvent<HTMLFormElement>

      act(() => {
        result.current.handleSubmit(event)
      })

      // Reset
      act(() => {
        result.current.resetForm()
      })

      expect(result.current.formData).toEqual({
        name: '',
        email: '',
        location: '',
        practice: '',
        portfolio: '',
        message: '',
      })
      expect(result.current.errors).toEqual({})
      expect(result.current.isSuccess).toBe(false)
      expect(result.current.isError).toBe(false)
    })
  })
})
