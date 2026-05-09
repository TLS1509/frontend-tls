import React from 'react';
import { Star } from 'lucide-react';

/**
 * The previous full-page `Celebration` card has been replaced by
 * `CelebrationModal` (in src/components/modals/CelebrationModal.tsx).
 *
 * Use that for milestone celebrations — it follows the same modal
 * design language as the rest of the app.
 *
 * `InlineWin` is preserved here for inline win banners (compact, in-flow
 * celebration strip), which is a different use case from a modal.
 */

export interface InlineWinProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
}

export const InlineWin: React.FC<InlineWinProps> = ({
  icon,
  title,
  description,
  className = '',
  ...rest
}) => (
  <div
    className={[
      'flex items-center gap-4 px-5 py-4 rounded-lg border border-secondary-500/20',
      'bg-gradient-to-br from-secondary-50 to-accent-50',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...rest}
  >
    <span
      aria-hidden="true"
      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-secondary-500 to-accent-500 text-white shrink-0 shadow-md"
    >
      {icon ?? <Star size={18} strokeWidth={2} fill="currentColor" />}
    </span>
    <div className="flex-1 min-w-0">
      <p className="m-0 text-body-sm font-bold text-secondary-700">{title}</p>
      {description && <p className="m-0 mt-0.5 text-caption text-ink-500">{description}</p>}
    </div>
  </div>
);

export default InlineWin;
