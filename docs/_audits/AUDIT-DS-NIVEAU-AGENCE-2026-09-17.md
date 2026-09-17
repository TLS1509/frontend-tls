# Audit du design system TLS — niveau agence · 2026-09-17

**Mission** : relevé mesuré de ce qui n'a pas suivi les décisions du 9–17 septembre, sur trois
surfaces — codebase, docs locales, Figma — puis correction de tout ce qu'une décision écrite
couvrait déjà (demande de Chloé en cours de session : « vérification exhaustive et amélioration
quand possible »). Les arbitrages encore ouverts restent des recommandations, pas des correctifs.

**Méthode** : chaque affirmation ci-dessous a été vérifiée de première main — valeurs **calculées
au navigateur** (serveur de dev, `getComputedStyle`), contrastes lus **par canvas 1×1** (piège
n°6 ter, jamais de regex sur les couleurs), Figma inspecté **nœud par nœud** via l'API plugin
(node IDs cités), compteurs des docs **recomptés** dans le code. Gates avant ET après :
`npm run build` + les trois garde-fous.

---

## 1 · Ce qui tient — vérifié, pas supposé

| Décision | Mesure au navigateur / à l'API | Verdict |
|---|---|---|
| Rayon carte 20 (16/09) | `Card` rend 20 px partout sur `/dashboard` ; Figma `1111:46`, `1111:63`, `1120:66` à 20, liés à `radius/xl` | ✅ tient, code ↔ Figma alignés |
| Échelle étagée (pilule · 14 · 20) | nav 14, boutons 14, champs 14, cartes 20, étiquettes pilule — relevé sur `/dashboard` et `/auth/login` | ✅ |
| Famille champ à 14 (R4 — la famille champ prend l'échelle) | champ auth 52 px de haut à rayon 14 | ✅ |
| Coque Auth unifiée | coque 14 · champ 14 · les 3 boutons 14 — une seule courbe sur `/auth/login` | ✅ |
| Nav AA (16/09, les 4 corrections) | rangée active : blanc sur `primary-700→800` = **5,02 → 7,08** ; BottomNav actif `primary-700` 11 px = **5,02** ; compteur inactif sur `primary-100` = **5,79** ; compteur actif, voile `white/90` + `primary-800` composé sur les DEUX extrémités du dégradé = **6,26 / 6,12** | ✅ les quatre |
| Carte utilisateur Sidebar 14 (17/09) | dépliée 235×66 à 14, repliée 48×48 à 14 | ✅ les deux états |
| Échelle d'espacement 10 crans (16/09) | `@theme` ✓ · **Figma `TLS / Spacing`** porte `stack-3xs` (4) et `stack-sm` (12) ✓ | ✅ code ↔ Figma |
| Une seule liste de nav | `config/navigation.ts` consommée par Sidebar ET BottomNav ; « Accueil » = `labelCourt` assumé ; le rail s'anime | ✅ — l'entrée « reste ouvert » de CLAUDE.md était périmée, corrigée |
| Doublons de tokens (piège n°3) | intersection des noms `design-tokens.css` ∩ `@theme` = **vide** ; `--backdrop-blur-*` : 0 définition, 0 consommateur | ✅ résolu depuis le relevé du 28/07 — CLAUDE.md mis à jour |
| Padding carte canon | `Card md` = 24 px rendu ; Figma `1111:46` md = 24 | ✅ |
| Interdits §11 (barres d'accent, texte dégradé) | 0 usage (grep + garde-fous) | ✅ tenus |

**Fausse alerte évitée** : la sélection de la Sidebar a semblé se figer pendant les tests (aria sur
`/veille`, dégradé resté sur `/coaching`). Reproduit puis infirmé sur routes chaudes : aria, voile
et contenu basculent ensemble en <400 ms — c'était la latence de compilation Vite à froid pendant
la `startTransition` de React Router, un artefact de dev, pas un bug produit.

---

## 2 · L'écart principal : les décisions ne descendaient pas

Le cœur du constat, et il est structurel : **les quatre décisions de septembre sur le survol et
les ombres (S1 09/09, S2 09/09, règle carte 16/09, `CARD_HOVER`) n'avaient atteint que la
primitive**. Tout ce qui ne passe pas par `Card.tsx`/`Button.tsx` a gardé l'ancien
comportement — exactement le mécanisme que `check-handmade.mjs` existe pour signaler, mais les
familles « survol » et « ombre au repos » ne sont pas dans ses signatures.

Inventorié de première main (agent d'inventaire, puis vérifié par échantillon) :

- **~50 cartes** en violation — soulèvement (`hover:-translate-y-*`, `whileHover y`) et/ou ombre
  de survol et/ou ombre au repos. Dont **2 invisibles au grep** : la drop-shadow silhouette de
  `PromptCard` (propriété arbitraire `[filter:…]`) et l'ombre posée **en JS** par
  `PositionnementModal` (`onMouseEnter`).
- **13 boutons faits main** avec le soulèvement que S1 avait retiré du canon — dont les trois
  `Auth*` (documentés « à traiter dans une passe motion » depuis R4).
- **3 chips** (`Chip`, `FilterChip`, hérité par `MetaPill`).
- **4 maps locales d'ombre** dupliquant les maps dépréciées sans les importer (`PageCard`,
  `ActionCard`, `ErrorPage`, `PromptCard`) — invisibles à une recherche par nom.
- Les 3 maps dépréciées de `tone-classes.ts` n'avaient plus **aucun appel**, seulement 6 imports
  morts.

**→ Corrigé aujourd'hui, en totalité** (3 agents + passe manuelle, ~60 fichiers) :
soulèvements et ombres retirés, feedback remplacé par `CARD_HOVER[tone]` / `CARD_HOVER_NEUTRE`
(filet fermé + fond teinté), boutons ramenés au canon (fond + ombre, `active:scale` conservé),
cartes non cliquables privées de tout survol (`Leaderboard`, `LearningPathDetail`,
`ChatHistoryPanel`, `JournalChatCompose`), hairline ajouté partout où l'ombre était le seul
séparateur (marketing). Exceptions préservées : verre (`KeyFindingCard`, overlay du
`LessonPlayer`), modales, mockups décoratifs, indicateur d'état d'`AccountFamilyNav`.
Imports morts et maps dépréciées supprimés (`tone-classes.ts` net de 5 maps).

---

## 3 · Figma — relevé nœud par nœud

Fichier `LccBZ1GKWQVwVzPtsSzk5Y` (« Design System - TLS »), inspecté via l'API plugin.

| Nœud | Constat | État |
|---|---|---|
| `1109:58` Button | **`size=md` à 40 px** (code : 44, `h-touch`) — sm 32 ✓, lg 48 ✓, xl 56 ✓, rayon 14 lié ✓. Et le balayage variante × état a trouvé bien pire — voir §3 bis | ✅ **matrice entièrement refaite à l'identique du code** (demande de Chloé en session) |
| `1111:46` Card | **Deux drop-shadows au repos ET au survol** (S2 et règle du 16/09 jamais descendues) ; le survol ne fermait pas le filet, ne teintait pas le fond | ✅ **corrigé** : ombres retirées des 20+ variantes ; `state=hover` = filet lié à `primary/300` + voile `primary/50` à 30 % (vérifié en capture) |
| `1111:46` Card | Variantes fantômes **`bordered` / `muted` / `sunken`** — retirées du code le 24/07 | ⏳ recommandation (chirurgie de variantes = risque sur les instances, à faire dans Figma même) |
| `1140:149` LessonCard · `1156:82` MagazineCard · `1163:79` JournalEntryCard | Composants complets alors que le code les a **supprimés le 16/09** (commit `165fb47`, 0 consommateur) | ✅ **déplacés** vers `🗄 Archive · superseded (2026-09)` (`4903:2`) |
| `2244:45` AppSidebar | **Nœud fantôme** — ni supprimé ni parenté, 0 instance sur la page Dashboard. Contenu : emojis (🎯💬📓📰🏆🏢), « Mes parcours », entrées mortes (Gamification, Entreprise), « Espace Apprentissage » absent | ⏳ à purger dans Figma (il n'est plus sur aucun canvas ; les écrans ne l'utilisent plus) |
| `1346:2` Badge | Tailles **`sm/md/lg`** (18/18/22 px) — le code dit **`compact/normal/large`** (20 px au cran normal), écart nommage + valeurs. CLAUDE.md avertit explicitement que ces deux vocabulaires ne doivent pas se confondre avec ceux de `Chip` | ⏳ recommandation |
| `1113:24` MetaPill | **Pas d'axe `size`** (h 22) — le code a `sm` (24, défaut) / `md` (30), décision du 14/09 | ⏳ recommandation |
| `1113:35` FilterChip | h 36 — **conforme** : le code lui donne `h-9` (36), cible tactile renforcée, distincte des crans `Chip` 24/30. Première lecture de cet audit l'avait noté en écart, à tort — vérifié au navigateur (« Tout » rendu à 36 px) | ✅ conforme |
| `1270:105` MasteryBadge | rayon **16** — hors échelle (ni 14 ni 20) | ⏳ recommandation |
| Page `2759:2` Dashboard | Écrans **gelés à juillet** (« Jeudi 3 juillet », emojis 📖🎓🎯 dans les cartes là où le code est passé à Lucide) | ⏳ chantier écrans, déjà connu (~20 % de couverture) |
| Page `4126:26` « Cards — Component Library » | **0 composant** dessus | ⏳ page vide à remplir ou à retirer |

**Synthèse Figma** : la couche *tokens* est saine (réalignée le 16/09, vérifiée : rayons,
espacement 10 crans, couleurs liées). La couche *atomes* était à moitié synchronisée — rayons
oui, ombres/survol/hauteur md/couleurs d'état non (corrigés ce jour). La couche *écrans* a deux
mois de retard ; c'est un chantier, pas une correction.

### 3 bis · Le Button, variante × état — la question de Chloé, et sa réponse

Question posée en session : « couleur de police teal pour bouton orange et autres
incohérences — Figma seulement, ou code aussi ? ». Balayage programmatique des 105 variantes
(fond + label + filet, classés par teinte), puis même sonde côté code sur la vitrine rendue
(120 boutons, contraste par canvas composé sur le fond réel).

**Côté Figma — c'était bien cassé, et c'est refait.** Avant correction :

- `outline-warm` : label **teal** `rgb(74,143,161)` sur ses 5 états (code : `secondary-700`) —
  le « teal sur bouton orange » repéré par Chloé.
- **Toute la famille `glass-*`** : label **teal `primary-500`** (2,94:1 — illisible) là où le
  code dit `ink-900` / `ink-800` / `secondary-800` / `accent-800` ; et `glass-warm`/`glass-sun`
  avaient un fond **blanc** au lieu du fond teinté chaud/or du code.
- `glass-brand` : 8 variantes fantômes (retiré du code le 23/07, doublon exact de `ghost`).
- La variante **`glass`** (fond sombre — 31 usages produit, 4ᵉ variante la plus employée)
  **n'existait pas** dans Figma.

**→ La matrice a été refaite à l'identique du code** (demande explicite) : les 13 familles
recalées état par état sur `VARIANT_CLASSES` (repos / survol / actif / focus / désactivé à
opacité 0,5), valeurs liées aux variables TLS, `glass` créée (5 états), `glass-brand` supprimée,
`md` à 44. Vérifié en capture après chaque passe. Piège d'exécution rencontré et contourné :
un paint lié à une variable mais dont la couleur littérale est un fallback peut rendre le
fallback — toujours poser la valeur réelle EN PLUS de la liaison.

**Côté code — les labels sont justes, mais le contraste des remplissages pleins échoue plus
largement que le A2 documenté.** Sur 120 boutons rendus de la vitrine, 16 échecs, tous du même
mécanisme (blanc 13–16 px sur un remplissage 500/600) :

| Fond | Contraste du label blanc | Seuil (texte normal) |
|---|---:|---|
| `primary-600` (variant primary) | **3,66** | 4,5 — le A2 connu |
| `secondary-500` (variant secondary) | **2,64** | 4,5 |
| `accent-500` (variant accent) | **2,31** | 4,5 |
| un filtre actif saturé de la vitrine (dégradé → 600) — le `FilterChip` du système a, lui, un actif doux conforme | **3,66** | 4,5 |
| Boutons d'humeur faits main (RatingModal) | 2,64 / 2,94 | 4,5 |

La doctrine écrite (« texte blanc uniquement sur 700+ ») n'est donc pas respectée par les
variantes `secondary` et `accent` elles-mêmes. **A2 n'est pas un défaut de primary : c'est le
contrat de contraste du niveau `solid` entier** — le trancher une fois règle les trois familles
(la grille `emphasis × tone` attache déjà ce contrat au niveau, pas au nom).

**Variantes sans usage produit** (remarque de Chloé, comptée hors vitrine/labos) : `accent` 0 ·
`outline` 0 · `outline-warm` 0 · `glass-sun` 0 — sur 13. Ne pas les supprimer sèchement : ce
sont des cases de la grille `emphasis × tone` (le contrat vit au niveau). La bonne sortie est la
migration annoncée vers `emphasis`+`tone` puis la dépréciation des noms historiques.

**« Pas de teal tinted-outlined comme l'orange et le jaune ? »** — si : c'est **`ghost`**
(fond `primary-50`, filet `primary-600`, label `primary-800`), la variante la plus employée de
l'app (191 usages). C'est même pour ça que `glass-brand` a été supprimé : doublon exact. La
vraie incohérence est de **nommage** — le même niveau d'emphase s'appelle `ghost` en teal et
`glass-warm`/`glass-sun` en orange/or. Encore un argument pour la grille.

**Miroir Claude Design** (`claude.ai/design`) : figé au 24/07 — il porte encore `TrendingBadge`
(supprimé du code le 10/09) et ignore la carte Sidebar du 17/09. Un miroir ne signale jamais
qu'il est périmé ; à régénérer via DesignSync, ou à dater visiblement.

---

## 4 · Docs — les compteurs recomptés

| Doc | Ce qu'il disait | Ce que le code dit | État |
|---|---|---|---|
| DESIGN.md §4, table des états | « Survol : `hover:shadow-md hover:-translate-y-1` » | l'exact contraire de la règle du 16/09 | ✅ corrigé + note d'avertissement |
| DESIGN.md §5 | « Badge : trois exports (dont TrendingBadge) » · « Pills : cinq composants, ne pas fusionner » | TrendingBadge supprimé le 10/09 ; famille révisée 9→6 | ✅ corrigé |
| DESIGN.md §11 | « Ombres de survol teintées » posé en règle générale | ne vaut plus que pour boutons et verre | ✅ reformulé |
| CLAUDE.md, piège n°3 | « 9 tokens définis aux deux endroits, encore actif » | intersection vide, `--backdrop-blur-*` supprimé | ✅ remplacé par la commande de re-vérification |
| CLAUDE.md, § padding | « Session coaching à 24/16, 21 %, non fait » | mesurée à **20/16** — déjà corrigée | ✅ entrée close |
| CLAUDE.md, § navigation | « deux listes d'entrées séparées, rail non animé » | une liste (`config/navigation.ts`), rail animé | ✅ entrée close |
| CLAUDE.md, § icônes | « 1 037 tailles hors échelle » (état 09/09) | **12** au détecteur (le cran `2xs` 14 px a résorbé l'essentiel) | ✅ recompté |
| Card.tsx (doc dans le code) | seuil « ~1,4× » démenti le 17/09 + rayon « 14 px depuis ce matin » + « 170 des 171 » | géométrie P ≥ R, rayon 20, compteur recalé | ✅ réécrit |
| Brief d'ouverture (9256f1c) | « p-5 : deux composants s'en servent » | **40 usages produit** | ⚠️ voir chantier 5.2 |

---

## 5 · Ce qui reste ouvert — chiffré, pour arbitrage

Trié par ce qui se voit le plus.

**5.1 · A2 — le bouton primaire échoue AA (3,66:1).** Toujours le défaut le plus visible du
système : chaque écran porte un CTA `primary-600` avec label blanc 15 px/700. `primary-700`
passe à 5,02. C'est un arbitrage (repeindre tous les CTA), pas une correction mécanique — mais
il date du 28/07 et chaque nouvelle page l'installe davantage.

**5.2 · Le cran 20 px n'existe pas — et 40 appels s'en servent.** La décision du 17/09 a gardé
la dérogation dense à 16 « parce que 20 n'existe pas dans l'échelle » — mesuré ce jour, **40
`p-5` vivent en produit** (le brief en comptait deux). Soit l'échelle gagne un onzième cran
nommé, soit une passe ramène ces 40 sur 16/24. Les deux membres bulle qui s'en servaient ont été
ramenés à 24 aujourd'hui ; il en reste ~38.

**5.3 · R2 — 135 `rounded-2xl` (24) sur des conteneurs.** La seule décision de rayon encore
ouverte. L'étage conteneur est à 20 ; 24 vit surtout sur modales, heros et pastilles d'icône.
Trancher « la modale/le hero prennent 24 » (un étage au-dessus de la carte) légaliserait
l'essentiel d'un trait.

**5.4 · 219 interlignes écrasent un pas typographique** (détecteur). Les 10 serrages sur du
corps de texte ont été retirés ce jour (dont ceux cachés dans des classes multi-lignes) ; le
reste est surtout du `leading-tight` sur des jetons de titre qui portent déjà leur interligne.
Une passe mécanique possible après l'arbitrage typo du `/_design-lab` (T5/T7 bougeront les
interlignes de toute façon).

**5.5 · Vocabulaire `surface` divergent sur 9 composants** (`tinted|plain`, `light|dark`,
`solid-white` vs le canonique `card|tinted|glass|frosted`) — déjà documenté en DESIGN.md §4
comme « convergence à faire ». C'est un renommage d'API × 9 : mécanique mais large, à faire en
passe dédiée avec la vitrine.

**5.6 · Petites dettes nommées** : `StatusBadge` à 10/12 px sous le plancher d'icônes (14) —
question d'échelle notée dans CLAUDE.md ; `Badge` Figma en `sm/md/lg` (5.3 Figma) ;
`AuthPrimaryButton` vs `<Button onDark>` — la question « que fait-il de plus ? » reste posée ;
l'animation d'entrée du Dashboard laisse la page délavée au premier paint (fondu long + décalé
— vérifié en capture mobile) ; `FloatingNavButton` (raccourci dev) est rendu sur toutes les
pages — à conditionner à l'environnement avant une démo client.

---

## 6 · Gates

| Gate | Avant | Après |
|---|---|---|
| `npm run build` | ✅ 0 erreur (1,63 s) | ✅ **0 erreur** (3,17 s) |
| `check-handmade.mjs` | 14 boutons · 239 cartes · 45 badges · 92 méta · 180 pastilles · 9 champs · 219 interlignes · 12 icônes hors échelle · 0 rayon hors token | 14 · **234** cartes (−5, consolidation bulle) · 45 · 92 · 180 · 9 · **214** interlignes (−5) · 12 · 0 |
| `check-token-coverage.mjs` | ✅ parité 202/192 | ✅ parité complète |
| `check-showcase-coverage.mjs` | ✅ 221 exportés, tous classés | ✅ tout classé |

---

## 7 · Trois recommandations — pas vingt

**1 · Donner au détecteur les deux familles qui viennent de coûter une journée.** Les décisions
« plus d'ombre » et « plus de soulèvement » n'avaient aucun garde-fou : ~50 cartes les ont
ignorées pendant huit jours sans que rien ne le signale. Ajouter à `check-handmade.mjs` deux
signatures — `hover:-translate-y`/`whileHover y` (hors labs) et `shadow-*` au repos sur
signature carte non-verre — et le prochain écart se verra le jour même, pas à l'audit suivant.

**2 · Trancher A2 comme un contrat de niveau, pas comme un cas primary.** Le balayage a montré
que l'échec du CTA (3,66) est le même mécanisme sur `secondary` (2,64) et `accent` (2,31) :
c'est le niveau `solid` entier qui pose du blanc sur des remplissages 500/600. Une seule
décision — « un label blanc exige un remplissage 700+ » ou « le solid garde son 500/600 et le
label devient encre » — règle les trois familles, le filtre saturé de la vitrine et les boutons d'humeur.
Les mesures sont faites ; il ne manque que la décision.

**3 · Traiter Figma comme le code : une source, des étages, un rythme.** La couche tokens est
saine parce qu'elle est régénérée ; les atomes dérivent parce qu'ils sont retouchés à la main ;
les écrans ont deux mois. Décider ce que Figma **promet** (tokens + atomes synchronisés, écrans
= exploration datée, le reste à l'Archive) et purger ce qui ne tient pas la promesse — à
commencer par les 3 variantes fantômes de Card et le nœud AppSidebar. Un DS qui montre des
composants morts fait dériver les maquettes suivantes.

---

*Périmètre non couvert : la couche écrans Figma nœud par nœud (chantier séparé, ~20 % de
couverture connue) ; le contenu rédactionnel des pages marketing ; `CardLab`/`BgLab` (labos).*
