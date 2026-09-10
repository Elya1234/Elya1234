export interface NavColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface NavImage {
  label: string;
  href: string;
  image: string;
}

export interface NavItem {
  label: string;
  href: string;
  columns?: NavColumn[];
  images?: NavImage[];
}

export const navItems: NavItem[] = [
  {
    label: "Bagues de fiançailles",
    href: "/bijoux/bagues-de-fiancailles",
    columns: [
      {
        title: "Par style",
        links: [
          { label: "Solitaire", href: "/bijoux/bagues-de-fiancailles?style=solitaire" },
          { label: "Halo", href: "/bijoux/bagues-de-fiancailles?style=halo" },
          { label: "Trilogie", href: "/bijoux/bagues-de-fiancailles?style=trilogie" },
          { label: "Toutes les bagues", href: "/bijoux/bagues-de-fiancailles" },
        ],
      },
      {
        title: "Par forme",
        links: [
          { label: "Rond", href: "/bijoux/bagues-de-fiancailles?forme=rond" },
          { label: "Ovale", href: "/bijoux/bagues-de-fiancailles?forme=ovale" },
          { label: "Émeraude", href: "/bijoux/bagues-de-fiancailles?forme=emeraude" },
          { label: "Coussin", href: "/bijoux/bagues-de-fiancailles?forme=coussin" },
        ],
      },
      {
        title: "Créer",
        links: [
          { label: "Composer ma bague", href: "/bijoux/bagues-de-fiancailles" },
          { label: "Diamant naturel", href: "/guides/naturel-vs-synthese" },
          { label: "Diamant de synthèse", href: "/guides/naturel-vs-synthese" },
        ],
      },
    ],
    images: [
      { label: "Nouveautés", href: "/bijoux/bagues-de-fiancailles?tri=nouveautes", image: "/placeholders/category-bagues.svg" },
      { label: "Par budget", href: "/bijoux/bagues-de-fiancailles?prix=0-1500", image: "/placeholders/category-offrir.svg" },
    ],
  },
  {
    label: "Alliances",
    href: "/bijoux/alliances",
    columns: [
      {
        title: "Alliances",
        links: [
          { label: "Alliances femme", href: "/bijoux/alliances" },
          { label: "Alliances homme", href: "/bijoux/alliances" },
          { label: "Alliances pavées", href: "/bijoux/alliances?style=pave" },
        ],
      },
    ],
    images: [{ label: "Découvrir la collection", href: "/bijoux/alliances", image: "/placeholders/category-alliances.svg" }],
  },
  {
    label: "Joaillerie",
    href: "/bijoux/joaillerie",
    columns: [
      {
        title: "Catégories",
        links: [
          { label: "Colliers", href: "/bijoux/joaillerie?type=collier" },
          { label: "Bracelets", href: "/bijoux/joaillerie?type=bracelet" },
          { label: "Boucles d'oreilles", href: "/bijoux/joaillerie?type=boucles" },
        ],
      },
    ],
    images: [{ label: "Toute la joaillerie", href: "/bijoux/joaillerie", image: "/placeholders/category-joaillerie.svg" }],
  },
  { label: "Offrir", href: "/guides" },
  { label: "Notre histoire", href: "/notre-histoire" },
  { label: "Guides", href: "/guides" },
  { label: "Nos boutiques", href: "/boutiques" },
];

export const popularSearches = ["Bague solitaire", "Alliance homme", "Diamant de synthèse", "Boucles d'oreilles", "Collier pendentif"];
