# 📚 SIDEBAR / NAVIGATION - Documentation Complète

**Date** : 01/04/2026  
**Design System** : TLS v5.3  
**Composants** : `sidebar.tsx` + `optimized-sidebar.tsx`

---

## 🎯 RÉSUMÉ EXÉCUTIF

L'application utilise **DEUX** systèmes de sidebar :

1. **`sidebar.tsx`** - Composant shadcn/ui modulaire et composable (NON utilisé dans l'app)
2. **`optimized-sidebar.tsx`** ✅ - Sidebar TLS custom utilisée partout dans l'app

---

## 1️⃣ SIDEBAR.TSX (shadcn/ui) - NON UTILISÉ

### 📦 Props TypeScript

#### **SidebarProvider**
```typescript
interface SidebarProviderProps extends React.ComponentProps<"div"> {
  defaultOpen?: boolean;        // État initial (défaut: true)
  open?: boolean;               // Contrôle externe de l'état
  onOpenChange?: (open: boolean) => void; // Callback changement
}
```

#### **Sidebar**
```typescript
interface SidebarProps extends React.ComponentProps<"div"> {
  side?: "left" | "right";      // Côté d'affichage (défaut: "left")
  variant?: "sidebar" | "floating" | "inset"; // Style visuel
  collapsible?: "offcanvas" | "icon" | "none"; // Mode collapse
}
```

#### **SidebarMenuButton**
```typescript
interface SidebarMenuButtonProps extends React.ComponentProps<"button"> {
  asChild?: boolean;           // Utiliser Slot pour polymorphisme
  isActive?: boolean;          // État actif du menu item
  variant?: "default" | "outline"; // Style visuel
  size?: "default" | "sm" | "lg";  // Taille
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
}
```

### 🎨 États Collapsed/Expanded

#### **État : `expanded` (défaut)**
- Largeur : `16rem` (256px)
- Classes : `data-state="expanded"`
- Logo + texte visible
- Labels de navigation visibles
- Badges visibles

#### **État : `collapsed`**
- Largeur : `3rem` (48px)
- Classes : `data-state="collapsed"` + `data-collapsible="icon"`
- Icônes uniquement
- Tooltips automatiques au hover
- Badges cachés
- Labels cachés avec `group-data-[collapsible=icon]:hidden`

### 📱 Comportement Responsive

#### **Desktop (≥ 768px)**
- Sidebar fixe à gauche
- Mode `collapsible="icon"` : Réduit à 48px avec icônes
- Mode `collapsible="offcanvas"` : Sort complètement de l'écran
- Transition : `transition-[width] duration-200 ease-linear`

#### **Mobile (< 768px)**
- Utilise `Sheet` (drawer) de shadcn/ui
- Largeur : `18rem` (288px)
- Slide depuis le côté avec overlay backdrop
- Fermeture automatique après navigation

### 🔧 Tokens CSS Utilisés

```css
/* Custom Properties */
--sidebar-width: 16rem;
--sidebar-width-icon: 3rem;
--sidebar-width-mobile: 18rem;

/* Couleurs */
--sidebar: var(--background);
--sidebar-foreground: var(--foreground);
--sidebar-primary: var(--primary);
--sidebar-primary-foreground: var(--primary-foreground);
--sidebar-accent: var(--muted);
--sidebar-accent-foreground: var(--foreground);
--sidebar-border: var(--border);
--sidebar-ring: var(--ring);
```

### 📐 Structure des Items

```tsx
<SidebarProvider>
  <Sidebar>
    <SidebarHeader>
      {/* Logo, search, etc. */}
    </SidebarHeader>
    
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={true}>
                <Icon />
                <span>Label</span>
              </SidebarMenuButton>
              <SidebarMenuBadge>3</SidebarMenuBadge>
              
              {/* Sous-menu */}
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton>
                    Sub Item
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    
    <SidebarFooter>
      {/* User profile, settings */}
    </SidebarFooter>
  </Sidebar>
  
  <SidebarInset>
    {/* Main content */}
  </SidebarInset>
</SidebarProvider>
```

### 🎨 Classes Tailwind (variants)

```typescript
// SidebarMenuButton variants
sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
      },
    },
  }
);
```

---

## 2️⃣ OPTIMIZED-SIDEBAR.TSX ✅ - UTILISÉ DANS L'APP

### 📦 Props TypeScript Complètes

```typescript
interface OptimizedSidebarProps {
  // Navigation
  currentPage: 'dashboard' | 'parcours' | 'coaching' | 'journal' | 
               'veille' | 'entreprise-dashboard' | 
               'profile' | 'account' | 'messages' | 'notifications' | 'leaderboard';
  
  onNavigate: (page: string) => void;
  onLogout?: () => void;
  
  // User
  userName?: string;                    // Défaut: 'Admin1509'
  userEmail?: string;                   // Défaut: 'padennery@me.com'
  userInitials?: string;                // Défaut: 'A'
  userHasEnterpriseAccess?: boolean;    // Défaut: false
  
  // Notifications
  notifications?: Notification[];       // Défaut: []
  unreadMessagesCount?: number;         // Défaut: 0
  onMarkNotificationAsRead?: (id: string) => void;
  onMarkAllNotificationsAsRead?: () => void;
  onDeleteNotification?: (id: string) => void;
  
  // Modes d'affichage
  isViewerMode?: boolean;               // Défaut: false - Mode ultra minimal
  notificationDisplayMode?: 'avatar' | 'header' | 'logo'; // Défaut: 'avatar'
}
```

### 🎨 États Collapsed/Expanded

#### **État : `expanded` (largeur 320px)**

**Visuel** :
- Largeur : `w-80` (320px)
- Logo + texte "The Learning Society"
- Labels de navigation visibles
- Avatar utilisateur avec nom + email
- Dropdown menu complet

**Classes CSS** :
```css
width: 20rem; /* 320px */
background: rgba(255, 255, 255, 0.7);
backdrop-filter: blur(20px);
border-color: rgba(255, 255, 255, 0.3);
box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.04), 0 1px 0 0 rgba(255, 255, 255, 0.4) inset;
```

**Tokens CSS** :
```css
font-family: var(--font-display); /* Logo */
font-family: var(--font-body);    /* Navigation */
font-weight: var(--font-weight-bold);
font-weight: var(--font-weight-medium);
font-size: var(--text-xl);   /* Logo title */
font-size: var(--text-base); /* Nav items */
color: var(--primary);        /* Logo color */
color: var(--foreground);     /* Nav text */
background: var(--gradient-primary); /* Active state */
box-shadow: var(--shadow-md);
```

#### **État : `collapsed` (largeur 96px - défaut desktop)**

**Visuel** :
- Largeur : `lg:w-24` (96px)
- Logo icône uniquement (Sparkles)
- Icônes de navigation uniquement
- Avatar icône uniquement
- Tooltips au hover
- Effet "floating" avec glassmorphism renforcé
- Click pour expand

**Classes CSS** :
```css
width: 6rem; /* 96px */
background: rgba(255, 255, 255, 0.4); /* Plus transparent */
backdrop-filter: blur(20px);
border-color: rgba(255, 255, 255, 0.2); /* Border plus subtile */
box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.08), 0 1px 0 0 rgba(255, 255, 255, 0.3) inset;
cursor: pointer; /* Click to expand */
```

**Tokens CSS** :
```css
/* Mêmes tokens que expanded mais éléments texte cachés avec lg:hidden */
```

**Comportement Expand** :
```tsx
onClick={() => {
  if (isCollapsed && window.innerWidth >= 1024) {
    setIsCollapsed(false);
  }}
}
```

**Bouton Expand** :
- Position : `absolute -right-3 top-1/2`
- Style : Bouton circulaire avec gradient primary
- Icône : `<ChevronRight />`

### 📐 Structure des Items de Navigation

```typescript
const navItems = [
  { 
    icon: Home, 
    label: 'Tableau de bord', 
    page: 'dashboard' as const,
  },
  { 
    icon: Map, 
    label: 'Parcours', 
    page: 'parcours' as const,
  },
  { 
    icon: Pen, 
    label: 'Journal de bord', 
    page: 'journal' as const,
  },
  { 
    icon: Users, 
    label: 'Coaching', 
    page: 'coaching' as const,
  },
  { 
    icon: Sparkles, 
    label: 'Veille', 
    page: 'veille' as const,
  },
];
```

**Structure d'un item** :
- ✅ Label (texte)
- ✅ Icône (Lucide React)
- ❌ Badge (non implémenté)
- ❌ Sous-items (non implémenté)

### 📱 Comportement Responsive Complet

#### **Desktop (≥ 1024px)**

**État par défaut** : `collapsed` (96px)
- Logo icône uniquement
- Navigation icônes uniquement
- Click sur sidebar → expand temporaire
- Bouton collapse/expand visible
- Sauvegarde état dans `localStorage`

**Transitions** :
```css
transition: all 300ms ease-out;
width: collapsed ? 96px : 320px;
background: collapsed ? rgba(255,255,255,0.4) : rgba(255,255,255,0.7);
```

#### **Tablet (768px - 1023px)**

**Comportement** : Drawer mobile
- Bouton menu hamburger fixe top-left
- Sidebar complète en overlay
- Fermeture automatique après navigation
- Backdrop blur

#### **Mobile (< 768px)**

**Comportement** : Drawer mobile pleine largeur
- Bouton menu hamburger fixe top-left `z-[100]`
- Sidebar 320px en overlay avec slide animation
- Backdrop blur + dark overlay 50%
- Logo complet visible
- Navigation complète
- Avatar + dropdown

**Classes** :
```tsx
className={`
  fixed lg:relative
  inset-y-0 left-0
  z-40
  transition-all duration-300 ease-out
  ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
  ${isCollapsed ? 'lg:w-24' : 'lg:w-80'}
  w-80
`}
```

### 🎨 Tous les Tokens CSS Utilisés

#### **Couleurs**
```css
/* Backgrounds */
background: var(--gradient-primary);       /* Logo, active items */
background: rgba(255, 255, 255, 0.7);      /* Sidebar expanded */
background: rgba(255, 255, 255, 0.4);      /* Sidebar collapsed */
background: rgba(85, 161, 180, 0.08);      /* Hover items */

/* Text */
color: var(--primary);                     /* Logo text */
color: var(--foreground);                  /* Nav items text */
color: var(--muted-foreground);            /* User email */
color: var(--secondary);                   /* Notification badge */

/* Borders */
border-color: rgba(255, 255, 255, 0.3);    /* Expanded */
border-color: rgba(255, 255, 255, 0.2);    /* Collapsed */
```

#### **Typographie**
```css
font-family: var(--font-display);          /* Logo, headings */
font-family: var(--font-body);             /* Nav items, user info */

font-size: var(--text-xl);                 /* Logo title (20px) */
font-size: var(--text-base);               /* Nav items (16px) */
font-size: var(--text-sm);                 /* User email (14px) */
font-size: var(--text-xs);                 /* Badge count (12px) */

font-weight: var(--font-weight-bold);      /* Logo, user initials */
font-weight: var(--font-weight-semibold);  /* User name */
font-weight: var(--font-weight-medium);    /* Nav items */
```

#### **Spacing**
```css
/* Padding */
padding: var(--space-6);                   /* Header/Footer expanded (24px) */
padding: var(--space-4);                   /* Header/Footer collapsed (16px) */
gap: var(--space-4);                       /* Nav items gap (16px) */

/* Margin (inline styles) */
/* App utilise principalement gap et padding */
```

#### **Shadows**
```css
box-shadow: var(--shadow-md);              /* Active nav item */
box-shadow: 0 8px 24px rgba(85, 161, 180, 0.4); /* Logo glow */
box-shadow: 0 4px 12px rgba(85, 161, 180, 0.3); /* Avatar glow */
box-shadow: 0 2px 8px rgba(237, 132, 58, 0.4);  /* Notification badge */
```

#### **Radius**
```css
/* App utilise hardcoded radius en px, pas les tokens */
border-radius: 24px;  /* Logo */
border-radius: 32px;  /* Nav items */
border-radius: 16px;  /* Boutons secondaires */
```

### 🔔 Modes d'affichage des notifications

#### **Mode 1 : `avatar` (défaut)**
Badge sur l'avatar utilisateur dans le footer
- Position : Sur l'avatar en bas de sidebar
- Badge orange avec count
- Visible : expanded + collapsed

#### **Mode 2 : `header`**
Bell icon dans le header
- Position : Header à côté du logo
- Component : `<NotificationDropdown />`
- Visible : uniquement expanded

#### **Mode 3 : `logo`**
Badge sur le logo
- Position : Sur le logo TLS en haut
- Badge orange avec count
- Visible : expanded + collapsed

### 🎯 Mode Viewer (isViewerMode)

**Usage** : Pour les pages de contenu (Lesson Viewer, Video Viewer, etc.)

**Comportement** :
- Desktop : Logo uniquement (20px largeur)
- Mobile : Drawer avec navigation complète
- Ultra-minimaliste
- Pas de collapse/expand
- Click logo → retour dashboard

**Structure** :
```tsx
if (isViewerMode) {
  return (
    <aside className="w-20 px-4">
      <Logo />
      {/* Mobile drawer si mobileMenuOpen */}
    </aside>
  );
}
```

---

## 3️⃣ UTILISATION DANS DASHBOARDPAGEUPGRADED.TSX

Recherchons comment la sidebar est instanciée :

### Code d'instanciation

```typescript
// Dans DashboardPageUpgraded.tsx
import OptimizedSidebar from '../components/ui/optimized-sidebar';

// Utilisation
<div className="flex min-h-screen">
  <OptimizedSidebar
    currentPage="dashboard"
    onNavigate={onNavigate}
    onLogout={onLogout}
    userName="Admin1509"
    userEmail="padennery@me.com"
    userInitials="A"
    notifications={mockNotifications}
    unreadMessagesCount={3}
    onMarkNotificationAsRead={handleMarkAsRead}
    onMarkAllNotificationsAsRead={handleMarkAllAsRead}
    onDeleteNotification={handleDeleteNotification}
    notificationDisplayMode="avatar"
  />
  
  <main className="flex-1">
    {/* Page content */}
  </main>
</div>
```

---

## 📊 COMPARAISON DES DEUX SIDEBARS

| Feature | sidebar.tsx (shadcn) | optimized-sidebar.tsx (TLS) |
|---------|---------------------|---------------------------|
| **Utilisé dans l'app** | ❌ Non | ✅ Oui |
| **Architecture** | Composable (14 composants) | Monolithique (1 composant) |
| **Collapsed width** | 48px (icon) | 96px |
| **Expanded width** | 256px | 320px |
| **Mobile** | Sheet drawer | Custom drawer |
| **Sub-menus** | ✅ Oui | ❌ Non |
| **Badges** | ✅ Component dédié | ⚠️ Manuel (notifications) |
| **Tooltips** | ✅ Auto en collapsed | ❌ title attribute |
| **Variants** | 3 (sidebar/floating/inset) | 1 (fixed) |
| **Glassmorphism** | ❌ Non | ✅ Oui |
| **Gradient effects** | ❌ Non | ✅ Oui |
| **LocalStorage** | ✅ Cookie | ✅ localStorage |
| **Keyboard shortcut** | ✅ Cmd/Ctrl + B | ❌ Non |
| **État par défaut** | Expanded | Collapsed |

---

## 🎨 DESIGN PATTERNS TLS

### Glassmorphism Effect

```css
background: rgba(255, 255, 255, 0.7);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.3);
box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.04), 
            0 1px 0 0 rgba(255, 255, 255, 0.4) inset;
```

### Active State Gradient

```css
background: var(--gradient-primary);
box-shadow: var(--shadow-md);
color: white;
```

### Hover State

```tsx
onMouseEnter={(e) => {
  e.currentTarget.style.background = 'rgba(85, 161, 180, 0.08)';
  e.currentTarget.style.transform = 'translateX(4px)';
}}
onMouseLeave={(e) => {
  e.currentTarget.style.background = 'transparent';
  e.currentTarget.style.transform = 'translateX(0)';
}}
```

---

## ⚠️ POINTS D'ATTENTION

### 1. **Utilisation de hardcoded values**
❌ Problème : `border-radius: 24px` au lieu de `var(--radius-2xl)`  
✅ Solution : Remplacer par tokens CSS

### 2. **Pas de sub-menus**
❌ Limitation : Navigation plate uniquement  
✅ Solution possible : Implémenter accordion pour sous-sections

### 3. **Badges non génériques**
❌ Limitation : Badges uniquement pour notifications  
✅ Solution : Ajouter prop `badge?: number` sur navItems

### 4. **Pas de keyboard shortcut**
❌ Manque : Pas de Cmd/Ctrl + B pour toggle  
✅ Solution : Implémenter useEffect avec keyboard listener

---

## 📝 RECOMMANDATIONS

### 1. **Migrer vers tokens CSS**
Remplacer tous les hardcoded `24px`, `32px` par :
```tsx
style={{
  borderRadius: 'var(--radius-2xl)',
  padding: 'var(--space-6)',
}}
```

### 2. **Ajouter support badges génériques**
```typescript
interface NavItem {
  icon: LucideIcon;
  label: string;
  page: string;
  badge?: number | string; // Nouveau
}
```

### 3. **Implémenter keyboard shortcut**
```tsx
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
      e.preventDefault();
      setIsCollapsed(!isCollapsed);
    }
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [isCollapsed]);
```

### 4. **Extraire en composants**
Créer `SidebarNavItem`, `SidebarLogo`, `SidebarUser` pour meilleure maintenabilité

---

**Dernière mise à jour** : 01/04/2026  
**Design System** : TLS v5.3  
**Status** : ✅ **Documentation complète**
