# The Hub

A booking platform for developer retreats — browse curated coding getaways, reserve a room, and manage attendees. Full-stack TypeScript app with a React frontend and an Express + Prisma backend.

| Layer | Tech |
|---|---|
| Frontend | React 19 · Vite · TypeScript · Tailwind CSS v4 · React Router |
| Backend | Express 5 · TypeScript · Prisma 7 |
| Database | SQLite (local file) |
| Auth | JWT + bcrypt |
| Validation | Zod |

---

## Quick start (run it locally)

> **You'll need [Node.js](https://nodejs.org) 20.19+ or 22.12+** (22 LTS recommended) and npm.
> The app runs as **two processes** — the backend API and the frontend — so you'll use **two terminals**.

### 1. Get the code
```bash
git clone <repo-url> The-Hub
cd The-Hub
```

### 2. Backend — terminal 1
```bash
cd backend
cp .env.example .env       # creates your local config (the defaults work as-is)
npm install
npm run db:setup           # generates the Prisma client, creates the SQLite DB, seeds demo data
npm run dev                # → http://localhost:3000
```
Leave this running.

### 3. Frontend — terminal 2
```bash
cd frontend
cp .env.example .env       # defaults point at the backend on :3000
npm install
npm run dev                # → http://localhost:5173
```

### 4. Open the app
Go to **http://localhost:5173** in your browser. 🎉

---

## Log in with the demo accounts

The seed creates these accounts (all on a local DB — nothing is real):

| Role | Email | Password |
|---|---|---|
| **Admin** | `nils@thehub.dev` | `admin1234` |
| Developer | `maya@thehub.dev` | `dev1234` |
| Developer | `sam@thehub.dev` | `dev1234` |
| Developer | `priya@thehub.dev` | `dev1234` |
| Developer | `leon@thehub.dev` | `dev1234` |
| Developer | `wunna@thehub.dev` | `dev1234` |

- Log in as a **developer** to browse retreats, book a room, and manage your bookings/profile.
- Log in as the **admin** (`nils@thehub.dev`) to see the **Admin** link in the nav — dashboard, event management, registrations, and users.

---

## What you can do

- **Browse retreats** — public landing + events pages with live capacity bars.
- **Book a room** — 3-step flow (room → details → review), with a unique confirmation code. If a retreat is full you're waitlisted; if someone cancels, the oldest waitlisted booking is auto-promoted.
- **Manage your trips** — view and cancel your bookings.
- **Edit your profile** — name, bio, GitHub, skills (shown to other attendees).
- **Admin** — create/edit/publish events, confirm/waitlist/cancel registrations, and view all users + stats.

---

## Project layout

```
The-Hub/
├── backend/          Express + Prisma API
│   ├── prisma/
│   │   ├── schema.prisma     data models
│   │   ├── seed.ts           demo data (events, users, bookings)
│   │   └── migrations/       committed DB migrations
│   └── src/
│       ├── routes/           one file per domain (auth, events, bookings, profile, admin)
│       ├── controllers/      request → service → response
│       ├── services/         business logic (capacity checks, waitlist promotion, etc.)
│       ├── middleware/        auth guard, admin guard, validation, error handling
│       ├── lib/              prisma client, jwt helpers, serializers
│       └── server.ts         app wiring + route mounting
│
└── frontend/         React single-page app (Vite)
    └── src/
        ├── components/       ui/ (design system), icons/, layout/
        ├── features/         auth · events · booking · profile · admin
        │                     (each with components/, hooks/, api.ts, types.ts)
        ├── pages/            thin route components
        ├── lib/              api client, helpers, route + status constants
        ├── routes.tsx        React Router config
        └── App.tsx
```

---

## Useful scripts

**Backend** (`cd backend`)
| Command | What it does |
|---|---|
| `npm run dev` | Start the API with auto-reload |
| `npm run db:setup` | Generate client + apply migrations + seed (first-time setup) |
| `npm run db:reset` | Wipe the DB and reseed from scratch |
| `npm run build` | Type-check + compile to `dist/` |

**Frontend** (`cd frontend`)
| Command | What it does |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

---

## Notes & troubleshooting

- **`.env` files are not committed** (they're gitignored). That's why step 2 & 3 copy from `.env.example`. The defaults are fine for local use — no secrets to fill in.
- **The database is a local file** at `backend/prisma/dev.db` (also gitignored). It's created by `npm run db:setup`. To start over with fresh demo data, run `npm run db:reset`.
- **Want fresh data / messed something up?** From `backend/`, run `npm run db:reset`.
- **"Port already in use"** — something else is on `:3000` or `:5173`. Stop it, or find it with `lsof -ti:3000` (macOS/Linux) and kill it.
- **The frontend loads but data is missing / login fails** — make sure the **backend terminal is still running** on port 3000. The frontend talks to it for everything.
- **`VITE_API_URL` is read at build time** — if you change `frontend/.env`, restart the frontend dev server.

---

## API overview

All under `http://localhost:3000/api`:

```
POST   /auth/register | /auth/login | /auth/reset-password
GET    /events                 list published events
GET    /events/:id             full event detail
POST   /bookings               create a booking            (auth)
GET    /bookings/mine          your bookings               (auth)
PATCH  /bookings/:id           cancel                      (auth)
GET    /profile  ·  PUT /profile                           (auth)
GET    /admin/stats | /admin/events | /admin/users         (admin)
POST   /admin/events  ·  PUT/DELETE /admin/events/:id      (admin)
GET    /admin/events/:id/registrations                     (admin)
PATCH  /admin/registrations/:id                            (admin)
```
