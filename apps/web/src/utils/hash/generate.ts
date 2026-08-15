import CryptoJS from "crypto-js";
import type { EmailHashResult } from "@/types/email";

/**
 * Returns the hex SHA-256 digest of `value`, or an empty string when blank.
 */
export const generateSha256Hash = (value: string): string => {
  if (!value) {
    return "";
  }
  return CryptoJS.SHA256(value).toString(CryptoJS.enc.Hex);
};

/**
 * Returns the Base64 SHA-256 digest of `value`, or an empty string when blank.
 */
export const generateBase64Hash = (value: string): string => {
  if (!value) {
    return "";
  }
  return CryptoJS.enc.Base64.stringify(CryptoJS.SHA256(value));
};

/**
 * Builds the email hash result object from a normalized address.
 */
export const generateEmailHashes = (
  normalizedEmail: string,
): EmailHashResult => {
  if (!normalizedEmail) {
    return {
      base64Hash: "",
      normalizedEmail: "",
      sha256Hash: "",
    };
  }

  return {
    base64Hash: generateBase64Hash(normalizedEmail),
    normalizedEmail,
    sha256Hash: generateSha256Hash(normalizedEmail),
  };
};
