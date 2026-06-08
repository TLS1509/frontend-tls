# Flow apprentissage (parcours → leçon → viewers) — audit + complétion

## Contexte
Projet : The Learning Society (frontend-tls) — React 19 · TS · Tailwind v4 · React Router 7 · Zustand 5 · Lucide.
**LIS D'ABORD `CLAUDE.md`** (règles strictes Tailwind/DS/preview). Le design system est **verrouillé** — on construit le produit dessus, on n'étend le DS que si un écran révèle un composant manquant.

## Objectif
Auditer puis compléter le **cœur daily-use : ouvrir un parcours → faire une leçon → consommer les viewers → revenir avec progression + XP/compétence**. Flow cohérent, câblé aux stores, testable.

## Source de vérité
- Spec : `01_Parcours_Learning_Space.md` (+ `01bis_Items_Apprentissage_Veille.md`)
- (Dépend du Passeport `02_Passeport_Competences.md` pour les compétences gagnées.)

## Référence visuelle (Figma DS)
Fichier `LccBZ1GKWQVwVzPtsSzk5Y`, page `📚 07 · Learning Paths` (section LP Series : LP-01→04 + lesson player 04a–g + viewers astuces/flashcards/ressources). Screenshot via MCP Figma.

## Périmètre (écrans)
Journey : LearningPaths (hub) → LearningPathDetail → positionnement → CourseDetail → LessonPlayer → viewers (Astuces / Flashcards / Complementary / Video) → retour parcours avec progression.

Fichiers : `src/pages/{LearningPaths,LearningPathDetail,CourseDetail,LessonPlayer,AstucesViewer,FlashcardsViewer,ComplementaryContentViewer,VideoViewer}.tsx` · `Positionnement.tsx`
Routes : voir `src/App.tsx` (`/learning-paths`, `/learning-paths/:id`, `/course/:id`, `/lesson/:id/...`).

## Stores à câbler
`useLessonProgressStore` (progression leçon) · `useReadingProgressStore` · `usePasseportStore` (compétences gagnées) · `useGamificationStore` (XP/badge). **Pas de MOCK en page — via les stores.** Live binding (call store dans le render, cf. CLAUDE.md Phase 17).

## Composants DS clés
`ParcoursCard`, `ResumeLessonCard`, `LessonCard`, `CourseCard`, `EtapeAccordion`, `QuizComponent` / `QuizQuestionCard`, `AstucesCard`, `Flashcard` / `FlipCard`, `ResourceListItem`, `LessonNavigation`, `ViewerHeader`, `ProgressBar` / `ProgressRing`, `StatusBadge`, `MetaPill`.

## Méthode
1. **Audit & gap-analysis** : lire spec, puis chaque écran. Tableau `écran → état actuel → manque → action`. **Présenter AVANT de coder.**
2. **Data** : vérifier types/mock dans `src/data/` (parcours, leçons, items). Ne rien inventer hors spec.
3. **Écrans (bottom-up : viewers → leçon → détail → hub)** : assembler les composants DS, tone-aware (warm pour les parcours), semantic spacing, mobile-first, min-h-touch.
4. **Wiring** : marquer leçon complétée → progression persiste, compétence ajoutée au passeport, XP/badge attribués. Reprise "Continuer" depuis le hub.
5. **Validation** : `npx tsc --noEmit` + `tsc -b` = 0. Tester via **MCP Claude_Preview** (375 + 1280) : hub → leçon → 1 viewer → quiz → retour avec progression visible.

## Contraintes
- Étendre le DS avant d'en créer ; nouveau composant → `Components.tsx` (usedBy) **+ sync Figma DS (`LccBZ1GKWQVwVzPtsSzk5Y`) + Notion, ou trace dans `DS-SYNC-TODO.md`** (cf. README §Sync DS).
- 100% Tailwind tokens, 0 inline style layout/couleur, rounded-pill, Lucide.
- Ne PAS toucher hors de ce flow. Commit par écran : `feat(learning): <écran>`.

## Outils
- **MCP Claude_Preview** (preview_start/eval/snapshot/console_logs/click/screenshot/resize) — vérif.
- **MCP Figma** (get_screenshot, fileKey `LccBZ1GKWQVwVzPtsSzk5Y`) — référence.
- Skill **`verify`** par écran ; **`/code-review`** avant commit ; **`impeccable`** si un viewer paraît plat.

## Definition of Done
Un apprenant ouvre un parcours, fait une leçon (player + ≥1 viewer + quiz), la progression + compétence + XP **persistent au reload**, navigation viewers fluide, 0 erreur tsc/build, testé preview 375 + 1280.

**Commence par l'audit & gap-analysis.**
