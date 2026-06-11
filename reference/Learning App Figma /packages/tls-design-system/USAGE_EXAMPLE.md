# 🚀 Exemples d'utilisation - @tls/design-system

## Installation rapide

```bash
# Depuis votre projet
pnpm add /workspaces/default/code/packages/tls-design-system

# Ou après publication npm
pnpm add @tls/design-system
```

## Configuration Tailwind

`tailwind.config.js`
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
      },
    },
  },
};
```

## Import des styles

`src/main.tsx` ou `src/App.tsx`
```tsx
import '@tls/design-system/styles';
```

## Exemples de composants

### 1. Button (Core)

```tsx
import { Button } from '@tls/design-system';
import { Download } from 'lucide-react';

function MyComponent() {
  return (
    <div>
      {/* Bouton primary avec gradient TLS */}
      <Button variant="primary" size="md">
        Commencer le cours
      </Button>

      {/* Bouton secondary orange */}
      <Button variant="secondary" size="lg">
        Réserver un coaching
      </Button>

      {/* Bouton avec icône */}
      <Button 
        variant="primary" 
        size="md"
        icon={Download}
        iconPosition="left"
      >
        Télécharger
      </Button>

      {/* Bouton loading */}
      <Button variant="primary" loading>
        Chargement...
      </Button>

      {/* Bouton full width */}
      <Button variant="success" fullWidth>
        Valider
      </Button>
    </div>
  );
}
```

### 2. Badge (Core)

```tsx
import { Badge } from '@tls/design-system';

function CoursCard() {
  return (
    <div>
      <Badge variant="primary">Nouveau</Badge>
      <Badge variant="secondary">En cours</Badge>
      <Badge variant="success">Terminé</Badge>
      <Badge variant="warning">Bientôt disponible</Badge>
      <Badge variant="outline">Gratuit</Badge>
    </div>
  );
}
```

### 3. Card & GlassCard (Core)

```tsx
import { Card, GlassCard } from '@tls/design-system';

function Dashboard() {
  return (
    <div>
      {/* Carte standard */}
      <Card>
        <h3>Ma progression</h3>
        <p>75% complété</p>
      </Card>

      {/* Carte avec effet glassmorphism */}
      <GlassCard gradient="primary">
        <h3>Statistiques</h3>
        <p>12 cours complétés</p>
      </GlassCard>

      {/* Carte interactive */}
      <Card 
        hover 
        onClick={() => console.log('Clicked!')}
      >
        <h3>Cliquez-moi</h3>
      </Card>
    </div>
  );
}
```

### 4. PageContainer & Headers (Core)

```tsx
import { 
  PageContainer, 
  PageHeaderFinal, 
  SectionHeader 
} from '@tls/design-system';

function MyPage() {
  return (
    <PageContainer gradient="brand">
      <PageHeaderFinal
        title="Mes Parcours"
        subtitle="Découvrez tous vos cours de formation"
        showBackButton
        onBack={() => console.log('Back')}
      />

      <SectionHeader
        title="Cours en cours"
        subtitle="Continuez là où vous en étiez"
        badge="3 cours"
      />

      {/* Contenu de la page */}
    </PageContainer>
  );
}
```

### 5. SearchBar & Filters (Core)

```tsx
import { 
  SearchBar, 
  FilterBar, 
  AdvancedFilterBar 
} from '@tls/design-system';

function ParcoursPage() {
  return (
    <div>
      {/* Recherche simple */}
      <SearchBar
        placeholder="Rechercher un cours..."
        onSearch={(query) => console.log(query)}
      />

      {/* Filtres */}
      <FilterBar
        filters={[
          { id: 'all', label: 'Tous', active: true },
          { id: 'progress', label: 'En cours' },
          { id: 'completed', label: 'Terminés' },
        ]}
        onFilterChange={(id) => console.log(id)}
      />

      {/* Filtres avancés */}
      <AdvancedFilterBar
        categories={['Management', 'Tech', 'Soft Skills']}
        onCategoryChange={(cat) => console.log(cat)}
      />
    </div>
  );
}
```

### 6. UI Components (shadcn-style)

```tsx
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  Input,
  Label,
  Checkbox,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@tls/design-system';

function AdvancedExample() {
  return (
    <div>
      {/* Dialog/Modal */}
      <Dialog>
        <DialogTrigger>Ouvrir modal</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer l'action</DialogTitle>
          </DialogHeader>
          <p>Êtes-vous sûr ?</p>
        </DialogContent>
      </Dialog>

      {/* Form */}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          type="email" 
          placeholder="vous@example.com" 
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="courses">Cours</TabsTrigger>
          <TabsTrigger value="stats">Statistiques</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          Contenu vue d'ensemble
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

### 7. OptimizedSidebar (TLS Specific)

```tsx
import { OptimizedSidebar } from '@tls/design-system';

function AppLayout() {
  return (
    <div style={{ display: 'flex' }}>
      <OptimizedSidebar
        currentPage="dashboard"
        onNavigate={(page) => console.log('Navigate to:', page)}
        onLogout={() => console.log('Logout')}
        userName="Pierre Adennery"
        userEmail="padennery@me.com"
        userInitials="PA"
        notifications={[
          { id: '1', title: 'Nouveau cours', type: 'info' }
        ]}
      />
      
      <main>
        {/* Contenu principal */}
      </main>
    </div>
  );
}
```

## Utilisation des tokens CSS

```tsx
function CustomComponent() {
  return (
    <div style={{
      background: 'var(--gradient-primary)',
      padding: 'var(--space-4)',
      borderRadius: 'var(--radius-lg)',
      color: 'var(--primary-foreground)',
    }}>
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-2xl)',
        fontWeight: 'var(--font-weight-bold)',
      }}>
        The Learning Society
      </h2>
    </div>
  );
}
```

## Composition avancée

```tsx
import { 
  Button, 
  Badge, 
  GlassCard, 
  PageContainer,
  SearchBar 
} from '@tls/design-system';

function CoursesPage() {
  return (
    <PageContainer gradient="tls">
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h1 style={{ 
          fontSize: 'var(--text-4xl)',
          background: 'var(--gradient-brand)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Mes Parcours de Formation
        </h1>
        
        <SearchBar 
          placeholder="Rechercher un cours..."
          onSearch={(q) => console.log(q)}
        />
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 'var(--space-6)',
      }}>
        <GlassCard gradient="primary">
          <Badge variant="primary">En cours</Badge>
          <h3>Product Management Pro</h3>
          <p>Module 3 sur 8</p>
          <Button variant="primary" fullWidth>
            Continuer
          </Button>
        </GlassCard>

        <GlassCard gradient="secondary">
          <Badge variant="success">Nouveau</Badge>
          <h3>Design Thinking</h3>
          <p>12 leçons</p>
          <Button variant="secondary" fullWidth>
            Commencer
          </Button>
        </GlassCard>
      </div>
    </PageContainer>
  );
}
```

## 🎨 Design Guidelines

### Règles gradients TLS

❌ **INTERDIT** : Gradients multicouleurs sur composants UI (sauf progress/sliders)
✅ **AUTORISÉ** : 
- Gradients sur textes (titles, headings)
- Gradients sur backgrounds de pages/sections
- Combinaison orange+jaune (`--gradient-warm`)
- Gradients à 2 couleurs d'une même famille

### Couleurs principales

```css
--primary: #55A1B4 (Bleu TLS)
--secondary: #ED843A (Orange)
--accent: #F8B044 (Jaune)
--success: #2A9D8F (Teal)
--destructive: #EF4444 (Rouge)
```

### Gradients whitelisted

```css
--gradient-primary (bleu → bleu foncé)
--gradient-secondary (orange → orange foncé)
--gradient-accent (jaune → jaune foncé)
--gradient-warm (orange → jaune) ⭐ Combinaison autorisée
--gradient-brand (bleu → orange) 🎨 Textes/backgrounds uniquement
--gradient-tls (diagonal bleu → orange)
```

## 📚 Plus d'exemples

Consultez le dossier `examples/` pour des implémentations complètes.
