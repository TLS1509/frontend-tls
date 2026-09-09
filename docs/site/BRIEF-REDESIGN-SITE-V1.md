# Brief — Redesign du site V1

> **Écrit le 2026-07-29.** Document de passation : tout ce qu'il faut savoir pour
> reprendre le chantier sans rien deviner. Chaque fait ci-dessous a été **vérifié
> de première main** ce jour-là (code lu, site en ligne ouvert, fichier Figma
> inspecté, mesure au navigateur). Ce qui n'est pas vérifié est marqué comme tel.
>
> **À relire avant d'écrire une ligne** : ce brief, puis
> [`_canon/FACTS-CANON.md`](../_canon/FACTS-CANON.md) §0.

---

## 1. Le fait qui recadre tout

**Le site React sur lequel on travaille n'a jamais été mis en ligne.**

`thelearningsociety.fr` sert aujourd'hui un **WordPress d'avant le repositionnement
SBO**. Vérifié le 29/07 en ouvrant le site :

| | Ce qui est en ligne |
|---|---|
| Technologie | WordPress (Site Kit by Google) |
| Navigation | Accueil · Formation · Accompagnement · Mag' · Contact |
| Accroche | « La formation augmentée par l'IA. » |
| Contact | pointe vers **une page Notion**, pas vers le site |
| Images | **3**, toutes des vignettes `Gemini_Generated_Image_*.png` |

**Conséquence** : le 06/08 n'est pas une refonte, c'est un **remplacement**. Le jour
de la bascule, tout doit tenir d'un coup. Il n'y a pas de version intermédiaire à
laquelle se raccrocher.

### Deux passifs à retirer à la bascule

`thelearningsociety.fr` affiche en ce moment :

- « Formation **Formateur Augmenté** […] notre **programme certifiant** » →
  double infraction au registre : X10 (sujet clos) et « certifiant » non sourcé.
- « La formation augmentée par l'IA » → `PRODUCT.md` dit explicitement que cette
  tagline **n'est pas un actif à préserver**.

---

## 2. Où en est le code

### Le diagnostic structurel

**58 composants de section définis en dur dans 18 fichiers de page. Six seulement
sont réutilisés** (`Hero` ×6, `CtaFinal` ×5, deux ou trois ×2). Soit une
cinquantaine de sections uniques, écrites une fois, jamais revues.

**Il n'existe aucune bibliothèque de composants de site.** L'app en a une (320
composants, un DS Figma, une page showcase). Le site a 7 fichiers utilitaires.

**Les 5 pages principales n'ont aucune image.** Pas une photo, pas une
illustration. Vérifié fichier par fichier.

### Ce qui a été fait le 29/07

**Système d'espacement éditorial** — 7 tokens fluides ajoutés à `src/index.css`,
additifs, sans toucher à l'échelle existante (`gap-stack` est consommé par 290
fichiers de l'app, `gap-section` par 118) :

| Token | Plage | Rôle |
|---|---|---|
| `rule` | 8 → 12 px | étiquette ↔ valeur |
| `group` | 16 → 24 px | blocs d'un même groupe |
| `flow` | 32 → 56 px | titre de section ↔ contenu |
| `band` | 64 → 120 px | respiration d'une section |
| `hero` | 112 → 168 px | haut de hero |
| `chapter` | 96 → 176 px | rupture de mouvement |
| `gutter` | 16 → 40 px | gouttière de page |

**Pourquoi** : l'échelle sémantique plafonnait à 48 px et son plus grand écart
intra-section était 40 px. Le padding *extérieur* des sections valait 112 px. Les
sections respiraient entre elles et étouffaient dedans.

**Échelle typographique éditoriale** — 5 crans fluides avec leurs graisses.
`hero` 44→80 · `section` 32→52 · `title` 26→38 · `feature` 22→30 · `lede` 17→22.

**Pourquoi** : le site portait **28 valeurs `clamp()` distinctes** écrites en dur
dans le JSX, dont trois qui ne différaient que de 0,3 vw. Ce n'était pas une
échelle, c'étaient 28 tailles uniques.

**La coque** — fond ambiant unique au niveau du layout, sections transparentes,
**voile d'opacité de page supprimé**, header aligné sur `max-w-wide` (il était
256 px plus étroit que le contenu), route `pathname === '/website'` en dur retirée.

**Deux pages portées sur le système** : Accueil et Accompagnement. **16 restantes.**

**Correctifs de conformité** : `SEOHead` émettait sur 18 pages sur 19 une
description d'organisation pré-pivot en JSON-LD (« formation certifiante IA pour
formateurs ») ; deux graphies LinkedIn coexistaient ; lien d'évitement ajouté ;
`autocomplete` + `name` sur les 6 champs de Contact ; `color-scheme: light`.

---

## 3. Où en est Figma

### Les fondations sont saines, contrairement à ce que dit la doc

**Fichier `Design System - TLS`** (`LccBZ1GKWQVwVzPtsSzk5Y`) : 32 pages, 4
collections, **164 variables**, **36 styles de texte**, 22 styles de couleur, 25
styles d'effet.

**Diff Figma ↔ code, mesuré le 29/07 :**

| Couche | Comparé | Écarts |
|---|---|---|
| Couleurs | 42 | **0** |
| Espacement sémantique | 7 | **0** |
| Rayons | 7 | **0** |

⚠️ **La doc du projet dit « le DS Figma a dérivé du code ». C'est vrai des
composants et des écrans, c'est faux des tokens.** Cette distinction change où on
peut travailler en confiance.

### Ce qui a été ajouté le 29/07

Les 7 espacements éditoriaux dans `TLS / Spacing` (41 → 48) et les 5 styles
`Editorial/*` (31 → 36), chacun documentant sa formule `clamp()` d'origine et la
mention que la valeur Figma est la borne desktop.

Le mode Dark de `TLS / Colors` est renommé **`Dark · perime (hors code 28/07/26)`** :
il n'a plus d'équivalent dans le code depuis la suppression des tokens dark.

### Deux limites à connaître

**La bibliothèque ne publie que ses composants.** Variables et styles n'étaient
pas propagés au 29/07 en fin de session. Tant que ce n'est pas le cas, tout
travail Figma doit se faire **dans le fichier DS lui-même**, où les variables sont
locales.

**Code Connect est impossible.** L'API répond : *« You need a Dev or Full seat on
an Organization or Enterprise plan »*. L'équipe TLS est en **Pro**. Le fichier
`Button.figma.tsx` et la dépendance `@figma/code-connect` ont été supprimés du
dépôt — ils n'auraient jamais pu fonctionner. Ce n'est pas un manque d'effort,
c'est une limite d'abonnement.

### La matière déjà dessinée

Page **`🌐 Marketing — Site Internet`** (`4098:26`) : **14 explorations de mise en
page**, analysées le 29/07.

- **8 accueils** : V1 Stripe Editorial · V2 Light Minimaliste · V3 Parallax
  3 couches · V4 Editorial Spotlight · V5 FullPage · V6 Editorial Aéré ·
  V7 Cinematic · V8 Watercolor
- **3 Accompagnement** (A1 Services+Timeline, A2 Édito Manifeste, A3 Split
  Livrables) et **3 Learning App** (B1 Mockup Hero, B2 Zigzag, B3 Bento)

**Ce qui en ressort et qui mérite d'être repris :**

- **La séquence numérotée en quinconce** (V3 et V6) — chiffre fantôme, blocs
  alternés gauche/droite. Le motif le plus distinctif de l'ensemble, et **il
  n'existe nulle part dans le code**.
- **Les rangées numérotées à filets** (V4) — déjà reconstruit indépendamment le
  29/07 dans la section Écosystème de l'accueil. Convergence.
- **Le zigzag avec captures produit** (B2) — la seule des 14 qui réponde au manque
  d'images.
- **Le bandeau teal manifeste** (V4) — une bande de couleur de marque plutôt
  qu'une bande noire.

**Ce qui est daté** : V7 et V8 (corps entièrement centré, deux puis trois cartes
identiques), V1 (deux bandes sombres + bandeau de 4 KPI). Et les chiffres **578 /
+93 %** apparaissent dans V2, V5 et A2 : à re-sourcer et **toujours attribuer à
C-Campus**.

---

## 4. La direction artistique

### La thèse

**Le soin doit être dans la matière, pas dans le mouvement.**

C'est la seule direction qui ne contredit pas ce que TLS vend. Un site couvert
d'effets dirait l'inverse du discours : de la surface à la place de la preuve.
Mais un site sans artisanat visible échouera devant un acheteur qui juge aussi au
premier coup d'œil.

**On met le travail dans ce qu'on ne peut pas installer.** Un dégradé animé
s'installe en une commande. Un lavis peint, non.

### Le système de matières

| Matière | Porte | Dans le triptyque TLS |
|---|---|---|
| **Papier texturé, peint** | la main, l'irrégulier | **Humain** |
| **Verre** | la précision, l'optique | **Augmenté** |
| **Typographie et grille** | la structure, la décision | **Stratégique** |

Ce n'est pas une esthétique, c'est **le positionnement rendu visible**. Et ça donne
une règle de décision : face à un élément, demander s'il relève de la main ou de
l'instrument.

### Les trois règles

1. **Une seule surface peinte, une seule fois.** Le lavis occupe l'ouverture de
   l'accueil. Ailleurs, un souffle. Une matière rare fait un événement ; la même
   partout fait un fond d'écran.
2. **Le verre est l'exception.** Un seul panneau sur tout le site.
3. **Le mouvement se mérite.** Une entrée orchestrée sur l'accueil, rien d'autre.
   Pas de révélation au scroll sur chaque section — c'est le tic le plus
   reconnaissable des pages générées, et il est présent sur 17 pages.

### Ce qui est écarté, et pourquoi

Des quatre librairies d'effets du guide sauvegardé en Media Vault, **trois sont
refusées** : le métal liquide (froid, contredit la chaleur de la marque), le
gradient animé (le fond de startup de 2026, partout), la 3D (aucun objet à
montrer). **Le verre est gardé** parce qu'il incarne l'« Augmenté ».

---

## 5. Ce qui est tranché

- **Aucune contrainte d'effet ou d'animation n'a cours.** X11 « pas de parallax »
  retiré de `FACTS-CANON` le 29/07, ainsi que l'exclusion `lenis`/scroll-jack.
  Ce qui reste opposable est d'ordre a11y et performance, pas esthétique.
- **`DESIGN-INSPO.md` est un doc de recherche**, pas une décision. Sa « Direction C »
  et son catalogue d'effets sont suspendus ; ses saves Mobbin et ses
  anti-références servent.
- **Périmètre v1 = 3 archétypes** : **A** ouverture de page · **B** liste d'items ·
  **C** clôture double CTA. Ils couvrent les 6 pages du Lot 1.
- **A2 (hero centré sans visuel) est écarté** — incompatible avec une direction qui
  repose sur la matière.
- **Notion garde la copy, le code garde la mise en page.** Les archétypes accueillent
  n'importe quelle longueur de texte ; une modification de fiche ne casse aucun design.
- **Chercher dans le secteur learning est autorisé** pour les mécanismes d'apprenance
  et d'engagement. Interdit : en importer l'esthétique (e-learning B2C,
  education for children).

---

## 6. Ce qui reste ouvert

### Les arbitrages du banc `/_design-lab` — état au 31/07

> Mise à jour du 31/07. Les trois questions ont été **remesurées au code** avant
> d'être posées, et deux d'entre elles étaient mal posées. Le détail chiffré vit
> au banc ; ce tableau ne porte que l'état.

| # | Question | État |
|---|---|---|
| ① | **La couleur du texte courant** | 🔄 **Rouverte sur une meilleure question** — voir ci-dessous |
| ② | **Le rayon des boutons et des cards** | ✅ **Tranché : 14 px partout, pilule en exception** (objets réellement oblongs : tags, badges, chips) |
| ③ | **Le sens des couleurs** | ⏳ Ouverte. N'engage **aucune migration** : `tone=` a zéro usage sur le site |
| ④ | **Rempli ou outline ?** | ⏳ Nouvelle, soulevée par Chloé le 30/07. Le banc penche nettement pour l'outline |

**① a changé de nature.** La question « `ink-900` ou marron » supposait une encre
unique. Le site en a **six** (466 déclarations : `ink-900` ×202, `ink-600` ×86,
`ink-700` ×72, `ink-500` ×67…). Et la rampe n'est pas de TLS : `ink-50` → `ink-800`
sont **les gris par défaut de Tailwind**, `ink-950` est son `slate-900`. Seul
`ink-900` (`#252B37`) est une valeur maison — mais mesuré en OKLCH il est à la
teinte **264°** quand le teal de marque est à **216°**. Ce n'est donc pas un
« gris teinté teal », c'est un gris bleu-violet de la même famille que les
Tailwind qu'il est censé remplacer.

Quatre rampes sont montées au banc, **à clarté strictement conservée** — donc
aucun ratio de contraste ne bouge, quelle que soit celle qu'on retient :

| | Teinte | Ce que ça donne |
|---|---|---|
| **A** actuel | 256–264° | les gris Tailwind |
| **B** depuis `ink-900` | 264° | quasi identique à A — `#4b5563` devient `#4d5463`. À écarter |
| **C** depuis le teal TLS | 216° | un gris de marque, enfin : `#44585e`, `#2e454b` |
| **D** depuis le marron | 46° | la rampe chaude : `#615048`, `#4f3c33` |

**Le marron vient de l'orange, pas de l'or** — mesuré : marron 46°, orange 52,3°,
or 73,5°. Nuance : ce n'est pas un assombrissement de l'orange (qui donnerait
`#351906`) mais un ton choisi à la main, plus rouge de 6° et moins saturé.

**④ en un mot.** En rempli, le label blanc force `primary-700` ou plus foncé —
le « teal terni » écarté. En outline le label est sur blanc, donc `primary-700`
(5,02), `secondary-700` (6,31) et `accent-700` (4,88) passent tous, et se lisent
comme les couleurs de la marque. ⚠️ Défaut corrigé le 31/07 dans `Button.tsx` :
la bordure des variants outline était à `400` (2,44 sur blanc, sous le seuil 3,0
de WCAG 1.4.11) — remontée à `600`.

⚠️ **① bloque toujours la matière.** L'encre commande la température du lavis :
tant que la rampe n'est pas choisie, ne pas générer de matière.

### La matière

Quatre directions proposées le 29/07, non tranchées : **le lavis humide** (auréoles
franches) · **le papier lui-même** (bord frangé, fibres, teinté d'une seule couleur) ·
**la risographie** (deux encres décalées, trame visible) · **l'encre et le pli**.

Recommandation : **riso pour l'identité, papier teinté pour les fonds**. La riso
encaisse mieux le verre qu'un lavis flou.

Règles quelle que soit la direction : deux encres jamais trois · la matière perd
contre le texte (jamais plus de 30 % de densité sous un titre) · recadrer serré
sur un fragment · zéro figuratif · une seule main pour toutes les déclinaisons.

### La signature et le nom de la lettre

**Signature** (3-6 mots, sous le logo, ne change pas pendant deux ans) — trois
pistes : *Les compétences, prouvées.* · *La compétence avant le diplôme.* ·
*Former, prouver, allouer.*

Ne pas confondre avec l'**accroche d'accueil** (le H1), qui est
« Ne formez plus pour former. Bâtissez votre moteur de performance. » et qui vient
de la fiche Notion.

**La Vigie** — « Vigie » est excellent et concret. « IA » l'abîme : ça enferme dans
un sujet qui sera banal dans dix-huit mois et ça ne décrit pas le contenu réel
(un workflow pédagogique autopsié, une fiche Out-skill, un crash-test terrain).
Nom provisoire selon `FACTS-CANON` D7.

---

## 7. Les contraintes non négociables

**Identité engagée** : League Spartan (display, aucune italique) + Nunito (texte).
Teal `#55A1B4` · orange `#ED843A` · or `#F8B044`. Lucide pour les icônes (295
fichiers). Ne pas les rediscuter sans décision explicite.

**Faits** : aucun pourcentage inventé, aucun client nommé, aucun témoignage
fabriqué, jamais Qualiopi pour TLS, jamais CPF, « Open Badge » sans numéro de
version, le Match au futur, **vous** sur tout le public.

**A11y et performance** : `prefers-reduced-motion` respecté · contenu jamais
conditionné à une animation (pas d'`opacity: 0` en attente de JS) · rien de lourd
au-dessus de la ligne de flottaison · pause possible au-delà de 5 s.

**Gate** : `npm run build`, jamais `npx tsc --noEmit`.

---

## 8. Où regarder

| Besoin | Source |
|---|---|
| Faits, interdits | [`_canon/FACTS-CANON.md`](../_canon/FACTS-CANON.md) |
| Copy arbitrée des 9 pages | [`site/propositions-PAD/`](propositions-PAD/) |
| **Plan de charge page par page** | Notion, base [Website pages](https://app.notion.com/p/1accdd696db680dfb6e7d4ab472d5062) — 41 fiches, reconstruites le 28/07, avec pour chacune la copy implémentée, la copy validée, les points à trancher et un bloc « à revoir en phase design » |
| Arborescence | [`site/SITEMAP-V1.md`](SITEMAP-V1.md) |
| Contexte-maison du site | [`site/CONTEXT-SITE-MARKETING.md`](CONTEXT-SITE-MARKETING.md) |
| Références visuelles | [`site/DESIGN-INSPO.md`](DESIGN-INSPO.md) — **en recherche, pas une décision** |
| Valeurs des tokens | `src/index.css`, bloc `@theme` — le code fait foi |
| Explorations dessinées | Figma, page `🌐 Marketing — Site Internet` |
| Arbitrages en cours | `/_design-lab` en local |

⚠️ Les fiches Notion datent du 28/07 : **certains défauts qu'elles signalent sont
déjà corrigés** (le formulaire « mort » de `/resources`, l'absence de `SEOHead`,
les points de conversion « à zéro »). Vérifier au code avant de chasser un bug.

---

## 9. L'ordre de travail proposé

1. **Trancher les trois arbitrages du banc.** Ils bloquent la matière.
2. **Générer la matière** et la valider nue, sans intégration.
3. **Construire un seul hero en code**, à 1440 : matière, verre, vraie copy, une
   entrée. Juger sur pièce.
4. **Monter les 3 archétypes** dans leurs 2-3 traitements, nourris des 14
   explorations Figma.
5. **Dérouler les 16 pages restantes** par assemblage.

Le 06/08 est la cible du Lot 1 : Accueil, Learning App, Studio, Accompagnement,
Upskilling, Contact. Deux de ces six sont portées sur le système au 29/07.
