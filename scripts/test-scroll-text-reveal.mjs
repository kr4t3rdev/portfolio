import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const page = await readFile('src/pages/index.astro', 'utf8');
const component = await readFile('src/components/animations/ScrollTextReveal.astro', 'utf8');
const consoleSection = page.split('<div class="hero-console"')[1].split('<div class="orbit-stamp"')[0];
assert.match(consoleSection, /<ScrollTextReveal[^>]*[\s\S]*?<div class="console-body">[\s\S]*?<\/ScrollTextReveal>/);
assert.match(component, /prefers-reduced-motion/);
assert.match(component, /astro:page-load/);
assert.match(component, /astro:before-swap/);
assert.match(component, /requestAnimationFrame/);
assert.match(component, /data-scroll-text-reveal/);
console.log('ScrollTextReveal component and lifecycle checks passed.');
// Animated spans must not inherit a consumer's broad span box/color styling.
assert.match(component, /word\.style\.display = 'inline'/);
assert.match(component, /word\.style\.width = 'auto'/);
assert.match(component, /word\.style\.color = 'inherit'/);
