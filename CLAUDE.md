# CLAUDE.md — The Learning Society : Règles du projet

## Projet

**The Learning Society** — Plateforme EdTech.
Stack : React 19 · TypeScript 6 · Vite 8 · **Tailwind CSS 4** · React Router 7 · Zustand 5 · Lucide React

---

## Architecture

```
src/
├── components/
│   ├── core/        Button, Card, Input, Select, FormGroup
│   ├── ui/          Badge (incl. StatusBadge+TrendingBadge), Alert, Avatar, Modal, Toast, StatCard… (51 composants)
│   ├── patterns/    DashboardHero, ParcoursCard, CardGrid, SectionHeader, PageHeader…
│   ├── learning/    LessonCard, ArticleCard, SessionCard…
│   ├── modals/      BookingModal, SuccessModal, VideoPlayerModal…
│   └── layout/      Sidebar, NavItem
├── pages/           57 pages (route-level)
├── styles/          design-tokens.css (source vérité), tls-components.css (CSS BEM actuel)
└── design-system/   spec.json (spécification officielle)
```

## Familles de composants — Décisions de rationalisation (2026-05-09)

### Badges — Badge.tsx est le fichier canonique
`Badge` contient maintenant 3 exports publics :
- `Badge` — text status badge (variant: brand/neutral/warm/sun/success/danger/info)
- `StatusBadge` — lesson state indicator avec icône (locked/available/in-progress/completed/failed)
- `TrendingBadge` — gradient promo badge animé (trending/popular/recommended/featured/new)

`StatusBadge.tsx` et `TrendingBadge.tsx` sont des thin re-exports depuis `Badge.tsx` (rétrocompat).
**Ne jamais créer de nouveaux fichiers badge séparés** — étendre `Badge.tsx` à la place.

### Breadcrumb — ui/Breadcrumb.tsx est le fichier canonique
`Breadcrumb` supporte `variant: 'simple' | 'nav'` :
- `simple` (défaut) : `<a>` links, séparateur texte custom, sticky optionnel
- `nav` : `<button>` interactifs, ChevronRight, ellipsis collapse (`maxVisible`), `onNavigate` callback, `current` prop, `icon` sur items

`BreadcrumbNav.tsx` = thin re-export `export { Breadcrumb as BreadcrumbNav }`.
**Utiliser `<Breadcrumb variant="nav">` pour les nouveaux usages.**

### Famille Pills — 5 composants distincts (garder séparés)
| Composant | Usage |
|-----------|-------|
| `Pill` | glass/surface chip — hero overlays, compteurs. `children: ReactNode`, pas de tone. |
| `MetaPill` | metadata chip — cards. `text: string`, `tone: semantic`. Clickable optionnel. |
| `MetaPillGroup` | layout wrapper pour tableaux de MetaPills. |
| `Tag` | removable filter chip avec X button. |
| `FilterChip` | toggle interactif avec active state gradient. |

**Ne pas fusionner** — APIs fondamentalement différentes (ReactNode vs string, glass vs tones).

---

## Stratégie de styling — Migration Tailwind (en cours)

### Objectif final
Remplacer 100% des classes CSS BEM (`.btn`, `.card`, etc.) et des inline styles `style={{}}` par des **classes Tailwind mappées** depuis `src/index.css` (configuration CSS-first Tailwind v4).

### Configuration Tailwind v4 — CSS-first

Tailwind v4 utilise une approche **CSS-first** où les tokens sont définis directement dans `src/index.css` (et non dans un fichier JS).

**Fichier clé : `src/index.css`**
```css
@import "tailwindcss";

@source "../**/*.{js,ts,jsx,tsx,html}";

@theme {
  --color-primary-50: #E8F4F7;
  --color-primary-100: #DCEBEF;
  /* ... 50-900 ... */
  --color-primary-600: #4A8FA1;
  --color-primary-700: #3D7786;
  /* ... */
  
  --color-secondary-500: #ED843A;
  /* ... */
  
  --radius-pill: 999px;
  --radius-2xl: 24px;
  
  --font-display: 'League Spartan', 'Helvetica Neue', Arial, sans-serif;
  --font-body: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  
  --text-h1: 2.25rem;
  --text-body: 1rem;
  --text-caption: 0.8125rem;
}
```

**Règle critique pour `src/styles/globals.css`** : Tous les sélecteurs d'éléments doivent être dans `@layer base` sinon les inline reset (`* { margin: 0; }`) bloqueront les utilities Tailwind :

```css
@layer base {
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html { font-size: 16px; }
  body { font-family: var(--font-body); }
  a { color: inherit; text-decoration: none; }
}
```

### Règles absolues

**1. Jamais de valeurs arbitraires avec `var()`**
```tsx
// INTERDIT — fragile, JIT ne valide pas, équivalent manquera
className="bg-[var(--tls-primary-50)]"
className="text-[length:var(--t-caption)]"
className="font-[family-name:var(--font-display)]"

// OBLIGATOIRE — tokens mappés dans index.css @theme
className="bg-primary-50"
className="text-caption"
className="font-display"
```

**2. Jamais d'inline styles `style={{}}` pour layout/couleur/spacing**
```tsx
// INTERDIT
style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--tls-primary-600)' }}

// OBLIGATOIRE
className="flex flex-col gap-4 text-primary-600"
```

**3. Styles dynamiques → className conditionnels (jamais style={{}})**
```tsx
// INTERDIT
style={{ background: tone === 'primary' ? '#55A1B4' : '#ED843A' }}

// OBLIGATOIRE
className={tone === 'primary' ? 'bg-primary-500' : 'bg-secondary-500'}
```

**4. `style={{}}` autorisé UNIQUEMENT pour**
- Valeurs calculées au runtime impossible à prédire (`width: ${percent}%`)
- Gradients complexes sans équivalent Tailwind documenté
- Transformations dynamiques (`transform: translateY(${offset}px)`)

**5. Fichiers CSS autorisés UNIQUEMENT pour**
- `@keyframes` et animations complexes
- Pseudo-éléments `::before`, `::after`, `::placeholder`
- Sélecteurs complexes non disponibles en Tailwind

---

## Référence Tailwind → Design Tokens

### Couleurs
| Token | Classe Tailwind | Hex |
|---|---|---|
| primary-50 | `bg-primary-50` / `text-primary-50` | #E8F4F7 |
| primary-100 | `bg-primary-100` / `text-primary-100` | #DCEBEF |
| primary-200 | `bg-primary-200` / `text-primary-200` | #B9D7DF |
| primary-300 | `bg-primary-300` / `text-primary-300` | #96C3CF |
| primary-400 | `bg-primary-400` / `text-primary-400` | #73AFBF |
| primary-500 | `bg-primary-500` / `text-primary-500` | #55A1B4 |
| primary-600 | `bg-primary-600` / `text-primary-600` | #4A8FA1 |
| primary-700 | `bg-primary-700` / `text-primary-700` | #3D7786 |
| primary-800 | `bg-primary-800` / `text-primary-800` | #2F5F6A |
| primary-900 | `bg-primary-900` / `text-primary-900` | #1F3E45 |
| secondary-50 | `bg-secondary-50` / `text-secondary-50` | #FFF3EB |
| secondary-500 | `bg-secondary-500` / `text-secondary-500` | #ED843A |
| secondary-600 | `bg-secondary-600` / `text-secondary-600` | #C06920 |
| accent-50 | `bg-accent-50` / `text-accent-50` | #FFF9EE |
| accent-500 | `bg-accent-500` / `text-accent-500` | #DF9E3D |
| ink-50 | `bg-ink-50` / `text-ink-50` | #f9fafb |
| ink-100 | `bg-ink-100` / `text-ink-100` | #f3f4f6 |
| ink-900 | `bg-ink-900` / `text-ink-900` | #1a1a1a |

(Liste complète dans `src/index.css` @theme — 50 couleurs)

### Typographie
| CSS Variable | Classe Tailwind |
|---|---|
| --text-h1 | `text-h1` |
| --text-h2 | `text-h2` |
| --text-h3 | `text-h3` |
| --text-h4 | `text-h4` |
| --text-body | `text-body` |
| --text-body-lg | `text-body-lg` |
| --text-body-sm | `text-body-sm` |
| --text-caption | `text-caption` |
| --text-micro | `text-micro` |
| --font-display | `font-display` |
| --font-body | `font-body` |
| --font-mono | `font-mono` |

### Espaces & Rayons
| Token | Classe Tailwind |
|---|---|
| --radius-xs | `rounded-xs` (4px) |
| --radius-sm | `rounded-sm` (6px) |
| --radius-md | `rounded-md` (10px) |
| --radius-lg | `rounded-lg` (14px) |
| --radius-xl | `rounded-xl` (20px) |
| --radius-2xl | `rounded-2xl` (24px) |
| --radius-pill | `rounded-pill` (999px) ⚠️ **NOT `rounded-full`** |

### Ombres
| Token | Classe Tailwind |
|---|---|
| --shadow-xs | `shadow-xs` |
| --shadow-sm | `shadow-sm` |
| --shadow-md | `shadow-md` |
| --shadow-lg | `shadow-lg` |

Fichier de référence complet : `src/index.css` (@theme block)

---

## Pattern de migration — Composants avec variants

**Approche validée pour composants avec variants/sizes (Button, Card, Input, etc.)**

Au lieu de construire des strings de classes, utiliser des **maps TypeScript** :

```tsx
// ✅ PATTERN CORRECT (Button.tsx validé)
const BASE = 'inline-flex items-center justify-center gap-2 rounded-pill font-body font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:opacity-disabled disabled:cursor-not-allowed';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-primary-600 text-white shadow-sm hover:bg-primary-700 active:bg-primary-800',
  warm: 'bg-secondary-500 text-white shadow-sm hover:bg-secondary-600 active:bg-secondary-700',
  secondary: 'bg-neutral-100 text-ink-900 border border-neutral-200 shadow-xs hover:bg-neutral-200 hover:border-primary-300',
  ghost: 'bg-transparent text-ink-900 hover:bg-neutral-100',
  'brand-ghost': 'bg-primary-50 text-primary-800 hover:bg-primary-100',
  destructive: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
  glass: 'bg-white/20 text-white border border-white/30 backdrop-blur-sm hover:bg-white/30',
  link: 'bg-transparent text-primary-700 underline underline-offset-4 hover:text-primary-800 p-0 h-auto',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-8 px-3.5 text-caption',
  md: 'h-10 px-5 text-body-sm',
  lg: 'h-12 px-6 text-body',
  xl: 'h-14 px-7 text-body-lg',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  iconOnly = false,
  leadingIcon,
  trailingIcon,
  loading = false,
  fullWidth = false,
  className = '',
  children,
  ...rest
}) => {
  const classes = [
    BASE,
    VARIANT_CLASSES[variant],
    !iconOnly && SIZE_CLASSES[size],
    iconOnly && `w-10 ${size === 'sm' ? 'w-8' : size === 'lg' ? 'w-12' : size === 'xl' ? 'w-14' : 'w-10'} aspect-square`,
    fullWidth && 'w-full',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} {...rest}>
      {leadingIcon && <span className="inline-flex items-center justify-center shrink-0" style={{ width: '1em', height: '1em', fontSize: '1.05em', lineHeight: 0 }}>{leadingIcon}</span>}
      {!iconOnly && children}
      {trailingIcon && <span className="inline-flex items-center justify-center shrink-0" style={{ width: '1em', height: '1em', fontSize: '1.05em', lineHeight: 0 }}>{trailingIcon}</span>}
    </button>
  );
};
```

**Clés du pattern :**
1. **BASE** = tous les styles communs (padding, font, transitions, focus, disabled)
2. **VARIANT_CLASSES** = map variant → classes Tailwind complètes pour ce variant
3. **SIZE_CLASSES** = map size → hauteur + padding + taille de font
4. Assembler en array, filter(Boolean), join(' ')
5. ✅ Les valeurs d'icon spacing restent en `style={{}}` si calcul (1em, lineHeight: 0)

**Avantages :**
- Chaque variant/size est isolé et facile à modifier
- Les classes Tailwind sont vérifiées au build par `npm run dev` (Tailwind compile seulement ce qui existe dans le code)
- Pas d'arbitraire, pas de calcul dynamique

---

## Stratégie d'ordre — bottom-up

**Règle absolue depuis Phase 2.6 :** migrer les **primitives partagées AVANT les composites parents**.

**Pourquoi :** un composite migré qui consomme un enfant encore BEM reste **visuellement cassé** (ex. ParcoursCard avec progress bar BEM clippée, malgré son shell Tailwind correct). Migrer top-down force à revisiter chaque parent quand on finit un enfant — perte de temps + risque de regressions silencieuses.

**Ordre :**
1. **Atomes** (Badge, Pill, Avatar, ProgressBar, Alert, Skeleton) — autonomes, testables isolément
2. **Composites** (cards spécialisées, modales) — héritent automatiquement des atomes Tailwind
3. **Pages** — assemblent le tout

**Exception** : un atome utilisé par UN SEUL composite peut être migré dans le même commit que son parent. Mais dès qu'il y a 2+ consommateurs → migrer l'atome séparément en premier.

**Dépendance check** : avant de migrer un composant, exécuter :
```bash
grep -rn "import.*<NomDuComposant>" src/ --include="*.tsx" | wc -l
# Si > 1 et que le composant n'est pas migré → c'est lui qu'il faut migrer en premier.
```

---

## Workflow de migration — obligatoire

Pour chaque composant ou page, **toutes ces étapes sont OBLIGATOIRES** dans cet ordre. **Pas de commit avant la validation utilisateur sur les 4 checkpoints.**

```
ÉTAPE 1 — ANALYSE
  1.1 Lire le fichier source (.tsx)
  1.2 Lire le CSS BEM correspondant (dans tls-components.css, utilities.css, layouts.css)
  1.3 Identifier tous les inline styles style={{}} et classes CSS BEM
  1.4 Identifier les COLLISIONS potentielles entre classes Tailwind et CSS BEM
      → grep -rn "^\.border\b\|^\.shadow-\|^\.rounded-\|^\.text-\|^\.bg-" src/styles/*.css
      → Toute classe BEM qui porte le MÊME NOM qu'une utility Tailwind doit être
        wrappée dans @layer components dans globals.css

ÉTAPE 2 — IMPLÉMENTATION
  2.1 Créer les maps VARIANT_CLASSES, SIZE_CLASSES, TONE_*_CLASSES selon pattern Button
  2.2 Remplacer les références au BEM par les maps
  2.3 npx tsc --noEmit → 0 erreurs TypeScript

ÉTAPE 3 — AUDIT TAILWIND (à fournir à l'utilisateur)
  3.1 Produire un TABLEAU MARKDOWN qui prouve que le composant est 100% Tailwind :

  | Critère | Statut | Détails |
  |---------|--------|---------|
  | Pas d'inline styles `style={{}}` | ✅/❌ | (count) |
  | Pas de classes BEM `.x--*` | ✅/❌ | (count) |
  | Tokens Tailwind mappés | ✅/❌ | bg-primary-X, text-ink-X, etc. |
  | Pas de `bg-[var(...)]` arbitraire | ✅/❌ | (count) |
  | Pattern variant maps | ✅/❌ | VARIANT_CLASSES, SIZE_CLASSES |
  | Hover/Active/Focus states | ✅/❌ | hover:, active:, focus-visible: |
  | Classes statiques (pas de string concat) | ✅/❌ | |
  | rounded-pill (pas rounded-full) | ✅/❌ | (si applicable) |

  3.2 Si UN seul ❌ → corriger AVANT de passer à l'étape 4

ÉTAPE 4 — VÉRIFICATION CASCADE CSS (ANTI-OVERRIDE BEM)
  4.1 Vérifier qu'aucun fichier CSS legacy n'override les classes Tailwind utilisées :

  ```js
  // Test à exécuter via preview_eval (script type=module)
  const card = document.querySelector('[data-test-target]'); // ou élément du composant
  const matchingRules = [];
  for (const sheet of document.styleSheets) {
    for (const rule of sheet.cssRules || []) {
      const sel = rule.selectorText;
      if (sel && card.matches(sel) && (rule.style?.borderColor || rule.style?.boxShadow)) {
        matchingRules.push({ selector: sel, ...rule.style });
      }
    }
  }
  // Si matchingRules contient des règles CSS BEM (`.border`, `.shadow-sm` non-Tailwind)
  // → wrapper le fichier source dans @layer components
  ```

  4.2 Confirmer que `getComputedStyle()` retourne les valeurs Tailwind attendues
      (ex. ink-200 = rgb(229, 231, 235), pas la valeur de var(--border))

ÉTAPE 5 — VALIDATION UTILISATEUR (4 CHECKPOINTS OBLIGATOIRES)
  Présenter à l'utilisateur les 4 questions suivantes EN UNE SEULE FOIS :

  ☐ CHECKPOINT 1 — Affichage de base
    "Vérifie que le composant s'affiche correctement sur /components.
     URL : http://localhost:5173/components → section [Nom du composant]
     Tous les variants/sizes sont-ils visibles ?"

  ☐ CHECKPOINT 2 — Cascade CSS propre
    "Voici l'audit des règles CSS qui s'appliquent au composant :
     [matchingRules trouvées]
     Confirmes-tu qu'aucune règle CSS BEM n'override Tailwind ?"

  ☐ CHECKPOINT 3 — Hover/Active/Focus interactifs
    "Survole chaque variant avec ta souris et confirme :
     - Le curseur change si applicable (cursor-pointer)
     - Les bordures/ombres/couleurs changent au hover
     - L'effet active/focus fonctionne (clic, tab)
     Tous les états interactifs sont-ils visibles ?"

  ☐ CHECKPOINT 4 — Audit Tailwind
    "Voici le tableau d'audit prouvant que le composant est 100% Tailwind :
     [tableau de l'étape 3.1]
     Approuves-tu ce tableau ?"

ÉTAPE 6 — COMMIT (UNIQUEMENT après 4 ✅)
  6.1 Format : `refactor: migrate [ComponentName] to Tailwind`
  6.2 Ne JAMAIS commit avant les 4 checkpoints validés
  6.3 Ne JAMAIS passer au composant suivant sans validation

ÉTAPE 7 — MISE À JOUR DOCUMENTAIRE (à la fin de CHAQUE phase, obligatoire)
  7.1 MIGRATION-PLAN.md → cocher la case ✅ + mettre à jour "Progrès global"
  7.2 CLAUDE.md → ajouter tout nouveau pattern, piège, ou règle découvert
      pendant cette phase (ex. nouvelle collision CSS, nouveau workaround Tailwind v4)
  7.3 Si nouveau composant Core/UI ajouté : mettre à jour la section "Architecture"
  7.4 Si nouveau token ajouté à index.css : mettre à jour la table "Référence Tailwind → Design Tokens"
  7.5 Commit séparé pour la doc si plus de 2 fichiers de doc modifiés :
      `docs: update CLAUDE.md/MIGRATION-PLAN.md after [Phase X] validation`
```

### ⚠️ Pièges connus à vérifier systématiquement

1. **Collisions de classes** : `utilities.css` et `layouts.css` définissaient `.border`, `.shadow-sm`, `.rounded-md`, etc. **sans @layer** → écrasaient Tailwind. Solution : `@import './X.css' layer(components);`

2. **Tailwind v4 + custom shadows en @theme** : Les utilities `.shadow-X` Tailwind v4 utilisent `--tw-shadow` qui ne fonctionne PAS avec des custom shadows définies en `@theme`. Solution : ajouter dans `@layer utilities` des classes `.shadow-X { box-shadow: var(--shadow-X); }` ET `.hover:shadow-X:hover { box-shadow: var(--shadow-X); }` (déjà fait dans index.css).

3. **Tokens identiques entre @theme et design-tokens.css** : Une variable CSS définie aux deux endroits avec des valeurs différentes peut causer des bugs visuels subtils. Toujours vérifier `getComputedStyle()`.

4. **CSS importés SANS `@layer` dans globals.css** : Tout fichier CSS importé sans `layer(...)` se retrouve dans la cascade NON-LAYERED, qui **gagne sur toutes les couches nommées** (utilities, components, base). Pendant la migration de Input.tsx, on a découvert que `animations-polish.css` était importé sans layer et ses `.transition-colors` / `.transition-all` / `.transition-shadow` / `.transition-transform` legacy écrasaient les versions Tailwind. Symptôme : transitions de couleur très lentes (~400 ms au lieu de 200 ms), focus border qui semble ne jamais s'activer en mesure synchrone. **Fix appliqué** : `@import './animations-polish.css' layer(components);` dans `globals.css`. **Action générale** : auditer tous les `@import` de `globals.css` et confirmer qu'ils ont `layer(...)` ou que leurs sélecteurs ne collisionnent pas avec Tailwind.

5. **Sélecteurs d'éléments globaux non-layered** (ex. `:focus-visible`, `input:focus`, `textarea:focus`) : Si un sélecteur global (sans classe) qui matche un `<input>` ou `<textarea>` est défini en dehors d'un `@layer`, il bat toutes les utilities Tailwind, même `focus:outline-none`. Découvert en migrant `Input.tsx` : `globals.css:179` avait `:focus-visible { outline: 2px solid ... }` non layered, qui ajoutait un outline au `<textarea>` interne malgré `outline-none` sur le wrapper. **Fix appliqué** : envelopper la règle dans `@layer base { :focus-visible { ... } }`. **Action générale** : tout sélecteur d'élément (input, textarea, button, a) avec pseudo-classe focus/hover doit être en `@layer base` ou `@layer components`. Vérifier aussi `components-modern.css:198` (`input:focus, textarea:focus, select:focus { box-shadow: inset ... }`) qui injecte un inset shadow ; on l'écrase au niveau Input.tsx via `focus:outline-none focus:shadow-none focus:bg-transparent` sur la classe du `<input>`/`<textarea>` interne (specificity Tailwind > specificity element).

6. **Border color split entre BASE et STATUS** : Si un composant a une `border-X-Y` dans la BASE (couleur par défaut) ET un override dans `STATUS_CLASSES` (couleur erreur/succès), Tailwind v4 émet les deux dans le même `@layer utilities` et la spécificité est identique (0,1,0). L'ordre dans la classe **n'importe pas** ; c'est l'ordre d'émission de Tailwind qui décide → souvent la couleur de base gagne. **Solution** : retirer la couleur de la BASE et la mettre dans `STATUS_CLASSES.default`, comme dans `Input.tsx`. Garder seulement `border` (largeur) dans BASE.

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

**Note pour `<select>`** : utiliser aussi `appearance-none` + custom `<ChevronDown>` Lucide positionné `absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none` pour un visuel cohérent avec le reste du DS (la flèche native est toujours collée au bord).

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

## Points d'attention lors de la migration

### ⚠️ Radius : `rounded-pill` vs `rounded-full`
- **`rounded-full`** = `border-radius: 50%` — crée un cercle, non-idéal pour les boutons larges
- **`rounded-pill`** = `border-radius: 999px` (défini dans index.css) — capsule shape, bon pour tous les largeurs
- **Action** : Toujours utiliser `rounded-pill` pour les Button, pas `rounded-full`

### ⚠️ Hover/Active/Focus states
Tailwind génère les pseudo-classes : utiliser `hover:`, `active:`, `focus-visible:` directement dans la classe string :
```tsx
// ✅ BON
className="bg-primary-600 hover:bg-primary-700 active:bg-primary-800 focus-visible:outline-2"

// ❌ MAUVAIS
style={{ background: isHover ? primaryHover : primaryBase }}
```

### ⚠️ Toujours tester `npm run dev` après migration
Tailwind v4 compile en fonction des classes trouvées dans le code via `@source`. Si une classe n'apparaît pas dans un fichier `.tsx`, elle ne sera pas compilée :
```
npm run dev
→ navigateur F12 → DevTools → Computed styles sur le composant
→ vérifier que les classes Tailwind existent dans le CSS généré
```

Si une classe est manquante : elle n'a probablement pas été écrite dans le code (typo, ou utilisée dynamiquement via string concat).

### ⚠️ GlobalsCss — TOUJOURS @layer base
```css
// ❌ MAUVAIS — réset non-layered override les utilities
* { margin: 0; padding: 0; }
body { font-family: var(--font-body); }

// ✅ BON — reset dans @layer base
@layer base {
  * { margin: 0; padding: 0; }
  body { font-family: var(--font-body); }
}
```

---

## Règles de commit

- Format : `refactor: migrate [ComponentName] to Tailwind`
- Un commit par composant/page
- Jamais de commit sans validation visuelle
- Message de commit peut inclure : `Closes #[MIGRATION-PLAN task number]` si applicable

---

## Ce qu'il NE FAUT PAS faire

**Fichiers & structure**
- Ne PAS supprimer `tls-components.css` avant que tous ses composants soient migrés et validés
- Ne PAS créer de nouveaux fichiers CSS pour des composants — tous les tokens doivent venir de index.css @theme
- Ne PAS modifier `tailwind.config.js` (Tailwind v4 CSS-first ignore le JS config)

**Tokens & classes**
- Ne PAS utiliser `bg-[var(...)]` ou `text-[length:var(...)]` — jamais d'arbitraire avec var()
- Ne PAS utiliser `rounded-full` pour les Button/Card (utiliser `rounded-pill`)
- Ne PAS hardcoder des couleurs hex (#55A1B4) — toujours utiliser les tokens Tailwind (`bg-primary-500`)
- Ne PAS utiliser `!important` — la cascade @layer est correcte si globals.css est dans @layer base

**Styles inline**
- Ne PAS utiliser `style={{}}` pour layout/couleur/spacing — utiliser `className` Tailwind
- Ne PAS utiliser `style={{}}` pour les variants (jamais `style={{ background: isHovered ? ... : ... }}`)

**Processus**
- Ne PAS travailler sur plusieurs composants en même temps
- Ne PAS passer au composant suivant sans avoir reçu la validation visuelle de l'utilisateur
- Ne PAS committer sans les **4 checkpoints validés** (affichage, cascade CSS, hover, audit Tailwind)
- Ne PAS skipper l'étape 4 (vérification cascade CSS) — c'est la cause #1 des bugs hover/border/shadow
- Ne PAS présenter un composant comme "migré" sans le **tableau d'audit Tailwind** complet à l'utilisateur

**Tailwind compilation**
- Ne PAS oublier `@source` directive dans index.css — sans elle, Tailwind ne cherche pas les classes à compiler
- Ne PAS créer dynamiquement des classe strings (ex. `${size}px` → toujours liste prédéfinie via maps)
- Ne PAS importer un fichier CSS legacy SANS `@layer components` s'il définit des classes au même nom que Tailwind (`.border`, `.shadow-X`, `.rounded-X`, `.text-X`, etc.)
- Ne PAS supposer que les hover Tailwind v4 fonctionnent out-of-the-box avec custom `@theme shadows` — il faut les classes manuelles dans `@layer utilities` (voir index.css)
