import React from 'react';
import { ArrowLeft } from 'lucide-react';

export type LearningPathHeaderTone = 'primary' | 'warm' | 'sun';

export interface LearningPathKPI {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

export interface LearningPathHeaderProps {
  title: string;
  category?: string;
  description?: string;
  progress?: number;
  kpis?: LearningPathKPI[];
  tone?: LearningPathHeaderTone;
  onBack?: () => void;
  showBackButton?: boolean;
  className?: string;
}

const TONE_BG: Record<LearningPathHeaderTone, string> = {
  primary: 'bg-gradient-to-br from-primary-500 to-primary-700',
  warm:    'bg-gradient-to-br from-secondary-500 to-secondary-700',
  sun:     'bg-gradient-to-br from-accent-400 to-accent-600',
};

export const LearningPathHeader: React.FC<LearningPathHeaderProps> = ({
  title,
  category,
  description,
  progress,
  kpis,
  tone = 'primary',
  onBack,
  showBackButton = true,
  className = '',
}) => {
  const isLightText = tone !== 'sun';
  const textColor = isLightText ? 'text-white' : 'text-accent-900';
  const mutedText = isLightText ? 'text-white/85' : 'text-accent-900/85';

  return (
    <div
      className={[
        'relative overflow-hidden rounded-2xl p-10',
        TONE_BG[tone],
        textColor,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        aria-hidden="true"
        className="absolute -top-1/3 -right-[10%] w-[60%] aspect-square rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18)_0%,transparent_70%)] pointer-events-none"
      />

      {showBackButton && (
        <button
          className={[
            'relative z-10 inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-pill bg-white/15 hover:bg-white/25 backdrop-blur-sm cursor-pointer transition-colors text-caption font-semibold border-0',
            textColor,
          ].join(' ')}
          onClick={onBack}
          aria-label="Go back"
        >
          <ArrowLeft size={14} /> Back
        </button>
      )}

      <div className="relative z-10 flex flex-col gap-3 mb-6">
        {category && (
          <span className={['text-caption font-bold uppercase tracking-wider', mutedText].join(' ')}>
            {category.toUpperCase()}
          </span>
        )}

        <h1 className="m-0 font-display text-h1 font-bold leading-tight tracking-tight">{title}</h1>

        {description && (
          <p className={['m-0 text-body leading-relaxed max-w-[640px]', mutedText].join(' ')}>
            {description}
          </p>
        )}

        {progress !== undefined && (
          <div className="flex items-center gap-3 mt-2">
            <div className="flex-1 h-2 rounded-pill bg-white/20 overflow-hidden">
              <div
                className="h-full bg-white rounded-pill transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-caption font-semibold whitespace-nowrap">
              {progress}% Complete
            </span>
          </div>
        )}
      </div>

      {kpis && kpis.length > 0 && (
        <div className="relative z-10 grid gap-4 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
          {kpis.map((kpi, idx) => (
            <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-white/15 backdrop-blur-sm">
              {kpi.icon && <span className="inline-flex items-center shrink-0">{kpi.icon}</span>}
              <div>
                <span className="block font-display text-h3 font-bold leading-none">{kpi.value}</span>
                <span className={['block text-caption mt-1', mutedText].join(' ')}>{kpi.label}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LearningPathHeader;
