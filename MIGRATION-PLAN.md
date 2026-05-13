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
| 8.10 | WeeklyNewsletter | `src/pages/WeeklyNewsletter.tsx` | 57 | ✅ | Moyenne |
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

**Inline styles restants :** la majorité des pages app sont propres ; les cas restants vivent en showcase (`Components.tsx`) ou dans des runtimes nécessaires (progress %, conic-gradient, transforms calculés).
**Dernière mise à jour :** 2026-05-10

---

## PHASE 9 — Refactor patterns + spacing tokens (2026-05-09 → 2026-05-10)

**Objectif :** consolider les pages éditoriales et le Dashboard derrière une famille de patterns réutilisables (EditorialHero, AuthShell, EditorialLayout, SectionCard, RelatedItemList, ResumeLessonCard) + introduire une couche de tokens sémantiques (spacing, opacity, z-index, duration, ease, container, blur).

### Pages migrées dans ce batch

| Famille | Pages | Statut |
|---------|-------|--------|
| Auth | Login, Signup, ForgotPassword, ResetPassword | ✅ |
| Editorial | MagazineArticle, ArticleDetail, Newsletter, WeeklyNewsDetail | ✅ |
| Project / Coaching | Project, CoachingBookingFlow, PreCoachingQuestionnaireResponse | ✅ |
| Settings | Settings | ✅ |
| Learning | LearningSpace | ✅ |
| Dashboard | Dashboard refait en 4 stages (Parcours / Coaching / Journal / Veille) | ✅ |
| Journal | Journal restylé (EditorialHero brand + EntryCard chat-bubble) | ✅ |

### New patterns créés

| # | Pattern | Fichier | Usedby | Description |
|---|---------|---------|--------|-------------|
| 9.1 | EditorialHero | `src/components/patterns/EditorialHero.tsx` | 14 pages | Bandeau hero plein-largeur. `tone: default \| brand \| warm \| sun`. Le `brand` (gradient saturé primary-500→700, texte blanc) est utilisé par Dashboard + Journal. |
| 9.2 | AuthShell | `src/components/patterns/AuthShell.tsx` | 4 pages auth | Split-screen layout. Sub-composants : `AuthFeature`, `AuthDivider`, `AuthSocialButton`, `AuthSuccess`. |
| 9.3 | EditorialLayout | `src/components/patterns/EditorialLayout.tsx` | 7 pages | 2-col main + sticky aside, stack mobile-first. |
| 9.4 | SectionCard | `src/components/patterns/SectionCard.tsx` | 8 pages | Card sectionnée (title + description + footer actions). |
| 9.5 | RelatedItemList | `src/components/patterns/RelatedItemList.tsx` | 5 pages | Liste verticale d'items reliés / cross-links. |
| 9.6 | ResumeLessonCard | `src/components/patterns/ResumeLessonCard.tsx` | Dashboard | Hero card "Reprendre ta leçon" (glass tone-aware warm/primary/sun) avec eyebrow "Étape X sur Y", titre h1, meta pills, progress bar + CTA pill. |

### Major refactors

| Composant | Changements |
|-----------|-------------|
| **SectionHeader** | Étendu de **4 variants × 1 size** à **5 variants × 4 sizes × 5 tones**. Variants : `default`, `solid` (NEW : bubble gradient + icon blanc), `minimal`, `accent`, `underline`. Sizes : `xs/sm/md/lg`. Tones : primary/warm/sun/accent/neutral. Layout fix : grid `grid-cols-[auto_minmax(0,1fr)] items-start` aligne le centre de la bubble icône avec la première ligne du titre ; subtitle en row 2 col-start-2. Plus de `mb-X` hardcodé sur le wrapper — le parent layout gère le spacing via `gap-*` (anti-double-spacing). `compact?: boolean` deprecated → maps vers `size="sm"`. |
| **PromptCard** (`learning/PromptCard.tsx`) | Ajout `size: 'default' \| 'featured'` (featured = horizontal pour hero). Ajout `bubble: boolean` → tail Apple Messages bottom-right (`rounded-3xl` + `rounded-br-[6px]`). Borderless : `bg-white` + `[filter:drop-shadow(0_2px_8px_rgba(0,0,0,0.06))]` (pas de border) → tail merge seamless via la silhouette partagée. Hover tone-aware (info/warm/sun match badge). `!h-auto !overflow-visible` pour contrer Piège #8 `[role="button"]`. |
| **EditorialHero** | Ajout `tone` prop (default/brand/warm/sun). Tone `brand` = gradient saturé primary-500→700 + texte blanc + border/halo blanc. |
| **ActivityFeed** (`patterns/ActivityFeed.tsx`) | Étendu `ActivityType` avec discovery types : `'veille-article' \| 'veille-video' \| 'parcours' \| 'lesson' \| 'coaching'`. Chacun avec icône Lucide + tone par défaut. Utilisé dans le stage "À découvrir" du Dashboard avec `layout="timeline"` + `groupByDate`. |
| **JournalNewEntry** (`pages/JournalNewEntry.tsx`) | Ajout `'pratique-pro'` EntryType (Briefcase, secondary tone). Lit URL `?type=...` pour pré-sélectionner depuis les prompt cards Dashboard. |

### Design tokens added (NEW)

**Spacing sémantique** (7 tokens — `src/index.css` @theme) :

| Token CSS | Valeur | Tailwind | Usage |
|-----------|--------|----------|-------|
| `--spacing-tight` | 0.125rem (2px) | `gap-tight`, `mt-tight` | heading ↔ subtitle |
| `--spacing-stack-xs` | 0.5rem (8px) | `gap-stack-xs` | inline groups |
| `--spacing-stack` | 1rem (16px) | `gap-stack` | section header ↔ content (DEFAULT) |
| `--spacing-stack-lg` | 1.5rem (24px) | `gap-stack-lg` | content ↔ content within section |
| `--spacing-section` | 2rem (32px) | `gap-section` | between sibling sections |
| `--spacing-section-lg` | 2.5rem (40px) | `gap-section-lg` | major separations |
| `--spacing-page` | 3rem (48px) | `gap-page` | page-level groupings |

→ Dashboard.tsx et SectionHeader.tsx consomment ces tokens à la place de valeurs numériques (`gap-4`, `mb-1`).

**Utility tokens étendus** (25 tokens — `src/index.css` @theme) :

| Famille | Tokens | Tailwind utility |
|---------|--------|------------------|
| Opacity | `--opacity-faint/soft/tinted/medium/disabled/overlay` (5/10/15/30/50/70 %) | `bg-primary-500/medium`, `text-ink-900/disabled` |
| z-index | `--z-base/sticky/dropdown/overlay/modal/toast/tooltip` (1/20/30/40/50/60/70) | `z-modal`, `z-toast` |
| Duration | `--duration-fast/base/slow/glacial` (150/200/300/600 ms) | `duration-base` |
| Ease | `--ease-standard/decelerate/accelerate/emphasis` (cubic-beziers) | `ease-standard` |
| Container | `--container-prose/content/page/wide` (65ch / 48rem / 72rem / 80rem) | `max-w-page` |
| Blur | `--blur-glass-light/medium/heavy/ambient` (8/16/24/60 px) | `blur-glass-medium` |

### Showcase improvements (`pages/Components.tsx`)
- Flag `showcaseOnly: true` ajouté sur 39 composants (badge "SHOWCASE ONLY" visible).
- Champ `usedBy: string[]` qui liste les pages consommatrices par composant.
- Nouvelles entries Token : Spacing sémantique, Opacity, Duration, Easing, Container, Blur, z-index.

---

## RATIONALISATION — Doublons identifiés et résolus (2026-05-07)

### Headers (4 → 2 canoniques)

| Composant | Statut | Remplacement |
|-----------|--------|--------------|
| `patterns/PageHeader` | ✅ **CANONIQUE** | Page-level (eyebrow + title + desc + actions). Variants: `default` / `tight`. Align: `left` / `center`. |
| `patterns/PageHeaderSimple` | 🔄 Alias rétrocompat | `→ <PageHeader variant="tight" />`. À supprimer après migration des call sites. |
| `patterns/SectionHeader` | ✅ **CANONIQUE** | Section-level (icon LucideIcon\|ReactNode + title + subtitle + action + divider + compact). |
| `ui/SectionTitle` | 🔄 Alias rétrocompat | `→ <SectionHeader />`. À supprimer après migration des call sites. |

**Polish PageHeader/SectionHeader :**
- PageHeader : eyebrow chip avec border + bg-primary-50, titre `clamp(1.875rem, 3.5vw, 2.75rem)`, max-width 760/640, align center supporté
- SectionHeader : icon bubble `w-11 h-11 rounded-xl bg-primary-50`, ReactNode/emoji/LucideIcon tous supportés via `React.isValidElement` detection (Piège : LucideIcon est un forwardRef OBJECT pas une function)

### Breadcrumbs (2 → 1 canonique) ✅ FUSIONNÉ (2026-05-09)

| Composant | Statut | Notes |
|-----------|--------|-------|
| `ui/Breadcrumb` | ✅ **CANONIQUE** | Supporte `variant: 'simple' \| 'nav'`, `maxVisible`, `onNavigate`, `current`, `icon` sur items, `sticky` |
| `patterns/BreadcrumbNav` | 🔄 Thin re-export | `export { Breadcrumb as BreadcrumbNav }` — backward compat. 0 call sites actifs. |

**Résumé fusion :** BreadcrumbNav (101 lignes) absorbé dans Breadcrumb. `variant="nav"` active ChevronRight, pill highlight, ellipsis collapse, boutons interactifs. `variant="simple"` (défaut) garde le comportement anchor + séparateur texte.

### KPICard vs StatCard (gardés — APIs différentes)

| Composant | API | Use case |
|-----------|-----|----------|
| `ui/StatCard` | `value` + `sub` + `delta` + `deltaDirection` + variants (default/elevated/warm/brand/sun) + sizes (sm/md/lg) + `square` mode | Stats riches, dashboard hero |
| `ui/KPICard` | `value` + `label` + `trend` (objet {value, direction, label}) + tones simples | KPIs simples, sidebars |

→ Les deux gardés pour APIs distinctes. Documenté.

### Restant à rationaliser (TODO Phase 9)

- ✅ ~~PageHeaderSimple / SectionTitle~~ — **SUPPRIMÉS** (commit f680e2f). PageHeader + SectionHeader canoniques.
- ✅ ~~GlassCard / SurfaceCard~~ — **CONVERTIS EN ALIAS** vers Card. Card étendu avec variants : `glass-brand`, `glass-warm`, `glass-dark`, `bordered`, `muted`, `sunken`. À supprimer définitivement après migration des call sites.
- ✅ ~~InlineProgress~~ — **CONVERTI EN ALIAS** vers `<ProgressBar layout="inline" />`. ProgressBar étendu avec `layout: 'stacked' | 'inline'`. À supprimer après migration.
- ✅ ~~StatusBadge / TrendingBadge~~ — **FUSIONNÉS DANS Badge.tsx** (2026-05-09). `StatusBadge` et `TrendingBadge` re-exportés depuis Badge.tsx pour rétrocompat. `PromoType` = nouveau type pour les variants gradient animés.
- ✅ ~~BreadcrumbNav~~ — **FUSIONNÉ DANS Breadcrumb.tsx** (2026-05-09). `variant="nav"` activé. BreadcrumbNav = thin re-export.

### Décisions finales famille Pill (2026-05-09)

| Composant | Décision | Raison |
|-----------|----------|--------|
| `ui/Pill` | ✅ GARDER | glass/surface chips — contenu ReactNode, variants contextuels (hero, overlay) |
| `ui/MetaPill` | ✅ GARDER | metadata chips — text string, tones sémantiques (bg-50), clickable optionnel |
| `ui/MetaPillGroup` | ✅ GARDER | layout companion (30 lignes) — flex wrapper pour arrays de MetaPills |
| `ui/Tag` | ✅ GARDER | removable filter chip — X button, onClick, tone |
| `ui/FilterChip` | ✅ GARDER | toggle interactif — active state gradient, count bubble |

→ APIs et use cases fondamentalement différents (children vs text, glass vs tones). Aucune fusion possible sans dégrader l'ergonomie.

### Composants distincts gardés (APIs / use cases différents)

| Famille | Composants | Distinction |
|---------|-----------|-------------|
| Pills | Pill, MetaPill, MetaPillGroup, Tag, FilterChip | glass/overlay · metadata · layout · removable · toggle |
| Badges | Badge (incl. StatusBadge + TrendingBadge), NotificationBadge | text status · lesson state + promo animé (dans Badge) · count overlay |
| Breadcrumbs | Breadcrumb (variant simple\|nav) | un seul composant canonique, BreadcrumbNav = alias |
| Achievement | Achievement, AchievementBadge, MasteryBadge, Medal | card horizontal vs médaillon vertical vs ring SVG vs trophée |
| Cards stats | StatCard, KPICard | StatCard (rich, square mode, sub-units), KPICard (simple, trend object) |
| Progress | ProgressBar, ProgressRing, SkillBar, GoalProgress | Linear vs circular vs labeled-skill vs goal-with-deadline |

---

## PHASE 10 — Holistic UX/UI rework (2026-05-10+)

### Goal

Refaire toutes les pages restantes de la learning app pour une expérience UX/UI cohérente, mobile-first, learner-centric, avec les patterns et tokens du design system. Adapter ou créer si manquant. ~36 pages à traiter.

### Status — already migrated to new DS (Phase 9)

15 pages déjà sur les nouveaux patterns (EditorialHero / AuthShell / EditorialLayout / SectionCard / RelatedItemList / ResumeLessonCard) :

- ✅ Dashboard
- ✅ Journal
- ✅ Login
- ✅ Signup
- ✅ ForgotPassword
- ✅ ResetPassword
- ✅ ArticleDetail
- ✅ MagazineArticle
- ✅ Newsletter
- ✅ WeeklyNewsDetail
- ✅ Project
- ✅ CoachingBookingFlow
- ✅ PreCoachingQuestionnaireResponse
- ✅ Settings
- ✅ Components (showcase)

### Tier 1 — Core daily-use pages (HIGH priority)

| Page | Sections actuelles | Patterns cibles | Effort | Status |
|------|--------------------|-----------------|--------|--------|
| LearningPaths | Hero + grid ParcoursCard + filtres | `EditorialHero` (brand) + activer `LearningPathGrid` (showcase-only) + `SearchWithFilters` | M | ✅ |
| LearningPathDetail | Hero spécifique + sections + leçons + **ressources complémentaires** | `LearningPathHeader` (showcase-only → activer) + `SectionCard` list + `StepCard` items + **`ResourceCard` (ou `ResourceCardGrid`) en fin de chaque étape, après les leçons** pour ressources complémentaires (PDF, vidéos, liens externes) + `RelatedItemList` parcours connexes | L | ✅ |
| Coaching | Header + liste sessions + coachs | EditorialHero brand + coach strip → coach inline dans session card · IconFeatureCard tinted (Outils) · SessionCard tinted warm uniforme · BookingModal v3 payment flow + crédits par plan · ICS download · AmbientBlobs bg | L | ✅ |
| Journal | KPI row + CTA buttons + entries list | EditorialHero brand · ❌ KPI row · 4 emoji buttons centered (Guidé/Libre/Insight/Apprentissage) · Chat-bubble compose card · Search trailing filter button · Filters collapsibles · EntryCard tinted-by-type · TYPE_BADGE pill · Buttons glass-light/ghost | L | ✅ |
| Profile | Hero + KPIs + skills + achievements | Déjà haut niveau : AccountFamilyNav + Tabs underline + CompetencyMatrix + SkillBar + Badge. Semantic spacing. Audit ✅ — aucun refactor nécessaire. | L | ✅ |
| Notifications | Liste plate | Déjà haut niveau : NotificationCard + FilterChip + EmptyState + Skeleton. Zustand useNotificationsStore + useFilterPrefsStore. Audit ✅ — aucun refactor nécessaire. | M | ✅ |
| LessonPlayer | Lecteur + sidebar + navigation | Amélioré 2026-05-13 : boutons Prev/Next/Terminer → DS `Button` (ghost/primary + leadingIcon/trailingIcon). Navigation EDRAC 7 sections correcte. | M | ✅ |
| Veille | Sticky header + format strip + feed | Search-first hero (archétype ②) full-bleed · IconFeatureCard tinted (format access) · Cards tinted tone-aware par type · Newsletter CTA gradient-warm · AmbientBlobs bg. Toast notification 2026-05-13. | M | ✅ |

### Tier 2 — Secondary core

| Page | Patterns cibles | Effort | Status |
|------|-----------------|--------|--------|
| Account | `EditorialHero` (neutral) + `SettingsSection` blocks + `FormLayout` | M | ✅ |
| Leaderboard | `EditorialHero` (sun) + `RankingCard` list + podium + `Tabs` (period) | M | ✅ |
| Help | `EditorialHero` + `SectionCard` FAQ accordion + search + `RelatedItemList` articles populaires | M | ✅ |
| JournalDetail | `EditorialLayout` (main entry + aside meta) + chat-bubble `EntryCard` | S | ✅ |
| JournalFreeEntry | `FormLayout` + `EditorialHero` (warm) | S | ✅ |
| JournalNewEntry | `MultiStepForm` + prompt selector cards | M | ✅ |
| Magazine | `EditorialHero` (sun) + `MagazineCard` grid + filter `Tabs` | M | ✅ |
| VeilleContent | `EditorialLayout` + `SectionCard` body + `RelatedItemList` veille connexe | M | ✅ |
| Dossier | `EditorialHero` + `ResourceCard` grid via `ResourceCardGrid` + `SectionCard` blocks | L | ⬜ |
| Collaboration | `EditorialHero` (warm) + `ProfileCard` partners + `SectionCard` projects | L | ⬜ |
| Messages | Conv list (gauche) + thread (droite) — refonte chat-bubble + `MessageThreadCard` | L | ⬜ |
| WeeklyNewsletter | `EditorialLayout` + `SectionCard` rubriques + `RelatedItemList` past issues | M | ✅ |
| Onboarding | `MultiStepForm` + `EditorialHero` (brand) + progress `Stepper` | M | ⬜ |
| LearningSpace | Déjà migré partiellement — audit consistance spacing semantic + tone | S | ✅ |
| Enterprise | `EditorialHero` (brand) + `IconFeatureCard` grid + `SectionCard` blocks | M | ✅ |
| PagesIndex | `EditorialHero` (neutral) + grouped `ActionCard` grid via `ActionCardGrid` | S | ✅ |
| PreCoachingQuestionnaire | `MultiStepForm` + `QuizQuestionCard` items | M | ⬜ |
| CoachingCompteRendu | `EditorialLayout` + `SectionCard` sections + `RelatedItemList` next steps | M | ⬜ |

### Tier 3 — Edge cases / viewers

Ces pages ont des layouts plein-écran spécialisés (viewer / lecteur) — garder leur UI bespoke mais assurer cohérence des design tokens (spacing / blur / z-index / touch).

| Page | Notes |
|------|-------|
| AstucesViewer | Viewer plein écran — vérifier tokens blur/z-index/touch |
| FlashcardsViewer | 3D transform (exception runtime) — tokens spacing/touch |
| VideoReels | Full-bleed vidéo — `z-modal` + `min-h-touch` controls |
| VideoTutorial | Player + sidebar — tokens spacing semantic |
| VideoViewer | Idem — cohérence avec VideoTutorial |
| ComplementaryContentViewer | Reader plein écran — `max-w-prose` body, `gap-stack` |
| CourseDetail | Hero + sections — possible upgrade léger `EditorialHero` + `SectionCard` |
| Error404 | Centered illustration + CTA — assurer `min-h-touch`, tokens spacing |
| Error500 | Idem 404 |

### Methodology (workflow per page)

Cf. CLAUDE.md → section "Phase 10 — Holistic UX/UI rework" pour le workflow détaillé en 5 étapes :

1. **Audit** (10 min) — tableau section → pattern cible, UX/UI issues
2. **Décision composants** (5 min) — REUSE / EXTEND / ADAPT / CREATE
3. **Implémentation** (variable) — bottom-up, semantic spacing tokens, patterns canoniques
4. **Vérification** (10 min) — `npx tsc --noEmit`, preview mobile + desktop, DOM verify, a11y
5. **Showcase update** — entries Components.tsx, `usedBy`, retirer `showcaseOnly` flag si activé

### Cross-cutting tasks (parallel)

- ⬜ Migrer toutes les pages aux semantic spacing tokens (`gap-stack`, `gap-section`, etc.) — actuellement seul Dashboard les consomme.
- ⬜ Audit de toutes les pages pour remplacer `bg-white` hardcodé → `bg-surface` (prépare future dark mode).
- ⬜ Remplacer les classes BEM `tls-*` restantes (audit par page).
- ⬜ Activer les composants `showcaseOnly: true` sur les vraies pages quand ça fait sens (LearningPathGrid, CoachCardGrid, etc.).

### 🧭 Navigation recommendations (intégrées au fil des migrations Tier 1+2)

| Action | Page(s) concernée(s) | Statut |
|--------|---------------------|--------|
| Custom tab nav inline → `<Tabs>` DS canonique | LearningPathDetail, Profile | ⬜ Tier 1 |
| Ajouter `<Breadcrumb variant="nav">` au-dessus du hero pour navigation hiérarchique | LearningPathDetail, Coaching, JournalDetail, ArticleDetail | ⬜ Tier 1-2 |
| Activer `<HeaderNav>` (sticky toolbar back+progress+save) | LessonPlayer, JournalNewEntry, PreCoachingQuestionnaire, Onboarding | ⬜ Tier 2 |
| Audit usage `<Pagination>` (0 usage prod actuel) — décider si supprimer ou intégrer | DataTable consummers, list views | ⬜ TBD |
| **CREATE `ViewerHeader` pattern** — sticky bar back + prev/next + close pour pages viewer | VideoViewer, FlashcardsViewer, AstucesViewer, ComplementaryContentViewer, VideoReels (6+ pages) | ⬜ **NEW** |

### Components à créer (audit Phase 10)

- **`ViewerHeader`** — sticky bar pour pages viewer (full-screen content) :
  - Back button (gauche)
  - Title + meta (centré, optionnel)
  - Prev/next chevrons (droite) avec state disabled au bord
  - Close button optionnel
  - Glass-light background avec backdrop-blur
- **`NotificationCard`** — chat-bubble pattern (extension PromptCard/JournalEntryCard) pour la page Notifications (Tier 1 #5).

### 🗑️ Phase 10 — Cleanups effectués (référence)

| Fichier supprimé | Raison |
|------------------|--------|
| `DashboardHero.tsx` | Alias deprecated, 0 prod usage → HeroSection |
| `LearningPathHeader.tsx` | Alias deprecated, 0 prod usage → HeroSection |
| `SettingsSection.tsx` | Doublon de SectionCard |
| `GlassCard.tsx` | Alias deprecated → Card variant="glass*" |
| `SurfaceCard.tsx` | Alias deprecated → Card variants |
| `KPICard.tsx` | Alias deprecated → StatCard |
| `BreadcrumbNav.tsx` | Re-export → Breadcrumb variant="nav" |
| `ToneAwareCard.tsx` | Alias deprecated → Card variant="tinted" |
| `ComponentShowcase.tsx` | Dead code (Components.tsx est THE showcase) |
| `TopNav.tsx` | 0 prod usage (Sidebar suffit) |
| `BottomNav.tsx` | 0 prod usage |
| `HamburgerButton.tsx` | 0 prod usage (App.tsx utilise inline Menu) |

**Total : 12 fichiers supprimés, ~1100 lignes de code mort éliminées**

### 🛠️ Phase 10 — DS-level bugfixes appliqués

| Fix | Impact |
|-----|--------|
| `z-index` tokens : ajout namespace `--z-index-*` pour Tailwind v4 | Sidebar drawer / Modals / Toasts / Dropdowns z-index correctement générés |
| Card.tsx **piège #8 complet** : `[&[role=button]]:h-auto` + `font-normal` + `items-stretch` | Neutralise 3 propriétés BEM imposées par `[role="button"]` (height 40px clip + font-weight 600 inherit + align-items center overflow horizontal) |
| `overflow-x-hidden` → `[overflow-x:clip]` dans App.tsx main | Fix sticky elements (CSS spec : `overflow-x:hidden` force `overflow-y:auto` créant scroll containing block parasite) |

### 🎨 Phase 10 — Composants redesignés / améliorés

| Composant | Changements |
|-----------|-------------|
| `MetaPill` | Ajout variants `glass` + `glass-dark` (frosted effect pour heroes saturés) |
| `ProfileCard` | Refonte complète : Avatar + MetaPillGroup + Button DS · 3 variants × 3 tones × 2 alignments · avatarBadge slot · contacts inline · cta DS |
| `ParcoursCard` | p-8 uniform · text-wrap:balance · overflow-wrap:anywhere · min-w-0 · CTA rounded-pill h-11 · tone-aware focus outline · alignement inter-cards via min-h |
| `CardGrid` | Migration BEM → Tailwind pur · `square-tiles` (2/3/4 cols pour cards square) · `tiles` (mini-cards) layouts ajoutés |
| `Sidebar` | Width responsive 220/260 · NavItem count >99 → "99+" · Close X mobile · Hover-peek hamburger 200/400ms delays |
| `DropdownMenu` | A11y full : ArrowDown/Up/Home/End keyboard · Escape close + focus return · Auto-focus · aria-orientation |
| `HeroSection` | Showcase enrichi 5 archetypes DNA (LearningPath / Dashboard / Glass / Minimal / Media) |
| `IconFeatureCard` v2 | 5 sizes (xs/sm/md/lg/xl) · 4 surfaces (card/tinted/glass/frosted) · asymmetric padding scale · auto-scale title (body-sm→h3) · `square` prop · `ICON_ZONE` cross-card alignment |
| `SessionCard` | Aligné convention DS : 4 surfaces (card/tinted/glass/frosted) · tone (primary/warm/sun) · tone-aware footer divider · meta sous titre |
| `Search` | Nouveau slot `trailing` (filter button toggle, voice, etc.) — cross-cutting |
| `SectionHeader` | Fix bug spacing : flex items-center + sub-stack flex-col gap-tight (icon centrée sur bloc texte, gap 2px tight) |
| `Button` | **6 nouveaux variants glass** : `glass-light` + `glass-light-ghost` (white frosted sur LIGHT tinted bg) · `glass-brand` / `glass-warm` / `glass-sun` (tone-aware tinted frosted) |
| `BookingModal` v3 | Payment flow conditionnel selon plan (free/pro/enterprise + crédits) · UI compacte fit 1 écran (max-h 92vh) · banner contextuel source (sponsorisée/forfait/à-l'unité) · card form ICS download |

### 🆕 Phase 10 — Nouveaux patterns & tokens

| Pattern / Token | Path | Notes |
|---|---|---|
| `ViewerHeader` | `patterns/ViewerHeader.tsx` | Sticky toolbar pour 6+ pages viewer (back + title + prev/next + close) |
| `QuickActionButton` | `ui/QuickActionButton.tsx` | Compact horizontal button avec chevron, tone-aware |
| `AmbientBlobs` | `patterns/AmbientBlobs.tsx` | 3 floating blobs (primary/warm/sun) blur 80px + keyframe `float` 20s · 3 intensities (subtle/normal/vivid) |
| Token `primary-950` | `@theme` index.css | `#164267` deep navy — extension du scale primary pour heros saturés |
| Tokens `surface-cyan/mist/cream` | `@theme` index.css | `#f0f9ff`, `#f8fbfd`, `#fef3e2` — surface pastels pour gradients |
| Gradients utilities | `@layer utilities` | `bg-gradient-page-ambient` + `-warm` + `-sun` (page bg) · `bg-gradient-brand-deep` (hero saturé) · `bg-gradient-soft-pastel` + `-duo` (pastel doux) |
| DS convention "Card surfaces & interaction effects" | `DESIGN.md` §4 | Règle cross-cutting : tout card pattern expose `surface` × tone-aware hover/focus |
| DS convention "Variants vs className overrides" | `DESIGN.md` §4 | Règle arbitrage : variants typés > `!important` className |

---

## PHASE 10 — Pages à créer (6 manquantes, audit 2026-05-12)

Pages présentes dans la DB Notion "Écrans Learning App" (`Disponible: NO`) mais absentes de `App.tsx`.
**Voir `DESIGN.md §Pages manquantes` pour le prompt de création complet.**

| # | Page | Route | Flow | Niveau | Statut |
|---|------|-------|------|--------|--------|
| P1 | `Recherche` | `/search` | Parcours & Apprentissage | Top | ✅ |
| P2 | `MagicLink` | `/auth/magic-link` | Authentification | Conditionnel | ✅ |
| P3 | `VerifyEmail` | `/auth/verify-email` | Authentification | Conditionnel | ✅ |
| P4 | `SubscriptionPayment` | `/onboarding/payment` | Première expérience | Conditionnel | ✅ |
| P5 | `Billing` | `/account/billing` | Paramètres & Compte | Niveau 2 | ✅ |
| P6 | `Positionnement` | `/learning-paths/:id/positionnement` | Parcours & Apprentissage | Niveau 3 | ✅ |

**Toutes créées et routées** (2026-05-12) — pages importées dans `pages/index.ts`, routées dans `App.tsx`, Notion Écrans DB → `Disponible: YES`.

**Rappel** : après création de chaque page → mettre à jour `Disponible sur l app` → `YES` dans la DB Notion Écrans.
URL DB : https://www.notion.so/thelearningsociety/c60f30c775c8473fa15a8446f96142d4

---

---

## Notion — Design System DB (2026-05-13)

**DB :** Design System — Claude | `collection://75e8fbee-de5b-4f3a-892b-b703d5ee95bc`
**URL :** https://www.notion.so/thelearningsociety/fc727adea430439bb45590fd908ba134

### État actuel

| Catégorie | Items créés | Statut |
|-----------|-------------|--------|
| Tokens (Couleurs, Typo, Spacing, Radius, Ombres, Opacité, Z-Index, Animation, Container, Blur, Gradients) | 17 | ✅ |
| Core (Button, Card, Input, FormGroup, Select) | 5 | ✅ Button/Card/Input/FormGroup/Select (Select vu dans migration plan) |
| UI (~36 composants) | ~36 | ✅ (majorité présente, ~20 à vérifier dans has_more) |
| Patterns (~40 composants) | ~40 | ✅ |
| Learning (11 composants) | 11 | ✅ |
| Modals (9 composants) | 9 | ✅ |
| Cards (2 composants) | 2 | ✅ |
| Layout (2 composants) | 2 | ✅ |
| Forms (1 composant) | 1 | ✅ |
| Auth (2 composants) | 2 | ✅ |
| Guidelines | 8 | ✅ |
| **Total estimé** | **~135** | — |

### Items possiblement manquants (à vérifier dans prochaine session)

La query DB a `has_more: true`. Items non confirmés dans les premiers résultats — peut-être présents dans le reste :
`Select` · `EmptyState` · `Skeleton` · `Breadcrumb` · `Pagination` · `Search` · `StatCard` · `ProgressBar` · `GoalProgress` · `Achievement` · `AchievementBadge` · `Pill` · `MetaItem` · `NotificationBadge` · `Divider` · `UserInfo` · `Steps` · `ActionCard` · `ResourceCard` · `QuizComponent` · `AvatarGroup` · `CompetencyMatrix`

→ Avant de créer, requêter la vue "All items" et filtrer par Category=Composant pour éviter doublons.

### Doublons Écrans DB (action manuelle requise)

**~43 entrées `⚠️ DOUBLON —`** à supprimer manuellement dans https://www.notion.so/thelearningsociety/c60f30c775c8473fa15a8446f96142d4
- 2 entrées non renommées (permission refusée) : VideoViewer `35ecdd696db6813f954dc8693d91fcda`, JournalFreeEntry `35ecdd696db68142971ac05910958ec8`

---

**Dernière mise à jour :** 2026-05-13
