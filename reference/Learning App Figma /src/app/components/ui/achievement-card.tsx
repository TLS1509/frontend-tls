import { motion } from 'motion/react';
import { Lock, Calendar, Award } from 'lucide-react';
import { ProgressBarEnhanced } from './progress-bar-enhanced';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'learning' | 'social' | 'streak' | 'mastery' | 'special';
  icon: string;
  reward: {
    xp: number;
    badge?: string;
  };
  requirement: {
    type: 'lessons' | 'streak' | 'hours' | 'quiz-score' | 'custom';
    target: number;
    current: number;
    label: string;
  };
  unlocked: boolean;
  unlockedAt?: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface AchievementCardProps {
  achievement: Achievement;
  onClick?: () => void;
  compact?: boolean;
}

export function AchievementCard({ 
  achievement, 
  onClick,
  compact = false 
}: AchievementCardProps) {
  const getRarityConfig = () => {
    const configs = {
      common: {
        gradient: 'linear-gradient(135deg, var(--neutral-400), var(--neutral-600))',
        glow: 'rgba(107, 114, 128, 0.3)',
        border: 'var(--neutral-300)',
      },
      rare: {
        gradient: 'linear-gradient(135deg, var(--primary-500), var(--primary-700))',
        glow: 'rgba(85, 161, 180, 0.3)',
        border: 'var(--primary-300)',
      },
      epic: {
        gradient: 'linear-gradient(135deg, var(--secondary-500), var(--secondary-700))',
        glow: 'rgba(237, 132, 58, 0.3)',
        border: 'var(--secondary-300)',
      },
      legendary: {
        gradient: 'linear-gradient(135deg, var(--accent-400), var(--accent-600))',
        glow: 'rgba(248, 176, 68, 0.4)',
        border: 'var(--accent-300)',
      },
    };
    return configs[achievement.rarity];
  };

  const rarityConfig = getRarityConfig();
  const progress = (achievement.requirement.current / achievement.requirement.target) * 100;

  if (compact) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="flex items-center rounded-xl transition-all"
        style={{
          gap: 'var(--card-gap)',
          padding: 'var(--card-padding-y-compact) var(--card-padding-x-compact)',
          background: 'var(--glass-white)',
          border: `1px solid ${achievement.unlocked ? rarityConfig.border : 'var(--glass-border)'}`,
          opacity: achievement.unlocked ? 1 : 0.7,
          cursor: onClick ? 'pointer' : 'default',
        }}
        onClick={onClick}
      >
        {/* Icon */}
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
          style={{
            background: achievement.unlocked ? rarityConfig.gradient : 'var(--neutral-200)',
            boxShadow: achievement.unlocked ? `0 4px 12px ${rarityConfig.glow}` : 'none',
          }}
        >
          {achievement.unlocked ? achievement.icon : <Lock className="w-5 h-5" style={{ color: 'var(--neutral-400)' }} />}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p 
            style={{ 
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)',
            }}
          >
            {achievement.title}
          </p>
          {!achievement.unlocked && (
            <p 
              style={{ 
                fontSize: 'var(--text-xs)',
                color: 'var(--muted-foreground)',
              }}
            >
              {achievement.requirement.current}/{achievement.requirement.target} {achievement.requirement.label}
            </p>
          )}
        </div>

        {/* XP Badge */}
        <div 
          className="px-3 py-1 rounded-lg flex-shrink-0"
          style={{
            background: 'var(--accent-lighter)',
            fontSize: 'var(--text-xs)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--accent)',
          }}
        >
          +{achievement.reward.xp} XP
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: onClick ? 1.02 : 1, translateY: -4 }}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      className="rounded-2xl transition-all duration-300 relative overflow-hidden group"
      style={{
        padding: 'var(--card-padding-y) var(--card-padding-x)',
        background: 'var(--glass-white)',
        backdropFilter: 'var(--blur-xl)',
        border: `2px solid ${achievement.unlocked ? rarityConfig.border : 'var(--glass-border)'}`,
        boxShadow: achievement.unlocked 
          ? `0 8px 24px ${rarityConfig.glow}` 
          : 'var(--glass-shadow)',
        opacity: achievement.unlocked ? 1 : 0.8,
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      {/* Rarity badge */}
      <div 
        className="absolute top-3 right-3 px-2 py-1 rounded-md uppercase tracking-wider"
        style={{
          background: achievement.unlocked ? rarityConfig.gradient : 'var(--neutral-300)',
          fontSize: 'var(--text-xs)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'white',
        }}
      >
        {achievement.rarity}
      </div>

      {/* Icon */}
      <div className="mb-4">
        <div 
          className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mx-auto transition-transform duration-300 group-hover:scale-110"
          style={{
            background: achievement.unlocked ? rarityConfig.gradient : 'var(--neutral-200)',
            boxShadow: achievement.unlocked ? `0 8px 24px ${rarityConfig.glow}` : 'none',
          }}
        >
          {achievement.unlocked ? (
            achievement.icon
          ) : (
            <Lock className="w-10 h-10" style={{ color: 'var(--neutral-400)' }} />
          )}
        </div>
      </div>

      {/* Title & Description */}
      <div className="text-center mb-4">
        <h3 
          className="mb-2"
          style={{ 
            fontSize: 'var(--text-lg)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--foreground)',
          }}
        >
          {achievement.title}
        </h3>
        <p 
          style={{ 
            fontSize: 'var(--text-sm)',
            color: 'var(--muted-foreground)',
            lineHeight: 'var(--leading-relaxed)',
          }}
        >
          {achievement.description}
        </p>
      </div>

      {/* Progress or Unlocked Info */}
      {achievement.unlocked ? (
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
            <p 
              style={{ 
                fontSize: 'var(--text-xs)',
                color: 'var(--muted-foreground)',
              }}
            >
              Débloqué le {achievement.unlockedAt && new Date(achievement.unlockedAt).toLocaleDateString('fr-FR')}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Award className="w-4 h-4" style={{ color: 'var(--accent)' }} />
            <p 
              style={{ 
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--accent)',
              }}
            >
              +{achievement.reward.xp} XP gagnés
            </p>
          </div>
        </div>
      ) : (
        <div>
          <ProgressBarEnhanced
            current={achievement.requirement.current}
            total={achievement.requirement.target}
            label={achievement.requirement.label}
            color={rarityConfig.gradient}
            height="8px"
            showPercentage={true}
            animated={false}
          />
          <p 
            className="text-center mt-3"
            style={{ 
              fontSize: 'var(--text-xs)',
              color: 'var(--muted-foreground)',
            }}
          >
            Récompense : +{achievement.reward.xp} XP
            {achievement.reward.badge && ` + Badge "${achievement.reward.badge}"`}
          </p>
        </div>
      )}
    </motion.div>
  );
}

interface AchievementListProps {
  achievements: Achievement[];
  onAchievementClick?: (achievement: Achievement) => void;
  filter?: 'all' | 'unlocked' | 'locked';
  compact?: boolean;
}

export function AchievementList({ 
  achievements, 
  onAchievementClick,
  filter = 'all',
  compact = false 
}: AchievementListProps) {
  const filteredAchievements = achievements.filter(a => {
    if (filter === 'unlocked') return a.unlocked;
    if (filter === 'locked') return !a.unlocked;
    return true;
  });

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalXP = achievements
    .filter(a => a.unlocked)
    .reduce((sum, a) => sum + a.reward.xp, 0);

  return (
    <div>
      {/* Stats */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 
            style={{ 
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--foreground)',
            }}
          >
            Achievements
          </h3>
          <p 
            style={{ 
              fontSize: 'var(--text-sm)',
              color: 'var(--muted-foreground)',
            }}
          >
            {unlockedCount}/{achievements.length} débloqués
          </p>
        </div>
        
        <div className="text-right">
          <p 
            style={{ 
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--accent)',
              fontFamily: 'var(--font-display)',
            }}
          >
            {totalXP} XP
          </p>
          <p 
            style={{ 
              fontSize: 'var(--text-xs)',
              color: 'var(--muted-foreground)',
            }}
          >
            Total gagné
          </p>
        </div>
      </div>

      {/* List */}
      <div className={compact ? 'space-y-3' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'}>
        {filteredAchievements.map(achievement => (
          <AchievementCard
            key={achievement.id}
            achievement={achievement}
            onClick={() => onAchievementClick?.(achievement)}
            compact={compact}
          />
        ))}
      </div>
    </div>
  );
}
