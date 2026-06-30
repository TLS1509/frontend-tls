# Brand docs TLS — gabarits de documents

Documents A4 portrait on-brand (tokens code), League Spartan + Nunito **embarquées**. Éditables dans Office/Google Slides, importables dans Canva. Tout en `{{ placeholders }}`.

| Fichier | Usage | Pages |
|---|---|---|
| `TLS-doc-proposition.pptx` | **Proposition commerciale** / document de cadrage | 4 |
| `TLS-doc-one-pager.pptx` | **One-pager** d'offre (résumé recto) | 1 |

Aperçus dans `previews/`.

**Proposition** : Cover (titre, client, réf.) → `01 Contexte` (paragraphes + encadré « À retenir ») → `02 Notre proposition` (3 volets numérotés) → `03 Accord` (blocs signature + bandeau contact).

**One-pager** : bandeau teal (titre) → accroche → 3 piliers (cartes) → chiffre clé / promesse → CTA + contact.

Régénérer : `_pipeline/docs.js` (moteur A4 portrait — `dCover`, `dPage`, `dProposal`, `dSign`, `dOnePager`). Voir `brand-decks/README.md` pour la chaîne fonts/embed commune.
