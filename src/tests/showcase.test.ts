import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import manifest from '../../design-system.manifest.json';
import { darkDesignTokens, designTokens, tokenCatalog } from '../tokens/generated';
import { showcaseGroups, showcaseRegistry, showcaseVersion } from '../showcase/registry';
import { componentDocumentationRegistry } from '../showcase/componentDocs';

describe('shared showcase registry', () => {
  it('covers every manifest component exactly once', () => {
    const manifestIds = manifest.components.map((component) => component.id).sort();
    const showcaseIds = showcaseRegistry.map((component) => component.id).sort();
    expect(showcaseIds).toEqual(manifestIds);
    expect(new Set(showcaseIds).size).toBe(showcaseIds.length);
    expect(showcaseGroups.flatMap((group) => group.componentIds).sort()).toEqual(manifestIds);
  });

  it('documents the remaining beta and experimental surface', () => {
    const byStatus = Object.fromEntries(
      ['stable', 'beta', 'experimental'].map((status) => [
        status,
        manifest.components.filter((component) => component.status === status).map((component) => component.id),
      ]),
    );
    expect(byStatus.beta).toEqual(['agent-handoff', 'trace-viewer']);
    expect(byStatus.experimental).toEqual(['generated-ui-boundary', 'mcp-app-frame']);
    expect(byStatus.stable).toHaveLength(83);
  });

  it('uses the manifest version and exposes both generated themes', () => {
    expect(showcaseVersion).toBe(manifest.version);
    expect(designTokens.color.canvas).toBe('#ffffff');
    expect(darkDesignTokens.color.canvas).toBe('#2c2c2e');
    expect(tokenCatalog.find((token) => token.path === 'approval.background')).toMatchObject({
      light: '#ffffff',
      dark: '#3d3d40',
    });
    expect(tokenCatalog.find((token) => token.path === 'color.approval-accent')).toMatchObject({
      light: '#483c8f',
      dark: '#c9c2eb',
    });
    for (const path of ['color.agent-awaiting', 'color.risk-medium', 'approval.border']) {
      const token = tokenCatalog.find((item) => item.path === path);
      expect(token?.light).not.toBe('#7a4d00');
      expect(token?.dark).not.toBe('#7a4d00');
    }
  });

  it('provides individual usage guidance and controls for every component id', () => {
    expect(componentDocumentationRegistry.map((entry) => entry.id).sort()).toEqual(
      manifest.components.map((entry) => entry.id).sort(),
    );
    for (const entry of componentDocumentationRegistry) {
      expect(entry.whenToUse.length).toBeGreaterThan(12);
      expect(entry.whenNotToUse.length).toBeGreaterThan(12);
      expect(entry.snippet).toContain('import {');
    }
  });

  it('preserves semantic CSS references so component tokens follow theme changes', () => {
    const css = readFileSync(resolve(process.cwd(), 'src/styles/tokens.css'), 'utf8');
    expect(css).toContain('--ibs-approval-background: var(--ibs-color-surface-raised);');
    expect(css).toContain("[data-ibs-theme='dark']");
    expect(css).toContain('--ibs-color-feedback-warning-surface: #443921;');
  });

  it('keeps the portable agent workspace free from the legacy approval brown', () => {
    const starter = readFileSync(
      resolve(process.cwd(), 'packages/artifact-kit/starters/agent-workspace.tsx'),
      'utf8',
    ).toLowerCase();
    expect(starter).not.toContain('#7a4d00');
    expect(starter).toContain('.approval{border-color:#483c8f');
  });
});
