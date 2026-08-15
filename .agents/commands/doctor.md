# Doctor

Follow the project react-doctor skill and scan React diagnostics.

## Steps

1. Read [`.agents/skills/react-doctor/SKILL.md`](.agents/skills/react-doctor/SKILL.md) (and `reference.md` if needed).
2. From the repository root, run:

   ```bash
   pnpm doctor:changed
   ```

3. If the user asked for a full scan, run `pnpm doctor:full` instead.
4. Summarize score / findings and fix regressions before finishing the task.
5. Do **not** use `npx react-doctor@latest`.
