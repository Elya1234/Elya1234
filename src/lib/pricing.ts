import type { CartOptions, Product } from "@/lib/types";

/**
 * Prix = prix de base + suppléments métal + origine de la pierre + carat + clarté + couleur.
 * Chaque supplément vient de la fiche produit (lib/data/products.ts), jamais d'une valeur en dur ici.
 */
export function calculatePrice(product: Product, options: CartOptions): number {
  let total = product.basePrice;

  if (options.metal) total += product.pricing.metal[options.metal] ?? 0;
  if (options.stoneOrigin) total += product.pricing.stoneOrigin[options.stoneOrigin] ?? 0;
  if (options.carat) total += product.pricing.carat[options.carat] ?? 0;
  if (options.clarity) total += product.pricing.clarity[options.clarity] ?? 0;
  if (options.colorGrade) total += product.pricing.colorGrade[options.colorGrade] ?? 0;

  return Math.round(total);
}

export function defaultOptions(product: Product): CartOptions {
  return {
    metal: product.metals[0],
    stoneOrigin: "synthese",
    shape: product.shapes[0],
    carat: product.availableCarats[0],
    clarity: product.availableClarities[0],
    colorGrade: product.availableColorGrades[0],
    certificate: product.availableCertificates[0],
  };
}

export function estimateInstallments(total: number): { count: number; first: number; rest: number } {
  const count = 3;
  const first = Math.round((total / count) * 100) / 100;
  const rest = Math.round(((total - first) / (count - 1)) * 100) / 100;
  return { count, first, rest };
}
