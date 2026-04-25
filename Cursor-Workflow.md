# Cursor Workflow (Design Pixel-Perfect)

## Raccourcis
- Composer: `CMD + I`
- Chat explicatif: `CMD + L`

## Méthode en 6 étapes
1. Ouvrir la page cible dans le navigateur (`npm run dev`).
2. Dans Composer, ajouter le contexte avec `@`:
   - `@DESIGN_SYSTEM.md`
   - `@src/pages/<Page>.tsx`
   - `@src/styles/<page-style>.css` (si présent)
3. Glisser la capture Figma.
4. Demander une seule sous-tâche (header, hero, cards, etc.).
5. Vérifier visuellement, puis itérer.
6. Finaliser quand la section est fidèle et responsive.

## Prompt type (section par section)
Rôle: Expert Front-end React + TypeScript pixel-perfect.

Contexte:
- Références: `@DESIGN_SYSTEM.md`, `@src/pages/<Page>.tsx`, `@src/styles/<style>.css`.
- Objectif: aligner la section suivante avec la capture jointe.

Instruction:
- Modifie uniquement cette section: `<nom-section>`.
- Respecte précisément spacing, radius, ombres, typo et états hover/focus.
- Réutilise les composants existants et les tokens CSS du projet.
- Ne touche pas au backend/API/plugins.

Livrable:
- Patch ciblé.
- Résumé court.
- Fichiers modifiés.

## Itérations recommandées
- "Décale le bloc CTA de 8px vers le bas."
- "Le hover du bouton doit être plus sombre."
- "Resserre l'espace vertical entre titre et sous-titre."
- "Passe les cartes en 1 colonne sur mobile < 768px."

## Anti-patterns à éviter
- Demander "fais toute la page" en un seul prompt.
- Introduire une nouvelle palette hors tokens.
- Modifier des fichiers non ciblés.
- Brancher l'API pendant la phase design.
