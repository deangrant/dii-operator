import {
  EmailValidationResult,
  EmailNormalizationOptions,
} from '../../types/email';

/**
 * Validates an email address format and returns a validation result.
 *
 * @param email - The email address to validate.
 * @returns {EmailValidationResult} - The validation result containing
 * validation status and error message if invalid.
 */
export const validateEmail = (email: string): EmailValidationResult => {
  // Evaluate if the email address is empty or undefined.
  if (!email) {
    return { isValid: false, error: 'Email address is required' };
  }

  // A regular expression to validate the email address format. Allows letters,
  // numbers and special characters in local part, requires `@` symbol, allows
  // letters, numbers and hypens in domain, requires at least one dot and two
  // characters in the domain.
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Evaluate if the email address matches the regular expression.
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  return { isValid: true };
};

/**
 * Normalizes an email address according to UID2 specifications.
 *
 * @param email - The email address to normalize.
 * @param options - Configuration options for normalization.
 * @param options.removeWhitespace - Whether to remove all whitespace (default:
 * true).
 * @param options.convertToLowercase - Whether to convert to lowercase (default:
 * true).
 * @param options.removeDots - Whether to remove dots from local part (default:
 * true).
 * @param options.removePlusSign - Whether to remove everything after plus sign
 * in local part (default: true).
 * @returns The normalized email address.
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
  // Evaluate if the email address is empty or undefined, and return an empty
  // string if it is.
  if (!email) return '';

  // Initialize the normalized email address with the original email address.
  let normalized = email;

  // Remove all whitespace characters if the option is set to true.
  if (options.removeWhitespace) {
    normalized = normalized.replace(/\s+/g, '');
  }

  // Convert the email address to lowercase if the option is set to true.
  if (options.convertToLowercase) {
    normalized = normalized.toLowerCase();
  }

  // Split the email address into local part and domain.
  const [localPart, domain] = normalized.split('@');

  // Evaluate if the domain is not empty.
  if (domain) {
    // Initialize the processed local part with the original local part.
    let processedLocalPart = localPart;

    // Remove all dots from the local part if the option is set to true.
    if (options.removeDots) {
      processedLocalPart = processedLocalPart.replace(/\./g, '');
    }

    // Remove everything after the plus sign if the option is set to true.
    if (options.removePlusSign) {
      processedLocalPart = processedLocalPart.split('+')[0];
    }

    // Reconstruct the email address with the processed local part and domain.
    normalized = `${processedLocalPart}@${domain}`;
  }

  return normalized;
};
