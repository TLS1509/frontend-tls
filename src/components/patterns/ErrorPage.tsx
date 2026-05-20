import React from 'react';
import { AlertTriangle } from 'lucide-react';

export type ErrorPageTone = 'default' | 'danger';

export type ErrorSuggestionTone = 'primary' | 'warm' | 'sun' | 'neutral';

export interface ErrorPageSuggestion {
  icon: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  onClick: () => void;
  tone?: ErrorSuggestionTone;
}

export interface ErrorPageProps {
  tone?: ErrorPageTone;
  /** Big code displayed in gradient (e.g. "404", "500", "403") */
  code?: React.ReactNode;
  /** Small uppercase eyebrow above the code */
  eyebrow?: React.ReactNode;
  /** Icon next to code (defaults to AlertTriangle for danger, omitted for default) */
  icon?: React.ReactNode;
  /** Main title (h1) */
  title: React.ReactNode;
  /** Description paragraph below the title */
  description?: React.ReactNode;
  /** Optional callout box (diagnostic, status, hint) */
  callout?: React.ReactNode;
  /** Optional navigation suggestions grid (Error404 style) */
  suggestions?: ErrorPageSuggestion[];
  /** Primary CTA (typically a Button) */
  primaryAction?: React.ReactNode;
  /** Optional secondary CTA */
  secondaryAction?: React.ReactNode;
  className?: string;
}

const TONE_CODE_GRADIENT: Record<ErrorPageTone, string> = {
  default: 'bg-gradient-to-br from-primary-300 to-secondary-200',
  danger: 'bg-gradient-to-br from-danger-base to-secondary-500',
};

const TONE_ICON_BG: Record<ErrorPageTone, string> = {
  default: 'bg-gradient-to-br from-primary-50 to-secondary-50 border-primary-200 text-primary-600',
  danger: 'bg-danger-bg border-secondary-200 text-danger-fg',
};

const TONE_EYEBROW: Record<ErrorPageTone, string> = {
  default: 'text-primary-700',
  danger: 'text-danger-fg',
};

const SUGGESTION_TONE_BG: Record<ErrorSuggestionTone, string> = {
  primary: 'bg-primary-50 text-primary-600',
  warm: 'bg-secondary-50 text-secondary-500',
  sun: 'bg-accent-50 text-accent-500',
  neutral: 'bg-ink-50 text-ink-700',
};

export const ErrorPage: React.FC<ErrorPageProps> = ({
  tone = 'default',
  code,
  eyebrow,
  icon,
  title,
  description,
  callout,
  suggestions,
  primaryAction,
  secondaryAction,
  className = '',
}) => {
  const resolvedIcon = icon ?? (tone === 'danger' ? <AlertTriangle size={48} strokeWidth={1.5} /> : null);

  const wrapperClasses = [
    'min-h-[calc(100vh-120px)] flex items-center justify-center px-4 py-page font-body',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      <div className="w-full max-w-[960px] flex flex-col items-center text-center gap-stack-lg">
        {eyebrow && (
          <p
            className={[
              'font-body text-caption font-bold uppercase tracking-[0.06em] inline-flex items-center gap-1.5 m-0',
              TONE_EYEBROW[tone],
            ].join(' ')}
          >
            {eyebrow}
          </p>
        )}

        {code !== undefined && code !== null && (
          <div
            className={[
              'font-display font-black bg-clip-text text-transparent tracking-tight m-0',
              TONE_CODE_GRADIENT[tone],
              'text-[clamp(4rem,12vw,7rem)] leading-none',
            ].join(' ')}
            aria-hidden="true"
          >
            {code}
          </div>
        )}

        {resolvedIcon && (
          <div
            className={[
              'w-24 h-24 rounded-2xl flex items-center justify-center border-2 shadow-md',
              TONE_ICON_BG[tone],
            ].join(' ')}
            aria-hidden="true"
          >
            {resolvedIcon}
          </div>
        )}

        <div className="flex flex-col gap-tight max-w-[560px]">
          <h1 className="font-display text-h1 font-bold text-ink-900 m-0 leading-tight">{title}</h1>
          {description && (
            <p className="font-body text-body-lg text-ink-500 leading-relaxed m-0">{description}</p>
          )}
        </div>

        {callout && (
          <div className="rounded-xl border border-accent-200 bg-gradient-to-br from-accent-50 to-accent-50/40 p-stack-lg text-left max-w-[560px] w-full flex flex-col gap-tight">
            {callout}
          </div>
        )}

        {suggestions && suggestions.length > 0 && (
          <div className="grid gap-stack w-full max-w-[960px] grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
            {suggestions.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={item.onClick}
                className="flex flex-col items-start gap-stack-xs p-stack-lg rounded-xl border border-ink-200 bg-white text-left shadow-sm hover:border-primary-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-base ease-standard cursor-pointer min-h-touch focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              >
                <div
                  className={[
                    'w-10 h-10 rounded-lg flex items-center justify-center shrink-0',
                    SUGGESTION_TONE_BG[item.tone ?? 'primary'],
                  ].join(' ')}
                >
                  {item.icon}
                </div>
                <div className="flex flex-col gap-tight">
                  <h3 className="font-body text-body-sm font-bold text-ink-900 m-0">{item.title}</h3>
                  {item.description && (
                    <p className="font-body text-caption text-ink-500 m-0 leading-relaxed">{item.description}</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

        {(primaryAction || secondaryAction) && (
          <div className="flex flex-wrap gap-stack-xs justify-center">
            {primaryAction}
            {secondaryAction}
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;
