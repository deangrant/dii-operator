/**
 * One CSV input row after normalization and hashing.
 */
export interface ProcessedRow {
  /** Raw cell value from the uploaded file. */
  original: string;
  /** Normalized email or phone derived from `original`. */
  normalized: string;
  /** Hex-encoded SHA-256 of `normalized`. */
  sha256: string;
  /** Base64-encoded SHA-256 of `normalized`. */
  base64: string;
}

/**
 * Batch CSV processing output, including skip metrics.
 */
export interface ProcessedData {
  /** Column headers written to the downloadable CSV. */
  headers: string[];
  /** Successfully processed rows. */
  rows: ProcessedRow[];
  /** Rows skipped because the value could not be normalized. */
  skippedRows: number;
}
