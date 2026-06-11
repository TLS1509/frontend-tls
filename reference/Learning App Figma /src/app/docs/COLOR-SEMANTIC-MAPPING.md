# 🎨 TLS - Mapping Couleurs Sémantiques

**Version:** 2.0.1 | **Date:** 22/02/2026  
**Status:** Production Ready

---

## 🎯 Vos 5 Couleurs Sémantiques

### Mapping Complet

| # | Hex | Nom | Token Palette | Token Sémantique | Usage |
|---|-----|-----|---------------|------------------|-------|
| 1️⃣ | **#55A1B4** | Bleu TLS | `--color-primary-500` | `--primary` | Brand, Navigation, Links, CTA |
| 2️⃣ | **#F8B044** | Jaune TLS | `--color-accent-400` | `--accent`, `--warning` | Badges, Warnings, Highlights |
| 3️⃣ | **#2A9D8F** | Teal | `--color-success-500` | `--success` | Success, Completion, Positive |
| 4️⃣ | **#EF4444** | Rouge | `--color-error-500` | `--error` | Errors, Validation, Critical |
| 5️⃣ | **#E76F51** | Coral | `--color-coral-500` | `--destructive` | Delete, Cancel, Destructive |

---

## 📋 Détail Par Couleur

### 1️⃣ Bleu TLS - #55A1B4

**Status:** ✅ Existant (Primary brand)

```css
/* Palette complète */
--color-primary-50: #E8F4F7;   /* Très clair */
--color-primary-100: #DCEBEF;
--color-primary-200: #B9D7DF;
--color-primary-300: #96C3CF;
--color-primary-400: #73AFBF;
--color-primary-500: #55A1B4;  /* ← VOTRE COULEUR */
--color-primary-600: #4A8FA1;
--color-primary-700: #3D7786;
--color-primary-800: #2F5F6A;
--color-primary-900: #1F3E45;   /* Très foncé */

/* Tokens sémantiques */
--primary: var(--color-primary-500);  /* #55A1B4 */
--primary-foreground: #f8fbfd;
```

**Usage:**
```tsx
// Navigation
<NavLink style={{ color: 'var(--primary)' }} />

// Bouton primary
<Button style={{ 
  background: 'var(--primary)',
  color: 'var(--primary-foreground)' 
}} />

// Badge light
<Badge style={{
  background: 'var(--color-primary-50)',
  color: 'var(--color-primary-700)'
}} />

// Link
<a style={{ color: 'var(--color-primary-600)' }}>Lien</a>
```

**Où utilisé:**
- OptimizedSidebar (33 pages)
- BackgroundBlobs (32 pages)
- Buttons primary (24 pages)
- Navigation links
- Brand elements

---

### 2️⃣ Jaune TLS - #F8B044

**Status:** ✅ Existant (Accent/Warning)

```css
/* Palette complète */
--color-accent-50: #FFF9EE;    /* Très clair */
--color-accent-100: #FFECC8;
--color-accent-200: #FFD791;
--color-accent-300: #FFC15A;
--color-accent-400: #F8B044;   /* ← VOTRE COULEUR */
--color-accent-500: #DF9E3D;
--color-accent-600: #C68D36;
--color-accent-700: #AE7B30;
--color-accent-800: #956A29;
--color-accent-900: #7C5822;    /* Très foncé */

/* Tokens sémantiques */
--accent: var(--color-accent-400);    /* #F8B044 */
--accent-foreground: var(--color-neutral-900);

--warning: var(--color-accent-400);   /* Même couleur */
--warning-foreground: #ffffff;
```

**Usage:**
```tsx
// Badge accent
<Badge style={{
  background: 'var(--color-accent-50)',
  color: 'var(--color-accent-700)'
}} />

// Alert warning
<Alert variant="warning" style={{
  background: 'var(--color-accent-50)',
  borderLeft: '4px solid var(--warning)'
}}>
  Attention!
</Alert>

// Button accent
<Button variant="accent" style={{
  background: 'var(--accent)',
  color: 'var(--accent-foreground)'
}} />

// Icon warning
<Icon color="var(--color-accent-600)" />
```

**Où utilisé:**
- Badges niveaux (Débutant yellow)
- Warnings/Alerts
- Secondary CTAs
- Highlights

---

### 3️⃣ Teal - #2A9D8F

**Status:** 🆕 NOUVEAU (Success)

```css
/* Palette complète */
--color-success-50: #E6F7F5;   /* Très clair */
--color-success-100: #CCEFEB;
--color-success-200: #99DFD7;
--color-success-300: #66CFC3;
--color-success-400: #33BFAF;
--color-success-500: #2A9D8F;  /* ← VOTRE COULEUR */
--color-success-600: #227E73;
--color-success-700: #1A5E57;
--color-success-800: #113F3B;
--color-success-900: #091F1F;   /* Très foncé */

/* Tokens sémantiques */
--success: var(--color-success-500);  /* #2A9D8F */
--success-foreground: #ffffff;

--teal: var(--color-success-500);     /* Alias */
--teal-foreground: #ffffff;
```

**Usage:**
```tsx
// Success message
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

// Checkmark
<CheckIcon color="var(--color-success-600)" />
```

**Où utiliser:**
- Success alerts/messages
- Completion badges
- Progress indicators
- Positive feedback
- Validation success

**Migration:**
```tsx
// AVANT (ancien teal #9dbeba)
<Badge style={{ background: '#e8f2f0', color: '#9dbeba' }} />

// APRÈS (nouveau teal #2A9D8F)
<Badge style={{ 
  background: 'var(--color-success-50)', 
  color: 'var(--color-success-700)' 
}} />
```

---

### 4️⃣ Rouge - #EF4444

**Status:** 🆕 NOUVEAU (Error)

```css
/* Palette complète */
--color-error-50: #FEF2F2;     /* Très clair */
--color-error-100: #FEE2E2;
--color-error-200: #FECACA;
--color-error-300: #FCA5A5;
--color-error-400: #F87171;
--color-error-500: #EF4444;    /* ← VOTRE COULEUR */
--color-error-600: #DC2626;
--color-error-700: #B91C1C;
--color-error-800: #991B1B;
--color-error-900: #7F1D1D;     /* Très foncé */

/* Tokens sémantiques */
--error: var(--color-error-500);  /* #EF4444 */
--error-foreground: #ffffff;
```

**Usage:**
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

**Nouveau comportement:**
```tsx
// Maintenant disponible!
<form>
  <Input error={emailInvalid} />
  {emailInvalid && (
    <span style={{ color: 'var(--error)' }}>
      Email invalide
    </span>
  )}
</form>
```

---

### 5️⃣ Coral - #E76F51

**Status:** ⚠️ CHANGEMENT (Destructive)

**Ancien:** `--coral: #f49a76` (plus clair)  
**Nouveau:** `--color-coral-500: #E76F51` (plus saturé)

```css
/* Palette complète */
--color-coral-50: #fef2ee;     /* Très clair */
--color-coral-100: #fde4dc;
--color-coral-200: #fcc9ba;
--color-coral-300: #faad97;
--color-coral-400: #f19174;
--color-coral-500: #E76F51;    /* ← VOTRE COULEUR (remplace #f49a76) */
--color-coral-600: #d85a3c;
--color-coral-700: #b5472f;
--color-coral-800: #923522;
--color-coral-900: #6f2315;     /* Très foncé */

/* Tokens sémantiques */
--destructive: var(--color-coral-500);  /* #E76F51 */
--destructive-foreground: #ffffff;

--coral: var(--color-coral-500);        /* Alias */
--coral-foreground: #ffffff;
```

**Usage:**
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
    style={{ background: 'var(--color-coral-500)' }}
  >
    Annuler la session
  </Button>
</Modal>

// Destructive alert
<Alert variant="destructive" style={{
  background: 'var(--color-coral-50)',
  borderLeft: '4px solid var(--destructive)'
}}>
  ⚠️ Action irréversible
</Alert>
```

**Où utiliser:**
- Delete buttons
- Cancel session
- Destructive actions
- Irreversible warnings
- Remove/Unsubscribe

**Impact changement #f49a76 → #E76F51:**
- Couleur légèrement plus saturée/foncée
- Meilleur contraste (WCAG)
- Impact visuel: ~5% plus vibrant

---

## 🎨 Comparaison Visuelle

```
Ancien Système (partiel)
┌────────────────────────────────┐
│ #55A1B4  Bleu TLS      ████    │ ✅ Conservé
│ #F8B044  Jaune TLS     ████    │ ✅ Conservé
│ #9dbeba  Teal ancien   ████    │ ❌ Remplacé par #2A9D8F
│ #f49a76  Coral ancien  ████    │ ❌ Remplacé par #E76F51
│ (pas de rouge défini)          │ ❌ Manquant
└────────────────────────────────┘

Nouveau Système V2
┌────────────────────────────────┐
│ #55A1B4  Bleu TLS      ████    │ ✅ Primary
│ #F8B044  Jaune TLS     ████    │ ✅ Accent/Warning
│ #2A9D8F  Teal nouveau  ████    │ 🆕 Success
│ #EF4444  Rouge         ████    │ 🆕 Error
│ #E76F51  Coral nouveau ████    │ ⚠️ Destructive (changé)
└────────────────────────────────┘
```

---

## 🔄 Guide Migration

### Rechercher Hardcodé

```bash
# Chercher toutes vos couleurs sémantiques hardcodées
grep -r "#55A1B4" /components   # Primary
grep -r "#F8B044" /components   # Accent/Warning
grep -r "#2A9D8F" /components   # Success (nouveau)
grep -r "#EF4444" /components   # Error (nouveau)
grep -r "#E76F51" /components   # Destructive (nouveau)

# Chercher anciennes couleurs
grep -r "#9dbeba" /components   # Ancien teal
grep -r "#f49a76" /components   # Ancien coral
```

### Remplacements Standards

```tsx
// #55A1B4 → Primary
- background: '#55A1B4'
+ background: 'var(--primary)'
// OU
+ background: 'var(--color-primary-500)'

// #F8B044 → Accent/Warning
- color: '#F8B044'
+ color: 'var(--accent)'
// OU
+ color: 'var(--color-accent-400)'

// #2A9D8F → Success
- borderColor: '#2A9D8F'
+ borderColor: 'var(--success)'
// OU
+ borderColor: 'var(--color-success-500)'

// #EF4444 → Error
- color: '#EF4444'
+ color: 'var(--error)'
// OU
+ color: 'var(--color-error-500)'

// #E76F51 → Destructive
- background: '#E76F51'
+ background: 'var(--destructive)'
// OU
+ background: 'var(--color-coral-500)'
```

---

## 📊 Tableau Utilisation

### Quand Utiliser Chaque Couleur

| Contexte | Couleur Recommandée | Token |
|----------|---------------------|-------|
| **Navigation** | Bleu #55A1B4 | `--primary` |
| **CTA Principal** | Bleu #55A1B4 | `--primary` |
| **CTA Secondaire** | Orange #ED843A | `--secondary` |
| **Badge/Highlight** | Jaune #F8B044 | `--accent` |
| **Warning** | Jaune #F8B044 | `--warning` |
| **Success** | Teal #2A9D8F | `--success` |
| **Completion** | Teal #2A9D8F | `--success` |
| **Error** | Rouge #EF4444 | `--error` |
| **Validation** | Rouge #EF4444 | `--error` |
| **Delete** | Coral #E76F51 | `--destructive` |
| **Cancel** | Coral #E76F51 | `--destructive` |

### Exemples Composants

| Composant | Couleur Principale | Token |
|-----------|-------------------|-------|
| Button primary | Bleu | `--primary` |
| Button danger | Coral | `--destructive` |
| Alert success | Teal | `--success` |
| Alert warning | Jaune | `--warning` |
| Alert error | Rouge | `--error` |
| Badge niveau débutant | Jaune | `--color-accent-50` |
| Badge completed | Teal | `--color-success-100` |
| Input error | Rouge | `--error` |
| Progress bar | Bleu/Teal | `--primary` / `--success` |

---

## ✅ Validation Finale

### Checklist Couleurs

- [✅] #55A1B4 → `--color-primary-500` et `--primary`
- [✅] #F8B044 → `--color-accent-400` et `--accent` / `--warning`
- [✅] #2A9D8F → `--color-success-500` et `--success` (NOUVEAU)
- [✅] #EF4444 → `--color-error-500` et `--error` (NOUVEAU)
- [✅] #E76F51 → `--color-coral-500` et `--destructive`

### Test Visuel

```tsx
// Composant de test
export function ColorSemanticTest() {
  const colors = [
    { name: 'Primary #55A1B4', token: '--color-primary-500', hex: '#55A1B4' },
    { name: 'Accent #F8B044', token: '--color-accent-400', hex: '#F8B044' },
    { name: 'Success #2A9D8F', token: '--color-success-500', hex: '#2A9D8F' },
    { name: 'Error #EF4444', token: '--color-error-500', hex: '#EF4444' },
    { name: 'Destructive #E76F51', token: '--color-coral-500', hex: '#E76F51' },
  ];
  
  return (
    <div style={{ display: 'flex', gap: '1rem', padding: '2rem' }}>
      {colors.map(({ name, token, hex }) => (
        <div key={token}>
          <div style={{
            width: '100px',
            height: '100px',
            background: `var(${token})`,
            borderRadius: '0.5rem'
          }} />
          <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
            {name}
          </p>
          <code style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>
            {token}
          </code>
        </div>
      ))}
    </div>
  );
}
```

---

_Mapping Couleurs Sémantiques V2 | Créé: 22/02/2026_
