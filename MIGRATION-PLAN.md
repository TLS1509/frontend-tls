# MIGRATION-PLAN.md — Migration Tailwind CSS : The Learning Society

**Objectif :** Remplacer 2 105 inline styles + classes BEM par des classes Tailwind mappées
**Approche :** 1 composant/page par commit · validation obligatoire après chaque étape
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
| 1.1 | Button | `src/components/core/Button.tsx` | ~0 | `.btn--*` (8 variants) | ⬜ |
| 1.2 | Card | `src/components/core/Card.tsx` | ~5 | `.card--*` (6 variants) | ⬜ |
| 1.3 | Input | `src/components/core/Input.tsx` | ~8 | `.input--*` | ⬜ |
| 1.4 | Select | `src/components/core/Select.tsx` | ~5 | `.select--*` | ⬜ |
| 1.5 | FormGroup | `src/components/core/FormGroup.tsx` | ~3 | `.form-group` | ⬜ |

**Validation obligatoire après chaque composant** — screenshot + npm run dev + tsc

---

## PHASE 2 — Dashboard (priorité visuelle haute)

| # | Fichier | Inline styles | Actions | Statut |
|---|---------|--------------|---------|--------|
| 2.1 | Dashboard.tsx | 27 | Migrer hero gradient, KPIs, layout principal | ⬜ |
| 2.2 | DashboardHero (pattern) | ~15 | Composant hero réutilisable | ⬜ |

**Validation** — hero visible avec gradient, stat chips colorés, mise en page correcte

---

## PHASE 3 — Modales (composants haute visibilité)

| # | Composant | Fichier | Inline styles | Statut |
|---|-----------|---------|--------------|--------|
| 3.1 | BookingModal | `src/components/modals/BookingModal.tsx` | 36 | ⬜ |
| 3.2 | PositionnementModal | `src/components/modals/PositionnementModal.tsx` | 34 | ⬜ |
| 3.3 | SuccessModal | `src/components/modals/SuccessModal.tsx` | ~10 | ⬜ |
| 3.4 | VideoPlayerModal | `src/components/modals/VideoPlayerModal.tsx` | 17 | ⬜ |
| 3.5 | StreakCelebrationModal | `src/components/modals/StreakCelebrationModal.tsx` | 20 | ⬜ |
| 3.6 | SessionFeedbackModal | `src/components/modals/SessionFeedbackModal.tsx` | 13 | ⬜ |
| 3.7 | CancelSessionModal | `src/components/modals/CancelSessionModal.tsx` | 16 | ⬜ |
| 3.8 | ConfirmModal | `src/components/modals/ConfirmModal.tsx` | ~5 | ⬜ |

---

## PHASE 4 — Pages Learning (cœur de la plateforme)

| # | Page | Fichier | Inline styles | Statut |
|---|------|---------|--------------|--------|
| 4.1 | LearningPathDetail | `src/pages/LearningPathDetail.tsx` | 95 | ⬜ |
| 4.2 | LearningPaths | `src/pages/LearningPaths.tsx` | ~20 | ⬜ |
| 4.3 | LearningSpace | `src/pages/LearningSpace.tsx` | 63 | ⬜ |
| 4.4 | LessonPlayer | `src/pages/LessonPlayer.tsx` | ~25 | ⬜ |
| 4.5 | Réussites / Profile | `src/pages/Profile.tsx` | ~15 | ⬜ |

---

## PHASE 5 — Composants UI (par ordre de fréquence d'usage)

| # | Composant | Fichier | Statut |
|---|-----------|---------|--------|
| 5.1 | Badge | `src/components/ui/Badge.tsx` | ⬜ |
| 5.2 | Avatar | `src/components/ui/Avatar.tsx` | ⬜ |
| 5.3 | Alert | `src/components/ui/Alert.tsx` | ⬜ |
| 5.4 | StatCard | `src/components/ui/StatCard.tsx` | ⬜ |
| 5.5 | ProgressBar | `src/components/ui/ProgressBar.tsx` | ⬜ |
| 5.6 | Medal | `src/components/ui/Medal.tsx` | ⬜ |
| 5.7 | Toast | `src/components/ui/Toast.tsx` | ⬜ |
| 5.8 | Modal | `src/components/ui/Modal.tsx` | ⬜ |
| 5.9 | EmptyState | `src/components/ui/EmptyState.tsx` | ⬜ |
| 5.10 | Skeleton | `src/components/ui/Skeleton.tsx` | ⬜ |
| 5.11 | GlassCard | `src/components/ui/GlassCard.tsx` | ⬜ |
| 5.12 | ParcoursCard | `src/components/ui/ParcoursCard.tsx` | ⬜ |
| 5.13 | KPICard | `src/components/ui/KPICard.tsx` | ⬜ |
| 5.14 | CompetenceBadge | `src/components/ui/CompetenceBadge.tsx` | ⬜ |
| 5.15 | ProfileCard | `src/components/ui/ProfileCard.tsx` | ⬜ |
| 5.16 | CourseCard | `src/components/ui/CourseCard.tsx` | ⬜ |
| 5.17 | ResourceCard | `src/components/ui/ResourceCard.tsx` | ⬜ |
| 5.18 | ActionCard | `src/components/ui/ActionCard.tsx` | ⬜ |
| 5.19 | Tabs | `src/components/ui/Tabs.tsx` | ⬜ |
| 5.20 | Pagination | `src/components/ui/Pagination.tsx` | ⬜ |
| 5.21 | Stepper | `src/components/ui/Stepper.tsx` | ⬜ |
| 5.22 | Steps | `src/components/ui/Steps.tsx` | ⬜ |
| 5.23 | FilterChip | `src/components/ui/FilterChip.tsx` | ⬜ |
| 5.24 | Search | `src/components/ui/Search.tsx` | ⬜ |
| 5.25 | Breadcrumb | `src/components/ui/Breadcrumb.tsx` | ⬜ |
| 5.26-5.48 | Composants UI restants | `src/components/ui/[...].tsx` | ⬜ |

---

## PHASE 6 — Composants Patterns

| # | Composant | Fichier | Statut |
|---|-----------|---------|--------|
| 6.1 | CardGrid | `src/components/patterns/CardGrid.tsx` | ⬜ |
| 6.2 | HeroSection | `src/components/patterns/HeroSection.tsx` | ⬜ |
| 6.3 | ActivityFeed | `src/components/patterns/ActivityFeed.tsx` | ⬜ |
| 6.4 | CoachCardGrid | `src/components/patterns/CoachCardGrid.tsx` | ⬜ |
| 6.5 | LearningPathGrid | `src/components/patterns/LearningPathGrid.tsx` | ⬜ |
| 6.6 | PageHeader | `src/components/patterns/PageHeader.tsx` | ⬜ |
| 6.7 | ToneAwareCard | `src/components/patterns/ToneAwareCard.tsx` | ⬜ |
| 6.8-6.29 | Patterns restants | `src/components/patterns/[...].tsx` | ⬜ |

---

## PHASE 7 — Composants Learning

| # | Composant | Fichier | Statut |
|---|-----------|---------|--------|
| 7.1 | SessionCard | `src/components/learning/SessionCard.tsx` | ⬜ |
| 7.2 | LessonCard | `src/components/learning/LessonCard.tsx` | ⬜ |
| 7.3 | ArticleCard | `src/components/learning/ArticleCard.tsx` | ⬜ |
| 7.4 | VideoCard | `src/components/learning/VideoCard.tsx` | ⬜ |
| 7.5-7.11 | Learning restants | `src/components/learning/[...].tsx` | ⬜ |

---

## PHASE 8 — Pages principales (49 pages restantes)

Après phases 1-7, migrer les pages dans cet ordre :

| # | Page | Inline styles | Statut |
|---|------|--------------|--------|
| 8.1 | Coaching | `src/pages/Coaching.tsx` | ⬜ |
| 8.2 | CoachingCompteRendu | `src/pages/CoachingCompteRendu.tsx` | 70 | ⬜ |
| 8.3 | Messages | `src/pages/Messages.tsx` | 67 | ⬜ |
| 8.4 | Settings | `src/pages/Settings.tsx` | 57 | ⬜ |
| 8.5 | Veille | `src/pages/Veille.tsx` | ~30 | ⬜ |
| 8.6 | VeilleContent | `src/pages/VeilleContent.tsx` | 63 | ⬜ |
| 8.7 | Dossier | `src/pages/Dossier.tsx` | 73 | ⬜ |
| 8.8 | WeeklyNewsletter | `src/pages/WeeklyNewsletter.tsx` | 57 | ⬜ |
| 8.9 | Journal | `src/pages/Journal.tsx` | ~40 | ⬜ |
| 8.10 | JournalDetail | `src/pages/JournalDetail.tsx` | ~35 | ⬜ |
| 8.11 | JournalNewEntry | `src/pages/JournalNewEntry.tsx` | ~30 | ⬜ |
| 8.12 | JournalFreeEntry | `src/pages/JournalFreeEntry.tsx` | ~25 | ⬜ |
| 8.13-8.49 | Pages restantes | `src/pages/[...].tsx` | ⬜ |

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

**Phases complètes :** 0.5 / 9
**Composants validés :** 0 / ~120
**Inline styles restants :** 2 105 / 2 105
**Dernière mise à jour :** 2026-05-05
