# 🎓 THE LEARNING SOCIETY - Structure de l'Application

## 📱 Application Complète Restaurée

L'application **The Learning Society** est maintenant restaurée avec toutes ses pages et fonctionnalités.

---

## 🗺️ Navigation Principale

### Pages Principales

| Page | Route | Description |
|------|-------|-------------|
| **Dashboard** | `dashboard` | Page d'accueil avec statistiques, quick wins, citations |
| **Parcours** | `parcours` | Gestion des cours avec structure hiérarchique |
| **Coaching** | `coaching` | Réservation de sessions coaching type Calendly |
| **Veille** | `veille` | Hub de veille avec dossiers, mag, vidéos, newsletter |
| **Journal** | `journal` | Journal d'apprentissage avec prompts quotidiens |
| **Profil** | `profile` | Profil utilisateur avec badges et progression |
| **Notifications** | `notifications` | Centre de notifications |
| **Messages** | `messages` | Messagerie interne |
| **Compte** | `account` | Paramètres du compte |
| **Classement** | `leaderboard` | Leaderboard gamification |

---

## 🎯 Pages Veille

| Page | Route | Description |
|------|-------|-------------|
| **Magazine** | `magazine` | Articles de fond thématiques |
| **Vidéos** | `videos` | Reels vidéos courtes format |
| **Newsletter** | `newsletter` | Newsletters hebdomadaires |

---

## 📖 Viewers (Pages de Contenu)

| Viewer | Route | Usage |
|--------|-------|-------|
| **Lesson Viewer** | `lesson-viewer` | Lecteur de leçon avec progression |
| **Video Viewer** | `video-viewer` | Lecteur vidéo avec notes |
| **Course Viewer** | `course-viewer` | Viewer de cours EDRAC |
| **Veille Content** | `veille-content` | Viewer de contenu veille |
| **Magazine Article** | `magazine-article` | Lecteur d'article magazine |
| **Newsletter Detail** | `newsletter-detail` | Détail newsletter |

---

## 🎨 Pages Spéciales

| Page | Route | Description |
|------|-------|-------------|
| **Design System** | `design-system` | Documentation design system TLS |
| **Login** | `login` | Page de connexion |

---

## 🧭 Navigation dans le Code

### App.tsx

```tsx
// État de navigation
const [currentPage, setCurrentPage] = useState<PageType>('dashboard');

// Fonction de navigation
const handleNavigate = (page: string, courseId?: string, entryType?: string) => {
  setCurrentPage(page as PageType);
  // ...
};

// Rendu conditionnel
switch (currentPage) {
  case 'dashboard':
    return <DashboardPageUpgraded onNavigate={handleNavigate} />;
  case 'parcours':
    return <ParcoursPageUpgraded onNavigate={handleNavigate} />;
  // ...
}
```

---

## 🎨 Design System

### Import CSS

```tsx
import './styles/globals.css'; // Unique import nécessaire
```

### Variables Disponibles

Toutes les pages utilisent les variables CSS du design system TLS :

- **Couleurs** : `--primary`, `--secondary`, `--accent`, `--success`, `--error`
- **Espacement** : `--space-1` à `--space-16`
- **Bordures** : `--border`, `--border-primary`, `--border-secondary`
- **Radius** : `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, `--radius-full`
- **Typographie** : `--font-display` (League Spartan), `--font-body` (Nunito)

---

## 🏗️ Structure des Composants

### Composants Communs

```
/components/common/
├── Badge.tsx              // Badge générique
├── Button.tsx             // Boutons design system
├── Card.tsx               // Cards génériques
├── GlassCard.tsx          // Cards glassmorphism
├── PageContainer.tsx      // Container de page
├── PageHeaderSimple.tsx   // En-tête de page
├── SectionHeader.tsx      // En-tête de section
├── SearchBar.tsx          // Barre de recherche
└── FilterBar.tsx          // Barre de filtres
```

### Composants Patterns

```
/components/patterns/
├── CardPatterns.tsx       // Patterns de cards réutilisables
└── LessonPlayer.tsx       // Lecteur de leçon
```

### Composants UI

```
/components/ui/
├── optimized-sidebar.tsx  // Sidebar principale
├── background-blobs.tsx   // Blobs animés
├── badge.tsx              // Badge UI
├── button.tsx             // Bouton UI
└── ...                    // Autres composants UI
```

---

## 📊 Data

### Données Mock

```
/data/
├── coachingSessions.ts    // Sessions coaching
├── dailyQuickWins.ts      // Quick wins quotidiens
├── descriptivePhrases.ts  // Phrases descriptives
├── journalEntries.ts      // Entrées journal
├── learningQuotes.ts      // Citations apprentissage
├── lessonsData.ts         // Données des leçons
├── notificationsData.ts   // Notifications
├── veilleDossiersData.ts  // Dossiers veille
├── veilleMagData.ts       // Articles magazine
├── veilleVideosData.ts    // Vidéos veille
└── weeklyNewsData.ts      // Newsletters
```

---

## 🎯 Fonctionnalités Clés

### 1. Système de Parcours

Structure hiérarchique : **PARCOURS → ÉTAPES → LEÇONS**

```tsx
// Dans ParcoursPageUpgraded.tsx
const parcours = [
  {
    id: 1,
    title: "JavaScript Avancé",
    etapes: [
      {
        id: 1,
        title: "Programmation Asynchrone",
        lecons: [...]
      }
    ]
  }
];
```

### 2. Coaching Calendly-like

Réservation de créneaux avec modal de confirmation.

```tsx
// Dans CoachingPageUpgraded.tsx
<BookingModal
  selectedSlot={selectedSlot}
  onConfirm={handleBookingConfirm}
  onClose={() => setShowBookingModal(false)}
/>
```

### 3. Gamification

Badges, progression, streaks, classement.

```tsx
// Hook de stats utilisateur
const { stats } = useUserStats();
// stats.level, stats.xp, stats.badges, stats.streak...
```

### 4. Journal d'Apprentissage

Prompts quotidiens, entrées libres, réflexions guidées.

```tsx
// Dans JournalPageUpgraded.tsx
<JournalPromptCard
  title="Apprentissage"
  prompt="Qu'avez-vous appris aujourd'hui ?"
  onStart={() => handleNavigate('journal-new', undefined, 'apprentissage')}
/>
```

### 5. Veille Multi-Format

Dossiers, magazine, vidéos reels, newsletters.

```tsx
// Dans VeillePage.tsx
const sections = ['dossiers', 'mag', 'videos', 'news'];
```

---

## 🎨 Styles & Animations

### Glassmorphism

```tsx
// Utilisation de GlassCard
<GlassCard>
  <h3>Contenu avec effet glassmorphism</h3>
</GlassCard>
```

### Animations Motion

```tsx
import { motion } from 'motion/react';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Contenu animé
</motion.div>
```

### Background Blobs

```tsx
<BackgroundBlobs opacity={0.15} />
```

---

## 🚀 Démarrage

L'application démarre sur le **Dashboard** par défaut.

Pour changer la page de démarrage, modifier dans `App.tsx` :

```tsx
const [currentPage, setCurrentPage] = useState<PageType>('dashboard'); 
// Changer 'dashboard' par la page souhaitée
```

---

## 📝 Notes Importantes

1. **Design System** : Toutes les pages utilisent les variables CSS de `/styles/globals.css`
2. **Responsive** : Desktop-first, responsive sur mobile
3. **Navigation** : Système de navigation centralisé dans `App.tsx`
4. **Sidebar** : `OptimizedSidebar` présent sur toutes les pages principales
5. **Mock Data** : Toutes les données sont mockées dans `/data/`

---

## 🎓 Pages Éducatives

### Structure d'un Cours

```
Parcours
└── Étape 1
    ├── Leçon 1 (texte, vidéo, quiz)
    ├── Leçon 2
    └── Leçon 3
└── Étape 2
    └── ...
```

### Types de Contenu

- **Leçons** : Texte + médias + quiz
- **Vidéos** : Lecteur vidéo avec progression
- **Quiz** : Questions interactives
- **Coaching** : Sessions 1-to-1

---

**THE LEARNING SOCIETY** - Plateforme d'apprentissage SaaS complète 🎓

_Dernière mise à jour : 22 février 2026_
