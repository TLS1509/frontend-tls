# 🎨 The Learning Society - Design System Documentation

**Version:** 1.0.0  
**Date:** Décembre 2024  
**Auteur:** The Learning Society

---

## 📋 Table des matières

1. [Introduction](#introduction)
2. [Philosophie du Design](#philosophie)
3. [Couleurs](#couleurs)
4. [Typographie](#typographie)
5. [Espacements](#espacements)
6. [Bordures & Radius](#bordures)
7. [Ombres](#ombres)
8. [Animations](#animations)
9. [Composants](#composants)
10. [Thème Dark/Light](#theme)
11. [Usage](#usage)

---

## 🎯 Introduction {#introduction}

Ce design system a été créé pour **The Learning Society**, une organisation éducative française spécialisée dans la formation augmentée par l'IA.

### Principes clés

- **Consistance** : Tous les composants utilisent les mêmes variables CSS
- **Accessibilité** : Conformité WCAG 2.1 AA minimum
- **Responsive** : Mobile-first avec breakpoints adaptés
- **Performance** : Animations optimisées, lazy loading
- **Maintenabilité** : Variables centralisées dans `/styles/globals.css`

---

## 🎨 Philosophie du Design {#philosophie}

### Glassmorphism & Liquid Design

Le design TLS s'inspire du **glassmorphism** (verre dépoli) et du **liquid design** (formes organiques fluides).

**Caractéristiques :**
- Backgrounds semi-transparents avec `backdrop-blur`
- Borders subtils (`border: 1px solid rgba(255, 255, 255, 0.2)`)
- Ombres douces et multiples
- Formes rondes (`border-radius: var(--radius-2xl)`)
- Animations fluides

### Code Couleur par Pôle

| Pôle | Couleur | Usage |
|------|---------|-------|
| **Académie** (Formation) | 🔵 Bleu foncé (`#55A1B4`) | Pages de formation, parcours |
| **Agence** (Production) | 🟠 Orange (`#ED843A`) | Pages opérationnelles, production |
| **Conseil** (Stratégie) | 🟡 Jaune (`#F8B044`) | Pages stratégiques, audit |
| **Tech** (Plateforme) | 🔵 Bleu clair (`#7BC4D4`) | Pages techniques, app |

---

## 🎨 Couleurs {#couleurs}

### Palette Principale

```css
/* Primary Blue - Académie */
--primary-500: #55A1B4;
--primary-600: #4A8FA1;
--primary-700: #3D7786;

/* Secondary Orange - Agence */
--secondary-500: #ED843A;
--secondary-600: #C06920;

/* Accent Yellow - Conseil */
--accent-400: #F8B044;
--accent-600: #D69020;

/* Neutral */
--neutral-dark: #252B37;  /* Text principal */
--neutral-light: #5f8f8f; /* Text secondaire */
```

### Échelles Complètes

Chaque couleur possède une échelle de 50 à 900 :

```css
/* Exemple avec Primary Blue */
--primary-50: #E8F4F7;   /* Très clair */
--primary-100: #DCEBEF;
--primary-200: #B9D7DF;
--primary-300: #96C3CF;
--primary-400: #73AFBF;
--primary-500: #55A1B4;  /* Base */
--primary-600: #4A8FA1;
--primary-700: #3D7786;
--primary-800: #2F5F6A;
--primary-900: #1F3E45;  /* Très foncé */
```

### Couleurs Sémantiques

```css
--success: #10b981;      /* Vert - succès */
--warning: #f59e0b;      /* Orange - attention */
--destructive: #d4183d;  /* Rouge - danger */
--info: #3b82f6;         /* Bleu - information */
```

### Gradients

```css
/* Gradient principal */
--gradient-primary: linear-gradient(135deg, var(--primary-500), var(--primary-700));

/* Gradient warm (orange-jaune) */
--gradient-warm: linear-gradient(135deg, var(--secondary-400), var(--accent-400));

/* Gradient brand (3 couleurs) */
--gradient-brand: linear-gradient(135deg, var(--primary-500), var(--secondary-500), var(--accent-400));
```

### Utilisation

```jsx
// ✅ BON - Utiliser les variables CSS
<div style={{ backgroundColor: 'var(--primary-500)' }}>

// ❌ MAUVAIS - Hardcoder les couleurs
<div style={{ backgroundColor: '#55A1B4' }}>
```

---

## ✍️ Typographie {#typographie}

### Fonts

**League Spartan** : Titres (Display)  
**Nunito** : Texte body

```css
--font-display: "League Spartan", system-ui, sans-serif;
--font-body: "Nunito", system-ui, sans-serif;
```

### Tailles

```css
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px - Base */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */
--text-4xl: 2.25rem;     /* 36px */
--text-5xl: 3rem;        /* 48px */
--text-6xl: 3.75rem;     /* 60px */
```

### Poids

```css
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Line Heights

```css
--leading-none: 1;
--leading-tight: 1.25;    /* Titres */
--leading-snug: 1.375;
--leading-normal: 1.5;    /* Base */
--leading-relaxed: 1.625; /* Body text */
--leading-loose: 2;
```

### Hiérarchie

```css
/* H1 - Hero Title */
font-family: var(--font-display);
font-size: clamp(2.5rem, 5vw, 4rem);
font-weight: var(--font-weight-bold);
line-height: var(--leading-tight);

/* H2 - Section Title */
font-family: var(--font-display);
font-size: clamp(2rem, 4vw, 3rem);
font-weight: var(--font-weight-semibold);
line-height: var(--leading-tight);

/* Body Text */
font-family: var(--font-body);
font-size: var(--text-base);
font-weight: var(--font-weight-normal);
line-height: var(--leading-relaxed);
```

### ⚠️ RÈGLE IMPORTANTE

**NE JAMAIS utiliser de classes Tailwind pour la typography** (`text-2xl`, `font-bold`, `leading-none`), sauf demande explicite de l'utilisateur.

Raison : Le fichier `/styles/globals.css` définit déjà la typography par défaut pour chaque élément HTML.

---

## 📏 Espacements {#espacements}

### Échelle d'espacement

```css
--space-0: 0;
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px - Base */
--space-5: 1.25rem;    /* 20px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-20: 5rem;      /* 80px */
--space-24: 6rem;      /* 96px */
--space-32: 8rem;      /* 128px */
```

### Usage

```jsx
// Padding
<div style={{ padding: 'var(--space-6)' }}>

// Margin
<div style={{ marginBottom: 'var(--space-4)' }}>

// Gap (Grid/Flex)
<div style={{ gap: 'var(--space-4)' }}>
```

---

## 🔲 Bordures & Radius {#bordures}

### Border Widths

```css
--border-width: 1px;
--border-width-2: 2px;
--border-width-4: 4px;
```

### Border Radius

```css
--radius-none: 0;
--radius-sm: 0.375rem;   /* 6px */
--radius-md: 0.5rem;     /* 8px */
--radius-lg: 0.625rem;   /* 10px - Base */
--radius-xl: 1rem;       /* 16px */
--radius-2xl: 1.5rem;    /* 24px - Cards */
--radius-full: 9999px;   /* Cercles */
```

### Bordures Glassmorphism

```css
/* Border subtile */
border: 1px solid var(--border);

/* Border glassmorphism */
border: 1px solid rgba(255, 255, 255, 0.2);
backdrop-filter: blur(12px);
```

---

## 🌑 Ombres {#ombres}

### Échelle d'ombres

```css
--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
--shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);
```

### Usage

```jsx
<div style={{ boxShadow: 'var(--shadow-lg)' }}>
```

---

## ⚡ Animations {#animations}

### Durées

```css
--duration-fast: 150ms;
--duration-base: 200ms;
--duration-slow: 300ms;
--duration-slower: 500ms;
```

### Timing Functions

```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Animations Customs

```css
/* Blob Animation - Orbes flottantes */
.animate-blob {
  animation: blob 7s ease-in-out infinite;
}

/* Fade In Up */
.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

/* Gradient animé */
.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}
```

### Motion React

Utiliser **Motion React** pour les animations avancées :

```jsx
import { motion } from 'motion/react';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Contenu animé
</motion.div>
```

---

## 🧩 Composants {#composants}

### Composants UI Disponibles

| Composant | Chemin | Usage |
|-----------|--------|-------|
| Button | `/components/ui/button.tsx` | Boutons primaires, secondaires |
| Card | `/components/ui/card.tsx` | Cards avec glassmorphism |
| Badge | `/components/ui/badge.tsx` | Tags, labels |
| Input | `/components/ui/input.tsx` | Champs de formulaire |
| AnimatedCard | `/components/ui/animated-card.tsx` | Cards avec animations |
| ThemeToggle | `/components/ui/theme-toggle.tsx` | Switch dark/light |
| ErrorBoundary | `/components/ui/error-boundary.tsx` | Gestion d'erreurs |

### Composants Métier

| Composant | Chemin | Usage |
|-----------|--------|-------|
| Hero | `/components/Hero.tsx` | Section hero homepage |
| Header | `/components/Header.tsx` | Navigation principale |
| Footer | `/components/Footer.tsx` | Footer global |
| SEO | `/components/SEO.tsx` | Meta tags SEO |
| CookieConsent | `/components/CookieConsent.tsx` | Banner RGPD |
| TrackedButton | `/components/TrackedButton.tsx` | Bouton avec analytics |

### Exemple : Card Glassmorphism

```jsx
<div className="relative group">
  {/* Glow effect */}
  <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
  
  {/* Card */}
  <div 
    className="relative backdrop-blur-xl border rounded-2xl p-6 transition-all duration-300"
    style={{
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
    }}
  >
    Contenu
  </div>
</div>
```

---

## 🌓 Thème Dark/Light {#theme}

### Variables Dark Mode

Le fichier `/styles/globals.css` contient les variables pour le mode sombre dans la classe `.dark`.

```css
.dark {
  --background: #1a1a1a;
  --foreground: #f5f5f5;
  --primary: #55A1B4;
  --border: rgba(255, 255, 255, 0.1);
  /* ... */
}
```

### Utilisation du ThemeToggle

```jsx
import { ThemeToggle } from './components/ui/theme-toggle';

<ThemeToggle />
```

### Hook useTheme

```jsx
import { useTheme } from './contexts/ThemeContext';

const { theme, setTheme, effectiveTheme } = useTheme();

// Changer le thème
setTheme('dark'); // 'light' | 'dark' | 'system'
```

---

## 🚀 Usage {#usage}

### 1. Toujours utiliser les variables CSS

```jsx
// ✅ BON
<div style={{
  fontFamily: 'var(--font-display)',
  fontSize: 'var(--text-2xl)',
  color: 'var(--foreground)',
  padding: 'var(--space-6)',
  borderRadius: 'var(--radius-xl)',
}}>

// ❌ MAUVAIS
<div className="font-bold text-2xl text-gray-900 p-6 rounded-xl">
```

### 2. Responsive avec clamp()

```jsx
<h1 style={{
  fontSize: 'clamp(2rem, 4vw, 3rem)',
}}>
```

### 3. Animations fluides

```jsx
<div className="transition-all duration-300 hover:scale-105">
```

### 4. Glassmorphism Pattern

```jsx
<div style={{
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: 'var(--radius-2xl)',
}}>
```

---

## 📦 Structure des Fichiers

```
/
├── styles/
│   └── globals.css          # ⭐ DESIGN SYSTEM PRINCIPAL
├── components/
│   ├── ui/                  # Composants UI génériques
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── animated-card.tsx
│   │   ├── theme-toggle.tsx
│   │   └── error-boundary.tsx
│   ├── Hero.tsx            # Composants métier
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── SEO.tsx
│   └── CookieConsent.tsx
├── contexts/
│   └── ThemeContext.tsx    # Context du thème
├── hooks/
│   ├── useAnalytics.ts     # Hook GA4
│   └── usePerformance.ts   # Hooks performance
├── pages/                  # Pages
│   ├── HomePage.tsx
│   ├── AcademiePage.tsx
│   ├── AgencePage.tsx
│   ├── ConseilPage.tsx
│   └── TechPage.tsx
└── App.tsx                 # Root app
```

---

## ✅ Checklist Conformité

Avant de déployer un composant, vérifier :

- [ ] Utilise **uniquement** les variables CSS (pas de hardcoded colors)
- [ ] Typography avec `fontFamily: 'var(--font-display)'` ou `var(--font-body)`
- [ ] **Pas de classes Tailwind** pour font-size, font-weight, line-height
- [ ] Espacements avec `var(--space-X)`
- [ ] Border radius avec `var(--radius-X)`
- [ ] Couleurs avec `var(--primary-X)`, `var(--secondary-X)`, etc.
- [ ] Transitions fluides (300ms minimum)
- [ ] Responsive avec `clamp()` ou breakpoints
- [ ] Accessible (ARIA labels, focus states)
- [ ] Compatible dark mode

---

## 🎓 Ressources

- **Figma Design System** : [Lien vers Figma]
- **Storybook** : [Lien vers Storybook]
- **GitHub** : [Lien vers repo]

---

## 📞 Support

Pour toute question sur le design system :
- **Email** : design@thelearningsociety.fr
- **Slack** : #design-system

---

**The Learning Society** © 2024 - Design System v1.0.0
