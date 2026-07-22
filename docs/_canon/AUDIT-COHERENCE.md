# AUDIT-COHERENCE.md — Revue de cohérence documentaire TLS
> Audit auto (5 agents, lecture seule) sur ~30 docs : marketing, site, doctrine/design, specs produit, CDC ×17.
> Date : 2026-06-10. Statut : **findings posés, validation utilisateur en cours.**
> ⚠️ Chemin réel du projet : `~/Documents/Claude/Projects/frontend-tls/`. Le `~/Projects/frontend-tls` est un stub vide.
> 🗑️ **Périmé depuis le 2026-07-22** : cet audit visait le site HTML statique `website/site/` (et un thème WordPress), tous deux **supprimés**. Le site vitrine est désormais **uniquement** React, dans `src/pages/marketing/*` (routes `/website/*`). Les findings ci-dessous portant sur des fichiers HTML sont sans objet ; ceux portant sur les **faits et le copy** restent valables et ont alimenté `FACTS-CANON.md`.

---

## 🎯 4 CAUSES RACINES

1. **Faits dupliqués → dérive.** Mêmes faits recopiés dans 5-10 docs → ils divergent (durée, prix, badge, STRIDE).
2. **3 docs marketing redondants** (CONTEXT 389 + BRAND 463 + UNIFIED 721 = ~70-80% de chevauchement) = la principale source de drift.
3. **Décisions périmées non purgées** (AI Act sur site, 23h, CPF/OPCO, Académie, équipe fictive, angle SBO-home).
4. **Specs produit (CDC) ≠ discours marketing** sur 3 sujets de fond : badge, STRIDE, modèle de prix.

---

## ✅ DÉCISIONS PRISES (2026-06-10)

- **D1 = 2 badges différents.** (a) *Credential formation* = « Open Badge » émis par **C-Campus** (marketing/site, garder). (b) *Badges compétences app* = **Open Badges 2.0 self-hosted** (CDC, garder). → **Désambiguïser le vocabulaire**, ne pas fusionner. Fix M2 = corriger seulement les « Open Badge 2.0 » en **contexte formation** ; garder « OB 2.0 » en contexte app/gamif.
- **D2 = Crédit-based 4 plans** (la spec gagne). → Le modèle canonique Learning App = crédit-based (Gratuit/Plan1/2/3). ⚠️ **Conséquence : le site `learning-app.html` (30€/mois·250€/an) doit être réconcilié.** À confirmer : garder un pricing bêta simple en surface + modèle crédit en vrai, ou basculer le site sur les plans crédit.
- **D4 = Suivre la reco** : UNIFIED→« Faits & Offres » · BRAND→« Marque & Voix » · COPY-V2 (exécution) · LINKEDIN (canal) · **CONTEXT rétrogradé en index**.
- **D3 (STRIDE)** : ⏳ à confirmer — reco : la *méthode 6 mots* reste la définition canonique marketing ; le « STRIDE IA Deployment » du CDC 11 = sa déclinaison projet-type (désambiguïser, pas fusionner).
- **D5 (registre)** : ⏳ à confirmer — reco : officialiser **tu (Formation) / vous (reste)** = ce que fait déjà le code ; la règle « tutoiement partout » était trop absolue.

---

## 🔴 DÉCISIONS REQUISES (toi seule — produit vs marketing)

| # | Sujet | Le conflit | Options |
|---|-------|-----------|---------|
| **D1** | **Open Badge** | Marketing/site/LinkedIn = « **Open Badge** (PAS 2.0), via **C-Campus** ». MAIS cahier 05 a **verrouillé** (décision 2026-05-13) « **Open Badges 2.0**, **self-hosted**, PAS de prestataire externe ». + MIGRATION-PLAN dit « Credly/Badgr/Applaud ». 4 versions de l'émetteur. C-Campus **absent de tout le CDC**. | a) Marketing gagne : Open Badge via C-Campus (rouvrir cahier 05) · b) Spec gagne : OB 2.0 self-hosted (corriger le marketing) · c) Hybride (à préciser) |
| **D2** | **Prix Learning App** | Marketing/site = abonnement plat **30€/mois, 250€/an**. CDC (11bis, 03) = **crédit-based, 4 plans** (Gratuit/Plan1/2/3, €1-2/crédit, Stripe/WooCommerce). | a) Flat marketing · b) Crédit-based spec · c) Les deux (flat grand public + crédit entreprise ?) |
| **D3** | **STRIDE = 1 ou 2 choses ?** | Marketing = **méthode conseil 6 étapes** (S'orienter·Tester·Réaliser·Intégrer·Déployer·Évoluer). CDC 11 = **type de projet** « STRIDE IA Deployment ». Les 6 mots **n'existent dans aucun cahier**. | a) Même chose, aligner les noms · b) 2 concepts distincts à désambiguïser |
| **D4** | **Consolidation marketing** | 3 docs se chevauchent et divergent. Reco agent : garder **UNIFIED**→« Faits & Offres » + **BRAND**→« Marque & Voix », **COPY-V2** (exécution), **LINKEDIN** (canal) ; **rétrograder/supprimer CONTEXT** (le plus dérivé et le plus faux). | a) Suivre la reco · b) Autre arbitrage |
| **D5** | **Registre site** | Règle « tutoiement partout sur le site » (CONTEXT) vs BRAND « tu formateurs / vous décideurs ». Le **code fait déjà tu sur Formation, vous ailleurs**. | a) Officialiser tu(Formation)/vous(reste) = ce que fait le code · b) Tutoiement strict partout |

---

## 🟠 FIXES MÉCANIQUES (vérité connue — à batcher après accord)

| # | Quoi | Vérité | Docs à corriger |
|---|------|--------|-----------------|
| M1 | **Durée formation** | **7h** (jamais 23h ni 21h) | CONTEXT (23h), COPY-V2 (23h + **meta SEO + schema.org !**), BRAND (21h), ANALYSE (23h) |
| M2 | **« Open Badge 2.0 » → « Open Badge »** *(si D1=marketing)* | « Open Badge » | PRODUCT.md L23, CONTEXT, BRAND, COPY-V2 (+schema.org), USER-FLOWS, PHASE-16, IMPLEMENTATION_ORDER, MIGRATION-PLAN, CDC 05 |
| M3 | **Ordre STRIDE** (Réaliser=3 AVANT Intégrer=4) | S-T-**R-I**-D-E | CONTEXT L61, UNIFIED L186-191, BLUEPRINT L305-306 |
| M4 | **Prix/formules formation** | AUTONOME 249 / OPEN BADGE 369 / COACHING 890 | CONTEXT L54-56 (invente « Accompagné 490€ ») |
| M5 | **CPF / OPCO** | Aucune mention (pas éligible) | CONTEXT, COPY-V2 (+ keyword + meta SEO) |
| M6 | **AI Act sur le SITE** | Retirer des recos site (OK produit cahier 13bis + LinkedIn) | CONTEXT (Arc 3 page Formation), BRAND |
| M7 | **Académie** | N'existe pas — ne pas créer | CONTEXT (page /academie P1), ANALYSE (créer /academie) |
| M8 | **« Orange » nommé** | « grand groupe français » | UNIFIED (5×), LINKEDIN (L132) — scrub même les parenthèses |
| M9 | **Équipe fictive** | Mimault + Dennery only | déjà géré (page-equipe → redirect 301) ; vérifier zéro résidu |
| M10 | **Résidus émetteur badge** | (selon D1) | CDC 05 « badgr.com / Credly » résiduels, cahier 03 « Badgr standards » |

---

## 🟡 DÉSYNC DOC ↔ CODE (cluster site)

| # | Doc | Problème | Action |
|---|-----|----------|--------|
| S1 | **SITE-INTERNET-V1-ANALYSE** | Audite l'ANCIEN site **React** (.tsx), pas le build HTML. Débat 23h, recommande Académie. Dit « stack React » vs GROUNDING « vanilla ». | Archiver / marquer périmé |
| S2 | **SITE-V1-BLUEPRINT** | Pas resync post-build : sections « Le problème » / « Preuve 32Md » absentes du code ; « Learn→Do→Match » renommé « Apprendre·Concevoir·Déployer » ; hero options A/B/C (code a tranché autrement) ; CTA→lien C-Campus non implémentés ; « Décisions ouvertes » alors que build fini. | Resync sur le code ou archiver |
| S3 | **GROUNDING — angle home** | L199 « SBO-forward » ; code home = angle « pédagogie IA / formation » (décision plus récente). | Mettre à jour GROUNDING |
| S4 | **DESIGN-INSPO — chemin** | L138 `public/site/` → réel `website/site/` | Corriger le chemin |
| S5 | **« Ingénieur Pédagogique Augmenté » vs « Formateur Augmenté »** | 2 noms (learning-app.html L123 vs produit Formation). Même chose ? | Clarifier |

---

## 🟣 DOCTRINE / DESIGN

| # | Problème | Action |
|---|----------|--------|
| X1 | **PRODUCT.md binaire** sur gradient/3D/dark (pas la nuance dosage) + L23 « Open Badge 2.0 » vs L48 « Open Badge » (contradiction interne) | Intégrer le tableau « dosage » + fix L23 |
| X2 | **GradientText contradiction** : CLAUDE.md L1393/L1406 le documente comme canonique (impl. `bg-clip-text`), mais gradient text = **banni**. Composant existe (GradientText.tsx). | Déprécier la primitive / arbitrer |
| X3 | CLAUDE.md interne : exemple `destructive: bg-red-600` vs règle « ne pas utiliser bg-red-600 » | Corriger l'exemple |
| X4 | DESIGN.md « 6 pages manquantes » (L32-46) périmé — CLAUDE.md dit implémentées | Mettre à jour DESIGN.md |
| X5 | (mineur, non TLS) impeccable brand.md bannit Inter / product.md l'autorise | noter, sans impact (app = League Spartan/Nunito) |

---

## ⚫ SPECS PRODUIT (cluster 4)

| # | Problème | Action |
|---|----------|--------|
| P1 | **USER-FLOWS routes fictives** : `/subscriptions`, `/chatbot/*`, `/events`, `/privacy/*` → 0 dans App.tsx (réel : `/assistant`, `/ateliers`+`/masterclass`+`/evenements`, `/profile/privacy/*`) | Corriger les routes (doc « source de vérité ») |
| P2 | **3 jeux de % MVP** incompatibles (PHASE-16 vs CLAUDE.md vs MIGRATION-PLAN) : Coaching 100/85/✅, Gamif 95/70/✅, Journal 95/50/✅ | Désigner UN tracker canonique |
| P3 | **2 listes « 6 écrans manquants »** incompatibles (PHASE-16 vs MIGRATION-PLAN Sprint H) | Réconcilier |
| P4 | **Date de launch** : Sept-Oct / Q4 2026 / « pas de pression » / V1 Sept | Fixer une date (ou « TBD » assumé partout) |
| P5 | **WordPress/PHP (IMPLEMENTATION_ORDER) vs React/Vite (le reste)** jamais réconcilié | Clarifier la cible de build |
| P6 | Label Dreyfus : cahier 02 « 5=Maître » vs « Expert » ailleurs | Harmoniser |

---

## ✅ CE QUI EST SAIN (à conserver, vérifié)
- Code site HTML conforme : prix 249/369/890, missions 10k/7,5k/20k, 7h, Open Badge via C-Campus, C-Campus 578/93% attribué, pas de CPF/OPCO, bêta 30/250, « grand groupe français » non nommé, équipe Mimault+Dennery, pas d'AI Act, nav « Contact ».
- Dreyfus 1-5 cohérent dans tous les cahiers. AI Act légitime côté produit (13bis). Aucun vrai client nommé dans les CDC (ACME placeholder). Tokens DS identiques entre CLAUDE.md / DESIGN.md / DESIGN-INSPO.
