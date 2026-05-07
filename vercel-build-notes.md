# Vercel Deployment Notes (Vite + React + HashRouter)

This app uses **HashRouter** (client-side routing). That means refreshes to `/proyecto/<slug>` work on static hosting without special SPA rewrite rules.

## Deployment target
- **Vercel Project root:** `app/`
- **Framework preset (if asked):** “Other” / “Vite”

## Vercel settings
- **Build command:** `npm run build`
- **Install command:** `npm ci` (recommended)
- **Output directory:** `dist`

## What to verify after deploy
- Home page: `/#/` loads
- Project detail: `/#/proyecto/<slug>` loads

## Note about the previous 404 issue
- Some Vercel/CDN probes or direct navigations may still request non-hash URLs (e.g. `/proyecto/<slug>`), which can show 404.
- To guard against that, a root-level `vercel.json` rewrite is included to always serve `index.html` for any path.

## Why `HashRouter` matters
- URLs are hash-based, so navigation is handled client-side via `HashRouter`.


