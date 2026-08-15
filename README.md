# DII Operator

DII Operator is a client-only web app for **UID2-oriented** email and phone
normalization and hashing. It runs in the browser, uses the Web Crypto API for
SHA-256, and can process a one-column CSV batch. There is no application
backend.

The Vite + React app lives in `apps/web` inside a pnpm workspace. GitHub Pages
serves the build under `/dii-operator/`.

## What it does

| Section | Path | Purpose |
| ------- | ---- | ------- |
| Overview | `/` | Product summary |
| Email | `/email` | Normalize and hash one email address |
| Phone | `/phone` | Normalize and hash one phone number |
| Batch | `/csv` | Normalize and hash a CSV column (up to 10,000 rows) |

For each accepted value the UI shows:

1. The normalized string
2. The SHA-256 digest as lowercase hex
3. The same digest as standard Base64

You can copy each field to the clipboard.

## How it works

All normalize and hash work runs in the browser. Digests use
`crypto.subtle.digest("SHA-256", …)` on UTF-8 bytes of the **normalized**
string. Hex and Base64 share one digest.

### Email (UID2-oriented)

1. Strip all whitespace.
2. Convert to lowercase.
3. For `gmail.com` local parts: remove `.` characters and strip a `+` tag and
   everything after it.
4. Keep the domain unchanged.

Example: `Jane.Doe+Work@gmail.com` → `janedoe@gmail.com`.

### Phone

1. Remove spaces, dashes, and parentheses.
2. Keep digits (and a leading `+` if present).
3. Emit E.164-like form: `+` followed by digits.
4. For Australian numbers starting with `61` and a trunk `0`, drop that trunk
   zero (for example `6104…` → `+614…`).

The app does **not** invent a default country code such as `+1`.

### Hash outputs

| Form | Meaning |
| ---- | ------- |
| Hex | Lowercase hexadecimal encoding of the 32-byte SHA-256 digest |
| Base64 | Standard Base64 encoding of the same 32 bytes |

## Requirements

- Node.js 22 or later
- pnpm 11.8.0 (use Corepack)

## Install and run

```bash
git clone https://github.com/deangrant/dii-operator.git
cd dii-operator
corepack enable
corepack prepare pnpm@11.8.0 --activate
pnpm install
pnpm dev
```

Open [http://localhost:5173/dii-operator/](http://localhost:5173/dii-operator/).
The app uses basename `/dii-operator` to match GitHub Pages.

Root scripts forward to `apps/web`:

| Script | Action |
| ------ | ------ |
| `pnpm dev` | Vite development server |
| `pnpm build` | Typecheck and production build → `apps/web/dist` |
| `pnpm start` | Preview the production build |

## Usage

### Single email or phone

1. Open **Email** or **Phone**.
2. Enter a value and submit.
3. Review normalized, hex, and Base64 outputs. Use the copy control on each
   field.

### CSV batch

1. Open **Batch**.
2. Upload or drop a CSV with one column of emails and/or phones (at most 10,000
   non-empty lines).
3. Download `processed_data.csv` with columns Input, Normalized, SHA256, and
   Base64. Skipped rows are counted in the UI.

## Deploy

CI builds with `pnpm build` and publishes `apps/web/dist` to GitHub Pages. The
Vite `base` is `/dii-operator/`. The build also writes `404.html` so deep links
work on Pages.

## Further reading

- [Architecture](.agents/docs/ARCHITECTURE.md) — system shape and module map
- [AGENTS.md](AGENTS.md) — agent and contributor conventions
- [DeepWiki](https://deepwiki.com/deangrant/dii-operator) — indexed project wiki

## License

This project is licensed under the [MIT License](LICENSE).
