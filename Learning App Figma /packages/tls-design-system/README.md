# @tls/design-system

> The Learning Society Design System - Composants React + Tailwind CSS

## 📦 Installation

```bash
npm install @tls/design-system
# ou
pnpm add @tls/design-system
# ou
yarn add @tls/design-system
```

## 🚀 Usage

### Import des composants

```tsx
import { Button, Badge, Card, GlassCard } from '@tls/design-system';
import '@tls/design-system/styles';

function App() {
  return (
    <Card>
      <Badge variant="primary">Nouveau</Badge>
      <h2>The Learning Society</h2>
      <Button variant="primary" size="md">
        Commencer
      </Button>
    </Card>
  );
}
```

### Configuration Tailwind

Ajoutez les tokens TLS à votre `tailwind.config.js`:

```js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@tls/design-system/dist/**/*.{js,mjs}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#55A1B4',
        secondary: '#ED843A',
        accent: '#F8B044',
        teal: '#2A9D8F',
      },
    },
  },
};
```

## 🎨 Composants disponibles

### Core Components

- **Button** - Bouton avec variantes (primary, secondary, outline, ghost, destructive, success)
- **Badge** - Badge avec variantes et couleurs TLS
- **Card** - Carte de base
- **GlassCard** - Carte avec effet glassmorphism
- **SearchBar** - Barre de recherche simple
- **FilterBar** - Barre de filtres
- **InfoAlert** - Alertes informatives
- **PageContainer** - Container de page
- **PageHeader** - En-tête de page
- **SectionHeader** - En-tête de section

### UI Components

- **Forms**: Input, Checkbox, Textarea, Select, Label
- **Navigation**: Breadcrumb, Tabs, Dropdown
- **Feedback**: Alert, Toast, Progress, Skeleton
- **Overlays**: Dialog, Modal, Popover, Tooltip
- **Data**: Table, DataTable, Chart
- **Layout**: Card, Separator, ScrollArea

## 🎨 Design Tokens

Le design system TLS utilise des CSS variables pour tous les tokens:

```css
:root {
  /* Couleurs principales */
  --primary: #55A1B4;
  --secondary: #ED843A;
  --accent: #F8B044;
  
  /* Gradients TLS */
  --gradient-primary: linear-gradient(135deg, #55A1B4, #4A8FA1);
  --gradient-secondary: linear-gradient(135deg, #ED843A, #C06920);
  --gradient-warm: linear-gradient(135deg, #ED843A, #F8B044);
  
  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-4: 1rem;
  --space-8: 2rem;
  
  /* Radius */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.625rem;
  --radius-xl: 0.75rem;
}
```

## 📖 Documentation

Pour plus de détails, consultez la [documentation complète](https://docs.tls.com/design-system).

## 🛠️ Développement

```bash
# Installer les dépendances
pnpm install

# Build en mode watch
pnpm run dev

# Build production
pnpm run build

# Nettoyer
pnpm run clean
```

## 📝 License

MIT © The Learning Society
