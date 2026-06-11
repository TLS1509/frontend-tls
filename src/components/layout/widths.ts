/**
 * Container width scale — shared by <Container> and <PageShell>.
 *
 * Each maps to a `--container-*` token (index.css @theme = source of truth):
 *   prose    65ch   → long-form reading column
 *   content  768px  → narrow / focused pages          (= max-w-3xl)
 *   medium   1024px → mid-width content / detail pages (= max-w-5xl)
 *   page     1152px → DEFAULT — standard content pages (= max-w-6xl)
 *   wide     1280px → dashboards / data-rich pages     (= max-w-7xl)
 *   full     none   → edge-to-edge
 *
 * ⚠️ `max-w-page` is force-corrected in index.css (unlayered rule) to dodge the
 * spacing/container `page` name collision — see the note there before renaming.
 */
export type ContainerWidth = 'prose' | 'content' | 'medium' | 'page' | 'wide' | 'full';

export const WIDTH: Record<ContainerWidth, string> = {
  prose: 'max-w-prose',
  content: 'max-w-content',
  medium: 'max-w-medium',
  page: 'max-w-page',
  wide: 'max-w-wide',
  full: 'max-w-none',
};
