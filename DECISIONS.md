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
8. **Carrousels « Alliances » et « Nouveautés » trop clairsemés** : avec seulement 2 alliances et
   3 nouveautés en catalogue, ces rangées laissaient un grand vide à droite sur desktop — pas digne
   d'un site abouti. Ajout de deux alliances (« Alliance Camille », « Alliance Hugo ») pour porter
   le catalogue à 4 pièces par carrousel, comme « Bagues de fiançailles ».
9. **Fil d'Ariane incohérent sur les pages catégorie** : chaque page catégorie affichait
   « Accueil / Joaillerie / [catégorie] », y compris sur la page « Alliances » — donnant
   « Accueil / Joaillerie / Alliances » comme si Alliances était une sous-catégorie de Joaillerie,
   alors que ce sont deux catégories sœurs. Corrigé en renommant ce niveau générique « Nos
   collections » (`src/app/bijoux/[category]/page.tsx`), cohérent avec le titre de la page d'index
   `/bijoux` elle-même — qui affichait, elle, « Joaillerie » dans son onglet et son fil d'Ariane
   tout en montrant « Nos collections » comme titre visible ; uniformisé partout.
10. **Vignettes de catégories toutes identiques** : la page `/bijoux` et l'aperçu « Nos collections »
    de la recherche affichaient la même image (« bagues ») pour les trois catégories, y compris
    Alliances et Joaillerie. Ajout d'un champ `image` par catégorie dans
    `src/lib/data/categories.ts` (source unique), chacune affichant désormais son propre visuel.
11. **Icônes de forme de pierre trop plates** : les pictogrammes de `ShapeIcon.tsx` (sélecteur de
    forme, configurateur, filtres PLP) et les 3 icônes de `StartCards.tsx` (page d'accueil,
    section « Imaginons votre création ») n'étaient que des contours pleins sans aucune ligne de
    taille. Sur demande explicite du client (capture vidéo de référence sacet.com), les 10 formes
    (rond, princesse, coussin, émeraude, poire, ovale, radiant, marquise, cœur, asscher) ont été
    redessinées en véritables pierres à facettes : silhouette + table centrale + lignes de taille
    rayonnantes, dans le style du site de référence. Les 3 icônes de `StartCards.tsx` ont été
    alignées sur le même langage visuel (bague à facettes, diamants ovales à facettes avec table,
    diamant de synthèse marqué d'une étincelle). Vérifié par capture d'écran : les 10 formes du
    sélecteur et les 3 icônes de la page d'accueil s'affichent nettement, sans artefact de rendu.
12. **Panier qui se rouvrait par-dessus la page de commande** : l'état `isOpen` du tiroir panier
    était persisté dans `localStorage` avec les lignes du panier (`src/lib/store/cart.ts`). En
    quittant le site avec le tiroir ouvert, il se rouvrait automatiquement au chargement suivant
    et recouvrait entièrement la page — y compris `/commander`, où il masquait le formulaire de
    livraison. Corrigé avec `partialize` pour ne persister que les lignes du panier, jamais l'état
    d'ouverture du tiroir (redevient fermé à chaque nouveau chargement). Vérifié par capture
    d'écran (formulaire de commande visible, badge panier « 1 » correct) et par le script de
    fumée, passé de 16/20 à 18/20 (ce bug perturbait aussi le flux de rendez-vous et la newsletter,
    qui rouvraient le même tiroir par-dessus leurs propres éléments).
13. **Structure du bas de l'accueil absente** : le client a fourni une capture vidéo de sacet.com
    montrant la structure attendue en bas de la page d'accueil (analysée image par image via
    ffmpeg). Cette structure — pas les photos, mais l'agencement — manquait entièrement de notre
    page d'accueil. Ajout de 4 nouvelles sections reproduisant fidèlement cet agencement, dans nos
    couleurs (bleu roi / ivoire / doré) :
    - `CollectionsScroller.tsx` : bandeau plein écran bleu roi listant les collections en grand
      serif empilé, avec mise en évidence de la collection actuellement au centre de l'écran au
      défilement (IntersectionObserver), le reste atténué — comme le bloc « NOS COLLECTIONS » de
      la référence.
    - `BoutiquesSection.tsx` : en-tête « Rencontrons-nous » avec filet, sous-titre « Nos
      boutiques », description, liste de villes (liens réels vers `/boutiques/[slug]`), bouton
      « Réserver un rendez-vous », et un mini-carrousel photo des boutiques avec flèches
      précédent/suivant — reproduisant le bloc boutiques de la référence.
    - `AVosCotesSection.tsx` : en-tête « À vos côtés » avec filet, bannière photo, puis une grille
      de 4 cartes de contact (Téléphone, Email, Rendez-vous, Assistance), chacune avec icône,
      titre en petites capitales et lien fonctionnel (`tel:`, `mailto:`, `/rendez-vous`,
      `/contact`) — reproduisant la grille de contact de la référence.
    - `SocialQuote.tsx` : bloc Instagram (photo + « @elya_joaillerie » + lien vers le compte) puis
      citation de marque en italique — reproduisant le bloc réseaux sociaux + citation de la
      référence.
    Le bloc `AppointmentBlock.tsx` (RDV en 2 colonnes) devenait redondant avec `BoutiquesSection`
    et a été supprimé. Vérifié par capture d'écran (desktop et mobile 390px, aucun débordement
    horizontal) et par le script de fumée (18/20, stable).
14. **Texte doublé et illisible sur les vignettes photo du méga-menu** : trouvé en contrôlant le
    menu « Bagues de fiançailles ». Les images placeholder (`scripts/generate-placeholders.mjs`)
    dessinaient leur propre légende directement dans le SVG (ex. « Bagues de fiançailles »), alors
    que chaque composant qui affiche ces images (méga-menu, vignettes de catégorie, recherche…)
    superpose déjà sa propre légende par-dessus (ex. « Nouveautés »). Les deux textes se
    chevauchaient, illisibles — c'est ce que le client décrivait comme « une petite photo … pas
    trop claire ». Corrigé en retirant le texte intégré aux SVG générés (55 fichiers régénérés) :
    chaque image ne porte plus qu'une seule légende, la vraie, celle du composant. Vérifié par
    capture d'écran du méga-menu ouvert.
15. **Police des titres trop fine, icônes de réassurance en emoji** : sur demande du client d'une
    police « plus luxueuse », vérifié que Cormorant Garamond se chargeait bien (elle se chargeait :
    pas un problème de police manquante) mais son poids par défaut (400) rendait les grands titres
    fins et peu présents. Ajout d'une règle globale portant `h1/h2/h3` à 500 quand aucun poids
    explicite n'est déjà fixé (`globals.css`), pour un rendu plus « haute joaillerie » sans toucher
    aux composants un par un. Remplacé aussi les 4 emoji de la barre de réassurance (🚚 ↩ ✎ 🔒),
    peu cohérents entre systèmes et peu qualitatifs, par des icônes trait fines dans le même style
    que le reste du site. Vérifié par capture d'écran (desktop et mobile) et par lecture du poids
    de police calculé (400 → 500 sur le `<h1>`).

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
