import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import manifest from '../../design-system.manifest.json';

describe('Artifact Kit starters', () => {
  for (const recipe of manifest.recipes) {
    it(`compiles the self-contained ${recipe.id} starter`, async () => {
      const source = await readFile(resolve(process.cwd(), recipe.starter), 'utf8');
      const result = ts.transpileModule(source, {
        compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
        reportDiagnostics: true,
      });
      expect(result.diagnostics?.filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error)).toEqual(
        [],
      );
      expect(source).toContain('export default function');
      expect(source).not.toMatch(/https?:\/\//);
    });
  }
});
