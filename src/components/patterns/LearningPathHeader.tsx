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
  primary: 'bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700',
  warm:    'bg-gradient-to-br from-secondary-600 via-secondary-500 to-secondary-700',
  sun:     'bg-gradient-to-br from-accent-300 via-accent-400 to-accent-600',
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
        'relative isolate overflow-hidden rounded-3xl px-10 py-10 shadow-xl',
        TONE_BG[tone],
        textColor,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        aria-hidden="true"
        className="absolute -top-1/3 -right-[10%] w-[60%] aspect-square rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.22)_0%,transparent_60%)] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[-30%] left-[10%] w-[45%] aspect-square rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12)_0%,transparent_65%)] pointer-events-none"
      />

      {showBackButton && (
        <button
          className={[
            'relative z-10 inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-pill bg-white/15 hover:bg-white/25 backdrop-blur-sm cursor-pointer transition-all duration-200 hover:-translate-x-0.5 text-caption font-semibold border border-white/20',
            textColor,
          ].join(' ')}
          onClick={onBack}
          aria-label="Retour"
        >
          <ArrowLeft size={14} /> Retour
        </button>
      )}

      <div className="relative z-10 flex flex-col gap-3 mb-7 max-w-[760px]">
        {category && (
          <span
            className={[
              'inline-flex items-center self-start px-3 py-1 rounded-pill bg-white/20 backdrop-blur-sm text-caption font-bold uppercase tracking-[0.12em]',
              mutedText,
            ].join(' ')}
          >
            {category}
          </span>
        )}

        <h1 className="m-0 font-display text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-tight">
          {title}
        </h1>

        {description && (
          <p className={['m-0 text-body-lg leading-relaxed max-w-[640px]', mutedText].join(' ')}>
            {description}
          </p>
        )}

        {progress !== undefined && (
          <div className="flex items-center gap-3 mt-3">
            <div className="flex-1 h-2.5 rounded-pill bg-white/20 overflow-hidden shadow-inner">
              <div
                className="h-full bg-white rounded-pill transition-[width] duration-500 ease-out shadow-sm"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-caption font-bold whitespace-nowrap">
              {progress}% complété
            </span>
          </div>
        )}
      </div>

      {kpis && kpis.length > 0 && (
        <div className="relative z-10 grid gap-3 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
          {kpis.map((kpi, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/15 hover:bg-white/22 backdrop-blur-md transition-colors border border-white/15"
            >
              {kpi.icon && (
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/20 shrink-0">
                  {kpi.icon}
                </span>
              )}
              <div>
                <span className="block font-display text-h3 font-extrabold leading-none tracking-tight">
                  {kpi.value}
                </span>
                <span className={['block text-caption mt-1 font-medium', mutedText].join(' ')}>
                  {kpi.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LearningPathHeader;
