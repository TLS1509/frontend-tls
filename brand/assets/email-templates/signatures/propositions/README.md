# Propositions signatures — 2 directions (2026-07-10)

2 alternatives structurelles à `signature-complete.html` (la base actuelle, Figma Option A) — pas juste des variations de couleur, des compositions différentes. Toutes 100% tokens TLS, zéro bordure d'accent décorative, logo TLS réel en SVG inline. Rien ici n'est en production.

*(Une 3ᵉ direction "Stacked" — logo seul en haut, texte empilé — a été proposée puis supprimée le 2026-07-10.)*

## Les 2 directions

| | A — Badge | B — Compact |
|---|---|---|
| **Fichiers** | `a-badge-chloe.html` / `a-badge-pierre-armand.html` | `b-compact-chloe.html` / `b-compact-pierre-armand.html` |
| **Source** | Figma Option C (node `4123:66`) | Nouvelle composition |
| **Logo** | 38px, sur badge glassy/frosted (voir ci-dessous) | 20px, minuscule, posé juste avant le nom |
| **Structure** | Horizontale : badge + texte, carte blanche avec ombre (comme la base) | Horizontale ultra-compacte : logo + 2 lignes de texte, pas de carte |
| **Registre** | Le plus proche de la base — juste un logo plus doux/habillé | Le plus minimal en encombrement — idéal réponses courtes |
| **Risque** | Change peu de choses vs l'existant | Peut sembler trop réduit pour une signature "complète" |

Toutes utilisent la même palette : `primary-600 #4A8FA1` comme unique touche de couleur (nom d'entreprise / rôle), le reste en encre neutre (`ink-900`/`ink-500`/`ink-300`).

## Badge — effet glassy/frosted (2026-07-10)

Le badge logo (Option A) a été retravaillé deux fois :

1. **Centrage corrigé** : la 1ère version centrait le SVG avec `display:inline-block;vertical-align:middle` + un `margin-top:14px` en dur — un hack imprécis (le `vertical-align:middle` d'un inline-block s'aligne sur la baseline du texte environnant, pas sur le centre réel du conteneur). **Fix** : le SVG passe en `display:block;margin:0 auto` à l'intérieur d'un `<td>` avec `vertical-align:middle;text-align:center` — la vraie propriété de centrage vertical des cellules de tableau, fiable sur tous les clients mail. Plus de valeur magique à ajuster à l'œil.
2. **Effet glassy/frosted** : `backdrop-filter: blur()` (le vrai flou verre dépoli CSS) n'a quasiment aucun support email — inutile de l'utiliser, il serait juste ignoré partout. Effet approché avec des techniques 100% supportées :
   - Gradient diagonal `#FFFFFF → primary-100 #DCEBEF` (au lieu d'un flat `primary-50`) pour donner du volume à la surface
   - Liseré `1px solid rgba(255,255,255,0.8)` pour suggérer un bord de verre qui accroche la lumière
   - `box-shadow` à deux couches : une ombre externe teintée teal (`rgba(85,161,180,0.18)`) pour le lift, une ombre interne (`inset 0 1px 2px rgba(255,255,255,0.7)`) pour un reflet glacé en haut du badge
   - `background-color` uni en fallback (`primary-50`) pour les clients qui ignorent gradient/box-shadow — dégrade proprement vers l'ancien rendu plat, jamais cassé

## Comment trancher

Ouvre les 4 fichiers dans le navigateur (2 directions × Chloé/Pierre-Armand) et regarde-les côte à côte, à côté de la base actuelle (`signature-complete.html`). Badge = évolution douce et habillée de l'existant ; Compact = signature de réponse rapide, à combiner éventuellement avec Badge en signature principale plutôt que de remplacer `signature-minimale.html`.

## Prochaine étape

1. Choisir une direction (ou garder la base actuelle — Option A "Classique" sans badge)
2. Si retenue : déplacer/renommer les fichiers choisis vers `signatures/chloe-mimault-talagrand/` et `signatures/pierre-armand-dennery/` en remplacement de `signature-complete.html` (et `signature-minimale.html` si Compact est choisi pour ce rôle)
3. Supprimer ce dossier `propositions/` une fois le choix fait
