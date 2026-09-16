# Feuille de route — se former en tranchant les décisions de rayon et de registre

**Écrite le 2026-09-14.** Elle croise les missions *Appliquer* des cours UX/UI
([`chloe/application/cours/`](../../chloe/application/cours/)) avec les décisions
de design encore ouvertes dans `src/`. Trois séances de ~1 h : 30 min de cours,
30 min de chantier réel.

> ⏳ **Ce document a une date de péremption : il meurt quand R2 est tranchée.**
> C'est la raison pour laquelle il vit ici et non dans `chloe/`, dont le README
> interdit l'accumulation de plans — *« un plan périmé se lit comme un plan en
> cours »*.

---

## L'état des décisions de rayon, au 2026-09-14

Lu dans le commentaire de `BASE` de [`src/components/core/Card.tsx`](../../src/components/core/Card.tsx) :

| | Décision | État |
|---|---|---|
| **R1** | Le rayon de référence de la carte = **14 px** (`rounded-lg`), contre 20 avant | ✅ tranchée le 09/09 |
| **R3** | La règle du **seuil** : sous 28 px de haut, la pilule et `rounded-lg` rendent la même forme — donc la pilule reste sous le seuil (Badge, Chip, MetaPill), l'échelle s'applique au-dessus. `<Button>` est passé à `rounded-lg` | ✅ tranchée le 14/09 |
| **R2** | Les **`rounded-2xl` (24 px)** posés sur des conteneurs | ⏳ **ouverte** — 157 occurrences dans 89 fichiers |

`rounded-3xl` et `rounded-full` ont disparu de `src/` (le détecteur compte
**0 rayon hors token**). R2 ne porte donc plus que sur une valeur.

## Le compteur, mesuré le 2026-09-14

`node scripts/check-handmade.mjs` sur 387 fichiers de produit :

| Famille | Faits main | Ce que ça veut dire pour R2 |
|---|---:|---|
| carte | **264** | autant d'objets qui ne recevront aucune décision de rayon tout seuls |
| pastille d'icône | 179 | — |
| ligne de méta | 93 | le registre « donnée » écrit à la main |
| badge d'état | 52 | le registre « état » écrit à la main |
| bouton | 11 | R3 descend mal ici |
| champ de saisie | 8 | — |
| interligne écrasant un pas typo | **494** | le gisement de la séance 3 |

⚠️ **Un chiffre n'est pas un défaut.** Sur 110 cartes faites main mesurées le
10/09, **deux seulement** étaient l'équivalent exact d'une `<Card>` — les autres
portaient un dégradé, du verre ou un ratio que le composant ne couvre pas. Le
détecteur dit *où regarder* ; c'est toi qui décides entre migrer l'élément et
étendre le composant.

---

## Séance 1 · R2 — les 157 rayons à 24 px

**Le cours** (30 min) — [UXUI-C1](../../chloe/application/cours/UXUI-C1-Socle-visuel-typo-couleur-contraste-espacement.md),
Partie 4 (espacement, rayons). Corrigée le 2026-09-14 : elle porte maintenant la
vraie échelle et la raison du 14 px.

**La mission** — la mission d'origine de C1 est un balayage de contraste. Ici, on
garde **la méthode** et on change **l'objet** : un balayage de rayon, un verdict
par élément, mesuré.

1. Prends **10** des 89 fichiers (`grep -rl "rounded-2xl" src/`).
2. Pour chacun, une seule question — celle que `Card.tsx` a déjà écrite :
   **cet objet porte-t-il une bordure de 1 px ?**
   - **Oui** → la courbe de 24 px est trop longue pour un trait fin, le coin paraît
     mou. Candidat à `rounded-lg`.
   - **Non** (surface pleine, dégradé, verre, ombre portée) → c'est l'autre
     registre, celui qui fait *flotter* l'objet. 24 px peut être juste.
3. Classe : ✅ migrer · 🟡 légitime, écrire pourquoi · ❓ à voir au navigateur.
4. Corrige **un** cas ✅, vérifie au navigateur.

**Le piège** — un `sed` sur les 157. Le même piège que le balayage de contraste :
tu casserais les surfaces qui n'ont pas de bordure, et qui ont raison d'être à 24.

**Le livrable** — R2 tranchée **par écrit** dans le commentaire de `Card.tsx`,
au même endroit et dans la même forme que R1 et R3. Une décision qui n'est pas
écrite ne descend pas.

---

## Séance 2 · Les deux registres — Badge crie, MetaPill chuchote

**Le cours** (30 min) — [UXUI-C2, les 4C](../../chloe/application/cours/UXUI-C2-Les-4C.md),
en insistant sur le **C de Contraste** : *« when everything is bold, nothing is
bold »*, et un seul primaire par écran.

**Pourquoi maintenant** — 52 badges d'état + 93 lignes de méta faits main : la
distinction entre **ce qui est un statut** et **ce qui est une donnée** est écrite
à la main à 145 endroits. C'est précisément ce que `CLAUDE.md` demande de lire
d'un coup d'œil : `Badge` crie (capitales, graisse 700, `tracking-label`,
bordure) ; `MetaPill` chuchote (casse normale, graisse 500).

**La mission** — prends **un** écran (Dashboard, une leçon, une carte de parcours) :
1. Compte les éléments qui *crient*. S'il y en a plus d'un par zone, la hiérarchie
   est plate.
2. Pour chaque pastille faite main : est-ce un **statut** ou une **donnée** ?
   Le registre visuel correspond-il ?
3. Corrige la violation **la plus coûteuse** — celle qui empêche de lire la carte.

**Le piège** — confondre « je n'aime pas » et « un C échoue ». La grille sert
justement à sortir du goût.

---

## Séance 3 · Le drift — 264 cartes et 494 interlignes

**Le cours** (30 min) — [UXUI-C3, tokens & design system](../../chloe/application/cours/UXUI-C3-Design-tokens-et-design-system.md).
C'est le mode d'emploi conceptuel de `check-handmade.mjs` : un concept, une
valeur, un endroit ; toute redéfinition est un **alias** ; et `getComputedStyle`
dit la vérité, pas le code lu.

**La mission** — `node scripts/check-handmade.mjs --famille carte --fichiers`,
puis :
1. Prends **3** cartes faites main.
2. Pour chacune : mesure au navigateur (`getComputedStyle(el).borderRadius`,
   `.padding`) — la valeur appliquée est-elle celle attendue ?
3. Tranche, une par une : **migrer vers `<Card>`** (si c'est vraiment une Card) ou
   **étendre `<Card>`** (si le motif — dégradé, verre — se répète et manque).
4. Re-mesure.

**Le second gisement** — les **494 interlignes** qui écrasent un pas typographique.
Même discipline, autre famille : `--famille interligne`.

**Le piège** — ajouter une **troisième** valeur au lieu d'aliaser sur la source
unique. Tu empirerais le drift.

---

## Séance 4 (optionnelle) · Les états

À faire seulement si tu touches aux états de `Button` ou de `MetaPill` clickable —
qui rend désormais un **vrai `<button>`** depuis la Phase 19.A, donc les sept
états s'appliquent pour de bon.

**Le cours** — [UXUI-C5](../../chloe/application/cours/UXUI-C5-Interaction-etats-micro-interactions.md).
**La mission** — les 7 états d'un composant : défaut · survol · actif · **focus** ·
désactivé · chargement · erreur/succès. Les deux qu'on oublie sont focus et
chargement.

---

## Ce que cette feuille de route ne fait PAS

Le **balayage de contraste P0** de
[`chloe/application/AUDIT-UXUI-APP-ET-SITE.md`](../../chloe/application/AUDIT-UXUI-APP-ET-SITE.md)
est un autre chantier, avec un autre critère (taille réelle + fond réel). Ne pas
mélanger : une passe qui traite le rayon *et* la couleur en même temps produit un
diff qu'on ne peut plus relire.

---

## Corrections apportées au corpus le 2026-09-14

Trois valeurs des cours avaient **dérivé du code** — rien d'inventé, c'est le
produit qui a bougé. Corrigées à la source, avec journal :

| Où | Ce que disait le cours | Mesuré |
|---|---|---|
| M01 + C1 | Rayons `sm 6 / base 8 / lg 12 / xl 16 / full 9999` | `xs 4 / sm 6 / md 10 / lg 14 / xl 20 / 2xl 24 / pill 999` (`src/index.css`) |
| M01 + C1 | « Padding minimal des cartes 20 px » | **24 px au canon, 16 px en dense** — et la règle est le rapport padding/rayon (≥ ~1,4) |
| M01 | Tokens `--space-1 … --space-12` | N'existent pas sous ce nom : échelle Tailwind + `--spacing-stack*` sémantiques |
| M02, M04, C3, audit | « > 90 composants (≈ 51 `ui` + 40 `patterns`) » | **212 fichiers, ≈ 254 composants** (85 `ui` + 89 `patterns`) |
| `chloe/README.md` | `UX-UI-BOOTCAMP.md` « encore actif » | Périmé (échéance 31/07/2026, état des lieux démenti) — marqué en tête du fichier |

Ce qui était **juste et le reste** : la règle de contraste (`primary-700` = 5,02:1
comme plancher pour du texte teal, teal de marque décoratif). Les cours et
`CLAUDE.md` disent exactement la même chose.

---

*Feuille de route écrite le 2026-09-14. Chiffres mesurés le même jour
(`check-handmade.mjs`, `grep`, `find`) — aucun repris d'un doc antérieur.*
