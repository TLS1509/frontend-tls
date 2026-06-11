# 📦 Package de Téléchargement - The Learning Society

## 🎉 Bienvenue !

Ce package contient tous les fichiers nécessaires pour utiliser et personnaliser le site web de The Learning Society.

---

## 📂 Contenu du Package

### 📄 Documentation
- **`README-HTML.md`** - Guide complet d'utilisation des fichiers HTML
- **`guide-telechargement.md`** - Instructions de téléchargement et déploiement
- **`INDEX.md`** - Ce fichier (sommaire du package)

### 🎨 Design System
- **`figma-design-tokens.json`** - Tokens de design pour Figma
  - Couleurs (primary, secondary, accent, neutral)
  - Typographie (League Spartan + Nunito)
  - Espacements, radius, shadows
  - Compatible avec le plugin "Tokens Studio for Figma"

### 🌐 Fichier HTML de Démonstration
- **`agence-demo.html`** - Page Agence complète et standalone
  - ✅ Tous les styles CSS intégrés
  - ✅ Polices Google Fonts (League Spartan + Nunito)
  - ✅ Icônes Lucide via CDN
  - ✅ 100% responsive (mobile, tablet, desktop)
  - ✅ Animations et transitions fluides
  - ✅ Prêt à l'emploi (juste ouvrir dans un navigateur)

---

## 🚀 Démarrage Rapide

### Option 1 : Tester immédiatement
```bash
# Double-cliquez sur agence-demo.html
# ou ouvrez-le dans votre navigateur préféré
```

### Option 2 : Serveur local (recommandé)
```bash
# Python 3
python3 -m http.server 8000

# Puis ouvrez : http://localhost:8000/agence-demo.html
```

---

## 🎨 Design System TLS

### Palette de Couleurs

#### Primary Blue (Académie/Formation)
- **50** : `#E8F4F7` - Très clair
- **500** : `#55A1B4` - Base ⭐
- **700** : `#3D7786` - Foncé

#### Secondary Orange (Agence/Conception)
- **50** : `#FFF3EB` - Très clair
- **500** : `#ED843A` - Base ⭐
- **700** : `#8F5017` - Foncé

#### Accent Yellow (Conseil/Stratégie)
- **50** : `#FFF9EE` - Très clair
- **400** : `#F8B044` - Base ⭐
- **600** : `#D69020` - Foncé

#### Neutral (Texte & Backgrounds)
- **50** : `#F5F8F8` - Background clair
- **900** : `#252B37` - Texte principal

### Typographie

#### League Spartan (Display)
- **Usage** : Titres, headings, CTA
- **Poids** : 300, 400, 500, 600, 700, 800, 900
- **Style** : Moderne, géométrique, impactant

#### Nunito (Body)
- **Usage** : Corps de texte, paragraphes, UI
- **Poids** : 300, 400, 500, 600, 700, 800, 900
- **Style** : Lisible, chaleureux, accessible

### Échelle de Tailles
- **xs** : 12px
- **sm** : 14px
- **base** : 16px ⭐
- **lg** : 18px
- **xl** : 20px
- **2xl** : 24px
- **3xl** : 30px
- **4xl** : 36px
- **5xl** : 48px
- **6xl** : 60px

### Espacements (Scale 4pt)
- **1** : 4px
- **2** : 8px
- **3** : 12px
- **4** : 16px ⭐
- **6** : 24px
- **8** : 32px
- **12** : 48px
- **16** : 64px

### Border Radius
- **sm** : 6px
- **md** : 8px
- **lg** : 10px ⭐
- **xl** : 16px
- **2xl** : 24px
- **full** : 9999px (circle)

---

## 📱 Responsive Breakpoints

```css
/* Mobile First */
Base : < 640px

/* Small (sm) */
640px : Petits tablets

/* Medium (md) */
768px : Tablets

/* Large (lg) */
1024px : Desktop

/* Extra Large (xl) */
1280px : Large desktop
```

---

## 🎯 Comment Utiliser ce Package

### 1. Pour Développeurs Web
- Utilisez `agence-demo.html` comme template
- Copiez le CSS dans votre projet
- Adaptez les composants à vos besoins
- Les classes CSS sont réutilisables

### 2. Pour Designers Figma
- Importez `figma-design-tokens.json` dans Figma
- Installez le plugin "Tokens Studio for Figma"
- Tous les tokens sont synchronisés avec le code
- Maintenez la cohérence design ↔ code

### 3. Pour Clients/Marketing
- Ouvrez `agence-demo.html` dans un navigateur
- Testez sur mobile/tablet/desktop
- Partagez le fichier par email (standalone)
- Pas besoin de serveur pour prévisualiser

---

## 🔧 Personnalisation

### Changer les Couleurs
Recherchez et remplacez dans le `<style>` :
```css
--primary-500: #55A1B4;     /* Votre couleur */
--secondary-500: #ED843A;   /* Votre couleur */
--accent-400: #F8B044;      /* Votre couleur */
```

### Changer les Polices
Remplacez dans le `<head>` :
```html
<link href="https://fonts.googleapis.com/css2?family=VotrePolice&display=swap" rel="stylesheet">
```

Puis dans le CSS :
```css
--font-display: "VotrePolice", sans-serif;
--font-body: "VotrePolice", sans-serif;
```

### Modifier le Contenu
Les textes sont en HTML simple :
```html
<h1>Votre titre</h1>
<p>Votre paragraphe</p>
```

---

## 📊 Structure du Fichier HTML

```
agence-demo.html
├── <head>
│   ├── Meta tags (SEO, viewport)
│   ├── Google Fonts (League Spartan + Nunito)
│   ├── Lucide Icons CDN
│   └── <style> (Design System complet)
│
└── <body>
    ├── Hero Section
    │   ├── Badge + Titre + Description
    │   ├── CTA Button
    │   └── Philosophy Banner (glassmorphism)
    │
    ├── Services Section
    │   └── Grid 4 services (2 large + 2 standard)
    │
    ├── Timeline Section
    │   └── 3 étapes (Cadrage, Prototype, Scale)
    │
    ├── CTA Section
    │   ├── Titre + Description
    │   ├── Dual CTA (Rendez-vous + Devis)
    │   └── Trust indicators
    │
    └── <script> (Init Lucide Icons)
```

---

## ✅ Checklist d'Utilisation

### Avant de Modifier
- [ ] Lire `README-HTML.md`
- [ ] Ouvrir `agence-demo.html` dans un navigateur
- [ ] Tester sur mobile (mode responsive du navigateur)
- [ ] Identifier les sections à modifier

### Pendant la Modification
- [ ] Sauvegarder une copie de backup
- [ ] Modifier progressivement (section par section)
- [ ] Tester après chaque changement
- [ ] Vérifier la responsive

### Après la Modification
- [ ] Tester sur Chrome, Firefox, Safari
- [ ] Tester sur mobile réel
- [ ] Valider le HTML (https://validator.w3.org/)
- [ ] Optimiser les images si ajoutées

---

## 🌟 Pages à Créer (Même Structure)

Utilisez `agence-demo.html` comme template pour créer :

1. **home.html** - Page d'accueil (hero + 4 pôles)
2. **academie.html** - Pôle Académie (formations IA)
3. **conseil.html** - Pôle Conseil (stratégie)
4. **tech.html** - Pôle Tech (solutions techniques)
5. **mag.html** - Magazine (articles & veille)

**Méthode** : Dupliquer `agence-demo.html` et modifier le contenu.

---

## 📞 Support & Contact

### Questions Techniques
- 📧 Email : contact@thelearningsociety.fr
- 🌐 Site : https://thelearningsociety.fr

### Ressources Utiles
- **Google Fonts** : https://fonts.google.com/
- **Lucide Icons** : https://lucide.dev/icons
- **CSS Variables** : https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
- **Figma Tokens** : https://tokens.studio/

---

## 📜 Licence

© 2024 The Learning Society. Tous droits réservés.

**Utilisation Autorisée** :
- ✅ Usage personnel et professionnel
- ✅ Modification et personnalisation
- ✅ Intégration dans vos projets

**Utilisation Interdite** :
- ❌ Revente du design ou du code
- ❌ Redistribution sans autorisation
- ❌ Utilisation concurrente

---

## 🎁 Bonus Inclus

### Composants Réutilisables

#### Badge
```html
<span class="badge">
  <i data-lucide="icon-name"></i>
  VOTRE TEXTE
</span>
```

#### Button
```html
<a href="#" class="btn">
  Votre texte
  <i data-lucide="arrow-right" class="btn-icon"></i>
</a>
```

#### Card
```html
<div class="service-card">
  <div class="service-badge">...</div>
  <h3 class="service-title">Titre</h3>
  <p class="service-description">Description</p>
</div>
```

#### Icon Box
```html
<div class="icon-box">
  <i data-lucide="icon-name"></i>
</div>
```

---

## 🚀 Prochaines Étapes

1. **Testez** `agence-demo.html`
2. **Lisez** `README-HTML.md` pour les détails
3. **Importez** `figma-design-tokens.json` dans Figma
4. **Créez** les autres pages en dupliquant le template
5. **Personnalisez** selon vos besoins
6. **Déployez** sur votre serveur web

---

**Bonne utilisation ! 🎉**

Si vous avez des questions, n'hésitez pas à nous contacter.

---

**Package Version** : 1.0.0  
**Date** : Décembre 2024  
**Design System** : TLS v1.0  
**Auteur** : The Learning Society
