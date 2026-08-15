import { useCallback, useState } from "react";
import type { PhoneHashResult } from "@/types/phone";
import { generateSha256Pair } from "@/utils/hash/generate";
import { normalizePhone, validatePhone } from "@/utils/phone/normalize";

/**
 * Hook surface for single-phone normalize-and-hash workflows.
 */
interface UsePhoneProcessorResult {
  clearResults: () => void;
  error: string;
  phoneNumber: string;
  processPhone: () => Promise<void>;
  result: PhoneHashResult;
  setPhoneNumber: (phone: string) => void;
}

/**
 * Builds hash fields for a phone that has already been normalized.
 */
const generatePhoneHashes = async (
  normalizedPhone: string,
): Promise<PhoneHashResult> => {
  const { base64, sha256 } = await generateSha256Pair(normalizedPhone);

  return {
    base64Hash: base64,
    normalizedPhone,
    sha256Hash: sha256,
  };
};

/**
 * Manages phone input state, validation, normalization, and hash generation.
 */
export const usePhoneProcessor = (): UsePhoneProcessorResult => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<PhoneHashResult>({
    base64Hash: "",
    normalizedPhone: "",
    sha256Hash: "",
  });

  const processPhone = useCallback(async () => {
    if (!phoneNumber) {
      return;
    }

    if (!validatePhone(phoneNumber)) {
      setError(
        "Please enter a phone number in the E.164 format, which is the international phone number format that ensures global uniqueness.",
      );
      return;
    }

    setError("");
    const normalized = normalizePhone(phoneNumber);
    setResult(await generatePhoneHashes(normalized));
  }, [phoneNumber]);

  const clearResults = useCallback(() => {
    setPhoneNumber("");
    setError("");
    setResult({
      base64Hash: "",
      normalizedPhone: "",
      sha256Hash: "",
    });
  }, []);

  return {
    clearResults,
    error,
    phoneNumber,
    processPhone,
    result,
    setPhoneNumber,
  };
};
