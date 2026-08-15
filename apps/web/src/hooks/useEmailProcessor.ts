import { useState, useCallback } from 'react';
import { validateEmail, normalizeEmail } from '@/utils/email/normalize';
import { generateEmailHashes } from '@/utils/hash/generate';
import type { EmailHashResult } from '@/types/email';

/**
 * Hook surface for single-email normalize-and-hash workflows.
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
 * Manages email input state, validation, normalization, and hash generation.
 */
export const useEmailProcessor = (): UseEmailProcessorResult => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState<EmailHashResult>({
    normalizedEmail: '',
    sha256Hash: '',
    base64Hash: '',
  });

  const processEmail = useCallback(() => {
    if (!email) return;

    const validationResult = validateEmail(email);
    if (!validationResult.isValid) {
      setError(validationResult.error || 'Invalid email address');
      return;
    }

    setError('');
    const normalized = normalizeEmail(email);
    setResult(generateEmailHashes(normalized));
  }, [email]);

  const clearResults = useCallback(() => {
    setEmail('');
    setError('');
    setResult({
      normalizedEmail: '',
      sha256Hash: '',
      base64Hash: '',
    });
  }, []);

  return {
    email,
    setEmail,
    error,
    result,
    processEmail,
    clearResults,
  };
};
