import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import process from 'node:process';

const root = resolve(import.meta.dirname, '..');
const args = process.argv.slice(2);
const option = (name, fallback) => {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : fallback;
};
const framework = option('--framework', 'vite');
const reactVersion = option('--react', '19.2.8');
const major = Number(reactVersion.split('.')[0]);
if (!['vite', 'next'].includes(framework)) throw new Error(`Unknown fixture framework: ${framework}`);
if (!/^(?:18|19)\.\d+\.\d+$/.test(reactVersion) && reactVersion !== 'canary')
  throw new Error(`Unsupported React fixture: ${reactVersion}`);
const directory = await mkdtemp(resolve(tmpdir(), `improve-${framework}-${major || 'canary'}-`));
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const node = process.execPath;
const run = (command, commandArgs) => {
  const result =
    process.platform === 'win32' && command === npm
      ? spawnSync(process.env.ComSpec, ['/d', '/s', '/c', `npm ${commandArgs.join(' ')}`], {
          cwd: directory,
          encoding: 'utf8',
          stdio: 'pipe',
        })
      : spawnSync(command, commandArgs, { cwd: directory, encoding: 'utf8', stdio: 'pipe' });
  if (result.status !== 0)
    throw new Error(`${command} ${commandArgs.join(' ')} failed:\n${result.stdout}\n${result.stderr}`);
};

try {
  const dependencies = { react: reactVersion, 'react-dom': reactVersion };
  const devDependencies = {
    typescript: '^5.9.3',
    '@types/react': major === 18 ? '^18.3.0' : '^19.2.0',
    '@types/react-dom': major === 18 ? '^18.3.0' : '^19.2.0',
    '@types/node': '^24.0.0',
  };
  if (framework === 'vite') Object.assign(devDependencies, { vite: '^8.2.1', '@vitejs/plugin-react': '^6.0.1' });
  else dependencies.next = major === 18 ? '14.2.35' : '16.3.0';
  await writeFile(
    resolve(directory, 'package.json'),
    JSON.stringify(
      {
        name: 'improve-consumer-fixture',
        private: true,
        scripts: { build: framework === 'vite' ? 'vite build && vite build --ssr src/ssr.tsx' : 'next build' },
        dependencies,
        devDependencies,
      },
      null,
      2,
    ),
  );
  run(node, [resolve(root, 'packages/cli/improve.mjs'), 'init', '--target', directory]);
  run(npm, ['install', '--ignore-scripts', '--no-audit', '--no-fund']);
  if (framework === 'vite') {
    await mkdir(resolve(directory, 'src'), { recursive: true });
    await writeFile(
      resolve(directory, 'index.html'),
      '<div id="root"></div><script type="module" src="/src/main.tsx"></script>',
    );
    await writeFile(
      resolve(directory, 'src/App.tsx'),
      'import { Button, Card, CardBody } from \'./improve\'; export function App(){return <Card><CardBody><Button variant="primary">Começar</Button></CardBody></Card>}',
    );
    await writeFile(
      resolve(directory, 'src/main.tsx'),
      "import React from 'react'; import {createRoot} from 'react-dom/client'; import {App} from './App'; createRoot(document.getElementById('root')!).render(<App/>);",
    );
    await writeFile(
      resolve(directory, 'src/ssr.tsx'),
      "import React from 'react'; import {renderToString} from 'react-dom/server'; import {App} from './App'; export default renderToString(<App/>);",
    );
    await writeFile(
      resolve(directory, 'vite.config.ts'),
      "import {defineConfig} from 'vite'; import react from '@vitejs/plugin-react'; export default defineConfig({plugins:[react()]});",
    );
  } else {
    await mkdir(resolve(directory, 'app'), { recursive: true });
    await writeFile(
      resolve(directory, 'app/layout.tsx'),
      "import type {ReactNode} from 'react'; export default function Layout({children}:{children:ReactNode}){return <html><body>{children}</body></html>}",
    );
    await writeFile(
      resolve(directory, 'app/page.tsx'),
      'import {Button, Card, CardBody} from \'../src/improve\'; export default function Page(){return <Card><CardBody><Button variant="primary">Começar</Button></CardBody></Card>}',
    );
    await writeFile(resolve(directory, 'next.config.mjs'), 'export default { reactStrictMode: true };');
  }
  run(npm, ['run', 'build']);
  const config = JSON.parse(await readFile(resolve(directory, 'improve.config.json'), 'utf8'));
  if (config.schemaVersion !== 2) throw new Error('Fixture did not receive improve.config.json schema v2.');
  console.log(`Consumer fixture passed: ${framework}, React ${reactVersion}.`);
} finally {
  await rm(directory, { recursive: true, force: true });
}
