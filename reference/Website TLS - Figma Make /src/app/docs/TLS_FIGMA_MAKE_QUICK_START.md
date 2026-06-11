# 🚀 THE LEARNING SOCIETY - FIGMA MAKE QUICK START

## Guide rapide pour implémenter les composants TLS dans Figma Make

---

## 📚 Documentation disponible

Vous disposez de 4 documents complets :

1. **`TLS_DESIGN_SYSTEM_COMPONENTS.md`** - Spécifications détaillées de tous les composants
2. **`TLS_COMPONENTS_CODE_EXAMPLES.md`** - Exemples de code React/TypeScript
3. **`TLS_COLOR_VARIANTS_BY_POLE.md`** - Variantes de couleurs par pôle
4. **`TLS_FIGMA_MAKE_QUICK_START.md`** - Ce guide (démarrage rapide)

---

## 🎨 PROMPT 1 : HERO SECTION BACKGROUND

### Pour la page ACADÉMIE (Bleu)

```
Créer un hero section background avec :
- Fond blanc pur (#ffffff)
- Overlay gradient diagonal 135° : rgba(85, 161, 180, 0.03) → transparent
- Blob animé en haut droite : 500px × 500px (mobile: 384px)
  * Position : top-20 right-0
  * Opacité : 20%
  * Blur : 48px
  * Couleur : radial-gradient(circle, #96C3CF 0%, transparent 70%)
  * Animation float : 20s ease-in-out infinite
  * Keyframe : 0%/100% = translate(0,0) scale(1), 50% = translate(-30px,-30px) scale(1.1)
```

### Pour la page AGENCE (Orange)

```
Créer un hero section background avec :
- Fond blanc pur (#ffffff)
- Overlay gradient diagonal 135° : rgba(237, 132, 58, 0.03) → transparent
- Blob animé en haut droite : 500px × 500px (mobile: 384px)
  * Position : top-20 right-0
  * Opacité : 20%
  * Blur : 48px
  * Couleur : radial-gradient(circle, #F59A5F 0%, transparent 70%)
  * Animation float : 20s ease-in-out infinite
  * Keyframe : 0%/100% = translate(0,0) scale(1), 50% = translate(-30px,-30px) scale(1.1)
```

### Pour la page CONSEIL (Jaune)

```
Créer un hero section background avec :
- Fond blanc pur (#ffffff)
- Overlay gradient diagonal 135° : rgba(248, 176, 68, 0.03) → transparent
- Blob animé en haut droite : 500px × 500px (mobile: 384px)
  * Position : top-20 right-0
  * Opacité : 20%
  * Blur : 48px
  * Couleur : radial-gradient(circle, #FFC15A 0%, transparent 70%)
  * Animation float : 20s ease-in-out infinite
  * Keyframe : 0%/100% = translate(0,0) scale(1), 50% = translate(-30px,-30px) scale(1.1)
```

### Pour la page TECH (Bleu clair)

```
Créer un hero section background avec :
- Fond blanc pur (#ffffff)
- Overlay gradient diagonal 135° : rgba(123, 196, 212, 0.03) → transparent
- Blob animé en haut droite : 500px × 500px (mobile: 384px)
  * Position : top-20 right-0
  * Opacité : 20%
  * Blur : 48px
  * Couleur : radial-gradient(circle, #7BC4D4 0%, transparent 70%)
  * Animation float : 20s ease-in-out infinite
  * Keyframe : 0%/100% = translate(0,0) scale(1), 50% = translate(-30px,-30px) scale(1.1)
```

---

## 🎨 PROMPT 2 : BENEFIT CARDS (6 cards en grille)

### Pour ACADÉMIE (Bleu)

```
Créer une grille de 6 benefit cards glassmorphism :

LAYOUT :
- Container : max-width 1280px, padding horizontal 24px
- Grid : 3 colonnes desktop (grid-cols-3), 2 colonnes mobile (grid-cols-2)
- Gap : 20px entre les cards

CARD STYLE (chacune) :
- Padding : 24px
- Border-radius : 16px
- Background : linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)
- Backdrop-filter : blur(20px)
- Border : 1px solid rgba(85, 161, 180, 0.15)
- Shadow normal : 0 4px 20px rgba(0,0,0,0.04)
- Shadow hover : 0 12px 40px rgba(85, 161, 180, 0.12)
- Transform hover : translateY(-4px)
- Transition : 0.4s cubic-bezier(0.4, 0, 0.2, 1)

ACCENT LINE (top) :
- Position : absolute top
- Height : 2px
- Background : linear-gradient(90deg, #73AFBF 0%, #55A1B4 100%)
- Opacity : 0.6

HEADER ROW (flex horizontal) :
- Icon container gauche : 48px × 48px, border-radius 10px
  * Background : linear-gradient(135deg, rgba(85,161,180,0.1) 0%, rgba(85,161,180,0.05) 100%)
  * Border : 1px solid rgba(85, 161, 180, 0.15)
  * Icon : 24px, couleur #55A1B4
- Stat container droite : text-align right
  * Number : League Spartan, 20px, bold, couleur #55A1B4
  * Label : Nunito, 10px, uppercase, letter-spacing 0.05em, couleur #6B7D82

CONTENT :
- Title : League Spartan, 16px, bold, couleur #252B37, margin-bottom 8px
- Description : Nunito, 12px, line-height 1.625, couleur #3A474B

DONNÉES (6 cards) :
1. Icon: Brain, Stat: "10+ ans", Label: "EXPÉRIENCE PÉDAGOGIE", Title: "Formateurs-Experts IA"
2. Icon: Rocket, Stat: "100+", Label: "RESOURCES INCLUSES", Title: "Mise en Pratique Immédiate"
3. Icon: Users, Stat: "500+", Label: "MEMBRES ACTIFS", Title: "Communauté & Entraide"
4. Icon: Award, Stat: "98%", Label: "TAUX DE RÉUSSITE", Title: "Certification Reconnue"
5. Icon: TrendingUp, Stat: "Chaque mois", Label: "NOUVEAUX CONTENUS", Title: "Contenus Actualisés"
6. Icon: Sparkles, Stat: "< 24h", Label: "TEMPS DE RÉPONSE", Title: "Support Personnalisé"
```

### Pour AGENCE (Orange)

```
Même structure que Académie, changer uniquement :

COULEURS :
- Border card : 1px solid rgba(237, 132, 58, 0.15)
- Shadow hover : 0 12px 40px rgba(237, 132, 58, 0.12)
- Accent line : linear-gradient(90deg, #F18A4C 0%, #C06920 100%)
- Icon container bg : linear-gradient(135deg, rgba(237,132,58,0.1) 0%, rgba(237,132,58,0.05) 100%)
- Icon container border : rgba(237, 132, 58, 0.15)
- Icon color : #C06920
- Stat color : #C06920

DONNÉES : Adapter le contenu au pôle Agence (conception, projets, clients, etc.)
```

### Pour CONSEIL (Jaune)

```
Même structure, changer :

COULEURS :
- Border card : 1px solid rgba(248, 176, 68, 0.15)
- Shadow hover : 0 12px 40px rgba(248, 176, 68, 0.12)
- Accent line : linear-gradient(90deg, #F8B044 0%, #D69020 100%)
- Icon container bg : linear-gradient(135deg, rgba(248,176,68,0.1) 0%, rgba(248,176,68,0.05) 100%)
- Icon container border : rgba(248, 176, 68, 0.15)
- Icon color : #D69020
- Stat color : #D69020

DONNÉES : Adapter au pôle Conseil (stratégie, accompagnement, etc.)
```

### Pour TECH (Bleu clair)

```
Même structure, changer :

COULEURS :
- Border card : 1px solid rgba(123, 196, 212, 0.15)
- Shadow hover : 0 12px 40px rgba(123, 196, 212, 0.12)
- Accent line : linear-gradient(90deg, #7BC4D4 0%, #4A8FA1 100%)
- Icon container bg : linear-gradient(135deg, rgba(123,196,212,0.1) 0%, rgba(123,196,212,0.05) 100%)
- Icon container border : rgba(123, 196, 212, 0.15)
- Icon color : #7BC4D4
- Stat color : #7BC4D4

DONNÉES : Adapter au pôle Tech (outils, APIs, intégrations, etc.)
```

---

## 🎨 PROMPT 3 : HERO BADGE (Section Label)

### Pour ACADÉMIE (Bleu)

```
Créer un badge hero glassmorphism :
- Display : inline-flex, align-items center
- Gap : 8px
- Padding : 8px 20px
- Border-radius : 9999px (pill)
- Background : rgba(255, 255, 255, 0.8)
- Backdrop-filter : blur(12px)
- Border : 1px solid rgba(85, 161, 180, 0.2)
- Box-shadow : 0 8px 32px rgba(85, 161, 180, 0.1)

CONTENU :
- Icon : GraduationCap, 16px, couleur #55A1B4
- Text : "ACADÉMIE • FORMATION"
  * Font : Nunito
  * Size : 12px
  * Weight : bold
  * Color : #3D7786
  * Letter-spacing : 0.1em
  * Transform : uppercase
```

### Pour AGENCE (Orange)

```
Même structure, changer :
- Border : 1px solid rgba(237, 132, 58, 0.2)
- Box-shadow : 0 8px 32px rgba(237, 132, 58, 0.1)
- Icon color : #C06920
- Text color : #8F5017
- Text : "AGENCE • CONCEPTION"
```

### Pour CONSEIL (Jaune)

```
Même structure, changer :
- Border : 1px solid rgba(248, 176, 68, 0.2)
- Box-shadow : 0 8px 32px rgba(248, 176, 68, 0.1)
- Icon color : #D69020
- Text color : #9B6818
- Text : "CONSEIL • STRATÉGIE"
```

### Pour TECH (Bleu clair)

```
Même structure, changer :
- Border : 1px solid rgba(123, 196, 212, 0.2)
- Box-shadow : 0 8px 32px rgba(123, 196, 212, 0.1)
- Icon color : #7BC4D4
- Text color : #4A8FA1
- Text : "TECH • TECHNOLOGIE"
```

---

## 🎨 PROMPT 4 : PRIMARY BUTTON

### Pour ACADÉMIE (Bleu)

```
Créer un bouton principal :
- Padding : 16px 32px
- Border-radius : 16px
- Background : linear-gradient(135deg, #4A8FA1 0%, #55A1B4 100%)
- Color : white
- Font : Nunito, 16px, semibold
- Box-shadow normal : 0 4px 16px rgba(85, 161, 180, 0.3)
- Transition : all 0.3s cubic-bezier(0.4, 0, 0.2, 1)

HOVER :
- Transform : translateY(-2px)
- Box-shadow : 0 8px 24px rgba(85, 161, 180, 0.4)
```

### Pour AGENCE (Orange)

```
Même structure, changer :
- Background : linear-gradient(135deg, #C06920 0%, #ED843A 100%)
- Box-shadow normal : 0 4px 16px rgba(237, 132, 58, 0.3)
- Box-shadow hover : 0 8px 24px rgba(237, 132, 58, 0.4)
```

### Pour CONSEIL (Jaune)

```
Même structure, changer :
- Background : linear-gradient(135deg, #D69020 0%, #F8B044 100%)
- Color : #252B37 (TEXTE FONCÉ pour contraste!)
- Box-shadow normal : 0 4px 16px rgba(248, 176, 68, 0.3)
- Box-shadow hover : 0 8px 24px rgba(248, 176, 68, 0.4)
```

### Pour TECH (Bleu clair)

```
Même structure, changer :
- Background : linear-gradient(135deg, #4A8FA1 0%, #7BC4D4 100%)
- Box-shadow normal : 0 4px 16px rgba(123, 196, 212, 0.3)
- Box-shadow hover : 0 8px 24px rgba(123, 196, 212, 0.4)
```

---

## 🎨 PROMPT 5 : TAB SYSTEM

### Pour ACADÉMIE (Bleu)

```
Créer un système de tabs avec 4 boutons :

TAB BUTTON INACTIVE :
- Padding : 12px 24px
- Border-radius : 16px
- Background : rgba(255, 255, 255, 0.8)
- Border : 1px solid #E0E8EA
- Color : #3A474B
- Font : Nunito, 14px, semibold
- Box-shadow : 0 2px 8px rgba(0, 0, 0, 0.05)

TAB BUTTON ACTIVE :
- Background : linear-gradient(135deg, #4A8FA1 0%, #55A1B4 100%)
- Border : 1px solid #4A8FA1
- Color : white
- Box-shadow : 0 8px 24px rgba(85, 161, 180, 0.3)

LAYOUT :
- Container : flex, flex-wrap, justify-center
- Gap : 12px entre les tabs
- Margin-bottom : 48px

TABS :
1. "Fondamentaux"
2. "Production"
3. "Conception"
4. "Stratégie"
```

### Pour AGENCE (Orange)

```
Même structure, changer TAB ACTIVE :
- Background : linear-gradient(135deg, #C06920 0%, #ED843A 100%)
- Border : 1px solid #C06920
- Box-shadow : 0 8px 24px rgba(237, 132, 58, 0.3)
```

---

## 🎨 PROMPT 6 : CONTENT CARD (Large)

### Pour ACADÉMIE (Bleu)

```
Créer une grande card de contenu glassmorphism :

CONTAINER :
- Border-radius : 24px
- Background : linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)
- Backdrop-filter : blur(20px)
- Border : 1px solid rgba(85, 161, 180, 0.15)
- Box-shadow : 0 25px 50px -12px rgba(85, 161, 180, 0.2)

ACCENT BAR (top) :
- Height : 3px
- Background : linear-gradient(90deg, #73AFBF 0%, #55A1B4 50%, #73AFBF 100%)

CONTENT PADDING : 48px

GRID LAYOUT :
- Desktop : 2 colonnes (1fr 1fr)
- Mobile : 1 colonne
- Gap : 48px
- Align-items : center

LEFT COLUMN :
- Large icon container : 80px × 80px, border-radius 24px
  * Background : linear-gradient(135deg, rgba(85,161,180,0.1) 0%, rgba(85,161,180,0.05) 100%)
  * Border : 1px solid rgba(85, 161, 180, 0.2)
  * Box-shadow : 0 8px 24px rgba(85, 161, 180, 0.15)
  * Icon : 40px, couleur #55A1B4

- Badge niveau : inline-flex, même style que les petits badges
  * Background : linear-gradient(135deg, rgba(85,161,180,0.1) 0%, rgba(85,161,180,0.05) 100%)
  * Border : 1px solid rgba(85, 161, 180, 0.2)
  * Text : Nunito, 12px, bold, couleur #3D7786

- Title : League Spartan, clamp(28px → 40px), bold, couleur #252B37
- Subtitle : Nunito, 18px, semibold, couleur #55A1B4
- Description : Nunito, 16px, line-height 1.625, couleur #3A474B

- Highlights list :
  * CheckCircle2 icon : 20px, couleur #55A1B4
  * Text : Nunito, 14px, couleur #3A474B
  * Gap : 12px entre chaque item

- Meta info (durée, modules) :
  * Clock/BookOpen icon : 20px, couleur #55A1B4
  * Text : Nunito, 14px, semibold, couleur #3A474B

- CTA Button : même style que Primary Button

RIGHT COLUMN :
- Image container : aspect-ratio 4/3, border-radius 24px
  * Background : linear-gradient(135deg, rgba(85,161,180,0.1) 0%, rgba(85,161,180,0.05) 100%)
  * Border : 1px solid rgba(85, 161, 180, 0.2)

- Floating badge (bottom-right, -24px offset, desktop only) :
  * Padding : 24px
  * Border-radius : 24px
  * Background : rgba(255, 255, 255, 0.95)
  * Backdrop-filter : blur(12px)
  * Border : 1px solid rgba(85, 161, 180, 0.2)
  * Box-shadow : 0 20px 40px rgba(85, 161, 180, 0.25)
  * Number : League Spartan, 30px, bold, couleur #55A1B4
  * Label : Nunito, 14px, couleur #6B7D82
```

### Pour AGENCE (Orange)

```
Même structure, changer toutes les couleurs bleues par orange :
- Border card : rgba(237, 132, 58, 0.15)
- Box-shadow : rgba(237, 132, 58, 0.2)
- Accent bar : #F18A4C → #C06920 → #F18A4C
- Icon containers : rgba(237, 132, 58, 0.1) → rgba(237, 132, 58, 0.05)
- Borders : rgba(237, 132, 58, 0.2)
- Icon & stat colors : #C06920
- Subtitle color : #C06920
```

---

## 🎨 PROMPT 7 : CTA SECTION

### Pour ACADÉMIE (Bleu)

```
Créer une section CTA full-width avec background coloré :

CONTAINER :
- Padding : 128px vertical
- Position : relative
- Overflow : hidden

BACKGROUND :
- Background : linear-gradient(135deg, #4A8FA1 0%, #3D7786 100%)

ANIMATED BLOBS (×2) :
- Blob 1 : top-0 right-0, 600px × 600px (mobile: 400px)
  * Background : radial-gradient(circle, white 0%, transparent 70%)
  * Opacity : 0.2
  * Blur : 48px
  * Animation : float 20s ease-in-out infinite

- Blob 2 : bottom-0 left-0, 500px × 500px (mobile: 400px)
  * Même style que Blob 1
  * Animation-delay : 5s

CONTENT (z-index 1, relatif) :
- Max-width : 800px
- Margin : auto
- Text-align : center
- Padding horizontal : 24px

- Title : League Spartan, clamp(32px → 56px), bold, couleur white
- Description : Nunito, 20px, line-height 1.625, couleur rgba(255,255,255,0.9)
- Buttons container : flex, flex-wrap, justify-center, gap 16px

WHITE BUTTON :
- Background : white
- Color : #3D7786
- Padding : 20px 40px
- Border-radius : 16px
- Font : Nunito, 18px, semibold
- Box-shadow : 0 8px 24px rgba(0, 0, 0, 0.15)
- Hover : box-shadow 0 12px 32px rgba(0, 0, 0, 0.2), translateY(-2px)

OUTLINE BUTTON :
- Background : rgba(255, 255, 255, 0.1)
- Backdrop-filter : blur(8px)
- Border : 2px solid white
- Color : white
- Même dimensions que white button
```

### Pour AGENCE (Orange)

```
Même structure, changer :
- Background gradient : linear-gradient(135deg, #C06920 0%, #8F5017 100%)
- White button text color : #8F5017
```

### Pour CONSEIL (Jaune)

```
Même structure, changer :
- Background gradient : linear-gradient(135deg, #D69020 0%, #9B6818 100%)
- White button text color : #9B6818
```

### Pour TECH (Bleu clair)

```
Même structure, changer :
- Background gradient : linear-gradient(135deg, #4A8FA1 0%, #3D7786 100%)
- White button text color : #4A8FA1
```

---

## 📋 CHECKLIST D'IMPLÉMENTATION

Avant de soumettre un composant à Figma Make, vérifiez :

### ✅ Design System
- [ ] Utilise les bonnes variables CSS (--primary-*, --secondary-*, etc.)
- [ ] Respecte les espacements (--space-*)
- [ ] Utilise League Spartan pour les titres
- [ ] Utilise Nunito pour le body text
- [ ] Border-radius corrects (10px, 16px, 24px)

### ✅ Couleurs par Pôle
- [ ] Couleur primaire adaptée au pôle
- [ ] Gradients dans le bon sens
- [ ] Opacités correctes (0.03 overlay, 0.1 bg, 0.15 border, etc.)
- [ ] Ombres avec la bonne couleur de pôle

### ✅ Glassmorphism
- [ ] Background semi-transparent avec gradient
- [ ] Backdrop-filter: blur(20px)
- [ ] Border subtile colorée
- [ ] Shadow douce

### ✅ Animations
- [ ] Transitions fluides (cubic-bezier)
- [ ] Hover states définis
- [ ] Transform translateY pour les lifts
- [ ] Float animation pour les blobs

### ✅ Responsive
- [ ] Mobile : 2 colonnes ou 1 colonne
- [ ] Tablet : 2 colonnes
- [ ] Desktop : 3 colonnes (grids) ou 2 colonnes (content cards)
- [ ] Tailles de blobs adaptées

### ✅ Accessibilité
- [ ] Contraste texte/fond > 4.5:1
- [ ] ATTENTION : Jaune (Conseil) utilise texte FONCÉ
- [ ] Cursor pointer sur éléments interactifs
- [ ] Focus states recommandés

---

## 🎯 WORKFLOW RECOMMANDÉ

1. **Commencer par le Hero Background** (PROMPT 1)
2. **Ajouter le Hero Badge** (PROMPT 3)
3. **Créer les Buttons** (PROMPT 4)
4. **Implémenter les Benefit Cards** (PROMPT 2)
5. **Ajouter le Tab System** (PROMPT 5)
6. **Créer la Content Card** (PROMPT 6)
7. **Finaliser avec la CTA Section** (PROMPT 7)

---

## 💡 ASTUCES

### Variables Figma
Créez des variables Figma pour chaque pôle :
- `academie/primary` = #55A1B4
- `agence/primary` = #ED843A
- `conseil/primary` = #F8B044
- `tech/primary` = #7BC4D4

### Composants Réutilisables
Créez des composants Figma pour :
- Badge (avec variantes par pôle)
- Button Primary (avec variantes)
- Button Secondary (avec variantes)
- Icon Container (avec variantes)
- Card Glassmorphism (avec variantes)

### Auto Layout
Utilisez Auto Layout Figma pour :
- Flex containers (badges, buttons, pills)
- Grids (benefit cards)
- Spacing cohérent

### Plugins Recommandés
- **Unsplash** : Pour les images de contenu
- **Iconify** : Pour les icônes Lucide React
- **Arc** : Pour les border-radius arrondis
- **Blobs** : Pour créer les formes organiques

---

## 📞 SUPPORT

Si vous avez des questions sur l'implémentation :
1. Consultez `TLS_DESIGN_SYSTEM_COMPONENTS.md` pour les specs détaillées
2. Référez-vous à `TLS_COLOR_VARIANTS_BY_POLE.md` pour les couleurs
3. Vérifiez `TLS_COMPONENTS_CODE_EXAMPLES.md` pour les exemples React

---

**Document créé pour The Learning Society**  
*Figma Make Quick Start Guide*  
*Version 1.0 - Janvier 2026*  

🚀 **Bon design !**
