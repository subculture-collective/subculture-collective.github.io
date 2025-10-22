/**
 * Validation Utilities
 *
 * Provides robust validation functions for form inputs
 */

/**
 * Validates email addresses with comprehensive edge case handling
 *
 * Rules:
 * - Must have exactly one @ symbol
 * - Local part (before @) must be 1-64 characters
 * - Domain part (after @) must be valid
 * - No leading/trailing dots in local or domain parts
 * - No consecutive dots
 * - Domain must have at least one dot
 * - TLD must be at least 2 characters
 * - No special characters in domain except dots and hyphens
 *
 * @param email - The email address to validate
 * @returns true if the email is valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  // Basic format check
  if (!email || typeof email !== 'string') {
    return false
  }

  // Trim whitespace
  const trimmedEmail = email.trim()

  // Check for exactly one @ symbol
  const atSymbolCount = (trimmedEmail.match(/@/g) || []).length
  if (atSymbolCount !== 1) {
    return false
  }

  // Split into local and domain parts
  const [localPart, domainPart] = trimmedEmail.split('@')

  // Validate local part
  if (!localPart || localPart.length > 64) {
    return false
  }

  // Local part cannot start or end with a dot
  if (localPart.startsWith('.') || localPart.endsWith('.')) {
    return false
  }

  // Local part cannot have consecutive dots
  if (localPart.includes('..')) {
    return false
  }

  // Local part should only contain valid characters
  const localPartRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/
  if (!localPartRegex.test(localPart)) {
    return false
  }

  // Validate domain part
  if (!domainPart || domainPart.length > 255) {
    return false
  }

  // Domain cannot start or end with a dot or hyphen
  if (
    domainPart.startsWith('.') ||
    domainPart.endsWith('.') ||
    domainPart.startsWith('-') ||
    domainPart.endsWith('-')
  ) {
    return false
  }

  // Domain cannot have consecutive dots
  if (domainPart.includes('..')) {
    return false
  }

  // Domain must have at least one dot (for TLD)
  if (!domainPart.includes('.')) {
    return false
  }

  // Split domain into labels
  const domainLabels = domainPart.split('.')

  // Each label must be 1-63 characters
  // Last label (TLD) must be at least 2 characters
  for (let i = 0; i < domainLabels.length; i++) {
    const label = domainLabels[i]

    if (!label || label.length > 63) {
      return false
    }

    // TLD must be at least 2 characters
    if (i === domainLabels.length - 1 && label.length < 2) {
      return false
    }

    // Label cannot start or end with hyphen
    if (label.startsWith('-') || label.endsWith('-')) {
      return false
    }

    // Label should only contain alphanumeric characters and hyphens
    if (!/^[a-zA-Z0-9-]+$/.test(label)) {
      return false
    }
  }

  return true
}

/**
 * Validates URL format
 *
 * @param url - The URL to validate
 * @param required - Whether the URL is required (default: false)
 * @returns true if the URL is valid or empty (when not required), false otherwise
 */
export function isValidUrl(url: string, required = false): boolean {
  // If not required and empty, it's valid
  if (!required && !url) {
    return true
  }

  // If required and empty, it's invalid
  if (required && !url) {
    return false
  }

  try {
    const parsedUrl = new URL(url)
    // Ensure it has a valid protocol (http or https)
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:'
  } catch {
    return false
  }
}
