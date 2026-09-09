# Brand docs TLS — gabarits de documents

Documents A4 portrait on-brand (tokens code), League Spartan + Nunito **embarquées**. Éditables dans Office/Google Slides, importables dans Canva. Tout en `{{ placeholders }}`.

| Fichier | Usage | Pages |
|---|---|---|
| `TLS-doc-proposition.pptx` | **Proposition commerciale** / document de cadrage | 4 |
| `TLS-doc-one-pager.pptx` | **One-pager** d'offre (résumé recto) | 1 |
| `TLS-doc-devis.pptx` | **Devis** — ⚠️ le numéro Qualiopi en a été retiré le 2026-07-28 (TLS n'est pas certifié) | — |
| `TLS-doc-rapport-mission.pptx` | **Rapport de mission** conseil | — |
| `TLS-doc-compte-rendu-coaching.pptx` | **Compte-rendu de séance** coaching | — |

> Les trois derniers sont générés par `_pipeline/docs2.js` et n'avaient jamais
> été documentés ici. Nombre de pages à confirmer à l'ouverture.

Aperçus dans `previews/`.

**Proposition** : Cover (titre, client, réf.) → `01 Contexte` (paragraphes + encadré « À retenir ») → `02 Notre proposition` (3 volets numérotés) → `03 Accord` (blocs signature + bandeau contact).

**One-pager** : bandeau teal (titre) → accroche → 3 piliers (cartes) → chiffre clé / promesse → CTA + contact.

Régénérer : `_pipeline/docs.js` + `_pipeline/docs2.js` (moteur A4 portrait — `dCover`, `dPage`, `dProposal`, `dSign`, `dOnePager`). Voir [`../decks/README.md`](../decks/README.md) pour la chaîne fonts/embed commune.
