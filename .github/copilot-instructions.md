# Project Guidelines

## Build and Test

- Use Node.js `>=22.14.0` (Node 24 LTS is recommended). From the repository root, install with `npm ci`.
- First-time setup: `npm run setup`. This creates `backend/.env`, initializes `backend/data/gesta.db`, and loads demo data.
- The repository uses npm workspaces (`backend` and `frontend`); run shared commands from the repository root so both workspaces are covered.
- Run the application with `npm run dev`: the API listens on `http://localhost:3000` and Vite serves the frontend on `http://localhost:5173`.
- Before each important commit, run `npm run check`. It runs Oxlint, TypeScript checks, all Vitest tests, and both builds. Linting denies warnings.
- Run focused tests with the workspace script and a Vitest path, for example:
  - `npm run test -w backend -- tests/offers.test.ts`
  - `npm run test -w frontend -- tests/OffersPage.test.tsx`
  - Add `-t "test name"` to either command to select a test name.
- Run `npm run typecheck`, `npm run lint`, or `npm run build` from the root for all workspaces; use `npm run <script> -w backend` or `npm run <script> -w frontend` for one workspace.
- Database commands are `npm run db:init` and `npm run db:reset`. Stop the dev server before resetting, especially on Windows.
- The root `.npmrc` disables install scripts; keep the committed lockfile and do not run an ad-hoc native build unless a dependency explicitly requires it.

## Architecture

Gesta is an npm-workspaces application with a React/Vite frontend, an Express/TypeScript backend, and a local SQLite database accessed through `better-sqlite3`.

- Frontend requests use `/api/...`; Vite proxies them to the backend and removes `/api`. The backend exposes routes without that prefix.
- Backend flow: `main.ts` initializes configuration and the database, `app.ts` assembles dependency-injected repositories, services, routers, and middleware, then requests flow through controllers, services, repositories, and SQLite.
- Backend responsibilities are intentionally separated:
  - Controllers validate HTTP input and produce responses.
  - Services contain business rules and must not depend on Express `Request` or `Response`.
  - Repositories contain handwritten SQL and return database-row data.
  - Mappers convert between database rows, domain models, and API DTOs.
  - `authenticate` establishes `req.user`; `authorize` applies named permission rules; `errorHandler` formats errors.
- Frontend follows the course MVVM shape: pages compose hooks and components; hooks manage display/session state; services perform HTTP calls and validate JSON with type guards; models hold API types; utilities handle labels, storage, guards, and permissions. `useAuth` is called once by `App` and its session callbacks are passed down.
- Tests exercise the assembled layers: backend tests use Vitest/Supertest with an in-memory SQLite database; frontend tests use Vitest, jsdom, and Testing Library with mocked fetch responses. Do not use the development database in tests.
- The repository is intentionally a partial implementation of the wider Gesta specification. Extend the existing implemented slices and their tests; do not assume every documented business feature already has a route or UI.

## Conventions

- Backend imports use explicit `.ts` extensions. TypeScript rewrites them to `.js` during the backend build.
- Construct layers through the existing factory pattern (`create...Repository`, `create...Service`, router factories) and wire them in `backend/src/app.ts`; this keeps the full application testable.
- Report expected API failures by throwing `new HttpError(status, code, message)`. The centralized handler returns `{ "error": { "code", "message" } }`; preserve the documented 400/401/403/404/500 status and code meanings.
- Keep authorization in backend middleware/services, not only in frontend route visibility. Re-read account roles and companies from the database on authenticated requests.
- The demo login is development-only and has no password. Do not treat it as real authentication; the server rejects it when `NODE_ENV=production`.
- Send the session token directly as the `Authorization` header value, without a `Bearer` prefix. Use `API.md` and the existing HTTP request files as the API contract.
- Store status and enum values in their documented English codes (for example `PUBLISHED`); translate them to French labels only at the frontend presentation boundary.
- Schema changes require a new ordered SQL migration under `backend/src/db/migrations/` (for example `002_description.sql`); do not edit an applied migration. Update seed data and database tests when the fixture contract changes.
- Reuse stable identifiers from `backend/src/db/seed/seedIds.ts` in backend tests. Seed data is fictional and is reset with `npm run db:reset`.
- For new or changed API behavior, update `backend/API.md`, relevant `backend/http/*.http` examples, backend tests, and frontend guards/services/pages/tests as applicable.
- Keep the repository’s French user-facing wording and existing simple CSS approach. The project intentionally has unfinished business features; implement only the requested scope.
- For frontend API calls, use the existing service utilities and type guards rather than parsing response data in pages. Preserve the `401` flow through `onUnauthorized`, which clears the session and returns to login.
- For backend changes, keep HTTP validation in controllers, business rules in services, SQL in repositories, and response conversion in mappers. Wire new factories through `backend/src/app.ts` so assembled tests exercise the same graph as production.
- When changing permissions, update both backend authorization and frontend visibility only as a UX optimization; the backend remains the source of truth. Re-read authenticated roles and company membership from SQLite rather than trusting the token or client state.
- For changes submitted through a pull request, follow `.github/pull_request_template.md`, including validation, permissions, API/HTTP documentation, migration, browser-testing, and conversation-export checklist items that apply.

## Reference Documentation

- [README.md](../README.md) — setup, commands, supported Node versions, current scope, and troubleshooting.
- [docs/architecture.md](../docs/architecture.md) — detailed layer responsibilities and reference feature paths.
- [docs/seed.md](../docs/seed.md) — demo users, companies, offers, and fixture invariants.
- [backend/API.md](../backend/API.md) — routes, authentication, response shapes, and error codes.
