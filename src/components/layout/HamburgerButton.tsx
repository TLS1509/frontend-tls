/**
 * Hamburger Button — Mobile Navigation Trigger
 *
 * Animated button that morphs 3 lines into an X when clicked.
 * Used to toggle mobile navigation menus.
 *
 * Features:
 * - Animated 3-line hamburger → X morph
 * - Accessible with aria labels
 * - Keyboard support (Enter/Space)
 * - Glassmorphic design with backdrop blur
 * - Smooth transitions and micro-interactions
 */

import React, { useState } from 'react';

export interface HamburgerButtonProps {
  isOpen?: boolean;
  onChange?: (isOpen: boolean) => void;
  ariaLabel?: string;
  className?: string;
}

export const HamburgerButton: React.FC<HamburgerButtonProps> = ({
  isOpen: controlledIsOpen,
  onChange,
  ariaLabel = 'Menu de navigation',
  className = '',
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalOpen;

  const handleClick = () => {
    const newOpen = !isOpen;
    if (controlledIsOpen === undefined) {
      setInternalOpen(newOpen);
    }
    onChange?.(newOpen);
  };

  return (
    <button
      className={`hamburger-button ${isOpen ? 'hamburger-button--open' : ''} ${className}`.trim()}
      onClick={handleClick}
      aria-label={ariaLabel}
      aria-expanded={isOpen}
      type="button"
    >
      <span className="hamburger-button__line hamburger-button__line--top" />
      <span className="hamburger-button__line hamburger-button__line--middle" />
      <span className="hamburger-button__line hamburger-button__line--bottom" />
    </button>
  );
};

export default HamburgerButton;
