# Implementation plan and design decisions

Written before implementation, then kept current. Read alongside `BRAND_AND_DESIGN.md`, `ARCHITECTURE.md`, `CONTENT_AND_FUNCTIONALITY.md` and `QUALITY_GATES.md`.

## Sources
1. **Brochure** (tri-fold image supplied in the brief): headlines, pillars, client names, captions, contact details.
2. **FCA Business Plan 2026–2030** (PDF supplied by the client): founding date (September 2025), ownership, ten brands served in year one, sectors, service catalogue, vision, mission, core values, approach, growth phases, tagline "We work until you are seen, heard, and in demand".
3. **Image library** in `images/`.

Market statistics in the business plan (market size, "73% of businesses", competitor names) are **not** used on the site: they are unsourced and naming competitors is inappropriate on a public page.

## Asset inventory

The client asked for the images to be renamed with meaningful names. Original WhatsApp filenames are listed so the mapping can be traced. Files were renamed in place; nothing was deleted or re-encoded. During the build the folder was moved from `images/` to `public/images/` (not by the build scripts). The app imports the photos statically from there through the `@images/*` alias.

| New name | Original name | Size | Subject (identified visually) | Use |
|---|---|---|---|---|
| `beach-event-setup.jpeg` | WhatsApp … 03.38.04 (2) | 1200×1600 | Band setup on a beach terrace at sunset, ocean horizon. Brochure caption: "Event planning & coordination — behind the scenes of a summer beach event". | Home hero, Work |
| `fca-team-group.jpeg` | … 03.38.04 (3) | 1280×854 | Six team members in FCA polos ("Strategy · Branding · Media"). | Home team, About |
| `client-consultation.jpeg` | … 03.38.04 | 1200×1600 | Two people in conversation outdoors. Brochure caption: "Client consultation". | Home, Work, Services |
| `client-consultation-screenshot.jpeg` | … 03.38.03 | 740×1600 | Phone screenshot (letterboxed) of the same scene. | Not used (duplicate, low quality) |
| `onsite-discussion-group.jpeg` | … 03.38.02 | 1226×1600 | Five people on site. Brochure caption: "On-site discussion". | Home, Work |
| `onsite-discussion-group-alt.jpeg` | … 03.38.04 (1) | 1200×1600 | Same scene, different grade/crop. | Not used (near duplicate) |
| `tm-mall-videography-shoot.jpeg` | … 03.38.03 (1) | 1200×1600 | Woman in pink with a videographer. Brochure caption: "On the ground with TM Mall". Bottom edge has a blue gradient from an edit, so it is cropped from the top. | Home, Work |
| `team-working-session.jpeg` | … 03.38.05 (1) | 1204×1600 | Team working on laptops in a meeting room. | About, Services |
| `behind-the-scenes-camera.jpeg` | … 03.38.05 (2) | 960×1280 | Camera back screen during a portrait shoot. | Work (photography), Services |
| `portrait-navy-dress.jpeg` | … 03.38.04 (4) | 1252×1600 | Studio portrait. | Work (photography) |
| `portrait-red-blazer.jpeg` | … 03.38.05 (3) | 1098×1600 | Studio portrait. | Work (photography) |
| `portrait-duo.jpeg` | … 03.38.05 | 1273×1600 | Studio portrait, two people. | Work (photography) |
| `fola-logo.jpeg` | unchanged | 831×831 | Official logo on white. | Source for generated logo files |

Generated derivatives (the source is untouched): `public/brand/fca-logo-navy.png`, `fca-logo-white.png`, `fca-monogram.png`, `fca-monogram-white.png`, `src/app/icon.png`, `src/app/apple-icon.png`, `src/app/opengraph-image.jpg`. They were made by colour-to-alpha extraction from the JPEG. **A vector logo from the client should replace them.**

The people in the portraits are not named anywhere. Who they are, and whether they are FCA staff or clients, needs client confirmation.

## Design direction: "the horizon"

> **Update 2026-11-15:** the gold line across the hero was removed after client review (it read as a stray line through the photograph). The hero is now a full-height split: headline left, beach photograph bleeding to the right edge with its caption on a scrim. Gold remains on primary buttons, the approach progress line and focus rings.

The business plan closes with "helping businesses reach their horizon". The strongest image in the library is a beach event shot against an ocean horizon. The site's single signature device is a **gold horizon line**: one thin gold rule. In the hero it draws across from the photograph's horizon into the headline. Later it marks progress through the six-step approach. It is not used as decoration anywhere else.

Boldness is spent in one place: the hero. It uses very wide, heavy uppercase type (the brochure's voice) against a tall, cinematic crop of the beach photograph. Everything else stays quiet: generous whitespace, a disciplined grid, and photography with real captions.

### Colour tokens
| Name | Hex | Role |
|---|---|---|
| Midnight | `#081A30` | Dark canvas |
| Navy | `#0B2B4D` | Brand field, light-theme ink accents, dark surfaces |
| Gold | `#F2B82F` | Accent: horizon line, primary button fill, focus ring on dark |
| Gold ink | `#8A5F00` | Gold-family text on light backgrounds (AA on white) |
| Paper | `#F3F5F7` | Light canvas (cool, taken from the brochure's centre panel, deliberately not cream) |
| Ink | `#0C1A2B` | Light-theme text |

Gold is never used as body text on light backgrounds. Navy text on a gold fill is used for the primary button (contrast 9.3:1).

### Typography
**Archivo** (variable: weight 100–900, width 62–125%), one family, loaded with `next/font`.
- Display: width 125%, weight 800, uppercase, tight leading (0.9) and slight negative tracking. This matches the brochure's poster headlines.
- Headings: width 112%, weight 700, sentence case.
- Body: width 100%, weight 400, 1.6 leading, measure at most 68ch.
- The serif in the logo stays in the logo and is not imitated in text.

Not used: tracked all-caps eyebrows above sections, middle-dot meta strings, monospace labels, a "→" after every link.

### Layout
12-column grid, maximum width 1440px, gutters 20px (mobile) to 48px (desktop). Sections vary in pacing:

```
HERO (desktop)
┌──────────────────────────────┬──────────────┐
│ SEEN.                        │              │
│ HEARD.        ───────────────┼── horizon ── │  ← gold line at photo horizon
│ IN DEMAND.                   │  beach photo │
│ intro + 2 CTAs               │  (tall crop) │
└──────────────────────────────┴──────────────┘
MOBILE: photo first (4:5) with line, then type.
```

Home order (updated 2026-11-20): hero → scroll-linked marquee → 01 About us → 02 Services → 03 Work (navy band) → 04 Team → 05 Contact → footer with the FCA signature. Removed at the client's request: brands list (2026-11-18), the four pillars (2026-11-19), the Process section (2026-11-20, also removed from /services). Services photo breaks: branding (left), content (right), events (left, the beach event photo, added 2026-11-20), each with its caption set large on the opposite side.

### Motion system (`src/lib/motion.ts`)
- Durations: 0.2s for UI feedback, 0.6s for reveals, 1.2s for the hero line draw. Ease: `power3.out` on entry, `power2.in` on exit.
- GSAP owns: the hero entrance timeline, the horizon line draw, and the approach progress line (ScrollTrigger scrub on a single `scaleX`).
- CSS transitions own hover, focus, menu and theme feedback. GSAP and CSS never animate the same element.
- Reduced motion: GSAP code exits early, so content renders in its final state. Content is visible without JavaScript because the hidden starting states are set only from JavaScript.

## Architecture
- Next.js 16.4 App Router with `cacheComponents` and `partialPrefetching` (scaffold defaults), TypeScript strict, Tailwind v4 through `@tailwindcss/turbopack`.
- Routes: `/`, `/services`, `/work`, `/about`, `/contact`, `/privacy` (draft), `not-found`, `POST /api/contact`, `sitemap.xml`, `robots.txt`.
- Content lives in typed modules in `src/content/*`, so the copy can be reviewed in one place.
- Client components: `ThemeToggle`, `SiteHeader` navigation state, `ContactForm`, `HeroMotion`, `ApproachProgress`. Everything else is a Server Component.
- Theme: an inline blocking script in `<head>` sets `data-theme` before first paint. The choice is stored in `localStorage` (`fca-theme`: `light` | `dark` | `system`). No dependency.
- Images: static imports from `public/images/` (alias `@images/*`), so they get blur placeholders and hashed caching. `images.qualities: [70, 80]`.
- Contact: zod schema shared by client and server. The route handler applies a honeypot, a minimum fill time, and an in-memory per-IP rate limit (best effort on serverless; documented). Delivery uses Resend's HTTP API through `fetch` when `RESEND_API_KEY` and `CONTACT_TO_EMAIL` are set. Otherwise it returns `503 not_configured` and the UI offers a pre-filled `mailto:` fallback. Success is shown only after the provider returns 2xx.
- Dependencies: `gsap`, `@gsap/react`, `lucide-react`, `zod`. Dev: `vitest`, `playwright` (used with the locally installed Edge for screenshots).

## Self-critique before building
- *First instinct:* centred headline over a darkened photo. **Revised:** an asymmetric split, with type and photograph joined by the horizon line, so the composition is specific to this brand.
- *First instinct:* services as six rounded icon cards. **Revised:** an index-style list with category names as large type and deliverables as plain text.
- *First instinct:* client logos in a scrolling marquee. **Revised:** a static typographic list (no logos were supplied and no auto-motion is needed), labelled honestly as brands FCA has worked with.
- *Risk:* gold overuse. **Rule:** gold appears only on the horizon line, the primary button and the focus ring.

## Test plan
- Vitest: contact schema, rate limiter, contact route handler (not configured, invalid, honeypot, provider success and failure with a mocked `fetch`), theme script logic.
- Lint, `tsc --noEmit`, `next build`.
- Playwright script (`scripts/screenshot.mjs`): screenshots of every route at 390, 768, 1280 and 1440 in light and dark, plus checks for horizontal overflow and console errors.
- Manual keyboard and reduced-motion pass.


## Hero video (2026-11-18)

Client supplied `public/video/hero.MP4` (1080×1920, 97 s, HEVC Main 10 + AAC, 70 MB). HEVC 10-bit does not play in Firefox or in many Chrome/Edge installs, so web encodes were made with ffmpeg (source untouched):

| File | Encode | Use |
| --- | --- | --- |
| `hero-720.mp4` | H.264 High, 720×1280, CRF 25 (max 2.6 Mb/s), AAC 112k, faststart | Default source |
| `hero-540.mp4` | H.264 High, 540×960, CRF 27 (max 1.5 Mb/s), AAC 96k, faststart | `media="(max-width: 767px)"` |
| `hero-poster.jpg` | Frame at 0.4 s, 720 wide | Poster and ambient fallback |

Re-encode command (ffmpeg): `-vf "scale=720:-2,format=yuv420p" -c:v libx264 -profile:v high -preset slow -crf 25 -maxrate 2600k -bufsize 5200k -r 24 -g 48 -movflags +faststart -c:a aac -b:a 112k`.

The 70 MB source sits in `public/`, so it is deployed even though nothing links to it. Move it out of `public/` (for example to `assets-source/`) before launch. NEEDS CLIENT CONFIRMATION: who is speaking in the film, and whether a written transcript should be published alongside it.
