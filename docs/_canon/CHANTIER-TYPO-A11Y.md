# Chantier typographie & accessibilité — état au 2026-07-23

_Tous les chiffres ci-dessous ont été **mesurés**, pas estimés : ratios calculés
avec la formule WCAG 2.x, usages comptés par grep sur `src/`, valeurs lues dans
le CSS bâti (`dist/assets/*.css`). Chaque affirmation est reproductible._

**Ce document n'est pas un plan, c'est un état des lieux.** Les décisions
marquées « à trancher » appartiennent à Chloé.

> **Passe de mesure du 2026-07-23 (après-midi).** Périmètre : contraste (CSS bâti
> + rendu réel du navigateur sur `/dashboard`, `/learning-paths`, `/components`),
> graisses (census sur tout `src/`), et les six axes du §3 restés ouverts.
> Ce qu'elle a changé : §1 gagne un **remède plus étroit** et un **défaut plus
> grave** (§1 bis) ; §2 est **recadré** (les tokens de graisse existent) ; §3 est
> remplacé par des mesures, dont **deux fausses alertes réfutées**.
> **Rien n'est appliqué au code.**

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

#### Ce que la mesure du 23/07 a corrigé dans ce remède

Le comptage se reproduit exactement (364 / 156 fichiers). Trois choses en
revanche n'étaient pas dites, et changent la manière de lancer les 309 :

| Fait mesuré | Conséquence |
|---|---|
| `ink-500` = **4,39:1** sur `surface-sunken` et `bg-ink-100` → **échoue AA** | les surfaces grises n'avaient pas été testées (seules `ink-25`, `cream`, `cyan`, `mist` l'avaient été). **~18 sites sur `bg-ink-100` exigent `ink-600`** (6,87:1), pas `ink-500`. |
| Sur fond **sombre**, `ink-400` **passe** (7,03 sur `--bg`, 5,59 sur `--surface`) et `ink-500` **échouerait** (3,69 / 2,94) | un remplacement global casserait ces cas — mais au rendu réel **aucun** n'a été trouvé (voir ci-dessous). |
| **219 des 364** n'ont aucun `bg-*` dans leur propre littéral de classe | la surface vient d'un ancêtre : ces sites sont **non classables statiquement**, ils demandent une vérification au rendu. |

**Répartition mesurée** (détection limitée au *même littéral* que `text-ink-400`) :
54 sites à surface claire prouvée · 18 sur fond gris · 73 sur des icônes ·
**219 indéterminés** · 0 fond sombre auto-déclaré.

> ⚠️ **Piège de méthode, à ne pas rejouer.** Un premier classifieur utilisait une
> fenêtre de 6 lignes autour de l'occurrence et annonçait « 23 sites sur fond
> sombre ». **Faux.** Il attrapait le `text-white` d'entrées *voisines* dans la
> même map de variantes (`Steps.tsx`, `EditorialHero.tsx`) et prenait un
> `border-ink-100` pour un fond gris (`Dashboard.tsx`). Vérifié au rendu :
> **zéro** nœud `ink-400` sur fond sombre. Toujours restreindre la détection de
> surface au littéral de classe, jamais à un voisinage de lignes.

**Avant/après réalisé** sur `patterns/ResumeLessonCard.tsx` (carte héros du
dashboard, 3 sites `ink-400`), composant cloné en direct depuis le DOM :
l'échange à plat `ink-400→500` suffit. Un second palier (`ink-500→600`) est
visuellement indiscernable — **la hiérarchie qui porte du sens est
libellé↔valeur (`ink-400`→`ink-700`), pas libellé↔voisin.**

**Statut : en attente.** Décision du 23/07 — on ne touche pas à `ink-400` tant
que l'arbitrage boutons (§1 bis) n'est pas rendu, pour ne pas mêler deux
changements visibles dans la même passe.

### `primary-600` échoue aussi

`#4A8FA1` sur texte blanc = **3,66:1**. Concerne les boutons primaires et tout
fond teal portant du texte blanc. `spec.json` annonçait 4,52:1 — c'était faux.

`primary-700` (`#3D7786`) = 5,02:1 · `primary-800` (`#2F5F6A`) = 7,08:1.

> ⚠️ **Prompt Buddy hérite du même défaut** (`src/styles.css`, `.btn-primary`,
> onglets actifs, chips, pastille d'aide). Dépôt séparé — à traiter là-bas.

### `primary-600` n'est que le cas le moins grave — les boutons échouent tous

Mesuré au rendu réel, puis recoupé sur le CSS bâti. **`primary-600` (3,66) est le
*meilleur* des trois variants pleins**, pas le pire. Le CTA principal du dashboard
(« Reprendre », `Button variant="secondary"`) est à **2,64:1**.

| Variant `Button` | Fill au repos | Repos | Fill au survol | Survol |
|---|---|---|---|---|
| `primary` | `primary-600` | 3,66 ❌ | `primary-500` | **2,94** ❌ |
| `secondary` | `secondary-500` | **2,64** ❌ | `secondary-400` | **2,48** ❌ |
| `accent` | `accent-500` | 2,31 ❌ | `accent-400` | **1,86** ❌ |

**Le survol dégrade la lisibilité dans les trois cas** : le fill s'éclaircit alors
que le label reste blanc. C'est un défaut à part entière, indépendant du niveau de
départ.

Portée : sur `/learning-paths` il y a **zéro** nœud `ink-400`, et pourtant
5 échecs de contraste — **tous** blanc-sur-orange. Ce défaut touche des écrans
qu'`ink-400` ne touche pas.

Seuls `primary-700+`, `secondary-700+` et `accent-700+` passent AA avec du blanc.

#### Il n'existe pas de règle unique — mesuré

Deux remèdes ont été rendus visuellement sur les vrais composants `Button` :

| | `primary` (teal) | `secondary` (orange) | `accent` (jaune) |
|---|---|---|---|
| **B** — foncer le fill en 700/800 | 5,02 ✅ reste teal | 6,31 ✅ mais **devient brun** | 4,88 ✅ mais **devient brun** |
| **C** — garder le fill, label `ink-900` | **3,88 ❌** | 5,38 ✅ reste orange | 6,15 ✅ reste jaune |

**Le teal est le seul cas piégé** : trop foncé pour un label `ink-900` (3,88) et
trop clair pour du blanc (3,66). Les teintes chaudes, elles, passent en gardant
leur fill exact.

**D'où l'hybride** (rendu et vérifié, 6 cellules sur 6 conformes) :
`primary` → fill `600→700`, survol `→800`, label blanc (5,02 / 7,08, reste teal) ·
`secondary` et `accent` → **fill inchangé**, label `ink-900`, survol qui assombrit
(5,38 / 4,52 et 6,15 / 5,17). Chaque teinte garde son identité de marque.

> ⚠️ Le survol de `secondary` en hybride tombe à **4,52** — conforme, mais sans
> marge. À rejouer si la teinte bouge d'un cran.

**Statut : à trancher.** Aucune modification appliquée.

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

#### La liste (mesurée le 23/07) — et un recadrage

> ⚠️ **« Aucun token de graisse n'existe » est vrai à la lettre et trompeur en
> pratique.** Il n'y a pas de `--font-weight-*` autonome écrit par TLS, mais les
> tokens de taille **portent chacun une graisse**, écrite dans `src/index.css`
> (`--text-h1--font-weight: 700` … L122-138) et bien émise dans le CSS bâti :
>
> **`h1` 700 · `h2` 700 · `h3` 600 · `h4` 600 · `h5` 600.**
>
> Une convention de titrage **existe donc déjà et est tokenisée.** `body`,
> `body-sm`, `caption` et `micro` n'en portent aucune — c'est voulu, ils héritent.

Le vrai défaut n'est pas l'absence de tokens, c'est que **le code les contredit
majoritairement** :

| Rôle | Ce que dit le token | Ce que fait le code | Verdict |
|---|---|---|---|
| `text-h3` | **600** | **700 dans 70 %** des sites | le code a tranché contre le token |
| `text-h4` | **600** | **700 dans 60 %** | idem |
| `<h2>` | 700 | 800 (42 %) vs 700 (39 %) | **pile ou face**, aucune convention |
| `<h1>` | 700 | 800 (59 %) vs 700 (35 %) | le token est minoritaire |
| `text-h2` | 700 | 700 (64 %) vs 800 (27 %) | dominante tenue |
| `text-caption` | *(aucune)* | **7 graisses distinctes** | dispersion maximale |

**Ce que la liste dicte** — et qui remplace l'intuition :

1. La question n'est pas « quelle échelle inventer » mais **« qui a raison, le
   token ou les 70 % ? »**. Pour `h3` et `h4`, l'usage réel dit 700 ; le token dit
   600. Trancher **ce point d'abord** : tout token sémantique posé avant serait
   bâti sur une convention que le code ne suit pas.
2. `<h1>`/`<h2>` mélangent 700 et 800 sans règle discernable. C'est **là** qu'un
   rôle nommé (`--weight-title` vs `--weight-display`) réglerait quelque chose,
   parce qu'il existe deux intentions réelles — titre de page vs titre héros — que
   rien ne distingue aujourd'hui.
3. `font-black` (900) : **13 usages**, dispersés (`VideoTutorial`, `BookingModal`)
   — pas des titres de héros. Confirmé **bruit**, pas intention.

**Statut : à trancher** (point 1 avant tout le reste). Rien n'est appliqué.

---

## 3. Les six axes ouverts — mesurés le 2026-07-23

### Deux fausses alertes, réfutées : ne pas ouvrir de chantier

**`prefers-reduced-motion` (CSS) — couvert.** La question « les `@keyframes`
sont-ils tous couverts ? » a une réponse : oui, et sans les énumérer. Une règle
générale `*, *::before, *::after` en `!important` neutralise
`animation-duration`, `animation-iteration-count`, `transition-duration` et
`scroll-behavior` — déclarée **deux fois** (`globals.css:152`, `index.css:1045`).
Les 45 `@keyframes` sont donc tous couverts par construction.

**Vitrine — les couleurs ne mentent pas.** Les hex teal fossiles encore présents
dans `Components.tsx` (`#F5F8F8`, `#535B62`, `#EEF2F4`…) **ne sont jamais
affichés** : `Swatch` route `type: 'color'` **et** `type: 'role'` (et `shadow`)
par `useLiveTokenValue`, pour la pastille *et* pour la valeur imprimée
(L7502-7521). Ce sont des replis de premier paint. Le correctif du 23/07 tient,
et il couvre les rôles — pas seulement les couleurs.

### Ce qui est réellement en défaut

| Axe | Mesure | Gravité |
|---|---|---|
| **framer-motion** | **24 fichiers sur 81** n'appellent pas `useReducedMotion` (332 props d'animation). La règle CSS générale ne peut pas les atteindre. Dont **`InteractiveAppMockup`**, l'une des 9 primitives que `CLAUDE.md` documente comme protégées, et 12 fichiers `marketing/motion/*` absents de cette table. | moyenne |
| **Vitrine — ce qui ne lit pas en direct** | Dérive réelle là où `t.value` est rendu tel quel : **5 gradients sur 5** (`--g-warm` **inversé**, `--g-cool-deep` annoncé linéaire alors qu'il est **radial**, `--g-warm-soft` et `--g-cool-soft` mauvaise couleur d'arrivée), **3 durées sur 4** (`--dur-2` 180 vs 200 ms, `--dur-3` 240 vs 320, `--dur-4` 320 vs 520), et `--ease-emphasis` (la vitrine montre une courbe **avec rebond**, `cubic-bezier(0.2,0,0,1.15)`, alors que la vraie est `cubic-bezier(.22,1,.36,1)` — sans rebond, comme documenté). Deux tokens affichés **n'existent pas** dans le CSS bâti : `--g-cool` et `--blur-glass-ambient` (ce dernier est pourtant documenté dans `CLAUDE.md`). | moyenne |
| **Cibles tactiles** | `/dashboard` : **11 contrôles sur 20** sous 44 px, 5 sous 24 px. `/learning-paths` : 3 sur 18. Les liens texte à 20 px de haut (« Lire », « Continuer ») sont **exemptés** par WCAG 2.2 SC 2.5.8 (exception *inline*) ; le repli de sidebar **28×28** et l'envoi journal **36×36** ne le sont pas. | moyenne |
| **Focus visible** | 84 `outline-none`. **16** sans remplacement dans le même élément, dont ~7 réels — tous des champs de formulaire du Journal (`JournalFreeEntry` ×3, `JournalNewEntry` ×2, `JournalChatCompose`, `SearchWithSuggestions`). Les autres sont des faux positifs de parsing (génériques TypeScript `<HTMLInputElement>`, gabarit CSS de `ComponentsLayout`). | moyenne |
| **Contrats ARIA** | `iconOnly` sans nom accessible : **2** (`MagazineCard:165`, `Coaching:303`) — et non 17. Le grep ligne-à-ligne surcomptait : les `className` s'étalent sur plusieurs lignes. | faible |

> **Spacing, radius et typo dans la vitrine : pas de dérive.** L'écart apparent
> (`2.25rem · 36px` vs `2.25rem`, `0.10` vs `.1`) est l'annotation lisible côté
> vitrine et la suppression du zéro initial par le minifieur. Vérifié valeur par
> valeur — la suspicion du §3 initial ne se confirme que sur **gradients et
> motion**.

### Mode sombre — HORS PÉRIMÈTRE (décision du 2026-07-23)

**Ne pas ouvrir ce chantier.** Le mode sombre n'a jamais été mis en place
volontairement ; le produit se concentre sur le **mode clair**. Toute mesure de
contraste, tout arbitrage de token et toute revue de composant de ce document
portent **exclusivement sur le mode clair**.

Ce qui a été mesuré le 23/07 est consigné ici uniquement pour ne pas avoir à le
refaire le jour où le sujet sera rouvert :

- la couche token est **saine** (`--text` 17,08 · `--text-muted` 7,03 ·
  `--text-soft` 12,12 sur `--bg` — tout AA/AAA) ; 87 tokens ont une surcharge sombre ;
- mais le thème est **un no-op** : les utilities Tailwind (`bg-white`,
  `text-ink-900`) ignorent `data-theme`. Avec `data-theme="dark"`, `body` passe à
  `#0f172a` et **8 surfaces blanches subsistent** — la page reste claire ;
- le basculement est **atteignable** (menu compte, `App.tsx:398`) et s'active
  aussi seul via `prefers-color-scheme`.

> **Le seul point à surveiller en attendant** : comme l'activation est
> automatique sur `prefers-color-scheme`, un visiteur en thème sombre système
> déclenche déjà ce demi-état sans l'avoir demandé. Si ça devient gênant avant
> que le chantier soit ouvert, la correction minimale est de **ne plus écouter
> `prefers-color-scheme`** (une règle `@media` dans `dark-mode-tokens.css:13`) —
> pas de refaire le thème.

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
6. **Le grep ligne-à-ligne surcompte, la fenêtre de lignes invente.** Ajouté le
   23/07, après que les deux erreurs se soient produites dans la même passe. Les
   `className` s'étalent sur plusieurs lignes : chercher `aria-label` sur *la*
   ligne donnait 17 défauts ARIA, il y en a **2**. Inversement, élargir à une
   fenêtre de 6 lignes fait attraper les classes des *voisins* : 23 sites
   « sur fond sombre » annoncés, **0** au rendu. Le bon périmètre est
   syntaxique — le littéral, ou l'élément JSX — jamais un nombre de lignes.
7. **Distinguer la dérive du bruit de formatage.** `2.25rem · 36px` contre
   `2.25rem`, ou `0.10` contre `.1`, ce n'est pas une dérive : c'est une
   annotation lisible d'un côté et un minifieur de l'autre. Sur 60 tokens
   « divergents » de la vitrine, **10** l'étaient vraiment. Comparer les valeurs
   normalisées, sinon on ouvre 50 chantiers pour rien.
8. **Chercher le défaut, pas le token suspecté.** `ink-400` a été confirmé, mais
   la même mesure a trouvé pire à côté (boutons à 2,64) et sur des écrans
   qu'`ink-400` ne touche pas. Auditer *toute la surface* rendue, pas seulement
   la valeur qu'on soupçonnait.

> **Le fil rouge de tout ce chantier :** une valeur écrite deux fois finit
> toujours par mentir, et quand rien ne la lit à l'exécution, elle ment sans que
> rien ne casse.
