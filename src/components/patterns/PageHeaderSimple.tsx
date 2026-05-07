import React from 'react';
import { PageHeader } from './PageHeader';

/**
 * @deprecated Use `PageHeader` directly with `variant="tight"` if you don't need an eyebrow.
 *
 * This component is kept as a thin alias for backward-compatibility.
 * It renders <PageHeader variant="tight" /> under the hood.
 */
interface PageHeaderSimpleProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export const PageHeaderSimple: React.FC<PageHeaderSimpleProps> = ({
  title,
  description,
  actions,
  className = '',
}) => (
  <PageHeader
    title={title}
    description={description}
    actions={actions}
    variant="tight"
    className={className}
  />
);

export default PageHeaderSimple;
