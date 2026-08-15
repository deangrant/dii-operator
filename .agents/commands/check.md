# Check

Run the project Biome CI gate (same command as GitHub Actions lint).

## Steps

1. From the repository root:

   ```bash
   pnpm exec biome ci .
   ```

2. Report exit status and any remaining diagnostics.
3. Do not edit `biome.jsonc` or add `biome-ignore` unless the user explicitly asks.
