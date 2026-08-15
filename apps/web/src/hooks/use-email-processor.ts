import { useCallback, useState } from "react";
import type { EmailHashResult } from "@/types/email";
import { normalizeEmail, validateEmail } from "@/utils/email/normalize";
import { generateEmailHashes } from "@/utils/hash/generate";

/**
 * Hook surface for single-email normalize-and-hash workflows.
 */
interface UseEmailProcessorResult {
  clearResults: () => void;
  email: string;
  error: string;
  processEmail: () => void;
  result: EmailHashResult;
  setEmail: (email: string) => void;
}

/**
 * Manages email input state, validation, normalization, and hash generation.
 */
export const useEmailProcessor = (): UseEmailProcessorResult => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<EmailHashResult>({
    base64Hash: "",
    normalizedEmail: "",
    sha256Hash: "",
  });

  const processEmail = useCallback(() => {
    if (!email) {
      return;
    }

    const validationResult = validateEmail(email);
    if (!validationResult.isValid) {
      setError(validationResult.error || "Invalid email address");
      return;
    }

    setError("");
    const normalized = normalizeEmail(email);
    setResult(generateEmailHashes(normalized));
  }, [email]);

  const clearResults = useCallback(() => {
    setEmail("");
    setError("");
    setResult({
      base64Hash: "",
      normalizedEmail: "",
      sha256Hash: "",
    });
  }, []);

  return {
    clearResults,
    email,
    error,
    processEmail,
    result,
    setEmail,
  };
};
