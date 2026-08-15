import type {
  EmailNormalizationOptions,
  EmailValidationResult,
} from "@/types/email";

const EMAIL_FORMAT_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Validates whether a string looks like a usable email address.
 */
export const validateEmail = (email: string): EmailValidationResult => {
  if (!email) {
    return { error: "Email address is required", isValid: false };
  }

  // Local part, `@`, domain labels, and a TLD of at least two characters.
  if (!EMAIL_FORMAT_REGEX.test(email)) {
    return { error: "Please enter a valid email address", isValid: false };
  }

  return { isValid: true };
};

/**
 * Normalizes an email address using UID2-oriented rules.
 * @param email Raw email input.
 * @param options Step toggles; all steps default to enabled.
 */
export const normalizeEmail = (
  email: string,
  options: EmailNormalizationOptions = {
    convertToLowercase: true,
    removeDots: true,
    removePlusSign: true,
    removeWhitespace: true,
  },
): string => {
  if (!email) {
    return "";
  }

  let normalized = email;

  if (options.removeWhitespace) {
    normalized = normalized.replace(/\s+/g, "");
  }

  if (options.convertToLowercase) {
    normalized = normalized.toLowerCase();
  }

  const [localPart, domain] = normalized.split("@");

  if (domain) {
    let processedLocalPart = localPart;

    // Gmail ignores dots and plus-tags in the local part for matching.
    if (options.removeDots && domain === "gmail.com") {
      processedLocalPart = processedLocalPart.replace(/\./g, "");
    }

    if (options.removePlusSign && domain === "gmail.com") {
      const [localWithoutPlus] = processedLocalPart.split("+");
      processedLocalPart = localWithoutPlus;
    }

    normalized = `${processedLocalPart}@${domain}`;
  }

  return normalized;
};
