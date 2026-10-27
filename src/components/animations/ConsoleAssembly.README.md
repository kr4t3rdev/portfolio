# ConsoleAssembly

Reusable Astro entrance for three independently moving layers: a backplate, a panel and a badge. The layers converge in that order, then emit `assembly:integrated` so an optional `ScrollTextReveal` with `afterEntrance` can animate its words.

## Requirements

Astro with its client-side page lifecycle events and modern browsers supporting CSS animations, `requestAnimationFrame`, `matchMedia` and Web Animations. No external library. The example relies on consumer styles for the panel (`hero-console`) and badge (`orbit-stamp`), and CSS variables `--clay`, `--radius-lg` and `--shadow`. `ScrollTextReveal.astro` is a separate component; use it for the coordinated text sequence.

```astro
---
import ConsoleAssembly from './ConsoleAssembly.astro';
import ScrollTextReveal from './ScrollTextReveal.astro';
---
<ConsoleAssembly label="Technical profile">
  <div class="hero-console"><ScrollTextReveal afterEntrance><p>Readable text</p></ScrollTextReveal></div>
  <div slot="badge" class="orbit-stamp" aria-hidden="true">dev</div>
</ConsoleAssembly>
```

`label` names the assembly for assistive technologies. Supply the black panel as the default slot and the circular accent using `slot="badge"`. Position, colors, and the panel and badge shapes are the consumer's responsibility. The backplate is decorative. This component's sample shape rules refer to those class names and CSS variables, so adapt them when using different markup.

The entrance avoids an initial flash by marking the assembly pending synchronously. A four-second fail-open timeout restores visibility if the module fails to initialize. The entrance is progressive enhancement: without JavaScript and under reduced motion, all parts remain visible in their final position. The runtime listens for Astro page-load/before-swap, cleans its listeners, handles a reduced-motion change, and runs the entrance once per navigation. Text remains semantically present and scroll-driven after the entrance; scrolling after the word entrance begins cancels it and restores scroll control; scrolling before integration does not prevent the entrance. Multiple assemblies coordinate independently. See `ScrollTextReveal.README.md` for its own options and usage restrictions.

## Verification

Run `node scripts/test-console-assembly.mjs`, `npm test`, `npm run build` and `npm run test:build`. Test initial, intermediate and integrated states in browser, reduced motion (including changing the preference), no-JavaScript, mobile widths and client-side navigation. This effect is independently implemented, not downloaded from HorizonX.
