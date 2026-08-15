---
name: dii-normalize
description: >-
  Implement and review UID2-oriented email/phone normalization, Web Crypto
  SHA-256 hashing, and CSV batch export in the DII Operator SPA. Use when
  changing normalize/hash/CSV utils, processor hooks, or BatchNormalizer.
trigger: >-
  email normalize, phone normalize, UID2, SHA-256, Base64 hash, CSV batch,
  generateSha256, downloadBlob, dii-operator, E.164
---

# DII normalize and hash

Apply when you change domain logic under `apps/web/src/utils/{email,phone,hash,csv,download}`
or the email / phone / batch pages and hooks.

Lookup tables: [reference.md](reference.md).

Keywords:

| Keyword | Meaning |
| --- | --- |
| **must** | Required. Do not deviate. |
| **must not** | Forbidden. |
| **should** | Strongly preferred unless a reviewer agrees otherwise. |
| **may** | Optional. |

Use together with:

- [native-web-apis](../native-web-apis/SKILL.md) for crypto/download deps
- [solid-typescript-design](../solid-typescript-design/SKILL.md) for module boundaries
- [jsdoc-typescript-docs](../jsdoc-typescript-docs/SKILL.md) for comments
- [typescript-project-structure](../typescript-project-structure/SKILL.md) for file placement

Conflict rule: domain contracts come from this skill; hashing transport from native-web-apis.

---

## 1. Posture

- This app is a **client-only** SPA. Normalization and hashing **must** run in the browser.
- Hashing **must** use the Web Crypto API via `apps/web/src/utils/hash/generate.ts`.
- Agents **must not** add `crypto-js`, Node `crypto`, or other hash libraries.

## 2. Email

- Validate then normalize in `utils/email/normalize.ts`.
- UID2-oriented steps (defaults on): strip whitespace, lowercase, Gmail local-part dot removal, Gmail `+tag` stripping; preserve domain.
- Hooks **must** await async hash helpers after normalize.

## 3. Phone

- Validate with the permissive E.164-like pattern; normalize to `+` + digits in `utils/phone/normalize.ts`.
- Preserve the Australian `61` trunk-`0` cleanup already in `normalizePhone`.

## 4. Hashing

- Prefer `generateSha256Pair` / `generateEmailHashes` so hex and Base64 share one digest.
- Public hash helpers **must** remain `async` (`crypto.subtle.digest`).
- Call sites (hooks, CSV) **must** await results before setting state or building rows.

## 5. CSV batch

- Cap non-empty lines at **10_000**; reject oversize uploads.
- Classify cells as email / phone / unknown; skip unknowns; count `skippedRows`.
- Export via `downloadBlob` (`utils/download/blob.ts`), not `file-saver`.

## 6. Verification

After domain changes:

```bash
pnpm exec biome ci .
pnpm build
```
