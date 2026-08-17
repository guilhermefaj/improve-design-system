# Improve Design System agent instructions

## Source of truth

- Treat `design-system.manifest.json` and `src/tokens/*.tokens.json` as canonical.
- Run `npm run generate` after changing tokens or the manifest.
- Do not edit `src/styles/tokens.css`, `src/tokens/generated.ts`, `llms.txt` or `llms-full.txt` manually.

## Implementation

- Preserve the public exports from `src/index.ts`.
- Keep core components vendor-neutral; adapters for agent SDKs belong in examples.
- Use semantic `--ibs-*` tokens and existing primitives before adding values or components.
- Keep `variant="brand"` as a compatible alias of `primary`.
- Use Inter for body and product UI, Clash Display for headings when loaded from Fontshare, Space Grotesk as the redistributable fallback, and Edu NSW ACT Cursive for rare expressive accents.
- Classify reusable UI as foundation, atom, molecule or organism in the manifest before adding it. Templates and pages are intentionally out of scope in v1.0.
- Use orange #F2703E for primary actions and checked choice controls; use purple for focus, navigation, human approval and agent-thinking states.

## Validation

- Run `npm run check` before release.
- Validate new interactive components with keyboard, accessible names and reduced motion.
- Verify representative UI visually at desktop and mobile widths.

## Cursor Cloud specific instructions

This is a pnpm workspace (`pnpm@11`, Node 22). The update script already runs `pnpm install --frozen-lockfile`, so dependencies are present when a session starts. Scripts live in `package.json`; the pieces of `pnpm check` can also be run individually.

- Services / dev servers (both are Vite-based, no backend or external services):
  - Specimen app (the primary product showcase): `pnpm dev` — serves `src/demo/App.tsx`, an interactive gallery of every component. Use `--host 127.0.0.1 --port 5173` in the cloud VM.
  - Storybook: `pnpm storybook` — component stories with an a11y addon. Use `--host 127.0.0.1 -p 6006 --no-open`.
- Lint / test / build (see `package.json` scripts):
- Contracts and policy: `pnpm generate:check`, `pnpm validate:contracts`, `pnpm design:check`, `pnpm lint`, `pnpm format:check` and `pnpm api:check`.
  - Unit/a11y tests (Vitest + jsdom): `pnpm test`.
  - Builds: `pnpm build` (specimen), `pnpm build:lib` (library), `pnpm storybook:build`.
  - `pnpm check` runs all of the above in sequence.
  - `pnpm test:visual` (Playwright) needs a browser (`pnpm exec playwright install chromium`) and its snapshots are recorded on Windows in CI, so pixel comparisons will diff on Linux — not a reliable local signal.
- Non-obvious pnpm gotcha: this environment's pnpm enforces a supply-chain `allowBuilds` gate. `pnpm-workspace.yaml` sets `allowBuilds: { esbuild: true }`; without an explicit `true`/`false` there, `pnpm install` (and every `pnpm run`, via the verify-deps pre-check) hard-fails with `ERR_PNPM_IGNORED_BUILDS`. esbuild's binary works regardless (it ships as `@esbuild/linux-x64`), so this gate is only about pnpm's exit code. Do not leave the placeholder `esbuild: set this to true or false` that pnpm auto-writes — resolve it to `true`.
