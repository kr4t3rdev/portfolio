import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile('src/pages/index.astro', 'utf8');
const styles = await readFile('public/styles.css', 'utf8');

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



const casePage = await readFile('src/pages/proyectos/financemdm/index.astro', 'utf8');
assert.match(html, /href="\/proyectos\/financemdm\/"/);
assert.match(html, /href="https:\/\/financemdm\.kr4t3rdev\.xyz"/);
assert.match(html, />\s*financemdm\.kr4t3rdev\.xyz\s*</);
assert.match(casePage, /sin adopción comercial/i);
assert.match(casePage, /Desarrollo individual/);
for (const section of ['contexto', 'arquitectura', 'frontend', 'backend', 'desafios', 'cicd', 'calidad']) {
  assert.ok(casePage.includes(`id="${section}"`), `Missing section ${section}`);
}
assert.equal((casePage.match(/<h1[ >]/g) ?? []).length, 1);
const ids = [...casePage.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(ids.length, new Set(ids).size);
for (const match of casePage.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(match[1]));
assert.doesNotMatch(casePage, /628|263|137|47 dominios/);

const caseStyles = await readFile('public/proyectos/financemdm/case-study.css', 'utf8');
assert.match(caseStyles, /\.case-index \{ display:block;/);

const packageJson = JSON.parse(await readFile('package.json', 'utf8'));
const astroConfig = await readFile('astro.config.mjs', 'utf8');
const globalStyles = await readFile('src/styles/global.css', 'utf8');
assert.equal(packageJson.scripts.dev, 'astro dev');
assert.equal(packageJson.scripts.build, 'astro build');
assert.ok(packageJson.devDependencies.astro);
assert.ok(packageJson.devDependencies.tailwindcss);
assert.ok(packageJson.devDependencies['@tailwindcss/vite']);
assert.match(astroConfig, /tailwindcss\(\)/);
assert.match(globalStyles, /@layer theme, base, components, utilities/);
assert.match(globalStyles, /@import ["']tailwindcss\/theme\.css["'] layer\(theme\)/);
assert.match(globalStyles, /@import ["']tailwindcss\/utilities\.css["'] layer\(utilities\)/);
assert.doesNotMatch(globalStyles, /preflight\.css/);
assert.doesNotMatch(globalStyles, /@import\s+["']tailwindcss["']\s*;/);
assert.match(html, /import ['"]\.\.\/styles\/global\.css['"]/);
assert.match(casePage, /import ['"]\.\.\/\.\.\/\.\.\/styles\/global\.css['"]/);
assert.match(html, /class="hero-intro text-pretty"/);


for (const page of [html, casePage]) {
  assert.doesNotMatch(page, /michel-garcia-portfolio\.vercel\.app/);
  assert.match(page, /rel="canonical" href="https:\/\/kr4t3rdev\.xyz/);
}
assert.match(html, /href="https:\/\/cashflow\.kr4t3rdev\.xyz"/);
assert.doesNotMatch(html, /cashflow-eight-cyan\.vercel\.app/);

console.log('Portfolio and case-study checks passed.');

assert.match(html, /id="servicios"/);
for (const id of ['landing', 'negocio', 'plataforma']) {
  assert.match(html, new RegExp(`id="service-${id}"`));
  assert.match(html, new RegExp(`aria-labelledby="service-${id}"`));
}
for (const term of ['Swift', 'Kotlin', 'OAuth', 'PostgreSQL', 'Hablemos de tu sitio']) assert.ok(html.includes(term));
assert.match(html, /href="#servicios"/);
assert.match(styles, /\.service-sheet/);
assert.match(visibleText, /producción con facturación/i);
assert.match(visibleText, /trazabilidad operativa/i);
assert.match(visibleText, /ERP multiempresa/i);
assert.match(visibleText, /acceso por roles/i);
assert.match(visibleText, /saldos y movimientos por\s+moneda/i);
assert.match(visibleText, /flujo de caja/i);
assert.match(visibleText, /contrato OpenAPI/i);
assert.match(visibleText, /SDKs Swift y Kotlin/i);
assert.match(html, /service-sheet/);
assert.match(styles, /\.service-sheet/);

const animatedIcon = await readFile('src/components/icons/AnimatedIcon.astro', 'utf8');
const brandIcon = await readFile('src/components/icons/BrandIcon.astro', 'utf8');
const iconStyles = await readFile('src/components/icons/icon-motion.css', 'utf8');
const pageIconStyles = await readFile('public/styles.css', 'utf8');
const iconNotices = await readFile('THIRD_PARTY_NOTICES.md', 'utf8');
const pqoqubbwLicense = await readFile('licenses/pqoqubbw-icons-MIT.txt', 'utf8');
const lucideLicense = await readFile('licenses/lucide-ISC-and-feather-MIT.txt', 'utf8');
for (const icon of ['arrow-up-right', 'arrow-down', 'arrow-up', 'arrow-left', 'layout-panel-top', 'server', 'layers']) {
  assert.ok(animatedIcon.includes(`"${icon}"`), `AnimatedIcon must include ${icon}`);
}
assert.match(animatedIcon, /aria-hidden=\{accessible \? undefined : "true"\}/);
assert.match(animatedIcon, /focusable="false"/);
assert.match(animatedIcon, /role=\{accessible \? "img" : undefined\}/);
assert.match(iconStyles, /prefers-reduced-motion/);
assert.match(iconStyles, /:focus-visible/);
assert.match(iconStyles, /:is\(a, button, summary\)/);
assert.match(iconStyles, /\.icon-trigger:is\(:hover, :focus-within\)/);
assert.doesNotMatch(iconStyles, /\.service-sheet/);
assert.doesNotMatch(iconStyles, /infinite/);
assert.match(iconStyles, /\.brand-icon\s*\{[^}]*fill:\s*currentColor/);
assert.match(brandIcon, /size = 23/);
assert.doesNotMatch(iconStyles, /\.brand-icon\s*\{[^}]*\b(?:width|height):\s*23px/);
assert.match(styles, /\.social-link svg \{ width: 23px; height: 23px;/);
assert.match(pageIconStyles, /\.service-tag \.animated-icon \{ width: 24px; height: 24px; margin-right: \.55rem; \}/);
for (const keyframe of ['icon-arrow-up-right', 'icon-arrow-down', 'icon-arrow-up', 'icon-arrow-left', 'icon-panel-assemble', 'icon-server-top', 'icon-server-led', 'icon-layer-fan', 'brand-whatsapp-nudge', 'brand-instagram-snap']) {
  assert.match(iconStyles, new RegExp(`@keyframes ${keyframe}\\b`), `icon motion must define ${keyframe}`);
}
assert.match(iconStyles, /animation: icon-arrow-up-right 520ms/);
assert.match(iconStyles, /animation: icon-panel-assemble 720ms/);
assert.match(iconStyles, /animation: icon-server-top 760ms/);
assert.match(iconStyles, /animation: icon-layer-fan 680ms/);
assert.match(iconStyles, /animation: brand-whatsapp-nudge 520ms/);
assert.match(iconStyles, /animation: brand-instagram-snap 560ms/);
assert.match(iconStyles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.brand-icon[\s\S]*animation: none !important/);
assert.match(animatedIcon, /<g class="icon-motion arrow-motion">/);
assert.match(brandIcon, /<g class="brand-motion">/);
assert.doesNotMatch(pageIconStyles, /\.icon-trigger|\.animated-icon-arrow/);
assert.match(animatedIcon, /<style is:global>[\s\S]*@import "\.\/icon-motion\.css"/);
assert.match(brandIcon, /<style is:global>[\s\S]*@import "\.\/icon-motion\.css"/);
assert.match(animatedIcon, /class="server-led" x1="6" x2="10" y1="6" y2="6"/);
assert.match(animatedIcon, /class="server-led" x1="6" x2="10" y1="18" y2="18"/);
assert.match(html, /<article class="service-sheet icon-trigger"/);
const readme = await readFile('README.md', 'utf8');
assert.match(readme, /<AnimatedIcon name="arrow-up-right" \/>/);
assert.match(brandIcon, /data-icon=\{name\}/);
assert.match(html, /aria-label="Contactar por WhatsApp"/);
assert.match(html, /aria-label="Ver Instagram de Michel"/);
assert.match(iconNotices, /4662fff2b60fdcf4751b32013606756caf7c4c26/);
assert.match(pqoqubbwLicense, /MIT License/);
assert.match(lucideLicense, /ISC License/);
assert.match(lucideLicense, /The MIT License \(MIT\)/);
assert.match(html, /AnimatedIcon/);
assert.match(html, /BrandIcon/);
assert.match(casePage, /AnimatedIcon/);
