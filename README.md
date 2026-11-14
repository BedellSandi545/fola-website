# Fola Creative Agency website

Marketing site for Fola Creative Agency (FCA): Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS v4 and GSAP.

Routes: `/` (home), `/work`, `/services`, `/about`, `/contact`, `/privacy` (draft, not indexed), a custom 404, `POST /api/contact`, `/sitemap.xml` and `/robots.txt`.

## Requirements
- Node.js 20.9 or later (developed on Node 24)
- pnpm (the version is pinned in `package.json` under `packageManager`)

## Setup
```bash
pnpm install
cp .env.example .env.local   # then fill in the values you have
pnpm dev                     # http://localhost:3000
```

## Commands
| Command | What it does |
|---|---|
| `pnpm dev` | Development server |
| `pnpm build` | Production build (all pages are prerendered) |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint (Next.js core-web-vitals and TypeScript rules) |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm test` | Vitest unit tests (validation, rate limiter, contact API, theme script) |
| `pnpm screenshots` | Visual QA: screenshots of every route at 390/768/1280/1440 in both themes, plus overflow and console-error checks |
| `node scripts/interaction-check.mjs` | Browser checks for theme persistence, mobile menu keyboard behaviour, form states, reduced motion and no-JavaScript rendering |

Both browser scripts expect a running server (`BASE_URL`, default `http://localhost:3100`) and use the locally installed Microsoft Edge through Playwright (`PW_CHANNEL=chrome` to use Chrome). Output goes to `OUT_DIR` (default `qa-screenshots/`, git-ignored). In Git Bash, prefix the commands with `MSYS_NO_PATHCONV=1` so route paths such as `/` are not rewritten.

## Environment variables
See `.env.example`.

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | In production | Canonical URLs, sitemap, robots, Open Graph |
| `RESEND_API_KEY` | For online form sending | Server-only Resend API key |
| `CONTACT_TO_EMAIL` | For online form sending | Inbox that receives enquiries |
| `CONTACT_FROM_EMAIL` | Recommended | Sender on a domain verified in Resend |

### Contact form behaviour
- Validation runs in the browser (for usability) and again on the server (for trust), using the same zod schema (`src/lib/validation/contact.ts`).
- The server also applies a honeypot field, a minimum fill time and a per-IP rate limit (5 per 10 minutes). The limit is held in memory, so it is per instance; see `src/lib/rate-limit.ts` to swap in a shared store.
- **If the email variables are missing**, the API returns `503 not_configured`. The form then says the message was not sent and offers a pre-filled `mailto:` link. It never shows "Message sent" unless the provider accepted the email.

### Connecting Resend
1. Create a Resend account and verify the sending domain (DNS records).
2. Create an API key with send permission.
3. Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` in the hosting environment, then redeploy.
4. Send a test enquiry from `/contact` and confirm it arrives.

To use another provider, replace the body of `sendContactEmail` in `src/lib/email/send-contact.ts`. Keep its contract: return `sent` only after the provider confirms.

## Deployment
Any Node.js host that supports Next.js 16 works. On Vercel:
1. Import the repository. The framework and pnpm are detected automatically.
2. Add the environment variables above.
3. Deploy, then check `/sitemap.xml` and `/robots.txt` show the production domain.

## Project structure
```text
public/images/        client photo library (renamed, see docs/IMPLEMENTATION_PLAN.md)
public/brand/         logo files generated from images/fola-logo.jpeg
src/app/              routes, metadata, icons, sitemap, robots, API
src/components/       layout, sections, forms, motion, theme, ui
src/config/           site facts and navigation
src/content/          all page copy and image alt text, with sources noted
src/lib/              validation, email, rate limit, theme, motion tokens, GSAP setup
tests/                Vitest unit tests
scripts/              Playwright QA scripts
docs/                 brief, design and architecture decisions, content verification, QA
```

## Before launch
Read `docs/CONTENT_AND_FUNCTIONALITY.md` › *Launch checklist: needs client confirmation*.
