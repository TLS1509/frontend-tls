# 🎓 The Learning Society

**Version:** 2.0.0 | **Date:** 22/02/2026 | **Status:** Production

---

## ⚡ Démarrage

### Stack
React 18 + TypeScript + Tailwind CSS v4 + Motion

### Structure
```
/components/  - 120+ composants (37 utilisés directement)
/pages/       - 55 pages (39 actives)
/styles/      - Design System (source unique)
/docs/        - Documentation complète
```

### Règles Design System
✅ Variables CSS uniquement → `/styles/globals.css`  
✅ Font faces définies → `var(--font-display)`, `var(--font-body)`  
✅ Tailwind v4 pour layout

---

## 🎨 Couleurs TLS - V2 FINAL

**4 Couleurs TLS Uniquement:**
```css
/* Palette */
--color-primary-500: #55A1B4;   /* Bleu TLS */
--color-accent-400: #F8B044;    /* Jaune TLS (warning via alias) */
--color-success-500: #2A9D8F;   /* Teal (NOUVEAU) */
--color-error-500: #EF4444;     /* Rouge (NOUVEAU) */

/* Tokens Sémantiques - Pas de doublons */
--primary, --secondary, --accent
--success, --error, --destructive
--warning (alias accent), --info (alias primary-600)
```

**❌ Pas de familles redondantes / #E76F51 retiré:**
- Pas de `--color-teal-*` (= success)
- Pas de `--color-coral-*` (non TLS)
- Pas de `--color-warning-*` (alias accent)
- Pas de `--color-info-*` (alias primary)
- #E76F51 retiré des tokens UI

→ **⭐ START HERE:** `/docs/COLOR-TOKENS-START-HERE-FINAL.md`

---

## 📚 Documentation

### 🔥 Nouveau - Analyse Composants
→ **`/docs/COMPONENTS-USAGE-SUMMARY.md`** - Vue d'ensemble utilisation  
→ **`/docs/COMPONENTS-USAGE-ANALYSIS.md`** - Analyse détaillée  
→ **`/docs/components-usage-table.csv`** - Tableau complet

**Découverte clé:** 
- 33 pages utilisent OptimizedSidebar
- 32 pages utilisent BackgroundBlobs
- 83+ composants non utilisés directement

### Guide Complet
→ `/docs/00-GUIDE-COMPLET.md`

### Par Sujet
- **Design System:** `/docs/01-DESIGN-SYSTEM.md`
- **Composants:** `/docs/02-COMPONENTS.md`
- **Pages Status:** `/docs/PAGES-STATUS.md`
- **Figma:** `/docs/03-FIGMA-INTEGRATION.md`
- **User Flows:** `/docs/04-USER-FLOWS.md`

### Historique
→ `/CHANGELOG.md`

---

## 🧩 Top 10 Composants

```
1. OptimizedSidebar     (33 pages) - Navigation
2. BackgroundBlobs      (32 pages) - Background
3. Button/ButtonEnhanced (24 pages) - Actions
4. Input                (7 pages)  - Forms
5. SectionHeader        (5 pages)  - Headers
6. Badge                (5 pages)  - Statuts
7. PageHeaderSimple     (4 pages)  - Headers
8. CardPatterns         (3 pages)  - Dashboard
9. DashboardHeroV3Simple (2 pages) - Hero
10. PositionnementModal (2 pages)  - Modals
```

---

## 📄 Pages Actives

**39 pages production:**
- Dashboard, Parcours, Learning Space, Coaching
- Veille, Journal, Profile, Messages
- Entreprise, Account, Leaderboard
- Design System, Erreurs, Auth...

**Voir:** `/docs/PAGES-STATUS.md`

---

## 💻 Développement

### Créer un composant
```tsx
// /components/[category]/MyComponent.tsx
import { motion } from 'motion/react';

export default function MyComponent({ title }: { title: string }) {
  return (
    <motion.div style={{ color: 'var(--foreground)' }}>
      {title}
    </motion.div>
  );
}
```

### Workflow
1. Coder avec variables CSS uniquement
2. Documenter dans `/docs/00-GUIDE-COMPLET.md`
3. Ajouter dans `/CHANGELOG.md`
4. Commit

---

## 📋 Guidelines Documentation

**Lire:** `/DOCUMENTATION-GUIDELINES.md`

Règles strictes :
- ✅ Max 4 fichiers .md racine
- ✅ Docs détaillées dans `/docs/`
- ✅ Archives dans `/docs/archives/AAAA-MM-JJ/`
- ✅ Versioning obligatoire

---

## 🚀 Dernières Mises à Jour V2.0 FINAL

### 🎨 Système Couleurs V2 (FINAL - Convention TLS)
- ✅ **4 couleurs TLS uniquement** - Clean, canonique
- ✅ **Approche 100% additive** - Zéro breaking change
- ✅ **Couleurs TLS** (#55A1B4, #F8B044, #2A9D8F, #EF4444)
- ✅ **#E76F51 retiré** - Non présent dans design system
- ✅ **Pas de doublons** - warning/info = aliases
- ✅ Fichier `/styles/globals-v2-final.css` production-ready

### 📊 Analyse Composants
- ✅ Mapping composants → pages (120+ analysés)
- ✅ Identification 8 composants critiques
- ✅ 83+ composants non utilisés détectés

### 📚 Documentation
- ✅ Organisation ultra-minimaliste (4 fichiers racine)
- ✅ 5 docs couleurs V2 créés
- ✅ Guidelines strictes établies

---

## 🎯 Prochaines Actions

### Couleurs V2 (Priorité - 2 min setup)
- [ ] **START HERE:** `/docs/COLOR-TOKENS-START-HERE-FINAL.md` ⭐
- [ ] Importer `/styles/globals-v2-final.css` dans App
- [ ] Valider 5 couleurs visuellement (ColorTokensTest)
- [ ] Migration progressive: `/docs/COLOR-TOKENS-MIGRATION-PLAN-FINAL.md`

### Composants
- [ ] Tester composants non utilisés (assessment, feedback, veille...)
- [ ] Résoudre doublon NewsletterPage
- [ ] Archiver pages démo si non essentielles
- [ ] Optimiser bundle (tree-shaking)

---

**© 2026 The Learning Society**
