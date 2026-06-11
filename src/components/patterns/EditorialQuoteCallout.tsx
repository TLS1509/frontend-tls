/**
 * EditorialQuoteCallout — large quote block for editorial intros.
 *
 * Pattern signature : grand guillemet décoratif (3rem) en icon-bubble tinted,
 * texte italique multi-paragraphes, signature optionnelle (auteur + rôle).
 *
 * Usage dans WeeklyNewsletter (édito hebdo), Magazine (foreword), Dossier
 * (intro thèse).
 *
 * <EditorialQuoteCallout
 *   tone="brand"
 *   signature={{ name: 'Claire Martin', role: 'Rédactrice en chef TLS' }}
 * >
 *   <p>L'IA générative redessine la pédagogie…</p>
 *   <p>Cette semaine, on explore ce que ça change concrètement.</p>
 * </EditorialQuoteCallout>
 */

import React from 'react';
import { Quote } from 'lucide-react';
import { AuthorStrip } from './AuthorStrip';

export type EditorialQuoteTone = 'brand' | 'warm' | 'sun' | 'neutral';

export interface EditorialQuoteCalloutProps {
  /** Tone tinted bubble + accent. */
  tone?: EditorialQuoteTone;
  /** Body content (preferable: <p> elements). Rendered italic. */
  children: React.ReactNode;
  /** Optional signature (author/role) — rendered with AuthorStrip compact. */
  signature?: { name: string; role?: string; avatarSrc?: string };
  /** Eyebrow line (e.g. "Édito de la semaine"). */
  eyebrow?: string;
  className?: string;
}

const SURFACE: Record<EditorialQuoteTone, string> = {
  brand:   'bg-primary-50/50 border-primary-100',
  warm:    'bg-secondary-50/50 border-secondary-100',
  sun:     'bg-accent-50/60 border-accent-200',
  neutral: 'bg-white/70 border-ink-100',
};

const ICON_BG: Record<EditorialQuoteTone, string> = {
  brand:   'bg-gradient-to-br from-primary-100 to-primary-200 text-primary-700',
  warm:    'bg-gradient-to-br from-secondary-100 to-secondary-200 text-secondary-700',
  sun:     'bg-gradient-to-br from-accent-100 to-accent-200 text-accent-700',
  neutral: 'bg-gradient-to-br from-ink-100 to-ink-200 text-ink-700',
};

const EYEBROW: Record<EditorialQuoteTone, string> = {
  brand:   'text-primary-700',
  warm:    'text-secondary-700',
  sun:     'text-accent-700',
  neutral: 'text-ink-600',
};

export const EditorialQuoteCallout: React.FC<EditorialQuoteCalloutProps> = ({
  tone = 'brand',
  children,
  signature,
  eyebrow,
  className = '',
}) => {
  return (
    <figure
      className={[
        'relative rounded-3xl backdrop-blur-glass-light border',
        'p-6 sm:p-8 lg:p-10',
        'flex flex-col gap-stack',
        SURFACE[tone],
        className,
      ].join(' ')}
    >
      <div className="flex items-start gap-4 sm:gap-5">
        <span
          aria-hidden
          className={[
            'shrink-0 inline-flex items-center justify-center',
            'w-14 h-14 sm:w-16 sm:h-16 rounded-pill',
            ICON_BG[tone],
          ].join(' ')}
        >
          <Quote size={28} strokeWidth={2} />
        </span>

        <div className="flex-1 min-w-0 flex flex-col gap-stack">
          {eyebrow && (
            <span
              className={[
                'inline-flex font-body text-caption font-medium',
                EYEBROW[tone],
              ].join(' ')}
            >
              {eyebrow}
            </span>
          )}

          <blockquote className="m-0 font-display italic text-body-lg sm:text-h4 text-ink-800 leading-relaxed [&_p]:m-0 [&_p+p]:mt-stack">
            {children}
          </blockquote>
        </div>
      </div>

      {signature && (
        <figcaption className="not-italic mt-2 pl-0 sm:pl-[4.5rem]">
          <AuthorStrip
            name={signature.name}
            role={signature.role}
            avatarSrc={signature.avatarSrc}
            variant="compact"
          />
        </figcaption>
      )}
    </figure>
  );
};

export default EditorialQuoteCallout;
