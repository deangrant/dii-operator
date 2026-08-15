import { useState, useCallback } from 'react';
import { validatePhone, normalizePhone } from '@/utils/phone/normalize';
import {
  generateSha256Hash,
  generateBase64Hash,
} from '@/utils/hash/generate';
import type { PhoneHashResult } from '@/types/phone';

/**
 * Hook surface for single-phone normalize-and-hash workflows.
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
 * Builds hash fields for a phone that has already been normalized.
 */
const generatePhoneHashes = (normalizedPhone: string): PhoneHashResult => ({
  normalizedPhone,
  sha256Hash: generateSha256Hash(normalizedPhone),
  base64Hash: generateBase64Hash(normalizedPhone),
});

/**
 * Manages phone input state, validation, normalization, and hash generation.
 */
export const usePhoneProcessor = (): UsePhoneProcessorResult => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState<PhoneHashResult>({
    normalizedPhone: '',
    sha256Hash: '',
    base64Hash: '',
  });

  const processPhone = useCallback(() => {
    if (!phoneNumber) return;

    if (!validatePhone(phoneNumber)) {
      setError(
        'Please enter a phone number in the E.164 format, which is the international phone number format that ensures global uniqueness.',
      );
      return;
    }

    setError('');
    const normalized = normalizePhone(phoneNumber);
    setResult(generatePhoneHashes(normalized));
  }, [phoneNumber]);

  const clearResults = useCallback(() => {
    setPhoneNumber('');
    setError('');
    setResult({
      normalizedPhone: '',
      sha256Hash: '',
      base64Hash: '',
    });
  }, []);

  return {
    phoneNumber,
    setPhoneNumber,
    error,
    result,
    processPhone,
    clearResults,
  };
};
