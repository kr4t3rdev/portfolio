import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const buildDirectory = process.argv[2] ?? 'dist';
const builtFiles = [
  'index.html',
  'proyectos/financemdm/index.html',
  'styles.css',
  'script.js',
  'favicon.svg',
  'proyectos/financemdm/case-study.css',
];

for (const file of builtFiles) {
  await access(join(buildDirectory, file));
}

const home = await readFile(join(buildDirectory, 'index.html'), 'utf8');
const financeCase = await readFile(join(buildDirectory, 'proyectos/financemdm/index.html'), 'utf8');

assert.match(home, /<title[^>]*>[^<]+<\/title>/i, 'Home page must have a title');
assert.match(home, /href="\/proyectos\/financemdm\/"/, 'Home page must link to the FinanceMDM case study');
assert.match(home, /href="\.\/styles\.css(?:\?[^"]*)?"/, 'Home page must load its stylesheet');
assert.match(financeCase, /<h1[ >]/, 'FinanceMDM case study must render its main heading');
assert.match(financeCase, /href="\/proyectos\/financemdm\/case-study\.css(?:\?[^"]*)?"/, 'Case study must load its stylesheet');

console.log('Built route and asset smoke checks passed.');
