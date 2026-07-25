# 📑 Documentation Index — The Learning Society

**Last updated**: 2026-07-23 | **Total docs**: 132 fichiers (hors `_archive/`)

> 🥇 **Avant toute session marketing ou site : lire [`_canon/FACTS-CANON.md`](_canon/FACTS-CANON.md).** C'est la source de vérité unique. Tout doc marketing qui la contredit a tort. `marketing/MARKETING-CONTEXT.md` est **rétrogradé** et ne fait plus foi malgré son nom.

> 🧹 **Nettoyage 2026-06-30** : ~20 docs déversés en vrac (racine repo + `docs/`) par des sessions d'agents ont été re-rangés. Nouveaux sous-dossiers `_phases/`, `charts/`, `briefs/`. 4 audits Figma du 26/06 marqués `⚠️ FIABILITÉ NON VÉRIFIÉE` (claims non vérifiés contre le fichier Figma). `.claude/worktrees/` (40 Mo) + `.agents/skills 2/` + `docs/_old-sessions/` supprimés. Voir règles d'hygiène doc dans `CLAUDE.md`.

---

## 🎯 Fichiers clés (top 5)

| Fichier | Description | Taille | Utiliser pour |
|---------|---|---|---|
| [MIGRATION-PLAN.md](MIGRATION-PLAN.md) | Phases 1-20, roadmap complet | 116K | Comprendre l'état général du projet |
| [PHASE-16-GAP-ANALYSIS.md](PHASE-16-GAP-ANALYSIS.md) | Analysis 16 cahiers vs FO code | 40K | Avancer Phase 16 (spec compliance) |
| [product/PRODUCT.md](product/PRODUCT.md) | Config projet, version, routes | — | Démarrer une session, setup MCP |
| [product/DESIGN.md](product/DESIGN.md) | Design system Tailwind, patterns | — | Vérifier tokens, conventions styling |
| [_canon/FACTS-CANON.md](_canon/FACTS-CANON.md) | **Faits validés TLS** (offres, prix, badge, registre) | — | **Toute session marketing / site : lire EN PREMIER** |

---

## 📂 ROOT — Docs stratégiques

**Actifs:**
- `MIGRATION-PLAN.md` — Phase 1-20 roadmap + checklist tracking
- `PHASE-16-GAP-ANALYSIS.md` — Cahiers 01-13bis vs FO pages audit complet
- `IMPLEMENTATION_ORDER.md` — Ordre exécution recommandé phases
- `README.md` — Navigation guide (ce fichier vous amène ici)
- `INDEX.md` ← vous êtes ici

---

## 📋 CDC/ — Cahiers de charges (source de vérité)

**16 modules spécification métier** — NE PAS modifier sans approbation métier.

| # | Cahier | Focus | Status |
|---|--------|-------|--------|
| 01 | [Parcours & Learning Space](CDC/01_Parcours_Learning_Space.md) | Path browsing, positionnement, progression | ✅ Phase 16 MVP |
| 01bis | [Items Apprentissage & Veille](CDC/01bis_Items_Apprentissage_Veille.md) | Content types, article detail, veille feed | ✅ |
| **02** | [**Passeport Compétences**](CDC/02_Passeport_Competences.md) | Dreyfus model, evidence, radar, goals | 🟡 90% MVP (gates 01, 05, 07, 11, 13) |
| 03 | [Onboarding & User Profile](CDC/03_Onboarding_and_User_Profile_Mapping.md) | Signup, questionnaire, subscription, consent | 🟡 75% (deferred: manager approvals) |
| 04 | [Coaching & 1-1 Messaging](CDC/04_Coaching_and_1-1_Messaging.md) | Sessions, messaging, corrections, dashboard | 🟡 85% (missing: calendar sync) |
| 05 | [Gamification & Badges](CDC/05_Gamification_Badges.md) | XP ledger, badges, streaks, leaderboard | 🟡 70% (missing: leaderboards, export) |
| 06 | [Enterprise FO Space](CDC/06_Enterprise_FO_Space.md) | Team mgmt, member roles, credit pool | 🟡 60% (missing: approval workflows) |
| 07 | [Journal de Bord Réflexif](CDC/07_Journal_de_Bord_Reflexif.md) | Entry CRUD, guided questions, auto-triggers | 🟡 50% (missing: auto-triggers) |
| 08 | [Masterclass & Événements](CDC/08_Masterclass_Atelier_Pratique_Evenements.md) | Event browsing, booking, attendance | ✅ 70% |
| 09 | [Notifications Management](CDC/09_Notifications_Management.md) | Notification center, preferences | 🟡 50% (missing: push/SMS) |
| 10 | [Analytics Tracking System](CDC/10_Analytics_Tracking_System.md) | Event schema, listener infrastructure | 🔴 0% (Phase 17-18) |
| 10bis | [BO Organization UX](CDC/10bis_Back_Office_Organization_UX_Design.md) | WordPress BO feature (hors scope FO React) | 🔴 Out of scope |
| 11 | [Projects SBO](CDC/11_Projects_SBO.md) | Project CRUD, task submission, JAC | 🟡 50% (missing: full corrections) |
| 11bis | [Subscription Management](CDC/11bis_Subscription_Management_System.md) | Subscriptions, billing, invoices | 🟡 70% (missing: dunning) |
| 12 | [Chatbot IA & QAR](CDC/12_Chatbot_IA_et_QAR.md) | Chatbot UI, message history, thread | 🟡 60% (missing: full RAG) |
| 12bis | [IA Features Framework](CDC/12bis_IA_Features_Framework.md) | Transversal IA (reco, matching, churn pred) | 🔴 30% MVP (Phase 17-18 deep) |
| 13 | [Helpcenter & Support](CDC/13_Helpcenter_Wiki_Support.md) | FAQ, articles, search, tickets | 🟡 65% (missing: ticketing) |
| 13bis | [GDPR / AI Act / Security](CDC/13bis_GDPR_AI_Act_Security.md) | Consent, DSAR, account deletion, audit logs | ✅ 75% MVP |

**Utilities:**
- `FO_PAGES_INVENTORY.md` — 140+ routes FO learner (83 screens × 2 tiers)
- `BO_PAGES_INVENTORY.md` — Back-office WordPress pages (hors scope)
- `PLUGIN_DEPENDENCY_ANALYSIS.md` — Module dependencies, critical path

---

## 📊 _AUDITS/ — Rapports consolidés

**7 audit reports** — analyses de qualité, gaps design, spec compliance.

| Fichier | Type | Focus |
|---------|------|-------|
| [AUDIT-FIGMA-ATOMS-COMPOSITES-2026-07-03.md](_audits/AUDIT-FIGMA-ATOMS-COMPOSITES-2026-07-03.md) | Figma↔code (vérifié 1ère main) | Atoms+Composites : variants vs codebase + binding variables/styles. §08 créé, gaps tone-aware Avatar/StatCard, token "locked" grays |
| [AUDIT-FIGMA-CODE-GAP-2026-07-03.md](_audits/AUDIT-FIGMA-CODE-GAP-2026-07-03.md) | Gap composants DS↔code | Prérequis Phase 20 : 175 sets Figma vs code. ~158 matchés par nom ; gap bloquant = famille auth glass-dark (à créer/étendre) + ~5 stragglers (CourseCard, SegmentedControl, MessageBubble…) |
| [AUDIT-PHASE-19.md](_audits/AUDIT-PHASE-19.md) | Quality audit | 142 pages FO scored (Tier 1/2/3), a11y gaps, DS adoption |
| [AUDIT-PHASE-19-NOTION-DELTA.md](_audits/AUDIT-PHASE-19-NOTION-DELTA.md) | Notion sync | Écrans + Design System DBs consistency check |
| [REVIEW-PHASE-19.md](_audits/REVIEW-PHASE-19.md) | Refinement | Chips extraction, AuthShell, HeroSection sunset decisions |
| [FIGMA-AUDIT-REPORT.md](_audits/FIGMA-AUDIT-REPORT.md) | Design-Dev sync | React components vs Figma DS gaps, 3 missing components |
| [FIGMA-FOUNDATIONS-AUDIT.md](_audits/FIGMA-FOUNDATIONS-AUDIT.md) | Token parity | Figma variables ↔ Tailwind @theme cross-check |
| [FLOWS-TIER1-SYNTHESIS.md](_audits/FLOWS-TIER1-SYNTHESIS.md) | Daily-use analysis | 33 Tier 1 pages patterns, UX clarity scoring |

---

## 🎨 SITE/ — Design & site vitrine (25 fichiers)

> 🧹 **Indexé le 2026-07-22.** 20 des 25 fichiers étaient absents de l'index (= docs fantômes au sens de la règle d'hygiène #2 de CLAUDE.md). Aucun n'a été supprimé ; l'inventaire ci-dessous les rend visibles. Les statuts marqués « à re-valider » n'ont **pas** été vérifiés doc par doc — ils signalent une antériorité à des décisions plus récentes, pas une fausseté établie.

**Structure & état du site**

| Fichier | Purpose |
|---|---|
| `SITE-V1-BLUEPRINT.md` | Blueprint 6 pages du site vitrine |
| `SITE-V1-GROUNDING.md` | Grounding factuel du site V1 |
| `SITE-STRUCTURE-DESIGN-C.md` | Sitemap + specs de sections par page (art direction « Illustrated Glass » du 11/06) |
| `SITE-REACT-AUDIT.md` | Audit du site React + journal de sessions |

⚠️ Le sitemap fait aujourd'hui l'objet de propositions plus récentes non tranchées : voir Notion [Sitemap & Structure Homepage (2026-06-29)](https://app.notion.com/p/38ecdd696db6811eb953e3baa6b5de5d). En cas de divergence, Notion est plus récent.

**Copy & SEO**

| Fichier | Purpose |
|---|---|
| `COPY-HOME.md` · `COPY-CONSEIL-SBO.md` | Copy par page. ⚠️ Croiser avec `_canon/FACTS-CANON.md` avant réutilisation |
| `SEO-CONTENT-PLAN.md` | Plan de contenu SEO |

**Art direction « Illustrated Glass » (verrouillée 2026-06-11)**

| Fichier | Purpose |
|---|---|
| `DIRECTION-C-CHECKLIST.md` | Timeline production assets (3 sem. illustration + 2 sem. vidéo). ⚠️ **Plan de production périmé** : les décisions P0 du 26/06 l'ont remplacé par « illustrations = placeholders CSS d'abord » + « vidéo hero = Framer Motion SVG ». L'art direction elle-même reste à re-valider |
| `ENRICHMENT-TO-DIRECTION-C.md` | Enrichissements de la direction |
| `SESSION-2026-06-11-RECAP.md` · `NOTION-UPDATE-2026-06-11.md` | Recap de session + sync Notion du 11/06 |

> ⚠️ **Homonymie à connaître** : « Direction C » désigne ici l'art direction *site* (Illustrated Glass, 11/06). Le commit `5b4e861` « remove rejected Direction C » parle d'une **autre** chose : une variante de home V2 (Editorial Motion) rejetée en juillet. Ne pas confondre les deux.

**Motion & animation**

| Fichier | Purpose |
|---|---|
| [DESIGN-INSPO.md](site/DESIGN-INSPO.md) | **Mobbin saves** (24 mobile + 34 desktop + 33 vitrine) + case study Until Labs |
| [PROMPT-NAVBAR-HOMEPAGE-REDESIGN.md](site/PROMPT-NAVBAR-HOMEPAGE-REDESIGN.md) | Prompt navbar Fluid Island + hero |
| `ANIMATION-EFFECTS-INTEGRATION.md` | Intégration des primitives motion |
| `ANIMATION-TECHNIQUES-RESEARCH.md` | Techniques d'animation, patterns GSAP vs Framer Motion |
| `ANIMATION-STYLES-BREAKDOWN.md` · `SCROLL-EFFECTS-IMPLEMENTATION.md` | Styles + implémentation scroll |

**Recherche & inspiration** *(artefacts d'exploration, valeur de référence)*

`APP-INSPIRATION-RESEARCH.md` · `MOODBOARD-INSPIRATION-GUIDE.md` · `INSPIRATION-SEARCH-KEYWORDS.md` · `QUICK-SEARCH-TERMS.md` · `LES-ROMANTIQUES-ARTE-STYLE-ANALYSIS.md` · `PHASE-2B-DUAL-RESEARCH.md` · `PHASE-2B-COMPLETE-MAP.md` · `PHASE-2B-QUICKSTART.md` · `HERO-ASSETS-SOURCING.md`

**Figma & composants**

`FIGMA-ENRICHMENT-GUIDE.md` · `FIGMA-WIREFRAME-STRUCTURE.md` · `COMPONENT-EXTRACTION-CHECKLIST.md`

---

## 🎓 LEARNING/ — Bootcamp & Skills transfer (252K)

**12-week UX/UI design bootcamp + Framer Motion + animated logo projects**

| Fichier | Topic | Level |
|---------|-------|-------|
| [BOOTCAMP-START-HERE.md](learning/BOOTCAMP-START-HERE.md) | Entry point | Beginner → 12 weeks |
| [UX-UI-BOOTCAMP.md](learning/UX-UI-BOOTCAMP.md) | Main track | Day-by-day curriculum |
| [FRAMER-MOTION-LEARNING.md](learning/FRAMER-MOTION-LEARNING.md) | Advanced motion | Scroll-driven, useTransform patterns |
| [ANIMATED-LOGO-PROJECT.md](learning/ANIMATED-LOGO-PROJECT.md) | Logo design | 3 variants (pulse → rotation → morph) |
| [PROCREATE-BOOTCAMP.md](learning/PROCREATE-BOOTCAMP.md) | Illustration | iPad Procreate for watercolor textures |
| LEARNING-APP-DESIGN-PROJECT.md | Product design | Redesign learning app FO |
| SBO-ACCOMPAGNEMENT-PROJECT.md | Coaching UX | Coaching flow design exercise |
| SKILLS-TRANSFER-ROADMAP.md | Methodology | Teaching approach (live debugging, demos) |
| _archivés 2026-07-24 →_ [`_archive/factcheck-corpus/`](_archive/factcheck-corpus/) | **Docs de process fact-check du corpus** (CORPUS-FORMATIONS-FACT-CHECK, PARCOURS-CORRECTIONS-DETAIL, FACTCHECK-CERTIFIED ×3) — corrections **déjà appliquées** dans les modules `modules-corriges-2026-07-23/` (journaux inline). Conservés en archive pour traçabilité. | 🗄️ Archivé |
| [CORRECTIONS-SOURCEES-UXUI.md](learning/CORRECTIONS-SOURCEES-UXUI.md) | **Corrections sourcées** du parcours UX/UI : chaque claim faux → correction + source RÉELLE vérifiée sur le web (auteur/année/lien) + phrase prête à coller. Contrastes WCAG recalculés (mini-tableau), section « À RETIRER », 12 sources clés (W3C, BBC 2017, McKinsey 2018, NN/g, Cowan 2001, Lally 2010, HolonIQ, PayScale, Lindgaard 2006, Intercom, Christensen) | ✅ Corrections sourcées |
| [CORRECTIONS-SOURCEES-IP.md](learning/CORRECTIONS-SOURCEES-IP.md) | **Corrections sourcées** du parcours Ingénierie Pédagogique : chaque claim faux → correction + source RÉELLE vérifiée sur le web (auteur/année/lien) + phrase prête à coller. Vraie taxonomie Bloom (Anderson & Krathwohl 2001), débunkage VARK (Pashler 2008 / Newton 2020 → multimodal Mayer), origine ADDIE (Branson 1975 FSU/US Army), Alliger 1997, Xunzi ≠ Franklin, mythe 60 000×, méthode ROI Phillips, prix outils T1 2026 (Synthesia/PaLM/Knewton/Smart Sparrow), section « À RETIRER », M6 → Kirkpatrick 2016 | ✅ Corrections sourcées |
| [application/AUDIT-UXUI-APP-ET-SITE.md](learning/application/AUDIT-UXUI-APP-ET-SITE.md) | **Application du parcours bootcamp (M01-M08) au produit réel** : les 8 lentilles passées sur le code de la learning app + site marketing, mesures WCAG de première main. 2 chantiers systémiques (contraste des tokens de marque en texte ; répétition espacée promise/non câblée + promesse site), 6 lentilles vertes, chantiers priorisés P0-P2 | 🔍 Audit produit |
| [application/cours/00-CADRE-PEDAGOGIQUE.md](learning/application/cours/00-CADRE-PEDAGOGIQUE.md) | **Cadre d'instructional design** des cours perso de Chloé (learner = elle, in-situ). Structure = **EDRACT®** — modèle **C-Campus** (Marc Dennery), lignée Gagné+Kolb, **à attribuer, PAS une méthode TLS** (corrige l'erreur « structure maison » du doc RECHERCHE interne). Chaque phase adossée à son fondement + un principe robuste + mappée à une surface app. Plan 3 pistes (PM / UX-UI / vibe coding) | 🧭 Cadre péda |
| [application/cours/PM-C1-Qu-est-ce-que-le-Product-Management.md](learning/application/cours/PM-C1-Qu-est-ce-que-le-Product-Management.md) | **Cours PM-C1** (structure EDRACT, appliqué au vrai produit) : ce qu'est le PM, la triple contrainte EdTech (désirabilité × viabilité × efficacité pédagogique), le piège des vanity metrics, ancré sur le carrefour réel « répétition espacée » de l'audit | 📚 Cours |
| [application/cours/VIBE-C1-Qu-est-ce-que-le-vibe-coding.md](learning/application/cours/VIBE-C1-Qu-est-ce-que-le-vibe-coding.md) | **Cours VIBE-C1** (structure EDRACT) : qu'est-ce que le vibe coding, la boucle intention→prompt→génération→**revue**→itération, vibe coding pur vs ingénierie assistée (Karpathy/Willison 2025), où ça excelle/échoue, ancré sur le cas réel des 62 erreurs TS silencieuses du dépôt | 📚 Cours |
| [application/cours/UXUI-C1-Socle-visuel-typo-couleur-contraste-espacement.md](learning/application/cours/UXUI-C1-Socle-visuel-typo-couleur-contraste-espacement.md) | **Cours UXUI-C1** (structure EDRACT) : socle visuel — 2 polices + hiérarchie, tokens couleur 3 couches, **contraste WCAG mesuré** (table des ratios réels : teal/orange/jaune = décor, pas texte), espacement base-4. Réutilise les mesures de l'audit du dépôt | 📚 Cours |
| [application/cours/PM-C2-Jobs-to-be-Done.md](learning/application/cours/PM-C2-Jobs-to-be-Done.md) | **Cours PM-C2** (structure EDRACT) : Jobs-to-be-Done (Christensen) — un job = progrès dans une situation (pas une feature), 3 dimensions (fonctionnelle/émotionnelle/sociale), concevoir contre les substituts réels (ChatGPT/YouTube/collègue/rien), les 4 forces du basculement (Moesta) | 📚 Cours |
| [application/cours/PM-C3-Objectifs-et-vanity-metrics.md](learning/application/cours/PM-C3-Objectifs-et-vanity-metrics.md) | **Cours PM-C3** (structure EDRACT) : deux niveaux d'objectifs (apprentissage=Bloom vs produit=SMART, le R=pertinent), vanity vs actionable metrics (Ries), loi de **Goodhart** + garde-fous (la complétion couplée à la rétention J+30), ancré sur le firewall gamification | 📚 Cours |
| [application/cours/UXUI-C2-Les-4C.md](learning/application/cours/UXUI-C2-Les-4C.md) | **Cours UXUI-C2** (structure EDRACT) : les 4C (Clarté=Krug, Cohérence=Jakob+composants, Contraste=1 primaire/écran, Confort=Sweller/Hick/~4 chunks Cowan) comme grille d'audit d'écran. ✅ statut « 4C » **vérifié** : genre mnémotechnique générique sans owner (≠ EDRACT) ; la combinaison Clarté/Cohérence/Contraste/Confort = sélection maison TLS, aucune attribution mais pas « le » standard | 📚 Cours |
| [application/cours/PM-C4-Priorisation-RICE.md](learning/application/cours/PM-C4-Priorisation-RICE.md) | **Cours PM-C4** (structure EDRACT) : priorisation **RICE** (Reach×Impact×Confidence÷Effort, Intercom 2016), le score ordonne mais ne décide pas (l'Effort domine à 2 fondateurs), le **filtre EdTech** (RGPD + validité pédagogique) avant le score, exemple travaillé sur le vrai backlog (SRS vs correctif site) | 📚 Cours |
| [application/cours/UXUI-C3-Design-tokens-et-design-system.md](learning/application/cours/UXUI-C3-Design-tokens-et-design-system.md) | **Cours UXUI-C3** (structure EDRACT) : design system = **source de vérité unique**, tokens 3 couches (primitive→sémantique→composant), Atomic Design (Frost), le piège du **drift** (un concept/deux valeurs, silencieux) illustré par les cas réels du dépôt (deux gris ink-900, shadows lettre-morte), détection via getComputedStyle | 📚 Cours |
| [application/cours/PM-C5-North-Star.md](learning/application/cours/PM-C5-North-Star.md) | **Cours PM-C5** (structure EDRACT) : North Star metric (Ellis/Amplitude) — capturer la valeur rendue, pas le temps capté ; rejeter une étoile gameable (« heures passées »), test anti-Goodhart, leading vs lagging, framework 1 North Star + 3-5 entrées + contre-indicateur, ancré « compétences validées » (passeport) | 📚 Cours |
| [application/cours/PM-C6-Ecrire-une-spec-de-feature.md](learning/application/cours/PM-C6-Ecrire-une-spec-de-feature.md) | **Cours PM-C6 — capstone PM** (structure EDRACT) : écrire une spec de feature (8 sections : problème/job, métrique, user stories, parcours, scope in/out, données, **critères d'acceptation testables**, risques), avec la **spec réelle du SRS** comme livrable à me confier pour build | 📚 Cours |

---

## 📢 MARKETING/ — Brand & content strategy (40K)

**Brand voice, personas, copy, SEO, positioning**

> ⚠️ **Hiérarchie canonique — à respecter dans cet ordre.** Les faits priment sur le copy. Un doc marketing qui contredit `_canon/FACTS-CANON.md` a tort, sans exception.

| Fichier | Statut | Purpose |
|---------|---|---------|
| [_canon/FACTS-CANON.md](_canon/FACTS-CANON.md) | 🟢 **CANON — lire en premier** | Faits validés ligne par ligne : 7 modules / **7h** (pas 23h), C-Campus certifie (**Qualiopi jamais pour TLS**), Open Badge « L'IA en formation », **OPCO oui / CPF jamais**, **« vous » sur tout le public** (« tu » réservé à l'app), fondateurs = Mimault + Dennery seuls, « L'Académie » n'existe pas |
| [FAITS-OFFRES.md](marketing/FAITS-OFFRES.md) | 🟢 Canonique | Faits & offres, structure, paliers de prix |
| [MARQUE-VOIX.md](marketing/MARQUE-VOIX.md) | 🟡 Canonique **positionnement/voix uniquement** | Positionnement SBO, personas, voix. ⚠️ Ses **exemples de copy sont des drafts IA** et contiennent encore des faits périmés (« 21 heures », Qualiopi TLS, tutoiement). Faits → FACTS-CANON |
| [COPY-V2.md](marketing/COPY-V2.md) | 🟡 Canonique copy | Copy par page + SEO. Croiser les faits avec FACTS-CANON avant réutilisation |
| [COMPETITIVE-BRIEF.md](marketing/COMPETITIVE-BRIEF.md) | 🟢 Actif | Analyse concurrentielle (edtech, conseil transformation) |
| [MARKETING-LINKEDIN.md](marketing/MARKETING-LINKEDIN.md) | 🟢 Actif | Stratégie LinkedIn + contenu founder-led |
| [_archive/MARKETING-CONTEXT.md](_archive/MARKETING-CONTEXT.md) | 🗄️ **Archivé 2026-07-24** | Déplacé vers `_archive/`. Rétrogradé depuis l'audit 2026-06-10 (le plus dérivé : 23h, 490 €, Open Badge 2.0, CPF/OPCO, page Académie). Ne pas s'en servir comme source. |

---

## 📦 Racine repo + product/ — Config & Design system

**⚠️ `PRODUCT.md`, `DESIGN.md`, `DESIGN-IMPECCABLE.md` vivent à la RACINE du repo** (pas dans `docs/product/`) — lus par le skill impeccable.

| Fichier | Emplacement | Purpose |
|---------|---|---------|
| `PRODUCT.md` | racine repo | Version, stack, routes, first steps |
| `DESIGN.md` | racine repo | Design system specification (colors, tokens, patterns) |
| `DESIGN-IMPECCABLE.md` | racine repo | Design excellence gaps + signatures |
| `USER-FLOWS.md` | `docs/product/` | User journey diagrams (signup, lesson, journal) |
| `ETUDE-VIABILITE-LEARNING-APP.md` | `docs/product/` | **⭐ Étude de viabilité — registre analyste / BPI-Big 4** (2026-07-25). Revue critique de **tout le projet** (Learning App **+ conseil SBO**), marché France/Europe **sourcé** (recherche externe fraîche + docs Notion vision/positionnement/offre + CDC + code de l'app). **Verdict :** TLS = **boutique services à 2** (66 % du CA visé de 260 700 € = service humain) qui **construit un produit qu'elle n'a pas encore** (app = prototype front-end mock/`localStorage`, 0 backend ; CDC = ~4 000 h de dev **spec-stage**, « en attente validation Pierre »). **Moat vide au lancement** (Passeport sans preuve structurée, matching manuel, analytics 0 %) + collision de nom avec le Passeport d'État. **Marché réel** (formation FR 56,6 Md€, EdTech FR **1,8 Md€** — pas 7,88, SBO catégorie naissante « discours > pratique », AI Act Art. 4 vent porteur, contrôle CNIL août 2026) **mais** récompense un **wedge B2B focalisé**, pas l'« OS SBO entreprise » face aux géants (360L 243 M$, Gloat, Neobrain, 365Talents) + **hiver du financement (−66 %)**. **Reco = le wedge « couche de preuve financée par le service »** : Passeport evidence-FK + exposition API/MCP (Learning Buddy Option C) + entrée **AI Literacy Art. 4** ; réconcilier le pricing B2B ; provisionner l'AI Act haut-risque ; **renoncer** au reste. Contient SWOT, **3 scénarios** (boutique / wedge ⭐ / OS SBO), feuille de route 0-18 mois, **annexe SBO & IA approfondie**, **annexe fiabilité des sources** (chiffres internes faux corrigés : EdTech 7,88 Md€, hockey stick « Gemini Deepsearch »). **Existe en `.md` + `.docx`** (généré via pandoc). |
| `RAPPORT-COHERENCE-LEARNING-APP.md` | `docs/product/` | **⭐ Rapport handoff Chloé → Pierre-Armand** (2026-07-23). Version accessible (non-tech) de toute l'analyse, pour décision à deux. Reformule « défaut » → « incohérence/tension ». 4 schémas Mermaid (validés au parser). Les 5 incohérences racontées par « ce que vit l'apprenant » + science (SDT, Dunning-Kruger, biais d'automatisation, fausse précision, effet de génération) + UX/UI agency-grade + application app. Section **fact-check** (statut de chaque affirmation + sources + mythes écartés). **Récap par cahier** (11 cahiers → incohérence → correctif). **Section « Vague 0 : décisions à trancher ensemble »** (A architecture · B économie · C invariants · D gouvernance · E pédagogique) avec reco par défaut pour chaque, dont le coût caché E3 = écrire les grilles de critères. À lire par le métier avant tout dev. **Existe en 3 formats** : `.md` (source), `.docx` (`RAPPORT-COHERENCE-LEARNING-APP.docx`, généré via pandoc avec les 4 schémas en images), et page web agency-grade partageable (artifact claude.ai, identité TLS teal/orange, thème clair+sombre). |
| `SOLUTIONS-00-SYNTHESE.md` | `docs/product/` | **⭐⭐ Synthèse des 5 études de solutions** (2026-07-23). Montre que les 5 défauts ne sont pas 5 chantiers mais **un chantier central + deux règles + une doctrine** : les **défauts 1+2+3 se dissolvent dans un seul objet de données** (la colonne de preuve `EvidenceRef`, généralisation de `PasseportEnrichment`) — la validation coach *est* un `EvidenceRef`, et l'attestation devient la récompense de la gamification. Deux **règles transverses** : « l'humain décide, la machine étaye » (défaut 4, jamais de `%` nu) et le **gate en 5 critères** (défaut 5). Une **doctrine d'ordre** : walking skeleton. **Thème unificateur : partout le défaut est une automatisation trompeuse, partout la solution refait place à l'humain = le positionnement SBO pris au mot.** Plan en 3 vagues (décider / squelette de preuve / réconcilier vers le bas) + arbre de dépendances + 8 décisions métier à trancher. **À lire en premier de la série.** |
| `SOLUTIONS-DETAIL.md` | `docs/product/` | **Dossier consolidé des 5 études de solutions** (fusion 2026-07-24 des ex-`SOLUTIONS-01`→`05`) : un chapitre par incohérence — 01 colonne de preuve (`EvidenceRef`, 3 régimes gradués) · 02 attestation vs jeu (firewall XP) · 03 validation coach (rubrique obligatoire, RGPD art. 22) · 04 signal IA honnête (pas de `%` nu, abstention) · 05 périmètre soutenable (gate 5 critères, walking skeleton). Entrée = `SOLUTIONS-00-SYNTHESE`. |
| `REVUE-TRANSVERSALE-CDC.md` | `docs/product/` | **⭐ Synthèse de la lecture intégrale des 16 cahiers** (2026-07-23), triple lentille advisor technique / researcher / neuro-pédagogie-UX-andragogie. **5 défauts transversaux** : (1) ⛔ la preuve n'a pas de colonne vertébrale — touche 6 cahiers, mais le patron existe déjà dans `projects.ts` (`PasseportEnrichment`), à généraliser ; (2) ⛔ gamification vs attestation (XP paie la réflexion, atrophie punitive, claim payant, dashboards de présence) = risque de positionnement SBO ; (3) ⚠️ RGPD art. 22 mord *maintenant* au point non conçu (validation coach non persistée, `TBD` 04:1492) ; (4) ⚠️ « score de confiance % » = mythe technique, Mistral traité en couteau suisse ; (5) ⚠️ incohérences chiffrées + sur-ingénierie systématiques (effort ×3-4/cahier, crédits 1/10/50, Stripe Charges legacy, RFC 5545 ≠ Open Badges). **Constat récurrent : le code a souvent tranché plus juste que la spec → réconcilier vers le bas.** Verdict par cahier + plan d'action en 4 vagues. Consolide les 5 critiques dédiées. |
| `CRITIQUE-PASSEPORT-JOURNAL.md` | `docs/product/` | **Confrontation cahiers ↔ frontend** (2026-07-23), suite — Passeport (cahier 02) et Journal (cahier 07). ⚠️ **Constat central** : le cahier 02 fait de l'*evidence* un pilier (**13 occurrences**), mais `LearnerCompetency` (`types/learning.ts:152`) **n'a aucun champ de preuve** — le niveau Dreyfus est un nombre sans dossier, et « preuve » est absent de la page (vérifié au rendu). Conséquence en chaîne : sans lieu où stocker la preuve, ni Learning Buddy ni le passeport-déclaratif-validé (sortie AI Act) ne tiennent. Le lien Journal → Passeport est **à sens unique** (`JournalEntry.linkedCompetenceId` existe, le backlink non). Le Journal reste le module le mieux conçu (questions structurantes EDRA-R, humeur, lien item). Propose une entité `EvidenceRef` dont le type `coach_validation` sert **à la fois le produit et la conformité RGPD** (matérialise l'intervention humaine significative). 6 actions ordonnées. |
| `CRITIQUE-BOUCLE-APPRENANT.md` | `docs/product/` | **Confrontation cahiers ↔ frontend** (2026-07-23), angle UI/UX + sciences cognitives + ingénierie pédagogique. Périmètre resserré sur la boucle apprendre/tester/réfléchir. Reconnaît d'abord que **l'arc de leçon en 8 sections est solide** (recoupe les *First Principles* de Merrill, va jusqu'au transfert) et que la réflexion est bien persistée. ⚠️ **Constat central, vérifiable ligne à ligne** : `LessonPlayer.tsx:1039` envoie les résultats de quiz dans un `console.log` — **ce que l'apprenant écrit est gardé, ce sur quoi il est testé est jeté**. C'est la réponse à « d'où viennent les preuves du passeport ». Quatre autres constats : pas de champ `explanation` au quiz (feedback purement juste/faux) · **zéro occurrence de `dreyfus`/`competence`/`niveau` dans le lecteur de leçon** — la leçon est identique pour un novice et un expert · flashcards sans répétition espacée · chaînes anglaises au moment du résultat. 7 actions, les 4 premières sur 2 fichiers. Écarte explicitement les mythes VARK / 8 secondes / cerveau triunique. |
| `CDC-13BIS-RGPD-PROPOSITIONS.md` | `docs/product/` | **Propositions d'évolution du cahier 13bis** (2026-07-23). Constate que le modèle de données est **bon** : `ai_decisions` (rationale, confidence_score) et `ai_overrides` (motif obligatoire) instrumentent déjà AI Act art. 13/14/15 **et** l'exemption RGPD art. 22 — ce qui invalide et retire la proposition `AIDecisionLog` du doc cahier 10. **Cinq absences mesurées** (comptage sur 1 009 lignes), toutes de *gouvernance* et non de sécurité : **AIPD art. 35 (0 mention)** · **article 22 jamais nommé** · **registre des traitements art. 30 (0)** · **sous-traitants art. 28 (0)** · **transferts hors UE (0)** — cette dernière vérifiable sur la pile actuelle (Notion, Drive, HeyGen, Figma, Canva sont américains ; Mistral est un bon choix de souveraineté). Propose de **séparer le volet RGPD (applicable) du volet AI Act (déc. 2027)**, aujourd'hui confondus sous le même « MVP Juillet ». |
| `REGLEMENTAIRE-ET-SBO.md` | `docs/product/` | **Cadre juridique + état de l'art SBO** (2026-07-23). ⚠️ **L'échéance AI Act du 2 août 2026 est reportée au 2 décembre 2027** (Digital Omnibus signé le 08/07/2026) — corrige une alerte erronée. **Le RGPD passe devant** : art. 22 et AIPD s'appliquent *aujourd'hui* et touchent le cœur du passeport ; « intervention humaine significative » a un sens strict (valider sans analyse ne compte pas). TLS est **fournisseur**, donc côté lourd — allègement PME art. 62 à surveiller. Grille de qualification par usage (auto-évaluation = hors périmètre ; matching = affectation de tâches ; churn = surveillance). Côté SBO, chiffres Deloitte **citables avec attribution** (< 1 organisation sur 5 adopte, +63 % de performance, 46 % d'obstacle culturel) — sortie partielle de la contrainte de preuve S1. 6 questions à poser à un conseil. |
| `CDC-10-ANALYTICS-PROPOSITIONS.md` | `docs/product/` | **Propositions d'évolution du cahier 10** (2026-07-23) — le CDC reste source de vérité, non modifié. Constate d'abord que le cahier existant est mature (stade 3-4 du modèle de maturité marché). Relève 5 écarts : `Event` suppose que tout se passe dans l'app (manque `surface`/`context`) · aucun standard d'interopérabilité (**xAPI + profil HR Open Standards** = le passeport devient un *learner wallet* portable) · rien ne fait passer une métrique de tableau de bord à **métrique citable** (le chaînon manquant de `METRICS-A-COLLECTER`) · **⚠️ AI Act annexe III point 4 : les plateformes d'évaluation de compétences sont classées haut risque, obligations complètes au 2 août 2026** — le cahier 10 devient le substrat de conformité (art. 12 journalisation), entité `AIDecisionLog` proposée · le stade 5 suppose une jointure SIRH client, à ne pas viser au MVP. Contrainte de **conception**, distincte de la règle marketing « jamais l'AI Act en accroche ». |
| `LEARNING-BUDDY-IN-SITU.md` | `docs/product/` | **Exploration produit** (2026-07-23) — Learning Buddy en situation de travail. Compare 5 surfaces (serveur MCP · barre de menus macOS · extension navigateur · Slack/Teams · add-in Office). Recommande le **serveur MCP** : la moins chère, s'écrit une fois, présente dans Claude/Cursor/ChatGPT/Copilot. Thèse centrale : **le différenciateur n'est pas l'agent mais le Passeport** — il transforme chaque interaction en preuve de compétence, ce qu'aucun LLM générique ne peut faire. Chiffres MCP (8-12k serveurs Q2 2026, Forrester 30 % des SaaS en 2026), précédent Autodesk. ⚠️ Statut **exploration, pas décision** — question ouverte : fonctionnalité de la Learning App ou produit distinct ? |

---

## 📝 BLOG/ — Article drafts & SEO content (40K)

**Marketing blog articles (3 posts drafted)**

- `2026-06-10-ai-act-article-4-formation.md` — AI Act Article 4 compliance + training implications
- `2026-06-10-sbo-organisation-competences-guide.md` — Skills Based Organisation explainer
- `2026-06-10-formateur-augmente-ia.md` — AI-augmented trainer role

---

## 🔗 FLOW-PROMPTS/ — Session prompts by user flow

**Structured prompts for Phase 14 flow-based design**

- `README.md` — Index of flows
- `00-onboarding.md` — Signup → questionnaire → learning path launch
- `01-parcours-lesson.md` — Browse paths → select course → lesson player
- `02-journal.md` — New entry → compose → archive
- `03-coaching.md` — Book session → messaging → feedback

---

## 📂 figma/ — Figma-specific docs (5 fichiers)

**Figma design system audit & gap analysis** (Token parity → voir `_audits/FIGMA-FOUNDATIONS-AUDIT.md`, doublon réconcilié 06-30)

| Fichier | Note |
|---|---|
| `AUDIT-FIGMA-CODE-DRIFT.md` | ⚠️ **FIABILITÉ NON VÉRIFIÉE** (06-26, claims non vérifiés) |
| `AUDIT-FIGMA-STRUCTURE-CLARITY.md` | ⚠️ **FIABILITÉ NON VÉRIFIÉE** |
| `FIGMA-CODE-COMPARISON.md` | ⚠️ **FIABILITÉ NON VÉRIFIÉE** |
| `FIGMA-CURRENT-STATE.md` | ⚠️ **FIABILITÉ NON VÉRIFIÉE** |
| `RESOURCES-DESIGN-MAPPING.md` | Mapping ressources ↔ design |

> Pour l'état Figma **vérifié** (2026-06-30, inspection node-par-node), voir `CLAUDE.md` § Phase 1 P0.

---

## 🧩 _phases/ — Rapports de phase (4 fichiers)

- `PHASE-1-P0-REPAIR-CHECKLIST.md` — Atoms conformance (réécrit 06-30, vérifié)
- `PHASE-20-STATUS.md` · `PHASE-20-INTEGRATION-CHECKLIST.md` — Phase 20 Figma reproduction
- `PHASE-20.4-ANALYTICS-DASHBOARD.md` — Analytics dashboard spec

## 📊 charts/ — Data visualization (5 fichiers)

- `CHARTS-SYSTEM.md` · `CHARTS-DS-ENTRY.md` · `CHARTS-QUICK-START.md` · `CHARTS-FUTURE-CANDIDATES.md`
- `FIGMA-CHARTS-SYNC-PLAN.md` — sync charts ↔ Figma

## 🔭 veille/ — Livrables de veille approfondie (1 fichier)

- `2026-07-15-IA-GENERATIVE-FORMATION-PREUVES.md` — **premier livrable du process de veille approfondie** (test du 2026-07-15). IA générative en formation : ce qui est démontré vs ce qui circule. 12 claims vérifiés en adversarial 3 voix sur 25 sources, 13 rejetés. Contient 2 pièges de citation à bannir dans les contenus TLS (« cognitive debt » contesté · 10 % Insee ≠ adoption IA générative). Coût du run + limites documentés en §4-5.

---

## 🧭 ops/ — Outillage & workflows de l'entreprise (3 fichiers)

- `NOTION-CAPACITES-2026.md` — **ce que Notion sait faire depuis février 2026** (2026-07-23). Étude des versions 3.3 à 3.6 rapportée aux problèmes de TLS. Réponse à « peut-on développer nos propres outils sans quitter Notion » : **oui** — le Developer Platform de mai apporte **Workers** (runtime hébergé), **Database Sync** (brancher Pennylane), **Custom Agent Tools**, CLI et Agent SDK. Vues `chart` et `dashboard` créables par API avec un DSL complet. **Claude est agent externe dans Notion depuis le 1er juillet.** Blocs HTML interactifs — mais limites non documentées, à tester. ⏰ **Deux échéances de coût** : Custom Agents en crédits depuis le 04/05, **Workers à partir du 11/08**. Propose une restructuration Sales · Finance · Ops · Stratégie en tableaux de bord, et 7 actions ordonnées dont 4 gratuites et sans développement.

- `NOTION-WORKSPACE-AUDIT.md` — **audit du workspace Notion, partage et automatisation** (2026-07-23). Diagnostic : le workspace n'est pas sous-conçu mais **sous-activé**. 40 projets, 257 tâches (147 ouvertes), 7 Company Areas, Master Vault SSOT, 7 bases CRM. ⚠️ **Trois constats chiffrés** : (1) un **AI Agents Index de 32 entrées dont 6 agents P0 jamais testés** et une **base Skills de 11 skills TLS jamais activées** — dont `Note de réunion TLS` qui créerait les tâches depuis les décisions ; (2) le **CRM porte ~40 000 € de pipeline ouvert avec toutes les relances dépassées de 3 à 5 mois**, alors que *Suivi des commandes* est tenu à jour ; (3) l'administratif n'a **aucune routine** — une contrainte URSSAF est en cours. Documente l'écart de partage Chloé ↔ Pierre-Armand (5 projets communs sur 40) et propose une base Échéances + agent mensuel. Plan d'action en 7 points.

- `CARTOGRAPHIE-OUTILLAGE.md` — **cartographie besoins → workflows → outillage** (2026-07-23). Méthode en 3 niveaux (objectif chiffré → workflow récurrent → outil), 5 fonctions cartographiées (acquisition, vente, produit, preuve, pilotage), roadmap priorisée de 8 skills TLS sur-mesure. Croise Notion et le dépôt. ⚠️ **Relève 6 divergences entre sources, dont 2 graves** : des métriques inventées (turnover −30 %, 4,2 h/semaine) circulent dans les argumentaires de vente Notion en violation de C7, et **deux modèles de tarification coexistent** (crédit-based canonique vs abonnement plat). Les docs Notion datent du 09/06, `FACTS-CANON` du 10/06 — ils n'ont jamais été repassés depuis. Documente aussi 4 contraintes bloquantes et 5 sources non lues (dont les plus récentes, juillet).

---

## 📋 briefs/ — Briefs de travail (4 fichiers)

- `BRIEF-VEILLE-IA-PIPELINE.md` — brief technique pour Pierre-Armand : couche IA de la veille (collecte multi-canal RSS/newsletter/Perplexity, vérification de fiabilité, synthèse). Ancré sur les CDC 12bis/12/01bis/13bis + le contrat `wp-veille`. Statut : proposition à discuter (2026-07-15)
- `BRIEF-LEARNING-SPACE-VEILLE.md` — brief refonte Learning Space + Veille
- `SITE-V2-AGENCY-BRIEF.md` — brief site vitrine agency-grade (motion) + prompt Fable 5 prêt à coller + mode d'emploi crédits Fable 5 (2026-07-07)
- `HERO-CONSTELLATION-ILLUSTRATION-BRIEF.md` — brief + guide de création de l'illustration hero (constellation dessinée main + aube) : refs domaine public, brief custom, pas-à-pas Procreate/Affinity, prompts Higgsfield/IA (2026-07-14)

---

## 🗂️ _ARCHIVE/ — Historical docs (kept for reference)

**Deprecated but preserved**

- `SITE-INTERNET-V1-ANALYSE.md` — Old site HTML analysis (pre-React marketing)
- `AUDIT-COHERENCE.md` — Old coherence audit (superseded by Phase 19)

---

## 🗄️ _CANON/ — Canonical stable docs

**Source de vérité unique. Prime sur TOUS les autres docs, y compris marketing et site.**

- `FACTS-CANON.md` — **Faits validés ligne par ligne** par Chloé : formation (7 modules / 7h / C-Campus / Open Badge / OPCO), accompagnement (STRIDE), Learning App, chiffres, marque & fondateurs. Statut par ligne : ✅ vrai · ✏️ à corriger · ❌ faux · ❓ à valider. ⏸️ Pricing & business model **gelés** (non validés, base provisoire = CDC)
- `AUDIT-COHERENCE.md` — Audit 2026-06-10 qui a déclenché la création du canon (docs marketing porteurs de copy + chiffres IA non fiables)
- `METRICS-A-COLLECTER.md` — Métriques manquantes à collecter avant de pouvoir les publier
- `REGLES-USAGE-COMPOSANTS.md` — **Règles d'usage des composants** (2026-07-23) : quand utiliser
  Modal vs Toast, la sémantique des 4 variantes d'Alert, le choix numbered/load-more/infinite
  pour Pagination, et les contrats a11y de Button et Input. Récupérées de `src/design-system/spec.json`
  avant sa suppression — elles n'existaient nulle part ailleurs. **Doctrine uniquement, aucune valeur
  de token** : les valeurs vivent dans `src/index.css` (@theme)
- `AUDIT-DESIGN-2026-07-22.md` — Confrontation des 5 docs design au code réel. Établit qu'il y a
  **4 référentiels de tokens** (3 CSS chargés + 1 spec fossile), pas un seul, et pourquoi l'audit
  de juin concluait « tokens cohérents » : les 2 docs les plus dérivés n'étaient pas dans son périmètre
- `CHANTIER-TYPO-A11Y.md` — **État mesuré typo + accessibilité** (2026-07-23, deux passes) :
  contrastes calculés cran par cran (ink-400 à 2,54:1 sur 309 textes — mais les **3 variants
  pleins de `Button` échouent aussi**, jusqu'à 2,64:1 sur le CTA principal, et le survol
  aggrave), échelle de tailles, graisses (une convention **existe** dans les tokens `--text-h*`,
  le code la contredit à 70 % sur h3/h4), et les 6 axes a11y désormais mesurés — dont
  **2 fausses alertes réfutées** (reduced-motion CSS et couleurs de la vitrine sont sains).
  **Périmètre : mode clair uniquement** — le mode sombre est explicitement hors chantier
  (décision du 23/07). À lire avant toute intervention sur la typographie ou les couleurs
  de texte

---

## 🗑️ _old-sessions/ — SUPPRIMÉ (2026-06-30)

Les fichiers motion-effects datés ont été supprimés lors du nettoyage du 30/06. Historique dans git si besoin.

---

## 🔍 Howto: Find what you need

| Looking for... | Read this |
|---|---|
| **Faits, offres, prix, registre** | **_canon/FACTS-CANON.md** (prime sur tout) |
| **Brand strategy / positionnement** | marketing/MARQUE-VOIX.md (faits → FACTS-CANON) |
| **Design tokens** | product/DESIGN.md |
| **Spec compliance** | PHASE-16-GAP-ANALYSIS.md + CDC/ |
| **Component audit** | _audits/AUDIT-PHASE-19.md |
| **Figma sync status** | _audits/FIGMA-AUDIT-REPORT.md |
| **Motion primitives** | site/DESIGN-INSPO.md (Until Labs section) |
| **Navbar redesign prompt** | site/PROMPT-NAVBAR-HOMEPAGE-REDESIGN.md |
| **Learning bootcamp** | learning/BOOTCAMP-START-HERE.md |
| **Project setup** | product/PRODUCT.md |
| **Copy & messaging** | marketing/COPY-V2.md |

---

## 📈 Cleanup status

**2026-07-22** (clean marketing + site)
🗑️ **`website/` SUPPRIMÉ** (21 fichiers suivis, 336K) — site HTML statique périmé. Vérifié orphelin avant suppression : aucune référence dans `vite.config` / `package.json` / `vercel` / `netlify` / `src/`, et absent de `dist/`. **Le site vitrine vit uniquement dans `src/pages/marketing/*`** (routes `/website/*`). Historique récupérable dans git
✅ `_canon/FACTS-CANON.md` + `_canon/AUDIT-COHERENCE.md` : notes de périmption ajoutées (ils référençaient le dossier supprimé)
⚠️ **Ne pas confondre `docs/site/` (docs, conservé) et `website/site/` (HTML, supprimé).**
✅ **Hiérarchie canonique rétablie dans l'index** : `_canon/FACTS-CANON.md` promu « lire en premier » à la place de `MARKETING-CONTEXT.md`, qui était encore pointé « 🔴 LIRE EN PREMIER » alors qu'il est rétrogradé depuis l'audit du 10/06. C'était la cause directe de sessions partant sur des faits périmés (23h, Qualiopi TLS, CPF, tutoiement)
✅ Section MARKETING/ : statut explicite par doc (🟢 canonique / 🟡 canonique partiel / 🔴 rétrogradé) + avertissement sur les exemples de copy de MARQUE-VOIX (drafts IA)
✅ Section SITE/ : **20 docs fantômes indexés** (25 fichiers au total, 5 seulement étaient listés)
✅ Homonymie « Direction C » documentée (art direction site 11/06 ≠ variante home V2 rejetée en juillet)
✅ Section _CANON/ : description corrigée (elle décrivait un contenu qui n'est pas celui du fichier)
✅ Compte de docs corrigé (~85 annoncés → 130 réels)

**2026-06-30** (anti-dérive agents)
✅ ~20 docs déversés en vrac re-rangés (racine repo + docs/ → sous-dossiers)
✅ Nouveaux sous-dossiers : `_phases/`, `charts/`, `briefs/`
✅ 4 audits Figma (06-26) marqués ⚠️ FIABILITÉ NON VÉRIFIÉE
✅ Dédupliqué PHASE-16-GAP-ANALYSIS (product/ supprimé)
✅ Supprimé `.claude/worktrees/` (40 Mo), `.agents/skills 2/`, `docs/_old-sessions/`
✅ Archivé .claude/REFACTORING_* + SESSION_FINAL_SUMMARY → `_archive/`
✅ Règles d'hygiène doc ajoutées à CLAUDE.md

**2026-06-12**
✅ Merged CDC doublon · Archived motion files · Consolidated audits → _audits/ · Created README + INDEX

**Reste à faire :**
- [ ] Réconcilier les 2 versions divergentes de `FIGMA-FOUNDATIONS-AUDIT.md` (figma/ vs _audits/)
- [ ] Re-vérifier (ou archiver) les 4 audits Figma flaggés non-vérifiés
- [ ] Consolidate flow-prompts/ en un manifeste unique

---

*Generated 2026-06-12 | Total: ~80 docs organized | Last modified: auto-index*
