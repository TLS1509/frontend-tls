# DESIGN.md — Design system de la Learning App

> **Ce doc répond à une seule question : comment on compose une interface TLS.**
> Les principes, la taxonomie des composants, les patterns canoniques et les
> conventions de surface. Rien d'autre.
>
> **Refondu le 2026-07-28.** Il faisait 862 lignes, dont 64 mentions de phases
> révolues, deux sections numérotées « 4 », deux « 6 » et deux « 7 », un
> processus de synchronisation Notion déclaré obligatoire mais plus tenu, et des
> renvois vers `MIGRATION-PLAN.md` qui n'existe plus. Il racontait l'histoire de
> sa construction au lieu de décrire un état.

### Où trouver le reste — et ce qui est réellement chargé

⚠️ **Ce doc est lu à chaque tâche design. Les autres, non.** Vérifié le
2026-07-28 en exécutant `context.mjs`, le script de la skill `impeccable` : il
injecte **`PRODUCT.md` + `DESIGN.md`**, rien d'autre. `CLAUDE.md` est chargé de
son côté comme instructions projet.

**Donc une règle qui doit s'appliquer partout vit ici ou dans `CLAUDE.md`.**
Un doc que rien ne charge ne porte pas de règle : il porte au mieux un
souvenir. C'est le motif de l'archivage de `DESIGN-IMPECCABLE.md` (voir plus bas).

| Besoin | Doc | Chargé ? |
|---|---|---|
| Règles strictes, tokens, pièges Tailwind, gate de build | [`CLAUDE.md`](./CLAUDE.md) | ✅ instructions projet |
| Stratégie produit, North Star, voix, anti-références | [`PRODUCT.md`](./PRODUCT.md) | ✅ par la skill |
| **Composition d'interface** (ce doc) | — | ✅ par la skill |
| Doctrine longue : altitudes, transparence IA, grammaire de pratique | [`docs/_archive/DESIGN-IMPECCABLE.md`](./docs/_archive/DESIGN-IMPECCABLE.md) | ⛔ **archivé le 2026-09-09** — ses décisions vivantes sont §10 et §11 ci-dessous |
| **Valeurs** des tokens | `src/index.css`, bloc `@theme` | **le code fait foi** |
| Showcase interactif | `/components` dans l'app | ✅ reconstruit (registre + route par catégorie) |

> **Pourquoi `DESIGN-IMPECCABLE.md` a été archivé le 2026-09-09.** Il faisait
> **934 lignes** — le plus gros des quatre docs racine — et **rien ne le
> chargeait** : ni la skill `impeccable` (qui est un outil générique installé
> dans `~/.claude/skills/impeccable/`, sans rapport malgré l'adjectif commun),
> ni les instructions projet. Il redoublait la doctrine de ce fichier sur les
> couleurs, la typographie et l'élévation, et c'est de ce redoublement que
> naissaient les contradictions. **Ses deux sections réellement vivantes — les
> signatures visuelles et les interdits — sont remontées ici, en §10 et §11.**
> Le reste (altitudes, grammaire de pratique, transparence IA, cadence,
> mapping par flux) vit en archive et ne fait plus autorité.

⚠️ **Ce doc ne redéfinit aucune valeur de token.** Toute valeur recopiée ici
dériverait ; c'est exactement ce qui est arrivé au design system parallèle de
`brand/`, où cinq couleurs avaient silencieusement divergé.

### Les fichiers de style — il y en a cinq, et un seul fait foi

| Fichier | Lignes | Rôle | Statut |
|---|---:|---|---|
| **`src/index.css`** | 1048 | Bloc `@theme` = **tous les tokens**, les `@keyframes`, et les utilities que Tailwind v4 ne génère pas (`shadow-*`, `ease-*`, `duration-*`, `bg-gradient-*`) | ✅ **source de vérité unique** |
| `src/styles/globals.css` | 159 | Reset et sélecteurs d'élément, tout en `@layer base`. Importe les deux CSS ci-dessous | ✅ |
| `src/styles/design-tokens.css` | 622 | Alias legacy `--tls-*` pour le BEM résiduel. **Ne doit rien définir de neuf** | ⚠️ contient encore 9 doublons (voir CLAUDE.md, piège #3) |
| `src/components/modals/modals.css` | 387 | Pseudo-éléments et animations de modale | ✅ |
| `src/components/patterns/Flashcard.css` | 93 | Retournement 3D — impossible en utilities | ✅ |

**Il n'existe aucun fichier de tokens en JS ou TS.** Pas de `tailwind.config.js`
(supprimé le 2026-07-23, Tailwind v4 est CSS-first), pas de `theme.ts`, pas de
`spec.json`. Une valeur de design se lit à un seul endroit : le bloc `@theme` de
`src/index.css`.

### Les trois miroirs — ils existent, ils ne font pas foi

« Une seule source de vérité » ne veut pas dire qu'il n'y a pas de ponts vers
l'extérieur. Il y en a trois. Ils sont **en aval** : quand l'un d'eux contredit
`src/index.css`, c'est le miroir qu'on régénère.

| Miroir | État au 2026-07-28 |
|---|---|
| Frontmatter YAML de `DESIGN-IMPECCABLE.md` *(archivé le 09/09)* | ✅ **26/26 couleurs conformes**, vérifié le 28/07 |
| **Figma Code Connect** | 🟡 **amorcé, pas déployé** — `@figma/code-connect` est bien en dépendance, mais un seul composant est mappé : `src/components/core/Button.figma.tsx` (fichier `LccBZ1GKWQVwVzPtsSzk5Y`, node `1109:58`), écrit le 2026-07-24. **1 sur 320.** Aucun script npm pour le publier |
| **Claude Design** (`claude.ai/design`) | 🟠 **riche mais figé au 2026-07-24** — projet « The Learning Society Design System » : ~60 composants `.jsx`, 11 feuilles CSS, les fontes, un audit de variables Figma d'avril |

⚠️ **Le miroir Claude Design a déjà dérivé**, et c'est instructif sur le
mécanisme : il porte encore l'échelle `--skill-level-*`, les ombres au vert
Tailwind brut `#22C55E`, l'échelle `--backdrop-blur-*`, le barème de z-index en
1000, deux copies de `spec.json` et trois feuilles CSS (`utilities.css`,
`components.css`, `patterns.css`) — **toutes supprimées du dépôt depuis**. Un
miroir ne signale jamais qu'il est périmé ; il faut le regénérer, ou aller lire
le code.

---

## 1. Les six principes

1. **L'apprenant est protagoniste.** Chaque écran apprenant répond à « quelle est
   mon action maintenant ? » en moins de trois secondes. Action du jour en hero,
   historique secondaire, analytics tertiaire. Aucun écran ne sert deux rôles.
2. **L'IA est un instrument transparent, jamais un spectacle.** Label « IA »
   visible, source citée, score de confiance, bouton d'override accessible.
   Aucun dégradé violet « intelligence », aucune sparkle décorative.
3. **Une altitude par viewport.** Stratégique (CLO, manager) **ou** opérationnel
   (coach, apprenant), jamais les deux dans la même surface.
4. **La pratique validée prime sur la complétion.** La hiérarchie visuelle
   privilégie la preuve d'exécution. Les barres de progression de cours sont
   secondaires. Le Passeport est la source de vérité, pas le taux de complétion.
5. **La cadence hebdomadaire est respectée.** Pas de streak punitif quotidien,
   pas de notification le week-end par défaut, pause et reprise de première
   classe. L'atrophie se signale calmement, jamais en rouge.
6. **La chaleur est le fossé concurrentiel.** Le défaut de la catégorie est
   froid (LMS entreprise) ou froidement malin (SaaS IA). TLS gagne en étant
   chaleureux **et** rigoureux.

### La grammaire de la pratique

Verbes approuvés : *reprends, valide, soumets, maîtrise, pratique, réfléchis*.
Verbes bannis : *visionne, termine, complète, suis, consomme*.

Ce n'est pas cosmétique : le vocabulaire dit si on mesure une consommation ou
une maîtrise.

### Les quatre tones

| Tone | Rôle |
|---|---|
| **primary** | Cœur de l'app, focus, leadership |
| **warm** | Action, parcours en cours, jalons |
| **sun** | Réflexion, accomplissements, célébrations |
| **neutral** | Réglages, utilitaire, surfaces calmes |

Deux tones simultanés au maximum dans un même flow : un dominant, un accent.

---

## 2. Ce que les tokens couvrent

Les **valeurs** sont dans `src/index.css`. Ce qui suit dit seulement quoi
utiliser et quand.

**Couleurs** — quatre échelles 50→900 (primary teal, secondary orange, accent
jaune, ink gris) plus les sémantiques success/danger/warning/info, en teintes
sourdes et corail, jamais en primaires RGB.

**Typographie** — `font-display` (League Spartan) pour les titres, `font-body`
(Nunito) pour le texte, `font-mono` (JetBrains Mono) pour le code. Trois échelles :
titres `text-h1` → `text-h5`, texte `text-body-lg` → `text-micro`, et une échelle
d'affichage `text-display-xl` / `-lg` / `-md` réservée aux heros. Plus
`text-stat-value` pour les chiffres de KPI.

🚧 **Les tailles de titre et de corps sont en cours d'arbitrage** au banc d'essai
`/_design-lab` (sections *Tailles*, *Graisses*, *Taille optique*). Ne pas figer
d'échelle typographique dans un composant tant que l'arbitrage n'est pas rendu.

**Espacement sémantique** — `tight` · `stack-xs` · `stack` (défaut) ·
`stack-lg` · `section` · `section-lg` · `page`. **Toujours préférer le token
nommé à un `gap-4/6/8` générique** : il exprime l'intention plutôt qu'une valeur.

**Rayons** — `xs` · `sm` · `md` · `lg` · `xl` · `2xl` · `pill` (999 px).
⚠️ `rounded-pill`, jamais `rounded-full` qui vaut 50 % et produit un cercle.

**Ombres** — échelle neutre `xs→xl`, plus les teintées `shadow-brand-*`,
`shadow-warm-*`, `shadow-sun-*`. Les cards sans `tone` prennent la neutre, celles
avec un `tone` basculent sur la teintée correspondante.

**Profondeur** — `z-sticky` (20) · `z-dropdown` (30) · `z-overlay` (40) ·
`z-modal` (50) · `z-toast` (60) · `z-tooltip` (70). Jamais de valeur arbitraire.

**Opacité** — `/faint` · `/soft` · `/tinted` · `/medium` · `/disabled` ·
`/overlay`.

**Motion** — `duration-instant` (80 ms) · `duration-fast` (150 ms) ·
`duration-base` (200 ms, défaut) · `duration-slow` (300 ms) ·
`duration-glacial` (600 ms) · `duration-expressive` (800 ms). Courbes
`ease-standard` · `ease-decelerate` (entrées) · `ease-accelerate` (sorties) ·
`ease-emphasis`.

**Gradients de page** — 28 utilitaires `bg-gradient-*` en `@layer utilities`,
organisés en cinq familles : `page-ambient` (+ warm/sun), `brand-deep`,
`soft-pastel`, `cta-{brand|warm|sun|success}` et `bubble-*-light`, chacune
déclinée en variantes de direction (`-v`, `-h`, `-rev`, `-radial`). Utiliser
l'utilitaire pour une page canonique, la composition Tailwind pour de l'ad hoc.

---

## 3. Taxonomie des composants

Treize catégories **cibles**, avec un test d'appartenance simple.

⚠️ **Le showcase `src/pages/Components.tsx` n'est pas à jour** (audit du
2026-07-28) : il déclare **22 chaînes de catégorie**, dont un doublon de casse
(`Prompt Engineering` / `PROMPT ENGINEERING`) et sept catégories hors taxonomie
(`Core`, `Patterns`, `Content`, `EdTech`, `Management`, `IA & Pédagogie`,
`Data Visualization`, `Search & Filters`). Il manque par ailleurs une trentaine
de composants réels. Voir le détail en fin de doc.

```
 1. FOUNDATIONS        tokens + primitives de layout
 2. ATOMS              1 fichier = 1 élément UI indivisible
 3. COMPOSITES         wrappers de groupe (AvatarGroup, MetaPillGroup, Tabs)
 4. HEADERS & SECTIONS heroes · page headers · section headers · wrappers
 5. FEEDBACK           Alert · Toast · EmptyState · Celebration
 6. NAVIGATION         Sidebar · DropdownMenu · Breadcrumb · Tabs · Search
 7. CARDS              contenu unique · KPI · communication · learning · éditorial
 8. LISTS & FEEDS      grilles · fils chronologiques · listes · tableaux
 9. FORMS              formulaires composites (MultiStepForm, FormLayout)
10. LEARNING           gamification TLS (Medal, Quiz, Flashcard, CompetencyMatrix)
11. MODALS             base · booking · confirm/status · célébrations · média
12. AUTH FAMILY        AuthShell + sous-composants (spécification glass-dark)
13. PAGES & TEMPLATES  aperçus au niveau route
```

| Question | Catégorie |
|---|---|
| Élément UI indivisible ? | Atoms |
| Wrapper de plusieurs atomes ? | Composites |
| Hero, titre, structure ? | Headers & Sections |
| Card présentant **un** contenu ? | Cards |
| Collection ordonnée ? | Lists & Feeds |
| Navigation entre pages ? | Navigation |
| Notification, alerte ? | Feedback |
| Overlay modal ? | Modals |
| Gamification pédagogique ? | Learning |
| Formulaire multi-étapes ? | Forms |
| Famille AuthShell glass-dark ? | Auth Family |

---

## 4. Les conventions de card

> 🚧 **Section en cours de révision.** La composition et la hiérarchie interne
> des cards sont à l'arbitrage au banc `/_design-lab` (sections *Composition
> card* et *Variants Card*). Ce qui suit décrit la convention **actuellement
> implémentée**, pas une doctrine figée : les tailles de titre, de corps et les
> rapports de hiérarchie peuvent évoluer.

C'est la partie la plus structurante du système : elle garantit qu'une même card
s'adapte à quatre contextes sans être dupliquée.

### Deux axes obligatoires

Un pattern de card expose **`surface`** et un **état d'interaction**.

Le vocabulaire canonique à quatre valeurs ci-dessous est aujourd'hui porté par
quatre composants — `StatCard`, `ActionCard`, `IconFeatureCard`,
`QuickActionButton`. Neuf autres composants exposent un `surface` avec un
vocabulaire **divergent** (`tinted | plain`, `light | dark`, `solid-white`).
C'est une convergence à faire, pas un état acquis : tout nouveau composant prend
les quatre valeurs canoniques.

| `surface` | Fond | Usage |
|---|---|---|
| `card` (défaut) | blanc + bordure ink-200 | surface neutre standard |
| `tinted` (tone-aware) | `{tone}-50/60` + bordure `{tone}-100` | section thématique |
| `glass` | blanc/60 + flou léger | overlay sur fond coloré |
| `frosted` | blanc/40 + flou moyen + ombre | overlay prononcé (image de couverture) |

| État | Effet |
|---|---|
| Repos | `shadow-xs` ou rien |
| Survol (cards cliquables) | `hover:shadow-md hover:-translate-y-1` + bordure teintée |
| Pressé | `active:shadow-sm active:translate-y-0` |
| Focus | `focus-visible:outline-2 focus-visible:outline-{tone}-500` |
| Désactivé | `opacity-disabled cursor-not-allowed`, sans lift |
| Sélectionné | bordure 2px `{tone}-500` + `ring-2 ring-{tone}-100` |

**Pourquoi.** Une seule card sert la page blanche, la section thématique,
l'overlay de hero et la couverture image. On tune une map de surface, tous les
composants en héritent. Un dev qui connaît `IconFeatureCard` sait coder
`ProfileCard`.

Les maps de tone sont dans `src/lib/tone-classes.ts` — **importer, jamais
redéfinir inline**.

### Variant typé ou `className` ?

Si une combinaison de styles est réutilisée sur **deux instances ou plus**, elle
devient un variant typé. Sinon un `className` ponctuel suffit.

Un `className` bourré de `!important` est le signal qu'il manquait un variant.

### Les deux paires de glass

| Variant | Fond compatible |
|---|---|
| `glass` | **sombre** (hero brand, auth glass-dark) |
| `glass-light` + `glass-light-ghost` | **clair teinté** (Card `surface=tinted`) |

Couplage explicite : fond sombre → `glass`, fond clair teinté → la paire light.
Ce sont des variants du DS, pas des surcharges par page.

### Grilles de cards

`<CardGrid>` expose cinq layouts. **Le choix dépend du type de card hébergée.**

| `layout` | Colonnes | Pour |
|---|---|---|
| `compact` | 2 / 2 / 2 | tuiles denses et courtes |
| `default` | 1 / 2 / 3 | cards non carrées à contenu variable |
| `feature` | 1 / 2 / 4 | catalogue dense |
| **`square-tiles`** | **2 / 3 / 4** | **cards `square` — jamais une seule colonne** |
| `tiles` | 2 / 3 / 3 | mini-cards non carrées |

⚠️ Une card `aspect-square` en simple colonne mobile prend toute la largeur, donc
600 px de haut : un carré géant avec une icône perdue au centre. D'où
`square-tiles`, qui plancher à deux colonnes.

### Alignement dans une rangée

Pour que icône, titre et description s'alignent entre cards de hauteurs
différentes : ancrage haut (`justify-start`, jamais `justify-center`), zone
d'icône à hauteur fixe, et `items-stretch` sur la grille parente.

### Couleurs douces pour icônes et labels

Sur surfaces claires, utiliser les teintes **moyennes** plutôt que 600/700, trop
sombres — surtout pour le jaune : `primary-500`, `secondary-500`, `accent-400`.
Les 600/700 restent justes pour du texte de corps sur fond très clair, où le
contraste prime.

---

## 5. Familles de composants

Les décisions de rationalisation vivent dans [`CLAUDE.md`](./CLAUDE.md), qui fait
foi. En résumé :

- **Badge** — `Badge.tsx` est canonique, trois exports (`Badge`, `StatusBadge`,
  `TrendingBadge`). Ne jamais créer un nouveau fichier badge.
- **Breadcrumb** — `ui/Breadcrumb.tsx` canonique, `variant: simple | nav`.
- **Pills** — cinq composants distincts sur une primitive `Chip` commune. Ne pas
  les fusionner : leurs API diffèrent fondamentalement.
- **Card** — un seul fichier, **dix** variants (`default`, `feature`, `elevated`,
  `interactive`, `glass`, `glass-brand`, `glass-warm`, `glass-dark`, `minimal`,
  `tinted`). `bordered`, `muted` et `sunken` ont été retirés le 2026-07-24, sans
  aucun usage. Tous les wrappers dérivés ont été supprimés.
- **Heroes** — deux patterns : `HeroSection` (actionnable) et `PageHero`
  (éditorial, alias `EditorialHero`).

---

## 6. Tone par domaine fonctionnel

> 🚧 **Table à rejouer.** Elle a été posée cahier par cahier, avant le travail en
> cours au `/_design-lab` sur la hiérarchie des cards et les gris de texte. Elle
> reste la référence tant qu'on n'a pas tranché, mais elle n'est pas gravée :
> deux tones dominants voisins (Parcours et Analytics tous deux `primary`) ne
> distinguent rien à l'usage.

Chaque cahier porte un tone dominant et, éventuellement, un accent. Cette table
n'est pas dérivable du code : c'est une décision.

| Domaine | Dominant | Accent |
|---|---|---|
| Parcours | primary | warm |
| Veille | warm | sun |
| Passeport | primary | sun |
| Onboarding | warm → brand *(une seule transition)* | — |
| Coaching | warm | primary |
| Gamification | sun | primary |
| Enterprise | primary | neutral |
| Journal | warm | sun |
| Masterclass | brand | primary |
| Notifications | neutral | selon le type |
| Analytics | primary | neutral |
| Projets | primary | warm |
| Abonnements | primary | neutral |
| Chatbot | warm | primary |
| Fonctionnalités IA | brand | primary |
| Centre d'aide | neutral | primary |
| Conformité | primary | neutral |

---

## 7. Responsive et accessibilité

**Mobile d'abord.** Colonne unique par défaut. Points de rupture `md` 768 ·
`lg` 1024 · `xl` 1280. Sidebar en tiroir sous 768 px, en ligne à 220 px sur
tablette, 260 px sur desktop avec repli possible.

**Verre.** `backdrop-blur-glass-{light|medium|heavy}` (8 / 16 / 24 px), plus
`backdrop-blur-ambient` (60 px) pour les halos de fond — attention, celui-ci n'a
**pas** de segment `glass` dans son nom. Sur surfaces teintées ou dégradés
uniquement, jamais sur un fond blanc plat où il ne produit rien qu'un coût de
rendu.

**Accessibilité.** Les seuils réels : WCAG 2.2 AA impose 24×24 px, AAA et Apple
imposent 44×44. **Règle TLS : 44 px sur les actions principales, 24 px minimum
partout.** Focus visible obligatoire sur tout élément focusable custom. Ordre de
tabulation logique, Échap ferme les overlays, flèches pour les menus.

⚠️ **Contraste — un défaut ouvert, mesuré le 2026-07-28.** Le bouton primary de
l'app est `bg-primary-600 text-white`, label 15px graisse 600. Mesuré au
navigateur : **3,66:1**. Le seuil des 3:1 ne s'applique qu'au grand texte (≥24px,
ou ≥18,66px en graisse 700) : un label à 15px/600 est du texte normal, donc le
seuil est **4,5:1**. **Le bouton primary échoue AA.** `primary-700` passe à
5,02:1.

Ce n'est pas corrigé : changer le remplissage repeint tous les boutons primaires
de l'app, c'est un arbitrage à rendre. En attendant, ne pas citer `primary-600`
comme une bonne pratique, et n'utiliser du texte blanc que sur `primary-700` et
au-delà.

---

## 8. Pour les assistants IA

1. **Lire `CLAUDE.md` en priorité** — il porte les règles strictes et les pièges.
2. **Espacement sémantique toujours** : `gap-stack`, jamais `gap-4`.
3. **Tokens toujours** : `bg-primary-500`, jamais un hexadécimal en dur.
4. **Le gate est `npm run build`**, pas `npx tsc --noEmit`. Ce dernier ne suit
   pas les références de projet et rate des erreurs que le build attrape.
5. **Vérifier la cascade CSS** avant de conclure qu'un style ne s'applique pas.
6. **Contrôler mobile et desktop** avant de déclarer une page finie.
7. **Aucun nouveau fichier CSS** : tout passe par `@theme` et Tailwind.
8. **Aucun `style={{}}`** sauf valeur calculée au runtime.
9. **Mettre à jour le showcase** `Components.tsx` quand un composant change.

---

## 9. Showcase `/components` — reconstruit

> **Chantier clos.** Ouvert le 2026-07-28 sur six causes mesurées (aucun
> sommaire, une seule ancre sur 8 524 lignes, pas de `scroll-mt`, tout monté
> d'un coup, un chunk de 3,9 Mo servi à chaque visiteur, 320 composants
> exportés pour 185 déclarés), il a été mené à son terme.

Ce qui a changé, et pourquoi ça tient : le catalogue n'est plus écrit **en JSX**
mais dans un **registre de données** (`src/pages/components/registry.ts`). C'était
la cause racine — tant que la taxonomie vivait dans le rendu, la navigation ne
pouvait pas se générer, les ancres non plus, et la couverture ne pouvait pas se
vérifier.

De là découlent : une **route par catégorie**, une **ancre par composant** avec
`scroll-mt` calé sur le chrome, une **recherche globale** qui navigue, et un
**chargement lazy** qui sort le showcase du chunk principal.

**Ce qui reste ouvert** — un test qui compare les exports de `src/components/**`
au registre et échoue sur un composant non classé. Sans ce garde-fou, la dérive
reviendra : c'est elle qui avait produit l'écart de 320 contre 185.

## 10. Les signatures visuelles

> **Remontées de `DESIGN-IMPECCABLE.md` §13 le 2026-09-09**, à l'archivage de ce
> fichier. Ce sont les signatures **positives** du système : ce qui rend une
> interface reconnaissable comme TLS, et pas comme un SaaS clair générique de
> plus. Les interdits, eux, sont en §11.

### 1 — Le verre est un signal, jamais une finition

Le verre marque **une surface qui en recouvre une autre** : modale sur un scrim,
aside collant sur un fil qui défile, card de hero sur un fond teinté, tiroir sur
le canevas.

| Niveau | Usage |
|---|---|
| `glass-light` (flou 8px) | survol de card teintée, recouvrement discret |
| `glass-medium` (flou 16px) | **le défaut** — modales, en-têtes collants, cards de hero |
| `glass-heavy` (flou 24px) | tiroirs, panneaux latéraux au-dessus du contenu |
| `blur-ambient` (flou 60px) | halos de fond marketing uniquement |

**Verre côtier** : quand il est teinté, le verre prend le **tone dominant de la
surface** — teal sur primary, ambré sur le coaching, doré sur la célébration.
Jamais de verre gris neutre : le système refuse le verre sombre froid des SaaS IA.
Le nôtre est chaud, diurne, côtier.

**Anti-patterns** : verre sur verre · verre sur une card plate et statique
(décoratif, donc faux signal) · verre sur un fond très saturé (illisible).

### 2 — Des dégradés ambiants diffus

Les fonds portent des dégradés doux qui **reculent derrière le contenu**. Le
pattern `AmbientBlobs` (deux ou trois grands dégradés radiaux flous en tons de
brume) est le fond signature des heros, des surfaces d'auth et des pages
éditoriales.

**Règles de diffusion** : flou ≥ 60px · opacité ≤ 30 % · position **décentrée**
(haut-droite, bas-gauche) pour que le dégradé soit asymétrique. Pas d'arrêt de
couleur franc, pas de cible radiale, pas de palette holographique. L'ambiance est
« lumière côtière en fin d'après-midi », pas synthwave.

⚠️ **Le hero marketing n'a pas de recette par défaut, et c'est délibéré.** Une
recette prescrite est exactement ce qui a produit douze pages portant le même
fond. Chaque page décide.

### 3 — L'icône Sparkles comme marqueur fonctionnel d'IA

`Sparkles` (Lucide) est **autorisée et utilisée** pour marquer une fonction IA :
icône de tête sur les boutons IA, sur la pastille « IA », en eyebrow des blocs
générés.

Elle n'est **jamais** décorative (scintillement d'ambiance, traînées, halos
« magiques »), jamais combinée à un dégradé violet-cyan, jamais animée en continu,
jamais multipliée en confetti.

La convention a migré : en 2026, les apprenants associent l'étincelle à « fonction
IA ici » comme la loupe à la recherche. La refuser par pureté doctrinale
isolerait TLS dans son propre dialecte.

### 4 — L'animation anthropomorphique du logo

Le logo s'anime **quand le système calcule pour l'apprenant** — positionnement,
matching, génération d'une recommandation, réponse en streaming. Il se comporte
comme un **signe vivant**, pas comme un spinner : ça dit « on y travaille » sans
anthropomorphiser l'algorithme.

⚠️ **État réel : la prop `loading` de `TlsLogo` existe et fonctionne, aucune page
ne la passe** (vérifié le 2026-07-28, toujours vrai au 09/09). C'est une
signature codée et débranchée.

---

## 11. Les interdits

> **Remontés de `DESIGN-IMPECCABLE.md` §11 le 2026-09-09.** Ce sont des règles
> opposables, pas des préférences. Chacune a une raison, et plusieurs ont été
> écrites après avoir vu le défaut en production.

### Ce qu'on fait

- **Un seul niveau d'altitude par écran.** Opérationnel *ou* stratégique, jamais
  les deux. L'écran de correction d'un coach n'est pas son écran d'analytics.
- **La grammaire de la pratique** : *reprends*, *valide*, *soumets*, *maîtrise*.
  Jamais les verbes de consommation passive : *visionne*, *termine*, *complète*.
- **Un tone dominant par écran**, un accent au plus.
- **`tu`** sur les écrans personnels de l'apprenant (dashboard, Passeport,
  journal, lecteur) · **`vous`** partout ailleurs (coach, manager, admin,
  marketing, e-mails).
- **Toute sortie d'IA est étiquetée**, avec sa source et son degré de confiance,
  et un humain peut la contredire.
- **Ombres de survol teintées par le tone** (`shadow-brand-md`, `shadow-warm-md`),
  jamais un gris neutre.
- **League Spartan en display, Nunito en texte** — jamais l'inverse.
- **65–75 caractères** par ligne de texte courant (`max-w-prose`).
- **44 px** (`min-h-touch`) sur toute cible interactive principale.
- **La cadence respecte l'adulte** : pas de streak quotidien, week-end silencieux
  par défaut, pause-reprise de première classe, atrophie calme. Un badge se
  débloque **sans point d'exclamation et sans confetti**.

### Ce qu'on ne fait pas

- **Pas de mélange d'altitudes** dans un écran, ni de trois tons saturés à poids
  égal (l'effet sapin de Noël).
- **Pas de dégradé violet-cyan, pas de mascotte** de chatbot anthropomorphe (pas
  de personnage souriant, pas de persona nommée, pas d'avatar à côté des
  messages). L'icône Sparkles fonctionnelle et le logo animé restent autorisés — §10.
- **Pas de gamification agressive** : anxiété de perte de série, notifications
  rouges urgentes, popups d'XP pavloviens.
- **Pas de `rounded-full` sur un bouton.** C'est le territoire du cercle :
  avatars carrés-ronds et pastilles uniquement. Les boutons prennent la pilule.
  ⚠️ **Mesuré le 2026-09-09 : 204 usages de `rounded-full` dans `src/`** — à
  auditer, l'interdit n'est pas tenu.
- **Pas de couleur saturée hors des trois tons de marque** : ni le bleu Material
  `#2196F3`, ni le vert Duolingo `#58CC02`, ni les défauts Tailwind vifs pour les
  couleurs sémantiques (`text-red-500`, `bg-green-500` sont bannis — utiliser
  `text-danger-fg`, `bg-success-bg`).
- **Pas de serif.** Le système est sans-serif de bout en bout.
- **Pas de verre sur verre**, ni de verre décoratif sur une card statique.
- **Pas de barre d'accent** `border-left` / `border-right` de plus de 1px.
  *(Mesuré le 09/09 : 0 usage décoratif. L'interdit est tenu.)*
- **Pas de texte en dégradé** (`background-clip: text`). Marketing compris, sans
  exception. *(Mesuré le 09/09 : 0 usage. Tenu.)*
- **Pas de bandeau de KPI SaaS** (grand chiffre + petit label + stats + accent
  dégradé), pas de **grilles de trois cards identiques** répétées section après
  section. Varier les tailles et le rythme.
- **Pas de modale en première intention.** Épuiser d'abord le dévoilement en
  place, les tiroirs, la révélation progressive.
- **Pas de `style={{}}`** pour la mise en page, la couleur ou l'espacement.
- **Pas de tiret cadratin ni de point d'exclamation** dans la copy produit
  (sauf confirmation destructive).
- **Pas de notification le week-end** par défaut, pas de compte à rebours ni de
  « offre expire » pour forcer l'urgence.
- **Ne pas modifier les tokens de `src/index.css` sans validation** — un token
  cascade sur 180+ pages.

### La rampe `ink` — trois zones, et une ancre

> **Reconstruite le 2026-09-09.** Avant, c'étaient onze gris Tailwind avec une
> seule valeur maison (`ink-900`) insérée au milieu sans être recalée. La rampe
> n'était pas monotone — `ink-900` était **plus clair** que `ink-800` (14,20
> contre 14,68 sur blanc), sur le cran le plus utilisé du système. Elle est
> désormais dérivée de `ink-900`, à teinte constante 264,1°.

| Zone | Crans | Emploi |
|---|---|---|
| **Surfaces et bordures** | `ink-0` → `ink-300` | fonds, séparateurs. **Jamais de texte.** |
| **La charnière** | `ink-400` | état désactivé, bordure d'interface. **Jamais de texte non plus.** |
| **Le texte** | `ink-500` → `ink-950` | du secondaire au principal |

**Pourquoi ces zones sont écrites ici** : elles ne l'étaient nulle part, et c'est
ce qui a produit 241 usages fautifs de `ink-400` en texte. Rien ne disait qu'un
cran était fait pour une surface plutôt que pour une lettre.

| Cran | Sur blanc | Rôle |
|---|---:|---|
| `ink-400` | 3,01 | désactivé · bordure d'UI — c'est le seuil de WCAG 1.4.11, pas celui du texte |
| `ink-500` | 4,99 | texte secondaire — **passe désormais sur les sept fonds de l'app** |
| `ink-600` | 7,59 | texte secondaire sûr |
| `ink-700` | 10,38 | texte appuyé |
| `ink-800` | 12,46 | texte fort |
| **`ink-900`** | **14,20** | **⚓ le texte principal. C'est l'ancre : ne pas la toucher.** |
| `ink-950` | 17,81 | fond sombre |

⚠️ **`ink-900` n'est pas teal.** Mesuré en OKLCH il est à **264°**, quand le teal
de marque (`primary-500`) est à **216°** : c'est un gris bleu-violet. Le
commentaire du code qui disait « teal-tinted » était faux depuis l'origine, il a
été corrigé. Une variante teal de la rampe a été construite et **écartée** le
09/09 : elle repeignait les 916 usages du texte principal pour un gain purement
esthétique, le contraste ne bougeant pas de plus de 0,16 point.

### Le tracking suit une courbe inverse de la taille

> **Règle posée le 2026-09-09**, après le correctif de `Button.tsx`.

Le tracking (`letter-spacing`) est une **compensation optique**, pas une préférence.
À grande taille, l'espace entre les lettres paraît proportionnellement plus grand
et l'œil voit des trous : on resserre pour rendre au mot sa densité. **Sous 16 px,
l'effet s'inverse** — les lettres ont besoin d'air pour rester distinctes, et les
resserrer les colle.

**Donc : plus le texte est grand, plus on serre. Plus il est petit, moins on serre.**

Les tokens de l'échelle respectent déjà cette courbe, de `-0,03em` sur `display-xl`
à `-0,01em` sur `h5`, et **le corps n'a aucun tracking** — c'est voulu, ne pas en
ajouter.

⚠️ **Ne jamais poser un tracking dans la `BASE` d'un composant à tailles multiples.**
C'est le défaut qui a été corrigé dans `Button.tsx` : `tracking-tight` y était
appliqué aux quatre tailles, dont `sm` à 13 px et ses 227 usages. Si un serrage est
nécessaire pour les grandes tailles, **sa place est dans `SIZE_CLASSES`**, jamais
dans la base.

⚠️ **`tracking-tight` est le défaut Tailwind, pas un token TLS.** Il vaut `-0,025em`,
exactement comme `tracking-headline`. Préférer le token nommé : lui seul dit à quoi
il sert.

### Le bouton — graisse, tailles, seuils

| Taille | Police | Hauteur | Usages |
|---|---|---|---:|
| `sm` | 13 px | 32 px | **227** |
| `md` *(défaut)* | 15 px | 44 px | 214 |
| `lg` | 16 px | 48 px | 71 |
| `xl` | 18 px | 56 px | 10 |

**Graisse : 700 sur toutes les tailles** (décidé le 09/09). Aucun tracking.

⚠️ **Deux points ouverts sur cette table :**

- **`sm` fait 32 px de haut et compte 227 usages.** C'est au-dessus du minimum
  normatif de WCAG 2.2 (24 px) mais en dessous des 44 px que la règle TLS impose
  aux **actions principales**. À auditer : combien de ces 227 portent une action
  principale plutôt qu'une action secondaire dans une zone dense ?
- **`xl` fait 18 px, et il manque 0,66 px** pour que la graisse 700 le fasse
  basculer en « grand texte » au sens WCAG (seuil 18,66 px). À **19 px**, son seuil
  de contraste tomberait de 4,5 à 3,0 — ce qui rendrait le cran 600 des couleurs de
  marque utilisable avec un label blanc. Un pixel qui change la palette disponible.

### Deux interdits que le code ne respecte pas encore

Ils sont ici parce qu'ils sont **mesurés**, pas supposés :

| Règle | État au 2026-09-09 |
|---|---|
| `ink-400` ne porte pas de texte | ⚠️ **355 usages**, dont **241 fautifs** — les 114 autres sont légitimes (états désactivés, glyphes décoratifs) ou hors produit. Depuis la reconstruction de la rampe, `ink-400` vaut 3,01 : utilisable en bordure, toujours pas en texte |
| Texte blanc sur `primary-600` | ⚠️ **3,66:1 — échoue AA.** Le label des boutons est en 15px/600, donc du texte normal : le seuil est 4,5, pas 3,0. `primary-700` passe à 5,02. **Arbitrage ouvert, pas une règle à recopier** : changer le remplissage repeint tous les boutons de l'app |

---

## 12. Décisions de fondation — rendues le 2026-09-09

> **Tranchées au banc [Fondations TLS](https://claude.ai/code/artifact/c94a764a-86e4-4413-a3f9-679824b947b7).**
> Reportées ici parce qu'une décision qui vit dans un navigateur n'est pas une décision.
> **16 rendues · 4 déjà dans le code · 5 encore ouvertes.**
> ✅ = appliqué · 🔨 = tranché, reste à exécuter.

### Typographie

| # | Décision | Choix | État |
|---|---|---|---|
| T1 | La frontière entre les deux familles | **Renommer en `text-editorial-*`** | 🔨 43 usages |
| T2 | Graisse `h3`/`h4` : token 600 vs code 700 | **Le token passe à 700** | 🔨 **0 fichier** — 89 `font-bold` deviennent supprimables |
| T3 | Les deux collisions de taille | **Retirer `h5`**, garder `h4` et `body-lg` | 🔨 19 usages |
| T4 | `body-sm` ou `body` | **Garder 15 px** — c'est déjà le corps réel | 🔨 237 usages repeints vers le bas |
| T5 | `h3` : 22 → 24 px | **Passer à 24**, interligne 32 | 🔨 119 usages |
| T6 | Les usages sous 11 px | **Tout ramener à `micro`** | 🔨 36 usages |
| T7 | `h4` : 18 → 20 px | **Passer à 20**, interligne 28 | 🔨 140 usages |
| T8 | Les deux interlignes hors grille | **Suivre T5 et T7** | 🔨 0 coût propre |
| T9 | `display-xl`/`-lg`/`-md` | **Les retirer** — zéro usage, vérifié trois fois | 🔨 12 lignes |
| T10 | La rampe d'interlignes du corps s'inverse | **Recaler `micro` à 11/18** | 🔨 1 valeur |

> **T5, T7 et T8 forment une grappe.** Bouger les deux tailles fait retomber les deux interlignes
> hors grille sans arbitrage supplémentaire. Les exécuter séparément coûte plus cher.

### Couleur et encre

| # | Décision | Choix | État |
|---|---|---|---|
| C1 | Le site et l'app partagent-ils l'encre ? | **Rampe éditoriale séparée** | 🔨 à créer |
| C2 | La teinte de la rampe du site | **La même que l'app** (264°) | 🔨 suit C1 |
| C4 | Le commentaire faux sur `ink-900` | Corrigé | ✅ |
| C5 | Nommer les rôles de la rampe | Trois zones documentées | ✅ §11 |
| C6 | L'inversion `ink-800`/`ink-900` | Résolue par la reconstruction | ✅ |
| C7 | Reconstruire la rampe | **Variante A — 264°, ancrée sur `ink-900`** | ✅ `index.css` |
| A1 | Les 241 `ink-400` fautifs | **Tout en `ink-600`** — +2,40 de marge partout | 🔨 241 usages |

> **C1 + C2 se lisent ensemble, et c'est une combinaison économique.** Le site reçoit son propre
> vocabulaire (`--color-paper-*`) mais **avec les mêmes valeurs que l'app au départ**. Autrement dit :
> on pose la frontière sans payer la divergence. Le site pourra diverger plus tard — teinte marron
> ou autre — sans toucher à `ink-*` ni repeindre l'app. **À l'exécution, ce sont des alias, pas de
> nouvelles couleurs.**

### Rayons

| # | Décision | Choix | État |
|---|---|---|---|
| R2 | Les 22 `rounded-3xl` sans token | **Les ramener dans l'échelle** | 🔨 ⚠️ **attend R1** |
| R3 | Les 204 `rounded-full` | **Auditer et corriger les fautifs** | 🔨 ⚠️ **attend R1** |
| R4 | `radius-3xl`, doublon de `radius-2xl` | **Retirer le doublon** | 🔨 1 ligne |

### Les cinq encore ouvertes

| # | Question | Pourquoi elle compte |
|---|---|---|
| **R1** | Le rayon de référence : 14, 20 ou 24 px | **La plus rentable** — R2 et R3 sont tranchées mais l'attendent |
| **B1** | La typographie du bouton *(posée le 09/09)* | Le `tracking-tight` de la BASE abîme les 522 boutons `sm` |
| C3 | Rempli ou outline pour les boutons de marque | commande le registre du site |
| A2 | Le bouton primaire de l'app mesure 3,66 | seul défaut a11y restant après A1 |
| A3 | Écrire la doctrine light-only | 1 ligne, ferme un sujet |

---

**Ce qui n'est plus ici, et pourquoi.**
La synchronisation Notion du design system (elle n'est plus tenue), le catalogue
de pages par tier (statut figé à une phase révolue), les inventaires de patterns
avec compteurs d'usage (ils périment à chaque commit), l'historique des phases 10
à 18, et la liste des pièges Tailwind — qui vit dans `CLAUDE.md`, seul endroit où
elle est maintenue.
