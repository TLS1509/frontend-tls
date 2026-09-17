# Kit Claude Design — recompiler le design system publié

Le design system TLS publié dans Claude Design (artefact « The Learning Society Design System ») embarque une copie **compilée** des composants : `components/bundle.js`, `components/bundle.css`, un `preview.html` et un `<Nom>.d.ts` par composant. Cette copie ne suit pas le dépôt toute seule. Après tout changement d'un composant exposé, de `src/lib/tone-classes.ts`, de `src/index.css` ou de `src/styles/`, il faut la refaire.

Suivi et historique : `docs/_audits/SYNC-CLAUDE-DESIGN-2026-09-16.md`.

## Ce que fait chaque fichier

| Fichier | Rôle |
|---|---|
| `entries.json` | La liste des composants exposés : fichier source, exports, cartes. Ajouter un composant = une ligne ici + un aperçu dans `gen_previews.py`. |
| `build.mjs` | `bundle.js` (esbuild, un seul script classique, React lu sur `window`) et `bundle.css` (la vraie feuille de l'app, Tailwind v4 sur tout `src/`). |
| `build-react.mjs` | React et ReactDOM **de l'app** (19.x) en scripts classiques pour `components/lib/`. À relancer seulement si la version de React change. |
| `gen_previews.py` | Les `preview.html` (exemples repris du showcase `/components`). Button et Card viennent de `apercus-manuels/`. |
| `dts.mjs` | Les types émis par `tsc`, un fichier par carte (documentation, jamais vérifiés). |
| `render-check.mjs` | Le rendu de contrôle : imite le cadre d'aperçu de Claude Design et sort une capture et les erreurs JS par composant. |

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
   Attendu : `0 erreur sur 28`. Relire les captures de `out/check/` qui ont changé.

3. **Publier** (Claude, outil Artifact, sur l'artefact existant) : un appel avec seulement les fichiers changés sous `project/components/` (les `.d.ts` en `text/plain`), les fiches `README.md` si une règle a bougé, `tokens.json` si `src/index.css` a bougé, puis l'index `project/design-system.json` **en dernier**, relu juste avant, avec son `lastChange`.

4. **Catalogue** : les fichiers `api/`, `tokens.css` et `manifest.json` sont écrits par la page de l'artefact au premier enregistrement fait dedans. Ne jamais les écrire à la main.

## Pièges connus

- `src/index.css` importe `./styles/globals.css` en `@import url(...)`. Vite le résout, le plugin Tailwind seul non : `build.mjs` le réécrit et **échoue** s'il reste un `@import`. Sans ça, `design-tokens.css`, les styles de base et les keyframes des modales manquent aux aperçus (c'était le cas jusqu'à la version 11).
- Les `@font-face` en `/fonts/` sont retirés de `bundle.css` : les polices viennent de `tokens.json` de l'artefact.
- Le shell Linux de Cowork ne peut pas lancer les binaires macOS de `node_modules`. Depuis Cowork, compiler dans le cloud à partir d'un `git archive HEAD src`, puis supprimer l'archive.
- `out/` est ignoré par git, et donc aussi par le scan `@source` de Tailwind.
