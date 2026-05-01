# 🗺️ USER FLOWS & VIEWERS - THE LEARNING SOCIETY

**Version** : 7.0  
**Date** : 23 janvier 2026  
**Design System** : TLS v5.2

---

## 📋 TABLE DES MATIÈRES

1. [Introduction](#introduction)
2. [Architecture Navigation](#architecture-navigation)
3. [Flows Authentification](#flows-authentification)
4. [Flows Apprentissage](#flows-apprentissage)
5. [Flows Coaching](#flows-coaching)
6. [Flows Journal](#flows-journal)
7. [Viewers Pédagogiques](#viewers-pédagogiques)
8. [États et Transitions](#états-et-transitions)

---

## 🎯 INTRODUCTION

### Pages Principales

| Page | Route | Description | Status |
|------|-------|-------------|--------|
| **Dashboard** | `/dashboard` | Page d'accueil, actions rapides | ✅ Actif |
| **Parcours** | `/parcours` | Liste des parcours de formation | ✅ Actif |
| **Lesson** | `/lesson` | Viewer de leçon (EDRACT) | ✅ Actif |
| **Coaching** | `/coaching` | Réservation sessions coaching | ✅ Actif |
| **Journal** | `/journal` | Journal de bord personnel | ✅ Actif |
| **Veille** | `/veille` | Fil d'actualités et ressources | ✅ Actif |
| **Entreprise** | `/entreprise` | Gestion équipe (admin) | ✅ Actif |
| **Account** | `/account` | Paramètres utilisateur | ✅ Actif |
| **Profile** | `/profile` | Profil public utilisateur | ✅ Actif |

### Viewers Pédagogiques

| Viewer | Type | Status | Usage |
|--------|------|--------|-------|
| **LessonViewer** | EDRACT complet | ✅ Production | Leçons principales |
| **FlashcardsViewer** | Flashcards 3D | ✅ Production | Révision |
| **CourseViewerEDRAC** | Aperçu basique | ⚠️ Basique | Preview |
| **ComplementaryContentViewer** | Router | ⚠️ Router | Redirection |
| **LessonPlayer** | Pattern vidéo | ✅ Pattern | Réutilisable |

---

## 🏗️ ARCHITECTURE NAVIGATION

### Structure Globale

```
┌─────────────────────────────────────────────────┐
│          OptimizedSidebar (gauche)              │
│  - Logo TLS                                     │
│  - Navigation (Dashboard, Parcours, etc.)       │
│  - User menu (Avatar + dropdown)                │
│  - Notifications                                │
└─────────────────────────────────────────────────┘
         │
         ├─→ Dashboard ──────────────────────────┐
         ├─→ Parcours ───→ Lesson Viewer         │
         ├─→ Coaching ───→ Booking Flow          │
         ├─→ Journal ────→ Entry Editor          │
         ├─→ Veille ─────→ Article Detail        │
         ├─→ Entreprise ─→ Team Management       │
         ├─→ Account ────→ Settings               │
         └─→ Profile ────→ Public Profile         │
```

### Navigation Component

**OptimizedSidebar** (`/components/ui/optimized-sidebar.tsx`)

**Props** :
```typescript
interface OptimizedSidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  userHasEnterpriseAccess?: boolean;
  userName?: string;
  userEmail?: string;
  userInitials?: string;
  notifications?: Notification[];
  onMarkNotificationAsRead?: (id: string) => void;
  onMarkAllNotificationsAsRead?: () => void;
  onDeleteNotification?: (id: string) => void;
  notificationDisplayMode?: 'avatar' | 'header' | 'logo';
}
```

**Features** :
- ✅ Navigation principale (8 pages)
- ✅ Avatar + dropdown menu
- ✅ Notifications avec badge count
- ✅ Logout
- ✅ Responsive (collapse sur mobile)
- ✅ Active state highlight

---

## 🔐 FLOWS AUTHENTIFICATION

### 1. Login Flow

```
┌──────────────┐
│  LoginPage   │
│              │
│  [Email]     │
│  [Password]  │
│  [Remember]  │
│              │
│  [ LOGIN ]   │
└──────┬───────┘
       │
       ├─→ Success ──────→ Dashboard
       ├─→ Error ────────→ Toast error
       ├─→ "Forgot?" ────→ ForgotPasswordPage
       └─→ "Sign up" ────→ SignupPage
```

**Interactions** :
- ✅ Email validation
- ✅ Password min 8 chars
- ✅ Remember me checkbox
- ✅ Loading state
- ✅ Error toast
- ⚠️ Pas de OAuth (TODO: Google, LinkedIn)

**Mock Credentials** :
```
Email: demo@tls.com
Password: password123
```

---

### 2. Signup Flow (Multi-step)

```
Step 1/3: Credentials
┌──────────────┐
│  [Email]     │
│  [Password]  │
│  [Confirm]   │
│              │
│  [SUIVANT] ─┼─→ Step 2/3
└──────────────┘

Step 2/3: Profile
┌──────────────┐
│  [Prénom]    │
│  [Nom]       │
│  [Rôle]      │ (Apprenant/Coach/Entreprise)
│              │
│  [SUIVANT] ─┼─→ Step 3/3
└──────────────┘

Step 3/3: Validation
┌──────────────┐
│  [CGU ✓]     │
│  [Newsletter]│
│              │
│  [S'INSCRIRE]├─→ Success → Onboarding
└──────────────┘
```

**Features** :
- ✅ Progress indicator (3 steps)
- ✅ Validation per step
- ✅ Back button
- ✅ Role selection cards
- ✅ Terms & conditions

---

### 3. Password Reset Flow

```
Forgot Password
┌──────────────┐
│  [Email]     │
│              │
│  [ENVOYER] ─┼─→ Email sent
└──────────────┘
       │
       ▼
Email received → Click link
       │
       ▼
┌──────────────┐
│  Reset Page  │
│              │
│  [New Pwd]   │
│  [Confirm]   │
│              │
│  [RESET] ────┼─→ Success → Login
└──────────────┘
```

---

## 📚 FLOWS APPRENTISSAGE

### 1. Parcours → Leçon Flow

```
Dashboard
   │
   ├─→ "Parcours" button
   │
   ▼
ParcoursPage (liste des parcours)
   │
   ├─→ Clic sur un parcours
   │
   ▼
Parcours Detail (étapes + leçons)
   │
   ├─→ Clic sur une leçon
   │
   ▼
LessonViewer (viewer EDRACT)
   │
   ├─→ Navigation sections (E-D-R-A-C-T)
   ├─→ Progression tracking
   ├─→ Quiz validation
   └─→ "Suivant" → Prochaine leçon
```

**Tracking** :
- ✅ Sections complétées (Set)
- ✅ Score quiz (%)
- ✅ Temps passé
- ✅ Réponses de réflexion sauvegardées

---

### 2. Dashboard → Reprendre Flow

```
Dashboard
   │
   ├─→ Card "Reprendre l'apprentissage"
   │   (Shows current lesson progress)
   │
   ▼
LessonViewer (section en cours)
   │
   └─→ Reprend à la dernière section visitée
```

---

## 🎓 FLOWS COACHING

### 1. Réservation Session

```
Dashboard/Coaching Page
   │
   ├─→ "Réserver une session"
   │
   ▼
Coach Selection
   │
   ├─→ Filtres (Spécialité, Dispo, Rating)
   ├─→ Clic sur un coach
   │
   ▼
Calendar Booking (Calendly-like)
   │
   ├─→ Sélection date
   ├─→ Sélection créneau
   ├─→ Formulaire (Sujet, Notes)
   │
   ▼
Confirmation
   │
   ├─→ Email confirmation
   ├─→ Calendar invite
   └─→ Dashboard (session visible)
```

**Features** :
- ✅ Coach profiles avec bio, spécialités, rating
- ✅ Calendar disponibilités
- ✅ Booking form
- ✅ Confirmation email
- ⚠️ Payment flow (TODO)

---

### 2. Session Coaching Flow

```
Dashboard → "Prochaines sessions"
   │
   ▼
Session Detail
   │
   ├─→ Countdown (J-X, H:MM)
   ├─→ "Rejoindre" button (visible 10 min avant)
   │
   ▼
Video Call (external ou intégré)
   │
   └─→ Post-session: Feedback form
```

---

## 📓 FLOWS JOURNAL

### 1. Créer Entrée Libre

```
Dashboard/Journal Page
   │
   ├─→ "Réflexion libre" card
   │
   ▼
Journal Entry Editor (Free)
   │
   ├─→ Rich text editor
   ├─→ Tags
   ├─→ Mood selector
   ├─→ Privacy (public/private)
   │
   ▼
Save Entry
   │
   └─→ Journal Page (liste entrées)
```

---

### 2. Créer Entrée Apprentissage

```
Dashboard/Journal Page
   │
   ├─→ "Apprentissage" card
   │
   ▼
Journal Entry Editor (Learning Template)
   │
   ├─→ "Qu'avez-vous appris ?"
   ├─→ "Comment allez-vous l'appliquer ?"
   ├─→ "Difficultés rencontrées ?"
   ├─→ Tags auto (learning, skill)
   │
   ▼
Save Entry
   │
   └─→ Linked to Lesson (optional)
```

---

### 3. Consulter Journal

```
Journal Page
   │
   ├─→ Liste des entrées (cards)
   ├─→ Filtres (Date, Type, Tags, Mood)
   ├─→ Recherche
   │
   ├─→ Clic sur une entrée
   │
   ▼
Journal Entry Detail
   │
   ├─→ Full content
   ├─→ Edit button
   ├─→ Delete button
   ├─→ Share button (if public)
   └─→ Comments (if public)
```

---

## 📺 VIEWERS PÉDAGOGIQUES

### 1️⃣ LessonViewer (EDRACT Complet)

**Fichier** : `/pages/LessonViewer.tsx`

**Usage** : Viewer principal pour leçons complètes avec méthodologie EDRACT

#### Structure EDRACT

```
E - Engagement (Introduction)
D - Découvrir (Contenu principal)
R - Réfléchir (Réflexion guidée)
A - Apprendre (Synthèse)
C - Confirmer (Quiz)
T - Transférer (Application pratique)
```

#### Props

```typescript
interface LessonViewerProps {
  onNavigate: (page: string) => void;
  onLogout: () => void;
  lessonId?: number;  // Default: 1
}
```

#### Features

- ✅ **Navigation par sections** : Dots horizontaux avec progression
- ✅ **Tracking** : Sections complétées marquées
- ✅ **Quiz interactif** : QCM avec validation et feedback
- ✅ **Réflexion guidée** : Textareas sauvegardées
- ✅ **Media** : Vidéo, audio, images placeholders
- ✅ **Boutons** : Précédent/Suivant avec logique conditionnelle
- ✅ **Markdown-like parsing** : `**Headers**`, `• bullets`

#### Data Source

`/data/lessonsData.tsx`

```typescript
interface Lesson {
  id: number;
  title: string;
  description: string;
  sections: Section[];
}

interface Section {
  id: string;
  title: string;
  type: 'text' | 'quiz' | 'reflection' | 'subsections';
  content?: string;
  questions?: Question[];
  reflectionQuestions?: string[];
  subsections?: Subsection[];
}
```

#### Exemple d'Utilisation

```tsx
<LessonViewer
  onNavigate={handleNavigate}
  onLogout={handleLogout}
  lessonId={1}
/>
```

---

### 2️⃣ FlashcardsViewer (Interactive 3D)

**Fichier** : `/pages/FlashcardsViewer.tsx`

**Usage** : Révision avec cartes interactives flip 3D

#### Features

- ✅ **Flip 3D** : Transform rotate pour flip
- ✅ **Navigation** : Précédent/Suivant
- ✅ **Progress** : "X / Total"
- ✅ **Shuffle** : Mélanger les cartes
- ✅ **Mark as known** : Filtrer les cartes connues
- ✅ **Keyboard support** : Space (flip), Arrow keys (navigate)

#### Data Structure

```typescript
interface Flashcard {
  id: number;
  question: string;
  answer: string;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}
```

#### Exemple

```tsx
<FlashcardsViewer
  flashcards={flashcardsData}
  onNavigate={handleNavigate}
  onLogout={handleLogout}
/>
```

---

### 3️⃣ CourseViewerEDRAC (Basique)

**Fichier** : `/pages/CourseViewerEDRAC.tsx`

**Usage** : Preview simple d'une leçon (sans interactions avancées)

#### Features

- ✅ **Affichage linéaire** : Toutes sections visibles
- ✅ **Scroll** : Navigation par scroll
- ⚠️ **Pas de tracking** : Pas de progression
- ⚠️ **Pas de quiz interactif** : Questions affichées seulement

**Recommandation** : Utiliser LessonViewer pour production

---

### 4️⃣ ComplementaryContentViewer (Router)

**Fichier** : `/pages/ComplementaryContentViewer.tsx`

**Usage** : Router pour différents types de contenus complémentaires

#### Logique

```typescript
switch (contentType) {
  case 'video':
    return <VideoPlayer />;
  case 'article':
    return <ArticleReader />;
  case 'quiz':
    return <QuizViewer />;
  case 'flashcards':
    return <FlashcardsViewer />;
  default:
    return <LessonViewer />;
}
```

**Recommandation** : Pattern router pour contenus variés

---

### 5️⃣ LessonPlayer (Pattern Réutilisable)

**Fichier** : `/components/patterns/LessonPlayer.tsx`

**Usage** : Composant générique pour player vidéo/audio avec controls

#### Props

```typescript
interface LessonPlayerProps {
  src: string;
  type: 'video' | 'audio';
  title?: string;
  thumbnail?: string;
  autoplay?: boolean;
  onComplete?: () => void;
}
```

#### Features

- ✅ **Controls custom** : Play/pause, seek, volume
- ✅ **Progress bar** : Temps écoulé/total
- ✅ **Fullscreen** : Toggle fullscreen
- ✅ **Speed control** : 0.5x, 1x, 1.5x, 2x
- ✅ **Keyboard shortcuts** : Space, arrows, F

#### Exemple

```tsx
<LessonPlayer
  src="/videos/lesson-1.mp4"
  type="video"
  title="Introduction au Prompt Engineering"
  thumbnail="/thumbnails/lesson-1.jpg"
  onComplete={() => console.log('Lesson completed')}
/>
```

---

## ⚡ ÉTATS ET TRANSITIONS

### États Page

| État | Description | UI |
|------|-------------|-----|
| **Loading** | Chargement données | Spinner |
| **Empty** | Pas de données | Empty state illustration |
| **Error** | Erreur API | Toast error + retry button |
| **Success** | Données chargées | Content affiché |

### États Composant

| Composant | États | Transitions |
|-----------|-------|-------------|
| **Button** | default, hover, active, disabled, loading | hover → active → default |
| **Input** | default, focus, error, disabled | focus ↔ default, error → default |
| **Card** | default, hover, active, loading | hover → active → default |
| **Quiz** | unanswered → answered → validated | one-way |

### Loading States

```tsx
// Page level
{isLoading && <Spinner />}
{!isLoading && data && <Content />}
{!isLoading && error && <ErrorState />}

// Component level
<Button loading={isSubmitting}>
  {isSubmitting ? 'Envoi...' : 'Envoyer'}
</Button>
```

---

## 🔄 TRANSITIONS ANIMATIONS

### Page Transitions

```css
/* Fade in */
.page-enter {
  opacity: 0;
}
.page-enter-active {
  opacity: 1;
  transition: opacity var(--duration-normal) var(--ease-out);
}

/* Slide in from right */
.slide-enter {
  transform: translateX(100%);
}
.slide-enter-active {
  transform: translateX(0);
  transition: transform var(--duration-normal) var(--ease-out);
}
```

### Component Transitions

```tsx
// Hover scale
<div style={{
  transition: 'transform var(--duration-fast) var(--ease-out)',
}}
onMouseEnter={(e) => {
  e.currentTarget.style.transform = 'scale(1.05)';
}}
onMouseLeave={(e) => {
  e.currentTarget.style.transform = 'scale(1)';
}}
/>

// Fade + translate
<div style={{
  transition: 'all var(--duration-normal) var(--ease-out)',
}}
className="hover:-translate-y-2"
/>
```

---

## 📊 ANALYTICS & TRACKING

### Events à Tracker

| Event | Page | Données |
|-------|------|---------|
| `lesson_started` | LessonViewer | lessonId, userId, timestamp |
| `lesson_completed` | LessonViewer | lessonId, userId, duration, score |
| `quiz_submitted` | LessonViewer | lessonId, answers, score, attempts |
| `coaching_booked` | CoachingPage | coachId, date, duration |
| `journal_created` | JournalPage | entryType, tags, mood |
| `page_view` | All pages | page, userId, timestamp, duration |

### Tracking Implementation

```typescript
// Example
const trackEvent = (event: string, data: object) => {
  // Send to analytics service
  console.log('[Analytics]', event, data);
  
  // Example: Google Analytics
  // gtag('event', event, data);
  
  // Example: Custom API
  // api.post('/analytics/events', { event, data });
};

// Usage
trackEvent('lesson_started', {
  lessonId: 1,
  userId: 'user123',
  timestamp: Date.now(),
});
```

---

## 🎯 NEXT STEPS & ROADMAP

### Flows à Implémenter

| Flow | Priorité | Temps Estimé |
|------|----------|--------------|
| **OAuth Login** (Google, LinkedIn) | 🔴 Haute | 2-3h |
| **Onboarding multi-step** | 🔴 Haute | 4-5h |
| **Payment flow** (Coaching) | 🟠 Moyenne | 6-8h |
| **Team management** (Entreprise) | 🟡 Basse | 8-10h |
| **Certificats** (fin de parcours) | 🟡 Basse | 4-6h |

### Viewers à Améliorer

| Viewer | Amélioration | Priorité |
|--------|--------------|----------|
| **LessonViewer** | Annotations, notes inline | 🟠 Moyenne |
| **FlashcardsViewer** | Spaced repetition algorithm | 🟠 Moyenne |
| **CourseViewerEDRAC** | Migrer vers LessonViewer | 🟡 Basse |

---

**🗺️ The Learning Society - User Flows & Viewers**  
**Version** : 7.0  
**Dernière mise à jour** : 23 janvier 2026  
**Pages** : 9 actives  
**Viewers** : 5 disponibles  
**Statut** : ✅ Production-ready
