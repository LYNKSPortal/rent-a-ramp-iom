<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project notes (Rent a Ramp)

- **Site content/pricing/hours/contact**: edit `src/lib/site-config.ts` — no component changes needed.
- **Booking requests**: `/booking` posts to `/api/bookings`, which validates the request and sends it to `CONTACT.email` using Resend. No database or admin dashboard is used.
- Set server-only `RESEND_API_KEY` and `RESEND_FROM_EMAIL` locally in `.env.local` and in the deployment host. The sender domain must be verified in Resend. Never use a `NEXT_PUBLIC_` prefix for credentials.
- The booking endpoint has a honeypot, origin checks, bounded process-local throttling and Resend idempotency. Configure host-level rate limiting before production; process-local throttling is not shared across serverless instances.
- Marketing pages live under `src/app/(site)/` with the public Navbar/Footer layout.
- Verification: `npm run lint`, `npm test`, `npx tsc --noEmit`, and `npm run build`.
- Responsive regression checks: install Chromium once with `npx playwright install chromium`, start the app, then run `npm run test:responsive`. Defaults to localhost:3000; override with `TEST_BASE_URL`. Checks all public pages, mobile menus, pricing, required policy acceptance and duplicate submission prevention across 320–1280px without sending emails.
- Performance/accessibility checks: run `npm run build`, serve with `npm start -- --port 3100`, then `npm run test:audit`. Mobile Lighthouse reports go into ignored `.next/audits/`; axe checks all public pages. These are lab tests, not Google field data.
- Image conversion: `npm run images:optimise` produces content-hashed WebP photos under `public/images/`. Update their source references if generated hashes change; only these hashed files have immutable one-year caching. Original photos are retained.
- `VERCEL_ANALYTICS_ENABLED=true` enables the cookie-free Vercel integration after Web Analytics is enabled in the Vercel project; custom conversion events require Pro or Enterprise. Events must never include form values. `GOOGLE_SITE_VERIFICATION` optionally adds the Search Console verification tag; account verification and Google Business Profile management require the owner.
- Booking requests must include boolean `acceptedPolicies` and the current `BOOKING_POLICY_VERSION`. Acknowledgements include the accepted policy version. Increment it whenever the terms or safety rules change. Owner approval of policy wording, package prices and business-specific restrictions is required before publication.
