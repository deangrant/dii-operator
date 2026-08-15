# Native Web APIs — reference

## Replacements already in this repo

| Need | Use | Do not use |
| --- | --- | --- |
| SHA-256 hex / Base64 | `utils/hash/generate.ts` (`crypto.subtle`) | `crypto-js` |
| File download | `utils/download/blob.ts` | `file-saver` |
| UTF-8 bytes | `TextEncoder` | Buffer / iconv |

## Digest → hex / Base64 sketch

```ts
const digest = await crypto.subtle.digest(
  "SHA-256",
  new TextEncoder().encode(value),
);
const bytes = new Uint8Array(digest);
const hex = [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
let binary = "";
for (const byte of bytes) {
  binary += String.fromCharCode(byte);
}
const base64 = btoa(binary);
```

## Download sketch

```ts
const url = URL.createObjectURL(blob);
const anchor = document.createElement("a");
anchor.href = url;
anchor.download = filename;
anchor.rel = "noopener";
anchor.click();
URL.revokeObjectURL(url);
```
