# ScrollTextReveal

Astro component for progressively emphasizing existing text as its block moves through the viewport. No additional runtime dependency is required. The component preserves the original text and nested markup; without JavaScript or with reduced motion the text is fully visible.

## Use

```astro
---
import ScrollTextReveal from '../components/animations/ScrollTextReveal.astro';
---
<ScrollTextReveal distance={0.8} minOpacity={0.65}>
  <p>Meaningful content that can be read without animation.</p>
</ScrollTextReveal>
```

- `distance`: reveal range in viewport heights, clamped between `0.25` and `2` (default `0.8`).
- `minOpacity`: minimum word opacity, clamped between `0.6` and `1` (default `0.65`). Use sufficient foreground/background contrast even at the minimum.
- The parent remains responsible for semantics, theme colors and layout. Do not wrap editable or interactive text because initialization temporarily segments text nodes into word spans.
- Runtime uses `requestAnimationFrame`, media-query change events, and Astro `astro:page-load` / `astro:before-swap` lifecycle events. When used outside Astro ClientRouter, initialize with an equivalent `astro:page-load` event after the document is ready.
- The effect changes opacity, not font weight; font metrics and element positions do not change. It respects `prefers-reduced-motion` dynamically.

## Validation

Run `node scripts/test-scroll-text-reveal.mjs`, `npm test`, `npm run build` and `npm run test:build`. Test scrolling in both directions, reduced motion, JavaScript disabled, and repeated client-side navigation in a browser.

### Coordinated entrance

Pass `afterEntrance` inside `ConsoleAssembly` to animate the words in order after the badge integrates; subsequent scroll resumes the standard scroll-driven reveal. Without the parent, the component retains its normal scroll behavior. The initial timed word animation uses the browser Web Animations API and is skipped/cancelled for reduced motion, and cancelled on scrolling once it has started or on Astro navigation. Scrolling before integration does not suppress it. Multiple assemblies coordinate independently.
