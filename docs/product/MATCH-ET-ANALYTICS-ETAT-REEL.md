# « Match » & Analytics — état réel, et le plus petit incrément crédible

> **Objet :** répondre précisément à *« que peut-on dire du Match sur le site sans mentir, et que faudrait-il pour que ce soit vrai ? »*
> **Date :** 28 juillet 2026 · **Méthode :** lecture ciblée des CDC 02/10/11/12bis + `CDC-10-ANALYTICS-PROPOSITIONS` + `REVUE-TRANSVERSALE-CDC`, croisée avec le code (`src/`).
> ⚠️ **Limite assumée :** le back-office WordPress est hors de ce dépôt. « Non construit » signifie *non construit dans ce repo* ; rien n'indique qu'un backend existe ailleurs, mais rien ne le prouve non plus.

---

## 1. Le piège n°1 : « Match » désigne trois choses différentes

| # | Fonctionnalité | Version | Effort annoncé | État de validation |
|---|---|---|---|---|
| #4 | **Matching IA pour Missions** (apprenant ↔ mission) | V1 | 60-80 h | validée, **4 blockers** |
| #5 | **AI Coach Matching** (apprenant ↔ coach) | V1 **et** V3 selon la page | 40-60 h | **aucune validation** |
| #10 | **Auto-configuration de projet par IA** (talent ↔ tâches) — *« THE MOAT 🎯 »* | **V2 (2027+)** | 200-280 h | **validation explicitement refusée** |

**C'est #10 qui correspond au « Match » de Learn→Do→Match** — le seul qui affecte des personnes à du travail. Et c'est le moins spécifié du corpus :

> *« AI-Driven Project Auto-Configuration (V2) is **TOO COMPLEX to validate now**. […] Will require dedicated architecture review + spike work with Pierre. Too important to rush »* — CDC 12bis:1355-1368

Le cahier 11 confirme : *« This section documents the strategic vision for **V2+ (2027+)**. **MVP doesn't include this** »* (11:138).

---

## 2. Il n'existe aucune formule de scoring

Aucun algorithme, aucune pondération, nulle part dans les 4 cahiers. Le plus proche est une description de prompt : *« Génère 3 propositions de missions (ranked by relevance) / Calcule taux d'adéquation »* (12bis:770-773), avec une sortie mockée : `92% / 78% / 65%`.

**Et c'est signalé en interne comme techniquement faux :**
> *« DÉFAUT 4 — Le « score de confiance en % » est un mythe technique. […] **Un LLM ne produit pas de confiance calibrée fiable.** »* — REVUE-TRANSVERSALE-CDC:116-121

🚫 **Conséquence directe : le « taux d'adéquation 92 % » ne doit jamais apparaître sur le site.**

---

## 3. Mais le noyau honnête existe déjà — et il est déterministe

Le cahier 11 contient un vrai matcher, sans IA, jamais nommé comme tel (11:261-267, 11:373, 11:392) :

```
Pour chaque (personne, tâche) :
  requis = tâche.requiredDreyfusLevel
  réel   = LearnerCompetency.currentLevel   ← validé uniquement
  écart  = requis - réel

  écart ≤ 0    → PRÊT              (démarre immédiatement)
  écart ≤ 0,5  → UPSKILLING        (parcours en parallèle)
  écart ≥ 1    → BINÔME MENTOR
  aucun niveau → SOURCER (marketplace / expert)

Classer l'équipe par nb de PRÊT, puis par fraîcheur de la preuve.
```

**Pourquoi c'est meilleur que la version IA, pas moins bien :**
- **explicable** à un DRH · **reproductible** · **auditable**
- **coût zéro** par appel, **aucune hallucination possible**
- **conforme AI Act par construction** : l'IA propose, l'humain affecte
- *« Notre matching est déterministe et traçable, pas une boîte noire »* est une **meilleure** phrase commerciale que *« notre IA calcule un taux d'adéquation de 92 % »*

---

## 4. Ce qui manque pour l'alimenter

| Donnée requise | Existe ? |
|---|---|
| `LearnerCompetency.currentLevel` (Dreyfus validé) | 🟡 le type existe, **vide par construction** tant qu'un humain n'a pas validé |
| **Niveau Dreyfus requis par tâche/mission** | ❌ **aucun référentiel peuplé** |
| Historique missions complétées | ❌ non tracké (pas d'analytics) |
| Disponibilité / charge | ❌ non modélisé |
| Structure org (départements, rôles) | ❌ non modélisé |

⚠️ **Le paradoxe utile :** la décision (juste) de rendre `currentLevel` *validé-uniquement* a pour effet que **l'entrée du matcher est vide tant qu'aucun coach n'a validé**. L'auto-évaluation ne peut pas se substituer — c'est précisément le trou de triche que la règle ferme.

---

## 5. Analytics : 0 %, et surtout **aucune métrique citable**

- **Zéro émission d'événement** dans le repo : aucun `trackEvent` / `posthog` / `amplitude` / `mixpanel`.
- **Ce qui existe est une façade** : `src/data/analytics.ts` (246 lignes de mocks) alimente `useAnalyticsStore` → **les dashboards Coach affichent des chiffres inventés**.
- **Un seul signal réel persiste depuis le 23/07** : les résultats de quiz (avant, ils partaient dans un `console.log`). C'est un type d'événement, en `localStorage`, sur une machine. Ce n'est pas de l'analytics.
- **La chaîne de dépendance est circulaire et bloquée en amont** : l'inventaire des événements est **P0 « BLOCKING all modules »** et le fichier qu'il référence **n'existe pas**. Cahier 10 dépend des cahiers #1 à #9, **tous « Bloquant ? OUI »**.

> **La conséquence commerciale, écrite noir sur blanc :** TLS n'a *« **aucune métrique citable** — ni satisfaction, ni complétion, ni adoption. C'est la contrainte qui bride l'acquisition et la vente »* (CDC-10-ANALYTICS-PROPOSITIONS:92-95).

**→ Publier le moindre chiffre d'usage aujourd'hui serait une fabrication.**

---

## 6. Verdict pour le site

### ❌ Interdits absolus
- Tout **« taux d'adéquation » en %** (nombre mythique)
- Toute **stat** de complétion / satisfaction / adoption
- **« L'IA affecte les talents aux projets »** → c'est la feature #10 non validée **et** la description d'un usage **haut risque AI Act**
- Toute formulation impliquant une **décision RH automatisée**

### ✅ Vrai et défendable aujourd'hui
- **La méthode** : SBO, bandes Dreyfus 1-5, validation par preuve, JAC.
- **La colonne vertébrale de preuve, dans le code** : `EvidenceRef` + `validateCompetency`, auto-évaluation **cloisonnée** du niveau validé. → *« Un niveau n'est inscrit que lorsqu'un humain l'a validé contre une rubrique. »* **La plupart des plateformes « skills » ne peuvent pas dire ça.**
- **Learn → Do** au présent : leçons, quiz (désormais persistés), missions, journal, coaching.

### 🎯 La formulation qui tient
> **« Chaque compétence validée est adossée à une preuve — c'est ce qui rendra le matching possible. »**

Learn→Do au présent, **Match = la destination vers laquelle l'architecture est construite**. Précis, différenciant, et **ça ne vieillit pas mal**.
⚠️ **Éviter « bientôt » avec une date** : les dates du corpus ont déjà glissé, et la revue interne juge les estimations *« non budgétables en l'état »*.

---

## 7. Le plus petit incrément crédible

| # | Incrément | Débloque | Effort | Confiance |
|---|---|---|---|---|
| **1** | **Référentiel d'exigence** : `requiredDreyfusLevel` par tâche/mission, peuplé sur quelques missions réelles | le côté droit du matcher | **jours** | haute |
| **2** | **Matcher déterministe par bandes** (§3) : PRÊT / UPSKILLING / MENTOR / SOURCER, classé, avec la **trace de preuve** comme justification. **Sans LLM.** L'humain affecte. | un **vrai Match, démontrable et explicable** | **1-2 semaines** | haute |
| **3** | **Peupler les niveaux validés** — flux de validation coach au-delà de `user-demo` | le rend **vrai**, pas seulement démontrable | **semaines** (+ backend, auth/rôles réels) | moyenne |
| *(plus tard)* | Feature #4 telle que spécifiée (Mistral, 3 missions, % ) | gain marginal sur l'étape 2 | 60-80 h **à ré-estimer** + 4 blockers | faible |
| *(plus tard)* | Feature #10 auto-config | le moat réel | 200-280 h nominal → **des mois** | faible |

**Les étapes 1 et 2 suffisent pour une revendication défendable.**

**Côté analytics, en parallèle et indépendant :**
1. Ajouter **5 champs** (`surface`, `context` sur `Event` ; `sample_size`, `perimeter`, `citable_status` sur `DashboardMetric`) — **heures**, et ça ne change pas le périmètre MVP.
2. Écrire l'**inventaire des événements** (le P0 qui bloque tout) — **jours**.
3. Capture + queue + agrégation — **semaines**, nécessite un backend.
4. Une **métrique citable** (avec n et périmètre déclarés) — **des mois**.

---

## 8. ✅ DÉCISION PRISE (28/07) — xAPI **et** serveur MCP, à terme

> **Le Passeport est-il censé être portable ?** → **OUI, et sur deux axes.**
> Décision de Chloé Mimault, 28/07/2026 : le Passeport sera exposé **à la fois en xAPI et en serveur MCP**.

### Les deux ne se concurrencent pas — ils répondent à deux questions différentes

| | **xAPI** | **Serveur MCP** |
|---|---|---|
| Question | *Comment la preuve entre et sort dans un **format standard** ?* | *Comment un **assistant lit** le Passeport en direct ?* |
| Nature | **Format d'échange** (statements actor-verb-object) | **Surface d'accès** (resources / tools) |
| Débloque | portabilité, interop SIRH/LMS, *learner wallet* | Learning Buddy, assistants tiers, **inférence payée par l'hôte** |
| Standard | HR Open Standards + ADL — vise explicitement les *« learner wallet initiatives »* | protocole MCP |

**C'est cohérent avec l'annexe A.4 de l'étude** : en serveur MCP, *« l'inférence est payée par l'assistant hôte (coût fixe pour TLS) »* — **la seule architecture économiquement saine à 2 personnes**. Et xAPI, c'est *« la différence entre vendre une application et vendre une couche »*.

→ **L'ambition « couche SBO » est officiellement ON.** Le site pourra dire « couche » — **mais pas encore « compatible xAPI »** tant que ce n'est pas implémenté.

### ⚠️ La conséquence critique : l'invariant doit descendre au niveau API

Aujourd'hui, la règle *« seule une validation humaine signée écrit `assertedLevel` »* vit dans le **store Zustand** (`validateCompetency` comme unique writer). **Une règle côté client n'est pas une règle.**

Dès qu'il y a un serveur MCP ou une API xAPI, **n'importe quel client peut écrire**. Si l'invariant n'est pas rejoué **à la frontière serveur**, un assistant tiers pourra **gonfler un niveau de compétence** — et tout l'actif « preuve » s'effondre, puisque sa valeur vient précisément de ce qu'il est infalsifiable.

**À graver :** l'invariant des 3 régimes est une **règle serveur**, pas un détail d'implémentation front.

### Le séquencement recommandé

| Ordre | Action | Effort | Pourquoi maintenant |
|---|---|---|---|
| **1** | Ajouter **`surface`** (`app \| mcp \| buddy \| bo_client \| import`) + **`context`** sur `Event` | **heures** | La proposition anticipait déjà `mcp` et `buddy`. **Sans ce champ, la surface MCP est invisible à sa propre analytics.** Zéro regret. |
| **2** | Écrire le **mapping `EvidenceRef` ↔ statement xAPI** (design seulement, pas d'implémentation) | **jours** | **Prouver que ça mappe.** Si le modèle de preuve ne se traduit pas proprement en xAPI, mieux vaut l'apprendre maintenant qu'après 18 mois de données. Les 3 régimes → verbes/extensions distincts. |
| **3** | **Serveur MCP en lecture seule** sur le Passeport | **semaines** | Démontrable, raconte la « couche » de façon tangible, et **zéro risque d'invariant** (pas d'écriture). |
| **4** | Émission xAPI réelle | plus tard | nécessite le backend de toute façon |
| **5** | **Écriture via MCP** — en dernier, et avec l'invariant serveur | plus tard | c'est là que le risque de falsification apparaît |

### Deux points de vigilance

- **RGPD / AI Act :** un serveur MCP expose des données de compétences **hors du système**. Si l'assistant d'un recruteur les lit, on entre dans le territoire de la **décision RH** (Annexe III). Le régime d'accès et le consentement doivent être conçus **avant** l'ouverture, pas après.
- **Collision de nom, revisitée :** aller sur le terrain du *credential portable* nous met **dans le même espace** que le Passeport de Compétences de l'État (Caisse des Dépôts, ~43 M d'utilisateurs). C'est un risque de marque **et** potentiellement une opportunité d'interop — à traiter comme une question stratégique, pas seulement comme un problème de nom.

---

## 9. Correction de date à retenir

L'échéance **AI Act haut risque est le 2 décembre 2027**, pas août 2026 (Digital Omnibus signé le 08/07/2026). *« Il reste environ 17 mois, pas dix jours. »* → Le sujet reste **structurant pour l'architecture** (l'IA propose, l'humain tranche), mais **non urgent au calendrier**.

---

## 10. Incertitudes assumées

- Le **back-office WordPress est hors du repo** : si de la capture d'événements ou du matching y existent, le « non construit » est faux pour ces couches. Rien ne le suggère.
- **Toutes les estimations d'heures sont celles des auteurs** ; la revue transversale les juge contradictoires entre cahiers et *« non budgétables en l'état »*. Les paliers jours/semaines/mois sont une lecture de périmètre, pas un chiffrage validé.
- **Feature #5 (Coach Matching)** est **V1 dans un tableau et V3-hors-scope dans un autre**, sans section de validation. À trancher avant tout plan.

---

*Fin — 28 juillet 2026.*
