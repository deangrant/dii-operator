import { useState, useCallback } from 'react';
import { createHash } from 'crypto';
import { validatePhone, normalizePhone } from '../utils/phone/normalize';

/**
 * Defines the interface for the return type of the phone processor hook. This
 * hook provides functionality to store and update a phone number, validate
 * the phone format, normalize the phone number, generate SHA-256 and Base64
 * hashes of the normalized phone number, handle error states, and clear all results.
 *
 * @interface UsePhoneProcessorResult
 * @property {string} phoneNumber - The current phone number being processed.
 * @property {function} setPhoneNumber - Function to update the phone number.
 * @property {string} error - Any validation error message.
 * @property {PhoneHashResult} result - The processed phone results including
 * normalized phone number and hashes.
 * @property {function} processPhone - Function to process and validate the
 * current phone number
 * @property {function} clearResults - Function to reset all state values to
 * their initial state
 */
interface UsePhoneProcessorResult {
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
  error: string;
  result: PhoneHashResult;
  processPhone: () => void;
  clearResults: () => void;
}

/**
 * Defines the interface for the result of phone hashing operations. This
 * interface contains the normalized phone number, the SHA-256 hash of the
 * normalized phone number in hexadecimal format, and the SHA-256 hash of the
 * normalized phone number in base64 format.
 *
 * @interface PhoneHashResult
 * @property {string} normalizedPhone - The normalized version of the phone
 * number after applying normalization rules
 * @property {string} sha256Hash - The SHA-256 hash of the normalized phone
 * number in hexadecimal format
 * @property {string} base64Hash - The SHA-256 hash of the normalized phone
 * number in base64 format
 */
interface PhoneHashResult {
  normalizedPhone: string;
  sha256Hash: string;
  base64Hash: string;
}

/**
 * A React hook for processing and validating phone numbers. This hook
 * provides functionality to store and update a phone number, validate the
 * phone format, normalize the phone number, generate SHA-256 and Base64 hashes
 * of the normalized phone number, handle error states, and clear all results.
 *
 * @returns {UsePhoneProcessorResult} An object containing the phone number state and
 * processing functions.
 */
export const usePhoneProcessor = (): UsePhoneProcessorResult => {
  /**
   * State for storing the current phone number.
   * @type {string}
   */
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  /**
   * State for storing any validation errors.
   * @type {string}
   */
  const [error, setError] = useState<string>('');

  /**
   * State for storing the processed results.
   * @type {PhoneHashResult}
   */
  const [result, setResult] = useState<PhoneHashResult>({
    normalizedPhone: '',
    sha256Hash: '',
    base64Hash: '',
  });

  /**
   * Generates SHA-256 and Base64 hashes for a normalized phone number.
   * @param {string} normalizedPhone - The normalized phone number
   * @returns {PhoneHashResult} The hashing results
   */
  const generatePhoneHashes = (normalizedPhone: string): PhoneHashResult => {
    const sha256Hash = createHash('sha256')
      .update(normalizedPhone)
      .digest('hex');
    const base64Hash = Buffer.from(sha256Hash, 'hex').toString('base64');

    return {
      normalizedPhone,
      sha256Hash,
      base64Hash,
    };
  };

  /**
   * A callback function that processes the current phone number. It validates
   * the phone format, normalizes the phone number, and generates SHA-256 and
   * Base64 hashes of the normalized phone number.
   *
   * @returns {void}
   */
  const processPhone = useCallback((): void => {
    // Evaluate if the phone number is empty. If it is, return early.
    if (!phoneNumber) return;

    // Validate the phone number format. If the phone number is invalid, set the error state
    // and return early.
    if (!validatePhone(phoneNumber)) {
      setError(
        'Please enter a phone number in the E.164 format, which is the international phone number format that ensures global uniqueness.',
      );
      return;
    }

    // Clear any existing errors and process the phone number.
    setError('');

    // Normalize the phone number and generate SHA-256 and Base64 hashes of the
    // normalized phone number.
    const normalized = normalizePhone(phoneNumber);
    const hashes = generatePhoneHashes(normalized);

    // Update the result state with the normalized phone number and hashes.
    setResult(hashes);
  }, [phoneNumber]);

  /**
   * A callback function that resets all state values to their initial empty
   * state.
   *
   * @returns {void}
   */
  const clearResults = useCallback((): void => {
    setPhoneNumber('');
    setError('');
    setResult({
      normalizedPhone: '',
      sha256Hash: '',
      base64Hash: '',
    });
  }, []);

  /**
   * Returns an object containing the phone number state and processing functions.
   *
   * @returns {UsePhoneProcessorResult} An object containing the phone number state and
   * processing functions.
   */
  return {
    phoneNumber,
    setPhoneNumber,
    error,
    result,
    processPhone,
    clearResults,
  };
};
