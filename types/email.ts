/**
 * Defines the interface for the result of an email validation operation. This
 * interface contains a boolean property indicating whether the email address is
 * valid according to the validation rules, and an optional error message
 * describing why the email is invalid.
 *
 * @interface EmailValidationResult
 * @property {boolean} isValid - Whether the email address is valid according to
 * the validation rules
 * @property {string} error - Optional error message describing why the email is
 * invalid
 */
export interface EmailValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Defines the interface for the result of email hashing operations. This
 * interface contains the normalized email address, the SHA-256 hash of the
 * normalized email address in hexadecimal format, and the SHA-256 hash of the
 * normalized email address in base64 format.
 *
 * @interface EmailHashResult
 * @property {string} normalizedEmail - The normalized version of the email
 * address after applying normalization rules
 */
export interface EmailHashResult {
  normalizedEmail: string;
  sha256Hash: string;
  base64Hash: string;
}

/**
 * Defines the interface for the configuration options for email normalization.
 * This interface contains the options for removing whitespace, converting the
 * email address to lowercase, removing dots, and removing the plus sign.
 *
 * @interface EmailNormalizationOptions
 * @property {boolean} removeWhitespace - Whether to remove all whitespace
 * characters from the email address
 * @property {boolean} convertToLowercase - Whether to convert the email address
 */
export interface EmailNormalizationOptions {
  removeWhitespace?: boolean;
  convertToLowercase?: boolean;
  removeDots?: boolean;
  removePlusSign?: boolean;
}
