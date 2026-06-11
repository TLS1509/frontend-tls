# Site Internet TLS — Analyse croisée + Plan d'amélioration V1.1

**Synthèse** : Drive (3 GDocs + 2 HTML), Notion (4 pages projet), code React (9 pages marketing)  
**Date** : 2026-06-09  
**Auteure** : Chloé Mimault-Talagrand

---

## 1. Contexte : où en est-on ?

**Stack confirmée (pivot mai 2026)** : React 19 + Vite + Tailwind 4 + Framer Motion.  
**Pages existantes** (code, non encore déployées en prod) :

| Route | Fichier | Statut |
|-------|---------|--------|
| `/marketing` | MarketingHome.tsx | Live en dev ✅ |
| `/marketing/formation` | MarketingFormation.tsx | Live en dev ✅ |
| `/marketing/learning-app` | MarketingLearningApp.tsx | Live en dev ✅ |
| `/marketing/accompagnement` | MarketingAccompagnement.tsx | Live en dev ✅ |
| `/marketing/magazine` | MarketingMagazine.tsx | Live en dev ✅ |
| `/marketing/contact` | MarketingContact.tsx | Live en dev ✅ |
| `/marketing/equipe` | MarketingEquipe.tsx | **Placeholder — ne pas indexer** |
| `/marketing/methode` | MarketingMethode.tsx | **Placeholder — ne pas indexer** |
| `/marketing/legal` | MarketingLegal.tsx | Live en dev ✅ |

**Blocants pré-production identifiés dans Notion** (DoD incomplet) :
- ☐ Assets visuels réels (photos équipe, illustrations) — Unsplash en prod = problème légal
- ☐ OG image 1200×630px avec branding TLS
- ☐ Tests cross-browser (Chrome/Safari/Firefox/Edge)
- ☐ Audit accessibilité WCAG AA
- ☐ Déploiement prod sur thelearningsociety.fr

---

## 2. Violations critiques — à corriger AVANT mise en production

Ces points sont des **red lines** issues de MARKETING-UNIFIED.md. Les laisser en prod serait un problème éthique, légal ou de crédibilité.

### 2.1 GradientText — composant banni utilisé en prod

**Fichiers** : `MarketingHome.tsx:138-146` et `MarketingLearningApp.tsx` (section hero)  
**Règle** : "No gradient text (`background-clip: text` + gradient). Decorative, never meaningful. Use a solid color."  
**Fix** : Remplacer `<GradientText>` par du texte blanc plein (blanc ou `text-accent-300`) sur fond sombre.  
**Effort** : S (30 min)

```tsx
// Avant (interdit)
<GradientText from="from-accent-300" via="via-accent-400" to="to-secondary-400">
  augmentée par l'IA
</GradientText>

// Après
<span className="text-accent-300">augmentée par l'IA</span>
```

### 2.2 "Orange" nommé dans les logos placeholder

**Fichier** : `MarketingHome.tsx:46` — `'Orange'` dans le tableau `LOGOS`  
**Règle** : "Ne pas nommer Orange sans accord explicite de leur part."  
**Fix** : Retirer "Orange" du tableau (remplacer par un nom générique ou supprimer).  
**Effort** : XS (5 min)

### 2.3 Témoignages fictifs attribués à Renault, Capgemini, L'Oréal

**Fichier** : `MarketingHome.tsx:51-76` — tableau `TESTIMONIALS`  
**Règle** : "Aucun témoignage sans accord écrit + identité réelle vérifiée. Pas de clients publics à ce jour."  
**Statut** : Les ⚠️ comments sont là en code, **mais si la page part en prod avec ces placeholders c'est un problème**.  
**Fix** : Remplacer la section témoignages par une section neutre (ex. "Ce que nos apprenants disent" avec citation générique anonymisée sous forme de bullet points, ou supprimer temporairement jusqu'à vrais témoignages).  
**Effort** : S (45 min)

### 2.4 Schema JSON-LD Course avec métriques inventées

**Probable** dans `SEOHead.tsx` ou dans la page Formation — le GDoc SEO Strategy inclut un template Course schema avec `"ratingValue": "4.9", "reviewCount": "150"`. Ces chiffres sont **inventés**.  
**Fix** : Retirer `aggregateRating` du Course schema jusqu'à avoir de vraies données.  
**Effort** : XS (10 min)

### 2.5 Durée du programme : "23 heures" vs "7h" (C-Campus PDF)

**Fichier** : MarketingFormation.tsx (à vérifier — les modules affichent 2+4+3+6+3+2+3 = **23h**… mais le PDF C-Campus dit 7 modules × 60 min = **7h**).  
**Hypothèse** : Les 23h sont la version TLS Learning App (modules enrichis), les 7h sont la version C-Campus (distanciel court). Ces deux produits sont distincts.  
**Décision requise** : La page `/marketing/formation` présente-t-elle le programme C-Campus (7h) ou la version TLS Learning App (23h) ?  
**Fix** (selon décision) : Soit clarifier dans le texte "Version learning app TLS : 23h / Version C-Campus : 7h", soit séparer en deux sous-pages distinctes.  
**Effort** : S-M (selon décision)

---

## 3. Erreurs de contenu — à corriger

### 3.1 STRIDE dans les compétences du Formateur Augmenté (C-Campus)

**Fichier** : `MarketingFormation.tsx:119` — `"Intégrer l'IA dans l'ingénierie pédagogique (méthodologie STRIDE)"`  
**Problème** : STRIDE est la méthodologie TLS pour les missions de conseil SBO (10 000€/mission). Elle n'est PAS dans le programme C-Campus Formateur Augmenté.  
**Fix** : Remplacer par `"Intégrer l'IA dans l'ingénierie pédagogique (conception de parcours, scénarisation)"`.  
**Effort** : XS (5 min)

### 3.2 "Gagner 30 % de ton temps" — métrique non vérifiée

**Fichier** : `MarketingFormation.tsx:121` — `"Automatiser les tâches administratives pour gagner 30 % de ton temps"`  
**Problème** : Ce chiffre n'est pas sourcé. MARKETING-UNIFIED interdit les métriques inventées présentées comme résultats TLS.  
**Fix** : Supprimer le pourcentage. Écrire : "Automatiser les tâches répétitives pour recentrer ton temps sur la valeur pédagogique."  
**Effort** : XS

### 3.3 Stats MarketingLearningApp — non vérifiées

**Fichier** : `MarketingLearningApp.tsx:42-46`
- `120+` modules — à vérifier (Notion pédagogique)
- `40+` formateurs actifs — à vérifier (c'est peut-être 1 client/beta)
- `200h` de contenu — à vérifier
- Ces CountUp sont animés et très visibles — risque de crédibilité si faux

**Fix** : Remplacer par des indicateurs vrais ou supprimer la section stats jusqu'au lancement réel.  
**Effort** : S

### 3.4 Titres modules — alignement avec C-Campus PDF

Les 7 modules dans le code sont des descriptions TLS (enrichies), pas les titres exacts du PDF C-Campus. C'est acceptable SI on précise clairement "version TLS Learning App" vs "programme C-Campus". À valider avec toi.

---

## 4. Framing stratégique — gaps par rapport à l'audit d'avril 2026

L'audit Notion d'avril 2026 recommandait de **pivoter vers un framing "entreprises + transformation + méthode + tech"** au lieu de "formation augmentée" uniquement. Le site React actuel reste centré sur le Formateur Augmenté (persona formateur indépendant).

### 4.1 Pages manquantes (cibles dans la DB "Website pages" Notion)

| Page cible (Notion) | Route | Statut |
|---------------------|-------|--------|
| /academie (pass annuel) | `/marketing/academie` | ❌ Absent |
| /agence-formation (Studio + Upskilling + Lab) | `/marketing/agence-formation` | ❌ Absent |
| /conseil-strategie (audit flash + STRIDE) | `/marketing/conseil` | ⚠️ Partiel (MarketingAccompagnement) |
| /notre-tech (Learning App + moteur IA) | `/marketing/notre-tech` | ⚠️ Partiel (MarketingLearningApp) |

**Recommandation** : Ces pages correspondent au framing B2B DRH/CLO (personas B, C, D de MARKETING-UNIFIED). Le site actuel parle presque exclusivement au formateur indépendant. Sans ces pages, les DRH qui arrivent sur le site ne trouvent pas leur chemin.

### 4.2 CTA principal — encore ambigu

L'audit recommandait **1 CTA business unique** "Réserver un audit" visible dès le hero et répété en sticky. Actuellement, le hero a 2 CTAs :
- "Devenir Formateur Augmenté" → /marketing/formation
- "Découvrir la plateforme" → /marketing/learning-app

Un DRH cherche "Réserver un audit stratégique" — ce CTA n'existe pas encore.

### 4.3 Tagline — pas encore décidée

Le Notion Site Internet V1 a un tableau d'options (6 angles) mais aucune décision finale. Les options identifiées dans MARKETING-UNIFIED §07 restent en attente d'arbitrage. **Bloaquant pour le déploiement marketing cohérent** (LinkedIn, brochures, etc.).

---

## 5. SEO — état et gaps

**Fait (2026-05-20)** : SEOHead.tsx avec meta tags, OG, Twitter Card, JSON-LD Organization, canonical URLs.

**Manquant avant go-live** :

| Élément | Priorité | Effort |
|---------|----------|--------|
| OG image 1200×630px TLS branded | 🔴 Critique | M |
| `sitemap.xml` statique ou dynamique | 🔴 Critique | S |
| `robots.txt` | 🔴 Critique | XS |
| Google Search Console setup (après déploiement) | 🔴 Critique | XS |
| Course schema sans `aggregateRating` inventé | 🔴 Critique | XS |
| Article schema sur MarketingMagazine articles | 🟡 Haute | S |
| FAQ schema sur formation (7 questions) | 🟡 Haute | S |
| Préchargement fonts (League Spartan, Nunito) | 🟡 Haute | XS |
| Google Analytics 4 setup | 🟠 Moyenne | S |

**Mots-clés prioritaires à vérifier dans les H1/H2/meta** (depuis GDoc SEO) :
- "IA formation professionnelle" (1 900/mois) → page Formation ✅
- "formation intelligence artificielle" (6 600/mois) → à renforcer
- "organisation apprenante" (1 300/mois) → absent du site actuellement
- "plateforme formation en ligne" (2 400/mois) → Learning App ✅
- "formateur augmenté IA" → déjà bien couvert

---

## 6. UX/UI — points de friction restants

Selon l'audit V1 (Fév 2026) + état actuel du code :

| Problème | Page | Statut |
|----------|------|--------|
| /contact 404 | Toutes | ✅ Résolu (MarketingContact existe) |
| 2 CTAs concurrents dans hero | Home | ⚠️ Encore présent (2 CTAs) |
| Page Learning App manquante | Home | ✅ Résolu (MarketingLearningApp existe) |
| Navigation sans "Conseil" distinct | Header | ⚠️ MarketingAccompagnement = /accompagnement |
| Photos Unsplash en prod | Toutes | 🔴 À remplacer avant prod |
| Témoignages fictifs | Home | 🔴 À corriger (voir §2.3) |
| `prefers-reduced-motion` | Toutes | ✅ Géré (motion primitives) |
| Focus states clavier | Toutes | ✅ Géré (Tailwind focus-visible) |

---

## 7. Plan d'actions priorisé

### P0 — Bloquants prod (ne pas déployer sans)

| # | Action | Fichier(s) | Effort |
|---|--------|-----------|--------|
| P0-1 | Supprimer GradientText dans Home + LearningApp | MarketingHome.tsx, MarketingLearningApp.tsx | XS |
| P0-2 | Retirer "Orange" des logos placeholder | MarketingHome.tsx:46 | XS |
| P0-3 | Remplacer/supprimer témoignages fictifs | MarketingHome.tsx:51-76 | S |
| P0-4 | Fix Course schema (supprimer aggregateRating) | SEOHead.tsx ou Formation | XS |
| P0-5 | Clarifier durée programme (décision 7h vs 23h) | MarketingFormation.tsx | S |
| P0-6 | Retirer "STRIDE" des compétences Formateur Augmenté | MarketingFormation.tsx:119 | XS |
| P0-7 | Fix stats LearningApp (retirer chiffres non vérifiés) | MarketingLearningApp.tsx:42-46 | S |
| P0-8 | Supprimer 30 % du temps (métrique inventée) | MarketingFormation.tsx:121 | XS |
| P0-9 | Créer sitemap.xml + robots.txt | public/ | S |
| P0-10 | Créer OG image 1200×630 (Canva/Figma, branding TLS) | assets/ | M |
| P0-11 | Désindexer /equipe et /methode (robots noindex) | MarketingEquipe, MarketingMethode | XS |

### P1 — À faire rapidement (semaines 1-2 après P0)

| # | Action | Fichier(s) | Effort |
|---|--------|-----------|--------|
| P1-1 | Ajouter FAQ schema sur page Formation | MarketingFormation.tsx | S |
| P1-2 | Ajouter Article schema sur MarketingMagazine | MarketingMagazine.tsx | S |
| P1-3 | Ajouter 1 CTA "Réserver un audit" sticky pour DRH/CLO | Header ou Home | S |
| P1-4 | Remplacer photos Unsplash par assets réels | Toutes | M |
| P1-5 | Audit accessibilité WCAG AA (rôles aria, contraste) | Toutes | M |
| P1-6 | Tests cross-browser (Safari/Chrome/Firefox/Edge) | Toutes | M |
| P1-7 | Setup Google Analytics 4 | index.html | S |

### P2 — Améliorations stratégiques (après lancement)

| # | Action | Priorité business |
|---|--------|------------------|
| P2-1 | Créer page `/marketing/conseil` (framing STRIDE + DRH) | Haute (audience B2B) |
| P2-2 | Arbitrer et verrouiller tagline | Haute (cohérence marketing) |
| P2-3 | Créer page `/marketing/academie` (pass annuel Learning App) | Haute (revenue pilier 1a) |
| P2-4 | Contenu SEO : article pilier "IA en formation 2026" (3000 mots) | Haute (trafic organique) |
| P2-5 | Page `/marketing/notre-tech` (credibilité tech pour DRH) | Moyenne |
| P2-6 | Newsletter signup avec checkbox RGPD (demandé nov 2025) | Moyenne |
| P2-7 | Page `/marketing/agence-formation` (Studio + Upskilling) | Basse (V1.2+) |

---

## 8. Tableau de bord : convergence Drive / Notion / Code

| Document source | Date | Pertinence | Décisions déjà prises |
|----------------|------|------------|----------------------|
| Audit V1 (GDoc Fév 2026) | Fév 2026 | Partielle | ✅ Page Learning App créée, /contact fixé, navigation améliorée |
| Wording & Layout Guide (GDoc Fév 2026) | Fév 2026 | Partielle | ✅ Wording intégré en React, structure pages respectée |
| SEO Strategy (GDoc Fév 2026) | Fév 2026 | ✅ Active | Méta tags faits (mai 2026). Schema et sitemap = à faire |
| Audit + plan d'updates (Notion Avr 2026) | Avr 2026 | ✅ Active | Framing B2B pas encore fait, CTA sticky manquant |
| Site Internet V1 (Notion Mai 2026) | Mai 2026 | ✅ Référence | Pivot React confirmé, DoD partiel |
| MARKETING-UNIFIED.md | Juin 2026 | ✅ Canonical | Contraintes honesty = loi. À faire respecter maintenant |

---

## 9. Prochaines étapes immédiates

**Cette semaine** (P0) :
1. Fix GradientText, Orange dans logos, STRIDE, 30 % → **30 min de code**
2. Décision durée programme (7h C-Campus vs 23h TLS App) → **5 min de décision**
3. Stratégie témoignages : section neutre ou supprimée ? → **décision + 45 min de code**
4. Vérification stats LearningApp dans Notion pédagogique → **15 min**
5. Créer sitemap.xml + robots.txt → **S**
6. Commander OG image dans Canva (TLS Brand Kit) → **M**

**Go/No-go prod** : Aucun déploiement sur thelearningsociety.fr avant P0 complet.

---

*Ce document est la source de vérité pour la checklist V1 → V1.1.  
Référencer avec : MARKETING-UNIFIED.md (contraintes honesty), SEO Strategy GDoc (mots-clés), Notion Site Internet V1 (statut DoD).*
