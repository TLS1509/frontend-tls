# 📑 Documentation Index — The Learning Society

**Last updated**: 2026-06-12 | **Total docs**: ~80 fichiers organisés

---

## 🎯 Fichiers clés (top 5)

| Fichier | Description | Taille | Utiliser pour |
|---------|---|---|---|
| [MIGRATION-PLAN.md](MIGRATION-PLAN.md) | Phases 1-20, roadmap complet | 116K | Comprendre l'état général du projet |
| [PHASE-16-GAP-ANALYSIS.md](PHASE-16-GAP-ANALYSIS.md) | Analysis 16 cahiers vs FO code | 40K | Avancer Phase 16 (spec compliance) |
| [product/PRODUCT.md](product/PRODUCT.md) | Config projet, version, routes | — | Démarrer une session, setup MCP |
| [product/DESIGN.md](product/DESIGN.md) | Design system Tailwind, patterns | — | Vérifier tokens, conventions styling |
| [MARKETING-CONTEXT.md](marketing/MARKETING-CONTEXT.md) | Brand TLS, personas, copy, SEO | — | Sessions marketing |

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

**6 audit reports** — analyses de qualité, gaps design, spec compliance.

| Fichier | Type | Focus |
|---------|------|-------|
| [AUDIT-PHASE-19.md](_audits/AUDIT-PHASE-19.md) | Quality audit | 142 pages FO scored (Tier 1/2/3), a11y gaps, DS adoption |
| [AUDIT-PHASE-19-NOTION-DELTA.md](_audits/AUDIT-PHASE-19-NOTION-DELTA.md) | Notion sync | Écrans + Design System DBs consistency check |
| [REVIEW-PHASE-19.md](_audits/REVIEW-PHASE-19.md) | Refinement | Chips extraction, AuthShell, HeroSection sunset decisions |
| [FIGMA-AUDIT-REPORT.md](_audits/FIGMA-AUDIT-REPORT.md) | Design-Dev sync | React components vs Figma DS gaps, 3 missing components |
| [FIGMA-FOUNDATIONS-AUDIT.md](_audits/FIGMA-FOUNDATIONS-AUDIT.md) | Token parity | Figma variables ↔ Tailwind @theme cross-check |
| [FLOWS-TIER1-SYNTHESIS.md](_audits/FLOWS-TIER1-SYNTHESIS.md) | Daily-use analysis | 33 Tier 1 pages patterns, UX clarity scoring |

---

## 🎨 SITE/ — Design & Marketing site (252K)

**Design inspo, motion reference, prompt templates**

| Fichier | Size | Purpose |
|---------|------|---------|
| [DESIGN-INSPO.md](site/DESIGN-INSPO.md) | 100K+ | **Mobbin saves** (24 mobile + 34 desktop + 33 vitrine apps) + **Until Labs case study** parallax reverse-engineering |
| [PROMPT-NAVBAR-HOMEPAGE-REDESIGN.md](site/PROMPT-NAVBAR-HOMEPAGE-REDESIGN.md) | 15K | **Prompt complet** navbar Fluid Island + hero parallax Tier 2 + DA sourcing assets |
| ANIMATION-EFFECTS-INTEGRATION.md | — | Motion primitives integration (MagneticButton, ParallaxLayer, etc.) |
| COMPONENT-EXTRACTION-CHECKLIST.md | — | Marketing component refactoring checklist |
| APP-INSPIRATION-RESEARCH.md | — | App research (Calm, Linear, Vercel, Stripe) |

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

---

## 📢 MARKETING/ — Brand & content strategy (40K)

**Brand voice, personas, copy, SEO, positioning**

| Fichier | Purpose |
|---------|---------|
| [MARKETING-CONTEXT.md](marketing/MARKETING-CONTEXT.md) | **🔴 LIRE EN PREMIER** — vision/mission, 3 offres, 4 personas, ton, SEO, concurrents, AI Act constraints |
| [MARQUE-VOIX.md](marketing/MARQUE-VOIX.md) | Brand voice guidelines + tone examples |
| [COPY-V2.md](marketing/COPY-V2.md) | Refined homepage + page copy (formation, accompagnement) |
| [FAITS-OFFRES.md](marketing/FAITS-OFFRES.md) | Product facts, offers structure, pricing tiers |
| [COMPETITIVE-BRIEF.md](marketing/COMPETITIVE-BRIEF.md) | Competitor analysis (edtech, transformation consulting) |
| [MARKETING-LINKEDIN.md](marketing/MARKETING-LINKEDIN.md) | LinkedIn strategy + founder-led content |

---

## 📦 PRODUCT/ — Config & Design system (84K)

**Setup, design system specification, flows**

| Fichier | Purpose |
|---------|---------|
| [PRODUCT.md](product/PRODUCT.md) | **Version, stack, routes, first steps** |
| [DESIGN.md](product/DESIGN.md) | **Design system specification** (colors, tokens, patterns) |
| USER-FLOWS.md | User journey diagrams (signup, lesson, journal) |
| PHASE-16-GAP-ANALYSIS.md | Duplicate of root PHASE-16 (for reference) |
| dynamic-backlog.md | Old task tracking (archived, can delete) |

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

## 📂 FIGMA/ — Figma-specific docs

**Figma design system audit & gap analysis**

- `figma-gap-matrix.md` — Old gap matrix (superseded by _audits/FIGMA-AUDIT-REPORT.md)
- `FIGMA-FOUNDATIONS-AUDIT.md` — Token parity audit (duplicate)

---

## 🗂️ _ARCHIVE/ — Historical docs (kept for reference)

**Deprecated but preserved**

- `SITE-INTERNET-V1-ANALYSE.md` — Old site HTML analysis (pre-React marketing)
- `AUDIT-COHERENCE.md` — Old coherence audit (superseded by Phase 19)

---

## 🗄️ _CANON/ — Canonical stable docs

**Core project facts, rarely modified**

- `FACTS-CANON.md` — Core facts about TLS (mission, revenue, team size, tech stack)
- `AUDIT-COHERENCE.md` — Baseline coherence metrics

---

## 🏚️ _OLD-SESSIONS/ — Archived sessions (7 files)

**Motion effects redondance from prior sessions (2026-05)**

- `ANIMATION-EFFECTS-INTEGRATED.md`
- `ANIMATION-EFFECTS-SESSION-SUMMARY.md`
- `MOTION-EFFECTS-ROADMAP.md`
- `PREMIUM-MOTION-EFFECTS-COMPLETE.md`
- `SCROLL-EFFECTS-SESSION-RECAP.md`
- `8-EFFECTS-QUICK-REFERENCE.md`
- `QUICK-START-ANIMATION-EFFECTS.md`

*(Can be safely deleted after 2026-07-01)*

---

## 🔍 Howto: Find what you need

| Looking for... | Read this |
|---|---|
| **Brand strategy** | marketing/MARKETING-CONTEXT.md |
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

## 📈 Cleanup status (2026-06-12)

✅ Merged CDC / (doublon) → CDC/
✅ Archived 7 motion files → _old-sessions/
✅ Consolidated audits → _audits/ (6 reports)
✅ Deleted obsolete (dynamic-backlog, figma-gap-matrix, post-design)
✅ Created README.md + INDEX.md

**Next cleanup opportunities:**
- [ ] Delete _old-sessions/ after 2026-07-01 (motion effects are dated)
- [ ] Consolidate flow-prompts/ into a single JSON manifest
- [ ] Archive old blog drafts to _archive/ if not publishing

---

*Generated 2026-06-12 | Total: ~80 docs organized | Last modified: auto-index*
