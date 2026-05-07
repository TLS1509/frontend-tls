import React from 'react';
import { SectionHeader } from '../patterns/SectionHeader';

/**
 * @deprecated Use `SectionHeader` from `patterns/SectionHeader` directly.
 *
 * This is a thin alias kept for backward-compatibility.
 */
interface SectionTitleProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  divider?: boolean;
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  icon,
  action,
  divider = false,
  className = '',
}) => (
  <SectionHeader
    title={title}
    subtitle={subtitle}
    icon={icon}
    action={action}
    divider={divider}
    className={className}
  />
);

export default SectionTitle;
