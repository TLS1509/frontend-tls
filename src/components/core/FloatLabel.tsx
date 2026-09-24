import React from 'react';

/**
 * FloatLabel — Premium form pattern
 *
 * Wraps Input to animate label up on focus or when value exists.
 * Modern SaaS pattern (Linear, Stripe, Vercel style).
 *
 * Usage:
 *   <FloatLabel label="Email">
 *     <Input type="email" required />
 *   </FloatLabel>
 *
 * ⚠️ Prévu pour un `<Input>` de taille `md` (44 px) sans `label` propre : au
 * repos, le libellé est centré sur ces 44 px.
 */

export interface FloatLabelProps {
  label: string;
  children: React.ReactElement<any>;
  required?: boolean;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  className?: string;
}

/* Deux états, deux rôles typographiques (passe du 2026-09-24).
   Au repos, le libellé TIENT LIEU de placeholder : il en prend la voix
   (16 / 400, ink-500) et s'assied là où le texte saisi commencera — calé sur
   le padding du champ `md` (16 px) et centré sur ses 44 px, ancré au bas de la
   zone pour ne pas dépendre de la réserve au-dessus.
   Levé, il devient un libellé au-dessus du champ : 13 / 600, ink-700, posé
   dans la réserve `pt-stack-lg`.

   Avant : `scale-75` appliqué EN PLUS de `text-caption` rendait le libellé levé
   à 9,75 px — hors échelle, sous le plancher de 11 des étiquettes. Et l'état
   initial ignorait `value` / `defaultValue` : un champ prérempli affichait son
   libellé par-dessus sa valeur. */
const LABEL_BASE =
  'absolute left-0 flex items-center pointer-events-none font-body transition-colors duration-base ease-emphasis';

const LABEL_RESTING = 'bottom-0 h-touch pl-stack text-body text-ink-500';

const LABEL_FLOATING = 'top-0 h-stack-lg text-caption font-semibold text-ink-700';

export const FloatLabel: React.FC<FloatLabelProps> = ({
  label,
  children,
  required = false,
  hint,
  error,
  className = '',
}) => {
  const autoId = React.useId();
  const fieldId: string = children.props.id ?? autoId;
  const initial = children.props.value ?? children.props.defaultValue;
  const [isFocused, setIsFocused] = React.useState(false);
  const [hasValue, setHasValue] = React.useState(
    initial !== undefined && initial !== null && String(initial) !== '',
  );
  const inputRef = React.useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const shouldFloat = isFocused || hasValue;

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (inputRef.current) {
      setHasValue(!!inputRef.current.value);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setHasValue(!!e.target.value);
    children.props.onChange?.(e);
  };

  // Merge props with focus/blur handlers
  // L'erreur passe aussi au champ : son filet se met en `danger`, comme un
  // `Input` qui porte lui-même son `error` (le message seul le laissait gris).
  const enhancedChild = React.cloneElement(children, {
    id: fieldId,
    ref: inputRef,
    ...(error ? { status: 'error' } : {}),
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChange: handleChange,
  });

  return (
    <div className={`flex flex-col gap-stack-xs ${className}`}>
      <div className="relative pt-stack-lg">
        <label htmlFor={fieldId} className={`${LABEL_BASE} ${shouldFloat ? LABEL_FLOATING : LABEL_RESTING}`}>
          {label}
          {required && <span className="text-danger-fg ml-0.5" aria-hidden="true">*</span>}
        </label>

        {enhancedChild}
      </div>

      {(error || hint) && (
        <p className={`text-caption ${error ? 'text-danger-fg' : 'text-ink-600'}`}>
          {error || hint}
        </p>
      )}
    </div>
  );
};

export default FloatLabel;
