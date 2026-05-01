# 🎨 TLS Color Tokens V2 - START HERE

**Version:** 2.0 FINAL | **Date:** 22/02/2026  
**Status:** ✅ Production Ready

---

## ⚡ Quick Start (2 minutes)

### Étape 1 - Activer le Système

```tsx
// App.tsx ou index.tsx
import './styles/globals.css';         // ← Ancien (GARDÉ)
import './styles/globals-v2-final.css';  // ← Nouveau (AJOUTÉ)
```

### Étape 2 - Tester

```tsx
// Créer un composant de test
export function ColorTest() {
  return (
    <div style={{ display: 'flex', gap: '1rem', padding: '2rem' }}>
      {/* Primary #55A1B4 */}
      <div style={{ 
        width: '100px', height: '100px', 
        background: 'var(--color-primary-500)' 
      }}>Bleu</div>
      
      {/* Accent #F8B044 */}
      <div style={{ 
        width: '100px', height: '100px', 
        background: 'var(--color-accent-400)' 
      }}>Jaune</div>
      
      {/* Success #2A9D8F */}
      <div style={{ 
        width: '100px', height: '100px', 
        background: 'var(--color-success-500)' 
      }}>Teal</div>
      
      {/* Error #EF4444 */}
      <div style={{ 
        width: '100px', height: '100px', 
        background: 'var(--color-error-500)' 
      }}>Rouge</div>
      
      {/* Destructive #E76F51 */}
      <div style={{ 
        width: '100px', height: '100px', 
        background: 'var(--color-error-600)' 
      }}>Coral</div>
    </div>
  );
}
```

### Étape 3 - Valider ✅

- [ ] Les 5 couleurs affichent correctement
- [ ] Anciens tokens fonctionnent (`--primary`, `--primary-50`, etc.)
- [ ] Nouveaux tokens fonctionnent (`--color-primary-500`, etc.)
- [ ] Aucune régression visuelle

**C'est tout ! Le système est actif. Zéro breaking change.** 🎉

---

## 🎨 Convention Finale TLS

### 4 Couleurs TLS UNIQUEMENT

```css
/* 1. PRIMARY - Bleu TLS #55A1B4 */
--color-primary-50 à 900

/* 2. SECONDARY - Orange TLS #ED843A */
--color-secondary-50 à 900

/* 3. ACCENT - Jaune TLS #F8B044 */
--color-accent-50 à 900

/* 4. SUCCESS - Teal #2A9D8F */
--color-success-50 à 900

/* 5. ERROR - Rouge #EF4444 */
--color-error-50 à 900

/* + NEUTRAL - Grays */
--color-neutral-50 à 900
```

### Tokens Sémantiques

```css
/* Brand */
--primary: var(--color-primary-500)      /* #55A1B4 */
--secondary: var(--color-secondary-500)  /* #ED843A */
--accent: var(--color-accent-400)        /* #F8B044 */

/* States */
--success: var(--color-success-500)      /* #2A9D8F */
--error: var(--color-error-500)          /* #EF4444 */
--warning: var(--color-accent-400)       /* Alias → #F8B044 */

/* Special */
--destructive: var(--color-error-600)    /* Darker red for destructive */
--info: var(--color-primary-600)         /* Alias → #4A8FA1 */
```

### ❌ PAS de Doublons / Coral Retiré

```css
/* ❌ SUPPRIMÉ - Pas de familles séparées */
--color-teal-*    /* Remplacé par --color-success-* */
--color-coral-*   /* PAS dans design system TLS */
--color-warning-* /* Alias de --color-accent-* */
--color-info-*    /* Alias de --color-primary-* */

/* ❌ RETIRÉ */
#E76F51           /* Coral - Non présent dans TLS */
```

---

## 📖 Usage Recommandé

### ✅ Composants Standards → Sémantique

```tsx
// Button primary
<Button style={{ 
  background: 'var(--primary)',
  color: 'var(--primary-foreground)' 
}} />

// Alert success
<Alert style={{ 
  background: 'var(--success)',
  color: 'var(--success-foreground)' 
}} />

// Input error
<Input error style={{ 
  borderColor: 'var(--error)' 
}} />
```

### ✅ Variantes Custom → Palette

```tsx
// Badge light
<Badge style={{ 
  background: 'var(--color-success-50)',
  color: 'var(--color-success-700)'
}} />

// Card avec accent border
<Card style={{ 
  borderLeft: '4px solid var(--color-accent-400)'
}} />

// Gradient custom
<div style={{ 
  background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500))'
}} />
```

### ❌ À Éviter

```tsx
// ❌ Hardcodé
<Button style={{ background: '#55A1B4' }} />

// ❌ Utiliser palette pour composants standards
<Button style={{ background: 'var(--color-primary-500)' }} />
// → Utiliser var(--primary) à la place
```

---

## 🎯 Mapping Vos 4 Couleurs TLS

| # | Hex | Nom | Token Palette | Token Sémantique |
|---|-----|-----|---------------|------------------|
| 1️⃣ | **#55A1B4** | Bleu TLS | `--color-primary-500` | `--primary` |
| 2️⃣ | **#F8B044** | Jaune TLS | `--color-accent-400` | `--accent`, `--warning` |
| 3️⃣ | **#2A9D8F** | Teal | `--color-success-500` | `--success` |
| 4️⃣ | **#EF4444** | Rouge | `--color-error-500` | `--error`, `--destructive` |

**❌ Retiré:** #E76F51 (Coral) - Non présent dans design system TLS

### Token Destructive

**Décision:** Alias de error-600 (red darker)

```css
/* Palette ERROR */
--color-error-500: #EF4444;  /* Base rouge */
--color-error-600: #DC2626;  /* Darker red */

/* Token sémantique */
--destructive: var(--color-error-600);  /* Darker red for destructive */
```

**Usage:**
```tsx
// Delete button
<Button variant="destructive" style={{ 
  background: 'var(--destructive)' 
}}>
  Supprimer
</Button>

// Ou error direct
<Button style={{ 
  background: 'var(--error)' 
}}>
  Annuler session
</Button>
```

---

## 🚀 Migration Progressive (Optionnelle)

### Chercher Hardcodé

```bash
grep -r "#55A1B4" /components  # Primary
grep -r "#F8B044" /components  # Accent
grep -r "#2A9D8F" /components  # Success
grep -r "#EF4444" /components  # Error

# Anciens à migrer
grep -r "#9dbeba" /components  # Ancien teal
grep -r "#f49a76" /components  # Ancien coral
grep -r "#E76F51" /components  # Coral (à retirer)
```

### Remplacer

```tsx
// #55A1B4 → Primary
- background: '#55A1B4'
+ background: 'var(--primary)'

// #F8B044 → Accent/Warning
- color: '#F8B044'
+ color: 'var(--accent)'

// #2A9D8F → Success
- borderColor: '#2A9D8F'
+ borderColor: 'var(--success)'

// #EF4444 → Error
- color: '#EF4444'
+ color: 'var(--error)'

// #E76F51 (Coral) → À retirer (non TLS)
- background: '#E76F51'
+ background: 'var(--error)'  // Ou var(--destructive)
```

---

## 📋 Checklist

### Activation
- [ ] Import `globals-v2-final.css` après `globals.css`
- [ ] Test visuel 5 couleurs OK
- [ ] Anciens tokens fonctionnent
- [ ] Nouveaux tokens fonctionnent

### Validation
- [ ] `--color-primary-500` = #55A1B4 ✅
- [ ] `--color-accent-400` = #F8B044 ✅
- [ ] `--color-success-500` = #2A9D8F ✅
- [ ] `--color-error-500` = #EF4444 ✅
- [ ] `--color-error-600` = #E76F51 ✅
- [ ] `--warning` = alias `--accent` ✅
- [ ] `--info` = alias `--primary-600` ✅

### Convention
- [ ] Pas de `--color-teal-*`
- [ ] Pas de `--color-coral-*`
- [ ] Pas de `--color-warning-*` (alias)
- [ ] Pas de `--color-info-*` (alias)

---

## 🔗 Documentation Complète

### Guides Détaillés
- **Migration Plan:** `/docs/COLOR-TOKENS-MIGRATION-FINAL.md`
- **Semantic Mapping:** `/docs/COLOR-SEMANTIC-MAPPING-FINAL.md`
- **Quick Reference:** `/docs/COLOR-TOKENS-QUICK-REFERENCE.md`

### Fichiers CSS
- **Actuel:** `/styles/globals.css` (GARDÉ)
- **Nouveau:** `/styles/globals-v2-final.css` (AJOUTÉ)

---

## ❓ FAQ Express

**Q: Où est #E76F51 (Coral) ?**  
R: Retiré. Non présent dans le design system TLS. `--destructive` = `--error-600` (darker red).

**Q: Pourquoi pas de `--color-warning-*` ?**  
R: Warning = Accent (#F8B044). Pas besoin de dupliquer la palette.

**Q: Pourquoi pas de `--color-info-*` ?**  
R: Info = Primary variant. Alias `--info: var(--color-primary-600)`.

**Q: Les anciens tokens marchent ?**  
R: OUI. Approche 100% additive. `--primary`, `--primary-50`, etc. fonctionnent.

**Q: Quand supprimer les anciens ?**  
R: Après migration complète du code (optionnel, pas obligatoire).

---

_Start Here V2 FINAL | 22/02/2026 | Convention TLS Canonique_
