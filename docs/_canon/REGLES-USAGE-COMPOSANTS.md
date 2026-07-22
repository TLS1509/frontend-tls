# Règles d'usage des composants

_Extrait de `src/design-system/spec.json` avant sa suppression (2026-07-22).
Ce fichier était daté d'avril, jamais importé, et décrivait une architecture
BEM/HTML supprimée — mais il portait ces règles-là, qui n'existaient nulle part
ailleurs dans le dépôt. Vérifié par grep sur `src/`, `docs/`, `DESIGN.md`,
`DESIGN-IMPECCABLE.md`, `CLAUDE.md` : 0 résultat._

**Ce document ne contient QUE de la doctrine d'usage.** Aucune valeur de token,
aucune couleur, aucun chemin de fichier — c'est précisément ce mélange qui avait
rendu `spec.json` périmé sans que personne s'en aperçoive. Les valeurs vivent
dans `src/index.css` (`@theme`) et `src/styles/design-tokens.css`.

Le texte original est conservé tel quel (en anglais) : le reformuler risquerait
d'en déplacer le sens.

---

## Accessibilité — contrats

### Button

| Point | Contrat |
|---|---|
| Cible minimale | 40 × 40 px (taille MD) |
| Icône seule | `aria-label` **obligatoire** |
| État chargement | `aria-busy="true"` + `aria-disabled="true"` |
| Contraste | Primary `#4A8FA1` sur blanc = **4.52:1** (AA) |
| Anneau de focus | *« Never remove »* |

### Input

| Point | Contrat |
|---|---|
| Label | `<label for="id">` toujours lié |
| Erreur | `aria-invalid="true"` + `aria-describedby` pointant vers l'erreur |
| Requis | attribut `required` **et** indicateur visuel |
| Anneau de focus | ring teal 4 px + bordure teal-500 |
| Cible tactile | 44 × 44 px, label compris |

---

## Règles d'usage

### Alert — sémantique des 4 variantes

- **info** — *« Context without urgency — new feature, reminder »*
- **success** — *« Confirm persistent action — save, submit. (Use Toast for transient confirmations) »*
- **warning** — *« Attention required soon, non-blocking »*
- **danger** — *« Blocking error, destructive confirmation. Use coral/orange, never saturated red »*

> Le point qui se perd le plus vite : **success = action persistante**. Une
> confirmation transitoire, c'est un Toast. Et **jamais de rouge saturé** — c'est
> la même doctrine que « pas de couleur primaire RGB brute ».

### Modal — quand l'utiliser, quand ne pas

**Utiliser pour** : actions destructives ou irréversibles · information critique
à lire · célébration de fin de module (variante `celebration`).

**Éviter pour** : *« Simple confirmations (use Toast) »* · *« Too many fields
(use page) »*.

### Pagination — quel mécanisme selon le contexte

| Contexte | Mécanisme |
|---|---|
| Catalogue | numéroté |
| Feed | *load-more* |
| Activité | infini |
| Table d'admin | numéroté + sélecteur de taille de page |

C'est le seul arbitrage écrit sur ce choix ; `Pagination.tsx` n'a aucun JSDoc.

### Règles à une phrase

| Composant | Règle |
|---|---|
| **Avatar** | *« Tint assignment must be stable (hash of name). Never random. »* |
| **EmptyState** | *« Every empty state must have a primary CTA. No dead ends. »* |
| **Medal** | *« Warm gradient = achievement unlocked. Brand deep = special/rare. Ink gray = locked. »* |
| **CompetenceBadge** | *« Color = level. Stable assignment, never decorative. »* |
| **Celebration** | *« Rare = precious. Celebrate real milestones only (module completion, streak, first badge). Never gratuitous micro-interactions. »* |
| **Tabs** | *« 2–5 tabs max. No nesting. No multi-select (that's a filter). »* |
| **Stepper** | *« Stepper = named sequential steps. Progress bar = continuous percentage. >5 steps → split into phases. »* |
| **Breadcrumb** | *« Last item never clickable. Max 4 levels visible (collapse middle). Mobile: prefer Back button. »* |

---

## Pourquoi ce document existe séparément

`spec.json` mélangeait trois choses : des **valeurs** de tokens, une
**architecture** CSS, et cette **doctrine**. Les deux premières ont périmé en
trois mois — l'architecture BEM a été remplacée par Tailwind, les valeurs ont
divergé — mais comme le fichier n'était jamais importé, **rien ne cassait et rien
ne signalait qu'il mentait**. Neuf composants ont continué à le déclarer
« Source of truth ».

La doctrine, elle, n'a pas périmé : elle ne dépend d'aucune implémentation.
D'où la séparation. **Ne jamais réintroduire de valeurs de tokens ici** — c'est
ce qui reproduirait exactement la même dérive.
