import type { ProcessedData, ProcessedRow } from "@/types/csv";
import { normalizeEmail, validateEmail } from "@/utils/email/normalize";
import { generateSha256Pair } from "@/utils/hash/generate";
import { normalizePhone } from "@/utils/phone/normalize";

const PHONE_CANDIDATE_REGEX = /^[+\d\s\-()]+$/;

/**
 * Classifies a cell as email, phone, or unknown for batch processing.
 */
export const detectValueType = (
  value: string,
): "email" | "phone" | "unknown" => {
  const trimmed = value.trim();

  if (validateEmail(trimmed).isValid) {
    return "email";
  }

  if (PHONE_CANDIDATE_REGEX.test(trimmed)) {
    return "phone";
  }

  return "unknown";
};

/**
 * Reads a one-column CSV of emails/phones and returns normalized hashed rows.
 * @param file Uploaded CSV; at most 10,000 non-empty lines.
 * @throws When the file exceeds the record limit or reading fails.
 */
export const processCSV = async (file: File): Promise<ProcessedData> => {
  const MAX_RECORDS = 10_000;
  let skippedRows = 0;

  try {
    const text = await file.text();
    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (lines.length > MAX_RECORDS) {
      throw new Error(`File exceeds maximum record limit of ${MAX_RECORDS}`);
    }

    const pending: Array<{ normalized: string; original: string }> = [];

    for (const line of lines) {
      const values = line.split(",");
      if (!values[0]) {
        continue;
      }

      const type = detectValueType(values[0]);
      let normalized: string | null = null;

      if (type === "email") {
        const validation = validateEmail(values[0]);
        if (validation.isValid) {
          normalized = normalizeEmail(values[0]);
        }
      } else if (type === "phone") {
        normalized = normalizePhone(values[0]);
      }

      if (normalized) {
        pending.push({ normalized, original: values[0] });
      } else {
        skippedRows += 1;
      }
    }

    const rows: ProcessedRow[] = await Promise.all(
      pending.map(async ({ normalized, original }) => {
        const { base64, sha256 } = await generateSha256Pair(normalized);
        return {
          base64,
          normalized,
          original,
          sha256,
        };
      }),
    );

    return {
      headers: ["Input", "Normalized", "SHA256", "Base64"],
      rows,
      skippedRows,
    };
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    throw new Error(`Error processing CSV file: ${errorMessage}`, {
      cause: error,
    });
  }
};
