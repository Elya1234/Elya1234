export type Metal = "or-jaune" | "or-blanc" | "or-rose" | "platine";

export type StoneOrigin = "naturel" | "synthese";

export type Shape =
  | "rond"
  | "princesse"
  | "coussin"
  | "emeraude"
  | "poire"
  | "ovale"
  | "radiant"
  | "marquise"
  | "coeur"
  | "asscher";

export type Clarity = "VVS1" | "VVS2" | "VS1" | "VS2" | "SI1";
export type ColorGrade = "D" | "E" | "F" | "G" | "H";
export type Certificate = "IGI" | "GIA";

export interface CategoryRef {
  slug: string;
  label: string;
}

export type JewelryType = "collier" | "bracelet" | "boucles" | "bague";

export type RingStyle = "solitaire" | "halo" | "trilogie";

export interface ProductOptionPricing {
  metal: Record<Metal, number>;
  stoneOrigin: Record<StoneOrigin, number>;
  carat: Record<string, number>;
  clarity: Record<Clarity, number>;
  colorGrade: Record<ColorGrade, number>;
}

export interface Product {
  slug: string;
  code: string;
  name: string;
  subtitle: string;
  category: CategoryRef;
  jewelryType: JewelryType;
  shapes: Shape[];
  style?: RingStyle;
  metals: Metal[];
  isNew?: boolean;
  basePrice: number;
  images: string[];
  hoverImage?: string;
  description: string;
  detailsRing: string;
  shipping: string;
  care: string;
  certificateInfo: string;
  pricing: ProductOptionPricing;
  availableCarats: string[];
  availableClarities: Clarity[];
  availableColorGrades: ColorGrade[];
  availableCertificates: Certificate[];
  sizeGuide?: boolean;
}

export interface Shop {
  slug: string;
  name: string;
  city: string;
  address: string;
  postalCode: string;
  phone: string;
  hours: { day: string; hours: string }[];
  lat: number;
  lng: number;
  image: string;
}

export interface CartOptions {
  metal?: Metal;
  stoneOrigin?: StoneOrigin;
  shape?: Shape;
  carat?: string;
  clarity?: Clarity;
  colorGrade?: ColorGrade;
  certificate?: Certificate;
  size?: string;
  engraving?: string;
}

export interface CartLine {
  id: string;
  productSlug: string;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
  options: CartOptions;
}
