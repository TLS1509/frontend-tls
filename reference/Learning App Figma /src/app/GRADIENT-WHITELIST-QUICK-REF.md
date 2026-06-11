# 🎨 GRADIENTS WHITELIST — RÉFÉRENCE RAPIDE

**Date :** 11 avril 2026  
**Version :** 1.0  
**Statut :** ✅ Validé

---

## 🚀 RÉSUMÉ EXPRESS

- **Avant :** ~90+ gradients définis
- **Après :** **14 gradients** whitelist stricte
- **Archivés :** 68 gradients inutilisés
- **Réduction :** -76% de tokens CSS

---

## 📋 WHITELIST COMPLÈTE (14 GRADIENTS)

### 🎨 UI PRIMITIVES (5 gradients)

```css
/* 1. PRIMARY — Boutons principaux, icônes, progress bars */
--gradient-primary: linear-gradient(135deg, #55A1B4 0%, #4A8FA1 50%, #3D7786 100%);

/* 2. SECONDARY — Boutons secondaires, badges */
--gradient-secondary: linear-gradient(156.232deg, rgb(241, 138, 76) 0%, rgb(192, 105, 32) 100%);

/* 3. WARM — Progress bars, sliders (exception orange+jaune) */
--gradient-warm: linear-gradient(156.232deg, rgb(241, 138, 76) 0%, rgb(248, 176, 68) 100%);

/* 4. ACCENT — Boutons accent, icônes */
--gradient-accent: linear-gradient(135deg, #FFD791 0%, #F8B044 100%);

/* 5. BRAND — Boutons spéciaux, CTA */
--gradient-brand: linear-gradient(156.232deg, rgb(49, 95, 107) 0%, rgb(61, 119, 134) 30%, rgb(74, 143, 161) 60%, rgb(85, 161, 180) 100%);
```

### ⚠️ SÉMANTIQUES (4 gradients)

```css
/* 6. SUCCESS — Validation, success states */
--gradient-success: linear-gradient(135deg, #96C3CF 0%, #73AFBF 50%, #55A1B4 100%);

/* 7. WARNING — Modals warning, toasts */
--gradient-warning: linear-gradient(135deg, #FFD791 0%, #FFC15A 50%, #F8B044 100%);

/* 8. DESTRUCTIVE — Modals destructive, toasts */
--gradient-destructive: linear-gradient(135deg, #F59A5F 0%, #F18A4C 50%, #ED843A 100%);

/* 9. INFO — Modals info, toasts */
--gradient-info: linear-gradient(135deg, #73AFBF 0%, #4A8FA1 50%, #3D7786 100%);
```

### 📝 TEXTE UNIQUEMENT (3 gradients)

```css
/* 10. TLS TEXT — Texte hero, titres majeurs */
--gradient-tls-text: linear-gradient(135deg, rgb(85, 161, 180) 0%, rgb(237, 132, 58) 50%, rgb(248, 176, 68) 100%);

/* 11. TLS TEXT COOL — Texte hero bleu */
--gradient-tls-text-cool: linear-gradient(135deg, rgb(85, 161, 180) 0%, rgb(123, 196, 212) 100%);

/* 12. TLS TEXT HERO LIGHT — Texte hero avec opacity */
--gradient-tls-text-hero-light: linear-gradient(120deg, rgba(85, 161, 180, 0.85) 0%, rgba(237, 132, 58, 0.85) 50%, rgba(248, 176, 68, 0.85) 100%);
```

### 🏞️ BACKGROUNDS/HERO (2 gradients)

```css
/* 13. CIRCULAR TLS — Pages d'authentification uniquement */
--gradient-circular-tls: radial-gradient(circle at 0% 0%, rgb(85, 161, 180) 0%, rgb(58, 112, 125) 50%, rgb(45, 87, 97) 75%, rgb(31, 62, 69) 100%);

/* 14. TLS — Hero sections, page BG majeurs */
--gradient-tls: linear-gradient(156.232deg, rgb(61, 119, 134) 0%, rgb(74, 143, 161) 30%, rgb(85, 161, 180) 50%, rgb(237, 132, 58) 85%, rgb(248, 176, 68) 100%);

/* 15. TLS SUBTLE — Background pages légers */
--gradient-tls-subtle: linear-gradient(156.232deg, rgba(85, 161, 180, 0.05) 0%, rgba(237, 132, 58, 0.05) 100%);
```

---

## 🎯 RÈGLES D'UTILISATION

### ✅ AUTORISÉ

| Gradient | Où ? | Exemple CSS |
|----------|------|-------------|
| `primary`, `secondary`, `brand` | Boutons, badges, icônes | `background: var(--gradient-primary);` |
| `warm` | Progress bars, sliders | `background: var(--gradient-warm);` |
| `accent` | Boutons accent, CTA secondaires | `background: var(--gradient-accent);` |
| `success`, `warning`, `destructive`, `info` | Modals, toasts, alerts | `background: var(--gradient-success);` |
| `tls-text`, `tls-text-cool`, `tls-text-hero-light` | Texte hero UNIQUEMENT | `background: var(--gradient-tls-text); -webkit-background-clip: text; -webkit-text-fill-color: transparent;` |
| `circular-tls` | Background pages auth | `background: var(--gradient-circular-tls);` |
| `tls`, `tls-subtle` | Hero sections, page BG | `background: var(--gradient-tls);` |

### ❌ INTERDIT

| Gradient | Sur quoi ? | Pourquoi ? |
|----------|-----------|-----------|
| Gradients multicolores TLS | Boutons, badges, inputs | Règle design : mono-couleur uniquement |
| Gradients texte | Boutons, badges, UI primitives | Réservé au texte hero |
| `warm` | Badges, boutons normaux | Exception progress bars/sliders uniquement |
| `tls`, `circular-tls` | Boutons, inputs | Réservé backgrounds/hero |
| Gradients custom inline | Partout | Utiliser tokens CSS uniquement |

---

## 💡 EXEMPLES D'USAGE

### Bouton Primary

```tsx
<button
  style={{
    background: 'var(--gradient-primary)',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: 'var(--radius-lg)',
    boxShadow: '0 4px 12px rgba(85, 161, 180, 0.3)',
  }}
>
  Continuer
</button>
```

### Progress Bar (exception orange+jaune)

```tsx
<div style={{ width: '100%', height: '12px', background: 'var(--neutral-100)', borderRadius: 'var(--radius-full)' }}>
  <div
    style={{
      width: '68%',
      height: '100%',
      background: 'var(--gradient-warm)', // Exception validée
      borderRadius: 'var(--radius-full)',
    }}
  />
</div>
```

### Texte Hero avec Gradient

```tsx
<h1
  style={{
    fontFamily: 'var(--font-display)',
    fontSize: 'var(--text-6xl)',
    fontWeight: 'var(--font-black)',
    background: 'var(--gradient-tls-text)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  }}
>
  Bienvenue dans The Learning Society
</h1>
```

### Modal Success

```tsx
<div style={{ background: 'white', padding: 'var(--space-8)', borderRadius: 'var(--radius-2xl)' }}>
  <div
    style={{
      width: '80px',
      height: '80px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--gradient-success)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <CheckCircle className="w-10 h-10 text-white" />
  </div>
  <h3>Félicitations !</h3>
  <p>Votre session a été réservée avec succès.</p>
</div>
```

### Page Auth Background

```tsx
<div
  style={{
    minHeight: '100vh',
    background: 'var(--gradient-circular-tls)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  {/* Formulaire login */}
</div>
```

---

## 🔄 MIGRATIONS COMMUNES

### Migration 1 : Gradient Primary Ocean → Success

```tsx
// ❌ AVANT (inutilisé)
background: 'var(--gradient-primary-ocean)'

// ✅ APRÈS (whitelist)
background: 'var(--gradient-success)'
```

### Migration 2 : Gradient Custom → Token

```tsx
// ❌ AVANT (inline custom)
background: 'linear-gradient(135deg, #55A1B4, #3D7786)'

// ✅ APRÈS (token)
background: 'var(--gradient-primary)'
```

### Migration 3 : Gradient Multi-Shades → Simplifié

```tsx
// ❌ AVANT (multi-shades inutilisé)
background: 'var(--gradient-primary-spectrum)'

// ✅ APRÈS (simplifié whitelist)
background: 'var(--gradient-primary)'
```

### Migration 4 : Gradient Text Hero → Cool

```tsx
// ❌ AVANT (inutilisé)
background: 'var(--gradient-tls-text-hero)'

// ✅ APRÈS (whitelist)
background: 'var(--gradient-tls-text-hero-light)'
```

---

## 🛠️ BONNES PRATIQUES

### ✅ DO

1. **Utiliser les tokens CSS** : Toujours `var(--gradient-xxx)`
2. **Respecter la catégorie** : Texte → gradients texte, UI → gradients UI
3. **Progress bars exception** : Utiliser `gradient-warm` (orange+jaune)
4. **Tester le contraste** : Vérifier lisibilité texte blanc sur gradient
5. **Documenter usage custom** : Si besoin inline, documenter pourquoi

### ❌ DON'T

1. **Gradients inline non documentés** : Éviter `linear-gradient(...)` direct
2. **Mélanger catégories** : Ne pas utiliser gradients texte sur boutons
3. **Créer nouveaux gradients** : Utiliser whitelist uniquement
4. **Gradients multicolores sur UI** : Sauf progress bars + warm
5. **Oublier les box-shadow** : Ajouter glow coordonné avec gradient

---

## 📊 COMPARAISON AVANT/APRÈS

| Métrique | Avant | Après | Gain |
|----------|-------|-------|------|
| **Total gradients définis** | ~90+ | 14 | -76 gradients |
| **Taille CSS (gradients)** | ~8KB | ~2KB | -75% |
| **Catégories** | 12 catégories | 4 catégories | -67% |
| **Gradients inutilisés** | 68 | 0 | -100% |
| **Maintenabilité** | ⭐⭐ | ⭐⭐⭐⭐⭐ | +150% |

---

## 🔗 RESSOURCES

- **Audit complet** : `/GRADIENT-AUDIT-REPORT.md`
- **Checklist cleanup** : `/GRADIENT-CLEANUP-CHECKLIST.md`
- **CSV export** : `/gradient-audit-table.csv`
- **Archive gradients** : `/archive/css/gradients-legacy.css` (après cleanup)
- **Fichier whitelist** : `/styles/gradients.css` (après cleanup)

---

## 📞 SUPPORT

**Questions ?** Consulter :
1. **Audit complet** : Toutes les décisions documentées
2. **Checklist** : Plan étape par étape
3. **Cette référence** : Usage quotidien

**Issues ?**
- Gradient manquant → Vérifier whitelist (14 gradients)
- Gradient cassé → Vérifier import `@import './gradients.css'`
- Besoin nouveau gradient → Valider avec équipe design

---

**Dernière mise à jour :** 11 avril 2026  
**Validé par :** Design System Team
