# Mise à jour du design system dans Claude Design — actions à valider

**16.09.2026** · Préparé par Claude à la demande de Chloé. ✅ **Validé par Chloé le 16/09 (« commence à update le design system… pour que ce soit le même que dans la codebase et Figma ») et exécuté le même soir — voir §7.**

**Comment valider.** Dans la dernière colonne de chaque ligne, écrire :
- « Validé - corrige » : je l'exécute au prochain passage ;
- « Validé - corrige quand je l'ordonne » : je le prépare et j'attends ton signal ;
- « En attente » : je n'y touche pas.

**Une case vide vaut « En attente ».**

---

## 0. Le cadre

| | |
|---|---|
| **Cible** | L'artefact « The Learning Society Design System » (type Design System), migré aujourd'hui à 20:40 UTC depuis l'ancien projet Claude Design `96f5581b…`. |
| **Source** | Le dépôt `frontend-tls`, commit `bac82f9` du 16/09 à 16:34. Les valeurs viennent du bloc `@theme` de `src/index.css`. La doctrine vient de `CLAUDE.md`, `DESIGN.md`, `PRODUCT.md`, `brand/BRAND-KIT.md`, `docs/_canon/REGLES-USAGE-COMPOSANTS.md`, et du code des composants quand les docs divergent. |
| **Phasage décidé** | **Phase 1** (ce document) : tokens, brand book, polices, logos, fiches d'usage des composants, couverture, retrait de ce qui contredit le code. **Phase 2** (plus tard, si c'est faisable) : aperçus vivants, compilés depuis tes composants et en s'appuyant sur les exemples du showcase `/components` (`src/pages/Components.tsx` et `registry.ts`). |
| **Réversibilité** | L'artefact garde l'historique de ses versions, et l'ancien projet Claude Design n'est pas touché. Les fichiers binaires retirés de l'index (images, polices) restent dans le stockage de l'artefact : je retire leur référence, **je ne supprime pas les fichiers eux-mêmes**. |
| **Dépôt** | Aucune modification du code. Seuls ajouts : ce document et sa ligne dans `docs/INDEX.md`. |

---

## 1. Ce qui a été constaté, et qui explique le périmètre

### 1.1 L'état de l'artefact aujourd'hui

- **Migration inachevée.** L'index ne porte pas la marque `upgraded` : la page attend le nettoyage de fin de migration.
- **Le contenu date de juin 2026.** Le README annonce « 266 tokens », « Button 14 variantes × pilule », `TrendingBadge`, `Pill`, `Tag` (tous trois supprimés du code le 10/09), une police mono « en attente », des rayons jusqu'à 28 px.
- **Les tokens ne correspondent pas au code.** 190 couleurs sous les anciens noms `tls-*`, **aucun style de texte**, et les tailles de texte rangées par erreur dans la famille « espacement ». On n'y trouve ni la rampe `ink` reconstruite le 09/09, ni les crans d'espacement `stack-3xs` et `stack-sm` ajoutés aujourd'hui, ni `radius-xl` comme rayon de carte.
- **487 fichiers, dont beaucoup de bruit.** Les 3 polices copiées dans chacune des 26 pages vitrines, 11 rapports de juin publiés comme sections du brand book, des captures d'écran, des doublons, un ancien logo au centre `#8DBAC6` (abandonné le 09/09), 12 icônes Lucide recopiées en noir.

### 1.2 Des docs du dépôt qui divergent déjà du code

Le système Claude Design suit **le code**. *Mise à jour du 16/09 au soir : `CLAUDE.md` et `BRAND-KIT.md` ont été corrigés sur ton ordre (R3) ; les autres lignes restent ouvertes.*

| Doc | Ce qu'il dit | Ce que dit le code |
|---|---|---|
| `CLAUDE.md` (familles de rayons, doctrine padding) | Card à 14 px (R1), « le Button s'accorde à la Card » | `Card.tsx` : **20 px (`rounded-xl`) depuis le 16/09 15:13**. Le bouton reste à 14 px par étagement. |
| `brand/BRAND-KIT.md` §4 | « `rounded-pill` sur les boutons, 14 px sur les cards » | Boutons à 14 px (R3), cartes à 20 px |
| `DESIGN.md` §4 | Survol de carte : `hover:shadow-md hover:-translate-y-1` | Commit `892fa58` : **ni soulèvement, ni ombre**. Le filet se ferme d'un cran et le fond se teinte. |
| `DESIGN.md` §2 et §5 | Échelle `text-display-*`, `h5`, « cinq Pills dont TrendingBadge » | Display et h5 retirés le 09/09 ; `TrendingBadge`, `Pill` et `Tag` supprimés le 10/09 |
| Showcase, fiche Button | « Forme pilule » | 14 px |
| `logos/svg/tls-*-ink*.svg` | Encre secondaire `#374151` | `#374151` était l'ancien `ink-700` Tailwind ; `ink-700` vaut `#394050` depuis le 09/09 |
| Artefact « Tokens TLS » (généré le 10/09) | « Le rayon des cartes est à 14 px » | 20 px depuis le 16/09 : l'artefact est à régénérer avec `brand/tools/generer-reference-tokens.py` |
| Artefact « Tokens TLS », piège `secondary-600` | « Pour du texte orange sur clair, c'est le premier cran sûr » | `secondary-600` mesure **3,98:1** sur blanc : il passe un contour mais **échoue** le texte courant. Le premier cran sûr en texte est `secondary-700`. |

⚠️ **Dangereux parce que daté** : un agent qui lit `CLAUDE.md` ou `BRAND-KIT.md` aujourd'hui dessinera des cartes à 14 px.

### 1.3 Les sources croisées

| Source | Ce qui a été vérifié | Résultat |
|---|---|---|
| `src/index.css` `@theme` | les 232 déclarations | source des valeurs |
| Artefact « Tokens TLS » (`P1Pc1pWnmcpLwfoR6BBub3`) | les 4 rampes, les sémantiques, l'échelle de texte, les rayons, les ombres | **identiques au code**, sauf les deux écarts du tableau ci-dessus. Ses libellés (« Bleu TLS », « Orange TLS, la couleur des CTA ») sont repris dans les notes d'usage. |
| Figma `LccBZ1GKWQVwVzPtsSzk5Y`, nœud **`1111:46`** (Card), inspecté via `get_variable_defs` | les variables et styles liés à la carte | **identiques au code** : `radius-xl` = 20, rampe `ink` reconstruite (`ink-500` `#667082`, `ink-600` `#4c5466`), h3 24/30, h4 20/26, body 16/26, ombres `sm`/`md` neutres `#12181C`. Figma porte en plus un style `Caption/caption-strong` (13/20, 600) qui n'a **pas** de token dans le code : il n'est pas repris. |
| Showcase `/components` (`src/pages/Components.tsx`, `registry.ts`) | la taxonomie en 15 catégories, les exemples par composant | sert en phase 2 (groupes et aperçus). La fiche Button y dit encore « forme pilule ». |

---

## 2. Actions — ajouts et remplacements dans Claude Design

| # | Action | Détail | Pourquoi | Validation |
|---|---|---|---|---|
| A1 | **Remplacer `tokens.json`** | **174 tokens + 16 styles de texte + 3 polices**, chacun avec une note d'usage. Noms identiques au code, sans le `--` (`color-primary-700` = `var(--color-primary-700)`). **Couleurs (78)** : les rampes primary, secondary (dont 650), accent, ink 0→950, `brand-navy`, les surfaces, le texte, les bordures, les 4 états, les rares. Les alias (`color-text-strong` → `color-ink-900`…) restent des alias. Contrastes recalculés : ink-400 3,01 · ink-500 4,99 · primary-500 2,94 · primary-600 3,66 · accent-600 2,89 · secondary-600 3,98, tous conformes aux docs. **Styles de texte** : Titres h1→h4 · Texte body-lg→micro · Éditorial hero/section/title/feature/lede (valeur maximale affichée, `clamp` écrit dans la note) · Chiffres stat-value. **Autres familles** : spacing (13) · spacingEditorial (7, fluides) · radius (7) · shadow (20) · opacity (6) · zIndex (7) · duration (6) · easing (4) · container (5) · blur (4) · borderWidth (4) · letterSpacing (4) · iconSize (9). | Le fichier actuel décrit juin. | ✅ Validé - corrige (ordre de Chloé, 16/09) · **fait** |
| A2 | **Ne pas reprendre** 9 déclarations de `@theme` | Les 7 `--z-*` (doublons morts : seule l'échelle `z-index-*` produit les classes), et `--animate-alert-slide` et `--animate-skeleton-shimmer` (animations composées avec leurs keyframes, pas des valeurs simples). Les 28 dégradés `bg-gradient-*`, qui sont des utilities, sont cités dans le README. | Le format des tokens ne sait pas les porter correctement. | ✅ Validé - corrige (ordre de Chloé, 16/09) · **fait** |
| A3 | **Remplacer le README (brand book)** | Réécrit en français depuis la doctrine du dépôt, **en règles d'usage qui nomment les tokens** : 1 · Contenu (tu/vous, grammaire de la pratique, copy, IA) · 2 · Couleur (trois lumières, zones de l'encre, états, tones) · 3 · Typographie · 4 · Espace et mise en page · 5 · Formes (rayons étagés pilule / 14 / 20, bordure plutôt qu'ombre, verre, fonds) · 6 · Mouvement · 7 · Iconographie et logo · 8 · Composants (deux registres Badge/MetaPill, familles, quand choisir quoi) · 9 · Accessibilité · 10 · Interdits · « Hors synchronisation ». Brouillon joint à ce document. | L'actuel annonce des valeurs et des composants qui n'existent plus. | ✅ Validé - corrige (ordre de Chloé, 16/09) · **fait** |
| A4 | Retirer du README la section « Migrated from a legacy design system » | Elle renvoie vers les anciennes pages, supprimées en S1 à S6. | Elle pointerait vers du vide. | ✅ Validé - corrige (ordre de Chloé, 16/09) · **fait** |
| A5 | **Remplacer les 2 polices variables** | `LeagueSpartan-VariableFont_wght.ttf` et `Nunito-VariableFont_wght.ttf`, copiés de `public/fonts/` (les fichiers du dépôt diffèrent de ceux de juin : 95 116 et 276 932 octets). **Garder** `Nunito-Italic-VariableFont_wght.ttf` : l'app charge l'italique depuis Google Fonts, mais sans ce fichier les aperçus rendraient un faux italique. | Mêmes fontes que l'app. | ✅ Validé - corrige (ordre de Chloé, 16/09) · **fait** |
| A6 | **Ajouter le groupe d'assets « Logos »** | Les **60 masters SVG** de `brand/identity/logos/svg/` (5 formats × 6 variantes × aplat/dégradé), avec un `README.md` de groupe qui dit quel fichier sur quelle surface et avec quelle encre. Vérifiés : aucun script, aucune police externe. | Le système n'a aujourd'hui qu'un ancien lockup au centre `#8DBAC6`. | ✅ Validé - corrige (ordre de Chloé, 16/09) · **fait** |
| A7 | **Ajouter 28 fiches d'usage de composants** (README seuls, sans aperçu) | Button · Card · Badge · StatusBadge · MetaPill · MetaPillGroup · FilterChip · Input · Select · Combobox · Search · Alert · Toast · Modal · Breadcrumb · Pagination · Tabs · Stepper · SectionHeader · PageHero · CardGrid · StatCard · Avatar · EmptyState · TlsLogo · Sidebar · BottomNav · AuthShell. Chacune : une phrase de résumé, quand l'utiliser, les props relevées **dans le code** (types exportés), à faire / à éviter. | La doctrine par composant, en attendant les aperçus de la phase 2. ⚠️ Sans aperçu, la page les affichera peut-être comme des fiches « statiques » : je vérifie après publication et je te le dis. | ✅ Validé - corrige (ordre de Chloé, 16/09) · **fait** |
| A8 | **Ajouter la couverture** | Bandeau de blocs aux couleurs de la marque (primary-50, primary-500, brand-navy, secondary-500, accent-400, rayon `radius-xl`), des disques en motif (les nœuds du mark), le nom en League Spartan 800 et une accroche : « Trois lumières sur un fond clair, pour des adultes qui pratiquent. » Rendu vérifié en local. | Chaque système en a une. | ✅ Validé - corrige (ordre de Chloé, 16/09) · **fait** |
| A9 | **Mettre à jour l'index** | `lastChange` (par Chloé, via Cowork, note « Resynchronisé depuis frontend-tls@bac82f9 »), marques de fin de migration (`upgraded`, `source.upgradedAt`), groupe `Logos` ajouté en tête, groupes vidés retirés (voir D1 à D4). Titre, namespace et bibliothèques React inchangés. | Clôt la migration et trace la source. | ✅ Validé - corrige (ordre de Chloé, 16/09) · **fait** |

---

## 3. Actions — suppressions de fichiers dans Claude Design

Tous ces fichiers contredisent le code (valeurs de juin, composants supprimés) ou sont des résidus de migration.

| # | Action | Fichiers | Pourquoi | Validation |
|---|---|---|---|---|
| S1 | Retirer les **7 documents de juin** à la racine | `00-READ-ME-FIRST.txt` · `AUDIT-REPORT-Phase2.md` · `DELIVERABLES_CHECKLIST.md` · `INDEX.md` · `LEARNING_APP_ANALYSIS.md` · `PACKAGE_DELIVERY_SUMMARY.md` · `QUICK_START.md` | Publiés comme sections du brand book, ils annoncent un « production-ready » de juin. | ✅ Validé - corrige (ordre de Chloé, 16/09) · **fait** |
| S2 | Retirer les **18 pages HTML explicatives** à la racine | `Atoms` · `Colors` · `Design-System-v2-TLS` · `Elevation` · `Gradients` · `Hero Proposals` · `Iconography` · `Learning App Design System - Interactive Showcase` · `Learning App Design System - TLS` · `Logo Exploration` · `Modals` · `Motion` · `Overview` · `Principles` · `Spacing` · `Toasts` · `Typography` (`.html`) · `logo-test.html` | Valeurs de juin. Remplacées par le README et les tokens. ⚠️ `Hero Proposals` et `Logo Exploration` sont des explorations : elles restent dans l'ancien projet Claude Design et dans l'historique de l'artefact. | ✅ Validé - corrige (ordre de Chloé, 16/09) · **fait** |
| S3 | Retirer les **26 pages vitrines de composants** et leurs copies | `components/{Achievement, Alerts, Avatars, Badges, Breadcrumb2, Buttons, Cards, Celebration, Competence, Components, EmptyStates, Feedback, Inputs, Loading, Menu, Navigation, Pagination2, Patterns, Progress, Screens, Search, Sidebar, Stats, Stepper2, Tabs}/**` (25 dossiers : preview, README, `shell.js`, 3 polices et 2 à 4 CSS **par dossier**), plus `components/ComponentsCore/**` et `components/Button/Button.d.ts`. Pour `Search`, `Sidebar` et `Tabs`, le dossier est vidé puis reçoit la nouvelle fiche A7. | Aperçus de juin (boutons en pilule, `TrendingBadge`…). Les nouveaux aperçus viendront en phase 2. ⚠️ Entre la phase 1 et la phase 2, **le système n'aura aucun aperçu de composant**, seulement les fiches A7. | ✅ Validé - corrige (ordre de Chloé, 16/09) · **fait** |
| S4 | Retirer les **sources JSX de juin** | tout `components/src/**` (Approach 1/2/3, `design-canvas`, `tweaks-panel`, `shell.js`, core et ui, dont `Pill.jsx`, `Tag.jsx`, `TrendingBadge.jsx`) | Copies figées de composants qui ont changé ou disparu. | ✅ Validé - corrige (ordre de Chloé, 16/09) · **fait** |
| S5 | Retirer l'**ancien bundle** | `components/bundle.js` · `components/bundle.css` · `docs/_ds_bundle.js` · `docs/_ds_manifest.json`. **Garder** `components/lib/react*.js` (React 18, utile en phase 2). | Il exporte les composants de juin, dont `CHIP_*` et `TrendingBadge`. | ✅ Validé - corrige (ordre de Chloé, 16/09) · **fait** |
| S6 | Retirer les **maquettes et combos** | `projects/{Dashboard-Student-Learning, Landing-Page-B2B, Newsletter-Weekly-Digest, Pitch-Deck-Conseil-Services, Pitch-Deck-Learning-App}.html` · `projects/spec.json` · `projects/globals copy.css` · `combos/Combos.html` | Construites sur l'ancien bundle et les anciens tokens. | ✅ Validé - corrige (ordre de Chloé, 16/09) · **fait** |
| S7 | Retirer les **exports et fichiers texte périmés** | `tls-design-system-export.json` · `assets/Uploads/{design-tokens.css, globals.css, default_shadcn_theme.css, spec.json, index.html}` · `assets/Uploads/League_Spartan/README.txt` · `assets/Uploads/Nunito/README.txt` · `uploads/{ATTRIBUTIONS, BUILD_SUCCESS, DESIGN, PACKAGE_INVENTORY, PACKAGE_SUMMARY}.md` · `uploads/package.from-standalone.json` · `styles/globals.css` · `styles/index.css` · `publish-progress.json` · `assets/notes/MIGRATION-REPORT.md` | `spec.json` a été supprimé du dépôt le 22/07 parce qu'il mentait (4,52:1 annoncé, 3,66 mesuré). Le reste relève de la migration ou de l'ancien standalone. | ✅ Validé - corrige (ordre de Chloé, 16/09) · **fait** |
| S8 | **Garder** la licence de League Spartan | `assets/Uploads/League_Spartan/OFL.txt` → déplacée en `assets/Licences/League-Spartan-OFL.txt` (un `.txt` n'a pas sa place dans `fonts/`, réservé aux binaires) | Une police embarquée garde sa licence. | ✅ Validé - corrige (ordre de Chloé, 16/09) · **fait** |

---

## 4. Actions — retrait de références d'images et de polices (index)

Les fichiers restent dans le stockage de l'artefact ; seule leur référence disparaît de la page.

| # | Action | Références | Pourquoi | Validation |
|---|---|---|---|---|
| D1 | Retirer le groupe **Icons** | `icon-1.svg` à `icon-12.svg` | Des icônes Lucide recopiées en SVG noir (ex. `icon-1` = horloge). La règle est Lucide dans le code, pas des copies figées. | ✅ Validé - corrige (ordre de Chloé, 16/09) · **fait** |
| D2 | Retirer du groupe **Uploads** les images périmées | 2 captures d'écran d'avril · `Frame 33.svg`, `Frame 34.svg` (×2) · `V2 - Glass Effect.svg`, `V4 - Texture + Noise.svg`, `V7 - Glows & Skeuomorphism.svg` · `favicon-48x48.svg` (×2) · `logo_TLS_horizontal 2000x600.svg` | Explorations d'avril et ancien logo (centre `#8DBAC6`, abandonné le 09/09). Remplacés par le groupe Logos (A6). | ✅ Validé - corrige (ordre de Chloé, 16/09) · **fait** |
| D3 | Retirer du groupe **Uploads** les polices en double | League Spartan variable + 9 statiques · Nunito variable + italique + 6 statiques | Doublons des fichiers de `fonts/`. Les statiques ne servent à rien : l'app n'utilise que les variables. | ✅ Validé - corrige (ordre de Chloé, 16/09) · **fait** |
| D4 | Retirer le groupe **screenshots** et les groupes vides **Other** et **notes** | `logo-compare.png` · `logo-v2.png` · `progress-check.png` | Captures de travail de la migration. | ✅ Validé - corrige (ordre de Chloé, 16/09) · **fait** |

---

## 5. Dans le dépôt

| # | Action | Détail | Validation |
|---|---|---|---|
| R1 | Déposer ce document | `docs/_audits/SYNC-CLAUDE-DESIGN-2026-09-16.md` | ✅ fait (c'est ce fichier) |
| R2 | L'inscrire dans `docs/INDEX.md` | Une ligne dans la table `_audits/`, conformément à la règle anti-dérive de `CLAUDE.md` | ✅ Validé - corrige (ordre de Chloé, 16/09) · **fait** |
| R3 | Corriger les docs divergents du §1.2 | Ordonné par Chloé le 16/09 pour `CLAUDE.md` et `brand/BRAND-KIT.md` : rayons étagés et carte à 20 px, rampe `ink` reconstruite, `brand-navy`, familles Badge/Pills sans `TrendingBadge`/`Pill`/`Tag`, règle de survol des cartes, échelle réelle des rayons, deux nouvelles divergences listées. **`DESIGN.md`, la fiche Button du showcase et l'artefact « Tokens TLS » ne sont pas touchés.** | ✅ fait pour CLAUDE.md et BRAND-KIT.md |

---

## 6. Phase 2 — pour mémoire, rien à valider aujourd'hui

1. Essayer de compiler les composants des fiches A7 en un seul script (esbuild, lancé sur ton Mac), avec React 18 fourni par la page alors que l'app est en React 19. Je te présenterai le résultat avant d'aller plus loin.
2. Écrire un aperçu par composant à partir des exemples du showcase `/components`, groupé selon les catégories de `registry.ts` (Atoms, Composites, Feedback, Navigation…).
3. Si la compilation n'est pas fiable : des aperçus statiques en HTML, avec la même feuille de style que l'app.


---

## 7. Exécution — 16.09.2026

| Étape | Résultat |
|---|---|
| Logos | 60 SVG téléversés dans le stockage de l'artefact, référencés dans le groupe **Logos** (ordre : format × variante × aplat/dégradé). Le service retire les commentaires des SVG : les tailles stockées sont un peu plus petites que les fichiers du dépôt. |
| Publication 1/3 (version 4) | `tokens.json`, README, 28 fiches, couverture, 2 polices, README du groupe Logos, licence League Spartan ; début des suppressions |
| Publication 2/3 (version 5) | fin des suppressions : **392 fichiers retirés** |
| Publication 3/3 (version 6) | index : groupes `Logos` + `Licences`, marques de fin de migration (`upgraded`), `lastChange` |
| État vérifié après publication | **123 fichiers** (contre 487), dont 12 du type. Les fichiers générés par la page (`api/`, `tokens.css`, `manifest.json`) portent encore l'ancien état : **ils se régénèrent au prochain enregistrement fait dans la page.** |
| Non touché | l'ancien projet Claude Design `96f5581b…` ; les fichiers binaires retirés restent dans le stockage de l'artefact |

**Suite prévue** : phase 2, les aperçus vivants (§6).

---

## 8. Phase 2 — aperçus vivants, 17.09.2026

| Étape | Résultat |
|---|---|
| Source | `src/` au commit `957d120` (index.css inchangé depuis `bac82f9`, donc les tokens publiés restent justes) |
| Compilation | Hors du Mac : les binaires de `node_modules` y sont pour macOS et le shell distant tourne sous Linux. `src/` a été copié dans une archive temporaire à la racine du dépôt, transférée puis **supprimée**. Aucun fichier du dépôt modifié. |
| `components/bundle.js` | 268 Ko, un seul script esbuild : 28 composants exposés comme cartes (plus leurs sous-composants : `Checkbox`, `Radio`, `Switch`, `AvatarGroup`, `TlsLogoLockup`, `NavItem`, `SidebarGroup`, `SidebarUserCard`, la famille `Auth*`, et `MemoryRouter` pour `BottomNav`). React et ReactDOM lus sur la page (React 18 de Claude Design, l'app est en React 19 : aucune erreur constatée). |
| `components/bundle.css` | 420 Ko, la vraie feuille de l'app compilée par Tailwind v4 sur tout `src/`, `@font-face` de `/fonts/` retirés (les polices viennent du système) |
| Aperçus | 28 `preview.html`, exemples repris du showcase `/components`, groupes = catégories de `registry.ts` (Atoms, Composites, Feedback, Navigation, Search & Filters, Cards, Lists & Feeds, Headers & Sections, Modals, Auth Family) |
| Vérification | Chaque aperçu rendu en local dans un cadre qui imite Claude Design (tokens.css + polices + bundle + React 18) : **0 erreur JS sur 28**, captures relues une par une |
| Publication | Essai Button + Card (version 7), puis les 26 autres et le bundle complet (version 8), puis l'index (version 9) |
| Fiche corrigée | `BottomNav/README.md` : la liste d'entrées est désormais commune (`src/config/navigation.ts`), la barre du bas affiche `labelCourt` |

**Limites connues** *(état au soir de la version 9 — ⚠️ dépassé, voir §9)* : les icônes des aperçus étaient des tracés Lucide recopiés ; la police mono n'était chargée nulle part ; `PageHero` montre les tons `default` et `brand` seulement. React 18 venait des bibliothèques par défaut du type d'artefact, pas d'une contrainte : l'artefact peut porter les siennes.

**Pour refaire la compilation** : voir §9 et `scripts/claude-design/README.md`.

## 9. Versions 10 à 13 — React 19, kit reproductible, recompilation sur 113e5ae, 17.09.2026

| Version | Contenu |
|---|---|
| 10 | `components/lib/` = React **19.2.5** reconditionné depuis les paquets de l'app (scripts classiques) ; `Icons` exporté par le bundle (12 vraies icônes `lucide-react`, plus de tracés recopiés) ; JetBrains Mono embarquée (`fonts/JetBrainsMono-Variable-latin.woff2`, licence OFL dans le groupe Licences) ; un `<Nom>.d.ts` par carte ; README et tokens mis à jour |
| 11 | Index : `libraries` en 19.2.5, `lastChange` |
| 12 | Recompilation sur `113e5ae` (11 commits après `957d120`, dont `Card.tsx`, `Sidebar.tsx`, `AuthShell.tsx`, `FilterChip.tsx`, `Pagination.tsx`, `tone-classes.ts` ; `src/index.css` inchangé). Fiches `Card`, `Sidebar`, `FilterChip`, `AuthShell` et brand book alignés sur les décisions du 17/09 (plus aucun soulèvement au survol, padding ≥ rayon, famille bulle, carte utilisateur de la Sidebar à 14) |
| 13 | Index : `lastChange` sur `113e5ae` |

**Défaut trouvé et corrigé en v12** : `bundle.css` publié jusqu'à la v11 gardait `@import url('./styles/globals.css')` non résolu. Vite l'inline, le plugin Tailwind seul non. Les aperçus tournaient donc **sans** `globals.css`, `design-tokens.css` ni les keyframes de `modals.css` (styles de base des titres et du corps, variables `--tls-*`, `--text`, `--bg`…). Écart visible surtout sur les interlignes et la couleur du texte. `build.mjs` réécrit désormais l'import et échoue s'il en reste un. `bundle.css` passe de 428 à 453 Ko.

**Vérification** : rendu de contrôle React 19 sur les 28 aperçus, 0 erreur ; captures comparées une à une à la v11 (différences = styles de base retrouvés). Dans la vraie page de l'artefact (volet navigateur), la carte Button rend avec ses icônes Lucide, 0 erreur console.

**Kit reproductible** : `scripts/claude-design/` (commité depuis : `ddae2c1`). `npm install && npm run build` compile bundle, feuille, aperçus et types dans `out/components/` ; `DS=<tokens.json + fonts de l'artefact> npm run check` rejoue le rendu de contrôle. Testé : sortie identique octet pour octet à celle publiée en v12.

**Toujours pas à jour : le catalogue généré.** `project/api/**`, `project/tokens.css` et `project/manifest.json` sont écrits par la page de l'artefact, au premier enregistrement fait dedans, et on ne doit pas les écrire à la main. Ils décrivent encore l'ancien système migré : 65 composants dont `TrendingBadge`, `CHIP_*`, `Approach1Minimalist`… et React 18.3.1. Un agent qui lirait les fiches `api/` avant le README serait induit en erreur. Les aperçus et le brand book, eux, sont justes.

**Police mono dans l'app** : `--font-mono` déclare JetBrains Mono, mais aucune `@font-face` ni feuille ne la charge. Les eyebrows en `font-mono` s'affichent dans la mono du système. L'artefact, lui, l'embarque.

### Actions en attente de validation

| # | Action | Validation |
|---|---|---|
| 9.1 | Commiter `scripts/claude-design/` et ce document | |
| 9.2 | Déclencher la régénération du catalogue : un enregistrement dans la page de l'artefact (toi dans la page, ou Claude via le volet navigateur) | |
| 9.3 | Charger JetBrains Mono dans l'app (auto-hébergée dans `public/fonts/` + `@font-face`), ou retirer `--font-mono` des eyebrows | |
| 9.4 | Étendre l'artefact aux composants de l'app qui n'y sont pas encore (28 exposés aujourd'hui) | |

---

## 10. Recompilation à HEAD, en parallèle — 17.09.2026 après-midi (session audit Claude Code)

> Écrit sans connaître le §9 ci-dessus : les deux sessions ont travaillé le même après-midi
> sur le même arbre. **Pour les prochains re-syncs, le kit du §9 (`scripts/claude-design/`,
> `npm run build` + `npm run check`, commit `ddae2c1`) est le pipeline canonique** — la
> compilation rolldown décrite ici était un one-off, superseded.

| Étape | Résultat |
|---|---|
| Motif | La session d'audit du 17/09 a posé 4 commits après `957d120` (`235748b` → `113e5ae`) : survol/ombres sur ~60 fichiers, famille bulle, chips, boutons Auth. Le bundle du §8 ne les portait pas — les fiches A7 (« pas de soulèvement », « pas d'ombre ») promettaient déjà ce que le bundle ne faisait pas encore. |
| Compilation | **Sur le Mac cette fois** (le détour Linux du §8 n'était pas nécessaire ici) : rolldown 1.0.0-rc.16 (esbuild absent du repo), shims `window.React` / jsx-runtime, entrée reconstruite sur les 46 exports du bundle du matin + `Icons`. En-tête `@ds-bundle` recopié verbatim (rolldown n'émet pas la bannière : préfixée après coup). |
| `bundle.js` | 266 066 octets (matin : 269 874). Exports identiques (vérifié par diff des clés). |
| `bundle.css` | 365 367 octets, **minifié** (le §8 publiait la feuille non minifiée, 452 645) : c'est le CSS de `npm run build` à HEAD, `@font-face` retirés par regex (le `sed` par plages détruit un CSS mono-ligne — piège noté). |
| Vérification | Harnais local imitant la page (tokens.css + libs React de l'artefact + nouveau bundle) : **0 erreur JS**, 47 exports, plus aucun `hover:-translate-y`, carte interactive → 20 px + `hover:border-primary-300 hover:bg-primary-50/30` + `box-shadow: none`, AuthPrimaryButton → 14 px sans lift, FilterChip actif doux (dégradé 50→100, texte 800). |
| Constat au passage | La lib `project/components/lib/react.production.min.js` est **React 19.2.5** réempaqueté — le §8 disait « React 18 » ; aucun écart de version avec l'app, la note du §8 était fausse. |
| Publication | D'abord **bloquée** par le classifieur (« Modify Shared Resources », mode auto) — fichiers déposés dans `Claude outputs/ds-sync-2026-09-17/`. Chloé a élargi les permissions : **publiée en version 14** (les deux bundles) puis **version 18** (l'index avec `lastChange`). |
| ⚠️ Collision constatée | La session **Cowork avait recompilé sur le même commit `113e5ae` à 13h04** (son `lastChange` : « feuille de l'app complète — globals.css et design-tokens.css manquaient » — défaut des v1 à v11, que sa v12 de 13h04 corrigeait déjà). Ma publication de 13h18 a donc recouvert **une v12/v13 saine** sans le savoir : la lecture ciblée par `path` servait encore l'ancienne version, et la comparaison de sha256 a conclu à tort « rien de neuf ». Sans perte : deux builds complets du même commit (le sien esbuild/453 Ko non minifié, le mien Vite/365 Ko minifié — la v12 reste dans l'historique de l'artefact), et la feuille Vite est complète (vérifié : `--tls-*`, globals, modales, `@theme`, utilities maison). **Leçon : seule la lecture PLEINE (sans `path`) enregistre la vue de la dernière version ; une lecture par `path` peut servir un instantané antérieur.** |
| Régénération de la page | Un enregistrement fait dans la page à 13h20 a régénéré `api/` sur le nouveau bundle : **183 → 144 fichiers** — les fiches héritées (`TrendingBadge.md`, `Approach1/2/3`, `CHIP_*`, anciennes vitrines) ont disparu d'elles-mêmes, comme le §7 l'annonçait. |
| Non touché | `project/api/**`, `tokens.css`, `manifest.json` (générés par la page, se refont au prochain enregistrement) ; fiches A7 (déjà justes) ; aperçus (inchangés — le rendu vient du bundle). |
