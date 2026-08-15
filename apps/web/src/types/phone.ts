/**
 * Normalized phone number plus SHA-256 digests used for identity matching.
 */
export interface PhoneHashResult {
  /** Phone number after E.164-oriented normalization. */
  normalizedPhone: string;
  /** Hex-encoded SHA-256 of the normalized phone. */
  sha256Hash: string;
  /** Base64-encoded SHA-256 of the normalized phone. */
  base64Hash: string;
}
