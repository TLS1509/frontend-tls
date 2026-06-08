# Flow journal de bord réflexif — audit + complétion

## Contexte
Projet : The Learning Society (frontend-tls) — React 19 · TS · Tailwind v4 · React Router 7 · Zustand 5 · Lucide.
**LIS D'ABORD `CLAUDE.md`**. Le design system est **verrouillé** — construire dessus, n'étendre qu'au besoin.

## Objectif
Auditer puis compléter le **journal réflexif** : créer une entrée guidée (type + humeur + questions structurées) ou libre, la retrouver, la rechercher. Court et autonome.

## Source de vérité
- Spec : `07_Journal_de_Bord_Reflexif.md`
- Dépendances : `02_Passeport` (triggers delta), `01_Parcours` (prompts liés leçon), `04_Coaching` (réflexions de session) — pour les déclencheurs, pas bloquant pour le MVP du flow.

## Référence visuelle (Figma DS)
Fichier `LccBZ1GKWQVwVzPtsSzk5Y`, page `📔 09 · Journal` (7 écrans : hub, detail, new, free, coach views). Screenshot via MCP Figma.

## Périmètre (écrans)
Journey : Journal (hub/liste) → JournalNewEntry (entrée guidée) ou JournalFreeEntry → JournalDetail → JournalSearch.

Fichiers : `src/pages/{Journal,JournalNewEntry,JournalFreeEntry,JournalDetail,JournalSearch}.tsx`
Routes : voir `src/App.tsx` (`/journal`, `/journal/new`, `/journal/entry/:id`, ...).

## Stores à câbler
`useJournalStore` (entrées : mood, tags, type, état draft/published). **Pas de MOCK en page — via le store.** Persistance localStorage.

## Composants DS clés (déjà extraits — réutiliser tels quels)
`MoodSelector` (ui/) · `JournalTypeTile` (cards/) · `JournalBubbleCard` (cards/, bulle Apple Messages) · `JournalChatCompose` (ui/) · `StructuredQuestionAccordion` (ui/) · `WritingPromptsAside` (patterns/) · `JournalEntryCard` (cards/) · `ActivityFeed` (patterns/).
⚠️ Ces composants viennent d'être extraits du code des pages — vérifier qu'ils sont bien câblés (pas de double implémentation inline résiduelle).

## Méthode
1. **Audit & gap-analysis** : lire spec, puis chaque écran. Tableau `écran → état actuel → manque → action`. **Présenter AVANT de coder.** Vérifier qu'aucune logique journal ne reste inline (elle a été extraite en composants).
2. **Data** : types/mock dans `src/data/` (entrées, types d'entrée, questions guidées).
3. **Écrans** : assembler les composants DS, tone warm (réflexion), semantic spacing, mobile-first, bubble borderless (cf. piège tail dans CLAUDE.md).
4. **Wiring** : créer une entrée (guidée + libre) → persiste, draft→publié, tags/mood enregistrés ; recherche/filtre branchés sur le store.
5. **Validation** : `npx tsc --noEmit` + `tsc -b` = 0. Tester via **MCP Claude_Preview** (375 + 1280).

## Contraintes
- Réutiliser les composants extraits ; nouveau composant → `Components.tsx` (usedBy).
- 100% Tailwind tokens, 0 inline style layout/couleur, rounded-pill, Lucide.
- Ne PAS toucher hors flow. Commit par écran : `feat(journal): <écran>`.

## Outils
- **MCP Claude_Preview** — vérif (snapshot, console_logs, click/fill, screenshot 375+1280).
- **MCP Figma** (get_screenshot, fileKey `LccBZ1GKWQVwVzPtsSzk5Y`) — référence.
- Skill **`verify`** par écran ; **`/code-review`** avant commit ; **`copywriting`** pour les prompts d'écriture/questions guidées.

## Definition of Done
Créer une entrée guidée (type + humeur + questions) ET une libre, recherche/filtre fonctionnels, draft→publié **persiste au reload**, 0 erreur tsc/build, preview 375 + 1280.

**Commence par l'audit & gap-analysis.**
