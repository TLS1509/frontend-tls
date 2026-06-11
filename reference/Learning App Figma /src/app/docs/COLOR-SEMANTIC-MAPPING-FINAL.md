# 🎨 TLS - Mapping Couleurs Sémantiques FINAL

**Version:** 2.0 FINAL | **Date:** 22/02/2026  
**Convention:** Canonique TLS - 5 Couleurs Uniquement

---

## 🎯 Vos 5 Couleurs TLS

| # | Hex | Nom | Famille Palette | Token Sémantique | Usage |
|---|-----|-----|-----------------|------------------|-------|
| 1️⃣ | **#55A1B4** | Bleu TLS | `--color-primary-*` | `--primary` | Brand, Navigation, Links, CTA |
| 2️⃣ | **#F8B044** | Jaune TLS | `--color-accent-*` | `--accent`, `--warning` | Badges, Warnings, Highlights |
| 3️⃣ | **#2A9D8F** | Teal | `--color-success-*` | `--success` | Success, Completion, Positive |
| 4️⃣ | **#EF4444** | Rouge | `--color-error-*` (500) | `--error` | Errors, Validation, Critical |
| 5️⃣ | **#E76F51** | Coral | `--color-error-*` (600) | `--destructive` | Delete, Cancel, Destructive |

---

## 📐 Architecture Finale

### ✅ Palette (6 Familles)

```css
/* BRAND - 3 couleurs */
--color-primary-*    (50-900)  /* #55A1B4 Bleu */
--color-secondary-*  (50-900)  /* #ED843A Orange */
--color-accent-*     (50-900)  /* #F8B044 Jaune */

/* SEMANTIC - 2 couleurs */
--color-success-*    (50-900)  /* #2A9D8F Teal */
--color-error-*      (50-900)  /* #EF4444 Rouge + #E76F51 Coral */

/* NEUTRAL - Grays */
--color-neutral-*    (50-900)  /* #F5F8F8 → #252B37 */
```

### ✅ Tokens Sémantiques (Pas de Doublons)

```css
/* Brand */
--primary: var(--color-primary-500)
--secondary: var(--color-secondary-500)
--accent: var(--color-accent-400)

/* States */
--success: var(--color-success-500)
--error: var(--color-error-500)
--warning: var(--color-accent-400)      /* ← ALIAS accent */

/* Special */
--destructive: var(--color-error-600)   /* ← #E76F51 */
--info: var(--color-primary-600)        /* ← ALIAS primary */
```

---

## 🎨 Détail Par Couleur

### 1️⃣ Bleu TLS - #55A1B4

**Famille:** `--color-primary-*`  
**Base:** 500  
**Token Sémantique:** `--primary`

#### Palette Complète
```css
--color-primary-50: #E8F4F7;   /* Très clair - Backgrounds */
--color-primary-100: #DCEBEF;  /* Clair */
--color-primary-200: #B9D7DF;  /* Light */
--color-primary-300: #96C3CF;  /* Light medium */
--color-primary-400: #73AFBF;  /* Medium */
--color-primary-500: #55A1B4;  /* ← BASE #55A1B4 */
--color-primary-600: #4A8FA1;  /* Medium dark (info) */
--color-primary-700: #3D7786;  /* Dark */
--color-primary-800: #2F5F6A;  /* Darker */
--color-primary-900: #1F3E45;  /* Très foncé - Text */
```

#### Usage
```tsx
// Navigation
<NavLink style={{ color: 'var(--primary)' }} />

// Button primary
<Button style={{ 
  background: 'var(--primary)',
  color: 'var(--primary-foreground)' 
}} />

// Badge light
<Badge style={{
  background: 'var(--color-primary-50)',
  color: 'var(--color-primary-700)',
  border: '1px solid var(--color-primary-200)'
}} />

// Link
<a style={{ color: 'var(--color-primary-600)' }}>En savoir plus</a>

// Info alert (alias)
<Alert variant="info" style={{
  background: 'var(--color-primary-50)',
  borderLeft: '4px solid var(--info)'
}}>
  Information
</Alert>
```

**Où utilisé:**
- OptimizedSidebar (33 pages)
- BackgroundBlobs (32 pages)
- Navigation
- Buttons primary
- Brand elements
- Info states (via --info)

---

### 2️⃣ Jaune TLS - #F8B044

**Famille:** `--color-accent-*`  
**Base:** 400  
**Tokens Sémantiques:** `--accent`, `--warning`

#### Palette Complète
```css
--color-accent-50: #FFF9EE;    /* Très clair - Backgrounds */
--color-accent-100: #FFECC8;
--color-accent-200: #FFD791;
--color-accent-300: #FFC15A;
--color-accent-400: #F8B044;   /* ← BASE #F8B044 */
--color-accent-500: #DF9E3D;
--color-accent-600: #C68D36;
--color-accent-700: #AE7B30;
--color-accent-800: #956A29;
--color-accent-900: #7C5822;   /* Très foncé */
```

#### Usage
```tsx
// Badge highlight
<Badge style={{
  background: 'var(--color-accent-50)',
  color: 'var(--color-accent-700)',
  border: '1px solid var(--color-accent-400)'
}} />

// Warning alert
<Alert variant="warning" style={{
  background: 'var(--color-accent-50)',
  borderLeft: '4px solid var(--warning)'
}}>
  ⚠️ Attention
</Alert>

// Button accent
<Button variant="accent" style={{
  background: 'var(--accent)',
  color: 'var(--accent-foreground)'
}} />

// Badge niveau débutant
<Badge style={{
  background: 'var(--color-accent-100)',
  color: 'var(--color-accent-800)'
}}>
  Débutant
</Badge>
```

**Où utilisé:**
- Badges niveaux
- Warnings/Alerts
- Secondary CTAs
- Highlights
- Tooltips

**Note:** `--warning` est un **ALIAS** de `--accent` (pas de famille `--color-warning-*`)

---

### 3️⃣ Teal - #2A9D8F

**Famille:** `--color-success-*`  
**Base:** 500  
**Token Sémantique:** `--success`

#### Palette Complète
```css
--color-success-50: #E6F7F5;   /* Très clair - Backgrounds */
--color-success-100: #CCEFEB;
--color-success-200: #99DFD7;
--color-success-300: #66CFC3;
--color-success-400: #33BFAF;
--color-success-500: #2A9D8F;  /* ← BASE #2A9D8F */
--color-success-600: #227E73;
--color-success-700: #1A5E57;
--color-success-800: #113F3B;
--color-success-900: #091F1F;  /* Très foncé */
```

#### Usage
```tsx
// Success alert
<Alert variant="success" style={{
  background: 'var(--color-success-50)',
  color: 'var(--color-success-900)',
  borderLeft: '4px solid var(--success)'
}}>
  ✓ Succès!
</Alert>

// Completion badge
<Badge variant="success" style={{
  background: 'var(--color-success-100)',
  color: 'var(--color-success-700)'
}}>
  Completed
</Badge>

// Progress bar
<ProgressBar 
  fill="var(--success)"
  background="var(--color-success-100)"
/>

// Checkmark icon
<CheckIcon color="var(--color-success-600)" />

// Success button
<Button style={{
  background: 'var(--success)',
  color: 'var(--success-foreground)'
}}>
  Confirmer
</Button>
```

**Où utiliser:**
- Success alerts/messages
- Completion badges
- Progress indicators
- Validation success
- Positive feedback
- Check icons

**Migration depuis ancien teal (#9dbeba):**
```tsx
// ❌ AVANT
<Badge style={{ background: '#e8f2f0', color: '#9dbeba' }} />

// ✅ APRÈS
<Badge style={{ 
  background: 'var(--color-success-50)', 
  color: 'var(--color-success-700)' 
}} />
```

---

### 4️⃣ Rouge - #EF4444

**Famille:** `--color-error-*`  
**Base:** 500  
**Token Sémantique:** `--error`

#### Palette Complète
```css
--color-error-50: #FEF2F2;     /* Très clair - Backgrounds */
--color-error-100: #FEE2E2;
--color-error-200: #FECACA;
--color-error-300: #FCA5A5;
--color-error-400: #F87171;
--color-error-500: #EF4444;    /* ← BASE #EF4444 */
--color-error-600: #E76F51;    /* ← CORAL #E76F51 (destructive) */
--color-error-700: #DC2626;
--color-error-800: #B91C1C;
--color-error-900: #7F1D1D;    /* Très foncé */
```

#### Usage
```tsx
// Error alert
<Alert variant="error" style={{
  background: 'var(--color-error-50)',
  color: 'var(--color-error-900)',
  borderLeft: '4px solid var(--error)'
}}>
  ✕ Erreur!
</Alert>

// Input error
<Input 
  error
  style={{
    borderColor: 'var(--error)',
    background: 'var(--color-error-50)'
  }}
/>
{emailInvalid && (
  <span style={{ color: 'var(--error)', fontSize: '0.875rem' }}>
    Email invalide
  </span>
)}

// Error badge
<Badge variant="error" style={{
  background: 'var(--color-error-100)',
  color: 'var(--color-error-700)'
}}>
  Failed
</Badge>

// Error icon
<ErrorIcon color="var(--error)" />
```

**Où utiliser:**
- Form validation errors
- Error messages
- Critical alerts
- Failed states
- Negative feedback

---

### 5️⃣ Coral - #E76F51

**Famille:** `--color-error-*` (shade 600)  
**Token Sémantique:** `--destructive`

#### Intégration dans Palette ERROR

```css
/* ⚠️ PAS de --color-coral-* (famille supprimée) */

/* ✅ Intégré dans error comme shade 600 */
--color-error-600: #E76F51;  /* ← Coral destructive */

/* Token sémantique */
--destructive: var(--color-error-600);
```

#### Pourquoi dans ERROR-600 ?

1. **Évite redondance:** Pas besoin d'une famille `coral-*` séparée
2. **Logique sémantique:** Destructive = intensité d'erreur
3. **Simplifie palette:** 6 familles au lieu de 8
4. **Cohérence visuelle:** Coral est dans la gamme rouge/orange

#### Usage
```tsx
// Delete button
<Button variant="destructive" style={{
  background: 'var(--destructive)',
  color: 'var(--destructive-foreground)'
}}>
  <TrashIcon /> Supprimer
</Button>

// Cancel session modal
<Modal>
  <Button 
    onClick={cancelSession}
    style={{ background: 'var(--color-error-600)' }}
  >
    Annuler la session
  </Button>
</Modal>

// Destructive alert
<Alert variant="destructive" style={{
  background: 'var(--color-error-50)',
  borderLeft: '4px solid var(--destructive)'
}}>
  ⚠️ Action irréversible
</Alert>

// Delete icon
<TrashIcon color="var(--destructive)" />

// Destructive gradient
<div style={{
  background: 'linear-gradient(135deg, var(--color-error-400), var(--color-error-600))'
}}>
  Danger zone
</div>
```

**Où utiliser:**
- Delete buttons
- Cancel session
- Remove/Unsubscribe
- Irreversible actions
- Destructive warnings

**Migration depuis ancien coral (#f49a76):**
```tsx
// ❌ AVANT
<Button style={{ background: '#f49a76' }} />

// ✅ APRÈS
<Button variant="destructive" style={{ background: 'var(--destructive)' }} />
// OU
<Button style={{ background: 'var(--color-error-600)' }} />
```

---

## 🔄 Comparaison Ancien vs Nouveau

### Ancien Système (Partiel)

| Couleur | Hex | Token V1 | Problème |
|---------|-----|----------|----------|
| Bleu | #55A1B4 | `--primary` | ✅ OK mais pas de palette |
| Jaune | #F8B044 | `--accent` | ✅ OK mais pas de palette |
| Teal | #9dbeba | `--teal`, `--success` | ❌ Couleur différente |
| Coral | #f49a76 | `--coral`, `--destructive` | ❌ Couleur différente |
| Rouge | - | - | ❌ Manquant |

### Nouveau Système V2

| Couleur | Hex | Famille Palette | Token Sémantique |
|---------|-----|-----------------|------------------|
| Bleu | #55A1B4 | `--color-primary-*` | `--primary` |
| Jaune | #F8B044 | `--color-accent-*` | `--accent`, `--warning` |
| Teal | #2A9D8F | `--color-success-*` | `--success` |
| Rouge | #EF4444 | `--color-error-*` | `--error` |
| Coral | #E76F51 | `--color-error-600` | `--destructive` |

---

## 📋 Tableau Usage Par Contexte

| Contexte | Couleur Recommandée | Token Palette | Token Sémantique |
|----------|---------------------|---------------|------------------|
| **Navigation** | Bleu #55A1B4 | `--color-primary-600` | `--primary` |
| **CTA Principal** | Bleu #55A1B4 | `--color-primary-500` | `--primary` |
| **CTA Secondaire** | Orange #ED843A | `--color-secondary-500` | `--secondary` |
| **Badge/Highlight** | Jaune #F8B044 | `--color-accent-50` | `--accent` |
| **Warning** | Jaune #F8B044 | `--color-accent-50` | `--warning` |
| **Success** | Teal #2A9D8F | `--color-success-50` | `--success` |
| **Completion** | Teal #2A9D8F | `--color-success-500` | `--success` |
| **Error** | Rouge #EF4444 | `--color-error-50` | `--error` |
| **Validation** | Rouge #EF4444 | `--color-error-500` | `--error` |
| **Delete** | Coral #E76F51 | `--color-error-600` | `--destructive` |
| **Cancel** | Coral #E76F51 | `--color-error-600` | `--destructive` |
| **Info** | Bleu #4A8FA1 | `--color-primary-600` | `--info` |

---

## ✅ Checklist Validation

### Couleurs Palette
- [✅] `--color-primary-500` = #55A1B4
- [✅] `--color-accent-400` = #F8B044
- [✅] `--color-success-500` = #2A9D8F
- [✅] `--color-error-500` = #EF4444
- [✅] `--color-error-600` = #E76F51

### Tokens Sémantiques
- [✅] `--primary` → `--color-primary-500`
- [✅] `--accent` → `--color-accent-400`
- [✅] `--success` → `--color-success-500`
- [✅] `--error` → `--color-error-500`
- [✅] `--destructive` → `--color-error-600`
- [✅] `--warning` → `--color-accent-400` (alias)
- [✅] `--info` → `--color-primary-600` (alias)

### Familles Supprimées
- [✅] Pas de `--color-teal-*`
- [✅] Pas de `--color-coral-*`
- [✅] Pas de `--color-warning-*`
- [✅] Pas de `--color-info-*`

---

_Mapping Sémantique FINAL | 22/02/2026 | Convention TLS Canonique_
