---
paths:
  - "src/**/*.{ts,tsx,css}"
---

# Doctrine de design TLS — rayons, typo, ombres, bouton, conteneurs, cartes

> Sorti de `CLAUDE.md` le 2026-09-23 (chargement à la demande). Texte inchangé.

### Typographie · tracking · rayons · ombres — doctrine (valeurs → `src/index.css`)

- **Typo** : classes Tailwind auto-générées depuis les tokens (`--text-h1` → `text-h1`, `--font-display` → `font-display`, etc.).
- **Interligne : le pas le porte, ne pas l'écrire à côté.** Chaque `text-*` déclare son `--line-height` ; un `leading-*` posé à côté l'écrase (il gagne quel que soit l'ordre). Le 2026-09-23, 139 surcharges qui bougeaient la ligne de ≤ 1,5 px ont été retirées (`text-body leading-relaxed` = 26 px dans les deux cas). Restent 58 `leading-snug` qui resserrent vraiment : leur sort est l'arbitrage n°11 du banc `/_arbitrages` (tout serré / tout au token / serré pour les titres gras seulement). Tant qu'il n'est pas tranché, n'en ajouter aucun.
- **Tracking gradué** (h1 -0.03em · h2/h3 -0.025em · h4 -0.02em · body 0). ⚠️ Ne **jamais** aplatir le tracking sur tous les headings (anti-pattern). Le marketing BEM (`display-*`, `pole__title`) garde son propre tracking, hors `@theme`.
- **Rayons — la règle est celle du SEUIL (R3, tranchée le 2026-09-14).**
  **Sous 28 px de haut, la pilule. Au-dessus, l'échelle (`rounded-lg`, 14 px).**
  Le navigateur plafonne tout rayon à la moitié de la plus petite dimension, donc
  sous 28 px `rounded-pill` et `rounded-lg` rendent **exactement la même forme** :
  la pilule y reste parce qu'elle est la convention du petit label et qu'elle ne
  coûte rien. Au-dessus, le rayon cesse d'être un accident de plafonnement et
  devient une déclaration — il prend alors l'échelle.

  ⚠️ **Mis à jour le 2026-09-16 — l'échelle est ÉTAGÉE, et la carte est à 20 px.**
  R1 avait posé la carte à 14 px le 09/09 ; à l'usage 14 se lisait comme un
  rectangle, et Figma était resté à 20 (nœuds Card `1111:46`, Card/Glass
  `1111:63`, StatCard `1120:66`, tous liés à `--radius-xl`). `Card.tsx` est
  revenu à `rounded-xl` (commit `0e03c98`). Le bouton **ne suit pas** : plus
  l'élément est grand, plus son rayon l'est, et des rayons imbriqués doivent être
  apparentés, pas identiques. Sur un bouton `sm` de 32 px, le plafond est de
  toute façon à 16.

  | Étage | Famille | Rayon | Pourquoi |
  |---|---|---|---|
  | étiquette | `Badge` · `MetaPill` · `Chip` · `FilterChip` | `rounded-pill` | sous le seuil par construction (20 · 24 · 28 px) |
  | interactif | `Button` (4 tailles) · rangées de liste | **`rounded-lg`** (14) | au-dessus du seuil |
  | interactif | **famille champ** (`Input` · `Select` · `Combobox` · `Search` + faits main) | **`rounded-lg`** (14) | R4 ci-dessous — 36 à 52 px de haut, donc toujours au-dessus du seuil |
  | conteneur | `Card` · `StatCard` · cartes faites main | **`rounded-xl`** (20) | l'étage le plus grand posé dans la page |
  | **surcouche** | `Modal` · modales · tiroirs · feuilles | **`rounded-2xl`** (24) | tranché le 2026-09-23 (arbitrage n°2) : plus l'objet est haut dans l'empilement, plus il est rond. Padding 24 ≥ rayon 24 : ses boutons restent des formes fixes. Material 3 va jusqu'à 28 dp, mais à 28 le padding 24 rendrait ses boutons évasés |
  | pastille d'icône | `IconChip` | **proportionnel** : 24 → `rounded-sm` · 32/40 → `rounded-md` · 48 → `rounded-lg` | tranché le 2026-09-23 (arbitrage n°3) : un carré qui se lit carré à toutes les tailles ; le rond reste réservé aux personnes (avatars), comme chez Atlassian. **Fond : cran 50, et cran 100 sur une carte de même teinte** (`surface="tinted"` : `primary-100` / `secondary-100` / `accent-100` sur carte `primary-50` / `secondary-50` / `accent-50` ; `neutral` prend le cran au-dessus de la carte, `ink-200` sur `ink-100`) — tranché le 2026-09-23 (arbitrage n°10, option C « Cran 100 ») : au cran 50 la pastille a le fond exact de la carte (1,00:1) et disparaît ; le glyphe reste au 800 (5,79 à 8,00:1) |
  | exception | `Button iconOnly` | `rounded-pill` | carré, donc cercle parfait — **exception écrite**, ne pas « uniformiser » |

  ✅ **La famille bulle est tranchée et alignée (2026-09-17).** Elle était la
  seule sans décision écrite — `PromptCard` à 24 sans filet + drop-shadow,
  `JournalChatCompose` à 24 avec filet + ombre, `JournalBubbleCard` à 20 avec
  filet, la bulle faite main du Dashboard à 20. **La construction canonique est
  celle de `JournalBubbleCard`** : rayon conteneur (`rounded-xl`, 20) · filet
  1 px (tonal 100 sur blanc, ou la surface teintée du type) · queue = carré
  tourné 45° avec `border-r border-b` et coin `rounded-br-[6px]` (4 px sur la
  petite bulle de saisie) · padding canon carte (`p-stack-lg`, 24 — `p-5`/20 px
  n'est pas dans l'échelle) · **aucune ombre**, ni repos ni survol (S2 + règle
  carte du 16/09). Les quatre membres sont alignés ; l'ancienne approche
  « borderless + drop-shadow silhouette » de `PromptCard` est abandonnée (voir
  piège n°8, addendum 2).

  ✅ **Règle des coins imbriqués — adoptée le 2026-09-23.**
  **Rayon intérieur = rayon extérieur − retrait.** Un élément arrondi posé près
  du coin d'un conteneur arrondi partage le centre de son arc : c'est la forme
  « concentrique » d'Apple (WWDC25, *Get to know the new design system*), la
  formule `outerRadius - gap = innerRadius` de Cloud Four, le « un peu moins que
  l'extérieur » de CSS-Tricks. Le retrait se mesure du bord extérieur au bord
  intérieur, **bordure du parent comprise**.

  | Retrait au coin (dx, dy) | Régime | Ce qu'on fait |
  |---|---|---|
  | les deux ≥ rayon extérieur | **forme fixe** — les arcs ne se voient pas ensemble | l'élément garde le rayon de son étage (14, pilule…) |
  | les deux < rayon extérieur | **concentrique** | rayon = R − retrait, à ±3 px |
  | l'un < R, l'autre ≥ R | hors zone — le coin longe un bord droit | pas de contrainte |
  | élément en capsule ou cercle | forme propre (Apple) | **exempté** — tranché le 2026-09-23 (arbitrage n°6) : une capsule n'a pas de coin à accorder |

  **Corriger le retrait avant le rayon.** Presque toujours, un token
  d'espacement existant fait tomber le cas dans « forme fixe » ou « concentrique
  exact » sans créer de rayon : nav de compte à `p-stack-2xs` (20 − 6 = 14),
  bouton filtre de `Search` tiré à 4 px (14 − 4 − 1 ≈ 10), carte du dashboard à
  `p-stack-lg` (25 ≥ 20). ⚠️ **Aucune source ne traite le retrait supérieur au
  rayon** : le régime « forme fixe » est une lecture de la typologie d'Apple,
  pas une règle citée. C'est pourtant 87 % des cas (1 155 paires sur 1 321,
  mesurées sur 60 routes le 23/09) — la règle « le padding ne descend pas sous
  le rayon » est ce qui rend le système sûr par défaut.

  ⚠️ Mesurer au navigateur, animations d'entrée terminées : un `translateY`
  figé dans un onglet en arrière-plan a produit un faux « retrait 9 » au
  Passeport le 23/09.

  ⚠️ **Ne jamais poser deux classes de rayon sur le même élément** : elles ont la
  même spécificité (0,1,0), donc c'est l'ordre d'émission de Tailwind qui tranche,
  pas l'ordre du `className` — piège n°6. `Button.tsx` sort pour cette raison son
  rayon de `BASE` (constantes `RAYON` / `RAYON_CERCLE`, une seule posée par appel).
  `Input`, `Select`, `Combobox` et `Search` ont été mis sur le même motif par R4.

  ✅ **R2 (les 24 px sur des conteneurs) est tranchée le 2026-09-23** : 24 est
  l'étage **surcouche** (modales, tiroirs, feuilles), écrit dans la table
  ci-dessus. Posé DANS la page, un conteneur reste à 20.

  ⚠️ **`rounded-3xl` : le « 0 occurrence » de la ligne précédente était faux** —
  corrigé le même jour. Le grep, comme la règle du détecteur, ne cherchait que
  `rounded-3xl` **nu** ; il en restait deux en variante de coin, `rounded-t-3xl`
  — le filet de la coque Auth et la feuille modale mobile du site. Les deux ont
  été ramenés au vocabulaire du repo (`rounded-t-lg` et `rounded-t-2xl`, rendu
  identique dans les deux cas), et la règle du détecteur accepte désormais le
  segment de direction. **Une recherche de token hors échelle doit accepter ses
  variantes de coin**, sinon elle certifie une propreté qu'elle n'a pas vérifiée.

- **R4 — la famille champ prend l'échelle, à 14 px (tranchée le 2026-09-14).**
  R3 dit quel régime s'applique, pas quel cran. Un champ fait 36 · 44 · 52 px de
  haut : il est **toujours** au-dessus du seuil, donc son rayon est une
  déclaration. Restait à dire laquelle. `Input` disait `rounded-md` (10) sans
  l'avoir jamais justifié — et la mesure a tranché contre lui.

  **Ce qui a été mesuré au navigateur, et qui décide :**
  - Sur `/website/contact`, les quatre champs à 10 px et le bouton « Envoyer le
    message » à 14 px font **exactement la même hauteur (48 px)** et se suivent
    dans le même formulaire. Deux courbes pour des objets jumeaux.
  - La Card qui porte les formulaires était à 14 (R1, revenue à 20 le 16/09), le Button à 14 (R3). 10 px
    était donc un **troisième cran pour la même taille**, sans raison écrite.
  - **Aucune des trois raisons possibles ne se vérifiait.** Ni la hauteur : deux
    zones de texte quasi identiques rendaient 156 px à 10 (contact) contre 158 px
    à 14 (pré-questionnaire). Ni le contexte éditorial : le marketing portait les
    deux valeurs. Ni le voisinage. C'était de la dérive.
  - Sur une seule page de vitrine, `/components/search-filters`, la même famille
    — « une barre de recherche » — rendait **10, 14, 20 et 24 px côte à côte**.
    Elle rend aujourd'hui 14 partout.

  ✅ **Filet de la famille champ : `ink-400` — arbitrage n°7 du 2026-09-23.**
  `Input`, `Select`, `Combobox`, `Search`, case à cocher, radio et rail éteint du
  Switch. Mesuré : **3,01:1 sur blanc** (WCAG 1.4.11 : 3:1, passe de justesse),
  **2,68:1 sur carte teintée `primary-50`** — sous le seuil, **choix assumé**
  pour garder un filet discret. `ink-300` mesurait 1,47:1. `ink-500` (4,99 /
  4,45) passait partout : c'est l'option à reprendre si un champ doit vivre
  sur une surface teintée. Le survol de `Search` fonce au 500.

  **Ce que la décision ne touche pas.** Les contrôles à forme propre gardent la
  leur : case à cocher `rounded-sm`, radio son cercle, switch et rail de slider
  leur pilule. La bulle de chat (`JournalChatCompose`, `rounded-2xl` + queue)
  non plus — c'est un pattern speech-bubble, pas un champ (piège n°8 addendum 2).

  ⚠️ **L'écart avait déjà été vu deux fois — et arbitré deux fois à l'envers.**
  `docs/_audits/AUDIT-DESIGN-2026-07-22.md` le listait en « valeur fausse »
  (« 14px attendu → 10px réel ») et `DESIGN-IMPECCABLE.md` a été *corrigé* le
  2026-07-28 pour dire `rounded-md` là où il disait 14 px. Les deux fois, on a
  aligné la spécification sur le code sans demander lequel avait raison. C'est
  le réflexe à connaître : quand un doc et un composant divergent, la question
  n'est pas « lequel est à jour » mais « lequel est juste », et seule la mesure
  au navigateur répond.

  ⚠️ **`Search` portait sa propre échelle** — 14 · 20 · 24 selon la taille —
  alors que sa fiche de vitrine le décrit comme « blanc + bordure, **comme
  Input** ». La fiche avait raison, le code avait tort. Le rayon d'un champ **ne
  dépend plus de sa taille** : vérifié aux trois crans, à 36 px de haut — le plus
  petit — le rapport rayon/hauteur reste à 0,39, loin des 0,5 de la pilule. Ne
  pas réintroduire de rayon dans une map de taille.

  **Les 9 « champs de saisie » du détecteur, regardés un par un** (un chiffre
  n'est pas un défaut) : **1 faux positif** — `CompletionModal` est un `<button>`
  d'option, pas un champ ; **3 migrables** vers `<Input>` au prix d'un léger
  écart visuel — les deux champs glass de `AppLanding` et `MarketingHome`
  (opacités et flou différents de `surface="glass"`) et le `<select>` de
  `MarketingDiagnostic` ; **5 qui font ce que le composant ne couvre pas** —
  fond qui s'éclaircit au focus (`CoachLearnerProfile` ×2), ombre teintée au
  focus (`RatingModal`), champ centré en `border-2` et gros corps
  (`OnboardingPreview`), zone de rejet inline (`AIOverrideButton`). Aucun n'est
  un doublon exact : la bonne suite est d'étendre `Input`, pas de migrer à la
  main. À traiter dans une passe « surfaces de champ », pas dans une décision
  de rayon.

  ⚠️ Le détecteur a bougé de lui-même : la famille **carte** est passée de 266
  à **240** parce que R4 lui a fait voir que 26 « cartes » étaient des champs.
  Un champ bordé avec du padding coche la signature de la carte depuis qu'il est
  à `rounded-lg` — exactement le piège que R3 avait rencontré avec le bouton.
  Le discriminant ajouté est le `placeholder:`, que seul un champ porte.

  ✅ **La famille Auth a suivi, le même jour.** `AuthPrimaryButton`,
  `AuthSocialButton` et `AuthGhostButton` sont faits main : R3 est passée par
  `Button.tsx` et ne les avait pas atteints. Mesuré sur `/auth/login` avant
  correction, le champ rendait **14 px pour 52 px de haut** et le bouton juste
  en dessous **20 px pour 48 px** — l'objet le plus petit portait le rayon le
  plus grand, dans une colonne où les deux se touchent presque. Les trois sont
  passés à `rounded-lg` via une constante `RAYON_BOUTON` dans `AuthShell.tsx`.
  Coque, champs et boutons rendent aujourd'hui une seule courbe sur `/auth/login`,
  `/auth/signup` et `/auth/forgot-password` (vérifié au navigateur).

  ✅ **La passe motion est passée (2026-09-17)** : le soulèvement au survol a été
  retiré des trois boutons Auth (motif S1), et avec lui tous les
  `hover:-translate-y-*` / `whileHover y` du produit — boutons, cartes, chips.
  Le feedback de survol est désormais : bouton = fond + ombre (canon
  `Button.tsx:209`), carte = `CARD_HOVER` (filet + fond, ni ombre ni
  soulèvement), chip = fond (tone maps).
  ⚠️ **Corrigé le 2026-09-09 : l'affirmation « `rounded-full` = 50 %, cercle » était fausse.**
  Mesuré dans le CSS livré, Tailwind v4 génère `rounded-full: 3.40282e38px` — l'infini d'un float,
  pas un pourcentage. Sur un rectangle, le navigateur plafonne tout rayon à la moitié de la plus
  petite dimension : **`rounded-full` et `rounded-pill` rendent donc exactement pareil**. La
  préférence pour `rounded-pill` reste, mais pour une raison de vocabulaire — c'est le token TLS,
  donc la valeur se change en un seul endroit — et non parce que le rendu diffère.
  ⚠️ Même famille de piège pour **`rounded-3xl`** : il n'est pas défini dans `index.css`, mais
  Tailwind en fournit un défaut à `1.5rem` = **24 px**, soit exactement `--radius-2xl` — doublon de
  vocabulaire, pas de rendu. *(Ses 22 usages ont disparu depuis : 0 occurrence au 2026-09-14.)*
- **Ombres** : `shadow-card` / `-hover` / `-lift` sont **neutres (noir), volontairement** — ce sont les fallbacks des cards **SANS `tone`**. Dès qu'un `tone` est posé, `Card.tsx` bascule sur `--shadow-brand|warm|sun-*` (maps `CARD_SHADOW_*`). Une valeur ambrée par défaut collisionnerait avec le tone `warm`.

---

### Le bouton — `emphasis` × `tone`, et le contrat par niveau (2026-09-17)

**L'API publique de `Button` est la grille.** `emphasis` dit COMBIEN le bouton
insiste (`solid` · `soft` · `outline` · `ghost` · `link`), `tone` de quelle
couleur (`brand` · `warm` · `sun` · `danger` · `neutral`). Les treize `variant`
historiques restent supportés mais sont **dépréciés** : ce ne sont plus que des
coordonnées dans la table `VARIANT_ALIAS`. `primary` = soft/brand · `ghost` =
outline/brand · `glass` = solid + `onDark`.

⚠️ **Pourquoi la dépendance a été inversée, et pas seulement renommée.** La
bascule du 17/09 a changé ce que rendait `variant="primary"` en modifiant la
chaîne de classes sous ce nom. La case `solid`/`brand` de la grille pointait sur
cette chaîne : elle a suivi en silence. Mesuré sur `/website`, le CTA principal
de la page d'accueil, qui déclare pourtant `emphasis="solid"`, rendait
`#e8f4f7` — le teinté de l'app — et les deux CTA du hero étaient devenus
indiscernables. **Un nom ne doit jamais porter de classes ; seule la grille le
peut.**

| niveau | fond | label | filet | contrat mesuré |
|---|---|---|---|---|
| `solid` | cran **700**, opaque | blanc | aucun | blanc sur 700 : 5,02 · 6,31 · 4,88 · 5,15. Le 600 rate (3,66) |
| `soft` | cran **50**, **opaque** | 800 | 700 | labels 6,31 · 9,49 · 7,64 |
| `outline` | transparent | 800 | 700 | — |
| `ghost` | transparent | 800 | **aucun** | le fond n'arrive qu'au survol |
| `link` | aucune boîte | 800 | — | — |

⚠️ **Le fond du niveau `soft` est OPAQUE et au cran 50 pour les trois tons.** Un
fond translucide laisse la PAGE changer la couleur du bouton : le CTA warm de
`/website`, posé dans une bande `bg-ink-900`, composait à `#bda79c`, un mastic
brunâtre. Et le cran 100 n'est pas un pas régulier d'une famille à l'autre —
mesuré en ΔE contre le blanc, primary-100 vaut 9,7 quand secondary-100 vaut 19,5
et accent-100 20,7, donc le bouton warm se détachait deux fois plus que le teal.
Le cran 50 est régulier : 6,4 · 6,9 · 6,3.

⚠️ **Le survol d'un `solid` FONCE (700 → 800), il n'éclaircit pas.** L'ancien
`hover:bg-primary-500` faisait tomber le label blanc de 3,66 à 2,94 : le bouton
devenait moins lisible au moment précis où on allait le presser.

**`onDark` n'est pas un ton, c'est une affirmation sur la surface — et elle se
vérifie.** Le nom `glass` décrivait une MATIÈRE, donc rien ne pouvait contrôler
où on la posait : mesuré le 17/09, **26 boutons « verre » vivaient sur un hero
clair**, blanc sur blanc à 1,03, et c'était l'action principale de vingt pages.

⚠️ **Le niveau `onDark solid` est un verre CLAIR À ENCRE FONCÉE.** Il portait
`bg-white/20` + `text-white` — un voile clair sous un texte clair, la
contradiction que ce fichier nomme déjà pour le compteur de la nav. Mesuré :

| voile + encre | ink-900 | p-800 | p-700 | p-600 | p-500 |
|---|---:|---:|---:|---:|---:|
| blanc/20 + blanc *(avant)* | 7,46 | 4,36 | 3,42 | 2,73 | 2,31 |
| **blanc/85 + ink-900** *(après)* | **10,65** | **11,34** | **11,72** | **12,03** | **12,34** |

⚠️ **Contrat de surface des deux niveaux restés en blanc** (`onDark outline` et
`onDark ghost`) : ils demandent un fond au **cran 700 ou plus sombre**. Un hero
qui descend au 500 ne peut porter aucun label blanc, quel que soit le bouton —
c'est le fond qu'il faut remonter.

**Padding horizontal** : `px-stack` (16) · `px-stack-md` (20) · `px-stack-lg`
(24) · `px-7` (28). L'invariant qui range les crans est le rapport du padding à
la POLICE du label — 1,23 · 1,33 · 1,50 · 1,47 — et non à la hauteur, qui dérive.
⚠️ Le 28 de `xl` est hors échelle et c'est écrit plutôt que corrigé : 24
donnerait 1,26 quand `lg` est à 1,50, donc le plus grand bouton paraîtrait plus
serré que celui d'en dessous.

**Navigation — l'état sélectionné, et pourquoi les deux barres ne se ressemblent pas.**
`Sidebar` (bureau) et `BottomNav` (mobile) gardent **deux registres distincts**,
décidé le 2026-09-16 : rangée pleine en dégradé saturé d'un côté, pastille pâle
derrière l'icône de l'autre. C'est un choix, pas une dérive — ne pas « unifier »
sans revenir dessus.

⚠️ Ce qui A été corrigé le même jour, ce sont **quatre échecs de contraste**
(SC 1.4.3), tous mesurés au navigateur :

| Surface | Avant | Après |
|---|---|---|
| Bureau — label blanc sur le **début** du dégradé | `from-primary-500` → **2,94** ✗ | `from-primary-700 to-primary-800` → **5,02 → 7,08** ✓ |
| Mobile — label actif sur blanc (11 px) | `text-primary-600` → **3,66** ✗ | `text-primary-700` → **5,02** ✓ |
| Compteur inactif sur `primary-100` | `text-primary-700` → **4,11** ✗ | `text-primary-800` → **5,79** ✓ |
| Compteur actif, voile sur le dégradé | `bg-white/25 text-white` → **3,11** ✗ | `bg-white/90 text-primary-800` → **6,26** ✓ |

**`primary-500` ne porte de texte dans aucun sens** : blanc dessus 2,94, et
`primary-900` dessus seulement 3,90. C'est un demi-ton — ne jamais y poser de
texte, quelle qu'en soit la couleur.

Le dernier cas était contradictoire par construction : un voile blanc **éclaircit**
le fond, alors que du texte blanc réclame du sombre. Poser un voile clair et du
texte foncé, ou l'inverse — jamais les deux clairs.

✅ **Résolu depuis (vérifié le 17/09)** : les deux barres consomment désormais
**une seule liste**, `src/config/navigation.ts` (`NAVIGATION_PRINCIPALE` ;
`NAVIGATION_BARRE_DU_BAS` en est un filtre). « Accueil » vs « Tableau de bord »
n'est plus une dérive mais un champ assumé (`labelCourt`), documenté dans le
fichier. Et le rail s'anime (`transition-[width] duration-slow` — c'est lui qui
bouge, les rangées suivent). L'entrée précédente décrivait l'état d'avant le
commit `e4a2286`.

**Layout** : `PageShell width="page"` = conteneur canonique des pages principales ; padding responsive standard `px-4 sm:px-6 lg:px-10`. Les viewers modaux gardent leurs `max-w` étroits (lisibilité).

**Zones sûres (mobile, mode autonome)** — le manifest déclare `display: standalone`,
donc une fois l'app installée elle perd la chrome du navigateur et **les deux
encoches deviennent réelles**. Le `<main>` porte `pt-chrome-safe` et
`pb-nav-safe`, qui additionnent la réserve fixe et l'`env(safe-area-inset-*)`.
Sans elles, la BottomNav (56 px + barre d'accueil ≈ 90 px) débordait de 26 px sur
un contenu qui n'en réservait que 64.
⚠️ **Ces deux utilities portent leur media query en dur.** Une utility écrite à la
main ne reçoit aucune variante Tailwind — ni `md:`, ni `max-md:` — et, à
spécificité égale, elle est émise APRÈS le bundle Tailwind, donc elle bat un
`md:pb-0` et fuit sur le bureau. Même famille de piège que les `duration-*` et
`shadow-*` custom. Ne jamais leur écrire de préfixe à l'usage.

**Piège Tailwind v4 — arbitrary property** : `className="[grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]"` plutôt qu'un `style={{}}`. ⚠️ Pas d'espace autour du `:` ni dans `minmax()` — sinon le parser splitte.

### Requêtes de conteneur — un composant mesure sa boîte, pas la fenêtre

Un composant de contenu ne sait pas où il est posé : pleine page, colonne étroite
d'une mise en page à deux volets, corps d'une modale. Réglé sur la fenêtre, il se
trompe partout sauf dans le cas pour lequel on l'a réglé. Constaté sur `CardGrid`
le 2026-09-09 : à 652 px de fenêtre elle faisait 596 px de large et n'affichait
**qu'une colonne** — une carte de 596 px seule sur sa ligne — parce que le seuil
`md:` est à 768 px de fenêtre. La place tenait deux colonnes de 282.

**Qui garde les variantes de fenêtre** : la chrome de l'application — `Sidebar`,
`PageShell`, `BottomNav`, `ViewerOverlay`. Elles connaissent légitimement la
fenêtre, c'est leur rôle. **Qui passe au conteneur** : tout composant de contenu
posable ailleurs — grilles, cartes, en-têtes de section.

⚠️ **Deux boîtes, toujours.** Une requête de conteneur remonte à l'ancêtre le plus
proche qui en est un — **jamais à l'élément qui la porte**. `@container` et
`@xl:grid-cols-2` sur la même div ne produisent rien (mesuré : la grille restait
à une colonne à 596 px pour un seuil à 576).
```tsx
<div className="@container w-full">        {/* le conteneur mesuré */}
  <div className="grid @xl:grid-cols-2" /> {/* répond à SA largeur */}
</div>
```

⚠️ **Les crans `@` ne sont pas ceux des variantes de fenêtre.** Ils viennent de
l'échelle `--container-*` : `@sm` 24rem · `@md` 28rem · `@lg` 32rem · `@xl` 36rem ·
`@2xl` 42rem · `@3xl` 48rem · `@4xl` 56rem · `@5xl` 64rem. Nos tokens sémantiques
en ajoutent : `@content` 48rem · `@medium` 64rem · `@page` 72rem · `@wide` 80rem.
Ne jamais transposer un seuil de fenêtre tel quel — le choisir sur la largeur de
contenu visée.

⚠️ **`container-type: inline-size` mesure la boîte de CONTENU, pas la boîte
externe.** Le padding du conteneur décale donc tous ses seuils. Constaté sur
`ResumeLessonCard` : avec 24 px de padding de chaque côté, un cran posé à `@xl`
(576 px) ne se déclenchait qu'à 624 px de carte — et la carte du tableau de bord
en fait 596, donc elle avait silencieusement perdu sa mise en ligne. Toujours
retrancher le padding avant de choisir le cran, et **mesurer après**.

**Colonnage des grilles** : ne pas écrire de seuils à la main, consommer
[`src/lib/grid-columns.ts`](../../src/lib/grid-columns.ts) — `GRID_COLS_CONTENT` pour
des cartes (260–400 px), `GRID_COLS_TILES` pour des tuiles (150–200 px), et
`GRID_CONTAINER` pour le wrapper.

**ErrorPage** (`patterns/ErrorPage.tsx`) : pattern canonique des pages d'erreur (props `code/title/description/suggestions/primaryAction/tone`), tone `default` | `danger`. API dans le fichier.

## Collections — une liste n'est pas une pile de cartes (arbitrage n°5, 2026-09-23)

**Une collection d'objets du même type se rend en rangées dans UNE carte**
(une coque, des séparateurs `divide-y`), **et en table (`DataTable`) dès qu'on
doit trier ou comparer.** Une carte dit « objet autonome » ; dix cartes
empilées disent « collection » sans en avoir les moyens — pages longues
(10 apprenants = 2 840 px sur l'ancien tableau de bord coach), hiérarchie
plate, tri impossible. Les grilles de cartes restent justes pour des objets
qu'on choisit plutôt qu'on parcourt (parcours, ressources).

## Cards — conventions tone-aware

Tous les composants card sont tone-aware (`tone: primary/warm/sun`). **Source de vérité unique des maps de tone** : `src/lib/tone-classes.ts` (`TONE_BG_50`, `CTA_SHADOW_HOVER_MD`, `TONE_CTA_TEXT`, `ACTION_BTN_TONES`, `TONE_BORDER`, `SURFACE_DIVIDER`) — importer, **jamais** redéfinir inline.

- **CTA** : `min-h-touch` (44px), `focus-visible` sur le bouton (pas la card root), contraste AA.
- **Icônes** : Lucide uniquement, couleur via `TONE_CTA_TEXT[tone]`.
- **Métadonnées** : préférer `<MetaPillGroup>` au texte inline.
- **Surfaces** : `card` / `tinted` / `glass` / `frosted` — divider adapté via `SURFACE_DIVIDER[surface]`.
- `AstucesCard` : `border-2` volontaire (distinction visuelle tips), ne pas unifier sans revue design.
- **Rayon** : `rounded-xl` (20 px) depuis le 2026-09-16 — voir la section Rayons.
- **Survol** (règle du 2026-09-16, `CARD_HOVER` / `CARD_HOVER_NEUTRE` dans `tone-classes.ts`) : le filet se ferme d'un cran et le fond prend une teinte très légère. **Pas de soulèvement, pas d'ombre** — une carte ne porte plus d'ombre depuis S2 (09/09). `CARD_SHADOW_HOVER_*` est déprécié.

**Padding intérieur — révisé le 2026-09-23 (arbitrage n°4) : `p-stack-lg` (24 px)
au canon, `p-stack-md` (20 px) en unique dérogation dense. Pas de troisième
valeur.** À 20, le padding égale le rayon : le coin cesse d'être le point serré.
L'ancienne dérogation à 16 pinçait de 10 %, et l'argument qui la gardait
(« 20 n'existe pas dans l'échelle ») était faux — `stack-md` existe. *(La
doctrine du 09/09, ci-dessous, reste pour la géométrie ; ses valeurs sont
remplacées.)*
L'industrie pose sa carte à 16 px (Material, Bootstrap, Polaris, Carbon, Primer)
— mais avec des rayons de 6 à 12 px, et c'est le rapport du padding au rayon qui
décide, pas le padding seul.

**La règle : le padding ne descend pas sous le rayon.** Un coin arrondi mange de
la place en diagonale — le contenu est à distance P du bord droit, mais sa pointe
approche davantage la courbe. Le coin est un arc de rayon R centré en (R, R), la
pointe du contenu est en (P, P), et il n'y a que deux régimes :

- **P < R** — la pointe est *avant* le centre de l'arc. Le point serré est la
  diagonale, à `R − √2(R − P)`.
- **P ≥ R** — la pointe a *dépassé* le centre. L'arc cesse d'être le point serré,
  c'est le bord droit, à P. **Le coin ne pince plus du tout.**

Le basculement est donc à **P = R**, un rapport de **1,0**.

| rayon | padding | au coin | au bord | |
|---|---|---|---|---|
| 14 (ancien rayon) | 16 | 16 | 16 | rien ne pince |
| **20** (aujourd'hui) | **16** | **14,3** | 16 | pince de 10 % |
| **20** (aujourd'hui) | **24** | **24** | 24 | rien ne pince |
| 24 (`rounded-2xl`) | 16 | 12,7 | 16 | pince de 21 % |

⚠️ **Corrigé le 2026-09-17 — le seuil de « ~1,4× » que ce paragraphe posait
n'existait pas.** Il est apparu le 09/09 au commit `586e53d` et ne s'appuyait sur
rien : ni mesure, ni source, ni entrée du banc de décision du même jour, qui
enregistre pourtant 24 arbitrages et aucun sur le padding. Un nombre d'apparence
précise avait été écrit pour habiller une intuition juste. L'alerte qui en
découlait était à moitié fausse : elle donnait 24 px ET 16 px comme fautifs
depuis le passage de la carte à 20 px, alors que **24 px va parfaitement bien**
— le coin cesse d'être le point serré dès que le padding atteint le rayon. Seul
16 px pince, et de 10 %. C'est le réflexe à retenir : un seuil qu'aucune mesure
n'accompagne est une opinion déguisée en constante.

`Card` tient la décision (`size="md"` par défaut = 24 px). Mesuré le 17/09 :
**197 appels `<Card>`, dont 2 seulement passent un `size` explicite** — les 195
autres prennent le canon. *(Cette ligne disait « 170 des 171 » ; le compte avait
vieilli.)* Les 90 cartes faites main ont été ramenées sur ces deux valeurs.

⚠️ **Le pincement ne compte QUE si le coin est occupé** (mesuré le 17/09). C'est
la moitié manquante de la règle : le dégagement au coin ne décrit un défaut que
si du contenu s'y assied. Sur les quatre tuiles de format du Journal — rayon 20,
padding 16, donc 10 % de pincement sur le papier — le contenu est **centré**, et
l'élément le plus proche est à **95 à 102 px du coin**. Il n'y a rien à pincer.
Toujours mesurer la distance du contenu au coin avant de conclure ; un rapport
padding/rayon fautif sur une carte à contenu centré est un faux positif.

⚠️ **Renversé le 2026-09-23 (arbitrage n°4) — la dérogation dense passe à 20.**
Ce qui suit est l'état du 17/09, gardé pour l'historique. ~~**Tranché le 2026-09-17 : la dérogation dense RESTE à 16 px.**~~ La remonter à
20 la mettrait à égalité avec le rayon, mais **20 px n'existe pas dans l'échelle**
(2 · 4 · 6 · 8 · 12 · 16 · 24 · 32 · 40 · 48) — il faudrait un onzième cran. Ce
que la mesure a rendu :

- **119 éléments** dans `src/` posent un padding sous leur rayon.
- Le cas visé — rayon 20 + padding 16 — en compte **44**, dont **29 dans la
  vitrine et le labo** : **15 en produit**.
- Rendus sur les cinq pages principales : **6 instances**, et **2 seulement**
  ont du contenu dans la zone du coin.
- Le changement est gratuit en mise en page — **8 px de largeur utile en moins,
  aucune croissance de hauteur, aucun reflux, aucune re-césure** (vérifié en
  appliquant `padding: 20px` en direct sur les cibles).

Un onzième cran d'échelle pour deux éléments à 10 % ne se justifie pas.

✅ **Le vrai coupable était ailleurs — corrigé le 2026-09-17.** La carte
utilisateur de la Sidebar était le pire pincement de l'app, et le plus vu :
elle vit dans la chrome, donc elle était sur **toutes** les pages.

| | avant | après |
|---|---|---|
| état déplié (235×66) | `rounded-2xl` (24) pour 12 de padding → **41 %** | `rounded-lg` (14) → **7 %** |
| état replié (48×48) | `rounded-xl` (20) | `rounded-lg` (14) |

L'état replié n'avait aucun problème de coin — padding 0, contenu centré. Il
portait un **troisième rayon** : ni son étage, ni l'exception écrite du bouton
carré à icône seule. Mesuré dans le rail replié, les rangées de nav font 48 px
de haut à rayon 14 et la carte 48×48 à rayon 20 — même colonne, même hauteur,
deux courbes. Et 20 sur un carré de 48 **inversait l'échelle étagée**, puisque
l'objet est plus petit que la rangée dépliée qui, elle, est à 14.

⚠️ **Ne pas « unifier » les deux états sur la pilule.** L'exception écrite vise
le `Button iconOnly` ; ici le bon repère est le voisinage — la carte est la
dernière d'une colonne de rangées à 14.

✅ **Le « plus fort après lui » est tombé aussi** (constaté le 17/09 après-midi,
mesuré au navigateur) : la carte « Session coaching » de `/dashboard` rend
aujourd'hui **20 de rayon pour 16 de padding** — la dérogation dense, dans les
règles. L'entrée précédente (« 24 pour 16, 21 %, non fait ») décrivait un état
déjà corrigé.
