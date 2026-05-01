# 🎨 TLS Color Tokens - Migration Plan FINAL

**Version:** 2.0 FINAL | **Date:** 22/02/2026  
**Status:** Production Ready

---

## 🎯 Stratégie: 100% Additive, Delete Last

```
Phase 1 ✅ - AJOUTER (ne rien supprimer)
Phase 2 - TESTER (valider compatibilité)
Phase 3 - MIGRER CODE (progressif, non-bloquant)
Phase 4 - CLEANUP (optionnel, après migration 100%)
```

**Règle d'Or:** Anciens tokens gardés jusqu'à Phase 4 finale.

---

## 📐 Convention Finale TLS V2

### ✅ 5 Familles Palette UNIQUEMENT

| Famille | Base Color | Shades | Token Sémantique |
|---------|-----------|--------|------------------|
| **PRIMARY** | #55A1B4 (Bleu) | 50-900 | `--primary` |
| **SECONDARY** | #ED843A (Orange) | 50-900 | `--secondary` |
| **ACCENT** | #F8B044 (Jaune) | 50-900 | `--accent` |
| **SUCCESS** | #2A9D8F (Teal) | 50-900 | `--success` |
| **ERROR** | #EF4444 (Rouge) + #E76F51 | 50-900 | `--error`, `--destructive` |
| **NEUTRAL** | Grays | 50-900 | - |

### ✅ Tokens Sémantiques (Pas de Doublons)

```css
/* Brand */
--primary: var(--color-primary-500)
--secondary: var(--color-secondary-500)
--accent: var(--color-accent-400)

/* States */
--success: var(--color-success-500)
--error: var(--color-error-500)
--warning: var(--color-accent-400)      /* ← ALIAS (pas de --color-warning-*) */

/* Special */
--destructive: var(--color-error-600)   /* ← #E76F51 intégré dans error */
--info: var(--color-primary-600)        /* ← ALIAS (pas de --color-info-*) */
```

### ❌ Supprimé (Pas de Familles Redondantes)

```css
/* ❌ PAS de --color-teal-* (remplacé par --color-success-*) */
/* ❌ PAS de --color-coral-* (intégré dans --color-error-*) */
/* ❌ PAS de --color-warning-* (alias de --color-accent-*) */
/* ❌ PAS de --color-info-* (alias de --color-primary-*) */
```

### 🎨 Décision #E76F51 (Coral)

**Choix:** Intégré dans palette ERROR comme intensité 600

```css
--color-error-50: #FEF2F2;   /* Très clair */
--color-error-500: #EF4444;  /* Base rouge */
--color-error-600: #E76F51;  /* ← Coral (destructive) */
--color-error-700: #DC2626;
--color-error-900: #7F1D1D;  /* Très foncé */

/* Token sémantique */
--destructive: var(--color-error-600);  /* #E76F51 */
```

**Pourquoi:**
- Évite une famille `coral-*` redondante
- Destructive = intensité d'erreur (logique sémantique)
- Simplifie la palette (6 familles au lieu de 8)

---

## 🚀 Phase 1 - AJOUTER (1h) ✅

**Objectif:** Ajouter --color-* SANS supprimer anciens tokens

### 1.1 Fichier Créé

✅ `/styles/globals-v2-final.css`

**Contenu:**
- Palette 5 couleurs (primary, secondary, accent, success, error)
- Palette neutral (grays)
- #E76F51 → `--color-error-600`
- Tokens sémantiques sans doublons
- Gradients optimisés

### 1.2 Import Additive

```tsx
// App.tsx ou index.tsx
import './styles/globals.css';         // ← Ancien (GARDÉ)
import './styles/globals-v2-final.css';  // ← Nouveau (AJOUTÉ)
```

**Résultat:**
- ✅ Anciens tokens fonctionnent (`--primary`, `--primary-50`, etc.)
- ✅ Nouveaux tokens disponibles (`--color-primary-500`, etc.)
- ✅ Cascade CSS: v2-final overrides globals.css si conflit
- ✅ ZÉRO breaking change

### 1.3 Validation Import

```bash
# Vérifier import dans App.tsx
cat /App.tsx | grep "import.*globals"

# Devrait afficher:
# import './styles/globals.css';
# import './styles/globals-v2-final.css';
```

---

## 🧪 Phase 2 - TESTER (2 jours)

**Objectif:** Valider compatibilité visuelle

### 2.1 Tests Couleurs Sémantiques

Créer composant de test:

```tsx
// /components/test/ColorTokensTest.tsx
export function ColorTokensTest() {
  const colors = [
    { name: 'Primary #55A1B4', palette: '--color-primary-500', semantic: '--primary' },
    { name: 'Accent #F8B044', palette: '--color-accent-400', semantic: '--accent' },
    { name: 'Success #2A9D8F', palette: '--color-success-500', semantic: '--success' },
    { name: 'Error #EF4444', palette: '--color-error-500', semantic: '--error' },
    { name: 'Destructive #E76F51', palette: '--color-error-600', semantic: '--destructive' },
  ];
  
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Test Palette V2</h2>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        {colors.map(({ name, palette, semantic }) => (
          <div key={name}>
            <div style={{
              width: '100px',
              height: '100px',
              background: `var(${palette})`,
              borderRadius: '0.5rem'
            }} />
            <p style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>{name}</p>
            <code style={{ fontSize: '0.625rem' }}>{palette}</code>
          </div>
        ))}
      </div>
      
      <h3 style={{ marginTop: '2rem' }}>Test Tokens Sémantiques</h3>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        {colors.map(({ name, semantic }) => (
          <div key={semantic}>
            <div style={{
              width: '100px',
              height: '100px',
              background: `var(${semantic})`,
              borderRadius: '0.5rem'
            }} />
            <code style={{ fontSize: '0.625rem' }}>{semantic}</code>
          </div>
        ))}
      </div>
      
      <h3 style={{ marginTop: '2rem' }}>Test Anciens Tokens</h3>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div style={{ background: 'var(--primary)', width: '100px', height: '100px' }}>--primary</div>
        <div style={{ background: 'var(--primary-50)', width: '100px', height: '100px' }}>--primary-50</div>
        <div style={{ background: 'var(--accent)', width: '100px', height: '100px' }}>--accent</div>
      </div>
    </div>
  );
}
```

### 2.2 Checklist Validation

**Couleurs Palette:**
- [ ] `--color-primary-500` = #55A1B4 ✅
- [ ] `--color-accent-400` = #F8B044 ✅
- [ ] `--color-success-500` = #2A9D8F ✅
- [ ] `--color-error-500` = #EF4444 ✅
- [ ] `--color-error-600` = #E76F51 ✅

**Tokens Sémantiques:**
- [ ] `--primary` = #55A1B4
- [ ] `--accent` = #F8B044
- [ ] `--success` = #2A9D8F
- [ ] `--error` = #EF4444
- [ ] `--destructive` = #E76F51
- [ ] `--warning` = #F8B044 (alias accent)
- [ ] `--info` = #4A8FA1 (alias primary-600)

**Anciens Tokens (Rétrocompat):**
- [ ] `--primary` fonctionne
- [ ] `--primary-50` fonctionne
- [ ] `--secondary` fonctionne
- [ ] `--accent` fonctionne

**Visuel:**
- [ ] Dashboard - Hero, Cards, Buttons OK
- [ ] Parcours - Badges niveaux OK
- [ ] Coaching - CTA, Modals OK
- [ ] Auth - Background gradient OK

**Performance:**
- [ ] Lighthouse score maintenu
- [ ] Aucun warning console
- [ ] Temps chargement identique

---

## 🔄 Phase 3 - MIGRER CODE (2-3 semaines)

**Objectif:** Remplacer hardcodé par tokens (progressif)

### 3.1 Priorités Migration

**Semaine 1 - Composants Critiques (8)**
1. **OptimizedSidebar** (33 pages)
2. **BackgroundBlobs** (32 pages)
3. **Button** (16 pages)
4. **ButtonEnhanced** (8 pages)
5. **Input** (7 pages)
6. **CardPatterns** (3 pages - Dashboard)
7. **DashboardHeroV3Simple** (2 pages)
8. **OnboardingFlow** (1 page)

**Semaine 2 - Composants Métier (10)**
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

**Semaine 3 - Reste + Démo**
19-37. Autres composants
38. Pages démo (si conservées)

### 3.2 Recherche Hardcodé

```bash
# Chercher toutes couleurs hardcodées
grep -r "#55A1B4" /components > hardcoded-primary.txt
grep -r "#F8B044" /components > hardcoded-accent.txt
grep -r "#2A9D8F" /components > hardcoded-success.txt
grep -r "#EF4444" /components > hardcoded-error.txt
grep -r "#E76F51" /components > hardcoded-destructive.txt

# Anciens tokens à migrer
grep -r "#9dbeba" /components > hardcoded-old-teal.txt
grep -r "#f49a76" /components > hardcoded-old-coral.txt
```

### 3.3 Templates Remplacement

#### #55A1B4 → Primary
```tsx
// ❌ AVANT
<Button style={{ background: '#55A1B4' }} />

// ✅ APRÈS (sémantique - composant standard)
<Button style={{ background: 'var(--primary)' }} />

// ✅ APRÈS (palette - variante custom)
<Badge style={{ background: 'var(--color-primary-50)' }} />
```

#### #F8B044 → Accent/Warning
```tsx
// ❌ AVANT
<Alert style={{ borderColor: '#F8B044' }} />

// ✅ APRÈS
<Alert style={{ borderColor: 'var(--warning)' }} />
// OU
<Badge style={{ background: 'var(--color-accent-50)' }} />
```

#### #2A9D8F → Success
```tsx
// ❌ AVANT (ancien teal #9dbeba)
<Badge style={{ color: '#9dbeba' }} />

// ✅ APRÈS (nouveau teal #2A9D8F)
<Badge style={{ color: 'var(--success)' }} />
// OU
<Badge style={{ background: 'var(--color-success-50)' }} />
```

#### #EF4444 → Error
```tsx
// ❌ AVANT
<Input style={{ borderColor: '#EF4444' }} />

// ✅ APRÈS
<Input error style={{ borderColor: 'var(--error)' }} />
```

#### #E76F51 → Destructive
```tsx
// ❌ AVANT (ancien coral #f49a76)
<Button style={{ background: '#f49a76' }} />

// ✅ APRÈS (nouveau coral #E76F51)
<Button variant="destructive" style={{ background: 'var(--destructive)' }} />
// OU
<Button style={{ background: 'var(--color-error-600)' }} />
```

### 3.4 Tracking Migration

**Fichier:** `/docs/MIGRATION-PROGRESS.md`

```markdown
# Migration Progress V2

## Semaine 1 (Critiques)
- [ ] OptimizedSidebar (33 pages) - 0%
- [ ] BackgroundBlobs (32 pages) - 0%
- [ ] Button (16 pages) - 0%
- [ ] ButtonEnhanced (8 pages) - 0%
- [ ] Input (7 pages) - 0%
- [ ] CardPatterns (3 pages) - 0%
- [ ] DashboardHeroV3Simple (2 pages) - 0%
- [ ] OnboardingFlow (1 page) - 0%

## Semaine 2 (Métier)
- [ ] SectionHeader - 0%
- [ ] Badge - 0%
...

## Hardcodé Trouvé
- [ ] #55A1B4: X occurrences
- [ ] #F8B044: X occurrences
- [ ] #2A9D8F: X occurrences
- [ ] #EF4444: X occurrences
- [ ] #E76F51: X occurrences
- [ ] #9dbeba (ancien): X occurrences
- [ ] #f49a76 (ancien): X occurrences
```

---

## 🧹 Phase 4 - CLEANUP (1 semaine)

**⚠️ OPTIONNEL - Ne faire QUE après migration 100%**

### 4.1 Vérification Avant Suppression

```bash
# Chercher TOUS les anciens tokens encore utilisés
grep -r "var(--primary-50)" /components
grep -r "var(--primary-100)" /components
grep -r "var(--secondary-50)" /components
grep -r "var(--accent-50)" /components
# ... pour TOUS les anciens shades

# Si résultat = 0 pour tous → OK pour supprimer
# Si résultat > 0 → NE PAS supprimer, finir migration
```

### 4.2 Option A - Merger Fichiers (Recommandé)

```bash
# 1. Backup
cp /styles/globals.css /styles/globals-v1-backup.css

# 2. Créer nouveau globals.css
# Copier structure de globals-v2-final.css dans globals.css
# Ordre:
# - Fonts
# - --color-* palette (5 familles + neutral)
# - Tokens sémantiques
# - Typography, Spacing, Borders, etc.
# - Gradients
# - Animations
# - Base styles

# 3. Supprimer globals-v2-final.css
rm /styles/globals-v2-final.css

# 4. Update imports
# App.tsx
- import './styles/globals.css';
- import './styles/globals-v2-final.css';
+ import './styles/globals.css';
```

### 4.3 Option B - Garder Séparé (Alternative)

```tsx
// App.tsx - Garder import séparé
import './styles/globals.css';         // Base (fonts, typography, etc.)
import './styles/globals-v2-final.css';  // Colors tokens V2
```

**Avantage:** Séparation claire, facile de switch

### 4.4 Supprimer Anciens Tokens (TRÈS OPTIONNEL)

**⚠️ Ne faire QUE si 100% sûr**

```css
/* Dans globals.css merged, supprimer section "LEGACY ALIASES" */

/* ❌ À SUPPRIMER (si migration 100%) */
--primary-50: var(--color-primary-50);
--primary-100: var(--color-primary-100);
--primary-200: var(--color-primary-200);
/* ... tous les --primary-*, --secondary-*, --accent-*, etc. */

/* ✅ GARDER (tokens sémantiques essentiels) */
--primary: var(--color-primary-500);
--secondary: var(--color-secondary-500);
--accent: var(--color-accent-400);
--success: var(--color-success-500);
--error: var(--color-error-500);
--warning: var(--color-accent-400);
--destructive: var(--color-error-600);
--info: var(--color-primary-600);
```

### 4.5 Tests Finaux

- [ ] App compile sans erreurs
- [ ] Toutes pages s'affichent correctement
- [ ] Aucune régression visuelle
- [ ] Tests unitaires passent (si existants)
- [ ] Lighthouse score maintenu ou amélioré
- [ ] Performance OK
- [ ] Bundle size identique ou réduit

### 4.6 Documentation Finale

- [ ] Update `/docs/01-DESIGN-SYSTEM.md`
- [ ] Update `/README.md`
- [ ] CHANGELOG.md version bump
- [ ] Archiver guides migration dans `/docs/archives/`
- [ ] Supprimer MIGRATION-PROGRESS.md

---

## 📋 Checklist Complète

### Phase 1 - Ajouter ✅
- [✅] Créer `/styles/globals-v2-final.css`
- [✅] Définir --color-primary-* (50-900)
- [✅] Définir --color-secondary-* (50-900)
- [✅] Définir --color-accent-* (50-900)
- [✅] Définir --color-success-* (50-900) avec #2A9D8F
- [✅] Définir --color-error-* (50-900) avec #EF4444 + #E76F51 → 600
- [✅] Définir --color-neutral-* (50-900)
- [✅] Mapper tokens sémantiques sans doublons
- [✅] Gradients optimisés
- [ ] Import APRÈS globals.css dans App.tsx

### Phase 2 - Tester
- [ ] ColorTokensTest composant créé
- [ ] 5 couleurs palette correctes
- [ ] Tokens sémantiques corrects
- [ ] Anciens tokens fonctionnent
- [ ] Tests visuels 7 pages
- [ ] Performance OK

### Phase 3 - Migrer Code
- [ ] Semaine 1: 8 composants critiques
- [ ] Semaine 2: 10 composants métier
- [ ] Semaine 3: Reste + démo
- [ ] Tracking MIGRATION-PROGRESS.md

### Phase 4 - Cleanup (Optionnel)
- [ ] Vérifier 0 usage anciens tokens shades
- [ ] Merger fichiers OU garder séparé
- [ ] Supprimer anciens tokens (très optionnel)
- [ ] Tests finaux
- [ ] Documentation updated

---

## 🎨 Récapitulatif Convention

### ✅ CE QUI EST DANS V2 FINAL

```css
/* 5 FAMILLES PALETTE */
--color-primary-*    (50-900) /* #55A1B4 */
--color-secondary-*  (50-900) /* #ED843A */
--color-accent-*     (50-900) /* #F8B044 */
--color-success-*    (50-900) /* #2A9D8F */
--color-error-*      (50-900) /* #EF4444 + #E76F51 → 600 */
--color-neutral-*    (50-900) /* Grays */

/* TOKENS SÉMANTIQUES */
--primary, --secondary, --accent
--success, --error, --warning
--destructive, --info
--background, --foreground, --card, etc.
```

### ❌ CE QUI N'EST PAS DANS V2 FINAL

```css
/* PAS de familles redondantes */
--color-teal-*      /* ❌ Remplacé par --color-success-* */
--color-coral-*     /* ❌ Intégré dans --color-error-* */
--color-warning-*   /* ❌ Alias de --color-accent-* */
--color-info-*      /* ❌ Alias de --color-primary-* */
```

---

_Migration Plan FINAL | 22/02/2026 | Convention TLS Canonique_
