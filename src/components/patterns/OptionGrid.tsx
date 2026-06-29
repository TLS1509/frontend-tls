/**
 * OptionGrid — grid of selectable icon+label option cards.
 *
 * Usage : pick-one (single-select) or pick-many (multi-select) selectors with
 * an icon, a label, and an optional description. Replaces ad-hoc grids in
 * Onboarding (role / sector / rhythm) and any "choose your X" pattern.
 *
 * Two modes via `multi` prop:
 *  - `multi=false` (default) → single value `value: string`
 *  - `multi=true`            → array `value: string[]`
 *
 * Tones supply the selected colorway (brand / warm / sun).
 *
 * Layout : responsive grid (auto 2 cols mobile → up to 4 cols desktop) with
 * a `columns` prop to override the desktop count.
 */

import React from 'react';

export type OptionGridTone = 'brand' | 'warm' | 'sun';

export interface OptionGridItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ComponentType<{ size?: number }>;
  /** Optional emoji rendered inside (or instead of) the icon bubble — adds a playful touch in onboarding. */
  emoji?: string;
}

interface OptionGridBaseProps {
  options: OptionGridItem[];
  tone?: OptionGridTone;
  /** Desktop cols ; mobile = 2 cols always (or 1 for `columns={1}`). */
  columns?: 1 | 2 | 3 | 4;
  /** Card layout : `icon-top` (default, centered) or `icon-left` (horizontal). */
  layout?: 'icon-top' | 'icon-left' | 'text-only';
  className?: string;
}

interface OptionGridSingleProps extends OptionGridBaseProps {
  multi?: false;
  value: string;
  onChange: (id: string) => void;
}

interface OptionGridMultiProps extends OptionGridBaseProps {
  multi: true;
  value: string[];
  onChange: (id: string) => void;
}

export type OptionGridProps = OptionGridSingleProps | OptionGridMultiProps;

const TONE_SELECTED: Record<OptionGridTone, string> = {
  brand: 'bg-primary-50 border-primary-500 shadow-brand-sm',
  warm:  'bg-secondary-50 border-secondary-500 shadow-sm',
  sun:   'bg-accent-50 border-accent-400 shadow-sm',
};

const TONE_ICON_BG_SELECTED: Record<OptionGridTone, string> = {
  brand: 'bg-primary-500 text-white',
  warm:  'bg-secondary-500 text-white',
  sun:   'bg-accent-400 text-white',
};

const TONE_LABEL_SELECTED: Record<OptionGridTone, string> = {
  brand: 'text-primary-700',
  warm:  'text-secondary-700',
  sun:   'text-accent-700',
};

const TONE_HOVER: Record<OptionGridTone, string> = {
  brand: 'hover:border-primary-300 hover:bg-primary-50/40',
  warm:  'hover:border-secondary-300 hover:bg-secondary-50/40',
  sun:   'hover:border-accent-300 hover:bg-accent-50/40',
};

const COLS_DESKTOP: Record<1 | 2 | 3 | 4, string> = {
  1: 'sm:grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

export const OptionGrid: React.FC<OptionGridProps> = (props) => {
  const {
    options,
    tone = 'brand',
    columns = 3,
    layout = 'icon-top',
    className = '',
  } = props;

  const isSelected = (id: string) =>
    props.multi ? props.value.includes(id) : props.value === id;

  const mobileCols = columns === 1 ? 'grid-cols-1' : 'grid-cols-2';

  const baseGrid = ['grid gap-2.5', mobileCols, COLS_DESKTOP[columns], className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={baseGrid} role={props.multi ? 'group' : 'radiogroup'}>
      {options.map(({ id, label, description, icon: Icon, emoji }) => {
        const selected = isSelected(id);

        const buttonClasses = [
          'min-h-touch w-full cursor-pointer transition-all duration-base border-[1.5px] rounded-xl bg-white',
          layout === 'icon-left'
            ? 'flex items-center gap-stack-xs px-4 py-3 text-left'
            : layout === 'text-only'
            ? 'flex flex-col gap-tight px-5 py-stack text-left'
            : 'flex flex-col items-center justify-center gap-stack-xs px-3 py-stack text-center',
          selected ? TONE_SELECTED[tone] : `border-ink-200 ${TONE_HOVER[tone]}`,
          'focus-visible:outline-2 focus-visible:outline-offset-2',
          tone === 'brand'
            ? 'focus-visible:outline-primary-500'
            : tone === 'warm'
            ? 'focus-visible:outline-secondary-500'
            : 'focus-visible:outline-accent-400',
        ].join(' ');

        const iconWrapClasses = [
          'inline-flex items-center justify-center rounded-xl shrink-0 transition-colors duration-base',
          layout === 'icon-left' ? 'w-10 h-10' : 'w-10 h-10',
          selected ? TONE_ICON_BG_SELECTED[tone] : 'bg-ink-100 text-ink-600',
        ].join(' ');

        const labelClasses = [
          'font-body font-semibold leading-tight',
          layout === 'text-only' ? 'text-body' : 'text-caption',
          selected ? TONE_LABEL_SELECTED[tone] : 'text-ink-900',
        ].join(' ');

        return (
          <button
            key={id}
            type="button"
            role={props.multi ? 'checkbox' : 'radio'}
            aria-checked={selected}
            aria-pressed={selected}
            onClick={() => props.onChange(id)}
            className={buttonClasses}
          >
            {(Icon || emoji) && layout !== 'text-only' && (
              <span className={iconWrapClasses}>
                {emoji ? (
                  <span aria-hidden="true" className="text-[20px] leading-none">{emoji}</span>
                ) : Icon ? (
                  <Icon size={18} />
                ) : null}
              </span>
            )}

            {layout === 'icon-left' || layout === 'text-only' ? (
              <span className="flex flex-col gap-tight min-w-0">
                <span className={labelClasses}>{label}</span>
                {description && (
                  <span className="font-body text-caption text-ink-500 leading-relaxed">
                    {description}
                  </span>
                )}
              </span>
            ) : (
              <span className={labelClasses}>{label}</span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default OptionGrid;
