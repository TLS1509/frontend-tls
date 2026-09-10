# Inventaire du Drive Marketing — relevé de première main

**Fait le 2026-09-10** via l'API Drive, dossier par dossier. Même méthode que pour Notion :
rien n'est repris d'un relevé antérieur.

> Racine : [Marketing](https://drive.google.com/drive/folders/1ZgpYUa1b3PehpwJ6KBdCuJaLAif4MRNw)
> — 4 dossiers : `Content` · `_Strategie` · `TLS — Brand` · `Website`.

---

## Le détail qui tranche

Dans `_Strategie` vit un document daté du **9 février 2026** :
**« 📊 AUDIT & RESTRUCTURATION COMPLET — DOSSIER MARKETING GOOGLE DRIVE TLS »**.

**Ce nettoyage a déjà été instruit une fois.** Comme pour Notion, où le document de refonte
constate qu'« une roadmap *Mapping & standardisation Notion* existe et n'a pas abouti ».

Le diagnostic est donc le même des deux côtés, et il ne porte pas sur l'architecture :
**l'architecture existe, rien ne la fait respecter.**

---

## 1. Deux systèmes de rangement superposés

`TLS — Brand` porte **treize enfants**, issus de deux vagues qui s'ignorent :

| Vague | Date | Dossiers |
|---|---|---|
| **Numérotée** | oct. 2025 | `00_Brand‑Kit` · `01_Slides` · `02_Docs` · `03_Logos` · `04_Icons` · `05_Illustrations` · `99_ARCHIVE` |
| **Nommée** | fév. 2026 | `Brand Guidelines` · `Templates` · `Canva ` · `LinkedIn` |

`Brand Guidelines` (février) et `00_Brand‑Kit` (octobre) décrivent la même chose.
`Templates` (février) recouvre `01_Slides` et `02_Docs` (octobre).
⚠️ `Canva ` et `03_Formats ` et `05_Historique ` portent une **espace finale** dans leur nom.

---

## 2. Un échafaudage vide

Créés en octobre 2025, **jamais remplis** :

- `01_Slides/` → `01_Templates` · `02_Decks‑Officiels` · `03_Historique (_ARCHIVE)`
- `02_Docs/` → `01_One‑Pagers` · `02_Press‑Kits` · `03_Propositions` · `04_Politiques‑Marque`
- `00_Brand‑Kit/` → `01_Charte‑Graphique` · `02_Typographies` · `03_Palette‑Couleurs` · `04_Exemples‑d'Usage`

Onze dossiers de rangement pour un contenu qui n'est jamais venu.

---

## 3. Les fichiers au nom d'export par défaut

À la racine de `03_Logos`, **onze fichiers en vrac** alors que le dossier a cinq
sous-dossiers prévus pour eux :

| Fichier | Ce que le nom trahit |
|---|---|
| `Frame 30.svg` · `Frame 31.svg` · `Frame 32.svg` | export **Figma** par défaut — aucun sens |
| `Untitled design.png` | export **Canva** par défaut |
| `logo-haute-résolution (1).png` | le `(1)` d'un doublon |
| `logo-normal-bleu.png` · `logo-document-a4.png` | l'**ancien** logo |
| `Icon profile picture 800 x 800.svg/.png` | doublon SVG/PNG |
| `favicon-48x48.svg` | — |

Et dans `05_Illustrations`, un seul fichier : `0001-7966223904151964415.png`.

**Aucun de ces fichiers n'existe dans le repo.** Le jeu actuel — 458 fichiers, 6 variantes,
5 formats — n'est pas dans le Drive.

---

## 4. Un pack d'icônes de 2023

`04_Icons` contient **dix-sept sous-dossiers datés du 4 août 2023** : `Arrows`, `Weather`,
`Maps & travel`, `Charts`, `Security`, `Users`, `Time`, `Development`, `Files`, `Shapes`,
`Layout`, `Alerts & feedback`, `Education`, `Communication`, `Finance & eCommerce`,
`Editor`, `Images`, `General`, `Media & devices`.

C'est un pack générique acheté ou téléchargé **deux ans avant** le travail de marque TLS.
Or le projet utilise **Lucide**, exclusivement — `CLAUDE.md` en fait une règle.
Aucun de ces fichiers n'a de raison d'exister.

`99_ARCHIVE` contient `Identité visuelle (old V1)`, créé le **13 décembre 2021**.

---

## 5. Onze documents sur comment ranger la marque, écrits en deux jours

| Dossier | Documents | Créés |
|---|---|---|
| `Templates` | Guide Complet des Brand Assets Marketing (.docx, 935 ko) · MARKETING ASSETS MASTER INDEX · ASSET ORGANIZATION & PROCESS GUIDE · MARKETING TEMPLATES & EMAIL GUIDE | **1er fév.** |
| `Brand Guidelines` | CANVA BRAND GUIDELINES 2026 - draft · SYNTHÈSE BRAND GUIDELINES 2026 | **2 fév.** |
| `Canva ` | GUIDE SETUP CANVA BRAND SPACE V2 · CANVA LINKEDIN TEMPLATES · CANVA TEMPLATES GUIDE COMPLET · SOCIAL MEDIA TEMPLATES **V1** · SOCIAL MEDIA TEMPLATES **V2** | **2 fév.** |

Aucun n'a bougé après le 22 février. `V1` et `V2` cohabitent. Le seul texte qui se déclare
lui-même s'appelle « **draft** ».

Tous sont **centrés sur Canva** et **antérieurs au pivot SBO** — ils décrivent une marque
qui a changé depuis, et un outil dont la fiche mémoire dit que le brand kit est périmé.

---

## 6. Un lien mort dans le Brand Hub

La page Notion `Brand Hub` renvoie deux fois vers un « Dossier Logos Drive »
(`1tx1TiRVUKLTLmLmSilvWm0UILTWbfKXD`). **Ce dossier n'existe pas** — l'API renvoie
*Requested entity was not found*. Le vrai dossier logos est
[`03_Logos`](https://drive.google.com/drive/folders/1Qq810LO9mhnsL83S52RnOidR3dAgfhNq).

---

## Ce que je propose

**À supprimer sans regret** *(rien de ceci n'existe ailleurs, et rien ne le référence)*

1. **`04_Icons`** — 17 dossiers d'un pack de 2023, remplacé par Lucide. Le plus gros gain.
2. **Les onze fichiers en vrac de `03_Logos`** — `Frame 30/31/32.svg`, `Untitled design.png`,
   `logo-haute-résolution (1).png`, l'ancien logo. Remplacés par les 458 fichiers du repo.
3. **`05_Illustrations`** — un fichier au nom d'export.
4. **L'échafaudage vide** — les onze sous-dossiers jamais remplis de `01_Slides`, `02_Docs`,
   `00_Brand‑Kit`.
5. **Une des deux vagues.** Garder la numérotée d'octobre (elle a une logique) ou la nommée
   de février (elle est plus lisible) — mais pas les deux.

**À garder, en le sachant périmé**

- Les **11 documents Canva/Templates** : ils décrivent la marque d'avant le pivot. Ni à jeter
  ni à suivre — à marquer `PÉRIMÉ — pré-pivot` comme les documents Notion de juillet.
- **`Signatures Emails - TLS`** : encore référencé depuis le Brand Hub, et modifié en avril.

**À ne pas toucher**

- `99_ARCHIVE/Identité visuelle (old V1)` — c'est l'archive, elle fait son travail.
- `Website` et `Content` — hors périmètre marque, à traiter séparément.

**Ce qui manque, et que la suppression ne réglera pas**

Le Drive ne contient **aucun** des 458 fichiers du jeu actuel. Une fois vidé, il faudra y
déposer le noyau — ou décider que le Drive ne sert plus qu'aux documents, les fichiers de
marque vivant dans le repo et le noyau usuel dans Notion. **C'est la vraie décision.**
