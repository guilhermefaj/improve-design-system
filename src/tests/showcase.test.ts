import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import manifest from '../../design-system.manifest.json';
import { darkDesignTokens, designTokens, tokenCatalog } from '../tokens/generated';
import { showcaseGroups, showcaseRegistry, showcaseVersion } from '../showcase/registry';

describe('shared showcase registry', () => {
  it('covers every manifest component exactly once', () => {
    const manifestIds = manifest.components.map((component) => component.id).sort();
    const showcaseIds = showcaseRegistry.map((component) => component.id).sort();
    expect(showcaseIds).toEqual(manifestIds);
    expect(new Set(showcaseIds).size).toBe(showcaseIds.length);
    expect(showcaseGroups.flatMap((group) => group.componentIds).sort()).toEqual(manifestIds);
  });

  it('uses the manifest version and exposes both generated themes', () => {
    expect(showcaseVersion).toBe(manifest.version);
    expect(designTokens.color.canvas).toBe('#ffffff');
    expect(darkDesignTokens.color.canvas).toBe('#2c2c2e');
    expect(tokenCatalog.find((token) => token.path === 'approval.background')).toMatchObject({ light: '#ffffff', dark: '#3d3d40' });
  });

  it('preserves semantic CSS references so component tokens follow theme changes', () => {
    const css = readFileSync(resolve(process.cwd(), 'src/styles/tokens.css'), 'utf8');
    expect(css).toContain('--ibs-approval-background: var(--ibs-color-surface-raised);');
    expect(css).toContain("[data-ibs-theme='dark']");
    expect(css).toContain('--ibs-color-feedback-warning-surface: #443921;');
  });
});
