# Animation Techniques Research — TLS Site Marketing
> Synthèse de 5 articles · 2026-06-26 · Applicabilité Direction C "Illustrated Glass"

---

## TL;DR — Ce qu'on retient pour TLS

| Technique | Source | Déjà dispo ? | Action |
|---|---|---|---|
| **Video-first hero** (générer la vidéo AVANT de coder) | MindStudio | ✅ Higgsfield MCP connecté | Générer hero loop avec `/higgsfield-cinematic-prompt` |
| **Scroll-triggered animations** (GSAP ou Framer Motion) | MindStudio + MarketingAgent | ✅ Framer Motion installé | Utiliser `useScroll + useTransform` (déjà dans DESIGN-INSPO.md) |
| **Frame extraction → scroll story** | MarketingAgent | ✅ Higgsfield MCP | Générer vidéo → extraire frame-clés → animer au scroll |
| **Remotion pour vidéos exportables** (social, tutoriels) | Sabrina.dev | ❌ non installé | `npx skills add remotion-dev/skills` si besoin |
| **Image-to-video** (Kling via fal.ai) | RunWithFoxes | Possible via API | Seedream 4.5 + Kling 2.6 Pro — alternatif à Higgsfield |
| **Cinematic prompts riches** | MindStudio + RunWithFoxes | ✅ skill installé | Utiliser `/higgsfield-cinematic-prompt` |
| **21st.dev** pour composants animés prêts | Medium | ✅ `mcp__magic__*` disponible | Shaders, particles — récupérer en cas de besoin |
| **Reference visuelle (Dribbble/Mobbin)** avant de coder | Medium | ✅ DESIGN-INSPO.md | Envoyer ref + demander matching |

---

## Article 1 — MindStudio : Animated 3D Websites + AI Video

**Source :** https://www.mindstudio.ai/blog/animated-3d-websites-claude-code-ai-video-generation

### Stack recommandée
- **GSAP ScrollTrigger** (CDN) pour scroll animations
- **Three.js** pour 3D réel (à ne pas utiliser par défaut)
- **CSS 3D Transforms** pour effets hover/rotation légers (pas de lib)
- **Vidéo AI** : Runway Gen-4 · Sora · Kling · Hailuo/MiniMax

### Workflow clé
1. **Générer la vidéo EN PREMIER** — son style visuel dicte le reste du design
2. Scaffolder avec Claude Code (description naturelle)
3. Ajouter scroll animations (GSAP ou Framer Motion)
4. Intégrer la vidéo en `<video autoplay muted loop playsinline>`

### Pattern HTML vidéo
```html
<video autoplay muted loop playsinline preload="auto" poster="hero-poster.jpg">
  <source src="hero.mp4" type="video/mp4">
</video>
```

### Pattern GSAP (équivalent Framer Motion pour TLS)
```jsx
// Framer Motion version (notre stack)
const { scrollY } = useScroll();
const opacity = useTransform(scrollY, [0, 300], [1, 0]);
const y = useTransform(scrollY, [0, 300], [0, -80]);

<motion.div style={{ opacity, y }}>
  {/* feature card */}
</motion.div>
```

### Coût
- $2–3 tokens Claude + $2–4 génération vidéo = **≈ $6 total**

### ✅ Application TLS
- Générer le hero Home avec Higgsfield (loop 10s teal/orange/gold) → **vidéo d'abord, code ensuite**
- Scroll animations sur les feature sections avec `useScroll + useTransform`
- `prefers-reduced-motion` obligatoire (déjà dans notre workflow)

---

## Article 2 — Sabrina.dev : 5 Claude Code Video Prompts (Remotion)

**Source :** https://www.sabrina.dev/p/5-insane-claude-code-video-prompts

### Stack
- **Remotion** — framework open-source, vidéos React exportables (MP4)
- Skills : `npx skills add remotion-dev/skills`
- Preview : `npx remotion studio`

### 5 types de vidéos
| Type | Usage TLS |
|---|---|
| **Education Explainer** | Expliquer STRIDE, Dreyfus, Open Badge en vidéo sociale |
| **Product Demo + Launch** | Démo Learning App → Story LinkedIn |
| **Google Reviews Testimonial** | Témoignages TLS animés |
| **Avatar + Animated Overlays** | Chloé ou Pierre-Armand en talking head + données animées |
| **Data Viz Dashboard** | Stats formation (% d'apprenants qui progressent, XP acquis) |

### Contraintes techniques Remotion
```
Safe zones : 150px top · 170px bottom · 60px côtés
Font minimum : headline 56px+ · body 36px+ · labels 28px+
Format : 1080×1920 (vertical) · 30fps
Fond : #0a0a0a (dark) — ou à adapter en fond TLS clair
```

### Primitives clés
```tsx
spring({ damping: 200 })          // motion naturel
interpolate(frame, [0,30], [0,1]) // fade in sur 1s à 30fps
<TransitionSeries>                 // transitions entre scènes
stroke-dashoffset                  // effet "dessin de ligne"
<AbsoluteFill>                     // layers empilés
```

### ⚠️ À installer si on veut faire des vidéos exportables
```bash
npx skills add remotion-dev/skills
```

### ✅ Application TLS
- **Priorité basse** pour l'instant (site d'abord)
- **Quand utile :** créer des vidéos LinkedIn pour les articles (formateur augmenté, AI Act) — génération de contenu social à partir du blog
- **Démos format court** : expliquer STRIDE en 30s Reel

---

## Article 3 — Medium : High-End Animated Website en 10 min

**Source :** https://medium.com/write-a-catalyst/how-i-built-a-high-end-animated-website-in-10-minutes-using-claude-code-7e48ab8b0974

### Stack
- `CLAUDE.md` comme mémoire persistante du projet (design tokens, standards, conventions)
- Skills : **Frontend Design** (déjà installé en global ✅) + Video to Website
- Images : **Imagen 3** ou équivalent
- Vidéo : **Kling 3.0** (fal.ai)
- Composants animés prêts : **21st.dev** (shaders, particles) — accessible via `mcp__magic__21st_magic_component_builder`

### Workflow
1. Chercher une référence sur Dribbble (visual target précis)
2. Générer les assets (image → vidéo)
3. Prompt Claude Code avec la référence + les assets
4. Push GitHub → auto-deploy Vercel

### Prompt-type
```
Create a one-product landing page... modern, premium, highly professional
with smooth animations. [Reference: dribbble.com/xxx]
```

### 21st.dev — composants à récupérer
Shader effects · Particle systems · Glass morphism avancé · Magnetic buttons
→ Accessibles via `mcp__magic__21st_magic_component_inspiration`

### ✅ Application TLS
- Notre `CLAUDE.md` joue déjà ce rôle ✅ (50+ tokens, patterns, règles)
- **21st.dev via MCP** = source de composants premium à utiliser ponctuellement pour des effets shader ou particles si Framer Motion ne suffit pas
- Référence Dribbble/Mobbin à envoyer avec chaque redesign de page

---

## Article 4 — Run With Foxes : Cinematic Brand Video

**Source :** https://runwithfoxes.substack.com/p/how-i-created-this-cinematic-brand

### Stack
- **Images :** Seedream 4.5 via Replicate ($0.03/image, 15s)
- **Image → Vidéo :** Kling 2.6 Pro via fal.ai ($0.35/clip, 5s)
- **Assembly :** Python + PyAV + PIL (local)
- **16 images de référence** pour la cohérence du personnage

### Workflow
1. Créer 16 images de référence du sujet (angles variés)
2. Prompt image très riche : angle caméra, objectif, lumière, grain film, étalonnage
3. Convertir image → clip vidéo Kling avec prompt motion
4. Assembler les clips en Python

### Prompt-type cinématique (Kling/Higgsfield)
```
[Angle] dolly-in from below · [Lens] 35mm anamorphic · [Light] golden hour side-light, 
warm shadows · [Grain] subtle 16mm film grain · [Grade] teal-orange grade · 
[Motion] slow reveal, particles floating · [Duration] 5s loop
```

### Coût
- Image : $0.03 · Vidéo : $0.35 · Assembly : gratuit = **≈ $0.40 par spot**

### ✅ Application TLS
- **Format images de référence :** prendre 5–8 screenshots de la Direction C (CinematicHero live, blobs, glass panels) comme référence visuelle cohérente
- **Prompt structure adaptée TLS :**
  ```
  35mm lens · teal-orange grade · sunrise through frost light · 
  organic watercolor particles · slow reveal · no text · no faces · 
  abstract shapes suggesting learning/flow · 5s seamless loop
  ```
- Higgsfield MCP (**déjà connecté**) = remplace Kling dans notre workflow
- Coût : ~$0.40–1 par clip avec Higgsfield

---

## Article 5 — Marketing Agent : Scroll-Animated Sites

**Source :** https://marketingagent.blog/2026/03/14/tutorial-scroll-animated-sites-with-claude-cowork/

### Stack
- **Higgsfield AI** → vidéo 2K 16:9
- **Extraction de frames** → base des scroll animations
- **6 effets cinématiques** appliqués automatiquement par le skill :
  - Film grain overlay
  - Particle system
  - Vignette effect
  - Glass card styling
  - Color tints
  - Scroll-paced transitions

### Mécanique scroll
```css
/* Basé scroll position sur opacity + easing */
opacity: calc(1 - clamp(0, (scrollY - sectionStart) / sectionHeight, 1));
/* Avec easing cubic-bezier (pas linéaire) */
```

### ✅ Application TLS
- Workflow complet **faisable avec nos outils existants** :
  1. `/higgsfield-cinematic-prompt` → générer vidéo hero
  2. Extraire 6–8 frames clés
  3. `useScroll + useTransform` (Framer Motion) pour animer au scroll
  4. Appliquer film grain + glass cards (tokens DS déjà là)
- Les "6 effets" sont tous dans notre DS : `blur-glass-*` · `shadow-card` · `MeshGradientBg`

---

## Synthèse — Stack TLS validée post-recherche

```
Génération vidéo    → Higgsfield MCP (connecté) + /higgsfield-cinematic-prompt
Scroll animations   → Framer Motion useScroll + useTransform (installé)
CSS 3D / glass      → Tailwind tokens blur-glass-* + backdrop-blur (installé)
Composants premium  → 21st.dev via mcp__magic__ (disponible si besoin)
Vidéos exportables  → Remotion (À INSTALLER si contenu social)
Image → vidéo alt.  → Kling 2.6 Pro via fal.ai ($0.35/clip)
```

## Ordre d'exécution recommandé pour la homepage

```
1. BRIEF VIDÉO   → prompt cinématique TLS Direction C
                   (teal-orange, organic, slow reveal, no text, 10s loop)

2. GÉNÉRER       → /higgsfield-cinematic-prompt + Higgsfield MCP
                   → MP4 H.264, poster frame PNG

3. INTÉGRER      → <video autoplay muted loop playsinline poster="...">
                   dans CinematicHero.tsx (remplace SVG actuel)

4. SCROLL STORY  → useScroll() sur 3 sections sous le hero
                   (Learn / Do / Match en scroll-paced reveal)

5. POLISH        → film grain overlay CSS (pseudo-element ::after)
                   glass cards avec border white/20
                   FadeInWhenVisible sur tous les blocks
```

---

## Skills à installer si besoin

```bash
# Remotion — vidéos exportables (social, LinkedIn, YouTube)
npx skills add remotion-dev/skills

# Vérifier : frontend-design et video sont déjà dans ~/.agents/skills/
```

**Déjà installés et utiles maintenant :**
- `higgsfield-cinematic-prompt` ✅ (projet)
- `frontend-design` ✅ (global)
- `video` ✅ (global)
- `high-end-visual-design` ✅ (projet)
- `gpt-taste` ✅ (projet)
