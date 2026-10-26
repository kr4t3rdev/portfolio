# Tasks: modo oscuro editorial

Todas las tareas completadas el 2026-10-26. Evidencia en proposal.md.

## 1. Diseño

- [x] Inventariar colores hardcodeados del CSS legacy (styles.css, case-study.css, motion.css)
- [x] Definir paleta oscura editorial: fondo #191b17, frente #e8e2d5, acentos recalibrados
- [x] Decidir estrategia: inversión semántica + overrides quirúrgicos (ver design.md, D1)

## 2. Implementación

- [x] `public/theme.css`: tokens `[data-theme="dark"]`, `color-scheme`, overrides hardcodeados,
      botón `.theme-toggle` (44px, cursor pointer), swap de iconos sol/luna con animación de
      entrada, `html.theme-anim` (240ms), bloque reduced-motion
- [x] `public/script.js`: `applyTheme` (data-theme, localStorage, meta theme-color, sync de
      toggle, animación condicionada a reduced-motion), `initTheme` (binding idempotente por
      elemento) integrado a `initMotion`
- [x] `src/pages/index.astro`: script inline anti-flash, link theme.css, meta theme-color
      #e7e1d4, botón en nav tras el CTA
- [x] `src/pages/proyectos/financemdm/index.astro`: ídem + wrapper `.case-header-actions`
      para conservar la métrica del link "Todos los proyectos"

## 3. Verificación

- [x] `scripts/test.mjs`: bloque de asserts de tema (tokens, overrides, toggle, persistencia,
      anti-flash en ambas páginas, meta)
- [x] `scripts/build-smoke.mjs`: theme.css en builtFiles + checks en dist (dataset.theme,
      localStorage.getItem, .theme-toggle en ambas rutas)
- [x] QA Playwright tema: 25/25 (default claro, sistema oscuro, toggle + persistencia +
      reload, meta sync, contraste 13.44:1, caso de estudio, reduced-motion)
- [x] Regresión motion en oscuro: 24/24 (incluye check específico de reveals en dark)
- [x] Capturas: /tmp/qa-light.png, /tmp/qa-dark.png, /tmp/qa-dark-services.png

## 4. Documentación y entrega

- [x] README: sección "Dark mode"
- [x] OpenSpec: spec `dark-theme` + project.md actualizado
- [x] Commit `855da26`, push a `main`, deploy Vercel verificado en producción (Ready 13s)
- [x] Engram: observación de arquitectura guardada
- [ ] **Revisión pendiente del usuario** (ver checklist en proposal.md) — al aprobar,
      marcar el cambio como revisado/archivado
