/**
 * Lightweight, dependency-free validators for untrusted request input.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    value.length <= 254 &&
    EMAIL_RE.test(value)
  )
}

export function isNonEmptyString(value: unknown, max = 1000): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= max
}

/** Trim and clamp a string to a maximum length (returns '' for non-strings). */
export function sanitizeString(value: unknown, max = 1000): string {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, max)
}
