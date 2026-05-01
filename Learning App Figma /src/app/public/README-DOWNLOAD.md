# The Learning Society - Design System v1.0

## 📦 Contenu du Package

Ce design system contient tous les éléments nécessaires pour créer des interfaces cohérentes et professionnelles.

### 🎨 Variables CSS (`/styles/globals.css`)

Toutes les variables de design sont personnalisables :

- **Couleurs** : Palette complète (brand, sémantiques, neutres)
- **Typographie** : Scale de tailles, weights, line-heights
- **Espacement** : Échelle de 4px à 128px
- **Border Radius** : De 6px à 9999px (full)
- **Ombres** : 7 niveaux d'élévation
- **Transitions** : Durées et timing functions

### 🧩 Composants React

45+ composants prêts à l'emploi :

#### Composants de Base
- Button (8 variantes, 6 tailles)
- Badge (8 variantes, 3 tailles)
- Card (avec header, content, footer)

#### Formulaires
- Input
- Textarea
- Select
- Checkbox
- Radio Group
- Switch
- Label

#### Navigation
- Tabs
- Accordion
- Breadcrumbs (à venir)

#### Feedback
- Dialog / Modal
- Tooltip
- Progress
- Toast (à venir)
- Alert (à venir)

#### Layout
- Container (5 tailles)
- Section (4 variantes)
- Grid (responsive)
- Stack (vertical/horizontal)
- Flex (helper)

## 🚀 Installation

### NPM (Recommandé)

```bash
npm install @tls/design-system
```

### Import Manuel

1. Copiez `/styles/globals.css` dans votre projet
2. Copiez le dossier `/components` dans votre projet
3. Installez les dépendances :

```bash
npm install @radix-ui/react-dialog @radix-ui/react-tabs @radix-ui/react-accordion
npm install lucide-react class-variance-authority
```

## 📖 Utilisation

### Importer les Variables CSS

```tsx
import './styles/globals.css';
```

### Utiliser les Composants

```tsx
import { Button } from '@tls/design-system/button';
import { Card, CardHeader, CardTitle, CardContent } from '@tls/design-system/card';

function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Titre</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="primary">Click me</Button>
      </CardContent>
    </Card>
  );
}
```

### Personnaliser les Variables

Modifiez les variables dans votre fichier CSS :

```css
:root {
  --primary: #55A1B4;  /* Votre couleur primaire */
  --secondary: #F8B044; /* Votre couleur secondaire */
  /* etc... */
}
```

## 🎯 Principes de Design

### Couleurs

- **Primary (#55A1B4)** : Actions principales, liens importants
- **Secondary (#F8B044)** : Accents, éléments complémentaires
- **Accent (#EB7724)** : Attirer l'attention sur des éléments clés

### Typographie

- **Heading 1-6** : Hiérarchie claire et cohérente
- **Body** : Taille de base 16px (1rem)
- **Small** : 14px pour les labels et légendes

### Espacement

Utilisez l'échelle définie :
- `--space-1` (4px) : Espacement minimal
- `--space-4` (16px) : Espacement standard
- `--space-8` (32px) : Sections

## ♿ Accessibilité

Tous les composants sont conçus pour être accessibles :

- **Contraste** : Ratios WCAG AA minimum
- **Keyboard** : Navigation complète au clavier
- **Screen Readers** : Labels ARIA appropriés
- **Focus States** : Indicateurs visuels clairs

## 📱 Responsive

Breakpoints :
- **sm** : 640px
- **md** : 768px
- **lg** : 1024px
- **xl** : 1280px

Tous les composants sont responsive par défaut.

## 🤝 Support

Pour toute question ou support :
- 📧 Email : design@thelearningsociety.fr
- 🌐 Site : https://thelearningsociety.fr
- 📚 Documentation complète : [lien vers docs]

## 📄 License

© 2024 The Learning Society. Tous droits réservés.

---

**Version** : 1.0.0
**Dernière mise à jour** : Décembre 2024
