import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

/**
 * Indexable routes. The privacy notice is excluded while it is a draft (it is
 * also marked noindex). Add new public routes here.
 */
const sitemapRoutes = [
  { path: "/", priority: 1 },
  { path: "/services", priority: 0.9 },
  { path: "/work", priority: 0.8 },
  { path: "/about", priority: 0.8 },
  { path: "/contact", priority: 0.7 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapRoutes.map(({ path, priority }) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly",
    priority,
  }));
}
