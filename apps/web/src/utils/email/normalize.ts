import type {
  EmailValidationResult,
  EmailNormalizationOptions,
} from '@/types/email';

/**
 * Validates whether a string looks like a usable email address.
 */
export const validateEmail = (email: string): EmailValidationResult => {
  if (!email) {
    return { isValid: false, error: 'Email address is required' };
  }

  // Local part, `@`, domain labels, and a TLD of at least two characters.
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  return { isValid: true };
};

/**
 * Normalizes an email address using UID2-oriented rules.
 * @param email Raw email input.
 * @param options Step toggles; all steps default to enabled.
 */
export const normalizeEmail = (
  email: string,
  options: EmailNormalizationOptions = {
    removeWhitespace: true,
    convertToLowercase: true,
    removeDots: true,
    removePlusSign: true,
  },
): string => {
  if (!email) return '';

  let normalized = email;

  if (options.removeWhitespace) {
    normalized = normalized.replace(/\s+/g, '');
  }

  if (options.convertToLowercase) {
    normalized = normalized.toLowerCase();
  }

  const [localPart, domain] = normalized.split('@');

  if (domain) {
    let processedLocalPart = localPart;

    // Gmail ignores dots and plus-tags in the local part for matching.
    if (options.removeDots && domain === 'gmail.com') {
      processedLocalPart = processedLocalPart.replace(/\./g, '');
    }

    if (options.removePlusSign && domain === 'gmail.com') {
      processedLocalPart = processedLocalPart.split('+')[0];
    }

    normalized = `${processedLocalPart}@${domain}`;
  }

  return normalized;
};
