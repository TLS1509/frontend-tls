# ✅ WordPress Implementation Checklist

## Phase 1: Setup Initial (30 min)

### 1.1 CSS Variables
- [ ] Créer `/assets/css/tls-design-system.css`
- [ ] Copier toutes les variables depuis `/styles/globals.css`
- [ ] Enqueue le fichier dans `functions.php`
- [ ] Tester dans navigateur que les variables sont accessibles

**Test**: Ouvrir DevTools → Console → `getComputedStyle(document.documentElement).getPropertyValue('--primary')` doit retourner `#55A1B4`

### 1.2 Fonts Google
- [ ] Ajouter League Spartan dans `<head>` ou `functions.php`
- [ ] Ajouter Nunito dans `<head>` ou `functions.php`
- [ ] Vérifier fallback fonts (system fonts)

```php
function tls_load_fonts() {
  wp_enqueue_style('google-fonts', 
    'https://fonts.googleapis.com/css2?family=League+Spartan:wght@200;300;400;500;600;700;800;900&family=Nunito:wght@200;300;400;500;600;700;800;900&display=swap'
  );
}
add_action('wp_enqueue_scripts', 'tls_load_fonts');
```

---

## Phase 2: Page Structure (1h)

### 2.1 Container Principal
- [ ] Créer template `page-dashboard.php`
- [ ] Container max-width: 1000px
- [ ] Padding horizontal: 24px (var(--space-6))
- [ ] Background: `linear-gradient(to bottom right, var(--primary-50), white, var(--accent-50))`
- [ ] Min-height: 100vh

### 2.2 Sections
- [ ] Hero Section
- [ ] Quick Actions Grid (4 colonnes)
- [ ] Continue Learning Card
- [ ] Journal Prompts Grid (3 colonnes)
- [ ] Activity Feed (stack)

### 2.3 Spacing Vertical
- [ ] Hero → Quick Actions: 0px
- [ ] Quick Actions → Continue: 32px (var(--space-8))
- [ ] Continue → Journal: 32px
- [ ] Journal → Activity: 32px

---

## Phase 3: Components (3-4h)

### 3.1 Hero Section
- [ ] Container: max-width 1000px, padding 32px 24px
- [ ] Glass card style appliqué
- [ ] Title avec gradient text (var(--gradient-tls-text-cool))
- [ ] Stats pills avec émojis
- [ ] Pills hover: scale(1.05)

**Variables utilisées**:
```css
--space-8: 2rem (32px)
--space-6: 1.5rem (24px)
--radius-2xl: 1.5rem (24px)
--gradient-tls-text-cool
```

### 3.2 Action Card Component
- [ ] Créer ACF Block ou Gutenberg Block
- [ ] Background glassmorphism
- [ ] Icon circle: 72×72px, background rgba(iconColor, 0.12)
- [ ] Icon size: 40×40px, stroke-width: 2
- [ ] Min-height: 160px
- [ ] Gap interne: 12px (var(--space-3))
- [ ] Hover: scale(1.05), transition 300ms
- [ ] Box-shadow colored glow on hover

**Template part**: `template-parts/blocks/action-card.php`

**CSS Classes**:
```css
.action-card { }
.action-card-icon-circle { }
.action-card-icon { }
.action-card-title { }
.action-card-description { }
```

### 3.3 Continue Learning Card
- [ ] Glass card avec padding 32px
- [ ] Background glow orange (pulseGlow animation)
- [ ] Title orange (var(--secondary))
- [ ] Progress bar avec gradient animé
- [ ] Button avec hover scale(1.05)
- [ ] Card hover: translateY(-8px)
- [ ] Breathe animation (4s infinite)

**Animations**:
```css
@keyframes breathe { }
@keyframes pulseGlow { }
@keyframes gradientFlow { }
```

### 3.4 Journal Prompt Card
- [ ] Badge avec border-radius: full
- [ ] Icon: 48×48px, stroke-width: 1.5
- [ ] Question text: text-base, font-medium
- [ ] Gap: 16px (var(--space-4))
- [ ] Hover: translateY(-4px), transition 200ms

### 3.5 Activity Card
- [ ] Layout: flex row, gap 16px
- [ ] Icon: 32×32px, stroke-width: 1.5
- [ ] Badge pill + timestamp horizontal
- [ ] Title: text-lg, font-semibold
- [ ] Hover: translateY(-2px)

---

## Phase 4: Dynamic Data (2h)

### 4.1 User Stats
- [ ] Créer function `get_user_stats($user_id)`
- [ ] Return: streak, badges, completion_rate
- [ ] Display dans Hero stat pills

```php
function get_user_stats($user_id) {
  return [
    'streak' => get_user_meta($user_id, 'learning_streak', true) ?: 0,
    'badges' => count_user_badges($user_id),
    'completion' => get_user_completion_rate($user_id)
  ];
}
```

### 4.2 Current Course
- [ ] Créer function `get_user_current_course($user_id)`
- [ ] Return: title, current_step, progress, next_lesson
- [ ] Display dans Continue Learning Card

### 4.3 Journal Prompts
- [ ] Créer custom post type `journal_prompt`
- [ ] Fields: title, question, icon, color
- [ ] Query 3 prompts aléatoires ou du jour

### 4.4 Activity Feed
- [ ] Créer function `get_user_activities($user_id, $limit)`
- [ ] Return: type, title, description, timestamp, icon
- [ ] Display dans Activity Feed

---

## Phase 5: Responsive (1h)

### 5.1 Quick Actions Grid
- [ ] Desktop (>1024px): 4 colonnes
- [ ] Tablet (768-1024px): 2 colonnes, gap 16px
- [ ] Mobile (<768px): 1 colonne, gap 16px

```css
.quick-actions-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-3);
}

@media (max-width: 1024px) {
  .quick-actions-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-4);
  }
}

@media (max-width: 640px) {
  .quick-actions-grid {
    grid-template-columns: 1fr;
  }
}
```

### 5.2 Journal Prompts Grid
- [ ] Desktop: 3 colonnes
- [ ] Tablet: 2 colonnes
- [ ] Mobile: 1 colonne

### 5.3 Typography
- [ ] Hero title: 48px → 36px → 30px
- [ ] Card title: 24px → 24px → 20px
- [ ] Padding: 32px → 24px → 20px

---

## Phase 6: Animations (1h)

### 6.1 Keyframes
- [ ] @keyframes breathe (Continue Learning)
- [ ] @keyframes pulseGlow (Background glow)
- [ ] @keyframes gradientFlow (Progress bar)

### 6.2 Hover Transitions
- [ ] Action card: scale(1.05), 300ms
- [ ] Stat pill: scale(1.05), 200ms
- [ ] Journal prompt: translateY(-4px), 200ms
- [ ] Activity card: translateY(-2px), 200ms
- [ ] Button: scale(1.05), 300ms

### 6.3 Ease Functions
- [ ] ease-out: cubic-bezier(0, 0, 0.2, 1)

---

## Phase 7: Polish & Accessibility (1h)

### 7.1 Focus States
- [ ] Tous les éléments cliquables ont outline au focus
- [ ] Focus-visible uniquement (pas au clic souris)

```css
.card:focus-visible,
.button:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

.card:focus:not(:focus-visible) {
  outline: none;
}
```

### 7.2 Semantic HTML
- [ ] `<main>` pour contenu principal
- [ ] `<section>` pour chaque section avec aria-labelledby
- [ ] `<h1>` pour hero title
- [ ] `<h2>` pour section headings (sr-only si nécessaire)
- [ ] `<button>` avec aria-label

### 7.3 Contrast Ratios
- [ ] Foreground (#252B37) on white: ✅ 13.5:1 AAA
- [ ] Muted foreground (#6b7280) on white: ✅ 5.2:1 AA
- [ ] Primary/Secondary sur fond blanc: ⚠️ Large text only

---

## Phase 8: Testing (1h)

### 8.1 Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### 8.2 Device Testing
- [ ] Desktop 1920×1080
- [ ] Laptop 1366×768
- [ ] Tablet 768×1024
- [ ] Mobile 375×667

### 8.3 Functionality
- [ ] Toutes les actions cliquables fonctionnent
- [ ] Hover states s'affichent correctement
- [ ] Animations sont fluides (pas de lag)
- [ ] Progress bar anime
- [ ] Breathe animation sur Continue Learning

### 8.4 Performance
- [ ] Lighthouse Score > 90
- [ ] Images optimisées
- [ ] CSS minifié
- [ ] Fonts preloaded

---

## Phase 9: Final Checks

### 9.1 Variables CSS
- [ ] Aucune couleur hard-coded (sauf dans variables)
- [ ] Tous les spacing utilisent var(--space-*)
- [ ] Tous les radius utilisent var(--radius-*)
- [ ] Toutes les fonts utilisent var(--font-display) ou var(--font-body)

### 9.2 Glassmorphism
- [ ] backdrop-filter: blur(20px) appliqué
- [ ] -webkit-backdrop-filter pour Safari
- [ ] Background: rgba(255, 255, 255, 0.6) → 0.4
- [ ] Border: rgba(255, 255, 255, 0.8)
- [ ] Box-shadow avec inset white

### 9.3 Gradients Rule
- [ ] ❌ Pas de gradient multicolore sur composants UI
- [ ] ✅ Gradient sur textes uniquement (hero title)
- [ ] ✅ Gradient sur progress bar (exception)
- [ ] ✅ Gradient léger bleu-bleu sur cards

---

## Estimation Totale: 10-12 heures

| Phase | Durée |
|-------|-------|
| 1. Setup Initial | 30 min |
| 2. Page Structure | 1h |
| 3. Components | 3-4h |
| 4. Dynamic Data | 2h |
| 5. Responsive | 1h |
| 6. Animations | 1h |
| 7. Polish & A11Y | 1h |
| 8. Testing | 1h |
| 9. Final Checks | 30 min |

---

## Quick Reference Links

- **Full Specs**: `/pages/DashboardDevSpecsPage.tsx`
- **Visual Reference**: `/docs/COMPONENT-STATES-VISUAL.md`
- **Handoff Guide**: `/docs/DEV-SPECS-HANDOFF.md`
- **CSS Variables**: `/styles/globals.css`

---

## Emergency Contacts

Si blocage sur un élément spécifique :
1. Ouvrir DevTools sur l'app React
2. Inspecter l'élément problématique
3. Copier les styles computed
4. Appliquer dans WordPress

**Astuce Pro**: Utiliser les DevTools pour exporter les styles CSS d'un composant entier en one-click.
