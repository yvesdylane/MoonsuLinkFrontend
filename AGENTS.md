<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Moonsu Link — Agent Guide

## Stack
- **Next.js 16** (App Router) + **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4** — `@import "tailwindcss"` (NOT `@tailwind base/components/utilities`)
- **PostCSS** — via `@tailwindcss/postcss` v4 plugin
- **No tests** configured yet

## Key Commands
```bash
npm run dev      # next dev  → http://localhost:3000
npm run build    # next build
npm run start    # next start
npm run lint     # eslint (config: eslint.config.mjs)
```
Order does not matter yet (no typecheck script).

## Project Conventions
- **`@/*`** path alias → maps to repo root (e.g. `@/app/layout`)
- **`app/`** — App Router pages/layouts
- **No pages router** or `src/` directory
- **No middleware, API routes, or `loading.tsx`** currently — all boilerplate

## Backend (separate service)
- API docs in **`API_REFERENCE.md`** — FastAPI at `http://localhost:8000`
- **PostgreSQL** — UUID PKs (`gen_random_uuid()`), custom enum types (region, role, verified as VARCHAR), `updated_at` via trigger
- Admin auth: 6-digit OTP → JWT (24h), bearer token required
- Notable: `verified` column is VARCHAR(`'true'`/`'false'`/`'pending'`), NOT boolean

## Reference Code
- **`reference from past project with react/`** — old React SPA (`services/api.ts` has a `request` wrapper + `api` object pattern to follow when building the API client for the current app). Pages there (Alerts, Listings, Prices, Users, Login) map loosely to the `API_REFERENCE.md` endpoints.
- **Design style only** — NOT a routing pattern reference. Current project uses Next.js App Router (`pageName/page.tsx`), not React Router SPA style.

## Existing Doc Files
- `API_REFERENCE.md` — full REST + DB schema reference (source of truth for backend contract)
- `CLAUDE.md` — just `@AGENTS.md` (redundant, can ignore)
