# Change: modo oscuro editorial

- **ID:** 2026-10-26-editorial-dark-mode
- **Estado:** ✅ implementado · ⏳ **pendiente de revisión**
- **Spec sincronizada en:** `openspec/specs/dark-theme/spec.md` (main specs)
- **Commit:** `855da26` — desplegado en https://kr4t3rdev.xyz el 2026-10-26
- **Solicitado por:** usuario ("añade modo oscuro a la web con las mismas skills de diseño y además UI/UX Pro Max")

## Intent

El portafolio solo tenía tema claro (papel/tinta mate). El usuario pidió modo oscuro aplicando las
skills de diseño y las reglas de UI/UX Pro Max (contraste AA, targets 44px, iconos SVG, probar
ambos modos, transiciones 150-300ms, prefers-reduced-motion).

## Approach

Inversión semántica del par de tokens `--ink`/`--paper` en `:root[data-theme="dark"]` + overrides
quirúrgicos para colores hardcodeados heredados, en vez de re-tokenizar todo el CSS legacy.
El toggle persiste la elección; sin elección previa se sigue la preferencia del sistema; un
script inline en `<head>` evita el flash de tema incorrecto. Ver detalle en [design.md](design.md).

## Scope

- [x] `public/theme.css` — tokens oscuros, overrides, botón, transición, reduced-motion
- [x] `public/script.js` — `applyTheme`/`initTheme`/`syncToggle` integrados al motor idempotente
- [x] `src/pages/index.astro` y caso de estudio — script anti-flash, `theme.css`, `meta theme-color`, botón
- [x] `scripts/test.mjs` + `scripts/build-smoke.mjs` — cobertura de la capa de tema
- [x] README — sección "Dark mode"
- [x] QA Playwright — suite de tema (25 checks) + regresión de motion en oscuro (24 checks)
- No se tocó: `public/styles.css` legacy (se sobreescribe por especificidad), consola del hero
  (conserva look terminal), mock del teléfono (oscuro en ambos temas por diseño)

## Review checklist (para revisar después)

- [ ] Estética: ¿la inversión de paneles (contact, commerce-lab, plataforma → claros sobre
      oscuro) se ve correcta en producción, o se prefieren paneles oscuros directos?
- [ ] Paleta: ¿los acentos recalibrados (clay #cf8a6c, sage-dark #a8b699, ochre #c7a86b,
      plum #a98b9f, cyan #8fb1b5) tienen el tono deseado sobre #191b17?
- [ ] Toggle: posición en nav (home) y case-header — visibilidad en móvil ≤680px (nav links
      se ocultan, el botón permanece)
- [ ] Transición: 240ms de cross-fade — ¿agradable o se prefiere instantáneo?
- [ ] Contraste verificado: 13.44:1 texto sobre fondo (AA+) — spot-check visual en secciones
      apagadas (commerce-lab-intro, contact-copy p, service-sheet-platform)
- [ ] Screenshots de QA en /tmp/qa-light.png, /tmp/qa-dark.png, /tmp/qa-dark-services.png

## Evidencia de verificación (2026-10-26)

| Gate | Resultado |
|---|---|
| Tests unitarios + smoke build | ✅ |
| QA tema Playwright | ✅ 25/25 (contraste 13.44:1, persistencia, sistema, ambas páginas) |
| Regresión motion en oscuro | ✅ 24/24 |
| CI GitHub | ✅ 16s |
| Deploy Vercel | ✅ Ready 13s, verificado en vivo (theme.css 200, 36 reglas dark) |

## Relación con otros cambios

- Construye sobre `2026-10-25` motion layer (`9749cb1`) e iconos animados (`d64dcfe`): el
  motor de motion se extendió con la lógica de tema manteniendo idempotencia.
- Specs de esas capacidades: `openspec/specs/motion-system/`, `openspec/specs/animated-icons/`.
