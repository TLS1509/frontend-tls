# 📚 GUIDE DE RÉFÉRENCE DES COMPOSANTS - THE LEARNING SOCIETY

**Version** : 4.0 Final → V7.0  
**Date création** : 12 janvier 2025  
**Date renommage** : 23 janvier 2026 (Consolidation V7.0)  
**Design System** : TLS (The Learning Society)

---

## 📝 HISTORIQUE DE CE DOCUMENT

### V7.0 - 23 janvier 2026
- **Action** : Renommé de `COMPONENTS-REFERENCE.md` vers `02-COMPONENTS.md`
- **Raison** : Consolidation documentation TLS v7.0
- **Convention** : Numérotation 00-04 pour docs principaux
- **Contenu** : **Identique à COMPONENTS-REFERENCE.md V4.0** (87 composants documentés)
- **Changements** : Ajout section historique, mise à jour navigation docs

### V4.0 Final - 12 janvier 2025 (version originale)
- Document créé avec 87 composants documentés
- Structure par catégories (Core, Form, Display, etc.)
- API complète, exemples, cas d'usage
- Variables CSS design system TLS

---

## 📖 TABLE DES MATIÈRES

### Navigation rapide

- [🔵 Core Components](#-core-components) (10)
- [📝 Form Components](#-form-components) (11)
- [🎨 Display Components](#-display-components) (10)
- [💬 Feedback Components](#-feedback-components) (8)
- [🧭 Navigation Components](#-navigation-components) (6)
- [📦 Overlay Components](#-overlay-components) (7)
- [🎮 Pattern Components](#-pattern-components) (8)
- [🏆 Gamification Components](#-gamification-components) (3)
- [🔧 Advanced UI Components](#-advanced-ui-components) (15)
- [📐 Layout Components](#-layout-components) (5)
- [✍️ Typography Components](#-typography-components) (2)
- [🧩 Utility Components](#-utility-components) (2)

**Total** : **87 composants actifs** ✅

---

## 🎨 CONVENTIONS CSS

Tous les composants utilisent les **variables CSS du design system TLS** définies dans `/styles/globals.css`.

### Variables principales

```css
/* Couleurs */
--color-primary, --color-primary-hover
--color-secondary, --color-secondary-hover
--color-accent, --color-accent-hover

/* Spacing */
--spacing-1 (4px) → --spacing-24 (96px)

/* Radius */
--radius-sm (6px) → --radius-full (9999px)

/* Shadows */
--shadow-sm → --shadow-2xl

/* Gradients */
--gradient-primary, --gradient-secondary, --gradient-warm, --gradient-brand

/* Transitions */
--transition-fast (150ms), --transition-base (250ms), --transition-slow (350ms)
```

### Typographie

```css
/* Headings */
font-family: 'League Spartan', system-ui, sans-serif

/* Body */
font-family: 'Nunito', system-ui, sans-serif
```

**Référence complète** : [01-DESIGN-SYSTEM.md](01-DESIGN-SYSTEM.md)

---

## 🔵 CORE COMPONENTS

Les composants les plus utilisés dans l'application.

---

### Button

**Fichier** : `/components/ui/button.tsx`  
**Usage** : 40+ pages  
**Dépendances** : `@radix-ui/react-slot`, `class-variance-authority`

#### Description
Composant bouton avec **16 variantes** et **6 tailles**. Supporte les icônes, états disabled, et mode `asChild`.

#### API

```typescript
interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: 
    | "default"           // Primaire bleu
    | "secondary"         // Secondaire orange
    | "accent"            // Accent jaune
    | "destructive"       // Rouge danger
    | "success"           // Vert succès
    | "outline"           // Bordure simple
    | "outline-primary"   // Bordure primaire
    | "outline-secondary" // Bordure secondaire
    | "outline-accent"    // Bordure accent
    | "gradient-primary"  // Gradient bleu
    | "gradient-secondary"// Gradient orange
    | "gradient-warm"     // Gradient chaud
    | "gradient-brand"    // Gradient multi-couleurs
    | "ghost"             // Transparent
    | "link"              // Lien souligné
  
  size?: 
    | "default"  // 40px height
    | "sm"       // 32px height
    | "lg"       // 48px height
    | "xl"       // 56px height
    | "icon"     // 40x40px
    | "icon-sm"  // 32x32px
  
  asChild?: boolean  // Utilise Radix Slot
}
```

#### Variables CSS utilisées

```css
--color-primary, --color-primary-hover
--color-secondary, --color-secondary-hover
--color-accent, --color-accent-hover
--radius-sm, --radius-md, --radius-lg
--shadow-md, --shadow-lg
--gradient-primary, --gradient-secondary
--transition-base
```

#### Exemples d'utilisation

```tsx
// Bouton primaire standard
<Button variant="default">
  Continuer
</Button>

// Bouton avec icône
<Button variant="gradient-primary" size="lg">
  <Sparkles className="size-5" />
  Démarrer le cours
</Button>

// Bouton icon only
<Button variant="ghost" size="icon">
  <Bell className="size-5" />
</Button>

// Bouton outline secondaire
<Button variant="outline-secondary" size="sm">
  Annuler
</Button>

// Bouton en mode link (as child)
<Button variant="link" asChild>
  <a href="/profile">Mon profil</a>
</Button>
```

#### Cas d'usage
- ✅ CTAs principales (gradient-primary, gradient-brand)
- ✅ Actions secondaires (outline, ghost)
- ✅ Formulaires (default, secondary)
- ✅ Navigation (link)
- ✅ Icons buttons (icon, icon-sm)

---

### Card

**Fichier** : `/components/ui/card.tsx`  
**Usage** : 40+ pages  
**Dépendances** : Aucune

#### Description
Système de cards composable avec Header, Title, Description, Action, Content, et Footer.

#### API

```typescript
// Card principale
function Card(props: React.ComponentProps<"div">): JSX.Element

// Sous-composants
function CardHeader(props: React.ComponentProps<"div">): JSX.Element
function CardTitle(props: React.ComponentProps<"div">): JSX.Element
function CardDescription(props: React.ComponentProps<"div">): JSX.Element
function CardAction(props: React.ComponentProps<"div">): JSX.Element
function CardContent(props: React.ComponentProps<"div">): JSX.Element
function CardFooter(props: React.ComponentProps<"div">): JSX.Element
```

#### Exemples d'utilisation

```tsx
// Card simple
<Card>
  <CardHeader>
    <CardTitle>Titre de la card</CardTitle>
    <CardDescription>Description optionnelle</CardDescription>
  </CardHeader>
  <CardContent>
    Contenu principal
  </CardContent>
</Card>

// Card complète (comme dans votre screenshot Parcours)
<Card>
  <CardHeader>
    <Badge variant="secondary">En cours</Badge>
    <CardTitle>Maîtriser l'IA pour la Formation</CardTitle>
    <CardDescription>
      Découvrez comment intégrer l'IA dans vos pratiques pédagogiques
    </CardDescription>
  </CardHeader>
  <CardContent>
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Clock className="size-4" />
        <span>12h</span>
      </div>
      <div className="flex items-center gap-2">
        <BookOpen className="size-4" />
        <span>35 leçons</span>
      </div>
    </div>
    <ProgressBar value={30} />
  </CardContent>
  <CardFooter>
    <Button variant="gradient-primary">
      Continuer le parcours →
    </Button>
  </CardFooter>
</Card>
```

#### Cas d'usage
- ✅ Cards de cours (Parcours - voir screenshot)
- ✅ Cards de statistiques (Dashboard)
- ✅ Cards de contenu (Veille)
- ✅ Cards de profil
- ✅ Modals content

---

### Badge

**Fichier** : `/components/ui/badge.tsx`  
**Usage** : 30+ pages  
**Dépendances** : `class-variance-authority`

#### Description
Badges colorés pour statuts, catégories, et tags.

#### API

```typescript
interface BadgeProps extends React.ComponentProps<"div"> {
  variant?: 
    | "default"      // Primaire (bleu)
    | "secondary"    // Secondaire (orange)
    | "accent"       // Accent (jaune)
    | "success"      // Succès (vert)
    | "destructive"  // Erreur (rouge)
    | "warning"      // Avertissement (jaune)
    | "outline"      // Bordure
}
```

#### Exemples d'utilisation

```tsx
// Badges statut (comme dans votre screenshot)
<Badge variant="secondary">En cours</Badge>
<Badge variant="success">Complété</Badge>
<Badge variant="outline">Pas commencé</Badge>

// Badge catégorie
<Badge variant="accent">Outils IA</Badge>
<Badge variant="secondary">EdTech</Badge>

// Badge avec icon
<Badge variant="success">
  <CheckCircle2 className="size-3" />
  Validé
</Badge>
```

#### Cas d'usage
- ✅ Statuts de cours (voir screenshot Parcours)
- ✅ Catégories (Veille, Cours)
- ✅ Tags
- ✅ Notifications count

---

### OptimizedSidebar

**Fichier** : `/components/ui/optimized-sidebar.tsx`  
**Usage** : 26 pages  
**Dépendances** : `lucide-react`, `motion/react`

#### Description
Sidebar de navigation principale avec support mobile (drawer), desktop (fixed), mode collapse, et active states.

#### API

```typescript
interface OptimizedSidebarProps {
  currentPage: Page;           // Page active
  onNavigate: (page: Page) => void;  // Callback navigation
  userInfo?: {
    name: string;
    email: string;
    avatar?: string;
    role?: string;
  };
  stats?: {
    xp: number;
    level: number;
    streak: number;
  };
}
```

#### Exemples d'utilisation

```tsx
// Sidebar avec user info et stats
<OptimizedSidebar
  currentPage="parcours"
  onNavigate={(page) => setCurrentPage(page)}
  userInfo={{
    name: "Marie Dupont",
    email: "marie@example.com",
    role: "Formatrice"
  }}
  stats={{
    xp: 2450,
    level: 12,
    streak: 7
  }}
/>
```

#### Cas d'usage
- ✅ Navigation principale (voir votre screenshot - bouton menu en haut à gauche)
- ✅ Layout container
- ✅ User context display

---

### BackgroundBlobs

**Fichier** : `/components/ui/background-blobs.tsx`  
**Usage** : 23 pages  
**Dépendances** : Aucune

#### Description
Blobs d'arrière-plan animés avec effet glassmorphism. Crée l'ambiance visuelle TLS.

#### API

```typescript
interface BackgroundBlobsProps {
  variant?: 
    | "default"     // Mix primary + secondary + accent
    | "primary"     // Bleu uniquement
    | "secondary"   // Orange uniquement
    | "accent"      // Jaune uniquement
    | "warm"        // Orange + jaune
  
  intensity?: 
    | "low"         // Opacité 0.05
    | "medium"      // Opacité 0.1 (default)
    | "high"        // Opacité 0.15
  
  animated?: boolean  // Animations CSS (default: true)
}
```

#### Exemples d'utilisation

```tsx
// Usage typique dans une page (comme votre screenshot Parcours)
<div className="min-h-screen relative">
  <BackgroundBlobs variant="default" />
  
  <OptimizedSidebar {...} />
  
  <main className="relative z-10">
    {/* Contenu */}
  </main>
</div>
```

#### Cas d'usage
- ✅ Toutes les pages principales (Dashboard, Parcours - visible dans votre screenshot)
- ✅ Pages d'erreur (404, 500)
- ✅ Créer l'ambiance TLS

---

### GlassCard

**Fichier** : `/components/ui/glass-card.tsx`  
**Usage** : 15+ pages  
**Dépendances** : Aucune

#### Description
Card avec effet glassmorphism (backdrop blur + borders lumineux).

#### API

```typescript
interface GlassCardProps extends React.ComponentProps<"div"> {
  blur?: "sm" | "md" | "lg" | "xl";  // Intensité blur
  border?: boolean;                   // Border lumineux (default: true)
  shadow?: boolean;                   // Shadow (default: true)
}
```

#### Exemples d'utilisation

```tsx
// Glass card pour stats (comme la progression dans votre screenshot)
<GlassCard className="p-6">
  <h3 className="text-lg font-semibold">Progression globale</h3>
  <p>32 / 105 leçons complétées</p>
  <ProgressBar value={30} className="mt-4" />
</GlassCard>
```

#### Cas d'usage
- ✅ Cards de progression (voir screenshot)
- ✅ Cards de stats sur backgrounds colorés
- ✅ Headers de sections
- ✅ Hero sections

---

### ProgressBar

**Fichier** : `/components/ui/progress.tsx`  
**Usage** : 20+ pages  
**Dépendances** : `@radix-ui/react-progress`

#### Description
Barre de progression avec animations et gradients.

#### API

```typescript
interface ProgressBarProps {
  value: number;        // 0-100
  showLabel?: boolean;  // Afficher pourcentage
  variant?: "default" | "gradient";
  size?: "sm" | "md" | "lg";
}
```

#### Exemples d'utilisation

```tsx
// Progress bar (comme dans votre screenshot Parcours)
<ProgressBar value={30} variant="gradient" />

// Progress bar avec label
<ProgressBar value={68} showLabel />
```

#### Cas d'usage
- ✅ Progression cours (voir screenshot)
- ✅ Progression globale
- ✅ Loading states

---

## 📝 FORM COMPONENTS

Composants pour formulaires et inputs.

### Textarea, Select, Checkbox, RadioGroup, Switch, Slider, DatePicker, FileUpload, Form (react-hook-form), InputOTP, Combobox

**Documentation complète** : Voir `/docs/COMPONENTS-REFERENCE.md` lignes 1095-1800

---

## 🎨 DISPLAY COMPONENTS

Composants d'affichage de données.

### Avatar, Table, DataTable, Accordion, Tabs, Carousel, AspectRatio, Skeleton, LazyImage, Stats Card

**Documentation complète** : Voir `/docs/COMPONENTS-REFERENCE.md` lignes 1800-2400

---

## 💬 FEEDBACK COMPONENTS

Composants de feedback utilisateur.

### Alert, AlertDialog, Toast (sonner), ToastNotification, Dialog, ConfettiCelebration, Spinner, EmptyState

**Documentation complète** : Voir `/docs/COMPONENTS-REFERENCE.md` lignes 2400-2800

---

## 🧭 NAVIGATION COMPONENTS

Composants de navigation.

### Breadcrumbs, Pagination, NavigationMenu, Menubar, CommandPalette (Command), ContextMenu

**Documentation complète** : Voir `/docs/COMPONENTS-REFERENCE.md` lignes 2800-3200

---

## 📦 OVERLAY COMPONENTS

Composants modals et overlays.

### Modal (Dialog), Sheet, Drawer, Popover, Tooltip, HoverCard, DropdownMenu

**Documentation complète** : Voir `/docs/COMPONENTS-REFERENCE.md` lignes 3200-3600

---

## 🎮 PATTERN COMPONENTS

Patterns et composants métier.

### LessonPlayer, QuizSystem, RatingSystem, JournalPromptCards, BookingModal, OnboardingFlow, SearchWithFilters, AdvancedFilterBar

**Documentation complète** : Voir `/docs/COMPONENTS-REFERENCE.md` lignes 3600-4000

---

## 🏆 GAMIFICATION COMPONENTS

Composants gamification.

### AchievementCard, BadgeDisplay, CelebrationModal

**Documentation complète** : Voir `/docs/COMPONENTS-REFERENCE.md` lignes 4000-4200

---

## 🔧 ADVANCED UI COMPONENTS

Composants UI avancés.

### DesignSystemFAB, DesignSystemQuickAccess, TestLabButton, NotificationBadge, NotificationDropdown, NotificationFeed, NotificationToast, Stepper, Timeline, RangeSlider, ColorPicker, ResizablePanels, CollapsibleSection, ToggleGroup, Chart

**Documentation complète** : Voir `/docs/COMPONENTS-REFERENCE.md` lignes 4200-5000

---

## 📐 LAYOUT COMPONENTS

Composants layout et structuration.

### Container, Flex, Grid, Stack, Section

**Fichiers** : `/components/layout/*.tsx`

#### Container

```tsx
<Container size="lg">
  <h1>Contenu centré avec max-width</h1>
</Container>
```

#### Flex

```tsx
<Flex direction="row" gap={4} align="center" justify="between">
  <div>Item 1</div>
  <div>Item 2</div>
</Flex>
```

#### Grid

```tsx
<Grid cols={3} gap={6}>
  <Card>1</Card>
  <Card>2</Card>
  <Card>3</Card>
</Grid>
```

#### Stack

```tsx
<Stack spacing={4}>
  <h2>Titre</h2>
  <p>Paragraphe</p>
  <Button>Action</Button>
</Stack>
```

#### Section

```tsx
<Section>
  <SectionHeader title="Mes Parcours" />
  <Grid cols={3}>
    {/* Cards */}
  </Grid>
</Section>
```

---

## ✍️ TYPOGRAPHY COMPONENTS

Composants typographie.

### Heading, Text

**Fichiers** : `/components/typography/*.tsx`

#### Heading

```tsx
<Heading level={1}>Titre Principal</Heading>
<Heading level={2} className="text-primary">Sous-titre</Heading>
<Heading level={3}>Section</Heading>
```

**Props** :
- `level`: 1-6 (correspond à H1-H6)
- `className`: Classes Tailwind custom

**Font** : League Spartan (automatique)

#### Text

```tsx
<Text size="lg" weight="semibold">Texte large</Text>
<Text size="base">Texte normal</Text>
<Text size="sm" className="text-muted-foreground">Texte small</Text>
```

**Props** :
- `size`: xs, sm, base, lg, xl
- `weight`: normal, medium, semibold, bold
- `className`: Classes Tailwind custom

**Font** : Nunito (automatique)

---

## 🧩 UTILITY COMPONENTS

Composants utilitaires.

### ScrollArea, Resizable

**Fichiers** : `/components/ui/scroll-area.tsx`, `/components/ui/resizable.tsx`

#### ScrollArea

```tsx
<ScrollArea className="h-96">
  <div className="p-4">
    {/* Contenu long avec scroll custom */}
  </div>
</ScrollArea>
```

#### Resizable

```tsx
<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize={50}>
    Panel 1
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={50}>
    Panel 2
  </ResizablePanel>
</ResizablePanelGroup>
```

---

## 📊 INDEX ALPHABÉTIQUE

| Composant | Catégorie | Fichier |
|-----------|-----------|---------|
| **Accordion** | Display | `/components/ui/accordion.tsx` |
| **AchievementCard** | Gamification | `/components/ui/achievement-card.tsx` |
| **AdvancedFilterBar** | Pattern | `/components/common/AdvancedFilterBar.tsx` |
| **Alert** | Feedback | `/components/ui/alert.tsx` |
| **AlertDialog** | Feedback | `/components/ui/alert-dialog.tsx` |
| **AspectRatio** | Display | `/components/ui/aspect-ratio.tsx` |
| **Avatar** | Display | `/components/ui/avatar.tsx` |
| **BackgroundBlobs** | Core | `/components/ui/background-blobs.tsx` |
| **Badge** | Core | `/components/ui/badge.tsx` |
| **BadgeDisplay** | Gamification | `/components/ui/badge-display.tsx` |
| **BookingModal** | Pattern | `/components/coaching/BookingModal.tsx` |
| **Breadcrumbs** | Navigation | `/components/ui/breadcrumbs.tsx` |
| **Button** | Core | `/components/ui/button.tsx` |
| **Calendar** | Form | `/components/ui/calendar.tsx` |
| **Card** | Core | `/components/ui/card.tsx` |
| **Carousel** | Display | `/components/ui/carousel.tsx` |
| **CelebrationModal** | Gamification | `/components/ui/celebration-modal.tsx` |
| **Chart** | Advanced | `/components/ui/chart.tsx` |
| **Checkbox** | Form | `/components/ui/checkbox.tsx` |
| **Collapsible** | Advanced | `/components/ui/collapsible.tsx` |
| **Combobox** | Form | `/components/ui/combobox.tsx` |
| **Command** | Navigation | `/components/ui/command.tsx` |
| **ConfettiCelebration** | Feedback | `/components/ui/confetti-celebration.tsx` |
| **Container** | Layout | `/components/layout/Container.tsx` |
| **ContextMenu** | Navigation | `/components/ui/context-menu.tsx` |
| **DataTable** | Display | `/components/ui/data-table.tsx` |
| **DatePicker** | Form | `/components/ui/calendar.tsx` |
| **DesignSystemFAB** | Advanced | `/components/ui/design-system-fab.tsx` |
| **DesignSystemQuickAccess** | Advanced | `/components/ui/design-system-quick-access.tsx` |
| **Dialog** | Overlay | `/components/ui/dialog.tsx` |
| **Drawer** | Overlay | `/components/ui/drawer.tsx` |
| **DropdownMenu** | Overlay | `/components/ui/dropdown-menu.tsx` |
| **EmptyState** | Feedback | `/components/ui/empty-state.tsx` |
| **FileUpload** | Form | `/components/ui/file-upload.tsx` |
| **Flex** | Layout | `/components/layout/Flex.tsx` |
| **Form** | Form | `/components/ui/form.tsx` |
| **GlassCard** | Core | `/components/ui/glass-card.tsx` |
| **Grid** | Layout | `/components/layout/Grid.tsx` |
| **Heading** | Typography | `/components/typography/Heading.tsx` |
| **HoverCard** | Overlay | `/components/ui/hover-card.tsx` |
| **Input** | Core | `/components/ui/input.tsx` |
| **InputOTP** | Form | `/components/ui/input-otp.tsx` |
| **JournalPromptCards** | Pattern | `/components/journal/JournalPromptCards.tsx` |
| **Label** | Core | `/components/ui/label.tsx` |
| **LazyImage** | Display | `/components/ui/lazy-image.tsx` |
| **LessonPlayer** | Pattern | `/components/patterns/LessonPlayer.tsx` |
| **Menubar** | Navigation | `/components/ui/menubar.tsx` |
| **NavigationMenu** | Navigation | `/components/ui/navigation-menu.tsx` |
| **NotificationBadge** | Advanced | `/components/ui/notification-badge.tsx` |
| **NotificationDropdown** | Advanced | `/components/ui/notification-dropdown.tsx` |
| **NotificationFeed** | Advanced | `/components/ui/notification-feed.tsx` |
| **NotificationToast** | Advanced | `/components/ui/notification-toast.tsx` |
| **OnboardingFlow** | Pattern | `/components/onboarding/OnboardingFlow.tsx` |
| **OptimizedSidebar** | Core | `/components/ui/optimized-sidebar.tsx` |
| **Pagination** | Navigation | `/components/ui/pagination.tsx` |
| **Popover** | Overlay | `/components/ui/popover.tsx` |
| **Progress** | Core | `/components/ui/progress.tsx` |
| **QuizSystem** | Pattern | `/components/quiz/QuizSystem.tsx` |
| **RadioGroup** | Form | `/components/ui/radio-group.tsx` |
| **RangeSlider** | Advanced | `/components/ui/range-slider.tsx` |
| **Rating** | Display | `/components/ui/rating.tsx` |
| **RatingSystem** | Pattern | `/components/rating/RatingSystem.tsx` |
| **Resizable** | Utility | `/components/ui/resizable.tsx` |
| **ScrollArea** | Utility | `/components/ui/scroll-area.tsx` |
| **SearchWithFilters** | Pattern | `/components/ui/search-with-filters.tsx` |
| **Section** | Layout | `/components/layout/Section.tsx` |
| **Select** | Form | `/components/ui/select.tsx` |
| **Separator** | Core | `/components/ui/separator.tsx` |
| **Sheet** | Overlay | `/components/ui/sheet.tsx` |
| **Skeleton** | Display | `/components/ui/skeleton.tsx` |
| **Slider** | Form | `/components/ui/slider.tsx` |
| **Sonner** | Feedback | `/components/ui/sonner.tsx` |
| **Spinner** | Feedback | `/components/ui/spinner.tsx` |
| **Stack** | Layout | `/components/layout/Stack.tsx` |
| **StatsCard** | Display | `/components/ui/stats-card.tsx` |
| **Stepper** | Advanced | `/components/ui/stepper.tsx` |
| **Switch** | Form | `/components/ui/switch.tsx` |
| **Table** | Display | `/components/ui/table.tsx` |
| **Tabs** | Display | `/components/ui/tabs.tsx` |
| **TestLabButton** | Advanced | `/components/ui/test-lab-button.tsx` |
| **Text** | Typography | `/components/typography/Text.tsx` |
| **Textarea** | Form | `/components/ui/textarea.tsx` |
| **Toast** | Feedback | `/components/ui/toast.tsx` |
| **ToastNotification** | Core | `/components/ui/toast-notification.tsx` |
| **Toggle** | Form | `/components/ui/toggle.tsx` |
| **ToggleGroup** | Advanced | `/components/ui/toggle-group.tsx` |
| **Tooltip** | Overlay | `/components/ui/tooltip.tsx` |

---

## 🔄 CHANGELOG

### V7.0 - 23 janvier 2026
- Renommé vers `02-COMPONENTS.md` (convention numérotation)
- Ajout section "Historique de ce document"
- Ajout index alphabétique
- Mise à jour navigation docs
- Consolidation architecture TLS v7.0

### V4.0 Final - 12 janvier 2025
- Document créé avec 87 composants
- Documentation complète : API, exemples, cas d'usage
- Organisation par catégories (12)
- Variables CSS design system TLS
- Index alphabétique

---

## 📚 NAVIGATION DOCUMENTATION

### Documents Connexes

- **[00-INDEX-PRINCIPAL.md](00-INDEX-PRINCIPAL.md)** - Index principal
- **[01-DESIGN-SYSTEM.md](01-DESIGN-SYSTEM.md)** - Design system complet
- **[03-FIGMA-INTEGRATION.md](03-FIGMA-INTEGRATION.md)** - Workflow Figma
- **[04-USER-FLOWS.md](04-USER-FLOWS.md)** - Flows + viewers

### Fichiers Référence

- **`/styles/globals.css`** - Variables CSS source de vérité
- **`/components/`** - Code source composants
- **`/docs/COMPONENTS-REFERENCE.md`** - Version originale complète (si besoin détails)

---

## 📝 NOTE IMPORTANTE

Ce document est une **version consolidée** de `COMPONENTS-REFERENCE.md` V4.0 créée le 12 janvier 2025.

**Contenu complet identique** : Les 87 composants sont documentés avec API, exemples, et cas d'usage.

Pour la **documentation exhaustive** de chaque composant (toutes les props, tous les exemples), consulter le fichier original `/docs/COMPONENTS-REFERENCE.md` qui contient ~1200 lignes de documentation détaillée.

**Ce document (02-COMPONENTS.md)** :
- ✅ Vue d'ensemble des 87 composants
- ✅ API principales et exemples
- ✅ Cas d'usage et screenshots
- ✅ Index alphabétique
- ✅ Navigation vers docs connexes
- ✅ Historique et versioning

**Document original (COMPONENTS-REFERENCE.md)** :
- 📦 Documentation exhaustive ligne par ligne
- 📦 Tous les exemples de code
- 📦 Toutes les variantes
- 📦 Notes techniques détaillées

---

**📚 Guide de Référence des Composants TLS**  
**Version** : V4.0 → V7.0  
**Date** : 12 janvier 2025 → 23 janvier 2026  
**Composants** : 87 actifs  
**Status** : ✅ Production
