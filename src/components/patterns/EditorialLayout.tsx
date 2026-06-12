import React from 'react';

/**
 * EditorialLayout — 2-column content layout with sticky aside.
 *
 * Used by editorial pages (MagazineArticle, ArticleDetail, Newsletter,
 * WeeklyNewsDetail) and content pages with related-items aside.
 *
 * Layout:
 *  - md+: `1.4fr 0.8fr` columns (or reversed via `asideFirst`)
 *  - mobile: stacks vertically
 *  - aside is sticky on md+ via `position: sticky` (offset = 96px from top)
 */

export interface EditorialLayoutProps {
  main: React.ReactNode;
  aside?: React.ReactNode;
  /** Place aside before main on desktop. Default: false (main first). */
  asideFirst?: boolean;
  /** Disable sticky behavior on aside. Default: false. */
  staticAside?: boolean;
  className?: string;
}

export const EditorialLayout: React.FC<EditorialLayoutProps> = ({
  main,
  aside,
  asideFirst = false,
  staticAside = false,
  className = '',
}) => {
  if (!aside) {
    return <div className={['flex flex-col gap-stack', className].filter(Boolean).join(' ')}>{main}</div>;
  }

  return (
    <div
      className={[
        'grid gap-stack',
        asideFirst
          ? 'md:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.4fr)]'
          : 'md:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={['flex flex-col gap-stack min-w-0', asideFirst ? 'md:order-2' : ''].filter(Boolean).join(' ')}>
        {main}
      </div>
      <aside
        className={[
          'flex flex-col gap-stack min-w-0',
          asideFirst ? 'md:order-1' : '',
          staticAside ? '' : 'md:sticky md:top-24 md:self-start',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {aside}
      </aside>
    </div>
  );
};

export default EditorialLayout;
