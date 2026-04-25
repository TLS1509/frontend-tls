# The Learning Society Frontend

Frontend SPA for The Learning Society platform.

## Stack
- React + TypeScript + Vite
- CSS design tokens + shared component styles
- React Router + Zustand

## Strict Scope (important)
This frontend is currently in a static design phase.

- Allowed: `frontend/src/pages`, `frontend/src/components`, `frontend/src/styles`
- Not allowed: backend/WordPress/plugin changes (`wp-content/**`, plugin code)
- Not allowed in this phase: API/plugin wiring

Use these handoff docs:
- `Handoff-Start.md`
- `DESIGN_SYSTEM.md`
- `Cursor-Workflow.md`
- `Page-Mapping.md`

## Local Commands
```bash
npm install
npm run dev
npm run build
```

## Design System Source
- Tokens: `src/styles/design-tokens.css`
- Shared component styles: `src/styles/tls-components.css`
- Page-specific styles: `src/styles/*.css`
