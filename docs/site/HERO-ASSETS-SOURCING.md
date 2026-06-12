# HERO-ASSETS-SOURCING.md — DA assets pour le hero marketing

> But : enrichir le hero immersif (`MarketingHome.tsx` section 1) avec 1–2 assets premium.
> Le hero **fonctionne déjà sans aucun asset** (mesh gradient + blobs animés + grain).
> Ce doc = entonnoir, pas filet. **Plafonds : 1 asset prioritaire à la fois.**

---

## ★ North Star (le filtre — avant chaque téléchargement)

> **Chaleureux · Clair · Augmenté.** Aquarelle organique, jamais corporate-bleu, jamais neon/tech-bro.

| Palette à respecter (verrouillée) | À bannir |
|---|---|
| teal `#55A1B4` · petrol `#3D7786` / `#2F5F6A` | violet / mauve / magenta |
| amber `#ED843A` · golden `#F8B044` | neon, glow saturé, rainbow mesh |
| crème / brume ambiante en transition | figures, visages, objets reconnaissables, texte |

**Question-filtre :** « teal+amber organique, lisible en overlay sur fond sombre, zéro figuratif ? »
Si non → on ne télécharge pas.

---

## 🥇 ASSET A — Texture aquarelle (PRIORITÉ 1 — fais celui-là d'abord)

**Pourquoi en premier :** 1 seule image, gain visuel maximal, effort minimal. Posée en
`mix-blend-overlay` à ~18 % d'opacité sur le hero sombre, elle ajoute des blooms peints
organiques que le CSS seul ne donne pas.

**Specs d'acceptation :**
- Format : **WebP** (ou PNG converti), **≥ 2400×1350**, **< 400 Ko** après compression
- Tons : majoritairement **mid-clairs** (l'overlay éclaircit le hero là où la peinture est claire)
- **Zéro** figure / objet / texte. Bords doux jusqu'au cadre (pas de cadre blanc).
- Nom final : `public/marketing/assets/hero-watercolor.webp`

### Option A1 — Générer (recommandé : contrôle palette total)

Outils, du plus simple au plus fin : **Canva → Magic Media** (tu as un compte Canva),
**ChatGPT/DALL·E 3**, **Leonardo.ai** (free tier), **Midjourney** (le plus beau, payant).

**Prompt prêt à coller (DALL·E 3 / Leonardo / Canva Magic Media) :**
```
Abstract watercolor texture, horizontal 16:9, edge to edge, no border.
Flowing wet-on-wet washes of teal (#55A1B4) and deep petrol blue bleeding into
warm amber and golden ochre (#ED843A, #F8B044). Soft diffused pigment blooms,
subtle cold-press paper grain, misty ethereal atmosphere, luminous mid-tones.
Fully non-figurative — no figures, no objects, no text, no symbols.
Calm, sophisticated, editorial, painterly. No neon, no purple, no harsh edges.
```

**Prompt Midjourney v6 (suffixe params) :**
```
abstract teal and amber watercolor wash, wet-on-wet bleeding pigment, petrol blue
to golden ochre, cold-press paper grain, ethereal misty, editorial, non-figurative
--ar 16:9 --style raw --stylize 250 --no text, figures, neon, purple
```

> Génère-en 3–4, garde **1**. Critère de tri : celle dont les blooms amber sont à
> droite/centre (là où le hero a déjà sa lueur dorée) → continuité parfaite.

### Option A2 — Stock (si tu ne veux pas générer)

Cap : **2 sites, 1 recherche chacun.** Filtre « Free / orientation Landscape ».

| Site | Recherche exacte | Note |
|---|---|---|
| [Unsplash](https://unsplash.com/s/photos/teal-orange-watercolor-texture) | `teal orange watercolor texture` | prends la plus abstraite, recadre 16:9 |
| [Pexels](https://www.pexels.com/search/abstract%20watercolor%20texture/) | `abstract watercolor texture` | filtre couleur → teal/orange |

⚠️ Recadre/teinte si le résultat tire trop froid ou trop saturé. La palette prime sur la photo.

### Compression (obligatoire avant de déposer)

```bash
# macOS — installe cwebp si besoin : brew install webp
cwebp -q 82 hero-watercolor-source.png -o public/marketing/assets/hero-watercolor.webp
# vérifie le poids : doit être < 400 Ko
```

### Intégration (copy-paste — déjà calé sur ma structure de hero)

Dans `MarketingHome.tsx`, composant `HeroParallax`, **juste après `<HeroBlobs .../>`
et avant le grain**, ajoute la couche (elle réutilise la parallax mid `blobY`) :

```tsx
{/* Couche 1.5 — texture aquarelle (overlay organique) */}
<motion.img
  src="/marketing/assets/hero-watercolor.webp"
  alt=""
  aria-hidden
  style={reduced ? undefined : { y: blobY }}
  className="absolute inset-0 h-full w-full object-cover opacity-[0.18] mix-blend-overlay pointer-events-none"
/>
```

C'est tout — pas d'autre changement. Si le fichier est absent, l'`<img>` ne casse rien
(juste un `alt` vide). Dis-moi quand il est déposé, je l'intègre + vérifie le rendu.

---

## 🥈 ASSET B — Fond vidéo abstrait (PRIORITÉ 2 — polish, plus tard)

**Pourquoi en 2e :** plus lourd (perf + poids), gain marginal vs la texture. À faire
une fois A validé. Désactivé sous `prefers-reduced-motion` (fallback = mesh statique).

**Specs :** 1920×1080, **6–12 s loop seamless**, **< 3 Mo** après compression,
fournir **`.webm` + `.mp4`**. Mouvement lent (bokeh / lumière / fumée abstraite), pas littéral.

### Sites + recherches (cap : 3 sites, 2 recherches chacun)

| Site | Recherches exactes |
|---|---|
| [Pexels Videos](https://www.pexels.com/search/videos/bokeh%20gold%20blue/) | `bokeh gold blue` · `abstract light teal` |
| [Mixkit](https://mixkit.co/free-stock-video/abstract/) | `abstract light` · `golden bokeh` |
| [Coverr](https://coverr.co/search?query=abstract%20light) | `abstract light` · `smoke ink` |

Tri : lumière **teal + dorée**, mouvement **lent**, pas de personnes ni de logos.

### Compression (obligatoire)

```bash
# brew install ffmpeg
ffmpeg -i source.mp4 -t 10 -vf scale=1920:-2 -an -c:v libx264 -crf 28 -preset slow public/marketing/assets/hero-loop.mp4
ffmpeg -i source.mp4 -t 10 -vf scale=1920:-2 -an -c:v libvpx-vp9 -crf 34 -b:v 0 public/marketing/assets/hero-loop.webm
```

### Intégration (copy-paste — avec garde reduced-motion)

Première couche du `<section>` de `HeroParallax`, juste **après l'ouverture du section**,
avant la couche mesh :

```tsx
{!reduced && (
  <video
    autoPlay muted loop playsInline aria-hidden
    className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-overlay pointer-events-none"
  >
    <source src="/marketing/assets/hero-loop.webm" type="video/webm" />
    <source src="/marketing/assets/hero-loop.mp4" type="video/mp4" />
  </video>
)}
```

---

## 🥉 ASSET C — Blobs SVG morphing (optionnel — j'ai déjà des blobs CSS animés)

Seulement si tu veux des formes organiques plus marquées que mes blobs flous actuels.
Générateurs (cap : 1) :

- [Haikei](https://haikei.app/) → « Blob » ou « Layered Waves », exporte SVG, fills teal/amber
- [Blobmaker](https://www.blobmaker.app/) → blob simple, copie le `<path d="...">`

Dépose en `blob-amber.svg` / `blob-teal.svg`, ou donne-moi les paths et je remplace
les blobs flous par des silhouettes nettes parallaxées. **Pas prioritaire.**

---

## ✅ Fais ça en premier (décision)

1. **Génère la texture aquarelle (Asset A)** avec le prompt Canva/DALL·E ci-dessus → garde 1.
2. Compresse en WebP < 400 Ko → dépose en `public/marketing/assets/hero-watercolor.webp`.
3. Ping-moi : j'ajoute la couche (5 lignes) et je vérifie le rendu mobile + desktop.
4. Vidéo (Asset B) = phase 2, seulement si tu veux pousser plus loin.

> Le grain est déjà inline (pas d'asset). Les blobs + mesh sont déjà animés.
> Donc **1 image** suffit à franchir le palier « premium immersif ».
