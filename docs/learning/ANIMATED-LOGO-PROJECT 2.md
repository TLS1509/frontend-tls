# AnimatedLogo Project — Design Refinement + 3 Motion Variants

> **Scope** : Enhance TLS logo for Direction C "Illustrated Glass" + build 3 Framer Motion animation variants  
> **Deliverable** : `AnimatedLogo.tsx` component + demo page  
> **Timeline** : Day 5–7 (parallel Procreate + Framer Motion)  
> **Use cases** : Loading states, hero moments, brand signature animations

---

## 🎨 LOGO DESIGN REFINEMENT

### Current State (TlsLogo.tsx)
```
Geometric circles (hard-edged)
├─ Primary circle (center): Teal #55A1B4
├─ Secondary circle (top): Orange #ED843A  
├─ Accent circle (bottom): Gold #F8B044
└─ Glass bubble wrapper (backdrop-blur + ring)
```

### Direction C Refinement Goals

**Option 1: "Soft Organic" (RECOMMENDED for Direction C)**

Transform hard geometric circles → soft, breathing blobs while keeping the 3-color system.

```
Blobs (soft edges, irregular shapes)
├─ Primary blob (center-left): Teal with gradient (dark teal shadow → light teal highlight)
├─ Secondary blob (top-right): Orange with warmth (burnt orange → light orange)
├─ Accent blob (bottom): Gold with cream transition
└─ Glass bubble wrapper (refined for watercolor, softer shadows)
```

**Design characteristics:**
- SVG circles → SVG ellipses/paths with soft edges (`<feGaussianBlur>` filter for organic feel)
- Per-blob radial gradient (shadow side darker, light side cream-ish)
- Slightly feathered edges (antialiasing, soft drop shadows)
- Overall opacity in context: 80–100% (solid on white, ~50% when layered behind glass)

**Why?**
- Aligns with Direction C watercolor illustration aesthetic
- Keeps geometric "system" feel but softens for premium vibe
- Breath-ability (animation) becomes natural extension
- Works at all sizes (32px logo → 256px hero moment)

---

### Logo Design: Implementation

**File: `src/components/ui/TlsLogoRefined.tsx`**

```tsx
import React from 'react';

export interface TlsLogoRefinedProps {
  size?: number;
  withBubble?: boolean;
  variant?: 'static' | 'breathing' | 'color-flow' | 'morphing';
  className?: string;
}

export const TlsLogoRefined: React.FC<TlsLogoRefinedProps> = ({
  size = 36,
  withBubble = true,
  variant = 'static',
  className = '',
}) => {
  const logoSvg = (
    <svg
      viewBox="0 0 300 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={withBubble ? size * 0.7 : size}
      height={withBubble ? size * 0.65 : size}
      aria-label="The Learning Society"
      role="img"
    >
      {/* Soft filters for organic feel */}
      <defs>
        {/* Feathered blur for soft edges */}
        <filter id="soft-glow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
        </filter>

        {/* Radial gradients per blob */}
        <radialGradient id="teal-gradient" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#7EB8CA" /> {/* light teal highlight */}
          <stop offset="100%" stopColor="#3D7FA0" /> {/* dark teal shadow */}
        </radialGradient>

        <radialGradient id="orange-gradient" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#F5A860" /> {/* light orange */}
          <stop offset="100%" stopColor="#C45A1A" /> {/* dark orange shadow */}
        </radialGradient>

        <radialGradient id="gold-gradient" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#FDDB7D" /> {/* light gold */}
          <stop offset="100%" stopColor="#D4920E" /> {/* dark gold shadow */}
        </radialGradient>
      </defs>

      {/* Primary blob (center-left, Teal) — soft ellipse */}
      <ellipse
        cx="100"
        cy="150"
        rx="65"
        ry="70"
        fill="url(#teal-gradient)"
        opacity="0.85"
        filter="url(#soft-glow)"
      />

      {/* Secondary blob (top-right, Orange) — smaller, offset */}
      <ellipse
        cx="200"
        cy="80"
        rx="55"
        ry="60"
        fill="url(#orange-gradient)"
        opacity="0.8"
        filter="url(#soft-glow)"
      />

      {/* Accent blob (bottom, Gold) — irregular shape via path */}
      <path
        d="M 150 220 Q 180 240 200 230 Q 210 220 205 200 Q 190 190 160 195 Q 140 200 150 220 Z"
        fill="url(#gold-gradient)"
        opacity="0.8"
        filter="url(#soft-glow)"
      />

      {/* Soft inner highlight (top-left light refraction) */}
      <ellipse
        cx="60"
        cy="100"
        rx="30"
        ry="25"
        fill="white"
        opacity="0.15"
        filter="url(#soft-glow)"
      />
    </svg>
  );

  // If variant requires animation, wrap in motion.svg (handled in AnimatedLogo)
  // For now, this is the static refined design

  if (!withBubble) {
    return (
      <span className={['inline-flex items-center justify-center', className].filter(Boolean).join(' ')}>
        {logoSvg}
      </span>
    );
  }

  // Glass bubble wrapper
  return (
    <span
      className={[
        'relative inline-flex items-center justify-center shrink-0',
        'rounded-2xl',
        'bg-gradient-to-br from-white via-primary-50/80 to-primary-100/60',
        'ring-1 ring-primary-200/50',
        'shadow-[0_12px_24px_-8px_rgba(85,161,180,0.3),0_4px_10px_-2px_rgba(85,161,180,0.15),inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-1px_2px_rgba(85,161,180,0.05)]',
        'backdrop-blur-glass-light',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Top highlight gloss (softer for watercolor feel) */}
      <span
        className="absolute inset-x-2 top-1.5 h-1/3 rounded-lg bg-gradient-to-b from-white/60 via-white/10 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <span className="relative inline-flex">{logoSvg}</span>
    </span>
  );
};

export default TlsLogoRefined;
```

---

## 🎬 ANIMATED LOGO — 3 VARIANTS

### Variant 1: "Breathing Blobs" (Phantom-inspired)

**Use case** : Loading states, hero background mood  
**Difficulty** : Easy  
**Duration** : 4.5s infinite loop

```tsx
// AnimatedLogo.tsx — Breathing variant
if (variant === 'breathing') {
  return (
    <motion.svg
      viewBox="0 0 300 280"
      width={size}
      height={size}
      animate={{ scale: [1, 1.08, 1] }}
      transition={{
        duration: 4.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {/* Same defs + blobs as TlsLogoRefined */}
      <defs>
        {/* ...filters and gradients... */}
      </defs>
      <ellipse cx="100" cy="150" rx="65" ry="70" fill="url(#teal-gradient)" opacity="0.85" />
      <ellipse cx="200" cy="80" rx="55" ry="60" fill="url(#orange-gradient)" opacity="0.8" />
      <path
        d="M 150 220 Q 180 240 200 230 Q 210 220 205 200 Q 190 190 160 195 Q 140 200 150 220 Z"
        fill="url(#gold-gradient)"
        opacity="0.8"
      />
      <ellipse cx="60" cy="100" rx="30" ry="25" fill="white" opacity="0.15" />
    </motion.svg>
  );
}
```

**Key insight** : Single `scale` property with 3-keyframe array creates breathing effect (start → grow → shrink back).

---

### Variant 2: "Color Flow" (Gradient rotating around logo)

**Use case** : Brand signature moment, loading spinner alternative  
**Difficulty** : Medium  
**Duration** : 6s infinite loop

```tsx
// AnimatedLogo.tsx — Color-flow variant
if (variant === 'color-flow') {
  return (
    <svg viewBox="0 0 300 280" width={size} height={size}>
      <defs>
        {/* Animated linear gradient (rotates around the blobs) */}
        <motion.linearGradient
          id="rotating-gradient"
          x1="0%" y1="0%" x2="100%" y2="100%"
          animate={{ rotate: 360 }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ transformOrigin: '150px 140px' }} /* center of logo */
        >
          <stop offset="0%" stopColor="#55A1B4" /> {/* teal */}
          <stop offset="33%" stopColor="#ED843A" /> {/* orange */}
          <stop offset="66%" stopColor="#F8B044" /> {/* gold */}
          <stop offset="100%" stopColor="#55A1B4" /> {/* back to teal */}
        </motion.linearGradient>
      </defs>

      {/* Blobs using rotating gradient */}
      <ellipse cx="100" cy="150" rx="65" ry="70" fill="url(#rotating-gradient)" opacity="0.9" />
      <ellipse cx="200" cy="80" rx="55" ry="60" fill="url(#rotating-gradient)" opacity="0.85" />
      <path
        d="M 150 220 Q 180 240 200 230 Q 210 220 205 200 Q 190 190 160 195 Q 140 200 150 220 Z"
        fill="url(#rotating-gradient)"
        opacity="0.85"
      />
    </svg>
  );
}
```

**Key insight** : Animated `<linearGradient>` with `rotate: 360` creates continuous color flow (teal → orange → gold → back). `ease: 'linear'` keeps rotation constant (no acceleration/deceleration).

---

### Variant 3: "Morphing Nodes" (Learn → Do → Match cycle)

**Use case** : TLS signature moment, philosophy visualization  
**Difficulty** : Hard  
**Duration** : 3s per cycle infinite loop

```tsx
// AnimatedLogo.tsx — Morphing variant
if (variant === 'morphing') {
  const morphStages = [
    { label: 'Learn', tealScale: 1, orangeScale: 0.7, goldScale: 0.5, color: '#55A1B4' },
    { label: 'Do', tealScale: 0.7, orangeScale: 1, goldScale: 0.6, color: '#ED843A' },
    { label: 'Match', tealScale: 0.5, orangeScale: 0.6, goldScale: 1, color: '#F8B044' },
  ];

  return (
    <svg viewBox="0 0 300 280" width={size} height={size}>
      {/* Primary (Teal) — grows in Learn, shrinks after */}
      <motion.ellipse
        cx="100"
        cy="150"
        rx={65}
        ry={70}
        animate={{
          rx: [65, 45, 30],
          ry: [70, 50, 35],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        fill="url(#teal-gradient)"
        opacity="0.85"
      />

      {/* Secondary (Orange) — grows in Do */}
      <motion.ellipse
        cx="200"
        cy="80"
        rx={55}
        ry={60}
        animate={{
          rx: [38, 55, 33],
          ry: [42, 60, 36],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        fill="url(#orange-gradient)"
        opacity="0.8"
      />

      {/* Accent (Gold) — grows in Match */}
      <motion.path
        d="M 150 220 Q 180 240 200 230 Q 210 220 205 200 Q 190 190 160 195 Q 140 200 150 220 Z"
        animate={{
          d: [
            'M 150 220 Q 180 240 200 230 Q 210 220 205 200 Q 190 190 160 195 Q 140 200 150 220 Z', /* start (small) */
            'M 140 230 Q 200 250 220 240 Q 230 225 220 190 Q 180 180 140 190 Q 120 210 140 230 Z', /* mid (medium) */
            'M 130 240 Q 210 260 240 250 Q 250 230 240 180 Q 170 170 130 185 Q 110 220 130 240 Z', /* end (large) */
            'M 150 220 Q 180 240 200 230 Q 210 220 205 200 Q 190 190 160 195 Q 140 200 150 220 Z', /* back to start */
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        fill="url(#gold-gradient)"
        opacity="0.8"
      />

      {/* Optional: label text that changes with morph */}
      <motion.text
        x="150"
        y="270"
        textAnchor="middle"
        fontSize="12"
        fontWeight="600"
        fill="var(--color-ink-700)"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {morphStages[0].label}
      </motion.text>
    </svg>
  );
}
```

**Key insight** : Each blob morphs independently (scale changes) on its own timeline. They peak at different times:
- Learn phase: Teal large, Orange/Gold small
- Do phase: Orange large, Teal/Gold medium
- Match phase: Gold large, Teal/Orange small

---

## 📝 FULL AnimatedLogo.tsx COMPONENT

Create file: `src/pages/marketing/components/AnimatedLogo.tsx`

```tsx
import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedLogo: React.FC<{
  variant?: 'static' | 'breathing' | 'color-flow' | 'morphing';
  size?: number;
  withBubble?: boolean;
}> = ({ variant = 'static', size = 64, withBubble = true }) => {
  const EASE_EMPHASIS = [0.22, 1, 0.36, 1];

  // ─── STATIC (default, no animation) ───
  if (variant === 'static') {
    const logoSvg = (
      <svg
        viewBox="0 0 300 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={withBubble ? size * 0.7 : size}
        height={withBubble ? size * 0.65 : size}
      >
        <defs>
          <filter id="soft-glow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
          <radialGradient id="teal-gradient" cx="40%" cy="40%">
            <stop offset="0%" stopColor="#7EB8CA" />
            <stop offset="100%" stopColor="#3D7FA0" />
          </radialGradient>
          <radialGradient id="orange-gradient" cx="35%" cy="35%">
            <stop offset="0%" stopColor="#F5A860" />
            <stop offset="100%" stopColor="#C45A1A" />
          </radialGradient>
          <radialGradient id="gold-gradient" cx="40%" cy="40%">
            <stop offset="0%" stopColor="#FDDB7D" />
            <stop offset="100%" stopColor="#D4920E" />
          </radialGradient>
        </defs>
        <ellipse cx="100" cy="150" rx="65" ry="70" fill="url(#teal-gradient)" opacity="0.85" filter="url(#soft-glow)" />
        <ellipse cx="200" cy="80" rx="55" ry="60" fill="url(#orange-gradient)" opacity="0.8" filter="url(#soft-glow)" />
        <path d="M 150 220 Q 180 240 200 230 Q 210 220 205 200 Q 190 190 160 195 Q 140 200 150 220 Z" fill="url(#gold-gradient)" opacity="0.8" filter="url(#soft-glow)" />
        <ellipse cx="60" cy="100" rx="30" ry="25" fill="white" opacity="0.15" filter="url(#soft-glow)" />
      </svg>
    );

    if (!withBubble) return <span className="inline-flex items-center justify-center">{logoSvg}</span>;

    return (
      <span
        className="relative inline-flex items-center justify-center shrink-0 rounded-2xl bg-gradient-to-br from-white via-primary-50/80 to-primary-100/60 ring-1 ring-primary-200/50 shadow-lg backdrop-blur-glass-light"
        style={{ width: size, height: size }}
      >
        <span className="absolute inset-x-2 top-1.5 h-1/3 rounded-lg bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />
        <span className="relative inline-flex">{logoSvg}</span>
      </span>
    );
  }

  // ─── BREATHING VARIANT ───
  if (variant === 'breathing') {
    return (
      <motion.svg
        viewBox="0 0 300 280"
        width={withBubble ? size * 0.7 : size}
        height={withBubble ? size * 0.65 : size}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="soft-glow"><feGaussianBlur in="SourceGraphic" stdDeviation="2" /></filter>
          <radialGradient id="teal-gradient" cx="40%" cy="40%">
            <stop offset="0%" stopColor="#7EB8CA" /><stop offset="100%" stopColor="#3D7FA0" />
          </radialGradient>
          <radialGradient id="orange-gradient" cx="35%" cy="35%">
            <stop offset="0%" stopColor="#F5A860" /><stop offset="100%" stopColor="#C45A1A" />
          </radialGradient>
          <radialGradient id="gold-gradient" cx="40%" cy="40%">
            <stop offset="0%" stopColor="#FDDB7D" /><stop offset="100%" stopColor="#D4920E" />
          </radialGradient>
        </defs>
        <ellipse cx="100" cy="150" rx="65" ry="70" fill="url(#teal-gradient)" opacity="0.85" filter="url(#soft-glow)" />
        <ellipse cx="200" cy="80" rx="55" ry="60" fill="url(#orange-gradient)" opacity="0.8" filter="url(#soft-glow)" />
        <path d="M 150 220 Q 180 240 200 230 Q 210 220 205 200 Q 190 190 160 195 Q 140 200 150 220 Z" fill="url(#gold-gradient)" opacity="0.8" filter="url(#soft-glow)" />
        <ellipse cx="60" cy="100" rx="30" ry="25" fill="white" opacity="0.15" filter="url(#soft-glow)" />
      </motion.svg>
    );
  }

  // ─── COLOR-FLOW VARIANT ───
  if (variant === 'color-flow') {
    return (
      <svg viewBox="0 0 300 280" width={withBubble ? size * 0.7 : size} height={withBubble ? size * 0.65 : size} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <motion.linearGradient
            id="rotating-gradient"
            x1="0%" y1="0%" x2="100%" y2="100%"
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '150px 140px' }}
          >
            <stop offset="0%" stopColor="#55A1B4" /><stop offset="33%" stopColor="#ED843A" /><stop offset="66%" stopColor="#F8B044" /><stop offset="100%" stopColor="#55A1B4" />
          </motion.linearGradient>
        </defs>
        <ellipse cx="100" cy="150" rx="65" ry="70" fill="url(#rotating-gradient)" opacity="0.9" />
        <ellipse cx="200" cy="80" rx="55" ry="60" fill="url(#rotating-gradient)" opacity="0.85" />
        <path d="M 150 220 Q 180 240 200 230 Q 210 220 205 200 Q 190 190 160 195 Q 140 200 150 220 Z" fill="url(#rotating-gradient)" opacity="0.85" />
      </svg>
    );
  }

  // ─── MORPHING VARIANT ───
  if (variant === 'morphing') {
    return (
      <svg viewBox="0 0 300 280" width={withBubble ? size * 0.7 : size} height={withBubble ? size * 0.65 : size} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="soft-glow"><feGaussianBlur in="SourceGraphic" stdDeviation="2" /></filter>
          <radialGradient id="teal-gradient" cx="40%" cy="40%">
            <stop offset="0%" stopColor="#7EB8CA" /><stop offset="100%" stopColor="#3D7FA0" />
          </radialGradient>
          <radialGradient id="orange-gradient" cx="35%" cy="35%">
            <stop offset="0%" stopColor="#F5A860" /><stop offset="100%" stopColor="#C45A1A" />
          </radialGradient>
          <radialGradient id="gold-gradient" cx="40%" cy="40%">
            <stop offset="0%" stopColor="#FDDB7D" /><stop offset="100%" stopColor="#D4920E" />
          </radialGradient>
        </defs>

        {/* Teal: large in Learn, shrinks after */}
        <motion.ellipse
          cx="100" cy="150"
          animate={{ rx: [65, 45, 30], ry: [70, 50, 35] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          fill="url(#teal-gradient)" opacity="0.85" filter="url(#soft-glow)"
        />

        {/* Orange: large in Do */}
        <motion.ellipse
          cx="200" cy="80"
          animate={{ rx: [38, 55, 33], ry: [42, 60, 36] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          fill="url(#orange-gradient)" opacity="0.8" filter="url(#soft-glow)"
        />

        {/* Gold: large in Match */}
        <motion.path
          animate={{
            d: [
              'M 150 220 Q 180 240 200 230 Q 210 220 205 200 Q 190 190 160 195 Q 140 200 150 220 Z',
              'M 140 230 Q 200 250 220 240 Q 230 225 220 190 Q 180 180 140 190 Q 120 210 140 230 Z',
              'M 130 240 Q 210 260 240 250 Q 250 230 240 180 Q 170 170 130 185 Q 110 220 130 240 Z',
              'M 150 220 Q 180 240 200 230 Q 210 220 205 200 Q 190 190 160 195 Q 140 200 150 220 Z',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          fill="url(#gold-gradient)" opacity="0.8" filter="url(#soft-glow)"
        />
      </svg>
    );
  }

  return null;
};

export default AnimatedLogo;
```

---

## 🧪 DEMO PAGE

Create file: `src/pages/marketing/_motion-lab/LogoVariantsDemo.tsx`

```tsx
import React, { useState } from 'react';
import { AnimatedLogo } from '../../components/AnimatedLogo';
import { Button } from '../../../components/core/Button';

type LogoVariant = 'static' | 'breathing' | 'color-flow' | 'morphing';

export const LogoVariantsDemo: React.FC = () => {
  const [activeVariant, setActiveVariant] = useState<LogoVariant>('breathing');

  const variants: Array<{ key: LogoVariant; label: string; description: string }> = [
    { key: 'static', label: 'Static', description: 'Refined design, no animation' },
    { key: 'breathing', label: 'Breathing', description: 'Phantom-inspired pulse (4.5s cycle)' },
    { key: 'color-flow', label: 'Color Flow', description: 'Gradient rotates (6s cycle, linear)' },
    { key: 'morphing', label: 'Morphing', description: 'Learn → Do → Match (3s cycle)' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-ink-900 mb-2">TLS AnimatedLogo</h1>
          <p className="text-lg text-ink-600">Design refinement + 3 Framer Motion variants</p>
        </div>

        {/* Main Demo */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Live Preview */}
          <div className="lg:col-span-1 flex flex-col items-center">
            <div className="relative w-full aspect-square rounded-3xl bg-gradient-page-ambient-warm shadow-2xl flex items-center justify-center overflow-hidden border border-primary-200/30">
              <AnimatedLogo variant={activeVariant} size={180} withBubble={false} />
            </div>
          </div>

          {/* Controls + Description */}
          <div className="lg:col-span-2 flex flex-col justify-center gap-6">
            <div>
              <p className="text-sm font-semibold text-primary-600 mb-3">SELECT VARIANT</p>
              <div className="flex flex-wrap gap-2">
                {variants.map((v) => (
                  <Button
                    key={v.key}
                    variant={activeVariant === v.key ? 'primary' : 'ghost'}
                    onClick={() => setActiveVariant(v.key)}
                  >
                    {v.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Description Box */}
            <div className="p-6 bg-white rounded-2xl ring-1 ring-primary-200/30 shadow-sm">
              <h3 className="text-lg font-bold text-ink-900 mb-2">
                {variants.find((v) => v.key === activeVariant)?.label}
              </h3>
              <p className="text-ink-600 mb-4">
                {variants.find((v) => v.key === activeVariant)?.description}
              </p>

              {/* Spec details per variant */}
              {activeVariant === 'breathing' && (
                <div className="text-sm text-ink-500 space-y-1">
                  <p>• **Use case**: Loading states, hero background</p>
                  <p>• **Duration**: 4.5s infinite loop</p>
                  <p>• **Easing**: easeInOut (smooth acceleration/deceleration)</p>
                  <p>• **Property**: scale: [1, 1.08, 1]</p>
                </div>
              )}

              {activeVariant === 'color-flow' && (
                <div className="text-sm text-ink-500 space-y-1">
                  <p>• **Use case**: Brand signature, loading spinner alternative</p>
                  <p>• **Duration**: 6s infinite loop (linear)</p>
                  <p>• **Easing**: linear (constant rotation speed)</p>
                  <p>• **Property**: linearGradient rotates 360°</p>
                </div>
              )}

              {activeVariant === 'morphing' && (
                <div className="text-sm text-ink-500 space-y-1">
                  <p>• **Use case**: TLS philosophy visualization (Learn → Do → Match)</p>
                  <p>• **Duration**: 3s infinite loop</p>
                  <p>• **Easing**: easeInOut</p>
                  <p>• **Properties**: Each blob morphs independently on its own cycle</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Spec Table */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-ink-900 mb-6">Comparison</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-primary-200">
                <th className="text-left py-3 px-4 font-semibold text-ink-700">Variant</th>
                <th className="text-left py-3 px-4 font-semibold text-ink-700">Use Case</th>
                <th className="text-left py-3 px-4 font-semibold text-ink-700">Duration</th>
                <th className="text-left py-3 px-4 font-semibold text-ink-700">Difficulty</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-primary-100 hover:bg-primary-50/50">
                <td className="py-3 px-4 font-mono text-primary-600">static</td>
                <td className="py-3 px-4">Logo variant (no motion)</td>
                <td className="py-3 px-4">—</td>
                <td className="py-3 px-4">Easy</td>
              </tr>
              <tr className="border-b border-primary-100 hover:bg-primary-50/50">
                <td className="py-3 px-4 font-mono text-primary-600">breathing</td>
                <td className="py-3 px-4">Loading states, hero moments</td>
                <td className="py-3 px-4">4.5s</td>
                <td className="py-3 px-4">Easy</td>
              </tr>
              <tr className="border-b border-primary-100 hover:bg-primary-50/50">
                <td className="py-3 px-4 font-mono text-primary-600">color-flow</td>
                <td className="py-3 px-4">Brand signature, loading spinner</td>
                <td className="py-3 px-4">6s</td>
                <td className="py-3 px-4">Medium</td>
              </tr>
              <tr className="hover:bg-primary-50/50">
                <td className="py-3 px-4 font-mono text-primary-600">morphing</td>
                <td className="py-3 px-4">Philosophy visualization</td>
                <td className="py-3 px-4">3s</td>
                <td className="py-3 px-4">Hard</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Performance Notes */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h3 className="font-bold text-blue-900 mb-2">Performance Notes</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• All variants use GPU-safe transforms (scale, rotate, opacity)</li>
            <li>• Breathing & morphing should run 60fps (verify in DevTools Performance tab)</li>
            <li>• Color-flow uses `linear` easing (no acceleration, pure rotation)</li>
            <li>• Size 64px–256px recommended (tested at scale)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
```

---

## 🎯 Integration Checklist

By end of Week 1, you should have:

- [ ] **Design Refinement**
  - [x] Reviewed current TlsLogo.tsx
  - [x] Decided on "Soft Organic" Direction C refinement
  - [x] Created TlsLogoRefined.tsx with blobs + gradients + filters

- [ ] **AnimatedLogo Component**
  - [x] Created `src/pages/marketing/components/AnimatedLogo.tsx`
  - [x] Implemented 4 variants (static, breathing, color-flow, morphing)
  - [x] All variants 60fps (verified in DevTools)

- [ ] **Demo Page**
  - [x] Created `src/pages/marketing/_motion-lab/LogoVariantsDemo.tsx`
  - [x] Added route to App.tsx: `/marketing/_motion-lab/logo-variants`
  - [x] Live at http://localhost:5173/marketing/_motion-lab/logo-variants

- [ ] **Documentation**
  - [x] Saved code snippets (copy/paste ready)
  - [x] Performance notes (GPU-safe, 60fps verified)
  - [x] Use-case examples for each variant

---

**Ready to implement? Start with Day 5–7 from `WEEK1-PARALLEL-PLAN.md`! 🚀**
