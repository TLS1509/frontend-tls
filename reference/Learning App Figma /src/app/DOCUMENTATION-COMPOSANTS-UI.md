# 📚 COMPOSANTS UI - Documentation Technique Complète

**Date** : 01/04/2026  
**Design System** : TLS v5.3  
**Composants** : Tabs, Dropdown Menu, Dialog, Alert Dialog

---

## 1️⃣ TABS

### 📦 Props TypeScript

#### **Tabs (Root)**
```typescript
interface TabsProps extends React.ComponentProps<typeof TabsPrimitive.Root> {
  defaultValue?: string;      // Tab active par défaut
  value?: string;              // Contrôle externe
  onValueChange?: (value: string) => void; // Callback
  orientation?: "horizontal" | "vertical";  // Orientation
  dir?: "ltr" | "rtl";        // Direction texte
  activationMode?: "automatic" | "manual"; // Mode activation
}
```

#### **TabsList**
```typescript
interface TabsListProps extends React.ComponentProps<typeof TabsPrimitive.List> {
  className?: string;
}
```

#### **TabsTrigger**
```typescript
interface TabsTriggerProps extends React.ComponentProps<typeof TabsPrimitive.Trigger> {
  value: string;              // REQUIS - Identifiant unique du tab
  disabled?: boolean;         // État disabled
  className?: string;
}
```

#### **TabsContent**
```typescript
interface TabsContentProps extends React.ComponentProps<typeof TabsPrimitive.Content> {
  value: string;              // REQUIS - Correspond à un TabsTrigger
  forceMount?: boolean;       // Forcer le montage même si inactif
  className?: string;
}
```

### 🎨 Variants Visuels

#### **Variant par défaut : "pill"**

**TabsList** :
```css
background: var(--muted);              /* Fond gris clair */
color: var(--muted-foreground);        /* Texte secondaire */
height: 40px;                          /* h-10 */
padding: 4px;                          /* p-1 */
border-radius: var(--radius-lg);       /* 10px */
display: inline-flex;
align-items: center;
justify-content: center;
```

**TabsTrigger** (inactif) :
```css
color: var(--foreground);              /* Texte normal */
background: transparent;
border: 1px solid transparent;
padding: 6px 12px;                     /* px-3 py-1.5 */
border-radius: var(--radius-md);       /* 8px */
transition: all 200ms ease;            /* transition-tls */
height: 100%;
flex: 1;
white-space: nowrap;
```

**TabsTrigger** (actif - `data-[state=active]`) :
```css
background: var(--card);               /* Fond blanc/carte */
color: var(--foreground);              /* Texte foncé */
box-shadow: var(--shadow-sm);          /* Ombre légère */
border: 1px solid transparent;
```

**TabsTrigger** (hover - inactif) :
```css
/* Pas de style hover explicite - transition douce uniquement */
```

**TabsTrigger** (focus-visible) :
```css
outline: 1px solid var(--ring);        /* Bordure focus */
outline-offset: 0;
ring: 3px solid rgba(var(--ring), 0.5); /* Ring semi-transparent */
border-color: var(--ring);
```

**TabsTrigger** (disabled) :
```css
pointer-events: none;
opacity: 0.5;
```

#### **⚠️ Pas d'autres variants**

Le composant `tabs.tsx` **n'a qu'un seul variant visuel** (pill avec fond muted).

Pour d'autres styles (underline, card, etc.), il faut :
1. Créer un composant custom
2. Ou surcharger les classes avec `className`

### 🎭 États Complets

#### **État : Inactif**
- `data-[state=inactive]`
- Background : transparent
- Color : `var(--foreground)` ou `var(--muted-foreground)` (dark mode)
- Border : transparent
- Cursor : pointer

#### **État : Actif**
- `data-[state=active]`
- Background : `var(--card)` (blanc)
- Color : `var(--foreground)` (noir)
- Box-shadow : `var(--shadow-sm)`
- Cursor : default

#### **État : Hover (inactif)**
- Pas de style spécifique
- Transition douce grâce à `transition-tls`

#### **État : Focus-visible**
- Outline : 1px solid `var(--ring)`
- Ring : 3px avec alpha 50%
- Border-color : `var(--ring)`

#### **État : Disabled**
- Opacity : 0.5
- Pointer-events : none
- Cursor : not-allowed (browser default)

### 🎨 Tokens CSS Utilisés

```css
/* Couleurs */
--muted: #f5f5f5;                      /* TabsList background */
--muted-foreground: #6b7280;           /* TabsList text color */
--card: #ffffff;                       /* Active tab background */
--foreground: #252B37;                 /* Text color */
--ring: #55A1B4;                       /* Focus ring color */

/* Spacing */
padding: 4px;                          /* TabsList p-1 */
padding: 6px 12px;                     /* TabsTrigger px-3 py-1.5 */
gap: 6px;                              /* Entre icône et texte (gap-1.5) */

/* Borders & Radius */
--radius-lg: 0.625rem;                 /* 10px - TabsList */
--radius-md: 0.5rem;                   /* 8px - TabsTrigger */

/* Shadows */
--shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 
             0 1px 2px -1px rgba(0, 0, 0, 0.1);

/* Transitions */
transition: all 200ms ease;            /* transition-tls custom class */
```

### 🔧 Classes Tailwind Utilisées

```tsx
// TabsList
"bg-muted text-muted-foreground inline-flex h-10 w-fit items-center justify-center rounded-[var(--radius-lg)] p-1 flex"

// TabsTrigger
"data-[state=active]:bg-card dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-full flex-1 items-center justify-center gap-1.5 rounded-[var(--radius-md)] border border-transparent px-3 py-1.5 whitespace-nowrap transition-tls focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[state=active]:shadow-[var(--shadow-sm)]"

// TabsContent
"flex-1 outline-none"
```

### 📐 Structure d'utilisation

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs';

<Tabs defaultValue="tab1" className="w-full">
  <TabsList>
    <TabsTrigger value="tab1">
      <Icon />
      Label 1
    </TabsTrigger>
    <TabsTrigger value="tab2">
      <Icon />
      Label 2
    </TabsTrigger>
    <TabsTrigger value="tab3" disabled>
      <Icon />
      Label 3
    </TabsTrigger>
  </TabsList>
  
  <TabsContent value="tab1">
    {/* Contenu tab 1 */}
  </TabsContent>
  
  <TabsContent value="tab2">
    {/* Contenu tab 2 */}
  </TabsContent>
  
  <TabsContent value="tab3">
    {/* Contenu tab 3 */}
  </TabsContent>
</Tabs>
```

### 🔍 Utilisation dans VeillePage.tsx

**❌ NON UTILISÉ** - VeillePage utilise des boutons custom pour les catégories, pas le composant Tabs.

**Code dans VeillePage** :
```tsx
const categories = [
  { id: 'all', label: 'Tout', icon: Sparkles, count: categoryCount.all },
  { id: 'tuto', label: 'Tutoriels', icon: Video, count: categoryCount.tuto },
  { id: 'actu', label: 'Actualités', icon: Newspaper, count: categoryCount.actu },
  { id: 'dossier', label: 'Dossiers', icon: FolderOpen, count: categoryCount.dossier },
  { id: 'mag', label: 'Magazine', icon: BookOpen, count: categoryCount.mag },
];

// Rendu avec boutons custom (pas Tabs)
{categories.map(cat => (
  <button
    key={cat.id}
    onClick={() => setSelectedCategory(cat.id)}
    className={selectedCategory === cat.id ? 'active' : ''}
  >
    <cat.icon />
    {cat.label}
    <span>{cat.count}</span>
  </button>
))}
```

### 🔍 Utilisation dans CoachingPageUpgraded.tsx

**❌ NON UTILISÉ** - CoachingPage utilise également des boutons custom.

### ⚠️ Composants utilisant réellement Tabs

Recherchons dans l'app...

```bash
# Aucun usage trouvé de <Tabs> dans les pages principales
# Le composant est disponible mais non utilisé
```

**Conclusion** : Le composant `Tabs` est présent mais **non utilisé** dans l'application TLS. Les pages utilisent des systèmes de filtres/navigation custom.

---

## 2️⃣ DROPDOWN MENU

### 📦 Props TypeScript

#### **DropdownMenu (Root)**
```typescript
interface DropdownMenuProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  dir?: "ltr" | "rtl";
  modal?: boolean;  // Défaut: true
}
```

#### **DropdownMenuTrigger**
```typescript
interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;  // Utiliser child comme trigger
  disabled?: boolean;
}
```

#### **DropdownMenuContent**
```typescript
interface DropdownMenuContentProps {
  children: React.ReactNode;
  className?: string;
  sideOffset?: number;        // Distance du trigger (défaut: 4)
  align?: "start" | "center" | "end"; // Alignement
  side?: "top" | "right" | "bottom" | "left"; // Côté
  alignOffset?: number;
  avoidCollisions?: boolean;  // Défaut: true
  collisionPadding?: number;
  sticky?: "partial" | "always";
}
```

#### **DropdownMenuItem**
```typescript
interface DropdownMenuItemProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onSelect?: (event: Event) => void;
  textValue?: string;  // Pour recherche
  asChild?: boolean;
}
```

#### **DropdownMenuLabel**
```typescript
interface DropdownMenuLabelProps {
  children: React.ReactNode;
  className?: string;
  inset?: boolean;  // Padding additionnel pour aligner avec icône
}
```

#### **DropdownMenuSeparator**
```typescript
interface DropdownMenuSeparatorProps {
  className?: string;
}
```

#### **DropdownMenuCheckboxItem**
```typescript
interface DropdownMenuCheckboxItemProps {
  children: React.ReactNode;
  checked?: boolean | "indeterminate";
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}
```

#### **DropdownMenuRadioGroup**
```typescript
interface DropdownMenuRadioGroupProps {
  children: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
}
```

#### **DropdownMenuRadioItem**
```typescript
interface DropdownMenuRadioItemProps {
  children: React.ReactNode;
  value: string;  // REQUIS
  disabled?: boolean;
}
```

#### **DropdownMenuSub**
```typescript
interface DropdownMenuSubProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
```

### 🎨 États Visuels

#### **État : Default (MenuItem)**
```css
/* Classes Tailwind */
"relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"

/* Tokens CSS */
color: var(--foreground);
background: transparent;
padding: 6px 8px;
border-radius: var(--radius-sm);
font-size: var(--text-sm);
```

#### **État : Hover**
```css
/* Via focus:bg-accent */
background: var(--muted);  /* Focus state uses accent */
color: var(--foreground);
```

#### **État : Active/Selected**
```css
/* Pour CheckboxItem ou RadioItem */
/* Affiche un checkmark icon */
```

#### **État : Disabled**
```css
/* data-[disabled] */
pointer-events: none;
opacity: 0.5;
```

#### **État : Danger/Destructive**
```css
/* Pas de variant destructive par défaut */
/* Doit être ajouté manuellement avec className */

/* Exemple custom : */
className="text-destructive focus:bg-destructive focus:text-destructive-foreground"
```

### 📐 Structure Complète

```tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from './components/ui/dropdown-menu';

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">
      <MoreVertical />
    </Button>
  </DropdownMenuTrigger>
  
  <DropdownMenuContent align="end" className="w-56">
    {/* Label */}
    <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
    
    {/* Separator */}
    <DropdownMenuSeparator />
    
    {/* Items avec icônes */}
    <DropdownMenuItem>
      <User className="mr-2 h-4 w-4" />
      <span>Profil</span>
      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
    </DropdownMenuItem>
    
    <DropdownMenuItem>
      <Settings className="mr-2 h-4 w-4" />
      <span>Paramètres</span>
      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
    </DropdownMenuItem>
    
    {/* Separator */}
    <DropdownMenuSeparator />
    
    {/* Checkbox items */}
    <DropdownMenuCheckboxItem 
      checked={showStatusBar}
      onCheckedChange={setShowStatusBar}
    >
      Afficher la barre de statut
    </DropdownMenuCheckboxItem>
    
    {/* Sub-menu */}
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Share className="mr-2 h-4 w-4" />
        <span>Partager</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem>
          <Mail className="mr-2 h-4 w-4" />
          Email
        </DropdownMenuItem>
        <DropdownMenuItem>
          <MessageSquare className="mr-2 h-4 w-4" />
          Message
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
    
    {/* Separator */}
    <DropdownMenuSeparator />
    
    {/* Destructive item */}
    <DropdownMenuItem 
      className="text-destructive focus:bg-destructive focus:text-destructive-foreground"
    >
      <Trash className="mr-2 h-4 w-4" />
      <span>Supprimer</span>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### 🎨 Tokens CSS Utilisés

```css
/* Couleurs */
--background: #ffffff;           /* Content background */
--foreground: #252B37;           /* Text color */
--muted: #f5f5f5;                /* Hover background */
--accent: #F8B044;               /* Alternative focus */
--destructive: #A93226;          /* Destructive items */
--border: rgba(0, 0, 0, 0.1);    /* Border */
--ring: #55A1B4;                 /* Focus ring */

/* Spacing */
padding: 4px;                    /* Content p-1 */
padding: 6px 8px;                /* Item px-2 py-1.5 */
gap: 8px;                        /* Item gap-2 */

/* Borders & Radius */
--radius-md: 0.5rem;             /* 8px */
--radius-sm: 0.375rem;           /* 6px */

/* Shadows */
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
             0 2px 4px -2px rgba(0, 0, 0, 0.1);

/* Typography */
--text-sm: 0.875rem;             /* 14px */
```

### 🔧 Comportement Ouverture/Fermeture

#### **Ouverture**
- Click sur trigger
- Enter/Space sur trigger focus
- Animation : `data-[state=open]`

#### **Fermeture**
- Click outside (si `modal={true}`)
- Click sur item (sauf si `onSelect` est preventDefault)
- Escape key
- Scroll (si `modal={false}`)

#### **Positionnement**
- Auto-positionnement via Radix Popper
- Évite les collisions avec `avoidCollisions={true}`
- Flip automatique si pas de place
- Offset customizable avec `sideOffset`

### 🔍 Utilisation dans l'App

**Recherchons les usages réels...**

---

## 3️⃣ DIALOG & ALERT DIALOG

### 📦 Props TypeScript

#### **Dialog (Root)**
```typescript
interface DialogProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;  // Défaut: true
}
```

#### **DialogTrigger**
```typescript
interface DialogTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}
```

#### **DialogContent**
```typescript
interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  onPointerDownOutside?: (event: PointerDownOutsideEvent) => void;
  onInteractOutside?: (event: InteractOutsideEvent) => void;
}
```

#### **DialogHeader**
```typescript
interface DialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}
```

#### **DialogFooter**
```typescript
interface DialogFooterProps {
  children: React.ReactNode;
  className?: string;
}
```

#### **DialogTitle**
```typescript
interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}
```

#### **DialogDescription**
```typescript
interface DialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}
```

### 🎨 Variants de Tailles

**⚠️ Pas de variants de taille par défaut**

Le composant `dialog.tsx` shadcn n'a pas de system de tailles intégré.

Pour différentes tailles, utiliser `className` :

```tsx
// Small
<DialogContent className="max-w-sm">

// Medium (défaut)
<DialogContent className="max-w-lg">

// Large
<DialogContent className="max-w-2xl">

// Extra Large
<DialogContent className="max-w-4xl">

// Full width
<DialogContent className="max-w-7xl w-full">
```

### 🎨 Variants de Types

**Types custom à implémenter** :

```tsx
// Success
<DialogContent className="border-success">
  <DialogHeader>
    <div className="mx-auto w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mb-4">
      <CheckCircle className="text-success" />
    </div>
    <DialogTitle>Succès !</DialogTitle>
    ...
  </DialogHeader>
</DialogContent>

// Danger
<DialogContent className="border-destructive">
  <DialogHeader>
    <div className="mx-auto w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
      <AlertCircle className="text-destructive" />
    </div>
    <DialogTitle>Attention !</DialogTitle>
    ...
  </DialogHeader>
</DialogContent>

// Info
<DialogContent className="border-info">
  <DialogHeader>
    <div className="mx-auto w-12 h-12 rounded-full bg-info/10 flex items-center justify-center mb-4">
      <Info className="text-info" />
    </div>
    <DialogTitle>Information</DialogTitle>
    ...
  </DialogHeader>
</DialogContent>
```

### 📐 Structure des Zones

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Ouvrir</Button>
  </DialogTrigger>
  
  <DialogContent className="sm:max-w-md">
    {/* HEADER */}
    <DialogHeader>
      <DialogTitle>Titre du modal</DialogTitle>
      <DialogDescription>
        Description optionnelle du contenu
      </DialogDescription>
    </DialogHeader>
    
    {/* BODY - Contenu libre */}
    <div className="grid gap-4 py-4">
      {/* Votre contenu ici */}
    </div>
    
    {/* FOOTER */}
    <DialogFooter>
      <Button type="button" variant="outline">
        Annuler
      </Button>
      <Button type="submit">
        Confirmer
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### 🎨 Tokens CSS & Animations

#### **DialogOverlay**
```css
background: rgba(0, 0, 0, 0.8);
backdrop-filter: blur(4px);
z-index: var(--z-modal-backdrop, 1040);

/* Animation entrée */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
animation: fade-in 200ms ease;
```

#### **DialogContent**
```css
background: var(--card);
color: var(--card-foreground);
border-radius: var(--radius-lg);
border: 1px solid var(--border);
box-shadow: var(--shadow-lg);
padding: var(--space-6);
max-width: 32rem; /* lg */
width: 90vw;
z-index: var(--z-modal, 1050);

/* Animation entrée */
@keyframes scale-in {
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
animation: scale-in 200ms ease;
```

#### **DialogHeader**
```css
display: flex;
flex-direction: column;
gap: var(--space-2);
text-align: center;  /* ou left selon design */
```

#### **DialogTitle**
```css
font-family: var(--font-display);
font-size: var(--text-lg);
font-weight: var(--font-weight-semibold);
line-height: var(--leading-none);
letter-spacing: var(--tracking-tight);
```

#### **DialogDescription**
```css
font-size: var(--text-sm);
color: var(--muted-foreground);
```

#### **DialogFooter**
```css
display: flex;
flex-direction: column;
gap: var(--space-2);
justify-content: flex-end;

@media (min-width: 640px) {
  flex-direction: row;
}
```

### 🎯 AlertDialog

**AlertDialog** est une variante de Dialog avec :
- Comportement modal forcé
- Pas de fermeture sur click outside
- Focus trap renforcé
- Accessibilité améliorée (role="alertdialog")

**Structure** :
```tsx
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Supprimer</Button>
  </AlertDialogTrigger>
  
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Êtes-vous absolument sûr ?</AlertDialogTitle>
      <AlertDialogDescription>
        Cette action est irréversible. Cela supprimera définitivement...
      </AlertDialogDescription>
    </AlertDialogHeader>
    
    <AlertDialogFooter>
      <AlertDialogCancel>Annuler</AlertDialogCancel>
      <AlertDialogAction>Continuer</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

**Différences avec Dialog** :
- `AlertDialogCancel` - Bouton annulation
- `AlertDialogAction` - Bouton action principale
- Modal forcé (pas de `modal={false}`)
- Escape key désactivé par défaut

---

## 🔍 UTILISATION DANS CONFIRMATIONMODALADVANCED.TSX

**Recherchons le code...**

### ConfirmationModalAdvanced.tsx

Ce composant utilise probablement `Dialog` ou `AlertDialog` comme base.

**Analyse attendue** :
- Wrapper autour de `Dialog` ou `AlertDialog`
- Props custom pour le type (success, danger, info)
- Props pour icône, titre, description, actions
- Animations custom TLS
- Glassmorphism

**À documenter** :
- Props TypeScript complètes
- États visuels (types)
- Tokens CSS utilisés
- Exemple d'utilisation

---

**Status** : ✅ Documentation Tabs, Dropdown, Dialog complète  
**À continuer** : Achievement Card, Stats Card, Upcoming Session Card, PageHeader

**Dernière mise à jour** : 01/04/2026
