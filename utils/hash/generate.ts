import CryptoJS from 'crypto-js';
import { EmailHashResult } from '../../types/email';

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

  // Generate the SHA-256 hash of the normalized email address.
  const hash = CryptoJS.SHA256(normalizedEmail);

  // Convert the hash to a hexadecimal string.
  const sha256Hash = hash.toString(CryptoJS.enc.Hex);

  // Convert the hash to a Base64 encoded string.
  const base64Hash = CryptoJS.enc.Base64.stringify(hash);

  // Return the normalized email address, the SHA-256 hash in hexadecimal
  // format, and the Base64 encoded hash.
  return {
    normalizedEmail,
    sha256Hash,
    base64Hash,
  };
};
