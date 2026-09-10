import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/compte", "/panier", "/commander"] }],
    sitemap: "https://www.elya-joaillerie.fr/sitemap.xml",
  };
}
