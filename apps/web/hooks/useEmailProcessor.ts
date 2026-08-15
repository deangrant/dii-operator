import { useState, useCallback } from 'react';
import { validateEmail, normalizeEmail } from '../utils/email/normalize';
import { generateEmailHashes } from '../utils/hash/generate';
import { EmailHashResult, EmailValidationResult } from '../types/email';

/**
 * Defines the interface for the return type of the email processor hook. This
 * hook provides functionality to store and update an email address, validate
 * the email format, normalize the email address, generate SHA-256 and Base64
 * hashes of the normalized email, handle error states, and clear all results.
 *
 * @interface UseEmailProcessorResult
 * @property {string} email - The current email address being processed.
 * @property {function} setEmail - Function to update the email address.
 * @property {string} error - Any validation error message.
 * @property {EmailHashResult} result - The processed email results including
 * normalized email and hashes.
 * @property {function} processEmail - Function to process and validate the
 * current email
 * @property {function} clearResults - Function to reset all state values to
 * their initial state
 */
interface UseEmailProcessorResult {
  email: string;
  setEmail: (email: string) => void;
  error: string;
  result: EmailHashResult;
  processEmail: () => void;
  clearResults: () => void;
}

/**
 * A React hook for processing and validating email addresses. This hook
 * provides functionality to store and update an email address, validate the
 * email format, normalize the email address, generate SHA-256 and Base64 hashes
 * of the normalized email, handle error states, and clear all results.
 *
 * @returns {UseEmailProcessorResult} An object containing the email state and
 * processing functions.
 */
export const useEmailProcessor = (): UseEmailProcessorResult => {
  /**
   * State for storing the current email address.
   * @type {string}
   */
  const [email, setEmail] = useState<string>('');

  /**
   * State for storing any validation errors.
   * @type {string}
   */
  const [error, setError] = useState<string>('');

  /**
   * State for storing the processed results.
   * @type {EmailHashResult}
   */
  const [result, setResult] = useState<EmailHashResult>({
    normalizedEmail: '',
    sha256Hash: '',
    base64Hash: '',
  });

  /**
   * A callback function that processes the current email address. It validates
   * the email format, normalizes the email address, and generates SHA-256 and
   * Base64 hashes of the normalized email.
   *
   * @returns {void}
   */
  const processEmail = useCallback((): void => {
    // Evaluate if the email is empty. If it is, return early.
    if (!email) return;

    // Validate the email format. If the email is invalid, set the error state
    // and return early.
    const validationResult: EmailValidationResult = validateEmail(email);
    if (!validationResult.isValid) {
      setError(validationResult.error || 'Invalid email address');
      return;
    }

    // Clear any existing errors and process the email.
    setError('');

    // Normalize the email address and generate SHA-256 and Base64 hashes of the
    // normalized email.
    const normalized = normalizeEmail(email);
    const hashes = generateEmailHashes(normalized);

    // Update the result state with the normalized email and hashes.
    setResult(hashes);
  }, [email]);

  /**
   * A callback function that resets all state values to their initial empty
   * state.
   *
   * @returns {void}
   */
  const clearResults = useCallback((): void => {
    setEmail('');
    setError('');
    setResult({
      normalizedEmail: '',
      sha256Hash: '',
      base64Hash: '',
    });
  }, []);

  /**
   * Returns an object containing the email state and processing functions.
   *
   * @returns {UseEmailProcessorResult} An object containing the email state and
   * processing functions.
   */
  return {
    email,
    setEmail,
    error,
    result,
    processEmail,
    clearResults,
  };
};
