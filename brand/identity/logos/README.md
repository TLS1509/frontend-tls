# Logos TLS — jeu complet

Généré le **2026-09-09** depuis `src/assets/tls-logo.svg` (le mark) et
`public/fonts/LeagueSpartan-VariableFont_wght.ttf` (le wordmark).

## Ce qui change par rapport aux fichiers précédents

**Le wordmark est en tracés.** L'ancien lockup (`../logos-modernises/`) chargeait
League Spartan *depuis Google Fonts, à l'intérieur du SVG*. Un `@import` dans un SVG
ne s'exécute pas quand le fichier est utilisé en `<img>`, ni hors ligne, ni à
l'impression : le logo retombait alors sur **Arial, sans prévenir**. Ces fichiers-ci
n'ont aucune dépendance de police.

**Le texte est à la couleur du mark**, pas en encre — calibré sur le lockup d'origine
de 2022 (`Desktop/WORK - TLS/Identité visuelle/`), dont on reprend les proportions :
hauteur de capitale à 41 % de la hauteur du mark en horizontal, écart de 26 %, et en
vertical un bloc de texte dont la ligne la plus longue s'aligne sur la largeur du mark.
La palette de 2022 (navy `#1A4568`, corail `#D3523F`) n'est **pas** reprise : c'est
l'ancienne identité.

## Deux familles de matière

Chaque format existe en **deux versions**, et le choix n'est pas une question de goût.

| | Suffixe | Pour |
|---|---|---|
| **Aplat** | *(aucun)* | Favicon, `.ico`, impression, monochrome, **tout ce qui descend sous ~48 px** |
| **Dégradé** | `-grad` | En-tête de site, app icon, hero, deck, réseaux — **les grands formats** |

La raison est mesurée, pas esthétique : **à 16 px, deux ou trois aplats battent tout
dégradé**. Le contraste y compte plus que la justesse de la couleur, et un dégradé
subtil se referme en bouillie. Un `.ico` de 16 px ne dispose que de 256 pixels.

Le dégradé reprend exactement ce que montre le brand kit : trois arrêts, un seul axe
de lumière traversant tout le mark (`userSpaceOnUse`, donc chaque forme reçoit la
portion qui lui revient), et **la pastille centrale sur le dégradé du corps** — comme
si le mark était découpé dans une seule nappe de matière. Le texte prend l'arrêt
médian du corps.

Les dégradés survivent au PDF en vectoriel (objets `/Shading`, aucune image
incorporée) : le print garde donc la matière si vous choisissez cette famille.

## Les cinq formats

| Format | Fichier | Usage |
|---|---|---|
| Mark seul | `tls-mark-*` | Favicon, avatar, tampon, usage serré |
| Horizontal | `tls-lockup-horizontal-*` | En-tête de site, signature, bandeau |
| Vertical 1 ligne | `tls-lockup-vertical-1l-*` | Compact, quand la largeur manque |
| Vertical 2 lignes | `tls-lockup-vertical-2l-*` | Format carré-ish, réseaux sociaux |
| Vertical 3 lignes | `tls-lockup-vertical-3l-*` | Vertical franc — affiche, kakémono, print |

Six variantes chacun : `color` · `light` (fonds sombres) · `primary` · `warm` · `sun` · `ink` (impression).

## Les dossiers

| Dossier | Contenu | Pour |
|---|---|---|
| `svg/` | 30 masters vectoriels | **La source.** Web, Figma, Illustrator |
| `png/web/` | 90 PNG en @1x / @2x / @3x, fond transparent | Intégration web, app |
| `png/marketing/` | 30 PNG à 2400 px de large | Deck, réseaux, bannière, presse |
| `pdf/` | 30 PDF **vectoriels** (545 opérateurs de tracé, 0 image incorporée) | **Print** — imprimeur, signalétique, textile |
| `favicon/` | 11 PNG de 16 à 1024 px + `favicon.ico` à 3 résolutions | Navigateur, iOS, PWA |

## Ce que le dépôt utilise déjà

`public/favicon.svg` · `public/favicon.ico` · `public/apple-touch-icon.png` ·
`public/icon-192.png` · `public/icon-512.png` · `public/site.webmanifest`,
tous déclarés dans `index.html`.

## Régénérer

Nécessite `resvg` et `librsvg` (`brew install resvg librsvg`), plus `fontTools`
(déjà présent). Les masters SVG se régénèrent depuis le mark source et la police ;
les PNG et PDF depuis les masters, par `rsvg-convert`.

## ⚠️ Limite connue — le print en quadrichromie

Les PDF sont **vectoriels mais en RVB**. Un imprimeur en quadri demandera du CMJN.
La conversion suppose Ghostscript et un profil ICC, et surtout un choix de rendu
colorimétrique qui n'est pas neutre sur un teal saturé. À faire avec l'imprimeur,
pas à l'aveugle.
