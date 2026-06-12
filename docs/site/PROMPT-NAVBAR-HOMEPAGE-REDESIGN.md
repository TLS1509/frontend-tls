# Prompt — Session Navbar + Homepage Redesign + Brand Assets DA

> Copier-coller tel quel au début d'une nouvelle session Claude Code.

---

## Contexte projet

**The Learning Society** — Plateforme EdTech B2B (SBO = "Skills Based Organisation").
Stack : React 19 · TypeScript · Vite · **Tailwind CSS v4** (CSS-first, tokens dans `src/index.css @theme`) · React Router 7 · Zustand 5 · **Framer Motion** · Lucide React.

**Brand TLS** :
- Primary : `#55A1B4` (teal — primary-500) → `#3D7786` (primary-700) → `#1F3E45` (primary-900)
- Secondary : `#ED843A` (warm orange — secondary-500)
- Accent : `#F8B044` (golden — accent-400)
- Fonts : **League Spartan** (display, bold/extrabold) + **Nunito** (body)
- Route marketing : http://localhost:5173/marketing

**Fichiers à éditer en priorité :**
- Navbar : `src/pages/marketing/components/MarketingHeader.tsx` (380 LOC, actuellement une header sticky pleine largeur)
- Homepage : `src/pages/marketing/MarketingHome.tsx` (823 LOC, structure 9 sections déjà en place)
- Motion primitives marketing : `src/components/marketing/motion/` (déjà installées — MagneticButton, FadeInWhenVisible, MarqueeRow, CountUp, MeshGradientBg, ParallaxLayer, InteractiveAppMockup, StickyScrollStory, GradientText, TiltCard)

---

## Mission 1 — Navbar "Fluid Island" avec scroll behavior

### Objectif
Transformer le `MarketingHeader.tsx` actuel (sticky plein-bord, fond blanc) en une **navbar flottante style Fluid Island** qui s'opacifie au scroll, exactement comme le site Until Labs (untillabs.com).

### Comportement attendu

**État initial (top de page) :**
```
position: fixed
top: 24px (mt-6)
left: 50% / transform: translateX(-50%)
width: max-content (pas pleine largeur)
border-radius: 9999px (rounded-full)
background: rgba(255,255,255,0.10) + backdrop-blur-sm
border: 1px solid rgba(255,255,255,0.15)
```

**État scrollé (> 80px) :**
```
background: rgba(255,255,255,0.85) + backdrop-blur-xl
border: 1px solid rgba(0,0,0,0.08)
shadow: shadow-lg (warm-tinted optionnel)
pill toujours rounded-full (pas pleine largeur)
```

**Transition :** `transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]` — jamais `ease-in-out`.

**Performance :** `will-change: backdrop-filter, background, border-color, box-shadow` sur le nav element.

### Structure "Double-Bezel" à appliquer
```tsx
{/* Outer shell */}
<div className="ring-1 ring-black/5 bg-white/5 p-1.5 rounded-full">
  {/* Inner core avec highlight */}
  <div className="shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] rounded-[calc(9999px-6px)] px-4 py-2">
    Logo · Links · CTAs
  </div>
</div>
```

### Hamburger morph (mobile)
- 3 barres → X via `rotate-45` + `-rotate-45` avec `AnimatePresence`
- Menu mobile = overlay screen-filling : `fixed inset-0 backdrop-blur-3xl bg-white/90`
- Links en staggered reveal : `translate-y-12 opacity-0` → `translate-y-0 opacity-100` avec `delay: i * 0.06`

### Contenu nav (conserver les 5 items actuels)
```
Accueil | Learning App | Formation | Accompagnement | Ressources (dropdown) | Contact | [CTA Connexion]
```

### Règles strictes (high-end-visual-design)
- ❌ Jamais `ease-in-out` ou `linear`
- ❌ Jamais navbar collée au bord (pleine largeur) en état initial
- ✅ Custom cubic-bezier partout
- ✅ `will-change` sur le wrapper nav
- ✅ `prefers-reduced-motion` : désactiver scroll transitions, garder les changements d'état

---

## Mission 2 — Homepage redesign (option A : focus Hero + 2 sections prioritaires)

### Structure actuelle (ne pas toucher les sections 3–9, sauf ajustements)
Le fichier `MarketingHome.tsx` a déjà 9 sections. **Refactoriser seulement :**
- Section 1 : Hero (actuellement cursor spotlight + grain — à upgrader avec parallax multi-layer)
- Section 5 : Manifesto pull-quote (dark, ancre éditoriale)
- Navigation + animations d'entrée

### Hero redesign — Tier 2 "Until-style Illustrated Parallax"

**Palette hero :** fond `bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900` (dark teal) — PAS de fond blanc.

**3 couches parallax (Framer Motion `useScroll` + `useTransform`) :**
```tsx
// Couche 1 — Background lent (30% speed)
const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);

// Couche 2 — Blobs SVG + illustrations (70%)
const midY = useTransform(scrollYProgress, [0, 1], ['0%', '-35%']);
const midRotate = useTransform(scrollYProgress, [0, 1], [0, 8]);

// Couche 3 — Contenu textuel (légèrement plus rapide que scroll)
const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
```

**Éléments visuels hero :**
- MeshGradientBg tone="brand" en absolute background
- 2–3 blobs SVG teal/amber animés (rotation lente 12–20s, opacity 0.15–0.30)
- Titre en `text-[clamp(2.8rem,6vw,5.5rem)]` League Spartan ExtraBold — max 5.5rem (NE PAS dépasser)
- Letter-spacing titre : `-0.03em` (tracking-display) — NE PAS aller sous `-0.04em`
- GradientText uniquement sur 2–3 mots-clés max (PAS tout le titre)
- Pill eyebrow `rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em]` — 1 seule

**Hiérarchie texte hero :**
```
[eyebrow pill] La nouvelle école du leadership opérationnel
[H1] Formez vos managers
     [GradientText amber] autrement.
[summary] 2–3 lignes max, `max-w-[52ch]`, `text-body-lg`
[CTAs] MagneticButton primary (warm) + ghost (white-on-dark)
[scroll indicator] ChevronDown animé bounce
```

**CTAs :**
- Primary CTA : `<MagneticButton strength={14}><Button variant="warm">Découvrir la méthode</Button></MagneticButton>`
- Secondary CTA (ghost on dark) : `bg-transparent text-white border border-white/30 hover:bg-white/10` — utiliser `className` override sur `<Button variant="ghost">`
- Button-in-Button trailing icon : `<span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center ml-2"><ArrowRight size={14}/></span>` flush à droite

### Règles layout hero
- Section padding : `py-32 md:py-40` minimum (heavy whitespace)
- `min-h-[100dvh]` (jamais `h-screen` — iOS Safari)
- Contenu maxwidth : `max-w-page mx-auto px-6`
- Asymétrie : texte centré ou légèrement left-offset, blobs right-heavy
- Mobile-first : single column, clamp() réduit à 2.8rem minimum

---

## Mission 3 — DA Creative : sourcing assets illustration + vidéo pour effets

**Contexte :** On cherche des assets premium pour alimenter les effets Until-style (parallax, overlays, mesh gradients, blobs animés). Deux types d'assets :

### A. Illustrations / textures (pour parallax + overlays)

**Style cible :** watercolor semi-abstrait, teintes teal + amber + golden. Organique mais non-figuratif. Pas de clip art. Pas d'illustrations 3D. Pas de flat design générique.

**Sources à explorer en session :**
1. **Mobbin saved screens** → `docs/site/DESIGN-INSPO.md` section "MOBBIN SAVES" — vérifier les apps Calm, Headspace, Duolingo, Linear pour les overlays/textures
2. **Unsplash** (via WebSearch ou URL directe) — termes : `"abstract watercolor teal orange texture"`, `"soft gradient overlay premium"`
3. **Lottie Files** — animations SVG légères pour blobs morphing (search `"abstract blob animation"`, `"organic shape morph"`)
4. **Spline** — si besoin de 3D léger (utiliser uniquement comme `<iframe>` embed, ne pas bundler)
5. **Rive** — animations interactives vectorielles (bon pour blob hero animé réactif au cursor)

**Livrables attendus (assets) :**
- 2–3 PNGs haute résolution (1920px min) watercolor abstract teal/amber pour couches parallax
- 1–2 SVG blobs morphing (ou Lottie JSON si animation)
- 1 texture grain subtile (SVG `feTurbulence` ou PNG 200×200 tileable)

**Intégration dans le code :**
```tsx
// Watercolor overlay
<motion.img 
  src="/marketing/assets/hero-watercolor-teal.png" 
  style={{ y: midY, opacity: 0.20 }}
  className="absolute inset-0 w-full h-full object-cover mix-blend-overlay pointer-events-none"
  aria-hidden
/>

// Blob SVG animé
<motion.div
  style={{ y: midY, rotate: midRotate }}
  animate={{ scale: [1, 1.04, 1] }}
  transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
  className="absolute top-1/4 right-1/4 w-80 h-80 opacity-20 pointer-events-none"
>
  <BlobSVG fill="rgba(248, 176, 68, 0.6)" /> {/* accent-400 */}
</motion.div>
```

### B. Vidéos pour effets (hero loop / section backgrounds)

**Objectif :** Court clip vidéo (5–15s, loop) en fond de section, style Until Labs "abstract movement" ou "classroom in motion".

**Style vidéo :** 
- Mouvement abstrait de lumière teal/golden (bokeh)
- OU : silhouettes de personnes en formation (pas de faces, juste des contours)
- Format : MP4 + WebM, resolution 1920×1080, < 3MB compressé
- Toujours avec `mix-blend-multiply` ou `mix-blend-overlay` sur fond coloré → donne un effet premium sans que la vidéo soit trop littérale

**Sources à explorer :**
1. **Pexels Videos** (gratuit, CC0) — search `"learning workshop abstract"`, `"bokeh light golden blue"`
2. **Mixkit** (gratuit) — bon pour backgrounds abstraits
3. **Motion Array** — premium mais qualité Awwwards-tier
4. **Coverr** — spécialisé backgrounds vidéo pour landing pages

**Intégration code :**
```tsx
<video
  autoPlay muted loop playsInline
  className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 pointer-events-none"
  aria-hidden
>
  <source src="/marketing/assets/hero-abstract.webm" type="video/webm" />
  <source src="/marketing/assets/hero-abstract.mp4" type="video/mp4" />
</video>
```

**Règle performance :** vidéo background uniquement si `prefers-reduced-motion` n'est pas activé. Fallback = MeshGradientBg statique.

---

## Standards design à respecter (non-négociables)

### high-end-visual-design
- ✅ Double-Bezel sur tous les containers (outer shell + inner core)
- ✅ `py-24` minimum par section (heavy whitespace)
- ✅ Custom cubic-bezier : `cubic-bezier(0.32, 0.72, 0, 1)` ou spring `stiffness: 380, damping: 30`
- ✅ Staggered reveals sur les listes (delay `i * 0.06s`)
- ✅ MagneticButton sur CTA primary (strength 12–16)
- ❌ Jamais `ease-in-out` ou `linear`
- ❌ Jamais Inter/Roboto/Arial
- ❌ Jamais border 1px solid gray générique + shadow larges sur même élément
- ❌ Jamais border-radius > 16px sur cards (buttons + pills = rounded-full OK)

### design-taste-frontend (TLS-specific)
- ✅ DESIGN_VARIANCE:8 — asymétrie assumée, pas de symétrie parfaite
- ✅ MOTION_INTENSITY:6 — Framer Motion `useScroll`/`useTransform`, pas de keyframes CSS lourdes
- ✅ Anti-emoji : 0 emoji, tout en Lucide React icons
- ✅ Rounded-pill (999px) pour buttons/chips — PAS `rounded-full`
- ✅ Tokens Tailwind TLS : `bg-primary-500`, `text-accent-400`, `gap-stack`, `gap-section`
- ❌ Jamais `style={{}}` pour layout/couleur/spacing
- ❌ Jamais `bg-[var(...)]` ou valeurs arbitraires avec var()
- ❌ Jamais `rounded-full` pour les buttons (utiliser `rounded-pill`)

### impeccable (qualité de prod)
- ✅ Hero H1 max `clamp(2.8rem, 6vw, 5.5rem)` — **JAMAIS > 6rem**
- ✅ Letter-spacing H1 : `-0.03em` — floor à `-0.04em` strict
- ✅ Body line-length max `65ch`
- ✅ Contraste AA : 4.5:1 texte sur fond
- ✅ `text-wrap: balance` sur H1–H3
- ✅ `min-h-[100dvh]` jamais `h-screen`
- ✅ `prefers-reduced-motion` sur toutes les animations
- ❌ Jamais d'eyebrow uppercase sur chaque section (1 seule sur tout le site)
- ❌ Jamais de `border + shadow` ensemble comme décoration de card
- ❌ Jamais de `GradientText` CSS (background-clip:text) — GradientText component Framer Motion OK
- ❌ Jamais de layouts symétriques Bootstrap-3-colonnes

---

## Étapes proposées pour la session

1. **Lire** `src/pages/marketing/components/MarketingHeader.tsx` et `src/pages/marketing/MarketingHome.tsx` pour l'état actuel exact
2. **Navbar** : refactoriser `MarketingHeader.tsx` en Fluid Island pill avec scroll behavior
3. **Démarrer le dev server** (`npm run dev`) et tester visuellement la navbar
4. **Assets DA** : rechercher illustrations/vidéos (Pexels, Lottie, Unsplash) → placer dans `public/marketing/assets/`
5. **Hero** : upgrade `MarketingHome.tsx` section 1 avec parallax 3-couches + assets trouvés
6. **Screenshot** mobile (375px) + desktop (1280px) pour validation
7. **0 erreurs** `npx tsc --noEmit`
8. **Commit** : `feat(marketing): fluid island navbar + hero parallax upgrade`

---

## Fichiers de référence à lire au démarrage

- `docs/site/DESIGN-INSPO.md` — analyse Mobbin + case study Until Labs complet
- `CLAUDE.md` §"Marketing site v2 — Immersive direction" — règles et pièges découverts
- `src/components/marketing/motion/` — liste des primitives disponibles
- `src/index.css` @theme — tous les tokens Tailwind TLS disponibles

---

*Généré le 2026-06-12 — session frontend-tls*
