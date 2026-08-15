---
name: native-web-apis
description: >-
  Prefer native JavaScript and Web platform APIs over utility libraries when
  adding imports or changing dependencies in apps/web. Use when hashing,
  downloading files, encoding text, or evaluating a new npm dependency.
trigger: >-
  Web Crypto, crypto.subtle, native APIs, file download, createObjectURL,
  TextEncoder, btoa, dependency reduction, crypto-js, file-saver
---

# Prefer native Web APIs

Minimize bundle size, attack surface, and maintenance cost. Reach for platform
APIs before adding imports or changing dependencies.

Lookup examples: [reference.md](reference.md).

Keywords:

| Keyword | Meaning |
| --- | --- |
| **must** | Required. Do not deviate. |
| **must not** | Forbidden. |
| **should** | Strongly preferred unless a reviewer agrees otherwise. |
| **may** | Optional. |

Related rule: `.agents/rules/web-native-apis.mdc` (thin pointer to this skill).

---

## Must

- Prefer Web Crypto (`crypto.subtle`) for hashing; use `apps/web/src/utils/hash/generate.ts`.
- Prefer `URL.createObjectURL` + temporary `<a download>` via `utils/download/blob` for downloads.
- Prefer built-ins (`fetch`, `URL`, `URLSearchParams`, `TextEncoder`/`TextDecoder`, `structuredClone`, `btoa`/`atob`) when they cover the need.
- Add workspace deps with `catalog:` pins in `pnpm-workspace.yaml` when a library is truly required.

## Must not

- Add a third-party package solely to wrap a one-liner platform API.
- Reintroduce `crypto-js` or `file-saver` without a documented platform gap and explicit user approval.
- Use Node-only APIs (`node:crypto`, `Buffer`) in browser app code.

## Should

- Encode strings with `TextEncoder` (UTF-8) before `subtle.digest`.
- Derive hex and Base64 from one digest when both are needed.
- Revoke object URLs after download clicks.

## When a library is justified

A dependency **may** be added when:

- The platform API is missing in supported browsers and a polyfill is unacceptable, or
- The problem needs a maintained algorithm not in the platform (and MUI/React already do not cover it).

Document the gap in the PR summary.
