# Canva Components Strategy — TLS Design System

Guide pour ajouter les éléments réutilisables TLS dans le Brand Kit Canva.

---

## 🎨 Qu'est-ce que les Canva Components ?

**Components** dans Canva sont des **éléments réutilisables** (boutons, cards, badges, etc.) que tu crées une fois, puis réutilises partout dans tes designs.

**Avantages** :
- ✅ Cohérence visuelle garantie
- ✅ Mises à jour centralisées (change 1 component = change TOUS les designs qui l'utilisent)
- ✅ Gain de temps (copier/coller, pas redessiner)
- ✅ Synchro avec le code React (référence unique)

---

## 📋 TLS Components à créer

Classés par priorité (reprendre depuis `src/components/`).

### **TIER 1 — Éléments critiques (Commencer par ceux-ci)**

| Component | Type | Variants | Source React |
|-----------|------|----------|--------------|
| **Button** | Interactive | primary, secondary, ghost, warm, destructive | `core/Button.tsx` |
| **Card** | Container | default, feature, elevated, interactive | `core/Card.tsx` |
| **Badge** | Status | brand, neutral, warm, sun, success, danger, info | `ui/Badge.tsx` |
| **Input** | Form | default, focus, error, disabled | `core/Input.tsx` |
| **Pill** | Chip | surface, glass-light, glass-dark | `ui/Pill.tsx` |

### **TIER 2 — Patterns courants (Après Tier 1)**

| Component | Type | Variants | Source |
|-----------|------|----------|--------|
| **Breadcrumb** | Navigation | simple, nav | `ui/Breadcrumb.tsx` |
| **Alert** | Feedback | info, success, warning, danger | `ui/Alert.tsx` |
| **SectionHeader** | Page structure | default, solid, minimal, accent | `patterns/SectionHeader.tsx` |
| **EditorialHero / PageHero** | Page header | brand, warm, sun, default | `patterns/EditorialHero.tsx` |
| **Modal** | Overlay | default, warning, success | `ui/Modal.tsx` |

### **TIER 3 — Composites avancés (Long terme)**

| Component | Type | Variants | Source |
|-----------|------|----------|--------|
| **FormGroup** | Form wrapper | default, error, success | `core/FormGroup.tsx` |
| **Tabs** | Navigation | default | `ui/Tabs.tsx` |
| **Avatar** | User indicator | XS, SM, MD, LG | `ui/Avatar.tsx` |
| **Tag** | Removable chip | all tones | `ui/Tag.tsx` |
| **FilterChip** | Toggle chip | default, active | `ui/FilterChip.tsx` |

---

## 🛠️ Comment créer un Canva Component

### **Étape 1 : Créer le design**
1. Ouvre Canva → crée un nouveau design (format quelconque)
2. Construis ton composant (ex. un Button en 3 variants)
3. Applique les couleurs TLS, fonts, spacing

### **Étape 2 : Convertir en Component**
1. Sélectionne le groupe/élément
2. Menu → "Save as component"
3. Donne un nom : `TLS / Button / Primary` (hiérarchie : Category / Component / Variant)

### **Étape 3 : Ajouter au Brand Kit (V-NEW)**
Canva a une nouvelle interface pour les brand components. Les components que tu crées se retrouvent automatiquement dans le Brand Kit si tu les publies correctement.

---

## 📐 Principes de création

### **Naming Convention**
```
TLS / [ComponentType] / [Variant]

Exemples :
- TLS / Button / Primary
- TLS / Button / Secondary
- TLS / Card / Feature
- TLS / Badge / Success
- TLS / Input / Default
```

### **Sizing Standard**
- **XS buttons** : 32px height
- **SM buttons** : 40px height  
- **MD buttons** : 48px height (standard)
- **Card widths** : 280px (mobile), 380px (desktop)
- **Icons** : 16px, 20px, 24px, 32px

### **Colors & Tokens**
- Use exact TLS colors : #4A8FA1 (primary), #ED843A (orange), etc.
- Label fills with Figma variable names (ex: "TLS/Colors/Primary-600") if Canva supports it
- Include opacity states (hover 80%, disabled 50%)

### **States Essentielles**
Pour chaque component interactif, créer :
- **Default state**
- **Hover state** (subtly darkened/lifted)
- **Active state** (darker accent)
- **Disabled state** (gray 50% opacity)
- **Focus state** (outline ring)

---

## 🚀 Workflow d'ajout (Recommandé)

### **Sprint 1 (This week)**
- [ ] Create Button (all variants)
- [ ] Create Card (2-3 main variants)
- [ ] Create Badge (success, danger, info)
- [ ] Test components in 2-3 designs

### **Sprint 2 (Next week)**
- [ ] Create Input + FormGroup
- [ ] Create SectionHeader
- [ ] Create PageHero
- [ ] Create Pill variants

### **Sprint 3 (After validation)**
- [ ] Create Modal
- [ ] Create Breadcrumb
- [ ] Create Alert
- [ ] Create advanced composites

---

## 📌 Points clés

1. **Name components hierarchically** → easier to search in Canva
2. **Include ALL visual states** (hover, focus, disabled)
3. **Use exact TLS colors** → hex values from `src/index.css @theme`
4. **Document variants in description** (each component's Canva properties)
5. **Test updates** → change 1 component, verify all designs using it update

---

## 🔗 Reference: TLS Design System Files

Source files for component specifications:
- **Colors**: `src/index.css` (@theme block)
- **Typography**: heading/body/caption rules in `src/styles/globals.css`
- **Components**: `src/components/core/`, `src/components/ui/`
- **Design tokens**: `src/styles/design-tokens.css` (legacy, check index.css first)

---

## Next Steps

1. **Audit current Canva Kit** → check if Components section exists
2. **Create TIER 1 components** (Button, Card, Badge, Input, Pill)
3. **Document in Canva** (add descriptions, link to React source)
4. **Train team** → how to use them in designs
5. **Monitor updates** → when React components change, sync Components

---

**Status**: 🚧 Not yet implemented
**Estimated effort**: 4-6 hours for TIER 1
**Value**: High — standardizes all Canva designs to match React app
