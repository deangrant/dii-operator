# Verify

Run Biome CI and the web production build. Treat either failure as blocking.

## Steps

1. From the repository root:

   ```bash
   pnpm exec biome ci .
   ```

2. Then:

   ```bash
   pnpm build
   ```

3. If either command fails, fix the issues and re-run until both succeed.
4. Report a short summary of results when done.
