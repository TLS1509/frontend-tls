# Audit — Brand Guidelines (Notion)

**Page** : [Brand Guidelines](https://www.notion.so/281cdd696db680ad9b47c71017bfecad) · 1 552 lignes,
81 373 caractères · dernière modification réelle **11/02/2026**.
**Date de l'audit** : 10/09/2026. **Méthode** : lecture intégrale de la page via l'API, puis
confrontation de chaque valeur à `src/index.css` et aux règles du dépôt. Aucun chiffre ci-dessous
n'est estimé.

> ⚠️ **Rien n'a pu être corrigé dans Notion.** Voir §4 : un défaut de l'API rend la page
> inscriptible. Ce document est donc, pour l'instant, le seul endroit où ces constats existent.

---

## 1. La page porte un système de design parallèle, et il est faux

La section `## 📐 Design Tokens — Specs Techniques` (lignes 1435-1551) décrit des tokens qui ne
sont ceux de personne. Elle s'ouvre même sur une revendication de primauté — « **Source de vérité
actuelle : Learning App Design System (cohérence 82/100)** » — qui contredit la décision SSOT
(le dépôt fait foi, Notion est un miroir), et qui affiche un score de conformité sans trace de
mesure, ce que la règle 4 d'hygiène documentaire interdit.

| Ce que la page annonce | Ce que le code contient | Verdict |
|---|---|---|
| Rayons `6 / 8 / 10 / 16 px` | `4 · 6 · 10 · 14 · 20 · 24` + `pill` 999 | **8 et 16 n'existent nulle part.** La carte est à **14**, pas 8 |
| `shadow-md: 0 4px 6px rgba(0,0,0,.1)` | `0 4px 12px -2px rgba(18,24,28,.08), 0 2px 4px rgba(18,24,28,.04)` | Ce sont les **défauts Tailwind**, précisément ceux que le projet a écartés pour leur dureté |
| Success `#14b8a6` · Error `#EF4444` | 4 familles, 16 tokens, muted/coral TLS | **Couleurs Tailwind brutes, bannies nommément** par le règlement du dépôt |
| Palette « étendue » `#10b981`, `#FF6B6B` | — | N'appartiennent à aucune échelle TLS |
| Padding cartes `12 / 16 / 24 / 32` | **24 px au canon, 16 px en unique dérogation** | « Pas de troisième valeur » — donc ni 12 ni 32 |
| Gradient hero `135deg, #55A1B4 → #ED843A` | `bg-gradient-page-ambient` : **vertical**, bleu → blanc → orangé, en teintes 50 | Ni l'angle, ni les teintes, ni la saturation |
| Glassmorphism (5 mentions + bloc CSS) | Retiré du système ; le flou vit dans `--blur-glass-*` | Le verre teinté est réservé à **l'app**, jamais aux visuels OG/e-mail/document |

**Deux décisions y sont présentées comme « ⏸️ EN ATTENTE », avec une échéance au 25 février 2026**
— sept mois passés. Elles arbitrent entre `#14b8a6` et `#10b981`, c'est-à-dire entre deux couleurs
également interdites. Le code a tranché depuis longtemps, autrement.

## 2. Un workflow qui ne peut pas être suivi

La section *Bridge Design System Learning App* prescrit : « Mise à jour des 3 CSS
(`website_global.css`, `learningapp_global.css`, `designsystemfigma_global.css`) ».
**Les trois fichiers sont introuvables dans le dépôt** (vérifié le 10/09/2026).

Elle décrit par ailleurs la chaîne `Notion → Figma → Canva → Cursor AI`, soit **l'inverse exact**
du sens retenu : la source est `src/index.css`, et les autres surfaces en descendent.

## 3. Le reste

- **Dossier Drive mort**, cité 2 fois : `1tx1TiRVUKLTLmLmSilvWm0UILTWbfKXD` → **404 à l'API**.
  Le bon est `1Qq810LO9mhnsL83S52RnOidR3dAgfhNq` (`03_Logos`), vérifié vivant. Le même lien mort
  était sur *Assets & Templates*, où il a été corrigé.
- **Base « Social Proof »** : bloc marqué `deleted` dans le corps de la page.
- **Ligne périmée** « Vues disponibles : All Assets • Logos • Colour • Fonts • Social • Images » —
  ces vues ont été ramenées à deux le 10/09.
- **Checklist Canva en 8 phases** (~100 lignes, chiffrée en minutes) pour un Brand Kit **périmé**,
  alors que le budget marketing est à zéro jusqu'au 31/10.
- **Brand Story Framework** (StoryBrand, Donald Miller) : entièrement **vide**, en anglais, avec
  ses gabarits d'origine — « *Our character is (insert ideal client) who wants (desired outcome)* ».
- **Titres en anglais** au milieu d'une page française : *Logos and Logo Variation*, *Typography*,
  *Image Style and Photography*, *All Brand Assets*.

## 4. Pourquoi rien n'a été corrigé — et le déblocage, qui prend cinq secondes

Toute écriture de contenu sur cette page échoue, quelle qu'elle soit :

```
validation_error — /icons/eye_orange.svg is not a supported Notion icon.
```

L'API re-sérialise la page entière avant d'écrire, et **une seule icône** ne survit pas à
l'aller-retour : celle de l'encadré `**Our Brand Vision**`, dans le dépliant *Brand Vision*
(ligne 60). Les 24 autres icônes de la page passent sans problème. `update_content` comme
`insert_content` sont donc bloqués tant qu'elle est là.

**Déblocage** : ouvrir le dépliant *Brand Vision*, cliquer l'icône œil de l'encadré, la remplacer
par n'importe quelle autre (un emoji fait l'affaire). La page redevient inscriptible et les
corrections du §1 peuvent être appliquées.

## 5. Le ton — rectification

Le ton **n'est pas absent**, contrairement à ce qui a été dit plus tôt dans la session. C'est même
l'endroit où il est le plus développé de tout le système : trois adjectifs (*Chaleureux, Innovant,
Pédagogue*), cinq adjectifs de marque (*Innovant, Éthique, Rigoureux, Accessible, Humain*), un
paragraphe de voix, et **un tableau Comme ceci / Pas comme cela avec trois exemples rédigés**.

Le problème est double, et plus précis que « rien ne tranche » :

1. **Ses exemples sont d'avant le pivot.** Ils parlent de « l'IA comme assistant », de « placer
   l'humain au centre », de « formation nouvelle génération » — le positionnement retiré de
   Brand Hub le 10/09. La *Brand Vision* de la ligne 63 dit la même chose.
2. **Il contredit le document de refonte du site**, qui pose « expert & assuré, ton de cabinet de
   conseil nouvelle génération — on ne demande pas la permission d'innover ».

Ce n'est donc pas un ton à écrire, c'est un **arbitrage entre deux tons déjà écrits**. La matière
existe des deux côtés ; il manque la décision.
