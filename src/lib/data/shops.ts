import type { Shop } from "@/lib/types";

export const shops: Shop[] = [
  {
    slug: "paris",
    name: "Elya Paris — Place Vendôme",
    city: "Paris",
    address: "12 Place Vendôme",
    postalCode: "75001 Paris",
    phone: "01 42 33 55 10",
    hours: [
      { day: "Lundi", hours: "Fermé" },
      { day: "Mardi – Samedi", hours: "10h30 – 19h00" },
      { day: "Dimanche", hours: "Sur rendez-vous" },
    ],
    lat: 48.8683,
    lng: 2.3292,
    image: "/placeholders/boutique-paris.svg",
  },
  {
    slug: "lyon",
    name: "Elya Lyon — Presqu'île",
    city: "Lyon",
    address: "24 Rue Édouard Herriot",
    postalCode: "69001 Lyon",
    phone: "04 78 22 40 15",
    hours: [
      { day: "Lundi", hours: "Fermé" },
      { day: "Mardi – Samedi", hours: "10h00 – 18h30" },
      { day: "Dimanche", hours: "Fermé" },
    ],
    lat: 45.764,
    lng: 4.8357,
    image: "/placeholders/boutique-lyon.svg",
  },
  {
    slug: "bordeaux",
    name: "Elya Bordeaux — Golden Triangle",
    city: "Bordeaux",
    address: "8 Cours de l'Intendance",
    postalCode: "33000 Bordeaux",
    phone: "05 56 12 33 40",
    hours: [
      { day: "Lundi", hours: "Fermé" },
      { day: "Mardi – Samedi", hours: "10h00 – 18h30" },
      { day: "Dimanche", hours: "Fermé" },
    ],
    lat: 44.8412,
    lng: -0.5772,
    image: "/placeholders/boutique-bordeaux.svg",
  },
  {
    slug: "toulouse",
    name: "Elya Toulouse — Capitole",
    city: "Toulouse",
    address: "5 Rue Saint-Rome",
    postalCode: "31000 Toulouse",
    phone: "05 61 44 20 33",
    hours: [
      { day: "Lundi", hours: "Fermé" },
      { day: "Mardi – Samedi", hours: "10h00 – 18h30" },
      { day: "Dimanche", hours: "Fermé" },
    ],
    lat: 43.6045,
    lng: 1.4442,
    image: "/placeholders/boutique-toulouse.svg",
  },
];

export function getShop(slug: string): Shop | undefined {
  return shops.find((s) => s.slug === slug);
}
