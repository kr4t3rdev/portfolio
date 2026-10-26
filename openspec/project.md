# Portfolio — SDD Project Context

**Repo:** `/Users/arturo/Documents/Proyecto Inventario/Portfolio/landing-page`
**GitHub:** `kr4t3rdev/portfolio` (rama `main`) → Vercel `michel-garcia-portfolio` → https://kr4t3rdev.xyz
**Stack:** Astro 7 (static), Tailwind v4 (sin Preflight), sin dependencias de runtime. Todo el JS/CSS es vanilla.

## Convenciones de verificación (triple gate)

1. `scripts/test.mjs` — asserts de regresión sin dependencias sobre markup/CSS fuente.
2. `scripts/build-smoke.mjs` — checks del build estático en `dist/`.
3. CI de GitHub + pre-push hook (ECC) + build de Vercel ejecutan ambos en cada push.

Toda feature nueva debe extender ambos scripts y, cuando involucra comportamiento visual,
verificarse con un QA en navegador real (Playwright) midiendo computed styles.

## Specs implementadas

| Capability | Spec | Implementado en |
|---|---|---|
| animated-icons | `openspec/specs/animated-icons/spec.md` | commit `d64dcfe` (2026-10-25) |
| motion-system | `openspec/specs/motion-system/spec.md` | commit `9749cb1` (2026-10-25) |
| dark-theme | `openspec/specs/dark-theme/spec.md` | modo oscuro editorial con toggle persistente (2026-10-26) |

## Reglas de motion del proyecto

- Solo propiedades GPU: `transform`, `opacity`, `filter`, `clip-path`.
- Easing editorial: `cubic-bezier(.2, .75, .25, 1)`; duraciones 460–760ms en entradas.
- `prefers-reduced-motion: reduce` → todo estático y visible, sin excepciones.
- Nunca aplicar `clip-path` de área cero al elemento observado por IntersectionObserver
  (deadlock; ver spec motion-system, REQ-004).
- El motor de motion (`public/script.js`) es idempotente y se reinicializa en `astro:page-load`.
