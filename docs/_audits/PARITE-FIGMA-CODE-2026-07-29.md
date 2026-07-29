# Parité Figma ↔ code — vérifié de première main le 2026-07-29

> **Méthode.** Lecture directe du fichier Figma `LccBZ1GKWQVwVzPtsSzk5Y` via le
> serveur MCP officiel, authentifié (siège Full, plan pro), puis confrontation
> aux tokens de `src/index.css` et au rendu mesuré au navigateur.
>
> Contrairement aux audits Figma de juin marqués « ⚠️ FIABILITÉ NON VÉRIFIÉE »,
> chaque ligne ci-dessous a été relevée sur le fichier, pas déduite.
>
> **Périmètre.** Les variables et styles exposés par le component set `Button`
> (node `1109:58`). C'est un échantillon, pas le fichier entier — mais c'est le
> composant le plus dense en tokens, donc représentatif des familles.

## Résultat

| Famille | Vérifié | Verdict |
|---|---|---|
| **Couleurs** | 26 variables | ✅ **26/26 identiques** |
| **Rayons** | `--radius-pill` | ✅ identique (999) |
| **Typographie** — police, graisse, taille | 4 styles `Button/sm→xl` | ✅ **4/4 identiques** |
| **Typographie** — hauteur de ligne | 4 styles | 🟡 4/4 différentes, **sans effet visible** |
| **Ombres** | 2 styles `Elevation/xs`, `/sm` | ❌ **2/2 divergents** |

## Le seul vrai écart : les ombres

Figma porte encore du **noir pur**, le code est passé aux neutres TLS plus
doux le 2026-07-22.

| | Figma | Code |
|---|---|---|
| `Elevation/xs` | `#0000000D` (noir 5 %), offset (0,1), rayon 2 | `--shadow-xs` = `0 1px 2px rgba(18,24,28,0.04)` |
| `Elevation/sm` | `#0000001A` (noir 10 %) ×2, rayons 3 et 2 | `--shadow-sm` = `0 1px 2px rgba(18,24,28,0.05), 0 1px 3px rgba(18,24,28,0.04)` |

La géométrie correspond. Ce qui diverge, c'est **la couleur** (noir pur contre
neutre teinté) et **l'opacité** — Figma est deux fois plus opaque sur `sm`.

**C'est la troisième fois que ce même fait est trouvé périmé aujourd'hui.** Il
l'était aussi dans `DESIGN.md` (échelle recopiée aux défauts Tailwind) et dans
le tableau de tokens du showcase. Trois copies d'une même valeur, trois
périmées, aucune ne s'étant signalée.

**Correction à faire côté Figma** : mettre `Elevation/xs` et `Elevation/sm` sur
`rgba(18,24,28,…)` aux opacités du code. C'est une écriture dans Figma, donc
faisable avec `use_figma` — mais elle touche la bibliothèque publiée, donc à
faire en connaissance de cause.

## Les hauteurs de ligne : différentes, mais inertes

| Style | Figma | Code | Rendu mesuré |
|---|---|---|---|
| `Button/sm` | 13 / 16 | `--text-caption` 13 / 20 | boîte 32 px |
| `Button/md` | 15 / 18 | `--text-body-sm` 15 / 24 | boîte 44 px |
| `Button/lg` | 16 / 20 | `--text-body` 16 / 24 | boîte 48 px |
| `Button/xl` | 18 / 22 | `--text-body-lg` 18 / 28 | boîte 56 px |

Les tailles concordent partout. Les interlignes non — mais le bouton fixe sa
hauteur (`h-8`, `h-touch`, `h-12`, `h-14`) et centre son texte en flex : sur
une seule ligne, la valeur d'interligne ne déplace rien.

**À ne pas « corriger » sans raison.** Aligner Figma sur 20/24/24/28 changerait
la maquette sans changer le produit. L'écart est réel et sans conséquence — le
noter suffit.

## Ce qui n'a pas pu être fait

**Code Connect est inaccessible** sur le plan actuel :

```
You need a Dev or Full seat on an Organization or Enterprise plan to use Code Connect.
```

TLS est en **pro**. Conséquence : pas de mapping en masse, et le fichier
`src/components/core/Button.figma.tsx` — le seul du dépôt — n'a
vraisemblablement **jamais été publié**. Il compile, mais aucun script ni aucun
plan ne permet de le pousser. Cohérent avec son contenu, qui mappe encore
`brand-ghost` et `warm`, deux variantes absentes du Figma actuel, et qui ignore
`outline` et `outline-warm`, présentes des deux côtés.

Sans Code Connect, un node Figma ne dit pas quel composant React lui correspond :
il faut le deviner. C'est la raison, et la seule, pour laquelle passer en
Organization aurait un intérêt technique.

## À vérifier ensuite

Le listing des pages de l'API ne renvoie que la couverture, donc la cartographie
complète du fichier n'a pas pu être faite depuis le MCP distant. Les familles
non couvertes par le node `Button` restent à confronter : espacements, rayons
au-delà de `pill`, largeurs de conteneur, courbes d'animation.
