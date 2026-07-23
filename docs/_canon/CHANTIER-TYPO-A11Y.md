# Chantier typographie & accessibilité — état au 2026-07-23

_Tous les chiffres ci-dessous ont été **mesurés**, pas estimés : ratios calculés
avec la formule WCAG 2.x, usages comptés par grep sur `src/`, valeurs lues dans
le CSS bâti (`dist/assets/*.css`). Chaque affirmation est reproductible._

**Ce document n'est pas un plan, c'est un état des lieux.** Les décisions
marquées « à trancher » appartiennent à Chloé.

---

## 0. À lire avant de toucher à quoi que ce soit

**L'app a deux fichiers de tokens, tous les deux chargés :**

| Fichier | Rôle | Gagne ? |
|---|---|---|
| `src/index.css` (`@theme`) | palette, échelles, génère les classes Tailwind | perd les collisions |
| `src/styles/design-tokens.css` | rôles sémantiques `var(--bg)`, `--text`, `--border` | **gagne** (couche `base` déclarée après `theme`) |

Vérifier ce qui rend **réellement** dans `dist/assets/*.css`, jamais dans un seul
fichier source. En cas de divergence, **c'est le composant React qui tranche.**

Détail complet : [`AUDIT-DESIGN-2026-07-22.md`](AUDIT-DESIGN-2026-07-22.md).

---

## 1. Contraste — le défaut le plus grave

### `ink-400` échoue et sert 309 fois à du texte

| Token | Hex | Sur blanc | Verdict |
|---|---|---|---|
| `ink-900` | `#252B37` | **14,20:1** | ✅ AA |
| `ink-800` | `#1f2937` | 14,68:1 | ✅ AA |
| `ink-700` | `#374151` | 10,31:1 | ✅ AA |
| `ink-600` | `#4b5563` | 7,56:1 | ✅ AA |
| `ink-500` | `#6b7280` | 4,83:1 | ✅ AA — la limite |
| **`ink-400`** | `#9ca3af` | **2,54:1** | ❌ **échoue AA (4,5) ET grand texte (3,0)** |

Vérifié aussi sur les 4 autres surfaces réelles (`ink-25`, `surface-cream`,
`surface-cyan`, `surface-mist`) : mêmes conclusions, écarts < 0,3.

**Portée mesurée :** `text-ink-400` apparaît **364 fois dans 156 fichiers**, dont
**309 sur du texte réel** (55 sur des icônes). Très souvent combiné à
`text-caption` (13 px) — métadonnées, dates, légendes.

**Remplacement :** `ink-500` (4,83:1) existe déjà. Aucun token à créer.

**À trancher :** le remplacement change l'apparence de beaucoup d'écrans (le gris
devient nettement plus foncé). Montrer un avant/après sur un composant avant de
lancer les 309.

### `primary-600` échoue aussi

`#4A8FA1` sur texte blanc = **3,66:1**. Concerne les boutons primaires et tout
fond teal portant du texte blanc. `spec.json` annonçait 4,52:1 — c'était faux.

`primary-700` (`#3D7786`) = 5,02:1 · `primary-800` (`#2F5F6A`) = 7,08:1.

> ⚠️ **Prompt Buddy hérite du même défaut** (`src/styles.css`, `.btn-primary`,
> onglets actifs, chips, pastille d'aide). Dépôt séparé — à traiter là-bas.

### Anomalie d'ordre dans la rampe

`ink-900` (luminance 0,0240) est **plus clair** que `ink-800` (0,0215). La rampe
n'est pas monotone : le teal TLS `#252B37` est inséré dans une échelle de gris
neutres où il ne s'ordonne pas.

Sans conséquence de contraste — les deux sont excellents — mais casse
l'intuition « chiffre plus haut = plus sombre ». Piège pour qui veut assombrir.

---

## 2. Typographie

### Tailles — l'échelle est saine

12 tokens vivants, progression cohérente, chacun avec ses modificateurs
(`--line-height`, `--font-weight`, `--letter-spacing` appliqués
automatiquement par Tailwind v4) :

`h1` 36 · `h2` 28 · `h3` 22 · `h4` 18 · `h5` 16 · `body-lg` 18 · `body` 16 ·
`body-sm` 15 · `caption` 13 · `micro` 11 · `stat-value` et `stat-value-lg` (clamp)

> **Ne pas fusionner `h4`/`body-lg` ni `h5`/`body`** malgré leur taille identique.
> Ils diffèrent par la graisse et l'interligne : `h4` porte `600` + `1.625rem` +
> `-0.02em`, `body-lg` seulement `1.75rem`. Deux rôles, pas un doublon.

**Fait le 2026-07-23 :** `--text-heading-1…5` supprimés (échelle parallèle,
zéro usage).

**Reste ouvert :** `--text-display-xl/lg/md` (96/64/48 px) est déclarée, liée 1:1
aux text styles Figma, et **jamais utilisée**. Les pages marketing emploient
`text-4xl` (36 px), plus petit que son plus petit cran. À trancher : l'adopter
dans les héros, ou la retirer **des deux côtés à la fois** (code + Figma).

### Graisses — le vrai trou

**Aucun token de graisse n'existe.** Zéro `--font-weight-*` autonome. Les seules
graisses tokenisées sont les modificateurs des `--text-*`.

Mesuré sur ~2 100 déclarations :

| Classe | Poids | Usages |
|---|---|---|
| `font-bold` | 700 | **917** |
| `font-semibold` | 600 | **774** |
| `font-extrabold` | 800 | 219 |
| `font-medium` | 500 | 168 |
| `font-normal` | 400 | 20 |
| `font-black` | 900 | **13** |

Plus 32 déclarations `font-weight:` en CSS brut.

**Deux constats :**

1. **700 et 600 pèsent 80 % des usages**, et **aucun document ne dit quand
   utiliser l'un plutôt que l'autre.** C'est là que des tokens apporteraient
   quelque chose : nommer les **rôles**, pas les nombres.
2. **`font-black` (900) = 13 usages, soit 0,6 %.** À cette fréquence, c'est plus
   probablement un accident qu'une intention — à vérifier avant de trancher : si
   les 13 sont des titres de héros, c'est un choix ; s'ils sont dispersés, c'est
   du bruit.

**Recommandation :** ne pas créer une échelle numérique de plus
(`--font-weight-400…900`), qui ne résoudrait rien. Créer des tokens
**sémantiques** adossés aux rôles réellement observés, sur le modèle de
`--text-h1` plutôt que `--text-36`.

**Prérequis :** établir d'abord où les graisses sont *incohérentes* — deux titres
de même niveau en 600 et 700, par exemple. C'est cette liste qui doit dicter les
rôles. Sans elle, toute échelle proposée est de l'intuition.

---

## 3. Ce qui n'a pas encore été audité

Un audit à cinq axes a été lancé le 2026-07-23 mais n'avait pas rendu au moment
d'écrire ceci. Restent à couvrir :

- **Cibles tactiles** — la règle maison est 44 px ; `REGLES-USAGE-COMPOSANTS.md`
  annonce 40×40 pour Button MD et 44×44 pour Input. Mesurer le rendu réel des
  boutons, chips, onglets et icônes cliquables.
- **Focus visible** — chercher tout `outline:none` sans remplacement.
- **`prefers-reduced-motion`** — les `@keyframes` sont-ils tous couverts ?
- **Contrats ARIA** — Button icône seule sans `aria-label`, Input sans label lié,
  erreur sans `aria-invalid` + `aria-describedby`.
- **Mode sombre** — jamais audité, redéfinit 104 tokens.
- **Vitrine `/components`** — `CLAUDE.md` la déclare « source de vérité
  visuelle ». Ses tokens couleur et ombre lisent désormais la variable CSS
  (2026-07-23), mais **spacing, radius, typo et gradients sont encore codés en
  dur** et peuvent avoir dérivé.

---

## 4. La méthode qui a marché

Ce qui a permis de trouver les défauts de cette journée, et qu'il vaut mieux
reconduire :

1. **Mesurer, jamais estimer.** Le ratio 4,52:1 annoncé conforme AA valait en
   réalité 3,66:1. Personne ne l'avait recalculé depuis avril.
2. **Vérifier dans le CSS bâti**, pas dans un fichier source — deux fichiers de
   tokens se contredisent et le perdant n'est pas celui qu'on croit.
3. **Faire réfuter chaque défaut trouvé** par une vérification indépendante. Sur
   une passe, 7 alertes sur 14 se sont révélées fausses (regex trop large,
   mauvais fichier, périmètre différent).
4. **Montrer avant de changer** quand le changement se voit. Les ombres et les
   contrastes ont été validés visuellement avant application.
5. **Supprimer les copies plutôt que les corriger.** La vitrine a cessé de
   dériver le jour où elle a lu `getComputedStyle` au lieu de recopier des hex.

> **Le fil rouge de tout ce chantier :** une valeur écrite deux fois finit
> toujours par mentir, et quand rien ne la lit à l'exécution, elle ment sans que
> rien ne casse.
