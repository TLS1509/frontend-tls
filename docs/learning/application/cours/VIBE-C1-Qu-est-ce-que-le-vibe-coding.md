# Vibe coding · Cours 1 — Qu'est-ce que le vibe coding (intention → prompt → revue → itération)

**Piste : Vibe coding.**

## Structure EDRACT — ~25 minutes

> Même gabarit que tes modules IP ([`00-CADRE-PEDAGOGIQUE.md`](00-CADRE-PEDAGOGIQUE.md)).
> Le/la learner, c'est **toi** — tu construis TLS en pilotant une IA (moi), pas en
> tapant chaque ligne. Méta-assumé : tu es *littéralement* en train de vibe-coder ce
> produit pendant que tu lis un cours sur le vibe coding. L'étape *Appliquer* porte
> sur ton vrai dépôt. Sources vérifiables en fin.

---

## 📖 INTRODUCTION

### Contexte et enjeu
Tu ne codes pas la learning app à la main. Tu **décris une intention**, une IA
génère du code, tu le **revois**, tu itères. C'est une manière de produire du
logiciel radicalement nouvelle — puissante, et piégeuse. Puissante parce qu'à deux
fondateurs elle démultiplie ce que tu peux livrer. Piégeuse parce qu'il est facile
d'accepter du code qui *a l'air* juste et qui pourrit en silence.

### 🎯 Ce que tu vas apprendre
À la fin, tu sauras :
1. **Définir** le vibe coding et le **distinguer** de « l'ingénierie assistée par IA ».
2. **Décrire** la boucle intention → prompt → génération → **revue** → itération, et
   nommer l'étape qui fait toute la différence.
3. **Situer** où le vibe coding excelle et où il échoue.
4. **Identifier** où se déplace le vrai goulot d'étranglement quand on code par prompt.

### 💡 Pourquoi c'est important
Le talent qui compte, en vibe coding, n'est plus « savoir écrire la boucle for ».
C'est **savoir spécifier une intention** et **savoir reconnaître du bon code d'un
mauvais**. Ces deux compétences décident si l'IA te fait gagner des semaines ou te
fabrique une dette invisible. Ce cours pose le vocabulaire ; les suivants outillent
la revue et les garde-fous.

---

## 1️⃣ ENGAGEMENT — 62 erreurs qui n'existaient pas

### 🎬 Scénario — un vrai, tiré de ton dépôt
Pendant des semaines, le projet a validé son code avec `npx tsc --noEmit` → « 0
erreur ». Rassurant. Sauf que ce garde-fou est **plus faible que le build réel** :
le jour où quelqu'un a lancé `npm run build`, il y avait **62 erreurs TypeScript sur
31 fichiers**. Elles s'étaient accumulées **en silence**, parce que le contrôle
utilisé ne les voyait pas.

### 🤔 Question clé
Rien, ici, n'est un défaut de l'IA : le code généré « marchait » à l'écran. Le
problème est **humain et systémique** — quel signal on choisit de faire confiance.
Le vibe coding ne supprime pas le besoin de vérité ; **il le déplace**. La question
du cours : *quand je fais générer du code, à quoi est-ce que je fais confiance pour
savoir qu'il est bon ?*

---

## 2️⃣ DÉCOUVRIR — Contenu principal

### 📚 PARTIE 1 · La définition, honnête
Le terme « vibe coding » a été forgé par **Andrej Karpathy** (février 2025) : *« un
nouveau genre de code où tu te laisses aller aux vibes, tu embrasses les
exponentielles, et tu oublies que le code existe même. »* Chez lui, c'était une
**description à moitié amusée** d'un mode où l'on accepte les suggestions sans les
lire.

**Distinction cruciale** (Simon Willison, mars 2025) : *tout* le code assisté par IA
n'est **pas** du vibe coding. Il y a deux régimes :

| | Vibe coding « pur » | Ingénierie assistée par IA |
|---|---|---|
| On lit le code généré ? | Non — on juge au résultat | Oui — on revoit chaque diff |
| Bon pour | Prototype jetable, exploration, week-end | Code qui va en production et qu'on maintient |
| Risque | Dette invisible, bugs subtils, faille | Plus lent, mais tenable |

⚠️ **Ce que tu fais sur TLS n'est pas du vibe coding pur — et c'est heureux.** Un
produit qu'on maintient et qui manie des données d'apprenants exige le **second**
régime. « Vibe coding » est le nom populaire ; la pratique saine, c'est *piloter et
revoir*. Le cours garde le mot parce que c'est celui que tout le monde emploie, mais
il enseigne le régime qui tient.

### 📚 PARTIE 2 · La boucle, et l'étape qui décide de tout
```
   INTENTION → PROMPT → GÉNÉRATION → ⟨ REVUE ⟩ → ITÉRATION
   (ce que      (le cadrage   (l'IA        ↑          (on
    tu veux)     du besoin)    propose)     │           corrige,
                                            │           on relance)
                              c'est ICI que se joue
                           « ça ship » vs « ça pourrit »
```
Les trois premières étapes, tout le monde les fait. **C'est la REVUE qui sépare le
vibe coding qui livre du vibe coding qui rote.** Sauter la revue, c'est déléguer non
seulement l'écriture mais **le jugement** — et le jugement ne se délègue pas à un
système qui n'a pas ta responsabilité.

### 📚 PARTIE 3 · Où ça excelle, où ça échoue
**Là où l'IA est excellente** : le code répétitif (formulaires, mappings,
composants qui ressemblent à d'autres), l'exploration (« montre-moi trois
approches »), les API qu'on ne connaît pas, les refactors **couverts par des tests
ou des types**, retrouver un usage dans un gros dépôt.

**Là où elle est dangereuse** : la **sécurité** (auth, permissions, secrets), l'**architecture** (les décisions difficiles à défaire), la **correction subtile** (un
calcul faux qui *a l'air* juste), et tout ce que **tu ne peux pas vérifier** faute
de savoir à quoi ressemble « juste ». Règle : plus une décision est difficile à
défaire, moins on la laisse aux vibes.

### 📚 PARTIE 4 · Où se déplace le goulot
Quand écrire le code coûte presque zéro, le travail rare **n'est plus d'écrire**.
Il devient : **spécifier** clairement (l'intention et les contraintes) et **revoir**
sérieusement (lire, mettre à l'épreuve, refuser). C'est un renversement : le vibe
coding ne te transforme pas en dactylo plus rapide, il te transforme en **directrice
de la spécification et de la revue**. D'où l'importance des deux prochains cours : le
document de pilotage (VIBE-C2) et les garde-fous (VIBE-C3).

---

## 3️⃣ RÉFLÉCHIR — Quiz et journal

### Quiz (5 min)
De mémoire, **confiance déclarée avant de vérifier** (🟢/🟡/🔴), comme le quiz de ton app.

1. Quelle est la **différence** entre le vibe coding « pur » et l'ingénierie
   assistée par IA ?
2. Dans la boucle, quelle **étape** sépare le code qui ship du code qui pourrit ?
3. Cite **deux** domaines où il ne faut **pas** se fier aux vibes, et pourquoi.

<details>
<summary>Vérifier (après avoir répondu)</summary>

1. Le vibe coding pur **ne lit pas** le code généré (bon pour le jetable) ;
   l'ingénierie assistée **revoit chaque diff** (nécessaire pour la production).
2. La **REVUE**.
3. Ex. **sécurité** (une faille ne se voit pas à l'écran) et **architecture** (les
   décisions difficiles à défaire) ; aussi la correction subtile et tout ce qu'on ne
   sait pas vérifier.
</details>

### 💭 Journal personnel
À écrire : *la dernière fois que j'ai accepté un changement de l'IA sans vraiment le
lire — qu'est-ce qui m'a fait confiance ? le résultat à l'écran, un test, ma
compréhension du diff ? Et est-ce que ce signal était fiable ?*

---

## 4️⃣ APPLIQUER — Ton chantier réel

### 🛠️ Cas : une revue à froid
Ouvre **un** changement récent généré avec moi (par exemple un composant, ou un des
lots qu'on vient de committer). Passe-le à cette grille de revue minimale :

1. **Est-ce que je comprends chaque ligne ?** (si non → drapeau rouge)
2. **Comment je sais que c'est juste ?** (un test ? les types ? je l'ai fait tourner ?
   « ça a l'air bon » ne compte pas)
3. **Qu'est-ce que ça touche que je n'avais pas prévu ?** (effets de bord, autres
   fichiers)
4. **Est-ce réversible facilement ?** (sinon, ça méritait plus de vigilance)

### Ta mission (cette semaine)
Choisis **un vrai besoin** sur la learning app et écris-en le **prompt** avec trois
blocs explicites : **Intention** (ce que je veux, et pourquoi) · **Contexte** (les
fichiers, les contraintes du design system, ce à quoi ça se relie) · **Critères
d'acceptation** (comment on saura que c'est bon — le build passe, tel comportement,
tel token). Puis lance-le avec moi et **revois** le diff avec la grille ci-dessus.

### Correction suggérée
Le piège n°1 : un prompt qui dit *quoi faire* mais pas *comment on saura que c'est
juste*. Sans critère d'acceptation, tu ne peux pas revoir — tu ne peux que « trouver
ça bien ». Le piège n°2 : accepter un gros diff parce qu'il compile. Compiler ≠
correct (souviens-toi des 62 erreurs que `tsc` ne voyait pas).

---

## 5️⃣ CONSOLIDER — Synthèse

### ✅ Ce que tu as appris
- Le vibe coding, c'est piloter une IA par l'intention ; le régime **sain** revoit
  le code, il ne l'accepte pas à l'aveugle.
- La boucle est intention → prompt → génération → **revue** → itération ; la
  **revue** est l'étape qui décide.
- L'IA excelle sur le répétitif et l'exploration, échoue sur sécurité, archi,
  correction subtile, et tout l'invérifiable.
- Le goulot se déplace de **écrire** vers **spécifier + revoir**.

### 🎯 Les 3 mantras
| Mantra | Sens |
|---|---|
| **« Compiler n'est pas correct »** | Le vert d'un build faible ment (cf. les 62 erreurs) |
| **« On ne délègue pas le jugement »** | L'IA écrit ; la responsabilité reste à toi |
| **« Plus c'est dur à défaire, moins on vibe »** | Sécurité et archi ne se pilotent pas aux vibes |

### 💡 Citation
> *« Tout le code assisté par IA n'est pas du vibe coding. »* — Simon Willison (2025),
> sur la différence entre se laisser porter et rester responsable du code.

---

## 6️⃣ TRANSFÉRER — Ce que tu fais cette semaine

1. **Le livrable** : un prompt structuré (Intention / Contexte / Critères
   d'acceptation) pour un vrai besoin TLS, exécuté et **revu** avec la grille. Garde
   ce prompt — il devient un patron réutilisable (on l'affine en VIBE-C2).
2. **Rappel espacé** — **à J+2 puis J+7**, sans rouvrir ce doc : redonne de mémoire
   les **cinq étapes de la boucle** et **entoure celle qui décide**. Blocage → revue
   à J+14.

---

## 📦 CONTENUS COMPLÉMENTAIRES
- **Pour aller plus loin** : le fil d'origine d'Andrej Karpathy (fév. 2025) ·
  l'article de Simon Willison « Not all AI-assisted programming is vibe coding »
  (mars 2025).
- **Prochain cours** : VIBE-C2 — le `CLAUDE.md` comme *system prompt* de ton projet
  (le document qui rend la revue et la génération fiables).

---

## Sources
- **Karpathy, A. (2 février 2025).** Publication à l'origine du terme « vibe coding »
  (réseau X/Twitter). → origine et sens premier du terme.
- **Willison, S. (mars 2025).** *Not all AI-assisted programming is vibe coding.*
  simonwillison.net → la distinction vibe coding pur / ingénierie assistée.
- **Exemple interne vérifiable** : `CLAUDE.md` du dépôt TLS, section « Le gate
  TypeScript est `npm run build`, PAS `npx tsc --noEmit` » → le cas des 62 erreurs
  silencieuses (build réel vs contrôle faible).

---

*VIBE-C1 rédigé le 2026-07-24, structure EDRACT, ancré sur ton dépôt réel. Prochain :
VIBE-C2 — le document de pilotage.*
