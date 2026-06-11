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

const CONTENT_BASE =
  'absolute z-tooltip pointer-events-none px-2.5 py-1.5 rounded-md text-caption font-body font-medium whitespace-nowrap max-w-[220px] break-words ' +
  'transition-[opacity,transform] duration-fast ease-emphasis ' +
  'data-[visible=false]:opacity-0 data-[visible=false]:scale-95 data-[visible=true]:opacity-100 data-[visible=true]:scale-100';

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
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const tooltipId = useId();

  const show = useCallback(() => {
    if (disabled) return;
    timerRef.current = setTimeout(() => setVisible(true), delay);
  }, [disabled, delay]);

  const hide = useCallback(() => {
    clearTimeout(timerRef.current);
    setVisible(false);
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const contentClasses = [
    CONTENT_BASE,
    VARIANT_CLASSES[variant],
    POSITION_CLASSES[side],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const arrowClasses = [ARROW_BASE, ARROW_VARIANT[variant], ARROW_POSITION[side]]
    .filter(Boolean)
    .join(' ');

  const child = React.Children.only(children);
  const trigger = React.cloneElement(child, {
    'aria-describedby': visible ? tooltipId : undefined,
    onMouseEnter: (e: React.MouseEvent) => {
      show();
      (child.props as any).onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      hide();
      (child.props as any).onMouseLeave?.(e);
    },
    onFocus: (e: React.FocusEvent) => {
      show();
      (child.props as any).onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent) => {
      hide();
      (child.props as any).onBlur?.(e);
    },
  } as any);

  return (
    <span className="relative inline-flex">
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
