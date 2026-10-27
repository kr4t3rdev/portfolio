import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile('src/pages/index.astro', 'utf8');
const styles = await readFile('public/styles.css', 'utf8');

const projectSection = html.split('id="proyectos"')[1].split('id="servicios"')[0];
const projectCards = [...projectSection.matchAll(/<article class="project-card[^>]*>([\s\S]*?)<\/article>/g)].map(match => match[1]);
assert.deepEqual(projectCards.map(card => card.match(/<h3>([^<]+)<\/h3>/)?.[1]), [
  'FinanceMDM', 'Cashflows', 'Yoisel Shop',
]);
assert.doesNotMatch(projectSection, /FinanceMDM Mobile|Cesar Fashion|Y&amp;M Fashion|Tres backends|COMMERCE_LAB/);
assert.match(projectCards[0], /Web \+ API \+ App/);
for (const card of projectCards.slice(0, 2)) {
  for (const technology of ['Swift', 'Kotlin', 'OpenAPI']) assert.ok(card.includes(`<li>${technology}</li>`), `Native stack must include ${technology}`);
  assert.doesNotMatch(card, /React Native|\bExpo\b|React Query/);
  assert.match(card, /apps?[^<]*en desarrollo/i);
}
assert.match(projectCards[1], /Web \+ API \+ App/);
assert.match(projectCards[1], /Web y API/);
assert.match(projectCards[2], /href="https:\/\/yoisel-shop\.vercel\.app"/);
for (const technology of ['Next.js', 'Go', 'PostgreSQL']) assert.ok(projectCards[2].includes(technology));
assert.match(projectSection, /Tres proyectos/);
for (const card of projectCards) {
  assert.match(card, /<img[^>]+src="\/proyectos\/[^"]+\/preview\.webp"[^>]+alt="[^"]+"/);
  assert.doesNotMatch(card, /<details|ledger-window|currency-orbit|phone-frame/);
  const actions = card.split('class="project-actions"')[1];
  assert.ok(actions, 'Each card must have an action footer');
  assert.ok(actions.indexOf('Repo') < actions.indexOf('Caso de Estudio'));
  assert.ok(actions.indexOf('Caso de Estudio') < actions.indexOf('Preview'));
  assert.doesNotMatch(actions, /href="#"/);
}
assert.match(styles, /grid-template-columns: repeat\(3, minmax\(0, 1fr\)\)/);
assert.match(styles, /#proyectos \.section-heading \{ margin-bottom: 3rem; \}/);
assert.match(styles, /#proyectos \.project-card:nth-child\(2\) \{ margin-block-start: 22px; \}/);
assert.match(styles, /#proyectos \.project-card:nth-child\(3\) \{ margin-block-start: 44px; \}/);
assert.match(styles, /#proyectos \.project-content \{ border-radius: 16px; \}/);
assert.match(styles, /@media \(max-width: 900px\)[\s\S]*?#proyectos \.project-card \{ margin-block-start: 0/);
assert.match(styles, /#proyectos \.project-card:nth-child\(2\) \.project-preview-frame \{ order: 2; \}/);
assert.match(styles, /#proyectos \.project-card:nth-child\(2\) \.project-content \{ order: 1; \}/);

assert.doesNotMatch(html, /Hermes|laptop|Porcina/i);
assert.doesNotMatch(html, /TCP Mobile|TCP \/ FinanceMDM/);
assert.doesNotMatch(html, /Spring Boot|Java 21|API Java/);
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

const servicesData = await readFile('src/data/services.ts', 'utf8');
const servicePage = await readFile('src/pages/servicios/[slug].astro', 'utf8');
const photoSources = await readFile('public/images/services/README.md', 'utf8');
assert.match(html, /id="metodo"/);
assert.doesNotMatch(html, /class="method-intro reveal" data-motion="blur"/);
assert.match(html, /Menos magia/);
assert.match(html, /No construyo pantallas aisladas/);
assert.equal((html.match(/No construyo pantallas aisladas/g) ?? []).length, 1);
assert.match(html, /service-card/);
assert.match(html, /href="\/servicios\/landing"/);
assert.match(html, /href="\/servicios\/negocio"/);
assert.match(html, /href="\/servicios\/plataforma"/);
assert.match(servicesData, /OAuth/);
assert.match(servicePage, /ClientRouter/);
assert.match(servicePage, /theme-toggle/);
assert.match(styles, /min-block-size: calc\(100svh - 90px\)/);
assert.match(servicePage, /service-detail-block/);
assert.match(servicePage, /service\.sections\.map/);
for (const item of ['Para quién', 'Alcance técnico', 'Entregables posibles', 'Cómo lo abordamos', 'Qué se acuerda', 'OAuth', 'PostgreSQL']) assert.ok(servicesData.includes(item));
assert.match(styles, /max-height: 800px/);
assert.match(photoSources, /Unsplash License/);
assert.match(photoSources, /Not identified from source URL/);
assert.match(styles, /site-header nav a:not\(\.nav-cta\)[\s\S]*?display: inline-flex/);


console.log('Portfolio and case-study checks passed.');

assert.match(html, /id="servicios"/);
for (const id of ['landing', 'negocio', 'plataforma']) {
  assert.match(html, new RegExp(`id="service-${id}"`));
  assert.match(html, new RegExp(`aria-labelledby="service-${id}"`));
}
for (const term of ['Swift', 'Kotlin', 'OAuth', 'PostgreSQL']) assert.ok(servicesData.includes(term));
assert.match(html, /href="#servicios"/);
for (const slug of ['landing', 'negocio', 'plataforma']) assert.ok(servicesData.includes(slug));

const animatedIcon = await readFile('src/components/icons/AnimatedIcon.astro', 'utf8');
const brandIcon = await readFile('src/components/icons/BrandIcon.astro', 'utf8');
const iconStyles = await readFile('src/components/icons/icon-motion.css', 'utf8');
const pageIconStyles = await readFile('public/styles.css', 'utf8');
const readme = await readFile('README.md', 'utf8');
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
assert.match(html, /<article class="service-card reveal"/);
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

/* ---------- Motion layer: intro, variantes, stagger y transiciones ---------- */
const motionStyles = await readFile('public/motion.css', 'utf8');
const motionScript = await readFile('public/script.js', 'utf8');
assert.match(styles, /\.reveal\s*\{[^}]*opacity:\s*1/);
assert.match(styles, /\.motion-ready \.reveal:not\(\.is-visible\)/);
assert.match(motionStyles, /\.motion-ready \[data-stagger\] > \*/);
assert.match(motionStyles, /\.motion-ready \[data-motion="blur"\]\.reveal/);
assert.match(motionStyles, /\.motion-ready \[data-motion="mask"\]\.reveal > \*/);
assert.match(motionStyles, /\.motion-ready \.ledger-chart i/);
assert.match(motionStyles, /\.motion-ready \.backend-bridge i/);
assert.match(motionScript, /document\.documentElement\.classList\.add\(['"]motion-ready['"]\)/);

for (const keyframe of [
  'intro-rise', 'intro-drop', 'intro-slide-right', 'intro-slide-left',
  'intro-mask', 'intro-fade', 'orbit-spin', 'status-pulse', 'orbit-float',
  'detail-item', 'vt-out', 'vt-in',
]) {
  assert.match(motionStyles, new RegExp(`@keyframes ${keyframe}\\b`), `motion layer must define ${keyframe}`);
}
assert.doesNotMatch(motionStyles, /@keyframes status-pulse[\s\S]*?box-shadow/);
assert.match(motionStyles, /\.status-dot::after/);

for (const variant of ['left', 'right', 'zoom', 'blur', 'mask']) {
  assert.match(motionStyles, new RegExp(`\\[data-motion="${variant}"\\]\\.reveal`), `reveal variant ${variant} missing`);
}
assert.match(motionStyles, /\[data-motion\]\.reveal\.is-visible\s*\{\s*opacity: 1/);
assert.match(motionStyles, /\[data-stagger\] > \*/);
assert.match(motionStyles, /\[data-stagger="pop"\] > \*/);
assert.match(motionStyles, /\.scroll-progress/);
assert.match(motionStyles, /\[data-parallax\]/);
assert.match(motionStyles, /::view-transition-old\(root\)/);
assert.match(motionStyles, /::view-transition-new\(root\)/);
assert.match(motionStyles, /\.ledger-chart i\s*\{[^}]*transform: scaleY\(0\)/);
assert.match(motionStyles, /\.commerce-lab\.is-visible \.backend-bridge i/);
assert.match(motionStyles, /details\[open\] > \*:not\(summary\)/);
assert.match(motionStyles, /\.site-header\.is-scrolled/);
assert.match(motionStyles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*animation: none !important/);
assert.match(motionStyles, /details\[open\] > \*:not\(summary\),\s*nav a:not\(\.nav-cta\)\s*\{[^}]*animation: none !important;[^}]*transition: none !important;/);
assert.doesNotMatch(readme, /26-check Playwright suite/);
assert.match(readme, /source-level.*not a browser-based Playwright suite/i);
assert.match(readme, /Historical QA notes.*not included in this repository/i);
const motionSpec = await readFile('openspec/specs/motion-system/spec.md', 'utf8');
const themeSpec = await readFile('openspec/specs/dark-theme/spec.md', 'utf8');
assert.match(motionSpec, /registro histórico.*no está incluida en este repositorio/i);
assert.match(themeSpec, /registro histórico.*no están incluidas en este repositorio/i);

assert.match(motionScript, /astro:page-load/);
assert.doesNotMatch(motionScript, /revealObserverCache/);
assert.match(motionScript, /activeRevealObserver\?\.disconnect\(\)/);
assert.match(motionScript, /activeGroupObserver\?\.disconnect\(\)/);
assert.match(motionScript, /prefers-reduced-motion/);
assert.match(motionScript, /data-stagger/);
assert.match(motionScript, /is-staggered/);
assert.match(motionScript, /scroll-progress i/);
assert.match(motionScript, /data-parallax/);
assert.match(motionScript, /is-scrolled/);
assert.match(motionScript, /__motionScrollBound/);

assert.match(html, /href="\/motion\.css"/);
assert.match(casePage, /href="\/motion\.css"/);
assert.match(html, /ClientRouter/);
assert.match(casePage, /ClientRouter/);
assert.match(html, /class="scroll-progress"/);
assert.match(casePage, /class="scroll-progress"/);
for (const attr of [
  'data-intro="down"', 'data-intro="right"', 'data-intro="mask"', 'data-intro="fade"',
  'data-motion="mask"', 'data-motion="left"', 'data-motion="right"',
  'data-motion="zoom"', 'data-stagger="pop"', 'data-parallax="0.05"',
]) {
  assert.ok(html.includes(attr), `index page must include ${attr}`);
}
assert.ok(casePage.includes('data-motion="left"'));
assert.ok(casePage.includes('data-stagger'));
assert.ok(casePage.includes('data-delay="90"'));

/* ---------- Theme layer: modo oscuro ---------- */
const themeStyles = await readFile('public/theme.css', 'utf8');
assert.doesNotMatch(themeStyles, /@keyframes status-pulse-dark/);

assert.match(themeStyles, /:root\[data-theme="dark"\]\s*\{/, 'dark token block missing');
assert.match(themeStyles, /--ink:\s*#e8e2d5/, 'dark --ink must invert to light');
assert.match(themeStyles, /--paper:\s*#191b17/, 'dark --paper must invert to dark');
assert.match(themeStyles, /color-scheme:\s*dark/, 'dark color-scheme missing');
assert.match(themeStyles, /\.theme-toggle\s*\{[^}]*cursor:\s*pointer/, 'theme toggle needs cursor pointer');
assert.match(themeStyles, /\.theme-toggle\s*\{[^}]*width:\s*44px/, 'theme toggle needs 44px target');
assert.match(themeStyles, /:root:not\(\[data-theme="dark"\]\)\s*\.theme-toggle\s*\.icon-moon/, 'icon swap rules missing');
assert.match(themeStyles, /--status-pulse-color:\s*rgba\(168, 182, 153, 0\.35\)/, 'dark pulse color missing');
assert.match(themeStyles, /html\.theme-anim/, 'theme transition rules missing');
assert.match(themeStyles, /prefers-reduced-motion:\s*reduce\)[\s\S]*animation:\s*none\s*!important/, 'reduced motion must disable theme animations');
for (const override of [
  '[data-theme="dark"] .project-card',
  '[data-theme="dark"] .commerce-lab {',
  '[data-theme="dark"] .hero-console',
  '[data-theme="dark"] .contact-code',
  '[data-theme="dark"] .phone-frame',
  '[data-theme="dark"] .service-sheet-platform',
  '[data-theme="dark"] .architecture-clients',
]) {
  assert.ok(themeStyles.includes(override), `dark override missing: ${override}`);
}

assert.match(motionScript, /applyTheme/, 'engine must include applyTheme');
assert.match(motionScript, /localStorage\.setItem\('theme'/, 'theme choice must persist');
assert.match(motionScript, /try\s*\{\s*window\.localStorage\.setItem\('theme', theme\);\s*\} catch/, 'theme changes must survive blocked persistence');
assert.match(motionScript, /aria-pressed/, 'toggle must expose aria-pressed');
assert.match(motionScript, /meta\[name="theme-color"\]/, 'engine must sync meta theme-color');

/* Persistencia del tema en navegación de cliente (issue #13). */
assert.match(motionScript, /astro:after-swap/, 'engine must re-apply the theme after Astro swaps');
assert.match(motionScript, /const resolveTheme/, 'engine must resolve the theme from its source of truth');
assert.match(motionScript, /applyTheme\(resolveTheme\(\)\)/, 'theme initialization must re-resolve the stored theme instead of trusting the swap-wiped attribute');
assert.match(motionScript, /localStorage\.getItem\('theme'\);[\s\S]{0,140}?catch/, 'theme resolution must tolerate blocked storage reads');
assert.doesNotMatch(
  motionScript,
  /applyTheme\(document\.documentElement\.dataset\.theme === 'dark' \? 'dark' : 'light'\)/,
  'initTheme must not derive the theme from the data-theme attribute wiped by the router swap',
);

for (const page of [html, casePage]) {
  assert.match(page, /theme\.css/, 'page must link theme.css');
  assert.match(page, /localStorage\.getItem\('theme'\)/, 'page needs inline no-flash theme script');
  assert.match(page, /try\s*\{\s*stored = localStorage\.getItem\('theme'\);\s*\} catch/, 'theme bootstrap must survive blocked storage reads');
  assert.match(page, /content="#e7e1d4"/, 'meta theme-color must default to light paper');
  assert.match(page, /setAttribute\('content', theme === 'dark' \? '#191b17' : '#e7e1d4'\)/, 'inline theme bootstrap must sync theme-color');
  assert.match(page, /class="theme-toggle"/, 'page needs the theme toggle button');
  assert.match(page, /class="icon-sun"/, 'toggle needs sun icon');
  assert.match(page, /class="icon-moon"/, 'toggle needs moon icon');
}

/* Native case-study coverage: contracts are per product, not per platform. */
const studySlugs = ['financemdm', 'cashflows', 'yoisel-shop'];
for (const [index, slug] of studySlugs.entries()) {
  assert.match(projectCards[index], new RegExp(`href="/proyectos/${slug}/"[^>]*>Caso de Estudio`));
  const source = await readFile(`src/pages/proyectos/${slug}/index.astro`, 'utf8');
  assert.equal((source.match(/<h1[ >]/g) ?? []).length, 1);
  const studyIds = [...source.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(studyIds.length, new Set(studyIds).size);
  for (const match of source.matchAll(/href="#([^"]+)"/g)) assert.ok(studyIds.includes(match[1]), `${slug}: unresolved anchor ${match[1]}`);
  assert.match(source, new RegExp(`rel="canonical" href="https://kr4t3rdev.xyz/proyectos/${slug}/"`));
  assert.match(source, /id="contexto"/);
  assert.match(source, /id="arquitectura"/);
  assert.match(source, /id="calidad"/);
  assert.match(source, /href="\/#proyectos"/);
  assert.match(source, /theme\.css/);
  assert.match(source, /motion\.css/);
}
const cashflowsCase = await readFile('src/pages/proyectos/cashflows/index.astro', 'utf8');
const shopCase = await readFile('src/pages/proyectos/yoisel-shop/index.astro', 'utf8');
for (const nativeCase of [casePage, cashflowsCase]) {
  for (const term of ['Swift', 'SwiftUI', 'Kotlin', 'OpenAPI']) assert.ok(nativeCase.includes(term));
  assert.match(nativeCase, /id="apps-nativas"/);
  assert.match(nativeCase, /id="contratos"/);
  assert.match(nativeCase, /en desarrollo/i);
  assert.match(nativeCase, /SDK[^<]*no equivale/i);
  assert.match(nativeCase, /un contrato por producto/i);
  assert.doesNotMatch(nativeCase, /React Native|\bExpo\b/);
}
assert.match(casePage, /mobile-v1\.json/);
assert.match(casePage, /OpenAPI 3\.1/);
assert.match(casePage, /Android[^<]*pendiente/i);
assert.match(cashflowsCase, /OpenAPI 3\.0/);
assert.match(cashflowsCase, /Keychain/);
assert.match(cashflowsCase, /cadenas decimales/);
assert.match(cashflowsCase, /Jetpack Compose[^<]*pendiente/i);
assert.match(shopCase, /Go/);
assert.match(shopCase, /pgx/);
assert.match(shopCase, /centavos enteros/);
assert.match(shopCase, /reservas/);
assert.match(shopCase, /OpenAPI/);
console.log('Three linked case studies and native contract checks passed.');

// Root-absolute assets survive ClientRouter returns from nested case routes.
for (const asset of ['favicon.svg', 'styles.css', 'motion.css', 'theme.css', 'script.js']) {
  assert.ok(html.includes(`"/${asset}"`), `Homepage asset must be root-absolute: ${asset}`);
  assert.ok(!html.includes(`"./${asset}"`));
}

// Preserve theme metadata on initial render and ClientRouter navigation.
for (const source of [html, casePage, cashflowsCase, shopCase]) {
  assert.match(source, /try\s*\{\s*stored = localStorage\.getItem\('theme'\);\s*\} catch/, 'all case bootstraps must tolerate blocked storage');
  assert.match(source, /setAttribute\('content', theme === 'dark' \? '#191b17' : '#e7e1d4'\)/, 'inline theme bootstrap must sync theme-color');
}
assert.match(motionScript, /applyTheme\(resolveTheme\(\)\)/, 'client navigation must sync theme-color during theme initialization');

// Desktop projects keep screenshots and their editorial cards as distinct groups.
for (const card of projectCards) {
  assert.match(card, /<div class="project-preview-frame">\s*<div class="project-image/);
  assert.match(card, /<\/div>\s*<div class="project-content/);
  assert.match(card, /project-image[\s\S]*?project-content[\s\S]*?project-actions/);
}
assert.match(styles, /\.projects[^\{]*\{[^}]*min-block-size:\s*calc\(100svh\s*-\s*90px\)/);
