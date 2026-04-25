# Handoff Start (Frontend Strict Only)

## Objectif
Tu prends en charge uniquement le design Frontend React en mode statique/pixel-perfect.
Le backend WordPress et les plugins sont hors scope.

## Règles strictes de contribution
- Tu ne modifies que le dossier `frontend/`.
- Tu ne touches jamais `wp-content/**`, `backend/**`, ni les plugins WordPress.
- Tu ne branches aucune API (pas de liaison WordPress/plugins dans cette phase).
- Tu gardes la logique métier existante et tu modifies uniquement le rendu UI/UX.

## Setup local
1. Cloner le repo.
2. Ouvrir uniquement le dossier `frontend/` dans Cursor.
3. Installer les dépendances:
   - `npm install`
4. Lancer le projet:
   - `npm run dev`
5. Vérifier le build avant livraison:
   - `npm run build`

## Workflow Git recommandé (strict)
- Branche dédiée: `feat/ui-<zone>-<date>`
- Commits petits et ciblés (par composant/section).
- Pas de commit hors `frontend/`.

## Conventions UI du projet
- Stack réelle: React + TypeScript + Vite.
- Styling principal: Design Tokens + CSS projet (pas Tailwind-only).
- Priorité: réutiliser composants existants avant d'en créer de nouveaux.

## Prompt de démarrage à copier dans Cursor (CMD + I)
Rôle: Agis en tant qu'expert Front-end React + TypeScript spécialisé pixel-perfect.

Contexte:
- Ce repo est en migration design statique (pas de dynamique/API).
- Tu dois respecter strictement le design system local dans `@DESIGN_SYSTEM.md`.
- Tu dois modifier uniquement les fichiers frontend ciblés via `@`.

Tâche:
1. Analyse la capture Figma fournie.
2. Modifie uniquement `@[fichier-cible.tsx]` et son style associé.
3. Respecte les tokens, espacements, radius, ombres, typo et états hover/focus.
4. Ne supprime pas la logique existante.
5. Assure un rendu propre desktop + mobile.

Contraintes strictes:
- Interdit: brancher API, modifier backend/WordPress/plugins.
- Favoriser: composants existants (`Card`, `Button`, `Badge`, etc.) et variables CSS.
- Itérer par petits blocs (header, hero, section, carte), jamais toute la page d'un coup.

Sortie attendue:
- Patch clair et limité.
- Explication courte des changements.
- Liste des fichiers modifiés.
