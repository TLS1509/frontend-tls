# 📄 PAGES HTML AUTONOMES - THE LEARNING SOCIETY

## 🎯 Description

Ce dossier contient des fichiers HTML autonomes (standalone) pour chaque page principale du site TLS. Chaque fichier est **100% indépendant** et peut être ouvert directement dans un navigateur sans serveur.

## 📦 Contenu du dossier

### Pages disponibles

1. **`academie.html`** - Page Académie (Formation - Bleu #55A1B4)
2. **`agence.html`** - Page Agence (Conception - Orange #ED843A)
3. **`conseil.html`** - Page Conseil (Stratégie - Jaune #F8B044)

### Chaque fichier contient :

✅ **Tout le CSS inline** dans une balise `<style>`  
✅ **Variables CSS** du design system TLS  
✅ **Animations JavaScript** (scroll, hover, float)  
✅ **Google Fonts** (League Spartan + Nunito)  
✅ **SVG icons** inline (Lucide)  
✅ **100% responsive** (mobile-first)  
✅ **Glassmorphism effects** avec backdrop-filter  
✅ **Aucune dépendance externe** (sauf fonts Google)

---

## 🚀 Utilisation

### Option 1 : Ouvrir directement

1. Double-cliquez sur le fichier HTML
2. Il s'ouvre dans votre navigateur par défaut
3. Aucune installation requise !

### Option 2 : Serveur local (optionnel)

```bash
# Python 3
python -m http.server 8000

# ou Node.js
npx http-server

# Puis ouvrir http://localhost:8000/standalone-pages/
```

---

## 🎨 Structure de chaque page

### HERO SECTION
- Background avec gradient overlay subtil
- Blob animé (animation float)
- Badge section avec icône
- Titre avec gradient sur un mot
- Description
- Quick features (3 pills avec icônes)
- 2 boutons CTA

### BENEFITS SECTION
- Titre de section
- Grille de 6 cards glassmorphism
- Chaque card contient :
  * Accent line (top)
  * Icône + Statistique
  * Titre
  * Description
- Animation au scroll (fade-in staggered)
- Hover effects (lift + shadow)

---

## 🎯 Variantes par pôle

### Académie (Bleu - Formation)
```
Couleur principale : #55A1B4 (var(--primary))
Blob : #96C3CF (var(--primary-300))
Overlay : rgba(85, 161, 180, 0.03)
Badge text : var(--primary-700)
Icon color : var(--primary-600)
```

### Agence (Orange - Conception)
```
Couleur principale : #ED843A (var(--secondary))
Blob : #F59A5F (var(--secondary-300))
Overlay : rgba(237, 132, 58, 0.03)
Badge text : var(--secondary-700)
Icon color : var(--secondary-600)
```

### Conseil (Jaune - Stratégie)
```
Couleur principale : #F8B044 (var(--accent))
Blob : #FFC15A (var(--accent-300))
Overlay : rgba(248, 176, 68, 0.03)
Badge text : var(--accent-700)
Icon color : var(--accent-600)
⚠️ IMPORTANT : Texte du bouton FONCÉ (contraste)
```

---

## ⚙️ Personnalisation

### Modifier les couleurs

Changez les variables CSS dans la balise `<style>` :

```css
:root {
    --primary: #55A1B4;     /* Bleu */
    --secondary: #ED843A;   /* Orange */
    --accent: #F8B044;      /* Jaune */
}
```

### Modifier les textes

Cherchez directement dans le HTML et modifiez :
- Titres : `<h1>`, `<h2>`, `<h3>`
- Descriptions : `<p>`
- Boutons : `<button>` ou `<a>`

### Modifier les animations

Toutes les animations sont définies en CSS :

```css
/* Float animation (blob) */
@keyframes float {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(-30px, -30px) scale(1.1); }
}

/* Fade in up (hero) */
@keyframes fadeInUp {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
}
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First (défaut) */
Base : < 768px
- Hero : 1 colonne
- Benefits : 2 colonnes
- Blob : 384px × 384px

/* Tablet */
@media (min-width: 768px)
- Blob : 500px × 500px

/* Desktop */
@media (min-width: 1024px)
- Hero : 2 colonnes (split)
- Benefits : 3 colonnes
```

---

## 🎭 Animations JavaScript

### Scroll Observer (Benefits Cards)

```javascript
// Observer Intersection API
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Cards apparaissent avec delay progressif
document.querySelectorAll('.benefit-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});
```

---

## 🔧 Modifications courantes

### Changer les icônes

Les icônes utilisent des SVG inline Lucide. Remplacez le code SVG par une autre icône de [lucide.dev](https://lucide.dev).

Exemple :
```html
<!-- Remplacer cette icône -->
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="..."/>
</svg>
```

### Ajouter une nouvelle card

Copiez-collez une card existante et modifiez :
```html
<div class="benefit-card">
    <div class="card-accent-line"></div>
    <div class="card-header">
        <div class="card-icon-container">
            <!-- Votre icône SVG -->
        </div>
        <div class="card-stat">
            <div class="card-stat-number">Votre stat</div>
            <div class="card-stat-label">VOTRE LABEL</div>
        </div>
    </div>
    <h3 class="card-title">Votre titre</h3>
    <p class="card-description">Votre description</p>
</div>
```

### Changer les images placeholder

Remplacez les divs de placeholder par des vraies images :

```html
<!-- Avant (placeholder) -->
<div style="aspect-ratio: 4/3; border-radius: var(--radius-2xl); background: ..."></div>

<!-- Après (vraie image) -->
<img src="votre-image.jpg" alt="Description" style="aspect-ratio: 4/3; border-radius: var(--radius-2xl); width: 100%; object-fit: cover;">
```

---

## ✅ Checklist de qualité

Chaque page HTML inclut :

### Design System
- [x] Variables CSS utilisées partout
- [x] League Spartan pour titres
- [x] Nunito pour body text
- [x] Espacements cohérents (var(--space-*))
- [x] Border-radius cohérents (var(--radius-*))

### Couleurs
- [x] Palette officielle TLS respectée
- [x] Gradients corrects par pôle
- [x] Opacités rgba() pour transparence
- [x] Contraste WCAG AA respecté

### Animations
- [x] Float animation (blob 20s)
- [x] Fade in up (hero)
- [x] Scroll observer (cards)
- [x] Hover effects (lift + shadow)
- [x] Transitions fluides (cubic-bezier)

### Responsive
- [x] Mobile-first approach
- [x] Grid responsive (2 cols → 3 cols)
- [x] Hero split (1 col → 2 cols)
- [x] Blob size adapté

### Performance
- [x] CSS inline (1 requête HTTP en moins)
- [x] SVG inline (pas d'images à charger)
- [x] Fonts Google CDN (optimisé)
- [x] Animations GPU-accelerated

---

## 🎯 Cas d'usage

### 1. Prototypage rapide
Ouvrez le fichier HTML pour montrer rapidement un concept à un client.

### 2. Tests A/B
Créez plusieurs versions en dupliquant et modifiant les fichiers.

### 3. Emails HTML
Utilisez les sections comme base pour des emails marketing (attention : retirer backdrop-filter non supporté).

### 4. Landing pages
Ajoutez un formulaire dans la hero section pour créer une landing page.

### 5. Documentation
Utilisez comme référence visuelle pour documenter le design system.

---

## 🔗 Ressources

### Design System complet
- `/docs/TLS_DESIGN_SYSTEM_COMPONENTS.md`
- `/docs/TLS_COLOR_SYSTEM_OFFICIAL.md`
- `/docs/TLS_COMPONENTS_CODE_EXAMPLES.md`

### Icônes
- [Lucide Icons](https://lucide.dev)
- [Heroicons](https://heroicons.com)

### Fonts
- [Google Fonts - League Spartan](https://fonts.google.com/specimen/League+Spartan)
- [Google Fonts - Nunito](https://fonts.google.com/specimen/Nunito)

### Outils
- [Can I Use - Backdrop Filter](https://caniuse.com/css-backdrop-filter)
- [MDN - Intersection Observer](https://developer.mozilla.org/fr/docs/Web/API/Intersection_Observer_API)

---

## 📞 Support

Pour toute question sur l'utilisation de ces pages :
1. Consultez la documentation dans `/docs/`
2. Vérifiez les variables CSS dans `/styles/globals.css`
3. Référez-vous aux exemples React dans `/docs/TLS_COMPONENTS_CODE_EXAMPLES.md`

---

**Créé pour The Learning Society**  
*Pages HTML Autonomes - Prêtes à l'emploi*  
*Version 1.0 - Janvier 2026*

✨ **Bon développement !**
