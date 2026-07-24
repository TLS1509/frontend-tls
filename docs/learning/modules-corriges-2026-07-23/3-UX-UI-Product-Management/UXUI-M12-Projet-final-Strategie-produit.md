# MODULE 12 : PROJET FINAL — LA STRATÉGIE PRODUIT DE TLS

**Durée : 55 minutes + projet asynchrone**

> **Version corrigée le 2026-07-24.** Le brief d'origine contenait **deux versions
> contradictoires** du contexte TLS, dont une entièrement fabriquée (15 000
> apprenants, 1,2 M€ d'ARR, équipe de 12, 12 parcours). Cette version rétablit le
> **contexte TLS réel** et retire les exemples de résultats inventés. La structure
> pédagogique (vision, feuille de route, RICE, spec de fonctionnalité) est
> conservée. Journal en fin de document.

---

## Le brief

Vous conduisez la **réflexion produit de The Learning Society** : définir une
vision produit et une feuille de route à six mois, en appliquant les onze modules
précédents à un cas **réel — le vôtre**.

⚠️ **Ce projet ne fait pas de vous un CPO.** La version précédente s'intitulait
« Devenir CPO ». Un poste de direction produit s'acquiert par des années
d'expérience, pas par un parcours de formation. L'objectif ici est d'**acquérir et
d'exercer la boîte à outils produit** (recherche, priorisation, métriques, feuille
de route) sur un cas concret — pas de revendiquer un titre.

---

## CONTEXTE TLS — le vrai

> ⚠️ **Ce contexte remplace la fiche fabriquée du brief d'origine.** Travaillez sur
> la réalité de TLS, pas sur des chiffres inventés. Un projet fondé sur de fausses
> données produit de fausses décisions — c'est précisément ce que ce parcours
> apprend à éviter.

**L'entreprise**
- The Learning Society (TLS), France — organisme de formation
- **Fondateurs** : Chloé Mimault et Pierre-Armand Dennery *(l'équipe réelle — pas une équipe de 12)*
- Positionnement : formation professionnelle adossée aux sciences de l'apprentissage

**L'offre réelle, aujourd'hui**
- **Deux parcours** : Neuro-Éducation et Organisation Apprenante
- **Une application d'apprentissage en développement** (la « learning app »)
- *Ni 12 parcours, ni cohorte de 15 000 apprenants : TLS est à un stade précoce, et
  c'est la vérité à partir de laquelle raisonner.*

**Ce que TLS a de distinctif** *(à faire valoir, honnêtement)*
- Une **pédagogie réellement sourcée** — les parcours ont été fact-checkés,
  débarrassés des neuromythes, adossés à des sources académiques vérifiées
- Une **doctrine anti-dark-patterns** : pas de manipulation de l'engagement, label
  IA visible, pas de faux « spectacle »
- Une **identité chaleureuse** assumée (principe « Warmth as moat »)

⚠️ **Ce qu'il ne faut PAS inventer pour ce projet** : un nombre d'apprenants, un
chiffre d'affaires, un taux d'abandon, une part de payants. Si vous avez besoin
d'une hypothèse, **écrivez-la comme une hypothèse** (« supposons que… »), jamais
comme une donnée.

**Les vrais enjeux d'un produit à ce stade** (à formuler comme des questions
ouvertes, pas comme des métriques fabriquées) :
1. Comment faire vivre le premier apprentissage réussi (activation) ?
2. Comment mesurer un apprentissage *réel*, pas seulement de l'engagement ?
3. Comment prioriser entre l'app, les parcours et l'outillage, à deux fondateurs ?
4. Quelle est la vraie proposition de valeur face à des plateformes établies ?

---

## LIVRABLE 1 · Vision produit

**Format** : présentation, ~10 diapositives.

1. **Résumé** — une phrase de vision + 3 piliers + une North Star (module 11)
2-3. **Synthèse de recherche** — 2 ou 3 personas fondés sur le **niveau, l'objectif
   et le contexte** (module 5), pas sur des styles. ⚠️ S'ils sont illustratifs
   faute d'entretiens réels, **le dire** — pas de fausses citations d'apprenants
4-5. **Analyse de marché** — le paysage concurrentiel réel, et la différenciation
   **défendable** de TLS (pédagogie sourcée, honnêteté, chaleur)
6-7. **Vision produit** — où TLS veut aller, en 3-4 thèmes
8-9. **Métriques de succès** — une North Star qui **ne peut pas monter au détriment
   de l'apprenant** (module 11), et ses métriques de soutien
10. **Risques et parades**

⚠️ **La North Star à ne pas choisir** : « heures passées sur la plateforme ». Elle
peut monter parce que le produit est confus ou addictif. Une North Star
d'apprentissage se rapproche de « apprenants ayant atteint un objectif de
compétence ».

---

## LIVRABLE 2 · Feuille de route à six mois

**Étape 1 — Générer des idées de fonctionnalités.** Le brief d'origine en propose
quinze (app mobile, gamification, tuteur IA, projets collaboratifs, révision
espacée, tableau de bord B2B…). Elles restent de bons exemples de départ.

**Étape 2 — Prioriser avec RICE** (module 10). Pour chaque fonctionnalité :
Reach × Impact × Confidence ÷ Effort.

> **Exemple conservé — l'app mobile** *(RICE est bien appliqué ici)*
> - Reach : 10 · Impact : 5 · Confidence : 80 % · Effort : 6 mois-personne
> - **RICE = (10 × 5 × 0,8) ÷ 6 = 6,67**
>
> ⚠️ Mais notez : ces valeurs d'entrée sont des **estimations**. Le score ordonne,
> il ne décide pas (module 10). Et à deux fondateurs, l'« Effort » pèse bien plus
> que dans une équipe de 12.

**Étape 3 — Organiser** les 8 meilleures en feuille de route Q1/Q2 + backlog.
⚠️ Passez chaque fonctionnalité au **filtre EdTech** (module 10) : RGPD sur les
données d'apprenants, et validité pédagogique — une fonctionnalité qui augmente
l'engagement en nuisant à l'apprentissage est écartée, quel que soit son score.

**Étape 4 — Spécifier une fonctionnalité** en détail : problème résolu, user
stories, métriques de succès, parcours utilisateur, maquettes, considérations
techniques, risques, plan de lancement.

---

## Livrables et évaluation

Quatre livrables : vision (~10 diapos) · feuille de route (table RICE + planning) ·
spec d'une fonctionnalité · présentation.

| Critère | Points |
|---|---|
| Clarté de la vision (piliers, North Star honnête) | 20 |
| Recherche (personas fondés, honnêtes sur leur statut) | 15 |
| Rigueur de priorisation (RICE appliqué, arbitrages explicites) | 25 |
| Qualité de la spec | 20 |
| Présentation | 10 |
| Pensée stratégique (arbitrages, risques, filtre EdTech) | 10 |

Seuil : 70/100.

⚠️ **Critère implicite, transversal** : **l'honnêteté des chiffres.** Un projet
qui présente une hypothèse comme une donnée, ou qui réintroduit des résultats
fabriqués, ne peut pas valider — c'est la leçon centrale de tout le corpus.

---

## 📋 Journal des corrections — 2026-07-24

| # | Version précédente | Correction |
|---|---|---|
| 1 | Titre « Devenir CPO de TLS » | « La stratégie produit de TLS » — un parcours ne fait pas un CPO |
| 2 | « 15 000 apprenants » | Retiré — TLS est à un stade précoce ; raisonner sur le réel |
| 3 | « ARR 1,2 M€ → 3 M€ » | Retiré — chiffre fabriqué |
| 4 | « Équipe de 12 (2 designers, 4 devs…) » | Corrigé : **Mimault + Dennery**, les deux fondateurs réels |
| 5 | « 12 parcours » | Corrigé : **2 parcours** (Neuro-Éducation, Organisation Apprenante) + app en dev |
| 6 | « 40 % d'abandon après le module 2 », « 70 % gratuits / 30 % payants » | Retirés — métriques inventées ; remplacés par des questions ouvertes |
| 7 | Exemple de vision « 80 % de complétion (vs 15 % industrie), salaires 120-180 K€ » | Supprimé — surpromesses fabriquées |
| 8 | Personas « avec 3-5 citations users » présentés comme données réelles | Requalifiés : illustratifs si pas d'entretiens, et le **dire** |
| 9 | North Star « heures passées » implicitement validée | Signalée comme mauvaise North Star (module 11) |
| 10 | Aucun filtre honnêteté sur les chiffres | Ajouté comme critère transversal |

**Conservé** : la structure (vision, feuille de route, spec, présentation) · la
liste de 15 fonctionnalités comme exemples · **l'exercice RICE et son calcul
(6,67)** · la grille d'évaluation. Ce qui était pédagogiquement bon est resté ;
seul le contexte fabriqué a été remplacé par le réel.
