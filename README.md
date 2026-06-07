# Moonsu Link

> **Digital Farmer Assistant & Marketplace for Cameroon**  
> Connect farmers, buyers, and agricultural value chain actors across Cameroon via WhatsApp and Telegram.

Your farm marketplace, inside your chat app.

---

## Overview

Moonsu Link is a full-stack web application that serves as the **admin dashboard and marketing frontend** for a chat-based agricultural marketplace. The marketplace itself lives inside WhatsApp and Telegram — farmers and buyers interact through a bot — while this platform provides:

- A **marketing landing page** that explains the service
- An **admin dashboard** for managing users, listings, reports, verifications, and more
- A **Next.js API proxy** that securely forwards requests to the backend, keeping the JWT token invisible to client-side JavaScript

### Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **UI Library** | React 19 |
| **Language** | TypeScript (strict) |
| **Styling** | Tailwind CSS v4 |
| **Animation** | Framer Motion 12 |
| **Icons** | react-icons |
| **Linting** | ESLint 9 (flat config) |
| **Backend** | FastAPI (separate service) |
| **Database** | PostgreSQL |

---

## Getting Started

### Prerequisites

- **Node.js** >= 22
- **npm** (or your preferred package manager)
- The **FastAPI backend** running at `http://localhost:8080` (see `API_REFERENCE.md`)

### Environment

Copy the example environment file:

```bash
cp .env.example .env
```

| Variable | Default | Description |
|---|---|---|
| `BACKEND_API_URL` | `http://localhost:8080` | URL of the FastAPI backend |

### Install & Run

```bash
npm install
npm run dev        # → http://localhost:3000
```

### Commands

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Project Structure

```
.
├── app/                          # Next.js App Router
│   ├── admin/                    # Admin dashboard (14 sections)
│   │   ├── login/                # OTP login page
│   │   ├── verify/               # OTP verification page
│   │   └── (dashboard)/          # Dashboard route group
│   │       ├── dashboard/
│   │       ├── users/
│   │       ├── listings/
│   │       ├── reports/
│   │       ├── issues/
│   │       ├── verifications/
│   │       ├── alerts/
│   │       ├── advice/
│   │       ├── products/
│   │       ├── product-prices/
│   │       ├── locations/
│   │       ├── interests/
│   │       └── logs/
│   ├── api/admin/[[...slug]]/    # Catch-all API proxy to FastAPI
│   ├── layout.tsx                # Root layout (Outfit font, SEO meta, dark mode)
│   ├── page.tsx                  # Marketing landing page
│   └── globals.css               # Tailwind v4 base + custom theme
├── components/                   # Reusable React components
│   ├── Navbar.tsx
│   ├── TeamCard.tsx
│   ├── TeamSection.tsx
│   └── ThemeToggle.tsx
├── lib/                          # Utilities
│   ├── images.ts                 # Static image barrel exports
│   ├── teamData.ts               # Team member data
│   ├── parallax.ts               # Scroll-based parallax effect
│   ├── scrollReveal.ts           # IntersectionObserver reveal animations
│   └── ThemeProvider.tsx         # Dark mode context provider
├── services/
│   └── api.ts                    # Typed admin API client (all endpoints)
├── public/
│   └── images/                   # Static images (hero, team, demo screenshots)
├── .env.example
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── eslint.config.mjs
```

---

## Architecture: API Proxy

The browser **never communicates directly** with the FastAPI backend. All `/api/admin/*` requests go through a Next.js route handler at `app/api/admin/[[...slug]]/route.ts`, which:

1. Receives the relative request from the client
2. Reads the JWT from the **HttpOnly cookie** (`token`)
3. Forwards the request (body, query, method) to the FastAPI backend
4. On success from `/api/admin/verify`, sets both:
   - `token` (HttpOnly) — the JWT, invisible to JS
   - `user` (non-HttpOnly) — name + role for session awareness
5. Returns the backend response to the client

### Why?

- The JWT is never exposed to client-side JavaScript
- No `Authorization` headers or tokens in client code
- Standard cookie-based session semantics

---

## Admin Dashboard

The admin panel requires a **6-digit OTP** for login. Once verified, the JWT is stored in an HttpOnly cookie (24-hour expiry).

### Available Sections

| Section | Description |
|---|---|
| Dashboard | Stats overview |
| Users | Manage user accounts |
| Listings | Manage marketplace listings |
| Reports | Review user-submitted reports |
| Issues | Customer support issues |
| Verifications | Farmer identity verification (approve/reject) |
| Alerts | System-wide alert management |
| Advice | Agricultural advice/articles (CRUD) |
| Products | Manage product catalog |
| Product Prices | Price tracking and management |
| Locations | Regional location management |
| Interests | User interest categories |
| Logs | Message, assistant, and state logs |

---

## Design System

### Colors

| Token | Value | Usage |
|---|---|---|
| `primary` | `#162531` | Dark navy — headers, nav, dark backgrounds |
| `accent` | `#9af376` | Bright green — CTAs, highlights |
| `accent-dark` | `#5cbf34` | Accent hover states |

### Animations

- **Scroll reveal** — `data-reveal` attributes + `IntersectionObserver` from `@/lib/scrollReveal`
- **Parallax** — `data-parallax` attributes + scroll-driven `translateY` from `@/lib/parallax`
- **Framer Motion** — Hero section stagger/fade-up animations
- **Reduced motion** — All animations respect `prefers-reduced-motion`

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `BACKEND_API_URL` | Yes | FastAPI backend URL (server-side only) |

---

## Contributing

This project is maintained by **CODE::DEV**. The `AGENTS.md` and `API_REFERENCE.md` files contain internal reference for AI-assisted development and are gitignored.

---

## License

Private — internal project. All rights reserved.
