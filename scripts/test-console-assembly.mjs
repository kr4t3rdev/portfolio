import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const component = await readFile('src/components/animations/ConsoleAssembly.astro', 'utf8');
const page = await readFile('src/pages/index.astro', 'utf8');
assert.match(page, /<ConsoleAssembly[\s\S]*?<ScrollTextReveal[^>]*afterEntrance[\s\S]*?<\/ConsoleAssembly>/);
for (const part of ['backplate', 'panel', 'badge']) assert.match(component, new RegExp(`data-assembly-${part}`));
assert.match(component, /prefers-reduced-motion/);
assert.match(component, /astro:before-swap/);
assert.match(component, /astro:page-load/);
console.log('Console assembly sequence checks passed.');

const textReveal = await readFile('src/components/animations/ScrollTextReveal.astro', 'utf8');
assert.match(textReveal, /awaiting\.delete\(instance\)/, 'integration must clear only the matched instance');
assert.doesNotMatch(textReveal.match(/function onScroll\(\) \{[\s\S]*?\n    \}/)?.[0] ?? '', /awaiting\.clear/, 'scroll must not suppress pending entrances');

for (const source of [component, textReveal]) { assert.match(source, /DOMContentLoaded/, 'initialization must survive late module execution'); assert.match(source, /if \(initialized\) return/, 'duplicate lifecycle events must be idempotent'); }
assert.match(component, /data-assembly-pending/, 'entrance must not flash fully visible before runtime starts');
assert.match(component, /document\.currentScript/, 'pending state must attach synchronously to the current assembly');
assert.match(component, /data-assembly-pending[\s\S]*prefers-reduced-motion|prefers-reduced-motion[\s\S]*data-assembly-pending/, 'pending state must respect reduced motion');
assert.match(component, /setTimeout\(\(\) => assembly\.removeAttribute\('data-assembly-pending'\), 4000\)/, 'a failed module must not keep the console hidden');
