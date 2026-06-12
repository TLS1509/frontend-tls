# Flow onboarding new-user — audit + complétion end-to-end

## Contexte
Projet : The Learning Society (frontend-tls) — EdTech, React 19 · TS · Tailwind v4 (CSS-first) · React Router 7 · Zustand 5 · Lucide.
**LIS D'ABORD `CLAUDE.md`** (règles strictes : 100% Tailwind via tokens @theme, composants DS, tokens spacing sémantiques, pas d'inline style layout/couleur, vérif preview obligatoire).

Le design system est complet et stable (141 component sets, tokens, 100% Tailwind, build clean) — **NE PAS le redessiner**. On construit le PRODUIT par-dessus.

## Objectif
Auditer puis compléter le **parcours onboarding new-user de bout en bout**, en assemblant les composants DS existants. Pas une refonte visuelle : un flow cohérent, câblé aux stores, testable.

## Source de vérité (à lire avant de coder)
- Spec : `CDC/03_Onboarding_and_User_Profile_Mapping.md` (ou racine `03_Onboarding_and_User_Profile_Mapping.md`)
- User journey : `User_Journeys/11bis_Subscription_Management/UJ-1_Apprenant_Individuel_Sélection_Plan_en_Onboarding.md`

## Référence visuelle (Figma DS)
Le flow existe déjà en Figma : fichier `LccBZ1GKWQVwVzPtsSzk5Y`, page `🚀 05 · Onboarding` (2 sections : Auth Flow v3 + Onboarding Parcours Individuel). Screenshot-la via le MCP Figma comme cible visuelle.

## Périmètre (écrans existants à auditer/compléter)
Journey cible : Signup → Welcome → Questionnaire de profilage → Positionnement (auto-éval Dreyfus) → Sélection plan/Paiement → Tutorial → Success → Dashboard (1ère visite).

Fichiers :
- `src/pages/Signup.tsx`
- `src/pages/Onboarding.tsx` — /onboarding
- `src/pages/OnboardingQuestionnaire.tsx` — /onboarding/questionnaire
- `src/pages/Positionnement.tsx` — /learning-paths/:id/positionnement
- `src/pages/SubscriptionPayment.tsx` — /onboarding/payment
- `src/pages/OnboardingTutorial.tsx` — /onboarding/tutorial
- `src/pages/OnboardingSuccess.tsx` — /onboarding/success
- `src/pages/Dashboard.tsx` — état first-time
Routes : voir `src/App.tsx`.

## Stores à câbler (existants, src/stores/)
`useUserProfileStore` (profil, rôle, tier, état onboarding) · `usePositioningStore` (réponses Dreyfus) · `usePasseportStore` (compétences) · `useGamificationStore` (1er badge/XP). Persistés (localStorage). **Pas de MOCK importé en page — passer par les stores.**

## Composants DS clés
`EditorialHero`, `AuthShell` (+ AuthField/AuthSuccess/AuthBackLink), `MultiStepForm`, `OptionGrid`, `DreyfusSlider`, `DreyfusLevelSelector`, `BehavioralTileGrid`, `StepTutorial`, `CongratulationsCard`, `ResumeLessonCard`.

## Méthode (dans cet ordre)
1. **Audit & gap-analysis** : lire spec + journey, puis chaque écran. Tableau `écran → état actuel → manque (data/composant/wiring/UX) → action`. **Présenter AVANT de coder.**
2. **Journey/état** : state machine onboarding (étapes, conditions de passage, reprise). Vérifier un `onboardingStep` tracké dans `useUserProfileStore`.
3. **Écrans (bottom-up : détail → hub)** : compléter/câbler avec les composants DS. Mobile-first, tokens spacing sémantiques, min-h-touch 44px.
4. **Wiring** : écritures store à chaque étape, persistance vérifiée (reload → état conservé). Navigation conditionnelle (individuel vs entreprise).
5. **Validation** : `npx tsc --noEmit` + `tsc -b` = 0 erreur. Tester le flow complet via le **MCP Claude_Preview** (mobile 375 + desktop 1280) : Signup → Dashboard sans glitch.

## Contraintes
- Réutiliser/ÉTENDRE les composants DS avant d'en créer ; tout nouveau composant → entrée dans `src/pages/Components.tsx` (usedBy) **+ sync Figma DS (`LccBZ1GKWQVwVzPtsSzk5Y`) + Notion, ou trace dans `DS-SYNC-TODO.md`** (cf. README §Sync DS).
- 100% Tailwind tokens, 0 inline style layout/couleur, rounded-pill, Lucide.
- Ne PAS toucher aux pages hors de ce flow.
- Commit par étape validée : `feat(onboarding): <écran/étape>`.

## Outils à utiliser
- **MCP Claude_Preview** (`preview_start`, `preview_eval`, `preview_snapshot`, `preview_console_logs`, `preview_click`, `preview_fill`, `preview_screenshot`, `preview_resize`) — boucle de vérif.
- **MCP Figma** (`get_screenshot`, fileKey `LccBZ1GKWQVwVzPtsSzk5Y`) — référence visuelle.
- Skill **`verify`** à la fin de chaque écran ; **`/code-review`** avant commit ; **`impeccable`** si un écran paraît générique.

## Definition of Done
Un new-user va de Signup au Dashboard first-time, son profil + positionnement + plan persistent au reload, le 1er badge est attribué, 0 erreur TS/build, flow testé en preview mobile + desktop.

**Commence par l'étape 1 (audit & gap-analysis) et présente le tableau avant de coder.**
