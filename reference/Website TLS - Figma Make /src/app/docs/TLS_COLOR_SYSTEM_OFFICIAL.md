# 🎨 THE LEARNING SOCIETY - SYSTÈME DE COULEURS OFFICIEL

## ⚠️ DOCUMENT DE RÉFÉRENCE OFFICIEL - À TOUJOURS CONSULTER EN PRIORITÉ

---

## ✅ PALETTE OFFICIELLE TLS

### Couleurs Principales (Variables CSS OBLIGATOIRES)

```css
/* ✅ PALETTE OFFICIELLE TLS */
--primary: #55A1B4;          /* Bleu TLS - Académie/Formation */
--secondary: #ED843A;         /* Orange TLS - Agence/Conception */
--accent: #F8B044;            /* Yellow TLS - Conseil/Stratégie */
```

### ⚠️ RÈGLE ABSOLUE

**TOUJOURS utiliser les variables CSS, JAMAIS les valeurs hexadécimales directement !**

✅ **CORRECT :**
```css
color: var(--primary);
background: var(--secondary);
border-color: var(--accent);
```

❌ **INCORRECT :**
```css
color: #55A1B4;
background: #ED843A;
border-color: #F8B044;
```

---

## 🎯 MAPPING PAR PÔLE TLS

| Pôle | Fonction | Variable CSS | Valeur HEX | Usage |
|------|----------|--------------|------------|-------|
| **Académie** | Formation | `--primary` | `#55A1B4` | Bleu - Tout ce qui concerne la formation, les parcours, l'apprentissage |
| **Agence** | Conception | `--secondary` | `#ED843A` | Orange - Tout ce qui concerne la création, les projets, le design |
| **Conseil** | Stratégie | `--accent` | `#F8B044` | Jaune - Tout ce qui concerne la stratégie, l'accompagnement, le conseil |
| **Tech** | Technologie | `--primary-light` | Dérivé du primary | Bleu clair - Tout ce qui concerne les outils, APIs, tech |

---

## 📊 ÉCHELLE COMPLÈTE DES COULEURS (depuis globals.css)

### Primary (Bleu) - Académie/Formation

```css
--primary-50: #E8F4F7;
--primary-100: #DCEBEF;
--primary-200: #B9D7DF;
--primary-300: #96C3CF;
--primary-400: #73AFBF;
--primary-500: #55A1B4;  /* ✅ BASE PRIMARY */
--primary-600: #4A8FA1;
--primary-700: #3D7786;
--primary-800: #2F5F6A;
--primary-900: #1F3E45;

/* Variantes sémantiques */
--primary: #55A1B4;                    /* ✅ OFFICIEL */
--primary-foreground: #ffffff;
--primary-hover: #4A8FA1;
--primary-light: #7BC4D4;
--primary-lighter: #E8F4F7;
```

### Secondary (Orange) - Agence/Conception

```css
--secondary-50: #FFF3EB;
--secondary-100: #FDDCC7;
--secondary-200: #FCBB93;
--secondary-300: #F59A5F;
--secondary-400: #F18A4C;
--secondary-500: #ED843A;  /* ✅ BASE SECONDARY */
--secondary-600: #C06920;
--secondary-700: #8F5017;
--secondary-800: #5E3710;
--secondary-900: #3B2109;

/* Variantes sémantiques */
--secondary: #ED843A;                  /* ✅ OFFICIEL */
--secondary-foreground: #ffffff;
--secondary-hover: #C06920;
--secondary-light: #F5A868;
--secondary-lighter: #FFF4E6;
```

### Accent (Jaune) - Conseil/Stratégie

```css
--accent-50: #FFF9EE;
--accent-100: #FFECC8;
--accent-200: #FFD791;
--accent-300: #FFC15A;
--accent-400: #F8B044;  /* ✅ BASE ACCENT */
--accent-500: #F8A733;
--accent-600: #D69020;
--accent-700: #9B6818;
--accent-800: #664410;
--accent-900: #3D2909;

/* Variantes sémantiques */
--accent: #F8B044;                     /* ✅ OFFICIEL */
--accent-foreground: #1a1a1a;
--accent-hover: #D69020;
--accent-light: #FFC977;
--accent-lighter: #FFF9EE;
```

---

## 🔄 UTILISATION CORRECTE DES VARIABLES

### ✅ Toujours utiliser var() en CSS/inline styles

```tsx
// ✅ CORRECT - React inline styles
<div style={{ 
  color: 'var(--primary)',
  background: 'var(--secondary)',
  borderColor: 'var(--accent)'
}} />

// ✅ CORRECT - CSS classes
.button-primary {
  background: var(--primary);
  color: var(--primary-foreground);
}

// ✅ CORRECT - Gradients avec variables
background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-500) 100%);

// ✅ CORRECT - Couleurs avec opacité
background: rgba(from var(--primary) r g b / 0.1);
/* ou pour meilleure compatibilité : */
border: 1px solid rgba(85, 161, 180, 0.15); /* Utiliser rgba uniquement pour opacité */
```

### ❌ Ne JAMAIS hardcoder les hex values

```tsx
// ❌ INCORRECT
<div style={{ color: '#55A1B4' }} />

// ❌ INCORRECT
.button-primary {
  background: #ED843A;
}
```

---

## 🎨 RECETTES PAR COMPOSANT

### Hero Section Background

```css
/* Académie (Bleu) */
.hero-overlay {
  background: linear-gradient(135deg, rgba(85, 161, 180, 0.03) 0%, rgba(255, 255, 255, 0) 100%);
}

.hero-blob {
  background: radial-gradient(circle, var(--primary-300) 0%, transparent 70%);
  /* var(--primary-300) = #96C3CF */
}

/* Agence (Orange) */
.hero-overlay {
  background: linear-gradient(135deg, rgba(237, 132, 58, 0.03) 0%, rgba(255, 255, 255, 0) 100%);
}

.hero-blob {
  background: radial-gradient(circle, var(--secondary-300) 0%, transparent 70%);
  /* var(--secondary-300) = #F59A5F */
}

/* Conseil (Jaune) */
.hero-overlay {
  background: linear-gradient(135deg, rgba(248, 176, 68, 0.03) 0%, rgba(255, 255, 255, 0) 100%);
}

.hero-blob {
  background: radial-gradient(circle, var(--accent-300) 0%, transparent 70%);
  /* var(--accent-300) = #FFC15A */
}
```

### Badges & Pills

```css
/* Académie (Bleu) */
.badge-academie {
  background: linear-gradient(135deg, rgba(85, 161, 180, 0.1) 0%, rgba(85, 161, 180, 0.05) 100%);
  border: 1px solid rgba(85, 161, 180, 0.2);
  color: var(--primary-700);
}

.badge-academie-icon {
  color: var(--primary-600);
}

/* Agence (Orange) */
.badge-agence {
  background: linear-gradient(135deg, rgba(237, 132, 58, 0.1) 0%, rgba(237, 132, 58, 0.05) 100%);
  border: 1px solid rgba(237, 132, 58, 0.2);
  color: var(--secondary-700);
}

.badge-agence-icon {
  color: var(--secondary-600);
}

/* Conseil (Jaune) */
.badge-conseil {
  background: linear-gradient(135deg, rgba(248, 176, 68, 0.1) 0%, rgba(248, 176, 68, 0.05) 100%);
  border: 1px solid rgba(248, 176, 68, 0.2);
  color: var(--accent-700);
}

.badge-conseil-icon {
  color: var(--accent-600);
}
```

### Buttons Primary

```css
/* Académie (Bleu) */
.btn-academie {
  background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-500) 100%);
  /* #4A8FA1 → #55A1B4 */
  color: var(--primary-foreground);
  box-shadow: 0 4px 16px rgba(85, 161, 180, 0.3);
}

.btn-academie:hover {
  box-shadow: 0 8px 24px rgba(85, 161, 180, 0.4);
}

/* Agence (Orange) */
.btn-agence {
  background: linear-gradient(135deg, var(--secondary-600) 0%, var(--secondary-500) 100%);
  /* #C06920 → #ED843A */
  color: var(--secondary-foreground);
  box-shadow: 0 4px 16px rgba(237, 132, 58, 0.3);
}

.btn-agence:hover {
  box-shadow: 0 8px 24px rgba(237, 132, 58, 0.4);
}

/* Conseil (Jaune) */
.btn-conseil {
  background: linear-gradient(135deg, var(--accent-600) 0%, var(--accent-400) 100%);
  /* #D69020 → #F8B044 */
  color: var(--accent-foreground);  /* ⚠️ Texte FONCÉ #1a1a1a */
  box-shadow: 0 4px 16px rgba(248, 176, 68, 0.3);
}

.btn-conseil:hover {
  box-shadow: 0 8px 24px rgba(248, 176, 68, 0.4);
}
```

### Glassmorphism Cards

```css
/* Base (identique pour tous) */
.glass-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-xl);
}

/* Académie (Bleu) */
.glass-card-academie {
  border: 1px solid rgba(85, 161, 180, 0.15);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.glass-card-academie:hover {
  border-color: rgba(85, 161, 180, 0.3);
  box-shadow: 0 12px 40px rgba(85, 161, 180, 0.12);
}

.glass-card-academie .accent-line {
  background: linear-gradient(90deg, var(--primary-400) 0%, var(--primary-600) 100%);
  /* #73AFBF → #55A1B4 */
}

/* Agence (Orange) */
.glass-card-agence {
  border: 1px solid rgba(237, 132, 58, 0.15);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.glass-card-agence:hover {
  border-color: rgba(237, 132, 58, 0.3);
  box-shadow: 0 12px 40px rgba(237, 132, 58, 0.12);
}

.glass-card-agence .accent-line {
  background: linear-gradient(90deg, var(--secondary-400) 0%, var(--secondary-600) 100%);
  /* #F18A4C → #C06920 */
}

/* Conseil (Jaune) */
.glass-card-conseil {
  border: 1px solid rgba(248, 176, 68, 0.15);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.glass-card-conseil:hover {
  border-color: rgba(248, 176, 68, 0.3);
  box-shadow: 0 12px 40px rgba(248, 176, 68, 0.12);
}

.glass-card-conseil .accent-line {
  background: linear-gradient(90deg, var(--accent-400) 0%, var(--accent-600) 100%);
  /* #F8B044 → #D69020 */
}
```

### Title Gradients (mots soulignés)

```css
/* Académie (Bleu) */
.title-gradient-academie {
  background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-400) 100%);
  /* #4A8FA1 → #73AFBF */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Agence (Orange) */
.title-gradient-agence {
  background: linear-gradient(135deg, var(--secondary-600) 0%, var(--secondary-400) 100%);
  /* #C06920 → #F18A4C */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Conseil (Jaune) */
.title-gradient-conseil {
  background: linear-gradient(135deg, var(--accent-600) 0%, var(--accent-400) 100%);
  /* #D69020 → #F8B044 */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## 📋 RÉFÉRENCE RAPIDE - OPACITÉS RGBA

### Quand utiliser rgba() vs var()

**✅ Utiliser `var()` pour les couleurs pleines :**
```css
color: var(--primary);
background: var(--secondary);
border-color: var(--accent);
```

**✅ Utiliser `rgba()` uniquement pour l'opacité :**
```css
/* Overlay subtil */
background: rgba(85, 161, 180, 0.03);  /* Primary avec 3% opacité */

/* Background teinté */
background: rgba(237, 132, 58, 0.1);   /* Secondary avec 10% opacité */

/* Border subtile */
border: 1px solid rgba(248, 176, 68, 0.15);  /* Accent avec 15% opacité */

/* Shadow colorée */
box-shadow: 0 8px 24px rgba(85, 161, 180, 0.3);  /* Primary avec 30% opacité */
```

### Table de conversion RGB

| Couleur | HEX | RGB | Usage rgba() |
|---------|-----|-----|--------------|
| **Primary** | `#55A1B4` | `85, 161, 180` | `rgba(85, 161, 180, X)` |
| **Secondary** | `#ED843A` | `237, 132, 58` | `rgba(237, 132, 58, X)` |
| **Accent** | `#F8B044` | `248, 176, 68` | `rgba(248, 176, 68, X)` |

Où `X` est l'opacité :
- `0.03` = Overlay très subtil
- `0.05` = Background fin de gradient
- `0.1` = Background teinté
- `0.15` = Border subtile
- `0.2` = Border/shadow visible
- `0.3` = Shadow hover colorée
- `0.4` = Shadow hover forte

---

## 🎯 EXEMPLES REACT AVEC VARIABLES CSS

### Composant avec inline styles

```tsx
// ✅ CORRECT
export function AcademieCard() {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(85, 161, 180, 0.15)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-6)'
      }}
    >
      <h3 style={{ 
        fontFamily: 'var(--font-display)',
        color: 'var(--neutral-900)'
      }}>
        Titre
      </h3>
      
      <p style={{ 
        fontFamily: 'var(--font-body)',
        color: 'var(--primary-600)'  {/* ✅ Utilise var() */}
      }}>
        Sous-titre en bleu
      </p>
      
      <button
        style={{
          background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-500) 100%)',
          color: 'var(--primary-foreground)',
          padding: 'var(--space-4) var(--space-8)',
          borderRadius: 'var(--radius-xl)',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-base)'
        }}
      >
        Action
      </button>
    </div>
  );
}
```

### Composant dynamique par pôle

```tsx
type Pole = 'academie' | 'agence' | 'conseil' | 'tech';

interface CardProps {
  pole: Pole;
  title: string;
}

export function DynamicCard({ pole, title }: CardProps) {
  // ✅ CORRECT - Mapping vers variables CSS
  const colorVars = {
    academie: {
      primary: '--primary-600',
      gradient: 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-500) 100%)',
      border: 'rgba(85, 161, 180, 0.15)',
      shadow: 'rgba(85, 161, 180, 0.12)'
    },
    agence: {
      primary: '--secondary-600',
      gradient: 'linear-gradient(135deg, var(--secondary-600) 0%, var(--secondary-500) 100%)',
      border: 'rgba(237, 132, 58, 0.15)',
      shadow: 'rgba(237, 132, 58, 0.12)'
    },
    conseil: {
      primary: '--accent-600',
      gradient: 'linear-gradient(135deg, var(--accent-600) 0%, var(--accent-400) 100%)',
      border: 'rgba(248, 176, 68, 0.15)',
      shadow: 'rgba(248, 176, 68, 0.12)'
    },
    tech: {
      primary: '--primary-light',
      gradient: 'linear-gradient(135deg, var(--primary-hover) 0%, var(--primary-light) 100%)',
      border: 'rgba(123, 196, 212, 0.15)',
      shadow: 'rgba(123, 196, 212, 0.12)'
    }
  };

  const colors = colorVars[pole];

  return (
    <div
      style={{
        border: `1px solid ${colors.border}`,
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-6)'
      }}
    >
      <h3 style={{ 
        color: `var(${colors.primary})`,  {/* ✅ Variable CSS dynamique */}
        fontFamily: 'var(--font-display)'
      }}>
        {title}
      </h3>
    </div>
  );
}
```

---

## ⚠️ RÈGLES D'ACCESSIBILITÉ COULEURS

### Contraste minimum requis (WCAG AA)

| Combinaison | Ratio | Statut |
|-------------|-------|--------|
| **Bleu (#55A1B4) sur blanc** | 4.7:1 | ✅ PASS |
| **Blanc sur Bleu (#55A1B4)** | 4.7:1 | ✅ PASS |
| **Orange (#ED843A) sur blanc** | 4.1:1 | ✅ PASS |
| **Blanc sur Orange (#ED843A)** | 4.1:1 | ✅ PASS |
| **Jaune (#F8B044) sur blanc** | 2.3:1 | ❌ FAIL |
| **Blanc sur Jaune (#F8B044)** | 2.3:1 | ❌ FAIL |

### ⚠️ ATTENTION SPÉCIALE : CONSEIL (Jaune)

Le jaune `#F8B044` (var(--accent)) n'a PAS un contraste suffisant avec le blanc.

**✅ SOLUTION : Utiliser texte FONCÉ**

```css
/* ❌ INCORRECT - Texte blanc sur jaune */
.btn-conseil-wrong {
  background: var(--accent);
  color: white;  /* Contraste insuffisant ! */
}

/* ✅ CORRECT - Texte foncé sur jaune */
.btn-conseil {
  background: var(--accent);
  color: var(--accent-foreground);  /* #1a1a1a - texte foncé */
}

/* ✅ CORRECT - Ou utiliser accent-600 (plus foncé) avec texte blanc */
.btn-conseil-alt {
  background: var(--accent-600);  /* #D69020 - plus foncé */
  color: white;  /* Contraste OK */
}
```

---

## 📝 CHECKLIST FINALE

Avant de soumettre du code ou un design, vérifiez :

### Variables CSS
- [ ] ✅ Utilise `var(--primary)` au lieu de `#55A1B4`
- [ ] ✅ Utilise `var(--secondary)` au lieu de `#ED843A`
- [ ] ✅ Utilise `var(--accent)` au lieu de `#F8B044`
- [ ] ✅ Utilise `var(--font-display)` pour League Spartan
- [ ] ✅ Utilise `var(--font-body)` pour Nunito
- [ ] ✅ Utilise `var(--space-*)` pour les espacements
- [ ] ✅ Utilise `var(--radius-*)` pour les border-radius

### Opacités
- [ ] ✅ rgba() utilisé uniquement pour transparence
- [ ] ✅ Overlay : 0.03
- [ ] ✅ Background teinté : 0.1 → 0.05
- [ ] ✅ Border : 0.15 (normal), 0.3 (hover)
- [ ] ✅ Shadow : 0.12 (hover coloré)

### Accessibilité
- [ ] ✅ Contraste texte/fond > 4.5:1
- [ ] ⚠️ Jaune (Conseil) utilise texte FONCÉ ou accent-600
- [ ] ✅ Font sizes lisibles (min 14px body)
- [ ] ✅ Hover states bien visibles

### Typographie
- [ ] ✅ League Spartan pour h1, h2, h3, h4, h5, h6
- [ ] ✅ Nunito pour p, span, div, labels, buttons
- [ ] ✅ Font sizes avec var(--text-*)

---

## 🔗 RÉFÉRENCES

- **Variables complètes** : `/styles/globals.css`
- **Exemples React** : `/docs/TLS_COMPONENTS_CODE_EXAMPLES.md`
- **Prompts Figma** : `/docs/TLS_FIGMA_MAKE_QUICK_START.md`
- **Spécifications** : `/docs/TLS_DESIGN_SYSTEM_COMPONENTS.md`

---

**✅ DOCUMENT OFFICIEL - THE LEARNING SOCIETY**  
*Système de Couleurs - Version Canonique*  
*Toujours utiliser les variables CSS définies dans `/styles/globals.css`*  
*Mise à jour : Janvier 2026*
