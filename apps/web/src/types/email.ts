/**
 * Result of validating an email address string.
 */
export interface EmailValidationResult {
  /** Whether the address matches the supported format rules. */
  isValid: boolean;
  /** Human-readable reason when `isValid` is false. */
  error?: string;
}

/**
 * Normalized email plus SHA-256 digests used for identity matching.
 */
export interface EmailHashResult {
  /** Email after UID2-style normalization. */
  normalizedEmail: string;
  /** Hex-encoded SHA-256 of the normalized email. */
  sha256Hash: string;
  /** Base64-encoded SHA-256 of the normalized email. */
  base64Hash: string;
}

/**
 * Toggles for UID2-style email normalization steps.
 */
export interface EmailNormalizationOptions {
  /** Strip all whitespace characters. Defaults to true. */
  removeWhitespace?: boolean;
  /** Lowercase the full address. Defaults to true. */
  convertToLowercase?: boolean;
  /** Remove dots from the local part for gmail.com only. Defaults to true. */
  removeDots?: boolean;
  /** Drop `+tag` suffixes for gmail.com only. Defaults to true. */
  removePlusSign?: boolean;
}
