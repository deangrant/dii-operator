import CryptoJS from 'crypto-js';
import { EmailHashResult } from '../../types/email';

/**
 * Generates a SHA-256 hash of the input value in hexadecimal format.
 *
 * @param {string} value - The input string to be hashed. If the value is empty,
 * the function returns an empty string.
 * @returns {string} The SHA-256 hash of the input value in hexadecimal format.
 * If the value is empty, the function returns an empty string.
 */
export const generateSha256Hash = (value: string): string => {
  if (!value) return '';
  const hash = CryptoJS.SHA256(value);
  return hash.toString(CryptoJS.enc.Hex);
};

/**
 * Generates a Base64-encoded SHA-256 hash of the input value.
 *
 * @param {string} value - The input string to be hashed. If the value is empty,
 * the function returns an empty string.
 * @returns {string} The Base64-encoded SHA-256 hash of the input value. If the
 * value is empty, the function returns an empty string.
 */
export const generateBase64Hash = (value: string): string => {
  if (!value) return '';
  const hash = CryptoJS.SHA256(value);
  return CryptoJS.enc.Base64.stringify(hash);
};

/**
 * Generates SHA-256 and Base64 hashes for a normalized email address. This
 * function takes a normalized email address and generates two different hash
 * format, a SHA-256 hash in hexadecimal format, and a Base64 encoded hash.
 *
 * @param {string} normalizedEmail - The normalized email address to hash.
 * @returns {EmailHashResult} An object containing the normalized email address,
 * the SHA-256 hash in hexadecimal format, and the Base64 encoded hash.
 */
export const generateEmailHashes = (
  normalizedEmail: string,
): EmailHashResult => {
  if (!normalizedEmail) {
    return {
      normalizedEmail: '',
      sha256Hash: '',
      base64Hash: '',
    };
  }

  // Convert the normalized email address to a SHA-256 hash in hexadecimal
  // format.
  const sha256Hash = generateSha256Hash(normalizedEmail);

  // Convert the normalized email address to a Base64 encoded hash.
  const base64Hash = generateBase64Hash(normalizedEmail);

  // Return the normalized email address, the SHA-256 hash in hexadecimal
  // format, and the Base64 encoded hash.
  return {
    normalizedEmail,
    sha256Hash,
    base64Hash,
  };
};
