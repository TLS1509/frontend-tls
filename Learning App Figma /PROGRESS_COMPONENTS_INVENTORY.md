# 📊 Inventaire des Composants de Progression - TLS App

## 🎯 Composants de Progression Disponibles

### 1. **Progress Bar (Simple)** 📏
**Fichier:** `/src/app/components/ui/progress.tsx`

**Type:** Barre de progression linéaire (Radix UI)
**Caractéristiques:**
- Barre horizontale simple
- Utilise `@radix-ui/react-progress`
- Hauteur: 2px (par défaut)
- Couleur: `var(--primary)` (bleu TLS)
- Animation de transition fluide

**Props:**
```tsx
<Progress value={75} className="..." />
```

**Usage typique:** Progression générique, chargement

---

### 2. **ProgressBarEnhanced** ✨
**Fichier:** `/src/app/components/ui/progress-bar-enhanced.tsx`

**Type:** Barre de progression avancée avec milestones
**Caractéristiques:**
- **Milestones** avec icônes et labels
- Affichage du pourcentage
- Affichage des nombres (current/total)
- Animation Motion avec effet shimmer
- Gradient pour barre complète (success)
- Hauteur personnalisable
- Labels optionnels

**Props:**
```tsx
interface ProgressBarEnhancedProps {
  current: number;
  total: number;
  milestones?: Milestone[];
  color?: string;
  showPercentage?: boolean;
  showNumbers?: boolean;
  height?: string;
  animated?: boolean;
  label?: string;
}
```

**Exemple d'utilisation:**
```tsx
<ProgressBarEnhanced
  current={7}
  total={12}
  label="Cours complétés"
  milestones={[
    { value: 4, label: "Niveau 1", icon: "🌱" },
    { value: 8, label: "Niveau 2", icon: "🔥" },
    { value: 12, label: "Expert", icon: "⭐" },
  ]}
  showPercentage={true}
  showNumbers={true}
  animated={true}
/>
```

**Utilisé dans:**
- ❓ `/src/app/pages/EntreprisePageComplete.tsx` (seule occurrence trouvée)

---

### 3. **Stepper** 🪜
**Fichier:** `/src/app/components/ui/stepper.tsx`

**Type:** Indicateur de progression par étapes
**Caractéristiques:**
- Orientation: horizontal ou vertical
- 3 variantes: `default`, `simple`, `circles`
- États: complete, current, upcoming
- Icônes personnalisables
- Cliquable (optionnel)
- Descriptions optionnelles

**Props:**
```tsx
interface StepperProps {
  steps: Step[];
  currentStep: number;
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "simple" | "circles";
  onStepClick?: (stepIndex: number) => void;
  allowStepClick?: boolean;
}
```

**Exemple:**
```tsx
<Stepper
  steps={[
    { id: "1", label: "Inscription", description: "Créer votre compte" },
    { id: "2", label: "Profil", description: "Compléter votre profil" },
    { id: "3", label: "Confirmation", description: "Valider votre email" }
  ]}
  currentStep={1}
  variant="circles"
  orientation="horizontal"
/>
```

**Usage typique:** Onboarding, formulaires multi-étapes, parcours guidés

---

### 4. **Circular Progress (Reading)** 🔄
**Fichier:** `/src/app/pages/ArticleDetailPage.tsx` (ligne ~327)

**Type:** Progress circulaire SVG pour lecture d'article
**Caractéristiques:**
- SVG circle avec `strokeDasharray`
- Animation Motion avec `pathLength`
- Affiche la progression de lecture
- Visuel circulaire autour d'un indicateur

**Code:**
```tsx
<motion.circle
  cx="20"
  cy="20"
  r="15"
  stroke="var(--primary)"
  strokeWidth="2"
  fill="none"
  strokeLinecap="round"
  initial={{ pathLength: 0 }}
  animate={{ pathLength: readingProgress / 100 }}
  style={{
    strokeDasharray: 100,
    strokeDashoffset: 0,
  }}
/>
```

**Utilisé dans:**
- ✅ `ArticleDetailPage.tsx` - Progression de lecture d'article

---

### 5. **CompetenceBadge** (avec niveaux) 🎯
**Fichier:** `/src/app/components/ui/competence-badge.tsx`

**Type:** Badge de compétence avec indicateur de niveau
**Caractéristiques:**
- 5 niveaux: Débutant (🌱), Novice (🔥), Intermédiaire (🎯), Avancé (🚀), Expert (⭐)
- Couleurs progressives
- 3 tailles: sm, md, lg
- Effet glow
- Icônes emojis

**Props:**
```tsx
interface CompetenceBadgeProps {
  competenceKey: string;
  label: string;
  level: number; // 1-5
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}
```

**Exemple:**
```tsx
<CompetenceBadge
  competenceKey="product-vision"
  label="Vision Produit"
  level={4}
  size="md"
/>
```

**Usage typique:** Passeport de compétences, profils apprenants

---

## 📍 Où sont-ils utilisés dans l'app?

### Pages avec Progress Bars:
1. **DashboardPageUpgraded** - Progression générale
2. **ParcoursPageUpgraded** - Progression des cours
3. **ProfilePage** - Profil complétude
4. **LessonViewer** - Progression dans une leçon
5. **FlashcardsViewer** - Progression des flashcards
6. **AstucesViewer** - Progression des tips
7. **ArticleDetailPage** - Lecture d'article (circular)
8. **EntreprisePageComplete** - ProgressBarEnhanced (milestones)
9. **ProjectPage** - Projets
10. **CourseDetailPageUpdated** - Détails cours

### Composants avec Progress intégré:
- `LearnerPositioningModal` - Barre de progression questionnaire
- `OnboardingFlow` - Stepper pour onboarding
- `QuizSystem` - Progression du quiz
- `LessonPlayer` - Lecteur de leçon avec progress
- `BookingModal` - Étapes de réservation

---

## ❌ Composants MANQUANTS (à créer)

### 1. **CircularProgress** (Progress Ring) 🔴
**Usage souhaité:** 
- Progression de cours circulaire
- Dashboard widgets
- Statistiques compactes
- Mobile-friendly

**Exemple de design:**
```tsx
<CircularProgress
  value={75}
  size={120}
  strokeWidth={8}
  color="var(--primary)"
  showPercentage={true}
  label="Complété"
/>
```

**Où il serait utile:**
- Dashboard cards (cours en cours)
- Parcours overview (taux de complétion)
- Profil utilisateur (compétences)
- Mobile sidebar collapsed

---

### 2. **Timeline** (Chronologie verticale) 📅
**Usage souhaité:**
- Historique d'activités
- Parcours d'apprentissage
- Journal de bord
- Events/Milestones

**Exemple de design:**
```tsx
<Timeline
  items={[
    { date: "2026-04-20", title: "Cours complété", description: "PM Pro - Module 3" },
    { date: "2026-04-18", title: "Badge obtenu", description: "Expert Product Vision" },
    { date: "2026-04-15", title: "Coaching réservé", description: "Session 1-1 avec Marie" }
  ]}
  variant="vertical"
  showConnector={true}
/>
```

**Où il serait utile:**
- Journal de bord (historique d'entrées)
- Profil (activités récentes)
- Notifications (timeline événements)
- Parcours (roadmap visuelle)

---

### 3. **RadialProgress** (Gauge/Jauge) 📊
**Usage souhaité:**
- Score global
- Taux de satisfaction
- Performance metrics
- KPIs visuels

**Exemple:**
```tsx
<RadialProgress
  value={87}
  max={100}
  size={150}
  label="Score global"
  color="var(--success)"
  showLabel={true}
/>
```

**Où il serait utile:**
- Dashboard (metrics clés)
- Profil (score d'engagement)
- Résultats de quiz
- Évaluations

---

## 🎨 Design Patterns Utilisés

### Couleurs de Progression:
- **En cours:** `var(--primary)` (#55A1B4 - Bleu TLS)
- **Complété:** `var(--success-600)` (Vert)
- **Warning:** `var(--warning)` (#F8B044 - Jaune)
- **Destructive:** `var(--destructive)` (#EF4444 - Rouge)

### Animations:
- **Motion/Framer:** Transitions fluides (ProgressBarEnhanced, ArticleDetailPage)
- **CSS Transitions:** États hover, focus
- **Shimmer Effect:** ProgressBarEnhanced (effet de brillance)
- **PathLength:** SVG circle animation

### Tokens CSS utilisés:
```css
--primary
--success-600
--success-700
--neutral-100
--neutral-300
--shadow-sm
--radius-full
--text-xs
--text-sm
--font-weight-semibold
--font-weight-bold
```

---

## 📝 Recommandations

### Créer les composants manquants:
1. ✅ **CircularProgress** - Haute priorité (très demandé)
2. ✅ **Timeline** - Moyenne priorité (Journal, Profil)
3. ⚠️ **RadialProgress** - Basse priorité (nice-to-have)

### Standardiser l'usage:
- Utiliser `ProgressBarEnhanced` pour progression avec milestones
- Utiliser `Progress` simple pour chargement/états génériques
- Utiliser `Stepper` pour parcours multi-étapes
- Créer `CircularProgress` pour dashboards/widgets

### Ajouter au Design System Package:
- ✅ `Progress` (déjà dans `/ui/`)
- ✅ `ProgressBarEnhanced` (à ajouter)
- ✅ `Stepper` (déjà dans `/ui/`)
- ❌ `CircularProgress` (à créer puis ajouter)
- ❌ `Timeline` (à créer puis ajouter)

---

## 🔗 Fichiers Connexes

**Composants UI:**
- `/src/app/components/ui/progress.tsx`
- `/src/app/components/ui/progress-bar-enhanced.tsx`
- `/src/app/components/ui/stepper.tsx`
- `/src/app/components/ui/competence-badge.tsx`

**Pages utilisant Progress:**
- `/src/app/pages/DashboardPageUpgraded.tsx`
- `/src/app/pages/ParcoursPageUpgraded.tsx`
- `/src/app/pages/ArticleDetailPage.tsx`
- `/src/app/pages/LessonViewer.tsx`
- `/src/app/pages/ProfilePage.tsx`

**Composants métier avec Progress:**
- `/src/app/components/assessment/LearnerPositioningModal.tsx`
- `/src/app/components/onboarding/OnboardingFlow.tsx`
- `/src/app/components/quiz/QuizSystem.tsx`
- `/src/app/components/patterns/LessonPlayer.tsx`

---

**Dernière mise à jour:** 2026-04-28
