# SEO setup

Canonical address: **https://www.folacreativeagency.com**. Vercel's domain settings redirect `folacreativeagency.com` to `www` (308).

The host-level redirect is the only one. The app must not redirect between the two hosts: on 2026-11-24 an app redirect from `www` to the apex fought Vercel's apex-to-`www` redirect and caused an infinite loop ("The page isn't redirecting properly"). To make the apex primary instead, change it in Vercel (Settings > Domains) and update `PRODUCTION_URL` in `src/config/site.ts` in the same deploy.

## What the site does

| Area | Where | Notes |
| --- | --- | --- |
| Canonical origin | `src/config/site.ts` (`PRODUCTION_URL`, `resolveSiteUrl`) | Defaults to the production domain. `NEXT_PUBLIC_SITE_URL` overrides it only for a staging host. |
| Apex to `www` redirect | Vercel Settings > Domains | Host-level only, see above. |
| Per-page metadata | `src/lib/seo.ts` `pageMetadata()` | Title, description, canonical, Open Graph (title, url, image), Twitter card, optional `noindex`. Every page must use it because Next.js merges `openGraph` shallowly. |
| Share image | `src/app/opengraph-image.jpg` (1200x630) + `opengraph-image.alt.txt` | Also listed in `openGraphBase` so inner pages keep it. |
| Robots | `src/app/robots.ts`, `isIndexable()` in `src/lib/seo.ts` | Production: allow all except `/api/`, links the sitemap. Vercel previews or `ALLOW_INDEXING=false`: disallow all. |
| Sitemap | `src/app/sitemap.ts` | `/`, `/services`, `/work`, `/about`, `/contact`. `/privacy` is excluded and `noindex` while it is a draft. Add new public routes here. |
| Structured data | `src/lib/structured-data.ts`, `src/components/seo/json-ld.tsx` | Home: `Organization` + `WebSite`. Inner pages: `BreadcrumbList`. Services: `ItemList` of `Service`. |
| Manifest and icons | `src/app/manifest.ts`, `icon.png`, `apple-icon.png` | |
| Verification | `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION` env vars | Rendered as meta tags only when set. |

Structured data contains only verified facts. It has no street address, opening hours, prices or ratings. `sameAs` lists the TikTok, Instagram and Facebook profiles, all confirmed by the client (Instagram and Facebook on 2026-11-23).

## Launch checklist (manual, needs account access)

1. Deploy with no `NEXT_PUBLIC_SITE_URL` (or set it to `https://www.folacreativeagency.com`). Keep both domains in Vercel with `www` as primary.
2. Check `https://www.folacreativeagency.com/robots.txt` and `/sitemap.xml` load on the live domain.
3. Google Search Console: add a **Domain property** for `folacreativeagency.com` and verify it with the DNS TXT record (preferred). Or use a URL-prefix property and set `GOOGLE_SITE_VERIFICATION`, then redeploy.
4. In Search Console, submit `https://www.folacreativeagency.com/sitemap.xml` and request indexing for the homepage.
5. Bing Webmaster Tools: import the site from Search Console, or verify with `BING_SITE_VERIFICATION`. Submit the same sitemap.
6. Test the homepage and `/services` in Google's Rich Results Test and the Schema.org validator.
7. Test the share preview with the Facebook Sharing Debugger and LinkedIn Post Inspector.
8. Create or claim a Google Business Profile once the client confirms a public business address or service area. This is the main lever for local searches in Liberia, and it lives outside the website.
9. Once the privacy notice is approved, remove `noindex: true` from `src/app/privacy/page.tsx` and add `/privacy` to the sitemap.
