# Framer Motion Learning Path — Logo Animation

> **Duration** : 7 days (10–15 hours total)  
> **Goal** : Master Framer Motion fundamentals, build `AnimatedLogo` component  
> **Tools** : VS Code, npm, browser DevTools  
> **Outcome** : Production-ready animated logo with 3 variants (breathing, color-flow, morphing)

---

## 📋 Prerequisites

- Node.js + npm (already installed in frontend-tls project)
- Basic React knowledge (hooks, props, component structure)
- Running dev server: `npm --prefix ~/Documents/Claude/Projects/frontend-tls run dev`
- Browser dev tools for inspecting motion

---

## 🎯 Learning Objectives

By Day 7, you will:
- ✅ Understand motion.div, animate, initial, transition props
- ✅ Build simple transforms (scale, rotate, opacity)
- ✅ Use variants for reusable animations
- ✅ Implement AnimatePresence (mount/unmount)
- ✅ Animate SVG paths (stroke-width, pathLength)
- ✅ Create `AnimatedLogo` component with 3 variants
- ✅ Test on desktop + mobile (no lag, 60fps)

---

## 📚 DAY 1–2: FUNDAMENTALS (2–3 hours)

### Learning Goals
- What is Framer Motion? (declarative motion API)
- `motion.div` vs HTML div
- `animate` prop (target state)
- `initial` prop (starting state)
- `transition` prop (duration, ease, delay, repeat)

### Video Tutorials (Watch in order)
1. **"Framer Motion Crash Course"** — Takuya Matsuyama (30min)
   - https://www.youtube.com/watch?v=2V1WK-3HQNk
   - Watch: Entire video (intro to Framer Motion + first component)

2. **"Framer Motion Basics Tutorial"** — Brad Colbow (25min)
   - https://www.youtube.com/watch?v=jX4_wO4B2WI
   - Watch: 0:00–25:00 (animate, initial, transition)

### Official Docs (Reference)
- **Framer Motion Docs** : https://www.framer.com/motion/
- **Animation** : https://www.framer.com/motion/animation/
- **Transition** : https://www.framer.com/motion/transition/

### Hands-on Practice Tasks

**Task 1.1 : Your First motion.div (30min)**

Create file: `src/pages/marketing/components/_motion-lab/BreathingBox.tsx`

```tsx
import React from 'react';
import { motion } from 'framer-motion';

export const BreathingBox: React.FC = () => {
  return (
    <motion.div
      initial={{ scale: 1, opacity: 0.5 }}
      animate={{ scale: 1.2, opacity: 1 }}
      transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
      style={{
        width: 100,
        height: 100,
        backgroundColor: '#55A1B4',
        borderRadius: 8,
      }}
    />
  );
};
```

**What's happening:**
- `initial` = starting state (scale 1, opacity 0.5)
- `animate` = target state (scale 1.2, opacity 1)
- `transition.duration` = 2 seconds to go from initial → animate
- `repeat: Infinity, repeatType: 'reverse'` = loop forever, then reverse back to initial

**To test:**
```
1. Import into MarketingMotionLab: <BreathingBox />
2. Dev server: npm run dev
3. Open http://localhost:5173/marketing/_motion-lab
4. Watch the box grow (1 sec) → shrink (1 sec) → repeat
5. Change duration: try 1, 5, 10 seconds (feel the difference)
```

**Task 1.2 : Easing Curves (20min)**

Add to `BreathingBox.tsx`:

```tsx
// Try different easing curves
const EASES = ['linear', 'easeIn', 'easeOut', 'easeInOut', 'circIn'] as const;

export const BreathingBoxWithEasing: React.FC = () => {
  return (
    <div style={{ display: 'flex', gap: 20 }}>
      {EASES.map((ease) => (
        <motion.div
          key={ease}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease, repeat: Infinity, repeatType: 'reverse' }}
          style={{
            width: 80,
            height: 80,
            backgroundColor: '#ED843A',
            borderRadius: 8,
          }}
        >
          <span style={{ fontSize: 10 }}>{ease}</span>
        </motion.div>
      ))}
    </div>
  );
};
```

**Observe:**
- `linear` = constant speed (boring)
- `easeOut` = starts fast, slows down (smooth, natural)
- `easeInOut` = slow → fast → slow (premium feel, Framer default)
- `circIn` = curved, snappy

**Key insight:** Use `easeOut` or `easeInOut` for most UI animations, `linear` for spinners only.

**Task 1.3 : Multiple Properties (20min)**

```tsx
export const MultiPropertyMotion: React.FC = () => {
  return (
    <motion.div
      animate={{
        x: [0, 50, 0],           // left → right → left
        rotate: [0, 180, 360],   // spin
        opacity: [1, 0.5, 1],    // fade out → back in
      }}
      transition={{ duration: 3, repeat: Infinity }}
      style={{
        width: 100,
        height: 100,
        backgroundColor: '#F8B044',
      }}
    />
  );
};
```

**Observe:**
- Animate multiple properties in parallel
- They all start/finish at the same time (synchronized)
- Array syntax `[0, 50, 0]` = keyframes (start → middle → end)

### Checkpoint ✅
- Can create `motion.div` with `initial`, `animate`, `transition` ✅
- Understand easing curves (linear vs easeOut vs easeInOut) ✅
- Can animate multiple properties in parallel ✅

---

## 🎬 DAY 3–4: ADVANCED ANIMATION (3–4 hours)

### Learning Goals
- `variants` (reusable animation objects)
- `AnimatePresence` (mount/unmount animations)
- `whileHover` / `whileTap` (interactive animation)
- `custom` prop (variant per child)
- `exit` prop (animation on unmount)

### Video Tutorials
1. **"Framer Motion Variants"** — Takuya Matsuyama (20min)
   - https://www.youtube.com/watch?v=mXMkRk2OWSY
   - Watch: Entire video (variants syntax + patterns)

2. **"AnimatePresence & Exit Animations"** — Brad Colbow (20min)
   - https://www.youtube.com/watch?v=xz4qUScvqHk
   - Watch: Entire video (mount/unmount animations)

### Hands-on Practice Tasks

**Task 3.1 : Variants (30min)**

Create file: `src/pages/marketing/components/_motion-lab/VariantsExample.tsx`

```tsx
import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // delay between children
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const VariantsExample: React.FC = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
    >
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          variants={itemVariants}
          style={{
            width: 200,
            height: 50,
            backgroundColor: '#55A1B4',
            borderRadius: 8,
          }}
        />
      ))}
    </motion.div>
  );
};
```

**Observe:**
- Parent has `variants` object with `hidden` and `visible` states
- Children inherit parent's state via `variants` inheritance
- `staggerChildren: 0.2` delays each child's animation by 200ms
- Result: items appear one after another (cascade effect)

**Task 3.2 : AnimatePresence (30min)**

```tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const AnimatePresenceExample: React.FC = () => {
  const [showBox, setShowBox] = useState(true);

  return (
    <>
      <button onClick={() => setShowBox(!showBox)}>
        {showBox ? 'Hide' : 'Show'}
      </button>

      <AnimatePresence>
        {showBox && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
            style={{
              width: 150,
              height: 150,
              backgroundColor: '#ED843A',
              borderRadius: 12,
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};
```

**Observe:**
- `AnimatePresence` wrapper enables `exit` animations
- When `showBox` becomes false, the div animates OUT (via `exit`) before unmounting
- Without `AnimatePresence`, the div would unmount instantly (no animation)

**Task 3.3 : Interactive Animation (whileHover/whileTap) (20min)**

```tsx
export const InteractiveButton: React.FC = () => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      style={{
        padding: '12px 24px',
        backgroundColor: '#55A1B4',
        color: 'white',
        border: 'none',
        borderRadius: 8,
        fontSize: 16,
        fontWeight: 600,
        cursor: 'pointer',
      }}
    >
      Press me
    </motion.button>
  );
};
```

**Observe:**
- `whileHover={{ scale: 1.1 }}` = when mouse hovers, scale up 10%
- `whileTap={{ scale: 0.95 }}` = when clicked, scale down 5% (tactile feedback)
- `transition.type: 'spring'` = bouncy physics instead of linear (more playful)

**Task 3.4 : Staggered Children with Custom (20min)**

```tsx
export const StaggeredChildren: React.FC = () => {
  const containerVariants = {
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1 }, // custom delay per item
    }),
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', gap: 10 }}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          variants={itemVariants}
          custom={i} // pass index to variant function
          style={{
            width: 40,
            height: 40,
            backgroundColor: '#F8B044',
            borderRadius: '50%',
          }}
        />
      ))}
    </motion.div>
  );
};
```

**Observe:**
- `custom={i}` passes index to variant function
- `visible: (i) => ({ ... })` receives that index
- `delay: i * 0.1` creates per-item delay based on index
- Result: circles appear one by one with custom timing

### Checkpoint ✅
- Can create reusable `variants` objects ✅
- Understand `AnimatePresence` for mount/unmount animations ✅
- `whileHover` / `whileTap` work smoothly ✅
- Stagger animations with `custom` prop ✅

---

## 🎨 DAY 5–7: SVG + LOGO PROJECT (5–7 hours)

### Learning Goals
- SVG animation (`pathLength`, `strokeDasharray`)
- Animating SVG stroke/fill properties
- `useScroll` + `useTransform` (scroll-driven animation)
- Performance optimization (GPU-safe transforms)
- Building `AnimatedLogo` component (3 variants)

### Video Tutorials
1. **"SVG Animation with Framer Motion"** — Jenn Creighton (40min)
   - https://www.youtube.com/watch?v=yI2FuEJZuwE
   - Watch: Entire video (SVG paths, pathLength, stroke)

2. **"Framer Motion Performance"** — Kyle Drake (15min)
   - https://www.youtube.com/watch?v=nQxF8tN74rw
   - Watch: 0:00–15:00 (GPU-safe transforms)

### Hands-on Practice Tasks

**Task 5.1 : SVG Path Drawing (30min)**

Create file: `src/pages/marketing/components/_motion-lab/SvgDrawing.tsx`

```tsx
import React from 'react';
import { motion } from 'framer-motion';

export const SvgDrawing: React.FC = () => {
  return (
    <svg
      viewBox="0 0 200 200"
      style={{ width: 300, height: 300, border: '1px solid #ccc' }}
    >
      {/* Circle that draws itself */}
      <motion.circle
        cx="100"
        cy="100"
        r="50"
        fill="none"
        stroke="#55A1B4"
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
      />

      {/* Path that draws itself */}
      <motion.path
        d="M 50 50 Q 100 25 150 50 T 150 150"
        fill="none"
        stroke="#ED843A"
        strokeWidth="3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3, delay: 0.5 }}
      />
    </svg>
  );
};
```

**Observe:**
- `pathLength: 0` = path invisible (not drawn)
- `pathLength: 1` = path fully drawn
- `animate.pathLength` from 0 → 1 = animation of drawing
- Works on any SVG element: `<circle>`, `<path>`, `<rect>`, etc.

**Task 5.2 : Animating SVG Stroke (20min)**

```tsx
export const StrokeAnimation: React.FC = () => {
  return (
    <svg viewBox="0 0 200 200" style={{ width: 300, height: 300 }}>
      <motion.circle
        cx="100"
        cy="100"
        r="50"
        fill="none"
        animate={{
          strokeWidth: [1, 5, 1],
          stroke: ['#55A1B4', '#ED843A', '#F8B044', '#55A1B4'],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </svg>
  );
};
```

**Observe:**
- `strokeWidth` animates: thin → thick → thin
- `stroke` (color) animates: teal → orange → gold → teal
- Both animate simultaneously

**Task 5.3 : AnimatedLogo — Breathing Variant (1 hour)**

Create file: `src/pages/marketing/components/AnimatedLogo.tsx`

```tsx
import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedLogo: React.FC<{
  variant?: 'breathing' | 'color-flow' | 'morphing';
  size?: number;
}> = ({ variant = 'breathing', size = 64 }) => {
  // ─── BREATHING VARIANT ───
  if (variant === 'breathing') {
    return (
      <motion.svg
        viewBox="0 0 439 402"
        width={size}
        height={size}
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* TLS Logo circles */}
        <circle cx="216" cy="200" r="50" fill="#55A1B4" opacity="0.8" />
        <circle cx="307" cy="50" r="40" fill="#ED843A" />
        <circle cx="307" cy="352" r="40" fill="#F8B044" />
      </motion.svg>
    );
  }

  // ─── COLOR-FLOW VARIANT ───
  if (variant === 'color-flow') {
    return (
      <svg
        viewBox="0 0 439 402"
        width={size}
        height={size}
      >
        <defs>
          <motion.linearGradient
            id="tls-gradient"
            x1="0%" y1="0%" x2="100%" y2="100%"
            animate={{ rotate: 360 }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <stop offset="0%" stopColor="#55A1B4" />
            <stop offset="33%" stopColor="#ED843A" />
            <stop offset="66%" stopColor="#F8B044" />
            <stop offset="100%" stopColor="#55A1B4" />
          </motion.linearGradient>
        </defs>

        <circle cx="216" cy="200" r="50" fill="url(#tls-gradient)" />
        <circle cx="307" cy="50" r="40" fill="url(#tls-gradient)" />
        <circle cx="307" cy="352" r="40" fill="url(#tls-gradient)" />
      </svg>
    );
  }

  // ─── MORPHING VARIANT ───
  if (variant === 'morphing') {
    const shapes = [
      { label: 'Learn', scale: 1, color: '#55A1B4' },
      { label: 'Do', scale: 0.9, color: '#ED843A' },
      { label: 'Match', scale: 0.8, color: '#F8B044' },
    ];

    return (
      <motion.svg
        viewBox="0 0 439 402"
        width={size}
        height={size}
        style={{ position: 'relative' }}
      >
        {shapes.map((shape, i) => (
          <motion.circle
            key={shape.label}
            cx="216"
            cy="200"
            r="50"
            fill={shape.color}
            animate={{
              r: [50, 50 * shape.scale, 50],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 3,
              delay: i * 1,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.svg>
    );
  }

  return null;
};
```

**Task 5.4 : Test AnimatedLogo (45min)**

Create file: `src/pages/marketing/_motion-lab/index.tsx` (if not exists)

```tsx
import React, { useState } from 'react';
import { AnimatedLogo } from '../components/AnimatedLogo';

export const MarketingMotionLab: React.FC = () => {
  const [variant, setVariant] = useState<'breathing' | 'color-flow' | 'morphing'>('breathing');

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 p-12">
      <h1 className="text-4xl font-bold mb-12">TLS Animated Logo Lab</h1>

      <div className="grid grid-cols-3 gap-12">
        {/* Breathing */}
        <div className="flex flex-col items-center gap-6 p-8 bg-white rounded-2xl shadow-lg">
          <button
            onClick={() => setVariant('breathing')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              variant === 'breathing'
                ? 'bg-primary-600 text-white'
                : 'bg-primary-100 text-primary-700'
            }`}
          >
            Breathing
          </button>
          <div className="p-6 bg-gradient-page-ambient-warm rounded-xl">
            <AnimatedLogo variant="breathing" size={120} />
          </div>
          <p className="text-sm text-ink-600 text-center">Organic pulse effect, like Phantom.</p>
        </div>

        {/* Color Flow */}
        <div className="flex flex-col items-center gap-6 p-8 bg-white rounded-2xl shadow-lg">
          <button
            onClick={() => setVariant('color-flow')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              variant === 'color-flow'
                ? 'bg-secondary-600 text-white'
                : 'bg-secondary-100 text-secondary-700'
            }`}
          >
            Color Flow
          </button>
          <div className="p-6 bg-gradient-page-ambient-warm rounded-xl">
            <AnimatedLogo variant="color-flow" size={120} />
          </div>
          <p className="text-sm text-ink-600 text-center">Gradient rotating around logo.</p>
        </div>

        {/* Morphing */}
        <div className="flex flex-col items-center gap-6 p-8 bg-white rounded-2xl shadow-lg">
          <button
            onClick={() => setVariant('morphing')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              variant === 'morphing'
                ? 'bg-accent-600 text-white'
                : 'bg-accent-100 text-accent-700'
            }`}
          >
            Morphing
          </button>
          <div className="p-6 bg-gradient-page-ambient-warm rounded-xl">
            <AnimatedLogo variant="morphing" size={120} />
          </div>
          <p className="text-sm text-ink-600 text-center">Circles morph (Learn → Do → Match).</p>
        </div>
      </div>

      {/* Performance Monitor */}
      <div className="mt-16 p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-lg font-bold mb-4">Performance Tips</h2>
        <ul className="space-y-2 text-sm">
          <li>✅ Open DevTools → Performance → record animation (should be 60fps)</li>
          <li>✅ Check FPS (Chrome DevTools: right-click → Inspect → Rendering tab)</li>
          <li>✅ Green line = smooth 60fps, red = lag (needs optimization)</li>
        </ul>
      </div>
    </div>
  );
};
```

**Add route to `src/App.tsx`:**
```tsx
<Route path="/marketing/_motion-lab" element={<MarketingMotionLab />} />
```

**To test:**
```
1. npm run dev
2. Open http://localhost:5173/marketing/_motion-lab
3. Click buttons to switch variants
4. Open DevTools (F12) → Performance tab
5. Click record, switch variants, stop recording
6. Look for 60fps line (green) throughout
```

### Checkpoint ✅
- Created `AnimatedLogo` component with 3 variants ✅
- All variants animate smoothly (60fps) ✅
- Route working, motion lab live at `/marketing/_motion-lab` ✅

---

## 📊 Summary

| Day | Focus | Hours | Outcome |
|-----|-------|-------|---------|
| 1–2 | Fundamentals (motion.div, animate, transition, easing) | 2–3h | Comfort with basic motion |
| 3–4 | Advanced (variants, AnimatePresence, interactive) | 3–4h | Reusable animation patterns |
| 5–7 | SVG + Logo project (pathLength, AnimatedLogo, 3 variants) | 5–7h | Production component delivered |
| | | **10–14h total** | Ready to integrate AnimatedLogo into site |

---

## 🔑 Key Patterns (Copy/Paste for Later)

**Pattern 1: Simple Breathing Motion**
```tsx
<motion.div
  animate={{ scale: [1, 1.1, 1] }}
  transition={{ duration: 3, repeat: Infinity }}
/>
```

**Pattern 2: Staggered Children**
```tsx
const containerVariants = {
  visible: { transition: { staggerChildren: 0.2 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};
<motion.div variants={containerVariants} animate="visible">
  {items.map(i => <motion.div variants={itemVariants} key={i} />)}
</motion.div>
```

**Pattern 3: Mount/Unmount with AnimatePresence**
```tsx
<AnimatePresence>
  {visible && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )}
</AnimatePresence>
```

**Pattern 4: SVG Path Drawing**
```tsx
<motion.path
  d="M 0 0 L 100 100"
  initial={{ pathLength: 0 }}
  animate={{ pathLength: 1 }}
  transition={{ duration: 2 }}
/>
```

**Pattern 5: Spring Physics (Premium Feel)**
```tsx
<motion.div
  animate={{ scale: 1.1 }}
  transition={{
    type: 'spring',
    stiffness: 400,
    damping: 17
  }}
/>
```

---

## 🔗 Resource Links

- **Framer Motion Docs** : https://www.framer.com/motion/
- **Variants Deep Dive** : https://www.framer.com/motion/animation/
- **SVG Animation** : https://www.framer.com/motion/svg-animations/
- **Spring Presets** : https://www.framer.com/motion/spring/ (find best stiffness/damping)
- **Easing Explorer** : https://easings.net/ (visual easing curves)

---

## 🚨 Troubleshooting

| Problem | Solution |
|---------|----------|
| Animation feels jerky/laggy | Check Performance tab (should be 60fps). Use `transform` only (not `left`, `width`, etc.) |
| AnimatePresence not working | Make sure component is wrapped in `<AnimatePresence>` and you're toggling visibility |
| SVG path not drawing | Check `pathLength` on `<motion.path>`, not on SVG wrapper |
| Stagger not working | Use `staggerChildren` on parent, not on individual children |
| Colors animating too fast | Increase `transition.duration` to 4+ seconds for color transitions |

---

**Ready to start Day 1? Let's build beautiful motion! 🚀**
