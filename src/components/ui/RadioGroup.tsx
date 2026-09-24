import React from 'react';
import { Check } from 'lucide-react';

export type RadioGroupOrientation = 'vertical' | 'horizontal';
export type RadioGroupVariant = 'default' | 'card';
export type RadioGroupTone = 'primary' | 'warm' | 'sun';

export interface RadioGroupOption {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  options: RadioGroupOption[];
  value?: string;
  onChange?: (value: string) => void;
  orientation?: RadioGroupOrientation;
  variant?: RadioGroupVariant;
  tone?: RadioGroupTone;
  className?: string;
}

const TONE_CHECKED_CARD: Record<RadioGroupTone, string> = {
  primary: 'border-primary-400 bg-primary-50 shadow-brand-sm',
  warm:    'border-secondary-400 bg-secondary-50 shadow-warm-sm',
  sun:     'border-accent-400 bg-accent-50 shadow-sun-sm',
};

/* État coché au cran 700 pour les trois tons — arbitrage n°9 du 23/09 (au
   500 : 2,94:1 sur blanc, sous le 3:1 d'un contrôle). Même règle que `Radio`. */
const TONE_INDICATOR: Record<RadioGroupTone, string> = {
  primary: 'bg-primary-700 border-primary-700',
  warm:    'bg-secondary-700 border-secondary-700',
  sun:     'bg-accent-700 border-accent-700',
};

const TONE_FOCUS: Record<RadioGroupTone, string> = {
  primary: 'focus-within:ring-2 focus-within:ring-primary-500/20',
  warm:    'focus-within:ring-2 focus-within:ring-secondary-500/20',
  sun:     'focus-within:ring-2 focus-within:ring-accent-400/20',
};

const TONE_CHECK_ICON: Record<RadioGroupTone, string> = {
  primary: 'text-primary-700',
  warm:    'text-secondary-700',
  sun:     'text-accent-700',
};

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  label,
  hint,
  error,
  required,
  options,
  value,
  onChange,
  orientation = 'vertical',
  variant = 'default',
  tone = 'primary',
  className = '',
}) => {
  const groupId = `radiogroup-${name}`;
  const isCard = variant === 'card';

  return (
    <fieldset
      className={['flex flex-col gap-stack-xs font-body border-0 p-0 m-0', className].filter(Boolean).join(' ')}
      aria-describedby={error || hint ? `${groupId}-message` : undefined}
    >
      {label && (
        <legend className="text-body font-semibold text-ink-900 mb-stack-xs">
          {label}
          {required && <span className="text-danger-fg ml-0.5" aria-hidden="true">*</span>}
        </legend>
      )}

      <div
        className={[
          // Options d'un même champ : 12 entre elles (doctrine, « éléments
          // d'un même ensemble ») ; le 8 était l'écart libellé → champ.
          isCard
            ? orientation === 'horizontal'
              ? 'grid grid-cols-2 gap-stack-sm'
              : 'flex flex-col gap-stack-sm'
            : orientation === 'horizontal'
              ? 'flex flex-wrap gap-x-stack-lg gap-y-stack-sm'
              : 'flex flex-col gap-stack-sm',
        ].join(' ')}
        role="radiogroup"
      >
        {options.map((option) => {
          const isChecked = value === option.value;
          const isDisabled = option.disabled;

          if (isCard) {
            return (
              <label
                key={option.value}
                className={[
                  'relative flex items-start gap-stack-xs p-stack rounded-lg border-2 cursor-pointer',
                  'transition-[border-color,background-color,box-shadow] duration-base ease-standard select-none',
                  isChecked
                    ? TONE_CHECKED_CARD[tone]
                    : 'border-ink-200 bg-white hover:border-ink-300',
                  isDisabled && 'opacity-disabled cursor-not-allowed pointer-events-none',
                  TONE_FOCUS[tone],
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <input
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={isChecked}
                  disabled={isDisabled}
                  onChange={() => onChange?.(option.value)}
                  className="sr-only peer"
                />

                {/* Radio dot indicator */}
                <span
                  aria-hidden="true"
                  className={[
                    'mt-0.5 w-5 h-5 shrink-0 rounded-pill border-2 flex items-center justify-center',
                    'transition-[border-color,background-color] duration-base ease-standard',
                    isChecked
                      ? TONE_INDICATOR[tone]
                      : 'border-ink-400 bg-white',
                  ].join(' ')}
                >
                  {isChecked && (
                    <span className="w-2 h-2 rounded-pill bg-white" />
                  )}
                </span>

                <div className="flex flex-col gap-stack-3xs min-w-0">
                  <span className="text-body font-semibold text-ink-900 leading-snug">
                    {option.label}
                  </span>
                  {option.description && (
                    <span className="text-caption text-ink-600">
                      {option.description}
                    </span>
                  )}
                </div>

                {isChecked && (
                  <span
                    className={['absolute top-3 right-3 w-5 h-5 rounded-pill flex items-center justify-center shrink-0', TONE_CHECK_ICON[tone]].join(' ')}
                    aria-hidden="true"
                  >
                    <Check size={14} strokeWidth={2.5} />
                  </span>
                )}
              </label>
            );
          }

          // Default variant
          return (
            <label
              key={option.value}
              className={[
                'relative inline-flex items-start gap-stack-xs cursor-pointer select-none',
                isDisabled && 'opacity-disabled cursor-not-allowed pointer-events-none',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isChecked}
                disabled={isDisabled}
                onChange={() => onChange?.(option.value)}
                className="peer sr-only"
              />

              <span
                aria-hidden="true"
                /* Le fond blanc ne vit QUE dans l'état vide : posé dans la base, il
                   battait le `bg-*-700` de l'état coché (même spécificité, ordre
                   d'émission — piège n°6), et un radio coché ne rendait qu'un
                   anneau, son point blanc perdu sur du blanc. */
                className={[
                  'mt-0.5 w-5 h-5 shrink-0 rounded-pill border-2 flex items-center justify-center',
                  'transition-[border-color,background-color] duration-base ease-standard',
                  'peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary-500',
                  isChecked ? TONE_INDICATOR[tone] : 'border-ink-400 bg-white',
                ].join(' ')}
              >
                {isChecked && <span className="w-2 h-2 rounded-pill bg-white" />}
              </span>

              {(option.label || option.description) && (
                <div className="flex flex-col gap-stack-3xs">
                  {option.label && (
                    <span className="text-body font-semibold text-ink-900 leading-snug">
                      {option.label}
                    </span>
                  )}
                  {option.description && (
                    <span className="text-caption text-ink-600">{option.description}</span>
                  )}
                </div>
              )}
            </label>
          );
        })}
      </div>

      {(error || hint) && (
        <p
          id={`${groupId}-message`}
          className={error ? 'text-caption text-danger-fg flex items-center gap-tight' : 'text-caption text-ink-600'}
          role={error ? 'alert' : undefined}
        >
          {error || hint}
        </p>
      )}
    </fieldset>
  );
};

export default RadioGroup;
