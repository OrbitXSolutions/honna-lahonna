# Project Architecture and Setup

Date: 2025-09-24
Repository: OrbitXSolutions/honna-lahonna
Branch: main

---

## Summary

This project is a Next.js 15.3 (App Router) application with React 19, Tailwind CSS v4, shadcn/ui, Prisma (PostgreSQL), and Supabase for authentication and storage. It follows an RSC-first design with server actions, SSR Supabase session management via middleware, and a small client-side layer for auth/session state and uploads.

---

## Tech Stack

- Framework: Next.js 15.3 (App Router), React 19
- Styling/UI: Tailwind CSS v4, shadcn/ui, Radix Primitives
- Data: Prisma v6 (PostgreSQL), generated client in `lib/generated/prisma`
- Auth/Storage: Supabase (SSR/Browser/Admin clients), phone OTP + Google OAuth
- Validation: Zod (multi-step forms, auth, phone OTP)
- State: Server Components + server actions; selective client hooks
- Caching: `unstable_cache` and `react` cache for read-heavy endpoints
- Build: pnpm, Turbopack for dev
- TypeScript: strict, path alias `@/*`

---

## Directory Structure (high level)

- `app/`
  - Public pages: `page.tsx` (home), `services/`, `about/`, `faq/`, `partners/`, `testimonials/`
  - Auth: `(auth)/login`, `(auth)/register`, `(auth)/otp`, `(auth)/set-phone`, `(auth)/logout`
  - Service provider: `service-provider/register`, `service-provider/profile`
  - API routes: `api/auth/*`, `api/governorates/list`, `api/service-categories`
  - Server actions: `_actions/service-provider/*`
- `components/`
  - `templates/` (Home, Services, Service Provider Registration/Profile, Login/Register/OTP)
  - `organisms/`, `atoms/`, `ui/` (forms, widgets, uploaders)
- `lib/`
  - `constants/` (routes, cache tags, supabase paths/buckets)
  - `data/` (Prisma data-access, domain models/schemas)
  - `supabase/` (SSR/Browser/Admin clients, middleware, upload utils)
  - `generated/prisma/` (Prisma client output)
  - `safe-action.ts` (next-safe-action client)
- `prisma/` (schema + migrations)
- `docs/` (documentation)

---

## Runtime Architecture

### Server vs Client
- Pages/templates are primarily React Server Components.
- Server actions handle mutations; data fetching is mostly server-side.
- Client components are used for Supabase browser auth and file uploads.

### Supabase Integration
- SSR client: `lib/supabase/server.ts` creates a server-side client using `@supabase/ssr` and Next cookies.
- Client: `lib/supabase/client.ts` uses `createBrowserClient` for client-side auth and storage.
- Admin: `lib/supabase/admin.ts` creates a privileged client with the service role key (use env var only in production).

### Middleware & Route Protection
- `middleware.ts` → `updateSession(request)` establishes Supabase SSR session then chains:
  - `app/(auth)/otp/otp.middleware.ts`: enforces OTP route param integrity and redirects appropriately.
  - `app/service-provider/register/service-provider-register.middleware.ts`: requires auth for provider registration; redirects already-onboarded providers.
- `config.matcher` skips common static/image routes.

### Data Access and Caching
- Prisma client instantiated per call (simple/clear in server environments).
- Caching with `unstable_cache` for:
  - Governorates: `lib/data/prisma/governorates.ts`
  - Service Categories: `lib/data/prisma/service-categories.ts`
  - Service Providers (list/paginated/grouped/slug): `lib/data/prisma/service-providers.ts`
- Cache keys via `CacheTags` and 1-hour revalidation.

### API Surface
- `GET /api/governorates/list` → `getGovernorates()`
- `GET /api/service-categories` → `getServiceCategories()`
- `GET /api/auth/callback` and `GET /api/auth/confirm` → handle Supabase OAuth and email OTP flows

---

## Data Model (Prisma)

- Tables
  - `users`: app user profile (email, phone, avatar, admin flag). `user_id` maps to Supabase auth user id.
  - `service_providers`: detail record linked to `users`, `service_categories`, and `governorates`.
  - `governorates`: region list with `governorate_code`.
  - `service_categories`: domain categories with `slug` and `icon`.
  - `draft_service_providers`: draft state mirroring `service_providers` fields.
- Enums
  - `service_delivery_method`: `online | offline | both`
  - `service_provider_status`: `pending | approved | rejected`

---

## Authentication & User Management

- Phone/password auth and phone OTP verification (`lib/data/supabase/auth.ts`).
- Google OAuth sign-in with redirect to `/api/auth/callback`.
- Client hook `hooks/use-supabase-user.ts` maintains client-side user state.
- `app/(auth)/logout/route.ts` signs out via SSR client then redirects to `/`.

---

## Business Domain & User Journeys

A marketplace connecting service providers to customers:

1) Browsing
- Visitors browse services by category/governorate; search and pagination are supported.

2) Registration/Login
- Users sign up via phone or Google.
- Set phone and verify via OTP when required.

3) Provider Onboarding
- Multi-step registration form:
  - Service details (name, description, category, delivery method, address when offline/both)
  - Social links (Facebook, Instagram, WhatsApp, official, other)
  - Private docs/media (logo image, ID front/back, video, certificates, additional documents)
- Upload helpers store files in Supabase Storage buckets (`images`, `videos`, `documents`) and return stored filenames.
- Providers are listed once approved.

---

## Notable Details & Risks

- `lib/supabase/admin.ts` includes a fallback hard-coded service role key. Remove this and require `SUPABASE_SERVICE_ROLE_KEY` in env for production.
- `lib/db.ts` is empty and unused; consider removing or implementing a shared Prisma client if needed.
- `app/page.tsx` contains an unreachable second `return` (cleanup safe).
- `components/templates/service-provider-registration-template.tsx` is empty; `service-proivder-register.template.tsx` (typo in filename) is used by the route.
- `tsconfig.json` includes a likely typo: `components/organisms/app-header.txs` (should be `.tsx`).
- `next.config.ts` `images.remotePatterns` uses `new URL(...)`; Next typically expects `{protocol, hostname, pathname}` objects. Validate compatibility with your Next version and adjust if needed.

---

## Environment Variables

Required:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `DATABASE_URL` (PostgreSQL)
- `DIRECT_URL` (PostgreSQL direct URL)
- `NEXT_PUBLIC_APP_URL` (e.g., `http://localhost:3000`)

Recommended:
- `SUPABASE_SERVICE_ROLE_KEY` (do NOT hard-code; required for Admin client features)

Ensure Supabase Storage buckets exist:
- `images` with folders: `service_categories`, `service_providers`, `users`
- `videos` with folder: `service_providers`
- `documents` with folder: `service_providers`

---

## Build & Run

Install dependencies and generate Prisma client:

```bash
pnpm install
pnpm exec prisma generate
```

Prepare database:

```bash
# Apply existing migrations in production-like environments
pnpm exec prisma migrate deploy

# Or, for local dev schema sync
pnpm exec prisma db push
```

Development:

```bash
pnpm dev
```

Production:

```bash
pnpm build
pnpm start
```

---

## Key Modules

- Auth flows: `lib/data/supabase/auth.ts`, `(auth)/routes`, `middleware.ts`, `lib/supabase/*`
- Data layer: `lib/data/prisma/*` (cached reads; advanced provider queries)
- Domain schemas: `lib/data/models/schemas/*` (Zod; multi-step form validation)
- Uploads: `lib/supabase/utils/*` (image/video/document)
- Routing/constants: `lib/constants/*` (routes, cache tags, storage paths)

---

## Suggested Improvements

- Remove fallback service role key from `lib/supabase/admin.ts`; enforce env-only configuration.
- Fix typos and minor code smells: unreachable return in `app/page.tsx`; `tsconfig.json` include; template filename typo.
- Consider a shared Prisma singleton if connection limits or cold-start overheads arise.
- Add `.env.example` and package scripts for Prisma tasks.
- Validate `next.config.ts` image patterns as per the current Next.js spec.

---

## Notes

- Postinstall runs `prisma generate` to ensure the generated client exists before type-checks.
- Caching is conservative (1-hour revalidation); adjust for your content freshness needs.
- Middleware explicitly calls `supabase.auth.getUser()` to avoid session sync pitfalls.
