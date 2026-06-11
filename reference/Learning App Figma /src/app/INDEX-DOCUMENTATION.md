# 📚 INDEX - Documentation Technique Complète TLS

**The Learning Society - Design System v5.3**  
**Date** : 01/04/2026  
**Auteur** : Documentation Technique IA  
**Total Composants Documentés** : 16 composants majeurs

---

## 🎯 OBJECTIF

Cette documentation technique complète couvre **tous les composants clés** de l'application TLS avec :
- ✅ Props TypeScript exhaustives
- ✅ États visuels et variants
- ✅ Tokens CSS du design system
- ✅ Exemples d'utilisation réels
- ✅ Code source analysé

---

## 📖 DOCUMENTS DISPONIBLES

### **1. DOCUMENTATION-COMPOSANTS-SIDEBAR.md**
📄 **Navigation & Layout** | 12,000+ mots | 2 composants

#### Composants Couverts
- **sidebar.tsx** (shadcn/ui) - ❌ Non utilisé
  - 14 sous-composants exportés
  - Props complètes avec types
  - Variants (floating/inset/icon)
  
- **optimized-sidebar.tsx** (TLS) - ✅ ACTIF
  - 15 props TypeScript
  - États collapsed (96px) / expanded (320px)
  - 3 modes notification (avatar/header/logo)
  - Mode viewer pour pages de contenu
  - Comportement responsive (Desktop/Tablet/Mobile)
  - LocalStorage persistence

#### Points Clés
- État par défaut : **collapsed** (96px)
- Click sur sidebar collapsed → expand
- 5 navigation items (Dashboard, Parcours, Journal, Coaching, Veille)
- Glassmorphism avec `backdrop-filter: blur(20px)`

---

### **2. DOCUMENTATION-COMPOSANTS-UI.md**
📄 **Composants UI de base** | 10,000+ mots | 3 composants

#### Composants Couverts
- **Tabs**
  - 4 composants (Root/List/Trigger/Content)
  - 1 variant "pill" unique
  - États : actif/inactif/disabled/hover/focus
  - ⚠️ **NON utilisé** dans VeillePage/CoachingPage

- **Dropdown Menu**
  - 10+ composants (Item/Checkbox/Radio/Sub/etc.)
  - Structure avec séparateurs, sub-menus
  - État destructive custom
  - Radix Popper pour positionnement

- **Dialog & AlertDialog**
  - Props complètes
  - Variants de tailles (custom)
  - Structure zones (header/body/footer)
  - Animations entrée/sortie avec Motion

#### Points Clés
- Tous basés sur Radix UI primitives
- Focus accessibility (keyboard navigation, ARIA)
- Customization via className

---

### **3. DOCUMENTATION-COMPOSANTS-METIER.md**
📄 **Composants métier** | 15,000+ mots | 3 composants

#### Composants Couverts
- **Achievement Card**
  - Interface `Achievement` (11 propriétés)
  - 4 états : locked/unlocked/in-progress/newly-unlocked
  - 4 raretés : common/rare/epic/legendary
  - Mode compact vs standard
  - Composant `AchievementList` avec stats globales

- **Achievement Unlock Modal**
  - Structure avec confetti
  - Animations spring avec Motion
  - Glow pulse effects

- **Stats Card**
  - 3 variants : default/compact/gradient
  - 4 couleurs thème : primary/secondary/accent/success
  - Trend indicator (up/down/neutral)
  - Différences Dashboard vs Profile

#### Points Clés
- Gradients multicouleurs autorisés pour raretés
- Progress bar intégrée pour achievements locked
- XP rewards affichés

---

### **4. DOCUMENTATION-COMPOSANTS-FINAL.md**
📄 **Composants finaux** | 18,000+ mots | 4 composants

#### Composants Couverts
- **UpcomingSessionCard**
  - 3 props avec session object (6 propriétés)
  - Structure : header, meta info, CTAs
  - 2 boutons principaux (Préparer/Rejoindre)
  - 2 actions secondaires (Replanifier/Annuler)
  - Tooltips avec glassmorphism

- **PageHeaderFinal**
  - 5 propositions de layout
  - Tableau comparatif des variants
  - Icon sizes : 36px → 52px
  - Title sizes : text-2xl → text-4xl
  - Variations par page (Parcours/Coaching/Veille/Journal)

- **PageHeaderSimple**
  - 2 variants : default/compact
  - Version avec badge (4 couleurs)
  - Sans icône ni bordure
  - Focus typographie pure

- **ConfirmationModalAdvanced**
  - 4 variants : danger/success/warning/info
  - Structure complète avec animations
  - Gradients sémantiques
  - Spring animations Motion/React

#### Points Clés
- 5 layouts PageHeader différents selon contexte
- PageHeaderSimple sans bordure (épuré)
- ConfirmationModal avec backdrop blur 8px

---

### **5. DOCUMENTATION-COMPOSANTS-MANQUANTS.md**
📄 **Composants manquants** | 20,000+ mots | 4 composants

#### Composants Couverts
- **BookingModalMinimal**
  - 4 props
  - 2 steps : select (Calendar + Time) → confirm
  - Modal large (max-w-5xl)
  - Calendrier mensuel interactif
  - Time slots list avec scroll
  - Sticky footer avec résumé

- **CelebrationCard**
  - 6 props
  - 3 variants : booking/unlock/badge
  - Layout horizontal compact
  - Background glow radial
  - Tags/badges optionnels

- **LessonPlayer**
  - 6 props
  - 3 types : video/text/interactive
  - Sections : Player, Info, Resources, Transcript
  - VimeoPlayer intégré
  - Collapsible transcript

- **QuizSystem**
  - 3 props avec Quiz complet (34 propriétés au total)
  - 3 états : question active → answered → complete
  - Single choice ou multiple choice
  - Hint optionnel
  - Explanation après réponse
  - Results avec célébration si passed

#### Points Clés
- BookingModal : grid 2 cols (Calendar | Time Slots)
- CelebrationCard : Différent d'AchievementCard (plus petit, pour notifications)
- LessonPlayer : Gère video ET text content
- QuizSystem : State machine complexe avec scoring

---

## 🎨 TOKENS CSS DESIGN SYSTEM

### Typographie
```css
/* Font Families */
--font-display: 'League Spartan', sans-serif;
--font-body: 'Nunito', sans-serif;

/* Font Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-6xl: 3.75rem;   /* 60px */

/* Font Weights */
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;

/* Line Heights */
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;

/* Letter Spacing */
--tracking-wider: 0.05em;
```

### Couleurs
```css
/* Primary (Bleu TLS) */
--primary: #55A1B4;
--primary-lighter: #E5F1F4;
--primary-300: #96C3CF;
--primary-500: #55A1B4;
--primary-600: #4A90A3;
--primary-700: #3D7786;

/* Secondary (Orange TLS) */
--secondary: #ED843A;
--secondary-lighter: #F9E5D8;
--secondary-300: #F59A5F;
--secondary-500: #ED843A;
--secondary-700: #8F5017;

/* Accent (Jaune TLS) */
--accent: #F8B044;
--accent-lighter: #FEF3E0;
--accent-foreground: #252B37;
--accent-300: #FFC15A;
--accent-400: #F8B044;
--accent-600: #C68D36;

/* Success (Teal) */
--success: #73AFBF;
--success-50: rgba(115, 175, 191, 0.05);
--success-100: rgba(115, 175, 191, 0.1);
--success-300: rgba(115, 175, 191, 0.3);
--success-600: #5A8C9F;

/* Destructive (Rouge) */
--destructive: #A93226;
--destructive-100: rgba(169, 50, 38, 0.1);
--destructive-300: rgba(169, 50, 38, 0.3);

/* Warning (Jaune) */
--warning: #F8B044;
--warning-100: rgba(248, 176, 68, 0.1);
--warning-600: #C68D36;

/* Neutral */
--foreground: #252B37;
--muted-foreground: #6b7280;
--background: #FFFFFF;
--card: #FFFFFF;
--border: rgba(0, 0, 0, 0.1);

--neutral-50: #F9FAFB;
--neutral-100: #F3F4F6;
--neutral-200: #E5E7EB;
--neutral-300: #C8D4D7;
--neutral-400: #9AABB0;
--neutral-600: #535B62;
--neutral-700: #374151;

/* Glassmorphism */
--glass-white: rgba(255, 255, 255, 0.7);
--glass-border: rgba(255, 255, 255, 0.3);
```

### Spacing
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */

/* Card Padding */
--card-padding-x: 1.5rem;
--card-padding-y: 1.5rem;
--card-padding-x-compact: 1rem;
--card-padding-y-compact: 0.75rem;
--card-gap: 1rem;
```

### Borders & Radius
```css
--radius: 0.375rem;      /* 6px */
--radius-sm: 0.375rem;   /* 6px */
--radius-md: 0.5rem;     /* 8px */
--radius-lg: 0.625rem;   /* 10px */
--radius-xl: 0.75rem;    /* 12px */
--radius-2xl: 1rem;      /* 16px */
--radius-3xl: 1.5rem;    /* 24px */
--radius-full: 9999px;   /* Pill/Circle */
```

### Effects
```css
/* Glassmorphism */
backdrop-filter: var(--blur-xl);
--blur-xl: blur(20px);

/* Shadows */
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 
             0 1px 2px -1px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
             0 2px 4px -2px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 
             0 4px 6px -4px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

--glass-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.08), 
                inset 0 1px 0 0 rgba(255, 255, 255, 0.9);
--glass-shadow-lg: 0 20px 48px rgba(0, 0, 0, 0.1);

/* Transitions */
--duration-base: 200ms;
transition: all var(--duration-base) ease;
```

### Gradients
```css
/* Autorisés pour textes, backgrounds pages, icônes */
--gradient-primary: linear-gradient(135deg, #55A1B4 0%, #4A90A3 100%);
--gradient-warm: linear-gradient(135deg, var(--secondary), var(--accent));
--gradient-cta: linear-gradient(135deg, #ED843A 0%, #F8B044 100%);
--gradient-accent-gold: linear-gradient(135deg, #F8B044 0%, #ED843A 100%);
--gradient-success: linear-gradient(135deg, #73AFBF 0%, #5A8C9F 100%);
--gradient-destructive: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
--gradient-warning: linear-gradient(135deg, #F8B044 0%, #F59E0B 100%);

/* ⚠️ INTERDITS pour composants UI (boutons, cards) */
/* Exception : Progress bars, sliders */
```

### Z-Index
```css
--z-modal: 1050;
--z-modal-backdrop: 1040;
--z-dropdown: 1000;
--z-header: 100;
--z-sidebar: 90;
```

---

## 🎨 DESIGN PATTERNS TLS

### 1. Glassmorphism
```css
background: rgba(255, 255, 255, 0.7);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.3);
box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.08), 
            inset 0 1px 0 0 rgba(255, 255, 255, 0.9);
```

**Usage** : Cards, modals, sidebar

### 2. Gradient Icons
```css
background: linear-gradient(135deg, var(--primary) 0%, var(--primary-600) 100%);
border-radius: var(--radius-lg);
box-shadow: 0 4px 12px rgba(85, 161, 180, 0.3);
```

**Usage** : Icon containers, badges

### 3. Pill Buttons
```css
border-radius: var(--radius-full);
padding: var(--space-4) var(--space-8);
background: var(--gradient-primary);
color: white;
box-shadow: 0 8px 20px rgba(85, 161, 180, 0.35);
```

**Usage** : CTA buttons, primary actions

### 4. Hover Lift
```css
transition: all 200ms ease;

/* Hover */
transform: translateY(-2px);
box-shadow: 0 12px 28px rgba(85, 161, 180, 0.45);
```

**Usage** : Interactive cards, buttons

### 5. Color Variants System
```typescript
const variants = {
  primary: { /* Bleu */ },
  secondary: { /* Orange */ },
  accent: { /* Jaune */ },
  success: { /* Teal */ },
  destructive: { /* Rouge */ },
  warning: { /* Jaune-Orange */ },
};
```

**Usage** : Stats cards, badges, alerts, buttons

### 6. Radial Glow Effects
```css
background: radial-gradient(circle at 50% 0%, rgba(85, 161, 180, 0.15) 0%, transparent 70%);
opacity: 0.2;
pointer-events: none;
```

**Usage** : Celebration cards, hero sections

### 7. Spring Animations
```typescript
import { motion } from 'motion/react';

<motion.div
  initial={{ opacity: 0, scale: 0.95, y: 20 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.95, y: 20 }}
  transition={{ type: 'spring', duration: 0.3 }}
>
```

**Usage** : Modals, toasts, celebrations

---

## 📊 STATISTIQUES

### Composants par Catégorie

| Catégorie | Composants | Status |
|-----------|-----------|--------|
| **Navigation** | OptimizedSidebar | ✅ Documenté |
| **Layout** | PageHeaderFinal (5 variants), PageHeaderSimple | ✅ Documenté |
| **UI Base** | Tabs, Dropdown, Dialog, AlertDialog | ✅ Documenté |
| **Métier** | AchievementCard, StatsCard | ✅ Documenté |
| **Coaching** | UpcomingSessionCard, BookingModalMinimal | ✅ Documenté |
| **Célébrations** | CelebrationCard, ConfirmationModalAdvanced | ✅ Documenté |
| **Learning** | LessonPlayer, QuizSystem | ✅ Documenté |

### Complexité

| Composant | Complexité | Props | États | Lignes Code |
|-----------|-----------|-------|-------|------------|
| QuizSystem | ⭐⭐⭐ Élevée | 3 | 8 states | 600+ |
| BookingModalMinimal | ⭐⭐⭐ Élevée | 4 | 2 steps | 700+ |
| OptimizedSidebar | ⭐⭐⭐ Élevée | 15 | collapsed/expanded | 800+ |
| LessonPlayer | ⭐⭐ Moyenne | 6 | 5 states | 400+ |
| AchievementCard | ⭐⭐ Moyenne | 3 | 4 raretés | 250+ |
| ConfirmationModalAdvanced | ⭐⭐ Moyenne | 9 | 4 variants | 200+ |
| UpcomingSessionCard | ⭐ Simple | 3 | 1 state | 240+ |
| CelebrationCard | ⭐ Simple | 6 | 3 variants | 160+ |
| PageHeaderFinal | ⭐ Simple | 7 | 5 layouts | 450+ |
| StatsCard | ⭐ Simple | 6 | 3 variants | 150+ |

### Tokens CSS les plus utilisés

| Token | Occurrences | Catégorie |
|-------|-------------|-----------|
| `var(--font-display)` | 45 | Typography |
| `var(--font-body)` | 62 | Typography |
| `var(--foreground)` | 58 | Colors |
| `var(--muted-foreground)` | 51 | Colors |
| `var(--primary)` | 38 | Colors |
| `var(--space-4)` | 47 | Spacing |
| `var(--radius-lg)` | 29 | Borders |
| `var(--text-base)` | 34 | Typography |
| `var(--glass-white)` | 16 | Effects |
| `backdrop-filter: blur(20px)` | 14 | Effects |

---

## 🔍 GUIDE D'UTILISATION

### Comment utiliser cette documentation ?

#### 1. **Trouver un composant**
Utilisez l'index ci-dessus pour localiser le document contenant le composant.

#### 2. **Lire la structure Props TypeScript**
Chaque composant liste toutes ses props avec types, valeurs par défaut et descriptions.

#### 3. **Identifier les états visuels**
Les sections "États" montrent tous les variants et leurs styles CSS.

#### 4. **Copier les tokens CSS**
Tous les tokens `var(--)` sont listés et expliqués.

#### 5. **Voir les exemples réels**
Section "Utilisation dans l'App" montre le code réel des pages.

### Workflow de développement recommandé

```typescript
1. Lire Props TypeScript → Comprendre l'interface
2. Voir États visuels → Identifier les variants nécessaires
3. Copier Tokens CSS → Respecter le design system
4. Consulter Exemples → S'inspirer du code existant
5. Implémenter → Créer le composant
6. Tester → Vérifier tous les états
7. Documenter → Ajouter commentaires
```

---

## 📝 RÈGLES DU DESIGN SYSTEM TLS

### ✅ À FAIRE

1. **Toujours utiliser les tokens CSS** `var(--)`
2. **Font display pour titres**, font body pour texte
3. **Glassmorphism** pour cards et modals
4. **Pill radius** (`var(--radius-full)`) pour CTA buttons
5. **Hover lift** `-translateY(2px)` sur éléments interactifs
6. **Spring animations** pour modals/toasts
7. **4 couleurs sémantiques** : primary/success/warning/destructive
8. **Responsive** : mobile-first avec breakpoints Tailwind
9. **Accessibility** : ARIA labels, keyboard navigation
10. **Gradients** uniquement pour : textes, backgrounds pages, icônes

### ❌ À ÉVITER

1. **Hardcoded values** : `padding: 16px` → Utiliser `var(--space-4)`
2. **Gradients multicouleurs** sur composants UI (buttons, cards)
3. **Font sizes hardcodés** : `24px` → Utiliser `var(--text-2xl)`
4. **Colors hardcodées** : `#55A1B4` → Utiliser `var(--primary)`
5. **Box-shadows custom** → Utiliser `var(--shadow-md)`
6. **Border-radius hardcodé** → Utiliser `var(--radius-lg)`
7. **Transitions custom** → Utiliser `transition: all var(--duration-base) ease`
8. **Z-index arbitraires** → Utiliser `var(--z-modal)`

---

## 🚀 PROCHAINES ÉTAPES

### Composants à documenter

- [ ] ButtonEnhanced
- [ ] ProgressBarEnhanced
- [ ] NotificationDropdown
- [ ] Toast system
- [ ] BackgroundBlobs
- [ ] BookingConfirmedModal
- [ ] CancelSessionModal
- [ ] VimeoPlayer
- [ ] Celebration component

### Améliorations documentation

- [ ] Ajouter diagrammes visuels (Figma frames)
- [ ] Créer Storybook pour chaque composant
- [ ] Ajouter tests unitaires examples
- [ ] Documenter patterns d'animations
- [ ] Créer guide de migration (anciennes couleurs → nouvelles)

### Migrations à faire

- [ ] Remplacer tous hardcoded values par tokens CSS
- [ ] Migrer 34 occurrences teal/coral → success/destructive
- [ ] Créer PageHeader unifié (fusionner 5 variants)
- [ ] Ajouter keyboard shortcuts sidebar
- [ ] Implémenter états manquants (today, in-progress pour SessionCard)

---

## 🎓 RESSOURCES

### Documentation Design System
- `/styles/globals.css` - Tous les tokens CSS
- `tailwind.config.js` - Configuration Tailwind v4
- `/MIGRATION-COULEURS-TEAL-CORAL.md` - Guide migration couleurs

### Librairies Utilisées
- **Radix UI** - Primitives accessibles (Dialog, Dropdown, Tabs)
- **Motion** (Framer Motion) - Animations `motion/react`
- **Lucide React** - Icônes `lucide-react`
- **Tailwind CSS v4** - Utility-first CSS

### Outils de Développement
- **TypeScript** - Types stricts pour toutes les props
- **React** - Composants fonctionnels avec hooks
- **LocalStorage** - Persistance sidebar state
- **CSS Custom Properties** - Tokens design system

---

## 📧 CONTACT & CONTRIBUTION

**Auteur** : Documentation Technique IA  
**Version** : 5.3  
**Dernière mise à jour** : 01/04/2026

Pour toute question ou suggestion d'amélioration :
1. Ouvrir une issue sur le repo
2. Proposer un PR avec modifications
3. Contacter l'équipe TLS

---

**🎉 Documentation complète et prête pour export vers Cursor !**

**Total pages** : 5 documents  
**Total mots** : 75,000+  
**Total composants** : 16  
**Tokens CSS** : 150+  
**Exemples code** : 100+
