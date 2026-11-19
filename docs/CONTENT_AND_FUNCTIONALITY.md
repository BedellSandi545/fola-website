# Content and functionality reference

## Confirmed brochure messaging
- Fola Creative Agency (FCA).
- “More than just marketing” — the agency says it helps brands grow, connect, and win.
- Strategy-led creativity; ideas start with client goals.
- A team involved from planning to execution.
- Creative work with purpose; content and campaigns built to connect.
- Partnership focused on visibility, engagement, and results.
- The brochure says the agency has partnered with businesses and teams to build visibility, create meaningful content, and bring ideas to life.
- Client consultation: listening first, understanding needs, shaping the right marketing approach.
- On-site discussion: turning business goals into practical creative direction.
- Event planning and coordination are represented in the brochure.
- “Your vision. Our creativity. Shared growth.”

## Client/brand names shown
- Sinkor Palace Hotel
- Afridodge Hotel
- TM Mall
- Foodies Restaurant
- Nice Cream Ice Cream
- Mia Solar
- King Salon Barber Shop & Spa
- EZone Electronics

The brochure does not provide case-study metrics, campaign dates, individual project scopes, testimonials, or quantified outcomes. Do not invent them.

## Contact information printed in brochure — verify before publishing
- Phone: `0880007811`
- Phone: `0776167578`
- Email: `Folacreative@gmail.com`
- Facebook label: `Folasade Odiaji`
- Instagram label: `Fola Creative Agency`

These are transcribed from the supplied brochure and may contain formatting or OCR ambiguity. Confirm international dialing prefixes, spelling, active accounts, and destination URLs with the client. Do not invent social profile URLs.

## Potential site functionality
- Theme switcher: light, dark, system.
- Mobile navigation with Escape handling, focus behavior, and appropriate ARIA.
- Contact form with name, email, company (optional), service interest (optional), message, consent where legally appropriate, validation, submission feedback, spam protection, and real delivery integration.
- Direct email and phone links.
- WhatsApp CTA only after confirming the number and country code.
- Work/client showcase using approved images and names.
- Services and process navigation.
- Accessible FAQ only for questions FCA can answer accurately.
- Footer with contact and verified social links.
- Back-to-top control only if it adds value and is keyboard accessible.

## Needs client confirmation
- Official logo in vector/high-resolution form and brand usage rules.
- Exact company name styling: “Fola Creative Agency” vs “FOLA CREATIVE AGENCY”.
- Business address and service area.
- Verified phone numbers with country code.
- Correct email address and whether it is monitored.
- Facebook and Instagram profile URLs.
- Whether client names/logos may be displayed publicly.
- Which supplied images correspond to which clients/projects and whether releases/permissions exist.
- Current services and deliverables; brochure wording may be incomplete.
- Team names, roles, biographies, and approved portraits if an About/team section is desired.
- Contact form recipient and preferred email delivery provider.
- Privacy policy, cookie policy, and legal business details if collecting personal information or using analytics.
- Whether the QR code points to the current official social page.

## Content rules
Never fabricate. Use concise, confident copy. Do not promise guaranteed growth, revenue, rankings, reach, or results. Use “designed to”, “focused on”, or “built to support” where outcomes are not evidenced.


---

## Additional source: FCA Business Plan 2026–2030 (supplied by the client)
The following facts on the site come from the business plan, not the brochure:
- Established in September 2025. Liberian-owned marketing and consultancy company.
- Owned and managed by **Precious Folasade Odiaji** (named on `/about`).
- Ten brands served in the first year, across hospitality, retail, NGOs, beauty, energy and technology.
- Service catalogue (six areas on `/services`), approach (Understand > Strategize > Create > Execute > Measure > Improve), vision, mission, six core values, three-phase roadmap.
- Hero line "Seen. Heard. In demand." (from the plan's "We work until you are seen, heard, and in demand").

Deliberately **not** used: market-size figures, "over 73% of businesses…", competitor names, "Our end results are always a YES-YES". These are unsourced or unsuitable for a public page.

## Where each piece of copy lives
All copy is in `src/content/*` and `src/config/site.ts`. Each file notes its source. Short summaries written for the web (service summaries, approach step descriptions) are FCA wording paraphrasing the plan, and should be reviewed by the client.

## Launch checklist: needs client confirmation
Everything below is on the site now, transcribed or inferred, and must be confirmed before launch.

### Contact details
- [ ] Phone numbers `0880 007 811` and `0776 167 578`. The `tel:` links use an inferred **+231** country code.
- [ ] Email `folacreative@gmail.com`: correct and monitored? (the brochure prints `Folacreative@gmail.com`).
- [ ] Facebook ("Folasade Odiaji") and Instagram ("Fola Creative Agency") **profile URLs**. They are shown as plain text until URLs are supplied (set `url` in `src/config/site.ts`).
- [ ] WhatsApp: not added. Confirm the number and whether a WhatsApp button is wanted.
- [ ] Business address (only "Liberia" is shown).
- [ ] Production domain (`NEXT_PUBLIC_SITE_URL`).

### Claims and names
- [ ] Permission to display all eight client names, and their spelling (e.g. "Afridodge", "EZone", "Nice Cream Ice Cream").
- [x] Brand count: removed at the client's request (2026-11-19); the site now says FCA works with brands across the six sectors.
- [ ] The six sectors.
- [ ] Publishing the owner's name on `/about`.
- [ ] Service list and the web summaries of each service area.
- [ ] Vision and mission wording (lightly edited for grammar from the plan).

### Photography
- [ ] Permission or releases for everyone pictured, especially the TM Mall shoot and the client consultation.
- [ ] The portraits on `/work` are captioned "Studio portraits from an FCA photo session". Confirm they are FCA's own work and may be shown, and say whether the people should be named.
- [ ] Whether the people in the team photo are current team members.
- [ ] The TM Mall photo has a blue gradient baked into its lower edge. The site crops it out; a clean original would be better.
- [ ] A vector (SVG) logo. The site uses PNGs extracted from `fola-logo.jpeg`.

### Legal
- [ ] `/privacy` is a **draft** written from how the site actually works (contact form, theme preference in local storage, no analytics). It is marked `noindex` and left out of the sitemap. Remove both once it has been reviewed.
- [ ] If analytics are added later, update the privacy notice and consider consent.

### Contact form
- [ ] Choose the recipient inbox and set up Resend (see README). Until then the form honestly falls back to email.
