# 📑 Documentation Index — The Learning Society

**Last updated**: 2026-07-22 | **Total docs**: 130 fichiers (hors `_archive/`)

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
| [CORPUS-FORMATIONS-FACT-CHECK.md](learning/CORPUS-FORMATIONS-FACT-CHECK.md) | **Fact-check** corpus Drive Formations/CMT (3 parcours + doctrine) + application Learning App & site + plan correction + dédoublonnage | 🔬 Fact-check |
| [PARCOURS-CORRECTIONS-DETAIL.md](learning/PARCOURS-CORRECTIONS-DETAIL.md) | **Corrections & améliorations module par module** (3 parcours + projets + doctrine) : corrections transversales, fixes spécifiques, `[À COMPLÉTER]` marqués, capstone unifié | 🛠️ Dossier de travail |
| [FACTCHECK-CERTIFIED-NEURO.md](learning/FACTCHECK-CERTIFIED-NEURO.md) | **Fact-check certifié verbatim** du parcours Neuro-Éducation (M1-M10) : registre claim-par-claim (✅/⚠️/❌/🔴), sources réelles, chiffres à sourcer/retirer avant publication | 🔬 Fact-check |
| [FACTCHECK-CERTIFIED-IP.md](learning/FACTCHECK-CERTIFIED-IP.md) | **Fact-check certifié verbatim** du parcours Ingénierie Pédagogique (M1-M10 EDRACT vs manuel) : le parcours le plus problématique — banque 120 verbes hallucinée (M4), contradiction VARK (M5/M7/M10 vs M8), mythe « 60 000× », ROI fabriqués/incohérents, M6 inachevé, attributions fausses (Franklin/Swink/Crum) | 🔬 Fact-check |
| [FACTCHECK-CERTIFIED-UXUI.md](learning/FACTCHECK-CERTIFIED-UXUI.md) | **Fact-check certifié verbatim** du parcours UX/UI Design & PM EdTech (M1-M12) : le mieux sourcé, mais mythe poisson rouge/8 s réintroduit en M8 (pont Neuro), erreur contraste WCAG calculable (#55A1B4 = 2.94:1 pas 4.6:1, répétée 5×), ~10 stats fabriquées (Apple/Figma/NN-g), preuves post-certif inexistantes, brief M12 divergent, ~60 % du parcours non rédigé | 🔬 Fact-check |
| [CORRECTIONS-SOURCEES-UXUI.md](learning/CORRECTIONS-SOURCEES-UXUI.md) | **Corrections sourcées** du parcours UX/UI : chaque claim faux → correction + source RÉELLE vérifiée sur le web (auteur/année/lien) + phrase prête à coller. Contrastes WCAG recalculés (mini-tableau), section « À RETIRER », 12 sources clés (W3C, BBC 2017, McKinsey 2018, NN/g, Cowan 2001, Lally 2010, HolonIQ, PayScale, Lindgaard 2006, Intercom, Christensen) | ✅ Corrections sourcées |
| [CORRECTIONS-SOURCEES-IP.md](learning/CORRECTIONS-SOURCEES-IP.md) | **Corrections sourcées** du parcours Ingénierie Pédagogique : chaque claim faux → correction + source RÉELLE vérifiée sur le web (auteur/année/lien) + phrase prête à coller. Vraie taxonomie Bloom (Anderson & Krathwohl 2001), débunkage VARK (Pashler 2008 / Newton 2020 → multimodal Mayer), origine ADDIE (Branson 1975 FSU/US Army), Alliger 1997, Xunzi ≠ Franklin, mythe 60 000×, méthode ROI Phillips, prix outils T1 2026 (Synthesia/PaLM/Knewton/Smart Sparrow), section « À RETIRER », M6 → Kirkpatrick 2016 | ✅ Corrections sourcées |

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
| [MARKETING-CONTEXT.md](marketing/MARKETING-CONTEXT.md) | 🔴 **RÉTROGRADÉ — ne fait plus foi** | Conservé en archive seulement. L'audit 2026-06-10 l'a trouvé le plus dérivé (23h, 490 €, Open Badge 2.0, CPF/OPCO, page Académie). **Ne pas s'en servir comme source.** |

---

## 📦 Racine repo + product/ — Config & Design system

**⚠️ `PRODUCT.md`, `DESIGN.md`, `DESIGN-IMPECCABLE.md` vivent à la RACINE du repo** (pas dans `docs/product/`) — lus par le skill impeccable.

| Fichier | Emplacement | Purpose |
|---------|---|---------|
| `PRODUCT.md` | racine repo | Version, stack, routes, first steps |
| `DESIGN.md` | racine repo | Design system specification (colors, tokens, patterns) |
| `DESIGN-IMPECCABLE.md` | racine repo | Design excellence gaps + signatures |
| `USER-FLOWS.md` | `docs/product/` | User journey diagrams (signup, lesson, journal) |

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
