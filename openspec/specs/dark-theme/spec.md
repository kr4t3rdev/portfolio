# Dark Theme Specification

## Purpose

Modo oscuro editorial para el portafolio: inversión semántica de los tokens `--ink`/`--paper`
con selector manual persistente, seguimiento de la preferencia del sistema cuando no hay
elección explícita, cero flash de tema incorrecto y contraste accesible (≥ 4.5:1) en ambos
modos.

## Requirements

### Requirement: Tokens semánticos invertibles (REQ-001)

El sistema de diseño SHALL usar `--ink` (frente) y `--paper` (fondo) como par semántico, de
modo que `:root[data-theme="dark"]` invierta todo el sitio redefiniendo los tokens: fondo
`#191b17`, frente `#e8e2d5`, acentos re-calibrados (`--clay` #cf8a6c, `--sage-dark` #a8b699,
`--ochre` #c7a86b, `--plum` #a98b9f, `--cyan` #8fb1b5), `--line` claro y `--shadow` profundo,
con `color-scheme: light|dark` para controles nativos.

**Scenario: ritmo de inversión editorial**
- **WHEN** el tema es oscuro
- **THEN** los paneles que en claro eran oscuros (contact, commerce-lab header, hoja
  plataforma, diagrama de arquitectura) pasan a claros sobre fondo oscuro, preservando el
  contraste de la composición.

### Requirement: Overrides de valores hardcodeados (REQ-002)

Los colores no tokenizados del CSS existente SHALL corregirse con overrides quirúrgicos
bajo `[data-theme="dark"]` en `public/theme.css` (tarjetas, commerce-lab, consola del hero,
textos apagados, chips, mock del teléfono que permanece oscuro, acentos de highlight y halo
del status-dot).

### Requirement: Selector de tema (REQ-003)

Cada página SHALL incluir un botón `.theme-toggle` (44px, cursor pointer, focus-visible
heredado) con iconos SVG sol/luna (geometría genérica) que alterna `data-theme` entre
`light` y `dark`, expone `aria-pressed` y `aria-label` dinámicos ("Cambiar a modo
claro/oscuro"), sincroniza `meta[name="theme-color"]` (#e7e1d4 / #191b17) y gira el icono
entrante con una micro-animación de 320ms.

**Scenario: toggle en ambas páginas**
- **WHEN** se pulsa el toggle en home o en el caso de estudio
- **THEN** el tema cambia, la elección persiste en `localStorage('theme')` y sobrevive
  recargas y navegación entre páginas.

### Requirement: Sin flash y preferencia del sistema (REQ-004)

Un script inline en `<head>` SHALL resolver el tema antes del primer pintado:
`localStorage('theme')` si existe; si no, `prefers-color-scheme`. El atributo
`data-theme` queda siempre fijado en el HTML inicial.

**Scenario: primera visita con sistema oscuro**
- **WHEN** un usuario sin elección previa tiene el SO en oscuro
- **THEN** la página renderiza directamente en oscuro, sin flash blanco.

### Requirement: Transición de cambio suave y accesible (REQ-005)

El motor SHALL aplicar la clase efímera `html.theme-anim` (240ms sobre background-color,
color, border-color, box-shadow, fill, stroke) durante el toggle y retirarla después;
bajo `prefers-reduced-motion: reduce` el cambio es instantáneo y la animación del icono
se elimina.

### Requirement: Contraste accesible (REQ-006)

El modo oscuro SHALL mantener contraste WCAG AA: texto normal ≥ 4.5:1 y títulos ≥ 7:1
sobre el fondo `#191b17` (verificado: 13.44:1 en QA), y el modo claro no debe regresar.

## Implementación

- `public/theme.css` — tokens oscuros, overrides, botón, transición y reduced-motion.
- `public/script.js` — `applyTheme`/`initTheme` (persistencia, meta, aria).
- Ambas páginas — script inline anti-flash, `theme.css`, `meta theme-color`, botón.
- Registro histórico de QA: reporta una suite Playwright de 25 checks (25/25) y 24 checks de regresión de motion bajo tema oscuro. Esas suites no están incluidas en este repositorio y los resultados no son reproducibles aquí; `npm test` valida contratos de fuente.
