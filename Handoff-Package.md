# Handoff Package (Send as-is)

Share this package to start frontend-only design work safely.

## Read first
1. `Handoff-Start.md`
2. `DESIGN_SYSTEM.md`
3. `Cursor-Workflow.md`
4. `Page-Mapping.md`

## Startup prompt (copy in Cursor Composer)
Rôle: Agis en tant qu'expert Front-end React + TypeScript spécialisé pixel-perfect.

Contexte:
- Ce repo est en migration design statique (pas de dynamique/API).
- Respecte strictement `@DESIGN_SYSTEM.md`.
- Modifie uniquement les fichiers frontend ciblés via `@`.

Tâche:
1. Analyse la capture Figma jointe.
2. Modifie uniquement `@[fichier-cible.tsx]` et son style associé.
3. Respecte les tokens, espacements, radius, ombres, typo, hover/focus.
4. Ne supprime pas la logique métier existante.
5. Assure un rendu propre desktop + mobile.

Contraintes strictes:
- Interdit: backend/WordPress/plugins et branchement API.
- Favoriser composants existants (`Card`, `Button`, `Badge`, `ProgressBar`).
- Itérer par petits blocs (section par section).

Sortie attendue:
- Patch ciblé
- Résumé court
- Liste des fichiers modifiés
