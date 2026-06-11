# 🎨 Color Tokens Migration - Plan Final TLS

**Version:** 2.1.0 | **Date:** 22/02/2026  
**Status:** Production Ready - Convention Finale Approuvée

---

## 🎯 Décision Finale: Architecture Simplifiée

### ✅ Convention TLS Validée

**5 couleurs sémantiques → 6 palettes (pas de doublons)**

```
PRIMARY     → #55A1B4 (Bleu TLS)
SECONDARY   → #ED843A (Orange) + #E76F51 intégré en shade 600
ACCENT      → #F8B044 (Jaune TLS)
NEUTRAL     → Grays
SUCCESS     → #2A9D8F (Teal)
ERROR       → #EF4444 (Rouge)
```

**Aliases (pas de palettes séparées):**
- `--warning` → alias vers `--accent`
- `--info` → alias vers `--primary-600`
- `--destructive` → `--color-secondary-600` (#E76F51 intégré)

**❌ Supprimé:**
- ~~--color-teal-*~~ (utiliser --color-success-*)
- ~~--color-coral-*~~ (#E76F51 intégré dans --color-secondary-600)
- ~~--color-info-*~~ (alias vers primary)
- ~~--color-warning-*~~ (alias vers accent)

---

## 📋 Mapping Vos 5 Couleurs

| Hex | Nom | Palette | Token Sémantique | Notes |
|-----|-----|---------|------------------|-------|
| **#55A1B4** | Bleu TLS | `--color-primary-500` | `--primary` | ✅ Primary brand |
| **#F8B044** | Jaune TLS | `--color-accent-400` | `--accent`, `--warning` | ✅ Warning = alias |
| **#2A9D8F** | Teal | `--color-success-500` | `--success` | 🆕 Success |
| **#EF4444** | Rouge | `--color-error-500` | `--error` | 🆕 Error |
| **#E76F51** | Coral | `--color-secondary-600` | `--destructive` | ⚠️ Intégré secondary |

---

## 🎨 Structure Palette Secondary

**Décision clé:** #E76F51 intégré dans secondary (orange chaud)

```css
/* SECONDARY - Orange TLS + Destructive intégré */
--color-secondary-50: #FFF3EB;   /* Très clair */
--color-secondary-100: #FDDCC7;
--color-secondary-200: #FCBB93;
--color-secondary-300: #F59A5F;
--color-secondary-400: #F18A4C;
--color-secondary-500: #ED843A;  /* ← Base Orange TLS */
--color-secondary-600: #E76F51;  /* ← Destructive intégré */
--color-secondary-700: #C06920;
--color-secondary-800: #8F5017;
--color-secondary-900: #5E3710;

/* Token sémantique */
--secondary: var(--color-secondary-500);  /* Orange */
--destructive: var(--color-secondary-600);  /* Coral destructive */
```

**Pourquoi?**
- #E76F51 est un orange/coral chaud
- Logique: variante plus chaude de secondary
- Pas besoin de famille coral séparée
- Cohérence: 6 palettes au lieu de 8

---

## 🚀 Plan Migration (4 Phases - Additive)

### Phase 1 - AJOUTER Tokens ✅ FAIT

**Fichier:** `/styles/globals-v2-additive-clean.css`

**Actions:**
```tsx
// App.tsx ou index.tsx
import './styles/globals.css';                  // Ancien (gardé)
import './styles/globals-v2-additive-clean.css'; // Nouveau (additionnel)
```

**Validation:**
- [✅] Fichier clean créé
- [✅] 6 palettes définies (primary, secondary, accent, neutral, success, error)
- [✅] #E76F51 intégré dans --color-secondary-600
- [✅] Aliases définis (warning→accent, info→primary)
- [✅] Aucune famille teal/coral séparée
- [ ] Import dans App
- [ ] Tests visuels

---

### Phase 2 - TESTER & Valider (2 jours)

#### 2.1 Importer Fichier Clean
```tsx
// /App.tsx ou /src/index.tsx
import './styles/globals.css';
import './styles/globals-v2-additive-clean.css';  // ← Ajouter
```

#### 2.2 Tests Visuels - 5 Couleurs

**Créer composant de test:**
```tsx
// /components/tests/ColorFinalTest.tsx
export function ColorFinalTest() {
  const colors = [
    { name: 'Primary', hex: '#55A1B4', token: '--primary' },
    { name: 'Accent/Warning', hex: '#F8B044', token: '--accent' },
    { name: 'Success', hex: '#2A9D8F', token: '--success' },
    { name: 'Error', hex: '#EF4444', token: '--error' },
    { name: 'Destructive', hex: '#E76F51', token: '--destructive' },
  ];
  
  return (
    <div style={{ padding: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      {colors.map(({ name, hex, token }) => (
        <div key={token} style={{ textAlign: 'center' }}>
          {/* Swatch couleur */}
          <div style={{
            width: '120px',
            height: '120px',
            background: `var(${token})`,
            borderRadius: '0.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 600,
            fontSize: '0.875rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <div>{name}</div>
            <div style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>{hex}</div>
          </div>
          
          {/* Token name */}
          <code style={{ 
            display: 'block',
            marginTop: '0.5rem',
            fontSize: '0.75rem',
            color: 'var(--muted-foreground)'
          }}>
            {token}
          </code>
          
          {/* Palette token */}
          <code style={{
            display: 'block',
            fontSize: '0.7rem',
            color: 'var(--muted-foreground)',
            opacity: 0.7
          }}>
            {token === '--destructive' ? '--color-secondary-600' : 
             token === '--accent' ? '--color-accent-400' :
             token.replace('--', '--color-') + '-500'}
          </code>
        </div>
      ))}
    </div>
  );
}
```

**Ajouter dans une page:**
```tsx
// DashboardPage.tsx ou DesignSystemPage.tsx
import { ColorFinalTest } from './components/tests/ColorFinalTest';

// Temporairement
<ColorFinalTest />
```

#### 2.3 Validation Checklist
- [ ] #55A1B4 s'affiche correctement (bleu)
- [ ] #F8B044 s'affiche correctement (jaune)
- [ ] #2A9D8F s'affiche correctement (teal)
- [ ] #EF4444 s'affiche correctement (rouge)
- [ ] #E76F51 s'affiche correctement (coral)
- [ ] `--warning` = `--accent` (même couleur)
- [ ] `--destructive` = #E76F51 (secondary-600)
- [ ] Anciens tokens fonctionnent (--primary, --primary-50, etc.)
- [ ] Aucune régression visuelle app

---

### Phase 3 - MIGRER Code (2-3 semaines)

#### 3.1 Rechercher Hardcodé

```bash
# Vos 5 couleurs sémantiques
grep -r "#55A1B4" /components /pages
grep -r "#F8B044" /components /pages
grep -r "#2A9D8F" /components /pages
grep -r "#EF4444" /components /pages
grep -r "#E76F51" /components /pages

# Anciennes couleurs à remplacer
grep -r "#9dbeba" /components /pages  # Ancien teal → #2A9D8F
grep -r "#f49a76" /components /pages  # Ancien coral → #E76F51
grep -r "#ED843A" /components /pages  # Orange (OK mais peut utiliser token)
```

#### 3.2 Règles de Remplacement

**Composants Standards** → Tokens sémantiques
```tsx
// ✅ UTILISER
<Button style={{ background: 'var(--primary)' }} />
<Alert variant="success" style={{ background: 'var(--success)' }} />
```

**Variantes Custom** → Palette
```tsx
// ✅ UTILISER
<Badge style={{ 
  background: 'var(--color-success-50)',
  color: 'var(--color-success-700)'
}} />
```

**Hardcodé** → Migrer
```tsx
// ❌ AVANT
background: '#55A1B4'
background: '#F8B044'
background: '#2A9D8F'
background: '#EF4444'
background: '#E76F51'

// ✅ APRÈS (sémantique)
background: 'var(--primary)'
background: 'var(--accent)'
background: 'var(--success)'
background: 'var(--error)'
background: 'var(--destructive)'

// ✅ OU APRÈS (palette pour variantes)
background: 'var(--color-primary-500)'
background: 'var(--color-accent-400)'
background: 'var(--color-success-500)'
background: 'var(--color-error-500)'
background: 'var(--color-secondary-600)'  /* destructive */
```

#### 3.3 Priorités (Semaines)

**Semaine 1 - Composants Critiques (8)**
1. OptimizedSidebar (33 pages) - #55A1B4
2. BackgroundBlobs (32 pages) - #55A1B4
3. Button (16 pages) - #55A1B4, #F8B044
4. ButtonEnhanced (8 pages) - #55A1B4
5. Input (7 pages) - borders
6. CardPatterns (3 pages) - gradients
7. DashboardHeroV3Simple (2 pages) - hero
8. OnboardingFlow (1 page) - first touch

**Semaine 2 - Composants Métier (10)**
9. SectionHeader (5 pages)
10. Badge (5 pages) - tous les niveaux
11. PageHeaderSimple (4 pages)
12. Tabs (2 pages)
13. Textarea (2 pages)
14. PositionnementModal (2 pages) - #E76F51 destructive
15. CancelSessionModal - #E76F51
16. UpcomingSessionCard
17. SearchBar
18. AlertBanner - success/error/warning

**Semaine 3 - Reste**
19-37. Autres composants
38. Pages démo

#### 3.4 Template Migration

```tsx
// EXEMPLE: Badge Component

// ❌ AVANT
export function Badge({ niveau }: { niveau: string }) {
  const colors = {
    debutant: { bg: '#e8f2f0', text: '#9dbeba' },
    intermediaire: { bg: '#E8F4F7', text: '#4A8FA1' },
    avance: { bg: '#DCEBEF', text: '#3D7786' },
    expert: { bg: '#FFF9EE', text: '#C68D36' },
  };
  
  const style = colors[niveau];
  
  return (
    <span style={{
      background: style.bg,
      color: style.text,
      padding: '0.25rem 0.5rem',
      borderRadius: '0.25rem'
    }}>
      {niveau}
    </span>
  );
}

// ✅ APRÈS (avec nouveaux tokens)
export function Badge({ niveau }: { niveau: string }) {
  const colors = {
    debutant: { 
      bg: 'var(--color-success-50)',      /* Teal clair */
      text: 'var(--color-success-700)'    /* Teal foncé */
    },
    intermediaire: { 
      bg: 'var(--color-primary-50)', 
      text: 'var(--color-primary-700)' 
    },
    avance: { 
      bg: 'var(--color-primary-100)', 
      text: 'var(--color-primary-800)' 
    },
    expert: { 
      bg: 'var(--color-accent-50)', 
      text: 'var(--color-accent-700)' 
    },
  };
  
  const style = colors[niveau];
  
  return (
    <span style={{
      background: style.bg,
      color: style.text,
      padding: '0.25rem 0.5rem',
      borderRadius: 'var(--radius-sm)'
    }}>
      {niveau}
    </span>
  );
}
```

---

### Phase 4 - CLEANUP (1 semaine - après migration complète)

⚠️ **Ne faire QU'APRÈS 100% migration code**

#### 4.1 Vérifier Zéro Usage Anciens Tokens
```bash
# Chercher tous anciens tokens dans code
grep -r "var(--primary-50)" /components /pages
grep -r "var(--secondary-50)" /components /pages
grep -r "var(--accent-50)" /components /pages
# Si 0 résultat → OK pour cleanup
```

#### 4.2 Consolider Fichiers
```bash
# Backup
cp /styles/globals.css /styles/globals-v1-backup.css

# Créer nouveau globals.css unifié
# Copier contenu globals-v2-additive-clean.css + autres sections de globals.css
# (Typography, Spacing, Shadows, Animations, etc.)

# Supprimer fichier additive
rm /styles/globals-v2-additive-clean.css

# Update imports
# App.tsx
- import './styles/globals.css';
- import './styles/globals-v2-additive-clean.css';
+ import './styles/globals.css';
```

#### 4.3 Supprimer Anciens Tokens (OPTIONNEL)

**Uniquement si aucun usage trouvé**

```css
/* Dans globals.css final, supprimer aliases deprecated */
/* --primary-50, --primary-100, etc. */
/* --secondary-50, --secondary-100, etc. */

/* ✅ GARDER tokens sémantiques */
--primary, --secondary, --accent, --success, --error, --warning, --destructive
```

---

## 📊 Tableau Récapitulatif

### 6 Palettes Finales

| Palette | Base Hex | Shades | Notes |
|---------|----------|--------|-------|
| `--color-primary-*` | #55A1B4 | 50-900 | Bleu TLS |
| `--color-secondary-*` | #ED843A | 50-900 | Orange + #E76F51 en 600 |
| `--color-accent-*` | #F8B044 | 50-900 | Jaune TLS |
| `--color-neutral-*` | Grays | 50-900 | Text, borders |
| `--color-success-*` | #2A9D8F | 50-900 | Teal (nouveau) |
| `--color-error-*` | #EF4444 | 50-900 | Rouge (nouveau) |

### Tokens Sémantiques (8)

| Token | Mapping | Hex | Type |
|-------|---------|-----|------|
| `--primary` | `--color-primary-500` | #55A1B4 | Brand |
| `--secondary` | `--color-secondary-500` | #ED843A | Brand |
| `--accent` | `--color-accent-400` | #F8B044 | Brand |
| `--success` | `--color-success-500` | #2A9D8F | Semantic |
| `--error` | `--color-error-500` | #EF4444 | Semantic |
| `--warning` | `--color-accent-400` | #F8B044 | Alias accent |
| `--destructive` | `--color-secondary-600` | #E76F51 | Semantic intégré |
| `--info` | `--color-primary-600` | #4A8FA1 | Alias primary |

---

## ✅ Checklist Finale

### Phase 1 - Setup
- [✅] Fichier clean créé `/styles/globals-v2-additive-clean.css`
- [✅] 6 palettes définies
- [✅] #E76F51 intégré --color-secondary-600
- [✅] Pas de famille teal/coral séparée
- [✅] Warning = alias accent
- [✅] Info = alias primary
- [ ] Import dans App

### Phase 2 - Tests
- [ ] Import globals-v2-additive-clean.css
- [ ] Composant ColorFinalTest créé
- [ ] 5 couleurs validées visuellement
- [ ] Anciens tokens fonctionnent
- [ ] Nouveaux tokens fonctionnent
- [ ] Aucune régression

### Phase 3 - Migration
- [ ] Recherche hardcodé complète
- [ ] Semaine 1: 8 composants critiques
- [ ] Semaine 2: 10 composants métier
- [ ] Semaine 3: Reste + démo
- [ ] MIGRATION-PROGRESS.md maintenu

### Phase 4 - Cleanup
- [ ] Vérifier 0 usage anciens tokens
- [ ] Consolider globals.css
- [ ] Supprimer globals-v2-additive-clean.css
- [ ] Update imports
- [ ] Tests finaux
- [ ] Documentation finale

---

## 🎯 Prochaine Action Immédiate

**MAINTENANT:**
```tsx
// /App.tsx
import './styles/globals.css';
import './styles/globals-v2-additive-clean.css';  // ← AJOUTER CETTE LIGNE
```

**Puis créer composant test pour valider visuellement les 5 couleurs.**

---

_Plan Final V2.1.0 | Convention TLS Validée | 22/02/2026_
