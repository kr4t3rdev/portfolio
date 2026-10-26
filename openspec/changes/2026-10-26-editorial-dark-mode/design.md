# Design: modo oscuro editorial

## Contexto

El CSS legacy (`public/styles.css`, 500+ líneas) mezcla tokens (`--ink`, `--paper`, acentos)
con ~25 valores hardcodeados derivados de esos tokens (overlays `rgba(23,25,22,X)`, glows
`rgba(231,225,212,X)`, superficies `#d8d1c3`/`rgba(240,235,224,.64)`, textos apagados
`#bab8ae`/`#c9c8be`, mock del teléfono). El design system es un par semántico: `--ink` es el
"frente" (usado como texto, bordes, sombras duras y fondo de paneles invertidos) y `--paper`
el "fondo" (usado como superficie, texto sobre paneles invertidos y chips).

## Decisión 1 — Inversión semántica en vez de re-tokenización

**Decisión:** redefinir el par en `:root[data-theme="dark"]` y corregir los hardcodeados con
overrides quirúrgicos `[data-theme="dark"]` en un archivo nuevo (`theme.css`).

**Alternativas descartadas:**
1. Re-tokenizar todo el CSS legacy (nuevos tokens `--surface`, `--muted`, etc.) — más limpio
   a largo plazo, pero refactor masivo con riesgo de regresión visual en un sitio ya en
   producción; se registra como posible evolución posterior.
2. Duplicar estilos por tema — no mantenible.

**Consecuencia:** la inversión invierte también el ritmo de composición: los paneles que en
claro eran oscuros (contact, commerce-lab header, hoja plataforma, diagrama de arquitectura)
pasan a claros sobre oscuro. Es deliberado (preserva el contraste editorial), pero debe
validarse visualmente en revisión — ver checklist del proposal.

## Decisión 2 — Resolución de tema sin flash

Script inline en `<head>` (Astro `is:inline`): `localStorage('theme')` → si no existe,
`prefers-color-scheme`. Siempre fija `data-theme`, así el CSS solo necesita
`:root[data-theme="dark"]` (sin media queries duplicadas ni estados "auto"). El toggle
persiste la elección explícita.

## Decisión 3 — Transición efímera con clase

`html.theme-anim` aplica por 300ms `transition` de color-props sobre todo el body y se
retira; evita el costo permanente de transiciones globales y no interfiere con las
transiciones de transform del motion layer (solo cubre color/border/shadow/fill/stroke).
`prefers-reduced-motion` la elimina (cambio instantáneo).

## Decisión 4 — Elementos que no se invierten

- **Consola del hero:** ya es oscura en tema claro; en oscuro solo se ajusta el borde para
  separarla del fondo. Conserva todo su interior.
- **Mock del teléfono:** `background: var(--ink)` habría pasado a claro (roto); se fija
  oscuro en ambos temas con override explícito.
- **Paneles sobre acentos** (sage, clay, ochre, plum, cyan): los acentos cambian poco, los
  textos sobre ellos se mantienen oscuros — sin overrides innecesarios.

## Decisión 5 — Icono del toggle con geometría genérica

Sol/luna dibujados con primitivas simples (círculo + rayos; arco creciente) — sin geometría
de terceros, por lo que no requiere atribución en THIRD_PARTY_NOTICES. Swap por
visibilidad (`:root:not([data-theme="dark"]) .icon-moon { display:none }`) + animación de
entrada (rotación -120° → 0, 320ms) que se reproduce en cada cambio porque el icono entra
de `display:none`.

## QA — aprendizajes de infraestructura

1. **Astro preview puede bindear solo a IPv6** (`[::1]:4321`): si `127.0.0.1` falla pero
   `localhost` responde, es binding IPv6. El QA usa `localhost`.
2. **Google Fonts puede colgar el evento `load`** en headless: interceptar
   `fonts.googleapis.com`/`fonts.gstatic.com` con `route.fulfill` (200, CSS vacío) hace los
   suites deterministas.
3. **Playwright sin browsers descargados:** se lanza el Brave del sistema con
   `executablePath` — sin descargas de 150MB.

## Enlaces

- Spec: `openspec/specs/dark-theme/spec.md`
- Motion layer (base del motor): `openspec/specs/motion-system/spec.md` — REQ-004 documenta
  el deadlock IntersectionObserver/clip-path que la variante mask del reveal tuvo que evitar.
