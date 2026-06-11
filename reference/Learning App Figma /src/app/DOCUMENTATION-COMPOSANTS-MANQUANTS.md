# 📚 COMPOSANTS MANQUANTS - Documentation Technique Complète

**Date** : 01/04/2026  
**Design System** : TLS v5.3  
**Composants** : BookingModalMinimal, CelebrationCard, LessonPlayer, QuizSystem

---

## 1️⃣ BOOKING MODAL MINIMAL

### 📦 Props TypeScript

```typescript
interface BookingModalMinimalProps {
  isOpen: boolean;                   // REQUIS - État ouverture
  onClose: () => void;               // REQUIS - Callback fermeture
  onConfirm: (slot: { 
    date: string;                    // Format ISO
    time: string;                    // Ex: "14:00"
  }) => void;                        // REQUIS - Callback confirmation
  coachName: string;                 // REQUIS - Nom du coach
}
```

### 🎨 États du Composant (Steps)

Le modal utilise un système de **2 étapes** :

#### **État 1 : 'select' (Sélection Date & Heure)**

**Layout** : Grid 2 colonnes (Calendar | Time Slots)

**Visuel** :
- **LEFT** : Calendrier mensuel interactif
- **RIGHT** : Liste des créneaux horaires disponibles
- **FOOTER** : Résumé sélection + Bouton "Continuer"

**Structure** :
```
┌─────────────────────────────────────────────────┐
│ [ICON] Réserver une session                [X] │
│        avec Sophie Martin                       │
├────────────────────┬────────────────────────────┤
│ [< Mars 2026 >]    │ Horaires disponibles       │
│                    │                            │
│ Dim Lun Mar ...    │ Sélectionnez une date →    │
│ [ 1] [ 2] [ 3]     │                            │
│ [ 4] [ 5] [ 6]     │ (ou liste créneaux)        │
│ ...                │                            │
├────────────────────┴────────────────────────────┤
│ Sélection : Lun. 15 mars • 14:00   [Continuer] │
└─────────────────────────────────────────────────┘
```

**Tokens CSS** :
```css
/* Modal container */
max-width: 80rem;                  /* 1280px - Large modal */
background: rgba(255, 255, 255, 0.98);
backdrop-filter: blur(40px);
border-radius: var(--radius-2xl);
box-shadow: 0 24px 64px rgba(0, 0, 0, 0.2);
max-height: 90vh;

/* Header */
padding: var(--space-8) var(--space-8) var(--space-6);
border-bottom: 1px solid rgba(0, 0, 0, 0.06);

/* Icon badge */
width: 48px;
height: 48px;
border-radius: var(--radius-full);
background: var(--gradient-primary);

/* Title */
font-family: var(--font-display);
font-size: var(--text-2xl);
font-weight: var(--font-weight-bold);
color: var(--foreground);

/* Subtitle */
font-size: var(--text-sm);
font-family: var(--font-body);
color: var(--muted-foreground);
margin-top: var(--space-1);
```

#### **État 2 : 'confirm' (Confirmation)**

**Layout** : Vue simple centrée

**Visuel** :
- Card de confirmation avec détails complets
- Info email + questionnaire
- Actions : Retour + Confirmer
- Animation de confirmation (loading)

**Structure** :
```
┌─────────────────────────────────────────────────┐
│ Confirmer votre réservation                [X] │
├─────────────────────────────────────────────────┤
│                                                 │
│ 📧 Après confirmation, vous recevrez...         │
│                                                 │
│ ┌─────────────────────────────────────────────┐ │
│ │ Session de Coaching IA                      │ │
│ │                                             │ │
│ │ 📅 Date: 15 mars 2026                       │ │
│ │ ⏰ Heure: 14:00                             │ │
│ │ ⏱️ Durée: 60 min                            │ │
│ │ 👤 Coach: Sophie Martin                     │ │
│ │ 📹 Visioconférence: Google Meet             │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│        [← Retour]      [✓ Confirmer]           │
└─────────────────────────────────────────────────┘
```

**Tokens CSS** :
```css
/* Info banner */
padding: var(--space-4);
border-radius: var(--radius-xl);
background: rgba(85, 161, 180, 0.04);
border: 1px solid rgba(85, 161, 180, 0.1);

/* Confirmation card */
padding: var(--card-padding-y) var(--card-padding-x);
border-radius: var(--radius-2xl);
background: linear-gradient(135deg, rgba(85, 161, 180, 0.08) 0%, rgba(85, 161, 180, 0.03) 100%);
border: 1px solid rgba(85, 161, 180, 0.15);
```

### 📐 Composants Internes Détaillés

#### **Calendrier (Calendar Grid)**

**Fonctionnalités** :
- Navigation mois (prev/next)
- Dates passées disabled (opacity 0.3)
- Aujourd'hui highlighted (`primary-lighter`)
- Date sélectionnée (`primary` background)
- Hover state sur dates disponibles

**Tokens CSS** :
```css
/* Day names header */
font-size: var(--text-xs);
font-weight: var(--font-weight-semibold);
color: var(--muted-foreground);
padding: var(--space-2);

/* Day cell */
aspect-ratio: 1;
border-radius: var(--radius);
font-size: var(--text-sm);
font-family: var(--font-body);
transition: all 200ms ease;

/* Day - Selected */
background: var(--primary);
color: white;
font-weight: var(--font-weight-semibold);

/* Day - Today (not selected) */
background: var(--primary-lighter);
color: var(--foreground);

/* Day - Past */
opacity: 0.3;
cursor: not-allowed;
color: var(--muted-foreground);

/* Day - Hover (available) */
background: var(--primary-lighter);
color: var(--primary);
```

#### **Time Slots List**

**Layout** : Stack vertical avec scroll

**Fonctionnalités** :
- Empty state si aucune date sélectionnée
- Liste des créneaux disponibles (hardcodé : 09:00, 10:00, 14:00, 15:00, 16:00, 17:00)
- Sélection unique (radio-like behavior)
- Checkmark icon sur slot sélectionné

**Tokens CSS** :
```css
/* Empty state */
padding: var(--space-12) 0;
text-align: center;
color: var(--muted-foreground);

/* Empty icon */
width: 48px;
height: 48px;
opacity: 0.3;
margin-bottom: var(--space-3);

/* Slot button */
width: 100%;
padding: var(--space-4);
border-radius: var(--radius-lg);
background: rgba(0, 0, 0, 0.03);
border: 1px solid rgba(0, 0, 0, 0.06);
transition: all 200ms ease;

/* Slot - Selected */
background: var(--primary);
border: 2px solid var(--primary);
color: white;

/* Slot - Hover (not selected) */
background: var(--primary-lighter);
border-color: var(--primary);

/* Slot text */
font-size: var(--text-base);
font-weight: var(--font-weight-medium);
font-family: var(--font-body);
```

#### **Footer Sticky**

**Position** : Sticky bottom (reste visible au scroll)

**Fonctionnalités** :
- Affiche sélection actuelle
- Bouton "Continuer" disabled si sélection incomplète
- Animation hover sur bouton

**Tokens CSS** :
```css
/* Container */
position: sticky;
bottom: 0;
padding: var(--space-6);
display: flex;
justify-content: space-between;
align-items: center;
gap: var(--space-4);
border-top: 1px solid rgba(0, 0, 0, 0.08);
background: rgba(255, 255, 255, 0.95);
backdrop-filter: blur(20px);

/* Selection summary label */
font-size: var(--text-xs);
color: var(--muted-foreground);
text-transform: uppercase;
letter-spacing: var(--tracking-wider);
font-weight: var(--font-weight-semibold);
margin-bottom: 4px;

/* Selection value */
font-family: var(--font-display);
font-size: var(--text-base);
font-weight: var(--font-weight-bold);
color: var(--foreground);

/* Continue button */
padding: var(--space-4) var(--space-8);
border-radius: var(--radius-xl);
font-size: var(--text-base);
font-weight: var(--font-weight-bold);
font-family: var(--font-body);
background: linear-gradient(135deg, var(--primary) 0%, var(--primary-600) 100%);
color: white;
border: none;
box-shadow: 0 8px 20px rgba(85, 161, 180, 0.35);
transition: all 200ms ease;

/* Button - Disabled */
opacity: 0.5;
cursor: not-allowed;
background: rgba(0, 0, 0, 0.08);

/* Button - Hover (enabled) */
transform: translateY(-2px);
box-shadow: 0 12px 28px rgba(85, 161, 180, 0.45);
```

### 🎬 Animations & Interactions

#### **Confirmation Loading State**

```typescript
const handleConfirm = () => {
  setIsConfirming(true);
  
  setTimeout(() => {
    onConfirm({ date, time });
    setIsConfirming(false);
    // Reset modal
  }, 1500);
};
```

**Visuel pendant loading** :
- Bouton "Confirmer" → Spinner ou texte "Confirmation..."
- Désactive tous les boutons
- Animation possible avec Motion/React

### 🎨 Tous les Tokens CSS Utilisés

#### **Couleurs**
```css
/* Backgrounds */
background: rgba(255, 255, 255, 0.98);
background: rgba(0, 0, 0, 0.5);  /* Backdrop */

/* Primary theme */
--primary: #55A1B4;
--primary-lighter: #E5F1F4;
--primary-600: #4A90A3;

/* Text */
--foreground: #252B37;
--muted-foreground: #6b7280;

/* Borders */
border-color: rgba(0, 0, 0, 0.06);
border-color: rgba(85, 161, 180, 0.1);
```

#### **Typographie**
```css
/* Headers */
font-family: var(--font-display);
font-size: var(--text-2xl);
font-weight: var(--font-weight-bold);

/* Body text */
font-family: var(--font-body);
font-size: var(--text-sm), var(--text-base);
font-weight: var(--font-weight-medium), var(--font-weight-semibold);

/* Labels */
font-size: var(--text-xs);
text-transform: uppercase;
letter-spacing: var(--tracking-wider);
```

#### **Spacing**
```css
padding: var(--space-4), var(--space-6), var(--space-8);
gap: var(--space-2), var(--space-3), var(--space-4);
margin: var(--space-1), var(--space-3);
```

#### **Borders & Radius**
```css
border-radius: var(--radius);      /* Small - 6px */
border-radius: var(--radius-lg);   /* Medium - 10px */
border-radius: var(--radius-xl);   /* Large - 12px */
border-radius: var(--radius-2xl);  /* XL - 16px */
border-radius: var(--radius-full); /* Circle/Pill */
```

#### **Effects**
```css
backdrop-filter: blur(40px);
box-shadow: 0 24px 64px rgba(0, 0, 0, 0.2);
box-shadow: 0 8px 20px rgba(85, 161, 180, 0.35);
transition: all 200ms ease;
```

### 🔍 Utilisation dans l'App

#### **CoachingPageUpgraded.tsx**
```tsx
<BookingModalMinimal
  isOpen={isBookingModalOpen}
  onClose={() => setIsBookingModalOpen(false)}
  onConfirm={handleBookingConfirmed}
  coachName={coach.name}
/>

const handleBookingConfirmed = (slot: { date: string; time: string }) => {
  // Créer nouvelle session
  const newSession = {
    id: generateId(),
    date: slot.date,
    time: slot.time,
    duration: '60 min',
    title: 'Session de Coaching',
    meetingLink: 'https://meet.google.com/...',
    coachName: coach.name,
  };
  
  // Ajouter à la liste
  setSessions([...sessions, newSession]);
  
  // Afficher toast succès
  success('Session réservée avec succès !');
  
  // Fermer modal
  setIsBookingModalOpen(false);
};
```

### ⚠️ Points d'Attention

1. **Créneaux hardcodés** : La fonction `getAvailableSlots()` retourne toujours les mêmes heures. Dans une vraie app, appeler une API.

2. **Validation de dates** : Les dates passées sont disabled mais pas les heures passées le jour même.

3. **Pas de timezone** : Le système ne gère pas les fuseaux horaires.

4. **Responsive** : Modal très large (max-w-5xl). Peut être trop grand sur tablette. Besoin de breakpoints.

---

## 2️⃣ CELEBRATION CARD

### 📦 Props TypeScript

```typescript
interface CelebrationCardProps {
  icon: LucideIcon;                  // REQUIS - Icône Lucide
  title: string;                     // REQUIS - Titre célébration
  description: string;               // REQUIS - Description
  tags?: string[];                   // Optionnel - Tags/badges
  variant?: 'booking' | 'unlock' | 'badge'; // Défaut: 'booking'
  className?: string;                // Optionnel - Classes custom
}
```

### 🎨 Variants

Le composant a **3 variants** avec des couleurs différentes :

#### **Variant : 'booking' (Réservation)**

**Thème** : Orange/Jaune (Warm)

**Tokens CSS** :
```css
/* Icon background */
background: linear-gradient(135deg, #F8B044 0%, #ED843A 100%);
color: white;
box-shadow: 0 4px 12px rgba(248, 176, 68, 0.3);

/* Border */
border: 1.5px solid rgba(248, 176, 68, 0.3);

/* Background glow */
background: rgba(248, 176, 68, 0.05);

/* Tag color */
color: #ED843A;
```

**Usage** : Confirmation de réservation, booking success

#### **Variant : 'unlock' (Déblocage)**

**Thème** : Bleu TLS (Primary)

**Tokens CSS** :
```css
/* Icon background */
background: linear-gradient(135deg, #55A1B4 0%, #4A90A3 100%);
color: white;
box-shadow: 0 4px 12px rgba(85, 161, 180, 0.3);

/* Border */
border: 1.5px solid rgba(85, 161, 180, 0.3);

/* Background glow */
background: rgba(85, 161, 180, 0.05);

/* Tag color */
color: #55A1B4;
```

**Usage** : Déblocage de cours, niveau suivant, feature unlock

#### **Variant : 'badge' (Badge)**

**Thème** : Orange TLS (Secondary)

**Tokens CSS** :
```css
/* Icon background */
background: linear-gradient(135deg, #ED843A 0%, #D97532 100%);
color: white;
box-shadow: 0 4px 12px rgba(237, 132, 58, 0.3);

/* Border */
border: 1.5px solid rgba(237, 132, 58, 0.3);

/* Background glow */
background: rgba(237, 132, 58, 0.05);

/* Tag color */
color: #ED843A;
```

**Usage** : Badge gagné, achievement débloqué, reward

### 📐 Structure Visuelle

```
┌──────────────────────────────────────────────┐
│ [ICON]  Booking Confirmed                   │
│         Votre session a été réservée...      │
│         [Tag1] [Tag2]                        │
└──────────────────────────────────────────────┘

Layout:
- Horizontal (flex)
- Icon: 40x40px à gauche
- Content: flex-1 à droite
- Tags: Row flex-wrap en bas
```

**Dimensions** :
```css
padding: var(--space-4);
border-radius: var(--radius-xl);
```

### 🎨 Tous les Tokens CSS Utilisés

#### **Container**
```css
/* Card */
padding: var(--space-4);
border-radius: var(--radius-xl);
background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,252,255,0.95) 100%);
backdrop-filter: blur(20px);
border: 1.5px solid ${variant.borderColor};
box-shadow: 0 8px 24px rgba(85, 161, 180, 0.1);
cursor: pointer;
position: relative;
overflow: hidden;
transition: all var(--duration-base) cubic-bezier(0.4, 0, 0.2, 1);

/* Hover */
transform: translateY(-4px);
box-shadow: 0 12px 32px rgba(85, 161, 180, 0.2);
```

#### **Background Glow**
```css
position: absolute;
top: -50%;
right: -50%;
width: 200%;
height: 200%;
background: radial-gradient(circle, ${variant.bgColor} 0%, transparent 70%);
opacity: 0.5;
pointer-events: none;
```

#### **Icon**
```css
width: 40px;
height: 40px;
border-radius: var(--radius-lg);
background: ${variant.iconBg};  /* Gradient */
display: flex;
align-items: center;
justify-content: center;
flex-shrink: 0;
box-shadow: 0 4px 12px ${variant.borderColor};

/* Icon inside */
width: 20px;
height: 20px;
color: white;
```

#### **Title**
```css
font-family: var(--font-display);
font-size: var(--text-base);
font-weight: var(--font-weight-bold);
color: var(--foreground);
letter-spacing: -0.01em;
```

#### **Description**
```css
font-family: var(--font-body);
font-size: var(--text-sm);
color: var(--muted-foreground);
line-height: 1.5;
```

#### **Tags**
```css
/* Container */
display: flex;
gap: var(--space-2);
flex-wrap: wrap;
margin-top: var(--space-1);

/* Tag badge */
padding: var(--space-1) var(--space-2);
border-radius: var(--radius-full);
background: ${variant.bgColor};
border: 1px solid ${variant.borderColor};
font-family: var(--font-body);
font-size: var(--text-xs);
font-weight: var(--font-weight-medium);
color: ${variant.color};  /* Depends on variant */
```

### 🔍 Utilisation dans l'App

#### **CelebrationsDemo.tsx**
```tsx
<CelebrationCard
  icon={Calendar}
  title="Booking Confirmed"
  description="Your coaching session has been successfully booked"
  tags={['Coaching', 'Confirmed']}
  variant="booking"
/>

<CelebrationCard
  icon={Lock}
  title="Course Unlocked"
  description="You've unlocked access to Advanced AI Concepts"
  tags={['New Content', 'Level 2']}
  variant="unlock"
/>

<CelebrationCard
  icon={Trophy}
  title="Badge Earned"
  description="You've earned the 'Quick Learner' achievement"
  tags={['Achievement', '+50 XP']}
  variant="badge"
/>
```

#### **Usage Typique**
```tsx
// Après réservation réussie
<CelebrationCard
  icon={CheckCircle2}
  title="Réservation confirmée !"
  description="Votre session de coaching est programmée pour le 15 mars à 14h00"
  tags={['Coaching', coach.name]}
  variant="booking"
/>

// Après déblocage de parcours
<CelebrationCard
  icon={Sparkles}
  title="Nouveau parcours débloqué"
  description="Vous pouvez maintenant accéder au parcours 'IA Avancée'"
  tags={['Nouveau', 'Niveau 3']}
  variant="unlock"
/>

// Après achievement
<CelebrationCard
  icon={Award}
  title="Badge 'Expert' obtenu"
  description="Vous avez terminé 50 leçons avec succès"
  tags={['+100 XP', 'Rare']}
  variant="badge"
/>
```

### ⚠️ Différence avec Achievement Card

| Feature | CelebrationCard | AchievementCard |
|---------|----------------|-----------------|
| **Usage** | Notifications, toasts, confirmations | Galerie achievements, progression |
| **Layout** | Horizontal compact | Vertical card |
| **States** | 3 variants fixes | 4 raretés + locked/unlocked |
| **Size** | Petit (notification) | Grand (card showcase) |
| **Progress** | ❌ Non | ✅ Progress bar |
| **Click** | Info only | Clickable avec modal |

---

## 3️⃣ LESSON PLAYER

### 📦 Props TypeScript

```typescript
interface LessonPlayerProps {
  lesson: Lesson;                    // REQUIS - Données de la leçon
  onComplete: () => void;            // REQUIS - Callback fin de leçon
  onNext?: () => void;               // Optionnel - Leçon suivante
  onPrevious?: () => void;           // Optionnel - Leçon précédente
  hasNext?: boolean;                 // Optionnel - Si next disponible
  hasPrevious?: boolean;             // Optionnel - Si previous disponible
}

export interface Lesson {
  id: string;                        // ID unique
  title: string;                     // Titre de la leçon
  description: string;               // Description
  type: 'video' | 'text' | 'interactive'; // Type de contenu
  duration: string;                  // Durée (ex: "15 min")
  videoUrl?: string;                 // URL vidéo (si type=video)
  content?: string;                  // Contenu HTML (si type=text)
  resources?: LessonResource[];      // Ressources téléchargeables
  transcript?: string;               // Transcription vidéo
}

interface LessonResource {
  id: string;
  title: string;
  type: 'pdf' | 'doc' | 'link';
  url: string;
}
```

### 🎨 Types de Leçons

Le composant gère **3 types** de contenu :

#### **Type : 'video'**

**Rendu** : Player Vimeo intégré

**Composants** :
- `VimeoPlayer` component
- Controls natifs Vimeo
- Glassmorphism container

**Tokens CSS** :
```css
/* Container */
border-radius: var(--radius-3xl);  /* 24px */
overflow: hidden;
background: var(--glass-white);
border: 1px solid var(--glass-border);
padding: var(--space-4);
```

#### **Type : 'text'**

**Rendu** : Contenu HTML formaté

**Composants** :
- Glassmorphism card
- `dangerouslySetInnerHTML` pour rich content
- Typography styles TLS

**Tokens CSS** :
```css
/* Container */
padding: var(--space-8);
border-radius: var(--radius-3xl);
background: var(--glass-white);
border: 1px solid var(--glass-border);

/* Content */
font-size: var(--text-base);
color: var(--foreground);
line-height: var(--leading-relaxed);
```

#### **Type : 'interactive'**

**⚠️ Non implémenté dans le code**

Structure attendue : Quiz, exercices, simulations

### 📐 Sections du Player

#### **1. Media Player (Video ou Text)**

Selon `lesson.type`, affiche soit VimeoPlayer soit HTML content

#### **2. Lesson Info**

**Structure** :
```tsx
<div className="lesson-info">
  <h2>{lesson.title}</h2>
  <p>{lesson.description}</p>
</div>
```

**Tokens CSS** :
```css
/* Container */
padding: var(--space-6);
border-radius: var(--radius-2xl);
background: var(--glass-white);
border: 1px solid var(--glass-border);

/* Title */
font-family: var(--font-display);
font-size: var(--text-2xl);
font-weight: var(--font-weight-bold);
color: var(--foreground);
margin-bottom: var(--space-2);

/* Description */
font-size: var(--text-base);
color: var(--muted-foreground);
line-height: var(--leading-relaxed);
```

#### **3. Resources Section**

**Condition** : `lesson.resources && lesson.resources.length > 0`

**Layout** : Stack vertical de cards cliquables

**Structure** :
```tsx
<div className="resources">
  <h3>
    <FileText /> Ressources téléchargeables
  </h3>
  
  {resources.map(resource => (
    <a href={resource.url} download>
      <FileText />
      {resource.title}
      <Download />
    </a>
  ))}
</div>
```

**Tokens CSS** :
```css
/* Container */
padding: var(--space-6);
border-radius: var(--radius-2xl);
background: var(--glass-white);
border: 1px solid var(--glass-border);

/* Header */
font-size: var(--text-lg);
font-weight: var(--font-weight-bold);
color: var(--foreground);
margin-bottom: var(--space-4);

/* Resource item */
display: flex;
align-items: center;
justify-content: space-between;
padding: var(--space-4);
border-radius: var(--radius-xl);
background: var(--neutral-50);
text-decoration: none;
transition: transform 200ms ease;

/* Resource - Hover */
transform: translateY(-4px);

/* Resource icon container */
width: 40px;
height: 40px;
border-radius: var(--radius-lg);
background: var(--primary-lighter);
display: flex;
align-items: center;
justify-content: center;

/* Resource title */
font-size: var(--text-base);
font-weight: var(--font-weight-semibold);
color: var(--foreground);
```

#### **4. Transcript Section**

**Condition** : `lesson.transcript`

**Fonctionnalité** : Collapsible avec toggle

**État** : `showTranscript` (boolean)

**Structure** :
```tsx
<div className="transcript">
  <button onClick={() => setShowTranscript(!showTranscript)}>
    <MessageSquare /> Afficher la transcription
    <ChevronDown className={showTranscript ? 'rotate-180' : ''} />
  </button>
  
  {showTranscript && (
    <div className="transcript-content">
      {lesson.transcript}
    </div>
  )}
</div>
```

**Tokens CSS** :
```css
/* Container */
border-radius: var(--radius-2xl);
overflow: hidden;
background: var(--glass-white);
border: 1px solid var(--glass-border);

/* Toggle button */
width: 100%;
padding: var(--space-6);
display: flex;
align-items: center;
justify-content: space-between;
background: transparent;
border: none;
cursor: pointer;
font-family: var(--font-body);
font-size: var(--text-base);
font-weight: var(--font-weight-semibold);
color: var(--foreground);

/* Transcript content */
padding: var(--space-6);
padding-top: 0;
font-size: var(--text-sm);
color: var(--muted-foreground);
line-height: var(--leading-relaxed);
white-space: pre-wrap;
```

#### **5. Navigation Controls**

**⚠️ Présent dans l'interface mais non implémenté dans le code**

Structure attendue :
```tsx
<div className="lesson-navigation">
  <button onClick={onPrevious} disabled={!hasPrevious}>
    <ArrowLeft /> Leçon précédente
  </button>
  
  <button onClick={onComplete}>
    <CheckCircle2 /> Marquer comme terminé
  </button>
  
  <button onClick={onNext} disabled={!hasNext}>
    Leçon suivante <ArrowRight />
  </button>
</div>
```

### 🎨 Tous les Tokens CSS Utilisés

#### **Couleurs**
```css
/* Glassmorphism */
--glass-white: rgba(255, 255, 255, 0.7);
--glass-border: rgba(255, 255, 255, 0.3);

/* Text */
--foreground: #252B37;
--muted-foreground: #6b7280;

/* Backgrounds */
--primary-lighter: #E5F1F4;
--neutral-50: #F9FAFB;
```

#### **Typographie**
```css
/* Title */
font-family: var(--font-display);
font-size: var(--text-2xl);
font-weight: var(--font-weight-bold);

/* Subtitle/Description */
font-family: var(--font-body);
font-size: var(--text-base);
line-height: var(--leading-relaxed);

/* Resource title */
font-size: var(--text-base);
font-weight: var(--font-weight-semibold);

/* Section header */
font-size: var(--text-lg);
font-weight: var(--font-weight-bold);
```

#### **Spacing**
```css
padding: var(--space-4), var(--space-6), var(--space-8);
gap: var(--space-3), var(--space-4);
margin-bottom: var(--space-2), var(--space-4);
```

#### **Borders & Radius**
```css
border-radius: var(--radius-lg);   /* 10px - Icon container */
border-radius: var(--radius-xl);   /* 12px - Resource item */
border-radius: var(--radius-2xl);  /* 16px - Sections */
border-radius: var(--radius-3xl);  /* 24px - Video container */
```

### 🔍 Utilisation dans l'App

#### **LessonViewerPage.tsx** (hypothétique)
```tsx
<LessonPlayer
  lesson={currentLesson}
  onComplete={handleLessonComplete}
  onNext={() => navigateToLesson(currentLessonIndex + 1)}
  onPrevious={() => navigateToLesson(currentLessonIndex - 1)}
  hasNext={currentLessonIndex < totalLessons - 1}
  hasPrevious={currentLessonIndex > 0}
/>

const handleLessonComplete = () => {
  // Marquer leçon comme terminée
  updateLessonProgress(currentLesson.id, 'completed');
  
  // Ajouter XP
  addXP(currentLesson.xpReward);
  
  // Célébration
  showCelebration();
  
  // Auto-navigation vers leçon suivante ?
  if (hasNext) {
    setTimeout(() => navigateToNextLesson(), 2000);
  }
};
```

---

## 4️⃣ QUIZ SYSTEM

### 📦 Props TypeScript

```typescript
interface QuizSystemProps {
  quiz: Quiz;                        // REQUIS - Quiz complet
  onComplete: (result: QuizResult) => void; // REQUIS - Callback résultat
  onExit?: () => void;               // Optionnel - Quitter le quiz
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questions: QuizQuestion[];
  passingScore: number;              // Pourcentage (ex: 70)
  xpReward: number;                  // XP si réussi
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'single' | 'multiple';       // Choix unique ou multiple
  options: QuizOption[];
  explanation?: string;              // Explication après réponse
  hint?: string;                     // Indice (affichable)
}

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizResult {
  quizId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  passed: boolean;
  xpEarned: number;
  answers: UserAnswer[];
}

export interface UserAnswer {
  questionId: string;
  selectedOptions: string[];
  isCorrect: boolean;
}
```

### 🎨 États du Composant

#### **État 1 : Question Active**

**Layout** : Question + Options + Progress

**Fonctionnalités** :
- Affiche question courante
- Liste options (single choice ou multiple choice)
- Bouton "Valider" disabled si aucune sélection
- Progress bar en haut
- Hint button optionnel

**Structure** :
```
┌─────────────────────────────────────────────────┐
│ ████████████░░░░░░░░░░░  Question 3/10         │
├─────────────────────────────────────────────────┤
│                                                 │
│ Quelle est la capitale de la France ?           │
│                                                 │
│ ○ Londres                                       │
│ ○ Paris                                         │
│ ○ Berlin                                        │
│ ○ Madrid                                        │
│                                                 │
│ [💡 Voir l'indice]         [Valider ma réponse] │
└─────────────────────────────────────────────────┘
```

**Tokens CSS** :
```css
/* Container */
min-height: 100vh;
display: flex;
align-items: center;
justify-content: center;
padding: var(--space-6);
background: var(--background);

/* Card */
width: 100%;
max-width: 48rem;  /* 768px */
padding: var(--space-12);
border-radius: var(--radius-3xl);
background: var(--glass-white);
backdrop-filter: var(--blur-xl);
border: 1px solid var(--glass-border);
box-shadow: var(--glass-shadow-lg);
```

#### **État 2 : Answered (Réponse donnée)**

**Après click "Valider"** :
- Options deviennent readonly
- Options correctes → vert (`success`)
- Options incorrectes sélectionnées → rouge (`destructive`)
- Affiche explication si disponible
- Bouton "Question suivante" ou "Terminer"

**Visual feedback** :
```
┌─────────────────────────────────────────────────┐
│ ████████████░░░░░░░░░░░  Question 3/10         │
├─────────────────────────────────────────────────┤
│                                                 │
│ Quelle est la capitale de la France ?           │
│                                                 │
│ ○ Londres                                       │
│ ✓ Paris              ← Correct ! (vert)         │
│ ○ Berlin                                        │
│ ○ Madrid                                        │
│                                                 │
│ ℹ️ Paris est la capitale de la France depuis... │
│                                                 │
│                           [Question suivante →] │
└─────────────────────────────────────────────────┘
```

#### **État 3 : Quiz Complete (Résultats)**

**Layout** : Résultat centralisé avec stats

**Fonctionnalités** :
- Icône success/warning selon passing
- Score en pourcentage (grand)
- Stats détaillées (correct/total)
- Boutons "Réessayer" ou "Terminer"
- Célébration si passed

**Structure** :
```
┌─────────────────────────────────────────────────┐
│                                                 │
│              [🏆]                               │
│                                                 │
│         Quiz réussi ! 🎉                        │
│                                                 │
│    Félicitations, vous avez obtenu              │
│       un excellent score !                      │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │             85%                          │  │
│  │     8 / 10 réponses correctes            │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  [Score: 85%]  [✓ 8 correct]  [XP: +50]       │
│                                                 │
│            [Terminer]  [Réessayer]             │
└─────────────────────────────────────────────────┘
```

**Tokens CSS** :
```css
/* Result icon */
width: 96px;
height: 96px;
border-radius: var(--radius-full);
background: var(--success-100);  /* ou warning-100 si failed */
margin: 0 auto var(--space-6);

/* Result title */
font-family: var(--font-display);
font-size: var(--text-4xl);
font-weight: var(--font-weight-bold);
color: var(--foreground);
margin-bottom: var(--space-4);

/* Score card */
padding: var(--space-8);
border-radius: var(--radius-2xl);
background: var(--success-100);  /* ou warning-100 */
margin-bottom: var(--space-8);

/* Big percentage */
font-family: var(--font-display);
font-size: var(--text-6xl);
font-weight: var(--font-weight-bold);
color: var(--success-600);  /* ou warning-600 */
margin-bottom: var(--space-2);
```

### 📐 Composants Internes

#### **Progress Bar**

Utilise `ProgressBarEnhanced` component

```typescript
const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
```

```tsx
<ProgressBarEnhanced
  current={currentQuestionIndex + 1}
  total={quiz.questions.length}
  label="questions"
  showPercentage={false}
  height="8px"
/>
```

#### **Question Display**

```tsx
<h2 style={{ fontSize: 'var(--text-2xl)' }}>
  {currentQuestion.question}
</h2>
```

#### **Options List**

**Single Choice** :
```tsx
{currentQuestion.options.map(option => (
  <button
    onClick={() => handleOptionSelect(option.id)}
    disabled={hasAnswered}
    className={cn(
      'option-button',
      selectedOptions.includes(option.id) && 'selected',
      hasAnswered && option.isCorrect && 'correct',
      hasAnswered && selectedOptions.includes(option.id) && !option.isCorrect && 'incorrect'
    )}
  >
    <div className="radio-icon">
      {selectedOptions.includes(option.id) && '●'}
    </div>
    <span>{option.text}</span>
    {hasAnswered && option.isCorrect && <CheckCircle2 />}
    {hasAnswered && selectedOptions.includes(option.id) && !option.isCorrect && <XCircle />}
  </button>
))}
```

**Multiple Choice** : Checkboxes au lieu de radio

**Tokens CSS** :
```css
/* Option button */
width: 100%;
padding: var(--space-4);
border-radius: var(--radius-lg);
background: rgba(0, 0, 0, 0.02);
border: 2px solid rgba(0, 0, 0, 0.06);
display: flex;
align-items: center;
gap: var(--space-3);
cursor: pointer;
transition: all 200ms ease;

/* Option - Selected (before answer) */
border-color: var(--primary);
background: var(--primary-lighter);

/* Option - Correct (after answer) */
border-color: var(--success);
background: var(--success-100);

/* Option - Incorrect (after answer) */
border-color: var(--destructive);
background: var(--destructive-100);

/* Option - Disabled */
cursor: not-allowed;
opacity: 0.7;
```

#### **Hint Display**

**Condition** : `currentQuestion.hint`

```tsx
{showHint && currentQuestion.hint && (
  <div className="hint-box">
    <AlertCircle />
    {currentQuestion.hint}
  </div>
)}
```

**Tokens CSS** :
```css
padding: var(--space-4);
border-radius: var(--radius-lg);
background: rgba(248, 176, 68, 0.1);
border: 1px solid rgba(248, 176, 68, 0.3);
display: flex;
align-items: flex-start;
gap: var(--space-3);
font-size: var(--text-sm);
color: var(--foreground);
```

#### **Explanation Display**

**Condition** : `showExplanation && currentQuestion.explanation`

```tsx
{showExplanation && currentQuestion.explanation && (
  <div className={cn('explanation-box', isCorrect ? 'success' : 'error')}>
    {isCorrect ? <CheckCircle2 /> : <XCircle />}
    <div>
      <p className="explanation-title">
        {isCorrect ? 'Correct !' : 'Incorrect'}
      </p>
      <p className="explanation-text">
        {currentQuestion.explanation}
      </p>
    </div>
  </div>
)}
```

**Tokens CSS** :
```css
/* Success variant */
padding: var(--space-4);
border-radius: var(--radius-lg);
background: var(--success-100);
border: 1px solid var(--success-300);

/* Error variant */
background: var(--destructive-100);
border: 1px solid var(--destructive-300);
```

#### **Stats Grid (Results)**

```tsx
<div className="grid grid-cols-3 gap-4">
  <StatCard 
    icon={TrendingUp}
    label="Score"
    value={`${percentage}%`}
  />
  <StatCard 
    icon={CheckCircle2}
    label="Correct"
    value={correctCount}
  />
  <StatCard 
    icon={Sparkles}
    label="XP"
    value={`+${xpEarned}`}
  />
</div>
```

### 🎬 Logique du Quiz

#### **Flow complet**
```typescript
1. Mount → État "Question 1"
2. User sélectionne option(s) → selectedOptions updated
3. User click "Valider" → checkAnswer()
   - Compare selectedOptions avec correctOptions
   - setIsCorrect() et setHasAnswered(true)
   - Save dans answers array
4. User click "Suivant" → handleNext()
   - Si pas dernière question → currentQuestionIndex++
   - Si dernière question → finishQuiz()
5. finishQuiz() → Calcule résultat
   - percentage = (correctCount / totalQuestions) * 100
   - passed = percentage >= quiz.passingScore
   - xpEarned = passed ? full XP : 50% XP
6. Affiche résultats
   - Si passed → showCelebration()
   - setTimeout → onComplete(result)
```

#### **Restart Logic**
```typescript
const restartQuiz = () => {
  setCurrentQuestionIndex(0);
  setAnswers([]);
  setSelectedOptions([]);
  setShowExplanation(false);
  setHasAnswered(false);
  setIsCorrect(false);
  setQuizComplete(false);
  setShowHint(false);
};
```

### 🎨 Tous les Tokens CSS Utilisés

#### **Couleurs**
```css
/* Success */
--success: #73AFB#F;
--success-100: rgba(115, 175, 191, 0.1);
--success-300: rgba(115, 175, 191, 0.3);
--success-600: #5A8C9F;

/* Destructive */
--destructive: #A93226;
--destructive-100: rgba(169, 50, 38, 0.1);
--destructive-300: rgba(169, 50, 38, 0.3);

/* Warning */
--warning: #F8B044;
--warning-100: rgba(248, 176, 68, 0.1);
--warning-600: #C68D36;

/* Primary */
--primary: #55A1B4;
--primary-lighter: #E5F1F4;

/* Glassmorphism */
--glass-white: rgba(255, 255, 255, 0.7);
--glass-border: rgba(255, 255, 255, 0.3);
--glass-shadow-lg: 0 20px 48px rgba(0, 0, 0, 0.1);
```

#### **Typographie**
```css
/* Question */
font-family: var(--font-display);
font-size: var(--text-2xl);
font-weight: var(--font-weight-bold);

/* Options */
font-family: var(--font-body);
font-size: var(--text-base);
font-weight: var(--font-weight-medium);

/* Result title */
font-size: var(--text-4xl);
font-weight: var(--font-weight-bold);

/* Big score */
font-size: var(--text-6xl);
font-weight: var(--font-weight-bold);
```

### 🔍 Utilisation dans l'App

#### **LessonViewerPage.tsx** (avec quiz)
```tsx
const [showQuiz, setShowQuiz] = useState(false);

// Après vidéo terminée
if (lesson.hasQuiz) {
  setShowQuiz(true);
}

{showQuiz && (
  <QuizSystem
    quiz={lessonQuiz}
    onComplete={handleQuizComplete}
    onExit={() => setShowQuiz(false)}
  />
)}

const handleQuizComplete = (result: QuizResult) => {
  if (result.passed) {
    // Marquer leçon comme complétée
    completeLes son(lesson.id);
    
    // Ajouter XP
    addXP(result.xpEarned);
    
    // Success toast
    success(`Quiz réussi ! +${result.xpEarned} XP`);
  } else {
    // Encouragement
    info(`Score : ${result.percentage}%. Il faut ${quiz.passingScore}% pour valider.`);
  }
  
  // Fermer quiz
  setShowQuiz(false);
};
```

---

## 📊 RÉCAPITULATIF FINAL

### ✅ Composants Documentés

| Composant | Props | États | Complexité | Usage Principal |
|-----------|-------|-------|------------|-----------------|
| **BookingModalMinimal** | 4 props | 2 steps (select/confirm) | ⭐⭐⭐ Élevée | Réservation coaching |
| **CelebrationCard** | 6 props | 3 variants | ⭐ Simple | Notifications succès |
| **LessonPlayer** | 6 props | 3 types (video/text/interactive) | ⭐⭐ Moyenne | Lecteur de contenu |
| **QuizSystem** | 3 props | 3 états (question/answered/complete) | ⭐⭐⭐ Élevée | Évaluation connaissances |

### 🎨 Design Patterns Identifiés

1. **Multi-step Modal** - BookingModal (select → confirm)
2. **Variant System** - CelebrationCard (3 variants couleur)
3. **Content Types** - LessonPlayer (video/text/interactive)
4. **State Machine** - QuizSystem (question → answered → complete)
5. **Glassmorphism Everywhere** - Tous les composants utilisent `var(--glass-white)`
6. **Sticky Footer** - BookingModal (footer reste visible au scroll)

---

**Status** : ✅ **Documentation COMPLÈTE des 4 composants manquants**  
**Dernière mise à jour** : 01/04/2026  
**Design System** : TLS v5.3

**Total composants documentés** : 16 composants majeurs  
**Pages de documentation** : 4 documents techniques

---

**Prochaine étape recommandée** : Créer un INDEX.md regroupant tous les documents
