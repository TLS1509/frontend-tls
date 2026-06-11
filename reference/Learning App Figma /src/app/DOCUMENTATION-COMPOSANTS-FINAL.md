# 📚 COMPOSANTS FINAUX - Documentation Technique Complète

**Date** : 01/04/2026  
**Design System** : TLS v5.3  
**Composants** : UpcomingSessionCard, PageHeaderFinal, PageHeaderSimple, ConfirmationModalAdvanced

---

## 1️⃣ UPCOMING SESSION CARD (Composant Coaching)

### 📦 Props TypeScript

```typescript
interface UpcomingSessionCardProps {
  session: {
    date: string;                    // REQUIS - Format ISO ou Date string
    time: string;                    // REQUIS - Heure (ex: "14:00")
    duration: string;                // REQUIS - Durée (ex: "60 min")
    title: string;                   // REQUIS - Titre de la session
    meetingLink: string;             // REQUIS - URL de la visio
    questionnaireId?: number;        // Optionnel - ID questionnaire de préparation
  };
  coachName: string;                 // REQUIS - Nom du coach
  onReschedule: () => void;          // REQUIS - Callback replanifier
  onCancel: () => void;              // REQUIS - Callback annuler
  onPrepare: () => void;             // REQUIS - Callback préparer
}
```

### 🎨 États du Composant

#### **État : Upcoming (À venir)**

**Visuel par défaut** :
- Glassmorphism background
- Gradient overlay radial subtil
- Toutes les actions visibles et actives
- Meta info complète (date, heure, durée, coach)
- 2 boutons CTA : "Préparer" (bleu) + "Rejoindre" (orange)
- 2 actions secondaires : Replanifier + Annuler (top-right)

**Tokens CSS** :
```css
/* Card container */
background: rgba(255, 255, 255, 0.7);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.5);
border-radius: var(--radius-3xl);  /* 24px */
padding: var(--card-padding-y) var(--card-padding-x);
box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.08), 
            inset 0 1px 0 0 rgba(255, 255, 255, 0.9);

/* Gradient overlay */
background: radial-gradient(circle at 50% 0%, rgba(85, 161, 180, 0.15) 0%, transparent 70%);
opacity: 0.2;
```

#### **État : Today (Aujourd'hui)**

**⚠️ Pas d'état spécifique "today"**

Le composant ne change pas visuellement selon la date. Pour implémenter :

```typescript
// Ajout possible
const isToday = new Date(session.date).toDateString() === new Date().toDateString();

// Style conditionnel
border: isToday ? '2px solid var(--accent)' : '1px solid rgba(255, 255, 255, 0.5)',
```

#### **État : In-Progress (En cours)**

**⚠️ Pas d'état "in-progress"**

Pour implémenter, comparer heure actuelle avec session.time.

#### **État : Completed (Terminée)**

**⚠️ Pas d'état "completed"**

Ce composant affiche uniquement les sessions à venir.

#### **État : Cancelled (Annulée)**

**⚠️ Pas d'état "cancelled"**

Après annulation, la card est probablement retirée de la liste.

### 📐 Structure Visuelle Complète

```
┌──────────────────────────────────────────────────────────┐
│ Session de Coaching                  [📅] [🗑️]    ← Header + Actions
│                                                          │
│ 📅 Lun. 15 mars • ⏰ 14:00 • 60 min • 👤 Sophie Martin │ ← Meta info
│                                                          │
│ [📋 Préparer ma session] [▶️ Rejoindre la session]     │ ← CTAs
└──────────────────────────────────────────────────────────┘

Dimensions:
- Padding: var(--card-padding-y) var(--card-padding-x)
- Border-radius: var(--radius-3xl) (24px)
- Gap entre éléments: 8-16px
```

### 🔧 Éléments Visuels Détaillés

#### **Header**

```tsx
<div className="flex items-start justify-between gap-4 mb-2">
  {/* Title */}
  <h3 style={{
    fontSize: 'var(--text-xl)',
    fontWeight: 'var(--font-weight-bold)',
    color: 'var(--foreground)',
    fontFamily: 'var(--font-display)',
    marginBottom: '4px',
  }}>
    {session.title}
  </h3>
  
  {/* Action Icons */}
  <div className="flex items-center gap-2">
    <button onClick={onReschedule}>
      <CalendarClock />
      {/* Tooltip: Replanifier */}
    </button>
    <button onClick={onCancel}>
      <Trash2 />
      {/* Tooltip: Annuler */}
    </button>
  </div>
</div>
```

**Title** :
```css
font-family: var(--font-display);
font-size: var(--text-xl);         /* 20px */
font-weight: var(--font-weight-bold);
color: var(--foreground);
```

**Action Icons** :
```css
/* Default state */
background: rgba(0, 0, 0, 0.05);
border-radius: var(--radius-lg);   /* 10px */
color: var(--muted-foreground);
padding: 8px;
width: auto;
height: auto;

/* Hover - Replanifier */
background: var(--primary);
color: white;

/* Hover - Annuler */
background: var(--destructive);
color: white;
```

**Tooltip** :
```css
background: rgba(255, 255, 255, 0.95);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.3);
border-radius: var(--radius-lg);
padding: 8px 12px;
font-size: var(--text-xs);
font-family: var(--font-body);
font-weight: var(--font-weight-medium);
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
opacity: 0;                        /* group-hover:opacity-100 */
transition: opacity 200ms ease;
white-space: nowrap;
z-index: 20;
```

#### **Meta Info**

```tsx
<div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4">
  {/* Date */}
  <div className="flex items-center gap-1.5">
    <Calendar className="w-4 h-4" />
    <span>Lun. 15 mars</span>
  </div>
  
  <span>•</span>  {/* Separator */}
  
  {/* Time */}
  <div className="flex items-center gap-1.5">
    <Clock className="w-4 h-4" />
    <span>14:00</span>
  </div>
  
  <span>•</span>
  
  {/* Duration */}
  <span>60 min</span>
  
  <span>•</span>
  
  {/* Coach */}
  <div className="flex items-center gap-1.5">
    <User className="w-4 h-4" />
    <span>Sophie Martin</span>
  </div>
</div>
```

**Styles** :
```css
/* Container */
display: flex;
flex-wrap: wrap;
align-items: center;
gap: 12px 12px;                   /* gap-x-3 gap-y-1 */
margin-bottom: 16px;

/* Icons */
width: 16px;
height: 16px;
color: var(--muted-foreground);

/* Text */
font-size: var(--text-sm);        /* 14px */
font-family: var(--font-body);
color: var(--muted-foreground);

/* Separator • */
color: var(--muted-foreground);
font-size: var(--text-sm);
opacity: 0.4;
```

#### **Primary Actions (CTA Buttons)**

**Bouton "Préparer"** (Bleu) :
```tsx
<button onClick={onPrepare} className="...">
  <ClipboardList className="w-4 h-4" />
  Préparer ma session
</button>
```

```css
/* Default state */
display: inline-flex;
align-items: center;
gap: 8px;
padding: 8px 16px;
background: var(--primary-lighter);
color: var(--primary);
border: none;
border-radius: var(--radius-full);
font-size: var(--text-sm);
font-weight: var(--font-weight-semibold);
font-family: var(--font-body);
cursor: pointer;
transition: all 200ms ease;

/* Hover state */
background: var(--primary);
color: white;
transform: translateY(-1px);
```

**Bouton "Rejoindre"** (Orange/Warm) :
```tsx
<a href={session.meetingLink} target="_blank" rel="noopener noreferrer">
  <Video className="w-4 h-4" />
  Rejoindre la session
</a>
```

```css
/* Default state */
display: inline-flex;
align-items: center;
gap: 8px;
padding: 8px 16px;
background: var(--gradient-warm);
color: white;
border: none;
border-radius: var(--radius-full);
font-size: var(--text-sm);
font-weight: var(--font-weight-semibold);
font-family: var(--font-body);
text-decoration: none;
box-shadow: 0 2px 8px rgba(237, 132, 58, 0.25);
transition: all 200ms ease;

/* Hover state */
transform: translateY(-1px);
box-shadow: 0 4px 12px rgba(237, 132, 58, 0.35);
```

### 🎨 Tous les Tokens CSS Utilisés

#### **Couleurs**
```css
/* Card */
background: rgba(255, 255, 255, 0.7);
border-color: rgba(255, 255, 255, 0.5);

/* Text */
--foreground: #252B37;
--muted-foreground: #6b7280;

/* Actions */
--primary: #55A1B4;
--primary-lighter: #E5F1F4;
--destructive: #A93226;

/* Gradient */
--gradient-warm: linear-gradient(135deg, var(--secondary), var(--accent));
```

#### **Typographie**
```css
/* Title */
font-family: var(--font-display);
font-size: var(--text-xl);
font-weight: var(--font-weight-bold);

/* Meta info */
font-family: var(--font-body);
font-size: var(--text-sm);
font-weight: var(--font-weight-medium);

/* Buttons */
font-family: var(--font-body);
font-size: var(--text-sm);
font-weight: var(--font-weight-semibold);

/* Tooltip */
font-family: var(--font-body);
font-size: var(--text-xs);
font-weight: var(--font-weight-medium);
```

#### **Spacing**
```css
padding: var(--card-padding-y) var(--card-padding-x);
gap: var(--space-2), var(--space-3), var(--space-4);
margin-bottom: var(--space-2), var(--space-4), var(--space-6);
```

#### **Borders & Radius**
```css
border-radius: var(--radius-3xl);  /* Card: 24px */
border-radius: var(--radius-lg);   /* Actions: 10px */
border-radius: var(--radius-full); /* Buttons, tooltip close */
```

#### **Effects**
```css
/* Glassmorphism */
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);

/* Shadows */
box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.08), 
            inset 0 1px 0 0 rgba(255, 255, 255, 0.9);
box-shadow: 0 2px 8px rgba(237, 132, 58, 0.25);  /* Button */
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);      /* Tooltip */
```

#### **Transitions**
```css
transition: all 200ms ease;        /* Buttons, tooltips */
```

### 🔍 Utilisation dans l'App

#### **CoachingPageUpgraded.tsx**
```tsx
<UpcomingSessionCard
  session={{
    date: '2026-03-15',
    time: '14:00',
    duration: '60 min',
    title: 'Session de Coaching',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    questionnaireId: 1,
  }}
  coachName="Sophie Martin"
  onReschedule={() => setShowRescheduleModal(true)}
  onCancel={() => setShowCancelModal(true)}
  onPrepare={() => onNavigate('pre-coaching-questionnaire')}
/>
```

#### **DashboardPageUpgraded.tsx**
```tsx
{upcomingSessions.length > 0 && (
  <UpcomingSessionCard
    session={upcomingSessions[0]}
    coachName={upcomingSessions[0].coachName}
    onReschedule={handleReschedule}
    onCancel={handleCancelSession}
    onPrepare={() => onNavigate('coaching')}
  />
)}
```

### ⚠️ Améliorations Possibles

1. **Ajouter états conditionnels** :
   - `isToday` - Border accent jaune
   - `startsIn` - Badge "Dans 30 min"
   - `isPast` - Disabled state

2. **Avatar du coach** :
   - Ajouter photo à côté du nom

3. **Badge questionnaire** :
   - Si `questionnaireId` présent, afficher "Questionnaire à compléter"

4. **Responsive improvements** :
   - Stack buttons en mobile
   - Réduire meta info en mobile

---

## 2️⃣ PAGE HEADER FINAL

### 📦 Props TypeScript

```typescript
interface PageHeaderProps {
  icon: LucideIcon;                  // REQUIS - Icône Lucide
  title: string;                     // REQUIS - Titre de la page
  description: string;               // REQUIS - Description
  actions?: ReactNode;               // Optionnel - Boutons d'action
  iconColor?: string;                // Défaut: 'var(--primary)'
  iconGradientFrom?: string;         // Défaut: 'var(--primary-lighter)'
  iconGradientTo?: string;           // Défaut: 'var(--accent-lighter)'
}
```

### 🎨 5 Propositions de Layout

Le fichier contient **5 variantes** de PageHeader avec des hiérarchies visuelles différentes.

#### **PageHeader1 - Icon + Bloc texte compact**

**Layout** :
```
┌────────────────────────────────────────────────────┐
│ [ICON] TITRE (3xl)                      [ACTIONS] │
│        Description (sm)                            │
└────────────────────────────────────────────────────┘
```

**Specs** :
- Icon : 48x48px, gradient background
- Titre : `text-3xl` (30px), bold, display font
- Description : `text-sm` (14px), `neutral-700`
- Spacing titre-desc : `space-1` (4px) - **minimal**
- Border bottom : Oui
- Gap icon-texte : `space-4` (16px)

**Tokens CSS** :
```css
/* Container */
display: flex;
align-items: flex-start;
justify-content: space-between;
gap: var(--space-4);
margin-bottom: var(--space-5);
padding-bottom: var(--space-4);
border-bottom: 1px solid var(--border);

/* Icon */
width: 48px;
height: 48px;
border-radius: var(--radius-lg);
background: linear-gradient(135deg, ${iconGradientFrom} 0%, ${iconGradientTo} 100%);
border: 1px solid rgba(255, 255, 255, 0.5);
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

/* Title */
font-family: var(--font-display);
font-size: var(--text-3xl);
font-weight: var(--font-weight-bold);
color: var(--foreground);
line-height: var(--leading-tight);
margin-bottom: var(--space-1);

/* Description */
font-family: var(--font-body);
font-size: var(--text-sm);
font-weight: var(--font-weight-medium);
color: var(--neutral-700);
line-height: var(--leading-normal);
```

#### **PageHeader2 - Icon inline + Texte stack serré**

**Layout** :
```
┌────────────────────────────────────────────────────┐
│ [ICON] TITRE (2xl)                      [ACTIONS] │
│        Description (base)                          │
└────────────────────────────────────────────────────┘
```

**Specs** :
- Icon : **40x40px** (plus petit), `radius-md`
- Titre : `text-2xl` (24px)
- Description : `text-base` (16px), `foreground` (pas neutral)
- Gap icon-texte : `space-3` (12px)
- Border bottom : Oui

**Différences vs Header1** :
- Icon plus petit
- Titre plus petit
- Description plus grande et plus visible
- Plus compact globalement

#### **PageHeader3 - Vertical badge + Titre XXL**

**Layout** :
```
┌────────────────────────────────────────────────────┐
│ [ICON]                                             │
│                                                    │
│ TITRE (4xl)                             [ACTIONS] │
│                                                    │
│ Description (base)                                 │
└────────────────────────────────────────────────────┘
```

**Specs** :
- Icon : 44x44px, **au-dessus** du titre
- Titre : `text-4xl` (36px) - **Le plus grand**
- Description : `text-base` (16px), max-width 700px
- Spacing icon-titre : `space-2` (8px)
- Spacing titre-desc : `space-2` (8px)
- Border bottom : Oui

**Usage** :
Pages importantes, pages d'accueil de section

#### **PageHeader4 - Icon + Titre inline, Desc alignée**

**Layout** :
```
┌────────────────────────────────────────────────────┐
│ [ICON] TITRE (3xl)                      [ACTIONS] │
│        Description (sm)                            │
└────────────────────────────────────────────────────┘
```

**Specs** :
- Icon : **52x52px** (le plus grand)
- Titre : `text-3xl` inline avec icon
- Description : Alignée sous le titre (margin-left calculé)
- Spacing minimal

**Particularité** :
```typescript
const iconSize = 52;
const iconGap = 16;

// Description alignée
marginLeft: `${iconSize + iconGap}px`  // 68px
```

#### **PageHeader5 - Minimaliste ultra-compact**

**Layout** :
```
┌────────────────────────────────────────────────────┐
│ [ICON] TITRE (2xl)                      [ACTIONS] │
│        Description (xs)                            │
└────────────────────────────────────────────────────┘
```

**Specs** :
- Icon : **36x36px** (le plus petit), `radius-md`
- Titre : `text-2xl` (24px)
- Description : `text-xs` (12px), `neutral-700`
- Spacing : `2px` entre titre et desc
- Gap icon-texte : `space-3` (12px)
- Border bottom : Oui

**Usage** :
Pages secondaires, modals, drawers

### 📊 Tableau Comparatif

| Variant | Icon Size | Title Size | Desc Size | Spacing | Usage |
|---------|-----------|------------|-----------|---------|-------|
| **Header1** | 48px | 3xl (30px) | sm (14px) | Minimal | Standard |
| **Header2** | 40px | 2xl (24px) | base (16px) | Compact | Balanced |
| **Header3** | 44px | 4xl (36px) | base (16px) | Vertical | Hero |
| **Header4** | 52px | 3xl (30px) | sm (14px) | Aligned | Feature |
| **Header5** | 36px | 2xl (24px) | xs (12px) | Ultra compact | Secondary |

### 🔍 Variations Observées dans l'App

#### **Parcours** - PageHeader3 (Hero)
```tsx
<PageHeader3
  icon={Map}
  title="Mes Parcours"
  description="Explorez vos parcours d'apprentissage personnalisés"
  actions={<Button>Créer un parcours</Button>}
  iconGradientFrom="var(--primary-lighter)"
  iconGradientTo="var(--accent-lighter)"
/>
```

#### **Coaching** - PageHeader1 (Standard)
```tsx
<PageHeader1
  icon={Users}
  title="Coaching"
  description="Réservez et gérez vos sessions de coaching"
  actions={<Button>Nouvelle session</Button>}
/>
```

#### **Veille** - PageHeader2 (Balanced)
```tsx
<PageHeader2
  icon={Sparkles}
  title="Veille"
  description="Découvrez les dernières ressources et actualités"
/>
```

#### **Journal** - PageHeader1 (Standard)
```tsx
<PageHeader1
  icon={Pen}
  title="Journal de bord"
  description="Réflexions et apprentissages personnels"
  actions={<Button>Nouvelle entrée</Button>}
/>
```

---

## 3️⃣ PAGE HEADER SIMPLE

### 📦 Props TypeScript

```typescript
interface PageHeaderSimpleProps {
  title: string;                     // REQUIS - Titre
  description?: string;              // Optionnel - Description
  actions?: ReactNode;               // Optionnel - Actions
  variant?: 'default' | 'compact';   // Défaut: 'default'
}

interface PageHeaderWithBadgeProps extends PageHeaderSimpleProps {
  badge?: {
    label: string;                   // REQUIS - Texte du badge
    variant?: 'primary' | 'secondary' | 'success' | 'warning';
  };
}
```

### 🎨 Caractéristiques

**Différences avec PageHeaderFinal** :
- ❌ **Pas d'icône**
- ❌ **Pas de bordure** (border-bottom supprimée)
- ✅ Focus sur la typographie pure
- ✅ Ultra-épuré

### 📐 PageHeaderSimple (Standard)

**Layout** :
```
┌────────────────────────────────────────────────────┐
│ TITRE (4xl)                             [ACTIONS] │
│ Description (base)                                 │
└────────────────────────────────────────────────────┘
```

**Specs** :
- Titre : `text-4xl` (36px) ou `text-3xl` (30px) si compact
- Description : `text-base` (16px), `muted-foreground`
- Margin bottom : `space-8` (32px) ou `space-6` (24px) si compact
- Gap : `space-2` (8px) entre titre et description
- **PAS de bordure**

**Tokens CSS** :
```css
/* Container */
display: flex;
align-items: flex-start;
justify-content: space-between;
gap: var(--space-4);
margin-bottom: var(--space-8);  /* ou space-6 si compact */

/* Title */
font-family: var(--font-display);
font-size: var(--text-4xl);     /* ou text-3xl si compact */
font-weight: var(--font-weight-bold);
color: var(--foreground);
line-height: var(--leading-tight);

/* Description */
font-family: var(--font-body);
font-size: var(--text-base);
font-weight: var(--font-weight-medium);
color: var(--muted-foreground);
line-height: var(--leading-normal);
```

### 📐 PageHeaderWithBadge

**Layout** :
```
┌────────────────────────────────────────────────────┐
│ TITRE (4xl) [BADGE]                     [ACTIONS] │
│ Description (base)                                 │
└────────────────────────────────────────────────────┘
```

**Badge** :
```css
font-family: var(--font-body);
font-size: var(--text-xs);
font-weight: var(--font-weight-semibold);
padding: 4px 12px;
border-radius: var(--radius-full);
white-space: nowrap;

/* Variants */
/* Primary */
background: var(--primary);
color: white;

/* Secondary */
background: var(--secondary);
color: white;

/* Success */
background: var(--success);
color: white;

/* Warning */
background: var(--warning);
color: var(--foreground);  /* Dark text on yellow */
```

### 🔍 Usage dans l'App

#### **Dashboard** - PageHeaderSimple
```tsx
<PageHeaderSimple
  title="Tableau de bord"
  description="Bienvenue sur votre espace d'apprentissage"
  variant="default"
/>
```

#### **Messages** - PageHeaderSimple compact
```tsx
<PageHeaderSimple
  title="Messages"
  variant="compact"
/>
```

#### **Notifications** - PageHeaderWithBadge
```tsx
<PageHeaderWithBadge
  title="Notifications"
  description="Restez informé de votre progression"
  badge={{
    label: '3 nouveaux',
    variant: 'primary'
  }}
  actions={<Button>Tout marquer comme lu</Button>}
/>
```

---

## 4️⃣ CONFIRMATION MODAL ADVANCED

### 📦 Props TypeScript

```typescript
interface ConfirmationModalAdvancedProps {
  isOpen: boolean;                   // REQUIS - État ouverture
  onClose: () => void;               // REQUIS - Callback fermeture
  onConfirm: () => void;             // REQUIS - Callback confirmation
  title: string;                     // REQUIS - Titre du modal
  message: string;                   // REQUIS - Message de confirmation
  confirmText?: string;              // Défaut: 'Confirmer'
  cancelText?: string;               // Défaut: 'Annuler'
  variant?: 'danger' | 'success' | 'warning' | 'info'; // Défaut: 'info'
  icon?: React.ReactNode;            // Optionnel - Icône custom
}
```

### 🎨 Variants (Types)

#### **Variant : danger**

**Visuel** :
- Icône : `<AlertTriangle />` (⚠️)
- Couleur icône : `var(--destructive)` (rouge)
- Background icône : `rgba(237, 132, 58, 0.1)` (rouge clair)
- Bouton confirm : `var(--gradient-destructive)`
- Usage : Suppressions, actions irréversibles

**Gradient** :
```css
background: var(--gradient-destructive);
/* Gradient du design system pour actions destructives */
```

#### **Variant : success**

**Visuel** :
- Icône : `<CheckCircle2 />` (✓)
- Couleur icône : `var(--success)` (vert)
- Background icône : `rgba(115, 175, 191, 0.1)` (vert clair)
- Bouton confirm : `var(--gradient-success)`
- Usage : Confirmations positives, validations

#### **Variant : warning**

**Visuel** :
- Icône : `<AlertCircle />` (!)
- Couleur icône : `var(--warning)` (jaune)
- Background icône : `rgba(248, 176, 68, 0.1)` (jaune clair)
- Bouton confirm : `var(--gradient-warning)`
- Usage : Avertissements, précautions

#### **Variant : info (défaut)**

**Visuel** :
- Icône : `<Info />` (i)
- Couleur icône : `var(--primary)` (bleu)
- Background icône : `rgba(85, 161, 180, 0.1)` (bleu clair)
- Bouton confirm : `var(--gradient-primary)`
- Usage : Informations, confirmations neutres

### 📐 Structure des Zones

```tsx
<AnimatePresence>
  {isOpen && (
    <div className="modal-container">
      {/* BACKDROP */}
      <motion.div
        className="backdrop"
        onClick={onClose}
      />
      
      {/* MODAL */}
      <motion.div className="modal">
        {/* HEADER - Close button */}
        <button onClick={onClose}>
          <X />
        </button>
        
        {/* ICON */}
        <motion.div className="icon-container">
          {variantIcon}
        </motion.div>
        
        {/* BODY */}
        <div className="content">
          <h2>{title}</h2>
          <p>{message}</p>
        </div>
        
        {/* FOOTER - Actions */}
        <div className="actions">
          <button onClick={onClose}>{cancelText}</button>
          <button onClick={onConfirm}>{confirmText}</button>
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>
```

### 🎨 Tokens CSS & Animations

#### **Backdrop**
```css
position: fixed;
inset: 0;
background: rgba(0, 0, 0, 0.5);
backdrop-filter: blur(8px);
-webkit-backdrop-filter: blur(8px);
z-index: var(--z-modal);

/* Animation */
initial: { opacity: 0 }
animate: { opacity: 1 }
exit: { opacity: 0 }
```

#### **Modal Content**
```css
position: relative;
width: 100%;
max-width: 450px;
background: rgba(255, 255, 255, 0.98);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
border-radius: var(--radius-2xl);
padding: var(--space-8);
box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
border: 1px solid rgba(255, 255, 255, 0.8);

/* Animation */
initial: { opacity: 0, scale: 0.95, y: 20 }
animate: { opacity: 1, scale: 1, y: 0 }
exit: { opacity: 0, scale: 0.95, y: 20 }
transition: { type: 'spring', duration: 0.3 }
```

#### **Close Button**
```css
position: absolute;
top: var(--space-4);
right: var(--space-4);
width: 32px;
height: 32px;
border-radius: var(--radius-full);
background: rgba(0, 0, 0, 0.05);
color: var(--muted-foreground);
border: none;
cursor: pointer;
transition: all var(--duration-base) ease;

/* Hover */
background: rgba(0, 0, 0, 0.1);
```

#### **Icon Container**
```css
width: 64px;
height: 64px;
border-radius: var(--radius-full);
background: ${variantStyles.iconBg};  /* Ex: rgba(85, 161, 180, 0.1) */
color: ${variantStyles.iconColor};    /* Ex: var(--primary) */
margin: 0 auto var(--space-6);
display: flex;
align-items: center;
justify-content: center;

/* Animation */
initial: { scale: 0 }
animate: { scale: 1 }
transition: { delay: 0.1, type: 'spring', stiffness: 200 }
```

#### **Title**
```css
font-family: var(--font-display);
font-size: var(--text-2xl);
font-weight: var(--font-weight-bold);
color: var(--foreground);
margin-bottom: var(--space-3);
text-align: center;
```

#### **Message**
```css
font-family: var(--font-body);
font-size: var(--text-base);
color: var(--muted-foreground);
line-height: var(--leading-relaxed);
text-align: center;
```

#### **Actions (Buttons)**

**Cancel Button** :
```css
flex: 1;
padding: var(--space-4);
border-radius: var(--radius-lg);
font-family: var(--font-body);
font-size: var(--text-base);
font-weight: var(--font-weight-semibold);
border: 1px solid var(--border);
background: white;
color: var(--foreground);
cursor: pointer;
transition: all var(--duration-base) ease;

/* Hover */
background: var(--muted);
```

**Confirm Button** :
```css
flex: 1;
padding: var(--space-4);
border-radius: var(--radius-lg);
font-family: var(--font-body);
font-size: var(--text-base);
font-weight: var(--font-weight-semibold);
border: none;
background: ${variantStyles.gradient};  /* Ex: var(--gradient-primary) */
color: white;
cursor: pointer;
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
transition: all var(--duration-base) ease;

/* Hover */
transform: translateY(-2px);
box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
```

### 🔍 Utilisation dans l'App

#### **Cancel Session (danger)**
```tsx
<ConfirmationModalAdvanced
  isOpen={showCancelModal}
  onClose={() => setShowCancelModal(false)}
  onConfirm={handleCancelSession}
  title="Annuler la session ?"
  message="Êtes-vous sûr de vouloir annuler cette session de coaching ? Cette action est irréversible."
  confirmText="Oui, annuler"
  cancelText="Non, conserver"
  variant="danger"
/>
```

#### **Complete Achievement (success)**
```tsx
<ConfirmationModalAdvanced
  isOpen={showCompleteModal}
  onClose={() => setShowCompleteModal(false)}
  onConfirm={handleComplete}
  title="Marquer comme terminé ?"
  message="Voulez-vous marquer ce parcours comme terminé ?"
  confirmText="Oui, terminer"
  cancelText="Pas encore"
  variant="success"
/>
```

#### **Delete Entry (danger)**
```tsx
<ConfirmationModalAdvanced
  isOpen={showDeleteModal}
  onClose={() => setShowDeleteModal(false)}
  onConfirm={handleDelete}
  title="Supprimer l'entrée ?"
  message="Cette action supprimera définitivement cette entrée de journal. Continuer ?"
  confirmText="Supprimer"
  cancelText="Annuler"
  variant="danger"
/>
```

---

## 📊 RÉCAPITULATIF FINAL

### ✅ Composants Documentés

| Composant | Props | Variants | États | Tokens CSS | Usage App |
|-----------|-------|----------|-------|------------|-----------|
| **UpcomingSessionCard** | 3 props | 1 | 1 (upcoming) | ✅ Complets | Coaching, Dashboard |
| **PageHeaderFinal** | 7 props | 5 layouts | - | ✅ Complets | Parcours, Coaching, Veille, Journal |
| **PageHeaderSimple** | 4 props | 2 (default/compact) | - | ✅ Complets | Dashboard, Messages, Notifications |
| **ConfirmationModalAdvanced** | 9 props | 4 (danger/success/warning/info) | - | ✅ Complets | Toutes pages |

### 🎨 Design Patterns TLS Identifiés

1. **Glassmorphism** - Backgrounds semi-transparents + blur
2. **Gradient Icons** - Backgrounds avec gradient subtil
3. **Pill Buttons** - Border-radius-full pour CTAs
4. **Hover Lift** - translateY(-2px) sur boutons
5. **Tooltips Custom** - Glassmorphism + positioning
6. **Spring Animations** - Motion/React pour modals
7. **Color Variants** - 4 couleurs sémantiques (primary/success/warning/destructive)

---

**Status** : ✅ **Documentation COMPLÈTE**  
**Dernière mise à jour** : 01/04/2026  
**Design System** : TLS v5.3
