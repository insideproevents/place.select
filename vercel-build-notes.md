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

## Why `HashRouter` matters
- URLs are hash-based, so Vercel will always serve `index.html` for routes, and the client router handles everything.

