# 🎬 8 Motion Effects — Quick Reference Card

## ✅ All Built & in Design System

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

## 🎨 Effects at a Glance

| # | Effect | Use | Code |
|---|--------|-----|------|
| 1 | **Floating Particles** | Hero, CTA bg | `<FloatingParticles count={5} />` |
| 2 | **Hover Lift Card** | Every card | `<HoverLiftCard><Card /></HoverLiftCard>` |
| 3 | **Spotlight Border** | Premium CTA | `<SpotlightBorder><Button /></SpotlightBorder>` |
| 4 | **Badge Earn** | Achievement | `<BadgeEarnAnimation isEarned={true} />` |
| 5 | **Progress Arc** | Lesson tracking | `<LessonProgressArc progress={75} />` |
| 6 | **Shimmer Loading** | Data loading | `<ShimmerLoading shape="card" />` |
| 7 | **Chat Stagger** | Coaching | `<ChatMessageStagger messages={[...]} />` |
| 8 | **Score Counter** | Quiz done | `<ScoreCounter finalScore={85} />` |

---

## 🚀 Copy-Paste Examples

### Hero with Particles
```tsx
<section className="relative min-h-screen overflow-hidden">
  <FloatingParticles count={5} intensity="subtle" />
  <CinematicHero />
</section>
```

### Card Grid
```tsx
<div className="grid grid-cols-3 gap-6">
  {items.map((item) => (
    <HoverLiftCard key={item.id}>
      <Card>{item.name}</Card>
    </HoverLiftCard>
  ))}
</div>
```

### Premium Button
```tsx
<SpotlightBorder intensity={0.7}>
  <MagneticButton>
    <Button variant="primary" size="lg">
      Book a Call
    </Button>
  </MagneticButton>
</SpotlightBorder>
```

### Quiz Result
```tsx
{quizDone && (
  <>
    <ScoreCounter 
      finalScore={userScore} 
      maxScore={100}
      isComplete={true}
    />
    {earnedBadge && (
      <BadgeEarnAnimation 
        isEarned={true}
        badgeIcon="🏆"
        badgeLabel={badge.name}
      />
    )}
  </>
)}
```

---

## 🎯 Where Each Belongs

### **Site Marketing**
- **Hero:** Particles + Parallax text
- **Cards:** HoverLift everywhere
- **CTAs:** SpotlightBorder + Magnetic
- **Offers:** HoverLift + Spotlight
- **Proof:** HoverLift
- **Final CTA:** Particles + SpotlightBorder

### **Learning App**
- **Dashboard:** ProgressArc + ShimmerLoad
- **Chat:** ChatStagger
- **Quiz:** ScoreCounter + BadgeEarn
- **Loading:** ShimmerLoad
- **Cards:** HoverLift

---

## 📊 At a Glance

```
┌────────────────────────────────────────┐
│  8 NEW PREMIUM MOTION EFFECTS          │
├────────────────────────────────────────┤
│  ✅ Floating Particles                 │
│  ✅ Hover Lift Card                    │
│  ✅ Spotlight Border                   │
│  ✅ Badge Earn Animation               │
│  ✅ Lesson Progress Arc                │
│  ✅ Shimmer Loading                    │
│  ✅ Chat Message Stagger               │
│  ✅ Score Counter                      │
├────────────────────────────────────────┤
│  All in: /motion/                      │
│  All exported: motion/index.ts         │
│  All production-ready                  │
│  All accessibility-first               │
└────────────────────────────────────────┘
```

---

## 💡 Pro Tips

1. **Particles** = add motion to flat sections
2. **HoverLift** = apply to every card (instant premium)
3. **Spotlight** = use sparingly (for important CTAs only)
4. **Badge** = celebration moments only
5. **Progress** = lesson tracking
6. **Shimmer** = while loading (not spinning)
7. **Chat** = conversational UI
8. **Score** = quiz/achievement completion

---

**Everything is ready to use.** Pick any effect and drop it in! 🎬
