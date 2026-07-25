# Avis critique — la méthode STRIDE (pilier Conseil)

**2026-07-24 · Revue de première main** : page méthode Notion (« Notre Méthode —
STRIDE » → `MarketingMethode.tsx`), `docs/_canon/FACTS-CANON.md`,
`docs/_canon/AUDIT-COHERENCE.md`, `docs/ops/CARTOGRAPHIE-OUTILLAGE.md`, + benchmark
académique (Deloitte, Bersin, Kotter). Objet : un avis **franc et constructif** sur la
méthodologie conseil signature de TLS, en vue du pilier Accompagnement/Conseil SBO.

> **Nature de ce document** : critique d'un **artefact** (l'état actuel de la méthode
> et de sa documentation), pas d'une personne. STRIDE est la méthode de Pierre-Armand
> Dennery ; l'objectif ici est de la **renforcer** avant de la mettre en avant
> commercialement.

---

## 1 · Ce qui est solide (à protéger)

STRIDE **n'est pas** une coquille vide : la page méthode définit **6 étapes, chacune
avec un livrable**, et **4 principes**. L'ossature est un cycle de transformation
**sain** :

| Étape | Objectif | Livrable |
|---|---|---|
| **S** — S'orienter | Audit de maturité, cartographie compétences (Dreyfus), cas d'usage prioritaires | Rapport audit + feuille de route |
| **T** — Tester | Proof of concept sur un périmètre réel, cohorte pilote | Dispositif pilote validé |
| **R** — Réaliser | Construction de l'infrastructure pédagogique (agents IA, référentiels) | Dispositif conçu & testé |
| **I** — Intégrer | Connexion au SI (LMS, SIRH, CRM) | Stack connectée |
| **D** — Déployer | Mise en production + conduite du changement | Solution déployée + tableau de bord |
| **É** — Évoluer | Amélioration continue pilotée par la donnée | Tableau de bord + backlog mensuel |

**Les 4 principes sont un vrai différenciateur** — et le meilleur de STRIDE :
- **Cadre avant outil** (la méthode survit aux changements de techno),
- **Validation par étape** (un livrable à chaque jalon, pas de big bang),
- **Co-conception** (« votre capacité à le refaire seul·e mesure notre succès » =
  anti-vendor-lock-in),
- **Mesurable de bout en bout**.

C'est du bon conseil, honnête et vendable. **Ne pas l'affaiblir — l'amplifier.**

---

## 2 · Verdict franc

**La méthode est solide sur le fond ; son exécution documentaire et son positionnement
la fragilisent.** Trois défauts lui coûtent de la crédibilité *maintenant*, et un
quatrième, stratégique, la met en porte-à-faux avec la littérature du domaine.

---

## 3 · Les trois défauts qui coûtent en rendez-vous

> **✅ MISE À JOUR 2026-07-24 — le CODE (site live) est déjà conforme sur ① et ②.**
> Vérifié de première main : `MarketingMethode.tsx` porte le bon ordre canonique (Tester ·
> **Réaliser** · Intégrer…) **et** a retiré les métriques chiffrées (commentaire ligne 110 :
> *« Pas de métrique chiffrée sur ces cas illustratifs — règle absolue FACTS-CANON.md »* ;
> les `metric` sont devenus des repères de portée/durée honnêtes : « Refonte livrée en 5
> semaines », « Validé en JAC à chaque étape », « Rythmé par le flux de travail »). **Le
> résidu est dans la doc Notion, périmée par rapport au code.** Les défauts ① et ② ci-dessous
> décrivent donc l'écart **Notion ↔ code** — à résoudre en synchronisant Notion, pas le site.

**① Tes docs ne récitent pas les étapes dans le même ordre.** La page méthode (canon)
et `FACTS-CANON` A2 disent **R avant I** (…Réaliser · Intégrer…). Mais le **Catalogue
Notion §2.2** et `MARKETING-CONTEXT.md` **inversent** (Intégrer · Réaliser) — ce qui
contredit l'acronyme S-T-**R**-**I**-D-E. Une méthode épelée dans le désordre selon le
document perd sa crédibilité devant un DRH.
→ **Une seule source de vérité (page méthode), propagée partout.**

**② Les métriques des cas d'usage sont, selon toute vraisemblance, fabriquées.**
« 40 % de temps de conception en moins », « 92 % de complétion », « 78 % d'adoption en
3 mois ». Elles sont étiquetées « illustratif » — mais un chiffre précis **se lit comme
un résultat réel**, et ça viole ta propre doctrine (`_canon/FACTS-CANON` C7 : aucune
métrique TLS inventée) et tes règles d'intégrité marketing. **Défaut le plus grave**
pour une maison qui vend de la « pédagogie sourcée » : la méthode signature s'appuie
sur des preuves inventées.
→ **Retirer les chiffres** (ou les remplacer par des résultats qualitatifs honnêtes)
tant qu'il n'y a pas de vrai cas client avec accord.

**③ 6 lettres, parfois 3 colonnes.** La page « Accompagnement — Conseil & Stratégie
SBO » mappe l'acronyme 6 lettres sur **3 phases** : le visiteur compte 6, en voit 3.
→ 6 étapes partout, ou un regroupement 3×2 explicite et assumé.

---

## 4 · Le défaut stratégique : STRIDE sur-promet face à la littérature

C'est la critique la plus importante, et elle est **sourcée**. La référence mondiale du
sujet, **Josh Bersin**, titre son article de référence *« Building a Skills-Based
Organization: The Exciting But **Sober** Reality »* (2023) : une bascule SBO est
**pluriannuelle, lourde en taxonomie, difficile**. **Deloitte** (rapport SBO 2024) le
confirme — exemple type : *Année 1* construire une taxonomie de ~1 500 compétences,
*Année 2* évaluer les collaborateurs. Bersin recommande explicitement : **commencer par
un problème précis, pas par une approche compétences exhaustive.**

Or STRIDE se présente comme une **mission en 6 étapes** (~10 k€, cas d'usage « en 5
semaines », « 8 semaines »). Risque : **promettre en 6 étapes ce que les autorités du
domaine disent prendre des années.** Un acheteur averti le sentira.

**Le correctif est déjà dans la méthode.** Le principe « **Tester avant Réaliser** »
dit exactement ce que dit Bersin : commencer petit, prouver, scaler. Il suffit
d'**aligner le positionnement sur la sagesse de la méthode** : vendre STRIDE comme une
**porte d'entrée cadrée** (Audit Flash + **un** pilote sur **une** famille de
compétences / **un** cas d'usage), pas comme « la transformation SBO complète en une
mission ». Plus honnête **et** plus vendable (ticket d'entrée bas → preuve → upsell).

---

## 5 · Originalité (le même réflexe que pour EDRACT)

- **Le nom « STRIDE » est une création TLS** : aucune méthode conseil « STRIDE 6
  étapes » n'existe ailleurs (le STRIDE de Microsoft est en cybersécurité, sans
  rapport). Contrairement à EDRACT® (marque C-Campus), **rien à attribuer**.
- **La structure, elle, n'est pas neuve** : Orienter→Tester→Réaliser→Intégrer→
  Déployer→Évoluer est le cycle générique de toute transformation (proche d'**ADDIE**,
  de **Kotter**, du « diagnose–pilot–scale » du conseil). Ce n'est pas un défaut — les
  cadres de marque sont un actif conseil normal (7S de McKinsey, matrice BCG). **Mais
  ne pas le survendre comme une science unique.** Au contraire : **l'ancrer
  visiblement** dans Kotter (conduite du changement), ADDIE (ingénierie pédagogique) et
  Deloitte/Bersin (SBO). Un acronyme qui s'appuie ouvertement sur des références
  établies inspire **plus** confiance à un acheteur B2B qu'un acronyme isolé.

---

## 6 · Recommandations priorisées

| P | Reco | Pourquoi |
|---|---|---|
| ✅ **fait (code)** | Métriques inventées retirées **et** ordre canonique — déjà dans `MarketingMethode.tsx` (commentaire FACTS-CANON l.110). Rien à faire côté site. | Le code fait foi, il est conforme |
| **P0 (résidu)** | **Synchroniser Notion sur le code** : page « Notre Méthode » → retirer 40/92/78 % (aligner sur les repères portée/durée du code) · Catalogue §2.2 → ordre **R avant I** | La doc Notion est périmée, risque de recopie |
| **P1** | Repositionner STRIDE en **entrée cadrée** (Audit Flash + 1 pilote), pas « SBO complet en 6 étapes » | Aligne sur Bersin/Deloitte **et** sur le principe « Tester avant Réaliser » |
| **P1** | **Ancrer** STRIDE dans la littérature (Kotter, ADDIE, Deloitte/Bersin) sur la page méthode | Transforme un acronyme en cadre étayé |
| **P2** | Désambiguïser « méthode STRIDE » (conseil) vs « projet type STRIDE IA Deployment » (CDC 11) | Deux choses, un nom |
| **P2** | 6 étapes partout ; ne pas indexer la page méthode tant qu'elle n'est pas finalisée | Cohérence (déjà noté dans `MARQUE-VOIX`) |

**À ne pas toucher** : les 4 principes. C'est l'or de STRIDE — « cadre avant outil » et
« co-conception » sont un positionnement anti-lock-in que peu de concurrents osent.

---

## Sources

- **Deloitte (2024).** *The skills-based organization: A new operating model for work
  and the workforce.* → SBO = transformation pluriannuelle, taxonomie-lourde.
- **Bersin, J. (2023).** *Building a Skills-Based Organization: The Exciting But Sober
  Reality.* joshbersin.com → « commencer par un problème précis » ; réalité sobre du SBO.
- **Kotter, J. P. (1996).** *Leading Change.* Harvard Business School Press. → conduite
  du changement en 8 étapes (benchmark de l'ossature STRIDE).
- **Hiatt, J. (2006).** *ADKAR: A Model for Change.* Prosci. · **Lewin, K. (1947).**
  unfreeze–change–refreeze. → cadres de changement établis.
- **Internes** : `_canon/FACTS-CANON.md` (A2 ordre canon, C7 métriques),
  `_canon/AUDIT-COHERENCE.md` (D3), `ops/CARTOGRAPHIE-OUTILLAGE.md`, Notion « Notre
  Méthode — STRIDE ».

---

*Avis produit de première main le 2026-07-24. Critique de l'artefact, constructive.
Les 2 P0 (métriques + ordre) sont corrigeables tout de suite.*
