# CLAUDE.md

## Project Overview

DHL Car Park Coupon — a kiosk-style web app for DHL employees to request parking coupons. Employees log in with their ID, select a reason, and the system sends a print job to a thermal printer.

## Tech Stack

- **Frontend**: React 19 + TypeScript, Vite 7, Tailwind CSS 3, lucide-react icons
- **Backend**: Express 5 + TypeScript (in `server/`)
- **Deployment**: Docker Compose (frontend via Nginx on port 80, backend on port 3001)

## Project Structure

```
src/                  # Frontend source
  components/screens/ # Screen components (LoginScreen, WelcomeScreen, ReasonScreen, etc.)
  components/         # Shared components (Header, LoadingOverlay, DHLLogo)
  types/              # TypeScript type definitions
  config/             # API config
  constants/          # App constants (reasons, mock data)
server/               # Backend Express API
  routes/             # API route handlers
```

## Commands

- `npm run dev` — run frontend + backend concurrently
- `npm run dev:frontend` — Vite dev server only
- `npm run dev:backend` — Express backend with tsx watch
- `npm run build` — production frontend build
- `npm run lint` / `npm run lint:fix` — ESLint
- `npm run format` — Prettier
- `npm run ts:check` — TypeScript type checking (`tsc --noEmit`)

## Code Style & Conventions

- Prettier: single quotes, 2-space indent, trailing commas (es5), 100 char print width
- ESLint + eslint-config-prettier
- Strict TypeScript (`strict: true`, `noUnusedLocals`, `noUnusedParameters`)
- Pre-commit hooks via Husky + lint-staged (runs eslint --fix, prettier --write, then `ts:check`)
- Use `readonly` on component prop interfaces
- Prefer `lucide-react` for icons

## Git Workflow

- Main branch: `main`, development on `develop`
- Commit messages: imperative mood, concise (e.g. "Add quantity screen", "Fix login error")
- Pre-commit runs lint-staged + `tsc --noEmit` — all code must pass before commit
