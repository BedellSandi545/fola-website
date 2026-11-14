# MASTER PROMPT — Build the Fola Creative Agency website

You are the lead product designer, brand designer, senior Next.js engineer, motion designer, accessibility reviewer, and QA engineer responsible for delivering the complete Fola Creative Agency (FCA) website in this repository.

## Context
The repository currently contains only an existing folder of images and no application code. The image folder is the client's supplied asset library. The attached brochure image is the primary brand/content reference. Build the website from the ground up.

FCA presents itself as a creative agency that helps brands grow, connect, and win. The brochure communicates strategy-led creativity, collaborative teamwork, purposeful creative work, growth partnership, client consultation, on-site discussions, event planning and coordination, and experience working with a selection of businesses.

The brochure's visual identity uses deep navy, gold/yellow, white, bold typography, and documentary-style photography. Translate that identity into a premium, modern digital experience. Do not reproduce the brochure as three vertical columns.

## Quality target
The website should have the finish and confidence of an exceptional global creative studio. Use Apple and Lamborghini only as references for craft, precision, typography, pacing, and visual confidence. Do not clone their websites or use their brand assets.

It must not look like a generic AI-generated agency template. Avoid:
- Repetitive rounded cards and identical feature grids.
- Random gradients, glowing blobs, excessive glassmorphism, or decorative shapes without purpose.
- Generic stock-photo hero layouts when relevant supplied photography exists.
- Overused tiny uppercase eyebrow labels on every section.
- Huge claims without evidence, fake metrics, fake testimonials, or invented client outcomes.
- Scroll-jacking, excessive parallax, constant animation, or slow intro screens.

## Phase 1 — Inspect and plan before coding
1. Inspect repository structure, package manager state, git status, and all existing assets. Do not overwrite source assets.
2. Generate a visual asset inventory: filename, dimensions, format, likely subject/use, and any duplicates. If possible create a contact sheet for your own inspection. Identify the strongest hero image, team/consultation images, event imagery, project imagery, and logos. Do not guess from filenames alone.
3. Inspect the brochure reference and extract supported content and brand cues. Record uncertain text/details for client confirmation.
4. Read `CLAUDE.md` and all files under `docs/`.
5. Activate and use the relevant installed skills:
   - Anthropic `frontend-design` for a distinctive, brief-led design process.
   - `ui-ux-pro-max` for design-system reasoning, responsive UX, accessibility, motion, and UI review.
   - Vercel `vercel-react-best-practices` for React/Next performance.
   Verify the current official installation instructions and skill identifiers first. If skills are unavailable, explain and continue using the written rules; do not waste time on repeated installation attempts.
6. Use current Next.js documentation matching the version you install. For Next.js 16.3+, inspect the generated agent guidance/bundled docs after starting the dev server.
7. Produce a short written plan in `docs/`: design tokens, typography, page structure, key interactions, asset mapping, architecture, dependencies, risks, and test plan. Critique the design against the brief and revise generic choices before coding.

Then continue into implementation. Do not stop after producing a plan.

## Phase 2 — Build the website
Create a complete, production-quality Next.js App Router project using TypeScript and Tailwind CSS. Use the latest stable compatible versions available at implementation time.

Recommended information architecture:
- `/` — homepage with a distinctive hero, clear positioning, selected work/client proof, services, process, about/team introduction where supported, contact CTA, and footer.
- `/services` — meaningful service descriptions based on verified brochure content. Do not invent unsupported services.
- `/work` — selected clients/projects or collaborations. Only show project-specific claims that can be verified; if the brochure only supplies client names, present them honestly as client/brand relationships, not detailed case studies.
- `/about` — agency philosophy, approach, and team information. Do not invent staff names or biographies.
- `/contact` — accessible contact options and a validated contact form.
- Add a custom not-found page and legal/privacy pages only if appropriate content is available; otherwise create clearly marked drafts and document the need for client/legal review.

You may refine the route map if a better, simpler structure is justified. Do not add pages merely to inflate the site.

### Homepage direction
Create a bold first impression. The hero should communicate what FCA does, who it helps, and what action a visitor can take. Consider a cinematic image-led or typographic composition using real supplied assets. The hero should feel art-directed, not like a centered headline over a gradient.

Suggested content direction (rewrite as needed):
- Positioning: “Creative thinking. Meaningful connection. Measurable momentum.” Do not imply measured results unless evidence exists.
- Supporting idea: FCA partners with businesses to build visibility, create meaningful content, and bring ideas to life.
- Primary CTA: “Start a project” or “Let’s talk”.
- Secondary CTA: “Explore our work”.

### Core experience
- Premium desktop navigation and carefully designed mobile navigation.
- Light, dark, and system theme modes with persistence and no theme flash.
- Responsive layouts across narrow mobile, tablet, desktop, and wide desktop.
- Carefully art-directed services and work sections, not repetitive cards.
- Strong photography and intentional crops using existing assets.
- Elegant hover/focus feedback and purposeful page transitions.
- Smooth but restrained GSAP motion, with reduced-motion support.
- Functional contact flow with honest feedback and no fake success.
- Accessible forms, labels, validation, error messages, focus management, and keyboard support.
- Clickable phone/email/social links only when destinations are verified.
- SEO metadata, Open Graph metadata, sitemap, robots, favicon/app icons if assets allow, and structured data only for verified facts.

### Contact form requirement
Inspect the repository and environment for an existing backend or email provider before choosing an integration. If none exists:
- Implement a clear provider-agnostic server-side integration boundary.
- Add `.env.example` with required variable names, never real secrets.
- Provide a usable `mailto:` fallback and visible contact details.
- Do not show “Message sent” unless a real delivery operation succeeds.
- Document exactly how to connect Resend or another chosen provider later.
- Protect against spam with basic server-side validation and sensible rate-limiting strategy if a backend is added.

## Phase 3 — Visual QA and refinement
Do not settle for the first implementation.
1. Run the app and inspect real rendered pages.
2. Review screenshots at approximately 390px, 768px, 1280px, and 1440px widths (or the closest available browser sizes).
3. Check the initial viewport, navigation, hero, image crops, section rhythm, footer, form, theme toggle, and mobile menu.
4. Fix overflow, awkward line breaks, layout shifts, weak contrast, inconsistent spacing, and poor image crops.
5. Test keyboard-only use and reduced-motion mode.
6. Run lint, typecheck, tests, and production build. Fix all errors.
7. Review performance: image sizes, font loading, client bundle, hydration boundaries, animation cost, and layout stability.
8. Review all copy against the brochure. Flag uncertain contact details, social URLs, client relationships, and any claims for client confirmation.

## Technical expectations
- TypeScript strict mode.
- Server Components by default; Client Components only when needed.
- Tailwind design tokens and semantic CSS variables for both themes.
- `next/image` for local image assets.
- `next/font` for typography where practical.
- GSAP for selected orchestrated motion; avoid multiple animation libraries doing the same job.
- Motion/Framer Motion only if justified for isolated UI transitions.
- Lucide icons; no emoji icons.
- Reusable accessible primitives, not a premature component framework.
- Meaningful component names, clear file organization, and concise comments for non-obvious logic.
- No dead controls, fake links, `any` shortcuts, placeholder text in production UI, or console errors.

## Required deliverables
- Fully working website in the repository.
- `CLAUDE.md` maintained with project-specific decisions.
- Updated `docs/` covering design, architecture, content verification, and QA.
- `.env.example` if environment variables are needed.
- README with setup, development, build, test, and deployment instructions.
- A final report with implemented routes/features, commands actually run and their outcomes, any missing credentials, and the exact items requiring client confirmation.

Work autonomously, make sensible decisions, and keep moving. Ask a question only if a genuinely blocking decision cannot be safely inferred. Do not fabricate facts to fill gaps.
