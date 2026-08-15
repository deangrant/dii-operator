/**
 * Returns whether a phone string matches a permissive E.164-like pattern.
 */
export function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  return /^\+?[1-9][0-9]{6,14}$/.test(cleaned);
}

/**
 * Normalizes a phone number toward E.164 (`+` followed by digits only).
 */
export function normalizePhone(phone: string): string {
  if (!phone) return '';

  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  const digitsOnly = cleaned.startsWith('+') ? cleaned.slice(1) : cleaned;

  let normalized = digitsOnly;
  // Australian national numbers may keep a trunk `0` after country code 61.
  if (normalized.startsWith('61') && normalized[2] === '0') {
    normalized = '61' + normalized.slice(3);
  }

  return '+' + normalized;
}
