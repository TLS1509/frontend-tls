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
 */

export interface FloatLabelProps {
  label: string;
  children: React.ReactElement<any>;
  required?: boolean;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  className?: string;
}

const LABEL_BASE =
  'absolute left-3.5 top-1/2 -translate-y-1/2 text-body-sm font-medium text-ink-500 origin-left pointer-events-none transition-all duration-base ease-emphasis';

const LABEL_FLOATING =
  'top-1 -translate-y-1/2 scale-75 text-caption text-primary-600 font-semibold';

export const FloatLabel: React.FC<FloatLabelProps> = ({
  label,
  children,
  required = false,
  hint,
  error,
  className = '',
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [hasValue, setHasValue] = React.useState(false);
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
  const enhancedChild = React.cloneElement(children, {
    ref: inputRef,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChange: handleChange,
  });

  return (
    <div className={`relative pt-stack-lg ${className}`}>
      {/* Floating Label */}
      <label
        className={`${LABEL_BASE} ${shouldFloat ? LABEL_FLOATING : ''}`}
      >
        {label}
        {required && <span className="text-danger-base ml-0.5">*</span>}
      </label>

      {/* Input */}
      {enhancedChild}

      {/* Helper Text */}
      {(error || hint) && (
        <p className={`text-caption mt-1.5 ${error ? 'text-danger-fg' : 'text-ink-500'}`}>
          {error || hint}
        </p>
      )}
    </div>
  );
};

export default FloatLabel;
