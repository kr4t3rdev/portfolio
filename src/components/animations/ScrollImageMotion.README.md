# ScrollImageMotion

A reusable Astro wrapper that scales a single slotted image as it travels through the viewport, while keeping the frame fixed. No animation library is required.

## Usage

```astro
---
import ScrollImageMotion from '../components/animations/ScrollImageMotion.astro';
---
<div class="fixed-image-frame">
  <ScrollImageMotion startScale={1.04} endScale={1.18}>
    <img src="/example.webp" alt="Description of the image" width="1440" height="900" />
  </ScrollImageMotion>
</div>
```

The parent must provide a definite height or aspect ratio; the component fills and clips that frame. Style the image to fill the frame (for example `width:100%; height:100%; object-fit:cover`). Props are optional numeric scales clamped to 1–1.35, defaults 1.04 and 1.18. A start greater than end reverses zoom.

The image and its alternative text remain real HTML, with no duplication. When JavaScript is unavailable or reduced motion is requested the image remains static and visible. Scroll and resize work is requestAnimationFrame-throttled; listeners and inline transforms are removed during Astro client navigation and reinitialized on page load. Modern browsers with `matchMedia`, media-query change events and `requestAnimationFrame` are required for animation, not for visibility.

This implementation is independently authored from a description of the effect, not downloaded from HorizonX.
