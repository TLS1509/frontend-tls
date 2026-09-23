import React, { useState, useRef, useId, useCallback, useEffect } from 'react';

export type TooltipSide = 'top' | 'bottom' | 'left' | 'right';
export type TooltipVariant = 'default' | 'brand';

export interface TooltipProps {
  content: React.ReactNode;
  side?: TooltipSide;
  variant?: TooltipVariant;
  delay?: number;
  disabled?: boolean;
  className?: string;
  children: React.ReactElement;
}

/* La bulle est SURVOLABLE (WCAG 1.4.13) : `pointer-events-none` seulement quand
   elle est cachée, sinon le pointeur la traverse et la ferme en voulant la lire.
   Le pseudo-élément `before:` comble l'écart de 8 px (mb-2 / mt-2…) entre le
   déclencheur et la bulle, pour que le trajet de l'un à l'autre ne la ferme pas. */
const CONTENT_BASE =
  'absolute z-tooltip px-2.5 py-1.5 rounded-md text-caption font-body font-medium whitespace-nowrap max-w-[220px] break-words ' +
  'transition-[opacity,transform] duration-fast ease-emphasis ' +
  'data-[visible=false]:opacity-0 data-[visible=false]:scale-95 data-[visible=false]:pointer-events-none data-[visible=true]:opacity-100 data-[visible=true]:scale-100 ' +
  "before:absolute before:content-['']";

const VARIANT_CLASSES: Record<TooltipVariant, string> = {
  default: 'bg-ink-900 text-white shadow-md',
  brand:   'bg-primary-700 text-white shadow-brand-sm',
};

const POSITION_CLASSES: Record<TooltipSide, string> = {
  top:    'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left:   'right-full top-1/2 -translate-y-1/2 mr-2',
  right:  'left-full top-1/2 -translate-y-1/2 ml-2',
};

const BRIDGE_CLASSES: Record<TooltipSide, string> = {
  top:    'before:inset-x-0 before:top-full before:h-2',
  bottom: 'before:inset-x-0 before:bottom-full before:h-2',
  left:   'before:inset-y-0 before:left-full before:w-2',
  right:  'before:inset-y-0 before:right-full before:w-2',
};

/** Délai de grâce à la sortie : le temps de passer du déclencheur à la bulle. */
const HIDE_GRACE_MS = 120;

const ARROW_BASE = 'absolute w-2 h-2 rotate-45';

const ARROW_VARIANT: Record<TooltipVariant, string> = {
  default: 'bg-ink-900',
  brand:   'bg-primary-700',
};

const ARROW_POSITION: Record<TooltipSide, string> = {
  top:    'top-full left-1/2 -translate-x-1/2 -mt-1',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 mb-[-4px]',
  left:   'left-full top-1/2 -translate-y-1/2 -ml-1',
  right:  'right-full top-1/2 -translate-y-1/2 mr-[-4px]',
};

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  side = 'top',
  variant = 'default',
  delay = 400,
  disabled = false,
  className = '',
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const showTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const tooltipId = useId();

  const clearTimers = () => {
    clearTimeout(showTimer.current);
    clearTimeout(hideTimer.current);
  };

  const show = useCallback(() => {
    if (disabled) return;
    clearTimeout(hideTimer.current);
    showTimer.current = setTimeout(() => setVisible(true), delay);
  }, [disabled, delay]);

  /** Immédiat (perte du focus, Échap) ou avec délai de grâce (sortie du pointeur). */
  const hide = useCallback((grace = false) => {
    clearTimeout(showTimer.current);
    clearTimeout(hideTimer.current);
    if (grace) hideTimer.current = setTimeout(() => setVisible(false), HIDE_GRACE_MS);
    else setVisible(false);
  }, []);

  useEffect(() => clearTimers, []);

  // Échap masque la bulle sans déplacer le focus ni le pointeur (WCAG 1.4.13,
  // « dismissable »). Écoute au niveau du document : le pointeur peut survoler
  // sans que le déclencheur ait le focus.
  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') hide();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [visible, hide]);

  const contentClasses = [
    CONTENT_BASE,
    VARIANT_CLASSES[variant],
    POSITION_CLASSES[side],
    BRIDGE_CLASSES[side],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const arrowClasses = [ARROW_BASE, ARROW_VARIANT[variant], ARROW_POSITION[side]]
    .filter(Boolean)
    .join(' ');

  const child = React.Children.only(children);
  const childProps = child.props as {
    'aria-describedby'?: string;
    onFocus?: (e: React.FocusEvent) => void;
    onBlur?: (e: React.FocusEvent) => void;
  };
  // Lien permanent déclencheur → bulle : la description est calculée même quand
  // la bulle est cachée (référence directe), donc le lecteur d'écran l'entend au
  // focus sans dépendre du délai d'apparition. On fusionne avec un
  // aria-describedby déjà posé par l'appelant.
  const describedBy = disabled
    ? childProps['aria-describedby']
    : [childProps['aria-describedby'], tooltipId].filter(Boolean).join(' ');

  const trigger = React.cloneElement(child, {
    'aria-describedby': describedBy || undefined,
    onFocus: (e: React.FocusEvent) => {
      show();
      childProps.onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent) => {
      hide();
      childProps.onBlur?.(e);
    },
  } as React.HTMLAttributes<HTMLElement>);

  // Le survol est suivi sur l'enveloppe, qui contient déclencheur ET bulle :
  // passer de l'un à l'autre ne ferme rien (« hoverable »), et la bulle reste
  // tant que le pointeur est dessus (« persistent »).
  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => show()}
      onMouseLeave={() => hide(true)}
    >
      {trigger}
      <span
        id={tooltipId}
        role="tooltip"
        data-visible={visible}
        className={contentClasses}
        aria-hidden={!visible}
      >
        {content}
        <span className={arrowClasses} aria-hidden="true" />
      </span>
    </span>
  );
};

export default Tooltip;
