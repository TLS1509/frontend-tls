/**
 * CoachCardGrid Pattern
 *
 * Composite pattern for displaying coach/mentor/instructor profiles in a grid
 * Wraps ProfileCard with grid layout and filtering logic
 *
 * Reusable in:
 * - Coaching page (available coaches)
 * - Mentor directory
 * - Team page
 * - Expert profiles
 */

import React from 'react';
import { ProfileCard } from '../ui/ProfileCard';
import type { ProfileCardVariant, ProfileMetadata, ProfileSocialLink } from '../ui/ProfileCard';
import './CoachCardGrid.css';

export interface CoachItem {
  id: string;
  name: string;
  role: string; // "Coach", "Mentor", "Instructor"
  avatar?: string;
  bio?: string;
  metadata?: ProfileMetadata[];
  socialLinks?: ProfileSocialLink[];
  specialties?: string[];
  availability?: boolean;
  variant?: ProfileCardVariant;
  onBookClick?: () => void;
  ctaLabel?: string;
}

export interface CoachCardGridProps {
  /** Array of coach items */
  coaches: CoachItem[];

  /** Number of columns: 2, 3, or 4 */
  columns?: 1 | 2 | 3 | 4;

  /** Filter by specialty */
  specialtyFilter?: string;

  /** Filter by availability */
  availabilityFilter?: boolean;

  /** Loading state */
  isLoading?: boolean;

  /** Empty state message */
  emptyMessage?: string;

  /** Callback when coach is selected */
  onCoachSelect?: (id: string) => void;

  /** Custom className */
  className?: string;
}

export const CoachCardGrid: React.FC<CoachCardGridProps> = ({
  coaches,
  columns = 3,
  specialtyFilter,
  availabilityFilter,
  isLoading = false,
  emptyMessage = 'No coaches available',
  onCoachSelect,
  className = '',
}) => {
  // Filter coaches based on criteria
  const filteredCoaches = React.useMemo(() => {
    return coaches.filter((coach) => {
      if (specialtyFilter && !coach.specialties?.includes(specialtyFilter)) {
        return false;
      }
      if (availabilityFilter && !coach.availability) {
        return false;
      }
      return true;
    });
  }, [coaches, specialtyFilter, availabilityFilter]);

  // Loading state
  if (isLoading) {
    return (
      <div className={`coach-card-grid coach-card-grid--loading ${className}`}>
        <div className="coach-card-grid__loader">
          <div className="coach-card-grid__spinner" />
          <p>Loading coaches...</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (!filteredCoaches || filteredCoaches.length === 0) {
    return (
      <div className={`coach-card-grid coach-card-grid--empty ${className}`}>
        <div className="coach-card-grid__empty">
          <p className="coach-card-grid__empty-icon">👥</p>
          <p className="coach-card-grid__empty-message">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`coach-card-grid coach-card-grid--${columns}col ${className}`}
      role="grid"
    >
      {filteredCoaches.map((coach) => (
        <div
          key={coach.id}
          className="coach-card-grid__item"
          role="gridcell"
        >
          <div
            className="coach-card-grid__card-wrapper"
            onClick={() => onCoachSelect?.(coach.id)}
          >
            <ProfileCard
              name={coach.name}
              role={coach.role}
              avatar={coach.avatar}
              bio={coach.bio}
              metadata={coach.metadata}
              socialLinks={coach.socialLinks}
              variant={coach.variant || 'default'}
              cta={
                coach.onBookClick
                  ? {
                      label: coach.ctaLabel || 'Book Session',
                      onClick: coach.onBookClick,
                      variant: 'primary',
                    }
                  : undefined
              }
              className="coach-card-grid__card"
            />
          </div>

          {/* Specialties badges */}
          {coach.specialties && coach.specialties.length > 0 && (
            <div className="coach-card-grid__specialties">
              {coach.specialties.map((specialty) => (
                <span key={specialty} className="coach-card-grid__specialty-badge">
                  {specialty}
                </span>
              ))}
            </div>
          )}

          {/* Availability indicator */}
          {coach.availability !== undefined && (
            <div className={`coach-card-grid__availability ${coach.availability ? 'coach-card-grid__availability--available' : 'coach-card-grid__availability--unavailable'}`}>
              <span className="coach-card-grid__availability-dot" />
              {coach.availability ? 'Available' : 'Unavailable'}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CoachCardGrid;
