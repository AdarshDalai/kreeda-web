# Kreeda Web

The frontend for **Kreeda** — a social platform for street sports. Built with Next.js, React, and TypeScript.

Kreeda lets players create teams, schedule matches, track live scores ball-by-ball, run tournaments, and build their sports profiles — starting with cricket and football.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, TypeScript 5 |
| Styling | Tailwind CSS 4, Material Design 3 tokens |
| Auth | JWT (access + refresh), Google OAuth 2.0 (PKCE) |
| Backend | Django + PostgreSQL ([kreeda-backend](https://github.com/AdarshKumarDalai/kreeda-backend)) |

## Getting Started

### Prerequisites

- Node.js 18+
- The [Kreeda backend](https://github.com/AdarshKumarDalai/kreeda-backend) running on `http://localhost:8000`

### Setup

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev
```

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000` | Backend API base URL |

## Project Structure

```
src/
├── app/                    # Pages & routing (Next.js App Router)
│   ├── layout.tsx          # Root layout — fonts, theme, AuthProvider
│   ├── page.tsx            # Landing page / health check
│   ├── (app)/              # Authenticated routes (shared sidebar layout)
│   │   ├── dashboard/      # Home dashboard
│   │   ├── teams/          # Team CRUD, join, invitations
│   │   ├── matches/        # Match creation, detail, scoring
│   │   ├── tournaments/    # Tournament listing & detail
│   │   ├── profile/        # User profile, edit, followers/following
│   │   ├── search/         # Player search
│   │   ├── user/[id]/      # Public user profiles
│   │   ├── notifications/  # Notifications
│   │   └── settings/       # User settings
│   ├── auth/               # Login, signup, OAuth callback, OTP, onboarding
│   └── matches/live/       # Public live matches (ISR, 30s refresh)
│
├── components/
│   ├── auth/               # LoginForm, SignupForm, GoogleSignIn, OTP, Onboard
│   ├── layout/             # Navbar
│   ├── profile/            # ProfileHeader, ProfileStats, SportProfileCard
│   ├── providers/          # AuthProvider (React Context)
│   └── ui/                 # Button, Input, Card, Avatar, Spinner
│
├── lib/
│   ├── api/                # API client + endpoint functions (102 endpoints)
│   │   ├── client.ts       # Generic fetch wrapper with JWT auto-refresh
│   │   ├── auth.ts         # Signup, login, OAuth, OTP, signout
│   │   ├── users.ts        # Profile, follow, search, block
│   │   ├── teams.ts        # CRUD, members, invitations, join by code
│   │   ├── matches.ts      # CRUD, toss, scoring, live, scorecard
│   │   ├── scoring.ts      # Events, conflicts, votes
│   │   ├── tournaments.ts  # CRUD, registration, points table
│   │   ├── venues.ts       # CRUD, search, nearby
│   │   ├── notifications.ts
│   │   └── settings.ts
│   ├── auth/
│   │   └── session.ts      # Cookie-based token storage
│   ├── hooks/
│   │   └── useAuth.ts      # Auth hook (legacy)
│   └── types/              # TypeScript interfaces for all API models
│       ├── auth.ts         # Session, AuthResponse, request types
│       ├── user.ts         # UserProfile, SportProfile, follow counts
│       ├── team.ts         # Team, members, invitations
│       ├── match.ts        # Match, participants, toss, playing XI
│       ├── scoring.ts      # Events, conflicts, votes, match state
│       └── common.ts       # Venues, tournaments, settings, notifications
│
├── middleware.ts            # Edge route protection (auth redirects)
└── globals.css              # M3 design tokens, component classes
```

## Key Architecture Decisions

- **App Router with route groups** — `(app)/` wraps all authenticated pages in a shared sidebar layout without affecting URLs
- **Generic API client** — Single `apiClient<T>()` function handles all endpoints with automatic 401 → token refresh → retry
- **Cookie-based sessions** — Enables Edge middleware to check auth before page loads (no flash of protected content)
- **React Context for auth** — `AuthProvider` shares user state across all components without prop drilling
- **ISR for live matches** — Pre-rendered static page that refreshes every 30 seconds for near-real-time data

## Scripts

```bash
npm run dev       # Start dev server with hot reload
npm run build     # Production build (type-checks all files)
npm run start     # Serve production build
npm run lint      # Run ESLint
```

## License

Private — All rights reserved.
