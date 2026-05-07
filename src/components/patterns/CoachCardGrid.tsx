import React from 'react';
import { ProfileCard } from '../ui/ProfileCard';
import type { ProfileCardVariant, ProfileMetadata, ProfileSocialLink } from '../ui/ProfileCard';

export interface CoachItem {
  id: string;
  name: string;
  role: string;
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
  coaches: CoachItem[];
  columns?: 1 | 2 | 3 | 4;
  specialtyFilter?: string;
  availabilityFilter?: boolean;
  isLoading?: boolean;
  emptyMessage?: string;
  onCoachSelect?: (id: string) => void;
  className?: string;
}

const COLS: Record<1 | 2 | 3 | 4, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
};

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

  if (isLoading) {
    return (
      <div className={['flex items-center justify-center p-8', className].filter(Boolean).join(' ')}>
        <div className="flex flex-col items-center gap-3 text-ink-500">
          <div className="w-8 h-8 rounded-full border-[3px] border-ink-200 border-t-primary-500 animate-spin" />
          <p className="m-0 text-body-sm">Loading coaches...</p>
        </div>
      </div>
    );
  }

  if (!filteredCoaches || filteredCoaches.length === 0) {
    return (
      <div className={['flex items-center justify-center p-8', className].filter(Boolean).join(' ')}>
        <div className="flex flex-col items-center gap-3 text-ink-500 text-center">
          <p className="m-0 text-3xl">👥</p>
          <p className="m-0 text-body-sm">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={['grid gap-4', COLS[columns], className].filter(Boolean).join(' ')} role="grid">
      {filteredCoaches.map((coach) => (
        <div key={coach.id} role="gridcell" className="flex flex-col gap-3">
          <div onClick={() => onCoachSelect?.(coach.id)} className="cursor-pointer">
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
            />
          </div>

          {coach.specialties && coach.specialties.length > 0 && (
            <div className="flex flex-wrap gap-1.5 justify-center">
              {coach.specialties.map((specialty) => (
                <span
                  key={specialty}
                  className="inline-flex items-center px-2 py-0.5 rounded-pill bg-primary-50 text-primary-700 text-micro font-medium"
                >
                  {specialty}
                </span>
              ))}
            </div>
          )}

          {coach.availability !== undefined && (
            <div
              className={[
                'inline-flex items-center justify-center gap-2 text-caption font-medium',
                coach.availability ? 'text-success-fg' : 'text-ink-500',
              ].join(' ')}
            >
              <span
                className={[
                  'w-2 h-2 rounded-full',
                  coach.availability ? 'bg-success-base' : 'bg-ink-300',
                ].join(' ')}
              />
              {coach.availability ? 'Available' : 'Unavailable'}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CoachCardGrid;
