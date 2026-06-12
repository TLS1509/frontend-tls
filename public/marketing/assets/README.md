# `/marketing/assets/` — hero & section media

Drop sourced/generated media here. The hero (`src/pages/marketing/MarketingHome.tsx`)
works **without** any of these files — they are optional enrichment layers.

| Fichier attendu | Type | Specs | Rôle |
|---|---|---|---|
| `hero-watercolor.webp` | image | 2400×1350+, < 400 Ko | Couche overlay aquarelle (mix-blend) sur le hero sombre |
| `hero-loop.webm` + `hero-loop.mp4` | vidéo | 1920×1080, < 3 Mo, 6–12 s loop | Fond vidéo abstrait optionnel (bokeh teal/amber) |
| `blob-amber.svg` / `blob-teal.svg` | svg | vectoriel | Upgrade morphing des blobs (optionnel) |

➡️ **Comment sourcer + prompts + sites + code d'intégration :** voir
[`docs/site/HERO-ASSETS-SOURCING.md`](../../../docs/site/HERO-ASSETS-SOURCING.md)

Naming : kebab-case, préfixe `hero-` pour les médias du hero. Toujours fournir un
WebP (image) ou un couple `.webm`+`.mp4` (vidéo) pour la compatibilité + le poids.
