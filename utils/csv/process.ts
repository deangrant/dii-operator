import { normalizeEmail, validateEmail } from '../email/normalize';
import { createHash } from 'crypto';
import { normalizePhone } from '../phone/normalize';
import { generateSha256Hash, generateBase64Hash } from '../hash/generate';

/**
 * Defines an interface representing a processed row from a CSV file defining
 * the structure for each row after processing.
 *
 * @interface ProcessedRow
 * @property {string} original - The original input value from the CSV file
 * (email or phone number).
 * @property {string} normalized - The normalized format of the input value
 * (email or phone number).
 * @property {string} sha256 - The SHA-256 hash of the normalized value.
 * @property {string} base64 - The Base64 encoded hash of the normalized value.
 */
export interface ProcessedRow {
  original: string;
  normalized: string;
  sha256: string;
  base64: string;
}

/**
 * Defines an interface representing the complete processed data from a CSV file
 * defining the structure for the processed CSV data, processed rows and metrics
 * for skipped rows.
 *
 * @interface ProcessedData
 * @property {string[]} headers - An array of column headers for the processed
 * data.
 * @property {ProcessedRow[]} rows - An array of processed rows containing the
 * normalized values and hashes.
 * @property {number} skippedRows - The number of rows skipped due to invalid
 * values or other processing issues.
 */
export interface ProcessedData {
  headers: string[];
  rows: ProcessedRow[];
  skippedRows: number;
}

/**
 * Analyzing a string value to determine if it represents and email or phone
 * number. This function performs validation in a specific order, first
 * evaluating if the value is a valid email address, then if it is a valid phone
 * number. If none or both are valid, the function returns unknown.
 *
 * @function detectValueType
 * @param {string} value - The input string to validate.
 * @returns {'email' | 'phone' | 'unknown'} - The detected type of the input
 * value.
 */
export const detectValueType = (
  value: string,
): 'email' | 'phone' | 'unknown' => {
  // Trim the input value to remove leading and trailing whitespace.
  const trimmed = value.trim();

  // Evaluate if the value matches email format. If so, return email.
  const emailValidation = validateEmail(trimmed);
  if (emailValidation.isValid) {
    return 'email';
  }

  // Evaluate if the value matches phone number format. If so, return phone.
  const phoneRegex = /^[+\d\s\-()]+$/;
  if (phoneRegex.test(trimmed)) {
    return 'phone';
  }

  // If the value is not a valid email or phone number, return unknown.
  return 'unknown';
};

/**
 * Processes a CSV file containing email addresses and/or phone numbers. This
 * function reads the file, detects the value type for each row, normalizes the
 * values, and generates SHA-256 and Base64 hashes for each normalized value.
 *
 * @param {File} file - The CSV file to process. The file should contain one
 * email address or phone number per row.
 * @returns {Promise<ProcessedData>} A promise that resolves to an object
 * containing an array of column headers, an array of processed rows, and the
 * number of rows skipped due to invalid values or other processing issues.
 * @throws {Error} If the file exceeds the maximum record limit or if an
 * unknown error occurs during processing.
 */
export const processCSV = async (file: File): Promise<ProcessedData> => {
  // Defines the maximum number of records to process.
  const MAX_RECORDS = 10000;

  // Initialize an empty array to store the processed rows.
  const rows: ProcessedRow[] = [];

  // Initialize a counter to track the number of rows skipped.
  let skippedRows = 0;

  try {
    // Read the file and split it into lines.
    const text = await file.text();
    const lines = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    // Evaluate if the file exceeds the maximum record limit. If so, throw an
    // error.
    if (lines.length > MAX_RECORDS) {
      throw new Error(`File exceeds maximum record limit of ${MAX_RECORDS}`);
    }

    // Iterate over each line in the file.
    for (const line of lines) {
      // Split the line into values using a comma as the delimiter.
      const values = line.split(',');

      // Evaluate if the line is empty. If so, skip it.
      if (!values[0]) continue;

      // Detect the value type for the first value in the line.
      const type = detectValueType(values[0]);

      // Initialize a variable to store the normalized value.
      let normalized: string | null = null;

      // Evaluate if the value is an email address or phone number. If so,
      // normalize it.
      if (type === 'email') {
        const validation = validateEmail(values[0]);
        if (validation.isValid) {
          normalized = normalizeEmail(values[0]);
        }
      } else if (type === 'phone') {
        normalized = normalizePhone(values[0]);
      }

      // Evaluate if the normalized value is valid. If so, add the row to the
      // processed rows array. If not, increment the skipped rows counter.
      if (normalized) {
        rows.push({
          original: values[0],
          normalized,
          sha256: generateSha256Hash(normalized),
          base64: generateBase64Hash(normalized),
        });
      } else {
        skippedRows++;
      }
    }

    // Return the processed data with headers, rows, and skipped rows.
    return {
      headers: ['Input', 'Normalized', 'SHA256', 'Base64'],
      rows,
      skippedRows,
    };
  } catch (error: unknown) {
    // If an error occurs during processing, throw an error with a descriptive
    // message.
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`Error processing CSV file: ${errorMessage}`);
  }
};
