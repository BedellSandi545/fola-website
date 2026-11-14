# Brand and design direction

## Source-backed brand cues
The supplied FCA brochure uses:
- Deep navy as the primary brand field.
- Warm gold/yellow as a high-contrast accent.
- White/light neutral backgrounds and white typography.
- Bold, confident sans-serif headlines.
- Documentary photography of people collaborating, consulting, and producing events.
- Direct, collaborative language around strategy, creative work, growth, and partnership.

The brochure includes these named clients/brands: Sinkor Palace Hotel, Afridodge Hotel, TM Mall, Foodies Restaurant, Nice Cream Ice Cream, Mia Solar, King Salon Barber Shop & Spa, and EZone Electronics. Confirm spelling, capitalization, and permission to display each before launch.

## Proposed digital direction
**Creative territory:** cinematic editorial agency — confident, human, precise, and warm.

**Palette starting point (validate visually against assets):**
- Midnight navy: `#071F3B`
- Deep navy: `#0B2B4D`
- FCA gold: `#F2B82F`
- Warm white: `#F7F7F4`
- Cool mist: `#E8EEF3`
- Ink: `#101820`

Do not use raw hex values throughout components. Define semantic CSS variables for backgrounds, foregrounds, muted text, borders, surfaces, and accent. Ensure both themes meet WCAG contrast expectations.

**Theme behavior:**
- Light theme: warm-white canvas, dark navy type, restrained gold accents.
- Dark theme: deep navy canvas, warm-white type, gold accents.
- System theme follows OS until the user explicitly chooses a theme.
- Persist user selection and avoid a flash of the wrong theme on first paint.

**Typography:**
- Choose a distinctive, highly legible display face and a neutral text face after comparing suitable font pairings.
- Use no more than two primary families unless a third has a clear editorial purpose.
- Use variable fonts where possible; ensure sensible fallbacks and avoid layout shift.
- Strong hierarchy, readable line lengths, careful line breaks, and fluid type scaling.

**Layout principles:**
- Use a strong grid with occasional asymmetry.
- Let photography and typography carry the visual identity.
- Give sections distinct pacing; do not make every section the same height or structure.
- Use negative space intentionally.
- Use a limited number of signature details (gold rules, fine borders, image frames, typographic treatments).
- Do not turn every content item into a rounded card.

## Motion principles
- Motion is purposeful and restrained.
- Hero: orchestrated entrance with text and imagery arriving in a clear sequence.
- Scroll: selected reveals and image treatments, not every paragraph.
- Interaction: immediate hover, focus, pressed, menu, and theme feedback.
- Prefer transform and opacity.
- Respect reduced motion and ensure content remains available without animation.
- Do not hijack scroll or delay access to content.

## Creative review questions
Before implementation and at each visual QA pass:
1. Could this design belong to any random agency? If yes, what specific FCA decision makes it distinctive?
2. Is the hero memorable without sacrificing clarity?
3. Does the gold guide attention, or is it overused?
4. Does every animation have a purpose?
5. Do the images feel authentic and accurately represent the described work?
6. Does the mobile experience feel intentionally designed rather than compressed?
