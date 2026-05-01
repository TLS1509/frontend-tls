import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Tooltip } from './tooltip';

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: {
    value: number;
    label: string;
    direction: 'up' | 'down' | 'neutral';
  };
  tooltip?: string;
  color?: string;
  onClick?: () => void;
}

export function StatsCard({ 
  icon, 
  label, 
  value, 
  trend,
  tooltip,
  color = 'var(--primary)',
  onClick 
}: StatsCardProps) {
  const getTrendIcon = () => {
    if (!trend) return null;
    
    const iconProps = { className: 'w-4 h-4' };
    switch (trend.direction) {
      case 'up': return <TrendingUp {...iconProps} />;
      case 'down': return <TrendingDown {...iconProps} />;
      case 'neutral': return <Minus {...iconProps} />;
    }
  };

  const getTrendColor = () => {
    if (!trend) return 'var(--foreground)';
    
    switch (trend.direction) {
      case 'up': return 'var(--success-600)';
      case 'down': return 'var(--error-600)';
      case 'neutral': return 'var(--muted-foreground)';
    }
  };

  return (
    <motion.div
      whileHover={{ 
        scale: onClick ? 1.02 : 1,
        translateY: -4,
      }}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
      className="rounded-2xl transition-all duration-300 relative overflow-hidden group"
      style={{
        padding: 'var(--card-padding-y) var(--card-padding-x)',
        background: 'var(--glass-white)',
        backdropFilter: 'var(--blur-xl)',
        border: '1px solid var(--glass-border)',
        boxShadow: 'var(--glass-shadow)',
        cursor: onClick ? 'pointer' : 'default',
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.boxShadow = `0 12px 40px ${color}20`;
          e.currentTarget.style.borderColor = `${color}30`;
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.boxShadow = 'var(--glass-shadow)';
          e.currentTarget.style.borderColor = 'var(--glass-border)';
        }
      }}
    >
      {/* Background gradient on hover */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, ${color}, transparent)`,
          transform: 'translate(30%, -30%)',
        }}
      />

      <div className="relative z-10">
        {/* Header: Icon + Tooltip */}
        <div className="flex items-center justify-between mb-4">
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{
              background: `${color}15`,
            }}
          >
            <div style={{ color }}>
              {icon}
            </div>
          </div>
          
          {tooltip && (
            <Tooltip content={tooltip} position="left" />
          )}
        </div>
        
        {/* Label */}
        <p 
          className="uppercase tracking-wide mb-2"
          style={{ 
            fontSize: 'var(--text-xs)',
            color: 'var(--muted-foreground)',
            letterSpacing: 'var(--tracking-wider)',
            fontWeight: 'var(--font-weight-semibold)',
          }}
        >
          {label}
        </p>
        
        {/* Value */}
        <p 
          className="mb-1"
          style={{ 
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-4xl)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--foreground)',
            lineHeight: 'var(--leading-tight)',
          }}
        >
          {value}
        </p>
        
        {/* Trend */}
        {trend && (
          <div 
            className="flex items-center gap-2"
            style={{ 
              fontSize: 'var(--text-sm)',
              color: getTrendColor(),
              fontWeight: 'var(--font-weight-semibold)',
            }}
          >
            {getTrendIcon()}
            <span>
              {trend.direction === 'up' && '+'}
              {trend.value}% {trend.label}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

interface StatsGridProps {
  stats: Array<Omit<StatsCardProps, 'onClick'> & { id: string }>;
  onStatClick?: (statId: string) => void;
  columns?: 2 | 3 | 4;
}

export function StatsGrid({ stats, onStatClick, columns = 4 }: StatsGridProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {stats.map(stat => (
        <StatsCard
          key={stat.id}
          {...stat}
          onClick={() => onStatClick?.(stat.id)}
        />
      ))}
    </div>
  );
}
