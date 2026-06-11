# Dynamic Backlog (Deferred)

This backlog is intentionally deferred until plugin refactoring is complete.

## 1) API Attachment Points by Page
- `Dashboard`: user KPIs, current learning path, recent activity feed.
- `LearningPaths`: list, filters, progress percentages.
- `LearningPathDetail`: steps/lessons completion state and project unlock state.
- `Coaching`: session catalog, booking status, agenda slots.
- `Collaboration`: projects, members, task metrics.
- `Monitoring` and `Veille`: editorial feed, categories, read/save state.
- `Journal`: entries list and detail.
- `Notifications` and `Messages`: inbox counters, thread messages.
- `Leaderboard`: points and rank metrics.

## 2) Frontend Contracts to Prepare
- Normalize page payloads under typed modules (`PageDTO`, `CardDTO`, `ProgressDTO`).
- Keep view models independent from WordPress raw payloads.
- Define UI fallback behavior for empty, loading and error states.

## 3) Activation Order After Plugin Stabilization
1. Auth/session verification.
2. Dashboard + LearningPaths.
3. LearningPathDetail completion flow.
4. Coaching + Collaboration.
5. Veille/Monitoring + Journal.
6. Notifications/Messages/Leaderboard.
