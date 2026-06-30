# Brand decks TLS — gabarits de présentation

Système de slides The Learning Society, généré depuis les **design tokens du code** (`src/index.css`) — League Spartan + Nunito **embarquées dans les `.pptx`** (l'équipe les ouvre à la marque sans rien installer). Direction : **Hybride A+B** (couvertures immersives teal, contenu sur gradient pastel TLS).

## Decks prêts à l'emploi

**Ciblés sur les offres réelles (à privilégier) :**

| Fichier | Usage | Slides |
|---|---|---|
| `TLS-deck-conseil-stride.pptx` | Proposition de conseil — **méthode STRIDE** (confidentiel) | 10 |
| `TLS-deck-learning-app.pptx` | Présentation produit — **la Learning App** | 10 |

**Formation professionnelle — 3 variantes par contexte de diffusion :**

| Fichier | Contexte | Slides |
|---|---|---|
| `TLS-deck-formation-module.pptx` | **① E-learning** (auto-rythmé, sur la Learning App) | 13 |
| `TLS-deck-formation-presentiel.pptx` | **② Présentiel — mode présentation** (animateur en salle) | 11 |
| `TLS-deck-formation-atelier-conseil.pptx` | **③ Atelier** (cadre conseil / mission STRIDE) | 10 |

Base commune : flux pédagogique (9 événements de Gagné + engagement), **signposts couleur** 🟦 contenu · 🟧 pratique · 🟨 évaluation, tout en `{{ placeholders }}`.

- **①** : `Accroche → Objectifs → Parcours → Concept (+ À retenir) → Exemple → Activité (zone réponse) → Quiz (révélé) → Mise en situation → À retenir → Réflexion (→ Journal) → Ressources → Clôture gamifiée (badge + XP)`.
- **②** : ajoute **badges de timing** (⏱), **notes orateur** (cues d'animation par slide), **activité en sous-groupes** (carte restitution), **plan d'action** (Quoi/Qui/Quand). Flux : `Brise-glace → Objectifs → Programme → Apport → Sous-groupes → Débrief → Quiz flash → À retenir → Plan d'action → Merci`.
- **③** : framing **co-construction client**, relié à STRIDE. Ajoute **diagnostic partagé**, **matrice de priorisation 2×2** (Impact/Effort), **plan d'action priorisé**, **engagements**. Flux : `Objectif → Cadre STRIDE → Diagnostic → Co-construction → Priorisation → Plan d'action → Engagements → Suite`.

Pipelines : `_pipeline/formation.js` (①) · `_pipeline/formation-variants.js` (② + ③).

**Gabarits génériques (1ʳᵉ passe, structure réutilisable) :**

| Fichier | Usage | Slides |
|---|---|---|
| `TLS-deck-suivi-projet.pptx` | Point d'étape / comité de pilotage | 8 |
| `TLS-deck-commercial.pptx` | Trame commerciale générique | 11 |
| `TLS-deck-pitch.pptx` | Trame pitch générique | 9 |
| `TLS-gabarits-echantillon-hybride-AB.pptx` | Échantillon initial | 3 |

### ⚠️ Deck STRIDE — garde-fous (FACTS-CANON)

- **Confidentiel** — la méthode STRIDE ne s'affiche pas en surface publique. Marqué sur la cover.
- **Ordre canonique** des 6 étapes : S'orienter · Tester · **Réaliser · Intégrer** · Déployer · Évoluer (R avant I — la page Notion catalogue est en retard sur le canon).
- **Tarifs** = `sur devis` (les montants 10k/7,5k/20k€ sont gelés/provisoires — ne pas les afficher).
- **Métriques** = placeholders `{{ X }}` (ne pas reprendre les chiffres LinkedIn « 40+ orgs / 97% » = interdits). Seules preuves citables : **C-Campus** (578 formés en 2023, +93% satisfaction), attribuées.
- **Jamais nommer le client** (« un grand groupe français depuis janvier 2026 »).

### Learning App — captures d'écran ✅

Les slides `PARCOURS`, `PASSEPORT`, `HUMAIN + IA` portent désormais de **vraies captures** de l'app (parcours / passeport radar / coaching), dans des cadres navigateur. Captures sources dans [`brand-assets/app-screenshots/`](../brand-assets/app-screenshots/) (dashboard, learning-paths, passeport, coaching, journal — 2732×2048).

Pour les régénérer : `npm run dev`, puis Chrome headless `--screenshot` sur `/dashboard`, `/learning-paths`, `/passeport`, `/coaching`, `/journal` (voir `_pipeline/offers.js`, prop `shot:` du layout `screen`). Note : la capture coaching montre une barre dev en haut — recapturer hors mode dev pour un rendu 100% propre.

Aperçus : `previews/{commercial,pitch,suivi-projet}-planche.png` (planches-contact) + `apercu-*.jpg`.

## Bibliothèque de layouts (12 masters réutilisables)

`cover` · `divider` (séparateur de section) · `agenda` · `statement` (citation/manifesto) · `offers` (3 cartes) · `steps` (méthode numérotée) · `metrics` (KPI tiles) · `duo` (2 colonnes constat/promesse, avant/après, risques/décisions) · `pricing` (3 offres + badge Populaire) · `timeline` (jalons avec statut done/now/à-venir) · `closing` (CTA + contact).

## ⚠️ À personnaliser avant envoi

- **Chiffres** des slides `metrics` (marqués « données illustratives »).
- **Tarifs** des slides `pricing` (structure indicative, « sur devis »).
- **Contact** des slides `closing` : `hello@thelearningsociety.fr` → ton vrai email, et le site.

## Régénérer / éditer en code

Le pipeline (`_pipeline/`) est la source de vérité. Voir `_pipeline/README.md`.

```bash
cd _pipeline && npm install pptxgenjs react react-dom react-icons sharp
node system.js          # → les 3 decks
python3 embed_all.py TLS-deck-*.pptx   # → versions avec fonts embarquées
```
