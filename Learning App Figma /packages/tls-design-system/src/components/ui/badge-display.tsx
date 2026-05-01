import { motion } from 'motion/react';
import { Lock, Check } from 'lucide-react';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'streak' | 'completion' | 'achievement' | 'social' | 'special';
  requirement: string;
  unlocked: boolean;
  unlockedAt?: Date;
  progress?: {
    current: number;
    total: number;
  };
}

interface BadgeDisplayProps {
  badge: Badge;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  showProgress?: boolean;
}

export function BadgeDisplay({ 
  badge, 
  onClick, 
  size = 'md',
  showProgress = true 
}: BadgeDisplayProps) {
  const getSizeStyles = () => {
    const sizes = {
      sm: {
        container: 'w-20 h-20',
        icon: 'text-2xl',
        nameSize: 'var(--text-xs)',
      },
      md: {
        container: 'w-24 h-24',
        icon: 'text-3xl',
        nameSize: 'var(--text-sm)',
      },
      lg: {
        container: 'w-32 h-32',
        icon: 'text-5xl',
        nameSize: 'var(--text-base)',
      },
    };
    return sizes[size];
  };

  const getCategoryColor = () => {
    const colors = {
      streak: '#FF8A00',
      completion: 'var(--success-600)',
      achievement: 'var(--primary)',
      social: 'var(--secondary)',
      special: 'var(--accent)',
    };
    return colors[badge.category];
  };

  const sizeStyles = getSizeStyles();
  const categoryColor = getCategoryColor();
  const progressPercent = badge.progress 
    ? (badge.progress.current / badge.progress.total) * 100 
    : 0;

  return (
    <motion.div
      whileHover={badge.unlocked ? { scale: 1.05 } : {}}
      whileTap={badge.unlocked ? { scale: 0.95 } : {}}
      onClick={badge.unlocked ? onClick : undefined}
      className={`relative ${onClick && badge.unlocked ? 'cursor-pointer' : ''}`}
      style={{
        opacity: badge.unlocked ? 1 : 0.5,
      }}
    >
      {/* Badge container */}
      <div className="text-center">
        <div 
          className={`${sizeStyles.container} mx-auto rounded-full flex items-center justify-center relative overflow-hidden transition-all duration-300`}
          style={{
            background: badge.unlocked 
              ? `linear-gradient(135deg, ${categoryColor}, ${categoryColor}dd)` 
              : 'var(--neutral-200)',
            boxShadow: badge.unlocked 
              ? `0 8px 24px ${categoryColor}44` 
              : 'none',
            border: `3px solid ${badge.unlocked ? 'white' : 'var(--neutral-300)'}`,
          }}
        >
          {/* Icon or Lock */}
          {badge.unlocked ? (
            <span className={sizeStyles.icon}>
              {badge.icon}
            </span>
          ) : (
            <Lock 
              className="w-1/2 h-1/2" 
              style={{ color: 'var(--neutral-400)' }} 
            />
          )}

          {/* Unlocked checkmark */}
          {badge.unlocked && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
              style={{
                background: 'var(--success-600)',
                border: '2px solid white',
              }}
            >
              <Check className="w-3 h-3" style={{ color: 'white' }} />
            </motion.div>
          )}
        </div>

        {/* Name */}
        <p 
          className="mt-3"
          style={{ 
            fontSize: sizeStyles.nameSize,
            fontWeight: 'var(--font-weight-semibold)',
            color: badge.unlocked ? 'var(--foreground)' : 'var(--muted-foreground)',
          }}
        >
          {badge.name}
        </p>

        {/* Progress bar for locked badges */}
        {!badge.unlocked && badge.progress && showProgress && (
          <div className="mt-2">
            <div 
              className="h-1 rounded-full mx-auto"
              style={{
                width: '80%',
                background: 'var(--neutral-200)',
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{
                  background: categoryColor,
                }}
              />
            </div>
            <p 
              className="mt-1"
              style={{ 
                fontSize: 'var(--text-xs)',
                color: 'var(--muted-foreground)',
              }}
            >
              {badge.progress.current}/{badge.progress.total}
            </p>
          </div>
        )}

        {/* Unlocked date */}
        {badge.unlocked && badge.unlockedAt && (
          <p 
            className="mt-1"
            style={{ 
              fontSize: 'var(--text-xs)',
              color: 'var(--muted-foreground)',
            }}
          >
            Débloqué le {new Date(badge.unlockedAt).toLocaleDateString('fr-FR')}
          </p>
        )}
      </div>
    </motion.div>
  );
}

interface BadgeGridProps {
  badges: Badge[];
  onBadgeClick?: (badge: Badge) => void;
  size?: 'sm' | 'md' | 'lg';
}

export function BadgeGrid({ badges, onBadgeClick, size = 'md' }: BadgeGridProps) {
  const unlockedCount = badges.filter(b => b.unlocked).length;
  const totalCount = badges.length;
  const progressPercent = (unlockedCount / totalCount) * 100;

  return (
    <div>
      {/* Header with progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 
            style={{ 
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--foreground)',
            }}
          >
            Badges collectés
          </h3>
          <span 
            style={{ 
              fontSize: 'var(--text-lg)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--primary)',
            }}
          >
            {unlockedCount}/{totalCount}
          </span>
        </div>

        {/* Progress bar */}
        <div 
          className="h-2 rounded-full overflow-hidden"
          style={{ background: 'var(--neutral-200)' }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full"
            style={{
              background: 'var(--gradient-primary)',
            }}
          />
        </div>
      </div>

      {/* Badges grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {badges.map(badge => (
          <BadgeDisplay
            key={badge.id}
            badge={badge}
            onClick={() => onBadgeClick?.(badge)}
            size={size}
          />
        ))}
      </div>
    </div>
  );
}
