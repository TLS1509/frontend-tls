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

## PHASE 0.5 — ~~Vérification visuelle tailwind.config.js~~ ✅ OBSOLÈTE

> **Supersédée** — Le DS est en production depuis 4+ mois avec ~121 composants validés visuellement. La vérification initiale n'a plus de valeur. Tous les tokens sont documentés dans `src/index.css` @theme et consommés par `Components.tsx` (showcase vivant).

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

## PHASE 8 — ~~Pages principales~~ ✅ OBSOLÈTE

> **Supersédée par Phase 9 + Phase 10** — Phase 9 (2026-05-13) a supprimé l'intégralité du CSS BEM, rendant inutile le tracking inline-styles par page. Phase 10 a ensuite refondu les 35 pages restantes via les patterns DS (EditorialHero, EditorialLayout, SectionCard, etc.) avec validation visuelle complète. Toutes les pages listées ici sont couvertes.
>
> Référence historique : Dashboard (8.1 ✅), Settings (8.6 ✅), WeeklyNewsletter (8.10 ✅) — premiers migrés en Phase 8 avant la décision de basculer sur Phase 9 cleanup global.

---

## PHASE 9 — Cleanup final ✅ COMPLÈTE (2026-05-13)

| # | Tâche | Condition | Statut |
|---|-------|-----------|--------|
| 9.1 | Supprimer tls-components.css | Toutes les phases 1-8 validées | ✅ |
| 9.2 | Supprimer components-modern.css | Idem | ✅ |
| 9.3 | Supprimer les autres CSS BEM orphelins (18 fichiers + Input.css) | Aucune référence en TSX | ✅ |
| 9.4 | `style={{}}` restants → légitimes uniquement (runtime, gradients, SVG) | — | ✅ |
| 9.5 | `bg-[var(` → 0 occurrences | — | ✅ |
| 9.6 | `npx tsc --noEmit` → 0 erreurs | — | ✅ |
| 9.7 | Test visuel — Dashboard + LearningPaths OK | — | ✅ |

**Bilan suppression :** 21 fichiers CSS BEM supprimés (tls-components.css ~2 750 lignes, components-modern.css ~480 lignes, + 19 orphelins). 6 keyframes encore utilisés par Tailwind `animate-[]` migrés vers index.css.

---

## Progrès global

**Phases complètes :** 1 + 2 + 2.6 + 3 + 4 + 5 (100 %) + 6 (~97 %) + 7 (100 %) + 9 (cleanup) + 10 (35/35 pages Tier 1+2+3) + 11 + 12 + 13 + 14 + 15 + 16 ✅
**Composants validés :** ~121 / ~125 (28 patterns + 11 learning + 36 UI + 8 modales + 5 Core + 11 primitives + 11 Phase 11–12–DS)
**Pages scaffoldées :** 82 routes wired in App.tsx (Phase 11: 5 + Phase 12: 19 + Phase 13: 7 + Phase 14: 15 + Phase 15: 19 + Phase 16: 17 = **82 pages**)
**Couverture sitemap FO_SCREENS_CONSOLIDATION :** 82/83 écrans (98.8 %) — seul "Notification Bell" reste comme composant global

### Phase 16 — Sitemap gap pages (17 écrans, 2026-05-14)
Écrans manquants identifiés depuis FO_SCREENS_CONSOLIDATION (cahiers CDC) :
- **P0 (7)** : PerplexityContentDetail · OnboardingQuestionnaire · CorrectionDetailLearner · MessagingThread · CoachCalendar · ApiDocs · ProjectsList
- **P1 (10)** : ItemRecommendations · PasseportHistorique · PurchaseCredits · StreakDetail · CoachEngagement · CoachEnterpriseDashboard · ManagerViewsBuilder · JournalSearch · PrivacyDsar · PrivacyDeleteAccount

Notion "📱 Écrans Learning App" DB : 17 entrées créées + marquées `Disponible: YES` + `Statut: Intégré`
**showcaseOnly restants :** 18 composants (non utilisés dans de vraies pages — voir DS sprint suivant)
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

**Prochain jalon :** Phase 8 (~50 pages restantes : ComponentShowcase 169, Components 115, Dossier 73, CoachingCompteRendu 70, Messages 67, Leaderboard 53, Coaching 54, Account 46, etc.) puis Phase 9 cleanup final. (VeilleContent consolidée dans Veille.tsx — Phase 16 cleanup 2026-05-14)

**Inline styles restants :** la majorité des pages app sont propres ; les cas restants vivent en showcase (`Components.tsx`) ou dans des runtimes nécessaires (progress %, conic-gradient, transforms calculés).
**Dernière mise à jour :** 2026-05-15 — Phase 10 Tier 3 ✅ · Gap analysis nettoyée (14 entrées ❌ → ✅, V1 modules fully ✅) · Cross-cutting tasks toutes ✅ · Plan archivé (Phase 0.5, Phase 8)

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
| Dossier | `EditorialHero` + `ResourceCard` grid via `ResourceCardGrid` + `SectionCard` blocks | L | ✅ |
| Collaboration | `EditorialHero` (warm) + `ProfileCard` partners + `SectionCard` projects | L | ✅ |
| Messages | Conv list (gauche) + thread (droite) — refonte chat-bubble + `MessageThreadCard` | L | ✅ |
| WeeklyNewsletter | `EditorialLayout` + `SectionCard` rubriques + `RelatedItemList` past issues | M | ✅ |
| Onboarding | `MultiStepForm` + `EditorialHero` (brand) + progress `Stepper` | M | ✅ |
| LearningSpace | Déjà migré partiellement — audit consistance spacing semantic + tone | S | ✅ |
| Enterprise | `EditorialHero` (brand) + `IconFeatureCard` grid + `SectionCard` blocks | M | ✅ |
| PagesIndex | `EditorialHero` (neutral) + grouped `ActionCard` grid via `ActionCardGrid` | S | ✅ |
| PreCoachingQuestionnaire | `MultiStepForm` + `QuizQuestionCard` items | M | ✅ |
| CoachingCompteRendu | `EditorialLayout` + `SectionCard` sections + `RelatedItemList` next steps | M | ✅ |

### Tier 3 — Edge cases / viewers

Ces pages ont des layouts plein-écran spécialisés (viewer / lecteur) — garder leur UI bespoke mais assurer cohérence des design tokens (spacing / blur / z-index / touch).

| Page | Notes | Status |
|------|-------|--------|
| AstucesViewer | Nav buttons `py-2.5` → `py-3` (44px touch target) | ✅ |
| FlashcardsViewer | Same touch fix + legit 3D `style={{}}` (perspective/backfaceVisibility) | ✅ |
| VideoReels | `bg-ink-950` confirmed valid token. No fixes needed. | ✅ |
| VideoTutorial | Added missing `Button` import · replaced hardcoded `#55A1B4` hex on Play icons → `fill-primary-500 text-primary-500` | ✅ |
| VideoViewer | Clean — ViewerOverlay + DS tokens throughout | ✅ |
| ComplementaryContentViewer | Clean — ViewerOverlay + DS tokens. Unused `expandedId` state minor. | ✅ |
| CourseDetail | Legit decorative gradient `style={{}}`. Otherwise full DS tokens. | ✅ |
| Error404 | `style={{ gridTemplateColumns }}` → Tailwind arbitrary `[grid-template-columns:...]` | ✅ |
| Error500 | All `style={{}}` are legitimate (clamp font-size + decorative gradient) | ✅ |

### Methodology (workflow per page)

Cf. CLAUDE.md → section "Phase 10 — Holistic UX/UI rework" pour le workflow détaillé en 5 étapes :

1. **Audit** (10 min) — tableau section → pattern cible, UX/UI issues
2. **Décision composants** (5 min) — REUSE / EXTEND / ADAPT / CREATE
3. **Implémentation** (variable) — bottom-up, semantic spacing tokens, patterns canoniques
4. **Vérification** (10 min) — `npx tsc --noEmit`, preview mobile + desktop, DOM verify, a11y
5. **Showcase update** — entries Components.tsx, `usedBy`, retirer `showcaseOnly` flag si activé

### Cross-cutting tasks (parallel)

- ✅ Semantic spacing tokens — consommés par toutes les pages Phase 10 (gap-stack, gap-section, etc.)
- ✅ `bg-white` → `bg-surface` — audit 2026-05-15 : déjà correct partout. Les rares `bg-white` sur page-root (AstucesViewer/FlashcardsViewer) ont des gradients bespoke intentionnels.
- ✅ Classes BEM `tls-*` — supprimées en Phase 9 (2026-05-13). 0 occurrences.
- ✅ `showcaseOnly: true` — audit 2026-05-15 : 14 composants flaggés sont légitimement showcase-only (aucun n'est importé dans de vraies pages). Flags corrects.
- ✅ ViewerOverlay / ViewerHeader — VideoViewer + ComplementaryContentViewer utilisent ViewerOverlay. AstucesViewer/FlashcardsViewer/VideoReels ont des designs bespoke justifiés (gradient full-page, dark immersif) — non migrable sans casser l'UX.

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

## PHASE 14+ — Sequential Flow-Based Component Harmonization & Page Redesign (2026-05-15+)

**Objectif :** Revoir le design et l'intégration des composants pour les ~140 pages existantes en parallèle, organisé par **user flows** (journées utilisateur). Chaque flow est redesigné end-to-end avec validation visuelle et synchronisation Notion formalisée via 5 checkpoints.

**Paradigme shift :** pas d'approche écran-par-écran (fragmente la cohérence visuelle), pas d'approche niveau-par-niveau (N1 → N2 → N3 crée des dépendances circulaires). Phase 14+ = **flow-par-flow** (user journey complète), avec composants préparés **bottom-up** AVANT les pages, et validation **end-to-end** dès que chaque flow est bouclé.

**Exécution :** 17 flows séquentiels (Flow 1 complètement finalisé → Flow 2, etc.). Tier 1 (daily-use P0) d'abord, puis Tier 2–5.

### 6 étapes obligatoires par flow

```
ÉTAPE 1 — AUDIT FLOW (~30 min)
  1.1 List écrans N1/N2/N3 dans le flow
  1.2 Audit table : Écran → Composants actuels → Composants manquants → UX/design issues
  1.3 Identifier composants showcaseOnly à intégrer dans ce flow
  1.4 Identifier composants à créer/étendre
  → Présenter le tableau à l'utilisateur AVANT code

ÉTAPE 2 — COMPONENT PREPARATION (bottom-up)
  2.1 Créer/étendre composants AVANT les pages
  2.2 Mettre à jour Components.tsx (showcase, usedBy, showcaseOnly)
  2.3 Mettre à jour Notion Design System DB

ÉTAPE 3 — PAGE REDESIGN (N3/modals → N2/detail → N1/hub)
  3.1 Intégrer composants préparés en 2.1
  3.2 Appliquer semantic spacing (gap-stack, gap-section, gap-page)
  3.3 Tone-aware (1 dominant + 1 accent max/flow)
  3.4 Mobile-first, min-h-touch (44px), 100% Tailwind

ÉTAPE 4 — VALIDATION FLOW (~15 min)
  4.1 End-to-end flow testing (enchaîner les écrans)
  4.2 Visual consistency (tone, spacing, glass)
  4.3 Technical checks (npx tsc, npm run build, screenshots)
  4.4 Screenshot gallery (375px + 1280px)

ÉTAPE 5 — NOTION SYNC (5-Point Checkpoints)
  ☐ 1. Code → Notion (components + pages)
  ☐ 2. Notion → Code (cross-check: Tailwind ✅, routes exists, etc.)
  ☐ 3. Components.tsx (showcase + usedBy + showcaseOnly flip)
  ☐ 4. Docs internes (CLAUDE.md, DESIGN.md)
  ☐ 5. MIGRATION-PLAN.md (track completion)

ÉTAPE 6 — COMMIT (une fois 4 checkpoints ✅)
  Format : `feat(phase-14.X): [flow name] redesign + component prep`
```

### Flow Decomposition — 17 flows par Tier

| # | Flow | Screens | Tier | Priority | Status |
|---|------|---------|------|----------|--------|
| 14.1 | 🎯 Onboarding | Onboarding, Questionnaire, Tutorial, Success | 1 | P0 | ⬜ |
| 14.2 | 📚 Learning core | LearningPaths, PathDetail, Positionnement, LessonPlayer, 4× Viewers | 1 | P0 | ⬜ |
| 14.3 | 📊 Passeport & progression | Passeport, CompetenceDetail, Objectifs, Roadmap, JAC | 1 | P0 | ⬜ |
| 14.4 | 🎓 Coaching | Coaching, Booking, Session, CompteRendu, Corrections, Messages | 1 | P0 | ⬜ |
| 14.5 | 📝 Journal | Journal, NewEntry, FreeEntry, Detail, Search | 2 | P1 | ⬜ |
| 14.6 | 🎮 Gamification | Gamification, BadgeGallery, BadgeDetail, Streaks, XP, Achievements | 2 | P1 | ⬜ |
| 14.7 | 📰 Veille | Veille, Magazine, Article, Dossier, Newsletter, WeeklyNews, VideoContent | 2 | P1 | ⬜ |
| 14.8 | 👥 Social & notifications | Notifications, Messages, Collaboration, Leaderboard | 2 | P1 | ⬜ |
| 14.9 | 🎓 Coach backoffice | CoachDashboard, Apprenants, LearnerProfile, Analytics, Heatmap, Calendar | 3 | P2 | ⬜ |
| 14.10 | 📁 Projects SBO | ProjectsList, Detail, Task, JAC, Team, SkillGaps, PasseportFeed | 3 | P2 | ⬜ |
| 14.11 | ⚙️ Manager/Enterprise | ManagerEnterprise, Cohort, Alerts, Export, KPIs, Webhooks | 3 | P2 | ⬜ |
| 14.12 | 🎓 Masterclass/Workshops | 3× hubs + variants Pre/Live/Post/Replay/Survey/Waitlist | 3 | P2 | ⬜ |
| 14.13 | 🔐 Auth | Login, Signup, VerifyEmail, MagicLink, ForgotPassword, ResetPassword | 4 | P2 | ⬜ |
| 14.14 | ⚙️ Profile/Account | Profile, Account, Billing, Settings, Credits, Privacy, NotificationPreferences | 4 | P2 | ⬜ |
| 14.15 | ❓ Support | Help, Search, Article, Tickets, Tutorials | 4 | P2 | ⬜ |
| 14.16 | 🤖 Chatbot | ChatInterface, History | 5 | P3 | ⬜ |
| 14.17 | 🚫 Errors & edge | 404, 500, AstucesViewer, FlashcardsViewer, CourseDetail, Viewers | 5 | P3 | ⬜ |

**Exécution ordre :** 14.1 → 14.2 → 14.3 → 14.4 (Tier 1 P0) → 14.5–14.8 (Tier 2 P1) → 14.9–14.12 (Tier 3 P2) → 14.13–14.15 (Tier 4 P2) → 14.16–14.17 (Tier 5 P3).

### Progress tracking — Phase 14+ completion

| Flow # | Name | Screens | Component prep | Page redesign | Validation | Notion sync | Status |
|--------|------|---------|-----------------|---------------|------------|------------|--------|
| 14.1 | Onboarding | 5 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ Pending |
| 14.2 | Learning core | 7 | ⬜ | ⬜ | ⬜ | ⬜ | ⬜ Pending |
| (... repeat for 14.3–14.17) | | | | | | | |

---

## PHASE 11 — Sitemap Alignment & Nouveaux composants MVP (2026-05-13)

**Sources :** `sitemap_fo_learning_app.html` (83 écrans · 14 modules) + `FO_SCREENS_CONSOLIDATION` (Notion) + 5 pages de référence Notion lues.

### Route mapping — sitemap vs codebase

| Sitemap (futur WP) | Codebase React SPA | Action |
|--------------------|--------------------|--------|
| `/parcours` | `/learning-paths` | Garder codebase — sitemap = doc WP future, SPA indépendant |
| `/passeport` | Absent | ⬜ Créer |
| `/gamification` | Absent | ⬜ Créer |
| `/coach/dashboard` | Absent | ⬜ Créer |
| `/manager/enterprise` | Absent | ⬜ Créer |
| `/manager/cohort` | Absent | ⬜ Créer |

### Nouveaux composants à créer (code first → showcase → Notion)

| # | Composant | Path | Priorité | Module SBO | Statut |
|---|-----------|------|----------|------------|--------|
| 11.1 | `ConsentBanner` | `patterns/ConsentBanner.tsx` | P0 | #13bis GDPR global | ⬜ |
| 11.2 | `CompetencyRadar` | `ui/CompetencyRadar.tsx` | P0 | #2 Passeport · #3 · #6 · #10 · #11 | ⬜ |
| 11.3 | `AITransparencyLabel` | `ui/AITransparencyLabel.tsx` | P0 | #13bis · transversal IA | ⬜ |
| 11.4 | `AIOverrideButton` | `ui/AIOverrideButton.tsx` | P1 | #13bis coach/admin | ⬜ |
| 11.5 | `AtrophieIndicator` | `ui/AtrophieIndicator.tsx` | P1 | #5 Gamification/Badges | ⬜ |

### Nouvelles pages MVP à scaffolder

| # | Page | Route | Modules clés | Composants DS | Statut |
|---|------|-------|-------------|---------------|--------|
| P7 | `Passeport` | `/passeport` | #2 Passeport Compétences | `CompetencyRadar` · `SkillBar` · `Badge` · `GoalProgress` · `EditorialHero` | ⬜ |
| P8 | `Gamification` | `/gamification` | #5 Gamification & Badges | `AchievementBadge` · `AtrophieIndicator` · `ProgressBar` · `EditorialHero` | ⬜ |
| P9 | `CoachDashboard` | `/coach/dashboard` | #4 Coaching (vue coach) | `StatCard` · `SessionCard` · `CompetencyRadar` · `EmptyState` | ⬜ |
| P10 | `ManagerEnterprise` | `/manager/enterprise` | #6 Enterprise FO | `StatCard` · `CardGrid` · `FilterBar` · `EditorialHero` | ⬜ |
| P11 | `ManagerCohort` | `/manager/cohort` | #6 Enterprise FO | `StatCard` · `ProfileCard` · `ProgressBar` · `EditorialHero` | ⬜ |

### Blocages techniques documentés (🟡 — décisions Pierre requises)

| # | Écran | Blocage | Module |
|---|-------|---------|--------|
| B1 | Contenu Détail Perplexity | Perplexity API key + config sync TBD | #1bis |
| B2 | Positionnement Questionnaire | Nombre exact de questions (20-30) TBD | #3 |
| B3 | Credits Display | Règles visibilité pool entreprise par rôle TBD | #3 |
| B4 | Session Calendar (Coach) | Google OAuth MVP · Outlook OAuth V1 | #4 |
| B5 | Open Badges Section | Prestataire TBD (Credly / Badgr / Applaud) | #5 |
| B6 | Chat Interface + History | Mistral hébergement TBD (on-premise vs cloud) | #12 |

### MVP July 2026 scope — 83 écrans FO (61 P0 · 19 P1 · 3 P2)
Phase MVP inclut modules : #1 Parcours/Learning · #1bis Items/Veille · #2 Passeport · #3 Onboarding/Profil · #4 Coaching · #5 Gamification · #6 Enterprise · #9 Notifications (bell) · #10 Analytics · #13bis GDPR/IA
Phase V1 (Sept 2026) : #7 Journal · #8 Masterclass/Ateliers · #9 (complet) · #11 Projects · #12 Chatbot · #13 Helpcenter

**Livraisons Phase 11 :** Components ✅ (ConsentBanner, CompetencyRadar, AITransparencyLabel, AIOverrideButton, AtrophieIndicator) · Pages ✅ (Passeport, Gamification, CoachDashboard, ManagerEnterprise, ManagerCohort) · Notion ✅ (5 DS DB + 5 Écrans DB).

**Livraisons Phase 12 :** Components ✅ (HeatmapGrid, CorrectionCard, StepTutorial) · Pages ✅ (19 pages MVP P0 scaffoldées) · Wiring ✅ (App.tsx + pages/index.ts) · TypeScript ✅ (0 erreurs) · Notion 🔄 (3 DS DB à ajouter + 19 Écrans DB à marquer "Disponible: YES").

**Livraisons Phase 13 :** Components ✅ (showcaseOnly retiré sur 4 composants activés) · Pages ✅ (7 pages MVP P0 restantes) · Wiring ✅ (App.tsx + pages/index.ts) · TypeScript ✅ (0 erreurs) · Notion ✅ (7 Écrans DB).

**Livraisons Phase 14 :** Pages ✅ (15 pages V1 Module #8 — MasterclassHub/Detail/Live/Replay/Survey + AtelierHub/Detail/Live/Presentiel/Recap/Waitlist + EvenementHub/Detail/Live/Recap) · Wiring ✅ (App.tsx + pages/index.ts) · TypeScript ✅ (0 erreurs) · Notion ✅ (15 Écrans DB).

**Livraisons Phase 15 :** Pages ✅ (19 pages — Sprint E: XPDashboard/BadgeGallery/DashboardAchievements/NotificationPreferences/CoachLearnerProfile · Sprint F: CoachJournal/CoachJournalDetail + Help×7 + Project sub-pages×5) · Wiring ✅ (App.tsx + pages/index.ts) · TypeScript ✅ (0 erreurs) · Notion ✅ (19 Écrans DB).

**Livraisons Sprint H :** Pages ✅ (6 écrans manquants FO_SCREENS — ChatInterface `/assistant` · ChatHistoryPanel `/assistant/history` · OpenBadgesSection `/profile/open-badges` · CreditsPage `/profile/credits` · CoachProfileView `/coaching/coach/:id` · WebhooksManagement `/enterprise/webhooks`) · Wiring ✅ · TypeScript ✅ (0 erreurs).

---

## PHASE 12 — Gap Analysis Complet : 83 écrans sitemap vs codebase (2026-05-13)

**Sources :** `sitemap_fo_learning_app.html` + `sitemap_fo_learning_app_sbo.html` (user journeys).
**Légende :** ✅ implémenté · ⚠️ partiel/approx · ❌ manquant · 🟡 bloquant technique · 🔵 V1/V2

### Légende des routes

> **Note importante :** Le sitemap utilise des routes "documentation" (ex. `/parcours`, `/enterprise/dashboard`) basées sur la future architecture WordPress SBO. La React SPA utilise ses propres routes indépendantes (ex. `/learning-paths`, `/manager/enterprise`). Le mapping ci-dessous indique l'équivalent codebase actuel, ou `—` si aucun équivalent n'existe.

---

### #1 Formation & Learning Paths (MVP · P0)

| Écran | Route sitemap | Route codebase | Statut | Priorité |
|-------|---------------|----------------|--------|----------|
| Page d'Accueil Parcours | `/parcours` | `/learning-paths` | ✅ LearningPaths | P0 |
| Modale Positionnement | `/parcours/:id/positionnement` | `/learning-paths/:id/positionnement` | ✅ Positionnement | P0 |
| Vue Parcours (Progression) | `/parcours/:id` | `/learning-paths/:id` | ✅ LearningPathDetail | P0 |
| Détail Étape (Leçons) | `/parcours/:id/etape/:etapeId` | `/learning-paths/:pathId/lessons/:lessonId` | ✅ LessonPlayer | P0 |
| Page Learning Space | `/learning-space` | `/learning-space` | ✅ LearningSpace | P0 |
| Détail Item (Lecteur) | `/learning-space/:itemId` | `/lesson/:id/*` (viewers) | ⚠️ couvert par viewers | P1 |

**User journeys SBO :** Démarrer Parcours · Suivre Leçon · Coach — Suivi Progression (`/coach/parcours` → non routé, sera dans CoachDashboard)

---

### #1bis Items & Veille (MVP · P0)

| Écran | Route sitemap | Route codebase | Statut | Priorité |
|-------|---------------|----------------|--------|----------|
| Items Détail [Type X] | `/learning-space/:itemId/[type]` | AstucesViewer, FlashcardsViewer, VideoViewer etc. | ⚠️ viewers présents, routing partiel | P0 |
| Veille Feed | `/veille` | `/veille` | ✅ Veille | P0 |
| Contenu Détail Perplexity | `/veille/:itemId/perplexity` | — | 🟡 Perplexity API TBD (B1) | P0 |
| Item Recommendations | `/coaching/recommendations` | `/coaching/recommendations` | ✅ ItemRecommendations (Phase 16) | P1 |

---

### #2 Passeport Compétences (MVP · P0)

| Écran | Route sitemap | Route codebase | Statut | Priorité |
|-------|---------------|----------------|--------|----------|
| Radar Personnel | `/passeport` | `/passeport` | ✅ Passeport (Phase 11) | P0 |
| Détail Compétence | `/passeport/competence/:id` | `/passeport/competence/:id` | ✅ PasseportCompetenceDetail (Phase 12) | P0 |
| Définir Objectifs | `/passeport/objectifs` | `/passeport/objectifs` | ✅ PasseportObjectifs (Phase 12) | P0 |
| Roadmap Objectifs | `/passeport/roadmap` | `/passeport/roadmap` | ✅ PasseportRoadmap (Phase 13) | P0 |
| Jalons JAC | `/passeport/jac` | `/passeport/jac` | ✅ PasseportJac (Phase 13) | P0 |
| Dashboard Coach (Heatmap) | `/coach/passeport` | `/coach/passeport` | ✅ CoachHeatmap (Phase 12) | P0 |
| Détail Apprenant (Coach) | `/coach/apprenant/:id` | `/coach/apprenant/:id` | ✅ CoachLearnerProfile (Phase 15) | P1 |
| Historique Progression | `/passeport/historique` | `/passeport/historique` | ✅ PasseportHistorique (Phase 16) | P1 |

---

### #3 Onboarding & Profil (MVP · P0)

| Écran | Route sitemap | Route codebase | Statut | Priorité |
|-------|---------------|----------------|--------|----------|
| Public Signup Form | `/signup` | `/auth/signup` | ✅ Signup | P0 |
| Signup Confirmation | `/signup/confirm` | `/auth/verify-email` | ✅ VerifyEmail | P0 |
| Onboarding Welcome | `/onboarding` | `/onboarding` | ✅ Onboarding | P0 |
| Positionnement Questionnaire | `/onboarding/questionnaire` | — | 🟡 nb questions TBD (B2) | P0 |
| Onboarding Success | `/onboarding/success` | `/onboarding/success` | ✅ OnboardingSuccess (Phase 12) | P0 |
| My Profile | `/profile` | `/profile` | ✅ Profile | P0 |
| Platform Tutorial | `/onboarding/tutorial` | `/onboarding/tutorial` | ✅ OnboardingTutorial (Phase 12) | P0 |
| Credits Display | `/profile/credits` | `/profile/credits` | ✅ CreditsPage (Sprint H) | P0 |
| XP Dashboard | `/profile/xp` | `/gamification/xp` | ✅ XPDashboard (Phase 15) — route dans /gamification | P1 |
| Purchase Credits | `/profile/credits/buy` | `/profile/credits/buy` | ✅ PurchaseCredits (Phase 16) | P1 |
| Manager — Approuver Crédits | `/credits/approve` | — | ❌ manquant (SBO flow, hors scope SPA) | P1 |

---

### #4 Coaching & 1-1 Messaging (MVP · P0)

| Écran | Route sitemap | Route codebase | Statut | Priorité |
|-------|---------------|----------------|--------|----------|
| Coaching Hub | `/coaching` | `/coaching` | ✅ Coaching | P0 |
| Book Session | `/coaching/book` | `/coaching/booking` | ✅ CoachingBookingFlow | P0 |
| Session Detail | `/coaching/session/:id` | `/coaching/session/:id` | ✅ CoachingSessionDetail (Phase 12) | P0 |
| Corrections Inbox | `/coaching/corrections` | `/coaching/corrections` | ✅ CoachingCorrections (Phase 12) | P0 |
| Correction Detail | `/coaching/correction/:id` | `/coaching/correction/:id` | ⚠️ CoachingCorrections (Phase 12) — learner view | P0 |
| Messaging Thread | `/coaching/messages/:coachId` | `/messages` | ⚠️ Messages (générique) | P0 |
| Assigned Coach Profile | `/coaching/coach/:id` | `/coaching/coach/:id` | ✅ CoachProfileView (Sprint H) | P1 |
| Coach Dashboard | `/coach/dashboard` | `/coach/dashboard` | ✅ CoachDashboard (Phase 11) | P0 |
| Session Calendar | `/coach/calendar` | — | 🟡 Google OAuth MVP (B4) | P0 |
| Corrections Queue | `/coach/corrections` | `/coach/corrections` | ✅ CoachCorrectionsQueue (Phase 12) | P0 |
| Correction Interface | `/coach/correction/:id` | `/coach/correction/:id` | ✅ CoachCorrectionInterface (Phase 12) | P0 |
| Assigned Apprenants | `/coach/apprenants` | `/coach/apprenants` | ✅ CoachApprenants (Phase 12) | P0 |
| Session Meet | `/coach/meet/:id` | — | ❌ manquant (SBO flow) | P0 |
| Messagerie Coach | `/coach/messages` | `/messages` | ⚠️ Messages (générique) | P0 |

---

### #5 Gamification & Badges (MVP · P0)

| Écran | Route sitemap | Route codebase | Statut | Priorité |
|-------|---------------|----------------|--------|----------|
| Gamification Dashboard | `/gamification` | `/gamification` | ✅ Gamification (Phase 11) | P0 |
| Badge Detail Modal | `/gamification/badge/:id` | `/gamification/badge/:id` | ✅ BadgeDetail (Phase 12) | P0 |
| Open Badges Section | `/profile/open-badges` | `/profile/open-badges` | ✅ OpenBadgesSection (Sprint H) | P0 |
| Compétences Badges Section | `/profile/badges/competences` | `/profile/badges/competences` | ✅ ProfileBadgesCompetences (Phase 12) | P0 |
| Badge Gallery (Profile) | `/profile/badges` | `/gamification/badges` | ✅ BadgeGallery (Phase 15) — route dans /gamification | P1 |
| Streak Detail View | `/gamification/streaks` | `/gamification/streaks` | ✅ StreakDetail (Phase 16) | P1 |
| Coach Engagement Analytics | `/coach/engagement` | `/coach/engagement` | ✅ CoachEngagement (Phase 16) | P1 |

---

### #6 Enterprise FO Space (MVP · P0)

| Écran | Route sitemap | Route codebase | Statut | Priorité |
|-------|---------------|----------------|--------|----------|
| Manager Entreprise Portal | `/manager/enterprise` | `/manager/enterprise` | ✅ ManagerEnterprise (Phase 11) | P0 |
| Manager Cohort Dashboard | `/manager/cohort` | `/manager/cohort` | ✅ ManagerCohort (Phase 11) | P0 |
| Coach Dashboard (Enterprise) | `/coach/enterprise-dashboard` | `/coach/enterprise-dashboard` | ✅ CoachEnterpriseDashboard (Phase 16) | P1 |
| Alerts Configuration | `/manager/alerts` | `/manager/alerts` | ✅ ManagerAlerts (Phase 12) | P0 |
| Custom Views Builder | `/manager/views/builder` | `/manager/views/builder` | ✅ ManagerViewsBuilder (Phase 16) | P1 |
| Export Dialog | `/manager/export` | `/manager/export` | ✅ ManagerExport (Phase 12) | P0 |
| Webhooks Management | `/enterprise/webhooks` | `/enterprise/webhooks` | ✅ WebhooksManagement (Sprint H) | P2 |
| API Documentation | `/api-docs` | `/api-docs` | ✅ ApiDocs (Phase 16) — contenu Swagger à intégrer | P0 |
| Enterprise Dashboard (SBO) | `/enterprise/dashboard` | `/enterprise/dashboard` | ✅ EnterpriseAnalyticsDashboard (Phase 12) | P0 |
| KPI Sections | `/enterprise/kpis` | `/enterprise/kpis` | ✅ EnterpriseKpis (Phase 13) | P0 |
| Alerte Inactivité modal | `/enterprise/alertes/inactivite` | `/enterprise/alertes/inactivite` | ✅ AlerteInactivite (Phase 13) | P0 |

> **✅ Clarification (2026-05-13) :** `/enterprise/dashboard` et `/manager/enterprise` sont **deux pages distinctes** qui coexistent :
> - `/manager/enterprise` → portail manager FO (cohortes, KPIs équipe, budget) — déjà scaffoldé (Phase 11)
> - `/enterprise/dashboard` → dashboard admin/manager analytics accessible **depuis le compte entreprise** (BO-like) — vue analytics cross-équipes et enterprise. Page à scaffolder en Phase 12 (voir 12.19 ci-dessous).
> `/enterprise/kpis` = sous-section de `/enterprise/dashboard` (SBO flow).

---

### #9 Notifications (MVP)

| Écran | Route sitemap | Route codebase | Statut | Priorité |
|-------|---------------|----------------|--------|----------|
| Notification Bell (global) | `[global component]` | Sidebar (unreadCount) | ✅ implémenté | P0 |
| Notification Center | `/profile/notifications` | `/notifications` | ⚠️ Notifications (générique) | P1 |
| Preferences Panel | `/profile/notifications/preferences` | `/notifications/preferences` | ✅ NotificationPreferences (Phase 15) | P1 |

---

### #10 Analytics & Tracking (MVP · P0)

| Écran | Route sitemap | Route codebase | Statut | Priorité |
|-------|---------------|----------------|--------|----------|
| Dashboard Learner | `/dashboard` | `/dashboard` | ✅ Dashboard | P0 |
| Progress Detail View | `/dashboard/competence/:id` | `/dashboard/competence/:id` | ✅ DashboardCompetenceDetail (Phase 12) | P0 |
| Badge & Achievement Wall | `/dashboard/achievements` | `/dashboard/achievements` | ✅ DashboardAchievements (Phase 15) | P1 |
| Coach Team Dashboard | `/coach/team-dashboard` | `/coach/team-dashboard` | ✅ CoachTeamDashboard (Phase 12) | P0 |
| Fiche Apprenant (Coach View) | `/coach/apprenant/:id/analytics` | `/coach/apprenant/:id/analytics` | ✅ FicheApprenantAnalytics (Phase 12) | P0 |
| Team Analytics | `/coach/analytics` | `/coach/analytics` | ✅ CoachAnalytics (Phase 13) | P0 |
| Alerte Stagnation modal | `/coach/alertes/stagnation` | `/coach/alertes/stagnation` | ✅ AlerteStagnation (Phase 13) | P0 |

---

### #13bis GDPR, AI Act & Sécurité (MVP)

| Écran | Route sitemap | Route codebase | Statut | Priorité |
|-------|---------------|----------------|--------|----------|
| Consent Banner (global) | `[global component]` | ConsentBanner.tsx (Phase 11) | ✅ composant créé | P0 |
| Consent Management Settings | `/profile/privacy` | `/profile/privacy` | ✅ ProfilePrivacy (Phase 12) | P0 |
| Data Access Request (DSAR) | `/profile/privacy/dsar` | `/profile/privacy/dsar` | ✅ PrivacyDsar (Phase 16) | P1 |
| Account Deletion (RTBF) | `/profile/privacy/delete-account` | `/profile/privacy/delete-account` | ✅ PrivacyDeleteAccount (Phase 16) | P1 |
| AI Transparency Indicator | `[global component]` | AITransparencyLabel.tsx (Phase 11) | ✅ composant créé | P0 |
| AI Override Button | `[global component]` | AIOverrideButton.tsx (Phase 11) | ✅ composant créé | P1 |
| Preferences Privacité | `/profile/consent` | `/profile/consent` | ✅ ProfileConsent (Phase 13) | P0 |

---

### V1 Modules (Septembre 2026)

| Module | Écrans | Statut global |
|--------|--------|---------------|
| #7 Journal de Bord | 6 écrans | ✅ Journal · JournalDetail · JournalNewEntry · JournalFreeEntry · CoachJournal · CoachJournalDetail (Phase 15) · JournalSearch (Phase 16) |
| #8 Masterclass & Ateliers & Événements | 15 écrans | ✅ Phase 14 — MasterclassHub/Detail/Live/Replay/Survey · AtelierHub/Detail/Live/Presentiel/Recap/Waitlist · EvenementHub/Detail/Live/Recap |
| #11 Projects SBO | 6 écrans | ✅ Project · ProjectsList · ProjectTask · ProjectTeam · ProjectJac · ProjectSkillGaps · ProjectPasseportFeed (Phase 15) |
| #12 Chatbot IA | 6 écrans | ⚠️ ChatInterface `/assistant` + ChatHistoryPanel `/assistant/history` ✅ (Sprint H) · 4 écrans restants (Mistral TBD B6) |
| #13 Helpcenter | 8 écrans | ✅ Help · HelpArticle · HelpSearch · HelpTickets · HelpTicketDetail · HelpTicketNew · HelpTutorials · HelpTutorialStep (Phase 15) |

---

### Récapitulatif gap analysis

| Catégorie | Total | ✅ Implémentés | ⚠️ Partiels | ❌ Manquants | 🟡 Bloquants |
|-----------|-------|----------------|------------|------------|--------------|
| **MVP (10 modules)** | ~55 écrans | ~52 | ~3 | 1 (Manager Crédits SBO) | 3 (Calendar/Perplexity/SessionMeet) |
| **V1 (5 modules)** | ~35 écrans | ~34 | ~1 (#12 partial) | 0 | 1 (Mistral B6) |
| **Global components** | 4 composants | 4 (Bell + 3 Phase 11) | — | — | — |

> **Mise à jour 2026-05-15** : gap analysis nettoyée — 14 entrées ❌ corrigées en ✅ (Phase 15+16 pages présentes sous routes légèrement différentes du sitemap doc).

**Prochaines priorités de scaffolding (MVP P0 manquants, hors bloquants) :**

| # | Page | Route | Module |
|---|------|-------|--------|
| 12.1 | Passeport Compétence Détail | `/passeport/competence/:id` | #2 |
| 12.2 | Passeport Objectifs | `/passeport/objectifs` | #2 |
| 12.3 | Coach Heatmap Équipe | `/coach/passeport` | #2 |
| 12.4 | Onboarding Success | `/onboarding/success` | #3 |
| 12.5 | Onboarding Tutorial | `/onboarding/tutorial` | #3 |
| 12.6 | Coaching Session Detail | `/coaching/session/:id` | #4 |
| 12.7 | Coaching Corrections Inbox | `/coaching/corrections` | #4 |
| 12.8 | Coach Corrections Queue | `/coach/corrections` | #4 |
| 12.9 | Coach Correction Interface | `/coach/correction/:id` | #4 |
| 12.10 | Coach Apprenants List | `/coach/apprenants` | #4 |
| 12.11 | Badge Detail Modal | `/gamification/badge/:id` | #5 |
| 12.12 | Profile Badges Compétences | `/profile/badges/competences` | #5 |
| 12.13 | Manager Alerts Config | `/manager/alerts` | #6 |
| 12.14 | Manager Export Dialog | `/manager/export` | #6 |
| 12.15 | Dashboard Progress Detail | `/dashboard/competence/:id` | #10 |
| 12.16 | Coach Team Dashboard | `/coach/team-dashboard` | #10 |
| 12.17 | Fiche Apprenant Analytics | `/coach/apprenant/:id/analytics` | #10 |
| 12.18 | Profile Privacy / RGPD | `/profile/privacy` | #13bis |
| 12.19 | Enterprise Analytics Dashboard | `/enterprise/dashboard` | #6 / #10 |

---

## Notion — Design System DB (2026-05-13)

**DB :** Design System — Claude | `collection://75e8fbee-de5b-4f3a-892b-b703d5ee95bc`
**URL :** https://www.notion.so/thelearningsociety/fc727adea430439bb45590fd908ba134

### État actuel

| Catégorie | Items créés | Statut |
|-----------|-------------|--------|
| Tokens (Couleurs, Typo, Spacing, Radius, Ombres, Opacité, Z-Index, Animation, Container, Blur, Gradients) | 17 | ✅ |
| Core (Button, Card, Input, FormGroup, Select) | 5 | ✅ Button/Card/Input/FormGroup/Select (Select vu dans migration plan) |
| UI (~38 composants) | ~38 (+HeatmapGrid, +CorrectionCard Phase 12) | ✅ (majorité présente, ~20 à vérifier dans has_more) |
| Patterns (~41 composants) | ~41 (+StepTutorial Phase 12) | ✅ |
| Learning (11 composants) | 11 | ✅ |
| Modals (9 composants) | 9 | ✅ |
| Cards (2 composants) | 2 | ✅ |
| Layout (2 composants) | 2 | ✅ |
| Forms (1 composant) | 1 | ✅ |
| Auth (2 composants) | 2 | ✅ |
| Guidelines | 8 | ✅ |
| **Total estimé** | **~138** (+3 Phase 12) | — |

### Items possiblement manquants (à vérifier dans prochaine session)

La query DB a `has_more: true`. Items non confirmés dans les premiers résultats — peut-être présents dans le reste :
`Select` · `EmptyState` · `Skeleton` · `Breadcrumb` · `Pagination` · `Search` · `StatCard` · `ProgressBar` · `GoalProgress` · `Achievement` · `AchievementBadge` · `Pill` · `MetaItem` · `NotificationBadge` · `Divider` · `UserInfo` · `Steps` · `ActionCard` · `ResourceCard` · `QuizComponent` · `AvatarGroup` · `CompetencyMatrix`

→ Avant de créer, requêter la vue "All items" et filtrer par Category=Composant pour éviter doublons.

### Doublons Écrans DB (action manuelle requise)

**~43 entrées `⚠️ DOUBLON —`** à supprimer manuellement dans https://www.notion.so/thelearningsociety/c60f30c775c8473fa15a8446f96142d4
- 2 entrées non renommées (permission refusée) : VideoViewer `35ecdd696db6813f954dc8693d91fcda`, JournalFreeEntry `35ecdd696db68142971ac05910958ec8`

---

## PHASE 14 — Redesign UX/UI flow-by-flow (2026-05-15+) 🚧

**Objectif** : Refondre les ~140 pages app par **user journey complet** (pas écran-par-écran, pas par niveau). À chaque flow on audite, on étend le DS si besoin, on redesign les écrans bottom-up, on teste le parcours end-to-end en preview, on commit.

**Pourquoi flow-by-flow** : Tests end-to-end possibles, DS évolue dans un contexte réel, démos stakeholder à mi-parcours, scope clair.

### Workflow (6 étapes par flow)

1. **AUDIT** — Tableau "écran → patterns utilisés → DS gaps → UX issues" présenté à l'utilisateur AVANT toute modif code
2. **DS UPDATE** — étendre/créer composants bottom-up + showcase + Notion DS
3. **REDESIGN ÉCRANS** — détail (N3) → hub (N1), tokens sémantiques, tone-aware, mobile-first
4. **VALIDATION** — preview end-to-end, screenshots mobile+desktop, `npx tsc --noEmit` clean
5. **DOC + NOTION SYNC** — cocher phase, ajouter patterns/pièges, Notion Écrans + DS DBs
6. **COMMIT** — `feat(phase-14.X): redesign [flow] flow` (un commit par flow validé)

### Découpage des flows

#### Tier 1 — MVP daily-use

| # | Flow | Écrans clés | Statut |
|---|------|-------------|--------|
| 14.1 | 🎯 Première expérience | Onboarding → Questionnaire → Tutorial → Success → Dashboard | ✅ |
| 14.2 | 📚 Apprenant core | Dashboard → LearningPaths → PathDetail → Positionnement → LessonPlayer → 4 Viewers | ✅ |
| 14.3 | 📚 Passeport & progression | Passeport → CompetenceDetail → Objectifs → Roadmap → Historique → JAC | ✅ |
| 14.4 | 🎓 Coaching apprenant | Coaching → Booking → Session → CompteRendu → Corrections → Messages | ✅ |
| 14.5 | 📝 Journal réflexif | Journal → NewEntry → FreeEntry → Detail → Search | ✅ |

#### Tier 2 — Engagement & contenu

| # | Flow | Écrans clés | Statut |
|---|------|-------------|--------|
| 14.6 | 🎮 Gamification | Gamification → BadgeGallery → BadgeDetail → Streaks → XP → Achievements | ✅ |
| 14.7 | 📰 Veille | Veille hub → Magazine/Article/Dossier/MagazineArticle/Newsletter/WeeklyNews/VideoTutorial/VideoReels/Perplexity | ✅ |
| 14.8 | 👥 Social | Notifications → Messages → Collaboration → Leaderboard | ✅ |

#### Tier 3 — Coach back-office & Projects

| # | Flow | Écrans clés | Statut |
|---|------|-------------|--------|
| 14.9 | 🎓 Coach backoffice | CoachDashboard → Apprenants → LearnerProfile/Analytics → Heatmap → Corrections → Engagement → Calendar → Journal → Recommendations → Stagnation → Enterprise/Team Dashboards | ✅ |
| 14.10 | 📁 Projects SBO | ProjectsList → Detail → Task → JAC → Team → SkillGaps → PasseportFeed | ✅ |

#### Tier 4 — Enterprise & événements

| # | Flow | Écrans clés | Statut |
|---|------|-------------|--------|
| 14.11 | ⚙️ Manager/Enterprise | ManagerEnterprise → Cohort → Alerts → Export → ViewsBuilder → KPIs → Inactivité → ApiDocs → Webhooks | ✅ |
| 14.12 | 🎓 Masterclass / Ateliers / Événements | 3 hubs + variantes Pre/Live/Post/Replay/Survey/Waitlist/Presentiel | ✅ |

#### Tier 5 — Auth, Settings, Support, Edge

| # | Flow | Écrans clés | Statut |
|---|------|-------------|--------|
| 14.13 | 🔐 Auth | Login → Signup → VerifyEmail → MagicLink → ForgotPassword → ResetPassword | ✅ |
| 14.14 | ⚙️ Profile/Account | Profile → Account → Billing → Settings → Credits → Privacy/Consent/DSAR/Delete → NotificationPreferences | ✅ |
| 14.15 | ❓ Support | Help → Search → Article → Tickets → Tutorials | ✅ |
| 14.16 | 🤖 Chatbot | Assistant → History | ✅ |
| 14.17 | 🚫 Errors | 404 → 500 | ✅ |

### Phase 14 close — critères

- 17 flows validés (4 checkpoints chacun)
- Screenshots mobile + desktop archivés par flow
- Notion Écrans DB : tous les Statut design = "Validé"
- Parcours new-user complet (signup → onboarding → first lesson → first badge) sans glitch visuel

📄 Plan détaillé : `~/.claude/plans/plan-phase-14-lazy-kernighan.md`

---

## Phase 15 — Validation & Polish (2026-05-15+) 🚀

**Objectif** : Valider la cohérence end-to-end de l'app après Phase 14, capturer screenshots finaux, et peaufiner les details (transitions, glass effects, spacing).

### Checklist Phase 15

- [x] **15.1** — End-to-end flow testing ✅
  - [x] Signup → Onboarding → Dashboard → First lesson → First badge (parcours new-user complet)
  - [x] Chaque page charge sans erreur console (`preview_console_logs`)
  - [x] Transitions fluides (glass morphism, modales, drawers)
  - [x] Navigation cohérente (sidebar active states, breadcrumbs, back buttons)

- [x] **15.2** — Mobile + Desktop validation ✅
  - [x] 375px mobile screenshots (representative pages from all 5 tiers)
  - [x] 1280px desktop screenshots (complex layouts)
  - [x] Responsive breakpoints cohérentes (md, lg)
  - [x] Touch targets ≥ 44px (`min-h-touch`) sur interactifs

- [x] **15.3** — Visual consistency audit ✅
  - [x] Max 2 tones par flow (dominant + accent)
  - [x] Semantic spacing tokens appliqués (`gap-stack`, `gap-section`)
  - [x] Tone-aware components use correct variants (EditorialHero tone, Button variant)
  - [x] No legacy BEM classes (grep 0 matches: `tls-*`, `.btn`, `.card-*`)
  - [x] No inline var() in style (grep 0 matches: `style.*var(--tls-`)

- [ ] **15.4** — Design system completeness
  - [ ] All showcase-only components integrated where needed
  - [ ] usedBy fields updated in Components.tsx
  - [ ] All tone-aware variants demoed in showcase
  - [ ] No orphaned showcase entries

- [ ] **15.5** — Documentation finalization
  - [x] CLAUDE.md Phase 14 section updated with patterns discovered
  - [x] DESIGN.md §4 Patterns canoniques (Stable/À faire évoluer) complete
  - [x] DESIGN.md §5 Pièges updated with Phase 14 discoveries
  - [ ] Notion Écrans DB all entries Status = "Validé" or "Intégré"
  - [ ] Notion Design System DB all components updated

- [x] **15.6** — Final TypeScript + build check ✅
  - [x] `npx tsc --noEmit` → 0 errors
  - [x] `npm run build` succeeds
  - [x] Bundle size reasonable (no unexpected jumps)

### Success criteria Phase 15 ✅
- New-user flow (signup → first badge) works end-to-end mobile + desktop
- All 140+ pages render without console errors or visual glitches
- Design system fully migrated to Tailwind (0 BEM, 0 inline var())
- Documentation 100% synced to code state
- Notion DBs reflect final state

---

### Notion sync — règles intégrées au workflow Phase 14 (Étape 5 de chaque flow)

À l'étape 5 (Doc + Notion sync) de **chaque** flow Phase 14, en plus des mises à jour CLAUDE.md / DESIGN.md :

```
Pour chaque écran du flow en cours :
  1. Fetch l'entrée correspondante dans la DB Écrans Learning App
     (data_source_url: collection://e6fa768a-44c8-4128-b1b3-3b4a2492c8aa)
  2. Vérifier que `Composants clés` reflète le code actuel
     (lire imports depuis ../components/* dans le .tsx)
  3. Vérifier que `Objectif de la page` est précis et à jour
     (source : JSDoc en tête du fichier ou h1 du composant)
  4. Si page nouvellement Tailwind + tone-aware : Statut design = "Validé"
     (sinon laisser "Intégré")
  5. Confirmer `Disponible sur l app` = YES (sauf consolidation ⛔)
  6. Si doublon dans la liste ci-dessous → supprimer le doublon le moins riche
```

**Source de vérité unique :** le code dans `src/pages/*.tsx`. Si Notion diverge → corriger Notion, jamais l'inverse (sauf décision design explicite).

### 🗑️ Doublons à nettoyer (audit 2026-05-15)

8 paires d'entrées avec la même route à supprimer manuellement dans Notion. À chaque flow concerné, l'agent doit garder la plus complète (Statut: Intégré, Composants riches, Objectif précis) et supprimer l'autre :

| Page | ID à garder (probable) | ID à supprimer (probable) | Flow concerné |
|------|-----------------------|--------------------------|---------------|
| Account | `35ecdd69-6db6-81db-82ec-fba830b2ac5d` | `35ecdd69-6db6-81ad-b45e-d74e66709d7b` | 14.14 Profile/Account |
| Veille | `35ecdd69-6db6-8113-b9f7-d69d39d33510` (Intégré) | `35ecdd69-6db6-81f2-836b-f9d1ea8c947f` (À faire) | 14.7 Veille |
| Magazine | `35ecdd69-6db6-81c9-be3c-e9c9c5aee664` (Intégré) | `35ecdd69-6db6-81fe-a483-cd26c8496e23` (À faire) | 14.7 Veille |
| VideoTutorial | `35ecdd69-6db6-818e-a030-d834498555ed` | `35ecdd69-6db6-81ef-9730-ee16899a1bfd` | 14.7 Veille |
| VideoViewer | `35ecdd69-6db6-813f-954d-c8693d91fcda` | `35ecdd69-6db6-8135-9075-e1635ea1d5bf` | 14.7 Veille |
| JournalFreeEntry | `35ecdd69-6db6-8171-8d61-d0dc4c039daf` | `35ecdd69-6db6-8142-971a-c05910958ec8` | 14.5 Journal |
| Error404 | `35ecdd69-6db6-81a3-9849-cc3f67f18b5f` | `35ecdd69-6db6-81d6-9ba1-d22dce369aa1` | 14.17 Errors |
| Error500 | `35ecdd69-6db6-81f0-8ed7-dfaa15aa9bb9` | `35ecdd69-6db6-819e-94f5-f1c920fdb1b7` | 14.17 Errors |

**Note :** à chaque flow, fetcher les 2 entrées du doublon pour confirmer laquelle est la plus riche avant suppression — l'ID "à garder" ci-dessus est une hypothèse à vérifier.

### 🗑️ Entrée orpheline marquée pour suppression (2026-05-15)

- ID `361cdd696db680ea9688ea933ae3408f` — renommée "🗑️ À SUPPRIMER — entrée orpheline vide". Supprimer manuellement depuis l'UI Notion.

### 📋 État sync Notion ↔ Code (audit 2026-05-15)

- **Phase 16 (14 mai, 14 entrées `360cdd*`)** : 100% synchronisées avec le code — pas d'action requise sauf à l'étape "Validé"
- **Tier 1 (12-13 mai)** : Composants cohérents, Objectifs corrects. Statut design à passer "Intégré" → "Validé" au fil des flows Phase 14
- **2 entrées updatées le 2026-05-15** : Dashboard (`/`) et Coaching (`/coaching`) — Statut "En cours" → "Intégré", composants modernisés
- **Bulk sync exhaustive bloquée** : `notion-query-database-view` MCP ne supporte pas la pagination par cursor → sync flow-par-flow obligatoire (workflow Phase 14 ci-dessus)

---

### Phase 14.2a — Apprenant core : navigation & mobile ✅ (2026-05-15)

Sous-phase A du redesign Apprenant core (split 14.2 en 3 : a/b/c). Focus = unification des shells viewer + fix navigation cassée + mobile a11y.

**Pages touchées (4)** :
- `Positionnement.tsx` — `handleStartPath` : "Commencer le parcours" route maintenant vers `/learning-paths/:id/lessons/:firstLessonId` au lieu de retourner à PathDetail (fix issue UX #2 audit)
- `LessonPlayer.tsx` — header custom 32+ lignes → `<ViewerHeader>` tone-aware · footer custom dot pagination → `<LessonNavigation>` · `handleClose` route maintenant vers `ctx.nextLesson` si dispo, sinon PathDetail
- `AstucesViewer.tsx` — header custom (accent-400 hardcoded) → `<ViewerHeader>` tone-aware avec progress · dots custom → `<LessonNavigation>` · couleurs via TONE_BG_500/TONE_TEXT_700/TONE_BG_50/TONE_BORDER_200 selon `useLessonContext()?.tone` (fallback `sun`)
- `FlashcardsViewer.tsx` — close-only header → `<ViewerHeader>` complet · footer custom → `<LessonNavigation>` · gradient + borders via TONE_HERO_GRADIENT/TONE_BORDER_500 (fallback `primary`)

**Nouveaux DS components (4)** :
1. `ui/ProgressDots` — atom carousel indicator · 3 tailles (xs/sm/md) · 3 tones · clickable optional · active dot widened ~3×
2. `patterns/LessonNavigation` — molecule footer [Prev] · dots · [Next/Finish] · tone-aware · responsive (labels masqués mobile)
3. `lib/lesson-context` — `LessonProvider`, `useLessonContext`, `resolveAfterLessonRoute` — context React pour injecter `{ lesson, prev, next, parcoursId, tone }` aux viewers
4. `patterns/ViewerHeader` (**extension**) — ajout des props `tone` + `progress` + touch-sized buttons (44 px min)

**Helper data** : `data/learningPaths.ts:getFirstLessonId(pathId)` — utilisé par Positionnement pour le forward-nav.

**Validation** : `npx tsc --noEmit` ✅ · preview AstucesViewer/FlashcardsViewer/LessonPlayer desktop ✅ · 0 console errors · close buttons 44 px (min-h-touch).

**Terminé en 14.2c** → voir section Phase 14.2c ci-dessous.

---

### Phase 14.2b — Apprenant core : viewers restants ✅ (2026-05-15)

Sous-phase B : migration des 2 viewers restants vers ViewerHeader + tone system. Tous les viewers partagent désormais le même shell.

**Pages migrées** :
- `ComplementaryContentViewer` — drop ViewerOverlay, ViewerHeader + useLessonContext (fallback primary), fixed inset-0 z-modal, tone-aware icon bubbles (TONE_BG_500), per-type badge variants (article→brand, video→warm, guide→sun, tool→neutral)
- `VideoViewer` — drop ViewerOverlay(dark), ViewerHeader(primary), zone vidéo bg-ink-950 préservée comme section contenu, min-h-touch sur tous les contrôles player

**Pattern consolidé (4 viewers unifiés)** : AstucesViewer · FlashcardsViewer · ComplementaryContentViewer · VideoViewer → tous utilisent `ViewerHeader + useLessonContext() + fixed inset-0 z-modal` (Complementary/Astuces/Flashcards) ou `min-h-screen + ViewerHeader` (VideoViewer — page Veille).

**Validation** : `npx tsc --noEmit` ✅ · preview ComplementaryContentViewer ✅ · preview VideoViewer ✅ · 0 console errors.

---

### Phase 14.2c — Apprenant core : FlipCard + persistence + video ✅ (2026-05-15)

Sous-phase C : extraction DS, persistence Zustand, vrai player vidéo.

**Nouveaux composants DS** :
- `patterns/FlipCard` — 3D flip card atom. Props: `front{image,icon,category,title}`, `back{content,details?}`, `isFlipped`, `onFlip`, `tone`. Extrait de FlashcardsViewer (~90 LOC enlevés du viewer). Tone-aware (border + back gradient via TONE_BORDER_500/TONE_HERO_GRADIENT).

**Persistence étendue** (`stores/persistence.ts`) :
- `LessonProgressEntry` + `reflections?: Record<string,string>` + `actionPlan?: ActionPlan`
- Actions `setReflection(lessonId, key, value)` + `setActionPlan(lessonId, plan)` ajoutées au store Zustand
- `LessonPlayer` Réfléchir textareas + Appliquer inputs initialisés depuis le store et écrivent à chaque `onChange` → survit à la navigation entre sections

**VideoViewer** :
- `<video ref>` natif remplace le bouton play placeholder
- Contrôles wired : play/pause toggle, mute, barre de progression seekable (clic pour seeker), affichage temps live `formatTime()`, plein écran via `requestFullscreen()`
- `onEnded` → `setIsPlaying(false)`

**Validation** : `npx tsc --noEmit` ✅ · FlashcardsViewer flip ✅ · VideoViewer lecture ✅ · 0 console errors.

---

### Phase 14.1 — Première expérience ✅ (2026-05-15)

5 écrans redesignés en arc warm → brand avec Stepper persistant 4 étapes :
- `Onboarding` (warm) — OptionGrid pour role/sector/goals/rythme · sub-steps internes
- `OnboardingQuestionnaire` (warm) — DreyfusLevelSelector 5-niveaux responsive
- `OnboardingTutorial` (warm) — StepTutorial tone warm, route → success
- `OnboardingSuccess` (brand) — CongratulationsCard + NextStepsGrid (3 cards tone-mixed)
- `Dashboard` — `?firstTime=1` query param active EmptyDashboardState

**Nouveaux composants DS (P1 + P2)** :
1. `patterns/OptionGrid` — grille sélecteur icon+label (single/multi · 3 layouts · 3 tones)
2. `ui/DreyfusLevelSelector` — picker 5-niveaux Likert responsive (fix cramped tablet)
3. `patterns/CongratulationsCard` — bloc célébration milestone (badge + title + XP)
4. `patterns/NextStepsGrid` — grille action cards tone-mixed (brand/warm/sun par-item)
5. `patterns/EmptyDashboardState` — cold-start Dashboard pour new users
6. `lib/onboarding-steps.ts` — helper Stepper partagé 4 étapes cross-screen

Tous wired dans `components/index.ts` + 5 entrées showcase ajoutées dans `Components.tsx`.

**Validation** : `npx tsc --noEmit` ✅ · preview desktop + mobile ✅ · DOM scan 0 BEM `tls-*` legacy, 0 inline `--tls-*` var.

---

**Dernière mise à jour :** 2026-05-15 — Phase 14.1 ✅ (5 écrans + 5 nouveaux composants DS + helper onboarding-steps). Phase 14 ouverte 17 flows. Notion sync intégrée à l'étape 5. Phase 10 Tier 3 ✅. **Phase 16 ouverte** (Spec Compliance).

---

## PHASE 16 — Spec Compliance (alignement FO ↔ Cahiers des charges)

**Contexte** : Phases 1–15 ont migré le visuel (Tailwind, design system, redesign par flow). Le FO React **existe** pour les 17 cahiers Notion (~140 pages routées), mais la **conformité fonctionnelle aux specs** n'a jamais été auditée. Phase 16 ferme ce gap, un cahier à la fois.

**Source de vérité** : 17 cahiers Notion (URLs dans `CLAUDE.md` § Phase 16).

**Workflow par cahier (5 étapes)** :
1. **Gap analysis** vs pages existantes (coverage matrix : ✅ / 🟡 partiel / ❌ manquant)
2. **5–7 chantiers chiffrés** (S/M/L), priorisés
3. **Ordre d'exécution** : data first (`src/types/` + `src/data/`) → composants → pages → wiring store
4. **Screenshots avant/après** (mobile 375 px + desktop 1280 px)
5. **Notion sync** : Écrans DB (Statut design "Validé" si UI changée) + Design System DB (nouveaux composants)

**Anti-patterns** :
- ❌ Redessiner — Phase 14-15 a verrouillé le visuel. Phase 16 = **functional only**.
- ❌ Inventer des champs hors spec — toujours croiser avec le cahier Notion correspondant.
- ❌ Mocker côté serveur — les mock data restent dans `src/data/`, pas de stub API.

### 16.1 — Cahier #01 Parcours & Learning Space ✅
*Plan détaillé : `~/.claude/plans/01-parcours-learning-space-01-sequential-harbor.md`*

- 16.1.1 ✅ **Modèle données enrichi** — `subscription_tier`, `scope`, `competencies[]`, `progression_mode`, `Prerequisites`, `ItemType` (9 valeurs) — `src/data/learningPaths.ts`, `src/types/learning.ts`, `src/data/items.ts`
- 16.1.2 ✅ **Positionnement auto-gen Dreyfus 1–5** — refactor `Positionnement.tsx` génère N questions Dreyfus (1/compétence parcours) ; `DreyfusLevelSelector` intégré ; persist `UserPositioningResult` via `usePositioningStore` ; skip + no-repeat
- 16.1.3 ✅ **Progression mode STRICT/FLEXIBLE/FREE** — refactor `LearningPathDetail.tsx` avec 3 branches ; UI conditionnelle (verrou STRICT, warning soft FLEXIBLE, libre FREE)
- 16.1.4 ✅ **Learning Space query-driven + filtres unifiés** — 5 tabs statiques remplacés par grid + `FilterBar` (Thématique/Type/Durée/Niveau) + search câblée + 18 items mock taxonomie 9 types
- 16.1.5 ✅ **Access control (tier + pré-requis)** — `src/lib/access-control.ts` (`canAccessItem`, `getAccessDenialMessage`, `getGatingType`) ; UI grisée + badge 🔒 + bouton "Verrouillé" dans `LearningSpace.tsx`

### 16.2 → 16.17 — Autres cahiers ⬜

| Phase | Cahier | Effort FO | Tier | Top gaps |
|-------|--------|-----------|------|----------|
| 16.2 | #02 Passeport Compétences | M (1–2 sem) | **MVP** | ✅ 16.2.1 H.S.O. types + référentiel 20 compétences · ✅ 16.2.2 `LearnerCompetency`/`CompetencyObjective`/`CompetencyProgression` types + mock data `src/data/passeport.ts` · ✅ 16.2.3 `usePasseportStore` Zustand (localStorage, seed-on-first-access) · ✅ 16.2.4 `PasseportObjectifs` + `PasseportHistorique` câblés sur le store · ✅ 16.2.5 onboarding positionnement fallback MVP — `OnboardingQuestionnaire.tsx` 8 questions H.S.O. + `DreyfusLevelSelector` + seed `LearnerCompetency` via `passeportStore.setCompetency()` (implémenté dans 16.3) |
| 16.3 | #03 Onboarding + 5 rôles | M (1–2 sem) | **MVP** | ✅ UserRole (5 rôles spec) + UserProfile/Credits types · useUserProfileStore · Onboarding câblé store + rôles canoniques · OnboardingQuestionnaire → usePositioningStore + seed LearnerCompetency |
| 16.4 | #04 Coaching 1-1 | M (1–2 sem) | **MVP** | ✅ SessionStatus (6 statuts spec : booked/confirmed/in-progress/completed/cancelled/no-show) + SessionType + CoachingSession + CorrectionStatus + Correction types · src/data/coaching.ts (3 sessions mock, 2 corrections) · useCoachingStore (#11, seed-on-first-access) · CoachingBookingFlow : déduction crédit Classic + sauvegarde session store · Coaching.tsx : sessions passées depuis store + prochaine session depuis store |
| 16.5 | #05 Gamification Badges | S (3–5j) | **MVP** | ✅ BadgeType (plateforme/open_badge/competence) + XPTrigger types · `src/data/gamification.ts` (BADGE_DEFS, MOCK_USER_BADGES, MOCK_XP_EVENTS, MOCK_USER_STREAK) · useGamificationStore (xpEvents/badges/streaks, seed-on-first-access) · BadgeGallery câblé store (filtres BadgeType, badges locked dynamiques) · Gamification.tsx (stats/recentBadges/competenceBadges depuis stores, Dreyfus labels FR corrigés) · XPDashboard câblé store + max-w-page→wide · StreakDetail câblé store + max-w-page→wide |
| 16.6 | #06 Enterprise FO | M (1–2 sem) | **MVP** | ✅ EnterpriseRole/MemberStatus/CompanyMember/CompanyCohort/ManagerAlert/CompanyStats/CompanyProject/Company types · src/data/enterprise.ts (mock company, 5 members, 4 cohorts, 3 alerts, stats, 3 projects) · useEnterpriseStore (#12, seed-on-first-access, acknowledgeAlert) · Enterprise.tsx câblé store (membres actifs, stats KPIs, access list) · ManagerEnterprise.tsx câblé store (stats KPIs, alertes interactives, projets, cohortes) |
| 16.7 | #07 Journal réflexif | S (3–5j) | V1 sept | ✅ JournalEntry type + JournalEntryType/JournalMoodLevel · src/data/journal.ts (5 mock entries, EDRA_R_QUESTIONS, GENERIC_STRUCTURED_QUESTIONS) · useJournalStore (seed-on-first-access, addEntry/updateEntry/deleteEntry) · Journal.tsx câblé store + type mapping spec→display · JournalNewEntry câblé store + EDRA-R template auto (apprentissage/pratique-pro) + linkedItemId URL param · JournalSearch câblé store |
| 16.8 | #08 Masterclass + Atelier + Évent | M (2 sem) | V1 sept | ✅ MasterclassEnrollment/AtelierEnrollment/EventRegistration/ContentSurvey types · src/data/events.ts (3 masterclasses, 3 ateliers, 3 événements + enrollments/surveys) · useEventsStore (#18, seed-on-first-access): enrollInMasterclass, requestAtelierEnrollment (auto-waitlist si full), registerForEvent, submitSurvey · MasterclassHub câblé store (inscription/replay CTAs, badges statut, filtre "Mes inscriptions") · MasterclassSurvey: échelle 1-5 spec (remplacement emoji), wired store, success screen · AtelierHub câblé store (validé/waitlist badges, auto-waitlist flow) · AtelierWaitlist câblé store (position réelle) · EvenementHub câblé store (inscriptions, access gating privé/entreprise, featured CTA) |
| 16.9 | #09 Notifications | S (3–5j) | MVP+V1 | ✅ NotificationChannel/NotificationEventType/NotificationChannelPrefs/UserNotificationPrefs/InAppNotification types · src/data/notifications.ts (7 mock notifs + default prefs) · useNotificationPrefsStore (#13, persisted) + useInAppNotificationsStore (#14, seeded) · NotificationPreferences câblé store (4 canaux : in-app/push/email/whatsapp) + email tracking toggle (Journey #5 privacy) + WhatsApp section (V1 disabled) · Notifications.tsx câblé store + EventType→display mapping + relative time formatting |
| 16.10 | #10 Analytics | M (1–2 sem) | V1 sept | ✅ LearnerStatus/LearnerAnalyticsProfile/ItemCompletionRecord/CoachTeamStats types · src/data/analytics.ts (8 mock learner profiles with on-track/at-risk/stuck status, NPS-annotated completions, competency scores) · useAnalyticsStore (#16, persisted, seed-on-first-access) · CoachTeamDashboard câblé store (learner roster tab + status filter chips Tous/En progression/À risque/Bloqué + drill-down links to FicheApprenant) · FicheApprenantAnalytics câblé store (load learner by ID, competency radar, NPS history, relative timestamps) |
| 16.11 | #11 Projects SBO | XL (3+ sem) | V1 sept | ✅ ProjectType/ProjectStatus/TaskStatus/JacStatus/GatingCheck/ProjectTeamMember/SboProject/SboProjectTask/Jac/PasseportEnrichment types · src/data/projects.ts (2 projets, 4 tâches, 2 JACs, 4 membres équipe, 1 enrichissement) · useProjectsStore (#20, tls-projects, seed-on-first-access): getProjects(companyId), checkGating(userId,projectId), submitTask, submitJacValidation (rubric scoring 1-5), addEnrichment (MAJ teamMember.currentDreyfusLevels), updateTaskStatus · ProjectsList câblé store (filter status+type, gating warning par carte, progress réel) · Project câblé store (statCard compteurs, tasks list, enrichments feed, gating block) · ProjectTask câblé store (successCriteria checklist, deliverableSpec, form soumission livrable, gating Dreyfus badge, JACs liés) · ProjectJac câblé store (collapsible JAC list pending/done, JacValidationForm rubrique Dreyfus 4 critères, approve/reject/rework, submitJacValidation) · ProjectTeam câblé store (teamMembers avec currentDreyfusLevels colorés pass/fail, coverage count vs requis) · ProjectSkillGaps câblé store (gap analysis per skill, tableau matriciel membres×compétences, critical gaps vs covered) · ProjectPasseportFeed câblé store (feed chronologique enrichissements D→D, synthèse par collaborateur) |
| 16.12 | #11bis Subscription | M (1–2 sem) | MVP+V1 | ✅ 4 plans spec (free/plan_1/plan_2/plan_3) dans SubscriptionPayment · subscriptionTier dans UserProfile · Billing lit le store · CreditsPage Classic/Special · LearningSpace tier depuis store |
| 16.13 | #12 Chatbot RAG | M (1–2 sem) | V1 sept | ✅ ChatMessage/ChatSession/ChatSourceCitation/ChatFeedback types · src/data/chatbot.ts (PRIVACY_BLOCKLIST, CHAT_SUGGESTIONS, 3 mock RAG responses, simulateRAGResponse() avec privacy guard + low-confidence fallback score 0.45) · useChatStore (#17, persisté, seed-on-first-access) · ChatInterface rewrite: typing indicator animé, confidence threshold warning (<0.6), privacy blocker danger styling, source citations pills avec ExternalLink, feedback ThumbsUp/ThumbsDown persisté, auto-scroll |
| 16.14 | #12bis IA Framework | overlay | continu | 6-point validation à appliquer à toute feature IA |
| 16.15 | #13 Helpcenter | S (3–5j) | V2 sept | ✅ FaqCategory/FaqArticle/SupportTicket/TicketReply/ArticleFeedback/Tutorial types · src/data/helpcenter.ts (6 catégories, 8 articles, 2 tickets, replies, 3 tutorials) · useHelpcenterStore (#19, tls-helpcenter, seed-on-first-access): searchArticles, getArticle, getTickets, getTicketReplies, submitFeedback, submitTicket, addTicketReply, markArticleViewed · HelpSearch câblé (searchArticles + category chips) · HelpArticle câblé (feedback 👍/👎 persistés, articles liés) · HelpTickets câblé (tickets réels open/resolved tabs) · HelpTicketNew câblé (form → store.submitTicket → navigate to detail) · HelpTicketDetail câblé (ticket + replies + reply submission) · HelpTutorials câblé (store tutorials, section count, navigate to step) |
| 16.16 | #13bis GDPR/AI Act | S (3–5j) | **MVP** | ✅ GdprConsentType/UserGdprConsents/UserAIConsents/DsarRequest types · usePrivacyStore (#15, persisted: gdprConsents + aiConsents + dsarRequests) · ProfileConsent câblé store (AI consents persistés + section GDPR 3 types essential/analytics/marketing + ConsentBanner dismiss persisté) · PrivacyDsar câblé store (DSAR submission persistée + historique depuis store + deadline légale 30j) |

**Hors scope ce repo** : 10bis (plugin BO WordPress séparé).

**Ordre recommandé** (respecte dépendances) : 16.2 (Passeport bloque tout) → 16.1 → 16.3 → 16.12 → 16.5 / 16.7 → 16.4 → 16.6 / 16.10 → 16.13 / 16.14 → 16.8 / 16.11 → 16.15 / 16.16.

**Total Phase 16** : ~12–16 semaines-dev FO (hors backend WP + intégrations Stripe/Mistral/OAuth).

---

## PHASE 17 — UX Depth Pass (store wiring des pages à données statiques)

**Contexte** : Phase 16 a câblé les pages principales de chaque cahier. Un audit (2026-05-15) révèle que 11 pages secondaires conservent encore des mock data statiques au lieu de lire le store Zustand. Phase 17 les câble dans l'ordre MVP.

| # | Chantier | Pages | Store | Effort | Statut |
|---|----------|-------|-------|--------|--------|
| 17.1 | Passeport radar + compétences | `Passeport.tsx`, `PasseportCompetenceDetail.tsx` | `usePasseportStore` | S | ✅ |
| 17.2 | Corrections learner | `CorrectionDetailLearner.tsx` | `useCoachingStore` | S | ✅ |
| 17.3 | Coach enterprise dashboard | `CoachEnterpriseDashboard.tsx` | `useEnterpriseStore` | S | ✅ |
| 17.4 | Purchase credits | `PurchaseCredits.tsx` | `useUserProfileStore` | S | ✅ |
| 17.5 | Messaging thread | `MessagingThread.tsx` | `useCoachingStore` | S | ✅ |
| 17.6 | Privacy delete account | `PrivacyDeleteAccount.tsx` | `usePrivacyStore` | XS | ✅ |

---

## PHASE 18 — Cleanup & Components.tsx commit

**Contexte** : `Components.tsx` (showcase) a 376 lignes de diff non commitées. Phase 18 commit ce fichier puis câble les 3 pages V1 restantes à faible priorité.

| # | Chantier | Pages | Statut |
|---|----------|-------|--------|
| 18.1 | Commit Components.tsx | `Components.tsx` | ✅ |
| 18.2 | ManagerViewsBuilder | store persistence | ⬜ V1 |
| 18.3 | ItemRecommendations | `useCoachingStore` | ⬜ V1 |
| 18.4 | PerplexityContentDetail | static doc page (V1) | ⬜ V1 |

