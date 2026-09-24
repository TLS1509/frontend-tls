---
paths:
  - "src/**/*.{ts,tsx,css}"
---

# Pièges Tailwind v4 / cascade CSS — chargé quand un fichier de `src/` est touché

> Sorti de `CLAUDE.md` le 2026-09-23 (chargement à la demande). Texte inchangé.

## Pièges Tailwind v4 / cascade CSS (gotchas)

Les pièges non-évidents rencontrés sur ce repo — à relire avant de toucher au styling ou à la cascade CSS.

> ℹ️ Certains pièges ci-dessous citent des fichiers CSS legacy (`animations-polish.css`, `components-modern.css`, `utilities.css`, `layouts.css`) **désormais supprimés** (vérifié 2026-07-25 ; `globals.css` n'importe plus que `design-tokens.css` et `modals.css`). Le **principe** de chaque piège reste valable ; la citation `fichier:ligne` est historique.

### ⚠️ Pièges connus à vérifier systématiquement

1. **Collisions de classes** : `utilities.css` et `layouts.css` définissaient `.border`, `.shadow-sm`, `.rounded-md`, etc. **sans @layer** → écrasaient Tailwind. Solution : `@import './X.css' layer(components);`

2. ⚠️ **PÉRIMÉ depuis le 2026-09-23 — ne plus appliquer.** Tailwind 4.2 génère `shadow-*` depuis `--shadow-*` avec la chaîne ring ; nos réécritures plates ont été retirées d'`index.css` (elles effaçaient les `ring-*`, voir n°6 bis). Texte d'origine conservé pour l'historique : **Tailwind v4 + custom shadows en @theme** : Les utilities `.shadow-X` Tailwind v4 utilisent `--tw-shadow` qui ne fonctionne PAS avec des custom shadows définies en `@theme`. Solution : ajouter dans `@layer utilities` des classes `.shadow-X { box-shadow: var(--shadow-X); }` ET `.hover:shadow-X:hover { box-shadow: var(--shadow-X); }` (déjà fait dans index.css).

3. **Tokens identiques entre @theme et design-tokens.css** : Une variable CSS définie aux deux endroits avec des valeurs différentes peut causer des bugs visuels subtils. Toujours vérifier `getComputedStyle()`.

   **⚠️ Cas particulier — noms DIFFÉRENTS mais même concept (divergence silencieuse)** : quand `@theme` et `design-tokens.css` nomment le même concept différemment (`--color-ink-*` vs `--tls-ink-*`, `--radius-2xl` vs `--r-2xl`), il n'y a PAS de collision de cascade → les deux coexistent avec des valeurs différentes, et selon qu'un composant est Tailwind (`bg-ink-900` → `#1a1a1a` neutre) ou legacy BEM (`var(--tls-ink-900)` → ancien `#252B37` teinté teal), l'app affiche **deux gris différents**. Idem `rounded-2xl` (24px) vs `var(--r-2xl)` (28px).
   **Résolution (2026-06-08, token-unification)** : `design-tokens.css` aliase désormais ces tokens sur `@theme` → **source de vérité unique = `index.css`** :
   ```css
   --tls-ink-900: var(--color-ink-900);  /* etc. ink-0…950 — sauf ink-25 (pas d'équivalent @theme) */
   --r-2xl:       var(--radius-2xl);
   ```
   Impact : ~164 usages `var(--tls-ink-*)` (surtout `components/documentation/*`) passent de teal-tinté à neutre. **Le Figma DS est synchronisé sur `index.css` (neutre)** — donc Figma ↔ Tailwind ↔ BEM rendent enfin les mêmes gris. **Règle générale** : ne JAMAIS redéfinir une valeur de couleur/radius dans `design-tokens.css` ; toujours `var(--color-*)` / `var(--radius-*)` depuis `@theme`. ⚠️ **CORRIGÉ le 2026-07-23 — l'affirmation précédente était FAUSSE.** Elle disait que pour les `--shadow-*` homonymes « `@theme` gagne déjà, pas d'action ». Vérifié au navigateur via `getComputedStyle(document.documentElement)` : c'est **`design-tokens.css` qui gagnait**, donc **11 tokens `--shadow-*` de `@theme` étaient lettre morte** (dont toute l'échelle neutre `xs/sm/md/lg`). Une modification dans `@theme` n'avait aucun effet visible. Résolu : les 11 doublons ont été supprimés de `design-tokens.css`, et les 4 neutres — dont les valeurs y étaient meilleures (`rgba(18,24,28,…)`, plus douces que les défauts Tailwind `rgba(0,0,0,0.1)`) — ont été promus dans `@theme`. **Une seule définition par token, dans `@theme`.** Ne jamais rétablir de définition `--shadow-*` dans `design-tokens.css`.

✅ **L'état « neuf tokens définis aux deux endroits » est résolu (revérifié le
2026-09-17).** L'intersection des noms entre `design-tokens.css` et le `@theme`
est **vide** — plus aucun doublon `--z-*`, `--ease-*`, `--font-*`, et la seconde
échelle de flou `--backdrop-blur-*` a été supprimée (0 définition, 0
consommateur). Le PRINCIPE du piège reste entier : ne jamais redéfinir dans
`design-tokens.css` un nom qui existe en `@theme` (c'est `design-tokens.css`,
non-layered à l'époque, qui gagnait), et re-vérifier l'intersection après toute
retouche de l'un des deux fichiers :
```bash
comm -12 <(grep -o '^\s*--[a-z0-9-]*:' src/styles/design-tokens.css | tr -d ' :' | sort) \
         <(grep -o '^\s*--[a-z0-9-]*:' src/index.css | tr -d ' :' | sort)
```

4. **CSS importés SANS `@layer` dans globals.css** : Tout fichier CSS importé sans `layer(...)` se retrouve dans la cascade NON-LAYERED, qui **gagne sur toutes les couches nommées** (utilities, components, base). Pendant la migration de Input.tsx, on a découvert que `animations-polish.css` était importé sans layer et ses `.transition-colors` / `.transition-all` / `.transition-shadow` / `.transition-transform` legacy écrasaient les versions Tailwind. Symptôme : transitions de couleur très lentes (~400 ms au lieu de 200 ms), focus border qui semble ne jamais s'activer en mesure synchrone. **Fix appliqué** : `@import './animations-polish.css' layer(components);` dans `globals.css`. **Action générale** : auditer tous les `@import` de `globals.css` et confirmer qu'ils ont `layer(...)` ou que leurs sélecteurs ne collisionnent pas avec Tailwind.

5. **Sélecteurs d'éléments globaux non-layered** (ex. `:focus-visible`, `input:focus`, `textarea:focus`) : Si un sélecteur global (sans classe) qui matche un `<input>` ou `<textarea>` est défini en dehors d'un `@layer`, il bat toutes les utilities Tailwind, même `focus:outline-none`. Découvert en migrant `Input.tsx` : `globals.css:179` avait `:focus-visible { outline: 2px solid ... }` non layered, qui ajoutait un outline au `<textarea>` interne malgré `outline-none` sur le wrapper. **Fix appliqué** : envelopper la règle dans `@layer base { :focus-visible { ... } }`. **Action générale** : tout sélecteur d'élément (input, textarea, button, a) avec pseudo-classe focus/hover doit être en `@layer base` ou `@layer components`. Vérifier aussi `components-modern.css:198` (`input:focus, textarea:focus, select:focus { box-shadow: inset ... }`) qui injecte un inset shadow ; on l'écrase au niveau Input.tsx via `focus:outline-none focus:shadow-none focus:bg-transparent` sur la classe du `<input>`/`<textarea>` interne (specificity Tailwind > specificity element).

6. **Border color split entre BASE et STATUS** : Si un composant a une `border-X-Y` dans la BASE (couleur par défaut) ET un override dans `STATUS_CLASSES` (couleur erreur/succès), Tailwind v4 émet les deux dans le même `@layer utilities` et la spécificité est identique (0,1,0). L'ordre dans la classe **n'importe pas** ; c'est l'ordre d'émission de Tailwind qui décide → souvent la couleur de base gagne. **Solution** : retirer la couleur de la BASE et la mettre dans `STATUS_CLASSES.default`, comme dans `Input.tsx`. Garder seulement `border` (largeur) dans BASE.

### ⚠️ Piège n°6 bis : nos `shadow-*` maison tuent silencieusement les `ring-*`

> ✅ **Résolu le 2026-09-23** : le bloc de `shadow-*` plats a été supprimé d'`index.css` ; Tailwind génère les mêmes ombres (134 relevés identiques sur 135 au navigateur) en nourrissant la chaîne ring. Le seul écart mesuré est l'anneau `ring-4` du Stepper, qui réapparaît. Le piège reste vrai pour toute utility `box-shadow` écrite à la main : ne pas en réintroduire.

Mesuré au navigateur le 2026-09-10, sur `TlsLogo` puis reproduit en sonde isolée :

```
ring-1 ring-primary-100                →  rgb(220,235,239) 0 0 0 1px    ✓ l'anneau est là
ring-1 ring-primary-100 shadow-card    →  l'anneau a disparu            ✗
```

**Pourquoi.** Tailwind v4 compose le ring dans une chaîne de variables :
```css
.ring-1      { box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow),
                           var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow); }
```
Nos utilities maison (`index.css`, `@layer utilities`) posent un `box-shadow` **plat** :
```css
.shadow-card { box-shadow: var(--shadow-card); }
```
Elles remplacent donc la chaîne entière. Les deux vivent dans `@layer utilities`, à
spécificité égale — et les nôtres sont émises **après** celles de Tailwind, donc elles
gagnent toujours. Aucune erreur, aucun avertissement : la bordure existe dans le
`className` et ne se peint jamais.

**Portée** : les ~20 utilities `.shadow-{xs,sm,md,lg,xl}`, `.shadow-card*`,
`.shadow-{brand,warm,sun}-*`. **13 fichiers** de `src/` combinent aujourd'hui un `ring-*`
avec l'une d'elles.

**Le correctif systémique** (une ligne par utility) est de nourrir la chaîne au lieu de
l'écraser :
```css
.shadow-card {
  box-shadow: var(--tw-inset-shadow, 0 0 #0000), var(--tw-inset-ring-shadow, 0 0 #0000),
              var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
              var(--shadow-card);
}
```

**En attendant** : ne pas combiner un `ring-*` et une `shadow-*` maison sur le même
élément. Utiliser `border` pour le filet, ou vérifier au navigateur avec
`getComputedStyle(el).boxShadow` — c'est le seul moyen de voir le problème.

### ⚠️ Piège n°6 ter : Tailwind v4 sérialise les couleurs à opacité modifiée en `oklab()`

Toute sonde de contraste écrite dans ce dépôt DOIT lire les couleurs via un canvas,
jamais par une expression régulière sur `rgba(...)`.

Mesuré le 2026-09-16 : `bg-white/90` renvoie
`oklab(0.999994 0.0000455678 0.0000200868 / 0.9)`. Une regex `rgba?\(([^)]+)\)`
en extrait `0.999994, 0.0000455678, 0.0000200868` et les traite comme du RVB —
elle calcule donc un contraste sur du noir quasi pur. Le faux résultat est
**plausible** (on avait lu « 2,96, échoue » sur un badge réellement à 6,26), donc
rien ne signale l'erreur.

```js
// ✅ on laisse le navigateur composer, on lit le pixel
const parse = (str) => {
  const cv = document.createElement('canvas'); cv.width = cv.height = 1;
  const x = cv.getContext('2d', { willReadFrequently: true });
  x.clearRect(0,0,1,1); x.fillStyle = str; x.fillRect(0,0,1,1);
  const d = x.getImageData(0,0,1,1).data;
  return { rgb: [d[0], d[1], d[2]], alpha: +(d[3]/255).toFixed(3) };
};
```

Corollaire : un fond translucide n'a de contraste qu'une fois **composé sur ce
qu'il recouvre**. Composer à la main (`α·premier + (1−α)·fond`) après avoir lu
les deux couches — sinon on mesure une transparence, c'est-à-dire rien.

### ⚠️ Piège n°6 quater : une sonde qui ne lit que `background-color` croit que les dégradés sont blancs

Mesuré le 2026-09-17, et il a fallu s'en apercevoir **avant** d'agir. La sonde de
contraste du cycle in situ remontait les ancêtres en lisant `backgroundColor`.
Or un hero peint par `background-image: linear-gradient(...)` a un
`backgroundColor` **transparent** : la sonde traversait, arrivait au blanc de la
page, et déclarait en échec des boutons parfaitement lisibles. Elle a signalé
« blanc sur blanc, 1,00 » sur un bouton posé sur un dégradé teal foncé.

Le faux positif est du même genre que le piège précédent : **plausible**. Une
passe de correction menée sur cette base aurait « réparé » des boutons sains.

Le correctif : à chaque ancêtre, lire aussi `backgroundImage`, et s'il contient
un `gradient(`, en extraire les **arrêts de couleur** et rendre l'intervalle
pire cas / meilleur cas plutôt qu'un seul nombre.

```js
const arretsDuDegrade = (bgImage) => {
  if (!bgImage || bgImage === 'none' || !/gradient\(/.test(bgImage)) return null;
  const couleurs = bgImage.match(/(?:rgba?|oklab|oklch|color|lab|lch)\([^)]*\)|#[0-9a-f]{3,8}/gi) || [];
  return couleurs.map(lire).filter(c => c && c.a > 0);   // `lire` = le canvas 1×1
};
```

Un dégradé est opaque : dès qu'on en rencontre un, on arrête de remonter.

⚠️ **Deuxième piège de mesure du même jour** : lire `getComputedStyle(el).boxShadow`
juste après `el.focus()` sur un élément qui porte `transition-[…box-shadow…]`
rend la valeur **interpolée**, pas la valeur cible. On croit l'anneau de focus
absent alors qu'il arrive 150 ms plus tard. Attendre la fin de la transition, ou
lire sur un élément déjà focalisé. *(L'anneau de `Button.tsx` a été soupçonné à
tort pour cette raison ; vérification faite, il se peint bien — la pseudo-classe
`:focus-visible` porte une spécificité de (0,2,0) qui bat nos `shadow-*` maison
à (0,1,0). Le piège n°6 bis reste vrai entre classes de même spécificité.)*

### ⚠️ Piège n°7 : `sr-only` sur un `<input>` ancré dans un label sans `position: relative`

`sr-only` applique `position: absolute`. Sans ancêtre positionné explicite, l'input absolute remonte jusqu'au premier parent `position: relative/absolute/fixed` — souvent `<body>` ou `#root`. Quand l'input reçoit le focus (par exemple via un clic sur le `<label>` qui le contient), le navigateur scrolle pour le rendre visible — et donc scrolle vers le coin haut-gauche de l'ancêtre lointain, **arrachant le viewport de plusieurs milliers de pixels** (~2000 px observé). L'utilisateur perçoit une "page blanche" alors que c'est juste un scroll involontaire vers une zone vide.

**Symptôme** : clic sur Checkbox / Radio / Switch → l'écran devient blanc, le DOM est intact, aucune erreur console.

**Fix** : ajouter `position: relative` (classe Tailwind `relative`) sur le `<label>` parent qui contient le `<input class="peer sr-only">`. L'input absolute est alors ancré au label, le focus scrolle vers le label = déjà visible.

```tsx
// ❌ MAUVAIS — focus scroll vers ancêtre lointain
<label className="inline-flex items-center gap-2 cursor-pointer">
  <input type="checkbox" className="peer sr-only" />
  ...
</label>

// ✅ BON — focus reste sur le label
<label className="relative inline-flex items-center gap-2 cursor-pointer">
  <input type="checkbox" className="peer sr-only" />
  ...
</label>
```

### ⚠️ Piège n°8 : sélecteur d'attribut global `[role="button"]`

`components-modern.css:75` définit `.btn, [role="button"] { display:inline-flex; height:40px; overflow:hidden; ... }`. Ce sélecteur d'attribut large matche **tout** élément avec `role="button"`, y compris les `<div role="button" tabIndex={0}>` utilisés pour l'a11y sur des wrappers cliquables (ex. `patterns/ParcoursCard`). Résultat : le wrapper devient un mini-bouton de 40px de haut avec son contenu clippé par `overflow:hidden`.

**Symptôme** : carte qui apparaît écrasée (~60px de haut) avec seulement la description visible en pill, titre/CTA invisibles.

**Fix** : neutraliser au niveau du wrapper avec des utilities Tailwind (qui battent `@layer components`) :
```tsx
<div role="button" tabIndex={0} className="block w-full h-auto p-0 overflow-visible cursor-pointer">
```

**Action générale** : tout `<div role="button">` ou wrapper a11y doit annuler ces propriétés. Idéalement, narrow le sélecteur BEM en cleanup post-migration.

> ✅ **Vérifié le 2026-09-23 : le contournement n'est plus nécessaire.** `components-modern.css` n'existe plus nulle part, `globals.css` n'importe que `design-tokens.css` et `modals.css`, et aucune feuille de `src/` ne pose de règle sur `[role="button"]` (la seule occurrence est un commentaire, `index.css:1308`). Les `h-auto` / `!h-auto !overflow-visible` encore présents (`Card.tsx`, `PromptCard.tsx`) sont inoffensifs mais morts ; les retirer n'est plus risqué.

**⚠️ Addendum — Card BASE** : La Card a initialement reçu `[&[role=button]]:h-auto [&[role=button]]:overflow-visible` dans son BASE pour contrer le BEM. **Ne pas ajouter `overflow-visible`** ici — cela override le `overflow-hidden` passé via `className` sur des wrappers comme ToneAwareCard, exposant des coins carrés non-clippés sur hover (`ParcoursCard`). Seul `[&[role=button]]:h-auto` est nécessaire dans BASE pour contrer `height:40px`. Si une Card descendante a besoin d'`overflow-hidden` pour clipper ses enfants à ses coins arrondis, elle le met dans son propre `className`.

**⚠️ Addendum 2 — Speech bubble (PromptCard, `JournalBubbleCard`)** : Le pattern Apple Messages ajoute un *tail* (queue) en bottom-right via `rounded-3xl rounded-br-[6px]`. Ce tail est **clippé** par le `overflow:hidden` global de `[role="button"]` ET par toute hauteur fixée à 40 px. Symptôme : la card chat-bubble apparaît rectangulaire sans tail (les pixels du coin tronqué sont coupés). **Fix** : forcer `!h-auto !overflow-visible` sur le wrapper chat-bubble. ⚠️ `JournalEntryCard`, que cet addendum citait, a été **supprimé le 2026-09-16** (0 consommateur produit) ; la bulle vivante est `JournalBubbleCard`. Le `!` est nécessaire car BEM `[role="button"]` est dans `@layer components` qui peut gagner sur `@layer utilities` selon ordre. ⚠️ **L'approche « borderless + drop-shadow silhouette » est abandonnée depuis le 2026-09-17** (elle contredisait S2 — plus d'ombre sur une carte — et donnait à `PromptCard` un rayon à part). La construction canonique de la bulle est celle de `JournalBubbleCard` : filet 1 px sur la bulle ET sur la queue (`border-r border-b` sur le carré tourné, coin `rounded-br-[6px]`) — la queue prolonge le filet proprement, sans arête interne visible : l'ancienne mise en garde « une border casserait l'illusion » était fausse, `JournalBubbleCard` le prouvait déjà.

### ⚠️ Piège n°9 : Tailwind v4 `translate` vs `transform` des keyframes

Tailwind v4 utilise la propriété CSS **séparée** `translate` (et `scale`, `rotate`) pour les utilities `-translate-x-1/2`, `scale-110`, etc. — pas le `transform` shorthand. Quand un keyframe d'animation set `transform: translate(-50%, -50%) scale(1)`, les deux propriétés s'**additionnent** au lieu de se remplacer → translation doublée, élément hors viewport.

**Symptôme découvert sur Modal** : pattern `top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2` + animation keyframe `transform: translate(-50%,-50%) scale(...)` → modal positionné à `left = 50% - 100% (de sa width)` au lieu de `50% - 50%`, donc complètement à gauche du viewport.

**Fix** : ne JAMAIS combiner Tailwind `translate-*` et keyframe `transform: translate(...)`. Préférer un des deux patterns :
- **Recommandé** : flex-center sur le parent scrim (`flex items-center justify-center`) + animation `scale-only` sur l'enfant
- Ou : utiliser arbitrary `[transform:translate(-50%,-50%)]` (force le shorthand)

```tsx
// ❌ MAUVAIS — translate stack avec keyframe transform
<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[modal-in_0.25s]" />

// ✅ BON — flex-center sur parent, scale-only animation
<div className="fixed inset-0 flex items-center justify-center">
  <div className="animate-[scale-in-flat_0.25s]" />
</div>
```

### ⚠️ Piège n°10 : `components-modern.css` impose `height: var(--input-height)` sur tous les `<textarea>` / `<select>`

`components-modern.css:178-190` définit une règle globale :
```css
input[type="text"], ..., textarea, select {
  width: 100%;
  padding: var(--input-padding);
  height: var(--input-height);  /* = 40px */
  ...
}
```

Avec `Tailwind p-3` (12px padding all sides), le content area = `40px - 24px = 16px`, ce qui tronque verticalement le texte (font-size 15px + line-height 24px). Symptômes : texte coupé en bas dans les select/textarea, placeholder à moitié visible.

**Fix** : sur tout `<textarea>` ou `<select>` Tailwind, override avec :
```tsx
<textarea className="... h-auto min-h-[120px]" rows={4} />
<select className="... h-auto min-h-[44px] py-2.5" />
```

`h-auto` annule le `height: 40px` et `min-h-[X]` garantit la hauteur minimale.

> ✅ **Vérifié le 2026-09-23 : le contournement n'est plus nécessaire.** `components-modern.css` n'existe plus, et plus aucune règle ne consomme `--input-height` : le token est encore défini (`design-tokens.css:386`) mais aucune feuille ni aucun composant ne le lit. `h-auto` reste utile seulement si on veut une hauteur libre ; `min-h-[X]` garde son sens.

**Note pour `<select>`** : utiliser aussi `appearance-none` + custom `<ChevronDown>` Lucide positionné `absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none` pour un visuel cohérent avec le reste du DS (la flèche native est toujours collée au bord).

### ⚠️ Piège n°12 : Double-spacing trap (composant + parent)

Si un composant applique son propre `mb-X` (margin-bottom) ET que son parent layout applique aussi `gap-X` (ou `space-y-X`) entre enfants, le spacing total est la **somme** des deux — pas le max. Symptôme : trous verticaux énormes entre sections, page allongée artificiellement, hiérarchie visuelle cassée.

**Découvert en refactorant `SectionHeader`** : le composant avait un `SIZE_MARGIN: { md: 'mb-4', lg: 'mb-6' }` baked-in. Quand le parent était `<section className="flex flex-col gap-stack">` (16 px), le total devenait 16 + 16 = 32 px pour size `md`, et 16 + 24 = 40 px pour size `lg`. Pas du tout l'intention.

**Règle** : **un composant ne devrait JAMAIS appliquer son propre `mb-*` / `mt-*` sur son wrapper externe.** C'est le parent layout qui possède le rythme vertical via `gap-*` (flex/grid) ou `space-y-*` (stack utility).

```tsx
// ❌ MAUVAIS — composant impose un margin-bottom
const SectionHeader = ({ size, ...rest }) => (
  <header className={`${SIZE_MARGIN[size]} flex items-center gap-3`}>...</header>
);

// Et côté parent :
<section className="flex flex-col gap-stack">
  <SectionHeader />     {/* 16 (parent gap) + 16 (header mb-4) = 32 px → trop grand */}
  <Content />
</section>

// ✅ BON — header neutre, parent contrôle le rythme
const SectionHeader = (...) => (
  <header className="flex items-center gap-3">...</header>  // pas de mb-*
);

<section className="flex flex-col gap-stack">  {/* 16 px point. final */}
  <SectionHeader />
  <Content />
</section>
```

**Action générale** : auditer tout composant exporté qui applique `mb-*` / `mt-*` sur son root → retirer et confier au parent. Exception : composants standalone qui assument leur propre layout (ex. `PageHeader` peut avoir un `mb-section` car il définit le top-of-page rhythm).

**⚠️ Corollaire (2026-09-09) — un `gap` seul ne sait pas donner le rythme d'un titre.**
Le piège ci-dessus est juste, mais il a une conséquence qu'on n'avait pas vue : un
`gap` est **symétrique**, donc il donne autant d'air au-dessus d'un titre qu'en
dessous. Or un titre appartient à ce qui le suit — la proximité demande 3 à 4 fois
plus d'espace au-dessus. Rapport mesuré avant correction : **1,0** sur 302 piles.

La règle vit désormais dans `@layer base` de `src/index.css` :
```css
h2, h3, h4 { margin-block-start: 0.75em; }
h2:first-child, h3:first-child, h4:first-child { margin-block-start: 0; }
```
Elle est battue par n'importe quel `mt-*` (couche utilities > couche base), donc
elle n'enferme rien ; elle bat le reset `* { margin: 0 }`, dont la spécificité est
nulle. `0.75em` est calibré sur mesure, pas au jugé : le rapport médian réel passe
à **3,3**, et la page gagne 33 px. À 1,75em il montait à 6,4, parce que la
gouttière dominante du repo est `gap-stack-xs` (8 px) et non `gap-stack`.

**❌ Ne jamais remettre `m-0` sur un titre.** C'est une utility, elle gagne donc
sur la règle et la neutralise. Ils étaient 362 sur 421 à le porter, et ils étaient
**déjà sans effet** — le reset universel met la marge à zéro de toute façon
(vérifié : un `h3` nu et un `h3` en `m-0` rendent le même `0px 0px 0px 0px`). Ils
ne faisaient que bloquer le système ; tous retirés le 2026-09-09.

### ⚠️ Piège n°13 : `border-none` dans BASE bloque les `border` des variants

Tailwind v4 `border-none` set **`border-style: none`** (pas seulement `border-width: 0`). Si BASE contient `border-none`, tous les variants qui ajoutent `border border-X-Y` se retrouvent avec `border-style: none` — la bordure existe dans le DOM (width=1px, color=X) mais n'est **pas rendue** car le style est `none`.

**Symptôme** : ghost, outline, glass-brand → `borderTopWidth: 1px` en JS mais visuellement invisible. `getComputedStyle(btn).borderTopStyle` retourne `"none"`.

**Pourquoi `border-0` ne règle pas le problème** : `border-0` set seulement `border-width: 0`. Dans le CSS généré par Tailwind, `.border-0` apparaît APRÈS `.border` → `border-0` gagne sur la valeur de width du variant.

**Fix** : **ne mettre aucun reset border dans BASE**. Tailwind Preflight (`@import "tailwindcss"`) déjà reset tous les éléments à `border-width: 0; border-style: solid`. Les variants avec `border border-X-Y` fonctionnent donc directement : width passe à 1px, style reste `solid`, color = X. Les variants sans `border` gardent width=0 → pas de bordure.

```tsx
// ❌ MAUVAIS — border-none écrase border-style:solid du Preflight
const BASE = '... border-none ...';
// variant ghost: 'border border-primary-100 ...' → border-style:none → invisible !

// ✅ BON — pas de reset border dans BASE
const BASE = '... transition-all ...';  // Preflight gère le défaut à 0/solid
// variant ghost: 'border border-primary-100 ...' → 1px solid primary-100 ✅
```

**Action générale** : ne jamais ajouter `border-none` ou `border-0` dans la BASE d'un composant qui a des variants avec `border`. Vérifier avec `getComputedStyle(el).borderTopStyle === 'solid'` après migration.

### ⚠️ Piège n°14 : `h-screen` (100vh) sur un conteneur sticky → contenu tronqué sur mobile

`h-screen` = `height: 100vh`. Sur mobile Safari et Chrome Android, `100vh` compte la zone **derrière la barre d'URL rétractable** : le viewport réellement visible est plus court. Un `sticky top-0 h-screen` mesure donc plus haut que ce que l'utilisateur voit — le bas du contenu épinglé est coupé, et la hauteur change pendant le scroll quand la barre se rétracte, ce qui fait vibrer l'élément.

**Fix** : utiliser l'unité **dynamic viewport height** `dvh`, qui suit la barre d'URL.

```tsx
// ❌ MAUVAIS — tronque sur mobile, jitter au scroll
<div className="sticky top-0 h-screen overflow-hidden">

// ✅ BON — suit le viewport visible réel
<div className="sticky top-0 h-[100dvh] overflow-hidden">

// ✅ BON aussi quand le contenu peut dépasser
<div className="sticky top-0 min-h-[100dvh] flex items-center">
```

**Découvert** lors de l'audit sticky du 2026-07-22 : 4 surfaces marketing utilisaient `h-screen`, 3 utilisaient déjà `min-h-[100dvh]` — incohérence pure, le bon pattern existait déjà dans le repo. *(Les composants alors corrigés ont été supprimés depuis, avec le nettoyage motion du 2026-07-28 ; le principe reste.)*

✅ **Plus aucun `h-screen` dans `src/`** (vérifié 2026-07-28). Le dernier vivait dans `marketing/sections/HeroSection.tsx`, un fichier qu'aucune page n'importait — le dossier entier a été supprimé.

**Action générale** : sur tout conteneur plein-écran — sticky, hero, overlay, modal fullscreen — préférer `dvh` à `vh`. `h-screen` reste acceptable pour du desktop-only explicitement gardé par un breakpoint `lg:`.

### ⚠️ Piège n°15 : un `tracking-*` dans la `BASE` d'un composant à tailles multiples

Le tracking est **proportionnel à la taille** (`em`), mais son effet ne l'est pas :
serrer aide un grand titre et abîme un petit label. Posé dans une constante `BASE`,
il s'applique donc à toutes les tailles avec le même signe, alors qu'il devrait
suivre une courbe inverse.

**Constaté sur `Button.tsx` (corrigé le 2026-09-09)** : `tracking-tight` vivait dans
`BASE` et touchait les quatre tailles, dont `sm` à 13 px — la plus employée, 227 des
522 boutons. Cumulé à la graisse, le label devenait dense et pénible à lire sans
qu'on sache pourquoi.

**Règle** : si un serrage est nécessaire, le porter dans `SIZE_CLASSES` sur les
grandes tailles seulement. **Jamais dans `BASE`.**

⚠️ Et préférer `tracking-headline` à `tracking-tight` : même valeur (`-0,025em`),
mais le premier est un token TLS qui dit son emploi, le second est le défaut Tailwind.

### ⚠️ Piège n°16 : une règle de BASE qui pose `color` sur un élément casse l'héritage

`@layer base { h1 { color: var(--text) } }` s'applique à l'élément lui-même, donc
il **bat** la couleur héritée du parent — `utilities` ne gagne que si la classe
est posée sur l'élément. Un `<section className="bg-primary-800 text-white">`
contenant un `<h2>` sans classe de couleur rendait ce h2 en ink-900 sur teal
foncé. Constaté le 2026-09-23 : 5 titres (pages légales du site, newsletter), une
bulle de message à 2,83:1, et le corps de toutes les `Alert` qui rendait en ink-900
au lieu de la couleur de l'alerte.

**Règle** : dans `@layer base`, seul `body` pose une couleur ; tout élément
typographique (`h1`…`h4`, `p`) fait `color: inherit`. Et pour le vérifier, sonder
les éléments dont la couleur calculée diffère de celle du parent sans classe
`text-*` propre — c'est la signature exacte du défaut.

Même famille, côté composant : une classe de la `BASE` d'un composant (`flex-col`
et `gap-*` de `Card`) peut battre celle que la page passe en `className`. `Card`
les retire quand la page déclare les siennes (`OWN_PADDING`, `OWN_DISPLAY`,
`OWN_DIRECTION`, `OWN_GAP`). ⚠️ Ces tests ne lisent que les classes sans préfixe :
un `md:flex` ne compte pas comme disposition — écrire `md:flex-row`, qui bat le
`flex-col` de base au point de rupture — reprendre ce motif pour toute propriété qu'une page doit
pouvoir surcharger.

### ⚠️ Piège n°17 : `hidden sm:inline-flex` ne masque rien sur un composant qui pose son propre `display`

Pour cacher un élément sur mobile, le réflexe est `hidden sm:inline-flex`. Sur
une balise nue, ça marche. Passé en `className` à un **composant** qui pose
lui-même `inline-flex` (ou `flex`, `grid`…) dans sa base, ça ne marche pas :
`hidden` et `inline-flex` sont deux utilities de même spécificité (0,1,0) sur la
même propriété, donc c'est l'ordre d'émission de Tailwind qui tranche (piège
n°6), et la classe du composant gagne. L'élément reste visible sous `sm`.

**Constaté le 2026-09-24**, au navigateur, à 375 px — trois cas, tous visibles
alors qu'ils devaient être masqués :
- `/api-docs` : la `MetaPill` d'authentification de chaque endpoint ;
- `/messages` : la `MetaPill` de contexte de l'en-tête de fil, qui coupait le
  nom de l'interlocuteur (« Sophie … ») ;
- `/enterprise` : la `ProgressBar` de chaque membre (229 px), qui écrasait le nom.

**Fix** : `max-sm:hidden` (ou `max-md:hidden`…), et plus de `sm:inline-flex`.
Une variante est émise APRÈS les utilities de base, donc elle bat le `display`
du composant sous le point de rupture ; au-dessus, le composant garde le sien.

```tsx
// ❌ MAUVAIS — `hidden` perd contre l'`inline-flex` de MetaPill
<MetaPill text="Bearer" className="hidden sm:inline-flex" />

// ✅ BON
<MetaPill text="Bearer" className="max-sm:hidden" />
```

Le motif inverse (`sm:hidden` sur un composant) fonctionne, pour la même raison.
Pour chercher les cas restants : un composant (balise en majuscule) dont le
`className` contient `hidden` nu. Il n'y en a plus aucun dans `src/`.

### ⚠️ Règle : pas de SVG inline custom — utiliser Lucide

`lucide-react` est notre librairie d'icônes par défaut. **Ne jamais hardcoder un `<svg>` inline** dans un composant si Lucide propose l'équivalent.

**Pourquoi** :
- Cohérence visuelle (stroke width, line-cap, sizing)
- Pas de risques de viewBox mal dimensionné qui clippe les pixels (cas découvert sur SessionFeedbackModal stars : viewBox 0-52 mais path jusqu'à Y=55.5 → bas du star clippé, drop-shadow rendu sur la forme tronquée)
- Bundle déjà importé partout — coût zéro
- Tailwind utilities native pour styling (`fill-accent-400 text-accent-400 stroke-2`)

**Pattern** :
```tsx
// ❌ MAUVAIS — SVG inline custom
<svg viewBox="0 0 52 52" fill="none">
  <path d="M26 4L33.5 19.2..." fill={filled ? '#F8B044' : 'none'} stroke="..."/>
</svg>

// ✅ BON — Lucide + Tailwind classes
import { Star } from 'lucide-react';
<Star size={40} strokeWidth={1.75} className={filled ? 'fill-accent-400 text-accent-400' : 'fill-transparent text-ink-300'} />
```

**Exception** : SVG décoratifs purement custom (logos, illustrations one-off, formes complexes). Toute icône fonctionnelle (close, chevron, check, star, heart, alert, etc.) = Lucide.

### ⚠️ Une taille d'icône se prend dans l'échelle, et le glyphe remplit sa boîte

`--icon-size-{2xs,xs,sm,md,lg,xl,2xl,3xl,4xl}` = **14 · 16 · 18 · 20 · 24 · 28 ·
32 · 40 · 48** px — ⚠️ **neuf crans, pas cinq** : cette ligne n'en listait que cinq
(16·18·20·24·28) et laissait croire que le plancher était à 16. Corrigé le
2026-09-14 sur `src/index.css:622`. Utilities `.icon-*` correspondantes.
⚠️ **Le plancher de l'échelle est 14, et `StatusBadge` passe en dessous** — ses
icônes sont à 10 et 12 px, en `size={n}` brut. Ce n'est pas de la triche : une
icône de 14 dans une pastille de 18 px n'a que 2 px d'air. C'est l'échelle qui ne
descend pas assez bas. À trancher si le motif se répète, pas à corriger au cas
par cas. Chaque cran est apparié à un pas de l'échelle de texte
dans un rapport d'environ 1,25 : `xs` avec `caption`, `sm` avec `body-sm`, `md`
avec `body`, `lg` avec `body-lg`.

**État au 2026-09-09** : 2 066 tailles posées à la main, dont 1 037 hors
échelle sur 27 valeurs — la plus fréquente était 14 px (357 usages), hors
échelle À L'ÉPOQUE. **Recompté le 2026-09-17 : il en reste 12** (détecteur
`check-handmade.mjs`) — l'ajout du cran `2xs` (14 px) le 14/09 et les passes
d'alignement ont résorbé l'essentiel. Ne pas en rajouter.

**Le piège de la boîte.** Dimensionner le conteneur ne suffit pas : si la boîte
est plus étroite que le glyphe, `flex-shrink` mord sur la largeur et pas sur la
hauteur, et un cercle devient un ovale. C'est ce que faisait `Button` — 2,35 px
d'écrasement sur la taille `sm`. Il faut que le SVG se plie à la boîte :

```tsx
// ✅ le glyphe suit la boîte, donc carré à toutes les tailles
<span className="inline-flex items-center justify-center shrink-0 icon-sm [&>svg]:w-full [&>svg]:h-full">
  {icon}
</span>
```

### Pattern : contrôles custom (checkbox / radio / switch) avec `peer` + `after:`

Pour les composants où l'`<input>` natif est masqué et un span stylé prend sa place (Input.tsx Checkbox/Radio/Switch), utiliser le pattern **`peer` + pseudo-élément `::after`** au lieu de keyframes ou state JS :

```tsx
<label className="inline-flex items-center gap-2 cursor-pointer">
  <input type="checkbox" className="peer sr-only" {...rest}/>
  <span aria-hidden className="
    inline-flex w-5 h-5 border-2 border-ink-300 rounded-sm
    peer-checked:bg-primary-500 peer-checked:border-primary-500
    peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-primary-500
    peer-disabled:bg-ink-50 peer-disabled:cursor-not-allowed
    after:content-['✓'] after:text-white after:font-bold after:text-[12px] after:opacity-0
    peer-checked:after:opacity-100
  "/>
</label>
```

Règles :
- L'input doit être **frère immédiat** du span stylisé (sinon `peer` ne s'applique pas).
- `sr-only` masque visuellement sans casser l'accessibilité.
- `content-['✓']` ou `content-['']` est autorisé (chaîne littérale, pas `var()`).
- Pour un Switch : préférer un `<span>` réel comme thumb avec `translate-x-N` plutôt qu'un `::after` avec `left:Npx` — Tailwind n'anime pas les valeurs `left` arbitraires.

---
