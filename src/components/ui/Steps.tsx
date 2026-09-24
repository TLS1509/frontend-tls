import React from 'react';
import { Check, Lock } from 'lucide-react';

export type StepState = 'done' | 'current' | 'upcoming' | 'locked';

export interface StepItem {
  title: React.ReactNode;
  description?: React.ReactNode;
  state: StepState;
}

export interface StepsProps extends React.HTMLAttributes<HTMLOListElement> {
  items: StepItem[];
}

// Numéro : Nunito 600 tabulaire, un chiffre sous 16 px (doctrine § 1).
const MARKER_BASE =
  'absolute left-0 top-0 w-9 h-9 rounded-pill flex items-center justify-center text-caption font-semibold tabular-nums border-2 transition-[background-color,border-color,box-shadow,transform] duration-base ease-emphasis';

const MARKER_STATE: Record<StepState, string> = {
  // Pastille « faite » = une coche, icône porteuse de sens : 3:1 suffit, donc
  // l'arrêt clair au 600 (3,66). Partie du 500, la coche mesurait 2,94.
  done:     'bg-gradient-to-br from-primary-600 to-primary-700 border-transparent text-white shadow-brand-sm',
  current:  'bg-white border-primary-500 text-primary-700 shadow-brand-sm ring-4 ring-primary-100 scale-105',
  upcoming: 'bg-white border-ink-200 text-ink-600',
  locked:   'bg-ink-50 border-ink-200 text-ink-400 opacity-70',
};

const LINE_STATE: Record<StepState, string> = {
  done:     'bg-gradient-to-b from-primary-300 to-primary-200',
  current:  'bg-gradient-to-b from-primary-200 to-ink-200',
  upcoming: 'bg-ink-200',
  locked:   'bg-ink-200',
};

/* Titre d'étape = libellé de rangée : 16/600. L'étape faite redescend au
   texte (400, barré). Le verrou dit « désactivé » par `opacity-disabled`, pas
   par ink-400 — un cran de bordure, jamais de texte (DESIGN.md § 11). Les
   descriptions passent d'ink-500 (placeholders) à ink-600 (méta). */
const TITLE_STATE: Record<StepState, string> = {
  done:     'text-ink-600 line-through decoration-primary-300',
  current:  'text-ink-900 font-semibold',
  upcoming: 'text-ink-700 font-semibold',
  locked:   'text-ink-600 font-semibold opacity-disabled',
};

const DESC_STATE: Record<StepState, string> = {
  done:     'text-ink-600',
  current:  'text-ink-600',
  upcoming: 'text-ink-600',
  locked:   'text-ink-600 opacity-disabled',
};

export const Steps: React.FC<StepsProps> = ({ items, className = '', ...rest }) => {
  const wrapperClasses = ['list-none m-0 p-0 flex flex-col font-body', className]
    .filter(Boolean)
    .join(' ');

  return (
    <ol className={wrapperClasses} {...rest}>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <li
            key={idx}
            className="relative pl-12 pb-stack-lg last:pb-0"
            aria-current={item.state === 'current' ? 'step' : undefined}
            aria-disabled={item.state === 'locked' ? 'true' : undefined}
          >
            <span className={`${MARKER_BASE} ${MARKER_STATE[item.state]}`}>
              {item.state === 'done' ? (
                <Check size={16} strokeWidth={3} />
              ) : item.state === 'locked' ? (
                <Lock size={14} strokeWidth={2.25} />
              ) : (
                idx + 1
              )}
            </span>

            {!isLast && (
              <span
                aria-hidden="true"
                className={`absolute left-[17px] top-10 bottom-1 w-0.5 rounded-pill ${LINE_STATE[item.state]}`}
              />
            )}

            {/* (36 − 26) / 2 = 5 : la première ligne du titre se centre sur
                la pastille. Titre → description 4. Interlignes du pas :
                `leading-snug` et `leading-relaxed` retirés. */}
            <p
              className={`mb-stack-3xs text-body pt-[5px] ${TITLE_STATE[item.state]}`}
            >
              {item.title}
            </p>
            {item.description && (
              <p className={`text-caption ${DESC_STATE[item.state]}`}>
                {item.description}
              </p>
            )}
          </li>
        );
      })}
    </ol>
  );
};

export default Steps;
