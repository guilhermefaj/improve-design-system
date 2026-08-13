# Improve Design System agent instructions

## Source of truth

- Treat `design-system.manifest.json` and `src/tokens/*.tokens.json` as canonical.
- Run `npm run generate` after changing tokens or the manifest.
- Do not edit `src/styles/tokens.css`, `src/tokens/generated.ts`, `llms.txt` or `llms-full.txt` manually.

## Implementation

- Preserve the public exports from `src/index.ts`.
- Keep core components vendor-neutral; adapters for agent SDKs belong in examples.
- Use semantic `--ibs-*` tokens and existing primitives before adding values or components.
- Keep `variant="brand"` as a compatible alias through the 0.x line.
- Use Inter for body and product UI, Clash Display for headings when loaded from Fontshare, Space Grotesk as the redistributable fallback, and Edu NSW ACT Cursive for rare expressive accents.
- Classify reusable UI as foundation, atom, molecule or organism in the manifest before adding it. Templates and pages are intentionally out of scope in v0.3.
- Use orange #F2703E for the primary brand action and purple #483C8F for focus, selection, navigation and agent-thinking states.

## Validation

- Run `npm run check` before release.
- Validate new interactive components with keyboard, accessible names and reduced motion.
- Verify representative UI visually at desktop and mobile widths.
