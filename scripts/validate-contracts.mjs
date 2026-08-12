import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';

const root = resolve(import.meta.dirname, '..');
const readJson = async (file) => JSON.parse(await readFile(resolve(root, file), 'utf8'));
const ajv = new Ajv2020({ allErrors: true, strict: false });
const validators = new Map();

async function validate(schemaFile, dataFile) {
  const data = await readJson(dataFile);
  let validator = validators.get(schemaFile);
  if (!validator) {
    validator = ajv.compile(await readJson(schemaFile));
    validators.set(schemaFile, validator);
  }
  const valid = validator(data);
  if (!valid) {
    const errors = ajv.errorsText(validator.errors, { separator: '\n' });
    throw new Error(`${dataFile} failed ${schemaFile}:\n${errors}`);
  }
}

await validate('schemas/design-system-manifest.schema.json', 'design-system.manifest.json');
const manifest = await readJson('design-system.manifest.json');
for (const recipe of manifest.recipes) await validate('schemas/recipe.schema.json', recipe.file);
for (const tokenSet of manifest.tokenSets) await validate('schemas/token-set.schema.json', tokenSet);

const componentIds = new Set();
for (const component of manifest.components) {
  if (componentIds.has(component.id)) throw new Error(`Duplicate component id: ${component.id}`);
  componentIds.add(component.id);
  for (const file of component.files) await readFile(resolve(root, file), 'utf8');
}
for (const recipe of manifest.recipes) {
  const data = await readJson(recipe.file);
  for (const component of data.components) {
    if (!componentIds.has(component)) throw new Error(`${recipe.file} references unknown component: ${component}`);
  }
}

console.log(`Validated ${manifest.components.length} components, ${manifest.recipes.length} recipes and ${manifest.tokenSets.length} token sets.`);
