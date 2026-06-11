# 🎯 Success Cheatsheet - Quick Reference

**WCAG AA Compliant** | **22/02/2026**

---

## 📋 TOKENS

```css
/* Highlights, icons, borders */
--success: var(--color-success-500);              /* #2E8F98 | AA Large */
--success-foreground: #ffffff;

/* Boutons, badges texte normal */
--success-solid: var(--color-success-600);        /* #25727A | AA Normal ✅ */
--success-solid-foreground: #ffffff;
```

---

## ⚡ USAGE RAPIDE

### Badge
```css
background: var(--success-solid);
color: var(--success-solid-foreground);
```

### Button
```css
background: var(--success-solid);
color: var(--success-solid-foreground);
```

### Alert
```css
background: var(--color-success-50);
color: var(--color-success-700);
border-left: 4px solid var(--success);
```

### Icon
```css
color: var(--success);
```

### Border
```css
border: 2px solid var(--success);
```

---

## 📊 CONTRASTES

| Token | Ratio | WCAG | Usage |
|-------|-------|------|-------|
| `--success` (500) | 3.79:1 | AA Large | Icons, borders |
| `--success-solid` (600) | 4.72:1 | **AA Normal** | **Boutons, badges** |
| `success-50` + `success-700` | 10.1:1 | AAA | Alerts fond clair |

---

## ✅ DO

```css
/* ✓ Badge/Button texte normal */
background: var(--success-solid);

/* ✓ Icon */
color: var(--success);

/* ✓ Alert */
background: var(--color-success-50);
color: var(--color-success-700);
```

## ❌ DON'T

```css
/* ✗ Badge texte normal avec success (NON AA) */
background: var(--success);  /* 500 - ratio 3.79:1 */
font-size: 14px;             /* Trop petit */
```

---

**Docs complètes :** `/docs/SUCCESS-SOLID-CONVENTION.md`
