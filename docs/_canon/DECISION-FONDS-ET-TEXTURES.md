# Décision — les fonds et textures n'entrent pas dans le design system

**16.09.2026** · Tranché après mesure, pas au jugé. Concerne les 17 SVG de
`brand/assets/patterns/backgrounds/`, importés le même jour dans Figma
(page « 🎒 Brand Assets — importés du dépôt ») pour être regardés côte à côte.

> **Verdict : aucun des 17 ne devient un composant.** Ils restent des assets de
> communication, là où ils sont. La page Figma sert de vitrine et de trace du tri.

---

## Ce qui a été mesuré

**Usage réel dans le dépôt.** Seize des dix-sept n'ont **aucune référence** hors du
guide de nommage. Ni page, ni composant, ni doc ne les appelle.

**Recouvrement avec le code.** Deux des trois familles sont déjà couvertes, en mieux :

| Famille | Le SVG | Ce que le code fait déjà |
|---|---|---|
| 8 blobs | statique, un seul blob, pas de tone | `src/components/patterns/AmbientBlobs.tsx` — trois blobs animés, tone-aware, `pointer-events-none`, apparié au token `bg-gradient-page-ambient` |
| 4 mesh | figé | `src/components/marketing/motion/MeshGradientBg.tsx` — cinq tones, animé, respecte `prefers-reduced-motion` |
| 5 vagues | — | **aucun équivalent** |

**Conformité à la palette.** Chaque vague **interpole trois couleurs hors palette**
entre deux vrais tokens — artefact de générateur :

```
waves-layered-cream-teal    3/6 tokens · hors palette : #438393 #3c7785 #356b77
waves-layered-cream-orange  3/6 tokens · hors palette : #e17d33 #d6762d #cb6f27
waves-layered-teal-dark     3/6 tokens · hors palette : #529caf #4f98aa #4c93a5
waves-stacked-teal          2/5 tokens · hors palette : #478796 #396e7a #2c555f
waves-stacked-golden        2/5 tokens · hors palette : #eb9e3a #dd8c31 #cf7a28
```

---

## Pourquoi les vagues sortent aussi, alors qu'elles sont les seules sans équivalent

C'est la partie qui mérite d'être écrite, parce qu'elle se rejouera.

Les vagues sont tentantes : le design system ne sait pas les produire. Mais **aucune
page ne les demande** — zéro référence, mesurée. Créer un composant pour un besoin qui
n'est pas apparu est exactement ce qui a produit `Pill`, `Tag` et `TrendingBadge`,
supprimés le même jour faute d'usage après avoir encombré la bibliothèque des mois.

**La règle : un motif entre dans le DS quand une surface le réclame, pas quand il
existe.** Si un besoin réel arrive — bandeau de hero, séparateur de section — on
régénère les vagues **sur les crans réels de la rampe** et on en fait un composant à ce
moment-là.

---

## La correction des blobs dorés

✅ **`pattern_blob-golden_bg-v1` et `-v2` — corrigés le 16.09.2026.** Ils posaient un blob
doré sur un fond teal-50, quand les blobs teal et orange ont chacun un fond de leur
propre famille.

Mais la mesure a montré que **changer le fond ne réglait rien** : `accent-400` passait de
**1,66 à 1,78**, très loin des **2,42–2,62** qu'atteignent les deux autres familles. Le
défaut n'était pas le fond mais **le doré lui-même, trop clair**. Les deux sont passés à
`accent-600` (`#C68D36`) sur `accent-50` (`#FFF9EE`) → **2,76**, dans la plage familiale.

| Famille | Blob sur son fond | Contraste |
|---|---|---:|
| teal | `#55A1B4` sur `#E8F4F7` | 2,62 |
| orange | `#ED843A` sur `#FFF3EB` | 2,42 |
| doré *(corrigé)* | `#C68D36` sur `#FFF9EE` | **2,76** |

**Ce que ça a révélé** : la recette de `brand/assets/ASSETS-SOURCING-GUIDE.md` ne
mentionnait que trois couleurs — teal, orange, crème. **Le doré n'y figurait pas** : ces
deux fichiers ont été générés hors procédure. Le guide a été complété, et son teal
corrigé (il disait `#4A8FA1`, les fichiers utilisent `#55A1B4`).

⚠️ **Un asset écarté du DS n'a pas le droit d'être faux pour autant.** Il reste dans la
bibliothèque de marque, et n'importe qui peut l'y prendre pour un deck.

## Un défaut de nommage, non corrigé

« cream » désigne `#FFF3EB`, qui est **`secondary-50`** : un orange très clair, pas une
crème. Le nom ment sur trois fichiers de vagues.

## Deux contraintes de fond, à ne pas réapprendre

- Le fond d'app validé est un **gradient vertical simple en 50-tints**, pas des blobs.
- Les supports de marque veulent un **fond clair, teal en accent** — pas du teal saturé
  dominant, ce que font les deux `gradient-teal-dark`.

---

**Provenance des 17** : ajoutés le 30.06.2026 par le commit `c14a091`, générés avec
[Haikei](https://haikei.app). Recette et crans de couleur dans
`brand/assets/ASSETS-SOURCING-GUIDE.md`.
