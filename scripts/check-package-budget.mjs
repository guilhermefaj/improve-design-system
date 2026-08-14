import { readFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const result =
  process.platform === 'win32'
    ? spawnSync(process.env.ComSpec, ['/d', '/s', '/c', 'npm pack --dry-run --json'], { cwd: root, encoding: 'utf8' })
    : spawnSync('npm', ['pack', '--dry-run', '--json'], { cwd: root, encoding: 'utf8' });
if (result.status !== 0) throw new Error(result.stderr || 'npm pack --dry-run failed.');
const [pack] = JSON.parse(result.stdout);
const excluded = pack.files.filter((file) => /^(assets|src\/(demo|stories|showcase|tests)|tests)\//.test(file.path));
if (excluded.length)
  throw new Error(`Distribution contains excluded files: ${excluded.map((file) => file.path).join(', ')}`);
if (pack.size >= 1_000_000) throw new Error(`Packed size ${pack.size} exceeds 1 MB.`);
if (pack.unpackedSize >= 1_750_000) throw new Error(`Unpacked size ${pack.unpackedSize} exceeds 1.75 MB.`);
const css = await readFile(resolve(root, 'dist/improve.css'));
const gzipped = gzipSync(css);
if (css.length >= 900_000) throw new Error(`CSS size ${css.length} exceeds 900 KB.`);
if (gzipped.length >= 620_000) throw new Error(`CSS gzip size ${gzipped.length} exceeds 620 KB.`);
console.log(
  `Package budget passed: ${pack.size} B packed, ${pack.unpackedSize} B unpacked, ${css.length} B CSS, ${gzipped.length} B CSS gzip.`,
);
