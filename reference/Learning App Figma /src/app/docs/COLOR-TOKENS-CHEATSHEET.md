# 🎨 TLS Color Tokens - Cheatsheet

**Version:** 2.0 FINAL | **Convention:** Canonique TLS

---

## ⚡ Quick Setup (30 secondes)

```tsx
// App.tsx
import './styles/globals.css';         // Ancien
import './styles/globals-v2-final.css';  // Nouveau ← AJOUTER
```

---

## 🎨 4 Couleurs TLS

| Hex | Token Palette | Token Sémantique |
|-----|---------------|------------------|
| **#55A1B4** | `--color-primary-500` | `--primary` |
| **#F8B044** | `--color-accent-400` | `--accent`, `--warning` |
| **#2A9D8F** | `--color-success-500` | `--success` |
| **#EF4444** | `--color-error-500` | `--error`, `--destructive` |

**❌ #E76F51 Retiré** (non TLS)

---

## 📋 Usage Express

### Composants Standards → Sémantique
```tsx
<Button style={{ background: 'var(--primary)' }} />
<Alert style={{ background: 'var(--success)' }} />
<Input error style={{ borderColor: 'var(--error)' }} />
```

### Variantes Custom → Palette
```tsx
<Badge style={{ 
  background: 'var(--color-success-50)',
  color: 'var(--color-success-700)'
}} />
```

---

## ✅ Convention FINALE

**Familles Palette:**
- `--color-primary-*` (Bleu #55A1B4)
- `--color-secondary-*` (Orange #ED843A)
- `--color-accent-*` (Jaune #F8B044)
- `--color-success-*` (Teal #2A9D8F)
- `--color-error-*` (Rouge #EF4444)

**Tokens Sémantiques:**
```css
--primary, --secondary, --accent
--success, --error, --destructive
--warning (alias), --info (alias)
```

**❌ Pas de:**
- `--color-teal-*` (= success)
- `--color-coral-*` (non TLS)
- `--color-warning-*` (alias)
- `--color-info-*` (alias)
- #E76F51 retiré

---

## 🔄 Migration Rapide

```tsx
// Hardcodé → Token
- background: '#55A1B4'
+ background: 'var(--primary)'

// Ancien teal → Nouveau
- color: '#9dbeba'
+ color: 'var(--success)'

// Ancien coral / #E76F51 → Retirer
- background: '#f49a76'
+ background: 'var(--error)'

- background: '#E76F51'
+ background: 'var(--error)'  // Ou --destructive
```

---

## 🔗 Docs Complètes

- **START HERE:** `/docs/COLOR-TOKENS-START-HERE-FINAL.md` ⭐
- **Migration:** `/docs/COLOR-TOKENS-MIGRATION-PLAN-FINAL.md`
- **Mapping:** `/docs/COLOR-SEMANTIC-MAPPING-FINAL.md`

---

_Cheatsheet | Convention TLS Canonique | 22/02/2026_
