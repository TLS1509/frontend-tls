# 📐 Dashboard Dev Specs - Guide Handoff WordPress

## 🎯 Objectif

Cette page de spécifications (`DashboardDevSpecsPage`) a été créée pour faciliter l'implémentation **pixel-perfect** du dashboard "The Learning Society" dans WordPress.

## 🚀 Accès Rapide

### Dans l'application React
1. Accédez au Dashboard
2. Cliquez sur le bouton flottant bleu (icône règle) en bas à droite
3. Vous accédez aux specs complètes avec exemples visuels

### URL directe
- En dev : `http://localhost:5173/?page=dev-specs`

## 📋 Contenu de la Page

La page contient **15 sections complètes** :

### 0. Component States Showcase 👁️
**Exemples visuels interactifs** de tous les composants avec leurs états (default/hover/focus).
- Action Cards (Quick Actions)
- Journal Prompt Cards
- Activity Cards
- Stat Pills

**Survolez les composants pour voir les transitions en temps réel.**

### 1. Container & Layout Structure 📦
- Container principal : `max-width: 1000px`
- Grid layouts (4 colonnes, 3 colonnes, etc.)
- Padding et spacing entre sections

### 2. Color System 🎨
- Couleurs primaires TLS avec hex codes
- Variables CSS à utiliser
- Swatches visuels pour chaque couleur

### 3. Typography System 🔤
- Font families (League Spartan, Nunito)
- Font sizes (de 12px à 60px)
- Font weights (300 à 900)
- Exemples visuels de chaque taille

### 4. Glassmorphism Cards 🪟
- Style glass par défaut
- États hover avec backdrop-filter
- Variantes (hero, standard, compact)

### 5. Component Specifications 🧩
Code CSS complet pour :
- Hero Section
- Action Cards (Quick Actions)
- Continue Learning Card
- Journal Prompt Cards
- Activity Feed Cards

### 6. Spacing System 📏
- Échelle d'espacement (base 8px)
- Card padding system
- Gap patterns

### 7. Borders & Radius ⭕
- Border radius (6px → 32px)
- Border colors et opacity
- Usage par composant

### 8. Responsive Breakpoints 📱
- Breakpoints desktop-first
- Grid responsive (4 → 2 → 1 colonnes)
- Typography responsive
- Spacing responsive

### 9. Animations & Transitions ✨
- Timing variables (150ms → 500ms)
- Keyframe animations (breathe, pulseGlow, gradientFlow)
- Hover transitions

### 10. Icon System 🎭
- Tailles d'icônes (16px → 56px)
- Stroke width (1 → 2.5)
- Library Lucide React
- Mapping icônes par composant

### 11. Shadow System 🌫️
- Shadow scale (xs → 2xl)
- Glass card shadows
- Colored glows (hover states)

### 12. Z-Index Scale 📚
- Scale de z-index (0 → 1070)
- Usage par composant

### 13. Accessibility (A11Y) ♿
- Focus states
- Contrast ratios WCAG AA/AAA
- Semantic HTML
- Screen reader classes

### 14. Dev Specs - Pixel Perfect 📐
**Tables avec valeurs exactes** :
- Container widths
- Grid systems (colonnes + gaps)
- Component sizes (en pixels)
- Border colors & opacity
- Vertical margins entre sections

### 15. WordPress Integration Tips 🔌
- Charger les CSS variables
- Créer des Gutenberg blocks
- Templates PHP avec dynamic data
- Exemples de code WordPress

## 💻 Implémentation WordPress

### Étape 1 : Setup CSS Variables

Créer un fichier `tls-design-system.css` :

```css
:root {
  /* Copier toutes les variables depuis /styles/globals.css */
  --primary: #55A1B4;
  --secondary: #ED843A;
  --accent: #F8B044;
  /* ... etc */
}
```

Charger dans `functions.php` :

```php
function tls_enqueue_design_system() {
  wp_enqueue_style('tls-design-system', 
    get_template_directory_uri() . '/assets/css/tls-design-system.css'
  );
}
add_action('wp_enqueue_scripts', 'tls_enqueue_design_system');
```

### Étape 2 : Créer les Composants

Pour chaque composant documenté (Action Card, Journal Prompt, Activity Card), créer :
1. Un **Gutenberg Block** custom
2. Ou un **ACF Block**
3. Ou un **template part** PHP

Exemple ACF Block :

```php
acf_register_block_type([
  'name' => 'action-card',
  'title' => __('TLS Action Card'),
  'render_template' => 'template-parts/blocks/action-card.php',
  'category' => 'tls-blocks',
  'icon' => 'grid-view'
]);
```

### Étape 3 : Template PHP

Créer `template-parts/blocks/action-card.php` :

```php
<?php
$icon_color = get_field('icon_color') ?: 'var(--primary)';
$title = get_field('title');
$description = get_field('description');
?>

<div class="action-card" style="--icon-color: <?php echo $icon_color; ?>">
  <div class="action-card-icon-circle">
    <!-- Icon SVG ou font icon -->
  </div>
  <div class="action-card-title"><?php echo esc_html($title); ?></div>
  <div class="action-card-description"><?php echo esc_html($description); ?></div>
</div>
```

### Étape 4 : Dynamic Data

Utiliser WordPress functions pour les données :

```php
// User stats
$user_stats = [
  'streak' => get_user_meta($user_id, 'learning_streak', true),
  'badges' => count_user_badges($user_id),
  'completion' => get_user_completion_rate($user_id)
];

// Current course
$current_course = get_user_current_course($user_id);
```

## 🎨 Règles de Design Strictes

### ⚠️ GRADIENTS - RÈGLE IMPORTANTE

**Les gradients multicouleurs sont INTERDITS pour les composants UI !**

✅ **Autorisé** :
- Gradients pour **textes** (headings, hero titles)
- Gradients pour **backgrounds de pages** ou sections hero
- Gradients **légers dérivés d'une même couleur** pour composants
- Gradients **orange+jaune uniquement** pour composants
- Gradients pour **progress bars/sliders**

❌ **Interdit** :
- Gradients bleu→orange→jaune sur un bouton
- Gradients multicolores sur une card
- Gradients bleu→jaune sur des composants standards

### Exemple Correct

```css
/* ✅ Texte - OK */
.hero-title {
  background: var(--gradient-tls-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* ✅ Progress bar - OK */
.progress-bar {
  background: linear-gradient(90deg, var(--primary), var(--secondary), var(--accent));
}

/* ✅ Gradient léger dérivé bleu - OK */
.card-blue {
  background: linear-gradient(135deg, #E8F4F7 0%, #B9D7DF 100%);
}

/* ❌ Card avec gradient multicolore - INTERDIT */
.card-wrong {
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 50%, var(--accent) 100%);
}
```

## 📱 Responsive Desktop-First

L'application est **desktop-first** avec ces breakpoints :

```css
/* Desktop: default (1000px+) */

/* Tablet */
@media (max-width: 1024px) {
  .quick-actions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Mobile */
@media (max-width: 640px) {
  .quick-actions-grid {
    grid-template-columns: 1fr;
  }
}
```

## 🔍 Vérification Pixel-Perfect

Avant le handoff, vérifier :

✅ Tous les spacings utilisent `var(--space-*)` variables  
✅ Toutes les couleurs utilisent `var(--primary)`, `var(--secondary)`, etc.  
✅ Tous les radius utilisent `var(--radius-*)` variables  
✅ Toutes les fonts utilisent `var(--font-display)` ou `var(--font-body)`  
✅ Les hover states sont identiques aux specs  
✅ Les animations sont fluides (200ms → 300ms)  
✅ Les box-shadows sont exactes  
✅ Les gaps entre éléments sont corrects (12px, 16px, etc.)  
✅ Les borders ont la bonne opacity  

## 📞 Support

Pour toute question sur l'implémentation :
1. Référez-vous à `/styles/globals.css` pour les variables exactes
2. Consultez la section "Component States Showcase" pour voir les interactions
3. Copiez-collez le code CSS depuis les sections de specs

## 🎯 Checklist Handoff Final

- [ ] Variables CSS importées dans WordPress
- [ ] Fonts Google chargées (League Spartan + Nunito)
- [ ] Composants créés (Action Card, Journal Prompt, Activity Card)
- [ ] Glassmorphism style appliqué correctement
- [ ] Hover states fonctionnent
- [ ] Responsive testé (desktop, tablet, mobile)
- [ ] Animations smooth
- [ ] Icons Lucide ou équivalent intégrés
- [ ] Dynamic data connectée (user stats, courses)
- [ ] Accessibilité vérifiée (focus states, contrast)

---

**Version**: 1.0  
**Date**: 2026  
**Projet**: The Learning Society
