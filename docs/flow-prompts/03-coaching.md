# Flow coaching 1-1 (booking + messagerie + corrections) — audit + complétion

## Contexte
Projet : The Learning Society (frontend-tls) — React 19 · TS · Tailwind v4 · React Router 7 · Zustand 5 · Lucide.
**LIS D'ABORD `CLAUDE.md`**. Le design system est **verrouillé** — construire dessus, n'étendre qu'au besoin.

## Objectif
Auditer puis compléter le **coaching 1-1** : réserver une session, la consulter, lire les corrections du coach, échanger en messagerie. Côté coach : voir ses apprenants. Flow câblé aux stores, testable.

## Source de vérité
- Spec : `04_Coaching_and_1-1_Messaging.md`
- Dépend de `02_Passeport` (contexte apprenant) et `01_Parcours` (entités à corriger). Bloque `07_Journal` (réflexions auto-déclenchées).

## Référence visuelle (Figma DS)
Fichier `LccBZ1GKWQVwVzPtsSzk5Y`, page `🎯 08 · Coaching` (section CO Series : CO-01 hub, CO-02 booking, CO-03 session, CO-04 corrections, CO-05 messages, CO-06 coach dashboard). Screenshot via MCP Figma.

## Périmètre (écrans)
Journey apprenant : Coaching (hub) → CoachingBookingFlow → CoachingSessionDetail → CoachingCorrections → Messages (fil 1-1).
Côté coach : CoachDashboard → liste apprenants.

Fichiers : `src/pages/{Coaching,CoachingBookingFlow,CoachingSessionDetail,CoachingCorrections,CoachingCompteRendu,Messages,CoachDashboard}.tsx` · `PreCoachingQuestionnaire.tsx`
Routes : voir `src/App.tsx` (`/coaching`, `/coaching/booking`, `/coaching/session/:id`, `/coaching/corrections`, `/coaching/messages/:coachId`, `/coach/dashboard`).

## Stores à câbler
`useCoachingStore` (sessions, corrections, messages). **Patterns CLAUDE.md Phase 17 obligatoires** :
- **seed-on-first-access** (seed depuis MOCK_* dans le store, jamais d'import MOCK en page)
- **route param = clé de sélection** (`coachId` → `sessions.find(s => s.coachId === coachId) ?? sessions[0]`)
- **live binding** (call `store.getX()` dans le render, pas de snapshot useState)

## Composants DS clés
`CompetencyRadar`, `CorrectionCard`, `SessionCard`, `ProfileCard`, `MessageBubble` (ui/, extrait), `ConversationalChat` (patterns/, extrait), `BookingModal`, `StatCard`, `Tabs`, `Avatar`, `MetaPill`.
⚠️ MessageBubble + ConversationalChat viennent d'être extraits — réutiliser, pas réimplémenter inline.

## Méthode
1. **Audit & gap-analysis** : lire spec, puis chaque écran. Tableau `écran → état actuel → manque → action`. **Présenter AVANT de coder.**
2. **Data** : `useCoachingStore` + types (sessions, correction polymorphe Formation.Mission/Project.Task/JAC, message thread).
3. **Écrans (bottom-up : session/correction/message → hub → coach dashboard)** : tone brand (apprenant) + warm (session) max 2 tones, semantic spacing, mobile-first, min-h-touch.
4. **Wiring** : réserver une session (persiste), lire une correction (statut lu), envoyer un message (thread persiste). Vue coach dérive des mêmes données store.
5. **Validation** : `npx tsc --noEmit` + `tsc -b` = 0. Tester via **MCP Claude_Preview** (375 + 1280) : booking → session → correction → message, reload → état conservé.

## Contraintes
- Réutiliser/ÉTENDRE le DS ; nouveau composant → `Components.tsx` (usedBy) **+ sync Figma DS (`LccBZ1GKWQVwVzPtsSzk5Y`) + Notion, ou trace dans `DS-SYNC-TODO.md`** (cf. README §Sync DS).
- 100% Tailwind tokens, 0 inline style layout/couleur, rounded-pill, Lucide.
- Ne PAS toucher hors flow. Commit par écran : `feat(coaching): <écran>`.

## Outils
- **MCP Claude_Preview** — vérif (snapshot, console_logs, click/fill, screenshot 375+1280).
- **MCP Figma** (get_screenshot, fileKey `LccBZ1GKWQVwVzPtsSzk5Y`) — référence.
- Skill **`verify`** par écran ; **`/code-review`** avant commit ; **`impeccable`** si la messagerie/dashboard paraît plat.

## Definition of Done
Réserver une session, lire une correction, envoyer un message — tout **persiste au reload** ; la vue coach affiche les apprenants depuis le même store ; 0 erreur tsc/build ; preview 375 + 1280.

**Commence par l'audit & gap-analysis.**
