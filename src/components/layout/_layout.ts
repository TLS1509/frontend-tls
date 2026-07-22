import type React from 'react';

/**
 * Shared layout primitive internals — spacing scale, gap maps, polymorphic typing.
 *
 * The `Space` scale mirrors the semantic spacing tokens in `index.css @theme`
 * (--spacing-{name}) 1:1, so migrating a raw class is mechanical:
 *   `gap-section`  →  <Stack gap="section">
 *   `gap-stack-xs` →  <Cluster gap="stack-xs">
 *
 * Class strings are written in full (never interpolated) so Tailwind's source
 * scanner can see every utility it must generate.
 */

export type Space =
  | 'none'
  | 'tight'        // 2px  — heading ↔ its immediate subtitle
  | 'stack-xs'     // 8px  — inline groups (chip rows, button groups)
  | 'stack'        // 16px — DEFAULT — card stacks, header ↔ first card
  | 'stack-lg'     // 24px — looser blocks within a section
  | 'section'      // 32px — between sibling <section>s
  | 'section-lg'   // 40px — major separations on dense pages
  | 'page';        // 48px — page-level groupings (hero ↔ first stage)

export const GAP: Record<Space, string> = {
  none: 'gap-0',
  tight: 'gap-tight',
  'stack-xs': 'gap-stack-xs',
  stack: 'gap-stack',
  'stack-lg': 'gap-stack-lg',
  section: 'gap-section',
  'section-lg': 'gap-section-lg',
  page: 'gap-page',
};

/** Join class fragments, dropping falsy ones — the house idiom (see CardGrid). */
export const cx = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(' ');

/**
 * Polymorphic prop helper. Lets a primitive render as any element/component via
 * `as`, inheriting that element's native props, while keeping its own props.
 *
 *   <Stack as="section" aria-label="…">   // gets <section> attrs
 *   <Container as="main">                  // gets <main> attrs
 */
/**
 * `ComponentPropsWithRef` et non `WithoutRef` : depuis React 19, `ref` est une
 * prop normale des composants fonction. Les 5 composants layout spreadent
 * `{...rest}` sur leur élément hôte, donc le ref arrive bien à destination —
 * seul le type l'interdisait (JournalDetail / MagazineArticle passaient un ref
 * à PageShell pour mesurer la progression de lecture).
 * Purement additif : aucun consommateur existant n'est affecté.
 */
export type PolymorphicProps<
  E extends React.ElementType,
  OwnProps,
> = OwnProps &
  Omit<React.ComponentPropsWithRef<E>, keyof OwnProps | 'as'> & {
    as?: E;
  };
