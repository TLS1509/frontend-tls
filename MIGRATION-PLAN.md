# MIGRATION-PLAN.md — Migration Tailwind CSS : The Learning Society

**Objectif :** Remplacer 2 105 inline styles + classes BEM par des classes Tailwind mappées
**Approche :** 1 composant/page par commit · validation obligatoire après chaque étape
**Stratégie (depuis Phase 2.6) :** **bottom-up** — migrer les primitives partagées (Badge, ProgressBar, Avatar…) AVANT les composites parents. Évite les regressions visuelles silencieuses dans les composants déjà migrés (ex. ParcoursCard avec InlineProgress encore BEM = progress bar cassée).
**Légende :** ⬜ à faire · 🔄 en cours · ✅ validé · ❌ problème

---

## PHASE 0 — Setup (prérequis)

| # | Tâche | Fichier | Statut |
|---|-------|---------|--------|
| 0.1 | Compléter tailwind.config.js (fontFamily, fontSize supplémentaires) | `tailwind.config.js` | ✅ |
| 0.2 | Tester npm run dev — page Dashboard visible | — | ✅ |
| 0.3 | Créer ce fichier MIGRATION-PLAN.md dans le projet | `MIGRATION-PLAN.md` | ✅ |
| 0.4 | Créer CLAUDE.md avec les règles de migration | `CLAUDE.md` | ✅ |

---

## PHASE 0.5 — Vérification visuelle tailwind.config.js

**Objectif :** Confirmer que chaque token Tailwind mappé dans `tailwind.config.js` se traduit correctement avant de commencer la migration.

**Méthode :** Créer une page de test temporaire `src/pages/TailwindCheck.tsx` avec route `/tailwind-check` qui affiche une palette visuelle complète.

| Groupe | Tokens à vérifier | Visuel attendu |
|--------|------------------|----------------|
| Couleurs primary | `bg-primary-50` → `bg-primary-900` | Gradient bleu clair → foncé |
| Couleurs secondary | `bg-secondary-50` → `bg-secondary-900` | Gradient orange clair → foncé |
| Couleurs accent | `bg-accent-50` → `bg-accent-900` | Gradient jaune clair → foncé |
| Couleurs ink | `bg-ink-0` → `bg-ink-950` | Gradient blanc → noir |
| Typographie | `text-h1` → `text-micro` | Tailles visiblement croissantes |
| Ombres | `shadow-xs` → `shadow-lg` | Ombres progressives |
| Rayons | `rounded-sm` → `rounded-2xl` | Coins de plus en plus ronds |
| Polices | `font-display`, `font-body`, `font-mono` | 3 familles visuellement distinctes |

**Statut :** ⬜
**Condition de validation :** Chaque swatch visuellement distinct, aucun token silencieusement absent → confirmer avec screenshot.
**Si problème :** Corriger `tailwind.config.js` avant de passer à Phase 1.

---

## PHASE 1 — Composants Core (impact maximal — partout dans l'app)

| # | Composant | Fichier | Inline styles | CSS BEM | Statut |
|---|-----------|---------|--------------|---------|--------|
| 1.1 | Button | `src/components/core/Button.tsx` | ~0 | `.btn--*` (8 variants) | ✅ |
| 1.2 | Card | `src/components/core/Card.tsx` | ~5 | `.card--*` (6 variants) | ✅ |
| 1.3 | Input | `src/components/core/Input.tsx` | ~8 | `.input--*` | ✅ |
| 1.4 | Select | `src/components/core/Select.tsx` | ~5 | `.select--*` | ✅ |
| 1.5 | FormGroup | `src/components/core/FormGroup.tsx` | ~3 | `.form-group` | ✅ |

**Validation obligatoire après chaque composant** — screenshot + npm run dev + tsc

---

## PHASE 2 — Composants UI spécialisés (priorité moyenne)

**⚠️ NOTE :** Dashboard a été déplacé à Phase 8 car elle dépend de beaucoup de composants Card spécialisés non migrés (CourseCard, ParcoursCard, KPICard, StatCard, SurfaceCard, ResourceCard, GlassCard, etc.). Migrer ces composants d'abord.

| # | Composant | Fichier | Inline styles | Statut |
|---|-----------|---------|--------------|--------|
| 2.1 | StatCard | `src/components/ui/StatCard.tsx` | ~15 | ✅ |
| 2.2 | GlassCard | `src/components/ui/GlassCard.tsx` | ~10 | ✅ |
| 2.3 | SurfaceCard | `src/components/ui/SurfaceCard.tsx` | ~8 | ✅ |
| 2.4 | CourseCard | `src/components/ui/CourseCard.tsx` | ~20 | ✅ |
| 2.5 | ParcoursCard (patterns) | `src/components/patterns/ParcoursCard.tsx` | ~18 | ✅ |

**Validation** — chaque card affiche correctement avec tous ses variants et tones

**📌 Post-migration TODO (Phase 9 cleanup) :**
- Consolider `GlassCard` et `SurfaceCard` dans `Card.tsx` (recouvrement total avec `variant: glass|elevated|...` + `tone: brand|warm|...`).
- Consolider `InlineProgress` dans `ProgressBar` avec `layout: 'stacked'|'inline'` (partagent ~70% de logique, séparés actuellement pour éviter API confuse).
À faire une fois que tous les call sites sont migrés et visibles.

---

## PHASE 2.6 — Primitives partagées (bottom-up) ⭐ priorité

**Pourquoi en priorité :** ces atomes sont consommés partout (cards, modales, pages). Les migrer en premier débloque visuellement tous les composites déjà migrés ET évite les regressions silencieuses dans la suite (Phase 3 modales hériteront de Badge/Avatar Tailwind clean).

| # | Composant | Fichier | Consommé par | Statut |
|---|-----------|---------|--------------|--------|
| 2.6.1 | Badge | `src/components/ui/Badge.tsx` | Cards, modales, listes | ✅ |
| 2.6.2 | MetaPill | `src/components/ui/MetaPill.tsx` | MetaPillGroup, status indicators | ✅ |
| 2.6.2b | Pill (nouveau) | `src/components/ui/Pill.tsx` | À adopter par Login/Signup/Help/LearningPathDetail/VideoReels (consolide `tls-pill`, `learning-path-hero-pill`, `video-reels__counter-pill`) | ✅ |
| 2.6.3 | MetaPillGroup | `src/components/ui/MetaPillGroup.tsx` | ParcoursCard, learning cards | ✅ |
| 2.6.4 | ProgressBar | `src/components/ui/ProgressBar.tsx` | Dashboard, profil, learning | ✅ |
| 2.6.5 | InlineProgress | `src/components/patterns/InlineProgress.tsx` | ParcoursCard (fixe progress bar visible) | ✅ |
| 2.6.5b | SkillBar | `src/components/ui/SkillBar.tsx` | Profile, learning paths | ✅ |
| 2.6.5c | GoalProgress | `src/components/ui/GoalProgress.tsx` | Profile, dashboard goals | ✅ |
| 2.6.6 | Avatar + AvatarGroup | `src/components/ui/Avatar.tsx` | Modales, profils, instructeurs | ✅ |
| 2.6.7 | Alert | `src/components/ui/Alert.tsx` | Pages auth, settings, formulaires | ✅ |
| 2.6.8 | Skeleton | `src/components/ui/Skeleton.tsx` | Loading states partout | ✅ |

**Validation** — chaque primitive autonome (testable isolément) ; pas de revisit de parents nécessaire.

---

## PHASE 3 — Modales (composants haute visibilité)

| # | Composant | Fichier | Inline styles | Statut |
|---|-----------|---------|--------------|--------|
| 3.1 | BookingModal | `src/components/modals/BookingModal.tsx` | 36 | ✅ |
| 3.2 | PositionnementModal | `src/components/modals/PositionnementModal.tsx` | 34 | ✅ |
| 3.3 | SuccessModal | `src/components/modals/SuccessModal.tsx` | ~10 | ✅ |
| 3.4 | VideoPlayerModal | `src/components/modals/VideoPlayerModal.tsx` | 17 | ✅ |
| 3.5 | StreakCelebrationModal | `src/components/modals/StreakCelebrationModal.tsx` | 20 | ✅ |
| 3.6 | SessionFeedbackModal | `src/components/modals/SessionFeedbackModal.tsx` | 13 | ✅ |
| 3.7 | CancelSessionModal | `src/components/modals/CancelSessionModal.tsx` | 16 | ✅ |
| 3.8 | ConfirmModal | `src/components/modals/ConfirmModal.tsx` | ~5 | ✅ |

---

## PHASE 4 — Pages Learning (cœur de la plateforme)

| # | Page | Fichier | Inline styles | Statut |
|---|------|---------|--------------|--------|
| 4.1 | LearningPathDetail | `src/pages/LearningPathDetail.tsx` | 95 → 0 | ✅ |
| 4.2 | LearningPaths | `src/pages/LearningPaths.tsx` | ~35 → 0 | ✅ |
| 4.3 | LearningSpace | `src/pages/LearningSpace.tsx` | 63 → 0 | ✅ |
| 4.4 | LessonPlayer | `src/pages/LessonPlayer.tsx` | 42 → 1 | ✅ |
| 4.5 | Réussites / Profile | `src/pages/Profile.tsx` | 47 → 0 | ✅ |

---

## PHASE 5 — Composants UI (par ordre de fréquence d'usage)

> Note : Badge, Avatar, Alert, ProgressBar, InlineProgress, MetaPillGroup, Skeleton sont **déplacés en Phase 2.6** (priorité bottom-up). StatCard, GlassCard, ParcoursCard, CourseCard sont déjà faits en Phase 2.

| # | Composant | Fichier | Statut |
|---|-----------|---------|--------|
| 5.6 | Medal | `src/components/ui/Medal.tsx` | ✅ |
| 5.7 | Toast | `src/components/ui/Toast.tsx` | ✅ |
| 5.8 | Modal | `src/components/ui/Modal.tsx` | ✅ |
| 5.9 | EmptyState | `src/components/ui/EmptyState.tsx` | ✅ |
| 5.10 | IconFeatureCard | `src/components/ui/IconFeatureCard.tsx` | ✅ |
| 5.12 | ParcoursCard (ui) | `src/components/ui/ParcoursCard.tsx` | ✅ |
| 5.13 | KPICard | `src/components/ui/KPICard.tsx` | ✅ |
| 5.14 | CompetenceBadge | `src/components/ui/CompetenceBadge.tsx` | ✅ |
| 5.15 | ProfileCard | `src/components/ui/ProfileCard.tsx` | ✅ |
| 5.17 | ResourceCard | `src/components/ui/ResourceCard.tsx` | ✅ |
| 5.18 | ActionCard | `src/components/ui/ActionCard.tsx` | ✅ |
| 5.19 | Tabs | `src/components/ui/Tabs.tsx` | ✅ |
| 5.20 | Pagination | `src/components/ui/Pagination.tsx` | ✅ |
| 5.21 | Stepper | `src/components/ui/Stepper.tsx` | ✅ |
| 5.22 | Steps | `src/components/ui/Steps.tsx` | ✅ |
| 5.23 | FilterChip | `src/components/ui/FilterChip.tsx` | ✅ |
| 5.24 | Search | `src/components/ui/Search.tsx` | ✅ |
| 5.25 | Breadcrumb | `src/components/ui/Breadcrumb.tsx` | ✅ |
| 5.26 | Divider | `src/components/ui/Divider.tsx` | ✅ |
| 5.27 | Tag | `src/components/ui/Tag.tsx` | ✅ |
| 5.28 | Spinner | `src/components/ui/Spinner.tsx` | ✅ |
| 5.29 | SectionTitle | `src/components/ui/SectionTitle.tsx` | ✅ |
| 5.30 | MetaItem | `src/components/ui/MetaItem.tsx` | ✅ |
| 5.31 | StatusBadge | `src/components/ui/StatusBadge.tsx` | ✅ |
| 5.32 | NotificationBadge | `src/components/ui/NotificationBadge.tsx` | ✅ |
| 5.33 | TrendingBadge | `src/components/ui/TrendingBadge.tsx` | ✅ |
| 5.34 | UserInfo | `src/components/ui/UserInfo.tsx` | ✅ |
| 5.35 | Achievement | `src/components/ui/Achievement.tsx` | ✅ |
| 5.36 | AchievementBadge | `src/components/ui/AchievementBadge.tsx` | ✅ |
| 5.37 | MasteryBadge | `src/components/ui/MasteryBadge.tsx` | ✅ |
| 5.38 | ActivityItem | `src/components/ui/ActivityItem.tsx` | ✅ |
| 5.39 | CompetencyMatrix | `src/components/ui/CompetencyMatrix.tsx` | ✅ |
| 5.40 | QuizComponent | `src/components/ui/QuizComponent.tsx` | ✅ |
| 5.41 | Celebration + InlineWin | `src/components/ui/Celebration.tsx` | ✅ |
| 5.42 | DropdownMenu (Menu/Item/Label/Sep) | `src/components/ui/DropdownMenu.tsx` | ✅ |
| 5.43 | ProgressRing | `src/components/ui/ProgressRing.tsx` | ✅ |
| 5.44 | BackgroundBlobs (décoratif, animation runtime) | `src/components/ui/BackgroundBlobs.tsx` | ✅ |
| 5.45 | ToastContainer | `src/components/ui/ToastContainer.tsx` | ✅ |

---

## PHASE 6 — Composants Patterns

| # | Composant | Fichier | Statut |
|---|-----------|---------|--------|
| 6.1 | CardGrid | `src/components/patterns/CardGrid.tsx` | ✅ (déjà sans inline) |
| 6.2 | HeroSection | `src/components/patterns/HeroSection.tsx` | ✅ |
| 6.3 | ActivityFeed | `src/components/patterns/ActivityFeed.tsx` | ✅ (déjà sans inline) |
| 6.4 | CoachCardGrid | `src/components/patterns/CoachCardGrid.tsx` | ✅ (déjà sans inline) |
| 6.5 | LearningPathGrid | `src/components/patterns/LearningPathGrid.tsx` | ✅ (déjà sans inline) |
| 6.6 | PageHeader | `src/components/patterns/PageHeader.tsx` | ✅ |
| 6.7 | ToneAwareCard | `src/components/patterns/ToneAwareCard.tsx` | ✅ |
| 6.8 | HeaderNav | `src/components/patterns/HeaderNav.tsx` | ✅ |
| 6.9 | PageHeaderSimple | `src/components/patterns/PageHeaderSimple.tsx` | ✅ |
| 6.10 | SectionHeader | `src/components/patterns/SectionHeader.tsx` | ✅ |
| 6.11 | SettingsSection | `src/components/patterns/SettingsSection.tsx` | ✅ |
| 6.12 | DataTable | `src/components/patterns/DataTable.tsx` | ✅ |
| 6.13 | ActionCardGrid | `src/components/patterns/ActionCardGrid.tsx` | ✅ |
| 6.14 | DashboardHero | `src/components/patterns/DashboardHero.tsx` | ✅ |
| 6.15 | ActivityFeed | `src/components/patterns/ActivityFeed.tsx` | ✅ |
| 6.16 | ActivityTimeline | `src/components/patterns/ActivityTimeline.tsx` | ✅ |
| 6.17 | BreadcrumbNav | `src/components/patterns/BreadcrumbNav.tsx` | ✅ |
| 6.18 | CoachCardGrid | `src/components/patterns/CoachCardGrid.tsx` | ✅ |
| 6.19 | FormLayout | `src/components/patterns/FormLayout.tsx` | ✅ |
| 6.20 | LearningPathHeader | `src/components/patterns/LearningPathHeader.tsx` | ✅ |
| 6.21 | LearningPathGrid | `src/components/patterns/LearningPathGrid.tsx` | ✅ |
| 6.22 | MultiStepForm | `src/components/patterns/MultiStepForm.tsx` | ✅ |
| 6.23 | ResourceCardGrid | `src/components/patterns/ResourceCardGrid.tsx` | ✅ |
| 6.24 | SearchWithFilters | `src/components/patterns/SearchWithFilters.tsx` | ✅ |
| 6.25 | VeilleCardFeed | `src/components/patterns/VeilleCardFeed.tsx` | ✅ |
| 6.26 | QuizQuestionCard | `src/components/patterns/QuizQuestionCard.tsx` | ✅ |
| 6.27 | RatingModal | `src/components/patterns/RatingModal.tsx` | ✅ |
| 6.28 | TabsWithContent | `src/components/patterns/TabsWithContent.tsx` | ✅ |
| 6.29 | PageCard / Flashcard | exceptions (BEM page-spécifique + 3D transform) | ⬜ |

---

## PHASE 7 — Composants Learning

| # | Composant | Fichier | Statut |
|---|-----------|---------|--------|
| 7.1 | SessionCard | `src/components/learning/SessionCard.tsx` | ✅ (sans inline) |
| 7.2 | LessonCard | `src/components/learning/LessonCard.tsx` | ✅ (sans inline) |
| 7.3 | ArticleCard | `src/components/learning/ArticleCard.tsx` | ✅ (sans inline) |
| 7.4 | VideoCard | `src/components/learning/VideoCard.tsx` | ✅ (sans inline) |
| 7.5 | ProjectCard | `src/components/learning/ProjectCard.tsx` | ✅ (sans inline) |
| 7.6 | MagazineCard | `src/components/learning/MagazineCard.tsx` | ✅ |
| 7.7 | MessageThreadCard | `src/components/learning/MessageThreadCard.tsx` | ✅ |
| 7.8 | PromptCard | `src/components/learning/PromptCard.tsx` | ✅ |
| 7.9 | RankingCard | `src/components/learning/RankingCard.tsx` | ✅ |
| 7.10 | StepCard | `src/components/learning/StepCard.tsx` | ✅ (1 runtime style — exception progress) |
| 7.11 | ParcoursCard (learning) | `src/components/learning/ParcoursCard.tsx` | ✅ (1 runtime style — exception progress) |

**Note Phase 7 (2026-05-07) :** Tous les composants Learning étaient encore BEM avec CSS files dédiés malgré le statut "déjà sans inline" précédent. Migration complète Tailwind effectuée : SessionCard, LessonCard, ArticleCard, VideoCard, ProjectCard, StepCard, ParcoursCard. 7 fichiers `.css` BEM supprimés.

---

## PHASE 8 — Pages principales (51 pages restantes, incluant Dashboard)

Après phases 1-7, migrer les pages dans cet ordre :

| # | Page | Inline styles | Statut | Priorité |
|---|------|--------------|--------|----------|
| 8.1 | **Dashboard** | 27 → 0 | ✅ | **HAUTE** — page d'accueil post-login |
| 8.2 | DashboardHero (pattern) | ~15 | ⬜ | **HAUTE** — utilisé par Dashboard |
| 8.3 | Coaching | 54 | ⬜ | Moyenne |
| 8.4 | CoachingCompteRendu | 70 | ⬜ | Moyenne |
| 8.5 | Messages | 67 | ⬜ | Moyenne |
| 8.6 | Settings | 57 → 0 | ✅ | Moyenne |
| 8.7 | Veille | `src/pages/Veille.tsx` | ~30 | ⬜ | Moyenne |
| 8.8 | VeilleContent | `src/pages/VeilleContent.tsx` | 63 | ⬜ | Moyenne |
| 8.9 | Dossier | `src/pages/Dossier.tsx` | 73 | ⬜ | Moyenne |
| 8.10 | WeeklyNewsletter | `src/pages/WeeklyNewsletter.tsx` | 57 | ⬜ | Moyenne |
| 8.11 | Journal | `src/pages/Journal.tsx` | ~40 | ⬜ | Moyenne |
| 8.12 | JournalDetail | `src/pages/JournalDetail.tsx` | ~35 | ⬜ | Moyenne |
| 8.13 | JournalNewEntry | `src/pages/JournalNewEntry.tsx` | ~30 | ⬜ | Moyenne |
| 8.14 | JournalFreeEntry | `src/pages/JournalFreeEntry.tsx` | ~25 | ⬜ | Moyenne |
| 8.15-8.51 | Pages restantes | `src/pages/[...].tsx` | ⬜ | Faible |

---

## PHASE 9 — Cleanup final

| # | Tâche | Condition | Statut |
|---|-------|-----------|--------|
| 9.1 | Supprimer tls-components.css | Toutes les phases 1-8 validées | ⬜ |
| 9.2 | Supprimer components-modern.css (si existe) | Idem | ⬜ |
| 9.3 | Supprimer les autres CSS BEM orphelins | Vérifier aucune référence | ⬜ |
| 9.4 | `grep -rn "style=\{\{" src/ --include="*.tsx" \| wc -l` → 0 | — | ⬜ |
| 9.5 | `grep -rn "bg-\[var(" src/ --include="*.tsx" \| wc -l` → 0 | — | ⬜ |
| 9.6 | `npx tsc --noEmit` → 0 erreurs | — | ⬜ |
| 9.7 | Test visuel complet — toutes les pages | — | ⬜ |

---

## Progrès global

**Phases complètes :** 1 + 2 + 2.6 + 3 + 4 + 5 (100 %) + 6 (~97 %) + 7 (100 %) / 9
**Composants validés :** ~110 / ~120 (28 patterns + 11 learning + 36 UI + 8 modales + 5 Core + 11 primitives)
- **Core (Phase 1)** : Button, Card, Input + Checkbox/Radio/Switch, Select, FormGroup
- **UI/Patterns (Phase 2)** : StatCard, GlassCard, SurfaceCard, CourseCard, ParcoursCard/patterns
- **Primitives (Phase 2.6)** : Badge, MetaPill, MetaPillGroup, Pill, ProgressBar, InlineProgress, SkillBar, GoalProgress, Avatar+AvatarGroup, Alert, Skeleton
- **Modales (Phase 3)** : BookingModal, PositionnementModal, SuccessModal, VideoPlayerModal, StreakCelebrationModal, SessionFeedbackModal, CancelSessionModal, ConfirmModal
- **UI canonique** : Modal (ui/Modal.tsx)
- **Phase 5 (UI batch 1)** : Toast, EmptyState, Medal, KPICard, CompetenceBadge, Tabs, FilterChip, Search, Breadcrumb
- **Phase 5 (UI batch 2 — Cards)** : ResourceCard, ProfileCard, ActionCard, ParcoursCard (ui), IconFeatureCard
- **Phase 5 (UI batch 3 — Navigation)** : Pagination, Stepper, Steps
- **Phase 5 (UI batch 4 — Atomes)** : Divider, Tag, Spinner, SectionTitle, MetaItem, StatusBadge, NotificationBadge, TrendingBadge, UserInfo
- **Phase 5 (UI batch 5 — Final)** : Achievement, AchievementBadge, MasteryBadge, ActivityItem, CompetencyMatrix, QuizComponent, Celebration + InlineWin, DropdownMenu (+ DropdownItem, DropdownLabel, DropdownSeparator), ProgressRing

**🎉 Phase 3 COMPLÈTE** — toutes les modales (8 spec + 1 canonique) migrées Tailwind.
**🎉 Phase 5 COMPLÈTE** — 36/36 composants UI migrés (BackgroundBlobs et ToastContainer faits, keyframes déplacés vers tls-components.css).
**🎉 Phase 4 COMPLÈTE** — 5 / 5 pages Learning migrées (LearningPaths, LearningPathDetail, LearningSpace, LessonPlayer, Profile). ~282 inline styles supprimés (95+35+63+42+47 → 0+0+0+1+0).
**🎉 Phase 6 quasi-COMPLÈTE** — 28/29 patterns migrés. Seuls PageCard (page-spécifique BEM) et Flashcard (3D transform) restent en exception.
**🎉 Phase 7 COMPLÈTE (2x)** — Toutes les 11 cards Learning maintenant fully Tailwind (CSS files BEM supprimés). Initialement marqués "sans inline" mais utilisaient encore BEM.

**Audit Phase 5 batch Cards (2026-05-07) :**
- 2 composants étaient **visuellement cassés** (CSS orphelin non importé) : ResourceCard, ProfileCard
- 1 CSS orphelin pur trouvé : StatCard.css (composant déjà migré, CSS supprimé)
- 17 composants Phase 5 migrés en 4 commits (Cards · Navigation · Atomes)
- ~22 fichiers `.css` BEM supprimés
- Tous les SVG inline custom remplacés par Lucide (X, Check, Lock, Circle, Play, ChevronLeft/Right, Clock, BookOpen, TrendingUp, Star, Sparkles, Award, Zap, Mail, Globe, Link2, AlertTriangle…)
- Lucide ne fournit pas `Linkedin`/`Twitter` dans la version installée → `<span>` stylé avec contenu textuel

**Pièges découverts (cumul) :**
- Piège #8 : `[role="button"]` global dans components-modern.css
- Piège #9 : Tailwind v4 utilise propriété CSS `translate` séparée → conflict avec `transform` des keyframes
- Piège #10 : `components-modern.css` impose `height: var(--input-height)` (40px) sur tous les `textarea`/`select` → utiliser `h-auto min-h-[X]`
- Piège #11 (NEW) : CSS BEM orphelins (fichier `.css` non importé) → composants visuellement cassés sans message d'erreur (ResourceCard, ProfileCard, StatCard découverts pendant Phase 5). Action : à chaque migration, `grep -rn "ComponentName.css" src/` pour confirmer si CSS encore consommé avant suppression.

**Audit Phase 5 batch final (2026-05-07) :**
- 9 composants migrés en un seul commit (ces 9 n'étaient consommés qu'à un endroit ou en démo, batch sans risque)
- MasteryBadge utilisait des classes BEM **sans CSS associé** → composant 100 % cassé visuellement (Piège #11 confirmé)
- AchievementBadge avait ~30 inline styles (le pire cas de la Phase 5) — converti en pattern variant-maps ('primary' | 'warm' | 'sun' | 'success')
- ProgressRing : conic-gradient gardé en `style={{}}` (runtime % bind impossible en Tailwind)
- DropdownMenu : keyframe `dd-slide-up` ajouté à tls-components.css pour `animate-[dd-slide-up_0.2s_ease-out]`
- 4 fichiers `.css` BEM supprimés (Achievement, ActivityItem, CompetencyMatrix, QuizComponent)

**Audit Phase 4 (2026-05-07) :**
- 5 pages Learning migrées en 5 commits (LearningPaths, Profile, LessonPlayer, LearningSpace, LearningPathDetail)
- ~282 inline styles supprimés
- TONE maps converties depuis `var(--tls-...)` strings vers Tailwind class strings (TONE_TEXT, TONE_BG_50, TONE_BORDER_200, TONE_BG_500, TONE_HERO)
- Cards alignées en grid avec `h-full` + `flex-1` spacers + `line-clamp` + `min-h` (CourseCard, ParcoursCard ui & patterns)
- Profile.css conservé pour styling page-specific (391 lignes, hero glass + avatar + tabs)
- Sub-composants extraits localement quand utile (KpiCard, FormatChip, SectionHeading, PILLAR_TONES, OBJECTIFS)

**Audit Phase 6 + 7 + 8 partiel (2026-05-07) :**
- Phase 6 : HeaderNav, HeroSection, PageHeader, PageHeaderSimple, SectionHeader, SettingsSection, ToneAwareCard, ActionCardGrid, DataTable migrés. ~50 inline styles supprimés. Orphan DataTable.css supprimé.
- Phase 7 : MagazineCard, MessageThreadCard, PromptCard, RankingCard migrés. ~24 inline styles supprimés.
- Phase 8 batch 1+2 : Dashboard (27 → 0), Settings (57 → 0). Switch component pris en main correctement (label prop, pas children). Hover state hooks (hoveredAction/Continue) supprimés au profit de hover:/focus-visible: utilities.

**Audit Phases 5+6+7 final (2026-05-07) :**
- Phase 5 (UI components) : 36/36. BackgroundBlobs + ToastContainer migrés (keyframes via tls-components.css).
- Phase 6 (patterns) : 28/29. Migration complète DashboardHero, ActivityFeed, ActivityTimeline, BreadcrumbNav, CoachCardGrid, FormLayout, LearningPathHeader, LearningPathGrid, MultiStepForm, ResourceCardGrid, SearchWithFilters, VeilleCardFeed, QuizQuestionCard, RatingModal, TabsWithContent.
- Phase 7 (learning) : 11/11. Re-migration complète : tous les composants Learning étaient encore BEM avec CSS files dédiés.
- Total cette session : ~26 composants migrés, ~16 fichiers CSS BEM supprimés, ~250+ inline styles transformés.
- Pièges/exceptions : `style={{}}` runtime conservé pour progress bars % et grid-template-columns dynamique. PageCard + Flashcard skippés (BEM page-spécifique + 3D transform).

**Prochain jalon :** Phase 8 (~50 pages restantes : ComponentShowcase 169, Components 115, Dossier 73, CoachingCompteRendu 70, Messages 67, VeilleContent 63, Leaderboard 53, Coaching 54, Account 46, etc.) puis Phase 9 cleanup final.

**Inline styles restants :** ~600 / 2 105 (estim. — ~250+ supprimés ces 2 batches)
**Dernière mise à jour :** 2026-05-07
