# 📚 COMPOSANTS MÉTIER - Documentation Technique Complète

**Date** : 01/04/2026  
**Design System** : TLS v5.3  
**Composants** : Achievement Card, AchievementUnlockModal, Stats Card, UpcomingSessionCard, PageHeaderFinal

---

## 1️⃣ ACHIEVEMENT CARD

### 📦 Props TypeScript

#### **Achievement (Interface)**
```typescript
export interface Achievement {
  id: string;                      // Identifiant unique
  title: string;                   // Titre de l'achievement
  description: string;             // Description détaillée
  
  // Catégorie
  category: 'learning' | 'social' | 'streak' | 'mastery' | 'special';
  
  // Visuel
  icon: string;                    // Emoji ou icône (ex: "🏆")
  
  // Récompense
  reward: {
    xp: number;                    // Points XP gagnés
    badge?: string;                // Badge optionnel
  };
  
  // Progression
  requirement: {
    type: 'lessons' | 'streak' | 'hours' | 'quiz-score' | 'custom';
    target: number;                // Objectif à atteindre
    current: number;               // Progression actuelle
    label: string;                 // Label (ex: "leçons", "jours")
  };
  
  // État
  unlocked: boolean;               // Débloqué ou non
  unlockedAt?: Date;               // Date de déblocage
  
  // Rareté
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}
```

#### **AchievementCard (Props)**
```typescript
interface AchievementCardProps {
  achievement: Achievement;        // REQUIS - Données de l'achievement
  onClick?: () => void;            // Callback au click
  compact?: boolean;               // Mode compact (défaut: false)
}
```

#### **AchievementList (Props)**
```typescript
interface AchievementListProps {
  achievements: Achievement[];     // REQUIS - Liste d'achievements
  onAchievementClick?: (achievement: Achievement) => void;
  filter?: 'all' | 'unlocked' | 'locked'; // Défaut: 'all'
  compact?: boolean;               // Mode compact (défaut: false)
}
```

### 🎨 États Visuels

#### **État : Locked (Non débloqué)**

**Visuel** :
- Icône : `<Lock />` (Lucide) au lieu de l'emoji
- Opacité : `0.8`
- Couleur : Gris neutre (`var(--neutral-200)`)
- Border : `var(--glass-border)` (subtile)
- Shadow : `var(--glass-shadow)` (légère)
- Progress bar visible avec progression

**Tokens CSS** :
```css
background: var(--glass-white);
backdrop-filter: var(--blur-xl);
border: 2px solid var(--glass-border);
box-shadow: var(--glass-shadow);
opacity: 0.8;

/* Icon container */
background: var(--neutral-200);
box-shadow: none;

/* Lock icon */
color: var(--neutral-400);
```

**Structure** :
```tsx
// Mode standard (carte)
<div className="achievement-card">
  <div className="rarity-badge">common</div>  {/* Gris */}
  <div className="icon-container bg-neutral-200">
    <Lock className="w-10 h-10 text-neutral-400" />
  </div>
  <div className="info">
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
  <ProgressBarEnhanced
    current={5}
    total={10}
    label="leçons"
  />
  <p className="reward">Récompense : +50 XP</p>
</div>
```

#### **État : Unlocked (Débloqué)**

**Visuel** :
- Icône : Emoji du achievement
- Opacité : `1`
- Couleur : Selon rareté (voir ci-dessous)
- Border : Couleur de rareté
- Shadow : Glow coloré selon rareté
- Date de déblocage affichée
- XP gagné affiché

**Tokens CSS** :
```css
background: var(--glass-white);
border: 2px solid ${rarityConfig.border};
box-shadow: 0 8px 24px ${rarityConfig.glow};
opacity: 1;

/* Icon container */
background: ${rarityConfig.gradient};
box-shadow: 0 8px 24px ${rarityConfig.glow};

/* Animation hover */
transform: scale(1.02) translateY(-4px);
```

**Structure** :
```tsx
<div className="achievement-card unlocked">
  <div className="rarity-badge legendary">legendary</div>
  <div className="icon-container legendary-gradient">
    {icon} {/* Emoji 🏆 */}
  </div>
  <div className="info">
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
  <div className="unlocked-info">
    <p>📅 Débloqué le {date}</p>
    <p>🏆 +{xp} XP gagnés</p>
  </div>
</div>
```

#### **État : Newly-Unlocked (Vient d'être débloqué)**

**⚠️ Pas d'état "newly-unlocked" dans le composant**

Cet état est géré par **AchievementUnlockModal** (voir section dédiée)

#### **État : In-Progress (En cours)**

**⚠️ Pas d'état spécifique "in-progress"**

État locked avec progress bar visible = en cours

**Visuel** :
- Même que "locked"
- Progress bar montre avancement
- Texte : `{current}/{target} {label}`

### 🎨 Configurations de Rareté

#### **Common (Commun)**
```typescript
{
  gradient: 'linear-gradient(135deg, var(--neutral-400), var(--neutral-600))',
  glow: 'rgba(107, 114, 128, 0.3)',      // Gris
  border: 'var(--neutral-300)',
}
```

**Tokens CSS** :
```css
/* Gradient icon */
background: linear-gradient(135deg, #9AABB0, #535B62);

/* Glow shadow */
box-shadow: 0 8px 24px rgba(107, 114, 128, 0.3);

/* Border */
border-color: #C8D4D7;
```

#### **Rare**
```typescript
{
  gradient: 'linear-gradient(135deg, var(--primary-500), var(--primary-700))',
  glow: 'rgba(85, 161, 180, 0.3)',       // Bleu TLS
  border: 'var(--primary-300)',
}
```

**Tokens CSS** :
```css
background: linear-gradient(135deg, #55A1B4, #3D7786);
box-shadow: 0 8px 24px rgba(85, 161, 180, 0.3);
border-color: #96C3CF;
```

#### **Epic**
```typescript
{
  gradient: 'linear-gradient(135deg, var(--secondary-500), var(--secondary-700))',
  glow: 'rgba(237, 132, 58, 0.3)',       // Orange TLS
  border: 'var(--secondary-300)',
}
```

**Tokens CSS** :
```css
background: linear-gradient(135deg, #ED843A, #8F5017);
box-shadow: 0 8px 24px rgba(237, 132, 58, 0.3);
border-color: #F59A5F;
```

#### **Legendary**
```typescript
{
  gradient: 'linear-gradient(135deg, var(--accent-400), var(--accent-600))',
  glow: 'rgba(248, 176, 68, 0.4)',       // Jaune TLS
  border: 'var(--accent-300)',
}
```

**Tokens CSS** :
```css
background: linear-gradient(135deg, #F8B044, #C68D36);
box-shadow: 0 8px 24px rgba(248, 176, 68, 0.4);
border-color: #FFC15A;
```

### 📐 Structure Visuelle Complète

#### **Mode Standard (carte)**

```
┌─────────────────────────────────────────┐
│ [LEGENDARY]                        ← Badge rareté (top-right)
│                                         │
│         ┌───────────┐                   │
│         │    🏆     │                   │ ← Icon 80x80px, gradient rareté
│         └───────────┘                   │
│                                         │
│        Premier pas                      │ ← Title (text-lg, bold)
│   Terminer votre première leçon        │ ← Description (text-sm)
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ 📅 Débloqué le 15/03/2026      │   │ ← Unlocked info (si unlocked)
│  │ 🏆 +50 XP gagnés               │   │
│  └─────────────────────────────────┘   │
│                                         │
│  OU (si locked):                        │
│  ██████████░░░░░░░░░░ 50%              │ ← Progress bar
│  5/10 leçons                            │
│  Récompense : +50 XP                    │
└─────────────────────────────────────────┘

Dimensions:
- Width: Flexible (grid)
- Padding: var(--card-padding-y) var(--card-padding-x)
- Border-radius: 16px (rounded-2xl)
- Border: 2px solid
```

#### **Mode Compact (liste)**

```
┌─────────────────────────────────────────────────────┐
│  ┌────┐  Premier pas                    [+50 XP]   │
│  │ 🏆 │  5/10 leçons                                │
│  └────┘                                             │
└─────────────────────────────────────────────────────┘

Layout:
- Horizontal (flex)
- Icon: 48x48px
- Gap: var(--card-gap)
- Padding: compact
- No progress bar
- XP badge à droite
```

### 🎨 Tous les Tokens CSS Utilisés

#### **Couleurs**
```css
/* Backgrounds */
--glass-white: rgba(255, 255, 255, 0.7);
--glass-border: rgba(255, 255, 255, 0.3);

/* Rarity gradients */
--neutral-400, --neutral-600  /* Common */
--primary-500, --primary-700  /* Rare */
--secondary-500, --secondary-700  /* Epic */
--accent-400, --accent-600    /* Legendary */

/* Text */
--foreground: #252B37;
--muted-foreground: #6b7280;
--accent: #F8B044;            /* XP color */

/* Borders */
--neutral-300, --primary-300, --secondary-300, --accent-300
```

#### **Typographie**
```css
/* Rarity badge */
font-size: var(--text-xs);
font-weight: var(--font-weight-bold);
text-transform: uppercase;
letter-spacing: var(--tracking-wider);

/* Title */
font-size: var(--text-lg);
font-weight: var(--font-weight-bold);

/* Description */
font-size: var(--text-sm);
line-height: var(--leading-relaxed);

/* Stats */
font-family: var(--font-display);  /* AchievementList header */
font-size: var(--text-xl);
```

#### **Spacing**
```css
/* Card padding */
padding: var(--card-padding-y) var(--card-padding-x);  /* Standard */
padding: var(--card-padding-y-compact) var(--card-padding-x-compact);  /* Compact */

/* Gaps */
gap: var(--card-gap);
margin-bottom: 16px;  /* mb-4 */
```

#### **Effects**
```css
/* Glassmorphism */
backdrop-filter: var(--blur-xl);
background: var(--glass-white);
border: 2px solid var(--glass-border);
box-shadow: var(--glass-shadow);

/* Unlocked glow */
box-shadow: 0 8px 24px ${rarityConfig.glow};

/* Hover animation */
transform: scale(1.02) translateY(-4px);
transition: all 300ms ease;
```

### 🎬 Animations

#### **Hover (avec onClick)**
```tsx
motion.div
  whileHover={{ scale: 1.02, translateY: -4 }}
  whileTap={{ scale: 0.98 }}
```

#### **Icon Hover**
```tsx
group-hover:scale-110
transition-transform duration-300
```

**Comportement** :
- Carte : Scale 1.02 + monte de 4px
- Icône : Scale 1.1
- Transition : 300ms ease

### 📊 Composant AchievementList

**Features** :
- Affiche statistiques globales (count, total XP)
- Filtrage : all / unlocked / locked
- Layout : Grid (standard) ou Stack (compact)
- Grid : 1 col mobile, 2 cols tablet, 3 cols desktop

**Structure** :
```tsx
<AchievementList
  achievements={achievements}
  onAchievementClick={handleClick}
  filter="unlocked"
  compact={false}
>
  {/* Stats header */}
  <div className="stats">
    <div>
      <h3>Achievements</h3>
      <p>{unlockedCount}/{total} débloqués</p>
    </div>
    <div>
      <p className="total-xp">{totalXP} XP</p>
      <p>Total gagné</p>
    </div>
  </div>
  
  {/* Grid */}
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {achievements.map(...)}
  </div>
</AchievementList>
```

---

## 2️⃣ ACHIEVEMENT UNLOCK MODAL

### 📦 Props TypeScript

```typescript
interface AchievementUnlockModalProps {
  achievement: Achievement;        // REQUIS - Achievement débloqué
  open: boolean;                   // REQUIS - État ouverture
  onClose: () => void;             // REQUIS - Callback fermeture
}
```

### 🎨 Structure Visuelle

**⚠️ Fichier non trouvé dans l'analyse**

Basé sur les patterns TLS, structure attendue :

```tsx
<Dialog open={open} onOpenChange={onClose}>
  <DialogContent className="max-w-md">
    {/* Confetti background */}
    <Confetti />
    
    {/* Icon - Grande taille avec animation */}
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", duration: 0.6 }}
      className="icon-container legendary"
    >
      {achievement.icon}
    </motion.div>
    
    {/* Title */}
    <h2>Achievement débloqué !</h2>
    <h3>{achievement.title}</h3>
    
    {/* Description */}
    <p>{achievement.description}</p>
    
    {/* Rewards */}
    <div className="rewards">
      <div className="xp-badge">
        +{achievement.reward.xp} XP
      </div>
      {achievement.reward.badge && (
        <div className="badge">
          Badge "{achievement.reward.badge}"
        </div>
      )}
    </div>
    
    {/* CTA */}
    <Button onClick={onClose}>
      Continuer
    </Button>
  </DialogContent>
</Dialog>
```

### 🎬 Animations Attendues

```tsx
// Icon entrance
initial={{ scale: 0, rotate: -180, y: -100 }}
animate={{ scale: 1, rotate: 0, y: 0 }}
transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}

// Glow pulse
animate={{ 
  boxShadow: [
    '0 8px 24px rgba(248, 176, 68, 0.4)',
    '0 8px 32px rgba(248, 176, 68, 0.6)',
    '0 8px 24px rgba(248, 176, 68, 0.4)',
  ]
}}
transition={{ duration: 2, repeat: Infinity }}

// Confetti
<Confetti
  numberOfPieces={200}
  recycle={false}
  colors={['#55A1B4', '#ED843A', '#F8B044']}
/>
```

---

## 3️⃣ STATS CARD / KPI CARD

### 📦 Props TypeScript

```typescript
interface StatsCardProps {
  label: string;                   // REQUIS - Titre de la stat
  value: string | number;          // REQUIS - Valeur principale
  icon?: LucideIcon;               // Icône optionnelle
  trend?: {
    value: number;                 // Variation en %
    direction: 'up' | 'down' | 'neutral';
    label?: string;                // Ex: "vs mois dernier"
  };
  color?: 'primary' | 'secondary' | 'accent' | 'success'; // Couleur thème
  variant?: 'default' | 'compact' | 'gradient';
  onClick?: () => void;
}
```

### 🎨 Variants Disponibles

#### **Variant: default**

**Visuel** :
- Card complète avec glassmorphism
- Icône en haut à gauche ou droite
- Valeur en grand (text-3xl)
- Label en petit (text-sm)
- Trend indicator optionnel

**Structure** :
```tsx
<div className="stats-card">
  {/* Icon */}
  <div className="icon-container primary">
    <TrendingUp />
  </div>
  
  {/* Content */}
  <div className="content">
    <p className="label">Leçons complétées</p>
    <p className="value">127</p>
    
    {/* Trend */}
    <div className="trend up">
      <TrendingUp />
      <span>+12%</span>
      <span className="period">vs mois dernier</span>
    </div>
  </div>
</div>
```

#### **Variant: compact**

**Visuel** :
- Layout horizontal
- Icône à gauche (plus petite)
- Pas de trend indicator
- Padding réduit

```tsx
<div className="stats-card compact">
  <div className="icon-sm">
    <Icon />
  </div>
  <div>
    <p className="label">Heures</p>
    <p className="value">42h</p>
  </div>
</div>
```

#### **Variant: gradient**

**Visuel** :
- Background avec gradient de couleur
- Texte blanc
- Pas de glassmorphism
- Effet glow

```tsx
<div className="stats-card gradient primary">
  <div className="content">
    <p className="label">Streak actuel</p>
    <p className="value">14 jours</p>
  </div>
  <div className="icon-large">
    🔥
  </div>
</div>
```

### 🎨 Couleurs par Thème

```typescript
const colorConfigs = {
  primary: {
    bg: 'var(--primary-lighter)',
    icon: 'var(--primary)',
    gradient: 'var(--gradient-primary)',
  },
  secondary: {
    bg: 'var(--secondary-lighter)',
    icon: 'var(--secondary)',
    gradient: 'var(--gradient-cta)',
  },
  accent: {
    bg: 'var(--accent-lighter)',
    icon: 'var(--accent-foreground)',  // Dark text
    gradient: 'var(--gradient-accent-gold)',
  },
  success: {
    bg: 'var(--success-50)',
    icon: 'var(--success)',
    gradient: 'var(--gradient-success)',
  },
};
```

### 📐 Éléments Visuels

#### **Valeur principale**
```css
font-family: var(--font-display);
font-size: var(--text-3xl);     /* 30px */
font-weight: var(--font-weight-bold);
color: var(--foreground);
line-height: 1;
```

#### **Label**
```css
font-family: var(--font-body);
font-size: var(--text-sm);      /* 14px */
font-weight: var(--font-weight-medium);
color: var(--muted-foreground);
margin-bottom: var(--space-2);
```

#### **Icône**
```css
/* Container */
width: 48px;
height: 48px;
border-radius: var(--radius-xl);
background: var(--primary-lighter);
display: flex;
align-items: center;
justify-content: center;

/* Icon */
width: 24px;
height: 24px;
color: var(--primary);
```

#### **Trend Indicator**
```css
/* Container */
display: flex;
align-items: center;
gap: var(--space-2);
margin-top: var(--space-2);

/* Up (positive) */
color: var(--success);

/* Down (negative) */
color: var(--destructive);

/* Neutral */
color: var(--muted-foreground);

/* Icon */
width: 14px;
height: 14px;

/* Value */
font-size: var(--text-sm);
font-weight: var(--font-weight-semibold);

/* Period label */
font-size: var(--text-xs);
color: var(--muted-foreground);
```

### 🔍 Utilisation dans DashboardPageUpgraded

```tsx
// Example 1: Leçons complétées
<StatsCard
  label="Leçons complétées"
  value={127}
  icon={BookOpen}
  color="primary"
  trend={{
    value: 12,
    direction: 'up',
    label: 'vs mois dernier'
  }}
/>

// Example 2: Temps total
<StatsCard
  label="Temps total"
  value="42h"
  icon={Clock}
  color="secondary"
  variant="compact"
/>

// Example 3: Streak
<StatsCard
  label="Streak actuel"
  value="14 jours"
  icon="🔥"
  color="accent"
  variant="gradient"
/>
```

### 🔍 Utilisation dans ProfilePage

```tsx
// Stats overview
<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
  <StatsCard
    label="XP Total"
    value={userStats.totalXP}
    icon={Zap}
    color="accent"
  />
  
  <StatsCard
    label="Achievements"
    value={`${userStats.achievementsUnlocked}/${userStats.totalAchievements}`}
    icon={Trophy}
    color="primary"
  />
  
  <StatsCard
    label="Leçons"
    value={userStats.lessonsCompleted}
    icon={BookOpen}
    color="secondary"
  />
  
  <StatsCard
    label="Streak"
    value={userStats.currentStreak}
    icon={Flame}
    color="success"
    trend={{
      value: userStats.streakGrowth,
      direction: 'up'
    }}
  />
</div>
```

### 📊 Différences Contextuelles

| Context | Variant | Features |
|---------|---------|----------|
| **Dashboard** | default | Trend, icon, full card |
| **Profile** | default | Icon, no trend, grouped |
| **Compact sidebar** | compact | Small icon, no trend |
| **Hero section** | gradient | Large, prominent, emoji |

---

**Status** : ✅ Documentation Achievement & Stats complète  
**À continuer** : UpcomingSessionCard, PageHeaderFinal

**Dernière mise à jour** : 01/04/2026
