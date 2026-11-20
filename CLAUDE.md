# Fola Creative Agency Website — Project Rules

## Mission
Build a polished, distinctive, production-ready website for Fola Creative Agency (FCA). The experience should feel like a world-class independent creative agency: confident art direction, exceptional typography, intentional motion, editorial storytelling, and effortless usability. References such as Apple and Lamborghini are quality benchmarks for craft and confidence, not templates to copy.

## Non-negotiable workflow
1. Inspect the entire repository before changing anything. The repository currently contains an existing image-assets folder and no application code. Confirm the actual folder name, list all files, inspect image dimensions and formats, and create a contact sheet or equivalent visual inventory if useful.
2. Preserve all existing assets. Never delete or overwrite source images. (The client explicitly asked for the images to be renamed with meaningful names on 2026-11-14; that rename is done and mapped in `docs/IMPLEMENTATION_PLAN.md`. Do not rename them again without asking.) Do not assume filenames describe image contents. Identify assets visually.
3. Read `PROMPT.md` and every file in `docs/` before implementation.
4. Research and install/activate the relevant skills described in `START_HERE.md`. Verify current install commands and skill names. Use the skills, do not merely mention them.
5. Before coding, write a concise design direction, page map, asset map, technical plan, and implementation checklist. Save decisions in the docs. Do not stop for routine approval; proceed with the strongest well-reasoned solution.
6. Build the complete experience, run it locally, inspect it at desktop/tablet/mobile sizes, fix issues, and run the quality gates in `docs/QUALITY_GATES.md`.
7. Do not claim a check passed unless you actually ran it and observed the result.

## Stack
- Next.js App Router, TypeScript (strict), React, Tailwind CSS.
- Use the current stable compatible versions at project initialization; do not pin obsolete versions from this brief.
- Use Server Components by default. Add Client Components only where interaction, browser APIs, theme state, or animation requires them.
- Use GSAP for choreographed hero/scroll sequences where it adds real value. Use Motion (the current Framer Motion package/API) for small UI transitions only if it complements GSAP. Avoid competing animation systems on the same elements.
- Use `next/image` for local image assets and provide meaningful alt text. Use `next/font` where suitable.
- Use Lucide icons consistently. Do not use emoji as interface icons.
- Use a small, documented component system and semantic design tokens.
- Use a theme solution that supports light/dark/system preference, avoids a flash of the wrong theme, and persists the user's explicit choice.
- Use package manager already present if one exists; otherwise choose pnpm and document it.

## Art direction
Use the brochure supplied by the client as source material, not as a literal web layout. Its recognizable brand cues are deep navy, warm gold, white, confident uppercase display typography, real people/work photography, and a direct collaborative tone. Develop a refined digital identity from those cues:
- Navy-led dark theme and warm, bright light theme.
- Gold as a deliberate accent, not a blanket highlight.
- Strong typographic hierarchy and generous whitespace.
- Large, cinematic photography with purposeful crops.
- Editorial grids and asymmetrical compositions; avoid generic SaaS card grids.
- Restrained borders, shadows, gradients, glass effects, and rounded corners.
- A memorable hero composition and clear calls to action.
- Do not imitate Apple/Lamborghini pages, logos, copy, or proprietary design details.

## Content integrity
Use only facts supported by the brochure or verified by the client. The brochure mentions strategy, creative work, team collaboration, growth, client consultation, on-site discussions, event planning/coordination, and work with named clients. Treat all contact details, client names, social handles, service descriptions, and claims as supplied draft content that must be transcribed accurately and flagged for client confirmation before launch.
- Do not invent case-study results, client quotes, awards, years in business, team biographies, statistics, or service capabilities.
- If details are missing, write clear, useful placeholder copy and mark it `NEEDS CLIENT CONFIRMATION` in the content documentation; do not publish fake specifics.
- Preserve proper names and spelling from the brochure unless the client confirms corrections.
- The QR code is not a substitute for verified social/profile URLs.

## UX and functionality
- Responsive navigation with accessible mobile menu and clear active/focus states.
- Light/dark/system theme toggle; persist explicit choice.
- Strong, useful contact pathways: contact form with real validation, clear loading/success/error states, email and telephone links, and WhatsApp only if the number and destination are verified.
- If no form delivery provider or server credentials exist, do not fake submission. Provide a working email fallback and explain how to configure a provider through environment variables.
- Project/client showcase with intentional image use; do not imply every logo/name is an endorsement beyond what the brochure states.
- Useful service explanations, process overview, FAQ only where answers are supportable, and a strong footer.
- Respect keyboard navigation, visible focus, semantic HTML, contrast, reduced-motion preference, and touch target sizes.
- No dead buttons, decorative controls that look functional, broken links, or placeholder `href="#"`.

## Motion
Motion must communicate hierarchy, reveal information, and make the experience feel considered.
- Create a small motion system with documented durations/easing.
- Use GSAP timelines for a restrained hero entrance and selected scroll storytelling.
- Use IntersectionObserver or GSAP ScrollTrigger thoughtfully; avoid animating every element.
- Use transform/opacity for animation where possible. Avoid layout-thrashing animation.
- Kill/revert GSAP contexts and listeners on unmount.
- Respect `prefers-reduced-motion`; disable or simplify non-essential motion.
- Ensure content is readable and usable if JavaScript or animation fails.
- Do not use scroll hijacking, forced delays, cursor gimmicks, or motion that blocks navigation.

## Engineering quality
- TypeScript strict; no `any` unless justified and documented.
- Keep components small and cohesive; avoid giant page components.
- No unnecessary dependencies or duplicated abstractions.
- Use correct metadata, Open Graph basics, sitemap, robots, canonical strategy, and structured data only when facts are verified.
- Optimize images, fonts, scripts, and client component boundaries.
- Validate forms on the server as well as client when a backend exists.
- Never expose secrets in client bundles. Provide `.env.example` with names and descriptions only.
- Handle loading, empty, error, and success states.
- Add tests for important interactions and content utilities where practical.
- Keep documentation updated when architecture or commands change.

## Completion standard
The task is not complete when the page merely renders. It is complete when all routes and interactions work, responsive layouts are reviewed, accessibility and performance have been considered, content is honest, the console/build are clean, and the final report lists what was implemented, tested, and what still needs credentials or client confirmation.


## Project decisions (kept current)
- **Stack as built:** Next.js 16.4 (App Router, `cacheComponents` + `partialPrefetching`), React 19.3, TypeScript strict, Tailwind v4 via `@tailwindcss/turbopack`, GSAP 3 + `@gsap/react`, lucide-react, zod 4, Vitest, Playwright (used with the local Edge). Package manager: **pnpm**.
- **Read `node_modules/next/dist/docs/`** before using Next APIs. This version differs from older tutorials (`preload` replaces `priority`, `images.qualities` is required, routes stay mounted through `<Activity>`, and `new Date()` in prerendered server code needs `"use cache"` or `connection()`).
- **Images** live in `public/images/` and are imported statically through `@images/*`. Alt text lives in `src/content/images.ts` only.
- **Copy** lives in `src/content/*` and `src/config/site.ts`, with sources noted. The business plan PDF is an approved source alongside the brochure; its market statistics and competitor names are intentionally unused.
- **Hero:** from `lg` up the hero fills the first screen and the film column bleeds to the right viewport edge at full height. The column holds `HeroVideo` (client request, 2026-11-18): the vertical first-year reel shown whole at 9:16 (never cropped: it has burned-in captions) in a rounded frame, on an ambient backdrop painted from the playing video into a tiny blurred canvas. On 2026-11-19 the client tried frameless, wider and plain-navy variants, then asked for this framed version back exactly as it was, including the blurred backdrop. Headline (client, 2026-11-19): "Helping businesses reach their horizon." The home About section keeps only its title, paragraph, button and a photo; the four pillars were removed (client, 2026-11-19). Muted autoplay only with motion allowed and no Save-Data; pauses off screen; play/pause and "Sound on" (restarts from 0) controls. Sources: `public/video/hero-720.mp4`, `hero-540.mp4` (phones), `hero-poster.jpg`, encoded from `hero.MP4` (HEVC 10-bit, not browser-safe; keep as source, do not reference). The earlier gold horizon line was removed on 2026-11-15 (client found it awkward). Gold is reserved for primary buttons, current-state markers, short accent rules and focus rings.
- **Type:** Archivo variable only (width axis). Display = `.type-display` (125% width, 800, uppercase); headings = `.type-heading` (112%, 700, sentence case).
- **Theme:** inline head script (`src/lib/theme.ts`) plus `ThemeToggle` (`useSyncExternalStore`). Storage key `fca-theme`.
- **Motion owners:** `HeroMotion` (hero + inner-page intro entrance), `Parallax` and `ScrollDrift` (scroll-scrubbed GSAP), `RevealObserver` (adds `.is-in` to `[data-animate]` elements; variants live in globals.css). The Process/approach section and its `ProgressLine` were removed at the client's request (2026-11-20). Hidden starting states apply only under `.js` and when motion is allowed.
- **Contact:** `POST /api/contact` returns success only after Resend confirms. Without env vars it returns 503 and the UI offers a mailto fallback.
- **QA:** `pnpm lint && pnpm typecheck && pnpm test && pnpm build`, then `pnpm screenshots` and `node scripts/interaction-check.mjs` against `pnpm start -p 3100`.
