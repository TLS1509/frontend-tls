# Audit — liaison aux variables des component sets Figma

**Date** : 2026-09-09 · **Fichier** : `LccBZ1GKWQVwVzPtsSzk5Y` (Design System TLS)
**Méthode** : inspection et écriture node-par-node via `use_figma` (Plugin API).
Les node IDs cités ci-dessous ont tous été réellement ouverts.

## Résultat

| Page | Node ID | Component sets | Peintures liées | Hex bruts restants |
|---|---|---|---|---|
| 🔵 03 · Atoms | `1095:2` | 65 | 2 792 | **1**, assumé |
| 🟢 04 · Composites | `1122:2` | 90 | 4 924 | **6**, assumés |

**41 peintures** portaient un hex brut au départ. Toutes traitées.

### Les 7 exceptions, et pourquoi elles restent

| Node | Couleur | Raison |
|---|---|---|
| `TlsLogo/icon-path` (`1119:5`) | `#EB7724` | Couleur propre au logo, sans équivalent dans la palette. Voir `brand/BRAND-KIT.md` §3. |
| `AuthSocialButton` VECTOR ×6 (`4584:343`) | `#EA4335` `#4285F4` `#FBBC05` `#34A853` `#0A66C2` `#FFFFFF` | Marques Google et LinkedIn. Une marque tierce ne se tokenise pas : la lier à une variable TLS la modifierait à la prochaine évolution de palette, ce que leurs chartes interdisent. |

Le **fond** du `AuthSocialButton` (`4584:332`, `4584:339`) n'est pas la marque : lié à `ink/0`.

## Ce qui a été fait, en trois passes

### Passe 1 — correspondances exactes (22 liaisons)
Le hex était **identique** à une variable existante. Les lier ne change rien
visuellement ; ça ne fait qu'ajouter le lien.
`CorrectionStatusBar` `3921:87` · `AstucesCard` `3922:119` · `ResourceListItem` `3922:4927` ·
`LessonCard` `1140:149` · `AccountFamilyNav` `2730:131` · `FilterChip` `1113:35`.

### Passe 2 — écart sous le seuil de perception (14 liaisons)
ΔE < 2,3, donc de la dérive de saisie et non des choix :
`#f0f1f2`→`ink/100` (12×, `LearningItemCard` `4270:429`) · `#dbebf0`→`primary/100` ·
`#262b38`→`ink/900` (`AccountFamilyNav`).

### Passe 3 — mappées par rôle depuis le code (26 corrections)
Ici la variable la plus proche **n'était pas** la bonne. Chaque cible vient de ce
que le composant React utilise réellement, pas d'une distance colorimétrique.

| Node ID | Nœud | Avant | Après | Source dans le code |
|---|---|---|---|---|
| `1150:13` `1152:34` `1156:86` `1163:35` `1163:50` `1165:47` | badges warm | `#eec29e` | `secondary/200` | `Badge.tsx` — `warm: … border-secondary-200` |
| `1150:23` `1152:10` `1163:18` `1165:67` | badges sun | `#f8d8a0` | `accent/200` | `Badge.tsx` — `sun: … border-accent-200` |
| `4270:413` `4284:359` `4284:379` `4284:417` | `Verrouillé` | `#7c7c7c` | `ink/500` | CTA désactivé — exempté WCAG (SC 1.4.3) |
| `4270:419` `4284:365` `4284:385` `4284:423` | `Ellipse` | `#9c9c9c` | `ink/400` | `LearningItemCard.tsx:218` — `Lock … text-ink-400` |
| `2722:87` | `pill` | `#c9ddd9` | `primary/200` | `CongratulationsCard.tsx:40` |
| `2722:94` | `container` | `#c9ddd9` | `primary/100` | `CongratulationsCard.tsx:47` |
| `1791:21` | `IconFeatureCard` warm | `#ffe5da` | `secondary/100` | `SURFACE_TINTED.warm` |
| `1793:33` | `ResourceCard` warm | `#ffe5da` | `secondary/200` | `ResourceCard.tsx:33` |
| `1205:31` | `ErrorPage` IconBubble | `#fdba74` | `secondary/200` | `ERRORPAGE_TONE.danger` |
| `1205:36` | `ErrorPage` Callout | `#fbbf24` | `accent/200` | `ErrorPage.tsx:307` |
| `2631:27` | `Lire l'article →` | `#a86128` | `secondary/700` | texte warm sur clair : **6,31:1** contre 4,77 avant |
| `2690:56` | `KeyFindingCard` avatar | `#428f73` | `semantic/success-vivid` | les 4 autres tones prennent la signature de leur famille |

> **Deux couleurs identiques, deux cibles différentes.** `#c9ddd9` servait à la fois
> la pilule et le conteneur de `CongratulationsCard`, et `#ffe5da` à la fois
> `IconFeatureCard` et `ResourceCard` — que le code borde différemment. Un mapping
> par proximité les aurait fusionnés à tort. C'est la raison de la passe 3.

**Deux Tailwind bruts éliminés** : `#fdba74` (orange-300) et `#fbbf24` (amber-400),
tous deux sur `ErrorPage`.

## Deux défauts trouvés en chemin, corrigés hors de cet audit

1. **`StepperItem/done`** (`4603:733`) était en `#808080`, un gris placeholder
   étranger au système. Passé sur `primary/600` + `ink/900`, en suivant le motif
   que `Steps` (`1270:150`) utilise déjà.
2. **`TlsLogo`** (`1119:38`) : les 6 variantes uniformisaient les nœuds sur la
   couleur du corps, alors que les masters les différencient d'un cran ; et le
   variant `primary` était sur `primary/500` quand le code est sur `primary/600`
   depuis `0b538ff`. Réalignées sur `brand/identity/logos/svg/tls-mark-*.svg`.
   Détail dans le commit `6989e04`.

## Suite — le lockup devient un component set

La page `🔷 Logo — lockups` (`4934:2`) portait **30 frames statiques et zéro composant** :
rien n'y était instanciable. `TlsLogoLockup` (`4952:236`) a été créé à partir de ces
planches — 24 variantes, propriétés `format` (horizontal · vertical-1l · vertical-2l ·
vertical-3l) × `variant` (les 6).

Deux vérifications valaient le détour :

- **Les frames n'étaient pas périmées**, contrairement à ce qu'on pouvait craindre après
  les corrections du jour. Raison : chaque lockup **instancie** `TlsLogo` (`1119:38`), donc
  les corrections de pastille, de nœuds et de `primary/600` s'y étaient propagées seules.
- **`BRAND-KIT.md` §7bis annonçait déjà un `TlsLogoLockup`** sur `🔷 Logo — modernisation`
  (`3853:26`). Ce nœud **n'existe plus** dans le fichier, et aucun component set de lockup
  n'a été trouvé sur les six pages plausibles (`1093:2`, `1095:2`, `1122:2`, `1281:2`,
  `2717:2`, `4903:2`, `4934:2`). La ligne décrivait donc quelque chose qui n'existait pas ;
  elle est corrigée. Le commentaire de `TlsLogo.tsx` qui annonçait un « miroir 1-pour-1 »
  l'est aussi.

## Ce qui reste ouvert

- **Deux vocabulaires pour un même motif.** `Steps` parle en tokens sémantiques
  (`semantic/info-base`, `text/strong`, `border/strong`) là où `StepperItem` parle
  en rampe brute (`primary/600`, `ink/900`). Les deux sont liés, donc les deux sont
  « corrects » — mais il faudra trancher lequel fait foi.
- Les pages **écrans** (05 à 14) n'ont pas été auditées : seules les deux pages de
  composants l'ont été.
- **Deux taxonomies de format pour le lockup.** Figma et les masters disent
  `horizontal · vertical-1l · vertical-2l · vertical-3l` ; le composant React dit
  `horizontal · vertical · vertical-3 · horizontal-3`. Aligner le code toucherait une API
  publique — décision à prendre.
