import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const home = await readFile('src/pages/index.astro', 'utf8');
const component = await readFile('src/components/animations/ScrollImageMotion.astro', 'utf8');
const section = home.split('id="proyectos"')[1].split('id="servicios"')[0];
assert.equal((section.match(/<ScrollImageMotion\b/g) ?? []).length, 3, 'Three project images use reusable scroll motion');
assert.equal((section.match(/<img[^>]+alt="[^"]+"/g) ?? []).length, 3);
assert.match(component, /prefers-reduced-motion: reduce/);
assert.match(component, /astro:before-swap/);
assert.match(component, /requestAnimationFrame/);
assert.match(component, /removeEventListener/);
console.log('ScrollImageMotion source checks passed.');
assert.match(component, /travel\?: number/, 'Expose configurable image travel');
assert.match(component, /translateY\(/, 'Combine vertical motion with zoom');
assert.match(component, /getImageMotion/, 'Use bounded motion geometry');
const { getImageMotion } = await import('../src/components/animations/scroll-image-motion.mjs');
for (const [start, end] of [[1,1.35],[1.35,1],[1.35,1.04],[1.04,1.18],[1,1]]) {
  for (const travel of [0,0.04,0.15]) {
    let previous = -Infinity;
    for (let i = 0; i <= 100; i++) {
      const { scale, offset } = getImageMotion(start, end, travel, i / 100, 200);
      assert.ok(offset >= previous - 1e-9, `offset reverses for ${start}->${end} at ${i}`);
      assert.ok(Math.abs(offset) <= ((scale - 1) / 2 * 200) + 1e-9, 'offset exceeds scale bleed');
      previous = offset;
    }
  }
}
