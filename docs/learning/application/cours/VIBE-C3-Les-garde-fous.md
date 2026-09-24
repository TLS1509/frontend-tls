# Vibe coding · Cours 3 — Les garde-fous : types, build gate, design system comme contraintes

**Piste : Vibe coding.**

## Structure EDRACT — ~25 minutes

> Suite de [VIBE-C1](VIBE-C1-Qu-est-ce-que-le-vibe-coding.md)/[C2](VIBE-C2-Le-document-de-pilotage.md),
> même gabarit. Le/la learner, c'est **toi**. L'étape *Appliquer* porte sur ton vrai
> dépôt. Sources en fin.

---

## 📖 INTRODUCTION

### Contexte et enjeu
VIBE-C1 : la **revue** est l'étape qui décide. Mais tu ne peux pas tout revoir à la main.
Les **garde-fous** sont des contraintes **automatiques** qui attrapent une classe
d'erreurs **avant** ta revue — pour que ton attention humaine se concentre sur ce que la
machine ne peut pas juger (la correction, l'intention). Un bon système de garde-fous rend
le vibe coding **sûr à l'échelle**.

### 🎯 Ce que tu vas apprendre
À la fin, tu sauras :
1. **Définir** un garde-fou et son rôle (déplacer du travail de la revue humaine vers la
   machine).
2. **Nommer** tes trois garde-fous principaux (types, build gate, design system).
3. **Choisir** le bon gate (et pourquoi un gate faible est pire que pas de gate).
4. **Ajouter** un garde-fou contre une erreur récurrente.

### 💡 Pourquoi c'est important
Sans garde-fous, chaque diff généré exige une revue exhaustive — épuisant, et faillible.
Avec, la machine élimine des pans entiers d'erreurs (fautes de type, classes cassées,
régressions) et tu revois **moins**, mais **mieux**.

---

## 1️⃣ ENGAGEMENT — Les 62 erreurs que le gate ne voyait pas

### 🎬 Scénario — un vrai, le tien
Pendant des semaines, le projet validait avec `npx tsc --noEmit` → « 0 erreur ».
Rassurant. Sauf que ce contrôle ne vérifiait que le tsconfig racine. Le jour où quelqu'un
a lancé le **vrai** build (`npm run build` = `tsc -b && vite build`, qui suit *tous* les
projets référencés) : **62 erreurs sur 31 fichiers**, accumulées en silence.

### 🤔 Question clé
Un garde-fou **faible** est **pire** que pas de garde-fou : il donne un vert mensonger,
donc une fausse confiance. La question du cours : *mes garde-fous mesurent-ils la vraie
chose, ou une approximation qui laisse passer l'erreur ?*

---

## 2️⃣ DÉCOUVRIR — Contenu principal

### 📚 PARTIE 1 · Ce qu'est un garde-fou
Un garde-fou = une **contrainte automatique** qui rejette du code invalide **sans** ta
revue. Son rôle : **déplacer du travail de vérification de l'humain vers la machine.**
Tout ce qu'un garde-fou attrape est du temps de revue que tu **n'as plus à dépenser** — et
une erreur qui **ne peut pas** passer, même si tu es fatiguée ou pressée.

### 📚 PARTIE 2 · Tes trois garde-fous principaux
| Garde-fou | Ce qu'il attrape | Dans ton dépôt |
|---|---|---|
| **Les types (TypeScript)** | Erreurs de forme : mauvais props, champ manquant, mauvais type | tout le code `.tsx` |
| **Le build gate** | Ce que les types + le bundler refusent **réellement** | `npm run build` (pas `npx tsc`) |
| **Le design system + convention** | Dérive visuelle : hex en dur, `rounded-full`, classe hors token | tokens `@theme`, règles `CLAUDE.md` |

Chaque couche attrape une classe différente. Ensemble = **défense en profondeur** :
plusieurs filets, pas un seul. Une erreur doit passer **tous** les filets pour arriver
jusqu'à toi.

### 📚 PARTIE 3 · Le bon gate, et pourquoi le faux est dangereux
Le principe **« compiler n'est pas correct »** (VIBE-C1) a un corollaire : **le gate doit
mesurer la vraie contrainte.** `npx tsc --noEmit` vérifie *un* tsconfig ; `npm run build`
vérifie *tous* les projets référencés **puis** bundle. Le premier est une **approximation**
qui donne un faux vert. Règle : **le seul état vert qui compte est celui du build réel** —
celui qui échouerait si le produit était cassé.

⚠️ Généralise : un test qui ne teste pas le vrai chemin, un lint désactivé sur les
fichiers générés, un « ça marche chez moi » — tous des gates faibles. Un gate faible
**endort** la vigilance ; c'est pire que son absence.

### 📚 PARTIE 4 · Ajouter un garde-fou contre une erreur récurrente
Quand l'IA (ou toi) refait **la même** erreur, la bonne réponse n'est pas « faire plus
attention » — c'est **rendre l'erreur impossible ou détectable**. Trois leviers :
- **Un type plus strict** (rendre l'état invalide inexprimable).
- **Un test** qui échoue si le comportement régresse.
- **Une règle de lint / une convention** documentée dans `CLAUDE.md` (VIBE-C2).

La question à se poser après chaque bug : *quel garde-fou aurait attrapé ça tout seul ?*

---

## 3️⃣ RÉFLÉCHIR — Quiz et journal

### Quiz (5 min)
De mémoire, **confiance déclarée avant de vérifier** (🟢/🟡/🔴).

1. Quel est le **rôle** d'un garde-fou dans le vibe coding ?
2. Pourquoi un gate **faible** est-il pire que pas de gate ?
3. Cite tes **trois** garde-fous principaux et une erreur que chacun attrape.

<details>
<summary>Vérifier</summary>

1. **Déplacer du travail de vérification de l'humain vers la machine** — attraper une
   classe d'erreurs avant ta revue.
2. Il donne un **vert mensonger** → fausse confiance → l'erreur passe (les 62 erreurs que
   `npx tsc` ne voyait pas).
3. **Types** (mauvais props) · **build gate** `npm run build` (ce qui casse vraiment) ·
   **design system/convention** (hex en dur, `rounded-full`).
</details>

### 💭 Journal personnel
À écrire : *quelle erreur l'IA me refait-elle régulièrement — et quel garde-fou (type
plus strict, test, règle) la rendrait impossible plutôt que « à surveiller » ?*

---

## 4️⃣ APPLIQUER — Ton chantier réel

### 🛠️ Cas : transformer une erreur récurrente en garde-fou
Repère **une** classe d'erreur qui revient (une prop oubliée, un token en dur, une
régression).

### Ta mission (cette semaine)
1. **Nomme** l'erreur récurrente.
2. **Choisis le levier** : type plus strict ? test ? règle `CLAUDE.md` ?
3. **Pose le garde-fou** (même minimal) et vérifie qu'il **échoue** bien sur l'erreur
   (un garde-fou qu'on n'a pas vu échouer ne garde rien).
4. Confirme que ton gate de référence est bien `npm run build`, pas une approximation.

### Correction suggérée
Piège n°1 : « je ferai plus attention » — la vigilance humaine n'est pas un garde-fou,
elle fatigue. Piège n°2 : poser un garde-fou et ne **jamais** le voir échouer — s'il ne
peut pas rougir, il ne protège rien. Provoque l'erreur une fois pour vérifier.

---

## 5️⃣ CONSOLIDER — Synthèse

### ✅ Ce que tu as appris
- Un garde-fou **déplace la vérification** de l'humain vers la machine.
- Trois filets : **types · build gate · design system** = défense en profondeur.
- **Le gate doit mesurer la vraie contrainte** ; un gate faible endort.
- Contre une erreur récurrente : la rendre **impossible ou détectable**, pas « surveillée ».

### 🎯 Les 3 mantras
| Mantra | Sens |
|---|---|
| **« La machine attrape ce qu'elle peut »** | Pour que ta revue se concentre sur le reste |
| **« Un gate faible est pire que pas de gate »** | Le faux vert endort la vigilance |
| **« Rendre l'erreur impossible, pas surveillée »** | Type/test/règle > « faire attention » |

### 💡 Citation
> *« Compiler n'est pas correct — et un contrôle qui ment sur "compiler" est le plus
> dangereux de tous. »* (leçon des 62 erreurs silencieuses)

---

## 6️⃣ TRANSFÉRER — Ce que tu fais cette semaine

1. **Le livrable** : un garde-fou posé contre une erreur récurrente, **vu échouer** une
   fois pour preuve.
2. **Rappel espacé** — **à J+2 puis J+7**, sans rouvrir ce doc : redonne tes **3
   garde-fous** et **pourquoi un gate faible est dangereux**. Blocage → revue J+14.

---

## 📦 CONTENUS COMPLÉMENTAIRES
- **Pour aller plus loin** : la doc TypeScript (types comme contraintes) · le concept de
  *defense in depth* · ton `CLAUDE.md` § « le gate TypeScript est `npm run build` ».
- **Prochain cours** : VIBE-C4 — revoir du code qu'on n'a pas écrit.

---

## Sources
- **Microsoft / TypeScript Handbook.** typescriptlang.org → les types comme garde-fou
  (rendre l'état invalide inexprimable).
- **Beck, K. (2002).** *Test-Driven Development: By Example.* Addison-Wesley. → le test
  comme filet de régression.
- **Exemple interne vérifiable** : `CLAUDE.md` du dépôt TLS — « le gate est `npm run
  build`, PAS `npx tsc --noEmit` » (cas des 62 erreurs silencieuses).

---

*VIBE-C3 rédigé le 2026-07-24, structure EDRACT (paraphrase des modules IP), ancré sur ton
dépôt. Prochain : VIBE-C4 — la revue.*
