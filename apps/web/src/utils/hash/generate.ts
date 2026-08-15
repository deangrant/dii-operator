import type { EmailHashResult } from "@/types/email";

const textEncoder = new TextEncoder();

/**
 * Digests `value` with SHA-256 via the Web Crypto API.
 */
const sha256Digest = async (value: string): Promise<ArrayBuffer> =>
  crypto.subtle.digest("SHA-256", textEncoder.encode(value));

/**
 * Formats a digest as lowercase hex.
 */
const toHex = (buffer: ArrayBuffer): string =>
  [...new Uint8Array(buffer)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

/**
 * Formats a digest as standard Base64.
 */
const toBase64 = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
};

/**
 * Returns the hex SHA-256 digest of `value`, or an empty string when blank.
 */
export const generateSha256Hash = async (value: string): Promise<string> => {
  if (!value) {
    return "";
  }
  return toHex(await sha256Digest(value));
};

/**
 * Returns the Base64 SHA-256 digest of `value`, or an empty string when blank.
 */
export const generateBase64Hash = async (value: string): Promise<string> => {
  if (!value) {
    return "";
  }
  return toBase64(await sha256Digest(value));
};

/**
 * Builds the email hash result object from a normalized address.
 */
export const generateEmailHashes = async (
  normalizedEmail: string,
): Promise<EmailHashResult> => {
  if (!normalizedEmail) {
    return {
      base64Hash: "",
      normalizedEmail: "",
      sha256Hash: "",
    };
  }

  const digest = await sha256Digest(normalizedEmail);

  return {
    base64Hash: toBase64(digest),
    normalizedEmail,
    sha256Hash: toHex(digest),
  };
};

/**
 * Builds hex and Base64 SHA-256 digests from one Web Crypto pass.
 */
export const generateSha256Pair = async (
  value: string,
): Promise<{ base64: string; sha256: string }> => {
  if (!value) {
    return { base64: "", sha256: "" };
  }

  const digest = await sha256Digest(value);

  return {
    base64: toBase64(digest),
    sha256: toHex(digest),
  };
};
