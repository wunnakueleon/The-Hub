# CLAUDE.md — project context for AI coding agents

> Orientation for an AI assistant (Claude Code, **Aider**, Cursor, etc.) working on **The Hub**.
> **Using Aider?** It does not auto-load this file — add it to the chat, e.g. `aider CLAUDE.md`
> or `/read CLAUDE.md` inside a session, so the agent has this context.

## What this project is

The Hub — a booking platform for developer retreats: browse retreats, book a room,
manage your bookings/profile, plus an admin back-office. Full-stack TypeScript.

| Layer | Tech |
|---|---|
| Frontend | React 19 · Vite · TypeScript · Tailwind CSS v4 · React Router |
| Backend | Express 5 · TypeScript · Prisma 7 |
| Database | SQLite (local file, via a Prisma driver adapter) |
| Auth | JWT (7-day) + bcrypt |
| Validation | Zod |

Two separate apps run as two processes: `backend/` (API, port **3000**) and
`frontend/` (React SPA via Vite, port **5173**).

## Run it locally

**Backend — terminal 1**
```bash
cd backend
cp .env.example .env        # defaults work for local; no secrets to fill in
npm install
npm run db:setup            # prisma generate + migrate deploy + seed
npm run dev                 # http://localhost:3000
```

**Frontend — terminal 2**
```bash
cd frontend
cp .env.example .env
npm install
npm run dev                 # http://localhost:5173
```

Open http://localhost:5173. Start the **backend first** so the first data load succeeds.

### Demo accounts (from the seed)
- **Admin:** `nils@thehub.dev` / `admin1234`
- **Developers:** `maya@thehub.dev` / `dev1234` (also `sam`, `priya`, `leon`, `wunna` — all `dev1234`)

## Architecture

**Backend request flow:** `route → middleware (auth / validate) → controller → service → Prisma → SQLite`
- Business logic lives in `backend/src/services/` (e.g. `bookings.service.ts` — capacity check, ref codes, waitlist promotion).
- `controllers/` are thin; `routes/` map URLs and attach guards; `middleware/` = `auth.middleware`, `admin.guard`, `validate` (Zod), `error-handler`.
- Auth guards: `requireAuth` (any logged-in user) and `requireAdmin` (admin only). `req.user` comes from the JWT — never trust the request body for identity/role.

**Frontend**
- `pages/` = thin route components, wired in `routes.tsx`.
- `features/{auth,events,booking,profile,admin}/` = domain modules, each with `components/`, `hooks/`, `api.ts`, `types.ts`.
- `components/ui/` = design-system primitives · `components/icons/` = a **custom in-house SVG icon set** (no icon library) · `components/layout/` = Nav, Footer, layouts.
- `lib/api-client.ts` = fetch wrapper (attaches JWT, normalizes errors) · `lib/constants.ts` = `ROUTES` + status metadata.

## Domain rules (important & non-obvious)

- **Booking is instant:** on create it's `confirmed` if capacity allows, else `waitlisted`. No email/approval step.
- **Waitlist auto-promotion:** cancelling a *confirmed* booking promotes the oldest waitlisted booking (in a DB transaction).
- The **confirmation code** (`ref`, e.g. `HUB-KYN7-AB12`) is **display-only** — a human-friendly reference. The app operates on the DB `id`, not the ref.
- **No emails are sent** anywhere — "a confirmation email is on its way" is UI copy; password reset is a no-op success (intentional, to avoid leaking which emails exist).
- Admins are normal users with extra powers — an **admin can also book** retreats.
- Profile edits are limited to `name`/`bio`/`github`/`skills` — **email and role are NOT self-editable** (prevents privilege escalation).
- Admin role is set in the DB (the seed makes `nils@thehub.dev` an admin); there is no UI to self-promote.

## Database

- Schema: `backend/prisma/schema.prisma`. Seed: `backend/prisma/seed.ts`. Migrations are committed.
- **The seed uses `upsert` with an empty update**, so editing `seed.ts` does **not** change rows that already exist. To apply seed edits, run `npm run db:reset` (from `backend/`) to wipe + reseed.
- Local DB file: `backend/prisma/dev.db` (gitignored, created by `db:setup`).

## Conventions

- `.env` files are gitignored; copy from `.env.example`. Defaults are fine for local use.
- Imports are **relative** — there is no `@/` path alias.
- Filenames: **lowercase-hyphenated** (Linux is case-sensitive; keep it portable).
- Keep files small and single-purpose, matching the existing structure (a new feature = a folder under `features/` with `components/ hooks/ api.ts types.ts`).
- Add UI icons by adding an entry to the `PATHS` map in `frontend/src/components/icons/Icon.tsx` (don't add an icon library).

## Gotchas

- **Two servers:** the browser loads the app from `:5173` and calls the API on `:3000` **directly** — that's why CORS exists (allowed via the backend's `CLIENT_URL`).
- **`VITE_API_URL` is baked in at build time** — change `frontend/.env`, then restart the frontend dev server.
- **Port already in use:** `lsof -ti:3000,5173 | xargs kill -9`.
- **Stale login/role:** the JWT + user are cached in browser `localStorage` (`hub_token`, `hub_user`); sign out (or clear them) to reset a session.

## Useful scripts

Backend: `npm run dev` · `npm run db:setup` (first-time) · `npm run db:reset` (wipe + reseed) · `npm run build`
Frontend: `npm run dev` · `npm run build` · `npm run preview` · `npm run lint`

## Not done yet (only relevant if deploying — currently NOT deploying)

- No `helmet` security headers, no rate limiting, no boot-time `JWT_SECRET` check.
- SQLite won't run on serverless; production would move to Turso (libSQL — small adapter swap) or Postgres.

These are intentionally deferred.
