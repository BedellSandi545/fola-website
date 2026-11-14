# Quality gates — required before calling the site complete

## Repository safety
- [ ] Existing assets remain intact.
- [ ] No source images were renamed, overwritten, or deleted.
- [ ] Git diff reviewed; no accidental lockfile churn or unrelated changes.

## Build and code health
- [ ] Install completes without unresolved dependency conflicts.
- [ ] Lint passes.
- [ ] TypeScript typecheck passes.
- [ ] Tests pass (where configured).
- [ ] Production build passes.
- [ ] No hydration warnings or runtime console errors.
- [ ] No unhandled promise rejections.

## Design and responsive QA
- [ ] Review widths around 390, 768, 1280, and 1440 px.
- [ ] No horizontal overflow.
- [ ] Navigation and footer work at all sizes.
- [ ] Text has readable line length and hierarchy.
- [ ] Supplied photography is correctly cropped and optimized.
- [ ] Light and dark themes are both deliberately designed.
- [ ] Theme preference persists and system preference works.
- [ ] No flash of incorrect theme on load.
- [ ] No generic repetitive card layout.
- [ ] Every button/link has a real, clear action.

## Accessibility
- [ ] Keyboard-only navigation works.
- [ ] Focus indicators are visible.
- [ ] Heading structure is logical.
- [ ] Images have useful alt text or are correctly decorative.
- [ ] Form labels and errors are announced and associated.
- [ ] Contrast is checked in both themes.
- [ ] Reduced-motion preference is respected.
- [ ] Mobile menu has appropriate semantics and Escape behavior.
- [ ] Touch targets are comfortable.

## Motion
- [ ] No scroll hijacking.
- [ ] No essential information depends on animation.
- [ ] GSAP contexts/listeners are cleaned up.
- [ ] No competing animation ownership on the same element.
- [ ] Reduced-motion mode is usable.
- [ ] Motion does not cause layout shifts or block interaction.

## Functionality and content
- [ ] Contact form validates correctly.
- [ ] Success appears only after confirmed delivery.
- [ ] Missing email credentials produce an honest fallback.
- [ ] Phone/email/social destinations are verified.
- [ ] No dead links, fake testimonials, invented statistics, or unsupported claims.
- [ ] Client names and imagery are approved or clearly flagged for review.
- [ ] Metadata, sitemap, and robots are correct.

## Final report
State exactly what was built, what checks were run, their actual results, how to run/deploy, required environment variables, and outstanding client confirmations.


---

## Results: 2026-11-14 build
All commands were run on Windows 11, Node 24.21, pnpm 12.10.1 and Next.js 16.4.6, against the production build (`pnpm build && pnpm start`) unless noted.

| Gate | Command | Result |
|---|---|---|
| Lint | `pnpm lint` | Pass, 0 problems |
| Types | `pnpm typecheck` | Pass |
| Unit tests | `pnpm test` | 25/25 pass (4 files) |
| Production build | `pnpm build` | Pass. Pages prerendered static; `/api/contact` dynamic |
| Visual matrix | `pnpm screenshots` | 7 routes × 4 widths × 2 themes = 56 captures. No horizontal overflow, no console errors, no failed requests |
| Interactions | `node scripts/interaction-check.mjs` | 26/26 pass |

The interaction checks cover these behaviours:
- Theme: system default; explicit choice applied, stored and reflected in `aria-pressed`; theme persists **with JS bundles blocked** (no flash); system mode follows a live OS change.
- Skip link is the first tab stop.
- Mobile menu: dialog semantics, focus moves in, scroll lock, focus trap wraps, Escape closes and restores focus, navigating closes the menu.
- Form: error summary focused on empty submit; three invalid fields flagged; errors clear as input becomes valid; honest "not available" fallback with a pre-filled mailto when no provider is configured; never shows a false success.
- Reduced motion: hero fully visible at load.
- JavaScript disabled: hero headline visible.

### Not automated, and how it was covered
- Screen-reader output was not tested with a real screen reader. Semantics (landmarks, headings, labels, `aria-describedby`, live regions) were reviewed in code.
- Contrast was computed from token values with the WCAG 2.x formula (script run during QA). Every text pair passes AA (4.5:1): ink on paper 16.0; muted on paper 6.8; muted on white 7.4; dark muted on midnight 8.5; dark muted on dark surface 7.7; navy on gold button 9.3; gold-ink on paper 5.5; gold on midnight 9.7; muted on brand band 9.0 (light) and 8.2 (dark); error red on paper 6.0, and in dark mode 8.6. This does not replace a full tool audit (for example axe) of the rendered pages.
- Lighthouse was not run in this environment.

### Known limitations
- Rate limiting is per server instance (in memory).
- The footer year is cached with `"use cache"`, which gives the static pages a 15-minute revalidate time in the build output.
