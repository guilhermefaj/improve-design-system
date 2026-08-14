import { readFile, readdir } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const styleRoot = join(root, 'src/styles/components');
const allowedDimensions = new Set([
  '-8px',
  '-4px',
  '-3px',
  '-2px',
  '-1px',
  '1px',
  '1.5px',
  '2px',
  '3px',
  '4px',
  '18px',
  '0.15rem',
  '0.3rem',
  '0.35rem',
  '0.5rem',
  '0.55rem',
  '0.6rem',
  '0.65rem',
  '0.7rem',
  '0.85rem',
  '0.9rem',
  '1rem',
  '1.05rem',
  '1.1rem',
  '1.125rem',
  '1.15rem',
  '1.2rem',
  '1.25rem',
  '1.3rem',
  '1.375rem',
  '1.4rem',
  '1.5rem',
  '1.55rem',
  '1.7rem',
  '1.75rem',
  '2rem',
  '2.25rem',
  '2.3rem',
  '2.5rem',
  '2.75rem',
  '3rem',
  '3.5rem',
  '4rem',
  '4.25rem',
  '4.75rem',
  '5rem',
  '5.4rem',
  '6rem',
  '7.5rem',
  '8rem',
  '8.5rem',
  '9rem',
  '12rem',
  '13rem',
  '17rem',
  '18rem',
  '19rem',
  '20rem',
  '22rem',
  '28rem',
  '30rem',
  '31rem',
  '34rem',
  '36rem',
  '42rem',
  '48rem',
  '52rem',
  '100rem',
]);

const files = (await readdir(styleRoot)).filter((file) => file.endsWith('.css'));
const errors = [];
for (const file of files) {
  const path = join(styleRoot, file);
  const content = await readFile(path, 'utf8');
  const rawColors = content.match(/#[0-9a-f]{3,8}\b|rgba?\([^)]*\)|:\s*(?:white|black)\b/gi) ?? [];
  for (const value of rawColors) errors.push(`${relative(root, path)} uses raw color ${value}`);
  const dimensions = content.match(/-?(?:\d+\.)?\d+(?:px|rem)\b/g) ?? [];
  for (const value of dimensions) {
    if (!allowedDimensions.has(value)) errors.push(`${relative(root, path)} introduces off-scale dimension ${value}`);
  }
}

if (errors.length) throw new Error(`Design value policy failed:\n${errors.join('\n')}`);
console.log(`Design value policy passed for ${files.length} style modules.`);
