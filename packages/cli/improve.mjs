#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { access, copyFile, cp, mkdir, mkdtemp, readFile, rm, unlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, dirname, relative, resolve, sep } from 'node:path';
import { spawnSync } from 'node:child_process';
import process from 'node:process';

const sourceRoot = resolve(import.meta.dirname, '../..');
const manifest = JSON.parse(await readFile(resolve(sourceRoot, 'design-system.manifest.json'), 'utf8'));
const args = process.argv.slice(2);
const command = args[0] ?? 'help';

function option(name, fallback) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : fallback;
}

function flag(name) {
  return args.includes(name);
}

function positional(after = 1) {
  const values = [];
  const valueOptions = new Set(['--target', '--recipe', '--output', '--level']);
  for (let index = after; index < args.length; index += 1) {
    if (args[index].startsWith('--')) {
      if (valueOptions.has(args[index])) index += 1;
      continue;
    }
    values.push(args[index]);
  }
  return values;
}

const targetRoot = resolve(option('--target', process.cwd()));
const configPath = resolve(targetRoot, 'improve.config.json');
const installRoot = resolve(targetRoot, manifest.installation.installRoot);

function ensureInside(parent, child) {
  const path = relative(parent, child);
  if (path.startsWith(`..${sep}`) || path === '..' || resolve(parent, path) !== resolve(child))
    throw new Error(`Unsafe destination: ${child}`);
}

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

function digest(content) {
  return createHash('sha256').update(content).digest('hex');
}

async function readConfig() {
  if (!(await exists(configPath))) throw new Error('improve.config.json not found. Run improve-ds init first.');
  const config = JSON.parse(await readFile(configPath, 'utf8'));
  if (config.schemaVersion === 1) {
    config.schemaVersion = 2;
    config.dependencies = { ...manifest.installation.dependencies };
    config.installRoot = config.installRoot ?? manifest.installation.installRoot;
  }
  if (config.schemaVersion !== 2) throw new Error(`Unsupported improve.config.json schema: ${config.schemaVersion}.`);
  return config;
}

async function saveConfig(config) {
  await writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`, 'utf8');
}

function componentById(id) {
  const component = manifest.components.find((item) => item.id === id);
  if (!component) throw new Error(`Unknown component: ${id}. Run improve-ds list.`);
  return component;
}

function filesForComponents(ids) {
  const files = new Set(manifest.installation.sharedFiles);
  for (const id of ids) for (const file of componentById(id).files) files.add(file);
  return [...files];
}

function targetForSource(source) {
  if (source === 'src/index.ts') return `${manifest.installation.installRoot}/index.ts`;
  if (source.startsWith('src/')) return `${manifest.installation.installRoot}/${source.slice(4)}`;
  return `${manifest.installation.installRoot}/${source}`;
}

async function copyTrackedFile(source, config, force = false) {
  const absoluteSource = resolve(sourceRoot, source);
  const target = targetForSource(source);
  const absoluteTarget = resolve(targetRoot, target);
  ensureInside(targetRoot, absoluteTarget);
  const content = await readFile(absoluteSource);
  const current = config.files.find((item) => item.target === target);
  if (await exists(absoluteTarget)) {
    const installedContent = await readFile(absoluteTarget);
    if (!force && current && digest(installedContent) !== current.hash && !installedContent.equals(content)) {
      console.warn(`Skipped locally modified file: ${target}`);
      return false;
    }
  }
  await mkdir(dirname(absoluteTarget), { recursive: true });
  await writeFile(absoluteTarget, content);
  const entry = { source, target, hash: digest(content) };
  if (current) Object.assign(current, entry);
  else config.files.push(entry);
  return true;
}

async function writeComponentIndex(config) {
  const moduleNames = new Set();
  for (const id of config.components) {
    for (const file of componentById(id).files) {
      if (file.startsWith('src/components/') && file.endsWith('.tsx'))
        moduleNames.add(file.slice('src/components/'.length, -'.tsx'.length));
    }
  }
  const target = resolve(installRoot, 'components/index.ts');
  const content = `${[...moduleNames]
    .sort()
    .map((name) => `export * from './${name}';`)
    .join('\n')}\n`;
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, content, 'utf8');
  const relativeTarget = relative(targetRoot, target).replaceAll('\\', '/');
  const current = config.files.find((item) => item.target === relativeTarget);
  const entry = { source: '@generated/components-index', target: relativeTarget, hash: digest(content) };
  if (current) Object.assign(current, entry);
  else config.files.push(entry);
}

function numericVersion(value) {
  const match = String(value ?? '').match(/(\d+)\.(\d+)\.(\d+)/);
  return match ? match.slice(1).map(Number) : null;
}

function isBelow(current, required) {
  const left = numericVersion(current);
  const right = numericVersion(required);
  if (!left || !right) return false;
  for (let index = 0; index < 3; index += 1) {
    if (left[index] !== right[index]) return left[index] < right[index];
  }
  return false;
}

async function updatePackageJson(config) {
  const file = resolve(targetRoot, 'package.json');
  if (!(await exists(file))) return false;
  const pkg = JSON.parse(await readFile(file, 'utf8'));
  pkg.dependencies ??= {};
  let changed = false;
  for (const [name, version] of Object.entries(manifest.installation.dependencies)) {
    const current = pkg.dependencies[name] ?? pkg.devDependencies?.[name];
    if (!current || isBelow(current, version)) {
      pkg.dependencies[name] = version;
      changed = true;
    }
  }
  if (changed) await writeFile(file, `${JSON.stringify(pkg, null, 2)}\n`, 'utf8');
  if (config) config.dependencies = { ...manifest.installation.dependencies };
  return changed;
}

async function installAgentGuidance(config) {
  const skillSource = resolve(sourceRoot, 'skills/improve-design-system');
  for (const directory of ['.agents/skills/improve-design-system', '.claude/skills/improve-design-system']) {
    const destination = resolve(targetRoot, directory);
    ensureInside(targetRoot, destination);
    await mkdir(dirname(destination), { recursive: true });
    await cp(skillSource, destination, { recursive: true, force: true });
  }

  const agentsPath = resolve(targetRoot, 'AGENTS.md');
  const agentsBlock = `## Improve Design System\n\n- Read \`improve.config.json\` and \`src/improve/tokens/generated.ts\` before creating UI.\n- Use installed Improve components and semantic tokens; do not invent colors, spacing or radii.\n- Run \`npx -p "github:guilhermefaj/improve-design-system#v${manifest.version}" improve-ds doctor\` after changes.\n`;
  if (!(await exists(agentsPath))) await writeFile(agentsPath, `# Agent instructions\n\n${agentsBlock}`, 'utf8');
  else {
    const current = await readFile(agentsPath, 'utf8');
    if (!current.includes('## Improve Design System'))
      await writeFile(agentsPath, `${current.trimEnd()}\n\n${agentsBlock}`, 'utf8');
  }

  const claudePath = resolve(targetRoot, 'CLAUDE.md');
  if (!(await exists(claudePath)))
    await writeFile(
      claudePath,
      '@AGENTS.md\n\nUse the Improve Design System skill for React interfaces and Claude Artifacts.\n',
      'utf8',
    );
  else {
    const current = await readFile(claudePath, 'utf8');
    if (!current.includes('@AGENTS.md')) await writeFile(claudePath, `@AGENTS.md\n\n${current}`, 'utf8');
  }
  config.agentGuidance = [
    'AGENTS.md',
    'CLAUDE.md',
    '.agents/skills/improve-design-system',
    '.claude/skills/improve-design-system',
  ];
}

async function init() {
  const stableIds = manifest.components.filter((item) => item.status === 'stable').map((item) => item.id);
  const requested = flag('--all') ? manifest.components.map((item) => item.id) : stableIds;
  const config = {
    schemaVersion: 2,
    designSystemVersion: manifest.version,
    source: manifest.source.repository,
    installRoot: manifest.installation.installRoot,
    components: [],
    files: [],
    dependencies: { ...manifest.installation.dependencies },
    agentGuidance: [],
  };
  await mkdir(installRoot, { recursive: true });
  for (const file of filesForComponents(requested)) await copyTrackedFile(file, config, flag('--force'));
  config.components = [...new Set(requested)].sort();
  await writeComponentIndex(config);
  const packageUpdated = await updatePackageJson(config);
  await installAgentGuidance(config);
  await saveConfig(config);
  console.log(
    `Improve Design System ${manifest.version} initialized with ${config.components.length} component groups.`,
  );
  if (packageUpdated) console.log('Dependencies were added to package.json. Run your package manager install command.');
}

async function add() {
  const ids = positional();
  if (ids.length === 0)
    throw new Error('Choose one or more components. Example: improve-ds add approval-card tool-call-card');
  const config = await readConfig();
  for (const id of ids) componentById(id);
  for (const file of filesForComponents(ids)) await copyTrackedFile(file, config, flag('--force'));
  config.components = [...new Set([...config.components, ...ids])].sort();
  config.designSystemVersion = manifest.version;
  await writeComponentIndex(config);
  await updatePackageJson(config);
  await saveConfig(config);
  console.log(`Added: ${ids.join(', ')}.`);
}

function list() {
  const level = option('--level');
  const components = level ? manifest.components.filter((item) => item.atomicLevel === level) : manifest.components;
  if (flag('--json')) console.log(JSON.stringify(components, null, 2));
  else
    for (const item of components)
      console.log(
        `${item.id.padEnd(24)} ${(item.atomicLevel ?? item.category).padEnd(12)} ${item.status.padEnd(12)} ${item.description}`,
      );
}

function inspect() {
  const id = positional()[0];
  if (!id) throw new Error('Choose a component id. Example: improve-ds inspect approval-card --json');
  const component = componentById(id);
  if (flag('--json')) console.log(JSON.stringify(component, null, 2));
  else
    console.log(
      `${component.name}\n${component.description}\nExports: ${component.exports.join(', ')}\nStates: ${component.states.join(', ') || 'none'}\nAccessibility: ${component.accessibility.join(' ')}`,
    );
}

async function doctor() {
  const config = await readConfig();
  const issues = [];
  for (const file of config.files) {
    const target = resolve(targetRoot, file.target);
    if (!(await exists(target))) issues.push(`Missing: ${file.target}`);
    else if (digest(await readFile(target)) !== file.hash) issues.push(`Locally modified: ${file.target}`);
  }
  const packageFile = resolve(targetRoot, 'package.json');
  if (await exists(packageFile)) {
    const pkg = JSON.parse(await readFile(packageFile, 'utf8'));
    for (const [name, version] of Object.entries(manifest.installation.dependencies)) {
      const current = pkg.dependencies?.[name] ?? pkg.devDependencies?.[name];
      if (!current) issues.push(`Missing dependency declaration: ${name}`);
      else if (isBelow(current, version))
        issues.push(`Dependency ${name} is ${current}; requires at least ${version}.`);
    }
  }
  const desiredSources = new Set(filesForComponents(config.components));
  for (const file of config.files.filter((item) => !item.source.startsWith('@generated/'))) {
    if (!desiredSources.has(file.source)) issues.push(`Orphaned tracked file: ${file.target}`);
  }
  if (config.designSystemVersion !== manifest.version)
    issues.push(`Installed ${config.designSystemVersion}; source is ${manifest.version}.`);
  if (issues.length) {
    console.log(`Doctor found ${issues.length} issue(s):\n- ${issues.join('\n- ')}`);
    process.exitCode = 1;
  } else console.log(`Improve Design System ${manifest.version} is healthy.`);
}

async function diff() {
  const config = await readConfig();
  let changes = 0;
  for (const file of config.files) {
    const target = resolve(targetRoot, file.target);
    if (!(await exists(target))) {
      console.log(`missing  ${file.target}`);
      changes += 1;
      continue;
    }
    const hash = digest(await readFile(target));
    if (hash !== file.hash) {
      console.log(`modified ${file.target}`);
      changes += 1;
    }
  }
  if (!changes) console.log('No local changes to installed Improve files.');
}

async function createPatch(currentFile, desiredContent, patchFile) {
  const temp = await mkdtemp(resolve(tmpdir(), 'improve-ds-'));
  const candidate = resolve(temp, basename(currentFile));
  await writeFile(candidate, desiredContent);
  const result = spawnSync('git', ['diff', '--no-index', '--no-color', '--', currentFile, candidate], {
    encoding: 'utf8',
  });
  await writeFile(patchFile, result.stdout || `Desired content:\n${desiredContent.toString('utf8')}`, 'utf8');
  await rm(temp, { recursive: true, force: true });
}

async function upgrade() {
  const config = await readConfig();
  const force = flag('--force');
  let patched = 0;
  const desiredSources = new Set(filesForComponents(config.components));
  const trackedBySource = new Map(config.files.map((file) => [file.source, file]));

  for (const sourceName of desiredSources) {
    const source = resolve(sourceRoot, sourceName);
    const targetName = targetForSource(sourceName);
    const target = resolve(targetRoot, targetName);
    const file = trackedBySource.get(sourceName);
    const desired = await readFile(source);
    const current = (await exists(target)) ? await readFile(target) : Buffer.from('');
    if (!force && file && digest(current) !== file.hash && !current.equals(desired)) {
      await createPatch(target, desired, `${target}.improve.patch`);
      console.warn(`Created patch for locally modified file: ${targetName}.improve.patch`);
      patched += 1;
      continue;
    }
    if (!force && !file && current.length && !current.equals(desired)) {
      await createPatch(target, desired, `${target}.improve.patch`);
      console.warn(`Created patch instead of overwriting an untracked local file: ${targetName}.improve.patch`);
      patched += 1;
      continue;
    }
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, desired);
    const entry = { source: sourceName, target: targetName, hash: digest(desired) };
    if (file) Object.assign(file, entry);
    else config.files.push(entry);
  }

  for (const file of config.files.filter(
    (item) => !item.source.startsWith('@generated/') && !desiredSources.has(item.source),
  )) {
    const target = resolve(targetRoot, file.target);
    if (!(await exists(target))) {
      config.files = config.files.filter((item) => item !== file);
      continue;
    }
    const current = await readFile(target);
    if (force || digest(current) === file.hash) {
      await unlink(target);
      config.files = config.files.filter((item) => item !== file);
      console.log(`Removed obsolete file: ${file.target}`);
    } else {
      console.warn(`Preserved locally modified obsolete file: ${file.target}`);
    }
  }
  await updatePackageJson(config);
  config.designSystemVersion = manifest.version;
  config.schemaVersion = 2;
  config.installRoot = manifest.installation.installRoot;
  await writeComponentIndex(config);
  await saveConfig(config);
  console.log(
    `Upgrade completed to ${manifest.version}${patched ? ` with ${patched} patch(es) requiring review` : ''}.`,
  );
  if (patched) process.exitCode = 2;
}

async function artifact() {
  const recipe = option('--recipe', 'dashboard');
  const recipeEntry = manifest.recipes.find((item) => item.id === recipe);
  if (!recipeEntry) throw new Error(`Unknown Artifact recipe: ${recipe}`);
  const output = resolve(targetRoot, option('--output', `improve-${recipe}-artifact.tsx`));
  ensureInside(targetRoot, output);
  await mkdir(dirname(output), { recursive: true });
  await copyFile(resolve(sourceRoot, recipeEntry.starter), output);
  console.log(`Created ${relative(targetRoot, output)} from the ${recipe} recipe.`);
}

function help() {
  console.log(
    `Improve Design System ${manifest.version}\n\nCommands:\n  init [--all] [--target path] [--force]\n  add <component...> [--target path] [--force]\n  list [--level foundation|atom|molecule|organism] [--json]\n  inspect <component> [--json]\n  doctor [--target path]\n  diff [--target path]\n  upgrade [--target path] [--force]\n  artifact --recipe <dashboard|landing-page|agent-workspace|app|slides> [--output file]\n`,
  );
}

try {
  if (command === 'init') await init();
  else if (command === 'add') await add();
  else if (command === 'list') list();
  else if (command === 'inspect') inspect();
  else if (command === 'doctor') await doctor();
  else if (command === 'diff') await diff();
  else if (command === 'upgrade') await upgrade();
  else if (command === 'artifact') await artifact();
  else help();
} catch (error) {
  console.error(`Improve DS error: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
