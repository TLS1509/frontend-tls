# ⚡ Quick Start - globals-hybrid.css

**Objectif :** Texte BLANC sur jaune foncé (ta préférence) SANS casser ton code existant

---

## ✅ EN 3 ÉTAPES (5 MINUTES)

### ÉTAPE 1 : Importer globals-hybrid.css

**Dans ton entry point (App.tsx, _app.tsx, ou main.tsx) :**

```tsx
// ✓ ORDRE CRITIQUE
import './styles/globals.css';        // ← PREMIER (ancien - ne PAS toucher)
import './styles/globals-hybrid.css'; // ← SECOND (nouveau - ajouter cette ligne)
```

**C'est tout ! Ton app continue de fonctionner tel quel ✅**

---

### ÉTAPE 2 : Utiliser la nouvelle convention

#### Pour Badge Warning (TEXTE BLANC sur jaune foncé)

```tsx
<span style={{
  padding: 'var(--space-2) var(--space-4)',
  background: 'var(--warning-solid)',           /* #956A29 - Jaune foncé */
  color: 'var(--warning-solid-foreground)',     /* #ffffff */
  fontSize: 'var(--text-lg)',                   /* 18px min */
  fontWeight: 'var(--font-semibold)',           /* 600 min */
  borderRadius: 'var(--radius-full)'
}}>
  ⚠️ Attention
</span>
```

#### Pour Button Success (TEXTE BLANC)

```tsx
<button style={{
  padding: 'var(--space-3) var(--space-6)',
  background: 'var(--success-solid)',           /* #25727A - Teal foncé */
  color: 'var(--success-solid-foreground)',     /* #ffffff */
  fontSize: 'var(--text-base)',
  fontWeight: 'var(--font-semibold)',
  borderRadius: 'var(--radius-lg)',
  border: 'none',
  cursor: 'pointer'
}}>
  Valider
</button>
```

---

### ÉTAPE 3 : Tester

**Ouvre l'app et vérifie :**
- [ ] Badge warning avec texte blanc sur jaune foncé ✓
- [ ] Ancien code fonctionne toujours ✓
- [ ] Nouvelles couleurs disponibles ✓

---

## 🎨 TOKENS DISPONIBLES

### Convention SOLID (Texte Blanc)

```css
/* ACCENT/WARNING - Jaune foncé (TA PRÉFÉRENCE) */
--accent-solid: #956A29;              /* AA Large (18px+, 600+) */
--accent-solid-foreground: #ffffff;

--warning-solid: var(--accent-solid);
--warning-solid-foreground: #ffffff;

/* SUCCESS - Teal foncé */
--success-solid: #25727A;             /* AA Normal */
--success-solid-foreground: #ffffff;

/* ERROR - Rouge foncé */
--error-solid: #B91C1C;               /* AA Normal */
--error-solid-foreground: #ffffff;

/* PRIMARY - Bleu foncé */
--primary-solid: #2F5F6A;             /* AA Normal */
--primary-solid-foreground: #ffffff;

/* SECONDARY - Orange foncé */
--secondary-solid: #8F5017;           /* AA Normal */
--secondary-solid-foreground: #ffffff;
```

---

## ⚠️ REQUIS pour AA Large (warning-solid)

```tsx
/* ✓ CONFORME */
fontSize: 'var(--text-lg)'        // 18px min
fontWeight: 'var(--font-semibold)' // 600 min

/* OU */
fontSize: 'var(--text-base)'      // 16px OK si...
fontWeight: 'var(--font-bold)'    // ...700 bold
```

---

## 🚫 NE PAS FAIRE

```tsx
/* ✗ ANCIEN (NON CONFORME WCAG) */
background: 'var(--accent)';      /* #F8B044 - Jaune clair */
color: '#ffffff';                  /* Ratio 1.74:1 ✗ */

/* ✓ NOUVEAU (AA Large ✓) */
background: 'var(--warning-solid)'; /* #956A29 - Jaune foncé */
color: 'var(--warning-solid-foreground)'; /* #ffffff ✓ */
```

---

## 📖 DOCUMENTATION COMPLÈTE

- **[GUIDE-ADAPTATION-GLOBALS.md](/GUIDE-ADAPTATION-GLOBALS.md)** - Guide détaillé
- **[WCAG-ACCESSIBILITY-AUDIT.md](/WCAG-ACCESSIBILITY-AUDIT.md)** - Audit WCAG
- **[CSS-SNIPPETS-READY.md](/CSS-SNIPPETS-READY.md)** - Composants prêts

---

## 🎉 RÉSUMÉ

**1 ligne d'import** = Texte blanc sur jaune foncé disponible ✅

```tsx
import './styles/globals-hybrid.css'; // ← Ajouter cette ligne
```

**Utilise ensuite :**
```css
background: var(--warning-solid);
color: var(--warning-solid-foreground);
```

**ZÉRO BREAKING CHANGE GARANTI ! 🚀**

_Quick Start | 22/02/2026_
