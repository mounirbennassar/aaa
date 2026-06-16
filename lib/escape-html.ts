/**
 * Escapes a value for safe interpolation into an HTML string (e.g. emails).
 * Prevents HTML/script injection when user-supplied data such as a customer
 * name is embedded into notification emails.
 */
export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
