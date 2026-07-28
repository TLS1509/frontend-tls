# Chantier — reconstruire le showcase `/components`

> Diagnostic et plan du 2026-07-28. Tous les chiffres sont mesurés, aucun estimé.
> Rien n'est implémenté : ce doc sert à cadrer le chantier avant de l'ouvrir.

## Pourquoi la page est inutilisable

Ce n'est pas seulement qu'elle est longue. Six causes distinctes se cumulent.

| # | Cause | Mesure |
|---|---|---|
| 1 | **Aucun sommaire.** `CATEGORY_ORDER` ne sert qu'à construire les sections, jamais une navigation. Il n'existe aucun moyen d'aller quelque part sans Ctrl+F | 0 nav |
| 2 | **Une seule ancre dans tout le fichier**, posée sur la `<section>` de catégorie. Aucune ancre par composant | 1 `id={}` sur 8 524 lignes |
| 3 | **Pas de `scroll-mt`.** Au saut d'ancre, la cible passe sous le chrome sticky de l'app — c'est le « l'ancre tombe au milieu de la page ». `DesignLab.tsx` a la correction et un commentaire qui nomme ce manque | 0 vs 4 dans DesignLab |
| 4 | **Tout est monté d'un coup.** 185 composants rendus simultanément, sans virtualisation ni montage à la demande | 124 imports |
| 5 | **Le showcase est livré à tout le monde.** Aucune route lazy : l'app est un seul chunk, donc le code de `/components` est téléchargé par chaque visiteur du site public | chunk de 3,9 Mo |
| 6 | **Le catalogue a dérivé** du code qu'il expose | 320 exportés / 185 déclarés |

**La cause racine des points 1, 2 et 6 est la même** : le catalogue est écrit
*en JSX, à la main*, entremêlé au rendu. Il n'existe pas de registre de données
qu'on puisse parcourir pour générer une navigation, des ancres, ou vérifier la
couverture. Tant que ça reste du JSX, chaque ajout coûte cher et la dérive
recommence.

## Ce qu'il faut décider avant de coder

1. **Une route par catégorie, ou une page unique mieux naviguée ?** Une route
   (`/components/:categorie`) résout d'un coup les points 1, 2, 4 et 5 et donne
   des URL partageables. C'est le choix recommandé.
2. **Le showcase expose-t-il les primitives de layout et les squelettes ?**
   Chloé a tranché le 2026-07-28 : **oui** pour les deux, **non** pour les 38
   composants marketing/motion.
3. **Faut-il un mode « diff » ?** Une vue qui liste ce qui existe dans `src/`
   sans être exposé. C'est ce qui empêche la dérive de revenir.

## Le plan

### Phase 1 — Extraire le catalogue en données

Sortir les 328 entrées de `Components.tsx` vers un registre typé,
`src/pages/components/registry.ts` :

```ts
type Entry = {
  name: string;
  codePath: string;               // 'ui/Badge.tsx'
  category: Category;
  subCategory: string;
  status: 'stable' | 'deprecated' | 'lab';
  render: () => React.ReactNode;  // la démo, isolée
};
```

Le rendu devient une fonction du registre. Trois conséquences immédiates : la
navigation et les ancres se génèrent, la couverture se vérifie par un test, et
ajouter un composant devient une entrée au lieu d'un bloc de JSX.

### Phase 2 — Assainir la taxonomie

15 catégories dans `CATEGORY_ORDER`, mais **22 chaînes de catégorie** réellement
utilisées. Sept orphelines : `Core`, `Patterns`, `Content`, `EdTech`,
`Management`, `IA & Pédagogie`, `Prompt Engineering` — plus le doublon de casse
`PROMPT ENGINEERING`. À rattacher ou à fusionner, une par une.

Retirer les deux entrées mortes : `EditorialCard`, `SearchWithFilters_F`.

### Phase 3 — Reconstruire la coque

- Route `/components/:categorie`, lazy-loadée hors du chunk principal
- Nav latérale persistante : catégories → sous-catégories → composants
- Recherche par nom, par chemin de fichier et par tag
- **Une ancre par composant**, avec `scroll-mt` calé sur la hauteur du chrome
- État vide et état « composant introuvable » explicites

### Phase 4 — Repeupler

29 ajouts, dans cet ordre de valeur :

**Composants d'app manquants (19)** — `PageHero` (le hero le plus consommé),
`Chip` (la primitive des 4 pills), `Tooltip`, `ErrorPage`, `SegmentedControl`,
`SettingsRow`, `SelectableOptionCard`, `ReaderContextStrip`, `CoachRow`,
`CorrectionStatusBar`, `Kbd`, `AuthSuccess`, `SelectCheckboxFloating`,
`ChartDetailModal`, `ChartWithExport`, `CompletionModal`, `AuthFeature`
(à exposer comme `deprecated`), `ProtectedRoute`, `ScrollToTop`.

**Primitives de layout (6)** — `PageShell`, `Container`, `Grid`, `Stack`,
`Cluster`, `BottomNav`.

**Squelettes (4)** — `ActivityItemSkeleton`, `ResumeLessonSkeleton`,
`SkeletonGroup`, `StatCardSkeleton`.

### Phase 5 — Empêcher la dérive de revenir

Un test qui compare les exports de `src/components/**` au registre et échoue sur
un composant non classé. Sans ce garde-fou, on refera cet audit dans six
semaines.

## Hors périmètre

- Les 19 explorations de logo → `src/pages/_labs/logo/`, page à construire
- Les 38 composants marketing et motion → relèvent du site, pas de la Learning App
- **La révision boutons / cards / fontes** → chantier distinct, en cours
  d'arbitrage au `/_design-lab`. Le showcase doit refléter ces décisions, pas
  les prendre.

## Ce que ça débloque

Le chunk de 3,9 Mo est le bundle entier de l'app, sans découpage. Sortir le
showcase en route lazy est le premier découpage évident, et le seul qui ne
demande aucun arbitrage produit.
