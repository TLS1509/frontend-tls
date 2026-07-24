# La boucle d'apprentissage — cahiers ↔ frontend, critique

> **2026-07-23.** Confrontation entre les cahiers Learning App et le code React, sous l'angle
> UI/UX, sciences cognitives et ingénierie pédagogique.
> **Périmètre volontairement resserré** sur la boucle centrale — apprendre, être testé, réfléchir
> — parce que c'est là que les trois disciplines se rejoignent. Voir §6 pour ce que je n'ai pas
> regardé.
>
> Chaque constat est **vérifiable** : fichier et ligne donnés. Aucune impression.

---

## 1. Ce qui est bon, et qu'il faut dire d'abord

### L'arc de leçon est de la vraie ingénierie pédagogique

[`LessonPlayer.tsx:46`](../../src/pages/LessonPlayer.tsx) définit huit sections :

> Introduction → Engagement → **Découvrir** → **Quiz** → **Réfléchir** → **Appliquer** →
> Conclusion → **Transfert**

Ce n'est pas un empilement de contenus. La séquence recoupe les *First Principles of Instruction*
de Merrill — activation, démonstration, application, intégration — et se termine par un
**transfert**, l'étape que la plupart des plateformes omettent. Quelqu'un a conçu ça, ce n'est pas
un accident.

### Les blocs de contenu sont riches et typés

Neuf types : image, vidéo, gif, graphique, schéma, interactif, **annotation**, embed, et un bloc
`split` deux colonnes. Le typage TypeScript rend les combinaisons explicites — c'est propre.

### La réflexion est réellement persistée

Le bloc `annotation` porte une `journalKey` et écrit dans le store :
[`LessonPlayer.tsx:1528`](../../src/pages/LessonPlayer.tsx) → `setReflectionInStore(...)`.
La progression aussi — section courante, sections complétées, plan d'action.
**La boucle de réflexion est branchée.**

---

## 2. Le constat central — ce que l'apprenant écrit est gardé, ce sur quoi il est testé est jeté

C'est l'asymétrie la plus coûteuse du produit, et elle tient en une ligne.

```tsx
// LessonPlayer.tsx:1039
<QuizComponent
  questions={quizQuestions}
  onComplete={(results) => console.log('Quiz done', results)}
/>
```

**Les résultats du quiz partent dans la console.** Aucune écriture au store, aucun événement,
aucune trace. Alors que juste à côté, la moindre phrase tapée dans une annotation est persistée.

### Pourquoi ça compte plus qu'un oubli technique

| Ce qui est perdu | Conséquence |
|---|---|
| La preuve de maîtrise | **Le passeport ne peut pas se remplir depuis les leçons** |
| L'événement d'apprentissage | Le cahier 10 n'aura rien à mesurer |
| Le signal de difficulté | Aucune remédiation possible |
| L'historique de réponse | Aucune répétition espacée envisageable |

C'est le chaînon manquant que j'ai cherché pendant trois documents. La question posée dans
[`LEARNING-BUDDY-IN-SITU.md`](LEARNING-BUDDY-IN-SITU.md) — *« d'où viennent les preuves du
passeport ? »* — a sa réponse ici : **elles existent, et on les jette.**

---

## 3. Les quatre autres constats

### A. Le quiz ne donne pas d'explication

[`QuizComponent.tsx:4-8`](../../src/components/ui/QuizComponent.tsx) définit :

```ts
export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;   // ← et c'est tout
}
```

**Aucun champ d'explication.** L'apprenant apprend qu'il a faux, jamais pourquoi.

Or c'est la distinction la mieux établie de la littérature sur le feedback : le *knowledge of
result* — juste / faux — produit un effet faible, tandis que le **feedback correctif élaboré**,
qui explique l'écart, produit un effet fort. Répondre faux sans comprendre pourquoi peut même
renforcer l'erreur.

**Correction :** ajouter `explanation?: string` par question, et — plus utile encore —
`distractorRationale?: Record<number, string>` pour expliquer *pourquoi telle mauvaise réponse
attire*. C'est là que se joue la valeur pédagogique d'un distracteur bien écrit.

### B. Aucune adaptation au niveau de l'apprenant

Comptage sur les 1 955 lignes de `LessonPlayer.tsx` :

| Terme | Occurrences |
|---|---:|
| `dreyfus` | **0** |
| `competence` | **0** |
| `niveau` | **0** |
| `prerequisite` | **0** |

**La leçon est rigoureusement identique pour un novice et pour un expert.** Le passeport existe,
le modèle Dreyfus est spécifié au cahier 02 — mais le lecteur de leçon ne les consulte jamais.

C'est un écart stratégique, pas seulement technique : le différenciateur que j'ai identifié pour
Learning Buddy — *« réponse calibrée sur ton niveau réel »* — **n'existe pas dans l'application
elle-même**. Difficile de le promettre ailleurs.

### C. Les flashcards n'ont pas de répétition espacée

[`FlashcardsViewer.tsx:128-131`](../../src/pages/FlashcardsViewer.tsx) — l'état complet :

```ts
currentCardIndex · isFlipped · completedCards · showCompletion
```

Pas d'intervalle, pas de note de difficulté, pas de prochaine échéance. **C'est un paquet de
cartes que l'on retourne, pas un système de mémorisation.**

L'effet de test fonctionne quand même — se tester bat relire. Mais l'espacement est ce qui rend
la mémorisation *efficace* plutôt que seulement *réelle*. Sans lui, l'apprenant révise autant les
cartes qu'il maîtrise que celles qui résistent.

**Correction minimale :** trois boutons après retournement — *à revoir · hésitant · acquis* —
et un intervalle simple. Un algorithme de type SM-2 tient en quarante lignes. Le vrai coût
n'est pas là : c'est la persistance, donc le même chaînon manquant qu'au §2.

### D. Des chaînes en anglais dans un produit français

[`QuizComponent.tsx`](../../src/components/ui/QuizComponent.tsx) :

| Ligne | Texte |
|---|---|
| 94 | « You got {n} out of {m} questions correct. » |
| 108 | « Question {n} of {m} » |
| 187 | « Submit » / « Next » |

Au moment exact où l'apprenant reçoit son résultat — le moment le plus chargé émotionnellement de
la leçon — l'interface change de langue.

---

## 4. Lecture cognitive et pédagogique

*Note de méthode : je m'appuie sur des mécanismes solidement établis et j'écarte volontairement
les mythes recensés dans votre propre fact-check — styles d'apprentissage VARK, « 8 secondes
d'attention », cerveau triunique.*

### Le récupération est présente mais mal placée

Le quiz est **une section sur huit**, en position 4. Or l'effet de test est d'autant plus fort
qu'il est **distribué** : plusieurs rappels courts battent un contrôle unique, et un rappel en fin
de leçon consolide mieux qu'un rappel au milieu.

**Proposition** — sans toucher à l'arc en huit sections :

- Une ou deux questions **dans** *Découvrir*, pas seulement après.
- Un rappel court en *Conclusion*, sur ce qui a été vu au début.
- Un rappel différé à J+3, quand la persistance existera.

### L'effet de génération est déjà exploité, et bien

Les blocs `annotation` demandent à l'apprenant de **produire** avant de recevoir. C'est l'effet de
génération, et c'est un des leviers les plus robustes. **Rien à corriger — à étendre.**

### La charge cognitive mérite une vérification

Neuf types de blocs, dont `split` à deux colonnes et des embeds vidéo. Deux risques classiques :

- **Effet de redondance** — un texte qui répète une narration vidéo dégrade l'apprentissage au
  lieu de le renforcer.
- **Attention partagée** — un schéma et sa légende éloignés obligent à faire le lien mentalement.

Je n'ai pas mesuré ces effets sur des leçons réelles : cela demande de regarder du contenu
produit, pas du code. **À vérifier sur trois leçons existantes.**

### Ce que la calibration métacognitive apporterait

Une question simple avant de révéler la réponse — *« à quel point es-tu sûr ? »* — fait deux
choses : elle améliore la rétention, et elle produit **une donnée de calibration** qui vaut de
l'or pour un passeport de compétences. Un apprenant sûr et faux n'est pas au même endroit qu'un
apprenant hésitant et juste, et le modèle Dreyfus s'y prête particulièrement.

**Un champ, une question. C'est le meilleur rapport valeur/effort de toute cette liste.**

---

## 5. Ce que je proposerais, dans l'ordre

| # | Action | Fichier | Effort | Débloque |
|---|---|---|---|---|
| 1 | **Persister les résultats de quiz** au lieu du `console.log` | `LessonPlayer.tsx:1039` | faible | Passeport · cahier 10 · remédiation · espacement |
| 2 | Ajouter `explanation` et `distractorRationale` | `QuizComponent.tsx` | faible | Qualité du feedback |
| 3 | Traduire les trois chaînes anglaises | `QuizComponent.tsx` | trivial | Cohérence |
| 4 | Ajouter la question de confiance avant révélation | `QuizComponent.tsx` | faible | **Calibration Dreyfus** |
| 5 | Distribuer le rappel — questions dans *Découvrir* + *Conclusion* | données de leçon | moyen | Rétention |
| 6 | Notation de difficulté + intervalle sur les flashcards | `FlashcardsViewer.tsx` | moyen | Mémorisation efficace |
| 7 | Lire le niveau Dreyfus dans le lecteur de leçon | `LessonPlayer.tsx` | élevé | **Le différenciateur produit** |

**Les quatre premières sont petites et concentrées sur deux fichiers.** La première conditionne
presque tout le reste — c'est elle qui transforme une leçon en preuve.

---

## 6. Ce que je n'ai pas regardé

Par honnêteté sur le périmètre.

- **Les pages Passeport** (6 fichiers) — je n'ai pas vérifié comment une preuve y est ajoutée,
  ni si l'ajout manuel est possible.
- **Le Journal** (5 fichiers) — la boucle réflexive côté page dédiée.
- **Le contenu pédagogique réel** — mes remarques sur la charge cognitive portent sur des
  possibilités offertes par le code, pas sur des leçons produites.
- **Les cahiers 01, 01bis, 02, 07 ligne à ligne** — j'ai lu leurs résumés et les sections
  utiles, pas l'intégralité.
- **L'accessibilité et le responsive** de ces écrans — un autre axe, un autre passage.
- **Les autres viewers** — Astuces, Complementary, Video.

---

## Journal

**2026-07-23** — Création. Constat central : l'arc pédagogique en huit sections est solide et la
réflexion est persistée, mais **les résultats de quiz partent dans un `console.log`** — d'où
l'impossibilité de remplir le passeport depuis les leçons, qui était la question ouverte de
[`LEARNING-BUDDY-IN-SITU.md`](LEARNING-BUDDY-IN-SITU.md). Quatre autres constats vérifiés :
pas d'explication au quiz, **zéro lecture du niveau Dreyfus** dans le lecteur de leçon, flashcards
sans répétition espacée, chaînes anglaises au moment du résultat.
