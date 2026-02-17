# Engineering Calendar (SvelteKit)

This project has been migrated from Next.js to SvelteKit while preserving the same routing, server/client separation, and Supabase/Auth0 calendar logic.

## Development

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Type-check: `npm run check`
- Build for production: `npm run build`
- Preview production build: `npm run preview`

## Environment Variables

Set these variables before running the app:

- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_KEY`
- `AUTH0_BASE_URL`
- `AUTH0_CLIENT_ID`
- `AUTH0_CLIENT_SECRET`
- `AUTH0_DOMAIN`

## Routes

- `/` → redirects to `/calendar`
- `/login`
- `/calendar`
- `/calendar/[id]/calendar.ics`
- `/auth/callback`
- `/api/auth/login`
- `/api/auth/callback`
