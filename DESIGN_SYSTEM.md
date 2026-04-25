# DESIGN_SYSTEM (Frontend)

## Source of truth
- Tokens globaux: `src/styles/design-tokens.css`
- Styles composants: `src/styles/tls-components.css`
- Styles pages: `src/styles/*.css`

## Palette (tokens principaux)
- Primary: `--tls-primary-50` ... `--tls-primary-900`
- Orange: `--tls-orange-50` ... `--tls-orange-900`
- Yellow: `--tls-yellow-50` ... `--tls-yellow-900`
- Neutres (ink): `--tls-ink-0` ... `--tls-ink-950`

## Tokens sémantiques à privilégier
- Fond: `--bg`, `--surface`, `--surface-muted`
- Texte: `--text`, `--text-muted`, `--text-soft`
- Bordures: `--border`, `--border-strong`
- Marque: `--brand`, `--brand-ink`

## Typographie
- Display: `--font-display` (League Spartan)
- Body: `--font-body` (Nunito)
- Échelle:
  - `--t-h1`, `--t-h2`, `--t-h3`, `--t-h4`
  - `--t-body-lg`, `--t-body`, `--t-body-sm`
  - `--t-caption`, `--t-micro`

## Espacements, radius, ombres
- Spacing scale: `--s-1` à `--s-32`
- Radius: `--r-xs` à `--r-2xl`, `--r-pill`
- Shadows: `--shadow-xs` à `--shadow-xl`, `--shadow-brand`, `--shadow-warm`

## Règles d’implémentation
- Utiliser d'abord les tokens et composants existants.
- Éviter les valeurs hex directes et les tailles arbitraires.
- Respecter l’échelle de spacing/typo.
- Ajouter des hover/focus accessibles et cohérents.

## Mapping Figma vers code
- Couleurs: map vers `--tls-*` ou rôles `--surface/--text/...`
- Espacements: map vers `--s-*`
- Radius: map vers `--r-*`
- Ombres: map vers `--shadow-*`

## Composants de base à réutiliser
- `src/components/core/Button.tsx`
- `src/components/core/Card.tsx`
- `src/components/ui/Badge.tsx`
- `src/components/ui/ProgressBar.tsx`

## Scope de phase (important)
- Phase actuelle = statique uniquement.
- Aucune intégration backend/plugin/API.
