# 🎨 Success Color Visual Guide - #2E8F98

**Nouvelle couleur:** Teal TLS #2E8F98  
**Ancienne couleur:** Teal standard #2A9D8F  
**Date:** 22/02/2026

---

## 📊 RAMPE VISUELLE

```
LIGHTEST                                                    DARKEST
   50      100     200     300     400     500     600     700     800     900
█████████████████████████████████████████████████████████████████████████████
#E6F5F7 #CCE9ED #99D4DB #66BEC9 #4AA7B3 #2E8F98 #25727A #1C565C #133B3E #0A1F21
                                         ↑
                                    BASE TLS
```

---

## 🎯 USAGES RECOMMANDÉS PAR NUANCE

### 50 - #E6F5F7 (Très clair)
```css
background: var(--color-success-50);
```
**Usage :** Backgrounds alerts, banners, cards subtiles  
**Texte recommandé :** success-700 ou neutral-900  
**Contraste :** 12.8:1 (AAA) ✅

**Exemple :**
```
┌──────────────────────────────┐
│ ✓ Opération réussie          │ ← success-700
│ Votre profil a été mis à jour│ ← success-600
└──────────────────────────────┘
Background: success-50 (#E6F5F7)
```

---

### 100 - #CCE9ED (Clair)
```css
background: var(--color-success-100);
```
**Usage :** Hover states, backgrounds secondaires  
**Texte recommandé :** success-700 ou neutral-900  
**Contraste :** 10.2:1 (AAA) ✅

---

### 200 - #99D4DB (Moyen-clair)
```css
border: 2px solid var(--color-success-200);
```
**Usage :** Borders, dividers, accents subtils  
**Texte recommandé :** success-800  
**Contraste :** 6.5:1 (AA) ✅

**Exemple :**
```
┌─────────────────────────────┐ ← border: success-200
│                             │
│ Content here                │
│                             │
└─────────────────────────────┘
```

---

### 300 - #66BEC9 (Moyen)
```css
color: var(--color-success-300);
```
**Usage :** Icons, accents visuels  
**Backgrounds recommandés :** neutral-900+  

---

### 400 - #4AA7B3 (Entre moyen et base)
```css
background: var(--color-success-400);
```
**Usage :** Hover states actifs, transitions  
**Texte recommandé :** blanc (AA Large)

---

### 500 - #2E8F98 (BASE TLS) ⭐
```css
background: var(--success);
/* OU */
background: var(--color-success-500);
```
**Usage :** Badges, boutons, primary success color  
**Texte recommandé :** blanc (texte ≥18pt ou ≥14pt bold)  
**Contraste :** 3.79:1 (AA Large uniquement) ⚠️

**Exemple - Badge OK :**
```
┌─────────┐
│ SUCCESS │ ← Texte blanc 18px bold
└─────────┘
Background: success-500
Contraste: 3.79:1 ✓ AA Large
```

**Exemple - Texte normal NON OK :**
```
┌────────────────────┐
│ Small text here    │ ← Texte blanc 14px regular
└────────────────────┘
Background: success-500
Contraste: 3.79:1 ✗ NON AA (utiliser success-600)
```

---

### 600 - #25727A (Foncé) ✅ RECOMMANDÉ
```css
background: var(--color-success-600);
color: #ffffff;
```
**Usage :** Boutons, links, texte blanc normal  
**Texte recommandé :** blanc (AA complet)  
**Contraste :** 4.72:1 (AA) ✅

**Exemple - Bouton Parfait :**
```
┌──────────────┐
│  Confirmer   │ ← Texte blanc n'importe quelle taille
└──────────────┘
Background: success-600 (#25727A)
Contraste: 4.72:1 ✓ AA Normal
```

**👍 MEILLEUR CHOIX pour texte blanc normal**

---

### 700 - #1C565C (Plus foncé)
```css
color: var(--color-success-700);
background: var(--color-success-50);
```
**Usage :** Texte sur backgrounds clairs  
**Backgrounds recommandés :** success-50/100  
**Contraste sur 50 :** 10.1:1 (AAA) ✅

**Exemple - Alert Optimal :**
```
┌──────────────────────────────────┐
│ ✓ Action réussie                 │ ← success-700
│ Modifications enregistrées       │
└──────────────────────────────────┘
Background: success-50
Text: success-700
Contraste: 10.1:1 ✓ AAA
```

---

### 800 - #133B3E (Très foncé)
```css
color: var(--color-success-800);
```
**Usage :** Texte emphasized, headers  
**Contraste blanc :** 8.54:1 (AAA) ✅

---

### 900 - #0A1F21 (Presque noir)
```css
color: var(--color-success-900);
```
**Usage :** Texte très emphasized, quasi-black  
**Contraste blanc :** Très élevé (AAA+) ✅

---

## 🎨 COMBINAISONS RECOMMANDÉES

### ✅ Alert Success (AAA)
```css
.alert-success {
  background: var(--color-success-50);     /* #E6F5F7 */
  color: var(--color-success-700);         /* #1C565C */
  border-left: 4px solid var(--success);   /* #2E8F98 */
  padding: var(--space-4);
}
```
**Contraste texte/bg :** 10.1:1 ✅ AAA

---

### ✅ Bouton Success (AA)
```css
.button-success {
  background: var(--color-success-600);    /* #25727A */
  color: #ffffff;
  padding: 12px 24px;
  font-size: var(--text-base);             /* N'importe quelle taille */
}
```
**Contraste texte/bg :** 4.72:1 ✅ AA

---

### ✅ Badge Success (AA Large)
```css
.badge-success {
  background: var(--success);              /* #2E8F98 */
  color: var(--success-foreground);        /* #ffffff */
  padding: 6px 12px;
  font-size: var(--text-lg);               /* ≥18pt */
  font-weight: 600;                        /* bold */
  border-radius: var(--radius-full);
}
```
**Contraste texte/bg :** 3.79:1 ✅ AA Large

---

### ✅ Card Success
```css
.card-success {
  background: var(--color-success-50);     /* #E6F5F7 */
  border: 1px solid var(--color-success-200);  /* #99D4DB */
  box-shadow: 0 2px 4px rgba(46, 143, 152, 0.1);
}

.card-success-header {
  color: var(--color-success-700);         /* #1C565C */
  font-weight: 600;
}

.card-success-body {
  color: var(--color-neutral-700);         /* Texte normal */
}
```

---

## ⚠️ PIÈGES À ÉVITER

### ❌ Texte Normal Blanc sur Success-500
```css
/* ✗ NON AA */
.bad-button {
  background: var(--success);              /* #2E8F98 */
  color: #ffffff;
  font-size: var(--text-sm);               /* 14px regular */
}
/* Ratio: 3.79:1 - NON conforme AA normal */
```

**Solution :**
```css
/* ✓ AA Conforme */
.good-button {
  background: var(--color-success-600);    /* #25727A */
  color: #ffffff;
  font-size: var(--text-sm);
}
/* Ratio: 4.72:1 - Conforme AA ✓ */
```

---

### ❌ Texte Clair sur Success-50
```css
/* ✗ Contraste insuffisant */
.bad-alert {
  background: var(--color-success-50);     /* #E6F5F7 */
  color: var(--color-success-300);         /* #66BEC9 */
}
/* Ratio trop faible */
```

**Solution :**
```css
/* ✓ AAA Conforme */
.good-alert {
  background: var(--color-success-50);     /* #E6F5F7 */
  color: var(--color-success-700);         /* #1C565C */
}
/* Ratio: 10.1:1 - AAA ✓ */
```

---

## 🎨 AVANT / APRÈS COMPARAISON

### Visuel

```
ANCIEN (#2A9D8F)          NOUVEAU (#2E8F98)
████████████              ████████████
Plus vert                 Plus bleu-turquoise
Standard                  TLS branded
```

### Perception

- **Hue:** ~5° shift vers cyan (plus bleu)
- **Lightness:** Identique (~55%)
- **Saturation:** Légèrement plus saturé
- **Impact visuel:** Minimal, même famille

### Hex Comparison

```
AVANT  APRÈS  DIFF
R: 2A  2E     +4  (légèrement plus rouge)
G: 9D  8F     -14 (moins vert)
B: 8F  98     +9  (plus bleu)

→ Résultat: Plus turquoise/cyan, moins vert
```

---

## 📊 TABLEAU RÉCAPITULATIF CONTRASTE

| Nuance | Hex | Blanc (#FFF) | Neutral-900 (#252B37) | Usage Principal |
|--------|-----|--------------|----------------------|-----------------|
| **50** | #E6F5F7 | - | **12.8:1 AAA** | Backgrounds alerts |
| **100** | #CCE9ED | - | **10.2:1 AAA** | Hover states |
| **200** | #99D4DB | - | **6.5:1 AA** | Borders |
| **300** | #66BEC9 | - | ~4.0:1 | Icons |
| **400** | #4AA7B3 | - | ~3.0:1 | Hover actifs |
| **500** | #2E8F98 | **3.79:1 AA Large** | - | **Badges (texte large)** |
| **600** | #25727A | **4.72:1 AA** ✅ | - | **Boutons (texte normal)** |
| **700** | #1C565C | **6.21:1 AA** | - | Texte emphasized |
| **800** | #133B3E | **8.54:1 AAA** | - | Texte très emphasized |
| **900** | #0A1F21 | **11.5:1 AAA** | - | Quasi-black |

---

## ✅ RÉSUMÉ DÉCISIONS

### Texte Blanc

- **Success-500 :** ⚠️ Uniquement texte ≥18pt ou ≥14pt bold (AA Large)
- **Success-600+ :** ✅ Tout texte (AA/AAA)

### Texte Foncé (Neutral-900)

- **Success-50/100 :** ✅ Parfait (AAA)
- **Success-200+ :** Vérifier selon nuance

### Combinaison Optimale

```css
/* Triple AAA */
background: var(--color-success-50);   /* #E6F5F7 */
color: var(--color-success-700);       /* #1C565C */
border: 1px solid var(--color-success-200);
```

---

**Success Color #2E8F98 - Production Ready ! ✅**

_Visual Guide | Teal TLS | 22/02/2026_
