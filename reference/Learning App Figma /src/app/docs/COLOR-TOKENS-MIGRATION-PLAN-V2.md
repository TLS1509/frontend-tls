# 🎨 Color Tokens Migration Plan V2 - TLS

**Version:** 2.0.1 | **Date:** 22/02/2026  
**Status:** Production Ready - Approche Non-Breaking

---

## 🎯 Stratégie: Additive First, Delete Last

### ⚠️ Règle d'Or
```
1. AJOUTER d'abord (--color-* + aliases)
2. MIGRER progressivement le code
3. SUPPRIMER en dernier (après validation complète)
```

**Aucun breaking change jusqu'à Phase 4 finale.**

---

## 🎨 Mapping Semantic Colors TLS

### Vos Couleurs Actuelles

| Couleur | Hex | Usage Actuel | Mapping V2 |
|---------|-----|--------------|------------|
| **#55A1B4** | Bleu TLS | Primary brand | `--color-primary-500` ✅ |
| **#F8B044** | Jaune TLS | Accent/Warning | `--color-accent-400` ✅ |
| **#EF4444** | Rouge | ❌ Non défini | `--color-error-500` 🆕 |
| **#2A9D8F** | Teal | ❌ Non défini | `--color-teal-500` 🆕 |
| **#E76F51** | Coral | Destructive (#f49a76) | ⚠️ **À DÉCIDER** |

### ⚠️ Décision Requise: #E76F51 (Coral)

**Actuel:** Vous avez `--coral: #f49a76` (plus clair)  
**Nouveau:** #E76F51 (plus foncé/saturé)

**Options:**

#### Option A - Remplacer Coral
```css
/* Remplacer palette coral par #E76F51 */
--color-coral-50: #fef2ee;
--color-coral-100: #fde4dc;
--color-coral-200: #fcc9ba;
--color-coral-300: #faad97;
--color-coral-400: #f19174;
--color-coral-500: #E76F51;  /* ← Nouveau base */
--color-coral-600: #d85a3c;
--color-coral-700: #b5472f;
--color-coral-800: #923522;
--color-coral-900: #6f2315;

/* Mapper error */
--color-error-500: var(--color-coral-500);
--error: var(--color-error-500);
--destructive: var(--color-error-500);
```

**Impact:** Change légèrement la couleur destructive (plus saturée)

#### Option B - Ajouter comme nouvelle couleur "Danger"
```css
/* Garder coral actuel */
--color-coral-500: #f49a76;  /* Actuel */

/* Ajouter danger */
--color-danger-500: #E76F51;  /* Nouveau */

/* Mapper error au nouveau */
--error: var(--color-danger-500);
```

**Impact:** Aucun sur existant, ajoute nouvelle palette

#### Option C - Garder les deux, mapper selon contexte
```css
--color-coral-500: #f49a76;   /* Soft errors, badges */
--color-danger-500: #E76F51;  /* Hard errors, alerts */

--error: var(--color-danger-500);
--destructive: var(--color-danger-500);
--destructive-soft: var(--color-coral-500);
```

**Recommandation:** **Option A** - Remplacer pour cohérence

---

## 🚀 Plan de Migration (4 Phases Révisé)

### Phase 1 - ADDITIVE ONLY (1 jour) ✅

**Objectif:** Ajouter --color-* SANS supprimer l'existant

#### 1.1 Créer globals-v2-additive.css
```css
/* ============================================================================
   ÉTAPE 1: AJOUTER --color-* palette
   ⚠️ NE RIEN SUPPRIMER - Tout est additif
   ============================================================================ */

:root {
  /* ==========================================================================
     NOUVEAUX TOKENS PALETTE (--color-*)
     ========================================================================== */
  
  /* PRIMARY - Bleu TLS #55A1B4 */
  --color-primary-50: #E8F4F7;
  --color-primary-100: #DCEBEF;
  --color-primary-200: #B9D7DF;
  --color-primary-300: #96C3CF;
  --color-primary-400: #73AFBF;
  --color-primary-500: #55A1B4;  /* ← Base */
  --color-primary-600: #4A8FA1;
  --color-primary-700: #3D7786;
  --color-primary-800: #2F5F6A;
  --color-primary-900: #1F3E45;
  
  /* SECONDARY - Orange TLS #ED843A */
  --color-secondary-50: #FFF3EB;
  --color-secondary-100: #FDDCC7;
  --color-secondary-200: #FCBB93;
  --color-secondary-300: #F59A5F;
  --color-secondary-400: #F18A4C;
  --color-secondary-500: #ED843A;
  --color-secondary-600: #C06920;
  --color-secondary-700: #8F5017;
  --color-secondary-800: #5E3710;
  --color-secondary-900: #3B2109;
  
  /* ACCENT - Jaune TLS #F8B044 */
  --color-accent-50: #FFF9EE;
  --color-accent-100: #FFECC8;
  --color-accent-200: #FFD791;
  --color-accent-300: #FFC15A;
  --color-accent-400: #F8B044;  /* ← Base */
  --color-accent-500: #DF9E3D;
  --color-accent-600: #C68D36;
  --color-accent-700: #AE7B30;
  --color-accent-800: #956A29;
  --color-accent-900: #7C5822;
  
  /* NEUTRAL - Grays */
  --color-neutral-50: #F5F8F8;
  --color-neutral-100: #EEF6F8;
  --color-neutral-200: #E0E8EA;
  --color-neutral-300: #C8D4D7;
  --color-neutral-400: #9AABB0;
  --color-neutral-500: #6B7D82;
  --color-neutral-600: #535B62;
  --color-neutral-700: #3A474B;
  --color-neutral-800: #2A3538;
  --color-neutral-900: #252B37;
  
  /* SUCCESS - Teal #2A9D8F (NOUVEAU) */
  --color-success-50: #E6F7F5;
  --color-success-100: #CCEFEB;
  --color-success-200: #99DFD7;
  --color-success-300: #66CFC3;
  --color-success-400: #33BFAF;
  --color-success-500: #2A9D8F;  /* ← Votre couleur */
  --color-success-600: #227E73;
  --color-success-700: #1A5E57;
  --color-success-800: #113F3B;
  --color-success-900: #091F1F;
  
  /* WARNING - Jaune #F8B044 (même que accent) */
  --color-warning-50: #FFF9EE;
  --color-warning-100: #FFECC8;
  --color-warning-200: #FFD791;
  --color-warning-300: #FFC15A;
  --color-warning-400: #F8B044;
  --color-warning-500: #F8A733;
  --color-warning-600: #D69020;
  --color-warning-700: #9B6818;
  --color-warning-800: #664410;
  --color-warning-900: #3D2909;
  
  /* ERROR - Rouge #EF4444 (NOUVEAU) */
  --color-error-50: #FEF2F2;
  --color-error-100: #FEE2E2;
  --color-error-200: #FECACA;
  --color-error-300: #FCA5A5;
  --color-error-400: #F87171;
  --color-error-500: #EF4444;  /* ← Votre couleur */
  --color-error-600: #DC2626;
  --color-error-700: #B91C1C;
  --color-error-800: #991B1B;
  --color-error-900: #7F1D1D;
  
  /* CORAL - #E76F51 (décision Option A) */
  --color-coral-50: #fef2ee;
  --color-coral-100: #fde4dc;
  --color-coral-200: #fcc9ba;
  --color-coral-300: #faad97;
  --color-coral-400: #f19174;
  --color-coral-500: #E76F51;  /* ← Votre couleur */
  --color-coral-600: #d85a3c;
  --color-coral-700: #b5472f;
  --color-coral-800: #923522;
  --color-coral-900: #6f2315;
  
  /* TEAL - #2A9D8F (alias success) */
  --color-teal-50: var(--color-success-50);
  --color-teal-100: var(--color-success-100);
  --color-teal-200: var(--color-success-200);
  --color-teal-300: var(--color-success-300);
  --color-teal-400: var(--color-success-400);
  --color-teal-500: var(--color-success-500);
  --color-teal-600: var(--color-success-600);
  --color-teal-700: var(--color-success-700);
  --color-teal-800: var(--color-success-800);
  --color-teal-900: var(--color-success-900);
  
  /* INFO - Blue (subset primary) */
  --color-info-50: var(--color-primary-50);
  --color-info-100: var(--color-primary-100);
  --color-info-200: var(--color-primary-200);
  --color-info-300: var(--color-primary-300);
  --color-info-400: #4A8FA1;
  --color-info-500: var(--color-primary-700);
  --color-info-600: var(--color-primary-800);
  --color-info-700: var(--color-primary-900);
  
  /* ==========================================================================
     TOKENS SÉMANTIQUES - Mappés vers --color-*
     ⚠️ Ces tokens REMPLACENT les valeurs hardcodées
     ========================================================================== */
  
  /* Base Surface */
  --background: #ffffff;
  --foreground: var(--color-neutral-900);
  --surface: #ffffff;
  
  /* Components */
  --card: #ffffff;
  --card-foreground: var(--color-neutral-900);
  --popover: #ffffff;
  --popover-foreground: var(--color-neutral-900);
  --muted: var(--color-neutral-50);
  --muted-foreground: var(--color-neutral-500);
  
  /* Brand States - Mappés vers palette */
  --primary: var(--color-primary-500);        /* #55A1B4 ✅ */
  --primary-foreground: #f8fbfd;
  
  --secondary: var(--color-secondary-500);    /* #ED843A */
  --secondary-foreground: #f8fbfd;
  
  --accent: var(--color-accent-400);          /* #F8B044 ✅ */
  --accent-foreground: var(--color-neutral-900);
  
  /* Semantic States - Mappés vers nouvelles couleurs */
  --success: var(--color-success-500);        /* #2A9D8F ✅ NOUVEAU */
  --success-foreground: #ffffff;
  
  --warning: var(--color-warning-400);        /* #F8B044 ✅ */
  --warning-foreground: #ffffff;
  
  --error: var(--color-error-500);            /* #EF4444 ✅ NOUVEAU */
  --error-foreground: #ffffff;
  
  --destructive: var(--color-coral-500);      /* #E76F51 ✅ */
  --destructive-foreground: #ffffff;
  
  --info: var(--color-info-400);              /* #4A8FA1 */
  --info-foreground: #ffffff;
  
  /* Interactive */
  --border: rgba(0, 0, 0, 0.1);
  --border-hover: rgba(0, 0, 0, 0.2);
  --input: transparent;
  --input-background: var(--color-neutral-50);
  --input-border: rgba(0, 0, 0, 0.15);
  --ring: var(--color-primary-500);
  
  /* ==========================================================================
     ANCIENS TOKENS - GARDÉS pour rétrocompatibilité
     ⚠️ NE PAS SUPPRIMER jusqu'à Phase 4
     ========================================================================== */
  
  /* Ces tokens existent déjà dans globals.css */
  /* On les GARDE tels quels, pas besoin de les redéfinir ici */
  /* Ils continueront de fonctionner pendant la migration */
}
```

#### 1.2 Actions
```bash
# Créer nouveau fichier (ne pas toucher globals.css)
/styles/globals-v2-additive.css

# Importer APRÈS globals.css (cascade CSS)
# App.tsx ou index.tsx
import './styles/globals.css';           // Ancien (gardé)
import './styles/globals-v2-additive.css'; // Nouveau (additionnel)
```

**Résultat Phase 1:**
- ✅ Tous anciens tokens fonctionnent
- ✅ Nouveaux --color-* disponibles
- ✅ ZÉRO breaking change
- ✅ App fonctionne identique visuellement

---

### Phase 2 - Tests & Validation (2 jours)

**Objectif:** Valider que les nouveaux tokens fonctionnent

#### 2.1 Tests Manuels
```tsx
// Tester nouveaux tokens dans un composant test
<div style={{
  background: 'var(--color-primary-50)',
  color: 'var(--color-primary-700)',
  border: '1px solid var(--color-primary-500)'
}}>
  Test nouvelle palette
</div>

// Vérifier anciens tokens fonctionnent toujours
<div style={{
  background: 'var(--primary)',    // ← Doit fonctionner
  color: 'var(--primary-50)'       // ← Doit fonctionner
}}>
  Test ancienne convention
</div>
```

#### 2.2 Validation Semantic Colors
```tsx
// Tester vos 5 couleurs sémantiques
const semanticTests = {
  primary: 'var(--color-primary-500)',   // #55A1B4 ✅
  accent: 'var(--color-accent-400)',     // #F8B044 ✅
  success: 'var(--color-success-500)',   // #2A9D8F ✅ NEW
  error: 'var(--color-error-500)',       // #EF4444 ✅ NEW
  destructive: 'var(--color-coral-500)', // #E76F51 ✅
};

// Vérifier visuellement
Object.entries(semanticTests).map(([name, token]) => (
  <div key={name} style={{
    background: token,
    padding: '1rem',
    color: 'white'
  }}>
    {name}: {token}
  </div>
));
```

#### 2.3 Checklist Validation
- [ ] Import globals-v2-additive.css OK
- [ ] Anciens tokens fonctionnent (--primary, --primary-50, etc.)
- [ ] Nouveaux tokens fonctionnent (--color-primary-500, etc.)
- [ ] #55A1B4 = var(--color-primary-500) ✅
- [ ] #F8B044 = var(--color-accent-400) ✅
- [ ] #2A9D8F = var(--color-success-500) ✅
- [ ] #EF4444 = var(--color-error-500) ✅
- [ ] #E76F51 = var(--color-coral-500) ✅
- [ ] Aucune régression visuelle
- [ ] Performance identique

---

### Phase 3 - Migration Progressive (2-3 semaines)

**Objectif:** Migrer le code vers nouveaux tokens

#### 3.1 Règles de Migration

**Composants Standards** → Garder tokens sémantiques
```tsx
// ✅ GARDER tel quel
<Button style={{ background: 'var(--primary)' }} />
<Card style={{ background: 'var(--card)' }} />
```

**Variantes Custom** → Migrer vers palette
```tsx
// ❌ AVANT
<Badge style={{ background: '#e8f2f0' }} />

// ✅ APRÈS
<Badge style={{ background: 'var(--color-success-50)' }} />
```

**Hardcodé** → Migrer vers palette ou sémantique
```tsx
// ❌ AVANT
<Alert style={{ background: '#EF4444' }} />

// ✅ APRÈS (palette)
<Alert style={{ background: 'var(--color-error-500)' }} />

// OU ✅ APRÈS (sémantique)
<Alert style={{ background: 'var(--error)' }} />
```

#### 3.2 Priorités Migration

**Semaine 1 - Composants Critiques (8 composants)**
1. OptimizedSidebar (33 pages)
   ```tsx
   // Rechercher hardcodé
   grep -r "#55A1B4" components/ui/optimized-sidebar.tsx
   
   // Remplacer
   - background: '#55A1B4'
   + background: 'var(--color-primary-500)'
   ```

2. BackgroundBlobs (32 pages)
3. Button/ButtonEnhanced (24 pages)
4. Input (7 pages)
5. CardPatterns (3 pages - Dashboard!)
6. DashboardHeroV3Simple (2 pages)
7. OnboardingFlow (1 page - premier contact)
8. BookingModalMinimal (1 page)

**Semaine 2 - Composants Métier (10 composants)**
9. SectionHeader (5 pages)
10. Badge (5 pages)
11. PageHeaderSimple (4 pages)
12. Tabs (2 pages)
13. Textarea (2 pages)
14. PositionnementModal (2 pages)
15. CancelSessionModal
16. UpcomingSessionCard
17. SearchBar
18. AlertBanner

**Semaine 3 - Composants Restants + Pages Démo**
19-37. Tous autres composants
38. Pages démo (si conservées)

#### 3.3 Template Migration par Composant

```tsx
// AVANT (globals.css)
export function MyComponent() {
  return (
    <div style={{
      background: '#55A1B4',              // ❌ Hardcodé
      color: 'var(--primary-foreground)', // ✅ OK
      border: '1px solid #e8f2f0'         // ❌ Hardcodé
    }}>
      <span style={{ color: '#2A9D8F' }}>Success</span>
    </div>
  );
}

// APRÈS (globals-v2-additive.css)
export function MyComponent() {
  return (
    <div style={{
      background: 'var(--color-primary-500)',  // ✅ Palette
      color: 'var(--primary-foreground)',      // ✅ Sémantique
      border: '1px solid var(--color-success-50)' // ✅ Palette
    }}>
      <span style={{ color: 'var(--color-success-500)' }}>Success</span>
    </div>
  );
}
```

#### 3.4 Tracking Migration

**Fichier:** `/docs/MIGRATION-PROGRESS.md`
```markdown
# Migration Progress

## Composants Critiques (8)
- [ ] OptimizedSidebar (33 pages)
- [ ] BackgroundBlobs (32 pages)
- [ ] Button (16 pages)
- [ ] ButtonEnhanced (8 pages)
- [ ] Input (7 pages)
- [ ] CardPatterns (3 pages)
- [ ] DashboardHeroV3Simple (2 pages)
- [ ] OnboardingFlow (1 page)

## Composants Métier (10)
- [ ] SectionHeader (5 pages)
...

## Couleurs Hardcodées Trouvées
- [ ] #55A1B4 → var(--color-primary-500)
- [ ] #F8B044 → var(--color-accent-400)
- [ ] #2A9D8F → var(--color-success-500)
- [ ] #EF4444 → var(--color-error-500)
- [ ] #E76F51 → var(--color-coral-500)
```

---

### Phase 4 - Cleanup Final (1 semaine)

**⚠️ ATTENTION:** Ne faire QUE après migration 100% complète

#### 4.1 Vérifications Avant Suppression
```bash
# Chercher tous les anciens tokens encore utilisés
grep -r "var(--primary-50)" /components
grep -r "var(--primary-100)" /components
grep -r "var(--secondary-50)" /components
# ... pour TOUS les anciens tokens

# Si résultat = 0 → OK pour supprimer
# Si résultat > 0 → NE PAS supprimer, finir migration
```

#### 4.2 Consolidation Fichiers
```bash
# Étape 1: Backup
cp /styles/globals.css /styles/globals-v1-backup.css

# Étape 2: Merger
# Copier contenu globals-v2-additive.css dans globals.css
# Garder structure:
# 1. Fonts
# 2. --color-* palette
# 3. Tokens sémantiques
# 4. Typography, Spacing, etc.
# 5. Gradients
# 6. Animations

# Étape 3: Supprimer additive
rm /styles/globals-v2-additive.css

# Étape 4: Update imports
# App.tsx
- import './styles/globals.css';
- import './styles/globals-v2-additive.css';
+ import './styles/globals.css';
```

#### 4.3 Supprimer Anciens Tokens (OPTIONNEL)

**⚠️ Ne supprimer QUE si aucun usage trouvé**

```css
/* Dans globals.css, supprimer section aliases deprecated */

/* ❌ À SUPPRIMER (si migration 100%) */
--primary-50: var(--color-primary-50);
--primary-100: var(--color-primary-100);
/* ... tous les --primary-*, --secondary-*, etc. */

/* ✅ GARDER (tokens sémantiques) */
--primary: var(--color-primary-500);
--secondary: var(--color-secondary-500);
--success: var(--color-success-500);
--error: var(--color-error-500);
```

#### 4.4 Tests Finaux
- [ ] App compile sans erreurs
- [ ] Aucune régression visuelle
- [ ] Tous tests passent
- [ ] Lighthouse score maintenu
- [ ] Performance OK
- [ ] Bundle size identique ou réduit

#### 4.5 Documentation Finale
- [ ] Update /docs/01-DESIGN-SYSTEM.md
- [ ] Update /docs/COLOR-TOKENS-QUICK-REFERENCE.md
- [ ] CHANGELOG.md à jour
- [ ] Supprimer MIGRATION-PROGRESS.md

---

## 📋 Mapping Explicit de VOS Couleurs

### Vos 5 Couleurs Sémantiques

```css
/* ==========================================================================
   MAPPING EXPLICIT - VOS COULEURS TLS
   ========================================================================== */

/* 1. #55A1B4 - Bleu TLS (Primary) ✅ */
--color-primary-500: #55A1B4;
--primary: var(--color-primary-500);

/* Usage: Brand, navigation, links, CTA primaires */
<Button style={{ background: 'var(--primary)' }} />
<NavLink style={{ color: 'var(--color-primary-500)' }} />

/* 2. #F8B044 - Jaune TLS (Accent/Warning) ✅ */
--color-accent-400: #F8B044;
--color-warning-400: #F8B044;  /* Même couleur */
--accent: var(--color-accent-400);
--warning: var(--color-warning-400);

/* Usage: Badges, warnings, highlights */
<Badge style={{ background: 'var(--color-accent-50)' }} />
<Alert variant="warning" style={{ borderColor: 'var(--warning)' }} />

/* 3. #2A9D8F - Teal (Success) ✅ NOUVEAU */
--color-success-500: #2A9D8F;
--color-teal-500: #2A9D8F;  /* Alias */
--success: var(--color-success-500);

/* Usage: Success states, completion, positive feedback */
<SuccessMessage style={{ background: 'var(--color-success-50)' }} />
<ProgressBar fill="var(--success)" />

/* 4. #EF4444 - Rouge (Error) ✅ NOUVEAU */
--color-error-500: #EF4444;
--error: var(--color-error-500);

/* Usage: Errors, validation, critical alerts */
<ErrorAlert style={{ background: 'var(--color-error-50)' }} />
<Input error style={{ borderColor: 'var(--error)' }} />

/* 5. #E76F51 - Coral (Destructive) ✅ */
--color-coral-500: #E76F51;
--destructive: var(--color-coral-500);

/* Usage: Destructive actions (delete, cancel session) */
<Button variant="destructive" style={{ background: 'var(--destructive)' }} />
<DeleteModal accent="var(--color-coral-500)" />
```

### Tableau Récapitulatif

| Votre Couleur | Nom | Token Palette | Token Sémantique | Usage |
|---------------|-----|---------------|------------------|-------|
| **#55A1B4** | Bleu TLS | `--color-primary-500` | `--primary` | Brand, Navigation, Links |
| **#F8B044** | Jaune TLS | `--color-accent-400` | `--accent`, `--warning` | Badges, Warnings, Highlights |
| **#2A9D8F** | Teal | `--color-success-500` | `--success` | Success, Completion |
| **#EF4444** | Rouge | `--color-error-500` | `--error` | Errors, Validation |
| **#E76F51** | Coral | `--color-coral-500` | `--destructive` | Delete, Cancel, Destructive |

---

## 🎯 Checklist Par Phase

### Phase 1 - Additive ✅
- [✅] Créer globals-v2-additive.css
- [✅] Définir --color-primary-* (50-900)
- [✅] Définir --color-secondary-* (50-900)
- [✅] Définir --color-accent-* (50-900)
- [✅] Définir --color-neutral-* (50-900)
- [✅] Définir --color-success-* avec #2A9D8F
- [✅] Définir --color-error-* avec #EF4444
- [✅] Définir --color-coral-* avec #E76F51
- [✅] Mapper tokens sémantiques
- [✅] Importer APRÈS globals.css
- [ ] Tests visuels OK

### Phase 2 - Validation
- [ ] 5 couleurs sémantiques correctes
- [ ] Anciens tokens fonctionnent
- [ ] Nouveaux tokens fonctionnent
- [ ] Aucune régression

### Phase 3 - Migration Code
- [ ] Composants critiques (8)
- [ ] Composants métier (10)
- [ ] Autres composants
- [ ] Pages démo

### Phase 4 - Cleanup
- [ ] Vérifier 0 usage anciens tokens
- [ ] Merger fichiers
- [ ] Supprimer anciens tokens (optionnel)
- [ ] Tests finaux
- [ ] Documentation

---

## 🚨 Questions Décisionnelles

### 1. #E76F51 (Coral) - Quelle Option?

**Recommandation:** Option A - Remplacer

```css
/* Option A - RECOMMANDÉ */
--color-coral-500: #E76F51;  /* Votre nouvelle couleur */
--destructive: var(--color-coral-500);

/* Ancien #f49a76 devient deprecated */
```

**Raisons:**
- Cohérence avec vos 5 couleurs sémantiques
- Simplifie la palette (pas de doublon coral)
- Impact minimal (destructive utilisé peu souvent)

**Alternative:** Option B si vous voulez garder les deux

### 2. --color-teal-* vs --color-success-*

**Recommandation:** Aliases (déjà fait)

```css
--color-success-500: #2A9D8F;
--color-teal-500: var(--color-success-500);  /* Alias */
```

**Raison:** Flexibilité (teal = nom couleur, success = contexte)

---

_Plan Migration V2 | Créé: 22/02/2026 | Approche: Additive First_
