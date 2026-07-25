# PM · Cours 5 — North Star & métriques qui ne peuvent pas monter contre l'apprenant

**Piste : Product Management appliqué à la learning app.**

## Structure EDRACT — ~30 minutes

> Suite de [PM-C1→C4](PM-C1-Qu-est-ce-que-le-Product-Management.md). Le/la learner,
> c'est **toi**. L'étape *Appliquer* propose une North Star pour TLS. Contexte réel,
> hypothèses étiquetées. Sources vérifiables en fin.

---

## 📖 INTRODUCTION

### Contexte et enjeu
Tu sais fixer des objectifs (PM-C3) et prioriser (PM-C4). Reste **la** question :
quel **seul chiffre** guide le produit ? Une équipe sans North Star tire dans dix
directions ; une équipe avec la **mauvaise** North Star tire fort dans la mauvaise.
Ce cours te fait choisir une étoile qui **ne peut pas briller contre l'apprenant**.

### 🎯 Ce que tu vas apprendre
À la fin, tu sauras :
1. **Définir** ce qu'est une North Star metric et à quoi elle sert.
2. **Rejeter** une North Star gameable (qui monte contre l'apprenant).
3. **Distinguer** métrique **avancée** (leading) et **retardée** (lagging).
4. **Construire** une North Star + ses métriques d'entrée pour TLS.

### 💡 Pourquoi c'est important
La North Star est le résumé d'une phrase de « pourquoi on existe ». Mal choisie, elle
transforme toute l'énergie de l'équipe en dette — chacun optimise, de bonne foi, la
mauvaise chose (loi de Goodhart, PM-C3).

---

## 1️⃣ ENGAGEMENT — L'étoile qui brille dans le noir

### 🎬 Scénario — un vrai piège
North Star tentante : **« heures passées sur la plateforme »**. Facile à mesurer,
flatteuse à montrer. Sauf qu'elle **monte** quand le produit est confus (on cherche),
ou addictif (on scrolle) — deux échecs. Tu pourrais « gagner » en dégradant
l'expérience.

### 🤔 Question clé
Une North Star doit capturer la **valeur rendue**, pas le **temps capté**. La question
du cours : *mon étoile peut-elle monter alors que l'apprenant apprend moins ?* Si oui,
ce n'est pas une étoile — c'est un piège lumineux.

---

## 2️⃣ DÉCOUVRIR — Contenu principal

### 📚 PARTIE 1 · Qu'est-ce qu'une North Star metric
C'est **la métrique unique qui capture le mieux la valeur que ton produit délivre à ses
utilisateurs** (concept popularisé par Sean Ellis ; formalisé par Amplitude en *North
Star Framework*). Une seule, pour aligner l'équipe. Elle n'est pas le chiffre d'affaires
(c'est un résultat, pas un moteur) ni une vanity metric (temps, inscrits).

Bonne North Star = à l'**intersection** de la valeur pour l'utilisateur **et** de la
valeur pour l'entreprise. En EdTech, cette intersection, c'est **l'apprentissage réel** :
si l'apprenant progresse vraiment, il reste, il recommande, il paie.

### 📚 PARTIE 2 · La contrainte EdTech — « pas contre l'apprenant »
La North Star de TLS doit **échouer si on triche**. Comparons :

| Candidate | Monte-t-elle contre l'apprenant ? | Verdict |
|---|---|---|
| Heures passées | Oui (confusion, addiction) | ❌ |
| Taux de complétion | Oui (on simplifie le cours) | ❌ |
| Inscrits | Oui (marketing sans usage) | ❌ |
| **Apprenants ayant atteint un objectif de compétence (validé)** | Non — exige un apprentissage réel | ✅ |

Une North Star d'apprentissage se rapproche de *« nombre d'apprenants ayant atteint un
objectif de compétence sur la période »*. On ne la fait pas monter en trichant : la
validation exige la compétence. (C'est aussi pourquoi ton **passeport** est stratégique —
il matérialise cette validation.)

### 📚 PARTIE 3 · Leading vs lagging, et les métriques d'entrée
- **Lagging (retardée)** : l'apprentissage réel se mesure **lentement** (transfert au
  travail, rétention à long terme). Trop lent pour piloter au quotidien.
- **Leading (avancée)** : des **proxys** qui **prédisent** l'apprentissage et se
  mesurent vite — sans être gameables. Ex. : **activation** (1re réussite réelle),
  **rétention à J+30** (l'a-t-on encore ?), **quiz réussis à confiance calibrée**.

Le **North Star Framework** (Amplitude) : **une** North Star + **3 à 5 métriques
d'entrée** qui la pilotent. Tu agis sur les entrées ; l'étoile suit.
```
        NORTH STAR : apprenants ayant validé une compétence /trimestre
        ↑            ↑            ↑
   activation   rétention J+30   quiz calibrés réussis
   (entrée 1)    (entrée 2)       (entrée 3)
```

### 📚 PARTIE 4 · Le test anti-Goodhart
Avant d'adopter une North Star, pose **une** question : *« quelqu'un pourrait-il la
faire monter en nuisant à l'apprenant ? »* Si la réponse est oui, elle est morte. Si
non, elle est robuste. Et couple-la à un **contre-indicateur** (PM-C3) : par ex., si la
North Star monte mais que la rétention J+30 chute, c'est un signal d'alarme, pas une
victoire.

---

## 3️⃣ RÉFLÉCHIR — Quiz et journal

### Quiz (5 min)
De mémoire, **confiance déclarée avant de vérifier** (🟢/🟡/🔴).

1. Qu'est-ce qu'une North Star metric capture, et combien en a-t-on ?
2. Pourquoi « heures passées » est-elle une mauvaise North Star pour TLS ?
3. Différence entre métrique **avancée** (leading) et **retardée** (lagging) ?

<details>
<summary>Vérifier</summary>

1. La **valeur rendue à l'utilisateur** ; **une seule**, pour aligner l'équipe.
2. Elle **monte contre l'apprenant** (confusion, addiction) — elle mesure le temps
   capté, pas la valeur rendue.
3. **Lagging** = se mesure lentement (apprentissage réel, transfert) ; **leading** =
   proxy rapide qui la prédit (activation, rétention J+30) sans être gameable.
</details>

### 💭 Journal personnel
À écrire : *si je devais tout miser sur **un** chiffre pour prouver que TLS fait
apprendre, lequel — et suis-je sûre qu'il ne peut pas monter en trichant ?*

---

## 4️⃣ APPLIQUER — Ton chantier réel

### 🛠️ Cas : l'étoile de TLS
Propose la North Star de la learning app.

### Ta mission (cette semaine)
1. **Écris** une North Star candidate (une phrase, un chiffre).
2. **Teste-la** anti-Goodhart : peut-elle monter contre l'apprenant ? Si oui, corrige.
3. **Ajoute 3 métriques d'entrée** (leading) qui la pilotent.
4. **Ajoute un contre-indicateur** qui déclenche l'alarme si l'étoile ment.

### Correction suggérée
Piège n°1 : choisir une North Star **business** (revenu, inscrits) — c'est un résultat,
pas un moteur d'usage. Piège n°2 : une étoile **lagging** impilotable au quotidien —
il faut des entrées leading. La bonne étoile est à l'intersection valeur-apprenant /
valeur-entreprise, et **résiste à la triche**.

---

## 5️⃣ CONSOLIDER — Synthèse

### ✅ Ce que tu as appris
- Une North Star = **une** métrique de la **valeur rendue** ; elle aligne l'équipe.
- Pour TLS, elle doit **échouer si on triche** → autour de « compétences validées ».
- **Leading vs lagging** : piloter par des proxys avancés (activation, rétention J+30).
- Framework : **1 North Star + 3-5 entrées** + un contre-indicateur.

### 🎯 Les 3 mantras
| Mantra | Sens |
|---|---|
| **« La valeur rendue, pas le temps capté »** | Heures passées ≠ apprentissage |
| **« Une étoile qui ne peut pas mentir »** | Si on peut la truquer contre l'apprenant, elle est morte |
| **« Agir sur les entrées »** | On pilote les leading, l'étoile suit |

### 💡 Citation
> *« La North Star est la métrique unique qui capture le mieux la valeur que ton
> produit délivre à ses clients. »* — d'après Amplitude, *North Star Framework*.

---

## 6️⃣ TRANSFÉRER — Ce que tu fais cette semaine

1. **Le livrable** : ta North Star TLS + 3 métriques d'entrée + 1 contre-indicateur,
   testée anti-Goodhart. Elle cadrera la spec de PM-C6.
2. **Rappel espacé** — **à J+2 puis J+7**, sans rouvrir ce doc : redonne le **test
   anti-Goodhart** et la structure **North Star + entrées**. Blocage → revue J+14.

---

## 📦 CONTENUS COMPLÉMENTAIRES
- **Pour aller plus loin** : Amplitude, *The North Star Playbook* (John Cutler) · Sean
  Ellis sur la North Star metric · Ries, *The Lean Startup* (actionable metrics).
- **Prochain cours** : PM-C6 — écrire une spec de feature (la répétition espacée comme
  cas réel). Le capstone de la piste PM.

---

## Sources
- **Ellis, S.** North Star Metric (concept d'origine, growth). → la métrique unique de
  valeur.
- **Amplitude / Cutler, J.** *The North Star Playbook.* amplitude.com → North Star +
  métriques d'entrée, leading vs lagging.
- **Ries, E. (2011).** *The Lean Startup.* → actionable vs vanity metrics (rappel PM-C3).

---

*PM-C5 rédigé le 2026-07-24, structure EDRACT (paraphrase des modules IP), contexte TLS
réel. Prochain : PM-C6 — spec de feature (capstone).*
