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

const visibleText = html.replace(/<[^>]+>/g, ' ');
assert.match(html, /href="https:\/\/wa\.me\/5353917705"/);
assert.match(html, /href="https:\/\/www\.instagram\.com\/kr4t3rdev\/"/);
assert.match(html, /aria-label="Contactar por WhatsApp"/);
assert.match(html, /aria-label="Ver Instagram de Michel"/);
assert.doesNotMatch(visibleText, /53917705|5353917705/);
assert.doesNotMatch(visibleText, /Ver perfil|@kr4t3rdev/);
assert.match(styles, /\.social-link\s*\{[^}]*min-width:\s*54px[^}]*min-height:\s*54px/);

console.log('Portfolio content and accessibility checks passed.');
