import type { MetadataRoute } from "next";
import { products } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";
import { shops } from "@/lib/data/shops";
import { guides } from "@/lib/data/guides";

const BASE_URL = "https://www.elya-joaillerie.fr";

const staticRoutes = [
  "",
  "/bijoux",
  "/boutiques",
  "/contact",
  "/compte",
  "/rendez-vous",
  "/guides",
  "/notre-histoire",
  "/panier",
  "/liste-envies",
  "/mentions-legales",
  "/cgv",
  "/confidentialite",
  "/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: now,
  }));

  categories.forEach((c) => entries.push({ url: `${BASE_URL}/bijoux/${c.slug}`, lastModified: now }));
  products.forEach((p) => entries.push({ url: `${BASE_URL}/produit/${p.slug}`, lastModified: now }));
  shops.forEach((s) => entries.push({ url: `${BASE_URL}/boutiques/${s.slug}`, lastModified: now }));
  guides.forEach((g) => entries.push({ url: `${BASE_URL}/guides/${g.slug}`, lastModified: now }));

  return entries;
}
