# 📚 The Learning Society - Guide Complet

**Version:** 2.0.0 | **Date:** 22/02/2026 | **Status:** Production

---

## 📖 Navigation Rapide

- **Démarrage:** [README.md](../README.md)
- **Design System:** [01-DESIGN-SYSTEM.md](01-DESIGN-SYSTEM.md)
- **Composants:** [02-COMPONENTS.md](02-COMPONENTS.md)
- **Pages:** [PAGES-STATUS.md](PAGES-STATUS.md)
- **User Flows:** [04-USER-FLOWS.md](04-USER-FLOWS.md)
- **Guidelines:** [../DOCUMENTATION-GUIDELINES.md](../DOCUMENTATION-GUIDELINES.md)

---

## 🚀 Démarrage Rapide

### Stack
React 18 + TypeScript + Tailwind CSS v4 + Motion

### Structure
```
/components/  - Composants réutilisables (18 catégories)
/pages/       - Pages application (55 fichiers, 39 actives)
/data/        - Données mockées
/styles/      - Design System (globals.css - SOURCE UNIQUE)
/docs/        - Documentation
```

### Règles OBLIGATOIRES
✅ **Variables CSS uniquement** → `var(--primary)`  
✅ **Font faces définies** → `var(--font-display)`, `var(--font-body)`  
✅ **Tailwind v4 pour layout**  
✅ **Pas de valeurs hardcodées**

---

## 🏗️ Architecture

### Hiérarchie Navigation
```
Dashboard → Parcours → Learning Space → Lesson Viewer
           Coaching → Booking → Confirmation
           Veille → Newsletter/Magazines/Dossiers → Détails
           Journal → Entrées → Détail
```

### Types de Contenu
- **Cours:** PARCOURS → ÉTAPES → LEÇONS (hiérarchie 3 niveaux)
- **Coaching:** Sessions + Questionnaires + Booking
- **Veille:** Actus Semaine, Vidéos, Dossiers, Magazines
- **Gamification:** Badges, Progression, Streaks, Leaderboard
- **Journal:** Prompts, Entrées Libres, Réflexions

---

## 🎨 Design System TLS

### Source Unique de Vérité
**Fichier:** `/styles/globals.css`

**RÈGLE ABSOLUE:** Ne JAMAIS hardcoder couleurs/fonts/espacements

### Couleurs Principales
```css
--primary: #55A1B4;      /* Bleu TLS */
--secondary: #ED843A;    /* Orange TLS */
--accent: #F8B044;       /* Jaune TLS */

/* Sémantiques */
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;
--info: #3b82f6;

/* Niveaux Compétences */
--level-debutant: #10b981;
--level-intermediaire: #3b82f6;
--level-avance: #a855f7;
--level-expert: #f59e0b;
```

### Typographie
```css
--font-display: 'League Spartan';  /* Headings uniquement */
--font-body: 'Nunito';             /* Body text uniquement */
```

### Glassmorphism Standard
```css
background: rgba(255, 255, 255, 0.8);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
border: 1px solid var(--border);
```

**Documentation détaillée:** [01-DESIGN-SYSTEM.md](01-DESIGN-SYSTEM.md)

---

## 🧩 Composants

### Organisation (18 Catégories)
```
/components/
├── /ui/              - 80+ primitives (Button, Card, Dialog...)
├── /common/          - Layout partagé (PageContainer, SectionHeader...)
├── /animations/      - Emojis animés, icons (NEW - 22/02/2026)
├── /celebrations/    - Système célébrations & achievements
├── /coaching/        - Booking, sessions, questionnaires
├── /modals/          - Modals spécifiques métier
├── /feedback/        - Satisfaction, ratings, avis
├── /assessment/      - Positionnement compétences
├── /notifications/   - Système notifications
├── /veille/          - Filtres & composants veille
├── /journal/         - Prompts & cartes journal
├── /onboarding/      - Flow onboarding
├── /design-system/   - Composants page design system
├── /patterns/        - Patterns de composition
├── /quiz/            - Système quiz
├── /rating/          - Système notation
├── /typography/      - Composants typo
├── /debug/           - Outils debug (dev only)
└── /figma/           - Imports Figma (protected)
```

### Règles Composants
- ✅ 1 README.md par catégorie (< 100 lignes)
- ✅ Variables CSS uniquement
- ✅ TypeScript strict
- ✅ Props interfaces explicites

**Catalogue détaillé:** [02-COMPONENTS.md](02-COMPONENTS.md)

---

## 📄 Pages

### Pages Production (39 actives)
Voir liste complète dans [PAGES-STATUS.md](PAGES-STATUS.md)

### Pages Clés
- **DashboardPageUpgraded** - Hero V3 + Quick Wins + Stats
- **ParcoursPageUpgraded** - Liste parcours + Filtres
- **LearningSpacePage** - Étapes & Leçons + Progression
- **CoachingPageUpgraded** - Réservation type Calendly
- **VeillePage** - 4 types: Actus, Vidéos, Dossiers, Magazines
- **JournalPageUpgraded** - Prompts quotidiens + Entrées
- **DesignSystemRealPage** - Catalogue composants live

### ⚠️ Corrections Récentes (22/02/2026)
- ✅ **ArticlePage manquant** → remplacé par WeeklyNewsDetailPage
- ✅ Import crash corrigé
- ✅ 12 pages supplémentaires importées (magazines, vidéos, viewers)

### À Tester
- [ ] NewsletterPage vs WeeklyNewsletterPage (doublon?)
- [ ] Magazines & Dossiers (accessibles?)
- [ ] Vidéos (viewers ok?)
- [ ] Flashcards, Astuces, Complementary (dans lessons?)

**Status détaillé:** [PAGES-STATUS.md](PAGES-STATUS.md)

---

## 💻 Développement

### Créer un Composant
```tsx
// /components/[category]/MyComponent.tsx
import { motion } from 'motion/react';

interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

export default function MyComponent({ title, onAction }: MyComponentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        background: 'var(--background)',
        color: 'var(--foreground)',
        fontFamily: 'var(--font-body)',
      }}
    >
      <h2 style={{ fontFamily: 'var(--font-display)' }}>
        {title}
      </h2>
      {onAction && (
        <button onClick={onAction}>Action</button>
      )}
    </motion.div>
  );
}
```

### Créer une Page
```tsx
// /pages/MyPage.tsx
import OptimizedSidebar from '../components/ui/optimized-sidebar';
import { BackgroundBlobs } from '../components/ui/background-blobs';

interface MyPageProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export default function MyPage({ onNavigate, onLogout }: MyPageProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <BackgroundBlobs />
      
      <OptimizedSidebar
        currentPage="my-page"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />
      
      <main className="flex-1 overflow-y-auto">
        {/* Contenu - Variables CSS uniquement */}
      </main>
    </div>
  );
}
```

### Workflow Standard
1. **Coder** avec variables CSS uniquement
2. **Documenter** dans fichier approprié
3. **Tester** sur design system page si composant
4. **Ajouter** dans [CHANGELOG.md](../CHANGELOG.md)
5. **Commit**

---

## 📚 Documentation

### Structure Ultra-Minimaliste
```
/ (Racine - 4 fichiers MAX)
├── README.md                       # Point d'entrée
├── CHANGELOG.md                    # Historique complet
├── Attributions.md                 # Crédits légaux
└── DOCUMENTATION-GUIDELINES.md     # Règles strictes

/docs/ (Documentation détaillée)
├── 00-GUIDE-COMPLET.md            # Ce fichier (tout-en-un)
├── 01-DESIGN-SYSTEM.md            # Design System détaillé
├── 02-COMPONENTS.md               # Catalogue composants
├── 03-FIGMA-INTEGRATION.md        # Intégration Figma
├── 04-USER-FLOWS.md               # User flows détaillés
├── PAGES-STATUS.md                # Status pages (NEW)
├── celebration-system-guide.md    # Guide célébrations
├── COULEURS_TLS_NIVEAUX.md       # Niveaux compétences
├── POSITIONNEMENT_COMPETENCES.md # Positionnement
├── README.md                      # Index /docs
└── /archives/2026-02-22/          # Archives datées

/components/[category]/ (Chaque dossier)
└── README.md                      # Index < 50 lignes
```

### Règles Documentation
✅ Max 4 fichiers .md racine  
✅ Docs détaillées → `/docs/`  
✅ Préfixes numériques obligatoires (00-, 01-...)  
✅ README composants < 100 lignes  
✅ Archives datées `/docs/archives/AAAA-MM-JJ/`  
✅ Versioning en-têtes obligatoire

**Guidelines complètes:** [../DOCUMENTATION-GUIDELINES.md](../DOCUMENTATION-GUIDELINES.md)

---

## 📝 Changelog Récent

### [2.0.0] - 22/02/2026

#### Documentation
- 📚 Consolidation ultra-minimaliste (50+ → 4 fichiers racine)
- 📋 Guidelines strictes créées
- 📄 Status pages créé
- 🗂️ Organisation composants (18 catégories)

#### Corrections Critiques
- 🐛 **ArticlePage manquant** → WeeklyNewsDetailPage
- 🐛 Crash import App.tsx corrigé
- ✅ 12 pages supplémentaires importées

#### Fonctionnalités
- ✨ Actus de la semaine (système 3 vues)
- 🗑️ Suppression "Articles à la une"
- 🎨 Design System finalisé
- 🧩 Composants animations créés

**Historique complet:** [../CHANGELOG.md](../CHANGELOG.md)

---

## 🎯 Actions en Cours

### Cette Semaine
- [ ] Tester pages non référencées (12 pages)
- [ ] Résoudre doublons (Newsletter vs WeeklyNewsletter)
- [ ] Documenter résultats tests
- [ ] Archiver pages obsolètes confirmées

### Semaine Prochaine
- [ ] Ajouter routes pages validées
- [ ] Intégrer navigation complète
- [ ] Finaliser nettoyage composants

---

## 🚨 Règles Critiques

### Design System
❌ **INTERDIT**
```tsx
// ❌ Valeurs hardcodées
<div style={{ color: '#55A1B4' }}>
<h1 style={{ fontFamily: 'Arial' }}>
```

✅ **OBLIGATOIRE**
```tsx
// ✅ Variables CSS uniquement
<div style={{ color: 'var(--primary)' }}>
<h1 style={{ fontFamily: 'var(--font-display)' }}>
```

### Documentation
❌ **INTERDIT**
- Fichiers .md racine (sauf 4 autorisés)
- Docs sans versioning
- Doublons
- README composants > 100 lignes

✅ **OBLIGATOIRE**
- Docs détaillées → `/docs/`
- Préfixes numériques
- Versioning en-têtes
- Archives datées

---

## 📞 Support

### Questions?
1. **Design:** [01-DESIGN-SYSTEM.md](01-DESIGN-SYSTEM.md)
2. **Composants:** [02-COMPONENTS.md](02-COMPONENTS.md)
3. **Pages:** [PAGES-STATUS.md](PAGES-STATUS.md)
4. **Guidelines:** [../DOCUMENTATION-GUIDELINES.md](../DOCUMENTATION-GUIDELINES.md)

### Références Live
- **DesignSystemRealPage** - Catalogue interactif
- **DesignSystemChangelogPage** - Historique design
- **DesignSystemFlowsPage** - User flows visuels

---

_Version: 2.0.0 | Date: 22/02/2026 | Status: Production_  
_Prochaine révision: Après tests pages plateforme_
