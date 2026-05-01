# TLS Design System - Inventaire pour NPM Package

## 📦 Composants à inclure dans le package

### 🎯 Core Components (/common/)
✅ **À inclure dans le package** - Composants fondamentaux TLS

- **Button.tsx** - Bouton avec variantes primary/secondary/outline/ghost
- **Badge.tsx** - Badges avec variantes et couleurs TLS
- **Card.tsx** - Carte de base
- **GlassCard.tsx** - Carte avec effet glassmorphism
- **SearchBar.tsx** - Barre de recherche simple
- **SearchBarWithFilters.tsx** - Recherche avancée avec filtres
- **FilterBar.tsx** - Barre de filtres
- **AdvancedFilterBar.tsx** - Filtres avancés
- **InfoAlert.tsx** - Alertes informatives
- **PageContainer.tsx** - Container de page
- **PageHeaderFinal.tsx** - En-tête de page complet
- **PageHeaderSimple.tsx** - En-tête de page simple
- **SectionContainer.tsx** - Container de section
- **SectionHeader.tsx** - En-tête de section

Total: **14 composants common**

### 🎨 UI Components (/ui/)
✅ **À inclure dans le package** - Composants UI réutilisables

Catégories:
- **Forms**: input, checkbox, textarea, select, label, etc.
- **Navigation**: breadcrumb, tabs, dropdown-menu, etc.
- **Feedback**: alert, toast, progress, skeleton, etc.
- **Overlays**: dialog, modal, popover, tooltip, etc.
- **Data**: table, data-table, chart, etc.
- **Layout**: card, separator, scroll-area, etc.
- **TLS Specific**: optimized-sidebar, notification-dropdown, etc.

Total: **~70+ composants UI**

### 🎨 Design Tokens
✅ **À inclure**

- `/src/styles/default_theme.css` - Tokens CSS (couleurs, spacing, etc.)
- Variables TLS: --primary, --secondary, --accent, gradients, etc.

### 🚫 À EXCLURE du package

- `/design-system/` - Documentation uniquement (archivé)
- Pages spécifiques métier
- Composants obsolètes/non utilisés

## 📋 Structure du package NPM proposée

```
@tls/design-system/
├── package.json
├── README.md
├── tsconfig.json
├── src/
│   ├── index.ts (export centralisé)
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button/
│   │   │   ├── Badge/
│   │   │   └── ...
│   │   └── ui/
│   │       ├── input/
│   │       ├── dialog/
│   │       └── ...
│   ├── styles/
│   │   ├── tokens.css
│   │   └── globals.css
│   └── types/
│       └── index.ts
└── dist/ (build output)
```

## 🔄 Prochaines étapes

1. ✅ Nettoyage effectué (pages design system archivées)
2. ⏳ Créer structure package
3. ⏳ Configurer build (TypeScript + Tailwind)
4. ⏳ Exports centralisés
5. ⏳ Documentation package

