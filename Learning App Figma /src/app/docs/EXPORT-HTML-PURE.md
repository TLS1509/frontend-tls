# 📤 Export HTML/CSS/JS Pur - Sans React

## 🎯 Objectif

Ce guide explique comment exporter les composants du dashboard en **fichiers HTML/CSS/JS purs** (sans React, sans dépendances) pour les importer directement sur votre site WordPress avec Cursor.

---

## 📦 Méthode 1: Demander à Cursor AI de Convertir

### Étape 1: Ouvrir le projet dans Cursor

Suivez le guide `/CURSOR-IMPORT-GUIDE.md` pour importer le projet React.

### Étape 2: Demander la conversion à Cursor AI

**Prompt pour Cursor AI:**

```
Convertis le composant ActionCard de /components/patterns/CardPatterns.tsx 
en fichier HTML/CSS/JS pur (sans React).

Crée 3 fichiers dans /html-exports/:
- action-card.html (structure HTML)
- action-card.css (styles CSS avec variables)
- action-card.js (interactions vanilla JS)

Respecte exactement les mêmes styles, dimensions et animations.
Utilise les variables CSS de /styles/globals.css.
```

### Exemple de résultat:

**`action-card.html`:**
```html
<div class="action-card" data-icon-color="85, 161, 180">
  <div class="action-card-icon-circle">
    <svg class="action-card-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <!-- Icône SVG -->
    </svg>
  </div>
  <h3 class="action-card-title">Coaching 1-to-1</h3>
  <p class="action-card-description">Réserver une session</p>
</div>
```

**`action-card.css`:**
```css
.action-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-2xl);
  padding: var(--space-5);
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  align-items: center;
  text-align: center;
  min-height: 160px;
  cursor: pointer;
  transition: all 300ms cubic-bezier(0, 0, 0.2, 1);
}

.action-card:hover {
  transform: scale(1.05);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%);
  box-shadow: 0 8px 24px 0 rgba(var(--icon-color-rgb), 0.12);
}

/* Reste du CSS... */
```

**`action-card.js`:**
```javascript
// Interactions vanilla JS
document.querySelectorAll('.action-card').forEach(card => {
  card.addEventListener('click', function() {
    const action = this.dataset.action;
    console.log('Action clicked:', action);
    // Votre logique ici
  });
});
```

---

## 📦 Méthode 2: Export Manuel Composant par Composant

### Liste des composants à exporter:

1. **Action Card** (Quick Actions)
2. **Journal Prompt Card**
3. **Activity Card**
4. **Stat Pill**
5. **Continue Learning Card**
6. **Hero Section**
7. **Glass Card Base**

### Template de demande à Cursor AI:

Pour chaque composant, demander:

```
Exporte [NOM_COMPOSANT] en HTML/CSS/JS pur.

Crée dans /html-exports/[nom-composant]/:
- index.html (avec exemple d'utilisation)
- styles.css (avec toutes les variables CSS nécessaires)
- script.js (interactions)

Ajoute un README.md expliquant:
- Comment intégrer dans WordPress
- Les variables CSS requises
- Les dépendances (fonts, icons)
```

---

## 📦 Méthode 3: Page HTML Complète

### Exporter le Dashboard complet

**Prompt pour Cursor AI:**

```
Convertis /pages/DashboardPageUpgraded.tsx en page HTML pure.

Crée dans /html-exports/dashboard-complete/:
- dashboard.html (structure complète)
- dashboard.css (tous les styles)
- dashboard.js (toutes les interactions)
- variables.css (toutes les variables CSS de globals.css)

La page doit être 100% fonctionnelle sans React.
Remplace les icônes Lucide par des SVG inline.
Conserve toutes les animations et interactions.
```

---

## 🎨 Structure d'Export Recommandée

```
html-exports/
├── variables.css                    ← Toutes les variables CSS
├── common/
│   ├── glassmorphism.css           ← Pattern glass réutilisable
│   ├── animations.css              ← Toutes les keyframes
│   └── utilities.css               ← Classes utilitaires
├── components/
│   ├── action-card/
│   │   ├── index.html
│   │   ├── styles.css
│   │   ├── script.js
│   │   └── README.md
│   ├── journal-prompt/
│   │   ├── index.html
│   │   ├── styles.css
│   │   ├── script.js
│   │   └── README.md
│   ├── activity-card/
│   │   └── ...
│   ├── stat-pill/
│   │   └── ...
│   └── continue-learning/
│       └── ...
└── pages/
    ├── dashboard/
    │   ├── index.html              ← Dashboard complet
    │   ├── styles.css
    │   ├── script.js
    │   └── README.md
    └── specs/
        ├── index.html              ← Page de specs
        └── ...
```

---

## 🔧 Variables CSS - Fichier de Base

Créer un fichier `variables.css` à inclure partout:

**Prompt pour Cursor AI:**

```
Crée un fichier /html-exports/variables.css qui contient 
TOUTES les variables CSS de /styles/globals.css.

Ce fichier doit pouvoir être inclus dans n'importe quelle page HTML 
pour avoir accès au design system complet.

Ajoute des commentaires pour chaque section.
```

**Utilisation dans WordPress:**

```html
<!-- Dans header.php -->
<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/css/variables.css">
```

---

## 🎭 Icons - Remplacement Lucide React

### Option 1: SVG Inline

**Prompt pour Cursor AI:**

```
Remplace toutes les icônes Lucide React par des SVG inline.

Pour chaque icône utilisée (Users, Map, PenLine, Sparkles, etc.):
- Télécharge le SVG depuis lucide.dev
- Intègre-le directement dans le HTML
- Conserve les mêmes dimensions et stroke-width
```

### Option 2: Icon Font

Utiliser une icon font comme **Lucide Icons** en CDN:

```html
<!-- Dans <head> -->
<link rel="stylesheet" href="https://unpkg.com/lucide-static@latest/font/lucide.css">

<!-- Utilisation -->
<i class="lucide lucide-users" style="width: 40px; height: 40px;"></i>
```

---

## 🚀 Intégration WordPress

### Étape 1: Copier les fichiers

```bash
# Sur votre serveur WordPress
wp-content/
└── themes/
    └── your-theme/
        └── assets/
            ├── css/
            │   ├── variables.css
            │   ├── glassmorphism.css
            │   ├── animations.css
            │   └── dashboard.css
            ├── js/
            │   └── dashboard.js
            └── components/
                ├── action-card.html
                ├── journal-prompt.html
                └── ...
```

### Étape 2: Enqueue dans `functions.php`

```php
function tls_enqueue_assets() {
  // CSS
  wp_enqueue_style('tls-variables', 
    get_template_directory_uri() . '/assets/css/variables.css'
  );
  wp_enqueue_style('tls-glassmorphism', 
    get_template_directory_uri() . '/assets/css/glassmorphism.css'
  );
  wp_enqueue_style('tls-dashboard', 
    get_template_directory_uri() . '/assets/css/dashboard.css'
  );
  
  // JS
  wp_enqueue_script('tls-dashboard', 
    get_template_directory_uri() . '/assets/js/dashboard.js', 
    array(), 
    '1.0.0', 
    true
  );
}
add_action('wp_enqueue_scripts', 'tls_enqueue_assets');
```

### Étape 3: Inclure les composants

Créer des template parts:

```php
<!-- template-parts/components/action-card.php -->
<div class="action-card" data-action="<?php echo $action; ?>">
  <div class="action-card-icon-circle">
    <?php include get_template_directory() . '/assets/icons/' . $icon . '.svg'; ?>
  </div>
  <h3 class="action-card-title"><?php echo esc_html($title); ?></h3>
  <p class="action-card-description"><?php echo esc_html($description); ?></p>
</div>
```

**Utilisation dans une page:**

```php
<?php
get_template_part('template-parts/components/action-card', null, [
  'action' => 'coaching',
  'icon' => 'users',
  'title' => 'Coaching 1-to-1',
  'description' => 'Réserver une session'
]);
?>
```

---

## 📋 Checklist Export HTML Pur

- [ ] Variables CSS exportées dans `variables.css`
- [ ] Animations exportées dans `animations.css`
- [ ] Glassmorphism pattern dans `glassmorphism.css`
- [ ] Chaque composant a son HTML/CSS/JS
- [ ] Icons remplacés par SVG ou icon font
- [ ] Interactions vanilla JS fonctionnelles
- [ ] README pour chaque composant
- [ ] Hover states fonctionnent
- [ ] Responsive CSS ajouté
- [ ] Support Safari (`-webkit-backdrop-filter`)
- [ ] Accessibilité maintenue (focus states)

---

## 🎯 Exemple Complet: Action Card HTML Pur

### Fichier `action-card-complete.html`

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Action Card - TLS</title>
  
  <!-- Variables CSS -->
  <link rel="stylesheet" href="variables.css">
  
  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;600;700&family=Nunito:wght@400;500;600&display=swap" rel="stylesheet">
  
  <style>
    body {
      font-family: var(--font-body);
      background: linear-gradient(to bottom right, var(--primary-50), white, var(--accent-50));
      padding: 2rem;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .container {
      max-width: 800px;
      margin: 0 auto;
    }
    
    .grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-3);
    }
    
    /* Action Card */
    .action-card {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: var(--radius-2xl);
      padding: var(--space-5);
      border: 1px solid rgba(255, 255, 255, 0.8);
      box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.06);
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
      align-items: center;
      text-align: center;
      min-height: 160px;
      cursor: pointer;
      transition: all 300ms cubic-bezier(0, 0, 0.2, 1);
    }
    
    .action-card:hover {
      transform: scale(1.05);
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 100%);
      box-shadow: 0 8px 24px 0 rgba(85, 161, 180, 0.12);
    }
    
    .action-card-icon-circle {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: rgba(85, 161, 180, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .action-card-icon {
      width: 40px;
      height: 40px;
      color: var(--primary);
    }
    
    .action-card-title {
      font-family: var(--font-display);
      font-size: var(--text-base);
      font-weight: var(--font-weight-bold);
      color: var(--foreground);
      line-height: var(--leading-tight);
      margin: 0;
    }
    
    .action-card-description {
      font-family: var(--font-body);
      font-size: var(--text-xs);
      color: var(--muted-foreground);
      margin: 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="grid">
      <!-- Action Card 1 -->
      <div class="action-card" onclick="handleAction('coaching')">
        <div class="action-card-icon-circle">
          <svg class="action-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
        <h3 class="action-card-title">Coaching 1-to-1</h3>
        <p class="action-card-description">Réserver une session</p>
      </div>
      
      <!-- Action Card 2 -->
      <div class="action-card" onclick="handleAction('parcours')">
        <div class="action-card-icon-circle" style="background: rgba(237, 132, 58, 0.12);">
          <svg class="action-card-icon" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" stroke-width="2">
            <polygon points="3 11 22 2 13 21 11 13 3 11"/>
          </svg>
        </div>
        <h3 class="action-card-title">Parcours</h3>
        <p class="action-card-description">Explorer les cours</p>
      </div>
      
      <!-- Etc... -->
    </div>
  </div>
  
  <script>
    function handleAction(action) {
      console.log('Action clicked:', action);
      // Votre logique ici
      // Par exemple: window.location.href = '/page-' + action;
    }
  </script>
</body>
</html>
```

---

## 💡 Tips pour Cursor AI

### Prompt optimal pour export HTML:

```
Exporte TOUS les composants du dashboard en HTML/CSS/JS pur.

Crée une structure dans /html-exports/ avec:

1. variables.css (toutes les variables de globals.css)
2. common/ (glassmorphism, animations, utilities)
3. components/ (un dossier par composant)
4. pages/ (dashboard complet, specs page)

Chaque composant doit avoir:
- HTML structure
- CSS styles (avec variables)
- JS interactions (vanilla)
- README.md (instructions WordPress)

Remplace Lucide React par SVG inline.
Conserve toutes les animations.
Support Safari (-webkit-).
Pixel-perfect identique au React.
```

---

**Une fois exporté, vous pourrez importer tous ces fichiers HTML/CSS/JS dans Cursor pour les intégrer directement dans WordPress !** 🚀
