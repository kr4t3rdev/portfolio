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
