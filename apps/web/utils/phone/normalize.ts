/**
 * Validates a phone number string to ensure it is in the E.164 format. The
 * function will remove all whitespace, dashes, parentheses, and other
 * formatting characters.
 *
 * @param {string} phone - The phone number to validate.
 * @returns {boolean} - A boolean flag indicating whether the phone number is
 * valid.
 */
export function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  return /^\+?[1-9][0-9]{6,14}$/.test(cleaned);
}

/**
 * Normalizes a phone number string to the E.164 format. The function will
 * remove all whitespace, dashes, parentheses, and other formatting characters.
 *
 * @param {string} phone - The phone number to normalize.
 * @returns {string} - The normalized phone number in E.164 format.
 */
export function normalizePhone(phone: string): string {
  // Evaluate if the phone number is empty. If it is, return an empty string.
  if (!phone) return '';

  // Remove all whitespace, dashes, parentheses, and other formatting characters.
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');

  // Remove leading plus sign if present to standardize the phone number.
  const digitsOnly = cleaned.startsWith('+') ? cleaned.slice(1) : cleaned;

  // Handle special case for Australian numbers (remove leading 0 after country
  // code).
  let normalized = digitsOnly;
  if (normalized.startsWith('61') && normalized[2] === '0') {
    normalized = '61' + normalized.slice(3);
  }

  // Add the plus sign to the normalized phone number.
  return '+' + normalized;
}
