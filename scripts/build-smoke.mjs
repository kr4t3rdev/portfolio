import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';
import { extname, join } from 'node:path';

const buildDirectory = process.argv[2] ?? 'dist';
const builtFiles = [
  'index.html',
  'proyectos/financemdm/index.html',
  'styles.css',
  'script.js',
  'favicon.svg',
  'proyectos/financemdm/case-study.css',
  'licenses/pqoqubbw-icons-MIT.txt',
  'licenses/lucide-ISC-and-feather-MIT.txt',
];

for (const file of builtFiles) {
  await access(join(buildDirectory, file));
}

const home = await readFile(join(buildDirectory, 'index.html'), 'utf8');
const financeCase = await readFile(join(buildDirectory, 'proyectos/financemdm/index.html'), 'utf8');
const findCssFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return findCssFiles(path);
    return extname(entry.name) === '.css' ? [path] : [];
  }));
  return nested.flat();
};
const builtCssFiles = await findCssFiles(buildDirectory);
const builtCss = (await Promise.all(builtCssFiles.map((file) => readFile(file, 'utf8')))).join('\n');
const componentStyles = [home, financeCase]
  .flatMap((html) => [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((match) => match[1]))
  .join('\n');
const renderedStyles = `${builtCss}\n${componentStyles}`;
const pqoqubbwNotice = await readFile(join(buildDirectory, 'licenses/pqoqubbw-icons-MIT.txt'), 'utf8');
const lucideNotice = await readFile(join(buildDirectory, 'licenses/lucide-ISC-and-feather-MIT.txt'), 'utf8');

assert.match(home, /<title[^>]*>[^<]+<\/title>/i, 'Home page must have a title');
assert.match(home, /href="\/proyectos\/financemdm\/"/, 'Home page must link to the FinanceMDM case study');
assert.match(home, /href="\.\/styles\.css(?:\?[^"]*)?"/, 'Home page must load its stylesheet');
assert.match(financeCase, /<h1[ >]/, 'FinanceMDM case study must render its main heading');
assert.match(financeCase, /href="\/proyectos\/financemdm\/case-study\.css(?:\?[^"]*)?"/, 'Case study must load its stylesheet');

console.log('Built route and asset smoke checks passed.');

assert.match(home, /class="animated-icon animated-icon-arrow-up-right"[^>]*aria-hidden="true"/);
assert.match(home, /class="brand-icon brand-icon-whatsapp"[^>]*aria-hidden="true"/);
assert.match(home, /aria-label="Contactar por WhatsApp"/);
assert.match(financeCase, /class="animated-icon animated-icon-arrow-down"[^>]*aria-hidden="true"/);
assert.match(home, /data-icon="layout-panel-top"/);
assert.match(home, /data-icon="server"/);
assert.match(home, /data-icon="layers"/);
assert.match(renderedStyles, /prefers-reduced-motion/);
assert.match(renderedStyles, /\.icon-trigger:is\(:hover,:focus-within\)/);
assert.match(renderedStyles, /:is\(a,button,summary\):is\(:hover,:focus-visible\)/);
assert.match(pqoqubbwNotice, /MIT License/);
assert.match(lucideNotice, /ISC License/);
