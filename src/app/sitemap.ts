import type { MetadataRoute } from "next";
import { site } from "@/config/site";

// The privacy notice is excluded while it is a draft (it is also marked noindex).
const routes = ["", "/work", "/services", "/about", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
