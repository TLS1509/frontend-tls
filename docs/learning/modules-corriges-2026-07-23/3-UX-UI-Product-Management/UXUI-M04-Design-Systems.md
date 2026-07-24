# MODULE 4 : DESIGN SYSTEMS & COMPONENT LIBRARIES

**Durée : 65 minutes · 60 slides**

> **Version corrigée du 2026-07-23.** Le fond — Atomic Design, hiérarchie de
> tokens, documentation de composants — est du canon solide. Corrections : trois
> statistiques fabriquées à retirer, et le compte de composants TLS à ajuster.
> Journal en fin de document.

**Objectifs**
- Construire un design system extensible (tokens, composants, documentation)
- Créer une bibliothèque de composants avec variantes
- Documenter un composant (props, usage, accessibilité)

---

## PARTIE 1 · Fondamentaux

Un design system, c'est *« a living, breathing system of components and standards
that serves as the single source of truth »* (formulation InVision, authentique).
Il réunit : des composants réutilisables, des design tokens, des règles d'usage,
et des implémentations en code.

**Ses bénéfices** :

| Bénéfice | Effet |
|---|---|
| Cohérence | Un style de bouton = toutes les pages alignées |
| Vitesse | Assembler une page à partir de composants existants |
| Extensibilité | Une nouvelle fonctionnalité réutilise l'existant |
| Maintenance | Un correctif se propage à toutes les instances |
| Intégration | Un guide unique plutôt que cinquante PDF |

> ⚠️ **Trois statistiques retirées.** « Sans design system = 60 % du temps en
> redesign », « design system mature = +300 % de vitesse (Figma study 2025) », et
> « l'incohérence coûte 18 K€/mois » sont **fabriquées** — aucune « Figma study
> 2025 » ne documente ce chiffre, les deux autres n'ont pas de source. Les
> bénéfices ci-dessus se défendent **sans** chiffre inventé.

---

## PARTIE 2 · Anatomie d'un composant

Un composant = une partie visuelle + des variantes + des propriétés.

**Exemple — le bouton** :
- **Anatomie** : libellé, fond, bordure (optionnelle), icône (optionnelle)
- **Variantes** : type (primaire, secondaire, fantôme, danger) × taille (S/M/L) ×
  état (défaut, survol, focus, actif, désactivé, chargement) × largeur
- **Props** : `label`, `type`, `size`, `icon`, `onClick`, `disabled`, `loading`

---

## PARTIE 3 · La structure du design system TLS

Le design system TLS s'organise en couches :

**Couche noyau** — bouton, champ, case à cocher, bouton radio, interrupteur, menu
déroulant, pastille, icône.
**Couche composite** — carte, modale, notification, fil d'Ariane, onglets,
accordéon, pagination, barre de progression.
**Couche fonctionnelle** — navigation latérale, en-tête, grille de dashboard,
carte de cours, lecteur de leçon, système de badges, compteur de série, ligne de
classement.
**Couche patterns** — mises en page de formulaires, états vides, états de
chargement, pages d'erreur, parcours d'intégration.

> ⚠️ **Le compte de composants était faux.** La version précédente parlait de
> « 87 composants » et évoquait Storybook. Le design system TLS **n'utilise pas
> Storybook** (le showcase est `src/pages/Components.tsx`) et compte **plus de 90
> composants** (≈ 51 `ui` + 40 `patterns` + noyau). À recompter et re-libeller —
> c'est la même correction qu'au module 2.

---

## PARTIE 4 · Hiérarchie de tokens et documentation

**Hiérarchie de tokens** (canon, correct) :
```
Couche 1 — PRIMITIVES (valeurs brutes)
  --blue-500: #55A1B4;   --space-4: 16px;

Couche 2 — TOKENS SÉMANTIQUES (intention)
  --color-brand-primary: var(--blue-500);

Couche 3 — TOKENS DE COMPOSANT (usage)
  --btn-primary-bg: var(--color-brand-primary);
```

**Atomic Design** (Brad Frost, canon) : atomes → molécules → organismes →
gabarits → pages.

**Documenter un composant** — pour chaque composant : usage, anatomie, variantes,
à faire / à éviter, props typées, notes d'accessibilité, lien Figma,
implémentation. La documentation d'exemple du bouton (dans la version d'origine)
est bonne — à conserver.

⚠️ **Note d'accessibilité du composant bouton** : « contraste ≥ 4,5:1 » — mais
attention, avec le teal de marque `#55A1B4` c'est **2,94:1 (échec)**. Le token de
texte du bouton doit pointer vers `#3D7786` (5,02:1). Cohérence avec le module 1.

---

## Synthèse

Un design system = une source de vérité unique : tokens en trois couches,
composants documentés, Atomic Design. Sa valeur (cohérence, vitesse, maintenance)
se démontre sans chiffre fabriqué.

---

## 📋 Journal des corrections — 2026-07-23

| # | Problème d'origine | Correction |
|---|---|---|
| 1 | « Sans design system = 60 % du temps en redesign » | Supprimé — non sourcé |
| 2 | « DS mature = +300 % de vitesse (**Figma study 2025**) » | Supprimé — étude inexistante |
| 3 | « L'incohérence coûte 18 K€/mois » | Supprimé — fabriqué |
| 4 | « 87 composants », mention de **Storybook** | Corrigé : > 90 composants, showcase `Components.tsx`, pas de Storybook (idem module 2) |
| 5 | Note accessibilité bouton « contraste ≥ 4,5:1 » sans réserve | Précisé : le teal `#55A1B4` échoue (2,94:1) ; token de texte → `#3D7786` |

**Conservé** : la définition et les bénéfices du design system · l'anatomie d'un
composant · la structure en couches TLS · la hiérarchie de tokens · Atomic Design
(Frost) · la documentation d'exemple du bouton · la citation InVision. Le fond
était solide et bien attribué.
