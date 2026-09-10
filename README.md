# Elya Joaillerie

Site vitrine et e-commerce de joaillerie haut de gamme (fondations), construit avec Next.js 14
(App Router), TypeScript et Tailwind CSS.

> Le nom de marque, le catalogue, les boutiques et les visuels sont provisoires. Voir
> [`DECISIONS.md`](./DECISIONS.md) pour le détail des choix pris sans validation et la liste de ce
> qui reste à fournir avant mise en production.

## Installation

```bash
npm install
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

Aucune variable d'environnement n'est requise pour faire tourner le site en l'état (aucune clé
d'API n'est utilisée : les données produit/boutiques sont statiques, la carte est un placeholder
SVG, les formulaires simulent un envoi côté serveur via des routes API internes).

## Scripts

| Commande | Effet |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Sert le build de production |
| `npm run lint` | ESLint |
| `npm run generate-placeholders` | Régénère les images placeholder SVG dans `public/placeholders/` |
| `npm run smoke` | Script Playwright de fumée sur les parcours clés (nécessite `npm run dev` ou `npm run start` lancé en parallèle) |

## Structure du projet

```
src/
  app/                  Routes (App Router) : pages + routes API
    produit/[slug]/     Page produit (PDP)
    bijoux/[category]/  Liste produit (PLP)
    boutiques/, guides/, rendez-vous/, compte/, panier/, ...
    api/                Routes API (newsletter, contact) — validation serveur
  components/
    ui/                 Design system : Button, Chip, Accordion, Popover, Modal, Drawer, Tabs...
    layout/             Header, mega-menu, drawer mobile, recherche, footer, boutons flottants
    home/               Sections de la page d'accueil
    plp/, product/       Composants spécifiques liste/fiche produit
    cart/, account/, stores/, contact/, legal/
  lib/
    data/               "Base de données" statique (marque, catalogue, boutiques, guides, nav...)
    store/              État global (Zustand + persistance localStorage) : panier, wishlist, auth mock, cookies
    types.ts, pricing.ts, filters.ts, utils.ts, availability.ts, ics.ts
public/placeholders/    Visuels placeholder générés (voir scripts/generate-placeholders.mjs)
```

## Comment...

### ... modifier le nom de marque, le téléphone, les réseaux sociaux

Tout est centralisé dans `src/lib/data/brand.ts`.

### ... ajouter un produit

Ajoutez une entrée dans le tableau `products` de `src/lib/data/products.ts` via la fonction
`product({...})` (nom, catégorie, formes/métaux disponibles, prix de base, description...). Les
suppléments de prix (métal, carat, clarté, couleur, origine de la pierre) sont calculés
automatiquement par `buildPricing()` à partir du prix de base — ajustez cette fonction si la
politique de prix doit être différente d'un produit à l'autre. Générez ensuite les visuels
placeholder correspondants avec `npm run generate-placeholders` (ou remplacez directement les
fichiers dans `public/placeholders/` par de vraies photos, en conservant les noms de fichiers
`product-<slug>-1.svg|jpg`, `-2`, `-3`).

### ... ajouter une boutique

Ajoutez une entrée dans `src/lib/data/shops.ts` (adresse, horaires, téléphone, latitude/longitude).
Elle apparaît automatiquement dans `/boutiques`, dans le parcours de prise de rendez-vous et dans le
footer.

### ... ajouter un guide éditorial

Ajoutez une entrée dans `src/lib/data/guides.ts` (sections avec ancres). La page
`/guides/[slug]` et l'index `/guides` se mettent à jour automatiquement.

### ... ajouter une langue

Le sélecteur de langue est actuellement un affichage statique (« FR ▾ ») non branché à un système
de routage i18n — voir `DECISIONS.md`. L'ajout d'une vraie prise en charge multilingue nécessite
d'introduire un dictionnaire de traduction et le routage `next-intl` (ou équivalent) avant de
brancher ce sélecteur.

## Design system

Les tokens (couleurs, typographies, espacements) sont définis dans `tailwind.config.ts` et
`src/app/globals.css`. Aucune couleur ni taille de police ne doit être écrite en dur ailleurs dans
le code — utilisez les classes Tailwind générées à partir de ces tokens.

## État des tests

Un script de fumée Playwright (`scripts/smoke.mjs`) couvre manuellement les parcours clés (ajout
au panier, filtres PLP, configurateur PDP, prise de RDV, responsive 320px→2560px). Il n'est pas
encore intégré en CI sous forme de suite `@playwright/test` — voir `DECISIONS.md`.
