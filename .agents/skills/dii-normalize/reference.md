# DII normalize — reference

## Module map

| Concern | Path |
| --- | --- |
| Email validate / normalize | `apps/web/src/utils/email/normalize.ts` |
| Phone validate / normalize | `apps/web/src/utils/phone/normalize.ts` |
| SHA-256 hex / Base64 | `apps/web/src/utils/hash/generate.ts` |
| CSV process | `apps/web/src/utils/csv/process.ts` |
| Blob download | `apps/web/src/utils/download/blob.ts` |
| Email hook | `apps/web/src/hooks/use-email-processor.ts` |
| Phone hook | `apps/web/src/hooks/use-phone-processor.ts` |
| Batch UI | `apps/web/src/pages/BatchNormalizer/index.tsx` |

## Hash API surface

| Export | Returns |
| --- | --- |
| `generateSha256Hash(value)` | `Promise<string>` hex digest or `""` |
| `generateBase64Hash(value)` | `Promise<string>` Base64 digest or `""` |
| `generateEmailHashes(normalized)` | `Promise<EmailHashResult>` |
| `generateSha256Pair(value)` | `Promise<{ sha256, base64 }>` one digest |

## CSV limits

| Limit | Value |
| --- | --- |
| Max non-empty lines | `10_000` |
| Output headers | Input, Normalized, SHA256, Base64 |
| Download name | `processed_data.csv` |

## Email normalize checklist

1. Reject empty / invalid format before normalize.
2. Apply option toggles (whitespace, lowercase, Gmail dots, Gmail plus).
3. Hash only the normalized string.
