# 📚 TLS Frontend Documentation

Bienvenue dans la doc du projet **The Learning Society** — plateforme EdTech Skills Based Organisation.

## 🗺️ Navigation rapide

| Section | Contenu | Quand l'utiliser |
|---------|---------|------------------|
| **[INDEX.md](INDEX.md)** | Table des matières complète | Chercher un fichier spécifique |
| **[MIGRATION-PLAN.md](MIGRATION-PLAN.md)** | Phases 1-20 + statuts de progression | Comprendre l'état du projet |
| **[PHASE-16-GAP-ANALYSIS.md](PHASE-16-GAP-ANALYSIS.md)** | Analyse des gaps spec vs code (16 cahiers) | Avancer sur Phase 16 (spec compliance) |

## 📁 Dossiers principaux

### 🎯 Contenu produit
- **`/site/`** — Design & marketing site (DESIGN-INSPO.md, PROMPT-NAVBAR-HOMEPAGE-REDESIGN.md)
- **`/marketing/`** — Context marketing, brand strategy, inspo
- **`/product/`** — PRODUCT.md (config projet), DESIGN.md (design system)
- **`/learning/`** — Bootcamp UX/UI, Framer Motion, logo animation

### 📋 Specifications & Cahiers
- **`/CDC/`** — Cahiers de charges 16 modules (01-13bis) — **source de vérité métier**
  - 01 Parcours & Learning Space
  - 02 Passeport Compétences (gates tout le reste)
  - ... (16 cahiers total)

### 🔍 Audits & Analysis
- **`/_audits/`** — Rapports d'audit consolidés
  - AUDIT-PHASE-19.md — qualité globale 142 pages
  - FIGMA-AUDIT-REPORT.md — sync Figma ↔ React gaps
  - FLOWS-TIER1-SYNTHESIS.md — analyse flows daily-use
  - etc.

### 🗂️ Archives
- **`/_old-sessions/`** — Sessions anciennes, redondances (motion effects, old prompts)
- **`/_archive/`** — Docs obsolètes conservées pour historique
- **`/_canon/`** — Canonical docs (rarement modifiés, très stables)

## ✨ Fichiers clés au root

**Projets actifs :**
- `MIGRATION-PLAN.md` — phases 1-20, points de repère
- `PHASE-16-GAP-ANALYSIS.md` — compliance specs (16 cahiers → code FO)

**Design & Assets :**
- `site/DESIGN-INSPO.md` — Mobbin saves + Until Labs case study
- `site/PROMPT-NAVBAR-HOMEPAGE-REDESIGN.md` — Prompt navbar fluid island + hero parallax

**Références :**
- `product/PRODUCT.md` — Config produit (version, stack, routes)
- `product/DESIGN.md` — Design system tokens, patterns, rules

## 🚀 Commencer une session

**Si vous travaillez sur... →**

| Task | Fichier à lire | Prompt |
|------|---|---|
| **Navbar Fluid Island + Hero parallax** | `site/DESIGN-INSPO.md` + `site/PROMPT-NAVBAR-HOMEPAGE-REDESIGN.md` | Copier PROMPT-NAVBAR-HOMEPAGE-REDESIGN.md directement |
| **Phase 16 (Spec compliance)** | `PHASE-16-GAP-ANALYSIS.md` + cahiers `/CDC/01-13bis` | Lancer un Agent Explore sur CDC/ + FO pages |
| **Design System audit** | `product/DESIGN.md` + `/CDC/` | Valider tokens Tailwind vs Figma DS |
| **Marketing site refonte** | `site/DESIGN-INSPO.md` + `MARKETING-CONTEXT.md` | Copier structure site 6 pages |
| **Bootcamp UX/UI** | `/learning/BOOTCAMP-START-HERE.md` | Lancer 12-week learning path |

## 📊 État du projet

- **Code** : React 19 · TypeScript · Vite · **Tailwind v4** · Framer Motion · Zustand 5 · React Router 7
- **Design system** : ~51 composants UI + 40 patterns (100% Tailwind, 0% BEM legacy)
- **Pages FO** : 140+ routes (83 écrans learning app + extras)
- **Documentation** : 16 cahiers specs (CDC), audits consolidés, bootcamp learning paths

## 🔧 Cleanup récent (2026-06-12)

✅ Merged `CDC /` doublon → `CDC/`
✅ Archived 7 motion-effects redondances → `_old-sessions/`
✅ Consolidated audits → `_audits/` (6 rapports)
✅ Deleted obsolete files (dynamic-backlog, figma-gap-matrix, post-design-integration)
✅ Created INDEX.md + README.md pour navigation

---

**Questions fréquentes ?** Consultez [INDEX.md](INDEX.md) pour la liste complète des fichiers + descriptions.
