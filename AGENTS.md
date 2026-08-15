# Agent and contributor guidance

Structured conventions for AI agents and humans working in this repository. For
fuller context, see [README.md](README.md).

## Docs

- [`.agents/docs/ARCHITECTURE.md`](.agents/docs/ARCHITECTURE.md) — high-level system architecture and diagrams
- [DeepWiki](https://deepwiki.com/deangrant/dii-operator) — indexed project wiki (architecture, API, pipeline)

## Rules

- [`.agents/rules/`](.agents/rules/) (symlinked from [`.cursor/rules`](.cursor/rules))
- [`.agents/rules/web-platform.mdc`](.agents/rules/web-platform.mdc) — always-on Vite / Pages / pnpm policy
- [`.agents/rules/web-native-apis.mdc`](.agents/rules/web-native-apis.mdc) — prefer Web Crypto and native downloads
- [`.agents/rules/web-mui.mdc`](.agents/rules/web-mui.mdc) — MUI theme and `sx` conventions
- [`.agents/rules/web-typescript-structure.mdc`](.agents/rules/web-typescript-structure.mdc) — `apps/web/src` layout
- [`.agents/rules/web-jsdoc.mdc`](.agents/rules/web-jsdoc.mdc) — JSDoc / comment style
- [`.agents/rules/web-solid.mdc`](.agents/rules/web-solid.mdc) — SOLID module boundaries
- [`.agents/rules/web-react-doctor.mdc`](.agents/rules/web-react-doctor.mdc) — run `pnpm doctor:changed` after React edits

## Skills

- [`.agents/skills/`](.agents/skills/)
- [`.agents/skills/dii-normalize/`](.agents/skills/dii-normalize/) — email/phone normalize, Web Crypto hash, CSV batch
- [`.agents/skills/native-web-apis/`](.agents/skills/native-web-apis/) — platform APIs over utility libraries
- [`.agents/skills/typescript-project-structure/`](.agents/skills/typescript-project-structure/) — React folder layers
- [`.agents/skills/jsdoc-typescript-docs/`](.agents/skills/jsdoc-typescript-docs/) — TypeScript comment conventions
- [`.agents/skills/solid-typescript-design/`](.agents/skills/solid-typescript-design/) — SOLID in TypeScript
- [`.agents/skills/react-doctor/`](.agents/skills/react-doctor/) — React diagnostics via pinned `pnpm doctor*`

## Commands

- [`.agents/commands/`](.agents/commands/) (symlinked from [`.cursor/commands`](.cursor/commands))
- `/doctor` — run `pnpm doctor:changed` (or full scan on request)
- `/check` — `pnpm exec biome ci .`
- `/verify` — Biome CI plus `pnpm build`

## Hooks

- Config: [`.cursor/hooks.json`](.cursor/hooks.json)
- `sessionStart` → [`.agents/hooks/session-start.sh`](.agents/hooks/session-start.sh) injects a short AGENTS pointer
- `afterFileEdit` → [`.agents/hooks/biome-after-file-edit.sh`](.agents/hooks/biome-after-file-edit.sh) formats/lints the edited file
- `afterFileEdit` → [`.agents/hooks/react-doctor-after-file-edit.sh`](.agents/hooks/react-doctor-after-file-edit.sh) advisory react-doctor on `src/**/*.ts(x)`
