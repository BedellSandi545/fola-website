import type { Metadata } from "next";
import { site } from "@/config/site";

/**
 * Open Graph fields every page shares. Next.js merges metadata shallowly, so a
 * page that sets `openGraph` replaces the root object entirely: pages must spread
 * this base instead of relying on inheritance. A page-level `openGraph` object
 * also drops the root `src/app/opengraph-image.jpg`, so the image is listed here.
 */
export const shareImage = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: `${site.name}: marketing, branding and content in Liberia`,
  type: "image/jpeg",
};

export const openGraphBase = {
  type: "website",
  siteName: site.name,
  locale: site.locale,
  images: [shareImage],
} satisfies NonNullable<Metadata["openGraph"]>;

type PageSeo = {
  /** Page title without the site name; the root layout's template appends it. */
  title: string;
  description: string;
  /** Route path starting with "/", e.g. "/services". */
  path: `/${string}`;
  /** Keep the page out of search results (still followed for links). */
  noindex?: boolean;
};

/** Absolute URL on the canonical origin for a route path. */
export function absoluteUrl(path: string): string {
  const clean = path === "/" ? "" : `/${path.replace(/^\/+|\/+$/g, "")}`;
  return `${site.url}${clean}`;
}

/** Complete per-page metadata: canonical, Open Graph, Twitter card and robots. */
export function pageMetadata({ title, description, path, noindex = false }: PageSeo): Metadata {
  const socialTitle = `${title} | ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { ...openGraphBase, title: socialTitle, description, url: path },
    twitter: { card: "summary_large_image", title: socialTitle, description, images: [shareImage] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/**
 * Only the production deployment is crawlable. Vercel preview/development builds
 * (VERCEL_ENV) and any build with ALLOW_INDEXING=false disallow everything, so
 * staging copies never compete with folacreativeagency.com in search results.
 */
export function isIndexable(env: NodeJS.ProcessEnv = process.env): boolean {
  if (env.ALLOW_INDEXING === "false") return false;
  if (env.VERCEL_ENV && env.VERCEL_ENV !== "production") return false;
  return true;
}
