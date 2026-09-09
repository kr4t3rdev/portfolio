import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile('index.html', 'utf8');
const styles = await readFile('styles.css', 'utf8');

const selectedProjects = [
  'FinanceMDM',
  'FinanceMDM Mobile',
  'Cashflow',
  'Yoisel Shop',
  'Cesar Fashion',
  'Y&amp;M Fashion',
];

selectedProjects.forEach((project) => assert.match(html, new RegExp(project)));
assert.doesNotMatch(html, /Hermes|laptop|Porcina/i);
assert.doesNotMatch(html, /TCP Mobile|TCP \/ FinanceMDM/);
assert.equal((html.match(/target="_blank"/g) ?? []).length, (html.match(/rel="noreferrer"/g) ?? []).length);
assert.match(styles, /prefers-reduced-motion/);
assert.match(styles, /:focus-visible/);
assert.match(styles, /\.contact-code[^{]*\{[^}]*overflow-wrap: anywhere/);

console.log('Portfolio content and accessibility checks passed.');
