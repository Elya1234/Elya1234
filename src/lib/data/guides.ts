export interface Guide {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  sections: { id: string; heading: string; body: string[] }[];
}

export const guides: Guide[] = [
  {
    slug: "les-4c",
    title: "Les 4C du diamant",
    excerpt: "Carat, couleur, clarté, taille : les quatre critères qui déterminent la qualité et le prix d'un diamant.",
    image: "/placeholders/guide-4c.svg",
    sections: [
      { id: "carat", heading: "Le carat", body: ["Le carat mesure le poids du diamant : 1 carat équivaut à 0,2 gramme. Il influence fortement le prix, de façon non linéaire."] },
      { id: "couleur", heading: "La couleur", body: ["L'échelle va de D (incolore) à Z (teinté jaune). Plus la lettre est proche de D, plus le diamant est rare et recherché."] },
      { id: "clarte", heading: "La clarté", body: ["Elle évalue la présence d'inclusions internes ou externes. Les diamants VVS sont pratiquement dépourvus d'inclusions visibles."] },
      { id: "taille", heading: "La taille", body: ["La taille façonne le diamant et détermine sa brillance. Une taille bien exécutée maximise le retour de lumière."] },
    ],
  },
  {
    slug: "guide-des-tailles",
    title: "Guide des tailles",
    excerpt: "Comment mesurer votre tour de doigt pour choisir la taille de bague idéale.",
    image: "/placeholders/guide-tailles.svg",
    sections: [
      { id: "mesurer", heading: "Comment mesurer votre taille", body: ["Entourez votre doigt avec un fil ou une bande de papier, marquez le point de chevauchement, puis mesurez la longueur en millimètres."] },
      { id: "conseils", heading: "Nos conseils", body: ["Mesurez en fin de journée, lorsque vos doigts sont légèrement plus gonflés. En cas de doute entre deux tailles, choisissez la plus grande."] },
    ],
  },
  {
    slug: "entretien",
    title: "Entretenir vos bijoux",
    excerpt: "Les bons gestes pour préserver l'éclat de vos bijoux au quotidien.",
    image: "/placeholders/guide-entretien.svg",
    sections: [
      { id: "nettoyage", heading: "Le nettoyage", body: ["Nettoyez vos bijoux à l'eau tiède savonneuse à l'aide d'une brosse à poils doux, puis rincez et séchez avec un chiffon non pelucheux."] },
      { id: "controle", heading: "Le contrôle du sertissage", body: ["Faites contrôler le sertissage de vos pierres une fois par an en boutique. Ce contrôle est offert à vie chez Elya."] },
    ],
  },
  {
    slug: "naturel-vs-synthese",
    title: "Diamant naturel ou de synthèse ?",
    excerpt: "Comprendre les différences entre diamant naturel et diamant de synthèse pour faire le bon choix.",
    image: "/placeholders/guide-synthese.svg",
    sections: [
      { id: "definition", heading: "Deux origines, une même composition", body: ["Le diamant de synthèse est cultivé en laboratoire et partage exactement la même composition chimique et les mêmes propriétés physiques que le diamant naturel, extrait du sol."] },
      { id: "prix", heading: "Une différence de prix", body: ["À qualité égale, le diamant de synthèse est généralement 30 à 40% moins cher que son équivalent naturel."] },
      { id: "certification", heading: "Une certification identique", body: ["Les deux types de diamants sont certifiés par les mêmes laboratoires (IGI, GIA), qui précisent systématiquement leur origine."] },
    ],
  },
  {
    slug: "livraison-retours",
    title: "Livraison & retours",
    excerpt: "Nos conditions de livraison et notre politique de retour.",
    image: "/placeholders/guide-4c.svg",
    sections: [
      { id: "livraison", heading: "Livraison", body: ["Livraison offerte en France métropolitaine. Comptez 2 à 4 semaines ouvrées de fabrication avant expédition, puis 24 à 48h de transport sécurisé et assuré."] },
      { id: "retours", heading: "Retours", body: ["Vous disposez de 30 jours pour changer d'avis. Les pièces gravées ou modifiées sur-mesure ne sont pas reprises, sauf défaut de fabrication."] },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
