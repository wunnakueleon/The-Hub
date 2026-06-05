# The Hub

A booking platform for developer retreats — browse curated coding getaways, reserve a room, and manage attendees. Built from the Claude Design prototype.

**Stack**

| Layer | Tech |
|---|---|
| Frontend | React + Vite + TypeScript + Tailwind CSS + React Router |
| Backend | Express + TypeScript + Prisma |
| Database | SQLite |
| Auth | JWT + bcrypt |
| Validation | Zod |

---

## Monorepo layout

```
the-hub/
├── frontend/        React single-page app (Vite)
├── backend/         Express REST API (Prisma + SQLite)
├── .gitignore
└── README.md
```

The two apps are developed and run independently. The frontend talks to the backend over HTTP at `/api/*`.

---

## Frontend structure

```
frontend/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ui/                    # Design-system primitives (stateless, reusable)
│   │   │   ├── Button.tsx         # variants: primary, gold, ghost
│   │   │   ├── Input.tsx          # text input with optional icon
│   │   │   ├── Select.tsx
│   │   │   ├── Textarea.tsx
│   │   │   ├── Card.tsx           # base surface
│   │   │   ├── Badge.tsx          # gold / jade / coral pills
│   │   │   ├── Avatar.tsx         # hue-based initial circle
│   │   │   ├── AvatarStack.tsx    # overlapping avatars + "+N"
│   │   │   ├── CapacityBar.tsx    # fill % + "N spots left"
│   │   │   ├── Accordion.tsx      # expand/collapse (FAQ)
│   │   │   ├── Modal.tsx          # backdrop + centered card, esc to close
│   │   │   ├── Stat.tsx           # icon + value + label metric
│   │   │   ├── StatusBadge.tsx    # confirmed/pending/waitlisted/cancelled
│   │   │   ├── Field.tsx          # label + input + hint wrapper
│   │   │   ├── SectionTitle.tsx   # eyebrow + heading + subtitle
│   │   │   └── index.ts           # barrel export
│   │   │
│   │   ├── icons/                 # SVG art & icon set
│   │   │   ├── Icon.tsx           # 30+ named icons (wifi, pool, ac, chef…)
│   │   │   ├── KarstScene.tsx     # Thai-island hero illustration
│   │   │   ├── WaveDivider.tsx    # section divider
│   │   │   ├── SunMotif.tsx       # decorative sun rays
│   │   │   └── HavenLogo.tsx      # brand mark
│   │   │
│   │   └── layout/
│   │       ├── AppLayout.tsx      # public nav + footer wrapper
│   │       ├── AdminLayout.tsx    # sidebar + admin header
│   │       └── AuthLayout.tsx     # split screen: form + scenery
│   │
│   ├── features/                  # Domain modules (the app's real logic)
│   │   ├── auth/                  # login / signup / reset, useAuth, JWT storage
│   │   ├── events/                # event list, filters, detail (amenities, schedule, FAQ…)
│   │   ├── booking/               # booking panel, 3-step flow, my-bookings, cancel
│   │   ├── profile/               # view/edit own profile
│   │   └── admin/                 # dashboard, manage events, registrations, users
│   │       └── (each feature has) components/  hooks/  api.ts  types.ts
│   │
│   ├── pages/                     # Thin route components that compose features
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── EventsPage.tsx
│   │   ├── EventDetailPage.tsx
│   │   ├── MyBookingsPage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── auth/  (LoginPage, SignUpPage)
│   │   └── admin/ (DashboardPage, ManageEventsPage, RegistrationsPage, UsersPage)
│   │
│   ├── hooks/                     # Cross-cutting hooks
│   │   ├── useReveal.ts           # scroll-reveal via IntersectionObserver
│   │   ├── useDebounce.ts
│   │   └── useMediaQuery.ts
│   │
│   ├── lib/
│   │   ├── api-client.ts          # fetch/axios wrapper: base URL, auth header, errors
│   │   ├── cn.ts                  # className merge helper
│   │   ├── format.ts              # baht(n), formatDate(), …
│   │   └── constants.ts           # route paths, STATUS_META map
│   │
│   ├── types/index.ts             # shared domain types (Event, Booking, User, Room…)
│   ├── styles/globals.css         # Tailwind directives + custom utilities
│   ├── routes.tsx                 # React Router config
│   ├── App.tsx
│   └── main.tsx
│
├── tailwind.config.ts             # design tokens (colors, fonts, radii, shadows)
├── postcss.config.js
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

**Layering rule:** `pages` compose `features`; `features` use `components/ui` + `lib` + `hooks`; `components/ui` are pure presentation with no domain knowledge. Data flows down through feature hooks that call `api.ts`, which call the shared `api-client`.

---

## Backend structure

```
backend/
├── src/
│   ├── routes/                    # URL → controller mapping (one file per domain)
│   │   ├── auth.routes.ts         # /api/auth/*
│   │   ├── events.routes.ts       # /api/events/*
│   │   ├── bookings.routes.ts     # /api/bookings/*
│   │   ├── profile.routes.ts      # /api/profile
│   │   └── admin.routes.ts        # /api/admin/* (guarded)
│   │
│   ├── controllers/               # Parse request, call service, shape response
│   │   ├── auth.controller.ts
│   │   ├── events.controller.ts
│   │   ├── bookings.controller.ts
│   │   ├── profile.controller.ts
│   │   └── admin.controller.ts
│   │
│   ├── services/                  # Business logic (the rules live here)
│   │   ├── auth.service.ts        # hash, verify, issue JWT
│   │   ├── events.service.ts      # list/get with attendee counts
│   │   ├── bookings.service.ts    # capacity check, status transitions, waitlist promo
│   │   └── admin.service.ts       # CRUD events, manage registrations, users
│   │
│   ├── middleware/
│   │   ├── auth.middleware.ts     # verify JWT, attach req.user
│   │   ├── admin.guard.ts         # require role === "admin"
│   │   ├── validate.ts            # Zod schema validation
│   │   └── error-handler.ts       # central error → JSON
│   │
│   ├── lib/
│   │   ├── prisma.ts              # PrismaClient singleton
│   │   └── jwt.ts                 # sign / verify helpers
│   │
│   ├── types/index.ts
│   └── server.ts                  # build Express app, mount routes, listen
│
├── prisma/
│   ├── schema.prisma              # data models
│   ├── seed.ts                    # mock data
│   └── migrations/
│
├── tsconfig.json
└── package.json
```

**Request lifecycle:** `route → middleware (auth/validate) → controller → service → prisma → DB`, with `error-handler` catching anything thrown along the way and returning a consistent JSON error.

---

## Application logic

### Roles
- **developer** — the default user. Can browse events, book a room, manage their own bookings and profile.
- **admin** — everything a developer can do, plus the admin dashboard: create/edit/publish events, manage registrations, and view all users.

### Data model (high level)
```
User ──< Booking >── Event ──< Room
                       │
                       ├──< Amenity
                       ├──< Included
                       ├──< Schedule
                       └──< FAQ

A Booking links one User → one Event → one Room.
```
- An **Event** is a retreat (island, villa, dates, capacity) with child rows for rooms, amenities, included items, schedule, and FAQ.
- A **Room** is a bookable room type (shared / private / suite) with a price and bed count.
- A **Booking** ties a user to an event + room, carrying a status, guest count, and dietary notes.

### Core flows

**Auth**
1. Sign up → password hashed (bcrypt), user stored, JWT issued.
2. Log in → password verified → JWT returned, stored client-side, sent as `Authorization: Bearer` on later requests.
3. `auth.middleware` verifies the token and attaches `req.user`; `admin.guard` further restricts admin routes.

**Booking (the heart of the app)**
1. User opens an event detail page and picks a room in the **BookingPanel**.
2. The 3-step **BookingFlow** modal collects: room → details (guests, diet, notes) → review.
3. On submit, `bookings.service` runs a **capacity check**:
   - Space available → status `confirmed`, a unique **ref code** (e.g. `HUB-KY7-2A9F`) is generated.
   - Event full → status `waitlisted`.
4. Cancelling a booking frees a spot and triggers **waitlist promotion** — the oldest waitlisted booking for that event moves to `confirmed`.

**Events**
- Public listing shows only `published` events, each with a live `booked` count and `priceFrom` (cheapest room).
- Detail page aggregates amenities, what's included, the daily schedule, attendee avatars, and FAQ.

**Admin**
- Dashboard surfaces metrics (fill rate, total bookings, users) plus recent activity.
- Manage events: full CRUD with a publish toggle (unpublished events are hidden from the public list).
- Registrations: per-event attendee rows that an admin can confirm / waitlist / cancel.
- Users: read-only list with role, join date, and booking count.

### Booking status lifecycle
```
pending ──▶ confirmed ──▶ cancelled
   │             ▲
   └──▶ waitlisted ┘   (promoted when a spot frees up)
```

---

## Routes & API

### Frontend routes
```
/                  Landing
/about             How it works
/login  /signup    Auth
/events            Event grid + filters
/events/:id        Event detail + booking sidebar
/my-bookings       Current user's bookings        (auth required)
/profile           Edit profile                   (auth required)
/admin             Dashboard                       (admin only)
/admin/events      Manage events
/admin/events/:id  Registrations for an event
/admin/users       All users
```

### API endpoints
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/reset-password

GET    /api/events                 list published events (+ booked count)
GET    /api/events/:id             full event detail

POST   /api/bookings               create booking (capacity check + ref code)
GET    /api/bookings/mine          current user's bookings
PATCH  /api/bookings/:id           cancel (+ waitlist promotion)

GET    /api/profile
PUT    /api/profile

GET    /api/admin/stats            dashboard metrics
GET    /api/admin/events           all events (incl. unpublished)
POST   /api/admin/events
PUT    /api/admin/events/:id       update (incl. publish toggle)
DELETE /api/admin/events/:id
GET    /api/admin/events/:id/registrations
PATCH  /api/admin/registrations/:id   confirm / waitlist / cancel
GET    /api/admin/users
```

---

## Getting started

```bash
# Backend
cd backend
npm install
npm run dev          # http://localhost:3000

# Frontend (separate terminal)
cd frontend
npm install
npm run dev          # http://localhost:5173
```

> **Note:** This README documents the target architecture. The project is being built incrementally, one commit per step — see the build plan. Folders/files appear as each step lands.
