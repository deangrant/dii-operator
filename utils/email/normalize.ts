import {
  EmailValidationResult,
  EmailNormalizationOptions,
} from '../../types/email';

/**
 * Validates an email address format
 * @param email - The email address to validate
 * @returns EmailValidationResult containing validation status and error message if invalid
 */
export const validateEmail = (email: string): EmailValidationResult => {
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  return { isValid: true };
};

/**
 * Normalizes an email address according to UID2 specifications
 * @param email - The email address to normalize
 * @param options - Optional normalization settings
 * @returns The normalized email address
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

  // Remove whitespace
  if (options.removeWhitespace) {
    normalized = normalized.replace(/\s+/g, '');
  }

  // Convert to lowercase
  if (options.convertToLowercase) {
    normalized = normalized.toLowerCase();
  }

  // Process local part
  const [localPart, domain] = normalized.split('@');
  if (domain) {
    let processedLocalPart = localPart;

    // Remove dots from local part
    if (options.removeDots) {
      processedLocalPart = processedLocalPart.replace(/\./g, '');
    }

    // Remove plus sign and everything after it
    if (options.removePlusSign) {
      processedLocalPart = processedLocalPart.split('+')[0];
    }

    normalized = `${processedLocalPart}@${domain}`;
  }

  return normalized;
};
