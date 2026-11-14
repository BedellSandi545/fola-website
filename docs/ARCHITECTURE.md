# Architecture plan

This document is an initial direction, not a mandate to over-engineer. Adapt it to the current stable Next.js conventions and the actual repository.

## Application
- Next.js App Router.
- TypeScript strict mode.
- Tailwind CSS with semantic CSS variables.
- Server Components by default.
- Client components only for theme, navigation state, forms, and animation.
- Local assets retained in their current folder; use a clear asset mapping module if helpful.

## Suggested structure
```text
src/
  app/
    (site)/
      page.tsx
      about/page.tsx
      services/page.tsx
      work/page.tsx
      contact/page.tsx
    api/                         # only if a real server endpoint is required
    globals.css
    layout.tsx
    not-found.tsx
  components/
    layout/
    navigation/
    sections/
    forms/
    theme/
    ui/
  config/
    site.ts
    navigation.ts
  lib/
    motion/
    validation/
    utils/
  content/
    services.ts
    clients.ts
public/
  ...                            # copy/reference supplied assets carefully; do not delete originals
docs/
```

Claude should adapt the structure to current Next.js best practices rather than follow it mechanically.

## Component boundaries
- Keep the root layout mostly server-rendered.
- Theme provider and interactive navigation are client-side.
- Keep page sections composable and data-driven where repetition is real.
- Avoid one enormous page component.
- Avoid turning every text block into a CMS abstraction.

## Animation architecture
- Centralize reusable motion settings and GSAP helpers.
- Use `gsap.context()` or an equivalent scoped cleanup pattern in React.
- Register plugins once in a safe client-only module.
- Ensure cleanup/revert on unmount.
- Use a single owner for each animated element; do not let CSS, GSAP, and Motion fight over the same transform.
- Reduced-motion preference should disable or simplify timelines.

## Contact architecture
- Validate client-side for usability and server-side for trust.
- Keep provider credentials server-only.
- Do not return a success state until the provider confirms delivery.
- If no provider is configured, present a clear email fallback rather than a fake submission.

## Dependencies
Choose only what is necessary. Potential choices:
- `gsap` for selected advanced animation.
- `motion` if isolated component transitions justify it.
- `lucide-react` for icons.
- A lightweight theme solution or a small custom implementation if robust.
- A schema validator such as Zod if forms/API validation need it.

Check package compatibility before installing. Do not add both overlapping libraries without a documented reason.
