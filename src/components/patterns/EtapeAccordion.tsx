import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export type EtapeAccordionVariant = 'default' | 'panel';

export interface EtapeAccordionProps {
  /** Controlled open state */
  isOpen: boolean;
  /** Called when the header button is activated */
  onToggle: () => void;
  /**
   * If true the header is non-interactive: no click, no chevron, no body.
   * Use for locked/gated steps.
   */
  locked?: boolean;
  /**
   * 'default' — compact bordered accordion (CourseDetail programme list).
   * 'panel' — large padded card panel (LearningPathDetail step cards).
   */
  variant?: EtapeAccordionVariant;
  /**
   * Structured title shown in the default header layout.
   * Ignored when `header` is provided.
   */
  title?: string;
  /**
   * Optional sub-label (e.g. duration) shown below `title` in the default layout.
   * Ignored when `header` is provided.
   */
  duration?: string;
  /**
   * Custom header content — fully replaces the default title/duration layout.
   * Use for tone-aware headers that include icon boxes, badges, or progress bars.
   * The chevron is always appended after this content.
   */
  header?: React.ReactNode;
  /** Body content shown when open and not locked */
  children?: React.ReactNode;
  /** Extra Tailwind classes merged onto the outer wrapper */
  className?: string;
  /** Extra Tailwind classes on the body wrapper div */
  bodyClassName?: string;
}

const WRAPPER: Record<EtapeAccordionVariant, string> = {
  default: 'border border-ink-200 rounded-lg bg-white overflow-hidden',
  panel:   'rounded-2xl border-2 overflow-hidden transition-colors',
};

const HEADER_BTN: Record<EtapeAccordionVariant, string> = {
  default: [
    'w-full flex items-center justify-between gap-stack-xs px-4 py-stack',
    'border-0 text-left cursor-pointer font-body',
    'text-ink-900 bg-ink-50 hover:bg-ink-100 transition-colors duration-base',
  ].join(' '),
  panel: 'w-full flex items-start gap-stack p-6 bg-transparent border-0 cursor-pointer text-left',
};

// When locked, how to style the button per variant.
// default: show disabled cursor + reduced opacity (simple list, no tonal icon badge).
// panel: cursor-default only — the icon badge already communicates locked state visually.
const HEADER_BTN_LOCKED: Record<EtapeAccordionVariant, string> = {
  default: 'cursor-not-allowed opacity-disabled',
  panel:   'cursor-default',
};

const CHEVRON: Record<EtapeAccordionVariant, string> = {
  default: 'shrink-0 text-ink-500',
  panel:   'shrink-0 text-ink-500 pt-2',
};

export const EtapeAccordion: React.FC<EtapeAccordionProps> = ({
  variant = 'default',
  isOpen,
  onToggle,
  locked = false,
  title,
  duration,
  header,
  children,
  className = '',
  bodyClassName = '',
}) => (
  <div className={[WRAPPER[variant], className].filter(Boolean).join(' ')}>
    <button
      type="button"
      onClick={locked ? undefined : onToggle}
      aria-expanded={locked ? undefined : isOpen}
      aria-disabled={locked}
      className={[
        HEADER_BTN[variant],
        locked ? HEADER_BTN_LOCKED[variant] : '',
      ].filter(Boolean).join(' ')}
    >
      {header ?? (
        <span>
          {title && <strong className="font-semibold">{title}</strong>}
          {duration && (
            <span className="block mt-1 font-body text-caption text-ink-400">{duration}</span>
          )}
        </span>
      )}

      {!locked && (
        <span className={CHEVRON[variant]}>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      )}
    </button>

    {isOpen && !locked && (
      <div className={bodyClassName}>{children}</div>
    )}
  </div>
);
