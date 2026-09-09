# Intégrer le corpus de formation dans l'app

> **Écrit le 2026-09-09.** Comment passer des 34 modules Markdown de
> [`chloe/modules-corriges-2026-07-23/`](../../chloe/modules-corriges-2026-07-23/) à du vrai contenu
> dans la Learning App. Tout ce qui est affirmé ici a été vérifié dans le code ce jour-là.
>
> **Ce que ça sert.** Trois choses en même temps : Chloé se forme, elle applique sur TLS, et l'app
> est enfin jugée sur du contenu réel plutôt que sur « Fondamentaux du Leadership ».
> Ce dernier point n'est pas secondaire — **c'est le meilleur test des quatre fondations du design
> system** : les vraies longueurs de titre, la vraie densité d'une leçon, ce que devient une card
> quand son texte n'a pas été calibré pour elle.

---

## 1. Ce qui est prêt, et ce qui ne l'est pas

| | État |
|---|---|
| **La matière** | ✅ 34 modules corrigés, fact-checkés, en Markdown, suivis par git |
| **La structure des modules** | ✅ EDRACT, six sections régulières, identique d'un module à l'autre |
| **Le modèle de données de l'app** | ❌ **`Lecon` ne porte aucun champ de contenu** |
| **Le lecteur de leçon** | ❌ `LessonPlayer.tsx` porte son contenu **en dur** — 1 998 lignes |

> **Le verrou n'est donc pas le contenu, c'est le modèle de données.** C'est un chantier de
> développement, pas de design ni de rédaction.

---

## 2. Le corpus

Quatre dossiers dans `chloe/modules-corriges-2026-07-23/` :

| Parcours | Modules | Remarque |
|---|---:|---|
| `1-Ingenierie-Pedagogique` | 10 | ADDIE/SAM, objectifs, Kirkpatrick, IA générative, chiffrage |
| `2-Neuro-Education` | 10 | **le pilote** — le plus abouti, quiz de 30 questions |
| `3-UX-UI-Product-Management` | 12 | dont `M04-Design-Systems`, directement applicable ici |
| `4-Recherche-et-Strategie` | 2 | validité scientifique des frameworks IP |

**Le fact-check est déjà incorporé.** L'`INDEX.md` du dossier l'établit : « mythes retirés, sources
vérifiées avec DOI, chiffres fabriqués supprimés », et chaque module porte en fin un **journal des
corrections**. Il n'y a donc plus de tri à faire avant de seeder — c'était la réserve qui traînait
dans les notes, elle tombe.

⚠️ **Les mythes à ne jamais réintroduire** si on complète le corpus à la main : l'attention qui
durerait 8 secondes, les styles d'apprentissage (VARK), le cerveau triunique. Ils ont été retirés
une fois ; le journal de chaque module dit lesquels.

---

## 3. Le mapping — il est direct

Les modules sont écrits en **EDRACT**, six sections numérotées, les mêmes partout :

```
## 01 · Engagement    ## 02 · Découvrir    ## 03 · Réfléchir
## 04 · Appliquer     ## 05 · Consolider   ## 06 · Transférer
```

L'app attend `Parcours › Étape › Leçon`. La correspondance est immédiate :

| Objet de l'app | Ce qui l'alimente | Volume pour Neuro-Éducation |
|---|---|---|
| **`Parcours`** | un dossier du corpus | 1 |
| **`Etape`** | un module (`NEURO-M01` … `M10`) | 10 |
| **`Lecon`** | une section EDRACT | 6 par étape, **60 au total** |

Et les six temps EDRACT correspondent déjà à des surfaces existantes de l'app : *Engagement* →
l'ouverture de la leçon · *Réfléchir* → le quiz et le journal · *Appliquer* → une mission sur un
chantier TLS réel · *Transférer* → les viewers.

> **Rien à réécrire.** Un script de conversion suffit, une fois le modèle de données ouvert.

---

## 4. Ce qu'il faut changer dans le code

### 4.1 — Ouvrir `Lecon` au contenu

Aujourd'hui (`src/data/learningPaths.ts`) :

```ts
export interface Lecon {
  id: string; number: number; title: string;
  description: string; duration: string; completed: boolean;
  prerequisites?: Prerequisites;
}
```

Il manque le contenu. **Ne pas y mettre une chaîne de Markdown brute** : le lecteur devra
distinguer un encadré d'un paragraphe, une citation d'un exercice. Un tableau de blocs typés vieillit
mieux et se rend sans parseur :

```ts
export type LessonBlock =
  | { kind: 'paragraph';  text: string }
  | { kind: 'heading';    level: 2 | 3; text: string }
  | { kind: 'list';       ordered: boolean; items: string[] }
  | { kind: 'callout';    tone: 'primary' | 'warm' | 'sun'; title?: string; text: string }
  | { kind: 'quote';      text: string; source?: string }
  | { kind: 'question';   prompt: string; hint?: string }   // les temps « Réfléchir »
  | { kind: 'reference';  label: string; doi?: string; url?: string };

export interface Lecon {
  // … champs existants
  /** Contenu de la leçon. Absent = la leçon n'est pas encore rédigée. */
  blocks?: LessonBlock[];
  /** Le temps EDRACT dont la leçon est issue — sert le rendu et les stats. */
  edract?: 'engagement' | 'decouvrir' | 'reflechir' | 'appliquer' | 'consolider' | 'transferer';
}
```

**Pourquoi `blocks?` et non `blocks`** : le champ est optionnel, donc les parcours de démo existants
continuent de compiler. Aucune migration forcée, aucun `npm run build` cassé.

### 4.2 — Rendre `LessonPlayer` data-driven

`src/pages/LessonPlayer.tsx` fait 1 998 lignes et porte 19 blocs de paragraphes littéraux. Il faut
en extraire un rendu qui parcourt `blocks`, avec un composant par `kind`. Le reste du lecteur
(navigation, progression, minuterie) ne bouge pas.

**Ordre à respecter** : ouvrir le modèle → écrire le rendu → seeder. Seeder avant d'avoir le rendu
produit des données que rien n'affiche, donc rien ne vérifie.

### 4.3 — Le script de conversion

À écrire dans `scripts/`, jamais dans `src/` : c'est un outil de build, pas du code d'app.

1. lire un module `.md`, découper sur les `## 0N · …`
2. chaque section devient une `Lecon` ; le titre EDRACT donne `edract` et `title`
3. les paragraphes, listes et citations deviennent des `blocks` typés
4. la bibliographie de fin alimente des blocs `reference` — **avec leurs DOI**, c'est la valeur du
   fact-check et il ne faut pas la perdre en route
5. sortie : un fichier `src/data/parcours/neuro-education.ts` typé

⚠️ **Ne pas faire du seed un import runtime de Markdown.** Le contenu doit être compilé en TypeScript
au moment du build : c'est ce qui garantit que le typage attrape une structure cassée, plutôt que de
la découvrir dans le navigateur.

---

## 5. La procédure, dans l'ordre

| # | Étape | Ce qui la débloque |
|---|---|---|
| 1 | Ajouter `blocks?` et `edract?` à `Lecon` | rien — additif, aucune migration |
| 2 | Écrire les composants de rendu, un par `kind` | 1 |
| 3 | Brancher `LessonPlayer` sur `blocks` quand il est présent, garder l'ancien rendu sinon | 2 |
| 4 | Écrire le script de conversion, le passer sur **un seul module** | 1 |
| 5 | Vérifier ce module de bout en bout dans l'app | 3, 4 |
| 6 | Convertir les 9 modules restants de Neuro-Éducation | 5 |
| 7 | Remplacer le parcours de démo par le vrai dans `LearningPaths` | 6 |
| 8 | Les deux autres parcours | 7 |

> **L'étape 5 est le vrai jalon.** Un module réel affiché correctement prouve la chaîne entière.
> Tout convertir avant d'avoir vu un module à l'écran, c'est se garantir de tout reconvertir.

---

## 6. Les pièges

**Le store, pas le mock.** Les pages ne doivent jamais importer `MOCK_*` directement. Le pattern du
repo est le *seed-on-first-access* : `getX(userId)` seed depuis les données au premier appel si le
store est vide, puis sert le store. Et la lecture se fait **dans le corps du render**, pas dans un
`useState` — sinon le composant ne se re-rend pas quand le store change.

**Les sept pages qui consomment `learningPaths`.** `LessonPlayer`, `LearningPathDetail`,
`CourseDetail`, `LearningPaths`, `Positionnement`, `AstucesViewer`, `FlashcardsViewer`. Un champ
ajouté ne les casse pas ; **remplacer le parcours de démo, si**. D'où l'ordre de l'étape 7, après
que le rendu est prouvé.

**Le positionnement dépend des compétences.** `Positionnement.tsx` auto-génère son questionnaire à
partir des `competenceIds` des étapes — une question par compétence. Un vrai parcours doit donc
porter de vraies compétences, sinon le questionnaire sort vide. C'est le lien avec le référentiel,
que Notion donne à **30 % fait** (Q59).

**Ce que le corpus ne contient pas.** Les modules sont du contenu de cours. Les *missions*, les
*projets finaux* et les *quiz* sont des objets distincts dans le modèle (`FinalProject`,
`ComplementaryItem`). Le temps « Appliquer » de chaque module donne la matière d'une mission, mais
il faut la formaliser — ce n'est pas automatique.

---

## 7. Ce que ça débloque, au-delà de la formation

- **Juger le design sur du vrai texte.** Les quatre fondations (typographie, couleur, encre, rayons)
  se testent mal sur des titres calibrés. Un vrai module a des titres longs, des listes profondes,
  des citations avec source : c'est là qu'on voit si l'échelle tient.
- **Le dogfooding.** Suivre son propre parcours dans l'app, c'est le seul moyen de rencontrer les
  frictions que personne ne signale.
- **Le Passeport.** Un parcours réel avec de vraies compétences alimente `EvidenceRef` — la boucle
  Learn → Do → Preuve, dont les trois premiers maillons sont construits.

---

**Voir aussi** : [`_audits/PLAN-REPRISE-DESIGN-2026-09-09.md`](../_audits/PLAN-REPRISE-DESIGN-2026-09-09.md) §2.D
(l'état du volet) et §4 (les fondations que ce contenu servira à tester).
