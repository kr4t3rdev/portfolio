# Michel García Aguero — Personal Landing Page

Astro-powered personal portfolio showcasing selected finance, inventory, mobile, and commerce products.

## Local preview

```bash
npm test
npm run build
npm run preview
```

For active development, run `npm run dev` and open the local URL printed by Astro.

## Continuous integration and deployment

GitHub Actions runs on pushes to `main`, pull requests, and manual dispatch. It uses Node.js 24, installs the lockfile with `npm ci`, runs `npm test`, builds the site, and smoke-checks the generated home and FinanceMDM case-study routes and their static assets with `npm run test:build`. Dependabot checks npm dependencies and GitHub Actions weekly.

GitHub Actions is a validation workflow; it does not deploy the site. This repository is connected to the existing Vercel project `michel-garcia-portfolio`, which runs `npm test && npm run build && npm run test:build` as its build gate. Vercel validates independently of GitHub Actions, creates previews for pull requests, and deploys production from `main` to https://kr4t3rdev.xyz. A failed Vercel validation prevents publication, but Vercel does not wait for the separate GitHub Actions result. No deployment secrets or GitHub deployment workflow are needed for this Git integration.

## Structure

- `src/pages/` — statically rendered Astro routes
- `src/styles/global.css` — Tailwind CSS v4 theme and utilities, without Preflight to preserve the existing visual system
- `public/` — static styles, scripts, favicon, and case-study styles
- `scripts/test.mjs` — dependency-free content and configuration regression checks
- `scripts/build-smoke.mjs` — verifies required routes and assets in the generated static build
- `.github/workflows/ci.yml` — GitHub Actions validation workflow
- `.openai/hosting.json` — Sites hosting configuration

Astro renders pages statically by default. Interactive client-side components can be added selectively where the portfolio needs them.

## Motion system

The animation layer is dependency-free: `public/motion.css` (styles, keyframes, variants) plus a small engine in `public/script.js` (IntersectionObserver, stagger bookkeeping, scroll progress, parallax). Both pages load them, and Astro's `ClientRouter` view transitions (fade + slide) connect the home and the case study.

**Page-load intro.** Add `data-intro` to an element; optional `style="--intro-delay: 120ms"` staggers the sequence. Variants: `data-intro` (rise), `"down"` (header), `"right"` / `"left"` (slides), `"mask"` (typographic clip reveal), `"fade"` (long ambient fade). These run as one-shot keyframe animations, so they are independent of scroll.

**Scroll reveals.** Keep the base `.reveal` class and add a `data-motion` variant: `left`, `right`, `zoom`, `blur`, or `mask`. The engine observes each `.reveal` and toggles `is-visible`. The `mask` variant applies the clip to the heading's **children**, not to the observed element itself: `clip-path` shrinks the intersection area to zero, so a fully clipped element never crosses the observer threshold and would deadlock (visible in viewport, `intersectionRatio: 0`, never revealed). A `data-delay="90"` attribute sets a manual reveal delay.

**Staggered groups.** Add `data-stagger` to a parent and its direct children enter one after another (`is-staggered` class, 85ms steps, 600ms cap). `data-stagger="pop"` also scales children (social links). Elements above the fold reveal automatically; without JS or with `prefers-reduced-motion: reduce` everything renders static and visible.

**Scroll-linked behavior.** A thin `.scroll-progress` bar tracks reading progress, the header becomes sticky with a translucent blur after 12px of scroll (`is-scrolled`), and `[data-parallax="0.05"]` elements drift subtly via the `--py` custom property.

**Living decorations.** The FinanceMDM ledger bars grow (`scaleY`) when the featured card reveals, the Cashflow currency badges float on offset timings, the hero orbit stamp spins slowly, the availability dot pulses, the commerce-lab bridge line draws itself, and `<details>` content sweeps in on open.

All motion uses GPU-friendly properties (`transform`, `opacity`, `filter`, `clip-path`) with the existing editorial easing `cubic-bezier(.2, .75, .25, 1)`. The engine is idempotent and re-initializes on `astro:page-load`, so reveals survive view transitions without duplicating listeners. A 26-check Playwright suite verified the layer in a real browser, including the reduced-motion path.

## Dark mode

The theme layer lives in `public/theme.css` with engine support in `public/script.js`. `--ink`/`--paper` are a semantic foreground/background pair, so `:root[data-theme="dark"]` inverts the whole site — including the inverted panels (contact, commerce-lab header, platform sheet, architecture diagram), which become light over dark to preserve the editorial contrast rhythm. Hard-coded legacy colors get surgical `[data-theme="dark"]` overrides; the hero console keeps its terminal look and the phone mock stays dark in both themes.

Behavior:

- **Resolution order:** `localStorage('theme')` if set, otherwise the system `prefers-color-scheme`. An inline `<head>` script sets `data-theme` before first paint, so there is no flash of the wrong theme.
- **Toggle:** a 44px `.theme-toggle` button (sun/moon SVG, spinning entrance) in the nav and the case-study header flips the theme, persists the choice, syncs `meta[name="theme-color"]`, and updates `aria-pressed`/`aria-label`.
- **Transition:** a transient `html.theme-anim` class cross-fades colors for 240ms; under `prefers-reduced-motion` the switch is instant and the icon animation is removed.
- **Contraste:** dark body text measures 13.44:1 on `#191b17` (WCAG AA+); `color-scheme` is declared for native controls.

Verified with a 25-check Playwright suite (defaults, system preference, toggle, persistence, meta sync, contrast, case study, reduced motion) plus a 24-check motion regression running under dark theme.

## Reusable icons

`src/components/icons/AnimatedIcon.astro` provides the locally rendered, typed directional and service SVGs; use its `name`, optional `size`, `strokeWidth`, `class`, and optional accessible `label` props. Without a label it is decorative (`aria-hidden` and unfocusable); with a label it is exposed as an image. `BrandIcon.astro` reuses the existing WhatsApp and Instagram SVG geometry without changing the accessible names on their links. Shared styles are imported with the components. On link, button, or summary hover and keyboard focus, directional arrows travel 5 SVG units along their indicated direction and recoil in a 520ms one-shot; WhatsApp rocks through a 9-degree nudge in 520ms, while Instagram turns 9 degrees and scales to 1.12 before settling in 560ms. Inside an opt-in `.icon-trigger`, the 24px service marks animate only on hover/focus-within: the three panel pieces separate and settle in 720ms, server racks open/close 3 units with a brief LED blink in 760ms, and the three layers fan apart by up to 3 units in 680ms. There are no loops, automatic entrances, or layout shifts. All are CSS-only; `prefers-reduced-motion` removes animation, transitions, and transforms so every icon remains fully visible and static.

Example:

```astro
---
import AnimatedIcon from "../components/icons/AnimatedIcon.astro";
---
<a href="/projects/">Browse projects <AnimatedIcon name="arrow-up-right" /></a>
```

The borrowed SVG source geometry and full license texts are documented in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md); copies are also shipped in `public/licenses/` in the built site.
