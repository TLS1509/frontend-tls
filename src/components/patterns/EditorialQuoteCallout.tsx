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
        'relative rounded-lg backdrop-blur-glass-light border',
        'p-stack-lg sm:p-section lg:p-section-lg',
        'flex flex-col gap-stack',
        SURFACE[tone],
        className,
      ].join(' ')}
    >
      <div className="flex items-start gap-stack sm:gap-stack">
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
            <p className="font-body text-caption font-semibold text-ink-600">
              {eyebrow}
            </p>
          )}

          {/* La citation : Nunito italique (le vrai italique — League Spartan
              n'en a pas), 18/28 à toutes les largeurs, une ligne entre deux
              paragraphes. Elle passait en `text-h3` dès 640 px — 20 px mais
              aussi la graisse 700 du titre : un italique gras qui criait. */}
          <blockquote className="font-body italic text-body-lg text-ink-900 max-w-prose [&_p+p]:mt-stack">
            {children}
          </blockquote>
        </div>
      </div>

      {signature && (
        <figcaption className="not-italic pl-0 sm:pl-[4.5rem]">
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
