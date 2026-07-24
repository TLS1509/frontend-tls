# Passeport & Journal — cahiers ↔ frontend, critique

> **2026-07-23.** Suite de [`CRITIQUE-BOUCLE-APPRENANT.md`](CRITIQUE-BOUCLE-APPRENANT.md),
> sur les deux pièces que cette première passe n'avait pas ouvertes : le Passeport (cahier 02)
> et le Journal (cahier 07).
> Chaque constat porte son fichier, sa ligne ou son comptage. Vérifié au rendu quand c'est visuel.

---

## Le constat qui commande tout : le passeport ne peut pas recevoir de preuve

C'est le même défaut qu'au quiz, mais un cran plus grave, parce qu'il touche le pilier du produit.

### Ce que dit le cahier 02

Le mot **evidence** y apparaît **13 fois**. Ce n'est pas un détail, c'est un principe de
conception :

> - « Servir de fondation aux Journal de bord (**evidence linking**) »
> - « Apprenant peut **linker evidence** journal → competence progression »
> - « Coach utilise **evidence** pour valider progression (via JAC) »
> - « **Evidence stored** : Assessment notes + evidence linked pour audit trail »

Le passeport, tel que spécifié, est un **dossier de preuves** : chaque niveau Dreyfus est censé
être *adossé* à quelque chose — une réflexion, un projet, une validation de coach.

### Ce que dit le code

L'entité qui porte une compétence, [`types/learning.ts:152`](../../src/types/learning.ts) :

```ts
export interface LearnerCompetency {
  userId; competenceId;
  currentLevel; targetLevel;
  points; nextLevelPoints;
  daysSinceActivity; lastUpdated;
  // ← et c'est tout : aucun champ de preuve
}
```

**Aucun champ `evidence`, aucune relation vers une preuve, aucun historique.** Le niveau Dreyfus
est un simple nombre. On sait qu'un apprenant est « niveau 3 » ; on ne sait **pas pourquoi**, ni
sur quoi ça repose, ni qui l'a validé.

### Ce que confirme le rendu

Vérifié dans le navigateur, onglet *Compétences* du passeport : le mot **« preuve » n'apparaît
nulle part** sur la page. Ni « evidence », ni lien vers un quiz. Le pilier documentaire du
cahier 02 est **absent de l'écran**.

### Pourquoi c'est le nœud de tout ce qu'on a exploré cette semaine

| Ce qui dépend de la preuve | État |
|---|---|
| Le passeport comme dossier crédible *(cahier 02)* | vide |
| Learning Buddy — *« l'échange devient une preuve »* | impossible, rien ne reçoit la preuve |
| La sortie du régime AI Act via un passeport **déclaratif validé** | il n'y a rien à valider |
| La qualité citable des niveaux *(métriques)* | un niveau sans preuve n'est pas défendable |

**Le passeport affiche un résultat sans son dossier.** C'est joliment rendu — radar, progression
pondérée à 2.8/5, objectifs — mais c'est une **façade sur une base vide**. La question posée dans
[`LEARNING-BUDDY-IN-SITU.md`](LEARNING-BUDDY-IN-SITU.md), *« d'où viennent les preuves ? »*, a ici
sa réponse structurelle : **le modèle de données ne prévoit pas de les stocker.**

---

## Le lien Journal → Passeport est à sens unique

Et c'est le point le plus frustrant, parce qu'il est *presque* là.

### Le journal sait pointer une compétence

[`types/learning.ts:320`](../../src/types/learning.ts) :

```ts
export interface JournalEntry {
  // …
  linkedCompetenceId?: string;   // ✅ le journal SAIT viser une compétence
  linkedItemId?: string;
  linkedItemType?: ItemType;
}
```

Et [`JournalNewEntry.tsx:142`](../../src/pages/JournalNewEntry.tsx) lit bien un `competenceId`
depuis l'URL : on peut créer une entrée *rattachée* à une compétence.

### Mais la compétence ne sait pas qu'on la pointe

Le lien existe d'un côté (`JournalEntry → competenceId`) et **pas de l'autre**
(`LearnerCompetency` n'a pas de liste d'entrées liées). Résultat :

- Le journal peut dire « cette réflexion concerne la compétence X ».
- La compétence X **ne peut pas** afficher « voici les 4 réflexions qui m'adossent ».

Le pont est construit, mais une seule voie est ouverte. **C'est un demi-lien**, et c'est ce qui
donne l'illusion que la fonctionnalité existe alors qu'elle ne boucle pas.

---

## Ce que le Journal fait bien, en revanche

Il faut le dire, parce que c'est du vrai travail de conception pédagogique.

- **Questions structurantes** — le champ `structuredAnswers` et la mention **EDRA-R** dans le code
  montrent que le journal n'est pas une zone de texte libre : il guide la réflexion par un cadre.
  C'est de la réflexion outillée, pas du blog.
- **Humeur** (`mood`) — capter l'état affectif est un vrai marqueur d'engagement, souvent oublié.
- **Lien à l'item déclencheur** (`linkedItemId`) — le journal sait d'où vient la réflexion.
- **XP attribué** (`xpAwarded`) — la réflexion est valorisée, pas seulement la complétion.

**Le Journal est le module le mieux pensé de la boucle.** Son seul défaut est de ne pas savoir
rendre au passeport ce qu'il collecte.

---

## Lecture pédagogique et cognitive

### Le passeport matérialise bien un principe fort

Rendre visible sa propre progression — un radar, un niveau, un écart à l'objectif — c'est de la
**métacognition outillée**, et c'est un des leviers les mieux établis. Voir où l'on en est aide à
apprendre. **Sur ce plan, le passeport fait le bon travail.**

### Mais un niveau sans preuve fragilise ce qu'il prétend renforcer

Le modèle Dreyfus repose sur une distinction qualitative — le novice suit des règles, l'expert
lit la situation. Réduire cette distinction à **un nombre et des points XP**
(`points`, `nextLevelPoints`) glisse vers la gamification : on « monte de niveau » comme dans un
jeu, au lieu d'*attester* une compétence par une trace.

La preuve n'est donc pas qu'une exigence réglementaire ou documentaire. **C'est ce qui distingue
un passeport de compétences d'un compteur de points.** Sans elle, le niveau est déclaratif au pire
sens du terme : affirmé, jamais montré.

### Le rapport à l'atrophie est un bon signal, à ne pas gâcher

Le champ `daysSinceActivity` — « atrophie » — est une intuition juste : une compétence non
pratiquée régresse. Mais faire *baisser un niveau* sur la seule inactivité, sans preuve d'un côté
ni de l'autre, serait vécu comme punitif et arbitraire. **L'atrophie n'a de sens que couplée à la
preuve** : c'est la fraîcheur de la dernière trace qui doit moduler la confiance dans le niveau,
pas un simple compteur de jours.

---

## Ce que je proposerais, dans l'ordre

La première action est la clé de voûte. Les suivantes en découlent.

| # | Action | Fichier | Effort | Débloque |
|---|---|---|---|---|
| 1 | **Ajouter `evidence: EvidenceRef[]` à `LearnerCompetency`** | `types/learning.ts` | moyen | Tout le reste de cette liste |
| 2 | Backlink : `LearnerCompetency` liste ses entrées de journal | `persistence.ts` | moyen | Le passeport montre son dossier |
| 3 | Faire du **résultat de quiz une preuve** *(now qu'il est persisté)* | `LessonPlayer` → passeport | moyen | Boucle leçon → passeport |
| 4 | Afficher les preuves sur la fiche compétence | `PasseportCompetenceDetail.tsx` | moyen | Rend le dossier visible |
| 5 | Coupler l'atrophie à la fraîcheur de la dernière preuve | `persistence.ts` | faible | Atrophie non punitive |
| 6 | Le JAC (validation coach) écrit une preuve `coach_validated` | `PasseportJac.tsx` | moyen | Le volet « validé par un pair » du RGPD |

### Ce que pourrait être `EvidenceRef`

Une esquisse, pas une spécification — c'est une décision de conception à valider :

```ts
interface EvidenceRef {
  type: 'journal' | 'quiz' | 'project' | 'coach_validation' | 'self_declared';
  sourceId: string;         // l'entrée de journal, le passage de quiz…
  createdAt: string;
  note?: string;
  validatedBy?: string;     // renseigné si un pair/coach a validé → pertinent RGPD
}
```

Le `type: 'coach_validation'` est le même objet qui **matérialise l'intervention humaine
significative** discutée dans [`REGLEMENTAIRE-ET-SBO.md`](REGLEMENTAIRE-ET-SBO.md). La conception
produit et la conformité se rejoignent sur ce champ — c'est rare, autant en profiter.

---

## Ce que je n'ai pas regardé

- **`PasseportObjectifs`, `PasseportRoadmap`, `PasseportHistorique`, `PasseportJac`** — je me suis
  concentré sur le socle (compétence + preuve). Ces quatre pages méritent leur propre passe.
- **Le JAC en détail** — c'est le mécanisme de validation par le coach, donc central pour la
  preuve et pour le RGPD. À ouvrir spécifiquement.
- **Le rendu du Journal** — j'ai lu ses types et son câblage, pas parcouru ses écrans.
- **La gamification (cahier 05)** — le couple points/XP vient de là ; l'équilibre entre
  gamification et attestation se joue à cheval sur les deux cahiers.

---

## Journal

**2026-07-23** — Création. Constat central : **`LearnerCompetency` n'a aucun champ de preuve**,
alors que le cahier 02 fait de l'*evidence* un pilier (13 occurrences). Le niveau Dreyfus est un
nombre sans dossier — vérifié au rendu, le mot « preuve » est absent de la page. Le lien
Journal → Passeport est **à sens unique** (`JournalEntry.linkedCompetenceId` existe, le backlink
non). Le Journal est par ailleurs le module le mieux conçu de la boucle (questions structurantes
EDRA-R, humeur, lien à l'item). Proposition clé : une entité `EvidenceRef` dont le type
`coach_validation` sert **à la fois** le produit et la conformité RGPD.
