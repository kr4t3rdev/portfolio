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
