# Brief — suite du chantier design system & design de l'app (session suivante)

> Écrit le 2026-09-17 au soir, à la fin de la session « audit niveau agence → bascule ».
> À coller tel quel (ou par morceaux) comme prompt d'ouverture de la prochaine session.

---

Charge les skills `design:design-system`, `impeccable` et `web-design-guidelines`. Lis CLAUDE.md en entier, puis DESIGN.md. Méthode non négociable : **toute affirmation visuelle se mesure au navigateur avant d'être écrite** (contraste = canvas 1×1 composé ancêtre par ancêtre, jamais de regex sur `rgba()` — piège n°6 ter), les trois garde-fous (`check-handmade`, `check-token-coverage`, `check-showcase-coverage`) et `npm run build` avant ET après toute décision, commits en français narratif, un par décision. Quand tu cites un code de décision (R1–R4, S1/S2, option D…), développe-le : je ne les garde pas en tête.

## Où en est le système (état au commit `eb2b3c7`, poussé)

La journée du 17/09 a exécuté **la bascule** : l'app abandonne les remplissages saturés — `primary`, `secondary`, `accent`, `ghost` rendent un niveau **teinté** (fond 50/100, label 800, filet 600/700), le site marketing garde ses aplats via `emphasis="solid"` déclaré explicitement (36 appels). Le cran d'espacement **`stack-md` (20 px)** existe (p-5/py-5/gap-5 migrés ; `px-5` volontairement pas). **R2 est tranchée** (les conteneurs quittent 24 px sauf l'étage recouvrement : 66 conversions, 39 gardées avec raison, cas limites arbitrés). Le **cycle in situ** a vérifié chaque bouton sur son vrai fond composé sur 9 routes et corrigé 6 échecs réels. L'artefact Claude Design est resynchronisé sur `eb2b3c7` (v25, fiche Button réécrite). Historique : `docs/_audits/AUDIT-DS-NIVEAU-AGENCE-2026-09-17.md`, `docs/_audits/SYNC-CLAUDE-DESIGN-2026-09-16.md` (§10–12), et les cinq commits `ba8d255 · fb26a79 · ab9a50e · b0daf8d · eb2b3c7`.

Le banc de décisions interactif : https://claude.ai/artifact/7iMbxvaSzqac4QsXG1TRmj (verdicts en base, ids `decisions/*` — ne jamais renommer un id répondu). L'artefact DS : https://claude.ai/artifact/GZdpAtNwckgj6VbyxC1g2E.

## Chantier 1 — LE RENOMMAGE (la passe P0 de cette session)

La bascule a changé les niveaux **sous** les noms historiques : `primary` rend du teinté, `ghost` ≡ `outline` (doublon assumé temporaire). C'est tenable un jour, pas deux.

1. Promouvoir la grille **`emphasis` (solid · soft · outline · ghost · link) × `tone` (brand · warm · sun · danger · neutral)** comme API publique de `Button.tsx` ; `variant` devient l'alias déprécié (rétrocompat mappée, comme StatusBadge).
2. Migrer les appels app vers `emphasis`+`tone` (les `variant="primary"` etc. — grep d'inventaire d'abord, migration par vagues avec build entre chaque).
3. Résorber le doublon ghost≡outline (un seul niveau « filet sans fond », trancher son nom).
4. La passe **`px-5`** (61 occurrences, dont la map de tailles de Button) : le padding horizontal se juge avec la hauteur du cran.
5. Les 2 `glass-warm iconOnly` natifs de Coaching → `ghost` (relevé du cycle).
6. **Recaler la matrice Button du Figma** (`LccBZ1GKWQVwVzPtsSzk5Y`) sur les nouveaux niveaux — skill `figma-use` obligatoire, citer les node IDs inspectés, et poser la vraie couleur littérale EN PLUS de toute liaison de variable (piège du fallback gris).
7. Mettre à jour CLAUDE.md + DESIGN.md (doctrine boutons) et relancer le **render-check Playwright** du kit `scripts/claude-design/` avant la republication de l'artefact (le renommage touche l'API, contrairement au delta d'aujourd'hui).

## Chantier 2 — le dark mode, sur l'univers auth

Direction posée (mémoire `project_dark_mode_direction_auth`) : le fond candidat est **« nuit TLS » `#0D1A1E`** — la teinte du teal auth à la clarté d'`ink-950` (l'OKLCH à clarté constante préserve les contrastes), le radial des pages auth comme halo, la famille glass comme niveau doux (filet blanc/40, survol inversé). La **décision 5 « verre sombre »** est encore SANS verdict sur le banc — c'est moi qui tranche là-bas, relance-moi dessus avant de construire. Ne pas oublier : l'ancien dark mode a été supprimé le 28/07 parce qu'il posait du RGB brut interdit — le nouveau se construit sur la palette TLS uniquement.

## Chantier 3 — la grammaire de page (design holistique)

Proposition en attente de mon go : formaliser dans DESIGN.md une **grammaire de page à 5 zones** (datum sidebar↔page déjà appliqué et commité) et la piloter sur le Dashboard. S'y rattachent les P2 de la critique du 17/09 (23/40, tendance 21→23, instantané dans `.impeccable/critique/`) : scinder le feed « Pour toi / À explorer », micro-copies. Penser chaque section selon les règles design + accessibilité + engagement, « dans l'ensemble d'une page d'app ».

## Chantier 4 — les restes triés (petits, à caser)

- La famille **pastille d'icône ≥ 48 px** : 24 gardé par R2 à recaler en bloc (code + Figma), incohérence relevée MarketingMethode (48 px à 24) vs MarketingAccompagnement (56 px à 14, commentaire argumenté).
- La question **contour des champs** sous 3:1 (SC 1.4.11 — relevé du cycle, jamais tranché).
- `AuthPrimaryButton` vs `<Button onDark>` : que fait le premier que le second ne ferait pas ? (question ouverte de CLAUDE.md).
- Les liseurs de `PageCard` : la racine à 14 pose la question de son étage (carte → 20 ?).

## Gates de fin

`npm run build` + les trois garde-fous, avant/après. Commits français narratifs terminés par `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`, push sur `origin/main`.
