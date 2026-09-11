import type { JewelryType, Metal, Product, Shape } from "@/lib/types";

export type SortKey = "recommandes" | "nouveautes" | "prix-asc" | "prix-desc";

export interface ParsedFilters {
  formes: Shape[];
  metaux: Metal[];
  types: JewelryType[];
  prixMin?: number;
  prixMax?: number;
  tri: SortKey;
}

export function parseFilters(searchParams: Record<string, string | string[] | undefined>): ParsedFilters {
  const forme = firstOf(searchParams.forme);
  const metal = firstOf(searchParams.metal);
  const type = firstOf(searchParams.type);
  const prix = firstOf(searchParams.prix);
  const tri = firstOf(searchParams.tri);

  const [prixMinStr, prixMaxStr] = prix ? prix.split("-") : [];

  return {
    formes: forme ? (forme.split(",") as Shape[]) : [],
    metaux: metal ? (metal.split(",") as Metal[]) : [],
    types: type ? (type.split(",") as JewelryType[]) : [],
    prixMin: prixMinStr ? Number(prixMinStr) : undefined,
    prixMax: prixMaxStr ? Number(prixMaxStr) : undefined,
    tri: (["recommandes", "nouveautes", "prix-asc", "prix-desc"].includes(tri ?? "") ? tri : "recommandes") as SortKey,
  };
}

function firstOf(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function applyFilters(products: Product[], filters: ParsedFilters): Product[] {
  let result = products;

  if (filters.formes.length) {
    result = result.filter((p) => p.shapes.some((s) => filters.formes.includes(s)));
  }
  if (filters.metaux.length) {
    result = result.filter((p) => p.metals.some((m) => filters.metaux.includes(m)));
  }
  if (filters.types.length) {
    result = result.filter((p) => filters.types.includes(p.jewelryType));
  }
  if (filters.prixMin !== undefined) {
    result = result.filter((p) => p.basePrice >= filters.prixMin!);
  }
  if (filters.prixMax !== undefined) {
    result = result.filter((p) => p.basePrice <= filters.prixMax!);
  }

  result = [...result];
  switch (filters.tri) {
    case "nouveautes":
      result.sort((a, b) => Number(b.isNew ?? false) - Number(a.isNew ?? false));
      break;
    case "prix-asc":
      result.sort((a, b) => a.basePrice - b.basePrice);
      break;
    case "prix-desc":
      result.sort((a, b) => b.basePrice - a.basePrice);
      break;
    default:
      break;
  }

  return result;
}

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: "recommandes", label: "Recommandés" },
  { value: "nouveautes", label: "Nouveautés" },
  { value: "prix-asc", label: "Prix croissant" },
  { value: "prix-desc", label: "Prix décroissant" },
];

export const priceRanges: { value: string; label: string }[] = [
  { value: "0-500", label: "Moins de 500 €" },
  { value: "500-1000", label: "500 € – 1 000 €" },
  { value: "1000-2000", label: "1 000 € – 2 000 €" },
  { value: "2000-999999", label: "Plus de 2 000 €" },
];
