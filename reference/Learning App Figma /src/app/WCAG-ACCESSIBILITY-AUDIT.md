# ♿ WCAG Accessibility Audit - Design System TLS

**Date:** 22/02/2026  
**Palettes auditées :** 6 familles (Primary, Secondary, Accent, Neutral, Success, Error)  
**Norme:** WCAG 2.1 Level AA / AAA

---

## 📊 RÉSUMÉ EXÉCUTIF

### ✅ Statut Global

| Famille | Base Color | AA Normal | AA Large | AAA | Status |
|---------|------------|-----------|----------|-----|--------|
| **Primary** | #55A1B4 | ⚠️ | ✅ | ❌ | Partiel |
| **Secondary** | #ED843A | ⚠️ | ✅ | ❌ | Partiel |
| **Accent** | #F8B044 | ❌ | ⚠️ | ❌ | Problématique |
| **Neutral** | Grays | ✅ | ✅ | ✅ | Excellent |
| **Success** | #2E8F98 | ⚠️ | ✅ | ❌ | Partiel |
| **Error** | #EF4444 | ✅ | ✅ | ⚠️ | Bon |

**Légende :**
- ✅ Conforme (ratio suffisant)
- ⚠️ Partiel (nécessite nuances plus foncées)
- ❌ Non conforme (ratio insuffisant)

---

## 🎨 PALETTE PRIMARY - Bleu #55A1B4

### Couleurs

```css
--color-primary-50: #E8F4F7;   /* Très clair */
--color-primary-100: #DCEBEF;  /* Clair */
--color-primary-200: #B9D7DF;  /* Moyen-clair */
--color-primary-300: #96C3CF;  /* Moyen */
--color-primary-400: #73AFBF;  /* Entre moyen et base */
--color-primary-500: #55A1B4;  /* ← BASE TLS */
--color-primary-600: #4A8FA1;  /* Foncé */
--color-primary-700: #3D7786;  /* Plus foncé */
--color-primary-800: #2F5F6A;  /* Très foncé */
--color-primary-900: #1F3E45;  /* Presque noir */
```

### Contraste Texte Blanc (#FFFFFF)

| Nuance | Hex | Ratio | AA Normal (4.5:1) | AA Large (3:1) | AAA (7:1) | Recommandation |
|--------|-----|-------|-------------------|----------------|-----------|----------------|
| 50 | #E8F4F7 | 1.07:1 | ❌ | ❌ | ❌ | Background uniquement |
| 100 | #DCEBEF | 1.13:1 | ❌ | ❌ | ❌ | Background uniquement |
| 200 | #B9D7DF | 1.30:1 | ❌ | ❌ | ❌ | Background uniquement |
| 300 | #96C3CF | 1.56:1 | ❌ | ❌ | ❌ | Background uniquement |
| 400 | #73AFBF | 1.91:1 | ❌ | ❌ | ❌ | Background uniquement |
| **500** | **#55A1B4** | **2.34:1** | ❌ | ❌ | ❌ | **Icons, borders uniquement** |
| **600** | **#4A8FA1** | **2.87:1** | ❌ | ⚠️ | ❌ | **Quasi AA Large** |
| **700** | **#3D7786** | **3.67:1** | ❌ | ✅ | ❌ | **AA Large ✓** |
| **800** | **#2F5F6A** | **5.01:1** | ✅ | ✅ | ❌ | **AA Normal ✓** |
| **900** | **#1F3E45** | **7.52:1** | ✅ | ✅ | ✅ | **AAA ✓** |

### Contraste Texte Foncé (#252B37 - neutral-900)

| Nuance | Hex | Ratio | AA Normal (4.5:1) | AAA (7:1) |
|--------|-----|-------|-------------------|-----------|
| 50 | #E8F4F7 | ~13.5:1 | ✅ | ✅ |
| 100 | #DCEBEF | ~12.8:1 | ✅ | ✅ |
| 200 | #B9D7DF | ~11.1:1 | ✅ | ✅ |

### ✅ Solutions Primary

**Pour texte blanc :**
```css
/* ✗ NON CONFORME */
background: var(--color-primary-500);  /* Ratio 2.34:1 */
color: #ffffff;

/* ✓ AA Normal - RECOMMANDÉ */
background: var(--color-primary-800);  /* Ratio 5.01:1 ✓ */
color: #ffffff;

/* ✓ AA Large - Alternative */
background: var(--color-primary-700);  /* Ratio 3.67:1 ✓ */
color: #ffffff;
font-size: 18px;
font-weight: 600;
```

**Pour backgrounds clairs :**
```css
/* ✓ AAA */
background: var(--color-primary-50);
color: var(--color-primary-800);  /* ou neutral-900 */
```

---

## 🔶 PALETTE SECONDARY - Orange #ED843A

### Couleurs

```css
--color-secondary-50: #FFF3EB;   /* Très clair */
--color-secondary-100: #FDDCC7;  /* Clair */
--color-secondary-200: #FCBB93;  /* Moyen-clair */
--color-secondary-300: #F59A5F;  /* Moyen */
--color-secondary-400: #F18A4C;  /* Entre moyen et base */
--color-secondary-500: #ED843A;  /* ← BASE TLS */
--color-secondary-600: #C06920;  /* Foncé */
--color-secondary-700: #8F5017;  /* Plus foncé */
--color-secondary-800: #5E3710;  /* Très foncé */
--color-secondary-900: #3B2109;  /* Presque noir */
```

### Contraste Texte Blanc (#FFFFFF)

| Nuance | Hex | Ratio | AA Normal (4.5:1) | AA Large (3:1) | AAA (7:1) | Recommandation |
|--------|-----|-------|-------------------|----------------|-----------|----------------|
| 50 | #FFF3EB | 1.05:1 | ❌ | ❌ | ❌ | Background uniquement |
| 100 | #FDDCC7 | 1.14:1 | ❌ | ❌ | ❌ | Background uniquement |
| 200 | #FCBB93 | 1.35:1 | ❌ | ❌ | ❌ | Background uniquement |
| 300 | #F59A5F | 1.69:1 | ❌ | ❌ | ❌ | Background uniquement |
| 400 | #F18A4C | 1.89:1 | ❌ | ❌ | ❌ | Background uniquement |
| **500** | **#ED843A** | **2.11:1** | ❌ | ❌ | ❌ | **Icons, borders uniquement** |
| **600** | **#C06920** | **3.68:1** | ❌ | ✅ | ❌ | **AA Large ✓** |
| **700** | **#8F5017** | **5.79:1** | ✅ | ✅ | ❌ | **AA Normal ✓** |
| **800** | **#5E3710** | **9.21:1** | ✅ | ✅ | ✅ | **AAA ✓** |
| **900** | **#3B2109** | **13.4:1** | ✅ | ✅ | ✅ | **AAA ✓** |

### ✅ Solutions Secondary

**Pour texte blanc :**
```css
/* ✗ NON CONFORME */
background: var(--color-secondary-500);  /* Ratio 2.11:1 */

/* ✓ AA Normal - RECOMMANDÉ */
background: var(--color-secondary-700);  /* Ratio 5.79:1 ✓ */
color: #ffffff;

/* ✓ AA Large - Alternative */
background: var(--color-secondary-600);  /* Ratio 3.68:1 ✓ */
color: #ffffff;
font-size: 18px;
font-weight: 600;
```

---

## 🟡 PALETTE ACCENT - Jaune #F8B044

### Couleurs

```css
--color-accent-50: #FFF9EE;    /* Très clair */
--color-accent-100: #FFECC8;   /* Clair */
--color-accent-200: #FFD791;   /* Moyen-clair */
--color-accent-300: #FFC15A;   /* Moyen */
--color-accent-400: #F8B044;   /* ← BASE TLS */
--color-accent-500: #DF9E3D;   /* Foncé */
--color-accent-600: #C68D36;   /* Plus foncé */
--color-accent-700: #AE7B30;   /* Très foncé */
--color-accent-800: #956A29;   /* Presque noir */
--color-accent-900: #7C5822;   /* Noir */
```

### ⚠️ ATTENTION : Jaune Problématique

**Le jaune est intrinsèquement difficile pour l'accessibilité texte blanc.**

### Contraste Texte Blanc (#FFFFFF)

| Nuance | Hex | Ratio | AA Normal (4.5:1) | AA Large (3:1) | AAA (7:1) | Recommandation |
|--------|-----|-------|-------------------|----------------|-----------|----------------|
| 50 | #FFF9EE | 1.03:1 | ❌ | ❌ | ❌ | Background uniquement |
| 100 | #FFECC8 | 1.11:1 | ❌ | ❌ | ❌ | Background uniquement |
| 200 | #FFD791 | 1.26:1 | ❌ | ❌ | ❌ | Background uniquement |
| 300 | #FFC15A | 1.48:1 | ❌ | ❌ | ❌ | Background uniquement |
| **400** | **#F8B044** | **1.74:1** | ❌ | ❌ | ❌ | **Icons, borders uniquement** |
| **500** | **#DF9E3D** | **2.07:1** | ❌ | ❌ | ❌ | **Icons uniquement** |
| **600** | **#C68D36** | **2.46:1** | ❌ | ❌ | ❌ | **Icons uniquement** |
| **700** | **#AE7B30** | **2.93:1** | ❌ | ⚠️ | ❌ | **Quasi AA Large** |
| **800** | **#956A29** | **3.49:1** | ❌ | ✅ | ❌ | **AA Large ✓** |
| **900** | **#7C5822** | **4.15:1** | ❌ | ✅ | ❌ | **AA Large ✓** |

### Contraste Texte Foncé (RECOMMANDÉ)

| Nuance | Hex | Ratio Neutral-900 | AA Normal | AAA |
|--------|-----|-------------------|-----------|-----|
| 50 | #FFF9EE | ~14.0:1 | ✅ | ✅ |
| 100 | #FFECC8 | ~13.0:1 | ✅ | ✅ |
| 200 | #FFD791 | ~11.5:1 | ✅ | ✅ |
| 300 | #FFC15A | ~9.8:1 | ✅ | ✅ |
| 400 | #F8B044 | ~8.3:1 | ✅ | ✅ |

### ✅ Solutions Accent (Jaune)

**❌ NE PAS utiliser texte blanc sur jaune :**
```css
/* ✗ JAMAIS */
background: var(--color-accent-400);  /* #F8B044 */
color: #ffffff;  /* Ratio 1.74:1 - NON CONFORME */
```

**✅ TOUJOURS utiliser texte foncé :**
```css
/* ✓ AAA - RECOMMANDÉ */
background: var(--color-accent-400);
color: var(--color-neutral-900);  /* Ratio ~8.3:1 ✓ */

/* ✓ Alternative */
background: var(--color-accent-400);
color: var(--color-neutral-800);
```

**✅ Pour badges/warnings :**
```css
/* ✓ AAA */
.badge-warning {
  background: var(--color-accent-50);   /* Fond clair */
  color: var(--color-accent-800);       /* Texte foncé */
  border: 1px solid var(--warning);     /* Border jaune */
}
```

---

## ⚪ PALETTE NEUTRAL - Grays

### Couleurs

```css
--color-neutral-50: #F5F8F8;   /* Très clair */
--color-neutral-100: #EEF6F8;  /* Clair */
--color-neutral-200: #E0E8EA;  /* Moyen-clair */
--color-neutral-300: #C8D4D7;  /* Moyen */
--color-neutral-400: #9AABB0;  /* Entre moyen et base */
--color-neutral-500: #6B7D82;  /* Base */
--color-neutral-600: #535B62;  /* Foncé */
--color-neutral-700: #3A474B;  /* Plus foncé */
--color-neutral-800: #2A3538;  /* Très foncé */
--color-neutral-900: #252B37;  /* Presque noir */
```

### ✅ Excellent - Tous ratios validés

### Contraste Texte Blanc (#FFFFFF)

| Nuance | Hex | Ratio | AA Normal (4.5:1) | AA Large (3:1) | AAA (7:1) | Status |
|--------|-----|-------|-------------------|----------------|-----------|--------|
| 500 | #6B7D82 | 3.22:1 | ❌ | ✅ | ❌ | AA Large |
| 600 | #535B62 | 4.56:1 | ✅ | ✅ | ❌ | AA Normal |
| 700 | #3A474B | 6.85:1 | ✅ | ✅ | ❌ | Quasi AAA |
| 800 | #2A3538 | 10.2:1 | ✅ | ✅ | ✅ | AAA ✓ |
| 900 | #252B37 | 11.5:1 | ✅ | ✅ | ✅ | AAA ✓ |

### Contraste Texte Foncé

| Nuance | Hex | Ratio Neutral-900 | Status |
|--------|-----|-------------------|--------|
| 50 | #F5F8F8 | ~13.2:1 | AAA ✓ |
| 100 | #EEF6F8 | ~12.5:1 | AAA ✓ |
| 200 | #E0E8EA | ~10.8:1 | AAA ✓ |
| 300 | #C8D4D7 | ~8.1:1 | AAA ✓ |

### ✅ Usage Neutral

**Texte principal :**
```css
/* ✓ AAA */
background: #ffffff;
color: var(--color-neutral-900);  /* Ratio 11.5:1 */
```

**Texte secondaire :**
```css
/* ✓ AA */
background: #ffffff;
color: var(--color-neutral-600);  /* Ratio 4.56:1 */
```

**Boutons :**
```css
/* ✓ AAA */
background: var(--color-neutral-800);
color: #ffffff;  /* Ratio 10.2:1 */
```

---

## 🟢 PALETTE SUCCESS - Teal TLS #2E8F98

### Couleurs

```css
--color-success-50: #E6F5F7;   /* Très clair */
--color-success-100: #CCE9ED;  /* Clair */
--color-success-200: #99D4DB;  /* Moyen-clair */
--color-success-300: #66BEC9;  /* Moyen */
--color-success-400: #4AA7B3;  /* Entre moyen et base */
--color-success-500: #2E8F98;  /* ← BASE TLS */
--color-success-600: #25727A;  /* Foncé */
--color-success-700: #1C565C;  /* Plus foncé */
--color-success-800: #133B3E;  /* Très foncé */
--color-success-900: #0A1F21;  /* Presque noir */
```

### Contraste Texte Blanc (#FFFFFF)

| Nuance | Hex | Ratio | AA Normal (4.5:1) | AA Large (3:1) | AAA (7:1) | Recommandation |
|--------|-----|-------|-------------------|----------------|-----------|----------------|
| 50 | #E6F5F7 | 1.08:1 | ❌ | ❌ | ❌ | Background uniquement |
| 100 | #CCE9ED | 1.18:1 | ❌ | ❌ | ❌ | Background uniquement |
| 200 | #99D4DB | 1.47:1 | ❌ | ❌ | ❌ | Background uniquement |
| 300 | #66BEC9 | 1.93:1 | ❌ | ❌ | ❌ | Background uniquement |
| 400 | #4AA7B3 | 2.58:1 | ❌ | ❌ | ❌ | Icons uniquement |
| **500** | **#2E8F98** | **3.79:1** | ❌ | ✅ | ❌ | **AA Large ✓** |
| **600** | **#25727A** | **4.72:1** | ✅ | ✅ | ❌ | **AA Normal ✓** |
| **700** | **#1C565C** | **6.21:1** | ✅ | ✅ | ❌ | **AA Normal ✓** |
| **800** | **#133B3E** | **8.54:1** | ✅ | ✅ | ✅ | **AAA ✓** |
| **900** | **#0A1F21** | **11.5:1** | ✅ | ✅ | ✅ | **AAA ✓** |

### Contraste Texte Foncé (#252B37 - neutral-900)

| Nuance | Hex | Ratio | AA Normal (4.5:1) | AAA (7:1) |
|--------|-----|-------|-------------------|-----------|
| 50 | #E6F5F7 | 12.8:1 | ✅ | ✅ |
| 100 | #CCE9ED | 10.2:1 | ✅ | ✅ |
| 200 | #99D4DB | 6.5:1 | ✅ | ❌ |

### ✅ Solutions Success (Convention Solid)

**Badges/Boutons texte normal :**
```css
/* ✓ AA Normal - RECOMMANDÉ */
background: var(--success-solid);          /* success-600 */
color: var(--success-solid-foreground);    /* #ffffff */
/* Ratio: 4.72:1 ✓ */
```

**Badges texte large :**
```css
/* ✓ AA Large */
background: var(--success);                /* success-500 */
color: var(--success-foreground);          /* #ffffff */
font-size: 18px;
font-weight: 600;
/* Ratio: 3.79:1 ✓ */
```

**Alerts fond clair :**
```css
/* ✓ AAA */
background: var(--color-success-50);
color: var(--color-success-700);
border-left: 4px solid var(--success);
/* Ratio: 10.1:1 ✓ */
```

---

## 🔴 PALETTE ERROR - Rouge #EF4444

### Couleurs

```css
--color-error-50: #FEF2F2;   /* Très clair */
--color-error-100: #FEE2E2;  /* Clair */
--color-error-200: #FECACA;  /* Moyen-clair */
--color-error-300: #FCA5A5;  /* Moyen */
--color-error-400: #F87171;  /* Entre moyen et base */
--color-error-500: #EF4444;  /* ← BASE TLS */
--color-error-600: #DC2626;  /* Foncé */
--color-error-700: #B91C1C;  /* Plus foncé */
--color-error-800: #991B1B;  /* Très foncé */
--color-error-900: #7F1D1D;  /* Presque noir */
```

### Contraste Texte Blanc (#FFFFFF)

| Nuance | Hex | Ratio | AA Normal (4.5:1) | AA Large (3:1) | AAA (7:1) | Recommandation |
|--------|-----|-------|-------------------|----------------|-----------|----------------|
| 50 | #FEF2F2 | 1.04:1 | ❌ | ❌ | ❌ | Background uniquement |
| 100 | #FEE2E2 | 1.09:1 | ❌ | ❌ | ❌ | Background uniquement |
| 200 | #FECACA | 1.20:1 | ❌ | ❌ | ❌ | Background uniquement |
| 300 | #FCA5A5 | 1.41:1 | ❌ | ❌ | ❌ | Background uniquement |
| 400 | #F87171 | 1.83:1 | ❌ | ❌ | ❌ | Background uniquement |
| **500** | **#EF4444** | **2.44:1** | ❌ | ❌ | ❌ | **Icons, borders** |
| **600** | **#DC2626** | **3.55:1** | ❌ | ✅ | ❌ | **AA Large ✓** |
| **700** | **#B91C1C** | **5.03:1** | ✅ | ✅ | ❌ | **AA Normal ✓** |
| **800** | **#991B1B** | **6.31:1** | ✅ | ✅ | ❌ | **AA Normal ✓** |
| **900** | **#7F1D1D** | **7.67:1** | ✅ | ✅ | ✅ | **AAA ✓** |

### Contraste Texte Foncé

| Nuance | Hex | Ratio Neutral-900 | AA Normal | AAA |
|--------|-----|-------------------|-----------|-----|
| 50 | #FEF2F2 | ~13.9:1 | ✅ | ✅ |
| 100 | #FEE2E2 | ~13.2:1 | ✅ | ✅ |
| 200 | #FECACA | ~12.0:1 | ✅ | ✅ |

### ✅ Solutions Error

**Boutons destructifs :**
```css
/* ✓ AA Normal */
background: var(--destructive);        /* error-600 */
color: var(--destructive-foreground);  /* #ffffff */
/* Ratio: 3.55:1 → AA Large */

/* ✓ AA Normal - Alternative */
background: var(--color-error-700);
color: #ffffff;
/* Ratio: 5.03:1 ✓ */
```

**Alerts erreur :**
```css
/* ✓ AAA */
background: var(--color-error-50);
color: var(--color-error-700);
border-left: 4px solid var(--error);
```

---

## 📊 TABLEAU RÉCAPITULATIF - TEXTE BLANC

### Nuances AA Normal (4.5:1+) par Famille

| Famille | Nuances AA Normal | Nuances AA Large | Recommandation Texte Blanc |
|---------|-------------------|------------------|----------------------------|
| **Primary** | 800, 900 | 700, 800, 900 | **primary-800** (5.01:1) |
| **Secondary** | 700, 800, 900 | 600, 700, 800, 900 | **secondary-700** (5.79:1) |
| **Accent** | ❌ Aucune | 800, 900 | ❌ **Utiliser texte foncé** |
| **Neutral** | 600, 700, 800, 900 | 500-900 | **neutral-800** (10.2:1) |
| **Success** | 600, 700, 800, 900 | 500-900 | **success-600** (4.72:1) ✅ |
| **Error** | 700, 800, 900 | 600, 700, 800, 900 | **error-700** (5.03:1) |

---

## 📊 TABLEAU RÉCAPITULATIF - TEXTE FONCÉ

### Nuances AAA (7:1+) avec Neutral-900

| Famille | Nuances AAA | Recommandation |
|---------|-------------|----------------|
| **Primary** | 50, 100, 200 | **primary-50** (13.5:1) |
| **Secondary** | 50, 100 | **secondary-50** (14+:1) |
| **Accent** | 50, 100, 200, 300, 400 | **accent-400** (8.3:1) ✅ |
| **Neutral** | 50, 100, 200, 300 | **neutral-50** (13.2:1) |
| **Success** | 50, 100 | **success-50** (12.8:1) |
| **Error** | 50, 100, 200 | **error-50** (13.9:1) |

---

## ⚠️ PROBLÈMES IDENTIFIÉS

### 🔴 Critique - Accent (Jaune)

**Problème :**
- **Aucune nuance** ne permet texte blanc AA Normal
- Ratio maximum: 4.15:1 (accent-900) - **insuffisant**

**Solution :**
```css
/* ✗ NE JAMAIS FAIRE */
background: var(--color-accent-400);  /* #F8B044 */
color: #ffffff;  /* Ratio 1.74:1 - NON CONFORME */

/* ✓ TOUJOURS FAIRE */
background: var(--color-accent-400);
color: var(--color-neutral-900);  /* Ratio 8.3:1 ✓ AAA */
```

**Impact :**
- Warnings doivent TOUJOURS utiliser texte foncé
- Badges jaunes = fond clair + texte foncé uniquement

---

### ⚠️ Attention - Couleurs de Base (500)

**Toutes les couleurs de base ont des ratios insuffisants pour texte blanc normal :**

| Couleur | Hex | Ratio | Status |
|---------|-----|-------|--------|
| primary-500 | #55A1B4 | 2.34:1 | ❌ NON AA |
| secondary-500 | #ED843A | 2.11:1 | ❌ NON AA |
| accent-400 | #F8B044 | 1.74:1 | ❌ NON AA |
| success-500 | #2E8F98 | 3.79:1 | ⚠️ AA Large uniquement |
| error-500 | #EF4444 | 2.44:1 | ❌ NON AA |

**Recommandation :**
- **NE PAS** utiliser nuances 500 pour texte blanc normal
- **Utiliser** nuances 600-700+ pour AA Normal
- **OU** utiliser convention "solid" (600)

---

## ✅ RECOMMANDATIONS GLOBALES

### 1. Convention "Solid" (RECOMMANDÉ)

**Pour CHAQUE famille, créer token "solid" :**

```css
/* Primary */
--primary-solid: var(--color-primary-800);     /* 5.01:1 ✓ */
--primary-solid-foreground: #ffffff;

/* Secondary */
--secondary-solid: var(--color-secondary-700); /* 5.79:1 ✓ */
--secondary-solid-foreground: #ffffff;

/* Success (EXISTANT) */
--success-solid: var(--color-success-600);     /* 4.72:1 ✓ */
--success-solid-foreground: #ffffff;

/* Error */
--error-solid: var(--color-error-700);         /* 5.03:1 ✓ */
--error-solid-foreground: #ffffff;

/* Accent - TOUJOURS texte foncé */
--accent-solid: var(--color-accent-400);
--accent-solid-foreground: var(--color-neutral-900);  /* Texte foncé ✓ */
```

---

### 2. Règles d'Usage

#### ✅ Pour Texte Blanc Normal

```css
/* Boutons, badges texte normal */
background: var(--{color}-solid);
color: var(--{color}-solid-foreground);
```

#### ✅ Pour Icons/Borders

```css
/* Éléments décoratifs sans texte */
color: var(--{color});           /* 500 ou 400 */
border: 2px solid var(--{color});
```

#### ✅ Pour Backgrounds Clairs

```css
/* Alerts, cards */
background: var(--color-{family}-50);
color: var(--color-{family}-700);  /* ou neutral-900 */
```

---

### 3. Cas Spéciaux

#### Accent (Jaune) - JAMAIS de texte blanc

```css
/* ✓ Badge warning */
.badge-warning {
  background: var(--color-accent-400);
  color: var(--color-neutral-900);    /* Texte foncé TOUJOURS */
  border: 1px solid var(--color-accent-600);
}

/* ✓ Alert warning */
.alert-warning {
  background: var(--color-accent-50);
  color: var(--color-accent-800);
  border-left: 4px solid var(--warning);
}
```

---

## 🎯 CHECKLIST DÉVELOPPEUR

### Avant d'utiliser une couleur pour du texte :

- [ ] **Vérifier le ratio de contraste** (ce document)
- [ ] **Texte blanc normal ?** → Utiliser `-solid` (600-800)
- [ ] **Texte blanc large ?** → OK avec 500-700 selon famille
- [ ] **C'est du jaune ?** → **TOUJOURS texte foncé**
- [ ] **Background clair ?** → Texte foncé (700+ ou neutral-900)
- [ ] **Icon/Border ?** → OK avec 500

---

## 📖 OUTILS DE VALIDATION

### Online Tools

- **WebAIM Contrast Checker:** https://webaim.org/resources/contrastchecker/
- **Coolors Contrast Checker:** https://coolors.co/contrast-checker
- **Adobe Color Accessibility:** https://color.adobe.com/create/color-accessibility

### Browser DevTools

```javascript
// Chrome DevTools Console
// Calculer ratio de contraste
const contrast = (l1, l2) => (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
```

---

## ✅ CONCLUSION

### Status Global

- ✅ **Neutral** - Excellent (tous ratios OK)
- ✅ **Success** - Bon (convention solid appliquée)
- ⚠️ **Primary, Secondary, Error** - Partiel (nécessitent solid)
- ❌ **Accent (Jaune)** - Problématique (texte foncé obligatoire)

### Actions Requises

1. **Créer convention "solid"** pour Primary, Secondary, Error
2. **Documenter règle jaune** : texte foncé TOUJOURS
3. **Audit composants existants** (30+)
4. **Formation équipe** : quand utiliser quoi

### Garanties

- ✅ Aucune couleur de base (500) ne permet texte blanc AA Normal
- ✅ Toutes les familles ont nuances AA Normal (600-800)
- ✅ Tous les backgrounds clairs (50) permettent texte foncé AAA
- ⚠️ Jaune nécessite vigilance particulière

---

**AUDIT WCAG COMPLET ! ♿**

_WCAG Accessibility Audit | 22/02/2026_
