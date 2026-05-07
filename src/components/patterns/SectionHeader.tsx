import React from 'react';
import type { LucideIcon } from 'lucide-react';

/**
 * SectionHeader — Canonical section-level heading within a page.
 *
 * - Optional icon (LucideIcon component OR ReactNode for emoji/custom).
 *   Icon bubble size and stroke auto-scale to match title size.
 *   Icon + title are vertically centered (subtitle pushes title up
 *   slightly so the icon stays aligned with the title baseline).
 * - Title (h2) + optional subtitle.
 * - Optional action slot (right side).
 * - `divider` for separator below.
 * - `compact` mode for smaller pages.
 * - `iconClassName` for tone-coloring icon.
 */

export interface SectionHeaderProps {
  icon?: LucideIcon | React.ReactNode;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  divider?: boolean;
  compact?: boolean;
  className?: string;
  iconClassName?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  icon,
  title,
  subtitle,
  action,
  divider = false,
  compact = false,
  className = '',
  iconClassName = 'text-primary-600',
}) => {
  // Icon bubble + glyph sized to match title.
  // h3 ≈ 1.5rem (~24px line-height ~32px) → bubble 44px, glyph 22
  // h4 ≈ 1.125rem (~18px line-height ~24px) → bubble 36px, glyph 18
  const bubbleSize = compact ? 'w-9 h-9' : 'w-11 h-11';
  const glyphSize = compact ? 18 : 22;
  const emojiTextSize = compact ? 'text-lg' : 'text-2xl';

  const renderIcon = () => {
    if (!icon) return null;

    const bubbleClasses = [
      'inline-flex items-center justify-center rounded-xl shrink-0 bg-primary-50',
      bubbleSize,
      iconClassName,
    ].join(' ');

    if (React.isValidElement(icon) || typeof icon === 'string' || typeof icon === 'number') {
      return (
        <span className={[bubbleClasses, 'leading-none', emojiTextSize].join(' ')} aria-hidden="true">
          {icon}
        </span>
      );
    }

    const Icon = icon as LucideIcon;
    return (
      <span className={bubbleClasses}>
        <Icon size={glyphSize} strokeWidth={2} />
      </span>
    );
  };

  return (
    <div
      className={[
        'flex items-center justify-between gap-4',
        compact ? 'mb-4' : 'mb-5',
        divider ? (compact ? 'pb-3 border-b border-ink-200' : 'pb-4 border-b border-ink-200') : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={['flex items-center flex-1 min-w-0', icon ? 'gap-3' : 'gap-0'].join(' ')}>
        {renderIcon()}

        <div className={['flex flex-col flex-1 min-w-0', subtitle ? 'gap-0.5' : 'gap-0'].join(' ')}>
          <h2
            className={[
              'font-display font-bold text-ink-900 leading-tight m-0',
              compact ? 'text-h4' : 'text-h3',
            ].join(' ')}
          >
            {title}
          </h2>

          {subtitle && (
            <p className="font-body text-body-sm text-ink-500 leading-snug m-0">{subtitle}</p>
          )}
        </div>
      </div>

      {action && <div className="shrink-0 flex items-center gap-2">{action}</div>}
    </div>
  );
};

export default SectionHeader;
