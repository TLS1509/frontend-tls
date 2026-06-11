# 🎨 Guide Figma - The Learning Society Design System

## 📦 Import des Tokens de Design dans Figma

Ce guide vous explique comment importer le design system TLS dans Figma pour maintenir la cohérence entre le design et le code.

---

## 🚀 Installation (5 minutes)

### Étape 1 : Installer le Plugin
1. Ouvrez Figma
2. Allez dans **Plugins** → **Browse plugins in Community**
3. Recherchez **"Tokens Studio for Figma"**
4. Cliquez sur **Install**

### Étape 2 : Ouvrir votre Fichier Figma
1. Ouvrez votre fichier de design TLS
2. Lancez le plugin : **Plugins** → **Tokens Studio for Figma**

### Étape 3 : Importer les Tokens
1. Dans le plugin, cliquez sur l'icône **Settings** (⚙️)
2. Sélectionnez **Import**
3. Choisissez **Import from file**
4. Sélectionnez le fichier `figma-design-tokens.json`
5. Cliquez sur **Import**

✅ **C'est fait !** Tous les tokens sont maintenant synchronisés.

---

## 🎨 Tokens Disponibles

### 1. Couleurs (Colors)

#### Primary Blue - Académie/Formation
```
primary.50   → #E8F4F7  (Très clair)
primary.100  → #DCEBEF
primary.200  → #B9D7DF
primary.300  → #96C3CF
primary.400  → #73AFBF
primary.500  → #55A1B4  ⭐ Base
primary.600  → #4A8FA1
primary.700  → #3D7786
primary.800  → #2F5F6A
primary.900  → #1F3E45  (Très foncé)
```

#### Secondary Orange - Agence/Conception
```
secondary.50   → #FFF3EB  (Très clair)
secondary.100  → #FDDCC7
secondary.200  → #FCBB93
secondary.300  → #F59A5F
secondary.400  → #F18A4C
secondary.500  → #ED843A  ⭐ Base
secondary.600  → #C06920
secondary.700  → #8F5017
secondary.800  → #5E3710
secondary.900  → #3B2109  (Très foncé)
```

#### Accent Yellow - Conseil/Stratégie
```
accent.50   → #FFF9EE  (Très clair)
accent.100  → #FFECC8
accent.200  → #FFD791
accent.300  → #FFC15A
accent.400  → #F8B044  ⭐ Base
accent.500  → #F8A733
accent.600  → #D69020
accent.700  → #9B6818
accent.800  → #664410
accent.900  → #3D2909  (Très foncé)
```

#### Neutral - Texte & Backgrounds
```
neutral.50   → #F5F8F8  (Background très clair)
neutral.100  → #EEF6F8
neutral.200  → #E0E8EA
neutral.300  → #C8D4D7
neutral.400  → #9AABB0
neutral.500  → #6B7D82
neutral.600  → #5f8f8f
neutral.700  → #3A474B
neutral.800  → #2A3538
neutral.900  → #252B37  (Texte principal)
```

---

### 2. Typographie (Typography)

#### Polices (Font Families)
```
display → League Spartan
body    → Nunito
```

#### Tailles (Font Sizes)
```
xs   → 12px
sm   → 14px
base → 16px ⭐
lg   → 18px
xl   → 20px
2xl  → 24px
3xl  → 30px
4xl  → 36px
5xl  → 48px
6xl  → 60px
```

#### Poids (Font Weights)
```
light     → 300
normal    → 400
medium    → 500
semibold  → 600 ⭐
bold      → 700
```

#### Hauteurs de Ligne (Line Heights)
```
none     → 1
tight    → 1.25 ⭐
snug     → 1.375
normal   → 1.5
relaxed  → 1.625
loose    → 2
```

---

### 3. Espacements (Spacing)

Scale 4pt (4px base)
```
0   → 0px
1   → 4px
2   → 8px
3   → 12px
4   → 16px ⭐
5   → 20px
6   → 24px
8   → 32px
10  → 40px
12  → 48px
16  → 64px
20  → 80px
24  → 96px
32  → 128px
```

---

### 4. Border Radius

```
none → 0px
sm   → 6px
md   → 8px
lg   → 10px ⭐
xl   → 16px
2xl  → 24px
full → 9999px (cercle)
```

---

### 5. Ombres (Box Shadow)

```
xs  → Très légère
sm  → Légère
md  → Moyenne ⭐
lg  → Prononcée
xl  → Très prononcée
2xl → Extrême
```

---

## 🎯 Utilisation dans Figma

### Appliquer une Couleur
1. Sélectionnez un élément
2. Dans le panneau de droite, cliquez sur la couleur de **Fill**
3. Dans le plugin Tokens Studio, sélectionnez la couleur désirée
4. Elle s'applique automatiquement

### Appliquer une Typographie
1. Sélectionnez un texte
2. Dans le plugin, allez dans **Typography**
3. Sélectionnez :
   - Font Family (display ou body)
   - Font Size (base, lg, xl, etc.)
   - Font Weight (semibold, bold, etc.)
   - Line Height (tight, relaxed, etc.)

### Appliquer un Espacement
1. Créez un Auto Layout
2. Dans le plugin, allez dans **Spacing**
3. Appliquez la valeur désirée au padding/gap

### Appliquer un Border Radius
1. Sélectionnez un rectangle/frame
2. Dans le plugin, allez dans **Border Radius**
3. Appliquez la valeur désirée

---

## 🎨 Code Couleur par Pôle TLS

### Académie (Formation)
- **Couleur principale** : Primary Blue (`#55A1B4`)
- **Usage** : Formations, parcours pédagogiques, certifications
- **Variantes** : primary.50 à primary.900

### Agence (Conception)
- **Couleur principale** : Secondary Orange (`#ED843A`)
- **Usage** : Production, conception, scénarisation
- **Variantes** : secondary.50 à secondary.900

### Conseil (Stratégie)
- **Couleur principale** : Accent Yellow (`#F8B044`)
- **Usage** : Conseil, gouvernance, stratégie IA
- **Variantes** : accent.50 à accent.900

### Tech (Solutions)
- **Couleur principale** : Primary Blue (`#55A1B4`)
- **Usage** : Solutions techniques, développement
- **Variantes** : primary.50 à primary.900

---

## 📐 Bonnes Pratiques

### Hiérarchie Typographique
```
H1 → 48px-60px (display, bold)
H2 → 36px-48px (display, bold)
H3 → 24px-30px (display, semibold)
H4 → 20px (display, medium)
Body → 16px (body, normal)
Small → 14px (body, normal)
Caption → 12px (body, medium)
```

### Contraste des Couleurs
- **Texte principal** : neutral.900 sur fond clair
- **Texte secondaire** : neutral.700 avec opacité 0.8
- **Backgrounds clairs** : neutral.50, neutral.100
- **Highlights** : primary.50, secondary.50, accent.50

### Espacements Cohérents
- **Gap entre sections** : space.16 ou space.20
- **Padding de cartes** : space.6 ou space.8
- **Gap dans grilles** : space.4 ou space.6
- **Margin de titres** : space.4

### Border Radius
- **Petits éléments** (badges, tags) : radius.lg (10px)
- **Cartes standards** : radius.xl (16px)
- **Grandes cartes** : radius.2xl (24px)
- **Boutons** : radius.xl (16px)

---

## 🔄 Synchronisation Design ↔ Code

### Avantages
✅ **Cohérence totale** entre Figma et le code HTML/CSS
✅ **Modifications centralisées** : changez un token, tout est mis à jour
✅ **Communication facilitée** : designers et développeurs parlent le même langage
✅ **Maintenance simplifiée** : un seul fichier de tokens à maintenir

### Workflow Recommandé
1. **Design dans Figma** avec les tokens
2. **Export des tokens** en JSON
3. **Import dans le code** (variables CSS)
4. **Développement** avec les mêmes valeurs
5. **Feedback** et ajustements
6. **Repeat** 🔁

---

## 🎨 Créer des Composants Figma

### Bouton (Button)
```
Frame
├─ Auto Layout (horizontal, gap: 8px)
├─ Padding: 20px 40px
├─ Border Radius: radius.xl (16px)
├─ Fill: gradient (secondary.400 → accent.400)
├─ Text
│  ├─ Font: body
│  ├─ Size: lg (18px)
│  ├─ Weight: semibold (600)
│  └─ Color: white
└─ Icon (lucide)
```

### Card (Carte)
```
Frame
├─ Auto Layout (vertical, gap: 16px)
├─ Padding: 32px
├─ Border Radius: radius.2xl (24px)
├─ Fill: white
├─ Border: 1px, neutral.200
├─ Shadow: lg
└─ Content
   ├─ Badge
   ├─ Title (display, 2xl, bold)
   └─ Description (body, base, normal)
```

### Badge
```
Frame
├─ Auto Layout (horizontal, gap: 8px)
├─ Padding: 8px 16px
├─ Border Radius: radius.xl (16px)
├─ Fill: secondary.50
├─ Icon
└─ Text
   ├─ Font: body
   ├─ Size: xs (12px)
   ├─ Weight: semibold (600)
   ├─ Color: secondary.700
   └─ Letter Spacing: 0.05em
```

---

## 🔧 Personnalisation Avancée

### Modifier un Token
1. Ouvrez Tokens Studio
2. Trouvez le token à modifier (ex: `primary.500`)
3. Changez la valeur
4. Exportez les tokens modifiés
5. Réimportez dans le code CSS

### Ajouter un Nouveau Token
1. Dans Tokens Studio, cliquez sur **Add token**
2. Définissez :
   - Nom (ex: `primary.450`)
   - Type (color, size, spacing, etc.)
   - Valeur
3. Enregistrez
4. Exportez et synchronisez avec le code

---

## 📱 Tokens pour Responsive

### Breakpoints
```
mobile  : < 640px
sm      : 640px
md      : 768px
lg      : 1024px
xl      : 1280px
```

### Espacements Adaptatifs
- **Mobile** : spacing réduits (space.4, space.6)
- **Tablet** : spacing médiums (space.6, space.8)
- **Desktop** : spacing larges (space.8, space.12)

---

## 📞 Support

### Questions sur Tokens Studio
- Documentation : https://tokens.studio/
- Tutoriels : https://docs.tokens.studio/

### Questions sur le Design System TLS
- Email : contact@thelearningsociety.fr
- Site : https://thelearningsociety.fr

---

## ✅ Checklist de Vérification

Avant de livrer votre design :

### Couleurs
- [ ] Utilise uniquement les couleurs du design system
- [ ] Contraste suffisant (WCAG AA minimum)
- [ ] Code couleur respecté par pôle

### Typographie
- [ ] Polices correctes (League Spartan + Nunito)
- [ ] Tailles cohérentes (scale définie)
- [ ] Hiérarchie claire (H1 > H2 > H3 > Body)

### Espacements
- [ ] Scale 4pt respectée
- [ ] Espacements cohérents entre sections
- [ ] Padding/margins appropriés

### Composants
- [ ] Border radius cohérents
- [ ] Ombres appropriées au contexte
- [ ] États (hover, active, disabled) définis

### Responsive
- [ ] Design mobile vérifié
- [ ] Design tablet vérifié
- [ ] Design desktop vérifié
- [ ] Breakpoints cohérents

---

**Bonne conception ! 🎨**

---

**Version** : 1.0.0  
**Date** : Décembre 2024  
**Design System** : TLS v1.0
