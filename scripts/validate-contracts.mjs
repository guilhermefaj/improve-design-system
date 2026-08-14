import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';

const root = resolve(import.meta.dirname, '..');
const readText = (file) => readFile(resolve(root, file), 'utf8');
const readJson = async (file) => JSON.parse(await readText(file));
const exists = async (file) =>
  readFile(resolve(root, file)).then(
    () => true,
    () => false,
  );
const ajv = new Ajv2020({ allErrors: true, strict: false });
const validators = new Map();

async function validate(schemaFile, dataFile) {
  const data = await readJson(dataFile);
  let validator = validators.get(schemaFile);
  if (!validator) {
    validator = ajv.compile(await readJson(schemaFile));
    validators.set(schemaFile, validator);
  }
  if (!validator(data))
    throw new Error(`${dataFile} failed ${schemaFile}:\n${ajv.errorsText(validator.errors, { separator: '\n' })}`);
}

function flattenTokens(node, path = [], result = new Set()) {
  if (!node || typeof node !== 'object' || Array.isArray(node)) return result;
  if (Object.hasOwn(node, '$value')) {
    result.add(path.join('.'));
    return result;
  }
  for (const [key, value] of Object.entries(node))
    if (!key.startsWith('$')) flattenTokens(value, [...path, key], result);
  return result;
}

function cssName(path) {
  if (path === 'layout.container') return '--ibs-container';
  if (path === 'layout.content') return '--ibs-content';
  if (/^color\.(orange|purple|neutral|green|blue|red|yellow)\./.test(path))
    return `--ibs-${path.replace(/^color\./, '').replaceAll('.', '-')}`;
  return `--ibs-${path.replaceAll('.', '-')}`;
}

function exportedNames(source, runtimeOnly = false) {
  const names = new Set();
  const pattern = runtimeOnly
    ? /export\s+(?:async\s+)?(?:function|const|class)\s+([A-Za-z_$][\w$]*)/g
    : /export\s+(?:async\s+)?(?:function|const|class|type|interface)\s+([A-Za-z_$][\w$]*)/g;
  for (const match of source.matchAll(pattern)) names.add(match[1]);
  return names;
}

await validate('schemas/design-system-manifest.schema.json', 'design-system.manifest.json');
const manifest = await readJson('design-system.manifest.json');
for (const recipe of manifest.recipes) await validate('schemas/recipe.schema.json', recipe.file);
for (const tokenSet of manifest.tokenSets) await validate('schemas/token-set.schema.json', tokenSet);

const rootPackage = await readJson('package.json');
for (const packageFile of [
  'package.json',
  'packages/cli/package.json',
  'packages/registry/package.json',
  'packages/artifact-kit/package.json',
]) {
  const pkg = await readJson(packageFile);
  if (pkg.version !== manifest.version)
    throw new Error(`${packageFile} version ${pkg.version} differs from manifest ${manifest.version}.`);
}
if (rootPackage.version !== manifest.version) throw new Error('Root package and manifest versions differ.');

const allTokens = new Set();
for (const tokenSet of manifest.tokenSets)
  for (const token of flattenTokens(await readJson(tokenSet))) allTokens.add(token);
const tokenDefinitionSource = (await Promise.all(manifest.tokenSets.map(readText))).join('\n');
const styleFiles = (await readdir(resolve(root, 'src/styles/components'))).filter((file) => file.endsWith('.css'));
const styleSource = [
  await readText('src/styles/globals.css'),
  ...(await Promise.all(styleFiles.map((file) => readText(`src/styles/components/${file}`)))),
].join('\n');
const componentSourceFiles = (await readdir(resolve(root, 'src/components'), { recursive: true }))
  .filter((file) => file.endsWith('.tsx'))
  .map((file) => `src/components/${file.replaceAll('\\', '/')}`);
const allComponentSource = (await Promise.all(componentSourceFiles.map(readText))).join('\n');
const publicRuntimeExports = exportedNames(allComponentSource, true);
const manifestExports = new Set(manifest.components.flatMap((component) => component.exports));
for (const name of publicRuntimeExports)
  if (!manifestExports.has(name)) throw new Error(`Public runtime export is absent from manifest: ${name}.`);

const componentIds = new Set();
const storybookLevelPrefixes = {
  foundation: '01-foundations',
  atom: '02-atoms',
  molecule: '03-molecules',
  organism: '04-organisms',
  template: '05-templates',
  page: '06-pages',
};
for (const component of manifest.components) {
  if (componentIds.has(component.id)) throw new Error(`Duplicate component id: ${component.id}`);
  componentIds.add(component.id);
  if (!component.exports.includes(component.primaryExport))
    throw new Error(`${component.id} primaryExport is not listed in exports.`);
  const expectedStorybookId = `${storybookLevelPrefixes[component.atomicLevel]}-${component.id}--playground`;
  if (component.storybookId !== expectedStorybookId)
    throw new Error(`${component.id} storybookId must be ${expectedStorybookId}.`);
  const sources = await Promise.all(
    component.files.map(async (file) => {
      if (!(await exists(file))) throw new Error(`${component.id} references missing file: ${file}`);
      return readText(file);
    }),
  );
  const declared = exportedNames(sources.join('\n'));
  for (const name of component.exports)
    if (!declared.has(name)) throw new Error(`${component.id} declares missing export: ${name}.`);
  const propsName = `${component.primaryExport}Props`;
  if (!declared.has(propsName) && !component.exports.some((name) => name === propsName))
    throw new Error(`${component.id} must expose named props: ${propsName}.`);

  for (const tokenReference of component.tokens) {
    const matches = [...allTokens].filter(
      (token) => token === tokenReference || token.startsWith(`${tokenReference}.`),
    );
    if (!matches.length)
      throw new Error(`${component.id} references unknown token or token family: ${tokenReference}.`);
    if (
      !matches.some(
        (token) =>
          styleSource.includes(`var(${cssName(token)})`) ||
          allComponentSource.includes(`var(${cssName(token)})`) ||
          tokenDefinitionSource.includes(`{${token}}`),
      )
    ) {
      throw new Error(
        `${component.id} declares token ${tokenReference}, but no matching token is consumed by component source.`,
      );
    }
  }

  const imports = new Set(
    sources
      .join('\n')
      .matchAll(/from\s+['"]([^'".][^'"]*)['"]/g)
      .map((match) =>
        match[1].split('/')[0].startsWith('@') ? match[1].split('/').slice(0, 2).join('/') : match[1].split('/')[0],
      ),
  );
  for (const dependency of imports)
    if (!component.dependencies.includes(dependency))
      throw new Error(`${component.id} imports undeclared dependency: ${dependency}.`);

  const storyFile = `src/stories/generated/${component.id}.stories.tsx`;
  if (!(await exists(storyFile))) throw new Error(`${component.id} has no generated individual story.`);
  const story = await readText(storyFile);
  if (
    !story.includes(component.storybookId.split('--')[0].replaceAll('-', ' ')) &&
    !story.includes(`componentId: "${component.id}"`) &&
    !story.includes(`componentId: '${component.id}'`)
  )
    throw new Error(`${component.id} story metadata is not connected.`);
  for (const value of [...component.variants, ...component.states])
    if (!story.includes(JSON.stringify(value)))
      throw new Error(`${component.id} does not document ${value} in its individual story.`);
}

for (const recipe of manifest.recipes) {
  const data = await readJson(recipe.file);
  for (const component of data.components)
    if (!componentIds.has(component)) throw new Error(`${recipe.file} references unknown component: ${component}`);
  if (!(await exists(recipe.starter))) throw new Error(`${recipe.id} references missing starter: ${recipe.starter}`);
}
for (const file of manifest.installation.sharedFiles)
  if (!(await exists(file))) throw new Error(`Installation shared file is missing: ${file}`);
for (const dependency of Object.keys(manifest.installation.dependencies))
  if (!rootPackage.dependencies?.[dependency])
    throw new Error(`Installation dependency is absent from root package: ${dependency}`);

console.log(
  `Validated ${manifest.components.length} components, ${manifest.recipes.length} recipes, ${manifest.tokenSets.length} token sets, API exports, stories, dependencies and version alignment.`,
);
