/**
 * Tracked Button - The Learning Society
 * Bouton avec tracking automatique des événements
 */

import { Button } from './ui/button';
import { analytics } from '../hooks/useAnalytics';
import { forwardRef } from 'react';
import type React from 'react';
import type { ComponentProps } from 'react';

type ButtonProps = ComponentProps<typeof Button>;

interface TrackedButtonProps extends ButtonProps {
  trackingName: string;
  trackingLocation?: string;
  trackingCategory?: string;
}

export const TrackedButton = forwardRef<HTMLButtonElement, TrackedButtonProps>(
  ({ trackingName, trackingLocation = 'unknown', trackingCategory = 'cta', onClick, children, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Track l'événement
      analytics.event('button_click', {
        button_name: trackingName,
        button_location: trackingLocation,
        button_category: trackingCategory,
      });

      // Appeler le onClick original
      onClick?.(e);
    };

    return (
      <Button ref={ref} onClick={handleClick} {...props}>
        {children}
      </Button>
    );
  }
);

TrackedButton.displayName = 'TrackedButton';
