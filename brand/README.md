# `brand/` — assets et gabarits de marque TLS

Tout ce qui sert à produire un support à la marque **hors de l'application** :
gabarits de présentation, documents, emails, motifs, logos, doctrine.

> 👉 **Commencer par [`BRAND-KIT.md`](BRAND-KIT.md)** — couleurs, typo, logo,
> interdits, et l'état de dérive des plateformes. C'est la fiche unique.

---

## Carte du dossier

```
brand/
├── BRAND-KIT.md          ← la fiche de marque (point d'entrée)
├── identity/             ← doctrine + logos sources
│   ├── tls-design-philosophy.md    doctrine visuelle (« Liquid Mastery »)
│   ├── tls-brand-identity.pdf      planche identité, juin 2026
│   └── logos-modernises/           3 SVG : mark · horizontal · carré
├── assets/               ← matière première
│   ├── ASSETS-SOURCING-GUIDE.md    où sourcer photos/illustrations, North Star
│   ├── CANVA-BRAND-KIT.md          playbook Canva (à faire dans l'UI)
│   ├── email-templates/            13 emails + 6 signatures, HTML email-safe
│   ├── patterns/backgrounds/       17 fonds SVG (blobs, gradients, vagues)
│   ├── textures/                   2 textures JPEG
│   ├── frames-video/               13 posters vidéo
│   ├── video/                      gabarits 16:9 + lower-thirds
│   ├── app-screenshots/            5 captures de l'app ⚠️ non versionné
│   └── icons.svg                   6 icônes réseaux sociaux (sprite)
├── decks/                ← 6 gabarits .pptx + le pipeline qui les génère
├── docs/                 ← 5 gabarits de documents A4 + pipeline
└── _archive/             ← sorti du circuit, gardé pour mémoire
```

---

## Comment ça marche

Les `.pptx` de `decks/` et `docs/` ne s'éditent **pas à la main** : ils sont
**générés** par les scripts de `_pipeline/`, à partir des tokens du code
(`src/index.css`). Les polices sont embarquées dans les fichiers, donc l'équipe
les ouvre à la marque sans rien installer.

```bash
cd brand/decks/_pipeline && npm install
node system.js                        # régénère les decks
python3 embed_all.py TLS-deck-*.pptx  # embarque les polices
```

⚠️ **Les `.pptx` livrés datent de juin 2026, les générateurs ont bougé depuis
(juillet 2026).** Régénérer avant tout envoi client.

---

## Ce qui n'est pas versionné

`.gitignore` exclut les fichiers lourds : `app-screenshots/`, les `previews/`,
les planches de slides, les gabarits vidéo `.pptx`/`.png`.

**Conséquence :** ces aperçus n'existent que sur la machine de Chloé. Sur un autre
poste, un `git clone` donne un `brand/` sans aucune vignette. Régénérables via
les pipelines, mais il faut le savoir.

---

## Règles

1. **Aucune valeur de couleur ou de taille n'est décidée ici.** Elles viennent de
   `src/index.css`. Ce dossier les *applique*.
2. **Un support qui part chez un client passe par [`FACTS-CANON.md`](../docs/_canon/FACTS-CANON.md)** —
   il liste les claims interdits (Qualiopi, CPF, client nommé, métriques inventées).
3. **Rien de nouveau à la racine de `brand/`** hors `README.md` et `BRAND-KIT.md`.
   Un nouvel asset va dans le sous-dossier de sa famille.
4. **Ce qui meurt va dans `_archive/`**, pas à la corbeille — avec une ligne
   d'explication dans le README du dossier d'origine.
