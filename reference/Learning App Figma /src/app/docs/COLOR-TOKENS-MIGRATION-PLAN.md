# 🎨 Color Tokens Migration Plan - TLS V2.0.0

**Version:** 2.0.0 | **Date:** 22/02/2026  
**Status:** Ready for Implementation

---

## 🎯 Objectifs

### Avant (V1)
```css
/* ❌ Mélange palette et sémantique */
--primary: #55A1B4;
--primary-50: #E8F4F7;
--secondary: #ED843A;
--background: #ffffff;
--card: #ffffff;
```

**Problèmes:**
- Palette et tokens sémantiques mélangés
- Pas de séparation claire des responsabilités
- Difficile de changer de thème
- Convention incohérente

### Après (V2)
```css
/* ✅ Séparation claire */

/* PALETTE - Base colors (ne pas utiliser directement) */
--color-primary-50: #E8F4F7;
--color-primary-500: #55A1B4;
--color-primary-900: #1F3E45;

/* SEMANTIC - Utilisation contextuelle */
--primary: var(--color-primary-500);
--background: #ffffff;
--card: #ffffff;

/* LEGACY - Rétrocompatibilité */
--primary-50: var(--color-primary-50);
```

**Avantages:**
- ✅ Séparation claire palette / sémantique
- ✅ Convention canonique (--color-*)
- ✅ Facilité de thématisation
- ✅ Rétrocompatibilité totale
- ✅ Scalable (facile d'ajouter variantes dark mode)

---

## 📋 Architecture V2

### 1. Palette de Base (--color-*)
**Ne PAS utiliser directement dans les composants**

```css
/* PRIMARY - Bleu TLS */
--color-primary-50: #E8F4F7;    /* Très clair */
--color-primary-100: #DCEBEF;
--color-primary-200: #B9D7DF;
--color-primary-300: #96C3CF;
--color-primary-400: #73AFBF;
--color-primary-500: #55A1B4;   /* ← Base brand color */
--color-primary-600: #4A8FA1;
--color-primary-700: #3D7786;
--color-primary-800: #2F5F6A;
--color-primary-900: #1F3E45;   /* Très foncé */

/* SECONDARY - Orange TLS */
--color-secondary-50 à 900

/* ACCENT - Jaune TLS */
--color-accent-50 à 900

/* NEUTRAL - Grays */
--color-neutral-50 à 900

/* SEMANTIC */
--color-success-50 à 900 (Teal)
--color-warning-50 à 900 (Yellow)
--color-error-50 à 900 (Coral)
--color-info-50 à 900 (Blue)
```

### 2. Tokens Sémantiques (--*)
**Utiliser dans les composants**

```css
/* Base */
--background: #ffffff;
--foreground: var(--color-neutral-900);

/* Components */
--card: #ffffff;
--card-foreground: var(--color-neutral-900);

/* States */
--primary: var(--color-primary-500);
--secondary: var(--color-secondary-500);
--success: var(--color-success-300);
--error: var(--color-error-400);

/* Interactive */
--border: rgba(0, 0, 0, 0.1);
--input-background: var(--color-neutral-50);
--ring: var(--color-primary-500);
```

### 3. Alias Rétrocompatibles (--primary-*)
**Deprecated - Pour ne pas casser l'existant**

```css
/* Mappés vers --color-* */
--primary-50: var(--color-primary-50);
--primary-500: var(--color-primary-500);
--primary-900: var(--color-primary-900);

--primary: var(--color-primary-500);
--primary-hover: var(--color-primary-600);
```

---

## 🚀 Plan de Migration (4 Phases)

### Phase 1 - Setup (1 jour) ✅ FAIT
**Objectif:** Créer nouveau système sans casser l'existant

**Actions:**
1. ✅ Créer `/styles/globals-v2-tokens.css`
2. ✅ Définir toute la palette --color-*
3. ✅ Mapper tokens sémantiques
4. ✅ Créer alias rétrocompatibles
5. ✅ Documenter plan de migration

**Validation:**
- [ ] App fonctionne sans changement visuel
- [ ] Tous tokens V1 disponibles via alias
- [ ] Documentation complète

---

### Phase 2 - Test & Validation (2 jours)
**Objectif:** Valider le nouveau système

**Actions:**

#### 2.1 Basculer vers globals-v2-tokens.css
```tsx
// /App.tsx ou index.tsx
- import './styles/globals.css';
+ import './styles/globals-v2-tokens.css';
```

#### 2.2 Tests Visuels
- [ ] Dashboard - Vérifier couleurs hero, cards, boutons
- [ ] Parcours - Vérifier badges niveaux
- [ ] Coaching - Vérifier modals, CTA
- [ ] Veille - Vérifier cartes, filtres
- [ ] Journal - Vérifier prompts, tags
- [ ] Auth - Vérifier background gradient
- [ ] Design System Page - Vérifier showcase

#### 2.3 Tests Fonctionnels
- [ ] Hover states conservés
- [ ] Focus rings visibles
- [ ] Gradients corrects
- [ ] Borders visibles
- [ ] Shadows cohérentes

#### 2.4 Tests Responsive
- [ ] Mobile - Couleurs OK
- [ ] Tablet - Couleurs OK
- [ ] Desktop - Couleurs OK

**Validation:**
- [ ] Aucune régression visuelle
- [ ] Performance identique
- [ ] Lighthouse score maintenu

---

### Phase 3 - Migration Progressive (2-3 semaines)
**Objectif:** Migrer le code vers nouveaux tokens

#### 3.1 Priorité HAUTE - Composants Critiques

**Semaine 1:**

1. **OptimizedSidebar (33 pages)**
```tsx
// ❌ AVANT
style={{ background: 'var(--primary)' }}
style={{ color: 'var(--primary-50)' }}

// ✅ APRÈS
style={{ background: 'var(--color-primary-500)' }}
style={{ color: 'var(--color-primary-50)' }}
```

2. **BackgroundBlobs (32 pages)**
```tsx
// ❌ AVANT
background: 'var(--primary-200)'

// ✅ APRÈS
background: 'var(--color-primary-200)'
```

3. **Button/ButtonEnhanced (24 pages)**
```tsx
// ❌ AVANT
backgroundColor: 'var(--primary)'
color: 'var(--primary-foreground)'

// ✅ APRÈS (option 1 - sémantique)
backgroundColor: 'var(--primary)'
color: 'var(--primary-foreground)'

// ✅ APRÈS (option 2 - palette)
backgroundColor: 'var(--color-primary-500)'
color: '#f8fbfd'
```

**Stratégie:**
- Garder tokens sémantiques (--primary, --success, etc.) pour composants
- Utiliser --color-* uniquement pour variantes/personnalisation

#### 3.2 Priorité MOYENNE - Composants Métier

**Semaine 2:**

4. **CardPatterns** (Dashboard)
5. **DashboardHeroV3Simple**
6. **SectionHeader**
7. **PageHeaderSimple**
8. **Modals** (Booking, Positionnement)

#### 3.3 Priorité BASSE - Composants Démo

**Semaine 3:**

9. Pages démo (CelebrationsDemo, ColoredGlowDemo, etc.)
10. Design System showcase
11. Composants non utilisés (à archiver)

---

### Phase 4 - Cleanup & Optimisation (1 semaine)
**Objectif:** Nettoyer ancien système

#### 4.1 Supprimer Ancien Fichier
```bash
# Renommer pour archiver
mv /styles/globals.css /styles/globals-v1-legacy.css

# Renommer nouveau fichier
mv /styles/globals-v2-tokens.css /styles/globals.css
```

#### 4.2 Supprimer Alias Deprecated
**⚠️ ATTENTION:** Faire après avoir migré tout le code

```css
/* Supprimer section "LEGACY ALIASES" */
/* --primary-50, --primary-500, etc. */
```

#### 4.3 Documentation
- [ ] Mettre à jour `/docs/01-DESIGN-SYSTEM.md`
- [ ] Créer guide utilisation tokens
- [ ] Exemples avant/après
- [ ] Ajouter dans CHANGELOG

---

## 📖 Guide d'Utilisation

### ✅ Bonnes Pratiques

#### Utiliser Tokens Sémantiques (Composants)
```tsx
// ✅ BON - Sémantique
<Button style={{ 
  background: 'var(--primary)',
  color: 'var(--primary-foreground)' 
}} />

<Card style={{ 
  background: 'var(--card)',
  color: 'var(--card-foreground)',
  border: '1px solid var(--border)'
}} />

<Alert style={{ 
  background: 'var(--error)',
  color: 'var(--error-foreground)'
}} />
```

#### Utiliser Palette pour Variantes
```tsx
// ✅ BON - Variantes custom
<div style={{
  background: 'var(--color-primary-50)',  // Light variant
  borderLeft: '4px solid var(--color-primary-500)'
}} />

// Gradient custom
<div style={{
  background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500))'
}} />
```

### ❌ Mauvaises Pratiques

```tsx
// ❌ MAUVAIS - Hardcodé
<Button style={{ background: '#55A1B4' }} />

// ❌ MAUVAIS - Utiliser palette directement pour composants standards
<Button style={{ background: 'var(--color-primary-500)' }} />
// → Utiliser var(--primary) à la place

// ❌ MAUVAIS - Mélanger conventions
<div style={{ 
  color: 'var(--primary)',           // Sémantique
  background: 'var(--color-primary-50)'  // Palette
}} />
// → Choisir une convention cohérente
```

---

## 🎨 Exemples de Migration

### Exemple 1 - Button Component

**Avant:**
```tsx
// /components/ui/button.tsx
export function Button({ variant = 'primary' }) {
  const styles = {
    primary: {
      background: 'var(--primary)',
      color: 'var(--primary-foreground)',
      '&:hover': {
        background: 'var(--primary-hover)'
      }
    },
    secondary: {
      background: 'var(--secondary)',
      color: 'var(--secondary-foreground)'
    }
  };
  
  return <button style={styles[variant]}>Click</button>;
}
```

**Après (Option 1 - Sémantique):**
```tsx
// ✅ Garder tokens sémantiques - RECOMMANDÉ
export function Button({ variant = 'primary' }) {
  const styles = {
    primary: {
      background: 'var(--primary)',
      color: 'var(--primary-foreground)',
      '&:hover': {
        background: 'var(--color-primary-600)' // Variante palette
      }
    }
  };
}
```

**Après (Option 2 - Palette pure):**
```tsx
// ✅ Si besoin de plus de contrôle
export function Button({ variant = 'primary' }) {
  const styles = {
    primary: {
      background: 'var(--color-primary-500)',
      color: '#f8fbfd',
      '&:hover': {
        background: 'var(--color-primary-600)'
      }
    }
  };
}
```

### Exemple 2 - Card Component

**Avant:**
```tsx
<div style={{
  background: 'var(--card)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius-lg)'
}}>
  <h3 style={{ color: 'var(--primary)' }}>Title</h3>
  <p style={{ color: 'var(--card-foreground)' }}>Text</p>
</div>
```

**Après:**
```tsx
// ✅ Aucun changement - tokens sémantiques OK
<div style={{
  background: 'var(--card)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius-lg)'
}}>
  <h3 style={{ color: 'var(--primary)' }}>Title</h3>
  <p style={{ color: 'var(--card-foreground)' }}>Text</p>
</div>
```

### Exemple 3 - Badge Niveau

**Avant:**
```tsx
const getBadgeColor = (niveau) => {
  switch(niveau) {
    case 'debutant': return 'var(--success-300)';
    case 'intermediaire': return 'var(--info-400)';
    case 'avance': return 'var(--primary-600)';
    case 'expert': return 'var(--warning-400)';
  }
};
```

**Après:**
```tsx
// ✅ Utiliser palette pour variantes
const getBadgeColor = (niveau) => {
  switch(niveau) {
    case 'debutant': return 'var(--color-success-300)';
    case 'intermediaire': return 'var(--color-info-400)';
    case 'avance': return 'var(--color-primary-600)';
    case 'expert': return 'var(--color-warning-400)';
  }
};
```

### Exemple 4 - Gradient Custom

**Avant:**
```tsx
<div style={{
  background: 'linear-gradient(135deg, #55A1B4 0%, #ED843A 100%)'
}} />
```

**Après:**
```tsx
// ✅ Utiliser palette
<div style={{
  background: 'linear-gradient(135deg, var(--color-primary-500) 0%, var(--color-secondary-500) 100%)'
}} />

// ✅ Ou utiliser gradient prédéfini
<div style={{
  background: 'var(--gradient-tls)'
}} />
```

---

## 📊 Checklist Migration

### Par Composant
```
Composant: [NOM]

1. Utilisation actuelle
   - [ ] --primary (sémantique)
   - [ ] --primary-50 à 900 (palette)
   - [ ] Hardcodé (#55A1B4)
   - [ ] Autres: ___________

2. Stratégie migration
   - [ ] Garder sémantique (--primary)
   - [ ] Migrer vers palette (--color-primary-*)
   - [ ] Mix (sémantique + variantes palette)

3. Tests
   - [ ] Visuel OK
   - [ ] Hover states OK
   - [ ] Focus OK
   - [ ] Dark mode (si applicable)

4. Documentation
   - [ ] Commentaire code
   - [ ] Storybook/Showcase updated
```

### Globale
```
Phase 1 - Setup
- [✅] Fichier globals-v2-tokens.css créé
- [✅] Palette --color-* définie
- [✅] Tokens sémantiques mappés
- [✅] Alias rétrocompatibles
- [✅] Documentation plan

Phase 2 - Validation
- [ ] Import globals-v2 dans App
- [ ] Tests visuels 7 pages clés
- [ ] Tests fonctionnels
- [ ] Tests responsive
- [ ] Lighthouse score OK

Phase 3 - Migration Code
- [ ] OptimizedSidebar (33 pages)
- [ ] BackgroundBlobs (32 pages)
- [ ] Button/ButtonEnhanced (24 pages)
- [ ] CardPatterns (3 pages)
- [ ] DashboardHero (2 pages)
- [ ] SectionHeader (5 pages)
- [ ] Autres composants (37 total)

Phase 4 - Cleanup
- [ ] Renommer globals.css → globals-v1-legacy.css
- [ ] Renommer globals-v2-tokens.css → globals.css
- [ ] Supprimer alias deprecated
- [ ] Mettre à jour docs
- [ ] CHANGELOG updated
```

---

## 🎯 Convention de Nommage

### Tokens de Palette (--color-*)
```
--color-{category}-{shade}

Catégories:
- primary, secondary, accent (brand)
- neutral (grays)
- success, warning, error, info (semantic)
- teal, coral (extended)

Shades:
50, 100, 200, 300, 400, 500, 600, 700, 800, 900
(50 = très clair, 500 = base, 900 = très foncé)
```

### Tokens Sémantiques (--*)
```
--{context}
--{context}-{variant}
--{context}-foreground

Exemples:
- --background, --foreground
- --card, --card-foreground
- --primary, --primary-foreground
- --border, --border-hover
- --input, --input-background
```

### Alias Deprecated (--primary-*)
```
--{category}-{shade}
--{category}-{variant}

⚠️ À supprimer après migration complète
```

---

## 🔍 FAQ

### Q: Pourquoi --color-primary-500 au lieu de --color-primary-base?
**R:** Convention standard Material Design, Tailwind, Radix UI. 500 = base color, permet d'ajouter facilement 50-400 (light) et 600-900 (dark).

### Q: Quand utiliser --primary vs --color-primary-500?
**R:** 
- **--primary** → Composants standards (Button, Card, etc.)
- **--color-primary-500** → Variantes custom, gradients, états spéciaux

### Q: Faut-il migrer TOUT le code?
**R:** Non. Priorité aux composants critiques (Sidebar, Buttons, Cards). Démo pages peuvent rester avec alias.

### Q: Les alias seront supprimés quand?
**R:** Après migration Phase 3 complète. Minimum 1 mois d'usage V2 avant suppression.

### Q: Dark mode?
**R:** Facile avec V2! Créer :root.dark { --color-primary-500: #autre; }

### Q: Performance?
**R:** Identique. CSS variables = zéro impact runtime.

---

## 📝 Ressources

### Fichiers
- `/styles/globals-v2-tokens.css` - Nouveau système
- `/styles/globals.css` - Ancien système (actif)
- `/docs/COLOR-TOKENS-MIGRATION-PLAN.md` - Ce document

### Références
- [Material Design Color System](https://m3.material.io/styles/color/system/overview)
- [Tailwind Color Scales](https://tailwindcss.com/docs/customizing-colors)
- [Radix Colors](https://www.radix-ui.com/colors)

### Outils
- [Coolors.co](https://coolors.co/) - Générer palettes
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/) - WCAG AA/AAA

---

_Plan créé: 22/02/2026_  
_Version: 2.0.0_  
_Status: Ready for Implementation_  
_Prochaine étape: Phase 2 - Test & Validation_
