# Phase 1 P0 — Atoms Conformance : état réel (corrigé)

> ⚠️ **Ce fichier a été réécrit le 2026-06-30.** La version précédente (rédigée par des agents délégués) annonçait « 75% conformance » et cochait 4 fixes P0 (Button glass-light-ghost, loading state, Card glass-brand/warm/sun, tinted binding) — **tous fabriqués**. Les agents n'avaient jamais ouvert le fichier Figma. L'inspection manuelle réelle (page `1095:2`) a montré que ces gaps **n'existaient pas**. Contenu ci-dessous = vérifié via `use_figma`.

## Méthode
Inspection directe `use_figma` (read-only) de la page `🔵 03 · Atoms` (`1095:2`) + comparaison aux specs code (`Button.tsx`, `Card.tsx`, `index.css`). Les agents ciblaient `1047:2` (page inexistante).

## Ce que l'audit délégué affirmait à tort
- ❌ « Button glass-light-ghost manquant » → **présent** (set `1109:58`)
- ❌ « Button loading state manquant » → **présent** (state `loading`)
- ❌ « Card glass-brand/warm/sun manquants » → **présents** (Card/Glass `1111:63`)
- ❌ « Card tinted non bindé » → **déjà tone-split** (tinted-primary/warm/sun/brand)
- ❌ « 75% conformance » → chiffre inventé

## Vrais problèmes trouvés ET corrigés

### 1. Component sets cassés → réparés (0/80 cassé après)
- [x] Badge (`1346:2`) — +`dot=false` sur 12 variantes
- [x] TrendingBadge (`1110:83`) — +`hasCount=false` sur 5 variantes
- [x] CheckboxGroup (`4233:963`) — normalisé `variant+state+tone`
- [x] FloatLabel (`4235:782`) — +`required=false` sur 4
- [x] InputGroup (`4235:808`) — normalisé `layout+columns+state`

### 2. Bindings texte invisibles → corrigés
- [x] Button primary/secondary/accent (tous états, 25 nodes) : labels bindés à la couleur de fond → rebindés `ink/0` (blanc), conforme code `text-white`. Vérifié visuellement.

## Vérifications (propres, rien à corriger)
- [x] Variables : 4 collections locales, **toutes TLS**. Bindings composants = 73/73 TLS, 0 étranger, 0 alias étranger.
- [x] Librairies remote étrangères (M3, Typescale, Appearance…) **désactivées par l'utilisateur** (2026-06-30).
- [x] Text styles : 31, couverture 100% des tokens `--text-*`. Rien ne manque.
- [x] Paint styles : 22 dégradés (correct — les Variables ne stockent pas de gradient). Pas de style couleur solide (solides = Variables).

## Dette typo code corrigée
- [x] Faux-italic League Spartan (pas de face italic) → `font-body italic` (Nunito) dans MagazineArticle, ArticleDetail, EditorialQuoteCallout.

## Restant (réel, optionnel)
- [ ] Binder les color-stops des 22 dégradés aux variables TLS (polish)
- [ ] Renommer Display/sm (52px) > Display/md (48px) — incohérence de nommage (styles extra hors-code)
- [ ] Vérifier visuellement Checkbox indeterminate + TrendingBadge count bubble (non confirmés cassés)
