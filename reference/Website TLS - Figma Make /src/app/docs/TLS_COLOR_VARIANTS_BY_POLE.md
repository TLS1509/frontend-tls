# 🎨 THE LEARNING SOCIETY - VARIANTES COULEURS PAR PÔLE

## Guide de référence des couleurs pour chaque pôle TLS

---

## 📊 Tableau de Conversion Global

| Élément de design | Académie (Bleu) | Agence (Orange) | Conseil (Jaune) | Tech (Bleu clair) |
|-------------------|-----------------|-----------------|-----------------|-------------------|
| **Pôle** | Formation | Conception | Stratégie | Technologie |
| **Couleur primaire** | `#55A1B4` | `#ED843A` | `#F8B044` | `#7BC4D4` |
| **Variable CSS principale** | `--primary-600` | `--secondary-600` | `--accent-600` | `--primary-light` |
| **Couleur hover/dark** | `#4A8FA1` | `#C06920` | `#D69020` | `#4A8FA1` |
| **Variable hover** | `--primary-hover` | `--secondary-hover` | `--accent-hover` | `--primary-hover` |
| **Couleur claire** | `#73AFBF` | `#F18A4C` | `#FFC15A` | `#96C3CF` |
| **Variable claire** | `--primary-400` | `--secondary-400` | `--accent-300` | `--primary-300` |

---

## 1. HERO SECTION - Background & Blobs

### Background Gradient Overlay

```css
/* ACADÉMIE (Bleu) */
background: linear-gradient(135deg, rgba(85, 161, 180, 0.03) 0%, rgba(255, 255, 255, 0) 100%);

/* AGENCE (Orange) */
background: linear-gradient(135deg, rgba(237, 132, 58, 0.03) 0%, rgba(255, 255, 255, 0) 100%);

/* CONSEIL (Jaune) */
background: linear-gradient(135deg, rgba(248, 176, 68, 0.03) 0%, rgba(255, 255, 255, 0) 100%);

/* TECH (Bleu clair) */
background: linear-gradient(135deg, rgba(123, 196, 212, 0.03) 0%, rgba(255, 255, 255, 0) 100%);
```

### Animated Blob (Decorative)

```css
/* ACADÉMIE (Bleu) */
background: radial-gradient(circle, #96C3CF 0%, transparent 70%);
/* ou avec variable CSS : */
background: radial-gradient(circle, var(--primary-300) 0%, transparent 70%);

/* AGENCE (Orange) */
background: radial-gradient(circle, #F59A5F 0%, transparent 70%);
/* ou avec variable CSS : */
background: radial-gradient(circle, var(--secondary-300) 0%, transparent 70%);

/* CONSEIL (Jaune) */
background: radial-gradient(circle, #FFC15A 0%, transparent 70%);
/* ou avec variable CSS : */
background: radial-gradient(circle, var(--accent-300) 0%, transparent 70%);

/* TECH (Bleu clair) */
background: radial-gradient(circle, #7BC4D4 0%, transparent 70%);
/* ou avec variable CSS : */
background: radial-gradient(circle, var(--primary-light) 0%, transparent 70%);
```

---

## 2. BADGES - Section & Status

### Hero Badge (Section Label)

```css
/* ACADÉMIE (Bleu) */
.hero-badge {
  border: 1px solid rgba(85, 161, 180, 0.2);
  box-shadow: 0 8px 32px rgba(85, 161, 180, 0.1);
}
.hero-badge-icon {
  color: var(--primary-600);  /* #55A1B4 */
}
.hero-badge-text {
  color: var(--primary-700);  /* #3D7786 */
}

/* AGENCE (Orange) */
.hero-badge {
  border: 1px solid rgba(237, 132, 58, 0.2);
  box-shadow: 0 8px 32px rgba(237, 132, 58, 0.1);
}
.hero-badge-icon {
  color: var(--secondary-600);  /* #C06920 */
}
.hero-badge-text {
  color: var(--secondary-700);  /* #8F5017 */
}

/* CONSEIL (Jaune) */
.hero-badge {
  border: 1px solid rgba(248, 176, 68, 0.2);
  box-shadow: 0 8px 32px rgba(248, 176, 68, 0.1);
}
.hero-badge-icon {
  color: var(--accent-600);  /* #D69020 */
}
.hero-badge-text {
  color: var(--accent-700);  /* #9B6818 */
}

/* TECH (Bleu clair) */
.hero-badge {
  border: 1px solid rgba(123, 196, 212, 0.2);
  box-shadow: 0 8px 32px rgba(123, 196, 212, 0.1);
}
.hero-badge-icon {
  color: var(--primary-light);  /* #7BC4D4 */
}
.hero-badge-text {
  color: var(--primary-hover);  /* #4A8FA1 */
}
```

### Section Badge (Small)

```css
/* ACADÉMIE (Bleu) */
background: linear-gradient(135deg, rgba(85, 161, 180, 0.1) 0%, rgba(85, 161, 180, 0.05) 100%);
border: 1px solid rgba(85, 161, 180, 0.2);
color: var(--primary-700);

/* AGENCE (Orange) */
background: linear-gradient(135deg, rgba(237, 132, 58, 0.1) 0%, rgba(237, 132, 58, 0.05) 100%);
border: 1px solid rgba(237, 132, 58, 0.2);
color: var(--secondary-700);

/* CONSEIL (Jaune) */
background: linear-gradient(135deg, rgba(248, 176, 68, 0.1) 0%, rgba(248, 176, 68, 0.05) 100%);
border: 1px solid rgba(248, 176, 68, 0.2);
color: var(--accent-700);

/* TECH (Bleu clair) */
background: linear-gradient(135deg, rgba(123, 196, 212, 0.1) 0%, rgba(123, 196, 212, 0.05) 100%);
border: 1px solid rgba(123, 196, 212, 0.2);
color: var(--primary-hover);
```

---

## 3. TITLE GRADIENTS

### Hero Title (mot souligné)

```css
/* ACADÉMIE (Bleu) */
background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-400) 100%);
/* ou en HEX : */
background: linear-gradient(135deg, #55A1B4 0%, #73AFBF 100%);

/* AGENCE (Orange) */
background: linear-gradient(135deg, var(--secondary-600) 0%, var(--secondary-400) 100%);
/* ou en HEX : */
background: linear-gradient(135deg, #C06920 0%, #F18A4C 100%);

/* CONSEIL (Jaune) */
background: linear-gradient(135deg, var(--accent-600) 0%, var(--accent-400) 100%);
/* ou en HEX : */
background: linear-gradient(135deg, #D69020 0%, #F8B044 100%);

/* TECH (Bleu clair) */
background: linear-gradient(135deg, var(--primary-hover) 0%, var(--primary-light) 100%);
/* ou en HEX : */
background: linear-gradient(135deg, #4A8FA1 0%, #7BC4D4 100%);

/* Toujours ajouter : */
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

---

## 4. BUTTONS

### Primary Button

```css
/* ACADÉMIE (Bleu) */
background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-500) 100%);
box-shadow: 0 4px 16px rgba(85, 161, 180, 0.3);
color: white;

/* Hover */
box-shadow: 0 8px 24px rgba(85, 161, 180, 0.4);
transform: translateY(-2px);

/* AGENCE (Orange) */
background: linear-gradient(135deg, var(--secondary-600) 0%, var(--secondary-500) 100%);
box-shadow: 0 4px 16px rgba(237, 132, 58, 0.3);
color: white;

/* Hover */
box-shadow: 0 8px 24px rgba(237, 132, 58, 0.4);

/* CONSEIL (Jaune) */
background: linear-gradient(135deg, var(--accent-600) 0%, var(--accent-500) 100%);
box-shadow: 0 4px 16px rgba(248, 176, 68, 0.3);
color: var(--neutral-900);  /* Texte foncé pour contraste */

/* Hover */
box-shadow: 0 8px 24px rgba(248, 176, 68, 0.4);

/* TECH (Bleu clair) */
background: linear-gradient(135deg, var(--primary-hover) 0%, var(--primary-light) 100%);
box-shadow: 0 4px 16px rgba(123, 196, 212, 0.3);
color: white;

/* Hover */
box-shadow: 0 8px 24px rgba(123, 196, 212, 0.4);
```

### Secondary Button (Outline)

```css
/* ACADÉMIE (Bleu) */
background: rgba(255, 255, 255, 0.9);
border: 2px solid var(--primary-500);
color: var(--primary-700);

/* Hover */
background: var(--primary-50);
border-color: var(--primary-600);
box-shadow: 0 8px 24px rgba(85, 161, 180, 0.2);

/* AGENCE (Orange) */
background: rgba(255, 255, 255, 0.9);
border: 2px solid var(--secondary-500);
color: var(--secondary-700);

/* Hover */
background: var(--secondary-50);
border-color: var(--secondary-600);
box-shadow: 0 8px 24px rgba(237, 132, 58, 0.2);

/* CONSEIL (Jaune) */
background: rgba(255, 255, 255, 0.9);
border: 2px solid var(--accent-500);
color: var(--accent-700);

/* Hover */
background: var(--accent-50);
border-color: var(--accent-600);
box-shadow: 0 8px 24px rgba(248, 176, 68, 0.2);

/* TECH (Bleu clair) */
background: rgba(255, 255, 255, 0.9);
border: 2px solid var(--primary-light);
color: var(--primary-hover);

/* Hover */
background: var(--primary-50);
border-color: var(--primary-600);
box-shadow: 0 8px 24px rgba(123, 196, 212, 0.2);
```

---

## 5. FEATURE PILLS (Quick Features)

### Icon Container

```css
/* ACADÉMIE (Bleu) */
background: linear-gradient(135deg, rgba(85, 161, 180, 0.1) 0%, rgba(85, 161, 180, 0.05) 100%);
border: 1px solid rgba(85, 161, 180, 0.2);
icon-color: var(--primary-600);

/* AGENCE (Orange) */
background: linear-gradient(135deg, rgba(237, 132, 58, 0.1) 0%, rgba(237, 132, 58, 0.05) 100%);
border: 1px solid rgba(237, 132, 58, 0.2);
icon-color: var(--secondary-600);

/* CONSEIL (Jaune) */
background: linear-gradient(135deg, rgba(248, 176, 68, 0.1) 0%, rgba(248, 176, 68, 0.05) 100%);
border: 1px solid rgba(248, 176, 68, 0.2);
icon-color: var(--accent-600);

/* TECH (Bleu clair) */
background: linear-gradient(135deg, rgba(123, 196, 212, 0.1) 0%, rgba(123, 196, 212, 0.05) 100%);
border: 1px solid rgba(123, 196, 212, 0.2);
icon-color: var(--primary-light);
```

---

## 6. BENEFIT CARDS - Glassmorphism

### Card Container

```css
/* BASE (identique pour tous) */
background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);

/* ACADÉMIE (Bleu) */
border: 1px solid rgba(85, 161, 180, 0.15);
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);

/* Hover */
border-color: rgba(85, 161, 180, 0.3);
box-shadow: 0 12px 40px rgba(85, 161, 180, 0.12);

/* AGENCE (Orange) */
border: 1px solid rgba(237, 132, 58, 0.15);
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);

/* Hover */
border-color: rgba(237, 132, 58, 0.3);
box-shadow: 0 12px 40px rgba(237, 132, 58, 0.12);

/* CONSEIL (Jaune) */
border: 1px solid rgba(248, 176, 68, 0.15);
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);

/* Hover */
border-color: rgba(248, 176, 68, 0.3);
box-shadow: 0 12px 40px rgba(248, 176, 68, 0.12);

/* TECH (Bleu clair) */
border: 1px solid rgba(123, 196, 212, 0.15);
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);

/* Hover */
border-color: rgba(123, 196, 212, 0.3);
box-shadow: 0 12px 40px rgba(123, 196, 212, 0.12);
```

### Top Accent Line

```css
/* ACADÉMIE (Bleu) */
background: linear-gradient(90deg, var(--primary-400) 0%, var(--primary-600) 100%);
/* ou en HEX : */
background: linear-gradient(90deg, #73AFBF 0%, #55A1B4 100%);

/* AGENCE (Orange) */
background: linear-gradient(90deg, var(--secondary-400) 0%, var(--secondary-600) 100%);
/* ou en HEX : */
background: linear-gradient(90deg, #F18A4C 0%, #C06920 100%);

/* CONSEIL (Jaune) */
background: linear-gradient(90deg, var(--accent-400) 0%, var(--accent-600) 100%);
/* ou en HEX : */
background: linear-gradient(90deg, #F8B044 0%, #D69020 100%);

/* TECH (Bleu clair) */
background: linear-gradient(90deg, var(--primary-light) 0%, var(--primary-hover) 100%);
/* ou en HEX : */
background: linear-gradient(90deg, #7BC4D4 0%, #4A8FA1 100%);

/* Toujours ajouter : */
opacity: 0.6;
height: 2px;
```

### Icon Container

```css
/* ACADÉMIE (Bleu) */
background: linear-gradient(135deg, rgba(85, 161, 180, 0.1) 0%, rgba(85, 161, 180, 0.05) 100%);
border: 1px solid rgba(85, 161, 180, 0.15);
icon-color: var(--primary-600);

/* AGENCE (Orange) */
background: linear-gradient(135deg, rgba(237, 132, 58, 0.1) 0%, rgba(237, 132, 58, 0.05) 100%);
border: 1px solid rgba(237, 132, 58, 0.15);
icon-color: var(--secondary-600);

/* CONSEIL (Jaune) */
background: linear-gradient(135deg, rgba(248, 176, 68, 0.1) 0%, rgba(248, 176, 68, 0.05) 100%);
border: 1px solid rgba(248, 176, 68, 0.15);
icon-color: var(--accent-600);

/* TECH (Bleu clair) */
background: linear-gradient(135deg, rgba(123, 196, 212, 0.1) 0%, rgba(123, 196, 212, 0.05) 100%);
border: 1px solid rgba(123, 196, 212, 0.15);
icon-color: var(--primary-light);
```

### Stat Number

```css
/* ACADÉMIE (Bleu) */
color: var(--primary-600);  /* #55A1B4 */

/* AGENCE (Orange) */
color: var(--secondary-600);  /* #C06920 */

/* CONSEIL (Jaune) */
color: var(--accent-600);  /* #D69020 */

/* TECH (Bleu clair) */
color: var(--primary-light);  /* #7BC4D4 */
```

---

## 7. TAB SYSTEM

### Tab Button Active

```css
/* ACADÉMIE (Bleu) */
background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-500) 100%);
border: 1px solid var(--primary-600);
color: white;
box-shadow: 0 8px 24px rgba(85, 161, 180, 0.3);

/* AGENCE (Orange) */
background: linear-gradient(135deg, var(--secondary-600) 0%, var(--secondary-500) 100%);
border: 1px solid var(--secondary-600);
color: white;
box-shadow: 0 8px 24px rgba(237, 132, 58, 0.3);

/* CONSEIL (Jaune) */
background: linear-gradient(135deg, var(--accent-600) 0%, var(--accent-500) 100%);
border: 1px solid var(--accent-600);
color: var(--neutral-900);  /* Texte foncé pour contraste */
box-shadow: 0 8px 24px rgba(248, 176, 68, 0.3);

/* TECH (Bleu clair) */
background: linear-gradient(135deg, var(--primary-hover) 0%, var(--primary-light) 100%);
border: 1px solid var(--primary-hover);
color: white;
box-shadow: 0 8px 24px rgba(123, 196, 212, 0.3);
```

### Tab Button Inactive (identique pour tous)

```css
background: rgba(255, 255, 255, 0.8);
border: 1px solid var(--neutral-200);
color: var(--neutral-700);
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
```

---

## 8. CONTENT CARD (Large)

### Card Container

```css
/* BASE (identique) */
background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 100%);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);

/* ACADÉMIE (Bleu) */
border: 1px solid rgba(85, 161, 180, 0.15);
box-shadow: 0 25px 50px -12px rgba(85, 161, 180, 0.2);

/* AGENCE (Orange) */
border: 1px solid rgba(237, 132, 58, 0.15);
box-shadow: 0 25px 50px -12px rgba(237, 132, 58, 0.2);

/* CONSEIL (Jaune) */
border: 1px solid rgba(248, 176, 68, 0.15);
box-shadow: 0 25px 50px -12px rgba(248, 176, 68, 0.2);

/* TECH (Bleu clair) */
border: 1px solid rgba(123, 196, 212, 0.15);
box-shadow: 0 25px 50px -12px rgba(123, 196, 212, 0.2);
```

### Accent Bar (top 3px)

```css
/* ACADÉMIE (Bleu) */
background: linear-gradient(90deg, var(--primary-400) 0%, var(--primary-600) 50%, var(--primary-400) 100%);

/* AGENCE (Orange) */
background: linear-gradient(90deg, var(--secondary-400) 0%, var(--secondary-600) 50%, var(--secondary-400) 100%);

/* CONSEIL (Jaune) */
background: linear-gradient(90deg, var(--accent-400) 0%, var(--accent-600) 50%, var(--accent-400) 100%);

/* TECH (Bleu clair) */
background: linear-gradient(90deg, var(--primary-light) 0%, var(--primary-hover) 50%, var(--primary-light) 100%);
```

### Large Icon Container

```css
/* ACADÉMIE (Bleu) */
background: linear-gradient(135deg, rgba(85, 161, 180, 0.1) 0%, rgba(85, 161, 180, 0.05) 100%);
border: 1px solid rgba(85, 161, 180, 0.2);
box-shadow: 0 8px 24px rgba(85, 161, 180, 0.15);
icon-color: var(--primary-600);

/* AGENCE (Orange) */
background: linear-gradient(135deg, rgba(237, 132, 58, 0.1) 0%, rgba(237, 132, 58, 0.05) 100%);
border: 1px solid rgba(237, 132, 58, 0.2);
box-shadow: 0 8px 24px rgba(237, 132, 58, 0.15);
icon-color: var(--secondary-600);

/* CONSEIL (Jaune) */
background: linear-gradient(135deg, rgba(248, 176, 68, 0.1) 0%, rgba(248, 176, 68, 0.05) 100%);
border: 1px solid rgba(248, 176, 68, 0.2);
box-shadow: 0 8px 24px rgba(248, 176, 68, 0.15);
icon-color: var(--accent-600);

/* TECH (Bleu clair) */
background: linear-gradient(135deg, rgba(123, 196, 212, 0.1) 0%, rgba(123, 196, 212, 0.05) 100%);
border: 1px solid rgba(123, 196, 212, 0.2);
box-shadow: 0 8px 24px rgba(123, 196, 212, 0.15);
icon-color: var(--primary-light);
```

### Subtitle (colored)

```css
/* ACADÉMIE (Bleu) */
color: var(--primary-600);

/* AGENCE (Orange) */
color: var(--secondary-600);

/* CONSEIL (Jaune) */
color: var(--accent-600);

/* TECH (Bleu clair) */
color: var(--primary-light);
```

### Floating Badge

```css
/* ACADÉMIE (Bleu) */
border: 1px solid rgba(85, 161, 180, 0.2);
box-shadow: 0 20px 40px rgba(85, 161, 180, 0.25);
number-color: var(--primary-600);

/* AGENCE (Orange) */
border: 1px solid rgba(237, 132, 58, 0.2);
box-shadow: 0 20px 40px rgba(237, 132, 58, 0.25);
number-color: var(--secondary-600);

/* CONSEIL (Jaune) */
border: 1px solid rgba(248, 176, 68, 0.2);
box-shadow: 0 20px 40px rgba(248, 176, 68, 0.25);
number-color: var(--accent-600);

/* TECH (Bleu clair) */
border: 1px solid rgba(123, 196, 212, 0.2);
box-shadow: 0 20px 40px rgba(123, 196, 212, 0.25);
number-color: var(--primary-light);
```

---

## 9. CTA SECTION

### Background Gradient

```css
/* ACADÉMIE (Bleu) */
background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%);

/* AGENCE (Orange) */
background: linear-gradient(135deg, var(--secondary-600) 0%, var(--secondary-700) 100%);

/* CONSEIL (Jaune) */
background: linear-gradient(135deg, var(--accent-600) 0%, var(--accent-700) 100%);

/* TECH (Bleu clair) */
background: linear-gradient(135deg, var(--primary-hover) 0%, var(--primary-700) 100%);
```

### White CTA Button

```css
/* BASE (identique pour tous) */
background: white;
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);

/* ACADÉMIE (Bleu) */
color: var(--primary-700);

/* AGENCE (Orange) */
color: var(--secondary-700);

/* CONSEIL (Jaune) */
color: var(--accent-700);

/* TECH (Bleu clair) */
color: var(--primary-hover);

/* Hover (identique) */
background: rgba(255, 255, 255, 0.95);
box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
transform: translateY(-2px);
```

---

## 10. NAVIGATION LINKS

### Active Link

```css
/* ACADÉMIE (Bleu) */
color: var(--primary-600);

/* AGENCE (Orange) */
color: var(--secondary-600);

/* CONSEIL (Jaune) */
color: var(--accent-600);

/* TECH (Bleu clair) */
color: var(--primary-light);
```

### Hover Link (même que active)

```css
/* Suit les mêmes couleurs que les liens actifs ci-dessus */
```

---

## 📋 CHEATSHEET RAPIDE - Variables CSS

### Copier-Coller pour Figma Variables

```javascript
// ACADÉMIE (Formation - Bleu)
const academie = {
  primary: '#55A1B4',
  primaryHover: '#4A8FA1',
  primaryLight: '#73AFBF',
  gradient: 'linear-gradient(135deg, #4A8FA1 0%, #55A1B4 100%)',
  blob: '#96C3CF',
  overlay: 'rgba(85, 161, 180, 0.03)',
  border: 'rgba(85, 161, 180, 0.15)',
  borderHover: 'rgba(85, 161, 180, 0.3)',
  shadow: 'rgba(85, 161, 180, 0.12)',
  bgTint: 'rgba(85, 161, 180, 0.1)'
};

// AGENCE (Conception - Orange)
const agence = {
  primary: '#ED843A',
  primaryHover: '#C06920',
  primaryLight: '#F18A4C',
  gradient: 'linear-gradient(135deg, #C06920 0%, #ED843A 100%)',
  blob: '#F59A5F',
  overlay: 'rgba(237, 132, 58, 0.03)',
  border: 'rgba(237, 132, 58, 0.15)',
  borderHover: 'rgba(237, 132, 58, 0.3)',
  shadow: 'rgba(237, 132, 58, 0.12)',
  bgTint: 'rgba(237, 132, 58, 0.1)'
};

// CONSEIL (Stratégie - Jaune)
const conseil = {
  primary: '#F8B044',
  primaryHover: '#D69020',
  primaryLight: '#FFC977',
  gradient: 'linear-gradient(135deg, #D69020 0%, #F8B044 100%)',
  blob: '#FFC15A',
  overlay: 'rgba(248, 176, 68, 0.03)',
  border: 'rgba(248, 176, 68, 0.15)',
  borderHover: 'rgba(248, 176, 68, 0.3)',
  shadow: 'rgba(248, 176, 68, 0.12)',
  bgTint: 'rgba(248, 176, 68, 0.1)'
};

// TECH (Technologie - Bleu clair)
const tech = {
  primary: '#7BC4D4',
  primaryHover: '#4A8FA1',
  primaryLight: '#96C3CF',
  gradient: 'linear-gradient(135deg, #4A8FA1 0%, #7BC4D4 100%)',
  blob: '#7BC4D4',
  overlay: 'rgba(123, 196, 212, 0.03)',
  border: 'rgba(123, 196, 212, 0.15)',
  borderHover: 'rgba(123, 196, 212, 0.3)',
  shadow: 'rgba(123, 196, 212, 0.12)',
  bgTint: 'rgba(123, 196, 212, 0.1)'
};
```

---

## 🎯 RÈGLES D'UTILISATION

### Cohérence des couleurs

1. **Hero section** : Utiliser le blob de la couleur `--*-300` (version claire)
2. **Badges & Pills** : Utiliser background avec opacity 0.1 → 0.05
3. **Borders** : Toujours utiliser opacity 0.15 (normal) et 0.3 (hover)
4. **Shadows** : Utiliser opacity 0.12 pour les shadows hover colorées
5. **Text colors** : Utiliser `--*-600` pour les icônes, `--*-700` pour le texte
6. **Gradients** : Toujours `--*-600` → `--*-500` ou `--*-400`

### Contraste & Accessibilité

- ✅ **Bleu (Académie)** : Texte blanc sur background bleu
- ✅ **Orange (Agence)** : Texte blanc sur background orange
- ⚠️ **Jaune (Conseil)** : Texte FONCÉ sur background jaune (contraste!)
- ✅ **Bleu clair (Tech)** : Texte blanc sur background bleu clair

---

**Document créé pour The Learning Society**  
*Color Variants Reference Guide*  
*Version 1.0 - Janvier 2026*
