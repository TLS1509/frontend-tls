# Direction C « Illustrated Glass » — Checklist de production

> **Locked** : 2026-06-11 (Chloé « C all the way »)  
> **Briefs source** : `DESIGN-INSPO.md` (réfs Mobbin) · `SITE-STRUCTURE-DESIGN-C.md` (sitemap + specs) · `COPY-V2.md` (copy validée)  
> **Engagement** : 4-5 semaines total (3 semaines assets Phase 1 + 1 week intégration + QA)

---

## 🎯 DIRECTION CRÉATIVE — VERROUILLÉE

### Ambiance : « Illustrated Glass »
- **Background** : Fond atmosphérique illustré/peint (watercolor, Procreate) — chaud (teal-pêche-gold ambient), opacité 40–60%
- **Composants** : Glass flottants par-dessus (double-bezel : tray + core, refraction) → tension organique/tech, profondeur Z
- **Ton** : Smooth · light · premium · elevated
- **Refs DA validées** (Mobbin saves) : Ditto (word-swap) · Daydream (SVG draw-in) · Craft (glass) · Air (scroll+glass) · Structured (illustration baroque) · Phantom (blobs + particules)

---

## 📋 PHASE 1 : ASSETS RÉELS (Semaines 1–3)

### 1.1 ILLUSTRATION WATERCOLOR (Procreate/iPad)

#### Home — Hero Background (Mesh gradient + organic shapes)
- **Spec** : 1920×1080px (desktop), 2x pour retina
- **Palette** : Teal `#55A1B4` · Orange `#ED843A` · Gold `#F8B044` · ambient cream/lavender/mist
- **Style** : Watercolor peinture à main ; mesh teal→pêche→or (Phantom blobs inspiration) ; 40–50% opacité pour transparence glass
- **Durée** : **3–4h** (illustrateur)
- **Livrables** : PNG + PSD (layers pour ajustements opacity/color overlay)
- **✅ Checklist** :
  - [ ] Composition approuvée (rough Procreate video call)
  - [ ] Couleurs testées sur glass (démo overlay blanc/55%)
  - [ ] Exports final 2x retina + web-optimized
  - [ ] Intégration CSS `background-image` + `background-attachment: fixed` ou `position: fixed`

#### Formation — STRIDE Diagram (Watercolor infographic)
- **Spec** : 1200×800px ; 6 étapes horizontales (S-T-R-I-D-E), hand-drawn arrows Daydream-style
- **Palette** : Teal/gold/orange + neutrals
- **Durée** : **4–5h**
- **Livrables** : SVG (paths pour draw-in animation en code) + PSD
- **✅ Checklist** :
  - [ ] Layout STRIDE validé (ordre R avant I)
  - [ ] Paths SVG prêtes (pathLength animable)
  - [ ] Word labels intégrés (ou séparés pour animation staggered)

#### Learning App — Passeport Dreyfus Visual (Competence Spiral)
- **Spec** : 800×600px ; spirale circulaire 5 niveaux Dreyfus + noms en FR + color-coding (bleu→vert→orange→rouge gradient)
- **Style** : Watercolor + ligne encrée
- **Durée** : **3h**
- **Livrables** : SVG + PSD
- **✅ Checklist** :
  - [ ] Niveaux (Novice → Expert) texte + couleur testés
  - [ ] SVG circles/paths prêts pour stroke-dasharray animation

#### SBO Infographic — Org Structure (Deloitte/WEF stats visual)
- **Spec** : 1000×700px ; 3 overlapping circles (Jobs · Skills · Growth) avec stats (60% WEF, +52% Deloitte, +57% gap)
- **Style** : Watercolor blobs + ligne + chiffres
- **Durée** : **2–3h**
- **Livrables** : SVG + PSD
- **✅ Checklist** :
  - [ ] Chiffres sourcés (WEF/Deloitte) finalisés
  - [ ] Couleur cercles testées (teal/orange/gold overlay)

#### Footer & Misc Ambience
- **Blob watermark géant** (« Learning Society », text-white/[0.035])
- **Atmospheric shapes** (soutien des sections) — 3–4 SVG organiques réutilisables
- **Durée** : **2h**
- **Livrables** : SVG blob library

**Sous-total illustration** : **14–19h** (soit **2–3 jours** pour 1 illustrateur senior Procreate)

---

### 1.2 VIDÉO CINÉMATIQUE (Loom/After Effects/Figma Prototype)

#### Home — Hero Cinématique (10–15sec, MP4 H.264)
- **Concept** : Particules forment Learn→Do→Match nodes · smooth parallax float · golden particles drifting
- **Durée vidéo** : **10s** (slow, cinéma contemplatif)
- **Spec** : 1920×1080px 24fps H.264 codec, <5MB web-optimized
- **Timeline** :
  - 0–1s : Title + word-swap cycle (fading in)
  - 1–4s : Learn node appear + arc draw
  - 4–7s : Do node + arc, particles begin
  - 7–10s : Match node + return arc, status-pill pulse
- **Production** :
  - Figma prototype → animatic Loom OR
  - AE timeline (precomp text + shape layers + particle emitter)
- **Durée production** : **8–12h** (AE/motion designer)
- **Livrables** : MP4 + prores (edit reference)
- **✅ Checklist** :
  - [ ] Storyboard Figma approuvé
  - [ ] Color grading testé (teal/orange/gold palette)
  - [ ] Audio : silence OK ou ambience subtle (decision Chloé)
  - [ ] Fallback image (hero static) pour loading/no-JS

#### Formation — STRIDE Walkthrough (6sec)
- **Concept** : 6 steps visualisés line-by-line (Daydream pen) + icons + transitions smooth
- **Durée** : **6s**
- **Spec** : 1200×800px 24fps H.264
- **Durée production** : **6–8h**
- **✅ Checklist** :
  - [ ] Timing par step (1s chacun) validé
  - [ ] Icons Phosphor animés (scale/fade)

#### Learning App — UI Loop (8sec, Passeport scroll)
- **Concept** : Scroll fluide Passeport Dreyfus → stats update → badges light up
- **Durée** : **8s**
- **Spec** : 800×600px 24fps
- **Durée production** : **5–7h**
- **✅ Checklist** :
  - [ ] Scroll behavior mirroring real app
  - [ ] Couleurs + animations aligned avec composant live

#### Conseil — STRIDE + Org Callout (Optional, 6sec)
- **Concept** : Twin reveal (STRIDE steps + Deloitte stat boxes)
- **Durée production** : **4–6h** (optional si timeline tight)

**Sous-total vidéo** : **23–35h** (soit **3–5 jours** pour 1 motion designer senior)

---

### 1.3 BRAND ASSETS (Design System + Identity)

#### Logo & Icon System
- **TLS Logo** (déjà présent `src/components/ui/TlsLogo.tsx`) — **✅ validé**
- **Favicon** (32×32px) — mettre à jour si style ancien
- **Phosphor Icon Library** — **✅ déjà en use** (`@phosphor-icons/react`)
- **Custom SVG icons** (si besoin spécifique Direction C — ex. animated blob icon) : **2–3h**
- **✅ Checklist** :
  - [ ] Logo assets (PNG + SVG) en `public/`
  - [ ] Favicon généré + appliqué `<head>`
  - [ ] Phosphor version locked (v2 ou v3)

#### Typography System
- **Display** : League Spartan Bold/ExtBold (headings, hero) — **✅ en use**
- **Body** : Nunito Regular/Medium/SemiBold — **✅ en use**
- **Mono** : JetBrains Mono (code blocks) — optional
- **Variable font fallback** : système confiné Tailwind, **aucune action** (fonts pré-appliquées)
- **✅ Checklist** :
  - [ ] WOFF2 fonts hosted (ou Google Fonts link)
  - [ ] `font-display: swap` appliqué (perf)

#### Color Tokens (DS)
- **Primary (Teal)** : `#55A1B4` — ✅ validé
- **Secondary (Orange)** : `#ED843A` — ✅ validé
- **Accent (Gold)** : `#F8B044` — ✅ validé
- **Ambient** : Crème/lavande/brume (opacités variables)
- **Dark surface** : `#1f3e45` (ink-900 TLS)
- **Glass tokens** : `--backdrop-blur-glass-light/medium/heavy` — ✅ appliqués
- **✅ Checklist** :
  - [ ] Tokens CSS finalisés dans Tailwind config
  - [ ] Figma Design System synced (color vars)
  - [ ] Contrast vérif AA/AAA (axe/Wave)

#### Motion Design System
- **Easing curvés** :
  - `cubic-bezier(0.22, 1, 0.36, 1)` — **emphasis** (snappy, direction C)
  - `cubic-bezier(0.25, 0.46, 0.45, 0.94)` — **smooth** (fluid transitions)
  - NO `linear` — **banni**
- **Spring Physics** : `{ type: "spring", stiffness: 100, damping: 20 }` (premium feel)
- **Duration** : **0.3s–0.8s** transitions génériques ; **1–3s** reveals ; **infinite** breathing (3–5s cycle)
- **GPU-safe** : transform/opacity only (jamais `top/left/width/height`)
- **✅ Checklist** :
  - [ ] Easing curve déclaré en const Framer (réutilisable)
  - [ ] Motion audit : chaque transition testée 60fps (DevTools Perf)
  - [ ] Reduced-motion respected (préférence système)

#### Pattern Library
- **Double-bezel glass** : `rounded-[2.25rem] bg-white/40 ring-1 ring-ink-900/5 p-2 backdrop-blur-glass-light` → inner `rounded-[1.75rem] bg-white/55 backdrop-blur-glass-medium shadow-[inset...]`
- **Breathing blob** : `animate: { scale: [1, 1.08, 1] }` duration 3–5s infinite
- **Magnetic button** : `useMotionValue + useTransform` hover pull (strength 14–16)
- **Word-swap (Ditto)** : `AnimatePresence mode="wait"` + `initial: { y: "0.5em", blur(6px) }` + invisible sizer
- **✅ Checklist** :
  - [ ] Pattern composants créés en `/src/pages/marketing/components/motion/`
  - [ ] Storybook ou Figma showcase (docs)

---

## 📺 PHASE 2 : INTÉGRATION + QA (Semaine 4)

### 2.1 Image Integration
- [ ] Hero bg image CSS (`background-image`, parallax `transform: translateY`)
- [ ] Formation STRIDE SVG plug → path draw-in animation + stagger
- [ ] Learning App Passeport spiral SVG
- [ ] SBO infographic SVG + CountUp data binding
- [ ] Watermark blobs (`position: fixed`, z-index layering)
- [ ] Image optimization (WebP fallback, `srcset` retina)

### 2.2 Video Integration
- [ ] Home hero `<video>` in glass frame (fallback static image)
- [ ] Formation video hero (auto-play muted loop OR page scroll trigger)
- [ ] Learning App demo video
- [ ] Loading states (skeleton) pour video buffering
- [ ] Mobile fallback (hero image or reduced video quality)

### 2.3 Motion Audit
- [ ] Scroll reveal stagger (0–200ms delays)
- [ ] Hover states (all CTAs: MagneticButton tested)
- [ ] Word-swap cycling (Formation hero title)
- [ ] SVG path draw-in timing (STRIDE = 1.1s per arc)
- [ ] Breathing blobs perf (DevTools — 60fps locked)
- [ ] Parallax desktop vs mobile fallback
- [ ] Tab backgrounded test (hero visible even when `document.hidden`)

### 2.4 Performance
- [ ] Image file size <500KB web-optimized
- [ ] Video <5MB MP4 (Hero hero critical path)
- [ ] Lighthouse score >85 (Perf / Best Practices)
- [ ] CLS <0.1 (layout stability — image/video sizing locked before load)
- [ ] LCP <2.5s (hero image + text above fold)

### 2.5 Accessibility
- [ ] Alt text on SVG/images (role="img" + aria-label)
- [ ] Video captions (optional — depends on audio content)
- [ ] Color contrast AA/AAA (Teal/Gold on white/glass)
- [ ] Focus states on all CTAs visible + keyboard-navigable
- [ ] Reduced-motion respected (animations disabled if `prefers-reduced-motion`)

---

## 🎨 PHASE 3 : REMAINING PAGES (Weeks 5–6 post-launch)

### 3.1 Formation Page
- [ ] Hero watercolor STRIDE bg
- [ ] 3-level tabs (Opennote pattern)
- [ ] SVG STRIDE diagram draw-in
- [ ] Coaching glass cards (Air/Origin pattern)
- [ ] Dark CTA close

### 3.2 Learning App Marketing Page
- [ ] Interactive Passeport Dreyfus mockup
- [ ] Features grid (bento layout)
- [ ] Testimonial carousel (if videos available)
- [ ] CTA promo ("Start 7-day free trial")

### 3.3 Conseil Page (Accompagnement)
- [ ] SBO infographic + CountUp animation
- [ ] Audit Flash callout (glass card)
- [ ] STRIDE 6-step method table (avec logos/icons)
- [ ] 2 Pôles bio cards (Chloé + Pierre-Armand, NO photos but high-end layout)

### 3.4 Resources Hub (Ressources / Dossiers)
- [ ] Featured dossier SBO (watercolor illustration preview)
- [ ] Grille dossiers + articles (2-col masonry)
- [ ] Search/filter bar

### 3.5 About Page (À propos)
- [ ] Founders story text-only (you requested no photos, 2026-06-10)
- [ ] Mission statement (« Pour que la formation se prouve sur le terrain »)
- [ ] Values grid (3–4 values, icons + short copy)

---

## 📝 BRAND VOICE & COPY (Integrated with Assets)

### Voice Document
- **Register** : **Vous** (formal, B2B, friendly authority) — locked 2026-06-10
- **Tone** : Grounded, honest, optimistic (NO: "Elevate", "Seamless", "Unleash", "Next-Gen")
- **Persona** : Learning directors, HR managers, educators (40–55yo, seeking practical IA integration)
- **Copy guardrails** :
  - 0 invented metrics (95%, 200+, 40+ — banned 2026-06-10)
  - OPCO yes / CPF never (FACTS-CANON F10)
  - Open Badge (NOT "2.0")
  - 0 AI Act content on marketing (moved to `/ressources/blog`)
  - 0 founder photos (decision 2026-06-10)
  - Testimonials deferred ("with agreement", Jan 2026 earliest)

### Copy Archive (Validation Trail)
- **Approved** : `docs/site/COPY-V2.md` (hero + sections, Jan 2026 draft)
- **In-flight** : Pricing page (model ⏸️ frozen, decision pending)
- **Pending** : Formation overview · Conseil audit specs · About founders

---

## 🎯 SUCCESS CRITERIA

### Creative Direction
- [ ] Hero ≥85% confidence (visual diff from "Generic SaaS")
- [ ] Glass effect renders crisply (no blur artifacts on edges)
- [ ] Watercolor blends organically with glass (no hard cutoffs)
- [ ] Motion feels premium (no jank, smooth 60fps)
- [ ] All motion respects reduced-motion preference

### Content Integrity
- [ ] 0 invented metrics
- [ ] All claims sourced (Deloitte/WEF/TLS) or marked opinion
- [ ] Tone consistent across pages (vous register)
- [ ] No off-registre copy (tu → vous, "Elevate" removed, etc.)

### Technical
- [ ] `tsc --noEmit` = 0 errors
- [ ] `npm run build` succeeds
- [ ] All images/videos optimized (<500KB ea.)
- [ ] Lighthouse >85 (Perf)
- [ ] WCAG AA contrast ✅

### UX/Polish
- [ ] Desktop + mobile + tablet tested
- [ ] No broken links (all `/marketing/*` prefixed)
- [ ] Hover states working (magnetic CTAs, underline-draw, scale feedback)
- [ ] Forms functional (Contact, Newsletter signup)
- [ ] Page transitions smooth (no reload flash)

---

## 📅 TIMELINE

| Week | Owner | Deliverable | Status |
|------|-------|-------------|--------|
| **Week 1** | Illustrator (Chloé?) | Procreate + watercolor exports | ⏳ Not started |
| **Week 2** | Motion designer | AE hero + STRIDE + LearningApp videos | ⏳ Not started |
| **Week 3** | Illustrator + Designer | Assets final polish + Figma sync | ⏳ Not started |
| **Week 4** | Dev (Claude) | Image/video integration + motion audit + perf | ⏳ Not started |
| **Week 4–5** | Dev (Claude) | QA + accessibility + lighthouse | ⏳ Not started |
| **Week 5+** | Everyone | Remaining pages (Formation, Learning App, Conseil, About) | ⏳ Backlog |

---

## 🔗 LINKED DOCS

- **`DESIGN-INSPO.md`** — réfs DA (15 saves Mobbin + analysis)
- **`SITE-STRUCTURE-DESIGN-C.md`** — sitemap + page section structure
- **`COPY-V2.md`** — validated copy (hero + sections)
- **`FACTS-CANON.md`** — truth source for claims (chiffres, offres, OPCO/CPF)
- **`SITE-REACT-AUDIT.md`** — this file's parent (full code audit trail)

---

## ⚠️ BLOCKERS / DECISIONS

1. **Illustration tool** — Procreate (iPad) ou Figma Design? Decision needed → impacts timeline.
2. **Video production** — In-house (AE) ou outsource (Loom animator)? Budget + timeline.
3. **Watermark opacity** — Currently `text-white/[0.035]`. Adjust after final bg tests.
4. **Mobile video** — Full video (bandwidth) OR poster image (perf) OR WebM (format support)?
5. **Route flattening** — `/marketing/*` → `/*` intention still open; confirm with Chloé.

---

**Last updated** : 2026-06-11  
**Next review** : Chloé approval on illustration direction (rough Procreate video)
