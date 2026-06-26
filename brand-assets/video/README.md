# Gabarits vidéo TLS

Frames 16:9 on-brand (League Spartan + Nunito embarquées) + overlays transparents.

| Fichier | Usage |
|---|---|
| `TLS-video-frames.pptx` | 6 frames : **Intro** · **Chapitre** (gros numéro) · **Citation** · **Stat** · **Lower-third** · **Outro** (CTA abonnez-vous). |
| `lower-third-light.png` | Lower-third **transparent** (panneau clair) — overlay direct sur footage clair. 1920×1080, alpha. |
| `lower-third-dark.png` | Lower-third **transparent** (panneau teal foncé) — pour footage clair / besoin de contraste. |

Aperçu : `frames-planche.png`.

**Export pour montage** : ouvre `TLS-video-frames.pptx` → *Fichier → Exporter → Images (PNG)* pour sortir chaque frame en 1920×1080, ou importe le PPTX dans Canva (Vidéo) et anime. Les lower-thirds PNG se glissent tels quels dans CapCut / Premiere / Canva sur une piste au-dessus de la vidéo.

Tout en `{{ placeholders }}`. Régénérer : `_pipeline/video.js`.
