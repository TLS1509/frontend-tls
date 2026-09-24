# Kit Claude Design — recompiler le design system publié

Le design system TLS publié dans Claude Design (artefact « The Learning Society Design System ») embarque une copie **compilée** des composants : `components/bundle.js`, `components/bundle.css`, un `preview.html` et un `<Nom>.d.ts` par composant. Cette copie ne suit pas le dépôt toute seule. Après tout changement d'un composant exposé, de `src/lib/tone-classes.ts`, de `src/index.css` ou de `src/styles/`, il faut la refaire.

Suivi et historique : `docs/_audits/SYNC-CLAUDE-DESIGN-2026-09-16.md`.

## Ce que fait chaque fichier

| Fichier | Rôle |
|---|---|
| `entries.json` | Les 27 cartes **écrites à la main** : fichier source, exports, cartes. Leur aperçu est dans `gen_previews.py` (ou `apercus-manuels/`), leur fiche d'usage est rédigée dans l'artefact. |
| `showcase.mjs` | L'inventaire de la **vitrine** `/components` : lit le tableau `COMPONENTS` de `src/pages/Components.tsx` (AST TypeScript) et le classement de `src/pages/components/registry.ts`. Chaque fiche qui n'est ni une convention ni une carte écrite à la main devient une carte (163 au 17/09). Sortie : `out/showcase.json`. |
| `build.mjs` | `bundle.js` (esbuild, un seul script classique, React lu sur `window`) : les cartes écrites à la main, les composants homonymes de la vitrine, et `Showcase` (le rendu de chaque fiche, `COMPONENTS` étant exposé à la compilation sans toucher au fichier). `jspdf` et `html2canvas` sont neutralisés. `bundle.css` : la vraie feuille de l'app, Tailwind v4 sur tout `src/`. |
| `build-react.mjs` | React et ReactDOM **de l'app** (19.x) en scripts classiques pour `components/lib/`. À relancer seulement si la version de React change. |
| `gen_previews.py` | Les `preview.html` : exemples choisis pour les 27 cartes (Button et Card dans `apercus-manuels/`), et pour les fiches de la vitrine un aperçu qui rejoue `Showcase[nom]` dans un routeur mémoire. |
| `dts.mjs` | Les types émis par `tsc` : un `<Nom>.d.ts` par carte écrite à la main, un seul `components/index.d.ts` pour la vitrine. |
| `render-check.mjs` | Le rendu de contrôle : imite le cadre d'aperçu de Claude Design, sort une capture et les erreurs JS par composant. Avec `FIX_HEIGHTS=1` (défaut de `npm run check`), écrit la hauteur mesurée dans le marqueur de chaque aperçu. |

## Procédure

1. **Compiler** (sur le Mac, depuis cette racine) :
   ```bash
   cd scripts/claude-design
   npm install            # une fois ; esbuild, Tailwind, TypeScript
   npm run build          # → out/components/
   ```
   Chaque script lit le dépôt deux crans au-dessus (`REPO=../..` par défaut) et prend le commit courant (`REF`) pour l'en-tête des types. Compiler sur un arbre **commité**, pour que le commit cité soit le vrai.

2. **Contrôler** : récupérer `tokens.json` et `fonts/` de l'artefact dans un dossier, puis
   ```bash
   npx playwright --version  # playwright doit être disponible
   DS=<ce dossier> npm run check
   ```
   Attendu : `0 erreur` hors `FlipCard` et `AstucesCard`, qui appellent une image distante (erreur réseau attendue, sans conséquence). Relire les captures de `out/check/` qui ont changé.

3. **Publier** (Claude, outil Artifact, sur l'artefact existant) : un appel avec seulement les fichiers changés sous `project/components/` (les `.d.ts` en `text/plain`), les fiches `README.md` si une règle a bougé, `tokens.json` si `src/index.css` a bougé, puis l'index `project/design-system.json` **en dernier**, relu juste avant, avec son `lastChange`.

4. **Catalogue** : les fichiers `api/`, `tokens.css` et `manifest.json` sont écrits par la page de l'artefact au premier enregistrement fait dedans. Ne jamais les écrire à la main. Un enregistrement demande une vraie modification dans la page (une note d'usage modifiée puis rétablie suffit). La page réécrit alors aussi `tokens.json` à sa façon (elle retire `name` et `meta`).

5. **Plafond** : un système Claude Design tient en 512 fichiers, catalogue généré compris. Au 17/09 : 459 fichiers propres (191 cartes). Chaque carte de vitrine en coûte deux (aperçu + fiche `api/` générée), chaque carte écrite à la main quatre. Il reste la place d'une vingtaine de cartes de vitrine.

## Pièges connus

- **Deux sessions sur le même artefact** : une publication est refusée si une autre session (ou la page) a publié entre-temps. Relire l'artefact (lecture sans chemin), vérifier ce qui a changé, puis republier. Ne jamais forcer.
- **Page ouverte = écrivain** : un onglet ouvert sur l'artefact peut enregistrer par-dessus une publication. Le fermer avant de publier.

- `src/index.css` importe `./styles/globals.css` en `@import url(...)`. Vite le résout, le plugin Tailwind seul non : `build.mjs` le réécrit et **échoue** s'il reste un `@import`. Sans ça, `design-tokens.css`, les styles de base et les keyframes des modales manquent aux aperçus (c'était le cas jusqu'à la version 11).
- Les `@font-face` en `/fonts/` sont retirés de `bundle.css` : les polices viennent de `tokens.json` de l'artefact.
- Le shell Linux de Cowork ne peut pas lancer les binaires macOS de `node_modules`. Depuis Cowork, compiler dans le cloud à partir d'un `git archive HEAD src`, puis supprimer l'archive.
- `out/` est ignoré par git, et donc aussi par le scan `@source` de Tailwind.
