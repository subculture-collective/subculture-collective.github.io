/**
 * useContactForm Hook
 *
 * Manages form state, validation, and submission for the contact form
 */

import type { ChangeEvent, FormEvent } from 'react'
import { useState, useCallback } from 'react'

export interface FormData {
  name: string
  email: string
  location: string
  practice: string
  portfolio: string
  message: string
}

export interface FormErrors {
  name?: string
  email?: string
  practice?: string
  message?: string
  portfolio?: string
}

interface UseContactFormReturn {
  formData: FormData
  errors: FormErrors
  isSubmitting: boolean
  isSuccess: boolean
  isError: boolean
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>
  resetForm: () => void
}

const initialFormData: FormData = {
  name: '',
  email: '',
  location: '',
  practice: '',
  portfolio: '',
  message: '',
}

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate URL format (optional field)
 */
function isValidUrl(url: string): boolean {
  if (!url) return true // Optional field
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Validate form data
 */
function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {}

  if (!data.name.trim()) {
    errors.name = 'Name is required'
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required'
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (!data.practice.trim()) {
    errors.practice = 'Area of practice is required'
  }

  if (!data.message.trim()) {
    errors.message = 'Please tell us why you want to join'
  } else if (data.message.trim().length < 50) {
    errors.message = 'Please provide more detail (at least 50 characters)'
  }

  if (data.portfolio && !isValidUrl(data.portfolio)) {
    errors.portfolio = 'Please enter a valid URL'
  }

  return errors
}

/**
 * Hook for managing contact form state and submission
 */
export function useContactForm(): UseContactFormReturn {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setFormData(prev => ({ ...prev, [name]: value }))
      // Clear error for this field when user starts typing
      if (errors[name as keyof FormErrors]) {
        setErrors(prev => ({ ...prev, [name]: undefined }))
      }
    },
    [errors]
  )

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      // Reset states
      setIsError(false)
      setIsSuccess(false)

      // Validate form
      const validationErrors = validateForm(formData)
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors)
        return
      }

      setIsSubmitting(true)

      try {
        // Create mailto link as fallback
        const subject = encodeURIComponent('Subcult Membership Application')
        const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Location: ${formData.location || 'Not provided'}
Area of Practice: ${formData.practice}
Portfolio: ${formData.portfolio || 'Not provided'}

Why I want to join Subcult:
${formData.message}
        `)

        // Open mailto link
        window.location.href = `mailto:join@subcult.tv?subject=${subject}&body=${body}`

        // Mark as success
        setIsSuccess(true)
        setFormData(initialFormData)
      } catch (error) {
        console.error('Form submission error:', error)
        setIsError(true)
      } finally {
        setIsSubmitting(false)
      }
    },
    [formData]
  )

  const resetForm = useCallback(() => {
    setFormData(initialFormData)
    setErrors({})
    setIsSuccess(false)
    setIsError(false)
  }, [])

  return {
    formData,
    errors,
    isSubmitting,
    isSuccess,
    isError,
    handleChange,
    handleSubmit,
    resetForm,
  }
}
