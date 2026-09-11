import type { Certificate, Clarity, ColorGrade, JewelryType, Metal, Product, ProductOptionPricing, RingStyle, Shape } from "@/lib/types";

const CARAT_STEPS = ["0.20", "0.30", "0.40", "0.50", "0.60", "0.70", "0.80", "0.90", "1.00", "1.20", "1.50", "1.70", "2.00", "2.50", "3.00"];
const CLARITIES: Clarity[] = ["VVS1", "VVS2", "VS1", "VS2", "SI1"];
const COLORS: ColorGrade[] = ["D", "E", "F", "G", "H"];
const CERTIFICATES: Certificate[] = ["IGI", "GIA"];

/** Grille de suppléments partagée, dérivée du prix de base — aucune valeur figée hors de ce fichier de données. */
function buildPricing(basePrice: number, metals: Metal[]): ProductOptionPricing {
  const metalSurcharge: Record<Metal, number> = {
    "or-jaune": 0,
    "or-blanc": Math.round(basePrice * 0.02),
    "or-rose": Math.round(basePrice * 0.02),
    platine: Math.round(basePrice * 0.12),
  };
  const metal = Object.fromEntries(metals.map((m) => [m, metalSurcharge[m]])) as Record<Metal, number>;

  const carat: Record<string, number> = {};
  CARAT_STEPS.forEach((step, i) => {
    carat[step] = Math.round(basePrice * 0.35 * i * i * 0.08);
  });

  const clarity: Record<Clarity, number> = {
    VVS1: Math.round(basePrice * 0.18),
    VVS2: Math.round(basePrice * 0.12),
    VS1: Math.round(basePrice * 0.06),
    VS2: Math.round(basePrice * 0.02),
    SI1: 0,
  };

  const colorGrade: Record<ColorGrade, number> = {
    D: Math.round(basePrice * 0.15),
    E: Math.round(basePrice * 0.1),
    F: Math.round(basePrice * 0.05),
    G: Math.round(basePrice * 0.02),
    H: 0,
  };

  return {
    metal,
    stoneOrigin: { synthese: 0, naturel: Math.round(basePrice * 1.4) },
    carat,
    clarity,
    colorGrade,
  };
}

function product(input: {
  slug: string;
  code: string;
  name: string;
  subtitle: string;
  categorySlug: string;
  categoryLabel: string;
  jewelryType: JewelryType;
  shapes: Shape[];
  style?: RingStyle;
  metals: Metal[];
  isNew?: boolean;
  basePrice: number;
  description: string;
  sizeGuide?: boolean;
}): Product {
  return {
    slug: input.slug,
    code: input.code,
    name: input.name,
    subtitle: input.subtitle,
    category: { slug: input.categorySlug, label: input.categoryLabel },
    jewelryType: input.jewelryType,
    shapes: input.shapes,
    style: input.style,
    metals: input.metals,
    isNew: input.isNew,
    basePrice: input.basePrice,
    images: [
      `/placeholders/product-${input.slug}-1.svg`,
      `/placeholders/product-${input.slug}-2.svg`,
      `/placeholders/product-${input.slug}-3.svg`,
    ],
    hoverImage: `/placeholders/product-${input.slug}-2.svg`,
    description: input.description,
    detailsRing: "Anneau en or massif recyclé, sertissage clos, poids total variable selon le carat choisi.",
    shipping: "Livraison estimée : 2 à 4 semaines ouvrées (fabrication à la commande).",
    care: "Nettoyez à l'eau tiède savonneuse avec une brosse douce. Faites contrôler le sertissage une fois par an en boutique.",
    certificateInfo: "Chaque diamant de 0,30 carat et plus est accompagné d'un certificat IGI ou GIA.",
    pricing: buildPricing(input.basePrice, input.metals),
    availableCarats: CARAT_STEPS,
    availableClarities: CLARITIES,
    availableColorGrades: COLORS,
    availableCertificates: CERTIFICATES,
    sizeGuide: input.sizeGuide ?? true,
  };
}

export const products: Product[] = [
  product({
    slug: "bague-emma",
    code: "BAGF00412",
    name: "Bague Emma",
    subtitle: "Solitaire, monture six griffes",
    categorySlug: "bagues-de-fiancailles",
    categoryLabel: "Bagues de fiançailles",
    jewelryType: "bague",
    shapes: ["rond", "ovale", "coussin"],
    style: "solitaire",
    metals: ["or-jaune", "or-blanc", "or-rose", "platine"],
    isNew: true,
    basePrice: 1290,
    description:
      "La bague Emma incarne l'élégance du solitaire classique. Sa monture six griffes met en valeur la brillance du diamant tout en assurant une tenue optimale de la pierre au quotidien.",
  }),
  product({
    slug: "bague-lou",
    code: "BAGF00398",
    name: "Bague Lou",
    subtitle: "Halo pavé, anneau fin",
    categorySlug: "bagues-de-fiancailles",
    categoryLabel: "Bagues de fiançailles",
    jewelryType: "bague",
    shapes: ["ovale", "poire", "coussin", "emeraude"],
    style: "halo",
    metals: ["or-jaune", "or-blanc", "or-rose"],
    basePrice: 1590,
    description:
      "Un halo de diamants pavés souligne la pierre centrale de la bague Lou, apportant éclat et présence à un anneau volontairement fin et discret.",
  }),
  product({
    slug: "bague-victoire",
    code: "BAGF00455",
    name: "Bague Victoire",
    subtitle: "Trilogie, taille émeraude",
    categorySlug: "bagues-de-fiancailles",
    categoryLabel: "Bagues de fiançailles",
    jewelryType: "bague",
    shapes: ["emeraude", "radiant", "asscher"],
    style: "trilogie",
    metals: ["or-blanc", "platine"],
    isNew: true,
    basePrice: 2190,
    description:
      "Trois pierres, un symbole : passé, présent, avenir. La bague Victoire associe une taille émeraude centrale à deux diamants latéraux baguettes.",
  }),
  product({
    slug: "alliance-suzanne",
    code: "ALL00120",
    name: "Alliance Suzanne",
    subtitle: "Anneau uni 2,5 mm",
    categorySlug: "alliances",
    categoryLabel: "Alliances",
    jewelryType: "bague",
    shapes: ["rond"],
    metals: ["or-jaune", "or-blanc", "or-rose", "platine"],
    basePrice: 490,
    description: "Une alliance unie intemporelle, au profil confortable, disponible dans les quatre métaux de la maison.",
  }),
  product({
    slug: "alliance-marceau",
    code: "ALL00131",
    name: "Alliance Marceau",
    subtitle: "Pavage mi-tour",
    categorySlug: "alliances",
    categoryLabel: "Alliances",
    jewelryType: "bague",
    shapes: ["rond"],
    metals: ["or-jaune", "or-blanc", "platine"],
    basePrice: 890,
    description: "Un pavage de diamants sur la moitié de l'anneau, pour une alliance qui capte la lumière sans jamais gêner au quotidien.",
  }),
  product({
    slug: "alliance-camille",
    code: "ALL00148",
    name: "Alliance Camille",
    subtitle: "Anneau bombé 3 mm",
    categorySlug: "alliances",
    categoryLabel: "Alliances",
    jewelryType: "bague",
    shapes: ["rond"],
    metals: ["or-jaune", "or-rose"],
    isNew: true,
    basePrice: 620,
    description: "Un anneau légèrement bombé qui joue avec la lumière, pour une alliance à la fois discrète et sculpturale.",
  }),
  product({
    slug: "alliance-hugo",
    code: "ALL00152",
    name: "Alliance Hugo",
    subtitle: "Facettes taillées, profil carré",
    categorySlug: "alliances",
    categoryLabel: "Alliances",
    jewelryType: "bague",
    shapes: ["rond"],
    metals: ["or-blanc", "platine"],
    basePrice: 990,
    description: "Un profil carré aux arêtes facettées, pour une alliance masculine aux lignes affirmées.",
  }),
  product({
    slug: "collier-cleo",
    code: "COL00287",
    name: "Collier Cléo",
    subtitle: "Pendentif rond, chaîne fine",
    categorySlug: "joaillerie",
    categoryLabel: "Joaillerie",
    jewelryType: "collier",
    shapes: ["rond"],
    metals: ["or-jaune", "or-rose"],
    basePrice: 690,
    description: "Un pendentif diamant serti clos sur une chaîne forçat fine, ajustable à deux longueurs.",
    sizeGuide: false,
  }),
  product({
    slug: "boucles-iris",
    code: "BOU00512",
    name: "Boucles d'oreilles Iris",
    subtitle: "Puces, taille ovale",
    categorySlug: "joaillerie",
    categoryLabel: "Joaillerie",
    jewelryType: "boucles",
    shapes: ["ovale", "rond"],
    metals: ["or-jaune", "or-blanc", "or-rose"],
    isNew: true,
    basePrice: 590,
    description: "Des puces d'oreilles épurées, serties d'un diamant taille ovale, pour twister une tenue de jour comme de soir.",
    sizeGuide: false,
  }),
  product({
    slug: "bracelet-nova",
    code: "BRA00190",
    name: "Bracelet Nova",
    subtitle: "Rivière 5 pierres",
    categorySlug: "joaillerie",
    categoryLabel: "Joaillerie",
    jewelryType: "bracelet",
    shapes: ["rond", "coussin"],
    metals: ["or-blanc", "platine"],
    basePrice: 1890,
    description: "Cinq diamants sertis en rivière sur une chaîne souple, pour un éclat continu au poignet.",
    sizeGuide: false,
  }),
  product({
    slug: "bague-margaux",
    code: "BAGF00470",
    name: "Bague Margaux",
    subtitle: "Solitaire torsadé",
    categorySlug: "bagues-de-fiancailles",
    categoryLabel: "Bagues de fiançailles",
    jewelryType: "bague",
    shapes: ["rond", "ovale"],
    style: "solitaire",
    metals: ["or-jaune", "or-rose"],
    basePrice: 1450,
    description: "Un anneau torsadé délicat vient sublimer un solitaire central, entre tradition et modernité.",
  }),
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.category.slug === categorySlug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products.filter((p) => p.slug !== product.slug && p.category.slug === product.category.slug).slice(0, limit);
}
