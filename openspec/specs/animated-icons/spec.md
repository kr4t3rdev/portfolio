# Animated Icons Specification

## Purpose

Iconos SVG tipados y reutilizables con micro-interacciones CSS-only para links, botones y
summaries del portafolio: flechas direccionales, marcas de servicio y logos de marca, con
atribución de terceros para la geometría prestada.

## Requirements

### Requirement: Componente tipado AnimatedIcon (REQ-001)

`src/components/icons/AnimatedIcon.astro` SHALL renderizar SVGs tipados por prop `name`
(`arrow-up-right`, `arrow-down`, `arrow-up`, `arrow-left`, `layout-panel-top`, `server`,
`layers`) con `size`, `strokeWidth` y `class` opcionales.

**Scenario: decorativo vs. accesible**
- **WHEN** se usa sin `label`
- **THEN** el SVG es decorativo (`aria-hidden="true"`, `focusable="false"`, sin role).
- **WHEN** se usa con `label`
- **THEN** el SVG se expone como imagen (`role="img"`, `aria-label`).

### Requirement: Micro-interacciones one-shot (REQ-002)

Los iconos direccionales SHALL animar 5 unidades SVG en su dirección y rebotar en 520ms al
hover/focus de un ancestro `a, button, summary`; en un ancestro `.icon-trigger` opt-in, los
marcos de servicio animan: paneles (`icon-panel-assemble`, 720ms), servidores
(`icon-server-top`/`icon-server-led`, 760ms) y capas (`icon-layer-fan`, 680ms).

**Scenario: sin loops**
- **WHEN** no hay interacción
- **THEN** no hay animación en curso; no existen loops ni entradas automáticas ni layout shifts.

### Requirement: BrandIcon (REQ-003)

`BrandIcon.astro` SHALL reutilizar la geometría SVG existente de WhatsApp e Instagram
(`data-icon`, `brand-motion`) manteniendo los nombres accesibles de sus links; WhatsApp se
mece 9° (520ms) e Instagram gira 9° y escala 1.12 (560ms) al hover/focus.

### Requirement: Movimiento reducido (REQ-004)

Bajo `prefers-reduced-motion: reduce` los estilos de icono SHALL eliminar animaciones,
transiciones y transformaciones, dejando cada icono estático y visible.

### Requirement: Atribución de terceros (REQ-005)

El repo SHALL documentar la geometría prestada (pqoqubbw/icons commit 4662fff, Lucide
7faf876) en `THIRD_PARTY_NOTICES.md` y `licenses/`, y el build SHALL servirla en
`/licenses/*.txt` (comprobado por `scripts/build-smoke.mjs`).

## Implementación

- Commit `d64dcfe` (2026-10-25). Tests: `scripts/test.mjs` (40+ asserts de iconos),
  `scripts/build-smoke.mjs` (assets y clases renderizadas).
