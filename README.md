# Michel García Aguero — Personal Landing Page

Astro-powered personal portfolio showcasing selected finance, inventory, mobile, and commerce products.

## Local preview

```bash
npm test
npm run build
npm run preview
```

For active development, run `npm run dev` and open the local URL printed by Astro.

## Structure

- `src/pages/` — statically rendered Astro routes
- `src/styles/global.css` — Tailwind CSS v4 theme and utilities, without Preflight to preserve the existing visual system
- `public/` — static styles, scripts, favicon, and case-study styles
- `scripts/test.mjs` — dependency-free content and configuration regression checks
- `.openai/hosting.json` — Sites hosting configuration

Astro renders pages statically by default. Interactive client-side components can be added selectively where the portfolio needs them.
