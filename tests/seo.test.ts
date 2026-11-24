import { describe, expect, it } from "vitest";
import { PRODUCTION_URL, resolveSiteUrl, site } from "@/config/site";
import { absoluteUrl, isIndexable, pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd, organizationJsonLd, serializeJsonLd, servicesJsonLd } from "@/lib/structured-data";
import { services } from "@/content/services";

describe("resolveSiteUrl", () => {
  it("defaults to the production domain", () => {
    expect(resolveSiteUrl(undefined)).toBe("https://www.folacreativeagency.com");
    expect(resolveSiteUrl("  ")).toBe(PRODUCTION_URL);
  });
  it("normalises to a bare origin", () => {
    expect(resolveSiteUrl("https://staging.example.com/")).toBe("https://staging.example.com");
    expect(resolveSiteUrl("https://staging.example.com/some/path")).toBe("https://staging.example.com");
  });
  it("falls back on invalid input", () => {
    expect(resolveSiteUrl("not a url")).toBe(PRODUCTION_URL);
  });
});

describe("absoluteUrl", () => {
  it("builds canonical URLs without trailing slashes", () => {
    expect(absoluteUrl("/")).toBe(site.url);
    expect(absoluteUrl("/services")).toBe(`${site.url}/services`);
    expect(absoluteUrl("/services/")).toBe(`${site.url}/services`);
  });
});

describe("pageMetadata", () => {
  it("sets canonical, Open Graph and Twitter fields together", () => {
    const meta = pageMetadata({ title: "Work", description: "d", path: "/work" });
    expect(meta.alternates?.canonical).toBe("/work");
    expect(meta.openGraph).toMatchObject({ url: "/work", title: `Work | ${site.name}`, siteName: site.name });
    expect(meta.twitter).toMatchObject({ card: "summary_large_image", title: `Work | ${site.name}` });
    expect(meta.robots).toBeUndefined();
  });
  it("marks noindex pages", () => {
    const meta = pageMetadata({ title: "x", description: "d", path: "/x", noindex: true });
    expect(meta.robots).toEqual({ index: false, follow: true });
  });
});

describe("isIndexable", () => {
  it("allows production and plain hosting", () => {
    expect(isIndexable({ NODE_ENV: "production" })).toBe(true);
    expect(isIndexable({ NODE_ENV: "production", VERCEL_ENV: "production" })).toBe(true);
  });
  it("blocks previews and explicit opt-out", () => {
    expect(isIndexable({ NODE_ENV: "production", VERCEL_ENV: "preview" })).toBe(false);
    expect(isIndexable({ NODE_ENV: "production", ALLOW_INDEXING: "false" })).toBe(false);
  });
});

describe("structured data", () => {
  it("organization uses absolute URLs and only verified profiles", () => {
    const org = organizationJsonLd();
    expect(org.url).toBe(site.url);
    expect(org.sameAs).toEqual([
      "https://www.tiktok.com/@folacreativeagency",
      "https://www.instagram.com/folacreativeagency/",
      "https://www.facebook.com/folacreativeagency/",
    ]);
    expect(org).not.toHaveProperty("address");
  });
  it("breadcrumbs start at home with absolute items", () => {
    const list = breadcrumbJsonLd([{ name: "Services", path: "/services" }]);
    expect(list.itemListElement).toEqual([
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/services` },
    ]);
  });
  it("lists every service area", () => {
    expect((servicesJsonLd().itemListElement as unknown[]).length).toBe(services.length);
  });
  it("escapes < so the script tag cannot be closed", () => {
    expect(serializeJsonLd({ "@type": "Thing", name: "</script>" })).not.toContain("</script>");
  });
});
