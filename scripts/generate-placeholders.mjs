// Génère les images placeholder SVG utilisées tant que les vraies photos ne sont pas fournies.
// Usage : node scripts/generate-placeholders.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = join(process.cwd(), "public", "placeholders");
mkdirSync(OUT, { recursive: true });

const PALETTE = ["#EDEAE3", "#E4E0D6", "#DCD6C8", "#EFE9DD", "#E6E1D3"];

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

function svg(name, w, h, label) {
  const c = PALETTE[hash(name) % PALETTE.length];
  const ringR = Math.min(w, h) * 0.18;
  const cx = w / 2;
  const cy = h / 2 - h * 0.03;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${c}" />
  <circle cx="${cx}" cy="${cy}" r="${ringR}" fill="none" stroke="#0E3B2E" stroke-width="${Math.max(2, ringR * 0.09)}" opacity="0.35" />
  <circle cx="${cx}" cy="${cy - ringR * 0.75}" r="${ringR * 0.22}" fill="#0E3B2E" opacity="0.4" />
  <text x="${w / 2}" y="${h - h * 0.06}" text-anchor="middle" font-family="Georgia, serif" font-size="${Math.max(11, w * 0.028)}" fill="#6B6B6B" letter-spacing="1">${label}</text>
</svg>`;
}

const items = [];

const productSlugs = [
  "bague-emma",
  "bague-lou",
  "bague-victoire",
  "alliance-suzanne",
  "alliance-marceau",
  "collier-cleo",
  "boucles-iris",
  "bracelet-nova",
  "bague-margaux",
];
for (const slug of productSlugs) {
  for (let i = 1; i <= 3; i++) {
    items.push({ file: `product-${slug}-${i}.svg`, w: 1000, h: 1250, label: slug.replace(/-/g, " ") });
  }
}

for (const city of ["paris", "lyon", "bordeaux", "toulouse"]) {
  items.push({ file: `boutique-${city}.svg`, w: 1200, h: 900, label: `Boutique ${city}` });
}

items.push({ file: "hero-left.svg", w: 1000, h: 1250, label: "Elya — collection" });
items.push({ file: "hero-right.svg", w: 1000, h: 1250, label: "Elya — savoir-faire" });
items.push({ file: "hero-single.svg", w: 1920, h: 1080, label: "Elya Joaillerie" });
items.push({ file: "manifesto-1.svg", w: 900, h: 1100, label: "Atelier" });
items.push({ file: "manifesto-2.svg", w: 900, h: 1100, label: "Savoir-faire" });
items.push({ file: "gift-guide.svg", w: 900, h: 900, label: "Gift guide" });
items.push({ file: "appointment.svg", w: 1200, h: 900, label: "Rendez-vous" });
items.push({ file: "category-bagues.svg", w: 800, h: 1000, label: "Bagues de fiançailles" });
items.push({ file: "category-alliances.svg", w: 800, h: 1000, label: "Alliances" });
items.push({ file: "category-joaillerie.svg", w: 800, h: 1000, label: "Joaillerie" });
items.push({ file: "category-offrir.svg", w: 800, h: 1000, label: "Offrir" });
items.push({ file: "guide-4c.svg", w: 1200, h: 800, label: "Les 4C du diamant" });
items.push({ file: "guide-tailles.svg", w: 1200, h: 800, label: "Guide des tailles" });
items.push({ file: "guide-entretien.svg", w: 1200, h: 800, label: "Entretien" });
items.push({ file: "guide-synthese.svg", w: 1200, h: 800, label: "Naturel vs synthèse" });
items.push({ file: "account-hero.svg", w: 1000, h: 1400, label: "Elya Joaillerie" });

for (const it of items) {
  writeFileSync(join(OUT, it.file), svg(it.file, it.w, it.h, it.label), "utf8");
}

console.log(`Généré ${items.length} placeholders dans ${OUT}`);
