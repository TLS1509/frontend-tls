# 🎨 Color Tokens - Quick Reference

**Version:** 2.0.0 | **Status:** Production Ready

---

## 🚀 TL;DR

```tsx
// ✅ BON - Utiliser tokens sémantiques
<Button style={{ background: 'var(--primary)' }} />
<Card style={{ background: 'var(--card)' }} />

// ✅ BON - Palette pour variantes
<div style={{ background: 'var(--color-primary-50)' }} />

// ❌ MAUVAIS - Hardcodé
<Button style={{ background: '#55A1B4' }} />
```

---

## 📖 3 Types de Tokens

### 1. Palette (--color-*) - Base Colors
**Ne PAS utiliser directement sauf pour variantes custom**

```css
--color-primary-50    /* Très clair */
--color-primary-500   /* Base brand */
--color-primary-900   /* Très foncé */
```

### 2. Sémantique (--*) - Contextual
**Utiliser dans les composants**

```css
--primary             /* Couleur principale */
--background          /* Fond page */
--card                /* Fond carte */
--border              /* Bordure */
```

### 3. Alias (--primary-*) - Legacy
**⚠️ Deprecated - Rétrocompatibilité**

```css
--primary-50          /* → --color-primary-50 */
--primary-500         /* → --color-primary-500 */
```

---

## 🎨 Palette Complète

### Primary - Bleu TLS (#55A1B4)
```
50   #E8F4F7  ████████  Très clair
100  #DCEBEF  ████████
200  #B9D7DF  ████████
300  #96C3CF  ████████
400  #73AFBF  ████████
500  #55A1B4  ████████  ← BASE
600  #4A8FA1  ████████
700  #3D7786  ████████
800  #2F5F6A  ████████
900  #1F3E45  ████████  Très foncé
```

### Secondary - Orange TLS (#ED843A)
```
50   #FFF3EB  ████████  Très clair
100  #FDDCC7  ████████
200  #FCBB93  ████████
300  #F59A5F  ████████
400  #F18A4C  ████████
500  #ED843A  ████████  ← BASE
600  #C06920  ████████
700  #8F5017  ████████
800  #5E3710  ████████
900  #3B2109  ████████  Très foncé
```

### Accent - Jaune TLS (#F8B044)
```
50   #FFF9EE  ████████  Très clair
100  #FFECC8  ████████
200  #FFD791  ████████
300  #FFC15A  ████████
400  #F8B044  ████████  ← BASE
500  #DF9E3D  ████████
600  #C68D36  ████████
700  #AE7B30  ████████
800  #956A29  ████████
900  #7C5822  ████████  Très foncé
```

### Neutral - Grays
```
50   #F5F8F8  ████████  Très clair
100  #EEF6F8  ████████
200  #E0E8EA  ████████
300  #C8D4D7  ████████
400  #9AABB0  ████████
500  #6B7D82  ████████  ← BASE
600  #535B62  ████████
700  #3A474B  ████████
800  #2A3538  ████████
900  #252B37  ████████  Très foncé (text)
```

### Success - Teal (#9dbeba)
```
50-900  Same as --color-teal-*
300 = BASE
```

### Warning - Yellow (#F8B044)
```
50-900  Same as --color-accent-*
400 = BASE
```

### Error - Coral (#f49a76)
```
50-900  Same as --color-coral-*
400 = BASE
```

### Info - Blue (#4A8FA1)
```
50-900  Subset of --color-primary-*
400 = BASE
```

---

## 💡 Tokens Sémantiques

### Base
```css
--background          #ffffff
--foreground          var(--color-neutral-900)
--surface             #ffffff
```

### Components
```css
--card                #ffffff
--card-foreground     var(--color-neutral-900)

--popover             #ffffff
--popover-foreground  var(--color-neutral-900)

--muted               var(--color-neutral-50)
--muted-foreground    var(--color-neutral-500)
```

### States
```css
--primary             var(--color-primary-500)
--primary-foreground  #f8fbfd

--secondary           var(--color-secondary-500)
--secondary-foreground #f8fbfd

--accent              var(--color-accent-400)
--accent-foreground   var(--color-neutral-900)

--success             var(--color-success-300)
--success-foreground  var(--color-neutral-900)

--warning             var(--color-warning-400)
--warning-foreground  #f8fbfd

--error               var(--color-error-400)
--error-foreground    var(--color-neutral-900)

--info                var(--color-info-400)
--info-foreground     #f8fbfd
```

### Interactive
```css
--border              rgba(0, 0, 0, 0.1)
--border-hover        rgba(0, 0, 0, 0.2)

--input               transparent
--input-background    var(--color-neutral-50)
--input-border        rgba(0, 0, 0, 0.15)

--ring                var(--color-primary-500)
```

---

## 📚 Exemples d'Usage

### Button
```tsx
// Primary
<button style={{
  background: 'var(--primary)',
  color: 'var(--primary-foreground)'
}}>
  Click
</button>

// Secondary
<button style={{
  background: 'var(--secondary)',
  color: 'var(--secondary-foreground)'
}}>
  Cancel
</button>

// Variant light
<button style={{
  background: 'var(--color-primary-50)',
  color: 'var(--color-primary-700)',
  border: '1px solid var(--color-primary-500)'
}}>
  Light
</button>
```

### Card
```tsx
<div style={{
  background: 'var(--card)',
  color: 'var(--card-foreground)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius-lg)'
}}>
  <h3 style={{ color: 'var(--primary)' }}>Title</h3>
  <p style={{ color: 'var(--muted-foreground)' }}>Description</p>
</div>
```

### Badge
```tsx
// Success
<span style={{
  background: 'var(--color-success-50)',
  color: 'var(--color-success-700)',
  border: '1px solid var(--color-success-300)'
}}>
  Completed
</span>

// Warning
<span style={{
  background: 'var(--color-warning-50)',
  color: 'var(--color-warning-800)',
  border: '1px solid var(--color-warning-400)'
}}>
  Pending
</span>

// Error
<span style={{
  background: 'var(--color-error-50)',
  color: 'var(--color-error-700)',
  border: '1px solid var(--color-error-400)'
}}>
  Failed
</span>
```

### Input
```tsx
<input style={{
  background: 'var(--input-background)',
  color: 'var(--foreground)',
  border: '1px solid var(--input-border)',
  ':focus': {
    outline: '2px solid var(--ring)',
    outlineOffset: '2px'
  }
}} />
```

### Alert
```tsx
// Success
<div style={{
  background: 'var(--color-success-50)',
  color: 'var(--color-success-900)',
  borderLeft: '4px solid var(--color-success-500)'
}}>
  Success message
</div>

// Error
<div style={{
  background: 'var(--color-error-50)',
  color: 'var(--color-error-900)',
  borderLeft: '4px solid var(--color-error-500)'
}}>
  Error message
</div>
```

### Gradient
```tsx
// Predefined
<div style={{
  background: 'var(--gradient-tls)'
}} />

// Custom avec palette
<div style={{
  background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500))'
}} />
```

---

## 🎯 Règles d'Or

### ✅ À FAIRE

1. **Tokens sémantiques pour composants standards**
   ```tsx
   <Button style={{ background: 'var(--primary)' }} />
   ```

2. **Palette pour variantes custom**
   ```tsx
   <Badge style={{ background: 'var(--color-success-50)' }} />
   ```

3. **Cohérence dans un composant**
   ```tsx
   // Tout sémantique ✅
   { background: 'var(--card)', color: 'var(--card-foreground)' }
   
   // Tout palette ✅
   { background: 'var(--color-primary-50)', color: 'var(--color-primary-700)' }
   ```

### ❌ À ÉVITER

1. **Hardcodé**
   ```tsx
   <Button style={{ background: '#55A1B4' }} /> // ❌
   ```

2. **Mélanger conventions**
   ```tsx
   {
     background: 'var(--primary)',           // Sémantique
     border: '1px solid var(--color-primary-500)'  // Palette
   } // ❌ Incohérent
   ```

3. **Utiliser palette pour composants standards**
   ```tsx
   <Button style={{ background: 'var(--color-primary-500)' }} />
   // ❌ Utiliser var(--primary) à la place
   ```

---

## 🔄 Migration Rapide

### Étape 1 - Trouver
```bash
# Chercher hardcodé
grep -r "#55A1B4" /components
grep -r "#ED843A" /components
grep -r "#F8B044" /components
```

### Étape 2 - Remplacer
```tsx
// Avant
background: '#55A1B4'

// Après (sémantique)
background: 'var(--primary)'

// Après (palette si variante)
background: 'var(--color-primary-500)'
```

### Étape 3 - Tester
```bash
# Visuel
npm run dev
# Vérifier Dashboard, Parcours, Coaching

# Lighthouse
npm run lighthouse
```

---

## 🎨 Générateur de Code

### Fonction Helper
```tsx
// utils/colors.ts
export const getColorToken = (
  category: 'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'warning' | 'error',
  shade: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
) => {
  return `var(--color-${category}-${shade})`;
};

// Usage
<div style={{ background: getColorToken('primary', 50) }} />
// → background: 'var(--color-primary-50)'
```

### Badge Helper
```tsx
export const getBadgeStyle = (variant: 'success' | 'warning' | 'error' | 'info') => {
  const colors = {
    success: {
      bg: 'var(--color-success-50)',
      text: 'var(--color-success-700)',
      border: 'var(--color-success-300)'
    },
    warning: {
      bg: 'var(--color-warning-50)',
      text: 'var(--color-warning-800)',
      border: 'var(--color-warning-400)'
    },
    error: {
      bg: 'var(--color-error-50)',
      text: 'var(--color-error-700)',
      border: 'var(--color-error-400)'
    },
    info: {
      bg: 'var(--color-info-50)',
      text: 'var(--color-info-700)',
      border: 'var(--color-info-300)'
    }
  };
  
  return colors[variant];
};

// Usage
<Badge style={getBadgeStyle('success')}>Completed</Badge>
```

---

## 📋 Checklist Composant

```
Avant de commit:

Style
- [ ] Aucun hardcodé (#55A1B4)
- [ ] Tokens cohérents (sémantique OU palette)
- [ ] Hover/focus states OK
- [ ] Contraste WCAG AA (4.5:1 text, 3:1 UI)

Tests
- [ ] Visuel OK desktop
- [ ] Visuel OK mobile
- [ ] Pas de régression autres composants

Documentation
- [ ] Commentaires si usage palette custom
- [ ] Storybook/Showcase updated (si applicable)
```

---

## 🔗 Liens

- **Plan complet:** `/docs/COLOR-TOKENS-MIGRATION-PLAN.md`
- **Fichier V2:** `/styles/globals-v2-tokens.css`
- **Design System:** `/docs/01-DESIGN-SYSTEM.md`

---

_Référence: V2.0.0 | Créé: 22/02/2026_
