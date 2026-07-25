# Audit UX/UI — Learning App & Site, à la grille du parcours bootcamp

**2026-07-24.** Les 8 lentilles du parcours UX/UI (modules M01→M08) passées sur le
**code réel** de la learning app et du site marketing. C'est le volet « appliquer
les cours » : chaque principe enseigné devient une vérification sur le produit que
tu construis.

> **Méthode — première main, pas d'estimation.** Chaque constat = une lentille
> (module) → une preuve (`fichier:ligne`) → un verdict → un correctif. Les ratios
> de contraste sont **calculés** (WCAG 2.1, code Python reproductible), jamais
> supposés — c'est la leçon centrale du module 1 appliquée à l'audit lui-même.
> Périmètre : learning app (`src/pages` hors marketing) + site
> (`src/pages/marketing`, `src/components/marketing`).

---

## Tableau de bord — les 8 lentilles

| # | Lentille (module) | Verdict | En un mot |
|---|---|---|---|
| M01 | Web & Visual Design | 🟢 sauf contraste | 2 polices, base-4, ombres douces OK — **le contraste texte est le point noir** |
| M02 | Principes UI — 4C | 🟢 | Clarté (0 libellé vague), cohérence (>90 composants), confort (skeletons, empty states) |
| M03 | Interaction & micro-interactions | 🟢 | `focus-visible` (146 fichiers), `useReducedMotion` (43), états définis |
| M04 | Design Systems | 🟢 | Tokens 3 couches, showcase `Components.tsx`, >90 composants — **ton chef-d'œuvre** |
| M05 | User Research | ⚪ process | Non inspectable en code — voir recommandation |
| M06 | Architecture de l'info | 🟢 | Piste informationnelle bonne (verbe+objet), fil d'Ariane, nav 3 niveaux |
| M07 | Prototypage & tests | ⚪ process | Aucune trace de test d'utilisabilité — voir recommandation |
| M08 | Learning Experience Design | 🟠 | **La répétition espacée est promise mais pas câblée** |

Deux vrais chantiers ressortent : un **systémique** (contraste, M01/M02) et un
**produit** (répétition espacée, M08). Le reste est solide — et ça compte de le
dire : un audit honnête ne noircit pas ce qui va bien.

---

## 🔴 Constat systémique #1 — Les tokens de marque servent de couleur de texte (M01/M02)

C'est **exactement** l'erreur que tes propres modules 1 et 2 corrigent cinq fois :
*« le teal de marque `#55A1B4` est décoratif, pas un teal de texte. »* La passe
a11y récente (commit `7188fb9`) a corrigé les **tokens** et le composant **Button**
— mais elle n'a pas balayé les **classes utilitaires** `text-*` disséminées dans
les pages.

### Les ratios, mesurés (WCAG 2.1, sur blanc)

| Token | Ratio sur blanc | Texte normal (≥4,5) | Grand texte (≥3) | Verdict |
|---|---|---|---|---|
| `primary-500` #55A1B4 | **2,94:1** | ❌ | ❌ | jamais du texte |
| `primary-600` #4A8FA1 | **3,66:1** | ❌ | ✅ | grand texte seulement |
| **`primary-700` #3D7786** | **5,02:1** | ✅ | ✅ | **le plancher pour du texte teal** |
| `primary-800` #2F5F6A | 7,08:1 | ✅ | ✅ | AAA |
| `secondary-500` #ED843A | **2,64:1** | ❌ | ❌ | jamais du texte |
| `secondary-600` #C06920 | **3,98:1** | ❌ | ✅ | grand texte seulement |
| `secondary-700` #8F5017 | 5,85:1 | ✅ | ✅ | texte orange OK (mais lit « brun ») |
| `accent-400` #F8B044 | **1,86:1** | ❌ | ❌ | **jamais du texte, aucune taille** |
| `accent-600` #DF9E3D | 2,31:1 | ❌ | ❌ | jamais du texte |

**Ce que ça corrige d'une idée reçue** : `secondary-600` — qu'on croit « l'orange
sûr » — **échoue en texte normal** (3,98 < 4,5). Il n'existe **aucun** token orange
AA-safe en corps de texte avant le 700. Et sur fond teinté `primary-50`, même le
700 échoue (4,48) : il faut le **800**.

### La règle taille + fond (à retenir)

- **Texte teal** sur blanc → `primary-700` (normal) · `primary-800` sur fond teinté.
- **Texte orange** de corps → éviter ; réserver l'orange aux **fonds/gros display**.
  Un label a besoin d'un ton lisible (`ink-500` #6B7280 = 4,83:1, ou plus foncé).
- **Jaune** `accent-400` → **jamais** du texte. Fond, icône décorative, gros
  display sur sombre — c'est tout.
- **À ne PAS toucher** : le jaune/teal en **gros display sur héros sombre** passe
  (seuil grand texte) — un balayage naïf **casserait les héros marketing**.

### Trois échecs confirmés (lus en contexte, pas devinés)

| Où | Ce que c'est | Problème | Correctif |
|---|---|---|---|
| `src/pages/Dashboard.tsx:269` | Lien « voir tout » en `text-primary-600`, taille caption | 3,66:1 < 4,5 (petit texte) | → `text-primary-700` (le hover est déjà 700) |
| `src/pages/OnboardingQuestionnaireConversational.tsx:389,459` | Eyebrow orange `text-secondary-500` uppercase caption | 2,64:1 | → label lisible, orange gardé en accent (point/trait), pas en texte |
| `src/pages/marketing/MarketingContact.tsx:479` | Pastille jaune `text-accent-400` sur `bg-white` | 1,86:1 | → texte foncé, jaune en fond de pastille |

### Honnêteté sur les comptes

Le grep remonte **143 `text-primary-600`, 81 `text-secondary-600`, 38
`text-accent-400`** sur les deux surfaces. Ce sont des **bornes hautes, pas un
nombre d'échecs** : beaucoup sont des icônes décoratives (exemptées WCAG), du gros
display, ou du texte sur héros sombre (légitime). Donner « 262 échecs » serait de
la fausse précision — précisément ce que le corpus t'apprend à bannir. Le **vrai
nombre** demande un balayage par contexte (taille réelle + fond réel de chaque
élément). Ce balayage **est** le chantier P0 ; il se fait en navigateur avec une
sonde `getComputedStyle` qui remonte le fond effectif et calcule le ratio — je
peux la fournir.

---

## 🟠 Constat #2 — La répétition espacée est promise, pas câblée (M08 + honnêteté site)

Le module 8 range la **répétition espacée** (J+1/3/7/14/30) parmi les techniques
*« les plus robustes »*. Dans le produit :

- **App** — `src/components/patterns/Flashcard.tsx:4` est en-tête *« Flip card
  component for spaced repetition learning »*, `QuizComponent`/`LessonPlayer`
  citent *« répétition espacée »* comme raison d'être. Mais `FlashcardsViewer`
  est un **deck statique** (précédent / suivant / retourner / terminé) : **aucun**
  `due`, intervalle, prochaine révision, ni notation « su / à revoir ». Le seul
  `dueDate` du store est sur les **projets** (échéances de tâches), pas la révision.
- **Site** — `src/pages/marketing/MarketingLearningApp.tsx:129` vend *« Flashcards
  IA — **Répétition espacée**, cartes auto-générées »* sous l'eyebrow
  « Mémorisation ». Le site **promet deux choses** (espacement + génération IA) que
  l'app ne livre pas encore.

C'est un triple signal : **M08** (la technique), **M09/M12** (*« un cours adoré et
oublié est un échec produit »* + l'honnêteté comme critère produit), et **tes
règles d'intégrité marketing** (ne pas survendre).

**Le pont est déjà à moitié posé** : je viens d'ajouter la persistance
`quizAttempts` (horodatée, avec confiance) dans `persistence.ts`. Une planification
à intervalles expansifs se branche dessus sans repartir de zéro.

**Deux sorties — c'est une décision produit** (elle ira dans le projet final M12) :
1. **Livrer** un vrai SRS minimal (rating « su / à revoir » → intervalle J+1/3/7…),
   ce qui rend la promesse vraie et active la technique la plus robuste du corpus.
2. **Corriger la promesse** du site en attendant (retirer « répétition espacée » /
   « IA » de la carte Flashcards).
L'option 1 est la bonne à terme ; l'option 2 est le correctif d'honnêteté immédiat
si le SRS n'est pas priorisé tout de suite.

---

## 🟢 Ce qui est déjà solide (ne pas retoucher)

Un audit honnête protège ce qui marche :

- **M01 typo** — exactement 2 polices (`League Spartan` + `Nunito`, + mono
  technique). Conforme à la règle « 2 polices max ».
- **M02 Clarté** — **0 libellé vague** (« Découvrir », « En savoir plus »,
  « Commencer », « Valider », « Cliquez » = 0 occurrence). Les CTA réels sont
  verbe+objet : « Explorer la Learning App », « Se former », « Transformer mon
  organisation ». La piste informationnelle (M06) est bonne par construction.
- **M03 Interaction** — `focus-visible` dans **146 fichiers**, `useReducedMotion`
  dans **43**, états définis, `Skeleton` + `EmptyState` présents. La lentille
  interaction/accessibilité du mouvement est parmi les mieux tenues.
- **M04 Design System** — tokens en 3 couches, showcase `Components.tsx`, **>90
  composants**. C'est le socle sur lequel tout le reste tient.
- **M06 IA** — étiquetage dans les mots de l'utilisateur, fil d'Ariane, navigation
  à 3 niveaux (documentés dans `CLAUDE.md`).
- **Ancré récemment** — quiz à **confiance déclarée avant réponse** (récupération
  active + calibration, M08) et **firewall gamification** (la réflexion journal ne
  rapporte plus d'XP) : c'est la gamification *de maîtrise* que M03/M08 opposent à
  l'exploitation. Ton produit fait déjà, sur ces points, ce que le cours enseigne.

---

## ⚪ Lentilles process — M05 & M07 (non inspectables en code)

Le module 7 tient en une phrase : *« teste tôt, teste petit — 5 personnes bien
observées = ~85 % des problèmes »* (Nielsen & Landauer, 1993, taux de découverte,
pas garantie). Rien dans le repo ne montre de boucle de test d'utilisabilité.

**Recommandation minimale, pas un projet** : un test *think-aloud* à **5 personnes**
sur **un seul parcours** — « inscris-toi et démarre ta première leçon » — en
donnant une tâche, pas un mode d'emploi, et **sans aider**. Mesurer un **SUS**
(baseline ~68). C'est le geste le moins cher pour trouver où l'on se bloque avant
de coder la suite.

---

## Chantiers priorisés

| P | Chantier | Module | Surface | Effort |
|---|---|---|---|---|
| **P0** | Balayage contraste par contexte (sonde `getComputedStyle` → liste des vrais échecs → correctifs taille/fond-aware) | M01/M02 | app + site | M |
| **P0** | Décider : livrer un SRS minimal **ou** corriger la promesse site « répétition espacée / IA » | M08/M09 | app + site | S (promesse) / L (SRS) |
| **P1** | Correctifs contraste confirmés (Dashboard lien, eyebrow onboarding, pastille Contact) | M01/M02 | app + site | S |
| **P2** | Baseline utilisabilité : 1 test think-aloud à 5 sur inscription→1re leçon + SUS | M07 | app | S |
| **P2** | Découper `LessonPlayer` (1972 lignes) — complexité de composite | M04 | app | M |

---

## Ce que je livre maintenant (démonstration)

Pour que l'audit **produise du code, pas une fiche de lecture**, je shippe le
correctif le plus sûr et exemplaire — le lien Dashboard `primary-600 → primary-700`
(pur gain de contraste, cohérent avec le hover déjà en 700) — et j'instruis les
deux autres échecs confirmés avec leur contexte pour décision design. Le balayage
complet (P0) reste un chantier revu, pas un `sed` aveugle qui casserait les héros.

---

*Audit produit de première main (greps + calcul WCAG reproductibles) le
2026-07-24. Les verdicts « solide » reposent sur des preuves citées, pas sur une
impression — conformément à la règle d'hygiène documentaire du projet.*
