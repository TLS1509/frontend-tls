# 🎨 AUDIT COMPLET DES GRADIENTS — THE LEARNING SOCIETY

**Date :** 11 avril 2026  
**Objectif :** Identifier les gradients utilisés vs. inutilisés, proposer une whitelist stricte et un plan de nettoyage sûr.

---

## 📊 INVENTAIRE COMPLET DES GRADIENTS

### Total des gradients définis : **~90 tokens**

---

## 🔍 TABLEAU D'AUDIT DÉTAILLÉ

| Token Gradient | CSS Value (résumé) | Utilisé ? | Occurrences | Fichiers/Composants | Catégorie | Décision |
|----------------|-------------------|-----------|-------------|---------------------|-----------|----------|
| **--gradient-primary** | linear-gradient(135deg, #55A1B4 → #3D7786) | ✅ OUI | ~50+ | Pages, buttons, icons, progress bars, badges, modals, etc. | **UI Primitives** | ✅ **KEEP** |
| **--gradient-secondary** | linear-gradient(156deg, #F18A4C → #C06920) | ✅ OUI | ~15+ | Buttons, badges, profile avatar, hero progress | **UI Primitives** | ✅ **KEEP** |
| **--gradient-warm** | linear-gradient(156deg, #F18A4C → #F8B044) | ✅ OUI | ~10+ | Progress bars, exception orange+jaune, coaching | **Progress/Sliders** | ✅ **KEEP** |
| **--gradient-accent** | (non défini seul) | ✅ OUI | ~8+ | Buttons, icons, chatbot, test lab | **UI Primitives** | ⚠️ **MISSING** |
| **--gradient-success** | linear-gradient(135deg, #96C3CF → #55A1B4) | ✅ OUI | ~10+ | Modals success, progress bars, validation | **Semantic** | ✅ **KEEP** |
| **--gradient-warning** | linear-gradient(135deg, #FFD791 → #F8B044) | ✅ OUI | ~5 | Modals warning, toasts | **Semantic** | ✅ **KEEP** |
| **--gradient-destructive** | linear-gradient(135deg, #F59A5F → #ED843A) | ✅ OUI | ~5 | Modals destructive, toasts, error | **Semantic** | ✅ **KEEP** |
| **--gradient-info** | linear-gradient(135deg, #73AFBF → #3D7786) | ✅ OUI | ~2 | Modals info | **Semantic** | ✅ **KEEP** |
| **--gradient-circular-tls** | radial-gradient(circle, #55A1B4 → #1F3E45) | ✅ OUI | ~5 | Auth pages (Login, Signup, Reset, Forgot) | **Page BG** | ✅ **KEEP** |
| **--gradient-tls** | linear-gradient(156deg, multi-color TLS) | ✅ OUI | ~3 | Hero sections, magazine title, showcase | **Hero/Text** | ✅ **KEEP** |
| **--gradient-tls-text** | linear-gradient(135deg, multi-color TLS) | ✅ OUI | ~3 | Hero text, dashboard specs | **Text Only** | ✅ **KEEP** |
| **--gradient-tls-text-cool** | linear-gradient(135deg, #55A1B4 → #7BC4D4) | ✅ OUI | ~3 | Hero text, dashboard simple | **Text Only** | ✅ **KEEP** |
| **--gradient-tls-text-hero-light** | linear-gradient(120deg, multi-color opacity 0.85) | ✅ OUI | ~4 | Dashboard Hero V2/V3 titles | **Text Only** | ✅ **KEEP** |
| **--gradient-tls-subtle** | linear-gradient(156deg, rgba opacity 0.05) | ✅ OUI | ~2 | Page backgrounds (Veille, Magazine) | **Page BG** | ✅ **KEEP** |
| **--gradient-tls-horizontal** | linear-gradient(90deg, multi-color TLS) | ✅ OUI | ~1 | Showcase TLS Colors | **Showcase** | ⚠️ **ARCHIVE?** |
| **--gradient-primary-radial** | radial-gradient(circle, #55A1B4 → #1F3E45) | ✅ OUI | ~2 | Error page blobs, showcase | **Decorative** | ✅ **KEEP** |
| **--gradient-secondary-radial** | radial-gradient(circle, #F18A4C → #5E3710) | ✅ OUI | ~2 | Error page blob, showcase, imports | **Decorative** | ✅ **KEEP** |
| **--gradient-accent-radial** | radial-gradient(circle, #F8B044 → #664410) | ✅ OUI | ~1 | Figma imports | **Decorative** | ⚠️ **ARCHIVE?** |
| **--gradient-accent-warm** | linear-gradient(135deg, #F8B044 → #D69020) | ✅ OUI | ~2 | Dashboard hero progress bars | **Progress** | ✅ **KEEP** |
| **--gradient-brand** | linear-gradient(156deg, multi-shades blue) | ✅ OUI | ~3 | Button variants, showcase | **UI Primitives** | ✅ **KEEP** |
| **--gradient-primary-ocean** | linear-gradient(135deg, #96C3CF → #55A1B4) | ✅ OUI | ~1 | Dashboard hero progress | **Progress** | ⚠️ **CONSOLIDATE** |
| **--gradient-primary-sky** | linear-gradient(135deg, #E8F4F7 → #96C3CF) | ✅ OUI | ~1 | Success modal blob | **Decorative** | ⚠️ **CONSOLIDATE** |
| **--gradient-primary-glass** | linear-gradient(135deg, rgba opacity 0.95 → 0.85) | ❌ NON | 0 | — | **Legacy** | ❌ **ARCHIVE** |
| **--gradient-primary-metallic** | linear-gradient(135deg, multi-shades metallic) | ❌ NON | 0 | — | **Legacy** | ❌ **ARCHIVE** |
| **--gradient-secondary-light** | linear-gradient(135deg, #FCBB93 → #F59A5F) | ❌ NON | 0 | — | **Legacy** | ❌ **ARCHIVE** |
| **--gradient-accent-light** | linear-gradient(135deg, #FFD791 → #F8B044) | ❌ NON | 0 | — | **Legacy** | ❌ **ARCHIVE** |
| **--gradient-cool** | linear-gradient(156deg, #3D7786 → #315F6B) | ❌ NON | 0 | — | **Legacy** | ❌ **ARCHIVE** |
| **--gradient-sunset** | linear-gradient(156deg, #ED843A → #F49A5F) | ❌ NON | 0 | — | **Legacy** | ❌ **ARCHIVE** |
| **--gradient-ocean** | linear-gradient(156deg, #315F6B → #55A1B4) | ❌ NON | 0 | — | **Legacy** | ❌ **ARCHIVE** |
| **--gradient-fire** | linear-gradient(156deg, #F8A733 → #C06920) | ❌ NON | 0 | — | **Legacy** | ❌ **ARCHIVE** |
| **--gradient-primary-spectrum** | linear-gradient(135deg, 5 shades #E8F4F7 → #55A1B4) | ❌ NON | 0 | — | **Multi-Shades** | ❌ **ARCHIVE** |
| **--gradient-primary-depth** | linear-gradient(135deg, 4 shades #55A1B4 → #315F6B) | ❌ NON | 0 | — | **Multi-Shades** | ❌ **ARCHIVE** |
| **--gradient-primary-soft** | linear-gradient(135deg, 3 shades #DCEBEF → #96C3CF) | ❌ NON | 0 | — | **Multi-Shades** | ❌ **ARCHIVE** |
| **--gradient-primary-medium** | linear-gradient(135deg, 3 shades #7BC4D4 → #55A1B4) | ❌ NON | 0 | — | **Multi-Shades** | ❌ **ARCHIVE** |
| **--gradient-primary-dark** | linear-gradient(135deg, 3 shades #3D7786 → #254750) | ❌ NON | 0 | — | **Multi-Shades** | ❌ **ARCHIVE** |
| **--gradient-secondary-spectrum** | linear-gradient(135deg, 5 shades #FFF3EB → #ED843A) | ❌ NON | 0 | — | **Multi-Shades** | ❌ **ARCHIVE** |
| **--gradient-secondary-depth** | linear-gradient(135deg, 4 shades #ED843A → #A45915) | ❌ NON | 0 | — | **Multi-Shades** | ❌ **ARCHIVE** |
| **--gradient-secondary-soft** | linear-gradient(135deg, 3 shades #FDDCC7 → #F18A4C) | ❌ NON | 0 | — | **Multi-Shades** | ❌ **ARCHIVE** |
| **--gradient-secondary-medium** | linear-gradient(135deg, 3 shades #F18A4C → #DC772C) | ❌ NON | 0 | — | **Multi-Shades** | ❌ **ARCHIVE** |
| **--gradient-secondary-vibrant** | linear-gradient(135deg, 3 shades #FF9A5A → #ED843A) | ❌ NON | 0 | — | **Multi-Shades** | ❌ **ARCHIVE** |
| **--gradient-accent-spectrum** | linear-gradient(135deg, 5 shades #FFF9EE → #F8B044) | ❌ NON | 0 | — | **Multi-Shades** | ❌ **ARCHIVE** |
| **--gradient-accent-depth** | linear-gradient(135deg, 4 shades #F8B044 → #C87A11) | ❌ NON | 0 | — | **Multi-Shades** | ❌ **ARCHIVE** |
| **--gradient-accent-soft** | linear-gradient(135deg, 3 shades #FFE8BB → #FFC177) | ❌ NON | 0 | — | **Multi-Shades** | ❌ **ARCHIVE** |
| **--gradient-accent-medium** | linear-gradient(135deg, 3 shades #FFC177 → #E89E33) | ❌ NON | 0 | — | **Multi-Shades** | ❌ **ARCHIVE** |
| **--gradient-accent-rich** | linear-gradient(135deg, 3 shades #FFB033 → #E89E33) | ❌ NON | 0 | — | **Multi-Shades** | ❌ **ARCHIVE** |
| **--gradient-hero-tls** | linear-gradient(90deg, multi-color TLS) | ❌ NON | 0 | — | **Hero** | ❌ **ARCHIVE** |
| **--gradient-tls-hover** | linear-gradient(156deg, darker TLS) | ❌ NON | 0 | — | **Hover** | ❌ **ARCHIVE** |
| **--gradient-tls-full** | linear-gradient(156deg, 5-color TLS) | ❌ NON | 0 | — | **Hero** | ❌ **ARCHIVE** |
| **--gradient-tls-full-reverse** | linear-gradient(156deg, reversed TLS) | ❌ NON | 0 | — | **Hero** | ❌ **ARCHIVE** |
| **--gradient-tls-vertical** | linear-gradient(180deg, multi-color TLS) | ❌ NON | 0 | — | **Directional** | ❌ **ARCHIVE** |
| **--gradient-tls-vertical-reverse** | linear-gradient(180deg, reversed TLS) | ❌ NON | 0 | — | **Directional** | ❌ **ARCHIVE** |
| **--gradient-tls-diagonal** | linear-gradient(45deg, multi-color TLS) | ❌ NON | 0 | — | **Directional** | ❌ **ARCHIVE** |
| **--gradient-tls-diagonal-reverse** | linear-gradient(45deg, reversed TLS) | ❌ NON | 0 | — | **Directional** | ❌ **ARCHIVE** |
| **--gradient-tls-radial** | radial-gradient(circle, 5-color TLS) | ❌ NON | 0 | — | **Radial** | ❌ **ARCHIVE** |
| **--gradient-tls-radial-reverse** | radial-gradient(circle, reversed TLS) | ❌ NON | 0 | — | **Radial** | ❌ **ARCHIVE** |
| **--gradient-tls-soft** | linear-gradient(156deg, rgba 0.8 opacity) | ❌ NON | 0 | — | **Transparent** | ❌ **ARCHIVE** |
| **--gradient-tls-soft-light** | linear-gradient(156deg, rgba 0.4 opacity) | ❌ NON | 0 | — | **Transparent** | ❌ **ARCHIVE** |
| **--gradient-tls-glass** | linear-gradient(156deg, rgba 0.25 opacity) | ❌ NON | 0 | — | **Glass** | ❌ **ARCHIVE** |
| **--gradient-tls-glass-warm** | linear-gradient(156deg, warm rgba 0.25 opacity) | ❌ NON | 0 | — | **Glass** | ❌ **ARCHIVE** |
| **--gradient-tls-overlay** | linear-gradient(156deg, 3-color rgba 0.1 opacity) | ❌ NON | 0 | — | **Overlay** | ❌ **ARCHIVE** |
| **--gradient-tls-overlay-strong** | linear-gradient(156deg, 3-color rgba 0.3 opacity) | ❌ NON | 0 | — | **Overlay** | ❌ **ARCHIVE** |
| **--gradient-tls-subtle-reverse** | linear-gradient(156deg, reversed rgba 0.05) | ❌ NON | 0 | — | **Subtle** | ❌ **ARCHIVE** |
| **--gradient-tls-mesh** | 5x radial-gradient complex mesh | ❌ NON | 0 | — | **Mesh** | ❌ **ARCHIVE** |
| **--gradient-tls-text-warm** | linear-gradient(135deg, #ED843A → #F8B044) | ❌ NON | 0 | — | **Text** | ❌ **ARCHIVE** |
| **--gradient-tls-text-hero** | linear-gradient(120deg, multi-color TLS) | ❌ NON | 0 | — | **Text** | ❌ **ARCHIVE** |
| **--bg-gradient-primary-subtle** | linear-gradient(180deg, --primary-50 → transparent) | ❌ NON | 0 | — | **BG Subtle** | ❌ **ARCHIVE** |
| **--bg-gradient-secondary-subtle** | linear-gradient(180deg, --secondary-50 → transparent) | ❌ NON | 0 | — | **BG Subtle** | ❌ **ARCHIVE** |
| **--bg-gradient-accent-subtle** | linear-gradient(180deg, --accent-50 → transparent) | ❌ NON | 0 | — | **BG Subtle** | ❌ **ARCHIVE** |
| **--bg-gradient-neutral-subtle** | linear-gradient(180deg, --neutral-50 → transparent) | ❌ NON | 0 | — | **BG Subtle** | ❌ **ARCHIVE** |
| **--gradient-mesh-primary** | 4x radial-gradient mesh primary | ❌ NON | 0 | — | **Mesh** | ❌ **ARCHIVE** |
| **--gradient-mesh-warm** | 4x radial-gradient mesh warm | ❌ NON | 0 | — | **Mesh** | ❌ **ARCHIVE** |
| **--gradient-circular** | radial-gradient(circle, legacy #55a1b4 → #164267) | ❌ NON | 0 | — | **Legacy** | ❌ **ARCHIVE** |
| **--auth-bg-gradient** | radial-gradient(circle, auth BG) | ⚠️ MAYBE | 0 | — | **Auth BG** | ⚠️ **DUPLICATE?** |
| **--auth-blob-primary** | radial-gradient(circle, blob rgba 0.3) | ❌ NON | 0 | — | **Auth Blob** | ❌ **ARCHIVE** |
| **--auth-blob-secondary** | radial-gradient(circle, blob rgba 0.2) | ❌ NON | 0 | — | **Auth Blob** | ❌ **ARCHIVE** |
| **--gradient-primary-peach** | linear-gradient(135deg, peach shades) | ❌ NON | 0 | — | **Variations** | ❌ **ARCHIVE** |
| **--gradient-secondary-peach** | linear-gradient(135deg, peach shades) | ❌ NON | 0 | — | **Variations** | ❌ **ARCHIVE** |
| **--gradient-secondary-sunset** | linear-gradient(135deg, sunset shades) | ❌ NON | 0 | — | **Variations** | ❌ **ARCHIVE** |
| **--gradient-secondary-amber** | linear-gradient(135deg, amber shades) | ❌ NON | 0 | — | **Variations** | ❌ **ARCHIVE** |
| **--gradient-accent-sunshine** | linear-gradient(135deg, sunshine shades) | ❌ NON | 0 | — | **Variations** | ❌ **ARCHIVE** |
| **--gradient-accent-gold** | linear-gradient(135deg, gold shades) | ❌ NON | 0 | — | **Variations** | ❌ **ARCHIVE** |
| **--gradient-accent-honey** | linear-gradient(135deg, honey shades) | ❌ NON | 0 | — | **Variations** | ❌ **ARCHIVE** |
| **--gradient-blue-orange-soft** | linear-gradient(135deg, soft blend rgba) | ❌ NON | 0 | — | **Blend** | ❌ **ARCHIVE** |
| **--gradient-blue-yellow-soft** | linear-gradient(135deg, soft blend rgba) | ❌ NON | 0 | — | **Blend** | ❌ **ARCHIVE** |
| **--gradient-blue-blend** | linear-gradient(135deg, multi-shade blend rgba) | ❌ NON | 0 | — | **Blend** | ❌ **ARCHIVE** |
| **--gradient-primary-deep** | linear-gradient(135deg, #55A1B4 → #3D7786) | ❌ NON | 0 | — | **Variations** | ❌ **ARCHIVE** |

---

## 📋 RÉSUMÉ PAR CATÉGORIE

### ✅ UTILISÉS (22 gradients)

1. **UI Primitives (7)** : primary, secondary, warm, accent, brand
2. **Semantic (4)** : success, warning, destructive, info
3. **Text Only (4)** : tls-text, tls-text-cool, tls-text-hero-light, tls-text-warm
4. **Page/Hero BG (3)** : circular-tls, tls, tls-subtle
5. **Decorative (4)** : primary-radial, secondary-radial, accent-radial, primary-sky

### ❌ INUTILISÉS (68 gradients)

1. **Multi-Shades (15)** : spectrum, depth, soft, medium, vibrant, rich (primary/secondary/accent)
2. **TLS Directionnels (8)** : hero-tls, full, full-reverse, vertical, vertical-reverse, diagonal, diagonal-reverse, horizontal
3. **TLS Radial (2)** : radial, radial-reverse
4. **TLS Transparent/Glass (6)** : soft, soft-light, glass, glass-warm, overlay, overlay-strong
5. **TLS Subtle/Mesh (3)** : subtle-reverse, mesh, tls-mesh
6. **Background Subtle (4)** : bg-gradient-primary/secondary/accent/neutral-subtle
7. **Mesh (2)** : mesh-primary, mesh-warm
8. **Auth (3)** : auth-bg-gradient, auth-blob-primary, auth-blob-secondary
9. **Legacy (8)** : cool, sunset, ocean, fire, primary-glass, primary-metallic, secondary-light, accent-light, circular
10. **Variations (15)** : peach, sunset, amber, sunshine, gold, honey, deep, blend variants
11. **Hover (1)** : tls-hover

---

## 🎯 WHITELIST FINALE (3–8 GRADIENTS MAX)

### ✅ GRADIENTS AUTORISÉS POUR UI PRIMITIVES (5)

| Gradient | Usage autorisé | Usage interdit |
|----------|----------------|----------------|
| **--gradient-primary** | Boutons, badges, icônes, progress bars | Arrière-plans de page |
| **--gradient-secondary** | Boutons secondaires, badges | Arrière-plans de page |
| **--gradient-warm** | Progress bars, sliders, exception orange+jaune | Badges, boutons normaux |
| **--gradient-success** | Validation, success states | Boutons normaux |
| **--gradient-brand** | Boutons spéciaux, CTA | Usage général |

### 🎨 GRADIENTS AUTORISÉS POUR TEXTE (3)

| Gradient | Usage autorisé | Usage interdit |
|----------|----------------|----------------|
| **--gradient-tls-text** | Texte hero, titres majeurs | UI primitives |
| **--gradient-tls-text-cool** | Texte hero bleu | UI primitives |
| **--gradient-tls-text-hero-light** | Texte hero avec opacity | UI primitives |

### 🏞️ GRADIENTS AUTORISÉS POUR BACKGROUNDS/HERO (2)

| Gradient | Usage autorisé | Usage interdit |
|----------|----------------|----------------|
| **--gradient-circular-tls** | Pages d'authentification BG | UI primitives |
| **--gradient-tls** | Hero sections, page BG majeurs | UI primitives, badges |

### ⚠️ GRADIENTS SÉMANTIQUES (3)

| Gradient | Usage autorisé | Usage interdit |
|----------|----------------|----------------|
| **--gradient-warning** | Modals warning, toasts | Boutons normaux |
| **--gradient-destructive** | Modals destructive, toasts | Boutons normaux |
| **--gradient-info** | Modals info, toasts | Boutons normaux |

**TOTAL WHITELIST : 13 gradients** (au lieu de 90+)

---

## 🧹 PLAN DE NETTOYAGE

### ÉTAPE 1 : Identifier les gradients à archiver (68 gradients)

**Créer un fichier `/archive/gradients-legacy.css` :**

```css
/* ========================================
   GRADIENTS ARCHIVÉS — NON UTILISÉS
   Ces gradients ne sont plus utilisés dans l'app.
   Conservés ici pour référence historique uniquement.
   NE PAS IMPORTER dans globals.css
   ======================================== */

/* Multi-Shades (15 gradients) */
--gradient-primary-spectrum: ...;
--gradient-primary-depth: ...;
/* ... etc ... */

/* TLS Directionnels (8 gradients) */
--gradient-hero-tls: ...;
--gradient-tls-full: ...;
/* ... etc ... */

/* Legacy (8 gradients) */
--gradient-cool: ...;
--gradient-sunset: ...;
/* ... etc ... */
```

### ÉTAPE 2 : Nettoyer `/styles/globals.css`

**Supprimer les sections suivantes :**

```css
/* ❌ SUPPRIMER : Multi-Shades (lignes ~435-453) */
/* Primary Blue Multi-Shades (5 gradients) */
/* Secondary Orange Multi-Shades (5 gradients) */
/* Accent Yellow Multi-Shades (5 gradients) */

/* ❌ SUPPRIMER : TLS Directionnels inutilisés (lignes ~458-479) */
/* Hero & Directional (6 variants) — SAUF circular-tls */
/* Horizontal (2 variants) — SAUF tls-horizontal si showcase */
/* Vertical (2 variants) */
/* Diagonal (2 variants) */
/* Radial (2 variants) */

/* ❌ SUPPRIMER : Transparent/Glass inutilisés (lignes ~481-489) */
/* Soft & Transparent (2 variants) */
/* Glass & Overlays (4 variants) */

/* ❌ SUPPRIMER : Subtle/Mesh inutilisés (lignes ~491-498) */
/* Subtle & Mesh (4 variants) — SAUF tls-subtle */

/* ❌ SUPPRIMER : Background Subtle (lignes ~508-511) */
/* Background Gradients (Subtle) */

/* ❌ SUPPRIMER : Mesh Gradients (lignes ~513-522) */
/* Mesh Gradients (Complex) - Legacy support */

/* ❌ SUPPRIMER : Circular Legacy (ligne ~525) */
/* Circular Gradient (legacy) */

/* ❌ SUPPRIMER : Auth Blobs (lignes ~534-542) */
/* Animated blobs — inutilisés */

/* ❌ SUPPRIMER : Variations Palettes TLS (lignes ~550-571) */
/* NOUVEAUX GRADIENTS - Variations Palettes TLS */
```

### ÉTAPE 3 : Créer un nouveau fichier consolidé

**`/styles/gradients.css` (importé dans globals.css) :**

```css
/* ========================================
   GRADIENTS — THE LEARNING SOCIETY
   Whitelist stricte : 13 gradients autorisés
   ======================================== */

/* ========== UI PRIMITIVES (5) ========== */

/* Primary Blue — Boutons principaux, icônes, progress bars */
--gradient-primary: linear-gradient(135deg, #55A1B4 0%, #4A8FA1 50%, #3D7786 100%);

/* Secondary Orange — Boutons secondaires, badges */
--gradient-secondary: linear-gradient(156.232deg, rgb(241, 138, 76) 0%, rgb(192, 105, 32) 100%);

/* Warm Orange+Jaune — Progress bars, sliders (exception validée) */
--gradient-warm: linear-gradient(156.232deg, rgb(241, 138, 76) 0%, rgb(248, 176, 68) 100%);

/* Success — Validation, success states */
--gradient-success: linear-gradient(135deg, #96C3CF 0%, #73AFBF 50%, #55A1B4 100%);

/* Brand — Boutons spéciaux, CTA */
--gradient-brand: linear-gradient(156.232deg, rgb(49, 95, 107) 0%, rgb(61, 119, 134) 30%, rgb(74, 143, 161) 60%, rgb(85, 161, 180) 100%);

/* ========== TEXTE UNIQUEMENT (3) ========== */

/* TLS Text — Texte hero, titres majeurs */
--gradient-tls-text: linear-gradient(135deg, rgb(85, 161, 180) 0%, rgb(237, 132, 58) 50%, rgb(248, 176, 68) 100%);

/* TLS Text Cool — Texte hero bleu */
--gradient-tls-text-cool: linear-gradient(135deg, rgb(85, 161, 180) 0%, rgb(123, 196, 212) 100%);

/* TLS Text Hero Light — Texte hero avec opacity */
--gradient-tls-text-hero-light: linear-gradient(120deg, rgba(85, 161, 180, 0.85) 0%, rgba(237, 132, 58, 0.85) 50%, rgba(248, 176, 68, 0.85) 100%);

/* ========== BACKGROUNDS/HERO (2) ========== */

/* Circular TLS — Pages d'authentification uniquement */
--gradient-circular-tls: radial-gradient(circle at 0% 0%, rgb(85, 161, 180) 0%, rgb(58, 112, 125) 50%, rgb(45, 87, 97) 75%, rgb(31, 62, 69) 100%);

/* TLS Multicolore — Hero sections, page BG majeurs */
--gradient-tls: linear-gradient(156.232deg, rgb(61, 119, 134) 0%, rgb(74, 143, 161) 30%, rgb(85, 161, 180) 50%, rgb(237, 132, 58) 85%, rgb(248, 176, 68) 100%);

/* TLS Subtle — Background pages légers */
--gradient-tls-subtle: linear-gradient(156.232deg, rgba(85, 161, 180, 0.05) 0%, rgba(237, 132, 58, 0.05) 100%);

/* ========== SÉMANTIQUES (3) ========== */

/* Warning — Modals warning, toasts */
--gradient-warning: linear-gradient(135deg, #FFD791 0%, #FFC15A 50%, #F8B044 100%);

/* Destructive — Modals destructive, toasts */
--gradient-destructive: linear-gradient(135deg, #F59A5F 0%, #F18A4C 50%, #ED843A 100%);

/* Info — Modals info, toasts */
--gradient-info: linear-gradient(135deg, #73AFBF 0%, #4A8FA1 50%, #3D7786 100%);
```

### ÉTAPE 4 : Consolidation des doublons

**Problème détecté :**
- `--gradient-accent` est utilisé (~8 occurrences) mais **non défini** dans globals.css
- `--gradient-primary-ocean` (1 usage) = peut être remplacé par `--gradient-success`
- `--gradient-primary-sky` (1 usage) = peut être remplacé par gradients inline

**Actions :**

1. **Ajouter `--gradient-accent` manquant :**
   ```css
   /* Accent Yellow — Boutons accent, icônes */
   --gradient-accent: linear-gradient(135deg, #FFD791 0%, #F8B044 100%);
   ```

2. **Remplacer `--gradient-primary-ocean` par `--gradient-success` :**
   ```tsx
   // AVANT (DashboardHeroV2Fixed.tsx ligne 414)
   background: 'var(--gradient-primary-ocean)'
   
   // APRÈS
   background: 'var(--gradient-success)'
   ```

3. **Remplacer `--gradient-primary-sky` par inline gradient :**
   ```tsx
   // AVANT (components/modals/SuccessModal.tsx ligne 81)
   background: 'var(--gradient-primary-sky)'
   
   // APRÈS
   background: 'linear-gradient(135deg, rgba(232, 244, 247, 0.1) 0%, rgba(150, 195, 207, 0.08) 100%)'
   ```

4. **Consolidation des radials :**
   - Garder `--gradient-primary-radial` et `--gradient-secondary-radial` (utilisés showcase/error pages)
   - Archiver `--gradient-accent-radial` (1 seul usage import Figma)

### ÉTAPE 5 : Vérification des pages showcase/design system

**Pages à vérifier :**
- `/pages/TLSDesignSystemKit.tsx` (lignes 1261-1266, 911-912)
- `/pages/DesignSystemRealPage.tsx` (lignes 1870-1874, 1928-1929)
- `/components/design-system/TLSColorsShowcase.tsx` (lignes 327-332)
- `/imports/DesignSystemTls.tsx` (figma imports)

**Action :** Mettre à jour ces pages pour refléter la whitelist uniquement (13 gradients).

### ÉTAPE 6 : Migration sûre (search/replace)

**Commandes de remplacement :**

```bash
# 1. Remplacer gradient-primary-ocean par gradient-success
find . -type f -name "*.tsx" -exec sed -i '' 's/--gradient-primary-ocean/--gradient-success/g' {} +

# 2. Remplacer gradient-primary-sky inline (manuel car contexte)
# → Vérifier /components/modals/SuccessModal.tsx ligne 81
```

### ÉTAPE 7 : Tests de non-régression

**Checklist :**
- [ ] Toutes les pages se rendent correctement
- [ ] Aucun gradient cassé (vide ou blanc)
- [ ] Les progress bars affichent correctement
- [ ] Les boutons affichent les gradients
- [ ] Les modals affichent les gradients sémantiques
- [ ] Les pages auth affichent le gradient circular-tls
- [ ] Les textes hero affichent les gradients texte

---

## 📦 LIVRABLE FINAL

### WHITELIST FINALE (14 gradients après ajout accent)

1. ✅ `--gradient-primary` (UI primitives)
2. ✅ `--gradient-secondary` (UI primitives)
3. ✅ `--gradient-warm` (progress bars exception)
4. ✅ `--gradient-accent` (UI primitives) **← À AJOUTER**
5. ✅ `--gradient-success` (semantic)
6. ✅ `--gradient-brand` (CTA spéciaux)
7. ✅ `--gradient-warning` (semantic)
8. ✅ `--gradient-destructive` (semantic)
9. ✅ `--gradient-info` (semantic)
10. ✅ `--gradient-tls-text` (texte uniquement)
11. ✅ `--gradient-tls-text-cool` (texte uniquement)
12. ✅ `--gradient-tls-text-hero-light` (texte uniquement)
13. ✅ `--gradient-circular-tls` (page BG auth)
14. ✅ `--gradient-tls` (hero sections)
15. ✅ `--gradient-tls-subtle` (page BG léger)

**BONUS DECORATIVE (optionnel, pour showcase/decorative) :**
16. ⚠️ `--gradient-primary-radial` (blobs décoratifs)
17. ⚠️ `--gradient-secondary-radial` (blobs décoratifs)

### RÈGLES STRICTES

1. **INTERDITS SUR UI PRIMITIVES :**
   - Gradients multicolores TLS (sauf warm orange+jaune)
   - Gradients texte sur boutons/badges
   - Gradients mesh/blend

2. **AUTORISÉS UNIQUEMENT :**
   - **Progress bars/sliders** : warm (orange+jaune)
   - **Texte** : tls-text, tls-text-cool, tls-text-hero-light
   - **Backgrounds** : circular-tls (auth), tls (hero), tls-subtle (pages)

3. **CONSOLIDATION :**
   - Ne pas créer de nouveaux gradients sans validation
   - Préférer gradients inline si usage unique
   - Documenter chaque nouveau gradient

---

## ✅ PROCHAINES ÉTAPES

1. ✅ **Valider la whitelist** avec l'équipe design
2. ⚠️ **Créer `/archive/gradients-legacy.css`**
3. ⚠️ **Nettoyer `/styles/globals.css`**
4. ⚠️ **Créer `/styles/gradients.css` avec whitelist**
5. ⚠️ **Ajouter `--gradient-accent` manquant**
6. ⚠️ **Remplacer doublons** (primary-ocean, primary-sky)
7. ⚠️ **Tester non-régression**
8. ✅ **Documenter les règles** (ce fichier)
9. ⚠️ **Communiquer la whitelist** à l'équipe

---

**Fin de l'audit — Prêt pour nettoyage.**
