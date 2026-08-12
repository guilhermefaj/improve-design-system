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
- Use Inter for body and product UI, Clash Display for headings, Castledown only for rare expressive accents, and Montserrat Medium only for occasional supporting labels.

## Validation

- Run `npm run check` before release.
- Validate new interactive components with keyboard, accessible names and reduced motion.
- Verify representative UI visually at desktop and mobile widths.
