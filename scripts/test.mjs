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
assert.match(html, /Mismo producto\./);
assert.match(html, /Tres backends\./);
assert.match(html, /FastAPI/);
assert.match(html, />Go</);
assert.match(html, /Next\.js full-stack/i);
assert.match(html, /Frontend compartido/);
assert.match(html, /href="https:\/\/cesar-fashion\.vercel\.app"/);
assert.match(html, /Ver tienda/);
assert.doesNotMatch(html, /href="https:\/\/github\.com\/kr4t3rdev\/cesar-fashion"/);
assert.doesNotMatch(html, /Spring Boot|Java 21|API Java/);
assert.match(styles, /\.commerce-lab\s*\{/);
assert.match(styles, /\.backend-variants\s*\{/);
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



const casePage = await readFile('proyectos/financemdm/index.html', 'utf8');
assert.match(html, /href="\/proyectos\/financemdm\/"/);
assert.match(html, /href="https:\/\/kr4t3rdev\.xyz"/);
assert.match(html, />\s*kr4t3rdev\.xyz\s*</);
assert.match(casePage, /sin adopción comercial/i);
assert.match(casePage, /Desarrollo individual/);
for (const section of ['contexto', 'arquitectura', 'frontend', 'backend', 'desafios', 'calidad']) {
  assert.ok(casePage.includes(`id="${section}"`), `Missing section ${section}`);
}
assert.equal((casePage.match(/<h1[ >]/g) ?? []).length, 1);
const ids = [...casePage.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(ids.length, new Set(ids).size);
for (const match of casePage.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(match[1]));
assert.doesNotMatch(casePage, /628|263|137|47 dominios/);

const caseStyles = await readFile('proyectos/financemdm/case-study.css', 'utf8');
assert.match(caseStyles, /\.case-index \{ display:block;/);
console.log('Portfolio and case-study checks passed.');
