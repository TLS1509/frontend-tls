# 🎨 TLS Design System - Usage Guide

**Convention Canonique TLS V2 Final**  
**Date:** 22/02/2026

---

## ✅ RÈGLES ABSOLUES

### 1. Variables CSS Obligatoires

**❌ NE JAMAIS faire :**
```css
/* ✗ Valeurs hardcodées interdites */
background: #55A1B4;
color: #ED843A;
padding: 24px;
border-radius: 8px;
font-family: 'Arial';
```

**✅ TOUJOURS faire :**
```css
/* ✓ Variables CSS uniquement */
background: var(--color-primary-500);
color: var(--color-secondary-500);
padding: var(--space-6);
border-radius: var(--radius-lg);
font-family: var(--font-body);
```

---

### 2. Typographie - Font Faces Définies Uniquement

**Font Faces Disponibles :**
```css
--font-display: 'League Spartan', sans-serif;  /* Headings */
--font-body: 'Nunito', sans-serif;             /* Body text */
```

**❌ NE JAMAIS utiliser :**
- Arial, Helvetica, Times New Roman
- Google Fonts non autorisées (Roboto, Open Sans, etc.)
- System fonts génériques (sans vérification)

**✅ TOUJOURS utiliser :**
```css
/* Headings */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);  /* League Spartan */
}

/* Body text */
p, span, div, button {
  font-family: var(--font-body);     /* Nunito */
}
```

---

## 🎨 PALETTE CANONIQUE TLS - 6 FAMILLES

### **3 Brand Colors**

```css
/* PRIMARY - Bleu #55A1B4 */
--color-primary-500: #55A1B4;

/* SECONDARY - Orange #ED843A */
--color-secondary-500: #ED843A;

/* ACCENT - Jaune #F8B044 */
--color-accent-400: #F8B044;
```

### **1 Neutral**

```css
/* NEUTRAL - Grays */
--color-neutral-50 to --color-neutral-900
```

### **2 Semantic**

```css
/* SUCCESS - Teal TLS #2E8F98 */
--color-success-500: #2E8F98;

/* ERROR - Rouge #EF4444 */
--color-error-500: #EF4444;
```

---

## 🚫 PAS DE DOUBLONS - Aliases Uniquement

**❌ N'existent PAS :**
```css
--color-warning-*  /* N'existe pas - utiliser --warning (alias) */
--color-info-*     /* N'existe pas - utiliser --info (alias) */
--color-teal-*     /* N'existe pas - utiliser --color-success-* */
--color-coral-*    /* N'existe pas - non dans TLS */
```

**✅ Aliases Sémantiques :**
```css
--warning: var(--color-accent-400);      /* Alias → Jaune */
--info: var(--color-primary-600);        /* Alias → Bleu foncé */
--destructive: var(--color-error-600);   /* Alias → Rouge foncé */
```

---

## 📐 SPACING - Variables Uniquement

```css
/* Spacing scale */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

**Usage :**
```css
padding: var(--space-4);              /* 16px */
margin: var(--space-6) var(--space-8); /* 24px 32px */
gap: var(--space-3);                  /* 12px */
```

---

## 🔲 BORDER RADIUS - Variables Uniquement

```css
--radius-sm: 0.375rem;   /* 6px */
--radius-md: 0.5rem;     /* 8px */
--radius-lg: 0.75rem;    /* 12px */
--radius-xl: 1rem;       /* 16px */
--radius-2xl: 1.5rem;    /* 24px */
--radius-full: 9999px;   /* Cercle parfait */
```

**Usage :**
```css
border-radius: var(--radius-lg);     /* 12px */
border-radius: var(--radius-full);   /* Cercle */
```

---

## 📝 TYPOGRAPHY - Variables Uniquement

### Font Sizes

```css
--text-xs: 0.75rem;     /* 12px */
--text-sm: 0.875rem;    /* 14px */
--text-base: 1rem;      /* 16px */
--text-lg: 1.125rem;    /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;     /* 24px */
--text-3xl: 1.875rem;   /* 30px */
--text-4xl: 2.25rem;    /* 36px */
--text-5xl: 3rem;       /* 48px */
```

### Font Weights

```css
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Usage Complet

```css
/* Heading */
h1 {
  font-family: var(--font-display);
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  line-height: 1.2;
}

/* Body text */
p {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  line-height: 1.6;
}
```

---

## ♿ WCAG ACCESSIBILITY - Tokens Recommandés

### ✅ Texte Blanc (AA Normal)

```css
/* SUCCESS SOLID - Recommandé */
background: var(--success-solid);          /* success-600 */
color: var(--success-solid-foreground);    /* #ffffff */

/* PRIMARY - Utiliser nuances foncées */
background: var(--color-primary-800);      /* AA Normal */
color: #ffffff;

/* SECONDARY - Utiliser nuances foncées */
background: var(--color-secondary-700);    /* AA Normal */
color: #ffffff;

/* ERROR - Utiliser nuances foncées */
background: var(--color-error-700);        /* AA Normal */
color: #ffffff;

/* NEUTRAL - Excellents ratios */
background: var(--color-neutral-800);      /* AAA */
color: #ffffff;
```

### ❌ ACCENT (Jaune) - JAMAIS de Texte Blanc

```css
/* ✗ INTERDIT - Ratio 1.74:1 NON CONFORME */
background: var(--color-accent-400);
color: #ffffff;

/* ✓ TOUJOURS utiliser texte foncé */
background: var(--color-accent-400);
color: var(--color-neutral-900);  /* Ratio 8.3:1 AAA */
```

### ✅ Backgrounds Clairs (AAA)

```css
/* Alerts, cards */
background: var(--color-success-50);
color: var(--color-success-700);    /* AAA */

background: var(--color-error-50);
color: var(--color-error-700);      /* AAA */

background: var(--color-primary-50);
color: var(--color-primary-800);    /* AAA */
```

---

## 🎨 GRADIENTS - Variables Prédéfinies

### Brand Gradients

```css
/* Primary */
background: var(--gradient-primary);
background: var(--gradient-primary-soft);

/* Secondary */
background: var(--gradient-secondary);

/* TLS Multi-couleurs */
background: var(--gradient-tls);
background: var(--gradient-tls-glass);
```

### Semantic Gradients

```css
/* Success */
background: var(--gradient-success);

/* Error */
background: var(--gradient-error);

/* Warning */
background: var(--gradient-warning);
```

---

## 🧩 COMPOSANTS - Exemples Conformes

### Button

```css
.button-primary {
  /* ✓ Utilise variables */
  padding: var(--space-3) var(--space-6);
  background: var(--color-primary-800);
  color: #ffffff;
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  border-radius: var(--radius-lg);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.button-primary:hover {
  background: var(--color-primary-700);
  transform: translateY(-1px);
}
```

### Card

```css
.card {
  /* ✓ Utilise variables */
  padding: var(--space-6);
  background: var(--card);
  color: var(--card-foreground);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

### Badge Success

```css
.badge-success {
  /* ✓ WCAG AA compliant */
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: var(--success-solid);
  color: var(--success-solid-foreground);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  border-radius: var(--radius-full);
}
```

### Alert Warning (Jaune)

```css
.alert-warning {
  /* ✓ Texte foncé sur jaune */
  padding: var(--space-4);
  background: var(--color-accent-50);
  color: var(--color-accent-800);
  border-left: 4px solid var(--warning);
  border-radius: var(--radius-lg);
  font-family: var(--font-body);
  font-size: var(--text-base);
}
```

---

## ✅ CHECKLIST GÉNÉRATION UI

Avant de générer un composant, vérifier :

- [ ] **Aucune couleur hardcodée** (pas de #hex direct)
- [ ] **Variables CSS pour couleurs** (--color-*, --primary, --success, etc.)
- [ ] **Variables CSS pour spacing** (--space-*)
- [ ] **Variables CSS pour radius** (--radius-*)
- [ ] **Variables CSS pour typography** (--text-*, --font-display, --font-body)
- [ ] **Font faces uniquement TLS** (League Spartan / Nunito)
- [ ] **WCAG vérifié** (jaune = texte foncé, autres = nuances appropriées)
- [ ] **Pas de doublons** (warning/info sont des aliases, pas de palettes)
- [ ] **Transitions/hover states** cohérents
- [ ] **Responsive** (si pertinent)

---

## 🚀 QUICK REFERENCE

### Couleurs Fréquentes

```css
/* Boutons primaires */
background: var(--color-primary-800);

/* Boutons secondaires */
background: var(--color-secondary-700);

/* Success badges/buttons */
background: var(--success-solid);

/* Warning badges/alerts (TEXTE FONCÉ) */
background: var(--color-accent-400);
color: var(--color-neutral-900);

/* Error buttons */
background: var(--color-error-700);

/* Cards */
background: var(--card);
color: var(--card-foreground);
border: 1px solid var(--border);

/* Text primaire */
color: var(--foreground);

/* Text secondaire */
color: var(--muted-foreground);
```

### Spacing Fréquents

```css
/* Petits éléments (badges, chips) */
padding: var(--space-2) var(--space-4);

/* Boutons */
padding: var(--space-3) var(--space-6);

/* Cards */
padding: var(--space-6);

/* Sections */
padding: var(--space-8);

/* Gap entre éléments */
gap: var(--space-4);
```

### Radius Fréquents

```css
/* Badges */
border-radius: var(--radius-full);

/* Boutons */
border-radius: var(--radius-lg);

/* Cards */
border-radius: var(--radius-xl);

/* Inputs */
border-radius: var(--radius-md);
```

---

## 📖 DOCUMENTATION COMPLÈTE

### Couleurs & WCAG
- **[WCAG-ACCESSIBILITY-AUDIT.md](/WCAG-ACCESSIBILITY-AUDIT.md)** - Audit complet
- **[WCAG-QUICK-ANSWER.md](/WCAG-QUICK-ANSWER.md)** - Réponse rapide
- **[SUCCESS-CONVENTION-FINAL.md](/SUCCESS-CONVENTION-FINAL.md)** - Convention success

### CSS & Tokens
- **[COLOR-TOKENS-README.md](/COLOR-TOKENS-README.md)** - README principal
- **[COLOR-TOKENS-INDEX.md](/COLOR-TOKENS-INDEX.md)** - Index navigation
- **[CSS-SNIPPETS-READY.md](/CSS-SNIPPETS-READY.md)** - Snippets prêts

### Résumés
- **[QUICK-SUMMARY.md](/QUICK-SUMMARY.md)** - Résumé 1 page
- **[30-SECONDS-SUMMARY.md](/30-SECONDS-SUMMARY.md)** - 30 secondes

---

## 🎉 RÈGLES D'OR TLS

1. **Variables CSS UNIQUEMENT** - Pas de valeurs hardcodées
2. **Font faces TLS UNIQUEMENT** - League Spartan + Nunito
3. **WCAG AA minimum** - Vérifier contrastes
4. **Jaune = Texte foncé TOUJOURS** - Ratio insuffisant pour blanc
5. **Pas de doublons** - Warning/Info sont des aliases
6. **6 familles canoniques** - 3 brand + neutral + success + error
7. **Approche additive** - globals-v2.css APRÈS globals.css

---

**Design System TLS - Respect Strict Requis ! 🎨**

_Usage Guide | 22/02/2026_
