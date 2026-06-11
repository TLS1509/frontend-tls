# React ↔ Figma Make Gap Matrix

## Scope
- Current React routes audited in `frontend/src/pages`.
- Figma reference screens audited in `figmamakedesignreact/src/app/pages`.
- Static-first migration only: no WordPress/API binding in this phase.

## Route Mapping

| Current React Page | Figma Reference | Gap Level | Main Gaps | Reuse Components |
| --- | --- | --- | --- | --- |
| `Dashboard` | `DashboardPageUpgraded` | Medium | Inline styles, mixed visual patterns, no shared page-shell tokens | `Card`, `Button`, `Badge`, `ProgressBar` |
| `LearningPaths` | `ParcoursPageUpgraded` | Low | Mostly aligned already, needs token cleanup and consistency | `Card`, `Badge`, `ProgressBar` |
| `LearningPathDetail` | `ParcoursPageUpgraded` + content viewers | Low | Rich page already, mostly typography/spacing harmonization | `Button`, `Tabs`, `ProgressBar` |
| `Coaching` | `CoachingPageUpgraded` | High | Legacy inline styling, no TLS hierarchy, basic card composition | `Card`, `Badge`, `Button` |
| `Collaboration` | `MessagesPage` + team/project patterns | High | Hardcoded colors, ad hoc badges/actions | `Card`, `Badge`, `ProgressBar`, `Button` |
| `Monitoring` | `VeillePage` | High | Inline styles, category colors hardcoded, weak layout rhythm | `Card`, `Badge`, `Button` |
| `Profile` | `ProfilePage` | High | Minimal placeholder UI, no dashboard-style profile sections | `Card`, `Badge`, `Button` |
| `Settings` | `AccountPage` | High | Minimal checkbox list, no grouped settings sections | `Card`, `Button`, form styles |
| `PagesIndex` | N/A (internal navigation hub) | Medium | Status labels outdated after migration scope expansion | `Card`, `Badge`, `Button` |

## Additional Pages to Introduce (Static)

| Figma Screen | Target Route | Phase |
| --- | --- | --- |
| `LoginPage` | `/auth/login` | Static route wave 1 |
| `SignupPage` | `/auth/signup` | Static route wave 1 |
| `ForgotPasswordPage` | `/auth/forgot-password` | Static route wave 1 |
| `NotificationsPageUltra` | `/notifications` | Static route wave 1 |
| `MessagesPage` | `/messages` | Static route wave 1 |
| `LeaderboardPage` | `/leaderboard` | Static route wave 1 |
| `VeilleContentPage` | `/veille` | Static route wave 1 |
| `ArticleDetailPage` | `/veille/article` | Static route wave 2 |
| `WeeklyNewsDetailPage` | `/veille/news` | Static route wave 2 |
| `JournalPageUpgraded` | `/journal` | Static route wave 1 |
| `JournalNewEntryPage` | `/journal/new` | Static route wave 2 |
| `JournalDetailPage` | `/journal/:id` | Static route wave 2 |

## Token Alignment Rules
- Use TLS semantic variables (`--bg`, `--surface`, `--text`, `--border`) first.
- Avoid direct hex values in pages.
- Prefer component variants over one-off CSS declarations.
- Keep spacing on scale (`--s-*`) and typography on scale (`--t-*`).

## Migration Definition of Done (Static Phase)
- Page structure visually aligned with Figma references.
- Responsive behavior validated in mobile/tablet/desktop breakpoints.
- No backend/content fetch dependency required to render pages.
- No new duplicate component family introduced.
