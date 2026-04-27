# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # dev server at localhost:4321
npm run build     # production build → ./dist/
npm run preview   # serve the built site locally
npm run astro -- check  # type-check all .astro files
```

No lint or test scripts are configured. Node ≥ 22.12.0 required.

Deployment is automatic: push to `main` triggers GitHub Actions (`.github/workflows/deploy.yml`) which builds and deploys to GitHub Pages at `teletrex.com`.

## Architecture

**Stack:** Astro 6, vanilla CSS, no JS framework, no Tailwind, no content collections. All page content is inline in `.astro` files.

### Layout hierarchy

Two layouts wrap every page:

- **`Layout.astro`** — root HTML shell. Defines all CSS custom properties (`--color-*`, `--font-*`), global `.btn*` classes, the background watermark via `body::before`, and always mounts `<CookieConsent />`.
- **`InnerPage.astro`** — wraps `Layout.astro`. Used by every page except the homepage. Automatically places `<SiteHeader>` and `<SiteFooter>`, appends ` · TeleTrex` to the `title` prop, and provides `.page-lead`, `.prose-block`, `.section-title` as `:global()` classes.

The **homepage** (`pages/index.astro`) uses `Layout` directly and manually places `<SiteHeader>` and `<SiteFooter>` to allow full-bleed sections. Every other page uses `InnerPage`.

### Shared config

`src/config/site.ts` is the only shared data layer — it exports `BOOK_CALL_URL` (Calendly link) and `SITE_NAME`. Import from here wherever those values are needed; don't hardcode them in pages.

### Styling conventions

- All styles are scoped `<style>` blocks per component/page — no global stylesheet beyond what's in `Layout.astro`.
- Design tokens live in `Layout.astro`'s `:root` block. Use CSS custom properties (`var(--color-accent)` etc.) rather than raw hex values.
- The `--font-display` (Fraunces) / `--font-body` (Plus Jakarta Sans) pairing is defined there and loaded via Google Fonts in the `<head>`.

### Navigation active state

`SiteHeader.astro` computes the active nav link by comparing `Astro.url.pathname` using `startsWith`, so `/products/associate` correctly highlights the `/products` nav item. When adding new top-level routes, add an entry to the nav links array in `SiteHeader.astro`.

### Cookie consent / analytics

`CookieConsent.astro` lazily injects GA (`G-SFT78TWDDH`) and GTM (`GTM-NDP8T957`) only after user consent, using `localStorage`. IDs are passed to the client script via Astro's `define:vars`. Don't add analytics scripts anywhere else.

## Notes

- `Welcome.astro` is an unused Astro starter placeholder — ignore it.
- Several `*.astro~` Emacs backup files exist in `src/pages/products/` — don't commit them.
- `public/style-guide.html` is a standalone static brand reference — not part of the Astro build.
- `public/TeleTrex-Template.pptx` is a PowerPoint deck template — not part of the Astro build.
