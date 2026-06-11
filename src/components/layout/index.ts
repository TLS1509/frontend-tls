/* ============================================================================
 * Layout primitives — the low-level structural vocabulary.
 *
 *   Container  — width-capped, centered column + responsive gutter
 *   PageShell  — full page scaffold (Container + vertical padding + Stack)
 *   Stack      — vertical flow with one token-bound gap
 *   Cluster    — horizontal group that wraps (chips, tags, button rows)
 *   Grid       — generic 2D grid (fluid auto-fit or fixed columns)
 *
 * These own structure only — width, spacing rhythm, flow — never color or type.
 * For card collections use <CardGrid>; for section headings use <SectionHeader>.
 * ========================================================================== */

export { Container } from './Container';
export type { ContainerWidth } from './Container';

export { PageShell } from './PageShell';

export { Stack } from './Stack';
export type { StackAlign } from './Stack';

export { Cluster } from './Cluster';
export type { ClusterAlign, ClusterJustify } from './Cluster';

export { Grid } from './Grid';

export type { Space } from './_layout';
