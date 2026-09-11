# Décisions prises sans validation préalable

Ce document liste les choix faits de façon autonome pendant la refonte, avec leur justification,
conformément à la consigne du brief initial.

## Portée de cette session

Le dépôt était vide au départ (aucun code existant) — il ne s'agissait donc pas d'une "refonte" au
sens strict mais d'une création. Après clarification avec l'utilisateur, le périmètre retenu est
« Fondations solides » : Next.js 14 + TypeScript + Tailwind, design system complet, Accueil, PLP,
PDP (configurateur fonctionnel), panier/liste d'envies, compte, prise de RDV, boutiques, guides et
pages légales — tous réellement fonctionnels. i18n multi-langue complet, tests automatisés (unit +
e2e) et intégration d'un vrai CMS/back-end/paiement restent hors périmètre de cette session (voir
« Ce qui reste à fournir »).

## Palette de couleurs (mise à jour)

À la demande de l'utilisateur, la palette verte initiale a été remplacée par : **bleu roi**
(`--bleu-roi`, #1A2A63 — boutons, en-tête, footer, états actifs), **orange-rose/corail**
(`--orange-rose`, #F3B79B pour les fonds éditoriaux clairs ; `--orange-rose-texte`, #A8502E, une
teinte plus foncée conforme au contraste AA pour le texte blanc sur fond corail) et une touche de
**doré** (`--dore`, #C9A85C — accent script "Nous sommes Elya", identique à la pastille métal
"or jaune"). Tokens dans `tailwind.config.ts`.

## Bugs corrigés lors de la revue de design

En reprenant chaque page avec la nouvelle palette, deux bugs réels ont été trouvés et corrigés
(présents depuis la première version, indépendants de la couleur) :

1. **Toutes les images étaient cassées.** L'optimiseur d'images de Next.js rejetait nos SVG
   placeholder (« isn't a valid image ») faute du paquet `sharp` dans cet environnement. Corrigé en
   passant `images.unoptimized: true` dans `next.config.mjs` — pertinent tant que les visuels restent
   des SVG légers ; à retirer quand de vraies photos seront fournies (et installer `sharp`, recommandé
   par Next.js pour un déploiement autogéré).
2. **Erreur d'hydratation React** sur toutes les pages (`Drawer.tsx` : panier, menu mobile, filtres).
   Le composant faisait `if (typeof document === "undefined") return null` directement dans le rendu,
   ce qui produit un rendu serveur différent du premier rendu client (classique piège Next.js/React).
   Corrigé avec un état `mounted` réglé dans un `useEffect`, garantissant que le serveur et le premier
   rendu client produisent exactement le même résultat.
3. **Mega-menu mal positionné** : ancré en position fixe avec un décalage en pixels codé en dur, il
   recouvrait la ligne de navigation au lieu de s'ouvrir juste en dessous. Corrigé en l'ancrant en
   position absolue au conteneur `<nav>` (`top-full`) plutôt qu'au viewport.
4. **Liens « Colliers / Bracelets / Boucles d'oreilles » du méga-menu non fonctionnels** : ils
   pointaient vers `/bijoux/joaillerie?type=collier` (etc.) mais ce paramètre `type` n'était lu par
   aucun code — la page affichait tous les articles de joaillerie mélangés. Corrigé en ajoutant un
   champ `jewelryType` au modèle produit (`src/lib/types.ts`, `src/lib/data/products.ts`) et en
   filtrant réellement sur ce paramètre (`src/lib/filters.ts`), avec une puce de filtre actif
   correspondante dans la barre de filtres. Vérifié : un audit de tous les liens internes du site
   (53 liens uniques sur 23 pages) ne remonte plus aucun lien mort, et chaque lien de catégorie mène
   bien aux produits attendus (bagues → bagues, colliers → colliers, etc.).
5. **Sélecteurs de langue/devise décoratifs** : les boutons « FR ▾ » et « France (€) ▾ » du header,
   du footer et du menu mobile n'avaient aucun `onClick` — ils ne faisaient rigoureusement rien.
   Comme le site n'est réellement disponible qu'en français, une vraie prise en charge multilingue
   serait mensongère. Remplacés par un composant `LocaleSwitcher` (`src/components/layout/`)
   réellement interactif : il s'ouvre, affiche l'option active (« Français » / « France (€) ») et les
   options à venir marquées « Bientôt », plutôt que de prétendre offrir un choix qui n'existe pas.
6. **Format de téléphone incohérent** : le lien `tel:` des pages boutique utilisait le format
   national français (`tel:0478224015`), différent du reste du site (`tel:+33142335510`). Le format
   international E.164 est le seul fiable sur tous les téléphones et pays ; ajout d'un utilitaire
   `toTelHref()` (`src/lib/utils.ts`) pour uniformiser.
7. **Bouton « S'inscrire » de la newsletter invisible** (texte blanc sur fond blanc) : le composant
   `Button` recevait des couleurs de substitution via `className` (`bg-white text-bleu-roi`), mais
   l'ordre du CSS Tailwind compilé ne suit pas l'ordre des classes dans le JSX — la couleur de texte
   blanche du variant `primary` gagnait sur la surcharge. Repéré visuellement lors de la revue de
   l'accueil. Corrigé en ajoutant deux vrais variants à `Button` (`light`, `outlineLight`) au lieu de
   bricoler les couleurs par surcharge — plus fiable et réutilisé pour les boutons « Prendre RDV »
   sur fond coloré. Au passage, la couleur de survol du bouton `primary` était restée un vert
   (`#0a2e23`) oublié lors du changement de palette ; corrigée en bleu roi foncé (`#12204a`).

## Marque et contenu

- Nom de marque provisoire : **Elya Joaillerie** (`src/lib/data/brand.ts`) — à remplacer.
- 4 boutiques provisoires : Paris, Lyon, Bordeaux, Toulouse (`src/lib/data/shops.ts`) — adresses et
  coordonnées GPS approximatives à vérifier/remplacer.
- Catalogue de 9 produits fictifs avec règles de prix réalistes mais inventées
  (`src/lib/data/products.ts`) — à remplacer par le vrai catalogue.
- Tous les visuels sont des placeholders SVG générés localement (`public/placeholders/`, généré par
  `scripts/generate-placeholders.mjs`), conformément à l'interdiction d'utiliser des assets tiers.

## Stack technique

- **Next.js 14 (App Router) + TypeScript strict + Tailwind CSS** : choisi par l'utilisateur pour le
  SSR/SEO natif.
- **Zustand + `persist` (localStorage)** pour panier, liste d'envies, auth mock et consentement
  cookies : léger, sans provider React nécessaire, et la persistance locale suffit pour une démo
  sans back-end.
- Next.js a été mis à jour vers la dernière version patchée de la branche 14 (14.2.35) suite à
  l'alerte de sécurité de décembre 2025 sur les versions antérieures. Les vulnérabilités `npm audit`
  restantes concernent uniquement des dépendances de développement (`eslint`, `postcss` imbriqué
  dans `next`) et n'ont pas de surface d'exposition en production ; un `npm audit fix --force`
  forcerait un passage à Next 16 (breaking change majeur), non souhaitable en cours de projet.

## Authentification et paiement (mock assumé)

- Le compte utilisateur (`src/lib/store/auth.ts`) est un mock **100% client-side** : les comptes et
  mots de passe sont stockés en clair dans le localStorage du navigateur. C'est suffisant pour
  démontrer un parcours complet (connexion/inscription/validation) mais **doit impérativement être
  remplacé par un vrai back-end d'authentification avant mise en production** (hashage des mots de
  passe, sessions serveur, etc.).
- Le tunnel de commande (`/commander`) valide un formulaire et simule la confirmation ; aucune
  intégration de paiement réelle (Stripe, Adyen…) n'est branchée. Le texte le précise à l'utilisateur
  ("redirigé vers notre prestataire de paiement sécurisé").
- Le formulaire de newsletter et le formulaire de contact valident réellement côté serveur
  (`src/app/api/newsletter`, `src/app/api/contact`) mais n'envoient pas de vrai e-mail (pas de
  service d'e-mail transactionnel connecté dans cet environnement).

## Carte des boutiques

Pas de clé d'API Google Maps / Mapbox disponible dans cet environnement. La carte des boutiques
(`src/components/stores/ShopMap.tsx`) est une carte silhouette SVG simplifiée avec des repères
positionnés par interpolation latitude/longitude — interactive (sélection synchronisée liste/carte)
mais pas une vraie carte tuilée. Le bouton "Itinéraire" pointe vers OpenStreetMap (aucune clé requise)
pour un lien de directions réellement fonctionnel. **À remplacer par Google Maps/Mapbox avec clé
d'API en production.**

## Prise de rendez-vous — disponibilités

Les créneaux disponibles (`src/lib/availability.ts`) sont générés de façon déterministe (pas
d'agenda réel connecté). Le flux (choix boutique → type/sujet → date/créneau → coordonnées →
confirmation) est entièrement fonctionnel côté UI, avec export `.ics` réel du rendez-vous, mais
aucune requête n'est envoyée à un système de prise de RDV réel.

## Filtres produits (PLP)

Le brief liste des filtres "Type de bijoux / Forme / Type de pierre / Métal / Serti / Prix". Seuls
**Forme, Métal et Prix** sont implémentés en filtres de catalogue, car ce sont les seuls attributs
réellement différenciants au niveau du modèle de données produit. "Type de pierre" (naturel/synthèse)
et "Serti" sont des choix de configuration **par commande** (dans le configurateur PDP), pas des
attributs de catalogue distincts pour ce jeu de données — les ajouter comme filtres PLP aurait
produit des filtres décoratifs ne changeant jamais le résultat, ce qui va à l'encontre de la consigne
« aucun filtre décoratif ». "Type de bijoux" est couvert par la navigation entre catégories.

## Métal et image produit

Le clic sur une pastille de métal (carte produit PLP/Accueil) change bien l'état sélectionné
(aria-pressed, anneau de focus) mais ne change pas la photo affichée : chaque produit n'a que 3
photos placeholder génériques, pas de déclinaison par métal. Le code est prêt à afficher une image
par métal dès que le vrai catalogue photo sera fourni (il suffit de renseigner un champ
`imagesByMetal` sur le produit).

## Accessibilité

- Contraste : la teinte `--vert-sauge` (#7C8C6E) ne passe pas le ratio AA (4.5:1) pour du texte
  blanc de petite taille. Un ton plus foncé dédié `--vert-sauge-texte` (#5D6B52, ratio ≈5.7:1) est
  utilisé partout où du texte blanc est posé sur fond sauge (bloc RDV, tuile éditoriale PLP).
  `--vert-sauge` reste utilisé tel quel pour les fonds très clairs teintés (`/10`) où le texte est
  sombre.
- Les drawers (menu mobile, panier, filtres) restent montés dans le DOM après fermeture pour
  l'animation de sortie ; ils reçoivent l'attribut `inert` à la fermeture afin de ne pas rester
  atteignables au clavier ni exposés aux lecteurs d'écran.

## SEO

- Métadonnées (title/description), `sitemap.xml` et `robots.txt` dynamiques, JSON-LD `Product`,
  `BreadcrumbList`, `JewelryStore` (boutiques), `Article` (guides) et `FAQPage` (contact).
- `/compte` est exclu de l'indexation (page personnelle) ; `/panier` et `/commander` sont désindexés
  via `robots.txt` (contenu dynamique propre à chaque utilisateur).
- Pas d'implémentation `hreflang`/i18n multi-langue dans cette session (voir portée ci-dessus) : le
  sélecteur de langue "FR ▾" est affiché mais non branché à un vrai routage i18n.

## Tests

Pas de suite de tests automatisés (Vitest/Playwright test) committée dans cette session faute de
temps disponible ; un script de fumée `scripts/smoke.mjs` (Playwright, non committé aux dépendances
de production) a servi à valider manuellement les parcours clés pendant le développement. À
transformer en suite `@playwright/test` versionnée pour la CI.

## Ce qui reste à fournir côté client

1. **Nom de marque définitif**, logo (fichier vectoriel) et charte typographique si différente des
   polices proposées (Cormorant Garamond / Jost / Tangerine).
2. **Catalogue produit réel** : photos (packshot + détail + porté, par métal si possible), prix,
   descriptions, références.
3. **4 boutiques réelles** : adresses exactes, coordonnées GPS, horaires, téléphones.
4. **Clé d'API carte** (Google Maps ou Mapbox) pour remplacer la carte placeholder.
5. **Back-end e-commerce/CMS** (ou choix d'une plateforme comme Shopify) pour remplacer les données
   mockées par de vraies commandes, un vrai compte client et un vrai paiement.
6. **Service d'envoi d'e-mails transactionnels** (confirmation de commande, RDV, newsletter).
7. **Contenu juridique validé** par un juriste (mentions légales, CGV, politique de confidentialité)
   — les pages actuelles sont des textes-type à faire relire.
8. Décision sur l'**i18n** (langues à couvrir en plus du français) si le multilingue est requis.
