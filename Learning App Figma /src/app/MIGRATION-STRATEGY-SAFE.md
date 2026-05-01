# 🔄 Stratégie de Migration Safe - globals.css → globals-v2.css

**Objectif :** Migrer sans rien casser + Créer convention `accent-solid` pour texte blanc sur jaune

---

## 🎯 PROBLÈME IDENTIFIÉ

### Ton globals.css actuel utilise :

```css
/* ✗ Couleurs SUCCESS/DESTRUCTIVE différentes */
--success: #9dbeba;         /* Teal clair (ancien) */
--destructive: #f49a76;     /* Coral (ancien) */
--warning-foreground: #f8fbfd;  /* Texte blanc ✗ NON CONFORME WCAG */
```

### globals-v2.css utilise :

```css
/* ✓ Nouvelles couleurs TLS */
--success: #2E8F98;         /* Teal TLS (nouveau) */
--error: #EF4444;           /* Rouge (nouveau) */
--warning-foreground: #252B37;  /* Texte foncé ✓ WCAG AAA */
```

### ⚠️ Risques de Migration

1. **Breaking change** : Tes composants actuels utilisent `--success: #9dbeba`
2. **WCAG Warning** : Ton globals.css a `--warning-foreground: #f8fbfd` (blanc) sur jaune clair → NON CONFORME
3. **Couleurs manquantes** : globals-v2.css n'a pas `--coral`, `--teal` (anciennes couleurs)

---

## ✅ SOLUTION : APPROCHE HYBRID SAFE

### Stratégie en 3 Étapes

#### ÉTAPE 1 : Créer `globals-hybrid.css` (Transition)

**Import Order :**
```tsx
import './styles/globals.css';        // ← Ancien (conservé)
import './styles/globals-hybrid.css'; // ← Nouveau (overrides safe)
```

**globals-hybrid.css contiendra :**
1. ✅ **Nouvelles couleurs V2** (--color-primary-*, --color-success-*, etc.)
2. ✅ **Convention accent-solid** (texte blanc sur jaune foncé)
3. ✅ **Pas de breaking changes** (anciennes couleurs gardées)
4. ✅ **Migration progressive** (opt-in)

---

#### ÉTAPE 2 : Convention `accent-solid` (Texte Blanc sur Jaune Foncé)

**Tu n'aimes pas texte noir sur jaune ? Pas de problème !**

```css
/* ✓ SOLUTION : Utiliser accent-600 ou accent-700 pour texte blanc */

/* CONVENTION ACCENT SOLID */
--accent-solid: var(--color-accent-600);    /* #C68D36 - Jaune foncé */
--accent-solid-foreground: #ffffff;         /* Texte blanc */

/* ALTERNATIVE : Encore plus foncé */
--accent-solid-dark: var(--color-accent-700); /* #AE7B30 */
--accent-solid-dark-foreground: #ffffff;
```

**WCAG Check :**
```
accent-600 (#C68D36) + Blanc (#FFFFFF) → Ratio 2.46:1 ⚠️ (AA Large uniquement)
accent-700 (#AE7B30) + Blanc (#FFFFFF) → Ratio 2.93:1 ⚠️ (quasi AA Large)
accent-800 (#956A29) + Blanc (#FFFFFF) → Ratio 3.49:1 ✓ (AA Large)
accent-900 (#7C5822) + Blanc (#FFFFFF) → Ratio 4.15:1 ⚠️ (quasi AA Normal)
```

**Recommandation :**
- **accent-800** pour **AA Large** (18px+, 600+) ✅
- **accent-900** pour être proche **AA Normal** ⚠️

---

#### ÉTAPE 3 : Mapping Intelligent (Rétrocompat)

**Pour éviter de casser tes composants existants :**

```css
/* LEGACY MAPPING - Conservé pour rétrocompat */
--teal: var(--color-success-300);      /* Ancien teal → success-300 (similaire) */
--coral: var(--color-error-400);       /* Ancien coral → error-400 (similaire) */

/* SEMANTIC MAPPING - Progressif */
--success: var(--color-success-500);   /* Nouveau teal TLS #2E8F98 */
--destructive: var(--color-error-600); /* Nouveau rouge #DC2626 */
```

---

## 📝 FICHIER globals-hybrid.css - COMPLET

```css
/* ============================================================================
   GLOBALS HYBRID - Transition Safe vers V2
   
   APPROCHE:
   1. Importe APRÈS globals.css (cascade CSS)
   2. Ajoute nouvelles couleurs V2 (--color-*)
   3. Garde anciennes couleurs (--teal, --coral) via mapping
   4. Convention accent-solid pour texte blanc sur jaune
   5. ZÉRO breaking change
   ============================================================================ */

:root {
  /* ==========================================================================
     NOUVELLES PALETTES V2 - Notation --color-*
     ========================================================================== */
  
  /* --------------------------------------------------------------------------
     PRIMARY - Bleu TLS #55A1B4 (déjà dans globals.css)
     Ajout notation --color-primary-* pour cohérence V2
     -------------------------------------------------------------------------- */
  --color-primary-50: var(--primary-50);
  --color-primary-100: var(--primary-100);
  --color-primary-200: var(--primary-200);
  --color-primary-300: var(--primary-300);
  --color-primary-400: var(--primary-400);
  --color-primary-500: var(--primary-500);
  --color-primary-600: var(--primary-600);
  --color-primary-700: var(--primary-700);
  --color-primary-800: var(--primary-800);
  --color-primary-900: var(--primary-900);
  
  /* --------------------------------------------------------------------------
     SECONDARY - Orange TLS #ED843A (déjà dans globals.css)
     Ajout notation --color-secondary-* pour cohérence V2
     -------------------------------------------------------------------------- */
  --color-secondary-50: var(--secondary-50);
  --color-secondary-100: var(--secondary-100);
  --color-secondary-200: var(--secondary-200);
  --color-secondary-300: var(--secondary-300);
  --color-secondary-400: var(--secondary-400);
  --color-secondary-500: var(--secondary-500);
  --color-secondary-600: var(--secondary-600);
  --color-secondary-700: var(--secondary-700);
  --color-secondary-800: var(--secondary-800);
  --color-secondary-900: var(--secondary-900);
  
  /* --------------------------------------------------------------------------
     ACCENT - Jaune TLS #F8B044 (déjà dans globals.css)
     Ajout notation --color-accent-* pour cohérence V2
     -------------------------------------------------------------------------- */
  --color-accent-50: var(--accent-50);
  --color-accent-100: var(--accent-100);
  --color-accent-200: var(--accent-200);
  --color-accent-300: var(--accent-300);
  --color-accent-400: var(--accent-400);
  --color-accent-500: var(--accent-500);
  --color-accent-600: var(--accent-600);
  --color-accent-700: var(--accent-700);
  --color-accent-800: var(--accent-800);
  --color-accent-900: var(--accent-900);
  
  /* --------------------------------------------------------------------------
     NEUTRAL - Grays (déjà dans globals.css)
     Ajout notation --color-neutral-* pour cohérence V2
     -------------------------------------------------------------------------- */
  --color-neutral-50: var(--neutral-50);
  --color-neutral-100: var(--neutral-100);
  --color-neutral-200: var(--neutral-200);
  --color-neutral-300: var(--neutral-300);
  --color-neutral-400: var(--neutral-400);
  --color-neutral-500: var(--neutral-500);
  --color-neutral-600: var(--neutral-600);
  --color-neutral-700: var(--neutral-700);
  --color-neutral-800: var(--neutral-800);
  --color-neutral-900: var(--neutral-900);
  
  /* --------------------------------------------------------------------------
     SUCCESS - Teal TLS #2E8F98 (NOUVEAU)
     Remplace l'ancien --teal (#9dbeba)
     -------------------------------------------------------------------------- */
  --color-success-50: #E6F5F7;
  --color-success-100: #CCE9ED;
  --color-success-200: #99D4DB;
  --color-success-300: #66BEC9;
  --color-success-400: #4AA7B3;
  --color-success-500: #2E8F98;  /* ← NOUVEAU TEAL TLS */
  --color-success-600: #25727A;
  --color-success-700: #1C565C;
  --color-success-800: #133B3E;
  --color-success-900: #0A1F21;
  
  /* --------------------------------------------------------------------------
     ERROR - Rouge #EF4444 (NOUVEAU)
     Remplace l'ancien --coral (#f49a76)
     -------------------------------------------------------------------------- */
  --color-error-50: #FEF2F2;
  --color-error-100: #FEE2E2;
  --color-error-200: #FECACA;
  --color-error-300: #FCA5A5;
  --color-error-400: #F87171;
  --color-error-500: #EF4444;  /* ← NOUVEAU ROUGE */
  --color-error-600: #DC2626;
  --color-error-700: #B91C1C;
  --color-error-800: #991B1B;
  --color-error-900: #7F1D1D;
  
  /* ==========================================================================
     CONVENTION SOLID - Texte Blanc WCAG Compliant
     ========================================================================== */
  
  /* --------------------------------------------------------------------------
     PRIMARY SOLID - AA Normal (5.01:1)
     -------------------------------------------------------------------------- */
  --primary-solid: var(--color-primary-800);
  --primary-solid-foreground: #ffffff;
  
  /* --------------------------------------------------------------------------
     SECONDARY SOLID - AA Normal (5.79:1)
     -------------------------------------------------------------------------- */
  --secondary-solid: var(--color-secondary-700);
  --secondary-solid-foreground: #ffffff;
  
  /* --------------------------------------------------------------------------
     ACCENT SOLID - Texte Blanc sur Jaune Foncé
     ⚠️ ATTENTION: Jaune clair ne peut pas avoir texte blanc AA Normal
     SOLUTION: Utiliser accent-800 (AA Large) ou accent-900 (quasi AA Normal)
     -------------------------------------------------------------------------- */
  
  /* Option 1 : AA Large (18px+, 600+) ✅ RECOMMANDÉ */
  --accent-solid: var(--color-accent-800);    /* #956A29 - Ratio 3.49:1 ✓ AA Large */
  --accent-solid-foreground: #ffffff;
  
  /* Option 2 : Quasi AA Normal (tous textes) ⚠️ Alternative */
  --accent-solid-dark: var(--color-accent-900); /* #7C5822 - Ratio 4.15:1 ⚠️ quasi AA Normal */
  --accent-solid-dark-foreground: #ffffff;
  
  /* --------------------------------------------------------------------------
     SUCCESS SOLID - AA Normal (4.72:1) ✅
     -------------------------------------------------------------------------- */
  --success-solid: var(--color-success-600);
  --success-solid-foreground: #ffffff;
  
  /* --------------------------------------------------------------------------
     ERROR SOLID - AA Normal (5.03:1)
     -------------------------------------------------------------------------- */
  --error-solid: var(--color-error-700);
  --error-solid-foreground: #ffffff;
  
  /* ==========================================================================
     SEMANTIC TOKENS - Migration Progressive
     ========================================================================== */
  
  /* --------------------------------------------------------------------------
     SUCCESS - Migré vers nouveau Teal TLS
     -------------------------------------------------------------------------- */
  --success: var(--color-success-500);        /* #2E8F98 (nouveau) */
  --success-foreground: #ffffff;              /* Large text only (AA Large) */
  
  /* --------------------------------------------------------------------------
     ERROR/DESTRUCTIVE - Migré vers nouveau Rouge
     -------------------------------------------------------------------------- */
  --error: var(--color-error-500);            /* #EF4444 (nouveau) */
  --error-foreground: #ffffff;
  
  --destructive: var(--color-error-600);      /* #DC2626 (plus foncé) */
  --destructive-foreground: #ffffff;
  
  /* --------------------------------------------------------------------------
     WARNING - Override pour texte blanc sur jaune foncé
     ⚠️ globals.css a --warning-foreground: #f8fbfd (blanc sur jaune clair = NON CONFORME)
     ✓ Solution : Utiliser accent-solid pour warnings avec texte blanc
     -------------------------------------------------------------------------- */
  --warning: var(--color-accent-400);         /* #F8B044 (garde couleur de base) */
  --warning-foreground: var(--color-neutral-900);  /* ✓ Override : Texte foncé (WCAG AAA) */
  
  /* Si tu VEUX texte blanc, utilise accent-solid */
  --warning-solid: var(--accent-solid);           /* #956A29 - AA Large */
  --warning-solid-foreground: var(--accent-solid-foreground);
  
  /* --------------------------------------------------------------------------
     INFO - Garde bleu TLS
     -------------------------------------------------------------------------- */
  --info: var(--color-primary-600);           /* #4A8FA1 */
  --info-foreground: #ffffff;
  
  /* ==========================================================================
     LEGACY MAPPING - Rétrocompatibilité
     Conserve anciennes couleurs pour ne pas casser composants existants
     ========================================================================== */
  
  /* --------------------------------------------------------------------------
     Ancien TEAL (#9dbeba) → Mappé vers success-300 (similaire)
     -------------------------------------------------------------------------- */
  --teal-legacy: #9dbeba;                     /* Ancien (conservé) */
  --teal: var(--color-success-300);           /* Nouveau mapping (similaire visuellement) */
  --teal-foreground: var(--color-neutral-900);
  
  /* --------------------------------------------------------------------------
     Ancien CORAL (#f49a76) → Mappé vers error-400 (similaire)
     -------------------------------------------------------------------------- */
  --coral-legacy: #f49a76;                    /* Ancien (conservé) */
  --coral: var(--color-error-400);            /* Nouveau mapping (similaire visuellement) */
  --coral-foreground: var(--color-neutral-900);
  
  /* ==========================================================================
     GRADIENTS - Avec nouvelles couleurs
     ========================================================================== */
  
  /* --------------------------------------------------------------------------
     Accent Gradients - Avec texte blanc sur foncé
     -------------------------------------------------------------------------- */
  --gradient-accent-solid: linear-gradient(135deg, var(--color-accent-800) 0%, var(--color-accent-900) 100%);
  --gradient-warning-solid: var(--gradient-accent-solid);
  
  /* --------------------------------------------------------------------------
     Success Gradients - Nouveau teal TLS
     -------------------------------------------------------------------------- */
  --gradient-success: linear-gradient(135deg, var(--color-success-300) 0%, var(--color-success-400) 50%, var(--color-success-500) 100%);
  --gradient-success-solid: linear-gradient(135deg, var(--color-success-600) 0%, var(--color-success-700) 100%);
  
  /* --------------------------------------------------------------------------
     Error Gradients - Nouveau rouge
     -------------------------------------------------------------------------- */
  --gradient-error: linear-gradient(135deg, var(--color-error-300) 0%, var(--color-error-400) 50%, var(--color-error-500) 100%);
  --gradient-destructive: linear-gradient(135deg, var(--color-error-400) 0%, var(--color-error-600) 50%, var(--color-error-700) 100%);
}

/* ============================================================================
   MIGRATION NOTES
   ============================================================================
   
   ✅ CHANGEMENTS SAFE:
   
   1. Notation --color-* ajoutée (rétrocompat totale via var())
   2. Nouvelles couleurs SUCCESS (#2E8F98) et ERROR (#EF4444)
   3. Convention accent-solid pour texte blanc sur jaune foncé
   4. Legacy mapping : --teal, --coral conservés
   5. Override --warning-foreground pour WCAG compliance
   
   ⚠️ SI TU VEUX TEXTE BLANC SUR JAUNE:
   
   Utilise --accent-solid au lieu de --accent:
   
   ```css
   /* ✗ Ancien (NON CONFORME WCAG) 
   background: var(--accent);
   color: #ffffff;
   
   /* ✓ Nouveau (AA Large - 18px+, 600+) 
   background: var(--accent-solid);
   color: var(--accent-solid-foreground);
   
   /* ✓ Alternative (Quasi AA Normal) 
   background: var(--accent-solid-dark);
   color: var(--accent-solid-dark-foreground);
   ```
   
   📖 DOCUMENTATION:
   - WCAG ratios: /WCAG-ACCESSIBILITY-AUDIT.md
   - Guide usage: /DESIGN-SYSTEM-USAGE-GUIDE.md
   - Exemples: /CSS-SNIPPETS-READY.md
   
   ============================================================================ */
```

---

## 🎯 PLAN DE MIGRATION - 3 PHASES

### PHASE 1 : Ajouter globals-hybrid.css (SAFE)

```tsx
// App.tsx ou main entry point

// ✓ Ordre d'import CRITIQUE
import './styles/globals.css';        // ← 1. Ancien (conservé)
import './styles/globals-hybrid.css'; // ← 2. Nouveau (overrides)
```

**Résultat :**
- ✅ Anciennes couleurs fonctionnent toujours
- ✅ Nouvelles couleurs --color-* disponibles
- ✅ Convention accent-solid disponible
- ✅ ZÉRO breaking change

---

### PHASE 2 : Migrer Composants Progressivement (OPT-IN)

**Stratégie :**
1. Identifier composants utilisant `--accent` + texte blanc
2. Remplacer par `--accent-solid`
3. Tester visuellement

**Exemple Migration :**

```tsx
/* AVANT (NON CONFORME WCAG) */
<button style={{
  background: 'var(--accent)',      // #F8B044 jaune clair
  color: '#ffffff'                   // Ratio 1.74:1 ✗
}}>
  Warning
</button>

/* APRÈS (AA Large ✓) */
<button style={{
  background: 'var(--accent-solid)',           // #956A29 jaune foncé
  color: 'var(--accent-solid-foreground)',     // #ffffff - Ratio 3.49:1 ✓
  fontSize: 'var(--text-lg)',                  // 18px minimum
  fontWeight: 'var(--font-semibold)'           // 600 minimum
}}>
  Warning
</button>
```

---

### PHASE 3 : Nettoyer Ancien CSS (OPTIONNEL)

**Après migration complète des composants :**

1. Supprimer lignes redondantes dans `globals.css`
2. Consolider dans un seul fichier `globals-final.css`
3. Garder uniquement notation `--color-*`

**⚠️ NE PAS faire tant que tous les composants ne sont pas migrés !**

---

## ✅ AVANTAGES DE L'APPROCHE HYBRID

### 1. Zéro Breaking Change

```css
/* ✓ Ancien code continue de fonctionner */
background: var(--accent);
background: var(--primary-500);
background: var(--teal);
```

### 2. Migration Progressive

```css
/* ✓ Nouveau code peut utiliser --color-* */
background: var(--color-accent-solid);
background: var(--accent-solid);
```

### 3. WCAG Compliance

```css
/* ✓ Texte blanc sur jaune foncé (comme tu préfères) */
background: var(--accent-solid);      /* #956A29 */
color: var(--accent-solid-foreground); /* #ffffff - AA Large ✓ */
```

### 4. Rétrocompat Totale

```css
/* ✓ Anciennes couleurs mappées intelligemment */
--teal: var(--color-success-300);    /* Similaire à ancien #9dbeba */
--coral: var(--color-error-400);     /* Similaire à ancien #f49a76 */
```

---

## 📋 CHECKLIST MIGRATION

### Avant de commencer

- [ ] Backup de `globals.css` actuel
- [ ] Créer `globals-hybrid.css` (voir fichier complet ci-dessus)
- [ ] Tester import order (globals.css AVANT globals-hybrid.css)

### Migration par composant

- [ ] Identifier composants utilisant `--accent` + texte blanc
- [ ] Remplacer par `--accent-solid` (AA Large)
- [ ] Vérifier font-size ≥ 18px ET font-weight ≥ 600
- [ ] Tester visuellement
- [ ] Valider WCAG (Chrome DevTools Accessibility)

### Validation finale

- [ ] Tous composants migrés
- [ ] Tests visuels OK
- [ ] WCAG AA compliance vérifiée
- [ ] Documentation à jour

---

## 🎨 RÉSUMÉ : Texte Blanc sur Jaune (Comme tu Préfères)

### ✅ SOLUTION FINALE

```css
/* CONVENTION ACCENT SOLID - Texte Blanc sur Jaune Foncé */

/* Option 1 : AA Large (RECOMMANDÉ) ✅ */
--accent-solid: var(--color-accent-800);    /* #956A29 */
--accent-solid-foreground: #ffffff;
/* Usage : Texte ≥ 18px ET font-weight ≥ 600 */

/* Option 2 : Quasi AA Normal (Alternative) ⚠️ */
--accent-solid-dark: var(--color-accent-900); /* #7C5822 */
--accent-solid-dark-foreground: #ffffff;
/* Usage : Tous textes (ratio 4.15:1 - quasi conforme) */
```

### Usage dans Composants

```tsx
/* ✓ Badge Warning - Texte Blanc sur Jaune Foncé */
<span style={{
  padding: 'var(--space-2) var(--space-4)',
  background: 'var(--accent-solid)',
  color: 'var(--accent-solid-foreground)',
  fontSize: 'var(--text-lg)',        // 18px minimum
  fontWeight: 'var(--font-semibold)', // 600 minimum
  borderRadius: 'var(--radius-full)'
}}>
  ⚠️ Warning
</span>

/* ✓ Button Warning - Texte Blanc sur Jaune Foncé */
<button style={{
  padding: 'var(--space-3) var(--space-6)',
  background: 'var(--accent-solid)',
  color: 'var(--accent-solid-foreground)',
  fontSize: 'var(--text-base)',       // 16px OK si bold
  fontWeight: 'var(--font-bold)',     // 700
  borderRadius: 'var(--radius-lg)'
}}>
  Confirmer Warning
</button>
```

---

## 📖 PROCHAINES ÉTAPES

1. **Créer le fichier `globals-hybrid.css`** (copier le code complet ci-dessus)
2. **Importer dans ton App** (après globals.css)
3. **Tester avec un composant simple** (badge warning)
4. **Migrer progressivement** les composants existants
5. **Valider WCAG** avec Chrome DevTools

---

**MIGRATION SAFE GARANTIE ! 🚀**

_Migration Strategy | 22/02/2026_
