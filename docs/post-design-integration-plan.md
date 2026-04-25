# Post-Design Integration Plan

This file starts the separate integration phase after static UI sign-off.

## Preconditions

- All design families validated in static mode.
- Frontend build passes.
- No pending UI-only refactors on critical routes.

## Integration boundaries

- Integration work is handled separately from design-only branches.
- API attachment is enabled page family by page family.
- UI structure remains stable; only data bindings and state transitions are added.

## Activation order

1. Auth/session verification.
2. Dashboard + Learning Paths.
3. Learning Path Detail completion flow.
4. Coaching + Collaboration.
5. Veille + Journal.
6. Notifications/Messages/Leaderboard.

## Contract-first approach

- Define DTO/view-model contracts before wiring API calls.
- Keep adapters isolated from presentational components.
- Preserve empty/loading/error states on each page.

## Source backlog

- `docs/dynamic-backlog.md` remains the source of truth for attachment points.