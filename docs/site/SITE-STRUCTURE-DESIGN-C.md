# SITE STRUCTURE + DESIGN-INSPO MAPPING — Direction C

> **2026-06-11** — Intégration Direction C « Illustrated Glass » + références Mobbin (Ditto, Daydream, Craft, Air, Structured, Phantom, Legend, Origin) dans chaque page du site marketing TLS.

---

## 🗺️ SITEMAP (Routes à plat, navigation claire)

### Navigation principale (Header)
| Route | Page | Titre | Registre | Illustration | Vidéo | Micro-interaction focus |
|---|---|---|---|---|---|---|
| **/** | **Home / Hero cinématique** | TLS pitch + produit | vous | Mesh teal-pêche blobs + Learn→Do→Match lignes | 10sec slow reveal (particles organiques) | Animated word-swap, magnetic CTA, scroll parallax |
| **/formation** | Formation offre | Les 3 niveaux STRIDE | vous | Watercolor STRIDE diagram (Daydream style) | Formation narrative 6sec | Sticky tab, staggered reveals |
| **/learning-app** | Learning App produit | Features + interface | vous | Glass panels floats 3D (Craft/Air) | UI interaction loop 8sec | Parallax card tilt, glass glow |
| **/conseil** | Conseil + Accompagnement | SBO Audit + Pôles | vous | (minimal) | — | Scroll-story system, tabs smooth |
| **/ressources** | Hub (Blog + Dossiers) | Index contenu | vous | (light accent) | — | Browse, filter smooth |

### Ressources (Mega-dropdown / Footer)
| Route | Page | Titre | Fonction | Illustration |
|---|---|---|---|---|
| **/blog** | Magazine / Blog index | Articles de fond | Discovery + archive | (minimal) |
| **/blog/:slug** | Article detail | Editorial longform | Read + navigation | (minimal) |
| **/dossiers** | Dossiers index | Rapports sourcés | Collection themed | (minimal) |
| **/dossiers/:slug** | Dossier detail (SBO) | Chapitre + biblio | Deep dive + CTA | (minimal) |

### Légal / Méta
| Route | Page | Titre | Contenu |
|---|---|---|---|
| **/about** | About us | Équipe TLS | Fondateurs seulement (Chloé + Pierre-Armand) — pas photo stock |
| **/contact** | Contact form | Contact + CTA | Form + réassurance |
| **/mentions-legales** | Mentions légales | Legal | Boilerplate |
| **/politique-confidentialite** | Politique confidentialité | Privacy | RGPD + opt-in newsletter |
| **/cgv-cgu** | CGV/CGU | Terms | Boilerplate |
| **/charte-ia** | Charte IA | AI positioning | Ressource éducative (pas mention produit) |

---

## 📄 STRUCTURE DÉTAILLÉE PAR PAGE

### 1. HOME `/` — Hero cinématique + System showcase

**Sections (ordre) :**

| # | Nom | Contenu | Éléments visuels | Références | Motion focus | Notes |
|---|---|---|---|---|---|---|
| **1** | **Hero cinématique fullscreen** | Headline animated word-swap « [skill] en pratique » + subheading vous + dual-CTA (Formation/Learning App) | **Gauche :** text fade-in momentum · **Droite :** video 10sec slow reveal (particles forming Learn→Do→Match) + glass panel double-bezel (Craft) + watercolor illustration 50% opacity | **Ditto** (word-swap), **Craft** (glass panel), **Phantom** (particles/blobs), **Daydream** (hand-drawn lignes) | Staggered entry (200ms text, 400ms video, 600ms illustration), parallax scroll | ⭐ Signature moment. Mobile: stack vertical. `min-h-[100dvh]`. |
| **2** | **Proof strip** (preuve honnête) | « Premiers déploiements · Grand groupe français jan 2026 » + badges Qualiopi/C-Campus/Open Badge | Sobriquet line, tokens solides (no graphics) | — | Subtle fade-in on scroll | Zéro faux logo. Slot prêt pour vrais clients. |
| **3** | **Product demo** | « Montrer pas raconter » — interactive mockup Learning App (Dreyfus, coaching, journal, veille) | `InteractiveAppMockup` component + tiltcard + halo | **Craft** (flottant), **Air** (subtlety) | Tilt on cursor, glow on scroll | Jouable, montre l'UI réelle. |
| **4** | **Scroll-story signature** (StickyScrollStory) | **Learn → Do → Match boucle** : parcours apprenant visualisé en 3 étapes. Ou **Passeport Dreyfus 1→5** progression. Morphe étapes en scrollant. | 3 panneaux (1 per beat) : Dreyfus card + projet réel + passeport update. Fond mesh teal-gold, blobs organiques floating | **Daydream** (morphing flow), **Phantom** (organic motion), **Structured** (clean stage) | Sticky 2.5s per section, opacity+transform stagger inside, spring ease | LE moment « système ». Clip scroll inside viewport, momentum smooth. |
| **5** | **Offres (index numéroté)** | 3 offres en colonnes (Formation / Conseil / Learning App) : titre + description + icon tone-codé (primary/warm/sun) + CTA → route | Cards with **tone gradient** (`primary-50` / `warm-50` / `sun-50`), offset **oversize number** `text-[5rem] text-primary-100` | **Opennote** (tabs + UI showcase), **Anchor** (staggered pills), **Jitter** (pill badges) | Hover: scale 102%, text lift teal, 300ms cubic-bezier. Stagger children 100ms. | Éditorially strong. No pricing. Routes: `/formation`, `/conseil`, `/learning-app`. |
| **6** | **Teaser STRIDE** | 6 étapes STRIDE (S·T·R·I·D·E) — ligne numérotée, bref, CTA `/conseil` | Numbered pills (1–6) + microtext per étape. Ordre canon (Réaliser avant Intégrer — FACTS M3). | **Jitter** (pills), **Opennote** (step cards) | Stagger fade-in on scroll (calc delay per index). | Teaser only, full page `/conseil`. |
| **7** | **Chapitre humain warm** | « On apprend avec des humains, accompagnés par des outils » — conviction + **portrait réel** (Chloé OR Pierre-Armand — not stock) + floating quote card | Fond `secondary-50/accent-50` warm, squiggly SVG underline draw, portrait + card with shadow/glass | **Daydream** (hand-drawn), **Structured** (classical tension) | `motion.path` pathLength draw (squiggle), parallax card -4vh/100vh, reveal fade-in. | Zéro photo stock. Portrait = founder ou omitted (slot différé). |
| **8** | **CTA final — dark accent** | « Réserver un échange » — seule section dark de la page (1 moment autorisé en Direction C). Dark card, MagneticButton, conviction « Découvrez comment »... | Fond `from-ink-900…` dark, `MeshGradientBg ink` subtle, white text. Double-bezel card à l'intérieur. | **Legend** (dark premium patterns), **Origin** (glass on dark) | Mesh subtle loop (8s), button magnetic pull + ripple on press. | This is THE dark moment. Keep contained. |
| **9** | Footer | (existant `MarketingFooter`) | — | — | — | Corrigé registre/routes 2026-06-10. |

---

### 2. FORMATION `/formation` — Multi-step flow

**Sections (sketch) :**

| # | Nom | Contenu | Éléments visuels | Références | Motion focus | Notes |
|---|---|---|---|---|---|---|
| **1** | **Hero** | Headline « Maîtrisez l'IA en formant vos équipes » (vous) + subheading 3-level path + CTA « Commencer » | Watercolor illustration : STRIDE étapes en flux organiques (Daydream style). Mesh gradient teal-pêche ambiant. | **Daydream** (watercolor STRIDE) | Fade-in + parallax slow. | Light warm, pas dark. |
| **2** | **3 Levels** (tabs) | Niveau 1/2/3 : description + time + skills matrix + testimonial slot (différé) | Tabs component (smooth spring rotate on activate). Cards per level with **tone gradient** (primary/warm/sun). | **Opennote** (tabs features), **Anchor** (staggered pills skills) | Tab switch: border glow fade, content cross-fade (200ms). Stagger pills on each tab. | Opennote ref = tabs + product UI. |
| **3** | **Learning outcomes** | 8-12 outcomes per niveau en 2-col grid | Checkmark icons (Lucide `CheckCircle2`), clean typography, tint per level | **Jitter** (checkmark inline), **Craft** (clean layout) | Stagger fade-in (grid layout, calc delay). | Light. Zéro heavy design. |
| **4** | **Coaching model** | 1-1 coaching sessions · group workshop · peer feedback. Modèle visuel. | **Glass panels** (origin pattern) stacked 3D perspective, transparent descriptions. Mesh background teal subtle. | **Air** (glass), **Structured** (coaching clarity) | Parallax pan on scroll (-4vh per 100vh). Hover glow glass border teal. | Elevated, light. |
| **5** | **STRIDE deep-dive** | 6 étapes linéaire, chacune : titre + 2-3 bullets (pas d'illustration lourde, juste texte + icon) | Simple flow diagram (Daydream style — ligne hand-drawn reliant étapes). Minimal. | **Daydream** (line drawing) | Line draw itself on scroll-into-view (SVG pathLength). | Lightweight. Teaser = Home §6, detail = this page. |
| **6** | **CTA + next** | « Réserver une démo Formation » (dark section) + Link « Explorer la Learning App » | Dark card (1 moment). | **Legend/Origin** (dark) | — | Standard dark close. |

---

### 3. LEARNING APP `/learning-app` — Product showcase

**Sections (sketch) :**

| # | Nom | Contenu | Éléments visuels | Références | Motion focus | Notes |
|---|---|---|---|---|---|---|
| **1** | **Hero** | Headline « La plateforme qui apprend de vos apprenants » (vous) + video showcase 8sec (UI interaction loop : user scrolls journal, badge unlock, coach comment appears) | Glass panels floating 3D (Craft/Air style), landscape blur soft in background. Mesh teal-gold gradient. | **Craft** (hero float), **Air** (glass + landscape) | Video plays on load (silent). Glass panels parallax -4vh. | Product-led, not photo-led. |
| **2** | **3 Core features** (Dreyfus / Journal / Coach) | Cards layout asymmetric: feature name + 2-3 bullets + feature video (3sec each, side-by-side or staggered) | Double-bezel glass cards, tone per feature (primary/warm/sun background). Watercolor accent illustration corner (Phantom blobs). | **Opennote** (UI showcase), **Phantom** (organic bg accent) | Card tilt on hover (10deg). Video lazy-load. Stagger reveals. | Keep light. No product screenshots (use mockup only). |
| **3** | **Passeport Dreyfus** | Visualization 1→5 progression. Interactive: click D1→D5, card fills in competencies + evidence + coach feedback | **StickySroll story** optional: as user scrolls, Dreyfus level evolves. OR static cards (less cinematic). Mesh background (gold accent). | **Daydream** (progressive reveal), **Structured** (level clarity), **Legend** (system design) | Scroll-reveal stagger per level. Spring ease on card appear. Glow on D-level progress. | Core value prop. Interactive > static. |
| **4** | **Coach 1-1** | Coaching model. Card (glass) + testimonial slot (différé) + booking CTA | Portrait placeholder (founder OR omitted). Floating quote card overlay. | **Craft** (floating), **Daydream** (hand-drawn accent) | Quote card reveal on scroll (-32px + fade). | Humain angle. No stock photo. |
| **5** | **Badge system** | Open Badge minting, Passeport export, integrations (LinkedIn). 3 features in tabs. | Tabs (Opennote pattern). Icons (Lucide `Award`, `Share2`, `Zap`). Light, minimal. | **Opennote** (tabs), **Jitter** (badge design) | Tab switch smooth (200ms). Badge icon pulse on load (infinity 1.5s). | Light. Zéro heavy decoration. |
| **6** | **CTA + next** | « Demander une démo Learning App » (dark) + « Lire le blog » | Dark card. | **Legend/Origin** | — | Close. |

---

### 4. CONSEIL `/conseil` — SBO audit + Accompagnement

**Status :** ✅ Rebuild 2026-06-11 complete (see SITE-REACT-AUDIT.md §[ref]).

**Sections (existing structure, apply Direction C motion):**

| # | Nom | Contenu | Références + Motion |
|---|---|---|---|
| **1** | **Hero** | Headline « Diagnostiquer vos enjeux d'organisation Skills-Based » (vous) + description 2 lines | Watercolor illustration (SBO concept — org charts soft, not rigid). Mesh teal-orange. |
| **2** | **Audit Flash** | 0.5–1j audit desc + 3 deliverables | Opennote-style cards (tabs: scope/duration/outcomes). Clean. |
| **3** | **STRIDE 6 étapes** | Table unifiée: S·T·R·I·D·E order. Badges + word + icon per étape. | Stagger fade-in. Hover glow per row. |
| **4** | **2 Pôles** | Chloé (Conception) + Pierre-Armand (Delivery). Bios (text only, no photo). | Minimal. Tone accent (primary/warm per pôle). |
| **5** | **CTA dark** | « Réserver un audit flash » | Dark card. Single moment. |

**Apply Direction C:** Micro-interactions smooth (300ms easing), glass glow on hover, watercolor accent corner illustration, mesh gradient ambient.

---

### 5. RESSOURCES `/ressources` — Hub index

**Sections:**

| # | Nom | Contenu | Motion |
|---|---|---|---|
| **1** | **Hero** | « Apprenez des meilleurs experts » (vous) | Mesh subtitle accent. |
| **2** | **Featured content** (carousel or grid) | Latest blog post + latest dossier. Cards tone-codé (blog=sun, dossier=primary). | Hover scale 102%, glow. Stagger reveals. |
| **3** | **Blog grid** | 6-12 latest articles. Cards: cover + date + title + excerpt + read CTA. | Hover tilt (10deg). Reveal stagger. Lazy image load. |
| **4** | **Dossiers featured** | SBO dossier card (cover image, chapter count, read CTA). | Hover glow. |
| **5** | **CTA** | Newsletter signup (existant) | Double-bezel pill input. Smooth focus glow. |

---

### 6. BLOG `/blog` + ARTICLE `/blog/:slug`

**Blog index :** Grid cards (image placeholder) + filters (by tag). Stagger reveals on scroll. Lazy images.

**Article detail :** H1 + intro callout « En résumé » + body (longform) + `ReadingProgressBar` (sticky top) + sidebar (related articles) + footer CTA blog. **Zéro GradientText, zéro FadeInWhenVisible gate.** All reveals visible by default.

**References:** Light weight. Clean typography. No heavy decoration.

---

### 7. ABOUT `/about` — Team

**Content :**
- H1 « Notre équipe »
- 2 persons only: **Chloé Mimault** (role + bio text, no photo) + **Pierre-Armand Dennery** (role + bio, no photo)
- « Nous cherchons... » (hiring signal) — optional
- CTA: Contact / Join us

**Motion:** Minimal. Fade-in reveals. No heavy animation.

---

### 8. CONTACT `/contact` — Form

**Sections:**
- H1 + description (reassurance: « Réponse sous 48h »)
- Form (name, email, topic dropdown, message, privacy checkbox, submit)
- CTA reassurance

**Motion:** Input focus glow (teal, 250ms), submit button ripple on click, success toast message.

---

---

## 🎨 MAPPING RÉFÉRENCES → PAGES (Direction C Application)

### Illustration
| Référence | Style | Pages |
|---|---|---|
| **Daydream** | Hand-drawn lignes organiques, watercolor flows (STRIDE diagram, Learn→Do→Match morphing) | Home (hero §1), Formation (§1), Learning App carousel transitions, Conseil (§1), Blog accents |
| **Phantom** | Blobs organiques atmosphériques, particles floating | Home (hero video particles), Learning App (feature card backgrounds), Ressources (accent corner) |
| **Structured** | Baroque softening, classical painting technique (order + chaos tension) | Formation (step transitions), Conseil (SBO org clarity) |
| **Craft** | Clean layout minimalism, flottant UI | Learning App (hero), Conseil (tabs design) |
| **Air** | Subtlety, glass + landscape harmony | Learning App (hero glass), Formation (coaching visual), Ressources (hero) |

### Vidéo
| Page | Video | Duration | Technique | Reference |
|---|---|---|---|---|
| **Home hero** | Mesh gradient teal-pêche animating + particles forming Learn→Do→Match | 10sec | Slow reveal, no cuts | Phantom, Daydream |
| **Formation** | 6 STRIDE steps animating in sequence (line drawing + fade) | 6sec | Hand-drawn style, narrative | Daydream |
| **Learning App** | UI interaction loop: Dreyfus card → journal scroll → badge popup → coach comment | 8sec | Screen recording color-graded | Craft, Origin |
| **Conseil** | SBO org diagram building itself (Deloitte/WEF metrics appearing) | 6sec | Data viz reveal | Legend, Structured |

### Micro-interactions
| Interaction | Implementation | Pages | Reference |
|---|---|---|---|
| **Animated word-swap** | Framer `AnimatePresence` + `layoutId`, word enters from side 1.2s cubic-bezier | Home hero, Formation hero | Ditto |
| **Glass panel glow on hover** | Border teal/40 opacity fade in, backdrop blur increase, 300ms | Learning App, Conseil, Contact | Air, Origin |
| **Staggered pill reveals** | Grid/flex children, calc delay per index 100ms | Home (Offres), Formation (outcomes), Anchor pills anywhere | Anchor, Jitter |
| **Parallax scroll (-4vh per 100vh)** | `useTransform(scrollY, [0,400], [0,-160])` GPU-safe | Home (illustration), Learning App (glass panels), Formation (background) | Air, Phantom |
| **Sticky scroll story** | Sections pin 80% viewport, content morphs inside (Learn→Do→Match or Dreyfus 1→5) | Home (§4), Learning App (Passeport optional) | Daydream, Structured, Legend |
| **Magnetic button** | Button pulls toward cursor 4px, ripple on click (white/15 600ms from center) | Home CTA, all CTAs, Conseil, Contact | Craft, Origin |
| **Input focus glow** | Border cream→teal, bg white/5→white/12, ring-glow 2px teal/40, cursor golden, 250ms | Contact form | Origin |
| **Tab smooth switch** | Border glow + content cross-fade 200ms cubic-bezier, icon rotate 12deg | Formation, Learning App, Conseil | Opennote, Legend |
| **Card tilt on hover** | 10deg Y-axis rotation, GPU transform-only, 300ms ease | Learning App features, Ressources browse | Craft, Legend |
| **Skeleton pulse gradient** | Teal→gold→transparent loop 1.5s, no spinner | All loading states | Origin, Phantom |

---

## 🚀 IMPLEMENTATION SEQUENCE

### Phase 1: Illustration + Video assets (2-3 weeks)
1. **Procreate batches** (watercolor):
   - Hero mesh teal-pêche-gold
   - STRIDE diagram (6 lines, hand-drawn style)
   - SBO org softening visual
   - Phantom blobs (3 variations)
   - Structured classical bg (1 subtle version)

2. **Video production** (Loom + After Effects color grade):
   - Home hero particles reveal (10sec)
   - Formation STRIDE sequence (6sec)
   - Learning App UI loop (8sec)
   - Conseil data-viz appear (6sec)

3. **PNG exports** → integrate React with opacity/mask/mix-blend-mode

### Phase 2: Component micro-interactions (1 week)
1. Fix DS `FadeInWhenVisible` (eager mode) or use `Reveal` (Editorial pattern)
2. Build:
   - `HeroEditorialMkt` (word-swap + glass panel entry)
   - Glass border glow utility (reusable)
   - Parallax scroll hook
   - Sticky scroll story wrapper + Dreyfus visual
   - Staggered pill component

### Phase 3: Page rebuilds (2-3 weeks, page-by-page)
1. Home (hero + scroll-story + offres + dark CTA)
2. Formation (tabs + STRIDE + coaching)
3. Learning App (product showcase + Passeport interactive)
4. Conseil (audit flash + pôles — existing, apply motion)
5. Ressources (hub grid + featured)
6. Blog + Article (clean text, minimal decoration)
7. About (text-only founders, minimal)
8. Contact (form focus glow)

### Phase 4: QA + Polish (1 week)
- Lighthouse performance (lazy images, video preload)
- Smooth scrolling desktop + mobile
- Accessibility audit (AA contrast, focus rings)
- Cross-browser (Safari 15+, Chrome, Firefox, mobile)

---

## ✅ DECISION GATE — Direction C Approval

**Ready to start Phase 1 (Illustration)?**
- ☐ Hero cinématique concept approved (word-swap + video + glass panel)
- ☐ Daydream style (hand-drawn STRIDE) accepted
- ☐ Phantom blobs (particles + organics) direction clear
- ☐ Video tone (slow, cinematic, no cuts) confirmed
- ☐ Micro-interaction library (easing curves, GPU-safe) signed off

**Once approved → Procreate + Loom pipeline starts. No more direction changes.**

---

## 📝 NOTES + GOTCHAS

- **Illustration:** All watercolor + opaque (blend into white/cream backgrounds). Zéro heavy shadow/outline.
- **Video:** MP4 H.264, 10–15 MB max per video. Lazy-load poster frame. Silent (no audio).
- **Motion:** `cubic-bezier(0.22, 1, 0.36, 1)` (smooth bumpy) or `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (smooth slides). NEVER `linear` or `ease-in-out`.
- **Mobile:** All parallax disabled (<md), no tilt, no magnetic pull (touch-unfriendly). Micro-interactions simplified (fade-in only, no transform).
- **Accessibility:** AA contrast on all text. Focus rings on buttons (ring-teal). `aria-label` on icons. Skip-link exists.
- **Copy + Facts:** Toujours **vous** (B2B, sauf Formation = arbitrer tu vs vous). **FACTS-CANON** sourced. **Zero fake logos/testimonials.** Pricing gelé (aucun prix affiché).
