# ✅ AI Generation Checklist - TLS Design System

**Pour CHAQUE génération de UI / composant**

---

## 🚨 RÈGLES ABSOLUES (NON NÉGOCIABLES)

### ❌ INTERDIT

```css
/* ✗ Couleurs hardcodées */
color: #55A1B4;
background: #ED843A;

/* ✗ Font families non autorisées */
font-family: 'Arial', sans-serif;
font-family: 'Roboto', sans-serif;

/* ✗ Valeurs hardcodées */
padding: 24px;
border-radius: 8px;
font-size: 16px;

/* ✗ Texte blanc sur jaune */
background: var(--color-accent-400);  /* Jaune */
color: #ffffff;  /* NON CONFORME WCAG */

/* ✗ Palettes inexistantes */
var(--color-warning-500)  /* N'existe pas */
var(--color-info-500)     /* N'existe pas */
var(--color-teal-500)     /* N'existe pas */
```

---

### ✅ OBLIGATOIRE

```css
/* ✓ Variables CSS pour couleurs */
color: var(--color-primary-500);
background: var(--success-solid);

/* ✓ Font families TLS uniquement */
font-family: var(--font-display);  /* League Spartan - Headings */
font-family: var(--font-body);     /* Nunito - Body text */

/* ✓ Variables CSS pour spacing/sizing */
padding: var(--space-6);
border-radius: var(--radius-lg);
font-size: var(--text-base);

/* ✓ Texte foncé sur jaune */
background: var(--color-accent-400);
color: var(--color-neutral-900);  /* WCAG AAA */

/* ✓ Aliases sémantiques */
--warning (alias de accent-400)
--info (alias de primary-600)
--destructive (alias de error-600)
```

---

## 🎨 PALETTE CANONIQUE - 6 FAMILLES UNIQUEMENT

```
✅ BRAND (3):
- --color-primary-*   (#55A1B4 Bleu)
- --color-secondary-* (#ED843A Orange)
- --color-accent-*    (#F8B044 Jaune)

✅ NEUTRAL (1):
- --color-neutral-*   (Grays)

✅ SEMANTIC (2):
- --color-success-*   (#2E8F98 Teal TLS)
- --color-error-*     (#EF4444 Rouge)

❌ N'EXISTENT PAS:
- --color-warning-* (utiliser --warning alias)
- --color-info-* (utiliser --info alias)
- --color-teal-* (utiliser --color-success-*)
- --color-coral-* (non dans TLS)
```

---

## ♿ WCAG COMPLIANCE

### Texte Blanc - Nuances Recommandées

```css
/* ✓ AA Normal */
background: var(--color-primary-800);      /* 5.01:1 */
background: var(--color-secondary-700);    /* 5.79:1 */
background: var(--success-solid);          /* 4.72:1 ✅ */
background: var(--color-error-700);        /* 5.03:1 */
background: var(--color-neutral-800);      /* 10.2:1 AAA */
```

### Jaune - TOUJOURS Texte Foncé

```css
/* ✓ SEULE OPTION VALIDE */
.warning {
  background: var(--color-accent-400);
  color: var(--color-neutral-900);  /* Ratio 8.3:1 AAA */
}

/* ✗ JAMAIS */
.warning-bad {
  background: var(--color-accent-400);
  color: #ffffff;  /* Ratio 1.74:1 - NON CONFORME */
}
```

---

## 📝 TYPOGRAPHY - Font Faces TLS Uniquement

```css
/* ✓ Headings - League Spartan */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
}

/* ✓ Body - Nunito */
p, span, div, button, input {
  font-family: var(--font-body);
}

/* ✗ JAMAIS utiliser */
font-family: 'Arial';
font-family: 'Roboto';
font-family: 'Helvetica';
```

---

## 🧩 COMPOSANTS - Templates Conformes

### Button Primary

```css
.button-primary {
  padding: var(--space-3) var(--space-6);
  background: var(--color-primary-800);
  color: #ffffff;
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  border-radius: var(--radius-lg);
  border: none;
  cursor: pointer;
}
```

### Badge Success

```css
.badge-success {
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
  padding: var(--space-4);
  background: var(--color-accent-50);
  color: var(--color-accent-800);  /* Texte foncé */
  border-left: 4px solid var(--warning);
  border-radius: var(--radius-lg);
  font-family: var(--font-body);
}
```

---

## ✅ PRE-GENERATION CHECKLIST

Avant de générer un composant :

- [ ] **Couleurs → Variables CSS** (pas de #hex)
- [ ] **Spacing → Variables CSS** (--space-*)
- [ ] **Radius → Variables CSS** (--radius-*)
- [ ] **Font size → Variables CSS** (--text-*)
- [ ] **Font family → TLS uniquement** (--font-display / --font-body)
- [ ] **WCAG vérifié** (jaune = texte foncé, nuances appropriées)
- [ ] **Pas de palettes inexistantes** (warning/info sont aliases)
- [ ] **6 familles canoniques uniquement**

---

## 🎯 QUICK REFERENCE

### Couleurs Fréquentes

```css
/* Primary button */
background: var(--color-primary-800);

/* Success button/badge */
background: var(--success-solid);

/* Warning (texte foncé) */
background: var(--color-accent-400);
color: var(--color-neutral-900);

/* Error button */
background: var(--color-error-700);

/* Card */
background: var(--card);
border: 1px solid var(--border);
```

### Spacing Fréquents

```css
/* Badge */
padding: var(--space-2) var(--space-4);

/* Button */
padding: var(--space-3) var(--space-6);

/* Card */
padding: var(--space-6);

/* Gap */
gap: var(--space-4);
```

### Radius Fréquents

```css
/* Badge */
border-radius: var(--radius-full);

/* Button */
border-radius: var(--radius-lg);

/* Card */
border-radius: var(--radius-xl);
```

---

## 🚨 VALIDATION FINALE

Après génération, vérifier :

```bash
# Rechercher couleurs hardcodées (doit être 0)
grep -r "#[0-9A-Fa-f]\{6\}" --include="*.tsx" --include="*.css"

# Rechercher font families non autorisées (doit être 0)
grep -r "font-family.*Arial\|Roboto\|Helvetica" --include="*.tsx" --include="*.css"

# Rechercher valeurs hardcodées spacing (doit être 0)
grep -r "padding:.*px\|margin:.*px" --include="*.tsx" --include="*.css"
```

---

## 📖 DOCUMENTATION

- **[DESIGN-SYSTEM-USAGE-GUIDE.md](/DESIGN-SYSTEM-USAGE-GUIDE.md)** - Guide complet
- **[WCAG-ACCESSIBILITY-AUDIT.md](/WCAG-ACCESSIBILITY-AUDIT.md)** - Audit WCAG
- **[CSS-SNIPPETS-READY.md](/CSS-SNIPPETS-READY.md)** - Snippets prêts

---

**RESPECT STRICT DU DESIGN SYSTEM TLS REQUIS ! 🎨**

_AI Generation Checklist | 22/02/2026_
