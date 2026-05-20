# Phase 19 — Audit qualité global (toutes pages learning app)

**Date** : 2026-05-20
**Méthode** : 2 Explore agents en parallèle (Tier 1 daily-use ~33 pages, Tier 2-3 ~109 pages). Scoring 5 dimensions (UX clarity, Visual polish, Code health, DS coverage, A11y), score 1-5, moyenne arithmétique.

---

## Headline

- **Total pages auditées** : 142 (33 Tier 1 + 109 Tier 2-3)
- **Pages excellentes (≥4.5)** : 9 — modèles à reproduire
- **Pages bonnes (4.0-4.4)** : 22
- **Pages passables (3.0-3.9)** : 95 — visibles cibles flow-by-flow
- **Pages critiques (<3.0)** : 16 — priorité haute

**Constat global** : Tier 1 (cœur métier daily-use) est globalement solide (avg ~4.2). Tier 2-3 est plus inégal, dominé par un score plancher 3.0 (3/3/3/4/2 répété) qui révèle 2 dettes systémiques transverses : **a11y faible (focus-visible, min-h-touch manquants partout)** et **DS sparsely adopté sur Auth/Error/edge flows**.

---

## Tier 1 — Daily-use (33 pages)

### Pages excellentes — modèles à dupliquer

| Page | Score | Pourquoi |
|------|------:|---------|
| AstucesViewer | 5.0 | Patterns DS appliqués, structure claire |
| ComplementaryContentViewer | 5.0 | Compact, léger, parfait |
| CoachingBookingFlow | 5.0 | Équilibre modal/form/slots, UX linéaire |
| Magazine | 5.0 | Sticky header, glass tokens, layout épuré |
| MagazineArticle | 5.0 | ReadingProgressBar/Ring, AuthorStrip |
| FlashcardsViewer | 4.8 | FlipCard DS utilisé, LessonContext intégré |
| VideoReels | 4.8 | Tone maps complètes, pas d'hex hardcodé |
| JournalDetail | 4.8 | KeyFindingCard + ReadingProgress excellents |
| XPDashboard | 4.8 | StatCard tone, ProgressBar labellisé |

### Pages prioritaires Tier 1 (score < 4.0)

| Page | LOC | Score | Issues |
|------|----:|------:|--------|
| **LearningSpace** | 310 | **3.0** | MOCK_ ×10, accès-control dispersé, gap-[468] ×2, 3 tones |
| **LessonPlayer** | 450 | **3.4** | style={{}} inline, LessonData local, gap-[468] |
| **JournalNewEntry** | 480 | **3.4** | LOC élevé, types dispersés, sub-components manquants |
| **VideoTutorial** | 270 | **3.4** | style={{}} radial gradient, structure à clarifier |
| **LearningPathDetail** | 420 | **3.6** | MOCK_ imports, gap-4 ×9 |
| MessagingThread | 320 | 3.8 | Message UI basique, pas focus-visible |
| Journal | 360 | 3.8 | Pas focus-visible |

### Issues transverses Tier 1 (par ordre de fréquence)

1. **Imports MOCK_ non-filtrés** — 10 pages importent `MOCK_*`/`SEED_*` directement (LearningSpace ×10, LearningPaths ×9, LearningPathDetail ×9). Devrait passer par store.
2. **`gap-4/6/8`** au lieu de `gap-stack/gap-section` — 8 occurrences éparses
3. **>2 tones par page** — Dashboard (primary+warm+sun pour 3 prompts), LearningPathDetail (4 overrides)
4. **`style={{}}` pour layout dynamique** — 5 cas (LessonPlayer grid-auto-fit, VideoViewer progress, VideoTutorial radial)
5. **Focus-visible absent** — MessagingThread, LessonPlayer, JournalNewEntry

---

## Tier 2-3 — Secondaires & edge (109 pages)

### Pages critiques (score < 3.0) — 16 pages

| Page | LOC | Score | Issues majeurs |
|------|----:|------:|---------------|
| **ComponentsLayout** | 515 | **2.0** | no-DS-use, oversize, layout custom inline |
| **CoachingCompteRendu** | 413 | **2.2** | no-DS-use, code custom hors patterns |
| **Error404** | 99 | **2.4** | no-DS-use, premier impression cassée |
| **Error500** | 71 | **2.4** | no-DS-use, fallback non polish |
| **Login** | 93 | **2.4** | no-DS-use (alors que AuthShell existe) |
| **ForgotPassword** | 72 | **2.4** | no-DS-use |
| **ResetPassword** | 99 | **2.4** | no-DS-use |
| **MagicLink** | 155 | **2.4** | no-DS-use |
| **Signup** | 111 | **2.6** | no-DS-use |
| **VerifyEmail** | 126 | **2.6** | no-DS-use |
| **PreCoachingQuestionnaire** | 146 | **2.6** | no-DS-use |
| **Messages** | 507 | **2.6** | Oversize, layout custom |
| **Components** (showcase) | 6361 | 2.8 | Oversize (acceptable, c'est la showcase) |
| **EvenementHub** | 242 | 2.8 | MOCK-heavy |
| **Onboarding** | 399 | 2.8 | Hiérarchie cassée, multi-step custom |
| **Positionnement** | 294 | 2.8 | Non-aligné avec OnboardingQuestionnaire |

### Pages Phase 17 (wired Zustand) — score 3.8

Toutes correctes, manque seulement focus-visible + min-h-touch :
- CoachEnterpriseDashboard, CorrectionDetailLearner, PurchaseCredits, MessagingThread, PrivacyDeleteAccount, PrivacyDsar

### Issues transverses Tier 2-3

1. **A11y critique** — 3.7% des pages (4/109) ont `min-h-touch`, 3% ont `focus-visible`. **Risque V1 majeur** : hit zones <44px, nav clavier cassée. → **Pattern transverse à corriger en début de phase 19** (utility CSS globale ou audit + ajout systématique).
2. **DS sparsely adopté** — 73% des pages avec <3 imports de composants DS. Auth, Error, Coach* et Events* dupliquent localement des layouts qui existent en patterns (AuthShell, EmptyState, EditorialHero).
3. **MOCK_* dependency rampant** — ~50% des pages importent MOCK_ directement, bloquant Phase 20 store wiring complet (Coach*, Enterprise*, Manager* notamment).
4. **Visual polish faible** — spacing inconsistent (mix `gap-stack` + `gap-4`), tons sous-utilisés (brand/danger/success tokens souvent ignorés).

---

## Patterns DS à rationaliser (issues transverses)

Identifiés croisés dans les 2 audits :

| Famille | Membres | Action proposée |
|---------|---------|----------------|
| **Auth components** | AuthShell, AuthField, AuthPasswordField, AuthSocialButton, AuthPrimaryButton, AuthSuccess | Intégrer dans les 7 pages Auth (Login/Signup/MagicLink/Forgot/Reset/Verify + Onboarding password). Aucune n'utilise actuellement AuthShell. |
| **Empty/Error states** | EmptyState, Error404/500 layouts custom | Créer pattern `ErrorPage` réutilisable, l'appliquer à Error404/500 + tous les empty states. |
| **StatCard variants** | StatCard tone vs variant mix | Standardiser `variant="default\|tinted\|brand\|warm\|sun"` au lieu de tone direct. |
| **EditorialHero tones** | tone="default\|warm\|sun\|brand" (4 tons) | Vérifier cohérence avec spec §1 (4 tones canoniques: primary/warm/sun/neutral). |
| **ButtonGroup** | Absent du DS | Créer pattern : Coaching/SessionDetail font du `flex gap-3` pour boutons trailing. |
| **Reader patterns** | ReadingProgressBar/Ring (JournalDetail, MagazineArticle, ArticleDetail) | Excellent. À dupliquer plus largement (lessons longues, articles, dossiers). |
| **A11y utility** | `min-h-touch` (44px), `focus-visible` styles | Définir 2 utilities globales (mixin/classes) à appliquer systématiquement aux interactives. |

---

## Top flows à prioriser (recommandation)

Synthèse des 2 audits — flows triés par impact UX × volume de pages affectées :

| Rang | Flow | Score moyen | Pages | Impact V1 | Justification |
|------|------|-----------:|------:|-----------|--------------|
| 1 | **🔐 Auth** | **2.5** | 7 (Login/Signup/Forgot/Reset/Verify/MagicLink + Onboarding password) | 🔴 Critique | First impression. Zero adoption AuthShell qui existe pourtant. |
| 2 | **🎯 Onboarding** | **2.9** | 5 (Onboarding/Questionnaire/Tutorial/Success/Positionnement) | 🔴 Critique | Drop-off direct. Pas de pattern progression cohérent. |
| 3 | **🚫 Error/fallback** | **2.4** | 3 (Error404/500/MagicLink) | 🟠 Haut | First impression failure pages. |
| 4 | **🎓 Coach family** (21 pages) | **2.9** | 21 (Coach*+CorrectionDetail+Messaging+Messages) | 🟠 Haut | Métier B2B. MOCK_USER_ID partout, DS sparse. |
| 5 | **📚 Learning core** | **3.5** | 6 (LearningPath\*/LessonPlayer/LearningSpace + viewers) | 🟡 Moyen | Cœur produit. Quelques gros fichiers, mocks à câbler. |
| 6 | **📝 Journal** | **4.0** | 5 (Journal/Detail/New/Free/Search) | 🟡 Moyen | Cohérent globalement. Juste polish JournalNewEntry. |
| 7 | **⚙️ Account & Privacy** | **3.0** | 6 (Account/Settings/Billing/SubPayment/ProfileConsent/Privacy*) | 🟡 Moyen | Settings UX moyen, pages courtes faciles à polir. |
| 8 | **🎉 Events** | **3.0** | 12 (Masterclass/Atelier/Evenement × Hub/Detail/Live/Recap/Survey) | 🟢 Bas | Quasi-uniformes, polish léger suffit. |
| 9 | **📁 Projects** | **3.0** | 7 (ProjectsList/Project + sub-pages) | 🟢 Bas | Codebase saine, DS bien intégré. |
| 10 | **🏢 Enterprise/Manager** | **3.0** | 9 (Enterprise*/Manager*) | 🟢 Bas | B2B mais moins de daily-use que Coach. |

---

## Recommandation de séquence Phase 19

**Phase 19.1 — Foundations transverses** (déblocant 100+ pages)
- Créer utility a11y globale (`focus-visible`, `min-h-touch`) → appliquer ESLint rule ou audit script
- Créer pattern `ErrorPage` (sera utilisé par 19.2)
- Vérifier `ButtonGroup` ou décider de garder `flex gap-3` comme convention

**Phase 19.2 — Auth + Error** (impact V1 immédiat — 10 pages, ~4h)
- Migrer 6 pages Auth vers AuthShell (toutes scorées 2.4-2.6)
- Refondre Error404/500 avec pattern ErrorPage
- Score cible : 4.5+ pour toutes

**Phase 19.3 — Onboarding flow** (cohérence drop-off — 5 pages, ~3h)
- Aligner Onboarding/Questionnaire/Tutorial/Success/Positionnement sur un même pattern de progression
- Intégrer ProgressDots ou Stepper canonique

**Phase 19.4 — Learning core** (refactor LOC + polish — 6 pages, ~5h)
- Splitter LearningPathDetail (772 LOC), LessonPlayer (678 LOC) en sous-composants
- Fix inline style LessonPlayer:376
- Centraliser MOCK_ via store

**Phase 19.5 — Coach family** (sous-dossier + polish — 21 pages, ~6h)
- Déplacer 21 pages dans `src/pages/coach/`
- Polish DS sur les pages avec score 2.6-3.0
- Évaluer fusion de pages quasi-jumelles (CoachJournal/Detail, etc.)

**Phase 19.6+ — flows restants par lots**
- Journal polish (~1h)
- Account & Privacy (~2h)
- Events polish (~2h)
- Projects polish (~1h)
- Enterprise polish (~2h)

**Total estimé** : ~26h sur ~6-8 sessions de travail.

---

## Pages-modèles à reproduire

Toutes ≥4.8. Étudier leur structure pour les flows à attaquer :

- `AstucesViewer.tsx`, `ComplementaryContentViewer.tsx` — viewers compacts élégants
- `MagazineArticle.tsx`, `JournalDetail.tsx` — long-form reading
- `CoachingBookingFlow.tsx` — multi-step form/modal
- `FlashcardsViewer.tsx`, `VideoReels.tsx` — interactive viewers tone-aware
- `XPDashboard.tsx`, `Magazine.tsx` — dashboard/hub patterns

---

**Sources**
- Tier 1 audit : agent Explore #1 — 33 pages
- Tier 2-3 audit : agent Explore #2 — 109 pages
- Notion delta : `AUDIT-PHASE-19-NOTION-DELTA.md` (sync préalable Étape 0 ✅)
