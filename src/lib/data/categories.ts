export interface Category {
  slug: string;
  label: string;
  intro: string;
  image: string;
}

export const categories: Category[] = [
  {
    slug: "bagues-de-fiancailles",
    label: "Bagues de fiançailles",
    intro:
      "Chaque bague de fiançailles Elya est façonnée à la main dans notre atelier parisien. Choisissez la forme du diamant, le métal et le sertissage pour composer une pièce qui vous ressemble — un diamant naturel ou de synthèse, sélectionné avec la même exigence. Nos joailliers-conseil vous accompagnent, en boutique ou à distance, à chaque étape de la création.",
    image: "/placeholders/category-bagues.svg",
  },
  {
    slug: "alliances",
    label: "Alliances",
    intro:
      "Des alliances intemporelles, unies ou pavées, pensées pour durer toute une vie. Disponibles en or jaune, or blanc, or rose et platine, ajustées à votre taille sans frais.",
    image: "/placeholders/category-alliances.svg",
  },
  {
    slug: "joaillerie",
    label: "Joaillerie",
    intro:
      "Bagues, colliers, bracelets et boucles d'oreilles : notre collection de joaillerie quotidienne et de cérémonie, conçue et fabriquée en France.",
    image: "/placeholders/category-joaillerie.svg",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
