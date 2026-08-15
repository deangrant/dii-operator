#!/usr/bin/env bash
# sessionStart: inject a short pointer to AGENTS.md. Fail open (never block).
set +e
cat >/dev/null

CONTEXT='Read AGENTS.md for dii-operator agent guidance. Stack: pnpm 11.8 + Vite SPA in apps/web (basename /dii-operator). Skills: dii-normalize, native-web-apis, typescript-project-structure, jsdoc-typescript-docs, solid-typescript-design, react-doctor. Commands: /doctor /check /verify. Gates: pnpm exec biome ci ., pnpm build, pnpm doctor:changed.'

if command -v python3 >/dev/null 2>&1; then
  python3 -c 'import json,sys; print(json.dumps({"additional_context": sys.argv[1]}))' "$CONTEXT"
else
  # Minimal JSON escape fallback when python3 is unavailable.
  escaped=${CONTEXT//\\/\\\\}
  escaped=${escaped//\"/\\\"}
  printf '{"additional_context":"%s"}\n' "$escaped"
fi

exit 0
