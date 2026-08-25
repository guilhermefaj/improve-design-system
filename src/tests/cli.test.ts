// @vitest-environment node
import { execFileSync, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import manifest from '../../design-system.manifest.json';

const cli = resolve(process.cwd(), 'packages/cli/improve.mjs');
const fixtures: string[] = [];

function fixture() {
  const directory = mkdtempSync(resolve(tmpdir(), 'improve-cli-test-'));
  fixtures.push(directory);
  writeFileSync(resolve(directory, 'package.json'), JSON.stringify({ name: 'fixture', private: true }));
  return directory;
}

function run(args: string[], cwd = process.cwd()) {
  return execFileSync(process.execPath, [cli, ...args], { cwd, encoding: 'utf8' });
}

afterEach(() => {
  for (const directory of fixtures.splice(0)) rmSync(directory, { recursive: true, force: true });
});

describe('source-owned CLI', () => {
  it('lists and inspects the machine-readable catalog', () => {
    const catalog = JSON.parse(run(['list', '--json']));
    expect(catalog.some((item: { id: string }) => item.id === 'approval-card')).toBe(true);
    const actionComponents = JSON.parse(run(['list', '--category', 'action', '--json']));
    expect(actionComponents.every((item: { category: string }) => item.category === 'action')).toBe(true);
    expect(actionComponents.some((item: { id: string }) => item.id === 'button')).toBe(true);
    const component = JSON.parse(run(['inspect', 'approval-card', '--json']));
    expect(component.states).toContain('edited');
  });

  it('initializes a fixture with hashes, dependencies and agent guidance', () => {
    const target = fixture();
    run(['init', '--target', target]);
    const config = JSON.parse(readFileSync(resolve(target, 'improve.config.json'), 'utf8'));
    const pkg = JSON.parse(readFileSync(resolve(target, 'package.json'), 'utf8'));
    expect(config.schemaVersion).toBe(2);
    expect(config.designSystemVersion).toBe(manifest.version);
    expect(config.dependencies['lucide-react']).toBeDefined();
    expect(config.files.every((file: { hash: string }) => file.hash.length === 64)).toBe(true);
    expect(pkg.dependencies['@fontsource-variable/inter']).toBeDefined();
    expect(pkg.dependencies['@fontsource-variable/space-grotesk']).toBeDefined();
    expect(readFileSync(resolve(target, 'CLAUDE.md'), 'utf8')).toContain('@AGENTS.md');
    expect(run(['doctor', '--target', target])).toContain('is healthy');
  });

  it('adds agentic components with transitive source files and creates an Artifact starter', () => {
    const target = fixture();
    run(['init', '--target', target]);
    run(['add', 'approval-card', 'data-grid', '--target', target]);
    const config = JSON.parse(readFileSync(resolve(target, 'improve.config.json'), 'utf8'));
    expect(config.components).toContain('approval-card');
    expect(config.components).toContain('data-grid');
    expect(readFileSync(resolve(target, 'src/improve/components/Agentic.tsx'), 'utf8')).toContain('ApprovalCard');
    expect(readFileSync(resolve(target, 'src/improve/components/Button.tsx'), 'utf8')).toContain('Button');
    expect(readFileSync(resolve(target, 'src/improve/components/organisms/SaasOrganisms.tsx'), 'utf8')).toContain(
      'DataGrid',
    );
    expect(readFileSync(resolve(target, 'src/improve/components/index.ts'), 'utf8')).toContain(
      './organisms/SaasOrganisms',
    );
    run(['artifact', '--recipe', 'agent-workspace', '--target', target]);
    expect(readFileSync(resolve(target, 'improve-agent-workspace-artifact.tsx'), 'utf8')).toContain(
      'Aprovação necessária',
    );
  });

  it('preserves local changes and emits an explicit upgrade patch', () => {
    const target = fixture();
    run(['init', '--target', target]);
    const button = resolve(target, 'src/improve/components/Button.tsx');
    const customized = `${readFileSync(button, 'utf8')}\n// local customization\n`;
    writeFileSync(button, customized);
    expect(run(['diff', '--target', target])).toContain('modified src/improve/components/Button.tsx');
    const upgrade = spawnSync(process.execPath, [cli, 'upgrade', '--target', target], { encoding: 'utf8' });
    expect(upgrade.status).toBe(2);
    expect(readFileSync(button, 'utf8')).toBe(customized);
    expect(readFileSync(`${button}.improve.patch`, 'utf8')).toContain('local customization');
  });

  it('migrates schema v1 and recalculates new files, dependencies and obsolete files', () => {
    const target = fixture();
    run(['init', '--target', target]);
    const configPath = resolve(target, 'improve.config.json');
    const config = JSON.parse(readFileSync(configPath, 'utf8'));
    config.schemaVersion = 1;
    delete config.dependencies;
    const newFile = config.files.find(
      (file: { source: string }) => file.source === 'src/styles/components/agentic.css',
    );
    config.files = config.files.filter((file: { source: string }) => file !== newFile);
    rmSync(resolve(target, newFile.target));
    const obsoleteContent = 'legacy file\n';
    const obsoleteTarget = 'src/improve/styles/obsolete.css';
    writeFileSync(resolve(target, obsoleteTarget), obsoleteContent);
    config.files.push({
      source: 'src/styles/obsolete.css',
      target: obsoleteTarget,
      hash: createHash('sha256').update(obsoleteContent).digest('hex'),
    });
    writeFileSync(configPath, JSON.stringify(config, null, 2));
    const pkgPath = resolve(target, 'package.json');
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
    pkg.dependencies['@fontsource-variable/inter'] = '^4.0.0';
    writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

    expect(run(['upgrade', '--target', target])).toContain('Removed obsolete file');
    const upgraded = JSON.parse(readFileSync(configPath, 'utf8'));
    const upgradedPackage = JSON.parse(readFileSync(pkgPath, 'utf8'));
    expect(upgraded.schemaVersion).toBe(2);
    expect(upgraded.files.some((file: { source: string }) => file.source === 'src/styles/components/agentic.css')).toBe(
      true,
    );
    expect(() => readFileSync(resolve(target, obsoleteTarget), 'utf8')).toThrow();
    expect(upgradedPackage.dependencies['@fontsource-variable/inter']).toBe('^5.2.8');
  });

  it('creates six distinct Artifact recipes', () => {
    const target = fixture();
    for (const recipe of ['landing-page', 'dashboard', 'app', 'slides', 'agent-workspace', 'artifact']) {
      run(['artifact', '--recipe', recipe, '--target', target]);
      const source = readFileSync(resolve(target, `improve-${recipe}-artifact.tsx`), 'utf8');
      expect(source).toContain('export default function');
    }
  });
});
