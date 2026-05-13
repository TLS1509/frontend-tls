import React from 'react';
import { Users } from 'lucide-react';
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
  emptyMessage = 'Aucun coach disponible',
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
      <div className={['flex items-center justify-center p-12', className].filter(Boolean).join(' ')}>
        <div className="flex flex-col items-center gap-3 text-ink-500">
          <div className="w-10 h-10 rounded-full border-[3px] border-ink-200 border-t-primary-500 animate-spin" />
          <p className="m-0 text-body-sm font-medium">Chargement des coachs…</p>
        </div>
      </div>
    );
  }

  if (!filteredCoaches || filteredCoaches.length === 0) {
    return (
      <div className={['flex items-center justify-center p-12 rounded-2xl bg-ink-50/50 border border-dashed border-ink-200', className].filter(Boolean).join(' ')}>
        <div className="flex flex-col items-center gap-3 text-ink-500 text-center">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white border border-ink-200 text-ink-400">
            <Users size={26} strokeWidth={2} />
          </span>
          <p className="m-0 text-body-sm font-medium">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={['grid gap-5', COLS[columns], className].filter(Boolean).join(' ')} role="grid">
      {filteredCoaches.map((coach) => (
        <div key={coach.id} role="gridcell" className="flex flex-col gap-3 group">
          <div
            onClick={() => onCoachSelect?.(coach.id)}
            className="cursor-pointer transition-transform group-hover:-translate-y-0.5"
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
                      label: coach.ctaLabel || 'Réserver une session',
                      onClick: coach.onBookClick,
                      variant: 'primary',
                    }
                  : undefined
              }
            />
          </div>

          {coach.specialties && coach.specialties.length > 0 && (
            <div className="flex flex-wrap gap-1.5 justify-center px-2">
              {coach.specialties.map((specialty) => (
                <span
                  key={specialty}
                  className="inline-flex items-center px-2.5 py-1 rounded-pill bg-primary-50 text-primary-700 text-micro font-semibold border border-primary-100"
                >
                  {specialty}
                </span>
              ))}
            </div>
          )}

          {coach.availability !== undefined && (
            <div
              className={[
                'inline-flex items-center justify-center gap-2 text-caption font-semibold mx-auto px-3 py-1 rounded-pill',
                coach.availability
                  ? 'text-success-fg bg-success-bg border border-success-base/20'
                  : 'text-ink-500 bg-ink-50 border border-ink-200',
              ].join(' ')}
            >
              <span
                className={[
                  'w-2 h-2 rounded-full',
                  coach.availability ? 'bg-success-base shadow-[0_0_8px_rgba(51,90,86,0.6)] animate-pulse' : 'bg-ink-300',
                ].join(' ')}
              />
              {coach.availability ? 'Disponible' : 'Non disponible'}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CoachCardGrid;
