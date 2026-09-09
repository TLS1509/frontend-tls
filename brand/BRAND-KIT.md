# Brand Kit — The Learning Society

> **Fiche unique de marque.** Une page, tout ce qui sert à produire un support TLS
> hors du code : couleurs, typo, logo, ce qui est interdit.
>
> **Dernière vérification de première main : 2026-09-09** (valeurs relues dans
> `src/index.css`, `TlsLogo.tsx`, `public/favicon.svg`, le Brand Kit Canva,
> le Brand Hub Notion et le Drive `TLS — Brand`).

---

## 0. Où est la vérité

Une seule règle, et elle tranche tous les conflits de valeurs :

> **`src/index.css`, bloc `@theme`, fait foi.** Tout le reste — Canva, Notion,
> Figma, Drive, ce document — en est une copie. Une copie qui diverge est
> fausse, pas « une autre version ».

| Surface | Rôle | Statut |
|---|---|---|
| `src/index.css` (`@theme`) | **Source de vérité** des valeurs | 🟢 vivant |
| `brand/BRAND-KIT.md` (ce fichier) | Copie de référence lisible hors code | 🟢 vivant |
| Figma `LccBZ1GKWQVwVzPtsSzk5Y` | Bibliothèque DS **et** identité de marque | 🟢 vivant — 33 pages (§7) |
| Canva Brand Kit `kAGD5yGggy0` | Production de supports | 🟠 incomplet (§7) |
| Notion *Brand Hub* | Vitrine / onboarding équipe | 🔴 périmé (§7) |
| Drive `TLS — Brand` | Dépôt de fichiers livrables | 🟠 partiel (§7) |

---

## 1. Couleurs

### Les trois lumières

La marque tient sur **trois** couleurs saturées. Pas quatre. Tout le reste est
neutre ou tinté clair.

| | Rôle narratif | Base | Texte sur blanc |
|---|---|---|---|
| **Teal côtier** | Progression, concentration, autorité | `#55A1B4` (primary-500) | `#3D7786` (700) |
| **Ambre chaud** | Contact humain, action, encouragement | `#ED843A` (secondary-500) | `#8F5017` (700) |
| **Soleil doré** | Pratique validée, réussite, rareté | `#F8B044` (accent-400) | `#A85F0A` (700) |

> ⚠️ **Piège de contraste.** `primary-600` (#4A8FA1) est à **3,66:1** sur blanc :
> il **échoue** WCAG AA en texte normal. Pour du texte, descendre à `primary-700`
> (5,02:1) ou `primary-800` (7,08:1). Les valeurs 500/600 servent au **remplissage**,
> pas au texte. Idem pour `secondary-600` et `accent-600` : remplissage seulement.

### Échelles complètes

**Teal / primary** — `#E8F4F7` `#DCEBEF` `#B9D7DF` `#96C3CF` `#73AFBF` **`#55A1B4`** `#4A8FA1` `#3D7786` `#2F5F6A` `#1F3E45` (50→900), plus `#164267` (950, navy des héros saturés).

**Ambre / secondary** — `#FFF3EB` `#FDDCC7` `#FCBB93` `#F59A5F` `#F18A4C` **`#ED843A`** `#C06920` `#8F5017` `#5E3710` `#3B2109` (50→900).

**Doré / accent** — `#FFF9EE` `#FFECC8` `#FFD791` `#FFC15A` **`#F8B044`** `#DF9E3D` `#C68D36` `#A85F0A` `#7E4006` `#5F2E05` (50→900).

**Encre / ink** — `#f9fafb` `#f3f4f6` `#e5e7eb` `#d1d5db` `#9ca3af` `#6b7280` `#4b5563` `#374151` `#1f2937` **`#252B37`** `#0f172a` (50→950).
`ink-900` = **`#252B37`**, le gris de texte TLS. ⚠️ Ce n'est **pas** `#1a1a1a` :
cette valeur traîne dans d'anciens SVG de logo et dans de vieux docs, c'est une dérive.

> 🕓 **Décision en cours sur cette rampe.** `ink-50 → 800` et `ink-950` sont aujourd'hui les
> gris Tailwind bruts, avec `#252B37` inséré au milieu — d'où une rampe non monotone
> (`ink-900` est plus clair que `ink-800`). [`docs/_audits/PLAN-REPRISE-DESIGN-2026-09-09.md`](../docs/_audits/PLAN-REPRISE-DESIGN-2026-09-09.md)
> propose de la redériver autour de `#252B37`, qui ne bouge pas. **Tant que le code n'a pas
> changé, les valeurs ci-dessus font foi** — mais ne pas les graver dans Canva avant l'arbitrage.

### Couleurs sémantiques

Palette **muted / coral**, jamais les couleurs Tailwind brutes.

| État | Fond | Texte | Base |
|---|---|---|---|
| Succès | `#E8F2F0` | `#335A56` | `#9DBEBA` |
| Danger | `#FEF4F0` | `#8F2A0E` | `#F28559` — bouton : `#C0432A` (repos) / `#9B2F1B` (pressé) |
| Attention | `#FFF9EE` | `#2f1c13` | `#F8B044` |
| Info | `#E8F4F7` | `#1F3E45` | `#55A1B4` |

> ⛔ **Jamais** `#22C55E` (vert Tailwind), **jamais** `#EF4444` (rouge Tailwind),
> **jamais** `#14b8a6` (teal Tailwind). Ces trois valeurs circulent encore dans
> Notion et dans de vieux docs — elles sont hors marque.

### Fonds de marque

- **Couverture immersive** : linéaire 135° `#2F5F6A → #28525C → #1F3E45`.
- **Contenu pastel** : linéaire 135° `#E8F4F7 → #FBF7F2 → #FFF3EB`.

Pour l'application : gradient vertical bleu → jaune → orange sur les teintes 50.
Pour l'email, l'OG et les documents : **fond clair**, teal en accent, CTA orange —
pas de teal foncé dominant, pas de glass tinté (le glass est réservé à l'app).

---

## 2. Typographie

| Usage | Police | Graisses |
|---|---|---|
| Titres, display | **League Spartan** | 800 (Extra Bold), 700 (Bold) |
| Corps | **Nunito** | 400, 600, 700 |

Les deux sont sur Google Fonts et natives dans Canva. Auto-hébergées dans
`public/fonts/` pour l'app, embarquées dans les `.pptx` de `brand/decks/`.

**Tracking gradué** : h1 −0,03em · h2/h3 −0,025em · h4 −0,02em · corps 0.
Ne jamais aplatir le tracking uniformément sur tous les niveaux.

> ⚠️ **League Spartan n'a aucune face italique.** `font-display italic` produit
> un faux italique synthétique. Pour de l'italique éditorial → Nunito.

---

## 3. Logo

Mark « molécule » : trois branches teal, un nœud orange en haut, un nœud doré en bas,
centre teal clair. Wordmark « The Learning Society » en League Spartan.

### Les 6 variantes (`src/components/ui/TlsLogo.tsx`)

| Variante | Surface | Traitement |
|---|---|---|
| `color` *(défaut)* | Blanc / clair | Multicolore de marque |
| `light` | Dark, glass teal, héros saturés | Tout blanc |
| `primary` | Surface teal tintée | Monochrome teal |
| `warm` | Surface ambrée | Monochrome ambre |
| `sun` | Surface dorée | Monochrome doré |
| `ink` | Impression, haut contraste | Monochrome encre |

**Règles.** Toujours `light` sur fond sombre. Ne jamais recolorer le mark à la main :
étendre la map `PALETTES` dans `TlsLogo.tsx`. Zone de protection = 1 × le diamètre
du cercle central. Taille minimale : 24 px en écran, 12 mm en impression.

### La matière — trois règles, mesurées (2026-09-09)

**1. Un seul axe de lumière.** Dégradé `userSpaceOnUse` sur `(46,8) → (398,394)`,
trois arrêts, appliqué à toutes les formes. Chaque forme reçoit la portion de nappe
qui lui revient selon sa position : le mark est découpé dans une seule feuille de
matière. La pastille centrale suit le dégradé du **corps**, pas une couleur à part.
Aucun sheen, aucune sphère radiale, aucun drop-shadow — le bombé glassy de l'ancienne
version de `TlsLogo.tsx` faisait daté et virait à la bouillie sous 32 px.

**2. Aplat sous 28 px, dégradé au-dessus.** À petite taille le contraste compte plus
que la justesse de la couleur, et un dégradé subtil se referme. `TlsLogo` bascule
tout seul (`material="auto"`), les masters existent dans les deux familles
(`tls-mark-*.svg` et `tls-mark-*-grad.svg`).

**3. Le mark occupe 90 % de sa plaque.** Il ne peint que **35,5 % de sa propre boîte** :
il est ajouré. À 62 % la tuile ne portait que 12,5 % d'encre, là où une icône Apple ou
macOS en porte 26 à 34 % — le problème n'était pas le padding, c'était que la boîte du
mark est presque vide. À 90 % on atteint 26,3 % d'encre et le point le plus exposé
(le nœud gauche, à mi-hauteur) garde 5 % de marge, de quoi absorber la courbe continue
d'iOS. Au-delà de 93 % le masque système commence à mordre.
Le **favicon** fait exception à 94 % : transparent, sans plaque et sans masque, il n'a
aucune marge à préserver.

**L'amplitude du variant `light` est volontairement plus faible.** 12 points de L\*
contre ~20 pour les variantes couleur : sur fond sombre, griser du blanc ne se lit pas
comme de la profondeur, ça se lit comme de la saleté. À 20 le nœud bas vire au gris terne.
Et le mark clair ne tient que sur `primary-700` et plus foncé — sous ce seuil son point
le plus sombre (`#E0E2E3`) tombe à 2,8:1 et le mark se dissout. Détail dans
`brand/identity/logos/_export-light-bleu/LISEZ-MOI.txt`.

### Où le logo est instanciable

| Surface | Quoi |
|---|---|
| Figma | `TlsLogo` (`1119:38`, 6 variantes) — le mark seul, page 🔵 03 · Atoms |
| Figma | `TlsLogoLockup` (`4952:236`, 24 variantes `format` × `variant`) — page 🔷 Logo — lockups |
| Code | `TlsLogo` et `TlsLogoLockup` dans `src/components/ui/TlsLogo.tsx` |
| Fichiers | `brand/identity/logos/svg/` — 30 masters aplat + 30 `-grad` |

Dans Figma, le lockup **instancie** `TlsLogo` : une correction de couleur faite sur le mark
se propage dans les 24 lockups. Ne jamais recolorer un lockup à la main.

> ⚠️ **Deux taxonomies pour les formats, à réconcilier.** Les masters et le component set
> Figma disent `horizontal · vertical-1l · vertical-2l · vertical-3l`. Le composant React
> dit `horizontal · vertical · vertical-3 · horizontal-3` : il lui manque `vertical-2l`,
> et il ajoute `horizontal-3`, qui n'existe dans aucun master. Aligner le code sur les
> masters toucherait une API publique — décision à prendre, pas à trancher en passant.

### Couleurs propres au mark

`#55A1B4` (branches **et** centre) · `#EB7724` (nœud haut) · `#F8B044` (nœud bas).

> ⚠️ `#EB7724` **n'est pas un token** — il n'existe que dans le logo. C'est acceptable
> pour une marque figurative, mais il faut le savoir : ne pas le réutiliser comme
> couleur d'interface, et ne pas le « corriger » vers `secondary-500` sans revue.
> C'est la seule couleur du mark sans variable ; les cinq autres variantes sont
> entièrement liées dans Figma.
>
> `#8DBAC6` a disparu le 2026-09-09 : c'était la pastille centrale, qui suit
> maintenant la couleur du corps.

---

## 4. Formes et matière

- **Rayons** : `rounded-pill` (999 px) sur les boutons et les cards. Jamais
  `rounded-full` (= 50 %, donc un cercle). Échelle : 6 / 8 / 12 / 16 / 24 px.
- **Ombres** : neutres par défaut ; dès qu'un ton est posé, l'ombre prend le ton
  (`shadow-brand` / `warm` / `sun`). Une ombre ambrée par défaut entrerait en
  collision avec le ton `warm`.
- **Icônes** : **Lucide uniquement**. Aucun SVG inline custom pour une icône
  fonctionnelle. Exception : logos et illustrations one-off.

---

## 5. Ton narratif

Quatre tons, un par nature d'écran, **deux maximum par flux** (un dominant, un accent) :

**primary** focus / leadership · **warm** action / parcours · **sun** réflexion /
réussite · **neutral** réglages / utilitaire.

---

## 6. Le pacte anti-générique

*(extrait de [`identity/tls-design-philosophy.md`](identity/tls-design-philosophy.md) — la doctrine complète)*

La marque se définit autant par ce qu'elle refuse :

- **Pas de violet.** Pas de vert. Aucun cyan qui ne soit le teal côtier.
- **Pas de dégradé arc-en-ciel**, pas de vocabulaire « gradient violet » d'IA générique.
- **Pas d'illustration isométrique**, pas de robot, pas de circuit imprimé,
  pas de cerveau 3D, pas de néon cyber.
- **Pas de barre d'accent `border-left`** en tête de bloc, pas d'eyebrow au-dessus
  de chaque section, pas de soupe de cards. Ce sont des marqueurs de production
  automatique.
- **Pas de glassmorphisme par défaut.** Le glass teinté est validé **dans
  l'application**, pas sur les supports de marque ni sur le site.

Registre visé : classe, premium, minimaliste. Éditorial, pas applicatif.

**Photo & illustration** — humains réels en train d'apprendre, lumière naturelle
chaude, diversité non composée. Jamais la poignée de main corporate, jamais le
stock souriant aseptisé. Détail : [`assets/ASSETS-SOURCING-GUIDE.md`](assets/ASSETS-SOURCING-GUIDE.md).

---

## 7. Ce qui diverge aujourd'hui (au 2026-09-09)

Constaté de première main, à corriger sur les plateformes :

| Où | Ce qui est faux | Ce qui est vrai |
|---|---|---|
| **`public/favicon.svg`** | Favicon violet `#863bff` / `#7e14ff` — gabarit d'outil no-code jamais remplacé | Corrigé le 09/09 : c'est le mark. ⚠️ Mais Figma spécifie aussi `favicon.ico` 16-32-48, `apple-touch-icon` 180 et un manifeste PWA 192-512 — **aucun n'existe dans `public/`** |
| **Notion — Brand Hub** | « Error `#EF4444` », « Success `#14b8a6` » | Palette muted/coral (§1) |
| **Notion — Brand Hub** | « CTA `#EB7724`, hover `#F49609` » | `#EB7724` est une couleur de **logo**, pas un CTA. CTA = `secondary-500` |
| **Notion — Brand Hub** | Rayons « 6/8/10/16 px » | 6/8/12/16/24 + pill 999 |
| **Notion — Assets & Templates** | « 63 templates à créer », « 18 templates social » | Aucun n'existe. Roadmap de février jamais exécutée |
| **Canva `kAGD5yGggy0`** | Kit non complété (couleurs/polices/logos à charger à la main) | §1–3 de ce fichier |
| **Figma — couverture** | L'index de la couverture liste 7 sections dont une « 03 · Motion & Effects » qui n'existe pas, et numérote Atoms 04 / Composites 05 | Le fichier a 33 pages : Atoms est **03**, Composites **04**, Motion vit dans Foundations §07, les flows sont 10 pages (05→14). **2 lignes sur 7 sont justes** |
| **Figma — page Logo** | Section `🗄 Anciens tests logo (superseded · supprimable)`, 4200×8000 px, que le fichier lui-même déclare supprimable | À supprimer après accord |
| **Drive `03_Logos/`** | Fichiers nommés `Frame 30.svg`, `Frame 31.svg`, `Untitled design.png` | Convention `TLS_Logo_<variante>_<fond>.svg` |
| **SVG `logos-modernises/`** | Wordmark en `#1a1a1a` | `ink-900` = `#252B37` |
| **`public/og-image.svg`** | Police `Helvetica Neue, Arial` | League Spartan |

---

## 7 bis. Ce que Figma porte déjà — et que rien d'autre ne référence

Vérifié via l'API plugin le 2026-09-09. Le fichier DS n'est pas qu'une bibliothèque de
composants : il contient **l'identité de marque**, et c'est la surface la mieux tenue des cinq.
Ni ce dépôt, ni Notion, ni Canva ne pointaient vers ces pages.

| Page Figma | Contenu | Pourquoi ça compte |
|---|---|---|
| `💠 Brand Identity` (`2717:2`) | Palette · Typographie · Voix de marque · Méthodologie STRIDE · **Direction photo** (2400×1800) · **Brand Kit 2×3** (3200×1800) | Le moodboard demandé existe déjà. Ne pas en refaire un — le faire évoluer |
| `🔷 Logo — lockups` (`4934:2`) | **`TlsLogoLockup`** (component set, `4952:236`, 24 variantes `format` × `variant`) · les 4 formats × 6 variantes en planches · la section « LE MARK — traitement brand kit » | Le seul endroit du fichier où le lockup est instanciable. ⚠️ La ligne précédente citait `🔷 Logo — modernisation` (`3853:26`) : ce nœud **n'existe plus** (vérifié via l'API le 2026-09-09), et le component set qu'elle annonçait n'a jamais existé — il a été créé ce jour-là. |
| `📣 LinkedIn Covers` (`3834:26`) | Repère safe-zone · 16 finales (F1–F4 × Founder/Company × subtil/marqué) · **4 propositions de fond A–D en attente de validation** | Décision en suspens, pas un chantier mort |
| `📊 DS Status & Roadmap` (`3903:26`) | 14 composants, 14 faits en Figma, 10 migrés en code, 79 % de variables | L'état du DS se déclare ici, pas dans un doc |
| `🎨 Moodboard — Reference` (`3636:26`) · `🎨 Modern 2026 — Design Explorations` (`4429:40`) · `🌐 Site — Archétypes & Wireframes` (`4874:2`) | Recherche visuelle et archétypes de site | Point de départ pour la direction créative du site |

### ✅ Contradiction tranchée le 2026-09-09

Le Brand Kit 2×3 et la Direction photo étaient sur fond `#0a1518`, panneaux `#0f2228` : les trois
couleurs n'y servaient que de pastilles pendant que le noir portait le contenu. **Décision de
Chloé : ces planches sont un héritage à refaire, pas une référence.** La règle « fond clair,
trois couleurs saturées » vaut aussi pour les planches d'identité, pas seulement pour les
supports livrés.

- v1 renommées `🗄 … (v1 · dark · superseded)` — conservées, pas supprimées.
- v2 : `06 — Brand Kit 2×3 (v2 · light · 2026)`, fond crème `#FBF7F2`, six panneaux dont trois
  pleins (teal / ambre / doré) et trois clairs. Le mark est une **instance du composant
  `TlsLogo`** du DS, pas un redessin.

⚠️ **La planche « Direction photo » v1 ne contient aucune photo** — neuf aplats de couleur avec
des légendes (« Mentoring · 1-on-1 », « Deep Focus »…). La refaire suppose de sourcer les images
d'abord ([`assets/ASSETS-SOURCING-GUIDE.md`](assets/ASSETS-SOURCING-GUIDE.md)) ; ses principes
sont repris en attendant dans le panneau orange de la v2.

La direction photo de Figma est par ailleurs plus nette que celle du guide de sourcing —
« Candid · Natural light / Warm editorial grain / Human-first · No poses ». À reprendre dans
[`assets/ASSETS-SOURCING-GUIDE.md`](assets/ASSETS-SOURCING-GUIDE.md).

---

## 8. Liens

| Ressource | Lien |
|---|---|
| Tokens (vérité) | [`src/index.css`](../src/index.css) — bloc `@theme` |
| Composant logo | [`src/components/ui/TlsLogo.tsx`](../src/components/ui/TlsLogo.tsx) |
| Doctrine visuelle | [`identity/tls-design-philosophy.md`](identity/tls-design-philosophy.md) |
| Voix de marque | [`../.claude/brand-voice-guidelines.md`](../.claude/brand-voice-guidelines.md) |
| Faits autorisés (interdits marketing) | [`../docs/_canon/FACTS-CANON.md`](../docs/_canon/FACTS-CANON.md) |
| Canva Brand Kit | https://www.canva.com/brand/kAGD5yGggy0 |
| Figma DS (33 pages) | https://www.figma.com/design/LccBZ1GKWQVwVzPtsSzk5Y |
| Figma — Brand Identity | https://www.figma.com/design/LccBZ1GKWQVwVzPtsSzk5Y?node-id=2717-2 |
| Figma — Brand Kit 2×3 (moodboard) | https://www.figma.com/design/LccBZ1GKWQVwVzPtsSzk5Y?node-id=3825-26 |
| Figma — Logo, tailles web | https://www.figma.com/design/LccBZ1GKWQVwVzPtsSzk5Y?node-id=4521-5876 |
| Figma — LinkedIn Covers | https://www.figma.com/design/LccBZ1GKWQVwVzPtsSzk5Y?node-id=3834-26 |
| Drive `TLS — Brand` | https://drive.google.com/drive/folders/18pQPVR2zJLa004pErmtHzuFbOrhJuOZY |
| Notion Brand Hub | https://app.notion.com/p/6500738d039749509296e8bb1010a5cd |
