import React from 'react';

export type IconFeatureCardTone = 'brand' | 'warm' | 'sun';

interface IconFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  tone?: IconFeatureCardTone;
  className?: string;
}

const TONE_ICON: Record<IconFeatureCardTone, string> = {
  brand: 'bg-primary-50 text-primary-600',
  warm:  'bg-secondary-50 text-secondary-600',
  sun:   'bg-accent-50 text-accent-600',
};

export const IconFeatureCard: React.FC<IconFeatureCardProps> = ({
  icon,
  title,
  description,
  tone = 'brand',
  className = '',
}) => {
  const classes = [
    'group flex flex-col items-center text-center p-8 bg-white border border-ink-200 rounded-lg transition-all',
    'hover:border-ink-300 hover:shadow-md hover:-translate-y-1',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <div
        className={[
          'w-20 h-20 inline-flex items-center justify-center rounded-lg text-4xl mb-6 transition-transform',
          'group-hover:scale-110',
          TONE_ICON[tone],
        ].join(' ')}
      >
        {icon}
      </div>
      <h3 className="m-0 mb-3 text-h4 font-display font-semibold text-ink-900">{title}</h3>
      <p className="m-0 text-body-sm leading-relaxed text-ink-500">{description}</p>
    </div>
  );
};

export default IconFeatureCard;
