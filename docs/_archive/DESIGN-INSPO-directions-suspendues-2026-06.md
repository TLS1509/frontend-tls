# Directions A/B/C/D et bloc « Directrice créative » — exploration de juin 2026

> **Archivé le 2026-09-16, extrait de [`docs/site/DESIGN-INSPO.md`](../site/DESIGN-INSPO.md).**
>
> Ces 365 lignes ont été écrites le 2026-06-11 et **suspendues le 2026-07-29**.
> Elles sont sorties du fichier vivant parce qu'une prescription suspendue qui
> reste en place continue de se faire lire comme une autorité : c'est ce
> vocabulaire d'effets, page par page, qui a produit douze pages portant les
> mêmes. Le fichier d'origine annonçait leur suspension en tête et les gardait
> quand même sous les yeux, sur 44 % de sa longueur.
>
> **Rien ici ne fait foi.** C'est un compte rendu de ce qui a été exploré en
> juin, conservé pour ne pas refaire le même chemin sans le savoir. La direction
> visuelle et motion du site est à rejouer.
>
> Ce qui reste vivant — le North Star, les anti-références, la bibliothèque
> Mobbin, le fil « décor peint » — est resté dans le fichier d'origine.

---

## Partie 1 — Les quatre directions et la « Directrice créative »

## 🎯 DIRECTIONS (2-3 max — nomme-les)

### Direction A — « Éditorial chaud » *(primaire)*
- **Ambiance (1 phrase) :** crème/pêche + teal + orange, gros titres League Spartan, confiance éditoriale, l'humain dans le cadre — chaleureux et lisible, jamais corporate-froid.
- **Refs (de la short-list) :** Ditto · Daydream · Evernote « 2nd brain » · Craft.
- **Ce qu'on vole concrètement :** hero crème/pêche chaud · animated word-swap dans headline · diagramme flux comme visuel hero (STRIDE/Learn→Do→Match) · UI produit qui flotte · CTA orange chaud.

### Direction B — « Le système qui se montre » *(accent)*
- **Ambiance :** clair et démonstratif — on **montre un mécanisme** (Learn→Do→Match, Passeport Dreyfus) par le scroll ; le motion est une **preuve**, pas de la déco.
- **Refs :** Shopify Editions · Jitter · Opennote · Daydream (Operating Model steps) · Anchor (staggered pills).
- **Ce qu'on vole :** scroll-story qui montre un vrai système (déjà = `StickyScrollStory`) · pill badge inline pour annoncer features · tabs features avec UI produit · staggered pills pour visualiser les modules.

> **Gate :** A = direction primaire (notre lane validée, déjà amorcée Home/Conseil). B = accent à doser sur 1-2 moments-clés par page (pas partout). On NE bascule PAS en dark skin même si les patterns impressionnent (Legend/Origin).
> Toutes les refs sont désormais **confirmées visuellement**. Plus d'entrées *inféré*.

### Direction D — « Technique Bank » *(vol de patterns uniquement — ne devient PAS une direction)*
- **Refs :** Legend · Origin.
- **Ambiance (à ne pas reproduire) :** dark premium, backgrounds sombres — hors notre lane.
- **Ce qu'on vole concrètement :**
  - **Layout** : feature tabs système, grilles modulaires avec état actif fort
  - **Composants** : glass premium poussé, états hover/focus riches — retraduire en teal/cream
  - **Motion** : entrées staggerées, transitions entre états fluides, scroll-reveal sections
- **Règle :** on prend le **pattern**, on laisse le fond sombre. Appliquer en version claire.

### Direction C — « Illustrated Glass » *(candidate forte — à décider)*
- **Ambiance (1 phrase) :** fond atmosphérique illustré/peint (organique, chaud) sur lequel flottent des composants glass — tension délibérée entre la main et la machine. Profondeur Z, jamais plat.
- **Refs :** Duna (paysage peint chaud) · Craft (landscape illustré + glass nav + produit flottant) · Daydream (lignes hand-drawn + motion) · Anchor (scroll effects) · **Air** (Scroll Effects + Glass) · **Structured** (baroque painting bg + contenu stark) · **Phantom** (blobs organiques atmosphériques + staggered feature cards).
- **Tags Mobbin confirmés :** Craft = Glass/Colorful · Duna = Illustration · Daydream = Colorful/Motion · Anchor = Light/Scroll Effects · Air = Scroll Effects/Glass · Structured = Motion/Illustration · Phantom = Scroll Effects/Motion.
- **Ce qu'on vole concrètement :**
  - Fond : mesh gradient teal/pêche/gold + `NoiseTexture` légère (déjà dans DS) — ou illustration SVG organique en bg fixe
  - Components : double-bezel glass (`backdrop-blur-glass-medium`, `bg-white/55`, inner shadow hairline) posés *sur* le fond — pas sur blanc plat
  - Connexions : lignes flow hand-drawn SVG reliant Learn→Do→Match ou étapes STRIDE (Daydream style)
  - Scroll : sections qui révèlent progressivement (Anchor 30-section scroll-story)
- **Risque :** plus coûteux à implémenter, nécessite des SVG illus soignés. Si bâclé → kitsch. Si maîtrisé → le site le plus mémorable du secteur.
- **Compatibilité DS TLS :** ✅ Header glass déjà fait · `MeshGradientBg` · `NoiseTexture` · `backdrop-blur-glass-*` tokens · `TiltCard` · `MagneticButton` — les primitives sont là.

> **Différence A vs C en 1 image :** A = page de magazine posée sur table blanche (plat, éditorial). C = fenêtre en verre dépoli devant un paysage peint (depth, atmosphérique, tension organique/tech).

---

## ⏸️ DIRECTION C « Illustrated Glass » — SUSPENDUE (2026-07-29)

> *Prise le 2026-06-11 (« C all the way. Smooth, light, premium, elevated »),
> **suspendue le 2026-07-29**. Tout ce qui suit jusqu'à la fin de la section
> « Directrice créative » se lit comme une exploration datée, pas comme une
> décision en vigueur : la direction visuelle et motion du site est à rejouer.*

**Direction primaire retenue :** **C** — Illustrated Glass (atmosphérique, depth, tension organique/tech, signature mémorable)

**Accent emprunté :** B — « Le système qui se montre » (scroll-story + tabs features + staggered pills) sur 1-2 moments-clés par page

---

## 🎨 DIRECTRICE CRÉATIVE — C (Illustration + Vidéo + Motion)

### 1. ILLUSTRATION — Style & Exécution

**Vision :** Atmosphères peintes/organiques, **jamais cartoon**. Technique : aquarelle numérique + textures organiques, pas vectoriel plat.

| Dimension | Détail |
|---|---|
| **Palette** | Teal `#55A1B4` · orange `#ED843A` · gold `#F8B044` + nuances chaudes pêche/sauge. Gradients ambient (lavande-teal-crème). |
| **Style** | Watercolor abstraite (Daydream/Structured refs) + mesh organiques (Phantom ref). Zéro ligne nette, zéro illustration naïve/cartoon. |
| **Légèreté** | Pas de full-bleed dense. Blanc/crème ambient, illustrations flottantes — 40-60% opacité pour depth sans surcharge. |
| **Technique** | Procreate/Clip Studio → export PNG + integration React avec `opacity`, `mask`, `mix-blend-mode: screen/overlay`. |
| **Sujets** | Abstractions organiques : flux lignes fluides (Learn→Do→Match), blobs atmosphériques, paysages stylisés (montagne-arbre-écoulement d'eau = métaphore parcours). |
| **Refs visuelles** | Daydream (lignes hand-drawn STRIDE), Structured (baroque softening), Phantom (blobs), Air (subtilité) |

**À éviter :** humains, mascottes, cartoon, détails hyperréalistes, saturation, chaos.

---

### 2. VIDÉO — Cinéma + Motion Design

**Tone :** Cinéma contemplatif, pas tech-hype. Poétique, intelligent, sobre.

| Dimension | Détail |
|---|---|
| **Durée & placement** | 6-15 sec max. Hero Home (1), Formation Hero (1), Learning App section (1). Pas de auto-play bruyant. |
| **Style** | Slow reveal (camera pan/zoom), gradient mesh moving, particules organiques flottantes. Zéro transition hard-cut. |
| **Couleurs** | Teal + orange naturel. Éclairage "sunrise through frost" (warm side-light, cool shadows). |
| **Sujet** | Abstrait : flux d'eau, gradient organiques qui bougent, lignes qui se dessinent en direct, blobs qui respirent. Jamais : personnes, produits, texte lourd. |
| **Format** | MP4 H.264, optimisé mobile. Lazy-load `<video>` + poster frame statique. |
| **Motion math** | Lent = premium. Durée 4-6s pour 3-4 keyframes. Easing : cubic-bezier(0.25, 0.46, 0.45, 0.94) (smooth, naturel). |
| **Refs visuelles** | Air (subtlety), Phantom (organic motion), Daydream (flow) |

---

### 3. MICRO-INTERACTIONS — Motion & Smooth

**Principe :** Smooth > flashy. Light > heavy. Elevé = chaque détail compte.

| Interaction | Exécution | Tone |
|---|---|---|
| **Hover composants** | Scale 102%, blur bg -2px, text color teal lift, duration 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94) | Subtle airiness |
| **Scroll reveal** | Elements fade in + y-translate(-32px) as viewport enters, 800ms duration. Stagger children 100ms apart. | Cascade, floating |
| **CTA buttons** | Bg fill from left on hover (orange → teal gradient 200ms). Icon rotates 12deg. On click: scale 0.96 (press feedback), ripple from center (white 15% opacity, 600ms). | Magnetic, responsive |
| **Glass panels** | Backdrop blur + inner shadow enter on scroll. Border glow (white/10 to white/20) fade. | Ethereal emergence |
| **Magnetic scroll** | Sections stick for 2.5s while content reveals inside via opacity + parallax (slow, -4vh per 100vh). Momentum smooth on release. | Cinematic, controlled |
| **Input focus** | Border color cream → teal, bg white/5 → white/12, ring-glow 2px teal/40 (no sharp), 250ms. Cursor golden. | Warm welcome |
| **Loading states** | Skeleton loaders with pulse gradient (teal → gold → transparent), no spinning spinner. 1.5s loop. | Premium placeholder |

**Global easing :** NEVER linear. Standardize on **cubic-bezier(0.22, 1, 0.36, 1)** (overshoot calm) for bouncy moments, **cubic-bezier(0.25, 0.46, 0.45, 0.94)** for smooth slides.

**GPU safety :** Only animate `transform`, `opacity`. No `top`, `left`, `width`, `height`.

---

### 3b. HERO HOME — Cinématique (le moment signature)

**Concept :** Fullscreen hero (min-h-[100dvh]) = cinéma d'ouverture. Pas de scroll au-dessus, tout rentre d'un coup.

**Composition (left-right split 50/50) :**

| Côté | Contenu | Animation |
|---|---|---|
| **Gauche (texte + CTA)** | Headline League Spartan **«** *[skill]* **en pratique»** avec animated word-swap (Ditto ref — dernier mot swaps in 1.2s cubic-bezier). Subheading clair. **CTA orange** (press ripple, magnetic). | Fade-in + blur-clear (400ms delay, 600ms duration). Entrée gauche momentum. |
| **Droite (vidéo + illustration + glass)** | **Fullscreen video** (10sec loop, slow reveal): abstract mesh gradient teal-pêche → particles organiques → lignes dessinant Learn→Do→Match. **Glass panel flottant** (Craft double-bezel), contient **illustration watercolor** (teal/orange wash, 50% opacity, zéro détail). **Foreground:** Mist glow corner (right-top) = particules dorées flottantes. | Video plays on load (silent). Glass panel entre bottom-right (translate +300px +200px → 0, 1200ms cubic-bezier). Illustration fade-in sur vidéo (400ms delay). Particles loop infini (8s spring). |

**Motion story :**
1. **0ms :** Load. BG = cream gradient.
2. **200ms :** Left text fade-in (blur-clear), word-swap animates headline verb.
3. **400ms :** Video démarre (silent loop). Glass panel entre off-screen.
4. **600ms :** Illustration + particles visibles, float slow (parallax scroll -4vh/100vh).
5. **1200ms :** Hero "landed". Animations idle (subtle float on scroll).
6. **Scroll trigger :** Sections stack sticky dessous, hero stick 80% viewport puis release smooth.

**Copy (template) :**
```
Headline: « [Skill] en pratique »
(« [Skill] » swaps : design / leadership / code / TLS-skill, 3s interval)

Subheading: « La formation qui valide vos compétences sur des projets réels. Grâce à l'IA, sans perdre l'humain. »

CTA: « Commencer maintenant » (orange, ripple, arrow rotate hover)
```

**Tech specs :**
- Hero = `relative min-h-[100dvh] overflow-hidden`
- Left = `absolute left-0 top-1/2 -translate-y-1/2 z-10 max-w-md`
- Right = `absolute right-0 top-0 w-1/2 h-full`
- Video = `<video autoplay muted loop playsinline>` (poster = static mesh gradient)
- Glass panel = `backdrop-blur-glass-heavy + bg-white/55 + rounded-[2.5rem] + shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]`
- Word-swap = Framer Motion `AnimatePresence` + `layoutId` (Ditto pattern)
- Parallax scroll = `useTransform(scrollY, [0, 400], [0, -160])`

**Mobile (< md) :**
- Stack vertical (texte full-width top, vidéo h-[70dvh] below).
- Pas de parallax (touch-jank).
- Durée × 1.5 slower (mobile generosity).

---

### 4. COLOUR STORY — C Palette (Cohésive)

| Role | Color | Usage |
|---|---|---|
| **Primary glass** | Teal `#55A1B4` 60% opacity | Component borders, glow accents, hover states |
| **Warm accent** | Orange `#ED843A` | CTAs, highlight text, underline reveals |
| **Depth gold** | Gold `#F8B044` | Rare accent, gradient stop, premium detail |
| **Ambient** | Cream `#F8F6F3`, Lavender `#E8E5F0`, Mist `#D4E9F0` | Gradients, illustration overlays |
| **Dark glass** | Charcoal `#2A2A2A` with white/15 inner border | Dark sections (max 1 per page, accent only) |

---

### 5. COMPORTEMENT PAR PAGE

| Page | Illustration | Video | Micro-interaction focus |
|---|---|---|---|
| **Home / Hero** | Mesh gradient teal-pêche-or, blobs flottants (Phantom style) | 10sec slow reveal (particles forming Learn→Do→Match) | Magnetic scroll Home sections, hero CTA press |
| **Formation** | Watercolor STRIDE diagramme (Daydream style) + étapes numérotées floaty | Formation narrative 6sec (lines drawing themselves) | Sticky tab activation, section scroll-stack |
| **Learning App showcase** | Glass panels stacked 3D (Craft/Air style) + landscape soft blur | Product interaction loop 8sec (UI elements appearing) | Parallax card tilt, glass hover glow, CTA scale |
| **About (founders)** | Organic abstract (no faces) portrait suggestions via brush strokes | — | Reveal on scroll, smooth fade-in |
| **Contact** | Minimal mesh gradient corner accent | — | Input focus warmth, form validation glow |

---

### 6. DECISION GATE — Implementation Readiness

- ✅ **Illustration :** Procreate assets → PNG, blended in React via CSS (mix-blend-mode, mask-image)
- ✅ **Video :** Loom screen record (organics motion) + After Effects (color grade teal/orange) → MP4 H.264
- ✅ **Micro-interactions :** Framer Motion (spring physics) + Tailwind (custom easing curves)
- ✅ **DS fit :** Existing glass tokens + MeshGradientBg component, NoiseTexture overlay
- ⚠️ **Timeline :** Illustration + video = 2-3 weeks for asset pipeline. Motion code = 1 week (using established Framer patterns)
- 🚀 **Start sequence :** (1) Procreate illustration batches (Home + Formation hero) → (2) Video shoot/edit → (3) Component micro-interactions + scroll reveals

> ⏸️ *Cette clause de verrouillage (« Once approved: No reopening Directions »)
> est **caduque depuis le 2026-07-29**. Une direction créative ne se ferme pas à
> la relecture — c'est ce verrou qui a transformé une exploration de juin en loi
> tenue sept semaines. La direction est rouverte.*

---

## Partie 2 — Case study Until Labs (parallaxe, trois tiers)

## 🔍 CASE STUDY: Until Labs — Parallax Architecture Reverse-Engineered

> **Référence live** : https://www.untillabs.com/  
> **Analyse** : Hero scrolling avec parallax multi-layer + animated molecules  
> **Verdict** : ✅ Réplicable en TLS avec Framer Motion (budget okay)

### **Comment Until le fait (stack technique)**

**Framework & Libraries:**
- **Next.js 15+** (React 19) — evidenced by Tailwind class density + fixed positioning patterns
- **Framer Motion** — inferred from `willChange: transform, opacity` and scroll-tracking patterns
- **Tailwind CSS v4** — class names like `hero-fade-in`, `will-change-*`, `fixed`, `top-[12%]`
- **SVG + Canvas** — molecules/particles likely rendered as SVG with `<motion.svg>` wrapper

**Parallax Mechanism (3-layer pattern):**

```
Hero section = 100vh full-bleed
├─ Layer 1 (Photo background)
│  └─ useTransform(scrollY, [0, 1000], [0, -300])  // 30% of scroll
├─ Layer 2 (3D Illustrations + couple)
│  └─ useTransform(scrollY, [0, 1000], [0, -700])  // 70% of scroll
└─ Layer 3 (Floating molecules)
   └─ y: useTransform() + animate={{ rotate: 360 }}  // parallax + infinite rotation
```

**Framer Motion Pattern:**
```jsx
const scrollY = useScroll(); // browser scroll tracked
const photoY = useTransform(scrollY, [0, 1000], [0, -300]);
const illustY = useTransform(scrollY, [0, 1000], [0, -700]);

<motion.div style={{ y: photoY }} className="photo" />
<motion.div style={{ y: illustY }} className="illustrations" />
<motion.svg
  animate={{ rotate: 360 }}
  transition={{ duration: 8, repeat: Infinity }}
/>
```

**CSS optimizations:**
- `will-change: transform, opacity` — GPU acceleration
- `fixed` positioning pour navbar glassmorphe qui devient opaque au scroll
- Tailwind utilities pour spacing + layout (zéro inline styles)

---

### **Adaptations proposées pour TLS (3 tiers: Budget-Conscious → Premium)**

#### **Tier 1 — MVP Parallax (5-7 jours, Haiku complexity)**

**Setup:**
```jsx
// src/components/marketing/motion/HeroParallax.tsx
import { useScroll, useTransform, motion } from 'framer-motion';

export function HeroParallax() {
  const scrollY = useScroll();
  
  // 2 layers au lieu de 3 (plus simple)
  const bgY = useTransform(scrollY, [0, 800], [0, -200]);      // slow
  const contentY = useTransform(scrollY, [0, 800], [0, -400]); // medium
  
  return (
    <section className="relative min-h-[100dvh] overflow-hidden">
      {/* Layer 1: Mesh gradient background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-gradient-to-br from-primary-50 via-accent-50 to-secondary-50"
      />
      
      {/* Layer 2: Content (text + CTA) */}
      <motion.div style={{ y: contentY }} className="relative z-10 flex items-center justify-center h-full">
        <h1>Titre avec parallax</h1>
        <Button>CTA</Button>
      </motion.div>
    </section>
  );
}
```

**Assets TLS:**
- ❌ Pas d'illustration hyperréaliste
- ✅ Mesh gradient Tailwind (déjà dans DS)
- ✅ Texte blanc centré + CTA orange
- ✅ Navbar glassmorphe (déjà implémentée)

**Cost:** Framer Motion déjà installed, zéro assets externes.

---

#### **Tier 2 — Illustrated Parallax (12-15 jours, Sonnet complexity)**

**Ajout vs Tier 1:**
- 1 illustration watercolor (Procreate) posée en parallax
- Blobs SVG petits qui flottent + tournent

**Setup:**
```jsx
export function HeroParallax() {
  const scrollY = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, -150]);
  const illustY = useTransform(scrollY, [0, 800], [0, -350]);
  
  return (
    <section className="relative min-h-[100dvh] overflow-hidden">
      {/* Mesh gradient */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 bg-mesh-gradient" />
      
      {/* Watercolor illustration (Procreate export PNG) */}
      <motion.img
        src="/illustrations/hero-watercolor.png"
        style={{ y: illustY, opacity: 0.85 }}
        className="absolute inset-0 object-cover mix-blend-overlay"
      />
      
      {/* Floating SVG blobs */}
      <motion.svg
        className="absolute top-1/4 right-1/4 w-48 h-48"
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity }}
      >
        <circle cx="100" cy="100" r="60" fill="rgba(85, 161, 180, 0.3)" />
      </motion.svg>
      
      {/* Content */}
      <motion.div style={{ y: illustY }} className="relative z-10">
        <h1>Titre</h1>
      </motion.div>
    </section>
  );
}
```

**Assets TLS:**
- ✅ 1 watercolor hero (Procreate, ~4h)
- ✅ 2-3 small SVG blobs (code, ~1h)
- ✅ Mesh gradient (Tailwind, déjà fait)

**Cost:** ~15h design/code. Budget Procreate subscription (monthly).

---

#### **Tier 3 — Premium (Until-level, 3-4 semaines, Full Team)**

**Ajout vs Tier 2:**
- 3 illustrations watercolor (Home + Formation + App showcase)
- 5-8 animated SVG molecules (avec variantes)
- Advanced: 3D perspective tilt on cards
- Video background subtle (6-10sec loop)

**Setup (formation hero example):**
```jsx
export function FormationHeroParallax() {
  const scrollY = useScroll();
  const strideY = useTransform(scrollY, [0, 1200], [0, -500]);
  
  return (
    <section className="relative min-h-[100dvh]">
      {/* STRIDE diagram watercolor */}
      <motion.svg
        style={{ y: strideY }}
        className="absolute inset-0"
        viewBox="0 0 1000 600"
      >
        {/* Hand-drawn lines connecting Learn → Do → Match */}
        <path className="stroke-primary-400" d="M100,300 Q250,150 400,300 T700,300" />
        <circle cx="100" cy="300" r="40" fill="rgba(85,161,180,0.2)" />
        <circle cx="400" cy="300" r="40" fill="rgba(237,132,58,0.2)" />
        <circle cx="700" cy="300" r="40" fill="rgba(248,176,68,0.2)" />
        
        {/* Étapes labels */}
        <text x="100" y="320">Apprendre</text>
        <text x="400" y="320">Pratiquer</text>
        <text x="700" y="320">Valider</text>
      </motion.svg>
      
      {/* Floating molecules */}
      <AnimatedMolecules count={7} />
      
      {/* Copy + CTA */}
      <motion.div style={{ y: strideY }} className="relative z-10">
        <h1>La formation qui valide</h1>
      </motion.div>
    </section>
  );
}
```

**Assets TLS:**
- ✅ 3 watercolor illustrations (Procreate, ~12h)
- ✅ 8 SVG molecules variant system (code, ~4h)
- ✅ Hero video subtitle (After Effects, ~3h)
- ✅ Tilt card 3D (Framer Motion rotateX/Y, ~2h)

**Cost:** ~21h production + video editing. Premium but magazine-grade.

---

### **Decision Matrix — Quelle Tier?**

| Critère | Tier 1 | Tier 2 | Tier 3 |
|---------|--------|--------|--------|
| **Timeline** | 1 week | 2 weeks | 4 weeks |
| **Design assets** | 0 | 1 Procreate file | 3 Procreate + video |
| **Code complexity** | useScroll + 2 layers | + illustration + SVG blobs | + 3D tilt + video |
| **Budget** | Free (Framer Motion) | +Procreate (monthly) | +Procreate +AE (one-time) |
| **Visual impact** | Subtle, clean | Strong, memorable | Premium, signature |
| **TLS fit** | ✅ Safe | ✅✅ Recommended | ✅✅✅ Ambitious |
| **Risk** | Low | Medium | High (video sync issues) |

**Recommendation:** **Start Tier 2** (Illustrated Parallax). Balance impact vs timeline. Tier 1 = too minimal (lose the wow). Tier 3 = over-scope for V1.

---

### **Implementation Checklist (Tier 2)**

- [ ] **Framer Motion setup** : `useScroll()` hook in main layout
- [ ] **Procreate illustration** : watercolor hero (teal + orange palette, 50% opacity, 1920×1080px)
- [ ] **SVG blobs** : 3 blob shapes, `animate={{ rotate: 360 }}`, duration 8-12s
- [ ] **Test parallax** : mobile (375px) + desktop (1440px), no jank at 60fps
- [ ] **Navbar transition** : backdrop-blur + opacity change at scroll trigger (threshold: 200px)
- [ ] **Dark mode** : adjust opacity of illustration for contrast
- [ ] **Performance audit** : Lighthouse > 85, CLS < 0.1
