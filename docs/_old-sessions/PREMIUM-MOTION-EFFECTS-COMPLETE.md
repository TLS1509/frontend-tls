# 🎬 8 Premium Motion Effects — Complete & Ready

**Date:** 2026-06-11  
**Status:** ✅ ALL BUILT & EXPORTED from Design System

---

## 🎨 Complete Effects Library

All 8 effects are now in `/src/components/marketing/motion/` and exported from the design system.

### **Import From:**
```tsx
import {
  FloatingParticles,
  HoverLiftCard,
  SpotlightBorder,
  BadgeEarnAnimation,
  LessonProgressArc,
  ShimmerLoading,
  ChatMessageStagger,
  ScoreCounter,
} from '@/components/marketing/motion'
```

---

## 📋 Effects Reference

### **1. Floating Particles** ✨
Ambient animated blobs floating in background

```tsx
<div className="relative">
  <FloatingParticles 
    count={5}
    colors={['#55A1B4', '#ED843A', '#F8B044']}
    intensity="subtle"
  />
  <YourContent />
</div>
```

**Props:**
- `count?: number` — Number of particles (default: 5)
- `colors?: string[]` — Colors array
- `intensity?: 'subtle' | 'medium' | 'intense'` (default: 'subtle')
- `blurAmount?: number` — Blur filter (default: 40)

**Best for:** Hero sections, CTA background, ambient atmosphere

---

### **2. Hover Lift Card** 🎈
Cards lift up + shadow grows on hover

```tsx
<HoverLiftCard shadowIntensity="medium">
  <div className="rounded-lg border border-ink-200 p-6 bg-white">
    Offer content
  </div>
</HoverLiftCard>
```

**Props:**
- `shadowIntensity?: 'light' | 'medium' | 'heavy'` (default: 'medium')
- `liftDistance?: number` — Pixels to lift (default: 8)

**Best for:** All cards (offers, proof, articles, features)

---

### **3. Spotlight Border** 💡
Glowing border follows cursor (luxury effect)

```tsx
<SpotlightBorder 
  intensity={0.6}
  color="rgb(85, 161, 180)"
>
  <Button variant="primary">Premium CTA</Button>
</SpotlightBorder>
```

**Props:**
- `intensity?: number` — Glow strength 0-1 (default: 0.6)
- `color?: string` — Glow color (default: teal)
- `borderRadius?: string` — Border radius (default: '1rem')

**Best for:** Primary CTAs, hero cards, premium buttons

---

### **4. Badge Earn Animation** 🏆
Badge pops in with particle burst (celebration)

```tsx
<BadgeEarnAnimation
  isEarned={badgeUnlocked}
  badgeIcon="🎓"
  badgeLabel="Expert"
  badgeColor="#ED843A"
  onAnimationComplete={() => console.log('Done!')}
/>
```

**Props:**
- `isEarned: boolean` — Trigger animation
- `badgeIcon?: React.ReactNode` — Icon/emoji
- `badgeLabel?: string` — Badge label
- `badgeColor?: string` (default: '#ED843A')
- `particleCount?: number` (default: 12)
- `onAnimationComplete?: () => void`

**Best for:** Learning app badge unlock, achievement celebrations

---

### **5. Lesson Progress Arc** 🔄
Circular progress indicator with smooth animation

```tsx
<LessonProgressArc
  progress={75}
  size={120}
  colors={{
    background: '#E5E7EB',
    foreground: '#55A1B4',
  }}
  label="Progression"
/>
```

**Props:**
- `progress: number` — 0-100 percentage
- `size?: number` — Diameter in px (default: 120)
- `strokeWidth?: number` (default: 8)
- `colors?: { background, foreground }` 
- `showLabel?: boolean` (default: true)
- `label?: string` (default: 'Progression')

**Best for:** Lesson completion tracking, course progress

---

### **6. Shimmer Loading** ✨
Skeleton loaders with animated shimmer

```tsx
<ShimmerLoading
  shape="card"
  count={3}
  baseColor="#F3F4F6"
/>
```

**Props:**
- `shape?: 'card' | 'text' | 'circle' | 'rect'` (default: 'card')
- `count?: number` — Number of loaders (default: 3)
- `baseColor?: string` (default: '#F3F4F6')
- `shimmerColor?: string` — Shimmer highlight

**Best for:** Content loading, card placeholders, data fetches

---

### **7. Chat Message Stagger** 💬
Messages appear sequentially from side

```tsx
<ChatMessageStagger
  messages={[
    { id: '1', text: 'Hello!', sender: 'bot' },
    { id: '2', text: 'Hi there!', sender: 'user' },
    { id: '3', text: 'How can I help?', sender: 'bot' },
  ]}
  userBgColor="bg-primary-600"
  botBgColor="bg-ink-100"
/>
```

**Props:**
- `messages: Message[]` — Array of messages
  - `id: string`
  - `text: string`
  - `sender: 'user' | 'bot'`
  - `timestamp?: string`
- `userBgColor?: string` (default: 'bg-primary-600')
- `botBgColor?: string` (default: 'bg-ink-100')
- `animationDelay?: number` — Between messages (default: 0.08)

**Best for:** Coaching chat, conversational interface, AI assistant

---

### **8. Score Counter** 🎯
Number counts up when quiz completes (celebration)

```tsx
<ScoreCounter
  finalScore={85}
  maxScore={100}
  isComplete={quizDone}
  duration={1.5}
  label="Score"
  showPercentage={true}
  colors={{
    background: '#F0F9FF',
    text: '#0984B4',
    accent: '#ED843A',
  }}
  onComplete={() => nextLesson()}
/>
```

**Props:**
- `finalScore: number` — Score earned
- `maxScore: number` — Max possible score
- `isComplete: boolean` — Trigger animation
- `duration?: number` — Animation length (default: 1.5)
- `label?: string` (default: 'Score')
- `showPercentage?: boolean` (default: true)
- `colors?: { background, text, accent }`
- `onComplete?: () => void`

**Best for:** Quiz completion, skill assessment, level completion

---

## 🎯 Usage Patterns

### **Pattern 1: Hero Section with Particles**
```tsx
<section className="relative min-h-screen">
  <FloatingParticles count={6} intensity="subtle" />
  <CinematicHero />
</section>
```

### **Pattern 2: Card Grid with Lift**
```tsx
<div className="grid grid-cols-3 gap-6">
  {offers.map((offer) => (
    <HoverLiftCard key={offer.id}>
      <OfferCard {...offer} />
    </HoverLiftCard>
  ))}
</div>
```

### **Pattern 3: Premium Button with Spotlight**
```tsx
<SpotlightBorder intensity={0.7}>
  <MagneticButton>
    <Button variant="primary" size="lg">
      Book a Call
    </Button>
  </MagneticButton>
</SpotlightBorder>
```

### **Pattern 4: Learning Dashboard**
```tsx
<div className="space-y-6">
  <LessonProgressArc progress={currentProgress} />
  <ShimmerLoading shape="card" count={2} />
  <ChatMessageStagger messages={coachingMessages} />
</div>
```

### **Pattern 5: Quiz Completion**
```tsx
{quizCompleted ? (
  <>
    <ScoreCounter
      finalScore={userScore}
      maxScore={100}
      isComplete={true}
      onComplete={() => nextLesson()}
    />
    <BadgeEarnAnimation
      isEarned={earnedNewBadge}
      badgeLabel={newBadge?.name}
    />
  </>
) : (
  <ShimmerLoading shape="card" />
)}
```

---

## 🗂️ File Structure

```
src/components/marketing/motion/
├── floating-particles.tsx          ✅ New
├── hover-lift-card.tsx             ✅ New
├── spotlight-border.tsx            ✅ New
├── badge-earn-animation.tsx        ✅ New
├── lesson-progress-arc.tsx         ✅ New
├── shimmer-loading.tsx             ✅ New
├── chat-message-stagger.tsx        ✅ New
├── score-counter.tsx               ✅ New
├── morphing-svg-visualizer.tsx     ✅ Existing
├── counter-animation.tsx           ✅ Existing
├── parallax-text-layers.tsx        ✅ Existing
├── StickyScrollStory.tsx           ✅ Updated
├── scroll-effects.tsx              ✅ Existing
├── MagneticButton.tsx              ✅ Existing
├── GradientText.tsx                ✅ Existing
├── TiltCard.tsx                    ✅ Existing
└── index.ts                        ✅ Updated (all exports added)
```

---

## 🚀 Where to Use

### **Site Marketing Pages**
- **Hero:** FloatingParticles
- **Offers:** HoverLiftCard + SpotlightBorder
- **CTA:** SpotlightBorder + FloatingParticles
- **Proof:** HoverLiftCard
- **Blog:** HoverLiftCard

### **Learning App**
- **Dashboard:** LessonProgressArc + ShimmerLoading
- **Coaching Chat:** ChatMessageStagger
- **Quiz Results:** ScoreCounter + BadgeEarnAnimation
- **Lesson Loading:** ShimmerLoading
- **Achievement:** BadgeEarnAnimation

### **Both**
- Cards: HoverLiftCard (everywhere!)
- Interactive elements: SpotlightBorder
- Ambient mood: FloatingParticles

---

## ✅ Testing Checklist

Visit the site and check:

- [ ] FloatingParticles animate smoothly in background
- [ ] HoverLiftCard lifts on hover (all cards)
- [ ] SpotlightBorder glows under cursor on CTA
- [ ] BadgeEarnAnimation bursts particles on unlock
- [ ] LessonProgressArc fills smoothly
- [ ] ShimmerLoading shows animated skeleton
- [ ] ChatMessageStagger displays messages sequentially
- [ ] ScoreCounter counts to final score
- [ ] All animations respect `prefers-reduced-motion`
- [ ] Mobile responsive (all effects work on touch)

---

## 🎨 Direction C Alignment

All 8 effects embody the aesthetic:

| Aspect | Effects |
|--------|---------|
| **Warmth** | Particle colors, amber/teal palette |
| **Organic** | Floating particles, smooth motion |
| **Glass** | Spotlight glow, shimmer layers |
| **Interactive** | Hover lifts, cursor tracking |
| **Accessible** | All respect reduced motion |
| **Performance** | GPU-safe (transform/opacity only) |

---

## 💡 Pro Tips

1. **Combine effects** — Floating particles + HoverLiftCard + SpotlightBorder = premium
2. **Don't overuse** — Particles on hero only, not every section
3. **Mobile-first** — All effects degrade gracefully on touch
4. **Timing matters** — Shimmer during load, spinner never
5. **Celebration moments** — BadgeEarn + ScoreCounter together = 🎉

---

## 🎉 Summary

**8 production-ready effects just added to your design system:**
- ✅ All fully TypeScript-typed
- ✅ All JSDoc-documented
- ✅ All accessibility-first
- ✅ All in motion/ folder (organized)
- ✅ All exported from index.ts
- ✅ Ready for immediate use

**No more dummy placeholders.** Real, premium motion design. 🎬
