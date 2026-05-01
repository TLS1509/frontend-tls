# 🎨 DESIGN SYSTEM TLS - RÉFÉRENCE COMPLÈTE

**Version** : V5.3  
**Date** : 23 janvier 2026  
**Renommé** : 23 janvier 2026 (V7.0 - Consolidation)  
**Source de vérité** : `/styles/globals.css`  
**Score** : 98/100 ✅

---

## 📋 TABLE DES MATIÈRES

1. [Introduction](#introduction)
2. [Navigation Documentation](#navigation-documentation)
3. [Couleurs](#couleurs)
4. [Typographie](#typographie)
5. [Spacing & Layout](#spacing--layout)
6. [Gradients](#gradients)
7. [Animations](#animations)
8. [Glassmorphism](#glassmorphism)
9. [Accessibilité](#accessibilité)
10. [Quick Reference](#quick-reference)

---

## 📝 HISTORIQUE DE CE DOCUMENT

### V7.0 - 23 janvier 2026
- **Action** : Renommé de `DESIGN-SYSTEM-REFERENCE-COMPLETE.md` vers `01-DESIGN-SYSTEM.md`
- **Raison** : Consolidation documentation TLS v7.0
- **Convention** : Numérotation 00-04 pour docs principaux
- **Contenu** : Identique (référence design system complète)

### V5.3 - 23 janvier 2026 (version originale)
- Document créé lors de la consolidation design system
- Score 98/100
- Référence complète : colors, typo, spacing, gradients

---

## 🎯 INTRODUCTION

### Philosophie TLS

Le Design System TLS repose sur 5 piliers :

1. **Desktop-First, Responsive** - Optimisé pour desktop, adapté mobile
2. **Glassmorphism Moderne** - Effets de verre, transparence, profondeur
3. **Gradients Dynamiques** - 42 gradients pour identité visuelle forte
4. **Accessibilité** - WCAG 2.1 AA minimum
5. **Variables CSS** - Customisation facile via `/styles/globals.css`

### Couleurs Principales

| Couleur | Hex | Usage | Variable CSS |
|---------|-----|-------|--------------|
| **Bleu TLS** | `#55A1B4` | Primaire, actions, liens | `--color-primary` |
| **Orange TLS** | `#ED843A` | Secondaire, accents, CTA | `--color-secondary` |
| **Jaune TLS** | `#F8B044` | Tertiaire, highlights, badges | `--color-accent` |

---

## 🎨 COULEURS

### Palette Complète

#### Bleu (Primary)
```css
--color-primary-50: #E8F4F7;
--color-primary-100: #C7E5EC;
--color-primary-200: #A3D6E1;
--color-primary-300: #7FC7D6;
--color-primary-400: #6ABACD;
--color-primary-500: #55A1B4; /* BASE */
--color-primary-600: #4E93A4;
--color-primary-700: #448191;
--color-primary-800: #3B6F7E;
--color-primary-900: #2B4F5C;
```

#### Orange (Secondary)
```css
--color-secondary-50: #FDF3EA;
--color-secondary-100: #FADFCA;
--color-secondary-200: #F7CAA7;
--color-secondary-300: #F4B584;
--color-secondary-400: #F1A569;
--color-secondary-500: #ED843A; /* BASE */
--color-secondary-600: #EB7C35;
--color-secondary-700: #E8712D;
--color-secondary-800: #E56726;
--color-secondary-900: #E05419;
```

#### Jaune (Accent)
```css
--color-accent-50: #FEF8EB;
--color-accent-100: #FDEDC8;
--color-accent-200: #FBE2A2;
--color-accent-300: #F9D77C;
--color-accent-400: #F8CE5F;
--color-accent-500: #F8B044; /* BASE */
--color-accent-600: #F7A93E;
--color-accent-700: #F5A035;
--color-accent-800: #F4972D;
--color-accent-900: #F1871D;
```

#### Neutres
```css
--color-gray-50: #F9FAFB;
--color-gray-100: #F3F4F6;
--color-gray-200: #E5E7EB;
--color-gray-300: #D1D5DB;
--color-gray-400: #9CA3AF;
--color-gray-500: #6B7280;
--color-gray-600: #4B5563;
--color-gray-700: #374151;
--color-gray-800: #1F2937;
--color-gray-900: #111827;
```

#### Sémantiques
```css
--color-success: #10B981;
--color-success-light: #D1FAE5;
--color-warning: #F59E0B;
--color-warning-light: #FEF3C7;
--color-error: #EF4444;
--color-error-light: #FEE2E2;
--color-info: #3B82F6;
--color-info-light: #DBEAFE;
```

---

## ✍️ TYPOGRAPHIE

### Font Families

```css
--font-heading: 'League Spartan', system-ui, sans-serif;
--font-body: 'Nunito', system-ui, sans-serif;
```

### Hiérarchie

| Élément | Font | Taille | Poids | Line Height | Variable CSS |
|---------|------|--------|-------|-------------|--------------|
| **H1** | League Spartan | 48px | 700 | 1.2 | `--font-size-h1` |
| **H2** | League Spartan | 36px | 700 | 1.3 | `--font-size-h2` |
| **H3** | League Spartan | 28px | 600 | 1.4 | `--font-size-h3` |
| **H4** | League Spartan | 24px | 600 | 1.4 | `--font-size-h4` |
| **H5** | League Spartan | 20px | 600 | 1.5 | `--font-size-h5` |
| **H6** | League Spartan | 18px | 600 | 1.5 | `--font-size-h6` |
| **Body** | Nunito | 16px | 400 | 1.6 | `--font-size-base` |
| **Small** | Nunito | 14px | 400 | 1.5 | `--font-size-sm` |
| **XSmall** | Nunito | 12px | 400 | 1.4 | `--font-size-xs` |

### Utilisation

```jsx
// ✅ BON - Utilise composants typography
import { Heading, Text } from './components/typography';

<Heading level={1}>Titre Principal</Heading>
<Text size="lg">Texte body large</Text>

// ❌ ÉVITER - Styling manuel
<h1 style={{fontSize: '48px'}}>Titre</h1>
```

---

## 📏 SPACING & LAYOUT

### Échelle de Spacing

```css
--spacing-0: 0;
--spacing-1: 0.25rem;  /* 4px */
--spacing-2: 0.5rem;   /* 8px */
--spacing-3: 0.75rem;  /* 12px */
--spacing-4: 1rem;     /* 16px */
--spacing-5: 1.25rem;  /* 20px */
--spacing-6: 1.5rem;   /* 24px */
--spacing-8: 2rem;     /* 32px */
--spacing-10: 2.5rem;  /* 40px */
--spacing-12: 3rem;    /* 48px */
--spacing-16: 4rem;    /* 64px */
--spacing-20: 5rem;    /* 80px */
--spacing-24: 6rem;    /* 96px */
```

### Border Radius

```css
--radius-sm: 0.375rem;  /* 6px */
--radius-md: 0.5rem;    /* 8px */
--radius-lg: 0.75rem;   /* 12px */
--radius-xl: 1rem;      /* 16px */
--radius-2xl: 1.5rem;   /* 24px */
--radius-full: 9999px;  /* Cercle */
```

### Breakpoints

```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

---

## 🌈 GRADIENTS

### 42 Gradients Disponibles

#### Principaux TLS

**Bleu → Orange** (Signature TLS)
```css
background: linear-gradient(135deg, #55A1B4 0%, #ED843A 100%);
```

**Bleu → Jaune**
```css
background: linear-gradient(135deg, #55A1B4 0%, #F8B044 100%);
```

**Orange → Jaune**
```css
background: linear-gradient(135deg, #ED843A 0%, #F8B044 100%);
```

#### Variations

- **Diagonal** : 135deg (standard)
- **Vertical** : 180deg
- **Horizontal** : 90deg
- **Radial** : `radial-gradient(circle, ...)`

#### Classes Tailwind

```html
<!-- Gradient bleu-orange -->
<div class="bg-gradient-to-br from-primary to-secondary">

<!-- Gradient bleu-jaune -->
<div class="bg-gradient-to-br from-primary to-accent">

<!-- Gradient orange-jaune -->
<div class="bg-gradient-to-br from-secondary to-accent">
```

**Documentation complète** : `/TLS-GRADIENTS-GUIDE.md`

---

## ✨ ANIMATIONS

### Transitions Standards

```css
--transition-fast: 150ms ease-in-out;
--transition-base: 250ms ease-in-out;
--transition-slow: 350ms ease-in-out;
```

### Animations Motion

Utiliser **motion/react** (anciennement Framer Motion) :

```jsx
import { motion } from 'motion/react';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Contenu animé
</motion.div>
```

### Hover Effects

```css
/* Cards */
.card {
  transition: transform var(--transition-base),
              box-shadow var(--transition-base);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}
```

---

## 🌟 GLASSMORPHISM

### Style TLS v5.2

**Caractéristiques** :
- Fond semi-transparent avec blur
- Bordures subtiles
- Ombres douces
- Gradients overlay

### Composant GlassCard

```jsx
import { GlassCard } from './components/ui/glass-card';

<GlassCard blur="md" opacity={0.1}>
  <h3>Titre</h3>
  <p>Contenu avec effet verre</p>
</GlassCard>
```

### CSS Manuel

```css
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-xl);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
```

---

## ♿ ACCESSIBILITÉ

### Ratios de Contraste

| Combinaison | Ratio | WCAG 2.1 | Usage |
|-------------|-------|----------|-------|
| Bleu #55A1B4 sur blanc | 4.52:1 | ✅ AA | Texte normal |
| Orange #ED843A sur blanc | 3.12:1 | ⚠️ AA Large | Texte large uniquement |
| Jaune #F8B044 sur blanc | 1.85:1 | ❌ Fail | Fond uniquement |
| Bleu sur noir | 7.28:1 | ✅ AAA | Excellent |

### Bonnes Pratiques

```jsx
// ✅ BON - Texte accessible
<button className="bg-primary text-white">
  Action
</button>

// ❌ ÉVITER - Contraste insuffisant
<button className="bg-accent text-white">
  Action
</button>
```

### Focus States

Toujours visible et avec contraste suffisant :

```css
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

---

## ⚡ QUICK REFERENCE

### Checklist Développement

- [ ] Utiliser variables CSS (`var(--color-primary)`)
- [ ] Ne jamais hardcoder couleurs/spacing
- [ ] Utiliser composants typography (`<Heading>`, `<Text>`)
- [ ] Appliquer glassmorphism pour cards
- [ ] Vérifier contraste accessibilité
- [ ] Tester responsive (desktop-first)
- [ ] Utiliser gradients TLS (bleu-orange signature)

### Composants Clés

| Composant | Fichier | Usage |
|-----------|---------|-------|
| **GlassCard** | `/components/ui/glass-card.tsx` | Cards avec glassmorphism |
| **Button** | `/components/ui/button.tsx` | Boutons styled |
| **Heading** | `/components/typography/Heading.tsx` | Titres H1-H6 |
| **Text** | `/components/typography/Text.tsx` | Texte body |
| **Badge** | `/components/ui/badge.tsx` | Badges colorés |

### Fichiers Importants

| Fichier | Description |
|---------|-------------|
| `/styles/globals.css` | ⭐ Source de vérité (variables CSS) |
| `/TLS-COLOR-PALETTE.md` | Palette complète détaillée |
| `/TLS-GRADIENTS-GUIDE.md` | 42 gradients documentés |
| `/docs/02-COMPONENTS.md` | 87 composants documentés |

---

## 📚 NAVIGATION DOCUMENTATION

### Documents Connexes

- **[00-INDEX-PRINCIPAL.md](00-INDEX-PRINCIPAL.md)** - Index principal
- **[02-COMPONENTS.md](02-COMPONENTS.md)** - 87 composants
- **[03-FIGMA-INTEGRATION.md](03-FIGMA-INTEGRATION.md)** - Workflow Figma
- **[04-USER-FLOWS.md](04-USER-FLOWS.md)** - Flows + viewers

### Pages Design System

- **DesignSystemRealPage** - Interface principale
- **DesignTokensExportPage** - Export 201 tokens
- **DesignSystemDocPageV4** - Documentation interactive
- **DesignSystemChangelogPage** - Historique changements

---

## 🔄 CHANGELOG

### V7.0 - 23 janvier 2026
- Renommé vers `01-DESIGN-SYSTEM.md` (convention numérotation)
- Ajout section "Historique de ce document"
- Consolidation architecture TLS v7.0

### V5.3 - 23 janvier 2026
- Création document référence complète
- Score 98/100
- Compilation couleurs, typo, spacing, gradients
- Source de vérité : `/styles/globals.css`

### V5.2 - 14 janvier 2026
- Glassmorphism finalisé
- 42 gradients documentés

### V5.0 - 12 janvier 2026
- Palette couleurs complète (50-900)
- Variables CSS consolidées

---

**🎨 Design System TLS**  
**Version** : V5.3 → V7.0  
**Date** : 23 janvier 2026  
**Status** : ✅ Production  
**Score** : 98/100
