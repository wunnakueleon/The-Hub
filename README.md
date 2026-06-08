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
## About

This is a working demo for a developer community workcation platform — seasonal retreats at villas across Thailand's southern islands where developers gather for a week to build side projects, connect, and recharge.

The concept originated from Nils Magnus, Senior Cloud Principal, who envisioned a dedicated space where developers could step away from their day-to-day, meet like-minded builders, and ship something fun together in a beautiful setting.
I designed and built this prototype end-to-end to bring that vision to life — from the booking flow and event system to the admin portal and the visual identity. The platform covers registration, event browsing, a multi-step room booking system, attendee profiles, and a full admin suite for managing retreats, registrations, and users.

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
Go to **http://localhost:5173** in your browser. 

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

## Project structure

### Backend (`backend/`)

```
backend/
├── prisma/
│   ├── schema.prisma            8 data models (User, Event, Room, Booking,
│   │                            EventAmenity, EventIncluded, EventSchedule, EventFAQ)
│   ├── seed.ts                  demo data — users, events, rooms, bookings
│   └── migrations/              committed DB migrations
├── src/
│   ├── routes/                  URL → controller mapping (one file per domain)
│   │   ├── auth.routes.ts            /api/auth/*
│   │   ├── events.routes.ts          /api/events/*
│   │   ├── bookings.routes.ts        /api/bookings/*   (auth)
│   │   ├── profile.routes.ts         /api/profile      (auth)
│   │   └── admin.routes.ts           /api/admin/*      (admin)
│   ├── controllers/             parse request, call service, shape response
│   │   ├── auth.controller.ts
│   │   ├── events.controller.ts
│   │   ├── bookings.controller.ts
│   │   ├── profile.controller.ts
│   │   └── admin.controller.ts
│   ├── services/                business logic (the rules live here)
│   │   ├── auth.service.ts           hash/verify passwords, issue JWT
│   │   ├── events.service.ts         list/detail + computed booked & priceFrom
│   │   ├── bookings.service.ts       capacity check, ref codes, waitlist promotion
│   │   ├── profile.service.ts        read/update own profile
│   │   └── admin.service.ts          stats, event CRUD, registrations, users
│   ├── middleware/
│   │   ├── auth.middleware.ts        verify JWT, attach req.user
│   │   ├── admin.guard.ts            require role === "admin"
│   │   ├── validate.ts               Zod schema validation
│   │   └── error-handler.ts          central error → JSON (no internals leaked)
│   ├── lib/
│   │   ├── prisma.ts                 PrismaClient singleton (driver adapter)
│   │   ├── jwt.ts                     sign / verify helpers
│   │   └── serialize.ts              DB row → safe API shape (strips password)
│   ├── types/
│   │   ├── index.ts                  shared types (Role, AuthUser, …)
│   │   └── express.d.ts              augments Express req.user
│   ├── server.ts                Express app, CORS, mounts all routes
│   └── index.ts                 entry point — starts the server
├── prisma.config.ts             Prisma 7 datasource + seed config
├── .env.example
├── tsconfig.json
└── package.json
```

**Request lifecycle:** `route → middleware (auth / validate) → controller → service → Prisma → DB`, with `error-handler` catching anything thrown along the way.

### Frontend (`frontend/`)

```
frontend/
├── public/
│   ├── haven-logo.png           brand mark (used by the logo + favicon)
│   └── haven-logo.ico
├── src/
│   ├── components/
│   │   ├── ui/                   design-system primitives (stateless, reusable)
│   │   │   ├── Button · Card · Badge · Input · Select · Textarea
│   │   │   ├── Avatar · AvatarStack · CapacityBar · StatusBadge
│   │   │   ├── Accordion · Modal · Stat · Field · SectionTitle
│   │   │   └── index.ts              barrel export
│   │   ├── icons/                Icon (35+ named icons), KarstScene, WaveDivider,
│   │   │                         SunMotif, HavenLogo
│   │   └── layout/               AppLayout · AdminLayout · AuthLayout
│   │                             Nav · Footer · Logo
│   │
│   ├── features/                 domain modules — each has components/ hooks/ api.ts types.ts
│   │   ├── auth/                 LoginForm, SignUpForm, ResetForm, PasswordInput, useAuth
│   │   ├── events/              EventCard, EventGrid, EventHero, EventDetail,
│   │   │                         AmenityGrid, IncludedList, ScheduleTimeline,
│   │   │                         AttendeeGrid, EventFAQ · useEvents, useEventById
│   │   ├── booking/             BookingPanel, BookingFlow (3-step), RoomSelector,
│   │   │                         BookingCard, CancelModal · useBooking, useMyBookings
│   │   ├── profile/             ProfileForm · useProfile
│   │   └── admin/               AdminDashboard, EventsTable, EventForm, RegistrationsTable,
│   │                             UsersTable, AdminHeader · useAdminStats, useAdminEvents,
│   │                             useRegistrations, useAdminUsers
│   │
│   ├── pages/                    thin route components that compose features
│   │   ├── HomePage · AboutPage · EventsPage · EventDetailPage
│   │   ├── MyBookingsPage · ProfilePage · NotFoundPage
│   │   ├── auth/                 LoginPage · SignUpPage
│   │   └── admin/                DashboardPage · ManageEventsPage · RegistrationsPage · UsersPage
│   │
│   ├── hooks/                    useReveal · useDebounce · useMediaQuery
│   ├── lib/                      api-client · cn · format · constants (routes, status meta)
│   ├── types/index.ts           shared domain types (User, Event, Booking, Room, …)
│   ├── styles/globals.css       Tailwind v4 import + design tokens (@theme)
│   ├── routes.tsx               React Router config
│   ├── App.tsx                  AuthProvider + RouterProvider
│   └── main.tsx
├── index.html
├── vite.config.ts
├── .env.example
├── tsconfig*.json
└── package.json
```

**Layering rule:** `pages` compose `features`; `features` use `components/ui` + `lib` + `hooks`; `components/ui` are pure presentation. Data flows down through each feature's hooks → `api.ts` → the shared `api-client`.

---

## Design system & icons

The UI is built from a small in-house design system — **no component or icon libraries** are pulled in. This keeps the bundle lean and everything on-brand.

### Icons

All icons come from a single component, [`components/icons/Icon.tsx`](frontend/src/components/icons/Icon.tsx) — **41 hand-built SVG icons** stored in one map and rendered with `currentColor` (so they inherit text color). There's no `lucide`, `react-icons`, or font-icon dependency.

```tsx
import { Icon } from "../components/icons/Icon"; // relative paths (no @ alias)

<Icon name="wifi" />              // default 20px
<Icon name="calendar" size={16} />
<Icon name="check" className="text-jade-600" />
```

The set is grouped by purpose:

| Group | Names |
|---|---|
| **Amenities** | `wifi` · `pool` · `ac` · `chef` · `beach` · `kayak` · `generator` · `airport` |
| **Navigation / UI** | `check` · `x` · `chevron-down` · `chevron-right` · `arrow-left` · `arrow-right` · `menu` · `search` · `plus` · `edit` · `trash` · `info` |
| **People / account** | `user` · `users` · `mail` · `lock` · `github` · `settings` · `log-out` · `eye` · `eye-off` |
| **Domain** | `calendar` · `clock` · `map-pin` · `bed` · `ticket` · `credit-card` · `leaf` · `boat` · `coffee` |
| **Admin / status** | `shield` · `gauge` · `check-circle` · `star` · `sun` · `sparkle` · `monitor` |

> **Why a custom map (not an icon library)?** It's safe by construction — icons render as real JSX, never via `dangerouslySetInnerHTML`, so an icon name can't inject markup. It's also zero extra dependencies. To **add an icon**, drop a new entry (the inner SVG paths for a `24×24` viewBox) into the `PATHS` object in `Icon.tsx`; the `IconName` type updates automatically.

### Decorative SVG art

Larger illustrative pieces are their own components in [`components/icons/`](frontend/src/components/icons/):

- **`KarstScene`** — the Thai-island hero illustration (flat fills, no gradients), used on the landing/hero/auth screens.
- **`WaveDivider`** — section divider wave (`currentColor`-tinted, optional `flip`).
- **`SunMotif`** — decorative radial sun-ray accent.
- **`HavenLogo`** — the scalable shelter-and-code-brackets mark.

### Brand assets & fonts

- **Logo / favicon:** [`public/haven-logo.png`](frontend/public/haven-logo.png) (+ `.ico`) — the navy tile with the gold mark, used in the nav, footer, and browser tab.
- **Fonts (via Google Fonts in [`index.html`](frontend/index.html)):** *Cormorant Garamond* for display headings, *DM Sans* for body/UI.
- **Color tokens & spacing:** defined as Tailwind v4 `@theme` variables in [`styles/globals.css`](frontend/src/styles/globals.css) — the `jade` (royal blue), `gold`, `coral`, `sand`, and `ink` palettes. Use them like any Tailwind class: `bg-jade-700`, `text-gold-500`, `border-sand-300`.

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
