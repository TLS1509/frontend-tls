# 🎨 THE LEARNING SOCIETY - DESIGN SYSTEM COMPONENTS

## 📋 Table des matières

1. [Fondations](#fondations)
2. [Hero Section](#hero-section)
3. [Benefit Cards](#benefit-cards)
4. [Tab System](#tab-system)
5. [Content Card](#content-card)
6. [Buttons](#buttons)
7. [Badges](#badges)
8. [Navigation](#navigation)
9. [Footer](#footer)
10. [CTA Section](#cta-section)
11. [Animations](#animations)

---

## 🎯 Fondations

### Variables CSS Principales

```css
/* COULEURS PAR PÔLE */
Académie (Formation)  : --primary-*    (#55A1B4 - Bleu)
Agence (Conception)   : --secondary-*  (#ED843A - Orange)
Conseil (Stratégie)   : --accent-*     (#F8B044 - Jaune)
Tech (Technologie)    : --primary-light (#7BC4D4 - Bleu clair)

/* TYPOGRAPHIE */
Titres  : var(--font-display) → League Spartan
Body    : var(--font-body)    → Nunito

/* ESPACEMENT */
var(--space-2)  : 8px
var(--space-4)  : 16px
var(--space-6)  : 24px
var(--space-8)  : 32px
var(--space-10) : 40px
var(--space-12) : 48px
var(--space-16) : 64px
var(--space-20) : 80px
var(--space-24) : 96px
var(--space-32) : 128px

/* BORDER RADIUS */
var(--radius-lg)  : 10px
var(--radius-xl)  : 16px
var(--radius-2xl) : 24px
```

---

## 1. Hero Section

### 📐 Structure

```
<section> Hero Container
  ├── <div> Background Gradient Overlay
  ├── <div> Animated Decorative Blob
  └── <div> Content Container
      ├── <div> Left Column (Content)
      │   ├── <Badge> Section Label
      │   ├── <h1> Hero Title
      │   ├── <p> Hero Description
      │   ├── <div> Quick Features
      │   └── <div> CTA Buttons
      └── <div> Right Column (Visual)
          └── <Image> Hero Image
```

### 🎨 Styles

#### Container Principal

```css
.hero-section {
  position: relative;
  overflow: hidden;
  background: var(--background);
}

.hero-content-wrapper {
  max-width: 1280px;
  margin: 0 auto;
  padding: var(--space-20) var(--space-6);
}
```

#### Background Gradient Overlay

**Variantes par pôle :**

```css
/* Académie (Bleu) */
background: linear-gradient(135deg, rgba(85, 161, 180, 0.03) 0%, rgba(255, 255, 255, 0) 100%);

/* Agence (Orange) */
background: linear-gradient(135deg, rgba(237, 132, 58, 0.03) 0%, rgba(255, 255, 255, 0) 100%);

/* Conseil (Jaune) */
background: linear-gradient(135deg, rgba(248, 176, 68, 0.03) 0%, rgba(255, 255, 255, 0) 100%);

/* Tech (Bleu clair) */
background: linear-gradient(135deg, rgba(123, 196, 212, 0.03) 0%, rgba(255, 255, 255, 0) 100%);
```

#### Decorative Blob Animé

```css
.hero-blob {
  position: absolute;
  top: 5rem;           /* 80px */
  right: 0;
  width: 500px;        /* Desktop */
  height: 500px;
  opacity: 0.2;
  filter: blur(48px);
  pointer-events: none;
  animation: float 20s ease-in-out infinite;
}

/* Variantes couleur blob */
/* Académie */ background: radial-gradient(circle, #96C3CF 0%, transparent 70%);
/* Agence */   background: radial-gradient(circle, #F59A5F 0%, transparent 70%);
/* Conseil */  background: radial-gradient(circle, #FFC15A 0%, transparent 70%);
/* Tech */     background: radial-gradient(circle, #7BC4D4 0%, transparent 70%);

/* Mobile */
@media (max-width: 768px) {
  width: 384px;
  height: 384px;
}
```

#### Hero Badge (Section Label)

```css
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-5);
  margin-bottom: var(--space-8);
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 8px 32px rgba(85, 161, 180, 0.1);
}

/* Variantes bordure */
/* Académie */ border: 1px solid rgba(85, 161, 180, 0.2);
/* Agence */   border: 1px solid rgba(237, 132, 58, 0.2);
/* Conseil */  border: 1px solid rgba(248, 176, 68, 0.2);
/* Tech */     border: 1px solid rgba(123, 196, 212, 0.2);

.hero-badge-icon {
  width: 16px;
  height: 16px;
  color: var(--primary-600); /* Adapter selon le pôle */
}

.hero-badge-text {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--font-weight-bold);
  color: var(--primary-700); /* Adapter selon le pôle */
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
```

#### Hero Title

```css
.hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 4.5rem); /* 40px → 72px responsive */
  line-height: var(--leading-tight);
  font-weight: var(--font-weight-bold);
  color: var(--neutral-900);
  margin-bottom: var(--space-6);
}

.hero-title-gradient {
  background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-400) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

#### Hero Description

```css
.hero-description {
  font-family: var(--font-body);
  font-size: var(--text-xl);
  line-height: var(--leading-relaxed);
  color: var(--neutral-700);
  margin-bottom: var(--space-8);
  max-width: 600px;
}
```

#### Quick Features (Pills)

```css
.quick-features-container {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-6);
  margin-bottom: var(--space-10);
}

.feature-pill {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.feature-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-xl);
}

/* Variantes par pôle */
/* Académie */
background: linear-gradient(135deg, rgba(85, 161, 180, 0.1) 0%, rgba(85, 161, 180, 0.05) 100%);
border: 1px solid rgba(85, 161, 180, 0.2);

/* Agence */
background: linear-gradient(135deg, rgba(237, 132, 58, 0.1) 0%, rgba(237, 132, 58, 0.05) 100%);
border: 1px solid rgba(237, 132, 58, 0.2);

.feature-icon {
  width: 20px;
  height: 20px;
  color: var(--primary-600); /* Adapter selon pôle */
}

.feature-text {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--font-weight-semibold);
  color: var(--neutral-800);
}
```

#### Grid Layout (Split Design)

```css
.hero-grid {
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  gap: var(--space-16);
}

@media (min-width: 1024px) {
  grid-template-columns: 1fr 1fr;
}
```

---

## 2. Benefit Cards

### 📐 Structure

```
<section> Benefits Section
  ├── <div> Header
  │   └── <h2> Section Title
  └── <div> Cards Grid
      └── <div> Card (×6)
          ├── <div> Top Accent Line
          ├── <div> Header Row
          │   ├── <div> Icon Container
          │   │   └── <Icon> Icon
          │   └── <div> Stat Container
          │       ├── <div> Stat Number
          │       └── <div> Stat Label
          ├── <h3> Card Title
          └── <p> Card Description
```

### 🎨 Styles

#### Section Container

```css
.benefits-section {
  padding-top: var(--space-16);
  padding-bottom: var(--space-20);
}

.benefits-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-6);
}

.benefits-header {
  text-align: center;
  margin-bottom: var(--space-12);
}

.benefits-title {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3.5vw, 2.5rem); /* 28px → 40px */
  line-height: var(--leading-tight);
  font-weight: var(--font-weight-bold);
  color: var(--neutral-900);
}
```

#### Cards Grid

```css
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Mobile: 2 cols */
  gap: var(--space-5);
}

@media (min-width: 1024px) {
  grid-template-columns: repeat(3, 1fr); /* Desktop: 3 cols */
}
```

#### Card Container (Glassmorphism)

```css
.benefit-card {
  position: relative;
  overflow: hidden;
  padding: var(--space-6);
  border-radius: var(--radius-xl);
  cursor: pointer;
  
  /* Glassmorphism Effect */
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  
  /* Border & Shadow - État initial */
  border: 1px solid rgba(85, 161, 180, 0.15);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  
  /* Transition fluide */
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover State */
.benefit-card:hover {
  transform: translateY(-4px);
  border-color: rgba(85, 161, 180, 0.3);
  box-shadow: 0 12px 40px rgba(85, 161, 180, 0.12);
}

/* Variantes bordure/shadow par pôle */
/* Académie */
border: 1px solid rgba(85, 161, 180, 0.15);
box-shadow (hover): 0 12px 40px rgba(85, 161, 180, 0.12);

/* Agence */
border: 1px solid rgba(237, 132, 58, 0.15);
box-shadow (hover): 0 12px 40px rgba(237, 132, 58, 0.12);

/* Conseil */
border: 1px solid rgba(248, 176, 68, 0.15);
box-shadow (hover): 0 12px 40px rgba(248, 176, 68, 0.12);

/* Tech */
border: 1px solid rgba(123, 196, 212, 0.15);
box-shadow (hover): 0 12px 40px rgba(123, 196, 212, 0.12);
```

#### Top Accent Line

```css
.card-accent-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  opacity: 0.6;
}

/* Variantes par pôle */
/* Académie */
background: linear-gradient(90deg, #73AFBF 0%, #55A1B4 100%);

/* Agence */
background: linear-gradient(90deg, #F18A4C 0%, #C06920 100%);

/* Conseil */
background: linear-gradient(90deg, #F8B044 0%, #D69020 100%);

/* Tech */
background: linear-gradient(90deg, #7BC4D4 0%, #4A8FA1 100%);
```

#### Header Row (Icon + Stat)

```css
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-4);
}

.card-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
}

/* Variantes par pôle */
/* Académie */
background: linear-gradient(135deg, rgba(85, 161, 180, 0.1) 0%, rgba(85, 161, 180, 0.05) 100%);
border: 1px solid rgba(85, 161, 180, 0.15);

/* Agence */
background: linear-gradient(135deg, rgba(237, 132, 58, 0.1) 0%, rgba(237, 132, 58, 0.05) 100%);
border: 1px solid rgba(237, 132, 58, 0.15);

.card-icon {
  width: 24px;
  height: 24px;
  color: var(--primary-600); /* Adapter selon pôle */
}
```

#### Stat Container

```css
.card-stat-container {
  text-align: right;
}

.card-stat-number {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--font-weight-bold);
  color: var(--primary-600); /* Adapter selon pôle */
  line-height: 1.2;
}

.card-stat-label {
  font-family: var(--font-body);
  font-size: 10px; /* var(--text-2xs) si disponible */
  color: var(--neutral-600);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

#### Card Content

```css
.card-title {
  font-family: var(--font-display);
  font-size: var(--text-base);
  line-height: var(--leading-tight);
  font-weight: var(--font-weight-bold);
  color: var(--neutral-900);
  margin-bottom: var(--space-2);
}

.card-description {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  line-height: var(--leading-relaxed);
  color: var(--neutral-700);
}
```

#### Responsive Adjustments

```css
/* Mobile (< 640px) */
@media (max-width: 640px) {
  .benefit-card {
    padding: var(--space-5);
  }
  
  .card-icon-container {
    width: 40px;
    height: 40px;
  }
  
  .card-icon {
    width: 20px;
    height: 20px;
  }
}
```

---

## 3. Tab System

### 📐 Structure

```
<section> Tab Section
  ├── <div> Section Header
  │   ├── <Badge> Section Badge
  │   ├── <h2> Section Title
  │   └── <p> Section Description
  ├── <div> Tabs Navigation
  │   └── <button> Tab Button (×4)
  └── <div> Tab Content Card
      └── [Contenu dynamique selon tab actif]
```

### 🎨 Styles

#### Tab Navigation Container

```css
.tabs-navigation {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-3);
  margin-bottom: var(--space-12);
}
```

#### Tab Button

```css
.tab-button {
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-xl);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all 0.3s ease;
}

/* État inactif */
.tab-button-inactive {
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid var(--neutral-200);
  color: var(--neutral-700);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* État actif - Variantes par pôle */
.tab-button-active {
  color: white;
  box-shadow: 0 8px 24px rgba(85, 161, 180, 0.3);
}

/* Académie */
background: linear-gradient(135deg, #4A8FA1 0%, #55A1B4 100%);
border: 1px solid #4A8FA1;

/* Agence */
background: linear-gradient(135deg, #C06920 0%, #ED843A 100%);
border: 1px solid #C06920;

/* Conseil */
background: linear-gradient(135deg, #D69020 0%, #F8B044 100%);
border: 1px solid #D69020;

/* Tech */
background: linear-gradient(135deg, #4A8FA1 0%, #7BC4D4 100%);
border: 1px solid #4A8FA1;
```

---

## 4. Content Card

### 📐 Structure

```
<div> Content Card
  ├── <div> Accent Bar (top)
  └── <div> Card Content Padding
      └── <div> Grid Layout
          ├── <div> Left Column
          │   ├── <div> Icon + Badge Row
          │   ├── <h3> Title
          │   ├── <p> Subtitle
          │   ├── <p> Description
          │   ├── <ul> Highlights List
          │   ├── <div> Meta Info (durée, modules)
          │   └── <div> CTA Button
          └── <div> Right Column
              ├── <div> Image Container
              └── <div> Floating Badge
```

### 🎨 Styles

#### Card Container

```css
.content-card {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-2xl);
  
  /* Glassmorphism */
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 100%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  
  /* Border & Shadow - Variantes par pôle */
  border: 1px solid rgba(85, 161, 180, 0.15);
  box-shadow: 0 25px 50px -12px rgba(85, 161, 180, 0.2);
}

/* Académie */
border: 1px solid rgba(85, 161, 180, 0.15);
box-shadow: 0 25px 50px -12px rgba(85, 161, 180, 0.2);

/* Agence */
border: 1px solid rgba(237, 132, 58, 0.15);
box-shadow: 0 25px 50px -12px rgba(237, 132, 58, 0.2);
```

#### Accent Bar

```css
.content-card-accent {
  height: 3px;
}

/* Variantes par pôle */
/* Académie */
background: linear-gradient(90deg, #73AFBF 0%, #55A1B4 50%, #73AFBF 100%);

/* Agence */
background: linear-gradient(90deg, #F18A4C 0%, #C06920 50%, #F18A4C 100%);

/* Conseil */
background: linear-gradient(90deg, #F8B044 0%, #D69020 50%, #F8B044 100%);

/* Tech */
background: linear-gradient(90deg, #7BC4D4 0%, #4A8FA1 50%, #7BC4D4 100%);
```

#### Content Padding

```css
.content-card-padding {
  padding: var(--space-12);
}
```

#### Grid Layout

```css
.content-card-grid {
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  gap: var(--space-12);
}

@media (min-width: 1024px) {
  grid-template-columns: 1fr 1fr;
}
```

#### Icon Container (Large)

```css
.content-icon-large {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: var(--radius-2xl);
}

/* Variantes par pôle */
/* Académie */
background: linear-gradient(135deg, rgba(85, 161, 180, 0.1) 0%, rgba(85, 161, 180, 0.05) 100%);
border: 1px solid rgba(85, 161, 180, 0.2);
box-shadow: 0 8px 24px rgba(85, 161, 180, 0.15);

/* Agence */
background: linear-gradient(135deg, rgba(237, 132, 58, 0.1) 0%, rgba(237, 132, 58, 0.05) 100%);
border: 1px solid rgba(237, 132, 58, 0.2);
box-shadow: 0 8px 24px rgba(237, 132, 58, 0.15);

.content-icon-large svg {
  width: 40px;
  height: 40px;
  color: var(--primary-600); /* Adapter selon pôle */
}
```

#### Content Typography

```css
.content-card-title {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3vw, 2.5rem); /* 28px → 40px */
  line-height: var(--leading-tight);
  font-weight: var(--font-weight-bold);
  color: var(--neutral-900);
  margin-bottom: var(--space-3);
}

.content-card-subtitle {
  font-family: var(--font-body);
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
  color: var(--primary-600); /* Adapter selon pôle */
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--space-6);
}

.content-card-description {
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--neutral-700);
  margin-bottom: var(--space-6);
}
```

#### Highlights List

```css
.highlights-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-bottom: var(--space-8);
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.highlight-checkmark {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  color: var(--primary-600); /* Adapter selon pôle */
}

.highlight-text {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  line-height: var(--leading-normal);
  color: var(--neutral-700);
}
```

#### Floating Badge (Desktop only)

```css
.floating-badge {
  position: absolute;
  bottom: -24px;
  right: -24px;
  padding: var(--space-6);
  border-radius: var(--radius-2xl);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* Variantes par pôle */
/* Académie */
border: 1px solid rgba(85, 161, 180, 0.2);
box-shadow: 0 20px 40px rgba(85, 161, 180, 0.25);

/* Agence */
border: 1px solid rgba(237, 132, 58, 0.2);
box-shadow: 0 20px 40px rgba(237, 132, 58, 0.25);

.floating-badge-number {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--primary-600); /* Adapter selon pôle */
}

.floating-badge-label {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--neutral-600);
}

/* Mobile: caché */
@media (max-width: 768px) {
  .floating-badge {
    display: none;
  }
}
```

---

## 5. Buttons

### 🎨 Styles

#### Primary Button

```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  
  padding: var(--space-4) var(--space-8);
  border-radius: var(--radius-xl);
  
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--font-weight-semibold);
  
  color: white;
  border: none;
  cursor: pointer;
  
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Variantes par pôle */
/* Académie */
background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-500) 100%);
box-shadow: 0 4px 16px rgba(85, 161, 180, 0.3);

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(85, 161, 180, 0.4);
}

/* Agence */
background: linear-gradient(135deg, var(--secondary-600) 0%, var(--secondary-500) 100%);
box-shadow: 0 4px 16px rgba(237, 132, 58, 0.3);

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(237, 132, 58, 0.4);
}

/* Conseil */
background: linear-gradient(135deg, var(--accent-600) 0%, var(--accent-500) 100%);
box-shadow: 0 4px 16px rgba(248, 176, 68, 0.3);

/* Tech */
background: linear-gradient(135deg, var(--primary-hover) 0%, var(--primary-light) 100%);
box-shadow: 0 4px 16px rgba(123, 196, 212, 0.3);
```

#### Secondary Button (Outline)

```css
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  
  padding: var(--space-4) var(--space-8);
  border-radius: var(--radius-xl);
  
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--font-weight-semibold);
  
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Variantes par pôle */
/* Académie */
border: 2px solid var(--primary-500);
color: var(--primary-700);

.btn-secondary:hover {
  background: var(--primary-50);
  border-color: var(--primary-600);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(85, 161, 180, 0.2);
}

/* Agence */
border: 2px solid var(--secondary-500);
color: var(--secondary-700);

.btn-secondary:hover {
  background: var(--secondary-50);
  border-color: var(--secondary-600);
}
```

#### Small Button

```css
.btn-sm {
  padding: var(--space-2) var(--space-5);
  font-size: var(--text-sm);
  border-radius: var(--radius-lg);
}
```

#### Large Button

```css
.btn-lg {
  padding: var(--space-5) var(--space-10);
  font-size: var(--text-lg);
  border-radius: var(--radius-2xl);
}
```

---

## 6. Badges

### 🎨 Styles

#### Section Badge

```css
.badge-section {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-lg);
  
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

/* Variantes par pôle */
/* Académie */
background: linear-gradient(135deg, rgba(85, 161, 180, 0.1) 0%, rgba(85, 161, 180, 0.05) 100%);
border: 1px solid rgba(85, 161, 180, 0.2);
color: var(--primary-700);

/* Agence */
background: linear-gradient(135deg, rgba(237, 132, 58, 0.1) 0%, rgba(237, 132, 58, 0.05) 100%);
border: 1px solid rgba(237, 132, 58, 0.2);
color: var(--secondary-700);

/* Conseil */
background: linear-gradient(135deg, rgba(248, 176, 68, 0.1) 0%, rgba(248, 176, 68, 0.05) 100%);
border: 1px solid rgba(248, 176, 68, 0.2);
color: var(--accent-700);

/* Tech */
background: linear-gradient(135deg, rgba(123, 196, 212, 0.1) 0%, rgba(123, 196, 212, 0.05) 100%);
border: 1px solid rgba(123, 196, 212, 0.2);
color: var(--primary-hover);
```

#### Status Badge

```css
.badge-status {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--font-weight-medium);
}

/* Success */
.badge-success {
  background: var(--success);
  color: var(--success-foreground);
}

/* Warning */
.badge-warning {
  background: var(--warning);
  color: var(--warning-foreground);
}

/* Info */
.badge-info {
  background: var(--info);
  color: var(--info-foreground);
}
```

---

## 7. Navigation

### 📐 Structure

```
<header> Navigation Container
  ├── <div> Logo
  ├── <nav> Desktop Menu
  │   └── <a> Menu Link (×n)
  ├── <div> CTA Button
  └── <button> Mobile Menu Toggle
```

### 🎨 Styles

#### Header Container

```css
.header {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  
  border-bottom: 1px solid var(--border);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.header-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: var(--space-4) var(--space-6);
  
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-8);
}
```

#### Navigation Links

```css
.nav-menu {
  display: none; /* Mobile hidden */
  align-items: center;
  gap: var(--space-6);
}

@media (min-width: 768px) {
  .nav-menu {
    display: flex;
  }
}

.nav-link {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--font-weight-medium);
  color: var(--neutral-700);
  
  text-decoration: none;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: var(--primary-600);
}

.nav-link-active {
  color: var(--primary-600);
  font-weight: var(--font-weight-semibold);
}
```

#### Mobile Menu Toggle

```css
.mobile-menu-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  
  width: 40px;
  height: 40px;
  
  background: transparent;
  border: none;
  cursor: pointer;
  
  color: var(--neutral-700);
}

@media (min-width: 768px) {
  .mobile-menu-toggle {
    display: none;
  }
}
```

---

## 8. Footer

### 📐 Structure

```
<footer> Footer Container
  ├── <div> Footer Top
  │   ├── <div> Column Logo & Description
  │   ├── <div> Column Links
  │   ├── <div> Column Formation
  │   └── <div> Column Contact
  ├── <div> Footer Bottom
  │   ├── <p> Copyright
  │   └── <div> Legal Links
```

### 🎨 Styles

#### Footer Container

```css
.footer {
  background: var(--neutral-900);
  color: white;
  padding-top: var(--space-20);
  padding-bottom: var(--space-8);
}

.footer-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--space-6);
}
```

#### Footer Grid

```css
.footer-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-12);
  margin-bottom: var(--space-16);
}

@media (min-width: 768px) {
  grid-template-columns: repeat(2, 1fr);
}

@media (min-width: 1024px) {
  grid-template-columns: 2fr 1fr 1fr 1fr;
}
```

#### Footer Column

```css
.footer-column-title {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: var(--font-weight-bold);
  color: white;
  margin-bottom: var(--space-6);
}

.footer-links-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.footer-link {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--neutral-300);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: var(--primary-light);
}
```

#### Footer Bottom

```css
.footer-bottom {
  padding-top: var(--space-8);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}

@media (min-width: 768px) {
  flex-direction: row;
  justify-content: space-between;
}

.footer-copyright {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--neutral-400);
}

.footer-legal-links {
  display: flex;
  gap: var(--space-6);
}
```

---

## 9. CTA Section

### 📐 Structure

```
<section> CTA Section
  ├── <div> Background Gradient
  ├── <div> Animated Blobs (×2)
  └── <div> Content Container
      ├── <h2> CTA Title
      ├── <p> CTA Description
      └── <div> CTA Buttons
```

### 🎨 Styles

#### CTA Container

```css
.cta-section {
  position: relative;
  overflow: hidden;
  padding-top: var(--space-32);
  padding-bottom: var(--space-32);
}

.cta-background {
  position: absolute;
  inset: 0;
}

/* Variantes par pôle */
/* Académie */
background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%);

/* Agence */
background: linear-gradient(135deg, var(--secondary-600) 0%, var(--secondary-700) 100%);

/* Conseil */
background: linear-gradient(135deg, var(--accent-600) 0%, var(--accent-700) 100%);

/* Tech */
background: linear-gradient(135deg, var(--primary-hover) 0%, var(--primary-700) 100%);
```

#### Animated Blobs

```css
.cta-blob {
  position: absolute;
  opacity: 0.2;
  filter: blur(48px);
  pointer-events: none;
  background: radial-gradient(circle, white 0%, transparent 70%);
  animation: float 20s ease-in-out infinite;
}

.cta-blob-1 {
  top: 0;
  right: 0;
  width: 600px;
  height: 600px;
}

.cta-blob-2 {
  bottom: 0;
  left: 0;
  width: 500px;
  height: 500px;
  animation-delay: 5s;
}

@media (max-width: 768px) {
  .cta-blob-1,
  .cta-blob-2 {
    width: 400px;
    height: 400px;
  }
}
```

#### CTA Content

```css
.cta-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 0 var(--space-6);
}

.cta-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: var(--leading-tight);
  font-weight: var(--font-weight-bold);
  color: white;
  margin-bottom: var(--space-6);
}

.cta-description {
  font-family: var(--font-body);
  font-size: var(--text-xl);
  line-height: var(--leading-relaxed);
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: var(--space-10);
}

.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-4);
}
```

#### CTA Button White

```css
.btn-cta-white {
  background: white;
  color: var(--primary-700); /* Adapter selon pôle */
  border: 2px solid white;
  
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.btn-cta-white:hover {
  background: rgba(255, 255, 255, 0.95);
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
}
```

---

## 10. Animations

### Float Animation (Blobs)

```css
@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(-30px, -30px) scale(1.1);
  }
}

.animate-float {
  animation: float 20s ease-in-out infinite;
}
```

### Fade In Up

```css
@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}
```

### Fade In

```css
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}
```

### Blob (Orbes flottantes)

```css
@keyframes blob {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.animate-blob {
  animation: blob 7s ease-in-out infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
```

---

## 📊 Mapping Couleurs par Pôle

| Élément | Académie | Agence | Conseil | Tech |
|---------|----------|--------|---------|------|
| **Couleur principale** | `#55A1B4` | `#ED843A` | `#F8B044` | `#7BC4D4` |
| **Variable CSS** | `--primary-600` | `--secondary-600` | `--accent-600` | `--primary-light` |
| **Couleur hover** | `#4A8FA1` | `#C06920` | `#D69020` | `#4A8FA1` |
| **Gradient start** | `#4A8FA1` | `#C06920` | `#D69020` | `#4A8FA1` |
| **Gradient end** | `#55A1B4` | `#ED843A` | `#F8B044` | `#7BC4D4` |
| **Background tint** | `rgba(85, 161, 180, 0.1)` | `rgba(237, 132, 58, 0.1)` | `rgba(248, 176, 68, 0.1)` | `rgba(123, 196, 212, 0.1)` |
| **Border color** | `rgba(85, 161, 180, 0.15)` | `rgba(237, 132, 58, 0.15)` | `rgba(248, 176, 68, 0.15)` | `rgba(123, 196, 212, 0.15)` |
| **Shadow color** | `rgba(85, 161, 180, 0.12)` | `rgba(237, 132, 58, 0.12)` | `rgba(248, 176, 68, 0.12)` | `rgba(123, 196, 212, 0.12)` |

---

## ✨ Principes Glassmorphism

### Recette Standard

```css
.glassmorphism {
  /* 1. Background semi-transparent avec gradient */
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.95) 0%, 
    rgba(255, 255, 255, 0.85) 100%
  );
  
  /* 2. Backdrop blur effect */
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  
  /* 3. Border subtile colorée */
  border: 1px solid rgba(85, 161, 180, 0.15);
  
  /* 4. Shadow douce avec couleur primaire */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  
  /* 5. Border radius généreux */
  border-radius: var(--radius-xl);
}
```

### Variantes d'intensité

**Léger (cards):**
```css
background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%);
backdrop-filter: blur(20px);
```

**Moyen (modals):**
```css
background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%);
backdrop-filter: blur(24px);
```

**Fort (overlays):**
```css
background: linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.6) 100%);
backdrop-filter: blur(30px);
```

---

## 🎯 Checklist d'implémentation

### Pour chaque composant :

- [ ] Utiliser les variables CSS du design system
- [ ] Respecter les espacements (var(--space-*))
- [ ] Utiliser les bonnes font-families (League Spartan / Nunito)
- [ ] Appliquer les border-radius corrects
- [ ] Inclure les états hover/active/focus
- [ ] Adapter les couleurs selon le pôle
- [ ] Vérifier la responsive (mobile/tablet/desktop)
- [ ] Optimiser les transitions (cubic-bezier)
- [ ] Ajouter les animations si nécessaire
- [ ] Tester le contraste d'accessibilité

---

## 📱 Breakpoints Responsive

```css
/* Mobile First */
Base: < 640px

/* Tablet */
@media (min-width: 640px) { ... }

/* Desktop small */
@media (min-width: 768px) { ... }

/* Desktop */
@media (min-width: 1024px) { ... }

/* Desktop large */
@media (min-width: 1280px) { ... }
```

---

## 🔧 Transitions Standard

```css
/* Fast - Micro-interactions */
transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);

/* Base - Hover states */
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

/* Slow - Cards, modals */
transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

/* Slower - Page transitions */
transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
```

---

**Document créé pour The Learning Society Design System**  
*Version 1.0 - Janvier 2026*  
*Compatible avec Figma Make Learning App*
