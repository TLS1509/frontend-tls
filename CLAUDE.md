# CLAUDE.md — The Learning Society : Règles du projet

## Projet

**The Learning Society** — Plateforme EdTech.

---

## Familles de composants — Décisions de rationalisation (2026-05-09)

### Badges — Badge.tsx est le fichier canonique
`Badge` contient **2 exports publics** (corrigé le 2026-09-16 : cette section en listait 3) :
- `Badge` — text status badge (variant: brand/neutral/warm/sun/success/danger/info)
- `StatusBadge` — lesson state indicator avec icône (locked/available/in-progress/completed/failed)

`TrendingBadge` a été **supprimé le 2026-09-10** (0 usage produit). `StatusBadge.tsx` reste un thin re-export depuis `Badge.tsx` (rétrocompat).
**Ne jamais créer de nouveaux fichiers badge séparés** — étendre `Badge.tsx` à la place.

### Breadcrumb — ui/Breadcrumb.tsx est le fichier canonique
`Breadcrumb` supporte `variant: 'simple' | 'nav'` :
- `simple` (défaut) : `<a>` links, séparateur texte custom, sticky optionnel
- `nav` : `<button>` interactifs, ChevronRight, ellipsis collapse (`maxVisible`), `onNavigate` callback, `current` prop, `icon` sur items

`BreadcrumbNav.tsx` = thin re-export `export { Breadcrumb as BreadcrumbNav }`.
**Utiliser `<Breadcrumb variant="nav">` pour les nouveaux usages.**

### Famille Pills — wrappers sur Chip primitive (Phase 19.A · 2026-05-26, révisée le 2026-09-10)
Depuis Phase 19.A, les 4 chips consomment **`ui/Chip.tsx`** (primitive interne) qui owne les style tokens partagés : `CHIP_BASE`, `CHIP_SIZE`, `CHIP_TONE_SOLID`, `CHIP_TONE_SOLID_ACTIVE`, `CHIP_TONE_HOVER`, `CHIP_SURFACE_MAP`, `CHIP_INTERACTIVE`. Helper `resolveChipClasses({size, tone, surface, interactive, hover})` retourne la chaîne complète.

**Wrappers publics conservés** (APIs spécialisées, pas de fusion) — `Pill` et `Tag` ne figurent plus dans cette table, supprimés le 2026-09-10 :

| Composant | Usage |
|-----------|-------|
| `MetaPill` | metadata chip — cards. `text: string`, `tone: semantic`. Clickable optionnel → rend un **vrai `<button>`** (Phase 19.A fix : avant c'était `role="button"` span, anti-pattern WCAG). |
| `MetaPillGroup` | layout wrapper pour tableaux de MetaPills. |
| `FilterChip` | toggle interactif avec active state gradient. |

⚠️ **Révisé le 2026-09-10 — la famille est passée de 9 à 6.** L'ancien « ne pas
fusionner, APIs fondamentalement différentes » avait été écrit en supposant que
les neuf enveloppes servaient. Mesuré hors vitrine : `TrendingBadge` **0 usage
produit** (ses 11 occurrences vivaient dans la page qui l'exposait), `Pill` **0**,
`Tag` **0** — les `<Tag>` qu'on croyait siens étaient l'icône Lucide du même nom.
Les trois sont supprimés.

`StatusBadge` reste malgré son unique consommateur : il n'est pas un doublon de
`Badge` mais encode les cinq états d'une leçon avec leur icône. C'est du
vocabulaire de domaine, dont l'app aura besoin quand le corpus arrivera —
le retirer échangerait un concept contre des lignes.

⚠️ **Taille par défaut de `MetaPill` et `MetaPillGroup` : `sm`, pas `md`** (décidé
le 2026-09-14). Mesuré au navigateur : au cran `md`, la pastille faisait 30 px de
haut et 13 px de police, contre 19,75 px et 11 px pour un `Badge` — **la donnée
qui chuchote était une fois et demie plus haute que l'état qui crie**, hiérarchie
inversée sur toutes les cartes. Et 47 des 55 appels prenaient ce défaut ; sur la
vitrine, les 27 pastilles rendues étaient toutes à 13/30, pas une au petit cran.
`sm` donne 11 px pour 24 px de haut : même corps que `Badge`, au-dessus du
minimum WCAG 2.2 AA (24×24), et **sous le seuil des 28 px** où le rayon commence
à compter. ⚠️ `MetaPillGroup` porte SON propre défaut et le passe à chaque
pastille : changer celui de `MetaPill` seul ne descend pas — les cartes passent
par le groupe.

**La famille aujourd'hui** : `Badge` (l'état, 291) · `FilterChip` (le filtre, 76)
· `MetaPill` + `MetaPillGroup` (la donnée) · `Chip` (primitive interne) ·
`StatusBadge` (les états de leçon).

**Deux registres, et il faut les distinguer d'un coup d'œil** : `Badge` crie —
capitales, graisse 700, `tracking-label`, bordure — pour dire un **état** ;
`MetaPill` chuchote — casse normale, graisse 500 — pour dire une **donnée**.
Les confondre, c'est ce qui rend une carte illisible : on ne sait plus ce qui est
un fait et ce qui est un statut.

⚠️ Les tailles de `Badge` s'appellent `compact` / `normal` / `large`, pas
`sm`/`md`/`lg` : `Chip` porte ces derniers pour des hauteurs différentes (Badge
normal = 20 px, Chip md = 30), et l'écart se lisait comme un défaut alors qu'il
est voulu.

### Patterns éditoriaux & layout (introduits 2026-05-09 → 2026-05-10)

| Composant | Usage canonique |
|-----------|-----------------|
| `patterns/EditorialHero.tsx` → exports **`PageHero`** (canonical) + `EditorialHero` (alias) | Hero universel page-opening. `tone: default \| brand \| warm \| sun`. **`brand`** (gradient saturé primary-500→700, texte blanc) = Dashboard, Journal. Autre tons = auth/éditoriales/detail. **Consommé par 101+ pages.** Phase 19.B-2026-05-26 : renommé `EditorialHero` → `PageHero` (nom universel). `EditorialHero` reste un alias rétrocompat + nom canonical pour surfaces réellement éditoriales (Magazine, Veille, Articles). Nouveaux usages → `PageHero`. |
| `patterns/AuthShell` | Layout split-screen pour pages auth. Sous-composants : `AuthDivider`, `AuthSocialButton`, `AuthSuccess`, + champs glass-dark (`AuthField`, `AuthPasswordField`, `AuthCheckbox`) + boutons (`AuthPrimaryButton`, `AuthGhostButton`). Consommé par Login, Signup, ForgotPassword, ResetPassword, MagicLink, VerifyEmail. ⚠️ **`AuthFeature` est toujours dans `AuthShell.tsx`**, marqué `@deprecated` et sans aucun consommateur (vérifié 2026-07-28 ; CLAUDE.md l'annonçait supprimé à tort). Ne pas l'utiliser — passer des `<div>` dans la prop `aside`. |
| `patterns/EditorialLayout` | 2-col main + sticky aside, stack mobile-first. Pour pages MagazineArticle, ArticleDetail, Newsletter, WeeklyNewsDetail, Project, etc. (7 pages). |
| `patterns/SectionCard` | Card sectionnée — title + description + footer actions. Pour blocs autonomes dans pages éditoriales. (8 pages) |
| `patterns/RelatedItemList` | Liste verticale d'items reliés / cross-links. (5 pages) |
| `patterns/ResumeLessonCard` | Hero card "Reprendre ta leçon" Dashboard. Glass tone-aware (warm/primary/sun) avec eyebrow "Étape X sur Y", titre h1, meta pills (level/duration/lessons), progress bar + CTA pill. |

## TlsLogo — système à 6 variants

`ui/TlsLogo.tsx` expose le logo mark SVG avec palette swap par `variant` prop. Couvre tous les contextes de surface :

| variant | Surface cible | Fills |
|---------|--------------|-------|
| `color` (défaut) | Blanc / clair | Multicolor branded (primary-500 / secondary-600 / accent-400) |
| `light` | Dark / glass teal (AuthShell, dark heroes) | All-white rgba |
| `primary` | Surface teal tintée (primary-50/100) | Monochrome teal (**primary-600**) |
| `warm` | Surface warm/secondary | Amber-white (secondary-500) |
| `sun` | Surface sun/accent | Golden (accent-400) |
| `ink` | Impression / monochrome / haute contraste | Dark ink-900 |

**Supports de marque hors app** (decks, docs, emails, logos sources, doctrine visuelle) :
[`brand/README.md`](brand/README.md) → [`brand/BRAND-KIT.md`](brand/BRAND-KIT.md), la fiche
unique. Elle recopie les valeurs de `src/index.css` (qui reste la vérité) et liste, section 7,
les endroits où Canva / Notion / Figma / Drive ont divergé.

**Règle** : toujours passer `variant="light"` sur fond dark/glass (AuthShell = `withBubble={false} variant="light"`). Ne jamais hardcoder `fill="#..."` dans le SVG — étendre la map `PALETTES` dans `TlsLogo.tsx`.

⚠️ **`primary` est sur primary-600, pas primary-500** (corrigé le 2026-09-09 ; cette table disait 500). L'app est sur `#4A8FA1` depuis `0b538ff`, et la mesure lui donne raison : sur `primary-50`, la surface même de ce variant, 600 donne 3,26:1 contre 2,62:1 pour 500. C'était Figma **et** cette table qui avaient dérivé — Figma a été réaligné.

**La pastille centrale est toujours à la couleur du corps**, en aplat comme en dégradé. Sinon le logo change d'identité en franchissant le seuil `material` (28 px) : point pâle en dessous, centre continu au-dessus.

---

## Auth components — dark glass vs light fields (dualité)

Pour les pages avec **fond saturé glass-dark** (Login/Signup/ForgotPassword/ResetPassword via AuthShell), utiliser la famille `Auth*`. Pour les pages standard (fond clair, surface white), utiliser les composants core/UI.

| Use case | Light mode (pages standard) | Dark glass mode (auth pages) |
|---|---|---|
| Field avec label + icon | `<FormGroup><Input leadingIcon /></FormGroup>` | `<AuthField label icon />` |
| Password input | `<Input type="password" />` (no toggle yet) | `<AuthPasswordField />` (eye toggle built-in) |
| Checkbox | `<Checkbox />` (from core/Input.tsx) | `<AuthCheckbox />` |
| Primary CTA | `<Button>` (variants light) | `<AuthPrimaryButton>` (white-on-dark inverse) |
| Ghost / secondary CTA | `<Button variant="ghost">` | `<AuthGhostButton>` (white-border on dark) |
| Divider | `<Divider label="ou" />` | `<AuthDivider>` (white/20 lines) |
| Social provider button | n/a | `<AuthSocialButton icon={<AuthGoogleIcon />}>` |
| Inline footer link | `<a>` | `<AuthInlineLink>` |
| Success state | `<EmptyState variant="success">` | `<AuthSuccess>` |

→ Les composants Auth* sont **strictly limited** aux pages d'authentification (surface glass-dark). N'utilise pas Auth* ailleurs dans l'app. Inversement, n'utilise pas Input/Button light dans AuthShell.

### SectionHeader — système 5 × 4 × 5 (variants × sizes × tones)

`patterns/SectionHeader` est désormais le composant canonique pour tout en-tête de section (`title + subtitle + icon + action + divider`). Il expose :

**Layout fix critique :** wrapper en CSS grid `grid-cols-[auto_minmax(0,1fr)] items-start` → centre vertical de la bubble icône aligné sur le **centre de la première ligne** du titre ; subtitle en row 2 col-start-2 (sous le titre, pas sous l'icône).

**`compact?: boolean` deprecated** → mappé vers `size="sm"`.

**No more `mb-X` on wrapper** — le SectionHeader ne contrôle PLUS son spacing vertical. Le parent layout possède le spacing via `gap-stack`/`gap-section`/etc. Voir Piège #12.

---

## Styling Tailwind — règles

Tout est **100 % Tailwind** (config CSS-first : tokens dans `src/index.css` @theme, pas de `tailwind.config.js`). La migration BEM → Tailwind est **terminée**.

⚠️ **`src/styles/globals.css`** : tout sélecteur d'élément (`*`, `html`, `body`, `a`, `:focus-visible`, `input:focus`…) DOIT être dans `@layer base` — sinon le reset (`* { margin: 0 }`) bat les utilities Tailwind. Tout `@import` de CSS legacy doit passer par `layer(components)`.

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

> **Valeurs vs usage — deux questions, deux endroits.**
> - *Quelle valeur ?* → cette section, et surtout `src/index.css` (bloc `@theme`),
>   qui fait foi. Un hex recopié ici peut avoir dérivé ; en cas de doute, c'est le
>   code qui tranche.
> - *Quand l'utiliser ?* → [`docs/_canon/REGLES-USAGE-COMPOSANTS.md`](docs/_canon/REGLES-USAGE-COMPOSANTS.md) :
>   Modal ou Toast, la sémantique des 4 variantes d'Alert, le choix de pagination
>   selon le contexte, et les contrats a11y de Button et Input.
>
> ⚠️ **Le contraste de `primary-600` (#4A8FA1) sur blanc est de 3.66:1 — il échoue
> AA** pour du texte normal. `spec.json` annonçait 4.52:1 : c'était faux, recalculé
> le 2026-07-23. Pour du texte blanc sur fond teal, utiliser `primary-700` (5.02:1)
> ou `primary-800` (7.08:1).

> **Valeurs → `src/index.css` (@theme), source de vérité.** Les tables hex/px/rem qui vivaient ici ont été retirées : elles dupliquaient le code et avaient **déjà dérivé** (ex. `ink-900` recopié `#1a1a1a` alors que le code = `#252B37` ; ombres neutres avec mauvaises valeurs ; blur mal nommé). Ne jamais recopier de valeur de token ici — pointer le code.

### Couleurs sémantiques — doctrine (non dérivable du code)
- Palette **muted/coral** alignée TLS : **NE JAMAIS** utiliser le green Tailwind brut (`#22C55E`) ni le red brut (`#EF4444`).
- **Bouton destructive** : `bg-danger-strong` au repos · `active:bg-danger-deep` — **jamais `bg-red-600`**.
- Overlays diffus (lesson cards, error/completion borders) : tokens legacy `--tls-*-light` / `-light-bg` / `-border` dans `design-tokens.css` (dérivés des bases sémantiques).

### Typographie · tracking · rayons · ombres

> **Doctrine détaillée → [`.claude/rules/doctrine-design.md`](.claude/rules/doctrine-design.md)** (chargée dès qu'un fichier de `src/` est touché) : tracking gradué, règle du SEUIL des rayons (R3/R4) et échelle étagée, famille bulle, ombres neutres vs tone.

## Spacing sémantique & utility tokens

Valeurs → `src/index.css` (@theme). Familles : `--spacing-*` (tight · stack-xs · stack · stack-lg · section · section-lg · page), `--opacity-*`, `--z-*`, `--duration-*`, `--ease-*`, `--container-*`, `--blur-*`.

**Règle** : préférer un token sémantique nommé (`gap-stack`, `gap-section`) à un `gap-4/6/8` générique — il exprime l'intention.

✅ **Le cran `stack-md` (20 px) a fini sa migration le 2026-09-17.** Il était
entré dans l'échelle la veille, mais 139 utilitaires au pas de 5 le valaient
encore en numérique — dont les 67 `px-5` écartés à l'époque, 26 `mb-5` et
16 `p-5`. Tous portent le token. Rendu strictement identique ; ce qui change,
c'est qu'il n'y a plus qu'un endroit où modifier le cran.

⚠️ **Piège Tailwind v4** : `ease-*` et `duration-*` ne sont **pas** auto-générés depuis `@theme` — ils requièrent des `.ease-*` / `.duration-*` en `@layer utilities` (déjà dans `index.css`), exactement comme les `shadow-*` custom.


---

## Créer un composant à variantes (pattern maps)

Pour tout composant à `variant`/`size`/`tone` (Button, Card, Input…) : **maps TypeScript de classes complètes**, jamais de concaténation de strings.


**Clés** : classes **statiques** (Tailwind ne compile que le littéral — jamais `${x}`), un token par entrée, assembler via `filter(Boolean).join(' ')`. Réf. `Button.tsx`.

## Pièges Tailwind v4 / cascade CSS (gotchas)

> **→ [`.claude/rules/pieges-tailwind.md`](.claude/rules/pieges-tailwind.md)** (chargé dès qu'un fichier de `src/` est touché) : pièges n°1 à 15 (layers, `shadow-*` qui tuent les `ring-*`, couleurs en `oklab()`, sondes de dégradé, `sr-only`, `[role="button"]`, `translate` vs keyframes, double-spacing, `border-none`, `h-screen`, tracking en BASE), Lucide obligatoire, échelle d'icônes, contrôles `peer`.

## Tone narratif (convention app-wide)

Tone cohérent par nature d'écran : **primary** (focus / leadership) · **warm** (action / parcours) · **sun** (réflexion / achievements) · **neutral** (settings / utility). Max 2 tones par flow (1 dominant + 1 accent).

---

## Les garde-fous — à lancer avant et après une décision de design

```bash
node scripts/check-handmade.mjs        # ce qui se comporte comme un composant sans en être un
node scripts/check-token-coverage.mjs  # parité @theme ↔ vitrine, dans les deux sens
node scripts/check-showcase-coverage.mjs  # tout composant exporté est-il classé ?
# Au rendu — serveur de dev lancé, Chromium du cache Playwright (playwright-core) :
npm run check:contrast                 # tout texte passe-t-il AA sur son fond RÉEL ?
npm run check:radius                   # rayon intérieur = extérieur − retrait ?
npm run check:typo                     # tailles, graisses, familles rendues vs l'échelle ; niveaux de titre
npm run check:rythme                   # espace au-dessus d'un titre ≥ 1,5 × en dessous ; gaps réels
npm run capture -- --out <dossier>     # captures pleine page, 1440 et 375, pour la critique
```

⚠️ **Les trois derniers lisent le serveur de `BASE_URL` (défaut `localhost:5173`).**
Si une autre session (worktree) tient déjà ce port, ils mesurent SON code, pas le
vôtre — constaté le 2026-09-23 : 258 « échecs » qui venaient d'un worktree. Passer
`BASE_URL=http://localhost:<port>` quand le serveur a pris un autre port. Nés le
2026-09-23 : ce jour-là, la sonde de contraste lancée à la main a trouvé un
stepper à 1,93:1, des h1 sombres sur teal et un titre blanc sur blanc que rien
dans le code ne laissait voir.

**Pourquoi le premier existe.** Une décision de design ne descend que dans les
composants. Le 09/09, le rayon des cartes est passé à 14 px dans `Card.tsx` et
**82 cartes faites main sont restées à 20 ou 24** — deux rayons de carte ont
coexisté sans que personne le voie. Le 10/09, le filet des boutons doux a été
fermé au cran 600 et les CTA faits main ne l'ont jamais su. Chaque élément fait
main est une décision future qui n'arrivera pas.

Il détecte **par signature, pas par nom** : non pas « ce qui s'appelle carte »
mais « ce qui a un rayon, une surface et un padding ». Six familles — bouton,
carte, badge d'état, ligne de méta, pastille d'icône, champ — plus les valeurs
écrites en dur là où un token existe.

⚠️ **Un chiffre n'est pas un défaut.** Beaucoup de ces éléments sont légitimes :
sur 110 cartes faites main mesurées le 10/09, **deux seulement** étaient
l'équivalent exact d'une `<Card>` — les autres portaient un dégradé, du verre ou
un ratio que le composant ne couvre pas. Le détecteur dit *où regarder* ; c'est
un humain qui décide entre migrer l'élément et étendre le composant.

`--fichiers` détaille par fichier, `--famille <nom>` isole une famille.

⚠️ **Le détecteur résout les constantes de classes du fichier** (depuis le
2026-09-14) — et il faut savoir pourquoi, parce que c'est le piège qui se
reproduira. Le piège n°6 impose de sortir le rayon d'une liste de classes dans
une constante ; six composants le font. Or le détecteur lisait le **nom** de la
constante, pas sa valeur : **appliquer la bonne pratique rendait l'élément
invisible**. Constaté en direct — les trois boutons de la famille Auth ont
disparu de la famille « bouton » à l'instant où leur rayon est sorti dans
`RAYON_BOUTON`, et le total n'a pas bougé, ce qui rendait l'angle mort
indétectable à la lecture des chiffres. Après correctif : bouton 11 → **14**,
pastille d'icône 179 → **181**. Seuls les littéraux de chaîne simples sont
résolus ; une concaténation reste opaque, mieux vaut ne pas résoudre que
résoudre faux.

📌 Les 3 boutons Auth désormais comptés **ne sont pas un défaut** : ce sont des
composants exportés, et CLAUDE.md pose la famille `Auth*` comme la primitive de
la surface glass-dark. Mais ils posent une vraie question, laissée ouverte :
`Button` porte une prop `onDark` depuis longtemps — que fait `AuthPrimaryButton`
que `<Button onDark>` ne ferait pas ?

---

## Hygiène documentaire — règles anti-dérive (OBLIGATOIRE)

Suite au nettoyage du 2026-06-30 (sessions d'agents ayant déversé ~20 docs en vrac + écrit des audits fabriqués) :

1. **Aucun nouveau doc à la racine du repo.** Seuls `CLAUDE.md`, `PRODUCT.md` et `DESIGN.md` y vivent. *(`DESIGN-IMPECCABLE.md` a été archivé le 2026-09-09 : 934 lignes que rien ne chargeait — ses décisions vivantes sont dans `DESIGN.md` §10 et §11.)* En tâche design, seuls `PRODUCT.md` et `DESIGN.md` sont injectés ; `CLAUDE.md` est chargé comme instructions projet. Tout le reste va dans `docs/<sous-dossier>` :
   - `docs/_canon/` — **docs canoniques, priment sur tout le reste** · `docs/_audits/` — audits qualité · `docs/figma/` — audits/sync Figma · `docs/charts/` — data-viz · `docs/briefs/` — briefs · `docs/CDC/` — cahiers (source de vérité, ne pas modifier sans accord métier) · `docs/_archive/` — historique.
2. **Mettre à jour `docs/INDEX.md`** à chaque ajout/déplacement/suppression de doc. L'index est la carte ; un doc absent de l'index = doc fantôme.
3. **Un rapport d'audit Figma DOIT citer les node IDs réellement inspectés** (via `use_figma`). Sans trace d'inspection node-par-node → marquer le doc `⚠️ FIABILITÉ NON VÉRIFIÉE` en tête. Ne jamais écrire « conformance X% » ou « gap corrigé » sans avoir ouvert le fichier Figma.
4. **Les % de conformance / claims d'état sont interdits sans vérification de première main.** Un agent délégué qui « audite » sans inspecter produit de la fiction — préférer « non vérifié » à un chiffre inventé.
5. **Worktrees & copies** : `.claude/worktrees/` est gitignored — ne jamais `git add -f` dedans. Pas de dossiers « X 2 » (artefacts de copie Finder).

---

## Build & commit

Gate de fin = **`npm run build`** (voir gotcha ci-dessous). Un commit par changement cohérent, message descriptif.

### ⚠️ Le gate TypeScript est `npm run build`, PAS `npx tsc --noEmit` (révisé 2026-07-22)

```bash
npm run build
```

**Pourquoi ce changement.** Le workflow imposait historiquement `npx tsc --noEmit → 0 erreurs`. Ce garde-fou est **plus faible que le build réel** :

| Commande | Ce qu'elle vérifie |
|---|---|
| `npx tsc --noEmit` | le tsconfig racine seul |
| `npm run build` (= `tsc -b && vite build`) | **tous les projets référencés** (`tsc -b` suit les project references) puis le bundle Vite |

Conséquence constatée le 2026-07-22 : `npx tsc --noEmit` renvoyait **0 erreur** pendant que `npm run build` en trouvait **62**, réparties sur 31 fichiers (pages learning-app + composants charts). La dette s'est accumulée en silence parce que le gate documenté ne la voyait pas.

**Règle** : ne jamais annoncer « 0 erreur TypeScript » sur la foi de `npx tsc --noEmit` seul. Le seul état vert qui compte est `npm run build` qui termine sans erreur. `npx tsc --noEmit` reste utile comme vérification rapide en cours de travail, jamais comme critère de fin.

---

## À ne pas faire (rappel)

Les interdits sont couverts par les Règles absolues + les Pièges ci-dessus. Un seul mérite d'être répété :

- **Ne jamais recréer `tailwind.config.js`** — supprimé le 2026-07-23. Tailwind v4 est CSS-first (source = `@theme` de `src/index.css`, aucune directive `@config`). Un fichier JS ne serait jamais lu par le build mais serait lu par les humains — c'est ainsi qu'il avait accumulé 27 valeurs fantômes.

## État de l'app — Zustand (couche vivante)

L'app est une SPA réactive : les données du domaine vivent dans des stores Zustand **persistés en `localStorage`** (`src/stores/persistence.ts`) — c'est ce qui fait que l'état **survit au reload en local** (indispensable pour tester). Stores : `useCoachingStore`, `useUserProfileStore`, `useEnterpriseStore`, `usePrivacyStore`, etc.

**Brancher une page au store :**
- **Seed-on-first-access** : `getX(userId)` seed depuis `MOCK_*` au premier appel si vide, puis sert le store. Les pages n'importent **jamais** `MOCK_*` directement.
- **Live binding (pas de snapshot)** : appeler `store.getX()` **dans le render body**, pas dans `useState`/`useEffect` — le composant se re-render quand le store change.
- **Route param = clé de sélection** : `sessions.find(s => s.coachId === coachId) ?? sessions[0]`, pas une identité locale.
- **Écritures** : `store.patch()/updateX()/addX()` → persiste tout seul (middleware `persist`).
- **Domaine vs UI** : données métier → store (persisté) ; état purement UI (modal, tab, brouillon non soumis) → `useState` local.

**Pièges** : tout store applicatif DOIT avoir `persist(...)` (sinon perte au reload) ; API cohérente (`getX`/`updateX`/`addX`/`patch`) ; pas de `store.get()` dans un listener sans `useCallback` (stale closure).

## Conventions UI transverses

**Composants d'en-tête** : `PageHero` = hero universel d'ouverture de page (alias `EditorialHero` pour surfaces éditoriales : Magazine/Veille/Articles) · `PageHeader` = header utilitaire (Settings/Billing/Privacy) · `SectionHeader` = titre de section intra-page (h2/h3) · `ViewerHeader` = overlay lesson player.

**Accessibilité** (⚠️ corrigé 2026-07-23 : l'ancien « 44px = WCAG AA » était un amalgame) :
- Seuils réels : **WCAG 2.2 AA (SC 2.5.8) = 24×24 px** (seul minimum normatif) ; AAA / Apple HIG = 44×44. **Règle TLS** : 44 px sur les actions principales, 24 px minimum partout.
- Hauteurs Button mesurées : `sm` 32px · `md` 44px (`h-touch`) · `lg` 48px · `xl` **52px**. `sm` passe AA mais rate 44 → contextes denses seulement (sa cible tactile est portée à 44 px par un pseudo-élément qui déborde de 6 px).
- **Focus visible** obligatoire sur tout élément focusable custom. Le canon est l'anneau bicolore de `Button.tsx` — blanc à l'intérieur, ink-900 à l'extérieur : aucune couleur unique ne passe le 3:1 sur tous les fonds de l'app.
  ⚠️ **Arbitrage n°1 du 2026-09-23 : le contour `primary-500` reste le défaut hors `Button`**, en connaissance de cause. Il mesure 2,94:1 sur blanc et 1,71:1 sur un hero teal — **sous le 3:1 de WCAG 1.4.11**. `Button` garde l'anneau bicolore. C'est un écart de conformité assumé, pas un oubli : à rouvrir avant toute exigence d'accessibilité contractuelle (appel d'offres, RGAA).
- Contraste : `text-ink-900` sur blanc. Texte blanc uniquement sur `primary-700+` / `secondary-700+` / `accent-700+` — ⚠️ **`primary-600` est à 3,66:1 et échoue AA** pour du texte normal.
- Pour du **texte** sur fond clair, utiliser les tokens `-fg` : `secondary-600` et `accent-600` échouent AA en texte, ils servent au remplissage.
- **Contour d'un composant (SC 1.4.11) = 3:1, et la règle ne dit rien de
  l'épaisseur.** Un filet de 1 px au bon cran passe comme un filet de 2 px : ne
  jamais épaissir pour « faire passer », changer la teinte.

  ⚠️⚠️ **Corrigé le 2026-09-17 — les crans donnés ici l'étaient SUR BLANC, et un
  seuil mesuré sur blanc n'est pas un seuil.** Cette ligne disait « teal 600
  (3,66) · orange 600 (3,98) · or 700 (4,88) ». C'est exact sur du blanc pur, et
  faux partout où un bouton se pose réellement — c'est-à-dire aussi sur une carte
  teintée. Mesuré au navigateur sur les trois surfaces :

  | filet | blanc | tone-50 | tone-100 |
  |---|---:|---:|---:|
  | teal 600 | 3,66 | 3,26 | **2,99** ✗ |
  | teal 700 | 5,02 | 4,48 | 4,11 ✓ |
  | orange 600 | 3,98 | 3,65 | 3,07 |
  | orange 700 | 6,31 | 5,79 | 4,88 ✓ |
  | or 600 | 2,89 | 2,76 | 2,49 ✗ |
  | or 700 | 4,88 | 4,65 | 4,20 ✓ |

  **La règle est donc : le filet d'un bouton est au cran 700, le label au 800.**
  L'or, seule famille qu'on savait déjà devoir monter au 700, cesse d'être une
  exception : c'est la même règle pour les trois. ⚠️ `primary-500`, le teal de la
  signature, mesure **2,94** sur blanc : il ne porte ni texte ni contour.
- **Les variantes douces battent tous les remplissages saturés en contraste de
  texte** : `soft/brand` 6,31 · `soft/warm` 9,49 · `soft/sun` 7,64 — contre 5,02
  au mieux pour un aplat conforme. C'est l'argument qui a porté la bascule.

### Bouton (`emphasis` × `tone`) · requêtes de conteneur

> **Doctrine détaillée → [`.claude/rules/doctrine-design.md`](.claude/rules/doctrine-design.md)** (chargée dès qu'un fichier de `src/` est touché) : contrat par niveau du bouton, `onDark`, padding ; requêtes de conteneur (deux boîtes, crans `@`, padding).

## Cards — conventions tone-aware

> **Doctrine détaillée → [`.claude/rules/doctrine-design.md`](.claude/rules/doctrine-design.md)** (chargée dès qu'un fichier de `src/` est touché) : maps de tone, rayon 20, survol, padding vs rayon, dérogation dense.

## Typo — League Spartan sans italique

League Spartan n'a **aucune face Italic** → `font-display italic` rend un faux-italique synthétique. Pour de l'italique (blockquotes éditoriaux…), utiliser `font-body italic` (Nunito, vrai italic).
