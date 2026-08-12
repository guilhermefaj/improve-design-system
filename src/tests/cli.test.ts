// @vitest-environment node
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';

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
    const component = JSON.parse(run(['inspect', 'approval-card', '--json']));
    expect(component.states).toContain('edited');
  });

  it('initializes a fixture with hashes, dependencies and agent guidance', () => {
    const target = fixture();
    run(['init', '--target', target]);
    const config = JSON.parse(readFileSync(resolve(target, 'improve.config.json'), 'utf8'));
    const pkg = JSON.parse(readFileSync(resolve(target, 'package.json'), 'utf8'));
    expect(config.designSystemVersion).toBe('0.2.0');
    expect(config.files.every((file: { hash: string }) => file.hash.length === 64)).toBe(true);
    expect(pkg.dependencies['@fontsource-variable/inter']).toBeDefined();
    expect(readFileSync(resolve(target, 'CLAUDE.md'), 'utf8')).toContain('@AGENTS.md');
    expect(run(['doctor', '--target', target])).toContain('is healthy');
  });

  it('adds agentic components with transitive source files and creates an Artifact starter', () => {
    const target = fixture();
    run(['init', '--target', target]);
    run(['add', 'approval-card', '--target', target]);
    const config = JSON.parse(readFileSync(resolve(target, 'improve.config.json'), 'utf8'));
    expect(config.components).toContain('approval-card');
    expect(readFileSync(resolve(target, 'src/improve/components/Agentic.tsx'), 'utf8')).toContain('ApprovalCard');
    expect(readFileSync(resolve(target, 'src/improve/components/Button.tsx'), 'utf8')).toContain('Button');
    run(['artifact', '--recipe', 'agent-workspace', '--target', target]);
    expect(readFileSync(resolve(target, 'improve-agent-workspace-artifact.tsx'), 'utf8')).toContain('Aprovação necessária');
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
});
