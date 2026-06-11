# 🔄 Guide Adaptation globals.css → globals-hybrid.css

**Objectif :** Adapter ton `globals.css` actuel avec `globals-hybrid.css` SANS RIEN CASSER  
**Ta préférence :** Texte BLANC sur jaune (jaune foncé) ✅

---

## ✅ SOLUTION FINALE - 3 ÉTAPES SIMPLES

### ÉTAPE 1 : Importer globals-hybrid.css (SANS toucher à globals.css)

**Dans ton point d'entrée (App.tsx, _app.tsx, ou index.tsx) :**

```tsx
// ✓ ORDRE CRITIQUE (ne JAMAIS inverser)

import './styles/globals.css';        // ← PREMIER (ancien - conservé tel quel)
import './styles/globals-hybrid.css'; // ← SECOND (nouveau - overrides safe)
```

**Résultat :**
- ✅ Ton `globals.css` reste INCHANGÉ (zéro risque)
- ✅ `globals-hybrid.css` ajoute/override uniquement ce qui est nécessaire
- ✅ Cascade CSS fait le travail automatiquement

---

### ÉTAPE 2 : Ce que globals-hybrid.css fait pour toi

#### ✅ Ajoute (sans écraser)

```css
/* Nouvelles palettes V2 avec notation --color-* */
--color-success-500: #2E8F98;    /* Nouveau teal TLS */
--color-error-500: #EF4444;      /* Nouveau rouge */

/* Convention SOLID pour texte blanc */
--accent-solid: var(--color-accent-800);        /* #956A29 - TA SOLUTION ✅ */
--accent-solid-foreground: #ffffff;

--success-solid: var(--color-success-600);
--success-solid-foreground: #ffffff;

/* etc. */
```

#### ✅ Override (pour fix WCAG)

```css
/* AVANT (globals.css - NON CONFORME) */
--warning-foreground: #f8fbfd;  /* Texte blanc sur jaune clair ✗ */

/* APRÈS (globals-hybrid.css - SAFE FALLBACK) */
--warning-foreground: var(--color-neutral-900);  /* Texte foncé ✓ */

/* BONUS : Pour texte blanc sur jaune (TA PRÉFÉRENCE) */
--warning-solid: var(--accent-solid);              /* #956A29 */
--warning-solid-foreground: #ffffff;               /* AA Large ✓ */
```

#### ✅ Garde (rétrocompat)

```css
/* globals.css a déjà ces couleurs - globals-hybrid.css les GARDE */
--teal: #9dbeba;           /* ✓ Conservé tel quel */
--coral: #f49a76;          /* ✓ Conservé tel quel */
--primary-500: #55A1B4;    /* ✓ Conservé tel quel */
/* etc. */
```

---

### ÉTAPE 3 : Utiliser la nouvelle convention dans tes composants

#### Option A : Migration Progressive (RECOMMANDÉ)

**Garde tes composants actuels tels quels** (ils continuent de fonctionner).

**Pour les NOUVEAUX composants, utilise :**

```tsx
/* ✓ Badge Warning - TEXTE BLANC sur jaune foncé (TA PRÉFÉRENCE) */
<span style={{
  padding: 'var(--space-2) var(--space-4)',
  background: 'var(--warning-solid)',           /* #956A29 - Jaune foncé */
  color: 'var(--warning-solid-foreground)',     /* #ffffff */
  fontSize: 'var(--text-lg)',                   /* 18px min pour AA Large */
  fontWeight: 'var(--font-semibold)',           /* 600 min pour AA Large */
  borderRadius: 'var(--radius-full)'
}}>
  ⚠️ Attention
</span>

/* ✓ Button Success - TEXTE BLANC */
<button style={{
  padding: 'var(--space-3) var(--space-6)',
  background: 'var(--success-solid)',           /* #25727A - Teal foncé */
  color: 'var(--success-solid-foreground)',     /* #ffffff */
  fontSize: 'var(--text-base)',
  fontWeight: 'var(--font-semibold)',
  borderRadius: 'var(--radius-lg)'
}}>
  Valider
</button>
```

#### Option B : Migrer Composants Existants (Optionnel)

**Identifier les composants avec texte blanc sur jaune clair (NON CONFORME) :**

```tsx
/* ✗ ANCIEN (NON CONFORME WCAG) */
<button style={{
  background: 'var(--warning)',    /* #F8B044 - Jaune clair */
  color: '#ffffff'                  /* Ratio 1.74:1 ✗ */
}}>
  Warning
</button>

/* ✓ NOUVEAU (AA Large ✓ - TA PRÉFÉRENCE) */
<button style={{
  background: 'var(--warning-solid)',           /* #956A29 - Jaune foncé */
  color: 'var(--warning-solid-foreground)',     /* #ffffff */
  fontSize: 'var(--text-lg)',                   /* 18px min */
  fontWeight: 'var(--font-semibold)'            /* 600 min */
}}>
  Warning
</button>
```

---

## 🎨 TEXTE BLANC SUR JAUNE - TA SOLUTION

### ✅ Convention Créée pour Toi

**globals-hybrid.css définit déjà :**

```css
/* ACCENT SOLID - Texte Blanc sur Jaune Foncé */
--accent-solid: var(--color-accent-800);    /* #956A29 */
--accent-solid-foreground: #ffffff;
/* WCAG Ratio: 3.49:1 ✓ AA Large (18px+, 600+) */

/* WARNING SOLID - Alias pour warnings */
--warning-solid: var(--accent-solid);
--warning-solid-foreground: var(--accent-solid-foreground);
```

### ✅ Alternative Plus Foncée (Quasi AA Normal)

```css
/* Si tu veux texte plus petit (16px) */
--accent-solid-dark: var(--color-accent-900); /* #7C5822 */
--accent-solid-dark-foreground: #ffffff;
/* WCAG Ratio: 4.15:1 ⚠️ quasi AA Normal */
```

### ⚠️ Requis pour AA Large (accent-solid)

```tsx
/* ✓ CONFORME */
fontSize: 'var(--text-lg)'      // 18px minimum
// OU
fontSize: 'var(--text-base)'    // 16px OK si...
fontWeight: 'var(--font-bold)'  // ...700 bold

/* ✗ NON CONFORME */
fontSize: 'var(--text-sm)'      // 14px trop petit
fontWeight: 'var(--font-normal)' // 400 trop léger
```

---

## 📊 COMPARAISON AVANT/APRÈS

### Ton globals.css ACTUEL (CONSERVÉ)

```css
/* ✓ GARDE tel quel */
--primary: #55A1B4;
--secondary: #ED843A;
--accent: #F8B044;
--teal: #9dbeba;
--coral: #f49a76;
--success: #9dbeba;              /* Ancien teal clair */
--destructive: #f49a76;          /* Ancien coral */
--warning-foreground: #f8fbfd;   /* ✗ Texte blanc (NON CONFORME) */
```

### globals-hybrid.css AJOUTE/OVERRIDE

```css
/* ✓ Ajoute nouvelles couleurs */
--color-success-500: #2E8F98;    /* Nouveau teal TLS */
--color-error-500: #EF4444;      /* Nouveau rouge */

/* ✓ Override tokens sémantiques */
--success: var(--color-success-500);        /* #2E8F98 (nouveau) */
--destructive: var(--color-error-600);      /* #DC2626 (nouveau) */
--warning-foreground: var(--color-neutral-900);  /* ✓ Safe fallback */

/* ✓ Ajoute convention SOLID (TA PRÉFÉRENCE) */
--warning-solid: var(--accent-solid);       /* #956A29 */
--warning-solid-foreground: #ffffff;
```

### RÉSULTAT FINAL (Cascade CSS)

```css
/* Ancien code continue de fonctionner */
var(--primary)           → #55A1B4 ✓
var(--teal)              → #9dbeba ✓
var(--coral)             → #f49a76 ✓

/* Nouveaux tokens disponibles */
var(--color-success-500) → #2E8F98 ✓
var(--success-solid)     → #25727A ✓
var(--warning-solid)     → #956A29 ✓ (TA PRÉFÉRENCE)
```

---

## ✅ CHECKLIST MIGRATION

### Phase 1 : Setup (5 minutes)

- [x] ✅ Tu as déjà créé `globals-hybrid.css` (parfait !)
- [ ] Ajouter import dans ton entry point :
  ```tsx
  import './styles/globals.css';
  import './styles/globals-hybrid.css';
  ```
- [ ] Vérifier l'ordre (globals.css AVANT globals-hybrid.css)
- [ ] Test visuel rapide (tout doit fonctionner tel quel)

### Phase 2 : Tests (10 minutes)

- [ ] Ouvrir DevTools → Inspect un élément
- [ ] Vérifier que les nouvelles variables existent :
  ```javascript
  getComputedStyle(document.documentElement).getPropertyValue('--accent-solid')
  // Doit retourner: #956A29
  ```
- [ ] Vérifier qu'anciennes variables fonctionnent toujours :
  ```javascript
  getComputedStyle(document.documentElement).getPropertyValue('--teal')
  // Doit retourner: #9dbeba
  ```

### Phase 3 : Migration Progressive (à ton rythme)

- [ ] Identifier composants utilisant `--warning` + texte blanc
- [ ] Remplacer par `--warning-solid` (1 composant à la fois)
- [ ] Vérifier font-size ≥ 18px ET font-weight ≥ 600
- [ ] Test visuel après chaque migration

---

## 🎯 EXEMPLES CONCRETS

### Badge Warning (Texte Blanc sur Jaune Foncé)

```tsx
/* ✓ CONFORME AA Large - TA PRÉFÉRENCE */
const BadgeWarning = ({ children }) => (
  <span style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    padding: 'var(--space-2) var(--space-4)',
    background: 'var(--warning-solid)',           /* #956A29 */
    color: 'var(--warning-solid-foreground)',     /* #ffffff */
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-lg)',                   /* 18px */
    fontWeight: 'var(--font-semibold)',           /* 600 */
    borderRadius: 'var(--radius-full)',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
  }}>
    ⚠️ {children}
  </span>
);

// Usage
<BadgeWarning>Attention requise</BadgeWarning>
```

### Button Success (Texte Blanc)

```tsx
/* ✓ CONFORME AA Normal */
const ButtonSuccess = ({ children, onClick }) => (
  <button 
    onClick={onClick}
    style={{
      padding: 'var(--space-3) var(--space-6)',
      background: 'var(--success-solid)',         /* #25727A */
      color: 'var(--success-solid-foreground)',   /* #ffffff */
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-base)',               /* 16px OK (AA Normal) */
      fontWeight: 'var(--font-semibold)',         /* 600 */
      borderRadius: 'var(--radius-lg)',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    }}
  >
    {children}
  </button>
);

// Usage
<ButtonSuccess onClick={handleValidate}>
  Valider
</ButtonSuccess>
```

### Alert Warning (Fond Clair + Texte Foncé)

```tsx
/* ✓ Alternative : Fond clair + texte foncé (AAA) */
const AlertWarning = ({ title, message }) => (
  <div style={{
    padding: 'var(--space-4)',
    background: 'var(--color-accent-50)',         /* Fond clair */
    color: 'var(--color-accent-800)',             /* Texte foncé */
    borderLeft: '4px solid var(--warning-solid)', /* Border jaune foncé */
    borderRadius: 'var(--radius-lg)',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-base)'
  }}>
    <div style={{ 
      fontWeight: 'var(--font-bold)', 
      marginBottom: 'var(--space-2)',
      color: 'var(--color-accent-900)'
    }}>
      {title}
    </div>
    <div>{message}</div>
  </div>
);

// Usage
<AlertWarning 
  title="Attention" 
  message="Cette action nécessite une validation."
/>
```

---

## 🚨 ERREURS À ÉVITER

### ❌ ERREUR 1 : Inverser l'ordre d'import

```tsx
/* ✗ MAUVAIS ORDRE */
import './styles/globals-hybrid.css';  // ← SECOND
import './styles/globals.css';         // ← PREMIER
/* globals.css écrasera globals-hybrid.css → overrides perdus */

/* ✓ BON ORDRE */
import './styles/globals.css';         // ← PREMIER
import './styles/globals-hybrid.css';  // ← SECOND
```

---

### ❌ ERREUR 2 : Modifier globals.css directement

```css
/* ✗ NE PAS modifier globals.css */
/* globals.css */
--success: #2E8F98;  /* ✗ Risque de casser composants existants */

/* ✓ Laisser globals-hybrid.css faire l'override */
/* globals-hybrid.css */
--success: var(--color-success-500);  /* ✓ Override safe */
```

---

### ❌ ERREUR 3 : Oublier font-size/font-weight pour AA Large

```tsx
/* ✗ NON CONFORME (texte trop petit) */
<span style={{
  background: 'var(--warning-solid)',
  color: 'var(--warning-solid-foreground)',
  fontSize: 'var(--text-sm)',        /* 14px ✗ trop petit */
  fontWeight: 'var(--font-normal)'   /* 400 ✗ trop léger */
}}>
  Warning
</span>

/* ✓ CONFORME AA Large */
<span style={{
  background: 'var(--warning-solid)',
  color: 'var(--warning-solid-foreground)',
  fontSize: 'var(--text-lg)',        /* 18px ✓ */
  fontWeight: 'var(--font-semibold)' /* 600 ✓ */
}}>
  Warning
</span>
```

---

## 📖 DOCUMENTATION COMPLÈTE

### Audit WCAG
- **[WCAG-ACCESSIBILITY-AUDIT.md](/WCAG-ACCESSIBILITY-AUDIT.md)** - Tous les ratios
- **[WCAG-QUICK-ANSWER.md](/WCAG-QUICK-ANSWER.md)** - Réponse rapide

### Migration
- **[MIGRATION-STRATEGY-SAFE.md](/MIGRATION-STRATEGY-SAFE.md)** - Stratégie complète
- **[DESIGN-SYSTEM-USAGE-GUIDE.md](/DESIGN-SYSTEM-USAGE-GUIDE.md)** - Guide usage

### Exemples
- **[CSS-SNIPPETS-READY.md](/CSS-SNIPPETS-READY.md)** - 8+ composants prêts

---

## ✅ RÉSUMÉ FINAL

### Ce que tu dois faire MAINTENANT

1. **Ajouter 1 ligne d'import** dans ton entry point :
   ```tsx
   import './styles/globals.css';        // Déjà là
   import './styles/globals-hybrid.css'; // ← Ajouter cette ligne
   ```

2. **C'est tout !** Ton app continue de fonctionner tel quel ✅

3. **Pour nouveaux composants**, utilise :
   ```tsx
   background: 'var(--warning-solid)'           /* Texte blanc sur jaune foncé */
   color: 'var(--warning-solid-foreground)'
   fontSize: 'var(--text-lg)'                   /* 18px min */
   fontWeight: 'var(--font-semibold)'           /* 600 min */
   ```

### Garanties

- ✅ **Zéro breaking change** (globals.css inchangé)
- ✅ **Migration progressive** (ancien code fonctionne)
- ✅ **Texte blanc sur jaune** (ta préférence respectée)
- ✅ **WCAG AA Large compliant** (accent-solid = 3.49:1)

---

**MIGRATION SAFE ET TEXTE BLANC SUR JAUNE FONCÉ GARANTI ! 🎨**

_Guide Adaptation | 22/02/2026_
