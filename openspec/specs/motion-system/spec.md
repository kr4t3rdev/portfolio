# Motion System Specification

## Purpose

Capa de animaciones editorial, sin dependencias, para el portafolio estático: secuencia de
entrada en la carga, reveals al scroll con variantes direccionales, grupos escalonados,
decoraciones vivas, progreso de lectura, parallax sutil y transiciones entre páginas.
Todo debe degradar a estático y visible bajo `prefers-reduced-motion: reduce`.

## Requirements

### Requirement: Intro de carga de página (REQ-001)

El sistema SHALL animar la entrada de los elementos above-the-fold con keyframes one-shot
independientes del scroll, controlados por `data-intro` y `--intro-delay`.

**Scenario: secuencia editorial del hero**
- **WHEN** carga la home
- **THEN** header desciende (`intro-drop`), eyebrow/lead/acciones suben escalonadas y el H1 se
  revela con máscara (`intro-mask`); la consola desliza desde la derecha (`intro-slide-right`).

**Scenario: caso de estudio**
- **WHEN** carga `/proyectos/financemdm/`
- **THEN** eyebrow, H1 (`intro-mask`), lead, facts, status y CTA entran con delays progresivos.

### Requirement: Reveals al scroll con variantes (REQ-002)

El sistema SHALL revelar elementos `.reveal` observados con IntersectionObserver
(threshold 0.12, rootMargin -6% bottom) alternando la clase `is-visible`, con variantes
`data-motion`: `left`, `right`, `zoom`, `blur`, `mask` y fade-up base.

**Scenario: cards alternadas**
- **WHEN** entran en viewport las cards de FinanceMDM Mobile y Cashflow
- **THEN** se deslizan desde derecha e izquierda respectivamente y terminan con `transform: none`.

**Scenario: manifiesto**
- **WHEN** entra el manifiesto
- **THEN** se revela con desenfoque que desaparece (`blur`).

### Requirement: Grupos escalonados (REQ-003)

El sistema SHALL aplicar `data-stagger` sobre un contenedor para revelar sus hijos directos en
cascada (85ms por hijo, tope 600ms) al activar `is-staggered`; `data-stagger="pop"` añade
escala.

**Scenario: tres backends**
- **WHEN** el grupo `backend-variants` entra en viewport
- **THEN** los tres articles aparecen secuencialmente y terminan en opacity 1.

**Scenario: lista de tecnologías**
- **WHEN** un `ul.tech-list` con `data-stagger` se vuelve visible
- **THEN** sus `li` entran escalonados.

### Requirement: El clip nunca bloquea al observer (REQ-004)

La variante mask SHALL aplicar el `clip-path` a los hijos del elemento observado, nunca al
elemento observado mismo.

**Scenario: deadlock evitado**
- **WHEN** un heading `data-motion="mask"` está dentro del viewport
- **THEN** IntersectionObserver reporta intersección > 0 y activa `is-visible`, porque el
  contenedor conserva área geométrica íntegra; el clip vive en `> *`.

**Rationale:** Chromium calcula el rect de intersección después de `clip-path`; un clip de
área cero produce `intersectionRatio: 0` aunque el elemento esté visible, y el reveal nunca
dispara (deadlock silencioso).

### Requirement: Comportamiento ligado al scroll (REQ-005)

El sistema SHALL mantener una barra de progreso de lectura (`.scroll-progress i`,
`scaleX(0→1)`), un header sticky con blur translúcido tras 12px (`is-scrolled`) y parallax
sutil mediante `[data-parallax]` que ajusta `--py` en rAF con un único listener scroll
protegido contra duplicación (`window.__motionScrollBound`).

### Requirement: Decoraciones vivas (REQ-006)

El sistema SHALL animar detalles continuos sutiles: barras del ledger (`scaleY` con delays al
revelar la card destacada), monedas del orbit flotando en desfase, sello orbital girando
(48s), dot de disponibilidad pulsando, línea del backend-bridge dibujándose (`scaleX`) y
contenido de `<details>` entrando con barrido al abrir.

### Requirement: Transiciones entre páginas (REQ-007)

Ambas páginas SHALL usar `ClientRouter` de Astro con `::view-transition-old/new(root)`
(fade + slide 240/420ms), y el motor SHALL reinicializarse en `astro:page-load` sin duplicar
listeners.

### Requirement: Movimiento reducido (REQ-008)

Bajo `prefers-reduced-motion: reduce` el sistema SHALL dejar todo estático y visible:
`animation: none`, `transform/opacity/filter/clip-path` neutros, sin transiciones.

**Scenario: acceso sin animación**
- **WHEN** el SO solicita movimiento reducido
- **THEN** hero, reveals, staggers y decoraciones renderizan en estado final visible de
  inmediato, verificado con `getComputedStyle` en QA.

### Requirement: Rendimiento (REQ-009)

Todas las animaciones SHALL usar solo propiedades GPU (`transform`, `opacity`, `filter`,
`clip-path`) con easing editorial `cubic-bezier(.2, .75, .25, 1)`; sin listeners de scroll
sin throttle (rAF) ni reflows forzados.

## Implementación

- `public/motion.css` — keyframes, variantes, staggers, decoraciones, progreso, VT, reduced-motion.
- `public/script.js` — motor idempotente (observers, staggers, progreso, header, parallax).
- `src/pages/index.astro`, `src/pages/proyectos/financemdm/index.astro` — atributos y wiring.
- Commit `9749cb1` (2026-10-25). QA: suite Playwright de 26 checks, 26/26 en verde.
